
import React from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TableRow, TableCell } from '@/components/ui/table';
import { toast } from 'sonner';
import { InventoryItem as InventoryItemType } from './InventoryUtils';
import { getStatusBadgeClass, getStatusText } from './InventoryUtils';
import SizeInventory from './SizeInventory';
import { SizeStockMap } from './InventoryUtils';

interface InventoryItemProps {
  product: InventoryItemType;
  expandedProduct: string | null;
  sizeStock: SizeStockMap;
  content: any;
  onStockChange: (id: string, stock: number) => void;
  onThresholdChange: (id: string, threshold: number) => void;
  onToggleExpand: (productId: string) => void;
  onSizeStockChange: (productId: string, size: string, value: string) => void;
}

const InventoryItem: React.FC<InventoryItemProps> = ({
  product,
  expandedProduct,
  sizeStock,
  content,
  onStockChange,
  onThresholdChange,
  onToggleExpand,
  onSizeStockChange
}) => {
  return (
    <>
      <TableRow 
        key={product.id} 
        className="cursor-pointer hover:bg-muted/50" 
        onClick={() => onToggleExpand(product.id)}
      >
        <TableCell className="font-medium">
          <div className="flex items-center gap-3">
            <img 
              src={product.images?.[0] || '/placeholder.svg'} 
              alt={product.name} 
              className="h-10 w-10 object-cover rounded"
            />
            <div>
              <div>{product.name}</div>
              <div className="text-xs text-muted-foreground">{product.brand}</div>
            </div>
          </div>
        </TableCell>
        <TableCell>{product.sku || `SKU-${product.id.padStart(6, '0')}`}</TableCell>
        <TableCell>
          <Input 
            type="number" 
            min="0" 
            value={product.stock || 0} 
            onChange={(e) => onStockChange(product.id, parseInt(e.target.value) || 0)}
            className="w-20"
            onClick={(e) => e.stopPropagation()}
          />
        </TableCell>
        <TableCell>
          <Input 
            type="number" 
            min="0" 
            value={product.lowStockThreshold || 0} 
            onChange={(e) => onThresholdChange(product.id, parseInt(e.target.value) || 0)}
            className="w-20"
            onClick={(e) => e.stopPropagation()}
          />
        </TableCell>
        <TableCell>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            getStatusBadgeClass(product.status)
          }`}>
            {getStatusText(product.status, content)}
          </span>
        </TableCell>
        <TableCell>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8"
            onClick={(e) => {
              e.stopPropagation();
              onStockChange(product.id, product.stock); // Refreshes status
              toast.success(`${product.name} ${content.messages.updateItem}`);
            }}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            {content.buttons.update}
          </Button>
        </TableCell>
      </TableRow>
      
      {/* Expanded view for sizes */}
      {expandedProduct === product.id && product.sizes && product.sizes.length > 0 && (
        <TableRow className="bg-muted/30">
          <TableCell colSpan={6} className="p-4">
            <SizeInventory
              productId={product.id}
              sizes={product.sizes}
              sizeStock={sizeStock}
              content={content}
              onSizeStockChange={onSizeStockChange}
            />
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default InventoryItem;
