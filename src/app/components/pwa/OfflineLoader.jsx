import { useState, useEffect } from 'react';
import { habitDBOps } from '@/app/lib/pwa/indexedDB';

// This component handles loading data from IndexedDB when offline
export const OfflineLoader = ({ children, fallback }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check initial online status
    setIsOffline(!navigator.onLine);

    // Listen for online/offline events
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load data from IndexedDB if offline, otherwise try to fetch from API
    const loadData = async () => {
      try {
        if (!navigator.onLine) {
          // We're offline, load from IndexedDB
          const offlineData = await habitDBOps.getAll();
          setData(offlineData);
        } else {
          // We're online, try to load from API first
          // This is where you'd make your API call
          // For this example, we'll just simulate an API call
          try {
            // Replace this with your actual API fetch
            // const response = await fetch('/api/habits');
            // const apiData = await response.json();
            
            // For demo purposes, we'll just use IndexedDB data
            const apiData = await habitDBOps.getAll();
            setData(apiData);
          } catch (apiError) {
            // API call failed, fall back to IndexedDB
            const offlineData = await habitDBOps.getAll();
            setData(offlineData);
          }
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // If still loading, show a loading indicator
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // If there was an error, show an error message
  if (error) {
    return (
      <div className="text-center p-5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
        <p>There was an error loading your data.</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-3 px-4 py-2 bg-red-100 dark:bg-red-800 rounded-lg"
        >
          Try Again
        </button>
      </div>
    );
  }

  // If we're offline but have data, show the data with an indicator
  if (isOffline && data) {
    return (
      <>
        {/* Pass the loaded data to children */}
        {children(data)}
      </>
    );
  }

  // If we're offline with no data, show the fallback
  if (isOffline && !data) {
    return fallback ? fallback : (
      <div className="text-center p-5 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-lg">
        <p>You're offline and no data is available.</p>
        <p className="mt-2">Please connect to the internet to load your habits.</p>
      </div>
    );
  }

  // If online with data, render normally
  return children(data);
};