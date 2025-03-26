
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { products, Product } from '@/data/products';
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
import { Plus, MoreHorizontal, Search, Edit, Trash, Eye } from 'lucide-react';

const Products = () => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  
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
          noProducts: "Nenhum produto encontrado"
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
          noProducts: "No se encontraron productos"
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
          noProducts: "No products found"
        };
    }
  };
  
  const content = getProductsContent();
  
  // Add stock info to products (mocked for demo)
  const productsWithStock = products.map(product => ({
    ...product,
    stock: Math.floor(Math.random() * 100),
    active: Math.random() > 0.2 // 80% chance of being active
  }));
  
  // Filter products based on search term
  const filteredProducts = productsWithStock.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{content.title}</h2>
          <p className="text-muted-foreground">{content.description}</p>
        </div>
        <Button className="w-full md:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          {content.addProduct}
        </Button>
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
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.brand}</TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <span className={product.stock < 10 ? "text-red-500 font-medium" : ""}>
                          {product.stock}
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
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              <span>{content.actions.view}</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              <span>{content.actions.edit}</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
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
