const CACHE_NAME = 'negentro-cache-v1';

// Core critical assets to cache on install for instant shell rendering
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/logos/fevicon.svg',
  '/logos/negentro.svg',
  '/assets/piyapi-logo-exact.svg',
  '/assets/context-problem.svg',
  '/assets/wrappers-problem.svg',
  '/assets/native-problem.webp',
  '/assets/cta-bg-frame88.webp'
];

// Install Event - Precache critical assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('[ServiceWorker] Pre-cache failed for some assets:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate Event - Clean up outdated caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - Intelligent caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests or browser extension schemes
  if (request.method !== 'GET' || !url.protocol.startsWith('http')) {
    return;
  }

  // 1. Navigation requests (HTML pages) -> Network First with Cache fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match('/')))
    );
    return;
  }

  // 2. Static Assets (Images, WebP, SVG, Fonts, Styles, JS) -> Cache First, Network fallback
  const isStaticAsset =
    url.pathname.startsWith('/assets/') ||
    url.pathname.startsWith('/logos/') ||
    url.hostname.includes('fonts.googleapis.com') ||
    url.hostname.includes('fonts.gstatic.com') ||
    /\.(webp|svg|png|jpg|jpeg|gif|woff2|woff|ttf|css|js)$/i.test(url.pathname);

  if (isStaticAsset) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          // Revalidate in background for non-hashed public assets
          if (!url.pathname.includes('-') && !url.hostname.includes('gstatic')) {
            fetch(request).then((networkResponse) => {
              if (networkResponse && networkResponse.status === 200) {
                caches.open(CACHE_NAME).then((cache) => cache.put(request, networkResponse));
              }
            }).catch(() => {});
          }
          return cachedResponse;
        }

        return fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
            return networkResponse;
          }

          // Transparent fallback: if a legacy png/jpg is requested, try the .webp equivalent
          if (/\.(png|jpg|jpeg)$/i.test(url.pathname)) {
            const webpUrl = url.pathname.replace(/\.(png|jpg|jpeg)$/i, '.webp');
            return fetch(webpUrl).then((webpResponse) => {
              if (webpResponse && webpResponse.status === 200) {
                const webpClone = webpResponse.clone();
                caches.open(CACHE_NAME).then((cache) => {
                  cache.put(request, webpClone);
                });
                return webpResponse;
              }
              return networkResponse;
            }).catch(() => networkResponse);
          }

          return networkResponse;
        });
      })
    );
    return;
  }

  // 3. Other requests -> Stale-While-Revalidate
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});
