import React from 'react';

interface ActivityItemProps {
  type: 'user_signup' | 'service_inquiry' | 'system';
  description: string;
  timestamp: string;
  email?: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({
  type,
  description,
  timestamp,
  email
}) => {
  const getTypeStyles = () => {
    switch (type) {
      case 'user_signup':
        return {
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-600',
          icon: (
            <svg className="w-4 h-4\" fill="none\" stroke="currentColor\" viewBox="0 0 24 24">
              <path strokeLinecap="round\" strokeLinejoin="round\" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          )
        };
      case 'service_inquiry':
        return {
          bgColor: 'bg-green-100',
          textColor: 'text-green-600',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          )
        };
      case 'system':
        return {
          bgColor: 'bg-purple-100',
          textColor: 'text-purple-600',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
          )
        };
      default:
        return {
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-600',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        };
    }
  };

  const { bgColor, textColor, icon } = getTypeStyles();

  return (
    <div className="flex items-start space-x-3 fade-in">
      <div className={`p-1 rounded-full ${bgColor}`}>
        <div className={textColor}>{icon}</div>
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{description}</p>
        {email && <p className="text-sm text-gray-500">{email}</p>}
        <p className="text-xs text-gray-400 mt-1">{timestamp}</p>
      </div>
    </div>
  );
};

export default ActivityItem;