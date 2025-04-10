import { useState, useEffect } from 'react';
import { WifiOff, Wifi, Check } from 'lucide-react';

export const OfflineIndicator = () => {
  const [isOffline, setIsOffline] = useState(false);
  const [showReconnected, setShowReconnected] = useState(false);
  const [hasPendingSync, setHasPendingSync] = useState(false);

  useEffect(() => {
    // Check if there are pending syncs
    const checkPendingSync = async () => {
      if ('indexedDB' in window) {
        try {
          const dbPromise = indexedDB.open('habitforge-db', 1);
          
          dbPromise.onsuccess = (event) => {
            const db = event.target.result;
            if (db.objectStoreNames.contains('sync-queue')) {
              const transaction = db.transaction(['sync-queue'], 'readonly');
              const store = transaction.objectStore('sync-queue');
              const countRequest = store.count();
              
              countRequest.onsuccess = () => {
                setHasPendingSync(countRequest.result > 0);
              };
            }
          };
        } catch (error) {
          console.error('Error checking sync queue:', error);
        }
      }
    };

    const handleOnline = () => {
      setIsOffline(false);
      setShowReconnected(true);
      checkPendingSync();
      
      // Hide the reconnected message after 5 seconds
      setTimeout(() => {
        setShowReconnected(false);
      }, 5000);
      
      // Trigger background sync if available
      if ('serviceWorker' in navigator && 'SyncManager' in window) {
        navigator.serviceWorker.ready.then((registration) => {
          registration.sync.register('sync-habits').catch((err) => {
            console.error('Background sync failed:', err);
          });
        });
      }
    };
    
    const handleOffline = () => {
      setIsOffline(true);
      setShowReconnected(false);
    };

    // Check initial state
    setIsOffline(!navigator.onLine);
    if (navigator.onLine) {
      checkPendingSync();
    }

    // Add event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline && !showReconnected && !hasPendingSync) return null;

  if (isOffline) {
    return (
      <div className="fixed top-0 left-0 right-0 bg-amber-500 text-white p-2 z-50 flex items-center justify-center">
        <WifiOff size={16} className="mr-2" />
        <span className="text-sm font-medium">You're offline. All changes will be saved and synced when you reconnect.</span>
      </div>
    );
  }

  if (showReconnected) {
    return (
      <div className="fixed top-0 left-0 right-0 bg-green-500 text-white p-2 z-50 flex items-center justify-center">
        <Wifi size={16} className="mr-2" />
        <span className="text-sm font-medium">You're back online! Your data is now syncing.</span>
      </div>
    );
  }

  if (hasPendingSync) {
    return (
      <div className="fixed top-0 left-0 right-0 bg-indigo-500 text-white p-2 z-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white mr-2"></div>
        <span className="text-sm font-medium">Syncing your habit data...</span>
      </div>
    );
  }

  return null;
};