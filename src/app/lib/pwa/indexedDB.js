// IndexedDB implementation for offline data storage
const DB_NAME = 'habitforge-db';
const DB_VERSION = 1;
const HABITS_STORE = 'habits';
const CHECKINS_STORE = 'checkins';
const SYNC_QUEUE_STORE = 'sync-queue';

export const initDB = () => {
  return new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) {
      reject('IndexedDB not supported');
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      reject('Error opening database: ' + event.target.errorCode);
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // Create object stores
      if (!db.objectStoreNames.contains(HABITS_STORE)) {
        db.createObjectStore(HABITS_STORE, { keyPath: 'id' });
      }
      
      if (!db.objectStoreNames.contains(CHECKINS_STORE)) {
        const checkinsStore = db.createObjectStore(CHECKINS_STORE, { keyPath: 'id', autoIncrement: true });
        checkinsStore.createIndex('habitId', 'habitId', { unique: false });
        checkinsStore.createIndex('date', 'date', { unique: false });
      }
      
      if (!db.objectStoreNames.contains(SYNC_QUEUE_STORE)) {
        db.createObjectStore(SYNC_QUEUE_STORE, { keyPath: 'id', autoIncrement: true });
      }
    };
  });
};

// CRUD operations for habits
export const habitDBOps = {
  // Get all habits
  getAll: async () => {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([HABITS_STORE], 'readonly');
      const store = transaction.objectStore(HABITS_STORE);
      const request = store.getAll();
      
      request.onsuccess = () => {
        resolve(request.result);
      };
      
      request.onerror = (e) => {
        reject('Error fetching habits: ' + e.target.errorCode);
      };
    });
  },
  
  // Add a new habit
  add: async (habit) => {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([HABITS_STORE], 'readwrite');
      const store = transaction.objectStore(HABITS_STORE);
      const request = store.add(habit);
      
      request.onsuccess = () => {
        resolve(request.result);
      };
      
      request.onerror = (e) => {
        reject('Error adding habit: ' + e.target.errorCode);
      };
    });
  },
  
  // Update an existing habit
  update: async (habit) => {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([HABITS_STORE], 'readwrite');
      const store = transaction.objectStore(HABITS_STORE);
      const request = store.put(habit);
      
      request.onsuccess = () => {
        resolve(request.result);
      };
      
      request.onerror = (e) => {
        reject('Error updating habit: ' + e.target.errorCode);
      };
    });
  },
  
  // Delete a habit
  delete: async (id) => {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([HABITS_STORE], 'readwrite');
      const store = transaction.objectStore(HABITS_STORE);
      const request = store.delete(id);
      
      request.onsuccess = () => {
        resolve();
      };
      
      request.onerror = (e) => {
        reject('Error deleting habit: ' + e.target.errorCode);
      };
    });
  }
};

// CRUD operations for check-ins
export const checkinDBOps = {
  // Add a check-in
  add: async (checkin) => {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([CHECKINS_STORE, SYNC_QUEUE_STORE], 'readwrite');
      const store = transaction.objectStore(CHECKINS_STORE);
      const syncStore = transaction.objectStore(SYNC_QUEUE_STORE);
      
      // Add to check-ins
      const request = store.add({
        ...checkin,
        date: checkin.date || new Date().toISOString()
      });
      
      // Also add to sync queue if offline
      if (!navigator.onLine) {
        syncStore.add({
          action: 'add-checkin',
          data: checkin,
          timestamp: new Date().getTime()
        });
      }
      
      request.onsuccess = () => {
        resolve(request.result);
      };
      
      request.onerror = (e) => {
        reject('Error adding check-in: ' + e.target.errorCode);
      };
    });
  },
  
  // Get all check-ins for a habit
  getByHabitId: async (habitId) => {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([CHECKINS_STORE], 'readonly');
      const store = transaction.objectStore(CHECKINS_STORE);
      const index = store.index('habitId');
      const request = index.getAll(habitId);
      
      request.onsuccess = () => {
        resolve(request.result);
      };
      
      request.onerror = (e) => {
        reject('Error fetching check-ins: ' + e.target.errorCode);
      };
    });
  },
  
  // Get check-ins for a specific date
  getByDate: async (date) => {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([CHECKINS_STORE], 'readonly');
      const store = transaction.objectStore(CHECKINS_STORE);
      const index = store.index('date');
      
      // For date range (beginning and end of day)
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);
      
      const request = index.getAll(IDBKeyRange.bound(
        startDate.toISOString(),
        endDate.toISOString()
      ));
      
      request.onsuccess = () => {
        resolve(request.result);
      };
      
      request.onerror = (e) => {
        reject('Error fetching check-ins: ' + e.target.errorCode);
      };
    });
  }
};

// Sync operations for offline data
export const syncDBOps = {
  // Process the sync queue when online
  processQueue: async () => {
    if (!navigator.onLine) return [];
    
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([SYNC_QUEUE_STORE], 'readwrite');
      const store = transaction.objectStore(SYNC_QUEUE_STORE);
      const request = store.getAll();
      
      request.onsuccess = async () => {
        const queue = request.result;
        const results = [];
        
        // Process each queued item
        for (const item of queue) {
          try {
            // Here you would make API calls to sync with the server
            // For example:
            /*
            if (item.action === 'add-checkin') {
              const response = await fetch('/api/checkins', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item.data)
              });
              results.push({ id: item.id, success: response.ok });
            }
            */
            
            // For now, we'll just simulate success
            results.push({ id: item.id, success: true });
            
            // Remove from queue after successful sync
            await store.delete(item.id);
          } catch (error) {
            results.push({ id: item.id, success: false, error });
          }
        }
        
        resolve(results);
      };
      
      request.onerror = (e) => {
        reject('Error processing sync queue: ' + e.target.errorCode);
      };
    });
  }
};
