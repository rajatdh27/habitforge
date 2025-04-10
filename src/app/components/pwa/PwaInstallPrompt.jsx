import { useState, useEffect } from 'react';

export const PwaInstallPrompt = () => {
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [installDismissed, setInstallDismissed] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Check if the app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return; // Already installed, no need to show prompt
    }

    // Check if user has previously dismissed the prompt
    const hasUserDismissedPrompt = localStorage.getItem('installPromptDismissed');
    if (hasUserDismissedPrompt === 'true') {
      // Only respect the dismissal for 3 days
      const dismissalTimestamp = parseInt(localStorage.getItem('installPromptDismissedAt') || '0');
      const threeDaysInMs = 3 * 24 * 60 * 60 * 1000;
      if (Date.now() - dismissalTimestamp < threeDaysInMs) {
        setInstallDismissed(true);
        return;
      }
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
    
    if (outcome === 'accepted') {
      // User accepted, we can clear any dismissal records
      localStorage.removeItem('installPromptDismissed');
      localStorage.removeItem('installPromptDismissedAt');
    }
  };

  const handleDismissClick = () => {
    setShowInstallPrompt(false);
    setInstallDismissed(true);
    
    // Remember that user dismissed the prompt
    localStorage.setItem('installPromptDismissed', 'true');
    localStorage.setItem('installPromptDismissedAt', Date.now().toString());
  };

  const toggleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  if (!showInstallPrompt || installDismissed) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 z-50">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center mr-3">
            <span className="text-white text-lg font-bold">H</span>
          </div>
          <div>
            <p className="font-medium">Add HabitForge to Home Screen</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Track habits even when offline</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={handleDismissClick}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Dismiss installation prompt"
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
      
      {/* Expandable details section */}
      <div>
        <button 
          onClick={toggleShowDetails}
          className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline flex items-center"
        >
          {showDetails ? 'Hide details' : 'Why install?'}
          <svg 
            className={`ml-1 w-4 h-4 transition-transform duration-200 ${showDetails ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        
        {showDetails && (
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <ul className="list-disc pl-5 space-y-1">
              <li>Works offline - track your habits without internet</li>
              <li>Faster loading times - no need to wait for the browser</li>
              <li>Home screen icon - quick access to your habits</li>
              <li>Full-screen experience - no browser UI getting in the way</li>
              <li>Get notifications about your habits (if enabled)</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};