import React, { useState } from 'react';
import { BellRing, BellOff, XCircle } from 'lucide-react';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Your booking for Nile Cruise is confirmed!', read: false, type: 'success' },
    { id: 2, message: 'New special offer: 15% off on Desert Safari.', read: false, type: 'info' },
    { id: 3, message: 'Payment for your recent trip failed. Please update your details.', read: true, type: 'error' },
    { id: 4, message: 'Reminder: Your trip to Luxor starts in 3 days.', read: false, type: 'warning' },
    { id: 5, message: 'Welcome to EasyGo! Explore our amazing tours.', read: true, type: 'info' },
  ]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Your Notifications</h1>
      <p className="text-lg text-gray-600 mb-8">Stay updated with the latest alerts and messages.</p>

      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Recent Activity</h2>
          <button
            onClick={clearAllNotifications}
            className="flex items-center text-red-600 hover:text-red-800 text-sm font-medium transition-colors duration-300"
          >
            <XCircle size={16} className="mr-1" /> Clear All
          </button>
        </div>

        {notifications.length > 0 ? (
          <div className="space-y-4">
            {notifications.map((notif) => (
              <div 
                key={notif.id}
                className={`p-4 border rounded-md flex items-start space-x-3 ${notif.read ? 'bg-gray-50 border-gray-200 text-gray-600' : 'bg-blue-50 border-blue-200 text-blue-800 font-medium'}`}
              >
                {notif.type === 'success' && <span className="text-green-500"><BellRing size={20} /></span>}
                {notif.type === 'info' && <span className="text-blue-500"><BellRing size={20} /></span>}
                {notif.type === 'warning' && <span className="text-yellow-500"><BellRing size={20} /></span>}
                {notif.type === 'error' && <span className="text-red-500"><BellRing size={20} /></span>}
                
                <p className="flex-1">{notif.message}</p>
                {!notif.read && (
                  <button 
                    onClick={() => markAsRead(notif.id)}
                    className="text-blue-500 hover:text-blue-700 text-sm whitespace-nowrap"
                  >
                    Mark as Read
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-gray-600">
            <BellOff size={48} className="mx-auto mb-4 text-gray-400" />
            <p className="text-xl">No new notifications.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications; 