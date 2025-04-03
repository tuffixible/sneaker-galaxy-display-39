
import React, { createContext, useContext, useState } from 'react';

interface EditModeContextType {
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  editableContent: Record<string, any>;
  updateContent: (key: string, value: any) => void;
}

const EditModeContext = createContext<EditModeContextType | undefined>(undefined);

export const EditModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableContent, setEditableContent] = useState<Record<string, any>>({});

  const updateContent = (key: string, value: any) => {
    setEditableContent(prev => ({
      ...prev,
      [key]: value
    }));
    // Save to localStorage
    localStorage.setItem('siteContent', JSON.stringify({
      ...editableContent,
      [key]: value
    }));
    // Trigger update event
    window.dispatchEvent(new Event('siteContentUpdated'));
  };

  return (
    <EditModeContext.Provider value={{ isEditing, setIsEditing, editableContent, updateContent }}>
      {children}
    </EditModeContext.Provider>
  );
};

export const useEditMode = () => {
  const context = useContext(EditModeContext);
  if (context === undefined) {
    throw new Error('useEditMode must be used within an EditModeProvider');
  }
  return context;
};
