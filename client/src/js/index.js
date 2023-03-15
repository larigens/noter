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
  // Register Workbox service worker.
  const wb = new Workbox('/service-worker.js');
  wb.register();
}