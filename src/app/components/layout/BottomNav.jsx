import { Home, CheckCircle, BarChart2, Bell, Settings } from 'lucide-react';

export const BottomNav = ({ activeScreen, setActiveScreen }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg h-16">
      <div className="max-w-lg mx-auto h-full flex items-center justify-around">
        <NavButton 
          icon={<Home size={24} />} 
          label="Home" 
          isActive={activeScreen === 'home'} 
          onClick={() => setActiveScreen('home')}
        />
        <NavButton 
          icon={<CheckCircle size={24} />} 
          label="Check In" 
          isActive={activeScreen === 'check-in'} 
          onClick={() => setActiveScreen('check-in')}
        />
        <NavButton 
          icon={<BarChart2 size={24} />} 
          label="Analytics" 
          isActive={activeScreen === 'analytics'} 
          onClick={() => setActiveScreen('analytics')}
        />
        <NavButton 
          icon={<Bell size={24} />} 
          label="Notifications" 
          isActive={activeScreen === 'notifications'} 
          onClick={() => setActiveScreen('notifications')}
        />
        <NavButton 
          icon={<Settings size={24} />} 
          label="Settings" 
          isActive={activeScreen === 'settings'} 
          onClick={() => setActiveScreen('settings')}
        />
      </div>
    </div>
  );
};

const NavButton = ({ icon, label, isActive, onClick }) => {
  return (
    <button 
      className={`flex flex-col items-center justify-center w-16 py-1 ${
        isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'
      }`}
      onClick={onClick}
      aria-label={label}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
};
