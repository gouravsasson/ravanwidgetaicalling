import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  onClick, 
  children,
  icon,
  className = "",
  type = "button",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`relative px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-full 
        font-medium text-base flex items-center justify-center gap-2 transition-all
        shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-1 
        hover:scale-[1.02] active:scale-[0.98] active:translate-y-0 overflow-hidden
        ${className}`}
    >
      {/* Subtle radial gradient overlay */}
      <div className="absolute top-0 left-0 w-full h-full opacity-0 hover:opacity-100 
        bg-radial-gradient transition-opacity duration-300"></div>
      
      {icon && <span className="flex items-center justify-center">{icon}</span>}
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default Button;