'use client';
import { useEffect, useState } from 'react';
import { OfflineFallback } from './OfflineFallback';

export const ServiceWorkerRegistration = () => {
  const [isOfflineFirstVisit, setIsOfflineFirstVisit] = useState(false);
  const [appLoaded, setAppLoaded] = useState(false);

  useEffect(() => {
    // Check if this is our first time loading the app
    const isFirstVisit = !localStorage.getItem('appPreviouslyLoaded');
    const isOffline = !navigator.onLine;

    // If first visit and offline, show the offline fallback
    if (isFirstVisit && isOffline) {
      setIsOfflineFirstVisit(true);
    } else {
      setAppLoaded(true);
      // Mark that the app has been loaded before
      localStorage.setItem('appPreviouslyLoaded', 'true');
    }

    // Handle online status changes
    const handleOnline = () => {
      if (isOfflineFirstVisit) {
        // We're back online, reload the page to get fresh data
        window.location.reload();
      }
    };

    window.addEventListener('online', handleOnline);

    // Register service worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        // Use a try-catch to handle network errors during registration
        try {
          navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
              console.log('ServiceWorker registration successful with scope: ', registration.scope);
              
              // Check for updates
              registration.update();
              
              // Listen for updates
              registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;
                
                if (newWorker) {
                  newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                      // New service worker available
                      console.log('New service worker available');
                      
                      // You could show a notification here to let the user know
                      // that an update is available and they should refresh
                    }
                  });
                }
              });
            })
            .catch(function(err) {
              console.log('ServiceWorker registration failed: ', err);
            });
        } catch (error) {
          console.log('Error during service worker registration:', error);
        }
      });
      
      // Handle service worker updates
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        // The controller changed, probably because a new service worker took over
        console.log('Controller changed - new service worker active');
      });
    }

    return () => {
      window.removeEventListener('online', handleOnline);
    };
  }, [isOfflineFirstVisit]);

  if (isOfflineFirstVisit) {
    return <OfflineFallback />;
  }

  // This component doesn't render anything normally
  return null;
};