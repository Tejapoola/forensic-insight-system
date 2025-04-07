
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import StatCard from '../components/dashboard/StatCard';
import { FolderOpen, Users, Clock, FileText, Check, AlertTriangle } from 'lucide-react';
import { 
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  Pie,
  PieChart,
  Cell
} from 'recharts';

// Sample data for the admin dashboard
const casesByStatus = [
  { name: 'Open', value: 12, color: '#0EA5E9' },
  { name: 'In Progress', value: 18, color: '#F59E0B' },
  { name: 'Closed', value: 24, color: '#22C55E' },
];

const casesByType = [
  { name: 'Email Breach', value: 8, color: '#7E69AB' },
  { name: 'Malware', value: 12, color: '#F43F5E' },
  { name: 'Data Leak', value: 10, color: '#0EA5E9' },
  { name: 'Network', value: 7, color: '#F59E0B' },
  { name: 'Device Theft', value: 5, color: '#22C55E' },
];

const casesOverTime = [
  { month: 'Jan', open: 5, closed: 2 },
  { month: 'Feb', open: 7, closed: 4 },
  { month: 'Mar', open: 10, closed: 7 },
  { month: 'Apr', open: 8, closed: 9 },
  { month: 'May', open: 12, closed: 8 },
  { month: 'Jun', open: 14, closed: 11 }
];

const adminMetrics = {
  totalUsers: 42,
  activeUsers: 38,
  totalCases: 54,
  openCases: 12,
  inProgressCases: 18,
  closedCases: 24,
  evidenceFiles: 324,
  averageResolutionDays: 6.5
};

const AdminDashboard = () => {
  const { user } = useAuth();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Admin Dashboard</h1>
        <p className="text-gray-400">System overview and forensic investigation statistics</p>
      </div>
      
      {/* Statistics cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Cases"
          value={adminMetrics.totalCases.toString()}
          icon={<FolderOpen size={24} className="text-forensic-blue" />}
        />
        <StatCard
          title="Total Users"
          value={adminMetrics.totalUsers.toString()}
          icon={<Users size={24} className="text-forensic-purple" />}
          trend={{ value: 8, label: 'from last month', isPositive: true }}
        />
        <StatCard
          title="Avg. Resolution Time"
          value={`${adminMetrics.averageResolutionDays} days`}
          icon={<Clock size={24} className="text-amber-500" />}
          trend={{ value: 12, label: 'faster than last month', isPositive: true }}
        />
        <StatCard
          title="Evidence Files"
          value={adminMetrics.evidenceFiles.toString()}
          icon={<FileText size={24} className="text-green-500" />}
          trend={{ value: 42, label: 'from last month', isPositive: true }}
        />
      </div>
      
      {/* Charts and detailed stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Case status chart */}
        <div className="bg-forensic-dark p-5 rounded-lg border border-gray-700">
          <h2 className="text-lg font-medium text-white mb-4">Cases by Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-blue-500/20">
                <AlertTriangle className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Open</p>
                <p className="text-xl font-semibold text-white">{adminMetrics.openCases}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-amber-500/20">
                <Clock className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <p className="text-sm text-gray-400">In Progress</p>
                <p className="text-xl font-semibold text-white">{adminMetrics.inProgressCases}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-green-500/20">
                <Check className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Closed</p>
                <p className="text-xl font-semibold text-white">{adminMetrics.closedCases}</p>
              </div>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={casesByStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {casesByStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Case types chart */}
        <div className="bg-forensic-dark p-5 rounded-lg border border-gray-700">
          <h2 className="text-lg font-medium text-white mb-4">Cases by Type</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={casesByType}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {casesByType.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Case trends over time */}
        <div className="bg-forensic-dark p-5 rounded-lg border border-gray-700 lg:col-span-2">
          <h2 className="text-lg font-medium text-white mb-4">Case Trends (6 Months)</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={casesOverTime}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="month" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: '#333',
                    border: '1px solid #555',
                    borderRadius: '4px',
                    color: '#fff'
                  }}
                />
                <Legend />
                <Bar dataKey="open" name="Open Cases" fill="#0EA5E9" />
                <Bar dataKey="closed" name="Closed Cases" fill="#22C55E" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
