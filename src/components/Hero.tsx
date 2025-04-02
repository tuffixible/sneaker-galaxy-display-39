
import { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Product } from '@/data/products';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

interface HeroProps {
  products: Product[];
}

const Hero = ({ products }: HeroProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const { addToCart } = useCart();

  const handleDotClick = (index: number) => {
    if (index === activeIndex || isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex(index);
    
    // Reset the interval
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      startAutoRotation();
    }
  };

  const startAutoRotation = () => {
    intervalRef.current = window.setInterval(() => {
      setIsAnimating(true);
      setActiveIndex((prev) => (prev + 1) % products.length);
    }, 5000);
  };
  
  const handleAddToCart = (product: Product) => {
    addToCart(product, product.sizes[0], 1);
    toast.success(`${product.name} added to cart!`);
  };

  useEffect(() => {
    startAutoRotation();
    
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [products.length]);

  // Reset animating state after animation completes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 600);
    
    return () => clearTimeout(timer);
  }, [activeIndex]);

  if (!products.length) return null;

  return (
    <section className="relative min-h-[90vh] pt-24 flex items-center overflow-hidden">
      {/* Background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/10 via-background to-background z-0 animate-gradient" />
      
      {/* Animated Circles in Background */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-3xl animate-float-slow" />
        <div className="absolute top-[50%] -left-[10%] w-[30%] h-[30%] rounded-full bg-secondary/10 blur-3xl animate-float-medium" />
        <div className="absolute -bottom-[5%] right-[30%] w-[25%] h-[25%] rounded-full bg-primary/5 blur-3xl animate-float-fast" />
      </div>

      <div className="container max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-8 px-6 md:px-8 relative z-10">
        <div className="flex flex-col justify-center pt-12 md:pt-0 order-2 md:order-1">
          {/* Store Name with Animation */}
          <div className="mb-8">
            <h2 className="text-xl font-medium text-primary animate-fade-in opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              Xible Shoes
            </h2>
          </div>
          
          <div className="space-y-6">
            {products.map((product, index) => (
              <div
                key={product.id}
                className={cn(
                  "transition-all duration-700 ease-out-expo absolute",
                  index === activeIndex 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-8 pointer-events-none"
                )}
              >
                <div className="inline-block mb-2 py-1 px-3 bg-primary/10 rounded-full">
                  <span className="text-xs font-medium text-primary">{product.brand}</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-balance animate-fade-up">
                  {product.name}
                </h1>
                <p className="mt-4 text-muted-foreground max-w-md text-pretty animate-fade-up" 
                   style={{ animationDelay: '0.1s' }}>
                  {product.description.split('.')[0]}.
                </p>
                <div className="mt-8 flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: '0.2s' }}>
                  <Link
                    to={`/product/${product.id}`}
                    className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background font-medium rounded-full transition-all hover:bg-foreground/90 hover:scale-105 group"
                  >
                    {t('viewDetails')}
                    <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Button
                    onClick={() => handleAddToCart(product)}
                    className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-full transition-all hover:bg-primary/90 hover:scale-105 group"
                  >
                    {t('addToCart') || 'Add to Cart'}
                    <ArrowUpRight size={16} className="ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Button>
                  <Link
                    to="/catalogo"
                    className="inline-flex items-center justify-center px-6 py-3 bg-secondary text-foreground font-medium rounded-full transition-all hover:bg-secondary/80 hover:scale-105 group"
                  >
                    {t('browseCatalog')}
                    <ArrowUpRight size={16} className="ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          {/* Dots */}
          <div className="flex space-x-2 mt-12 animate-fade-in opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-500",
                  index === activeIndex 
                    ? "bg-primary w-8" 
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        <div className="relative order-1 md:order-2 flex items-center justify-center">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={cn(
                "w-full h-full absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out-expo",
                index === activeIndex 
                  ? "opacity-100 scale-100" 
                  : "opacity-0 scale-90 pointer-events-none"
              )}
            >
              <div className="relative">
                {/* Product Tag */}
                <div className="absolute top-0 right-0 z-20 transform translate-x-1/4 -translate-y-1/4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium shadow-lg animate-bounce-slow">
                  {product.onSale ? 'SALE' : 'NEW'}
                </div>
                
                {/* Background circle */}
                <div className="absolute inset-0 rounded-full bg-secondary/50 transform scale-90 blur-2xl animate-pulse-slow" />
                
                {/* Product image */}
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="relative z-10 w-full h-auto max-w-md mx-auto object-contain transform -rotate-12 hover:rotate-0 transition-transform duration-500 ease-out-expo"
                  style={{ 
                    maxHeight: isMobile ? '40vh' : '70vh',
                    width: isMobile ? '125%' : '125%',  // Increased logo size by 25%
                    filter: 'drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.15))'
                  }}
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
