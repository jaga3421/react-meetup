// Sync queue for managing offline actions
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

