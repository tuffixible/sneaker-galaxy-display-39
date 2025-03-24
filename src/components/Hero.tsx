
import { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Product } from '@/data/products';

interface HeroProps {
  products: Product[];
}

const Hero = ({ products }: HeroProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<number | null>(null);

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
    <section className="relative min-h-screen pt-24 flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 to-background z-0" />

      <div className="container max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-8 px-6 md:px-8 relative z-10">
        <div className="flex flex-col justify-center pt-12 md:pt-0 order-2 md:order-1">
          <div className="space-y-6">
            {products.map((product, index) => (
              <div
                key={product.id}
                className={cn(
                  "transition-all duration-500 ease-out-expo absolute",
                  index === activeIndex 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-8 pointer-events-none"
                )}
              >
                <div className="inline-block mb-2 py-1 px-3 bg-primary/10 rounded-full">
                  <span className="text-xs font-medium text-primary">{product.brand}</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-balance">
                  {product.name}
                </h1>
                <p className="mt-4 text-muted-foreground max-w-md text-pretty">
                  {product.description.split('.')[0]}.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    to={`/product/${product.id}`}
                    className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background font-medium rounded-full transition-all hover:bg-foreground/90"
                  >
                    View details
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                  <Link
                    to="/catalog"
                    className="inline-flex items-center justify-center px-6 py-3 bg-secondary text-foreground font-medium rounded-full transition-all hover:bg-secondary/80"
                  >
                    Browse catalog
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          {/* Dots */}
          <div className="flex space-x-2 mt-12">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
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
                "w-full h-full absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out-expo",
                index === activeIndex 
                  ? "opacity-100 scale-100" 
                  : "opacity-0 scale-90 pointer-events-none"
              )}
            >
              <div className="relative">
                {/* Background circle */}
                <div className="absolute inset-0 rounded-full bg-secondary/80 transform scale-90 blur-2xl" />
                
                {/* Product image */}
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="relative z-10 w-full h-auto max-w-md mx-auto object-contain transform -rotate-12 hover:rotate-0 transition-transform duration-500 ease-out-expo"
                  style={{ maxHeight: '70vh' }}
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
