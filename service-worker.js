const CACHE_NAME = "alphas-cleaning-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/de/index.html",
  "/en/index.html",
  "/styles.css",
  "/script.js",
  "/icons/icon-192.png",
  "/icons/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

