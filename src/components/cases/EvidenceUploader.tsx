
import React, { useState, useRef } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Upload, 
  X, 
  File, 
  FileText,
  CheckCircle2
} from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';

interface EvidenceUploaderProps {
  isOpen: boolean;
  onClose: () => void;
  caseId: string;
}

const EvidenceUploader: React.FC<EvidenceUploaderProps> = ({ 
  isOpen, 
  onClose,
  caseId 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [description, setDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
    }
  };
  
  // Remove a file from the list
  const removeFile = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };
  
  // Trigger file input click
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (files.length === 0) {
      toast.error("Please select at least one file to upload");
      return;
    }
    
    setIsUploading(true);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          
          // Once upload is complete, wait a moment then show success
          setTimeout(() => {
            setIsUploading(false);
            toast.success(`${files.length} files uploaded successfully`);
            resetForm();
            onClose();
          }, 500);
          
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };
  
  // Reset form after submission
  const resetForm = () => {
    setFiles([]);
    setDescription('');
    setUploadProgress(0);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-forensic-dark border-gray-700 text-white sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Upload Digital Evidence</DialogTitle>
          <DialogDescription className="text-gray-400">
            Select files to upload as evidence for case {caseId}. Each file will be hashed for integrity verification.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* File dropzone */}
          <div 
            className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-gray-500 transition-colors cursor-pointer"
            onClick={triggerFileInput}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
            <Upload className="mx-auto h-12 w-12 text-gray-500 mb-2" />
            <p className="text-gray-300">
              Drag files here or click to select files
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Supports any file format up to 500 MB per file
            </p>
          </div>
          
          {/* Selected files list */}
          {files.length > 0 && (
            <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
              <div className="p-3 border-b border-gray-700 flex justify-between">
                <span className="text-sm font-medium text-white">Selected Files</span>
                <span className="text-sm text-gray-400">{files.length} files</span>
              </div>
              <ul className="divide-y divide-gray-700 max-h-48 overflow-y-auto">
                {files.map((file, index) => (
                  <li key={index} className="p-3 flex items-center justify-between">
                    <div className="flex items-center">
                      {file.type.includes('text') || file.type.includes('pdf') ? (
                        <FileText className="h-5 w-5 text-blue-400 mr-2" />
                      ) : (
                        <File className="h-5 w-5 text-gray-400 mr-2" />
                      )}
                      <div>
                        <p className="text-sm text-white truncate max-w-xs">{file.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(index);
                      }}
                      className="text-gray-500 hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Enter any additional information about these files..."
              className="bg-gray-800 border-gray-700"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          
          {/* Upload progress */}
          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Uploading and generating hashes...</Label>
                <span className="text-sm text-gray-400">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div 
                  className="bg-forensic-blue h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}
          
          <DialogFooter className="mt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              disabled={isUploading}
              className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-forensic-blue hover:bg-blue-600"
              disabled={isUploading || files.length === 0}
            >
              {isUploading ? (
                <>Uploading...</>
              ) : (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Upload Evidence
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EvidenceUploader;
