const CACHE_NAME = "pdfnest-v56";

const APP_ASSETS = [
  "./",
  "./index.html",
  "./about.html",
  "./contact.html",
  "./privacy.html",
  "./offline.html",
  "./ads.txt",
  "./robots.txt",
  "./sitemap.xml",
  "./merge-pdf/",
  "./split-pdf/",
  "./compress-pdf/",
  "./watermark-pdf/",
  "./page-numbers-pdf/",
  "./sign-pdf/",
  "./edit-pdf-metadata/",
  "./annotate-pdf/",
  "./flatten-pdf/",
  "./crop-pdf/",
  "./add-text-to-pdf/",
  "./remove-pdf-password/",
  "./image-to-pdf/",
  "./word-to-pdf/",
  "./excel-to-pdf/",
  "./txt-to-pdf/",
  "./pdf-to-jpg/",
  "./extract-images-from-pdf/",
  "./extract-text-from-pdf/",
  "./styles.css",
  "./app.js",
  "./manifest.webmanifest",
  "./icons/icon.svg",
  "./vendor/pdf.min.js",
  "./vendor/pdf.worker.min.js",
  "./vendor/pdf-lib.min.js",
  "./vendor/pdf-lib.min.js.map",
  "./vendor/jszip.min.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  if (request.method !== "GET" || url.origin !== self.location.origin) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match("./offline.html") || caches.match("./index.html")))
    );
    return;
  }

  event.respondWith(
    caches.match(request)
      .then((cached) => cached || fetch(request).then((response) => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }

        return response;
      }))
  );
});
