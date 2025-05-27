import React, { useState } from 'react';

interface SettingsSection {
  id: string;
  title: string;
  description: string;
}

const Settings: React.FC = () => {
  const [activeSection, setActiveSection] = useState('general');
  
  const sections: SettingsSection[] = [
    {
      id: 'general',
      title: 'General Settings',
      description: 'Configure general application settings'
    },
    {
      id: 'security',
      title: 'Security',
      description: 'Update security and authentication settings'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'Manage notification preferences'
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your application settings and preferences</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-64 bg-white rounded-lg shadow">
          <nav className="p-4">
            <ul className="space-y-1">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      activeSection === section.id
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="block text-sm font-medium">{section.title}</span>
                    {activeSection === section.id && (
                      <span className="block text-xs mt-1">{section.description}</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex-1 bg-white rounded-lg shadow p-6">
          {activeSection === 'general' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">General Settings</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Site Name
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  defaultValue="Portfoliozz Admin"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Email
                </label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  defaultValue="admin@portfoliozz.com"
                />
              </div>

              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Save Changes
              </button>
            </div>
          )}

          {activeSection === 'security' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Security Settings</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Change Password
                </label>
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2"
                  placeholder="Current Password"
                />
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2"
                  placeholder="New Password"
                />
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Confirm New Password"
                />
              </div>

              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Update Password
              </button>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Notification Settings</h2>
              
              <div className="space-y-4">
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox" defaultChecked />
                  <span className="ml-2 text-sm text-gray-700">Email Notifications</span>
                </label>
                
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox" defaultChecked />
                  <span className="ml-2 text-sm text-gray-700">Push Notifications</span>
                </label>
              </div>

              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Save Preferences
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;