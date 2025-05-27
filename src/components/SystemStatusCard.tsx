import React from 'react';

interface StatusItemProps {
  name: string;
  status: 'operational' | 'degraded' | 'outage';
}

const StatusItem: React.FC<StatusItemProps> = ({ name, status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'operational':
        return {
          bgColor: 'bg-green-100',
          dotColor: 'bg-green-500',
          text: 'Operational'
        };
      case 'degraded':
        return {
          bgColor: 'bg-yellow-100',
          dotColor: 'bg-yellow-500',
          text: 'Degraded'
        };
      case 'outage':
        return {
          bgColor: 'bg-red-100',
          dotColor: 'bg-red-500',
          text: 'Outage'
        };
      default:
        return {
          bgColor: 'bg-gray-100',
          dotColor: 'bg-gray-500',
          text: 'Unknown'
        };
    }
  };

  const { bgColor, dotColor, text } = getStatusStyles();

  return (
    <div className="flex items-center">
      <div className={`p-2 ${bgColor} rounded-lg`}>
        <div className={`w-3 h-3 ${dotColor} rounded-full`}></div>
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-900">{name}</p>
        <p className="text-xs text-gray-500">{text}</p>
      </div>
    </div>
  );
};

interface SystemStatusCardProps {
  services: {
    name: string;
    status: 'operational' | 'degraded' | 'outage';
  }[];
}

const SystemStatusCard: React.FC<SystemStatusCardProps> = ({ services }) => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">System Status</h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <StatusItem 
              key={index} 
              name={service.name} 
              status={service.status} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SystemStatusCard;