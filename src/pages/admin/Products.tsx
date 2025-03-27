
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Plus, MoreHorizontal, Search, Edit, Trash, Eye, Package } from 'lucide-react';

const Products = () => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  
  // Load products from localStorage or fallback to static data
  useEffect(() => {
    const loadProducts = () => {
      const savedProducts = JSON.parse(localStorage.getItem('products') || '[]');
      
      if (savedProducts.length > 0) {
        setProducts(savedProducts);
      } else {
        // Fallback to static data
        try {
          // Dynamic import of products
          import('@/data/products').then(({ products: staticProducts }) => {
            const productsWithStock = staticProducts.map(product => ({
              ...product,
              stock: Math.floor(Math.random() * 100),
              active: Math.random() > 0.2 // 80% chance of being active
            }));
            setProducts(productsWithStock);
            localStorage.setItem('products', JSON.stringify(productsWithStock));
          });
        } catch (error) {
          console.error('Error loading products:', error);
        }
      }
    };
    
    loadProducts();
    
    // Listen for updates
    const handleProductsUpdated = () => {
      loadProducts();
    };
    
    window.addEventListener('productsUpdated', handleProductsUpdated);
    
    return () => {
      window.removeEventListener('productsUpdated', handleProductsUpdated);
    };
  }, []);
  
  // Multilingual content
  const getProductsContent = () => {
    switch(language) {
      case 'pt':
        return {
          title: "Produtos",
          description: "Gerenciar produtos da loja",
          addProduct: "Adicionar Produto",
          search: "Buscar produtos...",
          columns: {
            name: "Nome",
            brand: "Marca",
            price: "Preço",
            stock: "Estoque",
            status: "Status",
            actions: "Ações"
          },
          status: {
            active: "Ativo",
            inactive: "Inativo"
          },
          actions: {
            view: "Visualizar",
            edit: "Editar",
            delete: "Excluir"
          },
          noProducts: "Nenhum produto encontrado",
          manageInventory: "Gerenciar Estoque"
        };
      case 'es':
        return {
          title: "Productos",
          description: "Gestionar productos de la tienda",
          addProduct: "Añadir Producto",
          search: "Buscar productos...",
          columns: {
            name: "Nombre",
            brand: "Marca",
            price: "Precio",
            stock: "Inventario",
            status: "Estado",
            actions: "Acciones"
          },
          status: {
            active: "Activo",
            inactive: "Inactivo"
          },
          actions: {
            view: "Ver",
            edit: "Editar",
            delete: "Eliminar"
          },
          noProducts: "No se encontraron productos",
          manageInventory: "Gestionar Inventario"
        };
      default: // 'en'
        return {
          title: "Products",
          description: "Manage store products",
          addProduct: "Add Product",
          search: "Search products...",
          columns: {
            name: "Name",
            brand: "Brand",
            price: "Price",
            stock: "Stock",
            status: "Status",
            actions: "Actions"
          },
          status: {
            active: "Active",
            inactive: "Inactive"
          },
          actions: {
            view: "View",
            edit: "Edit",
            delete: "Delete"
          },
          noProducts: "No products found",
          manageInventory: "Manage Inventory"
        };
    }
  };
  
  const content = getProductsContent();
  
  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Delete product
  const handleDeleteProduct = (productId) => {
    // Remove from products
    const updatedProducts = products.filter(product => product.id !== productId);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    
    // Remove from inventory
    const inventory = JSON.parse(localStorage.getItem('inventory') || '[]');
    const updatedInventory = inventory.filter(item => item.id !== productId);
    localStorage.setItem('inventory', JSON.stringify(updatedInventory));
    
    // Trigger updates
    window.dispatchEvent(new CustomEvent('productsUpdated'));
    window.dispatchEvent(new CustomEvent('inventoryUpdated'));
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{content.title}</h2>
          <p className="text-muted-foreground">{content.description}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button asChild>
            <Link to="/admin/inventory">
              <Package className="mr-2 h-4 w-4" />
              {content.manageInventory}
            </Link>
          </Button>
          <Button asChild>
            <Link to="/admin/products/new">
              <Plus className="mr-2 h-4 w-4" />
              {content.addProduct}
            </Link>
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-2">
            <Search className="h-5 w-5 text-muted-foreground" />
            <Input
              placeholder={content.search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{content.columns.name}</TableHead>
                  <TableHead>{content.columns.brand}</TableHead>
                  <TableHead>{content.columns.price}</TableHead>
                  <TableHead>{content.columns.stock}</TableHead>
                  <TableHead>{content.columns.status}</TableHead>
                  <TableHead className="text-right">{content.columns.actions}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <img 
                            src={product.images?.[0] || '/placeholder.svg'} 
                            alt={product.name} 
                            className="h-10 w-10 object-cover rounded"
                          />
                          {product.name}
                        </div>
                      </TableCell>
                      <TableCell>{product.brand}</TableCell>
                      <TableCell>${product.price?.toFixed(2) || '0.00'}</TableCell>
                      <TableCell>
                        <span className={product.stock < (product.lowStockThreshold || 10) ? "text-red-500 font-medium" : ""}>
                          {product.stock || 0}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          product.active 
                            ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100" 
                            : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                        }`}>
                          {product.active ? content.status.active : content.status.inactive}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>{content.actions.view}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <Link to={`/product/${product.id}`} target="_blank">
                                <Eye className="mr-2 h-4 w-4" />
                                <span>{content.actions.view}</span>
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link to={`/admin/products/edit/${product.id}`}>
                                <Edit className="mr-2 h-4 w-4" />
                                <span>{content.actions.edit}</span>
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => handleDeleteProduct(product.id)}
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              <span>{content.actions.delete}</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
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

export default Products;
