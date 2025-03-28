
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CatalogGrid from '@/components/CatalogGrid';
import Footer from '@/components/Footer';
import { getProductsByLocation, getFeaturedProducts } from '@/data/products';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { language } = useLanguage();
  const [featuredProducts, setFeaturedProducts] = useState(getFeaturedProducts());
  const [homepageProducts, setHomepageProducts] = useState(getProductsByLocation('homepage'));
  const [siteContent, setSiteContent] = useState<any>({});
  
  // Get translations based on language
  const getContent = () => {
    const defaultContent = {
      title: "Our Collection",
      subtitle: "Discover our premium selection of sneakers from the world's best brands"
    };
    
    // Try to get content from site settings first
    if (siteContent.homepageTitle) {
      return {
        title: siteContent.homepageTitle,
        subtitle: siteContent.homepageSubtitle || defaultContent.subtitle
      };
    }
    
    // Fallback to language-specific content
    switch(language) {
      case 'pt':
        return {
          title: "Nossa Coleção",
          subtitle: "Descubra nossa seleção premium de tênis das melhores marcas do mundo"
        };
      case 'es':
        return {
          title: "Nuestra Colección",
          subtitle: "Descubre nuestra selección premium de zapatillas de las mejores marcas del mundo"
        };
      default: // 'en'
        return defaultContent;
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
        
        <CatalogGrid 
          products={homepageProducts} 
          title={content.title}
          subtitle={content.subtitle}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
