
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface InventoryFilterBarProps {
  searchTerm: string;
  filterStatus: string;
  content: any;
  onSearchChange: (term: string) => void;
  onStatusFilterChange: (status: string) => void;
}

const InventoryFilterBar: React.FC<InventoryFilterBarProps> = ({
  searchTerm,
  filterStatus,
  content,
  onSearchChange,
  onStatusFilterChange
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-center space-x-2 flex-1">
        <Search className="h-5 w-5 text-muted-foreground" />
        <Input
          placeholder={content.search}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex-1"
        />
      </div>
      <div className="flex items-center space-x-2">
        <Label htmlFor="status-filter" className="mr-2">
          Filtrar:
        </Label>
        <Select value={filterStatus} onValueChange={onStatusFilterChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{content.filters.all}</SelectItem>
            <SelectItem value="in-stock">{content.filters.inStock}</SelectItem>
            <SelectItem value="low-stock">{content.filters.lowStock}</SelectItem>
            <SelectItem value="out-of-stock">{content.filters.outOfStock}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default InventoryFilterBar;
