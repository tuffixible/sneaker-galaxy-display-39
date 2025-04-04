
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Product } from '@/data/products';
import { formatPrice } from '@/pages/admin/inventory/InventoryUtils';
import { Tag } from 'lucide-react';

interface ProductCardProps {
  product: Product & { formattedPrice?: string };
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [storeCurrency, setStoreCurrency] = useState('USD');
  
  // Load currency settings
  useEffect(() => {
    const settings = JSON.parse(localStorage.getItem('storeSettings') || '{}');
    if (settings.currency) {
      setStoreCurrency(settings.currency);
    }
    
    const handleSettingsUpdate = () => {
      const updatedSettings = JSON.parse(localStorage.getItem('storeSettings') || '{}');
      if (updatedSettings.currency) {
        setStoreCurrency(updatedSettings.currency);
      }
    };
    
    window.addEventListener('storeSettingsUpdated', handleSettingsUpdate);
    
    return () => {
      window.removeEventListener('storeSettingsUpdated', handleSettingsUpdate);
    };
  }, []);
  
  // Animation delay based on index for staggered entrance
  const animationDelay = `${index * 0.1}s`;

  // Calculate discounted price if applicable
  const originalPrice = product.price;
  const discount = product.discount || 0;
  const discountedPrice = discount > 0 ? product.price * (1 - discount / 100) : product.price;
  
  // Format prices
  const formattedOriginalPrice = formatPrice(originalPrice, product.currency || storeCurrency);
  const formattedDiscountedPrice = formatPrice(discountedPrice, product.currency || storeCurrency);

  return (
    <Link
      to={`/product/${product.id}`}
      className={cn(
        "group relative block overflow-hidden rounded-2xl bg-white p-2 transition-all duration-300",
        "shadow-sm hover:shadow-md animate-scale-in",
        "border border-border/50 hover:border-border"
      )}
      style={{ animationDelay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-square overflow-hidden rounded-xl bg-secondary/30">
        <div className="h-full w-full relative">
          {/* Show image or video based on mediaType */}
          {product.mediaType === 'video' ? (
            <video
              src={product.images[0]}
              className={cn(
                "h-full w-full object-cover object-center transition-transform duration-500 ease-out-expo",
                isHovered && "scale-110"
              )}
              autoPlay={isHovered}
              loop
              muted
              playsInline
            />
          ) : (
            <img
              src={product.images[0]}
              alt={product.name}
              className={cn(
                "h-full w-full object-cover object-center transition-transform duration-500 ease-out-expo",
                isHovered && "scale-110"
              )}
              loading="lazy"
            />
          )}
          
          <div 
            className={cn(
              "absolute inset-0 bg-gradient-to-b from-transparent to-background/5 opacity-0 transition-opacity duration-300",
              isHovered && "opacity-100"
            )} 
          />
          
          {/* Product Tags with Animation */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {product.featured && (
              <div className={cn(
                "bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1",
                "animate-scale-in transition-all transform hover:scale-110"
              )}>
                <Tag size={12} />
                <span>Destaque</span>
              </div>
            )}
            
            {product.onSale && (
              <div className={cn(
                "bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1",
                "animate-scale-in transition-all transform hover:scale-110",
                "animate-pulse"
              )}>
                <Tag size={12} />
                <span>Promoção</span>
              </div>
            )}
            
            {product.discount && product.discount > 0 && (
              <div className={cn(
                "bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1",
                "animate-scale-in transition-all transform hover:scale-110"
              )}>
                <Tag size={12} />
                <span>{product.discount}% Off</span>
              </div>
            )}
            
            {/* Custom tags */}
            {product.tags && product.tags.map((tag, i) => (
              <div 
                key={i}
                className={cn(
                  "bg-secondary text-foreground px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1",
                  "animate-scale-in transition-all transform hover:scale-110"
                )}
                style={{ animationDelay: `${(i + 1) * 0.1}s` }}
              >
                <Tag size={12} />
                <span>{tag}</span>
              </div>
            ))}
          </div>
          
          {/* Stock status badge */}
          {product.stock !== undefined && product.stock <= 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Out of Stock
            </div>
          )}
          {product.stock !== undefined && product.stock > 0 && product.stock <= (product.lowStockThreshold || 10) && (
            <div className="absolute top-2 right-2 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Low Stock
            </div>
          )}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-base line-clamp-1">{product.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{product.brand}</p>
          </div>
          <div className="text-right">
            {discount > 0 ? (
              <>
                <p className="text-sm font-semibold text-green-600">
                  {formattedDiscountedPrice}
                </p>
                <p className="text-xs text-muted-foreground line-through">
                  {formattedOriginalPrice}
                </p>
              </>
            ) : (
              <p className="text-sm font-semibold">
                {product.formattedPrice || formattedOriginalPrice}
              </p>
            )}
          </div>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-1">
          {product.colors && product.colors.slice(0, 3).map((color, i) => (
            <span 
              key={i} 
              className="inline-block text-xs px-2 py-1 bg-secondary rounded-full"
            >
              {color}
            </span>
          ))}
          {product.colors && product.colors.length > 3 && (
            <span className="inline-block text-xs px-2 py-1 bg-secondary rounded-full">
              +{product.colors.length - 3}
            </span>
          )}
        </div>
      </div>
      
      <div 
        className={cn(
          "absolute bottom-0 left-0 right-0 bg-primary text-primary-foreground text-center py-3 font-medium text-sm translate-y-full transition-transform duration-300 ease-out-expo",
          isHovered && "translate-y-0"
        )}
      >
        View Product
      </div>
    </Link>
  );
};

export default ProductCard;
