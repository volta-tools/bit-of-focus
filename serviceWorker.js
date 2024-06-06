const staticCache = "BitAcademyFocusTimer"
const assets = [
    "./index.html",
    "./assets//css/style.css",
    "./assets/js/app.js",
    "./assets/images/icon-16x16.png",
    "./images/icon-32x32.png",
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
