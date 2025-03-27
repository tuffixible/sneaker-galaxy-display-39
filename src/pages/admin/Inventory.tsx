
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Search, ArrowLeft, Save, RefreshCw } from 'lucide-react';

// Define type for inventory item
interface InventoryItem {
  id: string;
  name: string;
  brand?: string;
  images?: string[];
  stock: number;
  lowStockThreshold: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  sku: string;
  sizes?: string[];
}

// Define type for size stock
interface SizeStockMap {
  [productId: string]: {
    [size: string]: number;
  };
}

const Inventory = () => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [filterStatus, setFilterStatus] = useState('all');
  
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
  
  // Multilingual content
  const getInventoryContent = () => {
    switch(language) {
      case 'pt':
        return {
          title: "Gerenciamento de Estoque",
          description: "Controle o estoque e disponibilidade dos produtos",
          search: "Buscar produtos...",
          columns: {
            product: "Produto",
            sku: "SKU",
            stock: "Estoque Atual",
            threshold: "Limite Mínimo",
            status: "Status",
            actions: "Ações"
          },
          status: {
            inStock: "Em Estoque",
            lowStock: "Estoque Baixo",
            outOfStock: "Sem Estoque"
          },
          buttons: {
            save: "Salvar Alterações",
            update: "Atualizar Estoque",
            back: "Voltar aos Produtos"
          },
          messages: {
            saved: "Estoque atualizado com sucesso!",
            updateItem: "Atualizar item"
          },
          noProducts: "Nenhum produto encontrado",
          filters: {
            all: "Todos",
            inStock: "Em Estoque",
            lowStock: "Estoque Baixo",
            outOfStock: "Sem Estoque"
          },
          sizes: "Tamanhos",
          sizeLabel: "Tamanho",
          stockPerSize: "Estoque por Tamanho"
        };
      case 'es':
        return {
          title: "Gestión de Inventario",
          description: "Controla el inventario y disponibilidad de productos",
          search: "Buscar productos...",
          columns: {
            product: "Producto",
            sku: "SKU",
            stock: "Stock Actual",
            threshold: "Límite Mínimo",
            status: "Estado",
            actions: "Acciones"
          },
          status: {
            inStock: "En Stock",
            lowStock: "Stock Bajo",
            outOfStock: "Sin Stock"
          },
          buttons: {
            save: "Guardar Cambios",
            update: "Actualizar Stock",
            back: "Volver a Productos"
          },
          messages: {
            saved: "¡Inventario actualizado con éxito!",
            updateItem: "Actualizar ítem"
          },
          noProducts: "No se encontraron productos",
          filters: {
            all: "Todos",
            inStock: "En Stock",
            lowStock: "Stock Bajo",
            outOfStock: "Sin Stock"
          },
          sizes: "Tallas",
          sizeLabel: "Talla",
          stockPerSize: "Stock por Talla"
        };
      default: // 'en'
        return {
          title: "Inventory Management",
          description: "Control product stock and availability",
          search: "Search products...",
          columns: {
            product: "Product",
            sku: "SKU",
            stock: "Current Stock",
            threshold: "Low Stock Threshold",
            status: "Status",
            actions: "Actions"
          },
          status: {
            inStock: "In Stock",
            lowStock: "Low Stock",
            outOfStock: "Out of Stock"
          },
          buttons: {
            save: "Save Changes",
            update: "Update Stock",
            back: "Back to Products"
          },
          messages: {
            saved: "Inventory updated successfully!",
            updateItem: "Update item"
          },
          noProducts: "No products found",
          filters: {
            all: "All",
            inStock: "In Stock",
            lowStock: "Low Stock",
            outOfStock: "Out of Stock"
          },
          sizes: "Sizes",
          sizeLabel: "Size",
          stockPerSize: "Stock per Size"
        };
    }
  };
  
  const content = getInventoryContent();
  
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
          const newStatus = 
            stock <= 0 ? 'out-of-stock' : 
            stock < item.lowStockThreshold ? 'low-stock' : 
            'in-stock';
          
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
          const newStatus = 
            item.stock <= 0 ? 'out-of-stock' : 
            item.stock < threshold ? 'low-stock' : 
            'in-stock';
          
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
    // Save to localStorage
    localStorage.setItem('inventory', JSON.stringify(inventory));
    
    // Update products too
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const updatedProducts = products.map(product => {
      const inventoryItem = inventory.find(item => item.id === product.id);
      if (inventoryItem) {
        return {
          ...product,
          stock: inventoryItem.stock,
          lowStockThreshold: inventoryItem.lowStockThreshold,
          status: inventoryItem.status
        };
      }
      return product;
    });
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    
    // Show success message
    toast.success(content.messages.saved);
    
    // Trigger custom event to update product lists
    window.dispatchEvent(new CustomEvent('productsUpdated'));
    window.dispatchEvent(new CustomEvent('inventoryUpdated'));
  };
  
  // Get status badge class based on status
  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case 'in-stock':
        return "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100";
      case 'low-stock':
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100";
      case 'out-of-stock':
        return "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };
  
  // Get status display text
  const getStatusText = (status: string) => {
    switch(status) {
      case 'in-stock':
        return content.status.inStock;
      case 'low-stock':
        return content.status.lowStock;
      case 'out-of-stock':
        return content.status.outOfStock;
      default:
        return status;
    }
  };
  
  // Track stock per size (expanded view)
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
  const [sizeStock, setSizeStock] = useState<SizeStockMap>({});
  
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
          initialSizeStock[size] = Math.floor(product.stock / product.sizes.length);
        });
        setSizeStock(prev => ({ ...prev, [productId]: initialSizeStock }));
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
      
      const totalStock = Object.values(updatedSizeStock).reduce((sum, val) => sum + val, 0);
      handleStockChange(productId, totalStock);
    }
  };
  
  return (
    <div className="space-y-6">
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
            <h2 className="text-3xl font-bold tracking-tight">{content.title}</h2>
            <p className="text-muted-foreground">{content.description}</p>
          </div>
        </div>
        <Button onClick={handleSaveChanges}>
          <Save className="h-4 w-4 mr-2" />
          {content.buttons.save}
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-2 flex-1">
              <Search className="h-5 w-5 text-muted-foreground" />
              <Input
                placeholder={content.search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="status-filter" className="mr-2">
                Filtrar:
              </Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
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
        </CardHeader>
        <CardContent>
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
                    <>
                      <TableRow key={product.id} className="cursor-pointer hover:bg-muted/50" onClick={() => toggleExpandProduct(product.id)}>
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
                            onChange={(e) => handleStockChange(product.id, parseInt(e.target.value) || 0)}
                            className="w-20"
                            onClick={(e) => e.stopPropagation()}
                          />
                        </TableCell>
                        <TableCell>
                          <Input 
                            type="number" 
                            min="0" 
                            value={product.lowStockThreshold || 0} 
                            onChange={(e) => handleThresholdChange(product.id, parseInt(e.target.value) || 0)}
                            className="w-20"
                            onClick={(e) => e.stopPropagation()}
                          />
                        </TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            getStatusBadgeClass(product.status)
                          }`}>
                            {getStatusText(product.status)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStockChange(product.id, product.stock); // Refreshes status
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
                            <div className="space-y-4">
                              <h4 className="font-medium">{content.stockPerSize}</h4>
                              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {product.sizes.map(size => (
                                  <div key={`size-${product.id}-${size}`} className="flex items-center space-x-2">
                                    <Label className="w-16">{content.sizeLabel} {size}</Label>
                                    <Input 
                                      type="number" 
                                      min="0" 
                                      value={sizeStock[product.id]?.[size] || 0}
                                      onChange={(e) => handleSizeStockChange(product.id, size, e.target.value)}
                                      className="w-20"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default Inventory;
