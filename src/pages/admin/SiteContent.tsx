
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/components/ui/use-toast";
import { 
  Loader2, Save, Plus, Trash2, Edit, Image, Package, 
  FileText, Images, ShoppingBag
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { products as initialProducts, Product } from '@/data/products';

// Types for content management
interface PageContent {
  id: string;
  title: string;
  slug: string;
  content: string;
  meta: {
    title: string;
    description: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface Banner {
  id: string;
  title: string;
  image: string;
  url: string;
  active: boolean;
  position: number;
}

const SiteContent = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  
  // Pages state
  const [pages, setPages] = useState<PageContent[]>([
    {
      id: '1',
      title: 'Homepage',
      slug: 'home',
      content: '<h1>Welcome to our store</h1><p>Find the best products here.</p>',
      meta: {
        title: 'Home | Xible Store',
        description: 'Welcome to Xible Store - Find premium products for your lifestyle'
      },
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-06-15T00:00:00Z'
    },
    {
      id: '2',
      title: 'About Us',
      slug: 'about',
      content: '<h1>About Xible Store</h1><p>Our story begins...</p>',
      meta: {
        title: 'About Us | Xible Store',
        description: 'Learn about our story, mission, and values'
      },
      createdAt: '2023-01-02T00:00:00Z',
      updatedAt: '2023-05-20T00:00:00Z'
    }
  ]);

  // Banners state
  const [banners, setBanners] = useState<Banner[]>([
    {
      id: '1',
      title: 'Summer Sale',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&h=400',
      url: '/catalogo?sale=summer',
      active: true,
      position: 1
    },
    {
      id: '2',
      title: 'New Collection',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&h=400',
      url: '/catalogo?collection=new',
      active: true,
      position: 2
    }
  ]);

  // Products state
  const [products, setProducts] = useState<Product[]>(initialProducts);

  // Edit states
  const [currentPage, setCurrentPage] = useState<PageContent | null>(null);
  const [currentBanner, setCurrentBanner] = useState<Banner | null>(null);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [newBanner, setNewBanner] = useState<Omit<Banner, 'id'>>({
    title: '',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&h=400',
    url: '',
    active: true,
    position: 3
  });
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    brand: '',
    price: 0,
    colors: [''],
    sizes: [],
    images: ['https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&w=800&h=800'],
    description: '',
    featured: false
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingBanner, setIsAddingBanner] = useState(false);
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  // Handle page selection for editing
  const handleEditPage = (page: PageContent) => {
    setCurrentPage({...page});
  };

  // Handle banner selection for editing
  const handleEditBanner = (banner: Banner) => {
    setCurrentBanner({...banner});
  };

  // Handle product selection for editing
  const handleEditProduct = (product: Product) => {
    setCurrentProduct({...product});
  };

  // Handle saving page changes
  const handleSavePage = () => {
    if (!currentPage) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setPages(pages.map(p => p.id === currentPage.id ? currentPage : p));
      toast({
        title: "Page updated",
        description: `${currentPage.title} has been successfully updated.`,
      });
      setIsLoading(false);
    }, 800);
  };

  // Handle saving banner changes
  const handleSaveBanner = () => {
    if (!currentBanner) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setBanners(banners.map(b => b.id === currentBanner.id ? currentBanner : b));
      toast({
        title: "Banner updated",
        description: `${currentBanner.title} has been successfully updated.`,
      });
      setIsLoading(false);
    }, 800);
  };

  // Handle saving product changes
  const handleSaveProduct = () => {
    if (!currentProduct) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setProducts(products.map(p => p.id === currentProduct.id ? currentProduct : p));
      toast({
        title: "Product updated",
        description: `${currentProduct.name} has been successfully updated.`,
      });
      setIsLoading(false);
    }, 800);
  };

  // Handle page input changes
  const handlePageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentPage) return;
    
    setCurrentPage({
      ...currentPage,
      [e.target.name]: e.target.value
    });
  };

  // Handle page content changes (textarea)
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!currentPage) return;
    
    setCurrentPage({
      ...currentPage,
      content: e.target.value
    });
  };

  // Handle meta title changes
  const handleMetaTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentPage) return;
    
    setCurrentPage({
      ...currentPage,
      meta: {
        ...currentPage.meta,
        title: e.target.value
      }
    });
  };

  // Handle meta description changes (textarea)
  const handleMetaDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!currentPage) return;
    
    setCurrentPage({
      ...currentPage,
      meta: {
        ...currentPage.meta,
        description: e.target.value
      }
    });
  };

  // Handle banner input changes
  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!currentBanner) return;
    
    const value = e.target.type === 'checkbox' 
      ? (e.target as HTMLInputElement).checked 
      : e.target.value;
      
    setCurrentBanner({
      ...currentBanner,
      [e.target.name]: value
    });
  };

  // Handle new banner input changes
  const handleNewBannerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.type === 'checkbox' 
      ? (e.target as HTMLInputElement).checked 
      : e.target.value;
      
    setNewBanner({
      ...newBanner,
      [e.target.name]: value
    });
  };

  // Handle adding a new banner
  const handleAddBanner = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newId = (parseInt(banners[banners.length - 1]?.id || '0') + 1).toString();
      const bannerToAdd = {
        id: newId,
        ...newBanner
      };
      
      setBanners([...banners, bannerToAdd]);
      
      setNewBanner({
        title: '',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&h=400',
        url: '',
        active: true,
        position: banners.length + 1
      });
      
      setIsAddingBanner(false);
      setIsLoading(false);
      
      toast({
        title: "Banner added",
        description: `${bannerToAdd.title} has been successfully added.`,
      });
    }, 800);
  };

  // Handle product input changes
  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Product) => {
    if (!currentProduct) return;
    
    let value: any = e.target.value;
    
    // Handle number fields
    if (field === 'price') {
      value = parseFloat(value);
    }
    
    // Handle checkbox fields
    if (e.target.type === 'checkbox') {
      value = (e.target as HTMLInputElement).checked;
    }
    
    setCurrentProduct({
      ...currentProduct,
      [field]: value
    });
  };
  
  // Handle new product input changes
  const handleNewProductChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Omit<Product, 'id'>) => {
    let value: any = e.target.value;
    
    // Handle number fields
    if (field === 'price') {
      value = parseFloat(value);
    }
    
    // Handle checkbox fields
    if (e.target.type === 'checkbox') {
      value = (e.target as HTMLInputElement).checked;
    }
    
    setNewProduct({
      ...newProduct,
      [field]: value
    });
  };
  
  // Handle adding a new product
  const handleAddProduct = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newId = (parseInt(products[products.length - 1]?.id || '0') + 1).toString();
      
      // Process sizes from comma-separated string if needed
      let sizes = newProduct.sizes;
      if (typeof sizes === 'string') {
        sizes = (sizes as unknown as string).split(',').map(s => parseInt(s.trim()));
      }
      
      // Process colors from comma-separated string if needed
      let colors = newProduct.colors;
      if (typeof colors === 'string') {
        colors = (colors as unknown as string).split(',').map(c => c.trim());
      }
      
      const productToAdd: Product = {
        id: newId,
        ...newProduct,
        sizes: sizes as number[],
        colors: colors as string[],
        images: Array.isArray(newProduct.images) ? newProduct.images : [newProduct.images as unknown as string]
      };
      
      setProducts([...products, productToAdd]);
      
      // Reset new product form
      setNewProduct({
        name: '',
        brand: '',
        price: 0,
        colors: [''],
        sizes: [],
        images: ['https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&w=800&h=800'],
        description: '',
        featured: false
      });
      
      setIsAddingProduct(false);
      setIsLoading(false);
      
      toast({
        title: "Product added",
        description: `${productToAdd.name} has been successfully added.`,
      });
    }, 800);
  };

  // Translations based on language
  const getLabels = () => {
    switch(language) {
      case 'pt':
        return {
          title: "Conteúdo do Site",
          pages: "Páginas",
          banners: "Banners",
          products: "Produtos",
          editPage: "Editar Página",
          editBanner: "Editar Banner",
          editProduct: "Editar Produto",
          addBanner: "Adicionar Banner",
          addProduct: "Adicionar Produto",
          pageTitle: "Título da Página",
          pageSlug: "Slug da Página",
          pageContent: "Conteúdo da Página",
          metaTitle: "Título Meta",
          metaDescription: "Descrição Meta",
          bannerTitle: "Título do Banner",
          bannerImage: "Imagem do Banner",
          bannerUrl: "URL do Banner",
          bannerActive: "Ativo",
          bannerPosition: "Posição",
          productName: "Nome do Produto",
          productBrand: "Marca",
          productPrice: "Preço",
          productColors: "Cores (separadas por vírgula)",
          productSizes: "Tamanhos (separados por vírgula)",
          productImages: "Imagens",
          productDescription: "Descrição",
          productFeatured: "Em Destaque",
          save: "Salvar",
          add: "Adicionar",
          cancel: "Cancelar",
          select: "Selecione uma página para editar",
          selectBanner: "Selecione um banner para editar",
          selectProduct: "Selecione um produto para editar",
          changeImage: "Alterar Imagem",
          previewImage: "Pré-visualização da Imagem",
          uploadNewImage: "Carregar Nova Imagem",
          featuredProduct: "Produto em Destaque",
          notFeaturedProduct: "Produto sem Destaque"
        };
      case 'es':
        return {
          title: "Contenido del Sitio",
          pages: "Páginas",
          banners: "Banners",
          products: "Productos",
          editPage: "Editar Página",
          editBanner: "Editar Banner",
          editProduct: "Editar Producto",
          addBanner: "Añadir Banner",
          addProduct: "Añadir Producto",
          pageTitle: "Título de la Página",
          pageSlug: "Slug de la Página",
          pageContent: "Contenido de la Página",
          metaTitle: "Título Meta",
          metaDescription: "Descripción Meta",
          bannerTitle: "Título del Banner",
          bannerImage: "Imagen del Banner",
          bannerUrl: "URL del Banner",
          bannerActive: "Activo",
          bannerPosition: "Posición",
          productName: "Nombre del Producto",
          productBrand: "Marca",
          productPrice: "Precio",
          productColors: "Colores (separados por comas)",
          productSizes: "Tallas (separadas por comas)",
          productImages: "Imágenes",
          productDescription: "Descripción",
          productFeatured: "Destacado",
          save: "Guardar",
          add: "Añadir",
          cancel: "Cancelar",
          select: "Seleccione una página para editar",
          selectBanner: "Seleccione un banner para editar",
          selectProduct: "Seleccione un producto para editar",
          changeImage: "Cambiar Imagen",
          previewImage: "Vista previa de la Imagen",
          uploadNewImage: "Subir Nueva Imagen",
          featuredProduct: "Producto Destacado",
          notFeaturedProduct: "Producto No Destacado"
        };
      default: // 'en'
        return {
          title: "Site Content",
          pages: "Pages",
          banners: "Banners",
          products: "Products",
          editPage: "Edit Page",
          editBanner: "Edit Banner",
          editProduct: "Edit Product",
          addBanner: "Add Banner",
          addProduct: "Add Product",
          pageTitle: "Page Title",
          pageSlug: "Page Slug",
          pageContent: "Page Content",
          metaTitle: "Meta Title",
          metaDescription: "Meta Description",
          bannerTitle: "Banner Title",
          bannerImage: "Banner Image",
          bannerUrl: "Banner URL",
          bannerActive: "Active",
          bannerPosition: "Position",
          productName: "Product Name",
          productBrand: "Brand",
          productPrice: "Price",
          productColors: "Colors (comma separated)",
          productSizes: "Sizes (comma separated)",
          productImages: "Images",
          productDescription: "Description",
          productFeatured: "Featured",
          save: "Save",
          add: "Add",
          cancel: "Cancel",
          select: "Select a page to edit",
          selectBanner: "Select a banner to edit",
          selectProduct: "Select a product to edit",
          changeImage: "Change Image",
          previewImage: "Image Preview",
          uploadNewImage: "Upload New Image",
          featuredProduct: "Featured Product",
          notFeaturedProduct: "Not Featured"
        };
    }
  };
  
  const labels = getLabels();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{labels.title}</h1>
        <p className="text-muted-foreground">
          {t ? t('manageYourSiteContent') : 'Manage your website content, pages, banners and products'}
        </p>
      </div>

      <Tabs defaultValue="pages" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pages" className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            {labels.pages}
          </TabsTrigger>
          <TabsTrigger value="banners" className="flex items-center gap-1">
            <Images className="h-4 w-4" />
            {labels.banners}
          </TabsTrigger>
          <TabsTrigger value="products" className="flex items-center gap-1">
            <ShoppingBag className="h-4 w-4" />
            {labels.products}
          </TabsTrigger>
        </TabsList>
        
        {/* Pages Tab */}
        <TabsContent value="pages" className="space-y-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Pages List */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>{labels.pages}</CardTitle>
                <CardDescription>
                  {t ? t('manageEditablePagesContent') : 'Manage your editable pages content'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {pages.map(page => (
                    <Button
                      key={page.id}
                      variant={currentPage?.id === page.id ? "default" : "outline"}
                      className="w-full justify-between"
                      onClick={() => handleEditPage(page)}
                    >
                      <span>{page.title}</span>
                      <Edit className="h-4 w-4" />
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Page Editor */}
            <Card className="col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle>{labels.editPage}</CardTitle>
                <CardDescription>
                  {currentPage ? `Editing: ${currentPage.title}` : labels.select}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {currentPage ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="title">{labels.pageTitle}</label>
                        <Input
                          id="title"
                          name="title"
                          value={currentPage.title}
                          onChange={handlePageChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="slug">{labels.pageSlug}</label>
                        <Input
                          id="slug"
                          name="slug"
                          value={currentPage.slug}
                          onChange={handlePageChange}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="content">{labels.pageContent}</label>
                      <Textarea
                        id="content"
                        name="content"
                        rows={8}
                        value={currentPage.content}
                        onChange={handleContentChange}
                        className="font-mono text-sm"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-base font-semibold">SEO Metadata</h3>
                      <div className="space-y-2">
                        <label htmlFor="metaTitle">{labels.metaTitle}</label>
                        <Input
                          id="metaTitle"
                          name="metaTitle"
                          value={currentPage.meta.title}
                          onChange={handleMetaTitleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="metaDescription">{labels.metaDescription}</label>
                        <Textarea
                          id="metaDescription"
                          name="metaDescription"
                          rows={3}
                          value={currentPage.meta.description}
                          onChange={handleMetaDescriptionChange}
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2 pt-4">
                      <Button 
                        variant="outline" 
                        onClick={() => setCurrentPage(null)}
                      >
                        {labels.cancel}
                      </Button>
                      <Button 
                        onClick={handleSavePage}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {t ? t('saving') : 'Saving...'}
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            {labels.save}
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-[400px] items-center justify-center border rounded-md">
                    <p className="text-muted-foreground">{labels.select}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Banners Tab */}
        <TabsContent value="banners" className="space-y-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Banners List */}
            <Card className="col-span-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle>{labels.banners}</CardTitle>
                  <CardDescription>
                    {t ? t('manageBannersAndSliders') : 'Manage your banners and sliders'}
                  </CardDescription>
                </div>
                <Dialog open={isAddingBanner} onOpenChange={setIsAddingBanner}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      {labels.addBanner}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>{labels.addBanner}</DialogTitle>
                      <DialogDescription>
                        {t ? t('addNewBannerToYourSite') : 'Add a new banner to your site.'}
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="newBannerTitle">{labels.bannerTitle}</Label>
                        <Input
                          id="newBannerTitle"
                          name="title"
                          value={newBanner.title}
                          onChange={handleNewBannerChange}
                          placeholder="e.g. Summer Sale"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="newBannerUrl">{labels.bannerUrl}</Label>
                        <Input
                          id="newBannerUrl"
                          name="url"
                          value={newBanner.url}
                          onChange={handleNewBannerChange}
                          placeholder="e.g. /catalogo?sale=summer"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="newBannerImage">{labels.bannerImage}</Label>
                        <div className="border rounded-md p-2">
                          <img
                            src={newBanner.image}
                            alt="Banner Preview"
                            className="w-full h-32 object-cover rounded-md mb-2"
                          />
                          <Input
                            id="newBannerImage"
                            name="image"
                            value={newBanner.image}
                            onChange={handleNewBannerChange}
                            placeholder="Image URL"
                            className="mt-2"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            {t ? t('enterImageUrlOrUpload') : 'Enter image URL or upload a new image'}
                          </p>
                          
                          <div className="mt-2">
                            <Label
                              htmlFor="uploadNewBanner"
                              className="cursor-pointer inline-flex h-9 items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground ring-offset-background transition-colors hover:bg-secondary/80"
                            >
                              <Image className="mr-2 h-4 w-4" />
                              {labels.uploadNewImage}
                            </Label>
                            <Input
                              id="uploadNewBanner"
                              type="file"
                              accept="image/*"
                              className="hidden"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="newBannerPosition">{labels.bannerPosition}</Label>
                          <Input
                            id="newBannerPosition"
                            name="position"
                            type="number"
                            value={newBanner.position}
                            onChange={handleNewBannerChange}
                          />
                        </div>
                        <div className="space-y-2 flex items-end">
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="newBannerActive"
                              name="active"
                              checked={newBanner.active}
                              onCheckedChange={(checked) => 
                                setNewBanner({...newBanner, active: checked})
                              }
                            />
                            <Label htmlFor="newBannerActive">{labels.bannerActive}</Label>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddingBanner(false)}>
                        {labels.cancel}
                      </Button>
                      <Button 
                        onClick={handleAddBanner}
                        disabled={isLoading || !newBanner.title || !newBanner.image}
                      >
                        {isLoading ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : (
                          <Plus className="h-4 w-4 mr-2" />
                        )}
                        {labels.add}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {banners.map(banner => (
                    <Button
                      key={banner.id}
                      variant={currentBanner?.id === banner.id ? "default" : "outline"}
                      className="w-full justify-between"
                      onClick={() => handleEditBanner(banner)}
                    >
                      <div className="flex items-center">
                        <div 
                          className={`h-2 w-2 rounded-full mr-2 ${banner.active ? 'bg-green-500' : 'bg-gray-300'}`}
                        />
                        <span>{banner.title}</span>
                      </div>
                      <Edit className="h-4 w-4" />
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Banner Editor */}
            <Card className="col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle>{labels.editBanner}</CardTitle>
                <CardDescription>
                  {currentBanner ? `Editing: ${currentBanner.title}` : labels.selectBanner}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {currentBanner ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="bannerTitle">{labels.bannerTitle}</label>
                      <Input
                        id="bannerTitle"
                        name="title"
                        value={currentBanner.title}
                        onChange={handleBannerChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="bannerUrl">{labels.bannerUrl}</label>
                      <Input
                        id="bannerUrl"
                        name="url"
                        value={currentBanner.url}
                        onChange={handleBannerChange}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="bannerPosition">{labels.bannerPosition}</label>
                        <Input
                          id="bannerPosition"
                          name="position"
                          type="number"
                          value={currentBanner.position}
                          onChange={handleBannerChange}
                        />
                      </div>
                      <div className="space-y-2 flex items-end">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="bannerActive"
                            name="active"
                            checked={typeof currentBanner.active === 'boolean' ? currentBanner.active : currentBanner.active === 'true'}
                            onCheckedChange={(checked) => 
                              setCurrentBanner({...currentBanner, active: checked})
                            }
                          />
                          <Label htmlFor="bannerActive">{labels.bannerActive}</Label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="bannerImage">{labels.bannerImage}</label>
                      <div className="border rounded-md p-4">
                        <div className="w-full h-40 mb-4 overflow-hidden rounded-md border bg-muted">
                          <img
                            src={currentBanner.image}
                            alt={currentBanner.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col gap-3">
                          <Input
                            id="bannerImage"
                            name="image"
                            value={currentBanner.image}
                            onChange={handleBannerChange}
                            placeholder="Image URL"
                          />
                          <Button variant="outline" size="sm" className="w-full sm:w-auto">
                            <Image className="mr-2 h-4 w-4" />
                            {labels.changeImage}
                          </Button>
                          <p className="text-xs text-muted-foreground">
                            {t ? t('recommendedSize') : 'Recommended size: 1200x400px'}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2 pt-4">
                      <Button 
                        variant="outline" 
                        onClick={() => setCurrentBanner(null)}
                      >
                        {labels.cancel}
                      </Button>
                      <Button 
                        onClick={handleSaveBanner}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {t ? t('saving') : 'Saving...'}
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            {labels.save}
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-[400px] items-center justify-center border rounded-md">
                    <p className="text-muted-foreground">{labels.selectBanner}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Products Tab */}
        <TabsContent value="products" className="space-y-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Products List */}
            <Card className="col-span-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle>{labels.products}</CardTitle>
                  <CardDescription>
                    {t ? t('manageYourProducts') : 'Manage your product catalog'}
                  </CardDescription>
                </div>
                <Dialog open={isAddingProduct} onOpenChange={setIsAddingProduct}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      {labels.addProduct}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>{labels.addProduct}</DialogTitle>
                      <DialogDescription>
                        {t ? t('addNewProductToYourCatalog') : 'Add a new product to your catalog.'}
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="newProductName">{labels.productName}</Label>
                          <Input
                            id="newProductName"
                            value={newProduct.name}
                            onChange={(e) => handleNewProductChange(e, 'name')}
                            placeholder="e.g. Air Max Pulse"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="newProductBrand">{labels.productBrand}</Label>
                          <Input
                            id="newProductBrand"
                            value={newProduct.brand}
                            onChange={(e) => handleNewProductChange(e, 'brand')}
                            placeholder="e.g. Nike"
                          />
                        </div>
                      </div>
                      
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="newProductPrice">{labels.productPrice}</Label>
                          <Input
                            id="newProductPrice"
                            type="number"
                            step="0.01"
                            value={newProduct.price}
                            onChange={(e) => handleNewProductChange(e, 'price')}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="newProductFeatured">{labels.productFeatured}</Label>
                          <div className="flex items-center h-9 space-x-2">
                            <Switch
                              id="newProductFeatured"
                              checked={newProduct.featured}
                              onCheckedChange={(checked) => 
                                setNewProduct({...newProduct, featured: checked})
                              }
                            />
                            <Label htmlFor="newProductFeatured">
                              {newProduct.featured ? labels.featuredProduct : labels.notFeaturedProduct}
                            </Label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="newProductColors">{labels.productColors}</Label>
                        <Input
                          id="newProductColors"
                          value={Array.isArray(newProduct.colors) ? newProduct.colors.join(', ') : newProduct.colors}
                          onChange={(e) => handleNewProductChange(e, 'colors')}
                          placeholder="e.g. Black/Anthracite, White/Volt, Grey/Red"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="newProductSizes">{labels.productSizes}</Label>
                        <Input
                          id="newProductSizes"
                          value={Array.isArray(newProduct.sizes) ? newProduct.sizes.join(', ') : newProduct.sizes}
                          onChange={(e) => handleNewProductChange(e, 'sizes')}
                          placeholder="e.g. 38, 39, 40, 41, 42, 43, 44, 45"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="newProductDescription">{labels.productDescription}</Label>
                        <Textarea
                          id="newProductDescription"
                          rows={4}
                          value={newProduct.description}
                          onChange={(e) => handleNewProductChange(e, 'description')}
                          placeholder="Product description..."
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="newProductImage">{labels.productImages}</Label>
                        <div className="border rounded-md p-2">
                          <img
                            src={Array.isArray(newProduct.images) ? newProduct.images[0] : newProduct.images}
                            alt="Product Preview"
                            className="w-full h-48 object-contain rounded-md mb-2"
                          />
                          <Input
                            id="newProductImage"
                            value={Array.isArray(newProduct.images) ? newProduct.images[0] : newProduct.images}
                            onChange={(e) => setNewProduct({...newProduct, images: [e.target.value]})}
                            placeholder="Image URL"
                            className="mt-2"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            {t ? t('enterImageUrlOrUpload') : 'Enter image URL or upload a new image'}
                          </p>
                          
                          <div className="mt-2">
                            <Label
                              htmlFor="uploadNewProductImage"
                              className="cursor-pointer inline-flex h-9 items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground ring-offset-background transition-colors hover:bg-secondary/80"
                            >
                              <Image className="mr-2 h-4 w-4" />
                              {labels.uploadNewImage}
                            </Label>
                            <Input
                              id="uploadNewProductImage"
                              type="file"
                              accept="image/*"
                              className="hidden"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddingProduct(false)}>
                        {labels.cancel}
                      </Button>
                      <Button 
                        onClick={handleAddProduct}
                        disabled={isLoading || !newProduct.name || !newProduct.brand || newProduct.price <= 0}
                      >
                        {isLoading ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : (
                          <Plus className="h-4 w-4 mr-2" />
                        )}
                        {labels.add}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
                  {products.map(product => (
                    <Button
                      key={product.id}
                      variant={currentProduct?.id === product.id ? "default" : "outline"}
                      className="w-full justify-between"
                      onClick={() => handleEditProduct(product)}
                    >
                      <div className="flex items-center text-left">
                        <div 
                          className={`h-2 w-2 rounded-full mr-2 ${product.featured ? 'bg-green-500' : 'bg-gray-300'}`}
                        />
                        <div>
                          <span className="block">{product.name}</span>
                          <span className="text-xs text-muted-foreground">{product.brand} | ${product.price}</span>
                        </div>
                      </div>
                      <Edit className="h-4 w-4" />
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Product Editor */}
            <Card className="col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle>{labels.editProduct}</CardTitle>
                <CardDescription>
                  {currentProduct ? `Editing: ${currentProduct.name}` : labels.selectProduct}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {currentProduct ? (
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="productName">{labels.productName}</Label>
                        <Input
                          id="productName"
                          value={currentProduct.name}
                          onChange={(e) => handleProductChange(e, 'name')}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="productBrand">{labels.productBrand}</Label>
                        <Input
                          id="productBrand"
                          value={currentProduct.brand}
                          onChange={(e) => handleProductChange(e, 'brand')}
                        />
                      </div>
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="productPrice">{labels.productPrice}</Label>
                        <Input
                          id="productPrice"
                          type="number"
                          step="0.01"
                          value={currentProduct.price}
                          onChange={(e) => handleProductChange(e, 'price')}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="productFeatured">{labels.productFeatured}</Label>
                        <div className="flex items-center h-9 space-x-2">
                          <Switch
                            id="productFeatured"
                            checked={currentProduct.featured || false}
                            onCheckedChange={(checked) => 
                              setCurrentProduct({...currentProduct, featured: checked})
                            }
                          />
                          <Label htmlFor="productFeatured">
                            {currentProduct.featured ? labels.featuredProduct : labels.notFeaturedProduct}
                          </Label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="productColors">{labels.productColors}</Label>
                      <Input
                        id="productColors"
                        value={Array.isArray(currentProduct.colors) ? currentProduct.colors.join(', ') : currentProduct.colors}
                        onChange={(e) => handleProductChange(e, 'colors')}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="productSizes">{labels.productSizes}</Label>
                      <Input
                        id="productSizes"
                        value={Array.isArray(currentProduct.sizes) ? currentProduct.sizes.join(', ') : currentProduct.sizes}
                        onChange={(e) => handleProductChange(e, 'sizes')}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="productDescription">{labels.productDescription}</Label>
                      <Textarea
                        id="productDescription"
                        rows={4}
                        value={currentProduct.description}
                        onChange={(e) => handleProductChange(e, 'description')}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="productImage">{labels.productImages}</Label>
                      <div className="border rounded-md p-4">
                        <div className="w-full h-64 mb-4 overflow-hidden rounded-md border bg-muted">
                          <img
                            src={Array.isArray(currentProduct.images) ? currentProduct.images[0] : ''}
                            alt={currentProduct.name}
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <div className="flex flex-col gap-3">
                          <Input
                            id="productImage"
                            value={Array.isArray(currentProduct.images) ? currentProduct.images[0] : ''}
                            onChange={(e) => setCurrentProduct({...currentProduct, images: [e.target.value]})}
                            placeholder="Image URL"
                          />
                          <Button variant="outline" size="sm" className="w-full sm:w-auto">
                            <Image className="mr-2 h-4 w-4" />
                            {labels.changeImage}
                          </Button>
                          <p className="text-xs text-muted-foreground">
                            {t ? t('recommendedProductImageSize') : 'Recommended size: 800x800px'}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2 pt-4">
                      <Button 
                        variant="outline" 
                        onClick={() => setCurrentProduct(null)}
                      >
                        {labels.cancel}
                      </Button>
                      <Button 
                        onClick={handleSaveProduct}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {t ? t('saving') : 'Saving...'}
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            {labels.save}
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-[400px] items-center justify-center border rounded-md">
                    <p className="text-muted-foreground">{labels.selectProduct}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SiteContent;
