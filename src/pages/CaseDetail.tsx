
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  FileText, 
  Database, 
  MessageSquare,
  Download,
  Upload
} from 'lucide-react';
import EvidenceUploader from '../components/cases/EvidenceUploader';
import TimelineActivity from '../components/cases/TimelineActivity';
import EvidenceList from '../components/cases/EvidenceList';
import CaseNotes from '../components/cases/CaseNotes';

// Sample data for the demo
const sampleCaseDetails = {
  id: 'CASE-2025-042',
  title: 'Corporate Email Breach Investigation',
  description: 'Investigation into unauthorized access to corporate email accounts of executives. Multiple phishing attempts were detected targeting C-level executives. Digital forensics needed to determine extent of breach and data exfiltration.',
  status: 'In Progress',
  assignee: 'John Analyst',
  assignedBy: 'Admin User',
  createdAt: '2025-04-02 14:30:25',
  updatedAt: '2025-04-05 09:15:10',
  priority: 'High',
  tags: ['Email Breach', 'Phishing', 'Data Exfiltration'],
  evidenceCount: 7
};

// Sample timeline activities
const sampleActivities = [
  {
    id: '1',
    user: 'Admin User',
    action: 'created the case',
    timestamp: '2025-04-02T14:30:25',
    details: 'Initial case creation'
  },
  {
    id: '2',
    user: 'Admin User',
    action: 'assigned the case to John Analyst',
    timestamp: '2025-04-02T14:35:12',
    details: null
  },
  {
    id: '3',
    user: 'John Analyst',
    action: 'uploaded server_logs.txt',
    timestamp: '2025-04-03T09:12:45',
    details: 'MD5: 8f4e8d9a72cf8f4e8d9a72cf8f4e8d9a'
  },
  {
    id: '4',
    user: 'John Analyst',
    action: 'uploaded email_headers.eml',
    timestamp: '2025-04-03T10:22:18',
    details: 'MD5: 3a7b6c5d4e3a7b6c5d4e3a7b6c5d4e3a'
  },
  {
    id: '5',
    user: 'John Analyst',
    action: 'added a case note',
    timestamp: '2025-04-04T15:45:30',
    details: 'Found suspicious login attempts from IP 192.168.1.254'
  },
  {
    id: '6',
    user: 'John Analyst',
    action: 'changed status from Open to In Progress',
    timestamp: '2025-04-05T09:15:10',
    details: null
  }
];

// Sample evidence files
const sampleEvidence = [
  {
    id: '1',
    filename: 'server_logs.txt',
    type: 'text/plain',
    size: '1.2 MB',
    uploadedBy: 'John Analyst',
    uploadedAt: '2025-04-03T09:12:45',
    hash: {
      md5: '8f4e8d9a72cf8f4e8d9a72cf8f4e8d9a',
      sha256: 'a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2'
    }
  },
  {
    id: '2',
    filename: 'email_headers.eml',
    type: 'message/rfc822',
    size: '8.5 KB',
    uploadedBy: 'John Analyst',
    uploadedAt: '2025-04-03T10:22:18',
    hash: {
      md5: '3a7b6c5d4e3a7b6c5d4e3a7b6c5d4e3a',
      sha256: 'b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3'
    }
  },
  {
    id: '3',
    filename: 'network_capture.pcap',
    type: 'application/vnd.tcpdump.pcap',
    size: '24.7 MB',
    uploadedBy: 'John Analyst',
    uploadedAt: '2025-04-04T11:33:27',
    hash: {
      md5: '7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f',
      sha256: 'c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4'
    }
  },
  {
    id: '4',
    filename: 'system_memory_dump.raw',
    type: 'application/octet-stream',
    size: '2.1 GB',
    uploadedBy: 'John Analyst',
    uploadedAt: '2025-04-04T14:08:59',
    hash: {
      md5: 'd1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6',
      sha256: 'd4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5'
    }
  }
];

// Sample notes
const sampleNotes = [
  {
    id: '1',
    content: 'Initial investigation shows phishing emails originated from spoofed domain forensic-insight.com (vs our legitimate forensicinsight.com). Headers indicate emails passed SPF checks due to misconfigured DNS records.',
    author: 'John Analyst',
    createdAt: '2025-04-03T16:42:15',
    isPrivate: false
  },
  {
    id: '2',
    content: 'Found suspicious login attempts from IP 192.168.1.254. This appears to be an internal IP which suggests the attacker may have already gained access to the internal network.',
    author: 'John Analyst',
    createdAt: '2025-04-04T15:45:30',
    isPrivate: false
  },
  {
    id: '3',
    content: 'Private note: Need to contact IT security team to check firewall logs for outbound connections to known C2 servers.',
    author: 'John Analyst',
    createdAt: '2025-04-05T08:20:12',
    isPrivate: true
  }
];

