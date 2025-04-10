import React from 'react';
import { WifiOff } from 'lucide-react';

export const OfflineFallback = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-white to-slate-100 dark:from-gray-900 dark:to-black text-gray-900 dark:text-white">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
        <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <WifiOff size={28} className="text-amber-600 dark:text-amber-400" />
        </div>
        
        <h1 className="text-xl font-bold mb-2">You're Offline</h1>
        
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          HabitForge needs an internet connection the first time you use it, but will work offline after that.
        </p>
        
        <div className="mb-6 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <h2 className="font-medium mb-2">What's happening?</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-left">
            HabitForge is a Progressive Web App (PWA) designed to work offline, but needs to load your data from our servers at least once. Please check your internet connection and try again.
          </p>
        </div>
        
        <button 
          onClick={() => window.location.reload()}
          className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Try Again
        </button>
      </div>
      
      <div className="mt-8 text-sm text-center text-gray-500 dark:text-gray-500">
        <p>Once connected, HabitForge will work offline!</p>
      </div>
    </div>
  );
};