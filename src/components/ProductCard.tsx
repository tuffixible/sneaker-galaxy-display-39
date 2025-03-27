
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Product } from '@/data/products';
import { formatPrice } from '@/pages/admin/inventory/InventoryUtils';

interface ProductCardProps {
  product: Product & { formattedPrice?: string };
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Animation delay based on index for staggered entrance
  const animationDelay = `${index * 0.1}s`;

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
          <div 
            className={cn(
              "absolute inset-0 bg-gradient-to-b from-transparent to-background/5 opacity-0 transition-opacity duration-300",
              isHovered && "opacity-100"
            )} 
          />
          <img
            src={product.images[0]}
            alt={product.name}
            className={cn(
              "h-full w-full object-cover object-center transition-transform duration-500 ease-out-expo",
              isHovered && "scale-110"
            )}
            loading="lazy"
          />
          
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
          <p className="text-sm font-semibold">
            {product.formattedPrice || formatPrice(product.price, product.currency)}
          </p>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-1">
          {product.colors.slice(0, 3).map((color, i) => (
            <span 
              key={i} 
              className="inline-block text-xs px-2 py-1 bg-secondary rounded-full"
            >
              {color}
            </span>
          ))}
          {product.colors.length > 3 && (
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
