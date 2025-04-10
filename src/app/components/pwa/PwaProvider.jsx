import { useEffect } from 'react';
import { PwaInstallPrompt } from './PwaInstallPrompt';
import { OfflineIndicator } from './OfflineIndicator';
import { ServiceWorkerRegistration } from './ServiceWorkerRegistration';
import { initDB } from '@/app/lib/pwa/indexedDB';

export const PwaProvider = ({ children }) => {
  useEffect(() => {
    // Initialize IndexedDB
    const setupIndexedDB = async () => {
      try {
        await initDB();
        console.log('IndexedDB initialized successfully');
      } catch (error) {
        console.error('Error initializing IndexedDB:', error);
      }
    };

    setupIndexedDB();
  }, []);

  return (
    <>
      {/* Register service worker */}
      <ServiceWorkerRegistration />
      
      {/* Show offline indicator when needed */}
      <OfflineIndicator />
      
      {/* Show install prompt when appropriate */}
      <PwaInstallPrompt />
      
      {/* Render app content */}
      {children}
    </>
  );
};