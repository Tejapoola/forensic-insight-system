
import React, { useState } from 'react';
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
import { Input } from '@/components/ui/input';
import { Checkbox } from "@/components/ui/checkbox";
import { 
  FileText, 
  Download, 
  Check, 
  FileSpreadsheet,
  Calendar,
  User,
  Database,
  CheckCircle2,
  FilePdf
} from 'lucide-react';
import { toast } from 'sonner';

interface ReportGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
  caseId: string;
  caseTitle: string;
}

const ReportGenerator: React.FC<ReportGeneratorProps> = ({ 
  isOpen, 
  onClose,
  caseId,
  caseTitle
}) => {
  const [reportTitle, setReportTitle] = useState(`Forensic Analysis Report - ${caseTitle}`);
  const [reportSummary, setReportSummary] = useState('');
  const [includeEvidence, setIncludeEvidence] = useState(true);
  const [includeTimeline, setIncludeTimeline] = useState(true);
  const [includeNotes, setIncludeNotes] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [reportGenerated, setReportGenerated] = useState(false);
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reportTitle.trim()) {
      toast.error("Report title is required");
      return;
    }
    
    if (!reportSummary.trim()) {
      toast.error("Report summary is required");
      return;
    }
    
    setIsGenerating(true);
    setReportGenerated(false);
    setGenerationProgress(0);
    
    // Simulate report generation progress
    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          
          // Once generation is complete, set the report as generated
          setTimeout(() => {
            setIsGenerating(false);
            setReportGenerated(true);
            toast.success("Report generated successfully");
          }, 500);
          
          return 100;
        }
        return prev + 5;
      });
    }, 150);
  };
  
  // Handle download
  const handleDownload = () => {
    toast.success("Report downloaded successfully");
    onClose();
    resetForm();
  };
  
  // Reset form
  const resetForm = () => {
    setReportTitle(`Forensic Analysis Report - ${caseTitle}`);
    setReportSummary('');
    setIncludeEvidence(true);
    setIncludeTimeline(true);
    setIncludeNotes(false);
    setIsGenerating(false);
    setGenerationProgress(0);
    setReportGenerated(false);
  };
  
  // Handle close with reset
  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-forensic-dark border-gray-700 text-white sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Generate Case Report</DialogTitle>
          <DialogDescription className="text-gray-400">
            Create a detailed PDF report for case {caseId}.
          </DialogDescription>
        </DialogHeader>
        
        {!reportGenerated ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Report Details */}
            <div className="space-y-2">
              <Label htmlFor="title">Report Title</Label>
              <Input
                id="title"
                value={reportTitle}
                onChange={(e) => setReportTitle(e.target.value)}
                placeholder="Enter report title"
                className="bg-gray-800 border-gray-700"
                disabled={isGenerating}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="summary">Executive Summary</Label>
              <Textarea
                id="summary"
                value={reportSummary}
                onChange={(e) => setReportSummary(e.target.value)}
                placeholder="Provide a brief summary of the investigation findings..."
                className="bg-gray-800 border-gray-700 min-h-[120px]"
                disabled={isGenerating}
              />
            </div>
            
            {/* Report Content Options */}
            <div className="space-y-3">
              <Label>Report Content</Label>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="includeEvidence" 
                  checked={includeEvidence}
                  onCheckedChange={(checked) => setIncludeEvidence(checked as boolean)}
                  disabled={isGenerating}
                />
                <Label 
                  htmlFor="includeEvidence" 
                  className="flex items-center text-sm font-normal"
                >
                  <Database className="mr-2 h-4 w-4 text-forensic-blue" />
                  Include evidence details and hash values
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="includeTimeline" 
                  checked={includeTimeline}
                  onCheckedChange={(checked) => setIncludeTimeline(checked as boolean)}
                  disabled={isGenerating}
                />
                <Label 
                  htmlFor="includeTimeline" 
                  className="flex items-center text-sm font-normal"
                >
                  <Calendar className="mr-2 h-4 w-4 text-amber-400" />
                  Include investigation timeline
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="includeNotes" 
                  checked={includeNotes}
                  onCheckedChange={(checked) => setIncludeNotes(checked as boolean)}
                  disabled={isGenerating}
                />
                <Label 
                  htmlFor="includeNotes" 
                  className="flex items-center text-sm font-normal"
                >
                  <FileText className="mr-2 h-4 w-4 text-forensic-purple" />
                  Include case notes (non-private only)
                </Label>
              </div>
            </div>
            
            {/* Generation progress */}
            {isGenerating && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Generating report...</Label>
                  <span className="text-sm text-gray-400">{generationProgress}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div 
                    className="bg-forensic-blue h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${generationProgress}%` }}
                  />
                </div>
              </div>
            )}
            
            <DialogFooter className="mt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleClose}
                disabled={isGenerating}
                className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-forensic-blue hover:bg-blue-600"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>Generating...</>
                ) : (
                  <>
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Report
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <div className="space-y-6">
            {/* Report success view */}
            <div className="flex flex-col items-center py-4">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-medium text-white mb-1">Report Generated</h3>
              <p className="text-gray-400 text-center">
                Your forensic investigation report has been successfully generated and is ready for download.
              </p>
            </div>
            
            {/* Report preview card */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 flex items-center">
              <FilePdf className="h-10 w-10 text-forensic-red mr-4" />
              <div className="flex-1">
                <h4 className="text-white font-medium">{reportTitle}</h4>
                <p className="text-xs text-gray-400 mt-1">PDF Document • Generated {new Date().toLocaleString()}</p>
              </div>
            </div>
            
            {/* Report actions */}
            <div className="flex flex-col gap-2">
              <Button
                onClick={handleDownload}
                className="bg-forensic-blue hover:bg-blue-600"
              >
                <Download className="mr-2 h-4 w-4" />
                Download PDF Report
              </Button>
              
              <Button
                variant="outline"
                className="border-gray-700 hover:bg-gray-800"
              >
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Export as Excel
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ReportGenerator;
