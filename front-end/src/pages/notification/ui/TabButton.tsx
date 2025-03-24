import React from 'react';

interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  label: string;
}

const TabButton: React.FC<TabButtonProps> = ({ isActive, onClick, label }) => {
  return (
    <button
      className={`flex-1 py-3 text-center ${
        isActive ? 'border-b-3 border-[#CFE7B5] font-medium' : 'text-gray-500'
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default TabButton;