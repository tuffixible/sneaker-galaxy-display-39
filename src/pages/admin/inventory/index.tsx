
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { toast } from 'sonner';
import { 
  InventoryItem, 
  SizeStockMap, 
  getInventoryContent, 
  calculateStatus, 
  saveInventoryChanges 
} from './InventoryUtils';
import InventoryHeader from './InventoryHeader';
import InventoryFilterBar from './InventoryFilterBar';
import InventoryTable from './InventoryTable';

const Inventory = () => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
  const [sizeStock, setSizeStock] = useState<SizeStockMap>({});

  // Get content for current language
  const content = getInventoryContent(language);
  
  // Load inventory from localStorage 
  useEffect(() => {
    const loadInventory = () => {
      let savedInventory = JSON.parse(localStorage.getItem('inventory') || '[]') as InventoryItem[];
      
      // If no saved inventory, create from products data
      if (savedInventory.length === 0) {
        const products = JSON.parse(localStorage.getItem('products') || '[]');
        if (products.length === 0) {
          // Use hardcoded products as fallback
          try {
            // Dynamic import of products
            import('@/data/products').then(({ products }) => {
              savedInventory = products.map(product => ({
                ...product,
                stock: Math.floor(Math.random() * 100),
                lowStockThreshold: 10,
                status: Math.random() > 0.2 ? 'in-stock' : 'out-of-stock',
                sku: `SKU-${product.id.padStart(6, '0')}`,
              }));
              setInventory(savedInventory);
              localStorage.setItem('inventory', JSON.stringify(savedInventory));
            });
          } catch (error) {
            console.error('Error loading products:', error);
          }
        } else {
          // Convert products to inventory format
          savedInventory = products.map(product => ({
            ...product,
            sku: `SKU-${product.id.padStart(6, '0')}`,
            status: product.stock > 0 ? 
              (product.stock <= product.lowStockThreshold ? 'low-stock' : 'in-stock') : 
              'out-of-stock'
          }));
          setInventory(savedInventory);
          localStorage.setItem('inventory', JSON.stringify(savedInventory));
        }
      } else {
        setInventory(savedInventory);
      }
    };
    
    loadInventory();
    
    // Listen for updates
    const handleInventoryUpdate = () => {
      loadInventory();
    };
    
    window.addEventListener('inventoryUpdated', handleInventoryUpdate);
    window.addEventListener('productsUpdated', handleInventoryUpdate);
    
    return () => {
      window.removeEventListener('inventoryUpdated', handleInventoryUpdate);
      window.removeEventListener('productsUpdated', handleInventoryUpdate);
    };
  }, []);
  
  // Filter products based on search term and status filter
  const filteredProducts = inventory.filter(product => {
    const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterStatus === 'all') return matchesSearch;
    return matchesSearch && product.status === filterStatus;
  });
  
  // Update stock quantity for a product
  const handleStockChange = (id: string, stock: number) => {
    setInventory(prev => 
      prev.map(item => {
        if (item.id === id) {
          const newStatus = calculateStatus(stock, item.lowStockThreshold);
          
          return { 
            ...item, 
            stock,
            status: newStatus
          };
        }
        return item;
      })
    );
  };
  
  // Update low stock threshold for a product
  const handleThresholdChange = (id: string, threshold: number) => {
    setInventory(prev => 
      prev.map(item => {
        if (item.id === id) {
          const newStatus = calculateStatus(item.stock, threshold);
          
          return { 
            ...item, 
            lowStockThreshold: threshold,
            status: newStatus
          };
        }
        return item;
      })
    );
  };
  
  // Save inventory changes
  const handleSaveChanges = () => {
    saveInventoryChanges(inventory);
    // Show success message
    toast.success(content.messages.saved);
  };
  
  // Toggle expanded view for a product
  const toggleExpandProduct = (productId: string) => {
    if (expandedProduct === productId) {
      setExpandedProduct(null);
    } else {
      setExpandedProduct(productId);
      
      // Initialize size stock if not already set
      const product = inventory.find(p => p.id === productId);
      if (product && product.sizes) {
        const initialSizeStock: { [size: string]: number } = {};
        product.sizes.forEach(size => {
          // Convert size to string to use as an object key
          const sizeKey = size.toString();
          initialSizeStock[sizeKey] = Math.floor(product.stock / product.sizes!.length);
        });
        setSizeStock(prev => ({ 
          ...prev, 
          [productId]: initialSizeStock 
        }));
      }
    }
  };
  
  // Update stock for a specific size
  const handleSizeStockChange = (productId: string, size: string, value: string) => {
    setSizeStock(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [size]: parseInt(value) || 0
      }
    }));
    
    // Update total stock
    const product = inventory.find(p => p.id === productId);
    if (product) {
      const updatedSizeStock = {
        ...sizeStock[productId],
        [size]: parseInt(value) || 0
      };
      
      // Calculate total stock from all sizes
      const totalStock = Object.values(updatedSizeStock).reduce((sum, val) => sum + (Number(val) || 0), 0);
      handleStockChange(productId, totalStock);
    }
  };
  
  return (
    <div className="space-y-6">
      <InventoryHeader
        title={content.title}
        description={content.description}
        saveButtonText={content.buttons.save}
        backButtonText={content.buttons.back}
        onSave={handleSaveChanges}
      />
      
      <Card>
        <CardHeader className="pb-3">
          <InventoryFilterBar
            searchTerm={searchTerm}
            filterStatus={filterStatus}
            content={content}
            onSearchChange={setSearchTerm}
            onStatusFilterChange={setFilterStatus}
          />
        </CardHeader>
        <CardContent>
          <InventoryTable
            filteredProducts={filteredProducts}
            expandedProduct={expandedProduct}
            sizeStock={sizeStock}
            content={content}
            onStockChange={handleStockChange}
            onThresholdChange={handleThresholdChange}
            onToggleExpand={toggleExpandProduct}
            onSizeStockChange={handleSizeStockChange}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Inventory;
