import React, { useState, useEffect } from 'react';
import { Users as UsersIcon, Search, Plus, MoreVertical, Edit, Trash2, Mail, Phone, Globe, Shield } from 'lucide-react';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading users data
    const timer = setTimeout(() => {
      setUsers([
        {
          id: 1,
          name: 'John Smith',
          email: 'john.smith@example.com',
          phone: '+20 123 456 7890',
          role: 'Customer',
          status: 'Active',
          country: 'Egypt',
          lastLogin: '2024-04-28',
          bookings: 5,
        },
        {
          id: 2,
          name: 'Sarah Johnson',
          email: 'sarah.j@example.com',
          phone: '+20 987 654 3210',
          role: 'Customer',
          status: 'Active',
          country: 'USA',
          lastLogin: '2024-04-27',
          bookings: 3,
        },
        {
          id: 3,
          name: 'Mohamed Ali',
          email: 'm.ali@example.com',
          phone: '+20 111 222 3333',
          role: 'Tour Guide',
          status: 'Active',
          country: 'Egypt',
          lastLogin: '2024-04-26',
          bookings: 12,
        },
        {
          id: 4,
          name: 'Emma Wilson',
          email: 'emma.w@example.com',
          phone: '+20 444 555 6666',
          role: 'Customer',
          status: 'Inactive',
          country: 'UK',
          lastLogin: '2024-03-15',
          bookings: 2,
        },
      ]);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditUser = (userId) => {
    // Add edit user logic here
    console.log('Edit user:', userId);
  };

  const handleDeleteUser = (userId) => {
    // Add delete user logic here
    console.log('Delete user:', userId);
  };

  const handleCreateUser = () => {
    // Add create user logic here
    console.log('Create new user');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Users</h1>
            <p className="text-gray-600 mt-2">Manage EasyGo users and their accounts</p>
          </div>
          <button
            onClick={handleCreateUser}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600 transition-colors duration-200"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add User
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-gray-500 text-sm">
                  <th className="pb-4 text-left">User</th>
                  <th className="pb-4 text-left">Contact</th>
                  <th className="pb-4 text-left">Role</th>
                  <th className="pb-4 text-left">Status</th>
                  <th className="pb-4 text-left">Country</th>
                  <th className="pb-4 text-left">Last Login</th>
                  <th className="pb-4 text-left">Bookings</th>
                  <th className="pb-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-t border-gray-100">
                    <td className="py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <UsersIcon className="w-5 h-5 text-blue-500" />
                        </div>
                        <div className="ml-4">
                          <p className="text-gray-800 font-medium">{user.name}</p>
                          <p className="text-gray-500 text-sm">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{user.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{user.phone}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        user.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center">
                        <Globe className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-gray-600">{user.country}</span>
                      </div>
                    </td>
                    <td className="py-4 text-gray-600">{user.lastLogin}</td>
                    <td className="py-4">
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {user.bookings} bookings
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleEditUser(user.id)}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage; 