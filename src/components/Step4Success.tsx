import React from 'react';
import { StepProps } from '../types';
import Button from './Button';
import { RotateCcw } from 'lucide-react';

const Step4Success: React.FC<StepProps> = ({ userData, setUserData, onNext }) => {
  // Business categories (same as in previous steps)
  const categories = [
    'Real Estate',
    'E-commerce',
    'Professional Services',
    'Healthcare',
    'Financial Services',
    'SaaS & Technology',
    'Education',
    'Hospitality',
    'Manufacturing',
    'Retail'
  ];

  return (
    <div className="max-w-xl mx-auto text-center">
      {/* Success icon */}
      <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex justify-center items-center shadow-xl shadow-green-500/25 mx-auto mb-8 relative overflow-hidden animate-success-pulse">
        {/* Checkmark */}
        <div className="w-14 h-8 border-b-[8px] border-l-[8px] border-white transform -rotate-45 translate-y-[-5px] translate-x-[5px] shadow-sm"></div>
        
        {/* Radial gradient overlay */}
        <div className="absolute w-full h-full bg-radial-gradient-white"></div>
      </div>
      
      <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600">
        Complete!
      </h2>
      
      <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-lg mx-auto">
        You've just witnessed how Ravan.ai can transform your website visitors into qualified 
        leads and booked appointments using our revolutionary AI technology.
      </p>
      
      <div className="w-full bg-gradient-to-br from-white to-gray-50 border border-gray-100 rounded-3xl p-7 shadow-lg mb-8">
        <h3 className="text-2xl font-semibold text-primary mb-4">What happens next?</h3>
        <p className="text-lg text-gray-700 leading-relaxed">
          One of our AI solution specialists will contact you shortly to discuss how we can 
          implement this technology for your {categories[userData.selectedCategory] || 'business'} and
          answer any questions you may have.
        </p>
      </div>
      
      <Button 
        onClick={onNext} 
        icon={<RotateCcw size={18} />}
        className="mx-auto"
      >
        Try Another Business Type
      </Button>
    </div>
  );
};

export default Step4Success;