const CACHE_NAME = "BitAcademyFocusTimer"
const urlsToCache = [
    "/",
     "/assets/audio/simple-notification.mp3",
     "/assets/css/dark.css",
     "/assets/js/BitTimer.mjs",
     "/assets/js/RandomQuote.mjs",
     "/assets/js/SoundToggler.mjs",
     "/assets/js/Time.mjs",
     //"/assets/images/icon-16x16.png",
     "/assets/images/icon-32x32.png",
]


console.log('[Service Worker] File is executing');


// Store response in cache
const putInCache = async (request, response) => {
    if (request.method !== "GET") {
        return;
    }

    try {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(request, response);
    } catch (error) {
        console.log("request cannot be cached", request, error);
    }
};


// Try to fetch from network, fallback to cache
const networkFirst = async (request) => {
    if (navigator.onLine) {
        try {
            const responseFromNetwork = await fetch(request);
            await putInCache(request, responseFromNetwork.clone());
            return responseFromNetwork;
        } catch (e) {
            console.warn("[Service Worker] Network error, falling back to cache");
        }
    }

    const responseFromCache = await caches.match(request);
    if (responseFromCache) {
        return responseFromCache;
    }

    return new Response("Network error happened", {
        status: 408,
        headers: { "Content-Type": "text/plain" },
    });
};

self.addEventListener("install", (event) => {
    console.log('[Service Worker] Install event');
    const preCache = async () => {
        const cache = await caches.open(CACHE_NAME);
        return cache.addAll(urlsToCache);
    };
    event.waitUntil(preCache());
});

self.addEventListener("fetch", (event) => {
    console.log('[Service Worker] fetch event', event.request);
    event.respondWith(networkFirst(event.request));
});



self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activate event');
});