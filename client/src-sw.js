const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

const PAGE_CACHE = 'page-cache';
const ASSET_CACHE = 'asset-cache';
const MAX_AGE_SECONDS = 30 * 24 * 60 * 60; // Expires in 30d.

precacheAndRoute(self.__WB_MANIFEST); // Contains a list of URLs to precache during the service worker's installation phase.

// Cache static pages with a CacheFirst strategy.
const pageCache = new CacheFirst({
  cacheName: PAGE_CACHE,
  plugins: [
    new CacheableResponsePlugin({ statuses: [0, 200] }),
    new ExpirationPlugin({ maxAgeSeconds: MAX_AGE_SECONDS }),
  ],
});

// Prefetch and cache content in advance to improve performance when online.
warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

// Cache page navigations (HTML) with a CacheFirst strategy.
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// Cache dynamic assets during runtime.
const matchCallback = (({ request }) => ['style', 'script', 'worker'].includes(request.destination));

registerRoute(matchCallback, new StaleWhileRevalidate({
  cacheName: ASSET_CACHE,
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
  ],
}));
