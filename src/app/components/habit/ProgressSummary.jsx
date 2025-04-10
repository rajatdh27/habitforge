export const ProgressSummary = ({ completed, total }) => {
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return (
      <div className="card bg-white dark:bg-gray-800 mb-6">
        <h2 className="text-lg font-semibold mb-2">Today's Progress</h2>
        <p className="mb-2 text-gray-700 dark:text-gray-300">
          {completed}/{total} habits completed
        </p>
        <div className="progress-bar h-2">
          <div 
            className="progress-fill" 
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="text-right text-sm text-gray-500 dark:text-gray-400 mt-1">
          {percentage}%
        </p>
      </div>
    );
  };
  