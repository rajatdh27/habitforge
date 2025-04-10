import { useState } from 'react';
import { HabitCard } from '../habit/HabitCard';

// Sample data - would come from context or API in a real app
const initialHabits = [
  { id: 1, name: 'Morning Meditation', streak: 12, frequency: 'daily', completed: false, progress: 0.75 },
  { id: 2, name: 'Read 30 minutes', streak: 5, frequency: 'daily', completed: true, progress: 1 },
  { id: 3, name: 'Workout', streak: 8, frequency: 'weekly', completed: false, progress: 0.5 },
  { id: 4, name: 'Drink 8 glasses of water', streak: 20, frequency: 'daily', completed: false, progress: 0.25 },
];

export const CheckInScreen = () => {
  const [habits, setHabits] = useState(initialHabits);
  
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
      <h1 className="text-2xl font-bold mb-6">Check In</h1>
      
      <div className="text-center mb-8">
        <div className="text-4xl font-bold mb-2">
          {completedHabits}/{habits.length}
        </div>
        <p className="text-gray-600 dark:text-gray-400">habits completed today</p>
      </div>
      
      {habits.map(habit => (
        <HabitCard 
          key={habit.id} 
          habit={habit} 
          onToggle={toggleHabit}
        />
      ))}
      
      {completedHabits === habits.length && (
        <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-2xl text-center">
          <p className="text-green-700 dark:text-green-400 font-medium">
            🎉 Congratulations! You've completed all your habits for today!
          </p>
        </div>
      )}
    </div>
  );
};
