
import { useRef, useEffect, useState } from 'react';
import { Product } from '@/data/products';
import ProductCard from './ProductCard';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/pages/admin/inventory/InventoryUtils';

interface CatalogGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
}

const CatalogGrid = ({ products, title, subtitle }: CatalogGridProps) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Get store currency setting
  const [storeCurrency, setStoreCurrency] = useState('USD');
  
  useEffect(() => {
    // Load currency from store settings
    const loadSettings = () => {
      const settings = JSON.parse(localStorage.getItem('storeSettings') || '{}');
      if (settings.currency) {
        setStoreCurrency(settings.currency);
      }
    };
    
    loadSettings();
    
    // Listen for settings updates
    const handleSettingsUpdate = () => {
      loadSettings();
    };
    
    window.addEventListener('storeSettingsUpdated', handleSettingsUpdate);
    
    return () => {
      window.removeEventListener('storeSettingsUpdated', handleSettingsUpdate);
    };
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    observer.observe(gridRef.current);
    
    return () => {
      observer.disconnect();
    };
  }, []);

  // Apply current site content settings to the display
  useEffect(() => {
    const siteContent = JSON.parse(localStorage.getItem('siteContent') || '{}');
    const contentTitle = document.getElementById('catalog-title');
    const contentSubtitle = document.getElementById('catalog-subtitle');
    
    if (contentTitle && !title && siteContent.homepageTitle) {
      contentTitle.textContent = siteContent.homepageTitle;
    }
    
    if (contentSubtitle && !subtitle && siteContent.homepageSubtitle) {
      contentSubtitle.textContent = siteContent.homepageSubtitle;
    }
  }, [title, subtitle]);

  return (
    <section className="py-16 px-6 md:px-8">
      <div className="container max-w-7xl mx-auto">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 id="catalog-title" className="text-3xl md:text-4xl font-bold">{title}</h2>
            )}
            {subtitle && (
              <p id="catalog-subtitle" className="mt-3 text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
            )}
          </div>
        )}
        
        <div 
          ref={gridRef}
          className={cn(
            "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
            !isVisible && "opacity-0"
          )}
        >
          {products.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={{
                ...product,
                // Ensure currency formatting is consistent
                formattedPrice: formatPrice(product.price, product.currency || storeCurrency)
              }} 
              index={index} 
            />
          ))}
        </div>
        
        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CatalogGrid;
