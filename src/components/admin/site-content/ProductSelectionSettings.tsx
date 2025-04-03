
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Product } from '@/data/products';

interface ProductSelectionSettingsProps {
  products: Product[];
  content: {
    featuredProducts: string[];
    bannerProducts: string[];
    rotativeProducts: string[];
  };
  handleFeaturedChange: (productId: string, checked: boolean) => void;
  handleBannerChange: (productId: string, checked: boolean) => void;
  handleRotativeChange: (productId: string, checked: boolean) => void;
}

const ProductSelectionSettings: React.FC<ProductSelectionSettingsProps> = ({ 
  products, 
  content, 
  handleFeaturedChange, 
  handleBannerChange, 
  handleRotativeChange 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Selections</CardTitle>
        <CardDescription>Select products to display in various sections of the site</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Featured Products */}
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-medium mb-3">Featured Products</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {products.filter(p => p.active !== false).map(product => (
                <div key={`featured-${product.id}`} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`featured-${product.id}`} 
                    checked={content.featuredProducts.includes(product.id)}
                    onCheckedChange={(checked) => handleFeaturedChange(product.id, !!checked)}
                  />
                  <Label htmlFor={`featured-${product.id}`} className="flex items-center">
                    <img 
                      src={product.images[0]} 
                      alt={product.name} 
                      className="w-8 h-8 rounded object-cover mr-2" 
                    />
                    <span className="truncate">{product.name}</span>
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Banner Products */}
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-medium mb-3">Banner Products</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {products.filter(p => p.active !== false).map(product => (
                <div key={`banner-${product.id}`} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`banner-${product.id}`} 
                    checked={content.bannerProducts.includes(product.id)}
                    onCheckedChange={(checked) => handleBannerChange(product.id, !!checked)}
                  />
                  <Label htmlFor={`banner-${product.id}`} className="flex items-center">
                    <img 
                      src={product.images[0]} 
                      alt={product.name} 
                      className="w-8 h-8 rounded object-cover mr-2" 
                    />
                    <span className="truncate">{product.name}</span>
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Rotative Products */}
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-medium mb-3">Rotative Products</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {products.filter(p => p.active !== false).map(product => (
                <div key={`rotative-${product.id}`} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`rotative-${product.id}`} 
                    checked={content.rotativeProducts.includes(product.id)}
                    onCheckedChange={(checked) => handleRotativeChange(product.id, !!checked)}
                  />
                  <Label htmlFor={`rotative-${product.id}`} className="flex items-center">
                    <img 
                      src={product.images[0]} 
                      alt={product.name} 
                      className="w-8 h-8 rounded object-cover mr-2" 
                    />
                    <span className="truncate">{product.name}</span>
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductSelectionSettings;
