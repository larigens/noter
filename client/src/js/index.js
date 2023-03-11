import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';

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
if (typeof editor === 'undefined') {
  loadSpinner();
}

// Checks if service workers are supported.
if ('serviceWorker' in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    new Workbox('/src-sw.js').register() // Register workbox service worker.
      .then(() => {
        console.log('Service worker registered successfully!');
      })
      .catch((error) => {
        console.error('Service worker registration failed:', error); // If not supported, logs an error message.
      });
  })
}

