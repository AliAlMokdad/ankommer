/**
 * ANKOMMER — Björn Groq Proxy (Cloudflare Worker)
 *
 * Why this exists: hides the Groq API key from the client. The browser
 * never sees the key — it talks to the Worker, the Worker talks to Groq.
 *
 * Costs: $0. Cloudflare Workers free tier = 100,000 requests/day.
 * No credit card required to sign up.
 *
 * Security:
 *   - Origin allowlist (only requests from the deployed site work)
 *   - In-memory rate limit per IP (60 requests/hour) — prevents key burn
 *   - GROQ_API_KEY stored as a Worker secret, never in source
 *
 * How to deploy: see DEPLOY.md in this folder.
 */

const ALLOWED_ORIGINS = [
  'https://ankommer.org',            // production
  'https://www.ankommer.org',        // www → apex (kept just in case)
  'https://alialmokdad.github.io',   // legacy GH Pages URL (still works)
  'http://localhost:3456',           // local dev
  'http://localhost:8080',
  'http://127.0.0.1:3456'
];

const RATE_LIMIT_PER_HOUR = 60;
const HOUR_MS = 60 * 60 * 1000;

// In-memory bucket — resets when the Worker restarts. Good enough for free tier.
// (If you need persistent rate limiting, use Cloudflare KV or Durable Objects;
// both have free tiers but require a credit card on file at signup.)
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

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';

    // Preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    // Only POST chat completions
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Only POST allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) }
      });
    }

    // Origin allowlist
    if (!ALLOWED_ORIGINS.includes(origin)) {
      return new Response(JSON.stringify({ error: 'Origin not allowed' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) }
      });
    }

    // Per-IP rate limit
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    if (rateLimited(ip)) {
      return new Response(JSON.stringify({
        error: 'Rate limit exceeded — please wait a minute and try again.'
      }), {
        status: 429,
        headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) }
      });
    }

    // Validate body
    let body;
    try {
      body = await request.json();
    } catch (_) {
      return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) }
      });
    }

    if (!Array.isArray(body.messages) || body.messages.length === 0) {
      return new Response(JSON.stringify({ error: 'messages array is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) }
      });
    }

    // Forward to Groq with the secret key (set via `wrangler secret put GROQ_API_KEY`)
    if (!env.GROQ_API_KEY) {
      return new Response(JSON.stringify({ error: 'Worker is not configured (missing GROQ_API_KEY secret)' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) }
      });
    }

    try {
      const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${env.GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: body.model || 'llama-3.3-70b-versatile',
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
    } catch (e) {
      return new Response(JSON.stringify({ error: 'Upstream Groq error: ' + e.message }), {
        status: 502,
        headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) }
      });
    }
  }
};
