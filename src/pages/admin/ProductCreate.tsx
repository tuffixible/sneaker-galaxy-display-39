
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { toast } from 'sonner';
import { ArrowLeft, Plus, Upload, X } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';

const ProductCreate = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  // Content based on language
  const getContent = () => {
    switch(language) {
      case 'pt':
        return {
          title: "Adicionar Novo Produto",
          backToProducts: "Voltar para Produtos",
          basicInfo: "Informações Básicas",
          name: "Nome do Produto",
          brand: "Marca",
          price: "Preço (USD)",
          description: "Descrição",
          inventory: "Estoque",
          stockManagement: "Gerenciamento de Estoque",
          initialStock: "Estoque Inicial",
          lowStockThreshold: "Limite de Estoque Baixo",
          trackInventory: "Controlar Estoque",
          attributes: "Atributos",
          colors: "Cores Disponíveis",
          addColor: "Adicionar Cor",
          sizes: "Tamanhos Disponíveis",
          addSize: "Adicionar Tamanho",
          images: "Imagens",
          addImages: "Adicionar Imagens",
          displayOptions: "Opções de Exibição",
          featured: "Destaque na Página Inicial",
          status: "Status do Produto",
          active: "Ativo",
          inactive: "Inativo",
          category: "Categoria",
          selectCategory: "Selecionar Categoria",
          submit: "Criar Produto",
          cancel: "Cancelar"
        };
      case 'es':
        return {
          title: "Agregar Nuevo Producto",
          backToProducts: "Volver a Productos",
          basicInfo: "Información Básica",
          name: "Nombre del Producto",
          brand: "Marca",
          price: "Precio (USD)",
          description: "Descripción",
          inventory: "Inventario",
          stockManagement: "Gestión de Inventario",
          initialStock: "Stock Inicial",
          lowStockThreshold: "Límite de Stock Bajo",
          trackInventory: "Controlar Inventario",
          attributes: "Atributos",
          colors: "Colores Disponibles",
          addColor: "Agregar Color",
          sizes: "Tallas Disponibles",
          addSize: "Agregar Talla",
          images: "Imágenes",
          addImages: "Agregar Imágenes",
          displayOptions: "Opciones de Visualización",
          featured: "Destacado en Página Principal",
          status: "Estado del Producto",
          active: "Activo",
          inactive: "Inactivo",
          category: "Categoría",
          selectCategory: "Seleccionar Categoría",
          submit: "Crear Producto",
          cancel: "Cancelar"
        };
      default: // 'en'
        return {
          title: "Add New Product",
          backToProducts: "Back to Products",
          basicInfo: "Basic Information",
          name: "Product Name",
          brand: "Brand",
          price: "Price (USD)",
          description: "Description",
          inventory: "Inventory",
          stockManagement: "Stock Management",
          initialStock: "Initial Stock",
          lowStockThreshold: "Low Stock Threshold",
          trackInventory: "Track Inventory",
          attributes: "Attributes",
          colors: "Available Colors",
          addColor: "Add Color",
          sizes: "Available Sizes",
          addSize: "Add Size",
          images: "Images",
          addImages: "Add Images",
          displayOptions: "Display Options",
          featured: "Featured on Homepage",
          status: "Product Status",
          active: "Active",
          inactive: "Inactive",
          category: "Category",
          selectCategory: "Select Category",
          submit: "Create Product",
          cancel: "Cancel"
        };
    }
  };
  
  const content = getContent();
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price: '',
    description: '',
    initialStock: '10',
    lowStockThreshold: '5',
    trackInventory: true,
    colors: [''],
    sizes: [''],
    images: [''],
    featured: false,
    active: true,
    category: '',
    destination: 'site' // Site by default
  });
  
  // Categories (could be fetched from API)
  const categories = [
    { id: 'running', name: 'Running' },
    { id: 'casual', name: 'Casual' },
    { id: 'basketball', name: 'Basketball' },
    { id: 'skate', name: 'Skate' },
    { id: 'training', name: 'Training' }
  ];
  
  // Destinations for the product
  const destinations = [
    { id: 'site', name: language === 'pt' ? 'Site (Catálogo)' : language === 'es' ? 'Sitio (Catálogo)' : 'Site (Catalog)' },
    { id: 'store', name: language === 'pt' ? 'Loja Física' : language === 'es' ? 'Tienda Física' : 'Physical Store' },
    { id: 'both', name: language === 'pt' ? 'Ambos' : language === 'es' ? 'Ambos' : 'Both' }
  ];
  
  // Handle input changes
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };
  
  // Handle array field changes (colors, sizes, images)
  const handleArrayChange = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };
  
  // Add new item to array field
  const handleAddItem = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ''] });
  };
  
  // Remove item from array field
  const handleRemoveItem = (field, index) => {
    const newArray = [...formData[field]];
    newArray.splice(index, 1);
    setFormData({ ...formData, [field]: newArray });
  };
  
  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.brand || !formData.price) {
      toast.error("Please fill all required fields");
      return;
    }
    
    // Validate at least one color, size and image
    if (formData.colors.length === 0 || formData.sizes.length === 0 || formData.images.length === 0) {
      toast.error("Product must have at least one color, size and image");
      return;
    }
    
    // Create new product
    const newProduct = {
      id: Date.now().toString(), // Generate temporary ID
      name: formData.name,
      brand: formData.brand,
      price: parseFloat(formData.price),
      description: formData.description,
      colors: formData.colors.filter(color => color.trim() !== ''),
      sizes: formData.sizes.map(size => parseInt(size)).filter(size => !isNaN(size)),
      images: formData.images.filter(image => image.trim() !== ''),
      featured: formData.featured,
      category: formData.category,
      active: formData.active,
      destination: formData.destination,
      // Inventory data
      stock: parseInt(formData.initialStock) || 0,
      lowStockThreshold: parseInt(formData.lowStockThreshold) || 5,
      trackInventory: formData.trackInventory
    };
    
    // In a real app, this would be an API call
    console.log('Creating new product:', newProduct);
    
    // Store in localStorage for demo purposes
    const existingProducts = JSON.parse(localStorage.getItem('products') || '[]');
    localStorage.setItem('products', JSON.stringify([...existingProducts, newProduct]));
    
    // Add to inventory as well
    const existingInventory = JSON.parse(localStorage.getItem('inventory') || '[]');
    const inventoryItem = {
      ...newProduct,
      sku: `SKU-${newProduct.id.padStart(6, '0')}`,
      status: newProduct.stock > 0 ? 
        (newProduct.stock <= newProduct.lowStockThreshold ? 'low-stock' : 'in-stock') : 
        'out-of-stock'
    };
    localStorage.setItem('inventory', JSON.stringify([...existingInventory, inventoryItem]));
    
    // Show success message
    toast.success("Product created successfully!");
    
    // Trigger custom event to update product lists across the app
    window.dispatchEvent(new CustomEvent('productsUpdated'));
    
    // Redirect back to products page
    navigate('/admin/products');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => navigate('/admin/products')}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-3xl font-bold tracking-tight">{content.title}</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>{content.basicInfo}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">{content.name} *</Label>
                <Input 
                  id="name" 
                  value={formData.name} 
                  onChange={(e) => handleChange('name', e.target.value)} 
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="brand">{content.brand} *</Label>
                <Input 
                  id="brand" 
                  value={formData.brand} 
                  onChange={(e) => handleChange('brand', e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">{content.price} *</Label>
                <Input 
                  id="price" 
                  type="number" 
                  min="0"
                  step="0.01" 
                  value={formData.price} 
                  onChange={(e) => handleChange('price', e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">{content.category}</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => handleChange('category', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={content.selectCategory} />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">{content.description}</Label>
              <Textarea 
                id="description" 
                value={formData.description} 
                onChange={(e) => handleChange('description', e.target.value)}
                rows={4}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="destination">Product Destination</Label>
              <Select 
                value={formData.destination} 
                onValueChange={(value) => handleChange('destination', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select destination" />
                </SelectTrigger>
                <SelectContent>
                  {destinations.map((dest) => (
                    <SelectItem key={dest.id} value={dest.id}>
                      {dest.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        
        {/* Inventory */}
        <Card>
          <CardHeader>
            <CardTitle>{content.inventory}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch 
                id="trackInventory"
                checked={formData.trackInventory}
                onCheckedChange={(checked) => handleChange('trackInventory', checked)}
              />
              <Label htmlFor="trackInventory">{content.trackInventory}</Label>
            </div>
            
            {formData.trackInventory && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="initialStock">{content.initialStock}</Label>
                  <Input 
                    id="initialStock" 
                    type="number" 
                    min="0" 
                    value={formData.initialStock} 
                    onChange={(e) => handleChange('initialStock', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lowStockThreshold">{content.lowStockThreshold}</Label>
                  <Input 
                    id="lowStockThreshold" 
                    type="number" 
                    min="0" 
                    value={formData.lowStockThreshold} 
                    onChange={(e) => handleChange('lowStockThreshold', e.target.value)}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Attributes */}
        <Card>
          <CardHeader>
            <CardTitle>{content.attributes}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Colors */}
            <div className="space-y-4">
              <Label>{content.colors}</Label>
              {formData.colors.map((color, index) => (
                <div key={`color-${index}`} className="flex items-center space-x-2">
                  <Input 
                    value={color} 
                    onChange={(e) => handleArrayChange('colors', index, e.target.value)}
                    placeholder="e.g. Black/White"
                  />
                  {formData.colors.length > 1 && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="icon" 
                      onClick={() => handleRemoveItem('colors', index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => handleAddItem('colors')}
              >
                <Plus className="h-4 w-4 mr-2" />
                {content.addColor}
              </Button>
            </div>
            
            {/* Sizes */}
            <div className="space-y-4">
              <Label>{content.sizes}</Label>
              {formData.sizes.map((size, index) => (
                <div key={`size-${index}`} className="flex items-center space-x-2">
                  <Input 
                    value={size} 
                    onChange={(e) => handleArrayChange('sizes', index, e.target.value)}
                    placeholder="e.g. 42"
                    type="number"
                  />
                  {formData.sizes.length > 1 && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="icon" 
                      onClick={() => handleRemoveItem('sizes', index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => handleAddItem('sizes')}
              >
                <Plus className="h-4 w-4 mr-2" />
                {content.addSize}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Images */}
        <Card>
          <CardHeader>
            <CardTitle>{content.images}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.images.map((image, index) => (
              <div key={`image-${index}`} className="flex items-center space-x-2">
                <Input 
                  value={image} 
                  onChange={(e) => handleArrayChange('images', index, e.target.value)}
                  placeholder="Image URL"
                />
                {formData.images.length > 1 && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="icon" 
                    onClick={() => handleRemoveItem('images', index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => handleAddItem('images')}
            >
              <Upload className="h-4 w-4 mr-2" />
              {content.addImages}
            </Button>
          </CardContent>
        </Card>
        
        {/* Display Options */}
        <Card>
          <CardHeader>
            <CardTitle>{content.displayOptions}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="featured" 
                checked={formData.featured}
                onCheckedChange={(checked) => handleChange('featured', checked)}
              />
              <Label htmlFor="featured">{content.featured}</Label>
            </div>
            
            <div className="space-y-2">
              <Label>{content.status}</Label>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    id="active" 
                    name="status"
                    checked={formData.active}
                    onChange={() => handleChange('active', true)}
                  />
                  <Label htmlFor="active">{content.active}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    id="inactive" 
                    name="status"
                    checked={!formData.active}
                    onChange={() => handleChange('active', false)}
                  />
                  <Label htmlFor="inactive">{content.inactive}</Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Form Actions */}
        <div className="flex justify-end space-x-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate('/admin/products')}
          >
            {content.cancel}
          </Button>
          <Button type="submit">
            {content.submit}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductCreate;
