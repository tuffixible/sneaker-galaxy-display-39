import { toast } from 'sonner';
import { Product } from '@/data/products';

export interface InventoryItem extends Product {
  stock: number;
  lowStockThreshold: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  sku: string;
  displayLocation?: 'homepage' | 'banner' | 'rotative' | 'catalog' | 'all';
  currency?: string;
}

export interface SizeStockMap {
  [productId: string]: {
    [size: string]: number;
  };
}

// Calculate status based on stock and threshold
export const calculateStatus = (stock: number, threshold: number): 'in-stock' | 'low-stock' | 'out-of-stock' => {
  if (stock <= 0) return 'out-of-stock';
  if (stock <= threshold) return 'low-stock';
  return 'in-stock';
};

// Save inventory changes to localStorage and trigger updates
export const saveInventoryChanges = (inventory: InventoryItem[]): void => {
  localStorage.setItem('inventory', JSON.stringify(inventory));
  
  // Update products data as well to keep both in sync
  const products = inventory.map(item => ({
    id: item.id,
    name: item.name,
    brand: item.brand,
    price: item.price,
    colors: item.colors,
    sizes: item.sizes,
    images: item.images,
    description: item.description,
    featured: item.featured,
    stock: item.stock,
    lowStockThreshold: item.lowStockThreshold,
    active: item.active !== false, // Default to true if not specified
    displayLocation: item.displayLocation || 'catalog',
    currency: item.currency || 'USD'
  }));
  
  localStorage.setItem('products', JSON.stringify(products));
  
  // Dispatch events to notify other components
  window.dispatchEvent(new CustomEvent('inventoryUpdated'));
  window.dispatchEvent(new CustomEvent('productsUpdated'));
  
  // Update site content as well
  const siteContent = JSON.parse(localStorage.getItem('siteContent') || '{}');
  siteContent.featuredProducts = products.filter(p => p.featured).map(p => p.id);
  siteContent.lastUpdated = new Date().toISOString();
  localStorage.setItem('siteContent', JSON.stringify(siteContent));
  window.dispatchEvent(new CustomEvent('siteContentUpdated'));
};

// Get multilingual content for inventory page
export const getInventoryContent = (language: string) => {
  switch(language) {
    case 'pt':
      return {
        title: "Gerenciamento de Estoque",
        description: "Controle o estoque de todos os produtos",
        search: "Buscar produtos...",
        buttons: {
          save: "Salvar Alterações",
          back: "Voltar para Produtos"
        },
        filters: {
          all: "Todos os Produtos",
          inStock: "Em Estoque",
          lowStock: "Estoque Baixo",
          outOfStock: "Sem Estoque"
        },
        columns: {
          product: "Produto",
          sku: "SKU",
          stock: "Estoque",
          threshold: "Limite Baixo",
          status: "Status",
          actions: "Ações"
        },
        status: {
          inStock: "Em Estoque",
          lowStock: "Estoque Baixo",
          outOfStock: "Sem Estoque"
        },
        stockPerSize: "Estoque por Tamanho",
        sizeLabel: "Tam.",
        messages: {
          saved: "Alterações de estoque salvas com sucesso!",
          error: "Erro ao salvar alterações."
        }
      };
    case 'es':
      return {
        title: "Gestión de Inventario",
        description: "Controla el inventario de todos los productos",
        search: "Buscar productos...",
        buttons: {
          save: "Guardar Cambios",
          back: "Volver a Productos"
        },
        filters: {
          all: "Todos los Productos",
          inStock: "En Stock",
          lowStock: "Stock Bajo",
          outOfStock: "Sin Stock"
        },
        columns: {
          product: "Producto",
          sku: "SKU",
          stock: "Stock",
          threshold: "Límite Bajo",
          status: "Estado",
          actions: "Acciones"
        },
        status: {
          inStock: "En Stock",
          lowStock: "Stock Bajo",
          outOfStock: "Sin Stock"
        },
        stockPerSize: "Stock por Talla",
        sizeLabel: "Talla",
        messages: {
          saved: "¡Cambios de inventario guardados con éxito!",
          error: "Error al guardar cambios."
        }
      };
    default: // 'en'
      return {
        title: "Inventory Management",
        description: "Control stock for all products",
        search: "Search products...",
        buttons: {
          save: "Save Changes",
          back: "Back to Products"
        },
        filters: {
          all: "All Products",
          inStock: "In Stock",
          lowStock: "Low Stock",
          outOfStock: "Out of Stock"
        },
        columns: {
          product: "Product",
          sku: "SKU",
          stock: "Stock",
          threshold: "Low Threshold",
          status: "Status",
          actions: "Actions"
        },
        status: {
          inStock: "In Stock",
          lowStock: "Low Stock",
          outOfStock: "Out of Stock"
        },
        stockPerSize: "Stock per Size",
        sizeLabel: "Size",
        messages: {
          saved: "Inventory changes saved successfully!",
          error: "Error saving changes."
        }
      };
  }
};

// Get available currencies
export const getCurrencies = () => [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'MXN', symbol: '$', name: 'Mexican Peso' },
  { code: 'CAD', symbol: '$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: '$', name: 'Australian Dollar' }
];

// Format price based on currency
export const formatPrice = (price: number, currencyCode: string = 'USD') => {
  const currency = getCurrencies().find(c => c.code === currencyCode) || getCurrencies()[0];
  
  return `${currency.symbol}${price.toFixed(2)}`;
};
