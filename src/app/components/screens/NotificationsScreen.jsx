const notifications = [
    { 
      id: 1, 
      type: 'reminder', 
      title: 'Reminder: Meditation', 
      message: 'Time to meditate!', 
      time: '2h ago', 
      date: 'today' 
    },
    { 
      id: 2, 
      type: 'streak', 
      title: 'Streak milestone!', 
      message: '10-day streak on Reading habit', 
      time: '4h ago', 
      date: 'today' 
    },
    { 
      id: 3, 
      type: 'summary', 
      title: 'Weekly Summary', 
      message: 'Check your progress', 
      time: '1d ago', 
      date: 'yesterday' 
    },
    { 
      id: 4, 
      type: 'missed', 
      title: 'Missed habit: Workout', 
      message: "Don't break the streak!", 
      time: '1d ago', 
      date: 'yesterday' 
    },
  ];
  
  export const NotificationsScreen = () => {
    // Group notifications by date
    const notificationsByDate = notifications.reduce((groups, notification) => {
      if (!groups[notification.date]) {
        groups[notification.date] = [];
      }
      groups[notification.date].push(notification);
      return groups;
    }, {});
    
    return (
      <>
      <div>
        <h1 className="text-2xl font-bold mb-6">Notifications</h1>
        
        {Object.entries(notificationsByDate).map(([date, items]) => (
          <div key={date}>
            <h2 className="text-lg font-medium mb-3 capitalize">{date}</h2>
            
            {items.map(notification => (
              <div 
                key={notification.id} 
                className="card bg-white dark:bg-gray-800 mb-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-start">
                  <div className="mr-3 mt-1">
                    {notification.type === 'reminder' && <span className="text-xl">🔔</span>}
                    {notification.type === 'streak' && <span className="text-xl">🔥</span>}
                    {notification.type === 'summary' && <span className="text-xl">📊</span>}
                    {notification.type === 'missed' && <span className="text-xl">⚠️</span>}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold">{notification.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {notification.message}
                    </p>
                  </div>
                  
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {notification.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
        
        <div className="mt-6">
          <div className="card bg-white dark:bg-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-medium">Manage Notifications</span>
              <span className="text-gray-400">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </span>
            </div>
          </div>
        </div>
          
          <div className="card bg-white dark:bg-gray-800 mb-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="mr-3 text-xl">🇺🇸</span>
                <span>Language</span>
              </div>
              <span className="text-gray-400">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </span>
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
        </div>
        
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-3">Data</h2>
          
          <div className="card bg-white dark:bg-gray-800 mb-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="mr-3 text-xl">💾</span>
                <span>Export Data</span>
              </div>
              <span className="text-gray-400">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </span>
            </div>
          </div>
          
          <div className="card bg-white dark:bg-gray-800 mb-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="mr-3 text-xl text-red-500">🗑️</span>
                <span className="text-red-500">Delete Account</span>
              </div>
              <span className="text-gray-400">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </span>
            </div>
          </div>
        </div>
        
        <div className="text-center text-gray-500 dark:text-gray-400 text-sm mb-8">
          Version 1.0.0
        </div>
      </>
    );
  };
  