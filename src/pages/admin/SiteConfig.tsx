
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Upload, Image as ImageIcon, Globe, Store, Palette, Mail, MapPin, Phone } from 'lucide-react';

const SiteConfig = () => {
  const { language } = useLanguage();
  
  // State for store settings
  const [storeSettings, setStoreSettings] = useState({
    name: 'Xible Store',
    tagline: 'Premium shoes for everyone',
    description: 'The best selection of sneakers from top brands.',
    logo: '/logo.svg',
    favicon: '/logo.svg',
    email: 'contact@xiblestore.com',
    phone: '+1 (555) 123-4567',
    address: '123 Sneaker Street, Footwear City, FC 12345',
    currency: 'USD'
  });
  
  // State for social media links
  const [socialLinks, setSocialLinks] = useState({
    instagram: 'https://instagram.com/xiblestore',
    facebook: 'https://facebook.com/xiblestore',
    twitter: 'https://twitter.com/xiblestore',
    youtube: '',
    tiktok: ''
  });
  
  // State for SEO settings
  const [seoSettings, setSeoSettings] = useState({
    title: 'Xible Store | Premium Sneakers',
    description: 'Shop the latest and greatest sneakers from top brands at Xible Store.',
    keywords: 'sneakers, shoes, footwear, nike, adidas, jordan, new balance, puma'
  });
  
  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedStoreSettings = localStorage.getItem('storeSettings');
    const savedSocialLinks = localStorage.getItem('socialLinks');
    const savedSeoSettings = localStorage.getItem('seoSettings');
    
    if (savedStoreSettings) setStoreSettings(JSON.parse(savedStoreSettings));
    if (savedSocialLinks) setSocialLinks(JSON.parse(savedSocialLinks));
    if (savedSeoSettings) setSeoSettings(JSON.parse(savedSeoSettings));
  }, []);
  
  // Handle store settings changes
  const handleStoreSettingChange = (e) => {
    const { name, value } = e.target;
    setStoreSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle social media changes
  const handleSocialLinkChange = (e) => {
    const { name, value } = e.target;
    setSocialLinks(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle SEO settings changes
  const handleSeoSettingChange = (e) => {
    const { name, value } = e.target;
    setSeoSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Function to handle file uploads (logo and favicon)
  const handleFileUpload = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStoreSettings(prev => ({
          ...prev,
          [fieldName]: reader.result
        }));
        
        // Trigger a custom event to notify App.tsx of the change
        const updateEvent = new CustomEvent('storeSettingsUpdated', {
          detail: {
            field: fieldName,
            value: reader.result
          }
        });
        window.dispatchEvent(updateEvent);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Save all settings
  const saveSettings = () => {
    localStorage.setItem('storeSettings', JSON.stringify(storeSettings));
    localStorage.setItem('socialLinks', JSON.stringify(socialLinks));
    localStorage.setItem('seoSettings', JSON.stringify(seoSettings));
    
    // Dispatch an event to notify App.tsx about the updated settings
    const updateEvent = new CustomEvent('storeSettingsUpdated', {
      detail: { type: 'all' }
    });
    window.dispatchEvent(updateEvent);
    
    toast.success(
      language === 'pt' ? 'Configurações salvas com sucesso!' : 
      language === 'es' ? '¡Configuración guardada correctamente!' : 
      'Settings saved successfully!'
    );
  };
  
  const getContent = () => {
    switch(language) {
      case 'pt':
        return {
          title: "Configurações da Loja",
          description: "Gerencie as configurações da sua loja",
          generalTab: "Geral",
          socialTab: "Redes Sociais",
          seoTab: "SEO",
          storeName: "Nome da Loja",
          storeTagline: "Slogan",
          storeDescription: "Descrição",
          storeLogo: "Logo",
          storeFavicon: "Favicon",
          storeEmail: "E-mail",
          storePhone: "Telefone",
          storeAddress: "Endereço",
          currency: "Moeda",
          selectLogo: "Selecionar Logo",
          selectFavicon: "Selecionar Favicon",
          instagram: "Instagram",
          facebook: "Facebook", 
          twitter: "Twitter",
          youtube: "YouTube",
          tiktok: "TikTok",
          seoTitle: "Título SEO",
          seoDescription: "Descrição SEO",
          seoKeywords: "Palavras-chave",
          saveChanges: "Salvar Alterações",
          urlPlaceholder: "URL do perfil",
          dimensions: "Dimensões recomendadas"
        };
      case 'es':
        return {
          title: "Configuración de la Tienda",
          description: "Administre la configuración de su tienda",
          generalTab: "General",
          socialTab: "Redes Sociales",
          seoTab: "SEO",
          storeName: "Nombre de la Tienda",
          storeTagline: "Eslogan",
          storeDescription: "Descripción",
          storeLogo: "Logo",
          storeFavicon: "Favicon",
          storeEmail: "Correo Electrónico",
          storePhone: "Teléfono",
          storeAddress: "Dirección",
          currency: "Moneda",
          selectLogo: "Seleccionar Logo",
          selectFavicon: "Seleccionar Favicon",
          instagram: "Instagram",
          facebook: "Facebook", 
          twitter: "Twitter",
          youtube: "YouTube",
          tiktok: "TikTok",
          seoTitle: "Título SEO",
          seoDescription: "Descripción SEO",
          seoKeywords: "Palabras Clave",
          saveChanges: "Guardar Cambios",
          urlPlaceholder: "URL del perfil",
          dimensions: "Dimensiones recomendadas"
        };
      default: // 'en'
        return {
          title: "Store Settings",
          description: "Manage your store settings",
          generalTab: "General",
          socialTab: "Social Media",
          seoTab: "SEO",
          storeName: "Store Name",
          storeTagline: "Tagline",
          storeDescription: "Description",
          storeLogo: "Logo",
          storeFavicon: "Favicon",
          storeEmail: "Email",
          storePhone: "Phone",
          storeAddress: "Address",
          currency: "Currency",
          selectLogo: "Select Logo",
          selectFavicon: "Select Favicon",
          instagram: "Instagram",
          facebook: "Facebook", 
          twitter: "Twitter",
          youtube: "YouTube",
          tiktok: "TikTok",
          seoTitle: "SEO Title",
          seoDescription: "SEO Description",
          seoKeywords: "Keywords",
          saveChanges: "Save Changes",
          urlPlaceholder: "Profile URL",
          dimensions: "Recommended dimensions"
        };
    }
  };
  
  const content = getContent();
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{content.title}</h2>
        <p className="text-muted-foreground">{content.description}</p>
      </div>
      
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">{content.generalTab}</TabsTrigger>
          <TabsTrigger value="social">{content.socialTab}</TabsTrigger>
          <TabsTrigger value="seo">{content.seoTab}</TabsTrigger>
        </TabsList>
        
        {/* General Settings */}
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle><Store className="h-4 w-4 inline mr-2" />{content.generalTab}</CardTitle>
              <CardDescription>{content.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{content.storeName}</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={storeSettings.name} 
                    onChange={handleStoreSettingChange} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tagline">{content.storeTagline}</Label>
                  <Input 
                    id="tagline" 
                    name="tagline" 
                    value={storeSettings.tagline} 
                    onChange={handleStoreSettingChange} 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">{content.storeDescription}</Label>
                <Input 
                  id="description" 
                  name="description" 
                  value={storeSettings.description} 
                  onChange={handleStoreSettingChange} 
                />
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Logo Upload */}
                <div className="space-y-4">
                  <Label>{content.storeLogo}</Label>
                  <div className="border rounded-md p-4 text-center">
                    <div className="mb-4 w-40 h-40 mx-auto bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                      {storeSettings.logo ? (
                        <img 
                          src={storeSettings.logo} 
                          alt="Store Logo" 
                          className="max-w-full max-h-full object-contain" 
                        />
                      ) : (
                        <ImageIcon className="h-12 w-12 text-gray-400" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {content.dimensions}: 200x200px
                    </p>
                    <div className="relative">
                      <Input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="logo-upload"
                        onChange={(e) => handleFileUpload(e, 'logo')}
                      />
                      <Label
                        htmlFor="logo-upload"
                        className="flex items-center justify-center gap-2 cursor-pointer bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 transition"
                      >
                        <Upload className="h-4 w-4" />
                        {content.selectLogo}
                      </Label>
                    </div>
                  </div>
                </div>
                
                {/* Favicon Upload */}
                <div className="space-y-4">
                  <Label>{content.storeFavicon}</Label>
                  <div className="border rounded-md p-4 text-center">
                    <div className="mb-4 w-40 h-40 mx-auto bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                      {storeSettings.favicon ? (
                        <img 
                          src={storeSettings.favicon} 
                          alt="Favicon" 
                          className="max-w-full max-h-full object-contain" 
                        />
                      ) : (
                        <ImageIcon className="h-12 w-12 text-gray-400" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {content.dimensions}: 32x32px
                    </p>
                    <div className="relative">
                      <Input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="favicon-upload"
                        onChange={(e) => handleFileUpload(e, 'favicon')}
                      />
                      <Label
                        htmlFor="favicon-upload"
                        className="flex items-center justify-center gap-2 cursor-pointer bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 transition"
                      >
                        <Upload className="h-4 w-4" />
                        {content.selectFavicon}
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">{content.storeEmail}</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email"
                    value={storeSettings.email} 
                    onChange={handleStoreSettingChange} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">{content.storePhone}</Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    value={storeSettings.phone} 
                    onChange={handleStoreSettingChange} 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">{content.storeAddress}</Label>
                <Input 
                  id="address" 
                  name="address" 
                  value={storeSettings.address} 
                  onChange={handleStoreSettingChange} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="currency">{content.currency}</Label>
                <Input 
                  id="currency" 
                  name="currency" 
                  value={storeSettings.currency} 
                  onChange={handleStoreSettingChange} 
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Social Media Settings */}
        <TabsContent value="social" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle><Globe className="h-4 w-4 inline mr-2" />{content.socialTab}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="instagram">{content.instagram}</Label>
                <Input 
                  id="instagram" 
                  name="instagram" 
                  placeholder={content.urlPlaceholder}
                  value={socialLinks.instagram} 
                  onChange={handleSocialLinkChange} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="facebook">{content.facebook}</Label>
                <Input 
                  id="facebook" 
                  name="facebook" 
                  placeholder={content.urlPlaceholder}
                  value={socialLinks.facebook} 
                  onChange={handleSocialLinkChange} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="twitter">{content.twitter}</Label>
                <Input 
                  id="twitter" 
                  name="twitter" 
                  placeholder={content.urlPlaceholder}
                  value={socialLinks.twitter} 
                  onChange={handleSocialLinkChange} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="youtube">{content.youtube}</Label>
                <Input 
                  id="youtube" 
                  name="youtube" 
                  placeholder={content.urlPlaceholder}
                  value={socialLinks.youtube} 
                  onChange={handleSocialLinkChange} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tiktok">{content.tiktok}</Label>
                <Input 
                  id="tiktok" 
                  name="tiktok" 
                  placeholder={content.urlPlaceholder}
                  value={socialLinks.tiktok} 
                  onChange={handleSocialLinkChange} 
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* SEO Settings */}
        <TabsContent value="seo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle><Palette className="h-4 w-4 inline mr-2" />{content.seoTab}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="seoTitle">{content.seoTitle}</Label>
                <Input 
                  id="seoTitle" 
                  name="title" 
                  value={seoSettings.title} 
                  onChange={handleSeoSettingChange} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="seoDescription">{content.seoDescription}</Label>
                <Input 
                  id="seoDescription" 
                  name="description" 
                  value={seoSettings.description} 
                  onChange={handleSeoSettingChange} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="seoKeywords">{content.seoKeywords}</Label>
                <Input 
                  id="seoKeywords" 
                  name="keywords" 
                  value={seoSettings.keywords} 
                  onChange={handleSeoSettingChange} 
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Button size="lg" onClick={saveSettings}>
        {content.saveChanges}
      </Button>
    </div>
  );
};

export default SiteConfig;
