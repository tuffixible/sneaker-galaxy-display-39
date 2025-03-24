
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CatalogGrid from '@/components/CatalogGrid';
import Footer from '@/components/Footer';
import { products, getFeaturedProducts } from '@/data/products';

const Index = () => {
  const featuredProducts = getFeaturedProducts();
  
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
          products={products.slice(0, 8)} 
          title="Our Collection"
          subtitle="Discover our premium selection of sneakers from the world's best brands"
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
