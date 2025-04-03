
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { getProductById, Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { ArrowLeft, Save, Upload, Plus, X, Image } from 'lucide-react';

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isNewProduct = !id;
  
  // Estado para armazenar os dados do produto
  const [product, setProduct] = useState<Product>({
    id: id || Date.now().toString(),
    name: '',
    brand: '',
    price: 0,
    colors: [],
    sizes: [],
    images: [],
    description: '',
    featured: false
  });
  
  // Estado para controlar os campos de cor e tamanho
  const [newColor, setNewColor] = useState('');
  const [newSize, setNewSize] = useState('');
  
  // Estado para upload de imagens
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  
  // Multilingual content
  const getProductEditContent = () => {
    switch(language) {
      case 'pt':
        return {
          title: isNewProduct ? "Adicionar Produto" : "Editar Produto",
          description: isNewProduct ? "Adicione um novo produto à loja" : "Edite os detalhes do produto",
          tabs: {
            basic: "Informações Básicas",
            details: "Detalhes",
            images: "Imagens",
            inventory: "Estoque"
          },
          fields: {
            name: "Nome do Produto",
            brand: "Marca",
            price: "Preço",
            description: "Descrição",
            featured: "Produto em Destaque",
            colors: "Cores",
            sizes: "Tamanhos",
            stock: "Quantidade em Estoque",
            status: "Status"
          },
          placeholders: {
            name: "Digite o nome do produto",
            brand: "Digite a marca",
            price: "0.00",
            description: "Digite uma descrição detalhada do produto...",
            color: "Digite uma cor e pressione Enter",
            size: "Digite um tamanho e pressione Enter"
          },
          buttons: {
            save: "Salvar Produto",
            cancel: "Cancelar",
            addColor: "Adicionar",
            addSize: "Adicionar",
            uploadImages: "Selecionar Imagens",
            featured: "Destacar na Página Inicial"
          },
          messages: {
            saved: "Produto salvo com sucesso!",
            imageAdded: "Imagem adicionada",
            imageRemoved: "Imagem removida",
            colorAdded: "Cor adicionada",
            colorRemoved: "Cor removida",
            sizeAdded: "Tamanho adicionado",
            sizeRemoved: "Tamanho removido"
          }
        };
      case 'es':
        return {
          title: isNewProduct ? "Añadir Producto" : "Editar Producto",
          description: isNewProduct ? "Añade un nuevo producto a la tienda" : "Edita los detalles del producto",
          tabs: {
            basic: "Información Básica",
            details: "Detalles",
            images: "Imágenes",
            inventory: "Inventario"
          },
          fields: {
            name: "Nombre del Producto",
            brand: "Marca",
            price: "Precio",
            description: "Descripción",
            featured: "Producto Destacado",
            colors: "Colores",
            sizes: "Tallas",
            stock: "Cantidad en Inventario",
            status: "Estado"
          },
          placeholders: {
            name: "Escribe el nombre del producto",
            brand: "Escribe la marca",
            price: "0.00",
            description: "Escribe una descripción detallada del producto...",
            color: "Escribe un color y presiona Enter",
            size: "Escribe una talla y presiona Enter"
          },
          buttons: {
            save: "Guardar Producto",
            cancel: "Cancelar",
            addColor: "Añadir",
            addSize: "Añadir",
            uploadImages: "Seleccionar Imágenes",
            featured: "Destacar en Página Principal"
          },
          messages: {
            saved: "¡Producto guardado con éxito!",
            imageAdded: "Imagen añadida",
            imageRemoved: "Imagen eliminada",
            colorAdded: "Color añadido",
            colorRemoved: "Color eliminado",
            sizeAdded: "Talla añadida",
            sizeRemoved: "Talla eliminada"
          }
        };
      default: // 'en'
        return {
          title: isNewProduct ? "Add Product" : "Edit Product",
          description: isNewProduct ? "Add a new product to the store" : "Edit product details",
          tabs: {
            basic: "Basic Information",
            details: "Details",
            images: "Images",
            inventory: "Inventory"
          },
          fields: {
            name: "Product Name",
            brand: "Brand",
            price: "Price",
            description: "Description",
            featured: "Featured Product",
            colors: "Colors",
            sizes: "Sizes",
            stock: "Stock Quantity",
            status: "Status"
          },
          placeholders: {
            name: "Enter product name",
            brand: "Enter brand",
            price: "0.00",
            description: "Enter a detailed product description...",
            color: "Type a color and press Enter",
            size: "Type a size and press Enter"
          },
          buttons: {
            save: "Save Product",
            cancel: "Cancel",
            addColor: "Add",
            addSize: "Add",
            uploadImages: "Select Images",
            featured: "Feature on Homepage"
          },
          messages: {
            saved: "Product saved successfully!",
            imageAdded: "Image added",
            imageRemoved: "Image removed",
            colorAdded: "Color added",
            colorRemoved: "Color removed",
            sizeAdded: "Size added",
            sizeRemoved: "Size removed"
          }
        };
    }
  };
  
  const content = getProductEditContent();
  
  // Carregar dados do produto existente
  useEffect(() => {
    if (id) {
      const existingProduct = getProductById(id);
      if (existingProduct) {
        setProduct(existingProduct);
        setPreviewUrls(existingProduct.images);
      } else {
        navigate('/admin/products');
      }
    }
  }, [id, navigate]);
  
  // Manipuladores de eventos para edição dos campos do produto
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'price') {
      setProduct(prev => ({
        ...prev,
        [name]: parseFloat(value) || 0
      }));
    } else {
      setProduct(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const handleFeaturedToggle = (checked: boolean) => {
    setProduct(prev => ({
      ...prev,
      featured: checked
    }));
  };
  
  // Adicionar e remover cores
  const handleAddColor = () => {
    if (newColor.trim() !== '' && !product.colors.includes(newColor.trim())) {
      setProduct(prev => ({
        ...prev,
        colors: [...prev.colors, newColor.trim()]
      }));
      setNewColor('');
      toast.success(content.messages.colorAdded);
    }
  };
  
  const handleRemoveColor = (colorToRemove: string) => {
    setProduct(prev => ({
      ...prev,
      colors: prev.colors.filter(color => color !== colorToRemove)
    }));
    toast.success(content.messages.colorRemoved);
  };
  
  // Adicionar e remover tamanhos
  const handleAddSize = () => {
    // Fixed: Convert string to number before comparing and sorting
    const sizeValue = newSize.trim();
    const sizeNumber = parseInt(sizeValue);
    
    if (!isNaN(sizeNumber) && !product.sizes.includes(sizeNumber)) {
      setProduct(prev => ({
        ...prev,
        sizes: [...prev.sizes, sizeNumber].sort((a, b) => {
          // Convert both to numbers for comparison to avoid string comparison
          const numA = typeof a === 'string' ? parseInt(a) : a;
          const numB = typeof b === 'string' ? parseInt(b) : b;
          return numA - numB;
        })
      }));
      setNewSize('');
      toast.success(content.messages.sizeAdded);
    }
  };
  
  const handleRemoveSize = (sizeToRemove: number | string) => {
    setProduct(prev => ({
      ...prev,
      sizes: prev.sizes.filter(size => size !== sizeToRemove)
    }));
    toast.success(content.messages.sizeRemoved);
  };
  
  // Gerenciar upload de imagens
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedImages(prev => [...prev, ...files]);
      
      // Criar URLs de preview
      const newPreviewUrls = files.map(file => URL.createObjectURL(file));
      setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
      
      // Em um cenário real, você faria o upload para um servidor aqui
      // e salvaria as URLs retornadas
      
      toast.success(content.messages.imageAdded);
      
      // Atualizar o produto com as novas URLs (simulando URLs de servidor)
      setProduct(prev => ({
        ...prev,
        images: [...prev.images, ...newPreviewUrls]
      }));
    }
  };
  
  const handleRemoveImage = (index: number) => {
    // Remover a imagem da lista de previews
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
    
    // Remover a imagem do produto
    setProduct(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
    
    toast.success(content.messages.imageRemoved);
  };
  
  // Salvar produto
  const handleSaveProduct = () => {
    console.log('Saving product:', product);
    
    // Aqui você enviaria os dados do produto para o servidor
    // Em um cenário real, isso seria uma chamada de API
    
    toast.success(content.messages.saved);
    navigate('/admin/products');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => navigate('/admin/products')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">{content.title}</h2>
            <p className="text-muted-foreground">{content.description}</p>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="basic">{content.tabs.basic}</TabsTrigger>
          <TabsTrigger value="details">{content.tabs.details}</TabsTrigger>
          <TabsTrigger value="images">{content.tabs.images}</TabsTrigger>
          <TabsTrigger value="inventory">{content.tabs.inventory}</TabsTrigger>
        </TabsList>
        
        {/* Basic Information Tab */}
        <TabsContent value="basic">
          <Card>
            <CardHeader>
              <CardTitle>{content.tabs.basic}</CardTitle>
              <CardDescription>Informações principais do produto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{content.fields.name}</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={product.name} 
                  onChange={handleInputChange} 
                  placeholder={content.placeholders.name} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="brand">{content.fields.brand}</Label>
                <Input 
                  id="brand" 
                  name="brand" 
                  value={product.brand} 
                  onChange={handleInputChange} 
                  placeholder={content.placeholders.brand} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="price">{content.fields.price}</Label>
                <Input 
                  id="price" 
                  name="price" 
                  type="number" 
                  step="0.01" 
                  value={product.price} 
                  onChange={handleInputChange} 
                  placeholder={content.placeholders.price} 
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="featured" 
                  checked={product.featured || false} 
                  onCheckedChange={handleFeaturedToggle}
                />
                <Label htmlFor="featured">{content.buttons.featured}</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Details Tab */}
        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>{content.tabs.details}</CardTitle>
              <CardDescription>Detalhes adicionais do produto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="description">{content.fields.description}</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  value={product.description} 
                  onChange={handleInputChange} 
                  placeholder={content.placeholders.description} 
                  rows={5}
                />
              </div>
              
              <div className="space-y-4">
                <Label>{content.fields.colors}</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {product.colors.map((color, index) => (
                    <div 
                      key={index} 
                      className="bg-secondary flex items-center gap-1 px-3 py-1 rounded-full text-sm"
                    >
                      <span>{color}</span>
                      <button 
                        onClick={() => handleRemoveColor(color)} 
                        className="text-gray-500 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input 
                    value={newColor} 
                    onChange={(e) => setNewColor(e.target.value)} 
                    placeholder={content.placeholders.color} 
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddColor();
                      }
                    }}
                  />
                  <Button onClick={handleAddColor} type="button">
                    {content.buttons.addColor}
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <Label>{content.fields.sizes}</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {product.sizes.map((size, index) => (
                    <div 
                      key={index} 
                      className="bg-secondary flex items-center gap-1 px-3 py-1 rounded-full text-sm"
                    >
                      <span>{size}</span>
                      <button 
                        onClick={() => handleRemoveSize(size)} 
                        className="text-gray-500 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input 
                    value={newSize} 
                    onChange={(e) => setNewSize(e.target.value)} 
                    placeholder={content.placeholders.size} 
                    type="number"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSize();
                      }
                    }}
                  />
                  <Button onClick={handleAddSize} type="button">
                    {content.buttons.addSize}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Images Tab */}
        <TabsContent value="images">
          <Card>
            <CardHeader>
              <CardTitle>{content.tabs.images}</CardTitle>
              <CardDescription>Gerencie as imagens do produto</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-center p-4">
                  <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center max-w-xl w-full">
                    <Image className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 text-center mb-2">
                      Arraste e solte imagens aqui ou clique para selecionar
                    </p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      id="image-upload"
                      onChange={handleImageUpload}
                    />
                    <Button asChild>
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <Upload className="h-4 w-4 mr-2" />
                        {content.buttons.uploadImages}
                      </label>
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="relative group">
                      <img 
                        src={url} 
                        alt={`Product ${index + 1}`} 
                        className="h-40 w-full object-cover rounded-md"
                      />
                      <button
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Inventory Tab */}
        <TabsContent value="inventory">
          <Card>
            <CardHeader>
              <CardTitle>{content.tabs.inventory}</CardTitle>
              <CardDescription>Gerenciamento de estoque</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="stock">{content.fields.stock}</Label>
                  <Input 
                    id="stock" 
                    type="number" 
                    min="0"
                    placeholder="0"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="status">{content.fields.status}</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="status" defaultChecked />
                    <Label htmlFor="status">Ativo</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => navigate('/admin/products')}>
          {content.buttons.cancel}
        </Button>
        <Button onClick={handleSaveProduct}>
          <Save className="h-4 w-4 mr-2" />
          {content.buttons.save}
        </Button>
      </div>
    </div>
  );
};

export default ProductEdit;
