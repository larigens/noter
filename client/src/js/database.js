import { openDB } from 'idb'; // Import the 'idb' package to use with IndexedDB.

const DB_NAME = 'noter';

// Creates a function that can be used to start up the database.
const initdb = async () =>
  openDB(DB_NAME, 1, { // Creates a database named noter and we will use version 1.
    upgrade(db) { // Sets the database schema if it isn't already defined.
      if (db.objectStoreNames.contains(DB_NAME)) {
        console.log('noter database already exists');
        return;
      } // Creates an object store for our data inside of the 'noter'.
      db.createObjectStore(DB_NAME, { keyPath: 'id', autoIncrement: true }); // Creates a key named 'id' which will automatically be incremented.
      console.log('noter database created');
    },
  });


// Export a function we will use to PUT to the database.
export const putDb = async (content) => {
  // Create a connection to the database database and version we want to use.
  const noterDb = await openDB(DB_NAME, 1);
  // Create a new transaction and specify the database and data privileges.
  const tx = noterDb.transaction(DB_NAME, 'readwrite');
  // Open up the desired object store 
  const store = tx.objectStore(DB_NAME);
  // Use the .put() method on the store and pass in the content.
  const request = store.put(content);
  const result = await request;
  console.log(`🚀 data saved to the database`, result);
};

// Export a function we will use to GET all from the database.
export const getDb = async () => {
  const noterDb = await openDB(DB_NAME, 1);
  const tx = noterDb.transaction(DB_NAME, 'readonly');
  const store = tx.objectStore(DB_NAME);
  // Use the .getAll() method on the store and pass in the content.
  const request = store.getAll();
  const result = await request;
  console.log(`🚀`, result);
};

// Call our database function.
initdb();
