import React from 'react';

const UsersPage = () => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'User' },
    { id: 3, name: 'Mike Johnson', email: 'mike.johnson@example.com', role: 'User' },
    { id: 4, name: 'Sarah Williams', email: 'sarah.williams@example.com', role: 'User' },
  ];

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Users</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500">
              <th className="pb-4">Name</th>
              <th className="pb-4">Email</th>
              <th className="pb-4">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="py-4">{user.name}</td>
                <td className="py-4">{user.email}</td>
                <td className="py-4">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;