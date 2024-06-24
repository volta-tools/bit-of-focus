const staticCache = "BitAcademyFocusTimer"
const assets = [
    "./index.html",
    "./assets/audio/simple-notification.mp3",
    "./assets/css/dark.css",
    "./assets/images/bit-timer.png",
    "./assets/images/icon-32x32.png",
    "./assets/images/icon-72x72.png",
    "./assets/images/icon-96x96.png",
    "./assets/images/icon-128x128.png",
    "./assets/images/icon-144x144.png",
    "./assets/images/icon-152x152.png",
    "./assets/images/icon-192x192.png",
    "./assets/js/app.js",
    "./assets/js/BitTimer.mjs",
    "./assets/js/RandomQuote.mjs"
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticCache).then(cache => {
            cache.addAll(assets)
        })
    )
})


self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        })
    )
})
