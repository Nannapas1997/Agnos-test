import React, { useState } from 'react';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

interface DarkModeToggleProps {

  initialValue?: boolean;

  onToggle?: (isValue: boolean) => void;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({
  initialValue = true, 
  onToggle,
}) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(initialValue);

  const handleToggle = () => {
    const newValue = !isDarkMode;
    setIsDarkMode(newValue);
    if (onToggle) {
      onToggle(newValue);
    }
  };

  return (

    <button
      onClick={handleToggle}
      type="button"
      role="switch"
      aria-checked={isDarkMode}
      aria-label="Toggle Dark Mode"
      className={`
        group flex items-center cursor-pointer select-none
        rounded-full p-1 pr-3
        transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
        ${isDarkMode ? 'bg-black text-white' : 'bg-gray-200 text-gray-800'}
      `}
    >
      <div
        className={`
          flex items-center justify-center rounded-full p-1 mr-2 shadow-sm transition-transform duration-300
          ${isDarkMode ? 'bg-white text-black' : 'bg-white text-yellow-500'}
        `}
      >
        {isDarkMode ? (
           // ไอคอนพระจันทร์จาก MUI
           // ใช้ className ของ tailwind กำหนดขนาดให้พอดี (w-4 h-4 หรือ w-5 h-5)
          <DarkModeIcon className="w-4 h-4" />
        ) : (
          <LightModeIcon className="w-4 h-4" />
        )}
      </div>
      <span className="text-xs font-medium tracking-wide">
        {isDarkMode ? 'Dark Mode' : 'Light Mode'}
      </span>
    </button>
  );
};

export default DarkModeToggle;