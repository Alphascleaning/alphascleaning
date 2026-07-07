const CACHE_NAME = "alphas-cleaning-cache-v1";
const urlsToCache = [
  "/alphascleaning/",
  "/alphascleaning/index.html",
  "/alphascleaning/de/index.html",
  "/alphascleaning/en/index.html",
  "/alphascleaning/styles.css",
  "/alphascleaning/script.js",
  "/alphascleaning/icons/icon-192.png",
  "/alphascleaning/icons/icon-512.png"
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

