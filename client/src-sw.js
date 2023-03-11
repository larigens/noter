import { offlineFallback, warmStrategyCache } from 'workbox-recipes';
import { CacheFirst, NetworkFirst } from 'workbox-strategies';
import { registerRoute, setCatchHandler } from 'workbox-routing';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute } from 'workbox-precaching/precacheAndRoute';

const CACHE_NAME = 'page-cache';
const MAX_AGE_SECONDS = 30 * 24 * 60 * 60; // Expires in 30d.
const OFFLINE_FILE = '/offline.html';
const OFFLINE_FALLBACKS = 'offline-fallbacks';

// Needs to have self.__WB_MANIFEST string in it so that injectManifest can replace it with the precache manifest.
precacheAndRoute(self.__WB_MANIFEST); // Contains a list of URLs to precache during the service worker's installation phase.

const cacheStrategy = {
  cacheName: CACHE_NAME,
  plugins: [
    new CacheableResponsePlugin({ statuses: [0, 200] }),
    new ExpirationPlugin({ maxAgeSeconds: MAX_AGE_SECONDS }),
  ],
}
// Cache static assets with a CacheFirst strategy.
const pageCache = new CacheFirst(cacheStrategy);

// Handle all other network requests with a NetworkFirst strategy.
const apiCache = new NetworkFirst(cacheStrategy);

// Respond with a cached version of the content when offline.
offlineFallback();

// Prefetch and cache content in advance to improve performance when online.
warmStrategyCache({ urls: ['/index.html', '/'], strategy: pageCache });

// Cache page navigations (HTML) with a CacheFirst strategy.
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// Cache dynamic assets during runtime.
registerRoute(({ request }) => ['style', 'script', 'worker'].includes(request.destination), pageCache);

// Sets a catch handler to be used by Workbox when a fetch request fails to resolve.
setCatchHandler(async ({ request, event }) => {
  const cache = await caches.open(OFFLINE_FALLBACKS); // Creates a new cache instance called 'offline-fallbacks' for caching offline fallback responses.
  try {
    // Attempts to handle the request using the apiCache network-first strategy.
    const response = await apiCache.handle({ request, event });
    // If the response status is equal or greater than 400, rejects the promise with an error message.
    return response.status >= 400 ? Promise.reject(`Unexpected HTTP status: ${response.status}`) : response;
  } catch {
    // If there's an error, attempts to get the cached response for the offline fallback page.
    const cachedResponse = await cache.match(OFFLINE_FILE);
    return cachedResponse; // Returns the cached response if it exists, otherwise returns undefined.
  }
});

// Cache offline fallback pages when the service worker installs.
self.addEventListener('install', e => {
  e.waitUntil(caches.open(OFFLINE_FALLBACKS).then(cache => cache.addAll([OFFLINE_FILE])));
});

export { CACHE_NAME, OFFLINE_FILE };
