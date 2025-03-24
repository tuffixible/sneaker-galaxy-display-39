
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CatalogGrid from '@/components/CatalogGrid';
import { Separator } from '@/components/ui/separator';
import { products, Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';

const brands = Array.from(new Set(products.map(product => product.brand)));
const sizes = Array.from(new Set(products.flatMap(product => product.sizes))).sort((a, b) => a - b);
const priceRanges = [
  { min: 0, max: 50, label: 'Under $50' },
  { min: 50, max: 100, label: '$50 - $100' },
  { min: 100, max: 150, label: '$100 - $150' },
  { min: 150, max: 200, label: '$150 - $200' },
  { min: 200, max: Infinity, label: 'Above $200' }
];

const Catalogo = () => {
  const { addToCart } = useCart();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [filters, setFilters] = useState({
    brand: '',
    size: '',
    price: '',
    sort: 'featured'
  });
  
  // Apply filters
  useEffect(() => {
    let result = [...products];
    
    // Filter by brand
    if (filters.brand) {
      result = result.filter(product => product.brand === filters.brand);
    }
    
    // Filter by size
    if (filters.size) {
      const sizeNum = parseInt(filters.size);
      result = result.filter(product => product.sizes.includes(sizeNum));
    }
    
    // Filter by price range
    if (filters.price) {
      const [min, max] = filters.price.split('-').map(Number);
      result = result.filter(product => 
        product.price >= min && (max === Infinity ? true : product.price <= max)
      );
    }
    
    // Apply sorting
    switch (filters.sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'featured':
      default:
        // Featured products first, then regular products
        result.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
    }
    
    setFilteredProducts(result);
  }, [filters]);
  
  const updateFilter = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };
  
  const resetFilters = () => {
    setFilters({
      brand: '',
      size: '',
      price: '',
      sort: 'featured'
    });
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="container max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mt-8 mb-2">Catálogo</h1>
          <p className="text-muted-foreground mb-8">
            Explore nossa coleção de tênis premium e encontre seu próximo par favorito.
          </p>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters sidebar */}
            <div className="w-full lg:w-64 flex-shrink-0">
              <div className="sticky top-24 space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Marca</h3>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={filters.brand}
                    onChange={(e) => updateFilter('brand', e.target.value)}
                  >
                    <option value="">Todas as marcas</option>
                    {brands.map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-3">Tamanho</h3>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={filters.size}
                    onChange={(e) => updateFilter('size', e.target.value)}
                  >
                    <option value="">Todos os tamanhos</option>
                    {sizes.map(size => (
                      <option key={size} value={size.toString()}>{size}</option>
                    ))}
                  </select>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-3">Preço</h3>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={filters.price}
                    onChange={(e) => updateFilter('price', e.target.value)}
                  >
                    <option value="">Qualquer preço</option>
                    {priceRanges.map((range, index) => (
                      <option 
                        key={index} 
                        value={`${range.min}-${range.max}`}
                      >
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-3">Ordenar por</h3>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={filters.sort}
                    onChange={(e) => updateFilter('sort', e.target.value)}
                  >
                    <option value="featured">Destaque</option>
                    <option value="price-asc">Preço: menor para maior</option>
                    <option value="price-desc">Preço: maior para menor</option>
                    <option value="name-asc">Nome: A-Z</option>
                    <option value="name-desc">Nome: Z-A</option>
                  </select>
                </div>
                
                <button
                  onClick={resetFilters}
                  className="w-full mt-4 py-2 bg-secondary hover:bg-secondary/80 text-foreground transition-colors rounded-md"
                >
                  Limpar filtros
                </button>
              </div>
            </div>
            
            {/* Products grid */}
            <div className="flex-grow">
              <p className="mb-4 text-muted-foreground">
                {filteredProducts.length} produtos encontrados
              </p>
              
              <CatalogGrid products={filteredProducts} />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Catalogo;
