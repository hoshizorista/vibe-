
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', size = 'md', className, ...props }) => {
  const baseStyles = "font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150";
  
  let variantStyles = "";
  switch (variant) {
    case 'primary':
      variantStyles = "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500";
      break;
    case 'secondary':
      variantStyles = "bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-400";
      break;
    case 'danger':
      variantStyles = "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500";
      break;
    case 'ghost':
      variantStyles = "bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-gray-300";
      break;
  }

  let sizeStyles = "";
  switch (size) {
    case 'sm':
      sizeStyles = "px-2.5 py-1.5 text-xs";
      break;
    case 'md':
      sizeStyles = "px-4 py-2 text-sm";
      break;
    case 'lg':
      sizeStyles = "px-6 py-3 text-base";
      break;
  }

  return (
    <button
      {...props}
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className || ''}`}
    >
      {children}
    </button>
  );
};

export default Button;
    