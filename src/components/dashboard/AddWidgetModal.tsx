import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Widget } from '@/types/dashboard';

interface AddWidgetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddWidget: (widget: Omit<Widget, 'id'>) => void;
  categoryName?: string;
}

const AddWidgetModal = ({ open, onOpenChange, onAddWidget, categoryName }: AddWidgetModalProps) => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState<'chart' | 'stats' | 'text'>('text');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && content.trim()) {
      onAddWidget({
        name: name.trim(),
        content: content.trim(),
        type
      });
      setName('');
      setContent('');
      setType('text');
      onOpenChange(false);
    }
  };

  const handleClose = () => {
    setName('');
    setContent('');
    setType('text');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-surface">
        <DialogHeader>
          <DialogTitle className="text-foreground">Add Widget</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {categoryName && `Add a new widget to ${categoryName}`}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="widget-name" className="text-sm font-medium text-foreground">
              Widget Name
            </Label>
            <Input
              id="widget-name"
              placeholder="Enter widget name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-background border-border"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="widget-type" className="text-sm font-medium text-foreground">
              Widget Type
            </Label>
            <Select value={type} onValueChange={(value: 'chart' | 'stats' | 'text') => setType(value)}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-surface border-border">
                <SelectItem value="text">Text Widget</SelectItem>
                <SelectItem value="chart">Chart Widget</SelectItem>
                <SelectItem value="stats">Stats Widget</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="widget-content" className="text-sm font-medium text-foreground">
              Widget Content
            </Label>
            <Textarea
              id="widget-content"
              placeholder="Enter widget content or description"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="bg-background border-border min-h-[80px] resize-none"
              required
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClose}
              className="border-border hover:bg-surface-secondary"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-dashboard-accent hover:bg-dashboard-accent/90 text-dashboard-accent-foreground"
            >
              Add Widget
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddWidgetModal;