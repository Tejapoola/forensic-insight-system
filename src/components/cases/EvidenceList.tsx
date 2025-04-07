
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  FileText,
  FileImage,
  FileArchive,
  FileCode,
  File,
  Download,
  Search,
  Info
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface EvidenceFile {
  id: string;
  filename: string;
  type: string;
  size: string;
  uploadedBy: string;
  uploadedAt: string;
  hash: {
    md5: string;
    sha256: string;
  };
}

interface EvidenceListProps {
  evidence: EvidenceFile[];
}

const EvidenceList: React.FC<EvidenceListProps> = ({ evidence }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter evidence based on search query
  const filteredEvidence = evidence.filter(file => 
    file.filename.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Function to get appropriate icon based on file type
  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) {
      return <FileImage className="h-5 w-5 text-purple-400" />;
    } else if (type === 'application/pdf') {
      return <FileText className="h-5 w-5 text-red-400" />;
    } else if (type.includes('zip') || type.includes('archive') || type.includes('compress')) {
      return <FileArchive className="h-5 w-5 text-amber-400" />;
    } else if (type.includes('text') || type.includes('code') || type.includes('script')) {
      return <FileCode className="h-5 w-5 text-green-400" />;
    } else {
      return <File className="h-5 w-5 text-blue-400" />;
    }
  };

  // Format date in a readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="bg-forensic-dark rounded-lg border border-gray-700">
      <div className="p-4 border-b border-gray-700 flex justify-between items-center">
        <h2 className="text-lg font-medium text-white">Digital Evidence Files</h2>
        <div className="relative flex items-center w-64">
          <Search className="absolute left-2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 bg-gray-800 border-gray-700"
          />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-800">
            <tr>
              <th className="text-left py-3 px-4 text-sm text-gray-400 font-medium">File</th>
              <th className="text-left py-3 px-4 text-sm text-gray-400 font-medium">Size</th>
              <th className="text-left py-3 px-4 text-sm text-gray-400 font-medium">Uploaded By</th>
              <th className="text-left py-3 px-4 text-sm text-gray-400 font-medium">Date</th>
              <th className="text-right py-3 px-4 text-sm text-gray-400 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredEvidence.length > 0 ? (
              filteredEvidence.map((file) => (
                <tr key={file.id} className="hover:bg-gray-800/50">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      {getFileIcon(file.type)}
                      <span className="ml-2 text-white">{file.filename}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-400">{file.size}</td>
                  <td className="py-3 px-4 text-gray-400">{file.uploadedBy}</td>
                  <td className="py-3 px-4 text-gray-400">{formatDate(file.uploadedAt)}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Info className="h-4 w-4 text-gray-400" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-sm">
                            <p className="font-medium">File Hash Values</p>
                            <div className="mt-1 space-y-1 text-xs">
                              <div>
                                <span className="text-gray-400">MD5:</span> {file.hash.md5}
                              </div>
                              <div>
                                <span className="text-gray-400">SHA-256:</span> {file.hash.sha256}
                              </div>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4 text-gray-400" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-6 text-center text-gray-400">
                  No evidence files match your search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EvidenceList;
