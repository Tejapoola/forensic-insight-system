
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '../contexts/AuthContext';
import { AlertTriangle } from 'lucide-react';

const Unauthorized = () => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-forensic-navy p-4 text-center">
      <div className="bg-red-500/10 p-4 rounded-full mb-6">
        <AlertTriangle size={48} className="text-red-500" />
      </div>
      <h1 className="text-3xl font-bold text-white mb-4">Access Denied</h1>
      <p className="text-gray-400 max-w-md mb-8">
        You don't have permission to access this page. Please contact an administrator 
        if you believe this is a mistake.
      </p>
      <Link to={user ? "/" : "/login"}>
        <Button className="bg-forensic-blue hover:bg-blue-600">
          Return to {user ? "Dashboard" : "Login"}
        </Button>
      </Link>
    </div>
  );
};

export default Unauthorized;
