import React from 'react';

interface ErrorDisplayProps {
  message: string;
  onRetry?: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onRetry }) => {
  return (
    <div className="bg-red-900/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg relative my-8" role="alert">
      <div className="flex justify-between items-center">
        <div>
          <strong className="font-bold">An error occurred: </strong>
          <span className="block sm:inline">{message}</span>
        </div>
        {onRetry && (
            <button 
                onClick={onRetry}
                className="bg-red-500/50 hover:bg-red-500/70 text-white font-bold py-2 px-4 rounded-lg transition-colors ml-4"
            >
                Try Again
            </button>
        )}
      </div>
    </div>
  );
};

export default ErrorDisplay;