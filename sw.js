/* plsig offline support: keeps the page and its two pinned scripts so the app opens without a
   network. The page is fetched network-first (updates arrive as soon as you are online); the
   jsDelivr scripts are versioned and immutable, so they are served from the cache first. */
const CACHE = "plsig-v1";
const CDN = [
  "https://cdn.jsdelivr.net/npm/jstat@1.9.6/dist/jstat.min.js",
  "https://cdn.jsdelivr.net/npm/plotly.js-cartesian-dist-min@2.35.2/plotly-cartesian.min.js",
];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => Promise.all([
    c.add(new Request("./", { cache: "reload" })).catch(() => {}),
    ...CDN.map((u) => c.add(new Request(u, { mode: "cors" })).catch(() => {})),
  ])));
  self.skipWaiting();
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin === self.location.origin) {
    e.respondWith(fetch(req).then((res) => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req, { ignoreSearch: true }).then((r) => r || caches.match("./"))));
  } else if (url.hostname === "cdn.jsdelivr.net") {
    e.respondWith(caches.match(req).then((r) => r || fetch(req).then((res) => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
      return res;
    })));
  }
});
