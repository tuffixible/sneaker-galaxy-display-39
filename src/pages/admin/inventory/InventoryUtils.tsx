
import { toast } from 'sonner';

// Define type for inventory item
export interface InventoryItem {
  id: string;
  name: string;
  brand?: string;
  images?: string[];
  stock: number;
  lowStockThreshold: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  sku: string;
  sizes?: (number | string)[]; // Accept both number[] and string[]
  colors?: string[];
  price?: number;
  description?: string;
  featured?: boolean;
}

// Define type for size stock
export interface SizeStockMap {
  [productId: string]: {
    [size: string]: number;
  };
}

// Helper functions for inventory management
export const getStatusBadgeClass = (status: string) => {
  switch(status) {
    case 'in-stock':
      return "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100";
    case 'low-stock':
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100";
    case 'out-of-stock':
      return "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
  }
};

// Calculate inventory status based on stock and threshold
export const calculateStatus = (stock: number, threshold: number): 'in-stock' | 'low-stock' | 'out-of-stock' => {
  if (stock <= 0) return 'out-of-stock';
  if (stock < threshold) return 'low-stock';
  return 'in-stock';
};

// Save inventory changes to localStorage
export const saveInventoryChanges = (inventory: InventoryItem[]) => {
  // Save to localStorage
  localStorage.setItem('inventory', JSON.stringify(inventory));
  
  // Update products too
  const products = JSON.parse(localStorage.getItem('products') || '[]');
  const updatedProducts = products.map(product => {
    const inventoryItem = inventory.find(item => item.id === product.id);
    if (inventoryItem) {
      return {
        ...product,
        stock: inventoryItem.stock,
        lowStockThreshold: inventoryItem.lowStockThreshold,
        status: inventoryItem.status
      };
    }
    return product;
  });
  localStorage.setItem('products', JSON.stringify(updatedProducts));
  
  // Trigger custom event to update product lists
  window.dispatchEvent(new CustomEvent('productsUpdated'));
  window.dispatchEvent(new CustomEvent('inventoryUpdated'));
};

// Get multilingual content
export const getInventoryContent = (language: string) => {
  switch(language) {
    case 'pt':
      return {
        title: "Gerenciamento de Estoque",
        description: "Controle o estoque e disponibilidade dos produtos",
        search: "Buscar produtos...",
        columns: {
          product: "Produto",
          sku: "SKU",
          stock: "Estoque Atual",
          threshold: "Limite Mínimo",
          status: "Status",
          actions: "Ações"
        },
        status: {
          inStock: "Em Estoque",
          lowStock: "Estoque Baixo",
          outOfStock: "Sem Estoque"
        },
        buttons: {
          save: "Salvar Alterações",
          update: "Atualizar Estoque",
          back: "Voltar aos Produtos"
        },
        messages: {
          saved: "Estoque atualizado com sucesso!",
          updateItem: "Atualizar item"
        },
        noProducts: "Nenhum produto encontrado",
        filters: {
          all: "Todos",
          inStock: "Em Estoque",
          lowStock: "Estoque Baixo",
          outOfStock: "Sem Estoque"
        },
        sizes: "Tamanhos",
        sizeLabel: "Tamanho",
        stockPerSize: "Estoque por Tamanho"
      };
    case 'es':
      return {
        title: "Gestión de Inventario",
        description: "Controla el inventario y disponibilidad de productos",
        search: "Buscar productos...",
        columns: {
          product: "Producto",
          sku: "SKU",
          stock: "Stock Actual",
          threshold: "Límite Mínimo",
          status: "Estado",
          actions: "Acciones"
        },
        status: {
          inStock: "En Stock",
          lowStock: "Stock Bajo",
          outOfStock: "Sin Stock"
        },
        buttons: {
          save: "Guardar Cambios",
          update: "Actualizar Stock",
          back: "Volver a Productos"
        },
        messages: {
          saved: "¡Inventario actualizado con éxito!",
          updateItem: "Actualizar ítem"
        },
        noProducts: "No se encontraron productos",
        filters: {
          all: "Todos",
          inStock: "En Stock",
          lowStock: "Stock Bajo",
          outOfStock: "Sin Stock"
        },
        sizes: "Tallas",
        sizeLabel: "Talla",
        stockPerSize: "Stock por Talla"
      };
    default: // 'en'
      return {
        title: "Inventory Management",
        description: "Control product stock and availability",
        search: "Search products...",
        columns: {
          product: "Product",
          sku: "SKU",
          stock: "Current Stock",
          threshold: "Low Stock Threshold",
          status: "Status",
          actions: "Actions"
        },
        status: {
          inStock: "In Stock",
          lowStock: "Low Stock",
          outOfStock: "Out of Stock"
        },
        buttons: {
          save: "Save Changes",
          update: "Update Stock",
          back: "Back to Products"
        },
        messages: {
          saved: "Inventory updated successfully!",
          updateItem: "Update item"
        },
        noProducts: "No products found",
        filters: {
          all: "All",
          inStock: "In Stock",
          lowStock: "Low Stock",
          outOfStock: "Out of Stock"
        },
        sizes: "Sizes",
        sizeLabel: "Size",
        stockPerSize: "Stock per Size"
      };
  }
};

// Get status display text
export const getStatusText = (status: string, content: any) => {
  switch(status) {
    case 'in-stock':
      return content.status.inStock;
    case 'low-stock':
      return content.status.lowStock;
    case 'out-of-stock':
      return content.status.outOfStock;
    default:
      return status;
  }
};
