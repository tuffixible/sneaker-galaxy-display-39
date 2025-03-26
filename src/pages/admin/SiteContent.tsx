
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, Trash2, Upload, Save, Eye, Link as LinkIcon } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Sample banner data
const INITIAL_BANNERS = [
  { id: 1, title: "Summer Sale", subtitle: "Up to 50% off", buttonText: "Shop Now", buttonLink: "/catalogo", image: "/placeholder.svg", active: true, position: "home_top" },
  { id: 2, title: "New Arrivals", subtitle: "Check out our latest products", buttonText: "Discover", buttonLink: "/catalogo", image: "/placeholder.svg", active: true, position: "home_middle" },
];

// Sample page data
const INITIAL_PAGES = [
  { id: 1, title: "About Us", slug: "about", content: "Lorem ipsum dolor sit amet...", metaTitle: "About Our Store", metaDescription: "Learn more about our store and our mission.", published: true },
  { id: 2, title: "Shipping Policy", slug: "shipping", content: "Our shipping policy details...", metaTitle: "Shipping Policy", metaDescription: "Information about our shipping methods and times.", published: true },
];

const SiteContent = () => {
  const [banners, setBanners] = useState(INITIAL_BANNERS);
  const [pages, setPages] = useState(INITIAL_PAGES);
  const [activeBanner, setActiveBanner] = useState<any>(null);
  const [activePage, setActivePage] = useState<any>(null);
  const [seoSettings, setSeoSettings] = useState({
    siteTitle: "Xible Store",
    siteDescription: "Premium products for every need",
    ogImage: "/logo.svg",
    twitterHandle: "@xiblestore",
    googleAnalyticsId: "UA-XXXXXXXXX",
    enableSitemap: true,
    enableRobotsTxt: true
  });

  // Banner management functions
  const handleBannerSelect = (banner: any) => {
    setActiveBanner({...banner});
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setActiveBanner(prev => ({...prev, [name]: value}));
  };

  const handleBannerSwitchChange = (checked: boolean) => {
    setActiveBanner(prev => ({...prev, active: checked}));
  };

  const handleBannerPositionChange = (value: string) => {
    setActiveBanner(prev => ({...prev, position: value}));
  };

  const handleSaveBanner = () => {
    if (!activeBanner.title || !activeBanner.buttonText) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (activeBanner.id) {
      // Update existing banner
      setBanners(banners.map(b => b.id === activeBanner.id ? activeBanner : b));
      toast({
        title: "Banner Updated",
        description: "Your banner has been updated successfully"
      });
    } else {
      // Add new banner
      const newBanner = {
        ...activeBanner,
        id: Math.max(0, ...banners.map(b => b.id)) + 1
      };
      setBanners([...banners, newBanner]);
      toast({
        title: "Banner Created",
        description: "Your new banner has been created successfully"
      });
    }
    setActiveBanner(null);
  };

  const handleDeleteBanner = (id: number) => {
    setBanners(banners.filter(b => b.id !== id));
    if (activeBanner?.id === id) {
      setActiveBanner(null);
    }
    toast({
      title: "Banner Deleted",
      description: "The banner has been deleted successfully"
    });
  };

  // Page management functions
  const handlePageSelect = (page: any) => {
    setActivePage({...page});
  };

  const handlePageChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setActivePage(prev => ({...prev, [name]: value}));
  };

  const handlePageSwitchChange = (checked: boolean) => {
    setActivePage(prev => ({...prev, published: checked}));
  };

  const handleSavePage = () => {
    if (!activePage.title || !activePage.slug || !activePage.content) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (activePage.id) {
      // Update existing page
      setPages(pages.map(p => p.id === activePage.id ? activePage : p));
      toast({
        title: "Page Updated",
        description: "Your page has been updated successfully"
      });
    } else {
      // Add new page
      const newPage = {
        ...activePage,
        id: Math.max(0, ...pages.map(p => p.id)) + 1
      };
      setPages([...pages, newPage]);
      toast({
        title: "Page Created",
        description: "Your new page has been created successfully"
      });
    }
    setActivePage(null);
  };

  const handleDeletePage = (id: number) => {
    setPages(pages.filter(p => p.id !== id));
    if (activePage?.id === id) {
      setActivePage(null);
    }
    toast({
      title: "Page Deleted",
      description: "The page has been deleted successfully"
    });
  };

  // SEO settings functions
  const handleSEOChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSeoSettings(prev => ({...prev, [name]: value}));
  };

  const handleSEOSwitchChange = (name: string, checked: boolean) => {
    setSeoSettings(prev => ({...prev, [name]: checked}));
  };

  const handleSaveSEO = () => {
    toast({
      title: "SEO Settings Saved",
      description: "Your SEO settings have been updated successfully"
    });
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col space-y-6">
        <h1 className="text-2xl font-bold">Site Content Management</h1>
        <p className="text-muted-foreground">Manage your store's banners, pages, and SEO settings in one place.</p>

        <Tabs defaultValue="banners" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="banners">Banners</TabsTrigger>
            <TabsTrigger value="pages">Pages</TabsTrigger>
            <TabsTrigger value="seo">SEO Settings</TabsTrigger>
          </TabsList>

          {/* Banners Tab */}
          <TabsContent value="banners" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-1 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>All Banners</CardTitle>
                    <CardDescription>Manage your promotional banners</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {banners.map(banner => (
                      <div 
                        key={banner.id}
                        className={`p-2 rounded-md cursor-pointer flex justify-between items-center ${activeBanner?.id === banner.id ? 'bg-secondary' : 'hover:bg-accent'}`}
                        onClick={() => handleBannerSelect(banner)}
                      >
                        <div>
                          <p className="font-medium">{banner.title}</p>
                          <p className="text-xs text-muted-foreground">{banner.position}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${banner.active ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                          <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); handleDeleteBanner(banner.id); }}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => setActiveBanner({ title: '', subtitle: '', buttonText: '', buttonLink: '', image: '/placeholder.svg', active: true, position: 'home_top' })}
                    >
                      <PlusCircle className="h-4 w-4 mr-2" /> Add New Banner
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <div className="md:col-span-3">
                {activeBanner ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>{activeBanner.id ? `Edit Banner: ${activeBanner.title}` : 'Create New Banner'}</CardTitle>
                      <CardDescription>Configure your banner details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="title">Banner Title*</Label>
                          <Input id="title" name="title" value={activeBanner.title} onChange={handleBannerChange} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subtitle">Subtitle</Label>
                          <Input id="subtitle" name="subtitle" value={activeBanner.subtitle} onChange={handleBannerChange} />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="buttonText">Button Text*</Label>
                          <Input id="buttonText" name="buttonText" value={activeBanner.buttonText} onChange={handleBannerChange} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="buttonLink">Button Link*</Label>
                          <Input id="buttonLink" name="buttonLink" value={activeBanner.buttonLink} onChange={handleBannerChange} />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Banner Image</Label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="col-span-1">
                            <div className="border rounded-md overflow-hidden">
                              <img 
                                src={activeBanner.image || '/placeholder.svg'} 
                                alt="Banner Preview" 
                                className="w-full h-32 object-cover"
                              />
                            </div>
                          </div>
                          <div className="col-span-2 flex items-center">
                            <Button variant="outline" className="w-full">
                              <Upload className="h-4 w-4 mr-2" /> Upload New Image
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="position">Banner Position</Label>
                          <Select value={activeBanner.position} onValueChange={handleBannerPositionChange}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select position" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="home_top">Home Top</SelectItem>
                              <SelectItem value="home_middle">Home Middle</SelectItem>
                              <SelectItem value="home_bottom">Home Bottom</SelectItem>
                              <SelectItem value="catalog_top">Catalog Top</SelectItem>
                              <SelectItem value="popup">Popup</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Status</Label>
                          <div className="flex items-center space-x-2 pt-2">
                            <Switch 
                              checked={activeBanner.active} 
                              onCheckedChange={handleBannerSwitchChange}
                            />
                            <span>{activeBanner.active ? 'Active' : 'Inactive'}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={() => setActiveBanner(null)}>Cancel</Button>
                      <Button onClick={handleSaveBanner}>
                        <Save className="h-4 w-4 mr-2" /> Save Banner
                      </Button>
                    </CardFooter>
                  </Card>
                ) : (
                  <div className="flex h-full items-center justify-center rounded-lg border border-dashed p-12">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold">No Banner Selected</h3>
                      <p className="text-muted-foreground mt-2">Select a banner to edit or create a new one</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Pages Tab */}
          <TabsContent value="pages" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-1 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>All Pages</CardTitle>
                    <CardDescription>Manage your static pages</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {pages.map(page => (
                      <div 
                        key={page.id}
                        className={`p-2 rounded-md cursor-pointer flex justify-between items-center ${activePage?.id === page.id ? 'bg-secondary' : 'hover:bg-accent'}`}
                        onClick={() => handlePageSelect(page)}
                      >
                        <div>
                          <p className="font-medium">{page.title}</p>
                          <p className="text-xs text-muted-foreground">/page/{page.slug}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${page.published ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                          <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); handleDeletePage(page.id); }}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => setActivePage({ title: '', slug: '', content: '', metaTitle: '', metaDescription: '', published: true })}
                    >
                      <PlusCircle className="h-4 w-4 mr-2" /> Add New Page
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <div className="md:col-span-3">
                {activePage ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>{activePage.id ? `Edit Page: ${activePage.title}` : 'Create New Page'}</CardTitle>
                      <CardDescription>Configure your page details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="title">Page Title*</Label>
                          <Input id="title" name="title" value={activePage.title} onChange={handlePageChange} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="slug">URL Slug*</Label>
                          <div className="flex">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                              /page/
                            </span>
                            <Input id="slug" name="slug" value={activePage.slug} onChange={handlePageChange} className="rounded-l-none" />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="content">Page Content*</Label>
                        <Textarea 
                          id="content" 
                          name="content" 
                          value={activePage.content} 
                          onChange={handlePageChange} 
                          className="min-h-[200px]" 
                        />
                      </div>

                      <Separator className="my-4" />

                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">SEO Settings</h3>
                        <div className="grid grid-cols-1 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="metaTitle">Meta Title</Label>
                            <Input id="metaTitle" name="metaTitle" value={activePage.metaTitle} onChange={handlePageChange} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="metaDescription">Meta Description</Label>
                            <Textarea id="metaDescription" name="metaDescription" value={activePage.metaDescription} onChange={handlePageChange} />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Page Status</Label>
                        <div className="flex items-center space-x-2">
                          <Switch 
                            checked={activePage.published} 
                            onCheckedChange={handlePageSwitchChange}
                          />
                          <span>{activePage.published ? 'Published' : 'Draft'}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={() => setActivePage(null)}>Cancel</Button>
                      <div className="flex gap-2">
                        <Button variant="outline">
                          <Eye className="h-4 w-4 mr-2" /> Preview
                        </Button>
                        <Button onClick={handleSavePage}>
                          <Save className="h-4 w-4 mr-2" /> Save Page
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ) : (
                  <div className="flex h-full items-center justify-center rounded-lg border border-dashed p-12">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold">No Page Selected</h3>
                      <p className="text-muted-foreground mt-2">Select a page to edit or create a new one</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* SEO Settings Tab */}
          <TabsContent value="seo" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>SEO Settings</CardTitle>
                <CardDescription>Configure global SEO settings for your store</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="siteTitle">Site Title</Label>
                      <Input id="siteTitle" name="siteTitle" value={seoSettings.siteTitle} onChange={handleSEOChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="siteDescription">Site Description</Label>
                      <Textarea id="siteDescription" name="siteDescription" value={seoSettings.siteDescription} onChange={handleSEOChange} />
                    </div>
                    <div className="space-y-2">
                      <Label>Social Media Image</Label>
                      <div className="flex items-center gap-4">
                        <div className="border rounded-md overflow-hidden w-24 h-24">
                          <img 
                            src={seoSettings.ogImage} 
                            alt="OG Image" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <Button variant="outline">
                          <Upload className="h-4 w-4 mr-2" /> Upload Image
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Recommended size: 1200 x 630 pixels</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="twitterHandle">Twitter Handle</Label>
                      <Input id="twitterHandle" name="twitterHandle" value={seoSettings.twitterHandle} onChange={handleSEOChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="googleAnalyticsId">Google Analytics ID</Label>
                      <Input id="googleAnalyticsId" name="googleAnalyticsId" value={seoSettings.googleAnalyticsId} onChange={handleSEOChange} />
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>XML Sitemap</Label>
                          <p className="text-xs text-muted-foreground">Automatically generate a sitemap for search engines</p>
                        </div>
                        <Switch 
                          checked={seoSettings.enableSitemap} 
                          onCheckedChange={(checked) => handleSEOSwitchChange('enableSitemap', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Robots.txt</Label>
                          <p className="text-xs text-muted-foreground">Generate a robots.txt file for search engines</p>
                        </div>
                        <Switch 
                          checked={seoSettings.enableRobotsTxt} 
                          onCheckedChange={(checked) => handleSEOSwitchChange('enableRobotsTxt', checked)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-4">
                  <Label>Structured Data</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 border p-4 rounded-md">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Organization Schema</h4>
                          <p className="text-xs text-muted-foreground">Information about your business</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                    <div className="space-y-2 border p-4 rounded-md">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Product Schema</h4>
                          <p className="text-xs text-muted-foreground">Rich results for product pages</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                    <div className="space-y-2 border p-4 rounded-md">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Breadcrumbs Schema</h4>
                          <p className="text-xs text-muted-foreground">Navigation path in search results</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                    <div className="space-y-2 border p-4 rounded-md">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">FAQ Schema</h4>
                          <p className="text-xs text-muted-foreground">Frequently asked questions markup</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto" onClick={handleSaveSEO}>
                  <Save className="h-4 w-4 mr-2" /> Save SEO Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SiteContent;
