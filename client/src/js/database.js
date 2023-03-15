import { openDB } from 'idb'; // Import the 'idb' package to use with IndexedDB.

// Creates a function that can be used to start up the database.
const initdb = async () =>
  openDB('noter', 1, { // Creates a database named noter and we will use version 1.
    upgrade(db) { // Sets the database schema if it isn't already defined.
      if (db.objectStoreNames.contains('noter')) {
        console.log('noter database already exists');
        return;
      } // Creates an object store for our data inside of the 'noter'.
      db.createObjectStore('noter', { keyPath: 'id' }); // Creates a key named 'id'.
      console.log('noter database created');
    },
  });

// Export a function we will use to PUT to the database.
export const putDb = async (content) => {
  const noterDB = await openDB("noter", 1);   // Create a connection to the database database and version we want to use.
  const tx = noterDB.transaction("noter", "readwrite");   // Create a new transaction and specify the database and data privileges.
  const store = tx.objectStore("noter");   // Open up the desired object store 
  const request = store.put({ id: 1, noter: content });   // Use the .put() method on the store and pass in the content. 
  const result = await request; // Since it is the same large notepad, which will be constantly updated, I gave the id=1, so that it would not create multiple ids for multiple updates.
  console.log("Data saved to the database", result);
};

// Export a function we will use to GET all from the database.
export const getDb = async () => {
  const noterDB = await openDB("noter", 1);
  const tx = noterDB.transaction("noter", "readonly");
  const store = tx.objectStore("noter");
  const request = store.getAll();   // Use the .getAll() method on the store and pass in the content.
  const result = await request;
  console.log(`🚀`, result);
};

// Call our database function.
initdb();

