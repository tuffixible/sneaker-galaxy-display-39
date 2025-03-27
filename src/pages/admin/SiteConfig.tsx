import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Save, Image as ImageIcon, CreditCard, QrCode } from "lucide-react";

const SiteConfig = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  // Site settings state
  const [settings, setSettings] = useState({
    general: {
      storeName: "Xible Store",
      storeDescription: "Premium shoes for everyone",
      storeLogo: "/logo.svg",
      favicon: "/favicon.ico",
      primaryColor: "#8B5CF6",
      secondaryColor: "#7E69AB",
      currency: "USD",
      currencySymbol: "$"
    },
    location: {
      country: "United States",
      timezone: "America/New_York",
      dateFormat: "MM/DD/YYYY",
      timeFormat: "12h"
    },
    payment: {
      creditCard: true,
      paypal: true,
      applePay: false,
      googlePay: false,
      pix: false,
      bankTransfer: false
    },
    email: {
      fromEmail: "no-reply@xiblestore.com",
      contactEmail: "contact@xiblestore.com",
      emailFooter: "© 2023 Xible Store. All rights reserved.",
      smtpHost: "smtp.example.com",
      smtpPort: "587",
      smtpUser: "user@example.com",
      smtpPassword: "********"
    }
  });
  
  // Logo and favicon file states
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>(settings.general.storeLogo);
  const [faviconPreview, setFaviconPreview] = useState<string>(settings.general.favicon);
  
  // Content based on language
  const getContent = () => {
    switch(language) {
      case 'pt':
        return {
          title: "Configurações do Site",
          description: "Gerencie as configurações da sua loja",
          tabs: {
            general: "Geral",
            location: "Localização",
            payment: "Pagamento",
            email: "Email",
            security: "Segurança",
            users: "Usuários"
          },
          general: {
            title: "Configurações Gerais",
            description: "Configurações básicas da loja",
            storeName: "Nome da Loja",
            storeDescription: "Descrição da Loja",
            storeLogo: "Logo da Loja",
            favicon: "Favicon",
            changeImage: "Alterar Imagem",
            colors: "Cores",
            primaryColor: "Cor Primária",
            secondaryColor: "Cor Secundária",
            currency: "Moeda",
            currencySymbol: "Símbolo da Moeda"
          },
          location: {
            title: "Configurações de Localização",
            description: "Definir país, fuso horário e formatos",
            country: "País",
            timezone: "Fuso Horário",
            dateFormat: "Formato de Data",
            timeFormat: "Formato de Hora"
          },
          payment: {
            title: "Métodos de Pagamento",
            description: "Configurar métodos de pagamento aceitos",
            creditCard: "Cartão de Crédito",
            paypal: "PayPal",
            applePay: "Apple Pay",
            googlePay: "Google Pay",
            pix: "PIX",
            bankTransfer: "Transferência Bancária"
          },
          email: {
            title: "Configurações de Email",
            description: "Configurar emails da loja",
            fromEmail: "Email de Envio",
            contactEmail: "Email de Contato",
            emailFooter: "Rodapé do Email",
            smtpSettings: "Configurações SMTP",
            smtpHost: "Servidor SMTP",
            smtpPort: "Porta SMTP",
            smtpUser: "Usuário SMTP",
            smtpPassword: "Senha SMTP"
          },
          save: "Salvar Alterações",
          saving: "Salvando...",
          saved: "Configurações salvas com sucesso!"
        };
      case 'es':
        return {
          title: "Configuración del Sitio",
          description: "Administre la configuración de su tienda",
          tabs: {
            general: "General",
            location: "Ubicación",
            payment: "Pago",
            email: "Correo Electrónico",
            security: "Seguridad",
            users: "Usuarios"
          },
          general: {
            title: "Configuración General",
            description: "Configuración básica de la tienda",
            storeName: "Nombre de la Tienda",
            storeDescription: "Descripción de la Tienda",
            storeLogo: "Logo de la Tienda",
            favicon: "Favicon",
            changeImage: "Cambiar Imagen",
            colors: "Colores",
            primaryColor: "Color Primario",
            secondaryColor: "Color Secundario",
            currency: "Moneda",
            currencySymbol: "Símbolo de Moneda"
          },
          location: {
            title: "Configuración de Ubicación",
            description: "Establecer país, zona horaria y formatos",
            country: "País",
            timezone: "Zona Horaria",
            dateFormat: "Formato de Fecha",
            timeFormat: "Formato de Hora"
          },
          payment: {
            title: "Métodos de Pago",
            description: "Configurar métodos de pago aceptados",
            creditCard: "Tarjeta de Crédito",
            paypal: "PayPal",
            applePay: "Apple Pay",
            googlePay: "Google Pay",
            pix: "PIX",
            bankTransfer: "Transferencia Bancaria"
          },
          email: {
            title: "Configuración de Correo Electrónico",
            description: "Configurar correos electrónicos de la tienda",
            fromEmail: "Correo de Envío",
            contactEmail: "Correo de Contacto",
            emailFooter: "Pie de Correo",
            smtpSettings: "Configuración SMTP",
            smtpHost: "Servidor SMTP",
            smtpPort: "Puerto SMTP",
            smtpUser: "Usuario SMTP",
            smtpPassword: "Contraseña SMTP"
          },
          save: "Guardar Cambios",
          saving: "Guardando...",
          saved: "¡Configuración guardada con éxito!"
        };
      default: // 'en'
        return {
          title: "Site Configuration",
          description: "Manage your store settings",
          tabs: {
            general: "General",
            location: "Location",
            payment: "Payment",
            email: "Email",
            security: "Security",
            users: "Users"
          },
          general: {
            title: "General Settings",
            description: "Basic store settings",
            storeName: "Store Name",
            storeDescription: "Store Description",
            storeLogo: "Store Logo",
            favicon: "Favicon",
            changeImage: "Change Image",
            colors: "Colors",
            primaryColor: "Primary Color",
            secondaryColor: "Secondary Color",
            currency: "Currency",
            currencySymbol: "Currency Symbol"
          },
          location: {
            title: "Location Settings",
            description: "Set country, timezone and formats",
            country: "Country",
            timezone: "Timezone",
            dateFormat: "Date Format",
            timeFormat: "Time Format"
          },
          payment: {
            title: "Payment Methods",
            description: "Configure accepted payment methods",
            creditCard: "Credit Card",
            paypal: "PayPal",
            applePay: "Apple Pay",
            googlePay: "Google Pay",
            pix: "PIX",
            bankTransfer: "Bank Transfer"
          },
          email: {
            title: "Email Settings",
            description: "Configure store emails",
            fromEmail: "From Email",
            contactEmail: "Contact Email",
            emailFooter: "Email Footer",
            smtpSettings: "SMTP Settings",
            smtpHost: "SMTP Host",
            smtpPort: "SMTP Port",
            smtpUser: "SMTP User",
            smtpPassword: "SMTP Password"
          },
          save: "Save Changes",
          saving: "Saving...",
          saved: "Settings saved successfully!"
        };
    }
  };
  
  const content = getContent();
  
  // Handle input changes
  const handleChange = (section: string, field: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };
  
  // Handle logo file selection
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogoFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Handle favicon file selection
  const handleFaviconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFaviconFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setFaviconPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Save settings
  const handleSave = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Here you would upload files and save settings to backend
      // For now we're just showing a success toast
      
      // Update settings with new file paths (in a real app, this would come from your backend)
      if (logoFile) {
        // In a real app, this would be the URL returned from your file upload
        setSettings(prev => ({
          ...prev,
          general: {
            ...prev.general,
            storeLogo: logoPreview
          }
        }));
      }
      
      if (faviconFile) {
        // In a real app, this would be the URL returned from your file upload
        setSettings(prev => ({
          ...prev,
          general: {
            ...prev.general,
            favicon: faviconPreview
          }
        }));
      }
      
      toast({
        title: content.saved,
        description: new Date().toLocaleTimeString(),
      });
      
      setIsLoading(false);
    }, 1500);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{content.title}</h2>
        <p className="text-muted-foreground">{content.description}</p>
      </div>
      
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-6 h-auto">
          <TabsTrigger value="general">{content.tabs.general}</TabsTrigger>
          <TabsTrigger value="location">{content.tabs.location}</TabsTrigger>
          <TabsTrigger value="payment">{content.tabs.payment}</TabsTrigger>
          <TabsTrigger value="email">{content.tabs.email}</TabsTrigger>
          <TabsTrigger value="security">{content.tabs.security}</TabsTrigger>
          <TabsTrigger value="users">{content.tabs.users}</TabsTrigger>
        </TabsList>
        
        {/* General Settings Tab */}
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{content.general.title}</CardTitle>
              <CardDescription>{content.general.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="storeName">{content.general.storeName}</Label>
                  <Input 
                    id="storeName" 
                    value={settings.general.storeName} 
                    onChange={(e) => handleChange('general', 'storeName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeDescription">{content.general.storeDescription}</Label>
                  <Input 
                    id="storeDescription" 
                    value={settings.general.storeDescription} 
                    onChange={(e) => handleChange('general', 'storeDescription', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid gap-8 md:grid-cols-2">
                {/* Store Logo */}
                <div className="space-y-3">
                  <Label>{content.general.storeLogo}</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-24 w-24 rounded-md border overflow-hidden bg-background">
                      <img 
                        src={logoPreview} 
                        alt="Store Logo" 
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div>
                      <Label 
                        htmlFor="logoUpload" 
                        className="cursor-pointer inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90"
                      >
                        <ImageIcon className="mr-2 h-4 w-4" />
                        {content.general.changeImage}
                      </Label>
                      <Input 
                        id="logoUpload" 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleLogoChange}
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        Recommended: 200x200px SVG, PNG or JPEG
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Favicon */}
                <div className="space-y-3">
                  <Label>{content.general.favicon}</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-md border overflow-hidden bg-background p-1">
                      <img 
                        src={faviconPreview} 
                        alt="Favicon" 
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div>
                      <Label 
                        htmlFor="faviconUpload" 
                        className="cursor-pointer inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90"
                      >
                        <ImageIcon className="mr-2 h-4 w-4" />
                        {content.general.changeImage}
                      </Label>
                      <Input 
                        id="faviconUpload" 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleFaviconChange}
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        Recommended: 32x32px ICO, PNG
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">{content.general.colors}</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">{content.general.primaryColor}</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="primaryColor" 
                        value={settings.general.primaryColor} 
                        onChange={(e) => handleChange('general', 'primaryColor', e.target.value)}
                      />
                      <Input 
                        type="color" 
                        value={settings.general.primaryColor}
                        onChange={(e) => handleChange('general', 'primaryColor', e.target.value)}
                        className="w-12 h-9 p-1"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secondaryColor">{content.general.secondaryColor}</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="secondaryColor" 
                        value={settings.general.secondaryColor} 
                        onChange={(e) => handleChange('general', 'secondaryColor', e.target.value)}
                      />
                      <Input 
                        type="color" 
                        value={settings.general.secondaryColor}
                        onChange={(e) => handleChange('general', 'secondaryColor', e.target.value)}
                        className="w-12 h-9 p-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="currency">{content.general.currency}</Label>
                  <Select
                    value={settings.general.currency}
                    onValueChange={(value) => handleChange('general', 'currency', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">US Dollar (USD)</SelectItem>
                      <SelectItem value="EUR">Euro (EUR)</SelectItem>
                      <SelectItem value="GBP">British Pound (GBP)</SelectItem>
                      <SelectItem value="JPY">Japanese Yen (JPY)</SelectItem>
                      <SelectItem value="BRL">Brazilian Real (BRL)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currencySymbol">{content.general.currencySymbol}</Label>
                  <Input 
                    id="currencySymbol" 
                    value={settings.general.currencySymbol} 
                    onChange={(e) => handleChange('general', 'currencySymbol', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Location Settings Tab */}
        <TabsContent value="location" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{content.location.title}</CardTitle>
              <CardDescription>{content.location.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="country">{content.location.country}</Label>
                  <Select
                    value={settings.location.country}
                    onValueChange={(value) => handleChange('location', 'country', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="United States">United States</SelectItem>
                      <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                      <SelectItem value="Australia">Australia</SelectItem>
                      <SelectItem value="Germany">Germany</SelectItem>
                      <SelectItem value="France">France</SelectItem>
                      <SelectItem value="Brazil">Brazil</SelectItem>
                      <SelectItem value="Japan">Japan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">{content.location.timezone}</Label>
                  <Select
                    value={settings.location.timezone}
                    onValueChange={(value) => handleChange('location', 'timezone', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                      <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                      <SelectItem value="Europe/London">Greenwich Mean Time (GMT)</SelectItem>
                      <SelectItem value="Europe/Paris">Central European Time (CET)</SelectItem>
                      <SelectItem value="Asia/Tokyo">Japan Standard Time (JST)</SelectItem>
                      <SelectItem value="Australia/Sydney">Australian Eastern Time (AET)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="dateFormat">{content.location.dateFormat}</Label>
                  <Select
                    value={settings.location.dateFormat}
                    onValueChange={(value) => handleChange('location', 'dateFormat', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select date format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      <SelectItem value="MMM DD, YYYY">MMM DD, YYYY</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeFormat">{content.location.timeFormat}</Label>
                  <Select
                    value={settings.location.timeFormat}
                    onValueChange={(value) => handleChange('location', 'timeFormat', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select time format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                      <SelectItem value="24h">24-hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Payment Methods Tab */}
        <TabsContent value="payment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{content.payment.title}</CardTitle>
              <CardDescription>{content.payment.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border p-4 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">{content.payment.creditCard}</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.payment.creditCard}
                    onCheckedChange={(value) => handleChange('payment', 'creditCard', value)}
                  />
                </div>
                
                <div className="flex items-center justify-between border p-4 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6.5 7h11M9 10.5h6M11 14h2M7 18.5h10a2 2 0 002-2v-11a2 2 0 00-2-2H7a2 2 0 00-2 2v11a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="font-medium">{content.payment.paypal}</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.payment.paypal}
                    onCheckedChange={(value) => handleChange('payment', 'paypal', value)}
                  />
                </div>
                
                <div className="flex items-center justify-between border p-4 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
                      <path d="M17.5 12c0-3.04-2.46-5.5-5.5-5.5s-5.5 2.46-5.5 5.5H8a4 4 0 014-4v1.5l3-3-3-3v1.5a5.5 5.5 0 00-5.5 5.5" />
                    </svg>
                    <div>
                      <p className="font-medium">{content.payment.applePay}</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.payment.applePay}
                    onCheckedChange={(value) => handleChange('payment', 'applePay', value)}
                  />
                </div>
                
                <div className="flex items-center justify-between border p-4 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    <div>
                      <p className="font-medium">{content.payment.googlePay}</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.payment.googlePay}
                    onCheckedChange={(value) => handleChange('payment', 'googlePay', value)}
                  />
                </div>
                
                <div className="flex items-center justify-between border p-4 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <QrCode className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">{content.payment.pix}</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.payment.pix}
                    onCheckedChange={(value) => handleChange('payment', 'pix', value)}
                  />
                </div>
                
                <div className="flex items-center justify-between border p-4 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 6l-8 6 8 6V6z" />
                    </svg>
                    <div>
                      <p className="font-medium">{content.payment.bankTransfer}</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.payment.bankTransfer}
                    onCheckedChange={(value) => handleChange('payment', 'bankTransfer', value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Email Settings Tab */}
        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{content.email.title}</CardTitle>
              <CardDescription>{content.email.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fromEmail">{content.email.fromEmail}</Label>
                  <Input 
                    id="fromEmail" 
                    type="email"
                    value={settings.email.fromEmail} 
                    onChange={(e) => handleChange('email', 'fromEmail', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">{content.email.contactEmail}</Label>
                  <Input 
                    id="contactEmail" 
                    type="email"
                    value={settings.email.contactEmail} 
                    onChange={(e) => handleChange('email', 'contactEmail', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="emailFooter">{content.email.emailFooter}</Label>
                <Textarea 
                  id="emailFooter" 
                  value={settings.email.emailFooter} 
                  onChange={(e) => handleChange('email', 'emailFooter', e.target.value)}
                  rows={3}
                />
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">{content.email.smtpSettings}</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="smtpHost">{content.email.smtpHost}</Label>
                    <Input 
                      id="smtpHost" 
                      value={settings.email.smtpHost} 
                      onChange={(e) => handleChange('email', 'smtpHost', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpPort">{content.email.smtpPort}</Label>
                    <Input 
                      id="smtpPort" 
                      value={settings.email.smtpPort} 
                      onChange={(e) => handleChange('email', 'smtpPort', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="smtpUser">{content.email.smtpUser}</Label>
                    <Input 
                      id="smtpUser" 
                      value={settings.email.smtpUser} 
                      onChange={(e) => handleChange('email', 'smtpUser', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpPassword">{content.email.smtpPassword}</Label>
                    <Input 
                      id="smtpPassword" 
                      type="password"
                      value={settings.email.smtpPassword} 
                      onChange={(e) => handleChange('email', 'smtpPassword', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Other tabs would go here */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage security options</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Security settings content will be implemented in a future update.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage admin users and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">User management features will be implemented in a future update.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end">
        <Button 
          onClick={handleSave}
          disabled={isLoading}
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {content.saving}
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              {content.save}
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default SiteConfig;
