
import { useRef, useEffect, useState } from 'react';
import { Product } from '@/data/products';
import ProductCard from './ProductCard';
import { cn } from '@/lib/utils';

interface CatalogGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
}

const CatalogGrid = ({ products, title, subtitle }: CatalogGridProps) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <section className="py-16 px-6 md:px-8">
      <div className="container max-w-7xl mx-auto">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
            )}
            {subtitle && (
              <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
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
            <ProductCard key={product.id} product={product} index={index} />
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
