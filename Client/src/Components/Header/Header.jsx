import React, { useState, useEffect } from 'react';
import { 
  FiFlag, 
  FiSettings, 
  FiSearch,
  FiBell,
  FiHeart,
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  if (!user) {
    return null;
  }

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Avatar and Name */}
          <div className="flex items-center space-x-4 cursor-pointer" onClick={() => navigate('/user-profile')}>
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 text-lg font-semibold">{user.firstName?.[0] || 'U'}</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">{user.firstName || 'User'}</h2>
              <p className="text-sm text-gray-500">Welcome back!</p>
            </div>
          </div>

          {/* Right side - Action Buttons */}
          <div className="flex items-center space-x-2">
            <button 
              className="p-2 rounded-full bg-gray-100 hover:bg-blue-100 hover:text-blue-600 transition-colors"
              title="Favorites"
              onClick={() => navigate('/favorites')}
            >
              <FiHeart className="w-5 h-5 text-gray-600" />
            </button>

            <button 
              className="p-2 rounded-full bg-gray-100 hover:bg-blue-100 hover:text-blue-600 transition-colors"
              title="Report"
              onClick={() => navigate('/report')}
            >
              <FiFlag className="w-5 h-5 text-gray-600" />
            </button>

            <button 
              className="p-2 rounded-full bg-gray-100 hover:bg-blue-100 hover:text-blue-600 transition-colors"
              title="Settings"
              onClick={() => navigate('/settings')}
            >
              <FiSettings className="w-5 h-5 text-gray-600" />
            </button>

            <button 
              className="p-2 rounded-full bg-gray-100 hover:bg-blue-100 hover:text-blue-600 transition-colors"
              title="Search"
              onClick={() => navigate('/search')}
            >
              <FiSearch className="w-5 h-5 text-gray-600" />
            </button>
            <button 
              className="p-2 rounded-full bg-gray-100 hover:bg-blue-100 hover:text-blue-600 transition-colors"
              title="Notifications"
              onClick={() => navigate('/notifications')}
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