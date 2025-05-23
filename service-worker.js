
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("ecos-cache").then(cache => {
      return cache.addAll([
        "/",
        "/index.html",
        "/script.js",
        "/canticos.json",
        "/cantor_cristao.json",
        "/icone_joaquim_final.png",
        "/manifest.json"
      ]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
