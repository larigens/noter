import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';
import { CACHE_NAME, OFFLINE_FILE } from '../../src-sw.js'

const main = document.querySelector('#main');
main.innerHTML = '';

const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

// Creates an instance of the Editor class. 
const editor = new Editor();

// Checks if editor exists, if it does not, then calls loadSpinner().
if (!editor) {
  loadSpinner()
}

// Checks if service workers are supported.
('serviceWorker' in navigator) ?
  new Workbox('/src-sw.js').register() : // Register workbox service worker.
  console.error('Service workers are not supported in this browser.'); // If not supported, logs an error message.

// This fetch function is required for the SW to be detected by the browser. 
this.addEventListener('fetch', event => {
  event.respondWith( // Respond with a cached response, or fetch and cache the request.
    caches.match(event.request) // If the request is already in the cache, return the cached version.
      .then(response => response ? response : fetch(event.request) // Otherwise, fetch the request from the network.
        .then(response => (!response || response.status !== 200 || response.type !== 'basic') // If the response is not valid.
          ? caches.match(OFFLINE_FILE) // Use the offline fallback page.
          : caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, response.clone()); // Clone the response and cache it for future requests.
            return response;
          })
        )
      )
  );
});

