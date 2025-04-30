import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex justify-center w-3/5 max-w-md mx-auto gap-3 relative">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div key={index} className="flex-1 relative h-1">
          <div 
            className={`h-full rounded-full transition-all duration-500 ease-out
              ${index <= currentStep ? 'bg-primary' : 'bg-gray-200'}`}
          ></div>
          <div 
            className={`absolute w-7 h-7 bg-white rounded-full flex items-center justify-center 
              -top-3 left-1/2 -translate-x-1/2 text-xs font-medium border transition-all duration-500
              ${index <= currentStep 
                ? 'bg-primary text-white border-primary shadow-md shadow-primary/20 scale-110' 
                : 'text-gray-400 border-gray-200'}`}>
            {index < currentStep ? (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12L10 17L19 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              index + 1
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;