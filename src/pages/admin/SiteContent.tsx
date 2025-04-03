import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { getAllProducts, Product } from '@/data/products';
import { getCurrencies } from './inventory/InventoryUtils';
import { Save, Image as ImageIcon } from 'lucide-react';

const SiteContent = () => {
  const { language, t } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const currencies = getCurrencies();
  
  // Site content state
  const [siteContent, setSiteContent] = useState({
    storeName: 'Xible Store',
    storeSlogan: 'Premium Sneakers & Footwear',
    currency: 'USD',
    primaryColor: '#0073e6',
    secondaryColor: '#f5f5f5',
    accentColor: '#ff4d00',
    homepageTitle: 'Our Collection',
    homepageSubtitle: 'Discover our premium selection of sneakers from the world\'s best brands',
    featuredProducts: [] as string[],
    bannerProducts: [] as string[],
    rotativeProducts: [] as string[],
    aboutContent: 'We are a premium footwear store dedicated to bringing you the best sneakers from around the world. Quality and style are our top priorities.',
    contactEmail: 'contact@xiblestore.com',
    contactPhone: '+1 (555) 123-4567',
    contactAddress: '123 Sneaker Street, Fashion District, NY 10001',
    socialLinks: {
      instagram: 'https://instagram.com/xiblestore',
      facebook: 'https://facebook.com/xiblestore',
      twitter: 'https://twitter.com/xiblestore'
    },
    footerContent: 'Xible Store © 2023. All rights reserved.',
    lastUpdated: ''
  });
  
  // Get translations based on language
  const getContent = () => {
    switch(language) {
      case 'pt':
        return {
          title: "Conteúdo do Site",
          description: "Gerencie o conteúdo e aparência do seu site",
          storeSettings: "Configurações da Loja",
          homepageSettings: "Página Inicial",
          productSelections: "Seleção de Produtos",
          aboutContact: "Sobre & Contato",
          socialMedia: "Redes Sociais",
          footerSettings: "Rodapé",
          storeName: "Nome da Loja",
          storeSlogan: "Slogan da Loja",
          primaryColor: "Cor Primária",
          secondaryColor: "Cor Secundária",
          accentColor: "Cor de Destaque",
          currency: "Moeda",
          homepageTitle: "Título da Página Inicial",
          homepageSubtitle: "Subtítulo da Página Inicial",
          featured: "Produtos em Destaque",
          banner: "Produtos de Banner",
          rotative: "Produtos Rotativos",
          selectProducts: "Selecionar Produtos",
          aboutContent: "Conteúdo Sobre Nós",
          contactInfo: "Informações de Contato",
          email: "Email",
          phone: "Telefone",
          address: "Endereço",
          instagram: "Instagram",
          facebook: "Facebook",
          twitter: "Twitter",
          footerContent: "Conteúdo do Rodapé",
          saveChanges: "Salvar Alterações",
          saved: "Alterações salvas com sucesso!",
          error: "Erro ao salvar alterações."
        };
      case 'es':
        return {
          title: "Contenido del Sitio",
          description: "Administra el contenido y la apariencia de tu sitio",
          storeSettings: "Configuración de la Tienda",
          homepageSettings: "Página Principal",
          productSelections: "Selección de Productos",
          aboutContact: "Acerca & Contacto",
          socialMedia: "Redes Sociales",
          footerSettings: "Pie de Página",
          storeName: "Nombre de la Tienda",
          storeSlogan: "Eslogan de la Tienda",
          primaryColor: "Color Primario",
          secondaryColor: "Color Secundario",
          accentColor: "Color de Acento",
          currency: "Moneda",
          homepageTitle: "Título de la Página Principal",
          homepageSubtitle: "Subtítulo de la Página Principal",
          featured: "Productos Destacados",
          banner: "Productos de Banner",
          rotative: "Productos Rotativos",
          selectProducts: "Seleccionar Productos",
          aboutContent: "Contenido Sobre Nosotros",
          contactInfo: "Información de Contacto",
          email: "Correo Electrónico",
          phone: "Teléfono",
          address: "Dirección",
          instagram: "Instagram",
          facebook: "Facebook",
          twitter: "Twitter",
          footerContent: "Contenido del Pie de Página",
          saveChanges: "Guardar Cambios",
          saved: "¡Cambios guardados con éxito!",
          error: "Error al guardar los cambios."
        };
      default: // 'en'
        return {
          title: "Site Content",
          description: "Manage your site content and appearance",
          storeSettings: "Store Settings",
          homepageSettings: "Homepage",
          productSelections: "Product Selections",
          aboutContact: "About & Contact",
          socialMedia: "Social Media",
          footerSettings: "Footer",
          storeName: "Store Name",
          storeSlogan: "Store Slogan",
          primaryColor: "Primary Color",
          secondaryColor: "Secondary Color",
          accentColor: "Accent Color",
          currency: "Currency",
          homepageTitle: "Homepage Title",
          homepageSubtitle: "Homepage Subtitle",
          featured: "Featured Products",
          banner: "Banner Products",
          rotative: "Rotative Products",
          selectProducts: "Select Products",
          aboutContent: "About Us Content",
          contactInfo: "Contact Information",
          email: "Email",
          phone: "Phone",
          address: "Address",
          instagram: "Instagram",
          facebook: "Facebook",
          twitter: "Twitter",
          footerContent: "Footer Content",
          saveChanges: "Save Changes",
          saved: "Changes saved successfully!",
          error: "Error saving changes."
        };
    }
  };
  
  const content = getContent();
  
  // Load products and site content from localStorage
  useEffect(() => {
    const storedProducts = getAllProducts();
    setProducts(storedProducts);
    
    // Load site content
    const storedContent = JSON.parse(localStorage.getItem('siteContent') || '{}');
    if (Object.keys(storedContent).length > 0) {
      setSiteContent(prev => ({
        ...prev,
        ...storedContent
      }));
    }
    
    // Load store settings
    const storeSettings = JSON.parse(localStorage.getItem('storeSettings') || '{}');
    if (Object.keys(storeSettings).length > 0) {
      setSiteContent(prev => ({
        ...prev,
        storeName: storeSettings.name || prev.storeName,
        storeSlogan: storeSettings.slogan || prev.storeSlogan,
        currency: storeSettings.currency || prev.currency,
        primaryColor: storeSettings.primaryColor || prev.primaryColor,
        secondaryColor: storeSettings.secondaryColor || prev.secondaryColor,
        accentColor: storeSettings.accentColor || prev.accentColor
      }));
    }
    
    // Listen for products updates
    const handleProductsUpdated = () => {
      setProducts(getAllProducts());
    };
    
    window.addEventListener('productsUpdated', handleProductsUpdated);
    
    return () => {
      window.removeEventListener('productsUpdated', handleProductsUpdated);
    };
  }, []);
  
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSiteContent(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle social links changes
  const handleSocialLinkChange = (platform: string, value: string) => {
    setSiteContent(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value
      }
    }));
  };
  
  // Handle featured products changes
  const handleFeaturedChange = (productId: string, checked: boolean) => {
    setSiteContent(prev => {
      const featuredProducts = prev.featuredProducts || [];
      return {
        ...prev,
        featuredProducts: checked 
          ? [...featuredProducts, productId]
          : featuredProducts.filter(id => id !== productId)
      };
    });
  };
  
  // Handle banner products changes
  const handleBannerChange = (productId: string, checked: boolean) => {
    setSiteContent(prev => {
      const bannerProducts = prev.bannerProducts || [];
      return {
        ...prev,
        bannerProducts: checked 
          ? [...bannerProducts, productId]
          : bannerProducts.filter(id => id !== productId)
      };
    });
  };
  
  // Handle rotative products changes
  const handleRotativeChange = (productId: string, checked: boolean) => {
    setSiteContent(prev => {
      const rotativeProducts = prev.rotativeProducts || [];
      return {
        ...prev,
        rotativeProducts: checked 
          ? [...rotativeProducts, productId]
          : rotativeProducts.filter(id => id !== productId)
      };
    });
  };
  
  // Handle currency change
  const handleCurrencyChange = (value: string) => {
    setSiteContent(prev => ({
      ...prev,
      currency: value
    }));
  };
  
  // Save all changes
  const handleSaveChanges = () => {
    try {
      // Update siteContent
      siteContent.lastUpdated = new Date().toISOString();
      localStorage.setItem('siteContent', JSON.stringify(siteContent));
      
      // Update store settings
      const storeSettings = {
        name: siteContent.storeName,
        slogan: siteContent.storeSlogan,
        currency: siteContent.currency,
        primaryColor: siteContent.primaryColor,
        secondaryColor: siteContent.secondaryColor,
        accentColor: siteContent.accentColor
      };
      localStorage.setItem('storeSettings', JSON.stringify(storeSettings));
      
      // Update products based on featured status
      const storedProducts = JSON.parse(localStorage.getItem('products') || '[]');
      const updatedProducts = storedProducts.map(product => ({
        ...product,
        featured: siteContent.featuredProducts.includes(product.id),
        displayLocation: siteContent.bannerProducts.includes(product.id) 
          ? 'banner' 
          : siteContent.rotativeProducts.includes(product.id) 
            ? 'rotative' 
            : siteContent.featuredProducts.includes(product.id) 
              ? 'homepage' 
              : 'catalog'
      }));
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      
      // Trigger updates
      window.dispatchEvent(new CustomEvent('siteContentUpdated'));
      window.dispatchEvent(new CustomEvent('storeSettingsUpdated', {
        detail: { type: 'all' }
      }));
      window.dispatchEvent(new CustomEvent('productsUpdated'));
      
      toast.success(content.saved);
    } catch (error) {
      console.error('Error saving site content:', error);
      toast.error(content.error);
    }
  };
  
  // Adicionar uma seção para upload de imagens com informações de formatos compatíveis
  const imageFormatInfo = () => (
    <div className="mt-2 text-xs text-muted-foreground flex items-center">
      <ImageIcon className="h-3 w-3 mr-1" />
      {t('adminImageFormats')}
    </div>
  );
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{content.title}</h2>
        <p className="text-muted-foreground">{content.description}</p>
        {imageFormatInfo()}
      </div>
      
      <Tabs defaultValue="store" className="space-y-4">
        <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-4">
          <TabsTrigger value="store">{content.storeSettings}</TabsTrigger>
          <TabsTrigger value="homepage">{content.homepageSettings}</TabsTrigger>
          <TabsTrigger value="products">{content.productSelections}</TabsTrigger>
          <TabsTrigger value="about">{content.aboutContact}</TabsTrigger>
          <TabsTrigger value="social">{content.socialMedia}</TabsTrigger>
          <TabsTrigger value="footer">{content.footerSettings}</TabsTrigger>
        </TabsList>
        
        {/* Store Settings Tab */}
        <TabsContent value="store">
          <Card>
            <CardHeader>
              <CardTitle>{content.storeSettings}</CardTitle>
              <CardDescription>Configure basic store settings and appearance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="storeName">{content.storeName}</Label>
                  <Input 
                    id="storeName" 
                    name="storeName" 
                    value={siteContent.storeName} 
                    onChange={handleInputChange} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="storeSlogan">{content.storeSlogan}</Label>
                  <Input 
                    id="storeSlogan" 
                    name="storeSlogan" 
                    value={siteContent.storeSlogan} 
                    onChange={handleInputChange} 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">{content.primaryColor}</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="primaryColor" 
                      name="primaryColor" 
                      type="color"
                      value={siteContent.primaryColor} 
                      onChange={handleInputChange} 
                      className="w-12 h-10 p-1"
                    />
                    <Input 
                      value={siteContent.primaryColor} 
                      onChange={handleInputChange}
                      name="primaryColor"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="secondaryColor">{content.secondaryColor}</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="secondaryColor" 
                      name="secondaryColor" 
                      type="color"
                      value={siteContent.secondaryColor} 
                      onChange={handleInputChange} 
                      className="w-12 h-10 p-1"
                    />
                    <Input 
                      value={siteContent.secondaryColor} 
                      onChange={handleInputChange}
                      name="secondaryColor"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="accentColor">{content.accentColor}</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="accentColor" 
                      name="accentColor" 
                      type="color"
                      value={siteContent.accentColor} 
                      onChange={handleInputChange} 
                      className="w-12 h-10 p-1"
                    />
                    <Input 
                      value={siteContent.accentColor} 
                      onChange={handleInputChange}
                      name="accentColor"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="currency">{content.currency}</Label>
                <Select 
                  value={siteContent.currency} 
                  onValueChange={handleCurrencyChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        {currency.code} ({currency.symbol}) - {currency.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Homepage Settings Tab */}
        <TabsContent value="homepage">
          <Card>
            <CardHeader>
              <CardTitle>{content.homepageSettings}</CardTitle>
              <CardDescription>Configure homepage content and appearance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="homepageTitle">{content.homepageTitle}</Label>
                <Input 
                  id="homepageTitle" 
                  name="homepageTitle" 
                  value={siteContent.homepageTitle} 
                  onChange={handleInputChange} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="homepageSubtitle">{content.homepageSubtitle}</Label>
                <Textarea 
                  id="homepageSubtitle" 
                  name="homepageSubtitle" 
                  value={siteContent.homepageSubtitle} 
                  onChange={handleInputChange} 
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Product Selections Tab */}
        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>{content.productSelections}</CardTitle>
              <CardDescription>Select products to display in various sections of the site</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Featured Products */}
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-3">{content.featured}</h3>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {products.filter(p => p.active !== false).map(product => (
                      <div key={`featured-${product.id}`} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`featured-${product.id}`} 
                          checked={siteContent.featuredProducts.includes(product.id)}
                          onCheckedChange={(checked) => handleFeaturedChange(product.id, !!checked)}
                        />
                        <Label htmlFor={`featured-${product.id}`} className="flex items-center">
                          <img 
                            src={product.images[0]} 
                            alt={product.name} 
                            className="w-8 h-8 rounded object-cover mr-2" 
                          />
                          <span className="truncate">{product.name}</span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Banner Products */}
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-3">{content.banner}</h3>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {products.filter(p => p.active !== false).map(product => (
                      <div key={`banner-${product.id}`} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`banner-${product.id}`} 
                          checked={siteContent.bannerProducts.includes(product.id)}
                          onCheckedChange={(checked) => handleBannerChange(product.id, !!checked)}
                        />
                        <Label htmlFor={`banner-${product.id}`} className="flex items-center">
                          <img 
                            src={product.images[0]} 
                            alt={product.name} 
                            className="w-8 h-8 rounded object-cover mr-2" 
                          />
                          <span className="truncate">{product.name}</span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Rotative Products */}
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-3">{content.rotative}</h3>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {products.filter(p => p.active !== false).map(product => (
                      <div key={`rotative-${product.id}`} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`rotative-${product.id}`} 
                          checked={siteContent.rotativeProducts.includes(product.id)}
                          onCheckedChange={(checked) => handleRotativeChange(product.id, !!checked)}
                        />
                        <Label htmlFor={`rotative-${product.id}`} className="flex items-center">
                          <img 
                            src={product.images[0]} 
                            alt={product.name} 
                            className="w-8 h-8 rounded object-cover mr-2" 
                          />
                          <span className="truncate">{product.name}</span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* About & Contact Tab */}
        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>{content.aboutContact}</CardTitle>
              <CardDescription>Set about us content and contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="aboutContent">{content.aboutContent}</Label>
                <Textarea 
                  id="aboutContent" 
                  name="aboutContent" 
                  value={siteContent.aboutContent} 
                  onChange={handleInputChange} 
                  rows={5}
                />
              </div>
              
              <h3 className="text-lg font-medium mt-4">{content.contactInfo}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">{content.email}</Label>
                  <Input 
                    id="contactEmail" 
                    name="contactEmail" 
                    type="email"
                    value={siteContent.contactEmail} 
                    onChange={handleInputChange} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">{content.phone}</Label>
                  <Input 
                    id="contactPhone" 
                    name="contactPhone" 
                    value={siteContent.contactPhone} 
                    onChange={handleInputChange} 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactAddress">{content.address}</Label>
                <Textarea 
                  id="contactAddress" 
                  name="contactAddress" 
                  value={siteContent.contactAddress} 
                  onChange={handleInputChange} 
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Social Media Tab */}
        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle>{content.socialMedia}</CardTitle>
              <CardDescription>Set your social media links</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="instagram">{content.instagram}</Label>
                  <Input 
                    id="instagram" 
                    value={siteContent.socialLinks.instagram} 
                    onChange={(e) => handleSocialLinkChange('instagram', e.target.value)} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="facebook">{content.facebook}</Label>
                  <Input 
                    id="facebook" 
                    value={siteContent.socialLinks.facebook} 
                    onChange={(e) => handleSocialLinkChange('facebook', e.target.value)} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="twitter">{content.twitter}</Label>
                  <Input 
                    id="twitter" 
                    value={siteContent.socialLinks.twitter} 
                    onChange={(e) => handleSocialLinkChange('twitter', e.target.value)} 
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Footer Tab */}
        <TabsContent value="footer">
          <Card>
            <CardHeader>
              <CardTitle>{content.footerSettings}</CardTitle>
              <CardDescription>Set footer content and information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="footerContent">{content.footerContent}</Label>
                <Textarea 
                  id="footerContent" 
                  name="footerContent" 
                  value={siteContent.footerContent} 
                  onChange={handleInputChange} 
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end">
        <Button onClick={handleSaveChanges}>
          <Save className="h-4 w-4 mr-2" />
          {content.saveChanges}
        </Button>
      </div>
    </div>
  );
};

export default SiteContent;
