const CACHE_NAME = 'nm60s-v5';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './apple-touch-icon.png',
  './icons/icon-192-v5.png',
  './icons/icon-512-v5.png',
  './icons/icon-512-maskable-v5.png',
  './icons/apple-touch-icon-180-v5.png',
  './icons/apple-touch-icon-167-v5.png',
  './icons/apple-touch-icon-152-v5.png',
  './icons/apple-touch-icon-120-v5.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (url.origin === self.location.origin) {
    e.respondWith(
      caches.match(e.request).then(cached => cached || fetch(e.request))
    );
  }
});