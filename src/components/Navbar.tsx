
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Bell, Search, User } from 'lucide-react';

const Navbar = () => {
  const { user } = useAuth();

  return (
    <header className="bg-forensic-dark border-b border-gray-700 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold text-white">
            Digital Forensics Investigation System
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="hidden md:flex relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-64 bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-forensic-blue"
            />
            <Search 
              size={18} 
              className="absolute right-3 top-2.5 text-gray-400" 
            />
          </div>

          {/* Notifications */}
          <button className="p-2 rounded-md hover:bg-gray-700 relative">
            <Bell size={20} className="text-gray-300" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-forensic-red rounded-full"></span>
          </button>

          {/* User menu */}
          <div className="flex items-center">
            <div className="w-8 h-8 bg-forensic-purple rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <div className="ml-2 hidden md:block">
              <p className="text-sm font-medium text-white">{user?.name}</p>
              <p className="text-xs text-gray-400">{user?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
