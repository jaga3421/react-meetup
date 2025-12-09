/**
 * SYNC QUEUE SERVICE - ENSURES NO DATA LOSS
 * 
 * KEY DIFFERENCE FROM DEMO-1:
 * DEMO-1: Actions fail when offline - data is lost
 * DEMO-2: Actions are queued when offline - syncs when back online
 * 
 * How it works:
 * 1. User creates/edits/deletes note while offline
 * 2. Action is saved to IndexedDB (optimistic update)
 * 3. Action is also queued in sync queue
 * 4. When back online, queue processes automatically
 * 5. All queued actions sync with server
 * 
 * This ensures no data loss - user's work is never lost!
 */
const QUEUE_STORE_NAME = "syncQueue";

let queueDB = null;

// Open queue database
const openQueueDB = () => {
  return new Promise((resolve, reject) => {
    if (queueDB) {
      resolve(queueDB);
      return;
    }

    const request = indexedDB.open("SyncQueueDB", 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      queueDB = request.result;
      resolve(queueDB);
    };

    request.onupgradeneeded = (event) => {
      const database = event.target.result;
      if (!database.objectStoreNames.contains(QUEUE_STORE_NAME)) {
        const objectStore = database.createObjectStore(QUEUE_STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
        objectStore.createIndex("timestamp", "timestamp", { unique: false });
      }
    };
  });
};

// Add action to sync queue
export const addToSyncQueue = async (action) => {
  const database = await openQueueDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([QUEUE_STORE_NAME], "readwrite");
    const objectStore = transaction.objectStore(QUEUE_STORE_NAME);
    
    const queueItem = {
      ...action,
      timestamp: Date.now(),
      retries: 0,
    };
    
    const request = objectStore.add(queueItem);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
};

// Get all queued actions
export const getSyncQueue = async () => {
  const database = await openQueueDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([QUEUE_STORE_NAME], "readonly");
    const objectStore = transaction.objectStore(QUEUE_STORE_NAME);
    const request = objectStore.getAll();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result || []);
  });
};

// Remove action from sync queue
export const removeFromSyncQueue = async (id) => {
  const database = await openQueueDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([QUEUE_STORE_NAME], "readwrite");
    const objectStore = transaction.objectStore(QUEUE_STORE_NAME);
    const request = objectStore.delete(id);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
};

// Clear sync queue
export const clearSyncQueue = async () => {
  const database = await openQueueDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([QUEUE_STORE_NAME], "readwrite");
    const objectStore = transaction.objectStore(QUEUE_STORE_NAME);
    const request = objectStore.clear();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
};

