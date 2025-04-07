
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { formatDistanceToNow } from 'date-fns';
import { MessageSquare, Lock, Plus } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface Note {
  id: string;
  content: string;
  author: string;
  createdAt: string;
  isPrivate: boolean;
}

interface CaseNotesProps {
  notes: Note[];
}

const CaseNotes: React.FC<CaseNotesProps> = ({ notes: initialNotes }) => {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [newNote, setNewNote] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newNote.trim()) {
      toast.error("Note content cannot be empty");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      const newNoteObj: Note = {
        id: `temp-${Date.now()}`,
        content: newNote,
        author: 'Current User',
        createdAt: new Date().toISOString(),
        isPrivate: isPrivate
      };
      
      setNotes([newNoteObj, ...notes]);
      setNewNote('');
      setIsPrivate(false);
      setIsSubmitting(false);
      toast.success("Note added successfully");
    }, 500);
  };

  return (
    <div className="space-y-6">
      {/* Note creation form */}
      <form onSubmit={handleSubmit} className="bg-forensic-dark rounded-lg border border-gray-700 p-4">
        <h3 className="text-white font-medium mb-2">Add Note</h3>
        <div className="space-y-4">
          <Textarea
            placeholder="Enter your notes about this case..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="min-h-[120px] bg-gray-800 border-gray-700"
          />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch 
                id="private-note" 
                checked={isPrivate} 
                onCheckedChange={setIsPrivate}
              />
              <Label htmlFor="private-note" className="flex items-center">
                <Lock className="h-3.5 w-3.5 mr-1" />
                Private Note
              </Label>
            </div>
            
            <Button 
              type="submit" 
              className="bg-forensic-blue hover:bg-blue-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Adding..."
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Note
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
      
      {/* Notes list */}
      <div className="bg-forensic-dark rounded-lg border border-gray-700">
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-medium text-white">Case Notes</h2>
          <span className="text-sm text-gray-400">{notes.length} notes</span>
        </div>
        
        <div className="divide-y divide-gray-700">
          {notes.length > 0 ? (
            notes.map((note) => {
              const timeAgo = formatDistanceToNow(new Date(note.createdAt), { addSuffix: true });
              
              return (
                <div key={note.id} className="p-4">
                  <div className="flex items-center mb-1">
                    <p className="font-medium text-white">{note.author}</p>
                    <span className="text-xs text-gray-500 ml-2">{timeAgo}</span>
                    {note.isPrivate && (
                      <div className="ml-2 inline-flex items-center text-xs bg-gray-800 text-gray-400 py-0.5 px-2 rounded-full">
                        <Lock className="h-3 w-3 mr-1" />
                        Private
                      </div>
                    )}
                  </div>
                  <p className="text-gray-300 whitespace-pre-wrap">{note.content}</p>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center">
              <MessageSquare className="h-12 w-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">No notes have been added to this case yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseNotes;
