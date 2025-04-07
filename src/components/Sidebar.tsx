
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { cn } from '@/lib/utils';
import { 
  Home, 
  FileText, 
  Database, 
  Users, 
  LayoutDashboard,
  FolderOpen,
  FileArchive,
  LogOut,
  Menu,
  X
} from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  
  // Define navigation items based on user role
  const getNavItems = () => {
    const commonItems = [
      { name: 'Home', path: '/', icon: Home },
      { name: 'Cases', path: '/cases', icon: FolderOpen },
      { name: 'Evidence', path: '/evidence', icon: Database },
      { name: 'Reports', path: '/reports', icon: FileText },
    ];
    
    const adminItems = [
      { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
      { name: 'Users', path: '/admin/users', icon: Users },
      { name: 'Archives', path: '/admin/archives', icon: FileArchive },
    ];
    
    return user?.role === 'admin' 
      ? [...commonItems, ...adminItems] 
      : commonItems;
  };
  
  const navItems = getNavItems();

  return (
    <div 
      className={cn(
        "bg-forensic-dark text-white flex flex-col h-full border-r border-gray-700 transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!collapsed && (
          <div className="text-xl font-bold text-forensic-blue">ForensicInsight</div>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-md hover:bg-gray-700 text-gray-300"
        >
          {collapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>
      
      <div className="flex-1 py-4 overflow-y-auto scrollbar-hide">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center py-3 px-4 my-1 mx-2 rounded-md transition-colors",
              isActive 
                ? "bg-forensic-blue text-white" 
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            )}
          >
            <item.icon size={20} />
            {!collapsed && <span className="ml-3">{item.name}</span>}
          </NavLink>
        ))}
      </div>
      
      <div className="p-4 border-t border-gray-700">
        <button 
          onClick={logout}
          className="flex items-center w-full py-2 px-4 text-gray-300 rounded-md hover:bg-gray-700 hover:text-white transition-colors"
        >
          <LogOut size={20} />
          {!collapsed && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
