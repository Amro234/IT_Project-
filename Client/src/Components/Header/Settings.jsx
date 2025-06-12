import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUserEdit, FaBell, FaLock, FaPalette, FaLanguage } from 'react-icons/fa'; // أيقونات من react-icons

const Settings = () => {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
    document.body.className = e.target.value === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark';
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Account Settings</h1>
      <p className="text-lg text-gray-600 mb-8">Manage your preferences and personalize your experience.</p>

      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-8 space-y-6">
        {/* Theme Settings */}
        <div className="border-b pb-4">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center mb-4"><FaPalette className="mr-2 text-blue-500" /> Appearance</h2>
          <p className="text-gray-600 mb-4">Choose your preferred theme for the application.</p>
          <div className="flex space-x-4">
            <button
              onClick={() => handleThemeChange({ target: { value: 'light' } })}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${theme === 'light' ? 'bg-blue-500 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              Light Theme
            </button>
            <button
              onClick={() => handleThemeChange({ target: { value: 'dark' } })}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${theme === 'dark' ? 'bg-blue-500 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              Dark Theme
            </button>
          </div>
        </div>

        {/* Language Settings */}
        <div className="border-b pb-4">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center mb-4"><FaLanguage className="mr-2 text-blue-500" /> Language</h2>
          <p className="text-gray-600 mb-4">Select your preferred language.</p>
          <select
            className="mt-1 block w-full max-w-xs rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            value={language}
            onChange={handleLanguageChange}
          >
            <option value="en">English</option>
            <option value="ar">العربية</option>
          </select>
        </div>

        {/* Other Settings Placeholder */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center mb-4"><FaUserEdit className="mr-2 text-blue-500" /> Other Settings</h2>
          <p className="text-gray-600">Explore more settings related to your account, notifications, and security.</p>
          <div className="mt-4 flex flex-wrap gap-4">
            <button className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-300">Notification Preferences</button>
            <button className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-300">Privacy Controls</button>
            <button className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-300">Security Options</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;