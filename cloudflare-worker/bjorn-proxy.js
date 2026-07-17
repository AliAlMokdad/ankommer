/**
 * ANKOMMER Bjorn chatbot proxy (Cloudflare Worker)
 *
 * Why this exists: hides provider API keys from the client. The browser
 * never sees the key, it talks to the Worker, and the Worker talks to AI
 * providers.
 *
 * Security:
 *   - Origin allowlist, only requests from the deployed site work
 *   - In-memory rate limit per IP, 60 requests per hour
 *   - Provider secrets stay in Worker bindings and secrets, never in source
 *
 * How to deploy: see DEPLOY.md in this folder.
 */

const ALLOWED_ORIGINS = [
  'https://ankommer.org',            // production
  'https://www.ankommer.org',        // www to apex, kept just in case
  'https://alialmokdad.github.io',   // legacy GH Pages URL, still works
  'http://localhost:3456',           // local dev
  'http://localhost:8080',
  'http://127.0.0.1:3456'
];

const RATE_LIMIT_PER_HOUR = 60;

// Cloudflare Workers AI is the primary engine. Client model input is ignored
// for this path so Bjorn always uses the intended Llama model.
const CLOUDFLARE_MODEL = '@cf/meta/llama-3.3-70b-instruct-fp8-fast';

// Pin the fallback model server-side to the allowed Groq set, regardless of
// client input, so callers cannot request arbitrary models under the account key.
const ALLOWED_MODELS = ['openai/gpt-oss-120b', 'openai/gpt-oss-20b'];
const DEFAULT_GROQ_MODEL = 'openai/gpt-oss-120b';
const HOUR_MS = 60 * 60 * 1000;

// In-memory bucket, resets when the Worker restarts. Good enough for free tier.
// If persistent rate limiting is needed later, use Cloudflare KV or Durable Objects.
const rateLimitBucket = new Map();

function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin'
  };
}

function rateLimited(ip) {
  const now = Date.now();
  const bucket = rateLimitBucket.get(ip) || { count: 0, resetAt: now + HOUR_MS };
  if (now > bucket.resetAt) {
    bucket.count = 0;
    bucket.resetAt = now + HOUR_MS;
  }
  bucket.count++;
  rateLimitBucket.set(ip, bucket);
  return bucket.count > RATE_LIMIT_PER_HOUR;
}

function jsonResponse(payload, status, origin) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) }
  });
}

function errorResponse(message, status, origin) {
  return jsonResponse({ error: { message } }, status, origin);
}

function openAiResponse(content, origin) {
  return jsonResponse({
    choices: [
      {
        index: 0,
        message: {
          role: 'assistant',
          content
        },
        finish_reason: 'stop'
      }
    ],
    model: CLOUDFLARE_MODEL
  }, 200, origin);
}

async function runCloudflareAi(body, env) {
  const out = await env.AI.run(CLOUDFLARE_MODEL, {
    messages: body.messages,
    max_tokens: body.max_tokens ?? 1024,
    temperature: body.temperature ?? 0.7
  });

  if (out && typeof out.response === 'string' && out.response.trim() !== '') {
    return out.response;
  }

  return null;
}

async function runGroqFallback(body, env, origin) {
  if (!env.GROQ_API_KEY) {
    return errorResponse('Worker fallback is not configured, missing GROQ_API_KEY secret.', 502, origin);
  }

  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: ALLOWED_MODELS.includes(body.model) ? body.model : DEFAULT_GROQ_MODEL,
        messages: body.messages,
        temperature: body.temperature ?? 0.7,
        max_tokens: body.max_tokens ?? 1024,
        stream: false
      })
    });

    const text = await groqRes.text();
    return new Response(text, {
      status: groqRes.status,
      headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) }
    });
  } catch (_) {
    return errorResponse('Cloudflare Workers AI and Groq fallback are unavailable.', 502, origin);
  }
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';

    // Preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    // Only POST chat completions
    if (request.method !== 'POST') {
      return errorResponse('Only POST allowed', 405, origin);
    }

    // Origin allowlist
    if (!ALLOWED_ORIGINS.includes(origin)) {
      return errorResponse('Origin not allowed', 403, origin);
    }

    // Per-IP rate limit
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    if (rateLimited(ip)) {
      return errorResponse('Rate limit exceeded. Please wait a minute and try again.', 429, origin);
    }

    // Validate body
    let body;
    try {
      body = await request.json();
    } catch (_) {
      return errorResponse('Invalid JSON body', 400, origin);
    }

    if (!Array.isArray(body.messages) || body.messages.length === 0) {
      return errorResponse('messages array is required', 400, origin);
    }

    // Primary path: Cloudflare Workers AI with Llama 3.3 70B.
    try {
      const content = await runCloudflareAi(body, env);
      if (content) {
        return openAiResponse(content, origin);
      }
    } catch (_) {
      // Fall through to Groq fallback.
    }

    return runGroqFallback(body, env, origin);
  }
};
