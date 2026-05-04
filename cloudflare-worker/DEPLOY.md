# Björn Proxy — Free Deployment Guide

This proxies Björn's chat requests through a Cloudflare Worker so the Groq API key isn't exposed in client source code.

**Cost:** $0. Cloudflare's free Workers tier is 100,000 requests/day. No credit card needed to sign up.

---

## What you'll do (one-time, ~10 minutes)

### 1. Create a free Cloudflare account

Go to https://dash.cloudflare.com/sign-up — email + password is enough. No payment info required for the Workers free tier.

### 2. Install the wrangler CLI on your computer

You already have Node.js installed (you used `npx serve`). Run:

```
npx wrangler login
```

Browser opens, you click Allow, you're authenticated.

### 3. Deploy the worker

From the project root:

```
cd cloudflare-worker
npx wrangler deploy
```

Wrangler prints a URL like `https://ankommer-bjorn-proxy.<your-subdomain>.workers.dev`. **Copy this URL.**

### 4. Add your Groq API key as a secret

```
npx wrangler secret put GROQ_API_KEY
```

When prompted, paste your Groq key. It's stored encrypted on Cloudflare's side and **never** appears in source files or logs.

### 5. Update `js/bjorn.js` to use the worker

In `js/bjorn.js`, find this line near the top:

```js
const apiKey = ['gsk_', '...rest of your key...'].join('');
```

Replace it with:

```js
const PROXY_URL = 'https://ankommer-bjorn-proxy.<your-subdomain>.workers.dev';
```

Then find the `callGroq` function and replace the fetch URL + auth:

```js
// Before:
const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ ... })
});

// After:
const res = await fetch(PROXY_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ messages: [...], model: '...', temperature: 0.7 })
});
```

### 6. Rotate the old Groq key

Since the old key was visible in client source, rotate it:

1. Go to https://console.groq.com/keys
2. Delete the old key
3. Create a new key
4. Run `npx wrangler secret put GROQ_API_KEY` again with the new key

The proxy keeps working — the new key is set on Cloudflare, never on the user's browser.

### 7. Commit + push

```
git add js/bjorn.js
git commit -m "Move Björn API key behind Cloudflare Worker proxy"
git push
```

---

## How to verify it works

Open the live site, open Björn, send a message. If you get a real reply, it works.

Open browser devtools → Network tab. The request should go to `*.workers.dev` — **not** to `api.groq.com`. The auth header should be absent in the request from the browser.

---

## Future: turn off origin allowlist for testing

If you want to test from a new domain, edit `ALLOWED_ORIGINS` in `bjorn-proxy.js` and re-run `npx wrangler deploy`.

---

## Free tier limits at a glance

| Resource | Free tier | What it means |
|---|---|---|
| Worker requests | 100,000 / day | At ~30 chats/day per user, that's 3,300 daily users free |
| CPU time | 10 ms / request | Plenty for proxying |
| Outbound requests | included | The proxy → Groq call counts as one |

If ANKOMMER ever exceeds this, the next tier is $5/month for 10 million requests. By that point you'd have a community of millions and donations or Patreon would cover it.
