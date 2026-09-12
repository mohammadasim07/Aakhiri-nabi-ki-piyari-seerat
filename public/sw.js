// Service Worker for Aakhri Nabi Ki Pyari Seerat
// Developed by Mohammad Asim
// Version: 1.0.0

const CACHE_NAME = 'seerat-app-shell-v2';
const PAGES_CACHE = 'seerat-book-pages-v1';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/books/urdu/page_1.jpg',
  '/books/hindi/page_1.jpg',
  '/books/english/page_1.jpg'
];

// Install Event - Pre-cache core shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('Pre-caching warning:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate Event - Clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME && key !== PAGES_CACHE) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - Dynamic caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests or chrome-extension URLs
  if (request.method !== 'GET' || !url.protocol.startsWith('http')) {
    return;
  }

  // 1. Navigation (HTML): Network-First with offline cache fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return networkResponse;
        })
        .catch(() => {
          return caches.match(request).then((cached) => cached || caches.match('/index.html') || caches.match('/'));
        })
    );
    return;
  }

  // 2. Book Pages: Cache-First with automatic background caching
  if (url.pathname.includes('/books/')) {
    event.respondWith(
      caches.open(PAGES_CACHE).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          return fetch(request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(() => {
            return cachedResponse || new Response('Offline Page Image', { status: 503 });
          });
        });
      })
    );
    return;
  }

  // 3. Google Fonts & CDNs: Cache-First
  if (url.origin.includes('fonts.googleapis.com') || url.origin.includes('fonts.gstatic.com')) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(request).then((cached) => {
          if (cached) return cached;
          return fetch(request).then((res) => {
            if (res && res.status === 200) {
              cache.put(request, res.clone());
            }
            return res;
          }).catch(() => cached);
        });
      })
    );
    return;
  }

  // 4. Vite Assets & JS/CSS: Network-First when online, fallback to Cache
  event.respondWith(
    fetch(request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return networkResponse;
      })
      .catch(() => caches.match(request))
  );
});

// Listen for batch pre-download messages from the app
self.addEventListener('message', async (event) => {
  if (event.data && event.data.type === 'CACHE_BOOK_PAGES') {
    const { urls, lang } = event.data;
    const cache = await caches.open(PAGES_CACHE);
    let completed = 0;
    const total = urls.length;

    for (const url of urls) {
      try {
        const existing = await cache.match(url);
        if (!existing) {
          const response = await fetch(url);
          if (response.ok) {
            await cache.put(url, response);
          }
        }
        completed++;
        // Post progress update
        event.source.postMessage({
          type: 'CACHE_PROGRESS',
          lang,
          completed,
          total,
          percent: Math.round((completed / total) * 100)
        });
      } catch {
        // Continue with other pages
        completed++;
      }
    }

    event.source.postMessage({
      type: 'CACHE_COMPLETE',
      lang,
      total
    });
  }
});
