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
    [size: string]: string;
  };
}

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
