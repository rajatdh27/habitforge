'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data for the charts
const weeklyData = [
  { name: 'Mon', completed: 4, total: 4 },
  { name: 'Tue', completed: 3, total: 4 },
  { name: 'Wed', completed: 2, total: 4 },
  { name: 'Thu', completed: 4, total: 4 },
  { name: 'Fri', completed: 3, total: 4 },
  { name: 'Sat', completed: 1, total: 4 },
  { name: 'Sun', completed: 2, total: 4 },
];

// Habit performance data
const habitPerformance = [
  { id: 1, name: 'Morning Meditation', completionRate: 0.8 },
  { id: 2, name: 'Read 30 minutes', completionRate: 0.7 },
  { id: 3, name: 'Workout', completionRate: 0.5 },
  { id: 4, name: 'Drink 8 glasses of water', completionRate: 0.9 },
];

export const AnalyticsScreen = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Analytics</h1>
      
      <div className="card bg-white dark:bg-gray-800 mb-6">
        <h2 className="text-lg font-semibold mb-4">Overall Completion</h2>
        
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none',
                  borderRadius: '0.5rem',
                  color: '#F3F4F6' 
                }}
              />
              <Bar 
                dataKey="completed" 
                name="Completed"
                fill="#4F46E5" 
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="card bg-white dark:bg-gray-800 mb-6">
        <h2 className="text-lg font-semibold mb-2">Streak Summary</h2>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-indigo-50 dark:bg-gray-700 p-3 rounded-xl">
            <p className="text-gray-500 dark:text-gray-400 text-sm">Longest Streak</p>
            <p className="text-2xl font-bold">20 days</p>
          </div>
          
          <div className="bg-indigo-50 dark:bg-gray-700 p-3 rounded-xl">
            <p className="text-gray-500 dark:text-gray-400 text-sm">Current Streak</p>
            <p className="text-2xl font-bold">12 days</p>
          </div>
          
          <div className="bg-indigo-50 dark:bg-gray-700 p-3 rounded-xl">
            <p className="text-gray-500 dark:text-gray-400 text-sm">Completion Rate</p>
            <p className="text-2xl font-bold">85%</p>
          </div>
          
          <div className="bg-indigo-50 dark:bg-gray-700 p-3 rounded-xl">
            <p className="text-gray-500 dark:text-gray-400 text-sm">Perfect Days</p>
            <p className="text-2xl font-bold">14 days</p>
          </div>
        </div>
      </div>
      
      <h2 className="text-lg font-semibold mb-4">Habit Performance</h2>
      
      {habitPerformance.map(habit => (
        <div key={habit.id} className="card bg-white dark:bg-gray-800 mb-3 cursor-pointer hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">{habit.name}</h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {Math.round(habit.completionRate * 100)}%
            </span>
          </div>
          
          <div className="progress-bar mt-2">
            <div 
              className="progress-fill" 
              style={{ width: `${habit.completionRate * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
