
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Save, Plus, Trash2, Edit, Image } from "lucide-react";

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
      image: '/placeholder.svg',
      url: '/catalogo?sale=summer',
      active: true,
      position: 1
    },
    {
      id: '2',
      title: 'New Collection',
      image: '/placeholder.svg',
      url: '/catalogo?collection=new',
      active: true,
      position: 2
    }
  ]);

  // Edit state
  const [currentPage, setCurrentPage] = useState<PageContent | null>(null);
  const [currentBanner, setCurrentBanner] = useState<Banner | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handle page selection for editing
  const handleEditPage = (page: PageContent) => {
    setCurrentPage({...page});
  };

  // Handle banner selection for editing
  const handleEditBanner = (banner: Banner) => {
    setCurrentBanner({...banner});
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
  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentBanner) return;
    
    const value = e.target.type === 'checkbox' 
      ? (e.target as HTMLInputElement).checked 
      : e.target.value;
      
    setCurrentBanner({
      ...currentBanner,
      [e.target.name]: value
    });
  };

  // Translations based on language
  const getLabels = () => {
    switch(language) {
      case 'pt':
        return {
          title: "Conteúdo do Site",
          pages: "Páginas",
          banners: "Banners",
          editPage: "Editar Página",
          editBanner: "Editar Banner",
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
          save: "Salvar",
          cancel: "Cancelar",
          select: "Selecione uma página para editar",
          selectBanner: "Selecione um banner para editar"
        };
      case 'es':
        return {
          title: "Contenido del Sitio",
          pages: "Páginas",
          banners: "Banners",
          editPage: "Editar Página",
          editBanner: "Editar Banner",
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
          save: "Guardar",
          cancel: "Cancelar",
          select: "Seleccione una página para editar",
          selectBanner: "Seleccione un banner para editar"
        };
      default: // 'en'
        return {
          title: "Site Content",
          pages: "Pages",
          banners: "Banners",
          editPage: "Edit Page",
          editBanner: "Edit Banner",
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
          save: "Save",
          cancel: "Cancel",
          select: "Select a page to edit",
          selectBanner: "Select a banner to edit"
        };
    }
  };
  
  const labels = getLabels();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{labels.title}</h1>
        <p className="text-muted-foreground">
          {t ? t('manageYourSiteContent') : 'Manage your website content, pages, and banners'}
        </p>
      </div>

      <Tabs defaultValue="pages" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pages">{labels.pages}</TabsTrigger>
          <TabsTrigger value="banners">{labels.banners}</TabsTrigger>
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
              <CardHeader>
                <CardTitle>{labels.banners}</CardTitle>
                <CardDescription>
                  {t ? t('manageBannersAndSliders') : 'Manage your banners and sliders'}
                </CardDescription>
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
                      <span>{banner.title}</span>
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
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            name="active"
                            checked={currentBanner.active}
                            onChange={handleBannerChange}
                            className="w-4 h-4"
                          />
                          <span>{labels.bannerActive}</span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="bannerImage">{labels.bannerImage}</label>
                      <div className="border rounded-md p-4">
                        <div className="flex items-center space-x-4">
                          <div className="relative h-32 w-32 overflow-hidden rounded-md border bg-muted">
                            <img
                              src={currentBanner.image}
                              alt={currentBanner.title}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="space-y-2">
                            <Button variant="outline" size="sm">
                              <Image className="mr-2 h-4 w-4" />
                              {t ? t('changeBannerImage') : 'Change Image'}
                            </Button>
                            <p className="text-xs text-muted-foreground">
                              {t ? t('recommendedSize') : 'Recommended size: 1200x400px'}
                            </p>
                          </div>
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
      </Tabs>
    </div>
  );
};

export default SiteContent;
