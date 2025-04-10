import { Moon, Sun } from 'lucide-react';

export const Navbar = ({ darkMode, toggleDarkMode }) => {
  return (
    <nav className="px-4 py-4 flex justify-between items-center bg-white dark:bg-gray-800 shadow-md">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
          HabitForge
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        <button 
          onClick={toggleDarkMode} 
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
          <span className="text-sm font-medium">JS</span>
        </div>
      </div>
    </nav>
  );
};
