
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Settings, 
  Save, 
  Globe, 
  Image, 
  Palette, 
  Layout, 
  Share2,
  Info,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SiteConfig = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get translated content based on language
  const getContent = () => {
    switch(language) {
      case 'pt':
        return {
          title: "Configurações do Site",
          subtitle: "Gerencia as configurações do seu site",
          saveChanges: "Salvar Alterações",
          saving: "Salvando...",
          savedSuccess: "Configurações salvas com sucesso!",
          // General tab
          generalTab: "Geral",
          generalTitle: "Configurações Gerais",
          generalDescription: "Configure os detalhes básicos do seu site",
          storeName: "Nome da Loja",
          storeNamePlaceholder: "Ex: Xible Store",
          storeDescription: "Descrição da Loja",
          storeDescriptionPlaceholder: "Uma breve descrição da sua loja...",
          currency: "Moeda",
          language: "Idioma",
          defaultLanguage: "Idioma Padrão",
          // Appearance tab
          appearanceTab: "Aparência",
          appearanceTitle: "Personalização da Aparência",
          appearanceDescription: "Personalize a aparência do seu site",
          primaryColor: "Cor Primária",
          secondaryColor: "Cor Secundária",
          accentColor: "Cor de Destaque",
          logo: "Logo",
          logoUpload: "Enviar Logo",
          logoDescription: "Formato recomendado: SVG ou PNG com fundo transparente",
          favicon: "Favicon",
          faviconDescription: "Ícone exibido na aba do navegador",
          // Contact tab
          contactTab: "Contato",
          contactTitle: "Informações de Contato",
          contactDescription: "Defina as informações de contato da loja",
          email: "Email",
          phone: "Telefone",
          address: "Endereço",
          addressLine1: "Endereço Linha 1",
          addressLine2: "Endereço Linha 2",
          city: "Cidade",
          state: "Estado",
          postalCode: "CEP",
          country: "País",
          // Social tab
          socialTab: "Redes Sociais",
          socialTitle: "Links de Redes Sociais",
          socialDescription: "Configure os links para suas redes sociais",
          facebook: "Facebook",
          instagram: "Instagram",
          twitter: "Twitter",
          youtube: "YouTube",
          tiktok: "TikTok",
          pinterest: "Pinterest",
          // SEO tab
          seoTab: "SEO",
          seoTitle: "Configurações de SEO",
          seoDescription: "Otimize seu site para mecanismos de busca",
          metaTitle: "Título Meta",
          metaDescription: "Descrição Meta",
          ogImage: "Imagem Open Graph",
          ogImageDescription: "Imagem exibida quando seu site é compartilhado",
          googleAnalytics: "ID do Google Analytics",
          // Error messages
          errorRequired: "Este campo é obrigatório",
          errorEmail: "Por favor insira um email válido"
        };
      case 'es':
        return {
          title: "Configuración del Sitio",
          subtitle: "Administra la configuración de tu sitio",
          saveChanges: "Guardar Cambios",
          saving: "Guardando...",
          savedSuccess: "¡Configuración guardada con éxito!",
          // General tab
          generalTab: "General",
          generalTitle: "Configuración General",
          generalDescription: "Configura los detalles básicos de tu sitio",
          storeName: "Nombre de la Tienda",
          storeNamePlaceholder: "Ej: Xible Store",
          storeDescription: "Descripción de la Tienda",
          storeDescriptionPlaceholder: "Una breve descripción de tu tienda...",
          currency: "Moneda",
          language: "Idioma",
          defaultLanguage: "Idioma Predeterminado",
          // Appearance tab
          appearanceTab: "Apariencia",
          appearanceTitle: "Personalización de Apariencia",
          appearanceDescription: "Personaliza la apariencia de tu sitio",
          primaryColor: "Color Primario",
          secondaryColor: "Color Secundario",
          accentColor: "Color de Acento",
          logo: "Logo",
          logoUpload: "Subir Logo",
          logoDescription: "Formato recomendado: SVG o PNG con fondo transparente",
          favicon: "Favicon",
          faviconDescription: "Icono mostrado en la pestaña del navegador",
          // Contact tab
          contactTab: "Contacto",
          contactTitle: "Información de Contacto",
          contactDescription: "Define la información de contacto de la tienda",
          email: "Correo Electrónico",
          phone: "Teléfono",
          address: "Dirección",
          addressLine1: "Dirección Línea 1",
          addressLine2: "Dirección Línea 2",
          city: "Ciudad",
          state: "Estado",
          postalCode: "Código Postal",
          country: "País",
          // Social tab
          socialTab: "Redes Sociales",
          socialTitle: "Enlaces de Redes Sociales",
          socialDescription: "Configura los enlaces a tus redes sociales",
          facebook: "Facebook",
          instagram: "Instagram",
          twitter: "Twitter",
          youtube: "YouTube",
          tiktok: "TikTok",
          pinterest: "Pinterest",
          // SEO tab
          seoTab: "SEO",
          seoTitle: "Configuración de SEO",
          seoDescription: "Optimiza tu sitio para motores de búsqueda",
          metaTitle: "Título Meta",
          metaDescription: "Descripción Meta",
          ogImage: "Imagen Open Graph",
          ogImageDescription: "Imagen mostrada cuando tu sitio es compartido",
          googleAnalytics: "ID de Google Analytics",
          // Error messages
          errorRequired: "Este campo es obligatorio",
          errorEmail: "Por favor ingresa un correo electrónico válido"
        };
      default: // 'en'
        return {
          title: "Site Configuration",
          subtitle: "Manage your site settings",
          saveChanges: "Save Changes",
          saving: "Saving...",
          savedSuccess: "Settings saved successfully!",
          // General tab
          generalTab: "General",
          generalTitle: "General Settings",
          generalDescription: "Configure basic details of your site",
          storeName: "Store Name",
          storeNamePlaceholder: "E.g., Xible Store",
          storeDescription: "Store Description",
          storeDescriptionPlaceholder: "A brief description of your store...",
          currency: "Currency",
          language: "Language",
          defaultLanguage: "Default Language",
          // Appearance tab
          appearanceTab: "Appearance",
          appearanceTitle: "Appearance Customization",
          appearanceDescription: "Customize the look and feel of your site",
          primaryColor: "Primary Color",
          secondaryColor: "Secondary Color",
          accentColor: "Accent Color",
          logo: "Logo",
          logoUpload: "Upload Logo",
          logoDescription: "Recommended format: SVG or PNG with transparent background",
          favicon: "Favicon",
          faviconDescription: "Icon shown in browser tab",
          // Contact tab
          contactTab: "Contact",
          contactTitle: "Contact Information",
          contactDescription: "Set the store's contact information",
          email: "Email",
          phone: "Phone",
          address: "Address",
          addressLine1: "Address Line 1",
          addressLine2: "Address Line 2",
          city: "City",
          state: "State",
          postalCode: "Postal Code",
          country: "Country",
          // Social tab
          socialTab: "Social",
          socialTitle: "Social Media Links",
          socialDescription: "Configure links to your social media accounts",
          facebook: "Facebook",
          instagram: "Instagram",
          twitter: "Twitter",
          youtube: "YouTube",
          tiktok: "TikTok",
          pinterest: "Pinterest",
          // SEO tab
          seoTab: "SEO",
          seoTitle: "SEO Settings",
          seoDescription: "Optimize your site for search engines",
          metaTitle: "Meta Title",
          metaDescription: "Meta Description",
          ogImage: "Open Graph Image",
          ogImageDescription: "Image displayed when your site is shared",
          googleAnalytics: "Google Analytics ID",
          // Error messages
          errorRequired: "This field is required",
          errorEmail: "Please enter a valid email"
        };
    }
  };

  const content = getContent();

  // Form schemas for each tab
  const generalFormSchema = z.object({
    storeName: z.string().min(1, { message: content.errorRequired }),
    storeDescription: z.string().min(1, { message: content.errorRequired }),
    currency: z.string().min(1, { message: content.errorRequired }),
    defaultLanguage: z.string().min(1, { message: content.errorRequired }),
  });

  const appearanceFormSchema = z.object({
    primaryColor: z.string().min(1, { message: content.errorRequired }),
    secondaryColor: z.string().min(1, { message: content.errorRequired }),
    accentColor: z.string().min(1, { message: content.errorRequired }),
  });

  const contactFormSchema = z.object({
    email: z.string().min(1, { message: content.errorRequired }).email({ message: content.errorEmail }),
    phone: z.string().min(1, { message: content.errorRequired }),
    addressLine1: z.string().min(1, { message: content.errorRequired }),
    addressLine2: z.string().optional(),
    city: z.string().min(1, { message: content.errorRequired }),
    state: z.string().min(1, { message: content.errorRequired }),
    postalCode: z.string().min(1, { message: content.errorRequired }),
    country: z.string().min(1, { message: content.errorRequired }),
  });

  const socialFormSchema = z.object({
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    twitter: z.string().optional(),
    youtube: z.string().optional(),
    tiktok: z.string().optional(),
    pinterest: z.string().optional(),
  });

  const seoFormSchema = z.object({
    metaTitle: z.string().min(1, { message: content.errorRequired }),
    metaDescription: z.string().min(1, { message: content.errorRequired }),
    googleAnalytics: z.string().optional(),
  });

  // Initialize forms
  const generalForm = useForm<z.infer<typeof generalFormSchema>>({
    resolver: zodResolver(generalFormSchema),
    defaultValues: {
      storeName: "Xible Store",
      storeDescription: "Your one-stop shop for athletic footwear and accessories",
      currency: "USD",
      defaultLanguage: "en",
    },
  });

  const appearanceForm = useForm<z.infer<typeof appearanceFormSchema>>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: {
      primaryColor: "#8B5CF6",
      secondaryColor: "#F3F4F6",
      accentColor: "#10B981",
    },
  });

  const contactForm = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      email: "contact@xiblestore.com",
      phone: "+1 (555) 123-4567",
      addressLine1: "123 Commerce Street",
      addressLine2: "Suite 100",
      city: "New York",
      state: "NY",
      postalCode: "10001",
      country: "United States",
    },
  });

  const socialForm = useForm<z.infer<typeof socialFormSchema>>({
    resolver: zodResolver(socialFormSchema),
    defaultValues: {
      facebook: "https://facebook.com/xiblestore",
      instagram: "https://instagram.com/xiblestore",
      twitter: "https://twitter.com/xiblestore",
      youtube: "",
      tiktok: "",
      pinterest: "",
    },
  });

  const seoForm = useForm<z.infer<typeof seoFormSchema>>({
    resolver: zodResolver(seoFormSchema),
    defaultValues: {
      metaTitle: "Xible Store | Athletic Footwear and Accessories",
      metaDescription: "Shop the latest athletic footwear and accessories at Xible Store. We offer premium quality products for all your sporting needs.",
      googleAnalytics: "UA-XXXXXXXXX-X",
    },
  });

  // Form submission handlers
  const onSubmitGeneral = async (values: z.infer<typeof generalFormSchema>) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("General settings:", values);
    toast({
      title: content.savedSuccess,
      description: new Date().toLocaleString(),
    });
    setIsSubmitting(false);
  };

  const onSubmitAppearance = async (values: z.infer<typeof appearanceFormSchema>) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Appearance settings:", values);
    toast({
      title: content.savedSuccess,
      description: new Date().toLocaleString(),
    });
    setIsSubmitting(false);
  };

  const onSubmitContact = async (values: z.infer<typeof contactFormSchema>) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Contact settings:", values);
    toast({
      title: content.savedSuccess,
      description: new Date().toLocaleString(),
    });
    setIsSubmitting(false);
  };

  const onSubmitSocial = async (values: z.infer<typeof socialFormSchema>) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Social settings:", values);
    toast({
      title: content.savedSuccess,
      description: new Date().toLocaleString(),
    });
    setIsSubmitting(false);
  };

  const onSubmitSeo = async (values: z.infer<typeof seoFormSchema>) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("SEO settings:", values);
    toast({
      title: content.savedSuccess,
      description: new Date().toLocaleString(),
    });
    setIsSubmitting(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2 flex items-center">
        <Settings className="mr-2 h-6 w-6" />
        {content.title}
      </h1>
      <p className="text-muted-foreground mb-6">{content.subtitle}</p>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="general" className="flex items-center">
            <Globe className="mr-2 h-4 w-4" />
            {content.generalTab}
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center">
            <Palette className="mr-2 h-4 w-4" />
            {content.appearanceTab}
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex items-center">
            <Mail className="mr-2 h-4 w-4" />
            {content.contactTab}
          </TabsTrigger>
          <TabsTrigger value="social" className="flex items-center">
            <Share2 className="mr-2 h-4 w-4" />
            {content.socialTab}
          </TabsTrigger>
          <TabsTrigger value="seo" className="flex items-center">
            <Layout className="mr-2 h-4 w-4" />
            {content.seoTab}
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>{content.generalTitle}</CardTitle>
              <CardDescription>{content.generalDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...generalForm}>
                <form onSubmit={generalForm.handleSubmit(onSubmitGeneral)} className="space-y-6">
                  <FormField
                    control={generalForm.control}
                    name="storeName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{content.storeName}</FormLabel>
                        <FormControl>
                          <Input placeholder={content.storeNamePlaceholder} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={generalForm.control}
                    name="storeDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{content.storeDescription}</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder={content.storeDescriptionPlaceholder} 
                            className="min-h-32"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <FormField
                      control={generalForm.control}
                      name="currency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{content.currency}</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select currency" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="USD">USD ($)</SelectItem>
                              <SelectItem value="EUR">EUR (€)</SelectItem>
                              <SelectItem value="GBP">GBP (£)</SelectItem>
                              <SelectItem value="BRL">BRL (R$)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={generalForm.control}
                      name="defaultLanguage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{content.defaultLanguage}</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select language" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="en">English</SelectItem>
                              <SelectItem value="es">Español</SelectItem>
                              <SelectItem value="pt">Português</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {content.saving}
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Save className="mr-2 h-4 w-4" />
                        {content.saveChanges}
                      </span>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>{content.appearanceTitle}</CardTitle>
              <CardDescription>{content.appearanceDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...appearanceForm}>
                <form onSubmit={appearanceForm.handleSubmit(onSubmitAppearance)} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                    <FormField
                      control={appearanceForm.control}
                      name="primaryColor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{content.primaryColor}</FormLabel>
                          <div className="flex items-center gap-2">
                            <input 
                              type="color" 
                              className="w-10 h-10 border rounded p-1"
                              {...field}
                            />
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={appearanceForm.control}
                      name="secondaryColor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{content.secondaryColor}</FormLabel>
                          <div className="flex items-center gap-2">
                            <input 
                              type="color" 
                              className="w-10 h-10 border rounded p-1"
                              {...field}
                            />
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={appearanceForm.control}
                      name="accentColor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{content.accentColor}</FormLabel>
                          <div className="flex items-center gap-2">
                            <input 
                              type="color" 
                              className="w-10 h-10 border rounded p-1"
                              {...field}
                            />
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <h3 className="text-sm font-medium mb-2">{content.logo}</h3>
                      <div className="border border-dashed border-border rounded-lg p-6 flex flex-col items-center justify-center">
                        <Image className="h-12 w-12 text-muted-foreground mb-4" />
                        <Button size="sm" variant="secondary">
                          {content.logoUpload}
                        </Button>
                        <p className="text-xs text-muted-foreground mt-2 text-center">
                          {content.logoDescription}
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">{content.favicon}</h3>
                      <div className="border border-dashed border-border rounded-lg p-6 flex flex-col items-center justify-center">
                        <Image className="h-12 w-12 text-muted-foreground mb-4" />
                        <Button size="sm" variant="secondary">
                          {content.logoUpload}
                        </Button>
                        <p className="text-xs text-muted-foreground mt-2 text-center">
                          {content.faviconDescription}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {content.saving}
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Save className="mr-2 h-4 w-4" />
                        {content.saveChanges}
                      </span>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Settings */}
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>{content.contactTitle}</CardTitle>
              <CardDescription>{content.contactDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...contactForm}>
                <form onSubmit={contactForm.handleSubmit(onSubmitContact)} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <FormField
                      control={contactForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{content.email}</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={contactForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{content.phone}</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={contactForm.control}
                    name="addressLine1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{content.addressLine1}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={contactForm.control}
                    name="addressLine2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{content.addressLine2}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <FormField
                      control={contactForm.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{content.city}</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={contactForm.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{content.state}</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <FormField
                      control={contactForm.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{content.postalCode}</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={contactForm.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{content.country}</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {content.saving}
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Save className="mr-2 h-4 w-4" />
                        {content.saveChanges}
                      </span>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Media Settings */}
        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle>{content.socialTitle}</CardTitle>
              <CardDescription>{content.socialDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...socialForm}>
                <form onSubmit={socialForm.handleSubmit(onSubmitSocial)} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <FormField
                      control={socialForm.control}
                      name="facebook"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{content.facebook}</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={socialForm.control}
                      name="instagram"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{content.instagram}</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <FormField
                      control={socialForm.control}
                      name="twitter"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{content.twitter}</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={socialForm.control}
                      name="youtube"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{content.youtube}</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <FormField
                      control={socialForm.control}
                      name="tiktok"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{content.tiktok}</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={socialForm.control}
                      name="pinterest"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{content.pinterest}</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {content.saving}
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Save className="mr-2 h-4 w-4" />
                        {content.saveChanges}
                      </span>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SEO Settings */}
        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <CardTitle>{content.seoTitle}</CardTitle>
              <CardDescription>{content.seoDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...seoForm}>
                <form onSubmit={seoForm.handleSubmit(onSubmitSeo)} className="space-y-6">
                  <FormField
                    control={seoForm.control}
                    name="metaTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{content.metaTitle}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={seoForm.control}
                    name="metaDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{content.metaDescription}</FormLabel>
                        <FormControl>
                          <Textarea 
                            className="min-h-24"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div>
                    <h3 className="text-sm font-medium mb-2">{content.ogImage}</h3>
                    <div className="border border-dashed border-border rounded-lg p-6 flex flex-col items-center justify-center">
                      <Image className="h-12 w-12 text-muted-foreground mb-4" />
                      <Button size="sm" variant="secondary">
                        {content.logoUpload}
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2 text-center">
                        {content.ogImageDescription}
                      </p>
                    </div>
                  </div>

                  <FormField
                    control={seoForm.control}
                    name="googleAnalytics"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{content.googleAnalytics}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {content.saving}
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Save className="mr-2 h-4 w-4" />
                        {content.saveChanges}
                      </span>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SiteConfig;
