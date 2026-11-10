/* Petit à Petit — service worker
   Chemins relatifs : fonctionne à la racine ou dans un sous-chemin
   (GitHub Pages projet, Render, etc.). */
const VERSION = 'v1.0.0';
const CACHE = 'petit-a-petit-' + VERSION;

const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './css/style.css',
  './js/data.js',
  './js/app.js',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-180.png',
  './icons/icon-maskable-512.png',
  './icons/favicon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    for (const url of APP_SHELL) {
      try {
        await cache.add(url);
      } catch (err) {
        /* Un chemin optionnel ou une redirection ne doit pas faire échouer l'install. */
      }
    }
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys
        .filter((k) => k.startsWith('petit-a-petit-') && k !== CACHE)
        .map((k) => caches.delete(k))
    );
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith((async () => {
    const cached = await caches.match(req, { ignoreSearch: true });
    const network = fetch(req)
      .then((res) => {
        if (res && res.ok && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE).then((cache) => cache.put(req, copy));
        }
        return res;
      })
      .catch(() => cached || caches.match('./index.html') || caches.match('./'));
    return cached || network;
  })());
});
