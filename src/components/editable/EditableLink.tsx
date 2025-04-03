
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface EditableLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  onSave?: (text: string) => void;
  isEditing?: boolean;
}

export const EditableLink: React.FC<EditableLinkProps> = ({
  to,
  children,
  className = "",
  onSave,
  isEditing = false
}) => {
  const [isEditing_, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(children?.toString() || '');
  const { isAdmin } = useAuth();

  const handleSave = () => {
    if (onSave) {
      onSave(editedText);
    }
    setIsEditing(false);
  };

  if (!isAdmin || (!isEditing && !isEditing_)) {
    return <Link to={to} className={className}>{children}</Link>;
  }

  return (
    <div className="flex items-center gap-2">
      <Input
        value={editedText}
        onChange={(e) => setEditedText(e.target.value)}
        className={className}
      />
      <Button size="sm" onClick={handleSave}>Save</Button>
      <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
    </div>
  );
};
