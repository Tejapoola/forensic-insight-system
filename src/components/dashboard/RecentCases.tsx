
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

interface Case {
  id: string;
  title: string;
  status: 'Open' | 'In Progress' | 'Closed';
  assignee: string;
  date: string;
}

interface RecentCasesProps {
  cases: Case[];
}

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'Open':
      return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    case 'In Progress':
      return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
    case 'Closed':
      return 'bg-green-500/20 text-green-300 border-green-500/30';
    default:
      return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
  }
};

const RecentCases: React.FC<RecentCasesProps> = ({ cases }) => {
  return (
    <div className="bg-forensic-dark rounded-lg border border-gray-700 shadow-md">
      <div className="p-5 border-b border-gray-700">
        <h3 className="text-lg font-medium text-white">Recent Cases</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-800/50 text-gray-400 text-xs">
            <tr>
              <th className="px-6 py-3">Case ID</th>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Assignee</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {cases.map((caseItem) => (
              <tr key={caseItem.id} className="hover:bg-gray-800/30">
                <td className="px-6 py-4 text-sm text-gray-300">{caseItem.id}</td>
                <td className="px-6 py-4 text-sm text-white">{caseItem.title}</td>
                <td className="px-6 py-4">
                  <Badge className={getStatusStyle(caseItem.status)}>
                    {caseItem.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">{caseItem.assignee}</td>
                <td className="px-6 py-4 text-sm text-gray-300">{caseItem.date}</td>
                <td className="px-6 py-4">
                  <Button variant="outline" size="sm" className="text-gray-300">
                    <Eye size={16} className="mr-1" />
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentCases;
