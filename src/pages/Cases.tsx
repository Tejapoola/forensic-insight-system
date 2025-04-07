
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  FolderOpen, 
  Search, 
  Filter, 
  Plus, 
  Calendar, 
  Clock, 
  FileText, 
  Shield 
} from 'lucide-react';
import CaseListItem from '../components/cases/CaseListItem';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import CreateCaseModal from '../components/cases/CreateCaseModal';

// Sample case data for the demo
const sampleCases = [
  {
    id: 'CASE-2025-042',
    title: 'Corporate Email Breach Investigation',
    description: 'Investigating unauthorized access to executive email accounts',
    status: 'In Progress',
    assignee: 'John Analyst',
    createdAt: '2025-04-02',
    priority: 'High',
    evidenceCount: 7
  },
  {
    id: 'CASE-2025-041',
    title: 'Ransomware Incident Analysis',
    description: 'Analysis of ransomware infection across company workstations',
    status: 'Open',
    assignee: 'Sarah Expert',
    createdAt: '2025-04-01',
    priority: 'Critical',
    evidenceCount: 12
  },
  {
    id: 'CASE-2025-039',
    title: 'Mobile Device Forensic Extraction',
    description: 'Data recovery and analysis from employee mobile device',
    status: 'Closed',
    assignee: 'David Tech',
    createdAt: '2025-03-28',
    priority: 'Medium',
    evidenceCount: 5
  },
  {
    id: 'CASE-2025-038',
    title: 'Network Traffic Anomaly Detection',
    description: 'Investigation of suspicious outbound network traffic patterns',
    status: 'In Progress',
    assignee: 'Emma Specialist',
    createdAt: '2025-03-27',
    priority: 'High',
    evidenceCount: 9
  },
];

const Cases = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  // Filter cases based on search query and status filter
  const filteredCases = sampleCases.filter(caseItem => {
    const matchesSearch = 
      caseItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseItem.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' || 
      caseItem.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Forensic Cases</h1>
        <Button 
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-forensic-blue hover:bg-blue-600"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Case
        </Button>
      </div>
      
      {/* Filters and search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search cases..."
            className="pl-9 bg-forensic-dark border-gray-700"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={setStatusFilter}
        >
          <SelectTrigger className="w-full md:w-[180px] bg-forensic-dark border-gray-700">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Cases</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="in progress">In Progress</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Case statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-forensic-dark p-4 rounded-lg border border-gray-700 flex items-center">
          <div className="p-3 rounded-full bg-forensic-blue/20 mr-4">
            <FolderOpen className="h-5 w-5 text-forensic-blue" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Total Cases</p>
            <p className="text-xl font-semibold text-white">{sampleCases.length}</p>
          </div>
        </div>
        <div className="bg-forensic-dark p-4 rounded-lg border border-gray-700 flex items-center">
          <div className="p-3 rounded-full bg-amber-500/20 mr-4">
            <Clock className="h-5 w-5 text-amber-500" />
          </div>
          <div>
            <p className="text-sm text-gray-400">In Progress</p>
            <p className="text-xl font-semibold text-white">
              {sampleCases.filter(c => c.status === 'In Progress').length}
            </p>
          </div>
        </div>
        <div className="bg-forensic-dark p-4 rounded-lg border border-gray-700 flex items-center">
          <div className="p-3 rounded-full bg-green-500/20 mr-4">
            <FileText className="h-5 w-5 text-green-500" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Completed</p>
            <p className="text-xl font-semibold text-white">
              {sampleCases.filter(c => c.status === 'Closed').length}
            </p>
          </div>
        </div>
        <div className="bg-forensic-dark p-4 rounded-lg border border-gray-700 flex items-center">
          <div className="p-3 rounded-full bg-forensic-purple/20 mr-4">
            <Shield className="h-5 w-5 text-forensic-purple" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Critical</p>
            <p className="text-xl font-semibold text-white">
              {sampleCases.filter(c => c.priority === 'Critical').length}
            </p>
          </div>
        </div>
      </div>
      
      {/* Cases list */}
      <div className="bg-forensic-dark rounded-lg border border-gray-700">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-lg font-medium text-white">Case List</h2>
        </div>
        <div className="divide-y divide-gray-700">
          {filteredCases.length > 0 ? (
            filteredCases.map(caseItem => (
              <CaseListItem key={caseItem.id} caseData={caseItem} />
            ))
          ) : (
            <div className="p-8 text-center">
              <p className="text-gray-400">No cases found matching your filters.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Create case modal */}
      <CreateCaseModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};

export default Cases;
