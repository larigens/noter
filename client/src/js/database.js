import { openDB } from 'idb';

const initdb = async () =>
  openDB('noter', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('noter')) {
        console.log('noter database already exists');
        return;
      }
      db.createObjectStore('noter', { keyPath: 'id', autoIncrement: true });
      console.log('noter database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log(`PUT ${content} to database!`)
  console.error('putDb not implemented')
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => console.error('getDb not implemented');

initdb();
