
import { useEffect, useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CatalogGrid from '@/components/CatalogGrid';
import Footer from '@/components/Footer';
import FloatingSocialButtons from '@/components/FloatingSocialButtons';
import { getProductsByLocation, getFeaturedProducts } from '@/data/products';
import { getProductsByCategory } from '@/pages/admin/inventory/InventoryUtils';
import { useLanguage } from '@/contexts/LanguageContext';
import { Product } from '@/data/products';
import { useAuth } from '@/contexts/AuthContext';
import { useInView } from '@/lib/animations';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const { language } = useLanguage();
  const { isAuthenticated, isAdmin } = useAuth();
  const { toast } = useToast();
  const [featuredProducts, setFeaturedProducts] = useState(getFeaturedProducts());
  const [homepageProducts, setHomepageProducts] = useState(getProductsByLocation('homepage'));
  const [onSaleProducts, setOnSaleProducts] = useState<Product[]>([]);
  const [discountProducts, setDiscountProducts] = useState<Product[]>([]);
  const [siteContent, setSiteContent] = useState<any>({});
  const [isEditing, setIsEditing] = useState(false);
  
  // Refs for scroll animations
  const featuredRef = useRef<HTMLDivElement>(null);
  const onSaleRef = useRef<HTMLDivElement>(null);
  const discountRef = useRef<HTMLDivElement>(null);
  const catalogRef = useRef<HTMLDivElement>(null);
  
  const featuredInView = useInView(featuredRef, { threshold: 0.2 });
  const onSaleInView = useInView(onSaleRef, { threshold: 0.2 });
  const discountInView = useInView(discountRef, { threshold: 0.2 });
  const catalogInView = useInView(catalogRef, { threshold: 0.2 });
  
  // Get translations based on language
  const getContent = () => {
    const defaultContent = {
      featuredTitle: "Produtos em Destaque",
      featuredSubtitle: "Conheça nossa seleção de produtos em destaque",
      onSaleTitle: "Promoções",
      onSaleSubtitle: "Aproveite nossas promoções por tempo limitado",
      discountTitle: "Produtos com Desconto",
      discountSubtitle: "Economize com nossos produtos com desconto especial",
      catalogTitle: "Nossa Coleção",
      catalogSubtitle: "Descubra nossa seleção premium de tênis das melhores marcas do mundo"
    };
    
    // Try to get content from site settings first
    if (siteContent.homepageTitle) {
      return {
        featuredTitle: siteContent.featuredTitle || defaultContent.featuredTitle,
        featuredSubtitle: siteContent.featuredSubtitle || defaultContent.featuredSubtitle,
        onSaleTitle: siteContent.onSaleTitle || defaultContent.onSaleTitle,
        onSaleSubtitle: siteContent.onSaleSubtitle || defaultContent.onSaleSubtitle,
        discountTitle: siteContent.discountTitle || defaultContent.discountTitle,
        discountSubtitle: siteContent.discountSubtitle || defaultContent.discountSubtitle,
        catalogTitle: siteContent.homepageTitle || defaultContent.catalogTitle,
        catalogSubtitle: siteContent.homepageSubtitle || defaultContent.catalogSubtitle
      };
    }
    
    // Fallback to language-specific content
    switch(language) {
      case 'pt':
        return defaultContent;
      case 'es':
        return {
          featuredTitle: "Productos Destacados",
          featuredSubtitle: "Conoce nuestra selección de productos destacados",
          onSaleTitle: "Promociones",
          onSaleSubtitle: "Aprovecha nuestras promociones por tiempo limitado",
          discountTitle: "Productos con Descuento",
          discountSubtitle: "Ahorra con nuestros productos con descuento especial",
          catalogTitle: "Nuestra Colección",
          catalogSubtitle: "Descubre nuestra selección premium de zapatillas de las mejores marcas del mundo"
        };
      default: // 'en'
        return {
          featuredTitle: "Featured Products",
          featuredSubtitle: "Discover our selection of featured products",
          onSaleTitle: "On Sale",
          onSaleSubtitle: "Take advantage of our limited-time promotions",
          discountTitle: "Discounted Products",
          discountSubtitle: "Save with our specially discounted products",
          catalogTitle: "Our Collection",
          catalogSubtitle: "Discover our premium selection of sneakers from the world's best brands"
        };
    }
  };
  
  // Save content changes when in edit mode
  const handleContentSave = (section: string, newTitle: string, newSubtitle: string) => {
    const updatedContent = {
      ...siteContent,
      [`${section}Title`]: newTitle,
      [`${section}Subtitle`]: newSubtitle,
    };
    
    // Save to localStorage
    localStorage.setItem('siteContent', JSON.stringify(updatedContent));
    setSiteContent(updatedContent);
    
    // Dispatch event for other components
    window.dispatchEvent(new Event('siteContentUpdated'));
    
    toast({
      title: "Conteúdo atualizado",
      description: "As alterações foram salvas com sucesso",
    });
  };
  
  // Toggle edit mode
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
    
    if (!isEditing) {
      toast({
        title: "Modo de edição ativado",
        description: "Clique nos textos para editá-los",
      });
    }
  };
  
  // Load site content from localStorage
  useEffect(() => {
    const loadSiteContent = () => {
      const content = JSON.parse(localStorage.getItem('siteContent') || '{}');
      setSiteContent(content);
    };
    
    loadSiteContent();
    
    // Update products when they change
    const handleProductsUpdate = () => {
      setFeaturedProducts(getFeaturedProducts());
      setHomepageProducts(getProductsByLocation('homepage'));
      
      // Fix type compatibility by ensuring all required fields are present
      const onSale = getProductsByCategory('onSale').map(item => ({
        ...item,
        price: item.price || 0,
        colors: item.colors || [],
        sizes: item.sizes || [],
        images: item.images || [],
        description: item.description || '',
      })) as Product[];
      
      const discount = getProductsByCategory('discount').map(item => ({
        ...item,
        price: item.price || 0,
        colors: item.colors || [],
        sizes: item.sizes || [],
        images: item.images || [],
        description: item.description || '',
      })) as Product[];
      
      setOnSaleProducts(onSale);
      setDiscountProducts(discount);
    };
    
    // Update site content when it changes
    const handleSiteContentUpdate = () => {
      loadSiteContent();
    };
    
    window.addEventListener('productsUpdated', handleProductsUpdate);
    window.addEventListener('siteContentUpdated', handleSiteContentUpdate);
    
    // Initial load of category products
    handleProductsUpdate();
    
    return () => {
      window.removeEventListener('productsUpdated', handleProductsUpdate);
      window.removeEventListener('siteContentUpdated', handleSiteContentUpdate);
    };
  }, []);
  
  const content = getContent();
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // EditableSection component for admin editing
  const EditableSection = ({ id, title, subtitle, onSave }: { 
    id: string, 
    title: string, 
    subtitle: string,
    onSave: (title: string, subtitle: string) => void 
  }) => {
    const [editingTitle, setEditingTitle] = useState(title);
    const [editingSubtitle, setEditingSubtitle] = useState(subtitle);
    const [isEditingThis, setIsEditingThis] = useState(false);
    
    const handleClick = () => {
      if (isEditing && !isEditingThis) {
        setIsEditingThis(true);
        setEditingTitle(title);
        setEditingSubtitle(subtitle);
      }
    };
    
    const handleSave = () => {
      onSave(editingTitle, editingSubtitle);
      setIsEditingThis(false);
    };
    
    return (
      <div className={`text-center max-w-3xl mx-auto mb-12 ${isEditingThis ? 'border-2 border-dashed border-primary p-4 rounded-lg' : ''}`} onClick={handleClick}>
        {isEditingThis ? (
          <>
            <input 
              type="text" 
              value={editingTitle} 
              onChange={(e) => setEditingTitle(e.target.value)} 
              className="text-3xl md:text-4xl font-bold mb-2 w-full text-center border-b border-primary bg-transparent focus:outline-none"
            />
            <textarea 
              value={editingSubtitle} 
              onChange={(e) => setEditingSubtitle(e.target.value)}
              className="text-muted-foreground w-full text-center bg-transparent focus:outline-none resize-none"
              rows={2}
            />
            <div className="mt-4 flex justify-center gap-2">
              <Button size="sm" onClick={handleSave}>Salvar</Button>
              <Button size="sm" variant="outline" onClick={() => setIsEditingThis(false)}>Cancelar</Button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">{title}</h2>
            <p className="text-muted-foreground">{subtitle}</p>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        <Hero products={featuredProducts} />
        
        {/* Admin Edit Toggle */}
        {isAdmin && isAuthenticated && (
          <div className="fixed top-24 right-6 z-40">
            <Button 
              onClick={toggleEditMode} 
              size="sm" 
              className={`${isEditing ? 'bg-primary' : 'bg-muted'} transition-colors`}
            >
              <Pencil className="h-4 w-4 mr-2" />
              {isEditing ? 'Editing Mode: ON' : 'Edit Content'}
            </Button>
          </div>
        )}
        
        {/* Featured Products Section */}
        {featuredProducts.length > 0 && (
          <section 
            ref={featuredRef} 
            className={`py-16 px-4 transition-opacity duration-1000 ${featuredInView ? 'opacity-100' : 'opacity-0'}`}
          >
            {isAdmin && isEditing ? (
              <EditableSection 
                id="featured"
                title={content.featuredTitle}
                subtitle={content.featuredSubtitle}
                onSave={(title, subtitle) => handleContentSave('featured', title, subtitle)}
              />
            ) : (
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-2">{content.featuredTitle}</h2>
                <p className="text-muted-foreground">{content.featuredSubtitle}</p>
              </div>
            )}
            
            <CatalogGrid products={featuredProducts} />
          </section>
        )}
        
        {/* On Sale Products Section */}
        {onSaleProducts.length > 0 && (
          <section 
            ref={onSaleRef} 
            className={`py-16 px-4 bg-muted/50 transition-opacity duration-1000 ${onSaleInView ? 'opacity-100' : 'opacity-0'}`}
          >
            {isAdmin && isEditing ? (
              <EditableSection 
                id="onSale"
                title={content.onSaleTitle}
                subtitle={content.onSaleSubtitle}
                onSave={(title, subtitle) => handleContentSave('onSale', title, subtitle)}
              />
            ) : (
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-2">{content.onSaleTitle}</h2>
                <p className="text-muted-foreground">{content.onSaleSubtitle}</p>
              </div>
            )}
            
            <CatalogGrid products={onSaleProducts} />
          </section>
        )}
        
        {/* Discount Products Section */}
        {discountProducts.length > 0 && (
          <section 
            ref={discountRef} 
            className={`py-16 px-4 transition-opacity duration-1000 ${discountInView ? 'opacity-100' : 'opacity-0'}`}
          >
            {isAdmin && isEditing ? (
              <EditableSection 
                id="discount"
                title={content.discountTitle}
                subtitle={content.discountSubtitle}
                onSave={(title, subtitle) => handleContentSave('discount', title, subtitle)}
              />
            ) : (
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-2">{content.discountTitle}</h2>
                <p className="text-muted-foreground">{content.discountSubtitle}</p>
              </div>
            )}
            
            <CatalogGrid products={discountProducts} />
          </section>
        )}
        
        {/* Regular Catalog Section */}
        <section 
          ref={catalogRef} 
          className={`py-16 px-4 bg-muted/30 transition-opacity duration-1000 ${catalogInView ? 'opacity-100' : 'opacity-0'}`}
        >
          {isAdmin && isEditing ? (
            <EditableSection 
              id="homepage"
              title={content.catalogTitle}
              subtitle={content.catalogSubtitle}
              onSave={(title, subtitle) => handleContentSave('homepage', title, subtitle)}
            />
          ) : (
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">{content.catalogTitle}</h2>
              <p className="text-muted-foreground">{content.catalogSubtitle}</p>
            </div>
          )}
          
          <CatalogGrid products={homepageProducts} />
        </section>
      </main>
      
      <Footer />
      
      {/* Botões flutuantes de redes sociais */}
      <FloatingSocialButtons />
    </div>
  );
};

export default Index;
