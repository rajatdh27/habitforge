import { useState } from 'react';
import { CheckCircle, Circle } from 'lucide-react';

export const HabitCard = ({ habit, onToggle }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleToggle = () => {
    setIsAnimating(true);
    onToggle(habit.id);
    
    // Reset animation state
    setTimeout(() => setIsAnimating(false), 600);
  };
  
  return (
    <div className="habit-card">
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-base">{habit.name}</h3>
          <div className="flex items-center">
            <span className="flex items-center text-amber-500 mr-2">
              🔥 <span className="ml-1 text-sm">{habit.streak}</span>
            </span>
          </div>
        </div>
        
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${habit.progress * 100}%` }}
          />
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {Math.round(habit.progress * 100)}%
        </div>
      </div>
      
      <button 
        onClick={handleToggle}
        className={`ml-4 p-1 rounded-full text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ${
          isAnimating ? 'animate-pulse' : ''
        }`}
        aria-label={habit.completed ? "Mark as incomplete" : "Mark as complete"}
      >
        {habit.completed ? (
          <CheckCircle className="text-indigo-600 dark:text-indigo-400" size={32} />
        ) : (
          <Circle size={32} />
        )}
      </button>
    </div>
  );
};

// File: components/habit/ProgressSummary.jsx
