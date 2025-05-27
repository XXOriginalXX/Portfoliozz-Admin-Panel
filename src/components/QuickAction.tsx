import React from 'react';

interface QuickActionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
  onClick: () => void;
}

const QuickAction: React.FC<QuickActionProps> = ({
  title,
  description,
  icon,
  bgColor,
  textColor,
  onClick
}) => {
  return (
    <button 
      className="w-full flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors card-hover"
      onClick={onClick}
    >
      <div className={`p-2 ${bgColor} rounded-lg`}>
        <div className={textColor}>{icon}</div>
      </div>
      <div className="ml-4 text-left">
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
    </button>
  );
};

export default QuickAction;