
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Calendar, 
  ChevronRight, 
  User,
  BarChart2
} from 'lucide-react';

interface CaseData {
  id: string;
  title: string;
  description: string;
  status: string;
  assignee: string;
  createdAt: string;
  priority: string;
  evidenceCount: number;
}

interface CaseListItemProps {
  caseData: CaseData;
}

const CaseListItem: React.FC<CaseListItemProps> = ({ caseData }) => {
  // Function to determine badge color based on status
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'in progress':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'closed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  // Function to determine priority color
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'critical':
        return 'bg-forensic-red/20 text-forensic-red border-forensic-red/30';
      case 'high':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'medium':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'low':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <Link 
      to={`/cases/${caseData.id}`} 
      className="block hover:bg-gray-800/50 transition-colors"
    >
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-white">{caseData.title}</h3>
              <span className="text-sm text-gray-400">{caseData.id}</span>
            </div>
            <p className="text-gray-400 text-sm">{caseData.description}</p>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-500" />
        </div>
        
        <div className="mt-3 flex flex-wrap gap-2 items-center">
          <Badge className={`${getStatusColor(caseData.status)} border`}>
            {caseData.status}
          </Badge>
          <Badge className={`${getPriorityColor(caseData.priority)} border`}>
            {caseData.priority}
          </Badge>
          <div className="flex items-center text-sm text-gray-400 ml-auto">
            <User className="h-4 w-4 mr-1" /> 
            <span>{caseData.assignee}</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <Calendar className="h-4 w-4 mr-1" /> 
            <span>{caseData.createdAt}</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <FileText className="h-4 w-4 mr-1" /> 
            <span>{caseData.evidenceCount} files</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CaseListItem;
