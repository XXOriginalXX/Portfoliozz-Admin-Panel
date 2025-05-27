import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  bgColor, 
  textColor 
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 card-hover">
      <div className="flex items-center">
        <div className={`p-2 ${bgColor} rounded-lg`}>
          <div className={`${textColor}`}>{icon}</div>
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;