'use client';

import { useState, useEffect } from 'react';
import { HomeScreen } from './components/screens/HomeScreen';
import { CheckInScreen } from './components/screens/CheckInScreen';
import { AnalyticsScreen } from './components/screens/AnalyticsScreen';
import { NotificationsScreen } from './components/screens/NotificationsScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';
import { Navbar } from './components/layout/Navbar';
import { BottomNav } from './components/layout/BottomNav';
import { PwaProvider } from './components/pwa/PwaProvider';
import { initDB } from './lib/pwa/indexedDB';

// Sample data - in a real app, this would come from an API
const initialHabits = [
  { id: 1, name: 'Morning Meditation', streak: 12, frequency: 'daily', completed: false, progress: 0.75 },
  { id: 2, name: 'Read 30 minutes', streak: 5, frequency: 'daily', completed: true, progress: 1 },
  { id: 3, name: 'Workout', streak: 8, frequency: 'weekly', completed: false, progress: 0.5 },
  { id: 4, name: 'Drink 8 glasses of water', streak: 20, frequency: 'daily', completed: false, progress: 0.25 },
];

export default function Home() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Initialize the app
  useEffect(() => {
    // Initialize IndexedDB and seed with data if empty
    const setupApp = async () => {
      try {
        // Initialize the database
        await initDB();
        
        // Check if we need to initialize app with sample data
        // This would be handled differently in a real application
        // with actual backend sync, but for this example we'll
        // use local storage to track first-time initialization
        const isFirstRun = localStorage.getItem('appInitialized') !== 'true';
        if (isFirstRun) {
          // In a real app, we'd make API calls here to get user data
          // For this example, we'll add our sample data to IndexedDB
          
          // Add sample habits to IndexedDB
          // This would be handled by your API sync in a real app
          try {
            // Add sample habits - in a real app this would come from your server
            const db = await window.indexedDB.open('habitforge-db', 1);
            db.onsuccess = (event) => {
              const database = (event.target as IDBRequest).result;
              if (!database) {
                console.error('Failed to get IndexedDB result.');
                return;
              }
            
              const transaction = database.transaction(['habits'], 'readwrite');
              const store = transaction.objectStore('habits');
            
              initialHabits.forEach(habit => {
                store.put(habit);
              });
            
              localStorage.setItem('appInitialized', 'true');
              setIsInitialized(true);
            };            
          } catch (error) {
            console.error('Error seeding database:', error);
            setIsInitialized(true); // Still mark as initialized to prevent blocking UI
          }
        } else {
          setIsInitialized(true);
        }
      } catch (error) {
        console.error('Error during app initialization:', error);
        setIsInitialized(true); // Still mark as initialized to prevent blocking UI
      }
    };
    
    setupApp();
  }, []);
  
  // Handle dark mode
  useEffect(() => {
    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Check saved preference
    const savedMode = localStorage.getItem('darkMode');
    
    if (savedMode !== null) {
      setDarkMode(savedMode === 'true');
    } else {
      setDarkMode(prefersDark);
    }
  }, []);
  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-slate-100 dark:from-gray-900 dark:to-black">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-600 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">H</span>
          </div>
          <h1 className="text-xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
            HabitForge
          </h1>
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading your habits...</p>
        </div>
      </div>
    );
  }
  
  return (
    <PwaProvider>
      <div className="min-h-screen bg-gradient-to-br from-white to-slate-100 dark:from-gray-900 dark:to-black text-gray-900 dark:text-white transition-colors duration-200">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        
        <main className="max-w-lg mx-auto p-4 pb-24">
          {activeScreen === 'home' && <HomeScreen />}
          {activeScreen === 'check-in' && <CheckInScreen />}
          {activeScreen === 'analytics' && <AnalyticsScreen />}
          {activeScreen === 'notifications' && <NotificationsScreen />}
          {activeScreen === 'settings' && <SettingsScreen toggleDarkMode={toggleDarkMode} darkMode={darkMode} />}
        </main>
        
        <BottomNav activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
      </div>
    </PwaProvider>
  );
}