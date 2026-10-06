/* PKSYSTEM – service worker: aplikacja działa offline po pierwszym otwarciu.
   Pliki aplikacji są pobierane z sieci (zawsze aktualne), a gdy sieci nie ma lub jest wolna, używana jest zapisana kopia.
   Przy nowej wersji plików zmień numer w CACHE. */
const CACHE = "pksystem-pilot-1-3";
const CORE = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./icon-maskable-512.png", "./apple-touch-icon.png"];
const NET_TIMEOUT_MS = 4000;

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(CORE.map(u => new Request(u, { cache: "reload" }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const own = url.origin === location.origin;
  const fonts = /(^|\.)googleapis\.com$|(^|\.)gstatic\.com$/.test(url.hostname);
  if (!own && !fonts) return;

  if (own) {
    /* Pliki aplikacji: najpierw sieć (z ominięciem pamięci przeglądarki), awaryjnie zapisana kopia. */
    e.respondWith((async () => {
      const cache = await caches.open(CACHE);
      try {
        const res = await Promise.race([
          fetch(req, { cache: "no-cache" }),
          new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), NET_TIMEOUT_MS))
        ]);
        if (res && res.ok) cache.put(req, res.clone());
        return res;
      } catch (err) {
        let hit = await cache.match(req, { ignoreSearch: true });
        if (!hit && req.mode === "navigate") hit = await cache.match("./index.html");
        return hit || Response.error();
      }
    })());
  } else {
    /* Czcionki: z pamięci podręcznej, w tle odświeżane. */
    e.respondWith((async () => {
      const cache = await caches.open(CACHE);
      const hit = await cache.match(req);
      const net = fetch(req).then(res => {
        if (res && (res.ok || res.type === "opaque")) cache.put(req, res.clone());
        return res;
      }).catch(() => null);
      if (hit) { e.waitUntil(net); return hit; }
      return (await net) || Response.error();
    })());
  }
});
