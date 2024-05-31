const CACHE_NAME = "v1_cache";
const urlsToCache = [
    "/",
    "/index.html",
    "/styles/main.css",
    "/script/main.js",
    "/icons/icon-192x192.png",
    "/icons/icon-512x512.png",
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        }),
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                return response;
            }
            return fetch(event.request);
        }),
    );
});

self.addEventListener("push", (event) => {
    const options = {
        body: event.data.text(),
        icon: "/icons/icon-192x192.png",
        badge: "/icons/icon-192x192.png",
    };
    event.waitUntil(self.registration.showNotification("My Notification", options));
});
