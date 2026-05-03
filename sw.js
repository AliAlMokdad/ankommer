const CACHE_NAME = 'ankommer-v4';

const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/css/main.css',
  '/js/app.js',
  '/js/data.js',
  '/js/bjorn.js',
  '/js/calculators.js',
  '/js/apis.js',
  '/manifest.json'
];

// ── Install: pre-cache core assets ──────────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS))
  );
  // Activate immediately without waiting for old tabs to close
  self.skipWaiting();
});

// ── Activate: remove stale caches ───────────────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      )
    )
  );
  // Take control of all open clients immediately
  self.clients.claim();
});

// ── Fetch: network-first, cache fallback ────────────────────────────────────
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-http(s) schemes (e.g. chrome-extension://)
  if (!url.protocol.startsWith('http')) return;

  event.respondWith(networkFirst(request));
});

async function networkFirst(request) {
  const isNavigation =
    request.mode === 'navigate' ||
    request.headers.get('accept')?.includes('text/html');

  try {
    // Always attempt the network first
    const networkResponse = await fetch(request);

    // Cache a fresh copy for future offline use (only GET responses)
    if (request.method === 'GET' && networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (networkError) {
    // Network failed — fall back to cache
    const cachedResponse = await caches.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    // For navigation requests with no cache, return the cached root page
    if (isNavigation) {
      const rootCache = await caches.match('/');
      if (rootCache) return rootCache;
    }

    // Nothing available — surface the original network error
    throw networkError;
  }
}
