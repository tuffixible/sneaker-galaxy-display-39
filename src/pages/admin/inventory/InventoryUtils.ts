// Existing types
export interface InventoryItem {
  id: string;
  name: string;
  brand: string;
  sku?: string;
  stock: number;
  lowStockThreshold: number;
  status: "in-stock" | "low-stock" | "out-of-stock";
  images?: string[];
  sizes?: (string | number)[];
}

export interface SizeStockMap {
  [productId: string]: {
    [size: string]: number; // Changed from string to number
  };
}

// Calculate status based on stock and threshold
export const calculateStatus = (stock: number, threshold: number): "in-stock" | "low-stock" | "out-of-stock" => {
  if (stock <= 0) return "out-of-stock";
  if (stock <= threshold) return "low-stock";
  return "in-stock";
};

// Status utility functions
export const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case "in-stock":
      return "bg-green-100 text-green-800";
    case "low-stock":
      return "bg-yellow-100 text-yellow-800";
    case "out-of-stock":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getStatusText = (status: string, content: any) => {
  const texts = content?.statusTexts || {
    "in-stock": "In Stock",
    "low-stock": "Low Stock",
    "out-of-stock": "Out of Stock"
  };
  
  return texts[status] || status;
};

// Currency utilities
export const getCurrencies = () => [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "CAD", name: "Canadian Dollar", symbol: "CA$" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "MXN", name: "Mexican Peso", symbol: "MX$" }
];

export const getCurrencySymbol = (currencyCode: string) => {
  const currency = getCurrencies().find(c => c.code === currencyCode);
  return currency?.symbol || "$";
};

export const formatPrice = (price: number, currencyCode: string = "USD") => {
  const symbol = getCurrencySymbol(currencyCode);
  
  // Format based on currency
  if (currencyCode === "JPY" || currencyCode === "CNY") {
    // No decimal places for Yen and Yuan
    return `${symbol}${Math.round(price)}`;
  }
  
  return `${symbol}${price.toFixed(2)}`;
};

// Save inventory changes to localStorage and trigger updates
export const saveInventoryChanges = (inventory: InventoryItem[]): void => {
  localStorage.setItem('inventory', JSON.stringify(inventory));
  
  // Update products data as well to keep both in sync
  const products = inventory.map(item => ({
    id: item.id,
    name: item.name,
    brand: item.brand,
    price: item.price || 0, // Add default value
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
        statusTexts: {
          "in-stock": "Em Estoque",
          "low-stock": "Estoque Baixo",
          "out-of-stock": "Sem Estoque"
        },
        stockPerSize: "Estoque por Tamanho",
        sizeLabel: "Tam.",
        messages: {
          saved: "Alterações de estoque salvas com sucesso!",
          updateItem: "atualizado com sucesso",
          error: "Erro ao salvar alterações."
        },
        noProducts: "Nenhum produto encontrado"
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
        statusTexts: {
          "in-stock": "En Stock",
          "low-stock": "Stock Bajo",
          "out-of-stock": "Sin Stock"
        },
        stockPerSize: "Stock por Talla",
        sizeLabel: "Talla",
        messages: {
          saved: "¡Cambios de inventario guardados con éxito!",
          updateItem: "actualizado con éxito",
          error: "Error al guardar cambios."
        },
        noProducts: "No se encontraron productos"
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
        statusTexts: {
          "in-stock": "In Stock",
          "low-stock": "Low Stock",
          "out-of-stock": "Out of Stock"
        },
        stockPerSize: "Stock per Size",
        sizeLabel: "Size",
        messages: {
          saved: "Inventory changes saved successfully!",
          updateItem: "updated successfully",
          error: "Error saving changes."
        },
        noProducts: "No products found"
      };
  }
};
