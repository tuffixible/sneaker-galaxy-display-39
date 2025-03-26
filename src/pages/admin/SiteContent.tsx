
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { 
  Save, 
  Layout, 
  MessageSquare, 
  FileText, 
  Image, 
  Mail, 
  Upload,
  Plus,
  X,
  Eye
} from 'lucide-react';

const SiteContent = () => {
  const { language } = useLanguage();
  
  // Estado para uploads de imagens
  const [bannerImages, setBannerImages] = useState<string[]>([
    "https://images.unsplash.com/photo-1605348532760-6753d2c43329?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
    "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800"
  ]);
  
  // Multilingual content
  const getSiteContentContent = () => {
    switch(language) {
      case 'pt':
        return {
          title: "Conteúdo do Site",
          description: "Gerenciar conteúdo e layout do site",
          sections: {
            homepage: "Página Inicial",
            banners: "Banners",
            pages: "Páginas",
            blog: "Blog",
            contact: "Contato",
            seo: "SEO"
          },
          fields: {
            title: "Título",
            subtitle: "Subtítulo",
            description: "Descrição",
            content: "Conteúdo",
            image: "Imagem",
            link: "Link",
            email: "E-mail",
            phone: "Telefone",
            address: "Endereço",
            meta: "Meta Tags",
            keywords: "Palavras-chave"
          },
          placeholders: {
            title: "Digite o título",
            subtitle: "Digite o subtítulo",
            description: "Digite a descrição",
            content: "Digite o conteúdo da página",
            link: "Digite o URL do link",
            email: "Digite o e-mail de contato",
            phone: "Digite o telefone",
            address: "Digite o endereço",
            meta: "Digite as meta tags",
            keywords: "Digite as palavras-chave separadas por vírgula"
          },
          buttons: {
            save: "Salvar Alterações",
            upload: "Enviar Imagem",
            selectImage: "Selecionar Imagem",
            addBanner: "Adicionar Banner",
            removeBanner: "Remover Banner",
            preview: "Visualizar"
          },
          messages: {
            saved: "Conteúdo salvo com sucesso!",
            imageAdded: "Imagem adicionada com sucesso!",
            imageRemoved: "Imagem removida com sucesso!"
          },
          homepage: {
            heroTitle: "Título do Hero",
            heroSubtitle: "Subtítulo do Hero",
            featuredTitle: "Título da Seção de Destaques",
            featuredSubtitle: "Subtítulo da Seção de Destaques",
            newArrivalsTitle: "Título da Seção de Novidades",
            newArrivalsSubtitle: "Subtítulo da Seção de Novidades",
            testimonialTitle: "Título da Seção de Depoimentos",
            testimonialSubtitle: "Subtítulo da Seção de Depoimentos"
          }
        };
      case 'es':
        return {
          title: "Contenido del Sitio",
          description: "Gestionar contenido y diseño del sitio",
          sections: {
            homepage: "Página de Inicio",
            banners: "Banners",
            pages: "Páginas",
            blog: "Blog",
            contact: "Contacto",
            seo: "SEO"
          },
          fields: {
            title: "Título",
            subtitle: "Subtítulo",
            description: "Descripción",
            content: "Contenido",
            image: "Imagen",
            link: "Enlace",
            email: "Correo electrónico",
            phone: "Teléfono",
            address: "Dirección",
            meta: "Meta Tags",
            keywords: "Palabras clave"
          },
          placeholders: {
            title: "Escribe el título",
            subtitle: "Escribe el subtítulo",
            description: "Escribe la descripción",
            content: "Escribe el contenido de la página",
            link: "Escribe la URL del enlace",
            email: "Escribe el correo electrónico de contacto",
            phone: "Escribe el teléfono",
            address: "Escribe la dirección",
            meta: "Escribe las meta tags",
            keywords: "Escribe las palabras clave separadas por coma"
          },
          buttons: {
            save: "Guardar Cambios",
            upload: "Subir Imagen",
            selectImage: "Seleccionar Imagen",
            addBanner: "Añadir Banner",
            removeBanner: "Eliminar Banner",
            preview: "Vista Previa"
          },
          messages: {
            saved: "¡Contenido guardado con éxito!",
            imageAdded: "¡Imagen añadida con éxito!",
            imageRemoved: "¡Imagen eliminada con éxito!"
          },
          homepage: {
            heroTitle: "Título del Hero",
            heroSubtitle: "Subtítulo del Hero",
            featuredTitle: "Título de la Sección Destacada",
            featuredSubtitle: "Subtítulo de la Sección Destacada",
            newArrivalsTitle: "Título de la Sección de Novedades",
            newArrivalsSubtitle: "Subtítulo de la Sección de Novedades",
            testimonialTitle: "Título de la Sección de Testimonios",
            testimonialSubtitle: "Subtítulo de la Sección de Testimonios"
          }
        };
      default: // 'en'
        return {
          title: "Site Content",
          description: "Manage site content and layout",
          sections: {
            homepage: "Homepage",
            banners: "Banners",
            pages: "Pages",
            blog: "Blog",
            contact: "Contact",
            seo: "SEO"
          },
          fields: {
            title: "Title",
            subtitle: "Subtitle",
            description: "Description",
            content: "Content",
            image: "Image",
            link: "Link",
            email: "Email",
            phone: "Phone",
            address: "Address",
            meta: "Meta Tags",
            keywords: "Keywords"
          },
          placeholders: {
            title: "Enter title",
            subtitle: "Enter subtitle",
            description: "Enter description",
            content: "Enter page content",
            link: "Enter link URL",
            email: "Enter contact email",
            phone: "Enter phone number",
            address: "Enter address",
            meta: "Enter meta tags",
            keywords: "Enter keywords separated by comma"
          },
          buttons: {
            save: "Save Changes",
            upload: "Upload Image",
            selectImage: "Select Image",
            addBanner: "Add Banner",
            removeBanner: "Remove Banner",
            preview: "Preview"
          },
          messages: {
            saved: "Content saved successfully!",
            imageAdded: "Image added successfully!",
            imageRemoved: "Image removed successfully!"
          },
          homepage: {
            heroTitle: "Hero Title",
            heroSubtitle: "Hero Subtitle",
            featuredTitle: "Featured Section Title",
            featuredSubtitle: "Featured Section Subtitle",
            newArrivalsTitle: "New Arrivals Section Title",
            newArrivalsSubtitle: "New Arrivals Section Subtitle",
            testimonialTitle: "Testimonial Section Title",
            testimonialSubtitle: "Testimonial Section Subtitle"
          }
        };
    }
  };
  
  const content = getSiteContentContent();
  
  // Manipulador para upload de imagens
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      // Criar URLs de preview (em uma aplicação real, você faria upload para um servidor)
      const newPreviewUrls = files.map(file => URL.createObjectURL(file));
      setBannerImages(prev => [...prev, ...newPreviewUrls]);
      toast.success(content.messages.imageAdded);
    }
  };
  
  // Remover imagem
  const handleRemoveImage = (index: number) => {
    setBannerImages(prev => prev.filter((_, i) => i !== index));
    toast.success(content.messages.imageRemoved);
  };
  
  // Salvar alterações
  const handleSaveChanges = () => {
    console.log('Salvando alterações do conteúdo do site');
    toast.success(content.messages.saved);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{content.title}</h2>
          <p className="text-muted-foreground">{content.description}</p>
        </div>
        <Button onClick={handleSaveChanges}>
          <Save className="mr-2 h-4 w-4" />
          {content.buttons.save}
        </Button>
      </div>
      
      <Tabs defaultValue="homepage" className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-6">
          <TabsTrigger value="homepage">
            <Layout className="mr-2 h-4 w-4" />
            {content.sections.homepage}
          </TabsTrigger>
          <TabsTrigger value="banners">
            <Image className="mr-2 h-4 w-4" />
            {content.sections.banners}
          </TabsTrigger>
          <TabsTrigger value="pages">
            <FileText className="mr-2 h-4 w-4" />
            {content.sections.pages}
          </TabsTrigger>
          <TabsTrigger value="blog">
            <MessageSquare className="mr-2 h-4 w-4" />
            {content.sections.blog}
          </TabsTrigger>
          <TabsTrigger value="contact">
            <Mail className="mr-2 h-4 w-4" />
            {content.sections.contact}
          </TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>
        
        {/* Homepage Content */}
        <TabsContent value="homepage">
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
              <CardDescription>Editar a seção principal da página inicial</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hero-title">{content.homepage.heroTitle}</Label>
                <Input 
                  id="hero-title" 
                  placeholder={content.placeholders.title}
                  defaultValue="Encontre Seu Estilo, Defina Seu Caminho"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="hero-subtitle">{content.homepage.heroSubtitle}</Label>
                <Input 
                  id="hero-subtitle" 
                  placeholder={content.placeholders.subtitle}
                  defaultValue="Descubra a coleção mais recente de tênis para todos os estilos e ocasiões"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="hero-image">{content.fields.image}</Label>
                <div className="flex items-center gap-4">
                  <div className="border rounded-md w-1/3 aspect-video overflow-hidden">
                    <img 
                      src={bannerImages[0]}
                      alt="Hero Banner"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="hero-image-upload"
                    />
                    <Button asChild variant="outline">
                      <label htmlFor="hero-image-upload" className="cursor-pointer">
                        <Upload className="mr-2 h-4 w-4" />
                        {content.buttons.selectImage}
                      </label>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Featured Products Section</CardTitle>
              <CardDescription>Editar a seção de produtos em destaque</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="featured-title">{content.homepage.featuredTitle}</Label>
                <Input 
                  id="featured-title" 
                  placeholder={content.placeholders.title}
                  defaultValue="Produtos em Destaque"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="featured-subtitle">{content.homepage.featuredSubtitle}</Label>
                <Input 
                  id="featured-subtitle" 
                  placeholder={content.placeholders.subtitle}
                  defaultValue="Confira nossa seleção de produtos mais vendidos"
                />
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>New Arrivals Section</CardTitle>
              <CardDescription>Editar a seção de novos produtos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="arrivals-title">{content.homepage.newArrivalsTitle}</Label>
                <Input 
                  id="arrivals-title" 
                  placeholder={content.placeholders.title}
                  defaultValue="Novidades"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="arrivals-subtitle">{content.homepage.newArrivalsSubtitle}</Label>
                <Input 
                  id="arrivals-subtitle" 
                  placeholder={content.placeholders.subtitle}
                  defaultValue="Descubra os modelos mais recentes que acabaram de chegar"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Banners Content */}
        <TabsContent value="banners">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Banner Management</CardTitle>
                  <CardDescription>Gerenciar banners promocionais do site</CardDescription>
                </div>
                <div>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    id="banner-image-upload"
                    onChange={handleImageUpload}
                  />
                  <Button asChild>
                    <label htmlFor="banner-image-upload" className="cursor-pointer">
                      <Plus className="mr-2 h-4 w-4" />
                      {content.buttons.addBanner}
                    </label>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {bannerImages.map((image, index) => (
                  <div key={index} className="relative group border rounded-md overflow-hidden">
                    <img 
                      src={image} 
                      alt={`Banner ${index + 1}`} 
                      className="w-full aspect-video object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button variant="outline" size="sm" className="bg-white/80">
                        <Eye className="h-4 w-4 mr-2" />
                        {content.buttons.preview}
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <X className="h-4 w-4 mr-2" />
                        {content.buttons.removeBanner}
                      </Button>
                    </div>
                    
                    <div className="p-3 border-t bg-card">
                      <div className="flex flex-col gap-2">
                        <Input 
                          placeholder={content.placeholders.title}
                          defaultValue={`Banner Promocional ${index + 1}`}
                        />
                        <Input 
                          placeholder={content.placeholders.link}
                          defaultValue="#"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Static Pages Content */}
        <TabsContent value="pages">
          <Card>
            <CardHeader>
              <CardTitle>Static Pages</CardTitle>
              <CardDescription>Editar o conteúdo das páginas estáticas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border rounded-md p-4 hover:bg-muted/50 transition-colors">
                  <div className="font-medium">About Us</div>
                  <div className="text-sm text-muted-foreground">Última edição: 15/10/2023</div>
                </div>
                
                <div className="border rounded-md p-4 hover:bg-muted/50 transition-colors">
                  <div className="font-medium">Contact</div>
                  <div className="text-sm text-muted-foreground">Última edição: 10/10/2023</div>
                </div>
                
                <div className="border rounded-md p-4 hover:bg-muted/50 transition-colors">
                  <div className="font-medium">Shipping Policy</div>
                  <div className="text-sm text-muted-foreground">Última edição: 05/10/2023</div>
                </div>
                
                <div className="border rounded-md p-4 hover:bg-muted/50 transition-colors">
                  <div className="font-medium">Returns Policy</div>
                  <div className="text-sm text-muted-foreground">Última edição: 05/10/2023</div>
                </div>
                
                <div className="border rounded-md p-4 hover:bg-muted/50 transition-colors">
                  <div className="font-medium">Size Guide</div>
                  <div className="text-sm text-muted-foreground">Última edição: 01/10/2023</div>
                </div>
                
                <div className="border rounded-md p-4 hover:bg-muted/50 transition-colors">
                  <div className="font-medium">FAQ</div>
                  <div className="text-sm text-muted-foreground">Última edição: 01/10/2023</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Blog Content */}
        <TabsContent value="blog">
          <Card>
            <CardHeader>
              <CardTitle>Blog Management</CardTitle>
              <CardDescription>Gerenciar artigos do blog</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-8 text-center text-muted-foreground">
                Em construção...
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Contact Content */}
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Editar informações de contato</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contact-email">{content.fields.email}</Label>
                <Input 
                  id="contact-email" 
                  type="email"
                  placeholder={content.placeholders.email}
                  defaultValue="contato@lojasneakers.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contact-phone">{content.fields.phone}</Label>
                <Input 
                  id="contact-phone" 
                  placeholder={content.placeholders.phone}
                  defaultValue="(11) 99999-9999"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contact-address">{content.fields.address}</Label>
                <Textarea 
                  id="contact-address" 
                  placeholder={content.placeholders.address}
                  defaultValue="Rua dos Sapatos, 123 - Bairro Calçados
São Paulo - SP, 01234-567
Brasil"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* SEO Content */}
        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>Configurações de otimização para motores de busca</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="meta-title">{content.fields.title}</Label>
                <Input 
                  id="meta-title" 
                  placeholder={content.placeholders.title}
                  defaultValue="Loja Sneakers - Tênis para Todos os Estilos"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="meta-description">{content.fields.description}</Label>
                <Textarea 
                  id="meta-description" 
                  placeholder={content.placeholders.description}
                  defaultValue="Encontre os melhores tênis de marcas como Nike, Adidas, Puma e mais. Compre online com facilidade e aproveite frete grátis em compras acima de R$ 199."
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="meta-keywords">{content.fields.keywords}</Label>
                <Input 
                  id="meta-keywords" 
                  placeholder={content.placeholders.keywords}
                  defaultValue="tênis, sneakers, calçados, Nike, Adidas, Puma, Jordan, comprar tênis, tênis online"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SiteContent;
