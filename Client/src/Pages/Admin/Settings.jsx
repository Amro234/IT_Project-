import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Globe, Moon, Sun, Save, Lock, Shield, CreditCard, Calendar, MapPin } from 'lucide-react';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    language: 'en',
    theme: 'light',
    notifications: {
      email: true,
      push: true,
      bookingUpdates: true,
      specialOffers: true,
      tourReminders: true,
    },
    privacy: {
      profileVisibility: 'public',
      showLastSeen: true,
      showLocation: false,
    },
    security: {
      twoFactorAuth: false,
      loginAlerts: true,
    },
    payment: {
      defaultCurrency: 'USD',
      autoSaveCards: true,
    },
    booking: {
      defaultView: 'list',
      showPricesIn: 'USD',
      autoConfirm: false,
    }
  });

  const handleChange = (category, field, value) => {
    if (category === 'notifications' || category === 'privacy' || category === 'security' || 
        category === 'payment' || category === 'booking') {
      setSettings(prev => ({
        ...prev,
        [category]: {
          ...prev[category],
          [field]: value
        }
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSave = () => {
    // Add your save logic here
    console.log('Settings saved:', settings);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
          <p className="text-gray-600 mt-2">Customize your EasyGo experience</p>
        </div>

        <div className="space-y-6">
          {/* Language Settings */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-4">
              <Globe className="w-5 h-5 text-blue-500 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Language & Region</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                <select
                  value={settings.language}
                  onChange={(e) => handleChange('general', 'language', e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="en">English</option>
                  <option value="ar">Arabic</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="es">Spanish</option>
                </select>
              </div>
            </div>
          </div>

          {/* Theme Settings */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-4">
              <Moon className="w-5 h-5 text-blue-500 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Appearance</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleChange('general', 'theme', 'light')}
                    className={`flex items-center px-4 py-2 rounded-lg ${
                      settings.theme === 'light' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    <Sun className="w-4 h-4 mr-2" />
                    Light
                  </button>
                  <button
                    onClick={() => handleChange('general', 'theme', 'dark')}
                    className={`flex items-center px-4 py-2 rounded-lg ${
                      settings.theme === 'dark' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    <Moon className="w-4 h-4 mr-2" />
                    Dark
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-4">
              <Bell className="w-5 h-5 text-blue-500 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Notifications</h2>
            </div>
            <div className="space-y-4">
              {Object.entries(settings.notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">
                      {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {key === 'email' ? 'Receive updates via email' :
                       key === 'push' ? 'Receive push notifications on your device' :
                       key === 'bookingUpdates' ? 'Get notified about your booking status' :
                       key === 'specialOffers' ? 'Receive notifications about special deals' :
                       'Get reminders about upcoming tours'}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => handleChange('notifications', key, e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-4">
              <Lock className="w-5 h-5 text-blue-500 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Privacy</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Profile Visibility</label>
                <select
                  value={settings.privacy.profileVisibility}
                  onChange={(e) => handleChange('privacy', 'profileVisibility', e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="public">Public</option>
                  <option value="friends">Friends Only</option>
                  <option value="private">Private</option>
                </select>
              </div>
              {Object.entries(settings.privacy).filter(([key]) => key !== 'profileVisibility').map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">
                      {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {key === 'showLastSeen' ? 'Display when you were last active' :
                       'Share your current location with friends'}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => handleChange('privacy', key, e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-4">
              <Shield className="w-5 h-5 text-blue-500 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Security</h2>
            </div>
            <div className="space-y-4">
              {Object.entries(settings.security).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">
                      {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {key === 'twoFactorAuth' ? 'Add an extra layer of security to your account' :
                       'Get notified when someone logs into your account'}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => handleChange('security', key, e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Settings */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-4">
              <CreditCard className="w-5 h-5 text-blue-500 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Payment</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Default Currency</label>
                <select
                  value={settings.payment.defaultCurrency}
                  onChange={(e) => handleChange('payment', 'defaultCurrency', e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="EGP">EGP - Egyptian Pound</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Auto-save Payment Methods</h3>
                  <p className="text-sm text-gray-500">Save your payment methods for faster checkout</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.payment.autoSaveCards}
                    onChange={(e) => handleChange('payment', 'autoSaveCards', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Booking Settings */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-4">
              <Calendar className="w-5 h-5 text-blue-500 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Booking Preferences</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Default View</label>
                <select
                  value={settings.booking.defaultView}
                  onChange={(e) => handleChange('booking', 'defaultView', e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="list">List View</option>
                  <option value="grid">Grid View</option>
                  <option value="calendar">Calendar View</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Show Prices In</label>
                <select
                  value={settings.booking.showPricesIn}
                  onChange={(e) => handleChange('booking', 'showPricesIn', e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="EGP">EGP - Egyptian Pound</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Auto-confirm Bookings</h3>
                  <p className="text-sm text-gray-500">Automatically confirm bookings without review</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.booking.autoConfirm}
                    onChange={(e) => handleChange('booking', 'autoConfirm', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg flex items-center hover:bg-blue-600 transition-colors duration-200"
            >
              <Save className="w-5 h-5 mr-2" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 