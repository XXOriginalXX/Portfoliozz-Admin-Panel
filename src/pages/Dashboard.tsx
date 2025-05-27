import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, LayoutDashboard, Users, BarChart2, HelpCircle } from 'lucide-react';
import StatCard from '../components/StatCard';
import ActivityItem from '../components/ActivityItem';
import QuickAction from '../components/QuickAction';
import SystemStatusCard from '../components/SystemStatusCard';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const stats = {
    totalServices: 12,
    activeServices: 8,
    totalUsers: 156,
    recentUsers: 23
  };

  const recentActivity = [
    {
      id: '1',
      type: 'user_signup' as const,
      description: 'New user registered',
      timestamp: '2 minutes ago',
      email: 'user@example.com'
    },
    {
      id: '2',
      type: 'service_inquiry' as const,
      description: 'New service inquiry',
      timestamp: '1 hour ago'
    },
    {
      id: '3',
      type: 'system' as const,
      description: 'System update completed',
      timestamp: '3 hours ago'
    }
  ];

  const systemServices = [
    { name: 'Database', status: 'operational' as const },
    { name: 'API Services', status: 'operational' as const },
    { name: 'Website', status: 'operational' as const }
  ];

  return (
    <div className="p-6 fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your Portfoliozz platform.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Services" 
          value={stats.totalServices} 
          icon={<Package size={24} />} 
          bgColor="bg-blue-100" 
          textColor="text-blue-600" 
        />
        <StatCard 
          title="Active Services" 
          value={stats.activeServices} 
          icon={<LayoutDashboard size={24} />} 
          bgColor="bg-green-100" 
          textColor="text-green-600" 
        />
        <StatCard 
          title="Total Users" 
          value={stats.totalUsers} 
          icon={<Users size={24} />} 
          bgColor="bg-purple-100" 
          textColor="text-purple-600" 
        />
        <StatCard 
          title="New Users (30d)" 
          value={stats.recentUsers} 
          icon={<BarChart2 size={24} />} 
          bgColor="bg-yellow-100" 
          textColor="text-yellow-600" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <ActivityItem 
                  key={activity.id}
                  type={activity.type}
                  description={activity.description}
                  timestamp={activity.timestamp}
                  email={activity.email}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <QuickAction 
                title="Add New Service"
                description="Create a new trading service"
                icon={<Package size={20} />}
                bgColor="bg-blue-100"
                textColor="text-blue-600"
                onClick={() => navigate('/services')}
              />
              <QuickAction 
                title="View Analytics"
                description="Check performance metrics"
                icon={<BarChart2 size={20} />}
                bgColor="bg-green-100"
                textColor="text-green-600"
                onClick={() => {}}
              />
              <QuickAction 
                title="Manage Users"
                description="View and manage user accounts"
                icon={<Users size={20} />}
                bgColor="bg-purple-100"
                textColor="text-purple-600"
                onClick={() => navigate('/users')}
              />
              <QuickAction 
                title="Support Tickets"
                description="Handle customer inquiries"
                icon={<HelpCircle size={20} />}
                bgColor="bg-yellow-100"
                textColor="text-yellow-600"
                onClick={() => {}}
              />
            </div>
          </div>
        </div>
      </div>

      <SystemStatusCard services={systemServices} />
    </div>
  );
};

export default Dashboard;