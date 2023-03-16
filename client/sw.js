import { precacheAndRoute } from 'workbox-precaching';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheFirst } from 'workbox-strategies';
import { warmStrategyCache, staticResourceCache, pageCache, imageCache } from 'workbox-recipes';

const PAGE_CACHE = 'page-cache-v1';
const MAX_AGE_SECONDS = 30 * 24 * 60 * 60; // Expires in 30d.

// Contains a list of URLs to precache during the service worker's installation phase.
precacheAndRoute(self.__WB_MANIFEST)

// Cache static pages with a CacheFirst strategy.
const pageCacheStrategy = new CacheFirst({
  cacheName: PAGE_CACHE,
  plugins: [
    new CacheableResponsePlugin({ statuses: [0, 200] }),
    new ExpirationPlugin({ maxAgeSeconds: MAX_AGE_SECONDS }),
  ],
});

// Prefetch and cache content in advance to improve performance when online.
warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCacheStrategy,
})

pageCache(); // Responds to a request for an HTML page (through URL navigation) with a network first caching strategy.
staticResourceCache(); // Respond to a request for static resources, specifically CSS, JavaScript, and Web Worker requests, with a stale-while-revalidate caching strategy.
