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
    <div className="container py-5 text-center">
      <h1 className="mb-4">Settings</h1>
      <p className="lead">Customize your preferences and manage your account settings here.</p>

      <div className="mt-4 text-start mx-auto" style={{ maxWidth: '600px' }}>
        {/* Account Settings */}
        <div className="mb-4 p-4 shadow-sm rounded">
          <h3>
            <FaUserEdit className="me-2" />
            Account Settings
          </h3>
          <p>Update your profile information, change your password, or manage your account security.</p>
          <button className="btn btn-primary">
            Edit Profile
          </button>
        </div>

        {/* Notifications */}
        <div className="mb-4 p-4 shadow-sm rounded">
          <h3>
            <FaBell className="me-2" />
            Notifications
          </h3>
          <p>Manage your notification preferences.</p>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="emailNotifications" />
            <label className="form-check-label" htmlFor="emailNotifications">
              Enable email notifications
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="pushNotifications" />
            <label className="form-check-label" htmlFor="pushNotifications">
              Enable push notifications
            </label>
          </div>
        </div>

        {/* Privacy */}
        <div className="mb-4 p-4 shadow-sm rounded">
          <h3>
            <FaLock className="me-2" />
            Privacy
          </h3>
          <p>Control your privacy settings.</p>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="publicProfile" />
            <label className="form-check-label" htmlFor="publicProfile">
              Make profile public
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="dataSharing" />
            <label className="form-check-label" htmlFor="dataSharing">
              Allow data sharing
            </label>
          </div>
        </div>

        {/* Theme */}
        <div className="mb-4 p-4 shadow-sm rounded">
          <h3>
            <FaPalette className="me-2" />
            Theme
          </h3>
          <p>Change the appearance of the application.</p>
          <select
            className="form-select"
            style={{ maxWidth: '300px' }}
            value={theme}
            onChange={handleThemeChange}
          >
            <option value="light">Light Theme</option>
            <option value="dark">Dark Theme</option>
          </select>
        </div>

        {/* Language */}
        <div className="mb-4 p-4 shadow-sm rounded">
          <h3>
            <FaLanguage className="me-2" />
            Language
          </h3>
          <p>Change the language of the application.</p>
          <select
            className="form-select"
            style={{ maxWidth: '300px' }}
            value={language}
            onChange={handleLanguageChange}
          >
            <option value="en">English</option>
            <option value="ar">العربية</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Settings;