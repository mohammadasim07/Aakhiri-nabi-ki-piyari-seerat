// Offline & Service Worker Management
// Developed by Mohammad Asim

import { getPageImagePath } from '../data/bookData';

export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
          console.log('[PWA] Service Worker registered successfully:', reg.scope);
          // Check for worker updates
          reg.onupdatefound = () => {
            const installing = reg.installing;
            if (installing) {
              installing.onstatechange = () => {
                if (installing.state === 'installed' && navigator.serviceWorker.controller) {
                  console.log('[PWA] New version available!');
                }
              };
            }
          };
        })
        .catch((err) => {
          console.warn('[PWA] Service Worker registration failed:', err);
        });
    });
  }
}

// Check how many pages of a specific book are already stored offline in cache
export async function getOfflinePagesStatus(lang = 'urdu') {
  if (!('caches' in window)) return { cachedCount: 0, total: 147, isFullyDownloaded: false };

  try {
    const cache = await caches.open('seerat-book-pages-v1');
    const total = lang === 'english' ? 166 : 147;
    let cachedCount = 0;

    for (let page = 1; page <= total; page++) {
      const url = getPageImagePath(page, lang);
      const match = await cache.match(url);
      if (match) cachedCount++;
    }

    return {
      cachedCount,
      total,
      isFullyDownloaded: cachedCount >= total
    };
  } catch {
    return { cachedCount: 0, total: 147, isFullyDownloaded: false };
  }
}

// Batch download all pages of an edition for 100% offline study
export async function downloadBookEditionForOffline(lang, onProgress, onComplete) {
  if (!('serviceWorker' in navigator) || !navigator.serviceWorker.controller) {
    // Fallback if worker not yet controlling: fetch directly and cache via caches API
    if ('caches' in window) {
      try {
        const cache = await caches.open('seerat-book-pages-v1');
        const total = lang === 'english' ? 166 : 147;
        for (let p = 1; p <= total; p++) {
          const url = getPageImagePath(p, lang);
          const has = await cache.match(url);
          if (!has) {
            try {
              const res = await fetch(url);
              if (res.ok) await cache.put(url, res);
            } catch {
              // Ignore individual image download failure
            }
          }
          if (onProgress) onProgress(Math.round((p / total) * 100), p, total);
        }
        if (onComplete) onComplete(total);
        return;
      } catch {
        // Ignore cache failure
      }
    }
    if (onComplete) onComplete(0);
    return;
  }

  const total = lang === 'english' ? 166 : 147;
  const urls = [];
  for (let p = 1; p <= total; p++) {
    urls.push(getPageImagePath(p, lang));
  }

  const handler = (event) => {
    if (event.data && event.data.type === 'CACHE_PROGRESS' && event.data.lang === lang) {
      if (onProgress) onProgress(event.data.percent, event.data.completed, event.data.total);
    } else if (event.data && event.data.type === 'CACHE_COMPLETE' && event.data.lang === lang) {
      navigator.serviceWorker.removeEventListener('message', handler);
      if (onComplete) onComplete(event.data.total);
    }
  };

  navigator.serviceWorker.addEventListener('message', handler);
  navigator.serviceWorker.controller.postMessage({
    type: 'CACHE_BOOK_PAGES',
    lang,
    urls
  });
}