const CaseDetail = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  const [isUploaderOpen, setIsUploaderOpen] = useState(false);
  
  // Function to determine status badge color
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

  // Function to determine priority badge color
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
    <div className="space-y-6">
      {/* Header with navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Link to="/cases" className="text-gray-400 hover:text-white inline-flex items-center mb-2">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Cases
          </Link>
          <h1 className="text-2xl font-bold text-white">{sampleCaseDetails.title}</h1>
          <p className="text-gray-400">Case ID: {sampleCaseDetails.id}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button 
            onClick={() => setIsUploaderOpen(true)}
            variant="outline" 
            className="border-gray-700 bg-gray-800 text-white hover:bg-gray-700"
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Evidence
          </Button>
          <Button className="bg-forensic-blue hover:bg-blue-600">
            <Download className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>
      
      {/* Case summary card */}
      <div className="bg-forensic-dark p-5 rounded-lg border border-gray-700">
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge className={`${getStatusColor(sampleCaseDetails.status)} border`}>
            {sampleCaseDetails.status}
          </Badge>
          <Badge className={`${getPriorityColor(sampleCaseDetails.priority)} border`}>
            {sampleCaseDetails.priority}
          </Badge>
          {sampleCaseDetails.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="bg-gray-700 text-gray-300">
              {tag}
            </Badge>
          ))}
        </div>
        
        <p className="text-gray-300 mb-6">{sampleCaseDetails.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center">
            <User className="h-5 w-5 text-forensic-purple mr-3" />
            <div>
              <p className="text-sm text-gray-400">Assigned To</p>
              <p className="text-white">{sampleCaseDetails.assignee}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-forensic-blue mr-3" />
            <div>
              <p className="text-sm text-gray-400">Created On</p>
              <p className="text-white">{new Date(sampleCaseDetails.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-amber-500 mr-3" />
            <div>
              <p className="text-sm text-gray-400">Last Updated</p>
              <p className="text-white">{new Date(sampleCaseDetails.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Database className="h-5 w-5 text-green-500 mr-3" />
            <div>
              <p className="text-sm text-gray-400">Evidence Files</p>
              <p className="text-white">{sampleCaseDetails.evidenceCount} files</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs for different case content */}
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="w-full bg-forensic-dark border border-gray-700 rounded-md mb-2">
          <TabsTrigger 
            value="overview" 
            className="text-gray-400 data-[state=active]:text-white data-[state=active]:bg-gray-700"
          >
            <FileText className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="evidence" 
            className="text-gray-400 data-[state=active]:text-white data-[state=active]:bg-gray-700"
          >
            <Database className="h-4 w-4 mr-2" />
            Evidence
          </TabsTrigger>
          <TabsTrigger 
            value="timeline" 
            className="text-gray-400 data-[state=active]:text-white data-[state=active]:bg-gray-700"
          >
            <Clock className="h-4 w-4 mr-2" />
            Timeline
          </TabsTrigger>
          <TabsTrigger 
            value="notes" 
            className="text-gray-400 data-[state=active]:text-white data-[state=active]:bg-gray-700"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Notes
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <EvidenceList evidence={sampleEvidence} />
            </div>
            <div>
              <TimelineActivity activities={sampleActivities.slice(0, 3)} showViewAll />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="evidence" className="mt-0">
          <EvidenceList evidence={sampleEvidence} />
        </TabsContent>
        
        <TabsContent value="timeline" className="mt-0">
          <TimelineActivity activities={sampleActivities} />
        </TabsContent>
        
        <TabsContent value="notes" className="mt-0">
          <CaseNotes notes={sampleNotes} />
        </TabsContent>
      </Tabs>
      
      {/* Evidence uploader modal */}
      <EvidenceUploader 
        isOpen={isUploaderOpen}
        onClose={() => setIsUploaderOpen(false)}
        caseId={sampleCaseDetails.id}
      />
    </div>
  );
};

export default CaseDetail;
