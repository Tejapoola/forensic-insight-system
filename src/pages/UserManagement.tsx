
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import UsersManagement from '../components/admin/UsersManagement';

const UserManagement = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">User Management</h1>
        <p className="text-gray-400">Manage users and their roles in the forensic investigation system</p>
      </div>
      
      <UsersManagement />
    </div>
  );
};

export default UserManagement;
