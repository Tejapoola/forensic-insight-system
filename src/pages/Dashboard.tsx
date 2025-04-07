
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import StatCard from '../components/dashboard/StatCard';
import RecentCases from '../components/dashboard/RecentCases';
import ActivityLog from '../components/dashboard/ActivityLog';
import { FileText, FolderOpen, Users, Clock } from 'lucide-react';

// Sample data for the demo
const recentCases = [
  { 
    id: 'CASE-2025-042', 
    title: 'Corporate Email Breach Investigation', 
    status: 'In Progress' as const, 
    assignee: 'John Analyst', 
    date: '2025-04-02' 
  },
  { 
    id: 'CASE-2025-041', 
    title: 'Ransomware Incident Analysis', 
    status: 'Open' as const, 
    assignee: 'Sarah Expert', 
    date: '2025-04-01' 
  },
  { 
    id: 'CASE-2025-039', 
    title: 'Mobile Device Forensic Extraction', 
    status: 'Closed' as const, 
    assignee: 'David Tech', 
    date: '2025-03-28' 
  },
  { 
    id: 'CASE-2025-038', 
    title: 'Network Traffic Anomaly Detection', 
    status: 'In Progress' as const, 
    assignee: 'Emma Specialist', 
    date: '2025-03-27' 
  },
];

const activityLogs = [
  { 
    id: '1', 
    user: 'John Analyst', 
    action: 'uploaded new evidence', 
    case: 'CASE-2025-042', 
    timestamp: 'Today at 14:32' 
  },
  { 
    id: '2', 
    user: 'Admin User', 
    action: 'assigned a case to Sarah Expert', 
    case: 'CASE-2025-041', 
    timestamp: 'Today at 11:15' 
  },
  { 
    id: '3', 
    user: 'David Tech', 
    action: 'completed report submission', 
    case: 'CASE-2025-039', 
    timestamp: 'Yesterday at 17:45' 
  },
  { 
    id: '4', 
    user: 'Emma Specialist', 
    action: 'added case notes', 
    case: 'CASE-2025-038', 
    timestamp: 'Yesterday at 09:22' 
  },
  { 
    id: '5', 
    user: 'System', 
    action: 'performed automatic evidence hash verification', 
    timestamp: 'April 3, 2025 at 00:15' 
  },
];

const Dashboard = () => {
  const { user } = useAuth();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Welcome, {user?.name}</h1>
        <p className="text-gray-400">Here's an overview of the forensic investigation system</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Cases"
          value="14"
          icon={<FolderOpen size={24} className="text-forensic-blue" />}
          trend={{ value: 12, label: 'from last month', isPositive: true }}
        />
        <StatCard
          title="Pending Reports"
          value="7"
          icon={<FileText size={24} className="text-forensic-purple" />}
          trend={{ value: 5, label: 'from last month', isPositive: false }}
        />
        <StatCard
          title="Active Analysts"
          value="9"
          icon={<Users size={24} className="text-green-500" />}
        />
        <StatCard
          title="Avg. Resolution Time"
          value="3.2 days"
          icon={<Clock size={24} className="text-amber-500" />}
          trend={{ value: 8, label: 'faster than last month', isPositive: true }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentCases cases={recentCases} />
        </div>
        <div>
          <ActivityLog logs={activityLogs} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
