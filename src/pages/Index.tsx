
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CatalogGrid from '@/components/CatalogGrid';
import Footer from '@/components/Footer';
import { getProductsByLocation, getFeaturedProducts } from '@/data/products';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { language } = useLanguage();
  const featuredProducts = getFeaturedProducts();
  const homepageProducts = getProductsByLocation('homepage');
  
  // Get translations based on language
  const getContent = () => {
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
        return {
          title: "Our Collection",
          subtitle: "Discover our premium selection of sneakers from the world's best brands"
        };
    }
  };
  
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
