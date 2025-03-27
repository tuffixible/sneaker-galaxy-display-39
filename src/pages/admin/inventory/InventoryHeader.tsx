
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save } from 'lucide-react';

interface InventoryHeaderProps {
  title: string;
  description: string;
  saveButtonText: string;
  backButtonText: string;
  onSave: () => void;
}

const InventoryHeader: React.FC<InventoryHeaderProps> = ({
  title,
  description,
  saveButtonText,
  backButtonText,
  onSave
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="icon" 
          asChild
        >
          <Link to="/admin/products">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
      <Button onClick={onSave}>
        <Save className="h-4 w-4 mr-2" />
        {saveButtonText}
      </Button>
    </div>
  );
};

export default InventoryHeader;
