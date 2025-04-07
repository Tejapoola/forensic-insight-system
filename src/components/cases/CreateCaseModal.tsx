
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

interface CreateCaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateCaseModal: React.FC<CreateCaseModalProps> = ({ isOpen, onClose }) => {
  const [caseData, setCaseData] = useState({
    title: '',
    description: '',
    priority: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCaseData(prev => ({ ...prev, [name]: value }));
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setCaseData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate form
    if (!caseData.title.trim()) {
      toast.error("Please enter a case title");
      setIsSubmitting(false);
      return;
    }
    
    if (!caseData.priority) {
      toast.error("Please select a priority level");
      setIsSubmitting(false);
      return;
    }
    
    // Simulate API request
    setTimeout(() => {
      toast.success("Case created successfully");
      setIsSubmitting(false);
      resetForm();
      onClose();
    }, 1000);
  };

  // Reset form after submission
  const resetForm = () => {
    setCaseData({
      title: '',
      description: '',
      priority: '',
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-forensic-dark border-gray-700 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Case</DialogTitle>
          <DialogDescription className="text-gray-400">
            Fill out the form below to create a new forensic investigation case.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Case Title</Label>
            <Input
              id="title"
              name="title"
              value={caseData.title}
              onChange={handleChange}
              placeholder="Enter descriptive case title"
              className="bg-gray-800 border-gray-700"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Case Description</Label>
            <Textarea
              id="description"
              name="description"
              value={caseData.description}
              onChange={handleChange}
              placeholder="Enter detailed case description..."
              className="bg-gray-800 border-gray-700 min-h-[100px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="priority">Priority Level</Label>
            <Select 
              value={caseData.priority} 
              onValueChange={(value) => handleSelectChange('priority', value)}
            >
              <SelectTrigger id="priority" className="bg-gray-800 border-gray-700">
                <SelectValue placeholder="Select priority level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Critical">Critical</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <DialogFooter className="mt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-forensic-blue hover:bg-blue-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Case'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCaseModal;
