
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CatalogGrid from '@/components/CatalogGrid';
import Footer from '@/components/Footer';
import FloatingSocialButtons from '@/components/FloatingSocialButtons';
import { getProductsByLocation, getFeaturedProducts } from '@/data/products';
import { getProductsByCategory } from '@/pages/admin/inventory/InventoryUtils';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { language } = useLanguage();
  const [featuredProducts, setFeaturedProducts] = useState(getFeaturedProducts());
  const [homepageProducts, setHomepageProducts] = useState(getProductsByLocation('homepage'));
  const [onSaleProducts, setOnSaleProducts] = useState(getProductsByCategory('onSale'));
  const [discountProducts, setDiscountProducts] = useState(getProductsByCategory('discount'));
  const [siteContent, setSiteContent] = useState<any>({});
  
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
      setOnSaleProducts(getProductsByCategory('onSale'));
      setDiscountProducts(getProductsByCategory('discount'));
    };
    
    // Update site content when it changes
    const handleSiteContentUpdate = () => {
      loadSiteContent();
    };
    
    window.addEventListener('productsUpdated', handleProductsUpdate);
    window.addEventListener('siteContentUpdated', handleSiteContentUpdate);
    
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

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        <Hero products={featuredProducts} />
        
        {featuredProducts.length > 0 && (
          <CatalogGrid 
            products={featuredProducts} 
            title={content.featuredTitle}
            subtitle={content.featuredSubtitle}
          />
        )}
        
        {onSaleProducts.length > 0 && (
          <CatalogGrid 
            products={onSaleProducts} 
            title={content.onSaleTitle}
            subtitle={content.onSaleSubtitle}
          />
        )}
        
        {discountProducts.length > 0 && (
          <CatalogGrid 
            products={discountProducts} 
            title={content.discountTitle}
            subtitle={content.discountSubtitle}
          />
        )}
        
        <CatalogGrid 
          products={homepageProducts} 
          title={content.catalogTitle}
          subtitle={content.catalogSubtitle}
        />
      </main>
      
      <Footer />
      
      {/* Botões flutuantes de redes sociais */}
      <FloatingSocialButtons />
    </div>
  );
};

export default Index;
