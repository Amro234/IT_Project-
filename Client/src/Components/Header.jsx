import React from 'react';
import { 
  FiEdit2, 
  FiMoon, 
  FiFlag, 
  FiSettings, 
  FiSearch  ,
  FiBell ,
} from 'react-icons/fi';

const Header = () => {
  return (
    <header className="w-full bg-white shadow-sm mb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Avatar and Name */}
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-600 text-lg font-semibold">A</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Abdo</h2>
              <p className="text-sm text-gray-500">Description</p>
            </div>
          </div>

          {/* Right side - Action Buttons */}
          <div className="flex items-center space-x-2">
            <button 
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              title="Edit"
            >
              <FiEdit2 className="w-5 h-5 text-gray-600" />
            </button>

            <button 
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              title="Toggle Dark Mode"
            >
              <FiMoon className="w-5 h-5 text-gray-600" />
            </button>

            <button 
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              title="Report"
            >
              <FiFlag className="w-5 h-5 text-gray-600" />
            </button>

            <button 
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              title="Settings"
            >
              <FiSettings className="w-5 h-5 text-gray-600" />
            </button>

            <button 
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              title="Search"
            >
              <FiSearch className="w-5 h-5 text-gray-600" />
            </button>
            <button 
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              title="Notifications"
            >
              <FiBell className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 