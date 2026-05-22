/**
 * ANKOMMER Service Worker
 *
 * Strategy:
 *   - HTML (navigation):     network-first, cache fallback (always fresh shell)
 *   - Static assets (JS/CSS): cache-first, background revalidate (instant repeats)
 *   - Cross-origin APIs:     pass through, never cache (live data only)
 */

const CACHE_NAME = 'ankommer-v63';

const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/css/main.css',
  '/js/app.js',
  '/js/data.js',
  '/js/data-chapters.js',
  '/js/bjorn.js',
  '/js/calculators.js',
  '/js/apis.js',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/og-image.png'
];

// ── Install ────────────────────────────────────────────────────────────────
// Note: we deliberately do NOT call skipWaiting() here. The page (index.html)
// shows an "update available" toast and posts SKIP_WAITING when the user
// confirms — installing in the background and waiting preserves that flow.
// On first install (no controller) the new SW activates immediately anyway.
//
// Precache fetches use { cache: 'reload' } so each asset is pulled fresh from
// the network, bypassing the browser's HTTP cache. This prevents a stale CDN
// copy of (say) /js/data.js from being baked into a fresh SW cache version
// during the brief window between a deploy of sw.js and the CDN catching up
// on the other precache assets. Atomicity is preserved (cache.addAll still
// all-or-nothing); failure modes are unchanged (if origin is unreachable
// during install, the install rejects and the previous SW keeps serving).
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      cache.addAll(PRECACHE_URLS.map(url => new Request(url, { cache: 'reload' })))
    )
  );
});

// ── Activate: clear old caches ─────────────────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(names =>
      Promise.all(
        names.filter(n => n !== CACHE_NAME).map(n => caches.delete(n))
      )
    ).then(() => self.clients.claim())
  );
});

// ── Fetch routing ──────────────────────────────────────────────────────────
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  if (!url.protocol.startsWith('http')) return;
  if (request.method !== 'GET') return;

  // Cross-origin (third-party APIs) — pass through, never cache.
  // Stale weather/exchange-rate/chat responses would be wrong.
  if (url.origin !== self.location.origin) return;

  const isNavigation =
    request.mode === 'navigate' ||
    request.headers.get('accept')?.includes('text/html');

  if (isNavigation) {
    event.respondWith(networkFirst(request));
  } else {
    event.respondWith(cacheFirst(request));
  }
});

// HTML — always try network first so users see fresh content
async function networkFirst(request) {
  try {
    const fresh = await fetch(request);
    if (fresh.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, fresh.clone());
    }
    return fresh;
  } catch (_) {
    const cached = await caches.match(request);
    if (cached) return cached;
    const root = await caches.match('/');
    if (root) return root;
    throw _;
  }
}

// JS/CSS/manifest — cache-first, but quietly refresh in the background.
// Repeat visits load instantly from cache; updates land on next visit.
async function cacheFirst(request) {
  const cached = await caches.match(request);
  const networkPromise = fetch(request).then(response => {
    if (response.ok) {
      caches.open(CACHE_NAME).then(c => c.put(request, response.clone()));
    }
    return response;
  }).catch(() => null);

  if (cached) return cached;
  // Await the promise — using `|| networkPromise` would always be truthy
  // (a Promise is always truthy), so the fallback fetch could never run.
  const fromNetwork = await networkPromise;
  return fromNetwork || fetch(request);
}

// ── Allow page to ask SW to skip waiting (used by update toast) ────────────
self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});
