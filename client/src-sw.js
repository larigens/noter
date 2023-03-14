import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { offlineFallback, warmStrategyCache } from 'workbox-recipes';

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
registerRoute((({ request }) => ['style', 'script'].includes(request.destination)),
  new StaleWhileRevalidate({
    cacheName: ASSET_CACHE,
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  }));

// Serve a fallback page when the user is offline.
offlineFallback({
  pageFallback: '/offline.html'
});

