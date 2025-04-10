import { useState, useEffect } from 'react';

export const PwaInstallPrompt = () => {
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return; // Already installed, no need to show prompt
    }

    const handleBeforeInstallPrompt = (e) => {
      // Prevent Chrome 76+ from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      // Show the install prompt banner
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    // We no longer need the prompt regardless of outcome
    setDeferredPrompt(null);
    setShowInstallPrompt(false);
    
    // Log outcome for analytics
    console.log(`User ${outcome} the PWA installation`);
  };

  const handleDismissClick = () => {
    setShowInstallPrompt(false);
  };

  if (!showInstallPrompt) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 z-50 flex items-center justify-between">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center mr-3">
          <span className="text-white text-lg font-bold">H</span>
        </div>
        <div>
          <p className="font-medium">Add HabitForge to Home Screen</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Track habits offline</p>
        </div>
      </div>
      <div className="flex space-x-2">
        <button 
          onClick={handleDismissClick}
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          Dismiss
        </button>
        <button 
          onClick={handleInstallClick}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          Install
        </button>
      </div>
    </div>
  );
};
