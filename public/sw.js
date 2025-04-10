// Service Worker for HabitForge
const CACHE_NAME = 'habitforge-v1';

// Assets to cache immediately on SW installation
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/offline.html',
  // Critical app shell assets
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Install event - precache essential assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
  // Activate the new service worker immediately
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Take control of all clients immediately
  event.waitUntil(clients.claim());
});

// Fetch event - serve from cache, fall back to network, then cache response
self.addEventListener('fetch', (event) => {
  // Don't handle non-GET requests or browser extensions
  if (event.request.method !== 'GET' || event.request.url.startsWith('chrome-extension')) {
    return;
  }

  // For API requests, try network first, then fall back to cache
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Clone the response as it can only be consumed once
          const responseClone = response.clone();
          
          // Open the cache and store the response
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
          
          return response;
        })
        .catch(() => {
          // If network request fails, try to serve from cache
          return caches.match(event.request);
        })
    );
    return;
  }

  // For non-API requests, try cache first, then fall back to network
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return the cached response
      if (response) {
        return response;
      }

      // Clone the request as it can only be used once
      const fetchRequest = event.request.clone();

      // Make a network request
      return fetch(fetchRequest)
        .then((response) => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response as it can only be consumed once
          const responseClone = response.clone();
          
          // Open the cache and store the response
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
          
          return response;
        })
        .catch(() => {
          // If both cache and network fail, return our custom offline page
          return caches.match('/offline.html');
        });
    })
  );
});

// Background sync for pending operations
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-habits') {
    event.waitUntil(syncHabits());
  }
});

// Function to sync habit data when coming back online
async function syncHabits() {
  try {
    // Open the database
    const dbPromise = indexedDB.open('habitforge-db', 1);
    
    // Once the database is open
    const db = await new Promise((resolve, reject) => {
      dbPromise.onsuccess = (event) => resolve(event.target.result);
      dbPromise.onerror = () => reject('Error opening database');
    });
    
    // Get all items from the sync queue
    const transaction = db.transaction(['sync-queue'], 'readwrite');
    const store = transaction.objectStore('sync-queue');
    const request = store.getAll();
    
    const syncItems = await new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject('Error getting sync items');
    });
    
    // Process each sync item
    for (const item of syncItems) {
      // Here you'd make the actual API calls to your backend
      // For example:
      /*
      await fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      */
      
      // After successful sync, remove the item from the queue
      await store.delete(item.id);
    }
    
    return true;
  } catch (error) {
    console.error('Sync failed:', error);
    return false;
  }
}

// Handle push notifications
self.addEventListener('push', (event) => {
  if (!event.data) return;
  
  const notification = event.data.json();
  
  const options = {
    body: notification.message,
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    data: {
      url: notification.url || '/'
    }
  };
  
  event.waitUntil(
    self.registration.showNotification('HabitForge', options)
  );
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.matchAll({type: 'window'}).then((clientList) => {
      // If a window is already open, focus it
      for (const client of clientList) {
        if (client.url === event.notification.data.url && 'focus' in client) {
          return client.focus();
        }
      }
      // Otherwise open a new window
      if (clients.openWindow) {
        return clients.openWindow(event.notification.data.url);
      }
    })
  );
});