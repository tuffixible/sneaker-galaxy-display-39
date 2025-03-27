
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { InventoryItem as InventoryItemType, SizeStockMap } from './InventoryUtils';
import InventoryItem from './InventoryItem';

interface InventoryTableProps {
  filteredProducts: InventoryItemType[];
  expandedProduct: string | null;
  sizeStock: SizeStockMap;
  content: any;
  onStockChange: (id: string, stock: number) => void;
  onThresholdChange: (id: string, threshold: number) => void;
  onToggleExpand: (productId: string) => void;
  onSizeStockChange: (productId: string, size: string, value: string) => void;
}

const InventoryTable: React.FC<InventoryTableProps> = ({
  filteredProducts,
  expandedProduct,
  sizeStock,
  content,
  onStockChange,
  onThresholdChange,
  onToggleExpand,
  onSizeStockChange
}) => {
  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{content.columns.product}</TableHead>
            <TableHead>{content.columns.sku}</TableHead>
            <TableHead>{content.columns.stock}</TableHead>
            <TableHead>{content.columns.threshold}</TableHead>
            <TableHead>{content.columns.status}</TableHead>
            <TableHead>{content.columns.actions}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <InventoryItem
                key={product.id}
                product={product}
                expandedProduct={expandedProduct}
                sizeStock={sizeStock}
                content={content}
                onStockChange={onStockChange}
                onThresholdChange={onThresholdChange}
                onToggleExpand={onToggleExpand}
                onSizeStockChange={onSizeStockChange}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                {content.noProducts}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default InventoryTable;
