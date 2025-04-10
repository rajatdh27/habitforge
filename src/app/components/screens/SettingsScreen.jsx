// File: components/screens/SettingsScreen.jsx
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

export const SettingsScreen = ({ darkMode, toggleDarkMode }) => {
  const [language, setLanguage] = useState('English');
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-3">Profile</h2>
        
        <div className="card bg-white dark:bg-gray-800 mb-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="mr-3 text-xl">👤</span>
              <span>Account Details</span>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>
        </div>
        
        <div className="card bg-white dark:bg-gray-800 mb-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="mr-3 text-xl">🔑</span>
              <span>Change Password</span>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-3">Appearance</h2>
        
        <div className="card bg-white dark:bg-gray-800 mb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="mr-3 text-xl">
                {darkMode ? '🌙' : '☀️'}
              </span>
              <span>Dark Mode</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={darkMode}
                onChange={toggleDarkMode}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        </div>
        
        <div className="card bg-white dark:bg-gray-800 mb-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="mr-3 text-xl">🇺🇸</span>
              <span>Language</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-500 dark:text-gray-400 mr-2">{language}</span>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-3">Notifications</h2>
        
        <div className="card bg-white dark:bg-gray-800 mb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="mr-3 text-xl">🔔</span>
              <span>Push Notifications</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        </div>
        
        <div className="card bg-white dark:bg-gray-800 mb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="mr-3 text-xl">📧</span>
              <span>Email Notifications</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        </div>
        
        <div className="card bg-white dark:bg-gray-800 mb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="mr-3 text-xl">⏰</span>
              <span>Habit Reminders</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-3">Data</h2>
        
        <div className="card bg-white dark:bg-gray-800 mb-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="mr-3 text-xl">💾</span>
              <span>Export Data</span>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>
        </div>
        
        <div className="card bg-white dark:bg-gray-800 mb-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="mr-3 text-xl text-red-500">🗑️</span>
              <span className="text-red-500">Delete Account</span>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-3">App Information</h2>
        
        <div className="card bg-white dark:bg-gray-800 mb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="mr-3 text-xl">ℹ️</span>
              <span>Version</span>
            </div>
            <span className="text-gray-500 dark:text-gray-400">1.0.0</span>
          </div>
        </div>
        
        <div className="card bg-white dark:bg-gray-800 mb-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="mr-3 text-xl">📋</span>
              <span>Terms of Service</span>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>
        </div>
        
        <div className="card bg-white dark:bg-gray-800 mb-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="mr-3 text-xl">🔒</span>
              <span>Privacy Policy</span>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>
        </div>
      </div>
      
      <button className="w-full py-3 text-red-500 font-medium mb-8">
        Log Out
      </button>
    </div>
  );
};

export default SettingsScreen;