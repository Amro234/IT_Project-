import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Building2, Calendar, DollarSign, TrendingUp, Package, Settings, LogOut, ChevronRight, AlertCircle, LayoutDashboard, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    // Clear any admin session data
    localStorage.removeItem('adminToken');
    // Navigate to login page
    navigate('/login');
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    switch (tab) {
      case 'dashboard':
        navigate('/admin/dashboard');
        break;
      case 'hotels':
        navigate('/admin/hotels');
        break;
      case 'settings':
        navigate('/admin/settings');
        break;
      case 'bookings':
        navigate('/admin/bookings');
        break;
      default:
        break;
    }
  };

  const bookingData = [
    { name: 'Jan', bookings: 45 },
    { name: 'Feb', bookings: 52 },
    { name: 'Mar', bookings: 48 },
    { name: 'Apr', bookings: 60 },
    { name: 'May', bookings: 55 },
    { name: 'Jun', bookings: 65 },
  ];

  const recentBookings = [
    { id: 1, customer: 'John Doe', trip: 'Everest Base Camp', date: '2024-04-28', status: 'Confirmed' },
    { id: 2, customer: 'Jane Smith', trip: 'Annapurna Circuit', date: '2024-04-27', status: 'Pending' },
    { id: 3, customer: 'Mike Johnson', trip: 'Langtang Valley', date: '2024-04-26', status: 'Confirmed' },
    { id: 4, customer: 'Sarah Williams', trip: 'Manaslu Circuit', date: '2024-04-25', status: 'Cancelled' },
  ];

  const metrics = [
    { title: 'Total Bookings', value: '1,234', icon: <Calendar className="w-6 h-6" />, change: '+12%', color: 'bg-blue-500' },
    { title: 'Total Revenue', value: '$45,678', icon: <DollarSign className="w-6 h-6" />, change: '+8%', color: 'bg-green-500' },
    { title: 'Active Users', value: '856', icon: <Building2 className="w-6 h-6" />, change: '+5%', color: 'bg-purple-500' },
    { title: 'Conversion Rate', value: '3.2%', icon: <TrendingUp className="w-6 h-6" />, change: '+2%', color: 'bg-orange-500' },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-xl font-bold text-gray-800">EasyGo Admin</h1>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden">
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => handleTabClick('dashboard')}
                className="flex items-center w-full p-2 text-gray-700 rounded-lg hover:bg-gray-100"
              >
                <LayoutDashboard className="w-5 h-5 mr-3" />
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => handleTabClick('hotels')}
                className="flex items-center w-full p-2 text-gray-700 rounded-lg hover:bg-gray-100"
              >
                <Building2 className="w-5 h-5 mr-3" />
                Hotels
              </button>
            </li>
            <li>
              <button
                onClick={() => handleTabClick('bookings')}
                className="flex items-center w-full p-2 text-gray-700 rounded-lg hover:bg-gray-100"
              >
                <Calendar className="w-5 h-5 mr-3" />
                Bookings
              </button>
            </li>
            <li>
              <button
                onClick={() => handleTabClick('settings')}
                className="flex items-center w-full p-2 text-gray-700 rounded-lg hover:bg-gray-100"
              >
                <Settings className="w-5 h-5 mr-3" />
                Settings
              </button>
            </li>
          </ul>
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center w-full p-2 text-red-600 rounded-lg hover:bg-red-50"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="p-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
          >
            <Menu className="w-6 h-6 text-gray-500" />
          </button>
          
          <div className="mt-16">
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome to the EasyGo Admin Panel</p>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              {metrics.map((metric, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">{metric.title}</p>
                      <p className="text-2xl font-semibold mt-1">{metric.value}</p>
                    </div>
                    <div className={`p-3 rounded-full ${metric.color} text-white`}>
                      {metric.icon}
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="text-green-500 text-sm font-medium">{metric.change}</span>
                    <span className="text-gray-500 text-sm ml-2">vs last month</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts and Recent Bookings */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
              {/* Booking Chart */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Monthly Bookings</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={bookingData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="bookings" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recent Bookings */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Bookings</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="text-left text-sm text-gray-500">
                        <th className="pb-3">Customer</th>
                        <th className="pb-3">Trip</th>
                        <th className="pb-3">Date</th>
                        <th className="pb-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentBookings.map((booking) => (
                        <tr key={booking.id} className="border-t">
                          <td className="py-3 text-sm">{booking.customer}</td>
                          <td className="py-3 text-sm">{booking.trip}</td>
                          <td className="py-3 text-sm">{booking.date}</td>
                          <td className="py-3">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                              booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {booking.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button className="mt-4 text-blue-600 text-sm font-medium hover:text-blue-800 flex items-center">
                  View all bookings
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;