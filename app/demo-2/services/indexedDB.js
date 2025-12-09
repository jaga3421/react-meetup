/**
 * INDEXEDDB SERVICE - LOCAL DATABASE FOR OFFLINE-FIRST
 * 
 * KEY DIFFERENCE FROM DEMO-1:
 * DEMO-1: No local storage - data only on server
 * DEMO-2: IndexedDB stores all notes locally - works offline!
 * 
 * Why IndexedDB?
 * - Can store large amounts of structured data
 * - Persists across browser sessions
 * - Much more powerful than localStorage
 * - Perfect for offline-first apps
 * 
 * This is where your data lives when offline!
 */
const DB_NAME = "NotesDB";
const DB_VERSION = 1;
const STORE_NAME = "notes";

let db = null;

// Open database
export const openDB = () => {
  return new Promise((resolve, reject) => {
    if (db) {
      resolve(db);
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const database = event.target.result;
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        const objectStore = database.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: false,
        });
        objectStore.createIndex("updatedAt", "updatedAt", { unique: false });
      }
    };
  });
};

// Get all notes from IndexedDB
export const getAllNotes = async () => {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([STORE_NAME], "readonly");
    const objectStore = transaction.objectStore(STORE_NAME);
    const request = objectStore.getAll();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result || []);
  });
};

// Get a note by ID
export const getNote = async (id) => {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([STORE_NAME], "readonly");
    const objectStore = transaction.objectStore(STORE_NAME);
    const request = objectStore.get(id);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
};

// Add or update a note in IndexedDB
export const saveNote = async (note) => {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([STORE_NAME], "readwrite");
    const objectStore = transaction.objectStore(STORE_NAME);
    
    // Ensure note has timestamps
    const noteToSave = {
      ...note,
      updatedAt: note.updatedAt || new Date().toISOString(),
      createdAt: note.createdAt || new Date().toISOString(),
    };
    
    const request = objectStore.put(noteToSave);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
};

// Delete a note from IndexedDB
export const deleteNoteFromDB = async (id) => {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([STORE_NAME], "readwrite");
    const objectStore = transaction.objectStore(STORE_NAME);
    const request = objectStore.delete(id);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
};

// Clear all notes from IndexedDB
export const clearAllNotes = async () => {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([STORE_NAME], "readwrite");
    const objectStore = transaction.objectStore(STORE_NAME);
    const request = objectStore.clear();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
};

