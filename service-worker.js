const CACHE_NAME = "alphas-cleaning-cache-v3";

const urlsToCache = [
  "/",
  "/index.html",
  "/de/index.html",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/logo-header.png",
  "/favicon.png",
  "/about-alpha-photo.jpg",
  "/screenshots/desktop.png",
  "/screenshots/mobile.png"
  "/offline.html"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request)
      .catch(() => caches.match(event.request))
      .then(response => response || caches.match("/offline.html"))
  );
});


