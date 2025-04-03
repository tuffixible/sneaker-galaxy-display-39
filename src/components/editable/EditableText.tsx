
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface EditableTextProps {
  content: string;
  onSave: (newContent: string) => void;
  className?: string;
  isEditing?: boolean;
}

export const EditableText: React.FC<EditableTextProps> = ({
  content,
  onSave,
  className = "",
  isEditing = false
}) => {
  const [isEditing_, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const { isAdmin } = useAuth();

  const handleSave = () => {
    onSave(editedContent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedContent(content);
    setIsEditing(false);
  };

  if (!isAdmin || (!isEditing && !isEditing_)) {
    return <span className={className}>{content}</span>;
  }

  return (
    <div className="flex items-center gap-2">
      <Input
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
        className={className}
      />
      <Button size="sm" onClick={handleSave}>Save</Button>
      <Button size="sm" variant="outline" onClick={handleCancel}>Cancel</Button>
    </div>
  );
};
