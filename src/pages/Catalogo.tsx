
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CatalogGrid from '@/components/CatalogGrid';
import { Separator } from '@/components/ui/separator';
import { getAllProducts, Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';

const Catalogo = () => {
  const { language } = useLanguage();
  const { addToCart } = useCart();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState({
    brand: '',
    size: '',
    price: '',
    sort: 'featured'
  });
  
  // Load all products
  const allProducts = getAllProducts();
  
  // Extract unique brands and sizes
  const brands = Array.from(new Set(allProducts.map(product => product.brand)));
  const sizes = Array.from(
    new Set(allProducts.flatMap(product => product.sizes.map(size => size.toString())))
  ).sort((a, b) => parseInt(a) - parseInt(b));
  
  // Price ranges
  const priceRanges = [
    { min: 0, max: 50, label: 'Under $50' },
    { min: 50, max: 100, label: '$50 - $100' },
    { min: 100, max: 150, label: '$100 - $150' },
    { min: 150, max: 200, label: '$150 - $200' },
    { min: 200, max: Infinity, label: 'Above $200' }
  ];
  
  // Translations
  const getTranslations = () => {
    switch(language) {
      case 'pt':
        return {
          title: "Catálogo",
          description: "Explore nossa coleção de tênis premium e encontre seu próximo par favorito.",
          filters: {
            allBrands: "Todas as marcas",
            allSizes: "Todos os tamanhos",
            anyPrice: "Qualquer preço",
            sortBy: "Ordenar por",
            featured: "Destaque",
            priceLowToHigh: "Preço: menor para maior",
            priceHighToLow: "Preço: maior para menor",
            nameAZ: "Nome: A-Z",
            nameZA: "Nome: Z-A",
            brand: "Marca",
            size: "Tamanho",
            price: "Preço",
            clearFilters: "Limpar filtros"
          },
          productsFound: "produtos encontrados"
        };
      case 'es':
        return {
          title: "Catálogo",
          description: "Explora nuestra colección de zapatillas premium y encuentra tu próximo par favorito.",
          filters: {
            allBrands: "Todas las marcas",
            allSizes: "Todas las tallas",
            anyPrice: "Cualquier precio",
            sortBy: "Ordenar por",
            featured: "Destacados",
            priceLowToHigh: "Precio: menor a mayor",
            priceHighToLow: "Precio: mayor a menor",
            nameAZ: "Nombre: A-Z",
            nameZA: "Nombre: Z-A",
            brand: "Marca",
            size: "Talla",
            price: "Precio",
            clearFilters: "Limpiar filtros"
          },
          productsFound: "productos encontrados"
        };
      default: // 'en'
        return {
          title: "Catalog",
          description: "Explore our collection of premium sneakers and find your next favorite pair.",
          filters: {
            allBrands: "All brands",
            allSizes: "All sizes",
            anyPrice: "Any price",
            sortBy: "Sort by",
            featured: "Featured",
            priceLowToHigh: "Price: low to high",
            priceHighToLow: "Price: high to low",
            nameAZ: "Name: A-Z",
            nameZA: "Name: Z-A",
            brand: "Brand",
            size: "Size",
            price: "Price",
            clearFilters: "Clear filters"
          },
          productsFound: "products found"
        };
    }
  };
  
  const content = getTranslations();
  
  // Apply filters
  useEffect(() => {
    let result = [...allProducts];
    
    // Filter by brand
    if (filters.brand) {
      result = result.filter(product => product.brand === filters.brand);
    }
    
    // Filter by size
    if (filters.size) {
      const sizeStr = filters.size;
      result = result.filter(product => 
        product.sizes.some(size => size.toString() === sizeStr)
      );
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
  }, [filters, allProducts]);
  
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
          <h1 className="text-3xl font-bold mt-8 mb-2">{content.title}</h1>
          <p className="text-muted-foreground mb-8">
            {content.description}
          </p>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters sidebar */}
            <div className="w-full lg:w-64 flex-shrink-0">
              <div className="sticky top-24 space-y-6">
                <div>
                  <h3 className="font-medium mb-3">{content.filters.brand}</h3>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={filters.brand}
                    onChange={(e) => updateFilter('brand', e.target.value)}
                  >
                    <option value="">{content.filters.allBrands}</option>
                    {brands.map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-3">{content.filters.size}</h3>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={filters.size}
                    onChange={(e) => updateFilter('size', e.target.value)}
                  >
                    <option value="">{content.filters.allSizes}</option>
                    {sizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-3">{content.filters.price}</h3>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={filters.price}
                    onChange={(e) => updateFilter('price', e.target.value)}
                  >
                    <option value="">{content.filters.anyPrice}</option>
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
                  <h3 className="font-medium mb-3">{content.filters.sortBy}</h3>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={filters.sort}
                    onChange={(e) => updateFilter('sort', e.target.value)}
                  >
                    <option value="featured">{content.filters.featured}</option>
                    <option value="price-asc">{content.filters.priceLowToHigh}</option>
                    <option value="price-desc">{content.filters.priceHighToLow}</option>
                    <option value="name-asc">{content.filters.nameAZ}</option>
                    <option value="name-desc">{content.filters.nameZA}</option>
                  </select>
                </div>
                
                <button
                  onClick={resetFilters}
                  className="w-full mt-4 py-2 bg-secondary hover:bg-secondary/80 text-foreground transition-colors rounded-md"
                >
                  {content.filters.clearFilters}
                </button>
              </div>
            </div>
            
            {/* Products grid */}
            <div className="flex-grow">
              <p className="mb-4 text-muted-foreground">
                {filteredProducts.length} {content.productsFound}
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
