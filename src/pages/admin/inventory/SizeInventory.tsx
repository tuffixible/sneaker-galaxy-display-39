
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { SizeStockMap } from './InventoryUtils';

interface SizeInventoryProps {
  productId: string;
  sizes: (number | string)[];
  sizeStock: SizeStockMap;
  content: any;
  onSizeStockChange: (productId: string, size: string, value: string) => void;
}

const SizeInventory: React.FC<SizeInventoryProps> = ({
  productId,
  sizes,
  sizeStock,
  content,
  onSizeStockChange
}) => {
  return (
    <div className="space-y-4">
      <h4 className="font-medium">{content.stockPerSize}</h4>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sizes.map(size => (
          <div key={`size-${productId}-${size}`} className="flex items-center space-x-2">
            <Label className="w-16">{content.sizeLabel} {size}</Label>
            <Input 
              type="number" 
              min="0" 
              value={sizeStock[productId]?.[size.toString()] || 0}
              onChange={(e) => onSizeStockChange(productId, size.toString(), e.target.value)}
              className="w-20"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SizeInventory;
