// This is our main application component that handles routing between screens
'use client';

import { useState, useEffect } from 'react';
//import { useRouter } from 'next/navigation';
import { HomeScreen } from './components/screens/HomeScreen';
import { CheckInScreen } from './components/screens/CheckInScreen';
import { AnalyticsScreen } from './components/screens/AnalyticsScreen';
import { NotificationsScreen } from './components/screens/NotificationsScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';
import { Navbar } from './components/layout/Navbar';
import { BottomNav } from './components/layout/BottomNav';

export default function Home() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  
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
  
  return (
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
  );
}
