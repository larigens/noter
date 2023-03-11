// Import methods to save and get data from the indexedDB database in './database.js'
import { getDb, putDb } from './database';
import { header } from './header';

// The class is now named Editor (instead of being anonymous).
export default class Editor {
  constructor() {
    const localData = localStorage.getItem('content');

    // Check if CodeMirror is loaded.
    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror is not loaded');
    }

    // Create a new CodeMirror instance.
    this.editor = CodeMirror(document.querySelector('#main'), {
      value: '',
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    getDb()
      // When the editor is ready, set the value to whatever is stored in indexeddb.
      .then(data => {
        console.info('Loaded data from IndexedDB, injecting into editor');
        this.editor.setValue(data || localData || header);
      })
      // Fall back to localStorage if nothing is stored in IndexedDB, and if neither is available, set the value to header.
      .catch(() => this.editor.setValue(localData || header));

    // Save the content of the editor to localStorage when the editor changes
    this.editor.on('change', () => localStorage.setItem('content', this.editor.getValue()));

    // Save the content of the editor to IndexedDB when the editor loses focus
    this.editor.on('blur', () => {
      console.log('The editor has lost focus');
      putDb(localData);
    });
  }
}