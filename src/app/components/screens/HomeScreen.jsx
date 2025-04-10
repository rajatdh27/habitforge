import { useState, useEffect } from 'react';
import { HabitCard } from '../habit/HabitCard';
import { ProgressSummary } from '../habit/ProgressSummary';
import { Plus } from 'lucide-react';
import { OfflineLoader } from '../pwa/OfflineLoader';
import { habitDBOps, checkinDBOps } from '@/app/lib/pwa/indexedDB';

// Sample quotes
const quotes = [
  "Small daily improvements are the key to long-term success.",
  "Habits form the foundation of mastery.",
  "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
  "The only way to build a habit is to stick with it consistently.",
  "Don't count the days. Make the days count."
];

export const HomeScreen = () => {
  const [quote, setQuote] = useState("");
  
  // Get today's date
  const today = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-US', options);
  
  // Set a random quote
  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);
  
  // Toggle habit completion and save to IndexedDB
  const toggleHabit = async (habit, id) => {
    try {
      const updatedHabit = { 
        ...habit, 
        completed: !habit.completed, 
        progress: habit.completed ? habit.progress : 1 
      };
      
      // Update habit in IndexedDB
      await habitDBOps.update(updatedHabit);
      
      // Add check-in if completed
      if (!habit.completed) {
        await checkinDBOps.add({
          habitId: habit.id,
          date: new Date().toISOString(),
          completed: true
        });
      }
      
      // Request background sync if available
      if ('serviceWorker' in navigator && 'SyncManager' in window) {
        try {
          const registration = await navigator.serviceWorker.ready;
          await registration.sync.register('sync-habits');
        } catch (error) {
          console.log('Background sync could not be registered: ', error);
        }
      }
      
      return updatedHabit;
    } catch (error) {
      console.error('Error toggling habit:', error);
      throw error;
    }
  };
  
  // Render the actual content with loaded data
  const renderContent = (habits) => {
    // Calculate completed habits
    const completedHabits = habits.filter(habit => habit.completed).length;
    
    return (
      <div>
        <div className="mb-6">
          <p className="text-xl font-medium text-gray-500 dark:text-gray-400 mb-6">
            📅 {formattedDate}
          </p>
        </div>
        
        <ProgressSummary completed={completedHabits} total={habits.length} />
        
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">📌 Today's Habits</h2>
          <button className="p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
            <Plus size={20} />
          </button>
        </div>
        
        {habits.map(habit => (
          <HabitCard 
            key={habit.id} 
            habit={habit} 
            onToggle={() => toggleHabit(habit, habit.id)}
          />
        ))}
        
        <div className="mt-8 p-4 bg-indigo-50 dark:bg-gray-800 rounded-2xl">
          <p className="text-gray-700 dark:text-gray-300 text-center italic">
            💬 "{quote}"
          </p>
        </div>
      </div>
    );
  };
  
  // Fallback UI when offline and no data
  const offlineFallback = (
    <div className="p-6 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-center">
      <h2 className="text-xl font-bold mb-4">You're offline</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        HabitForge is designed to work offline, but we couldn't find any saved data.
      </p>
      <p className="text-gray-700 dark:text-gray-300">
        Please connect to the internet once to load your habits, then you can use the app offline anytime!
      </p>
    </div>
  );

  return (
    <OfflineLoader fallback={offlineFallback}>
      {(habits) => renderContent(habits || [])}
    </OfflineLoader>
  );
};