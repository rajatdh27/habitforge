import { useState, useEffect } from 'react';
import { HabitCard } from '../habit/HabitCard';
import { ProgressSummary } from '../habit/ProgressSummary';
import { Plus } from 'lucide-react';

// Sample data - in a real app, this would come from an API or context
const initialHabits = [
  { id: 1, name: 'Morning Meditation', streak: 12, frequency: 'daily', completed: false, progress: 0.75 },
  { id: 2, name: 'Read 30 minutes', streak: 5, frequency: 'daily', completed: true, progress: 1 },
  { id: 3, name: 'Workout', streak: 8, frequency: 'weekly', completed: false, progress: 0.5 },
  { id: 4, name: 'Drink 8 glasses of water', streak: 20, frequency: 'daily', completed: false, progress: 0.25 },
];

const quotes = [
  "Small daily improvements are the key to long-term success.",
  "Habits form the foundation of mastery.",
  "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
  "The only way to build a habit is to stick with it consistently.",
  "Don't count the days. Make the days count."
];

export const HomeScreen = () => {
  const [habits, setHabits] = useState(initialHabits);
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
  
  // Toggle habit completion
  const toggleHabit = (id) => {
    setHabits(habits.map(habit => 
      habit.id === id 
        ? { ...habit, completed: !habit.completed, progress: habit.completed ? habit.progress : 1 } 
        : habit
    ));
  };
  
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
          onToggle={toggleHabit}
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
