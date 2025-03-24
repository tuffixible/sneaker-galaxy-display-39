
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/data/products';
import { toast } from 'sonner';

interface CartItem {
  product: Product;
  quantity: number;
  size: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, size: number, quantity: number) => void;
  removeFromCart: (productId: string, size: number) => void;
  updateQuantity: (productId: string, size: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  // Initialize cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }
  }, []);
  
  // Save cart to localStorage on changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    
    // Dispatch custom event to notify other components about cart updates
    window.dispatchEvent(new Event('cartUpdated'));
  }, [cartItems]);
  
  const addToCart = (product: Product, size: number, quantity: number = 1) => {
    setCartItems(prevItems => {
      // Check if this product and size already exists in cart
      const existingItemIndex = prevItems.findIndex(
        item => item.product.id === product.id && item.size === size
      );
      
      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        toast.success('Quantidade atualizada no carrinho');
        return updatedItems;
      } else {
        // Add new item
        toast.success('Produto adicionado ao carrinho');
        return [...prevItems, { product, size, quantity }];
      }
    });
  };
  
  const removeFromCart = (productId: string, size: number) => {
    setCartItems(prevItems => 
      prevItems.filter(item => !(item.product.id === productId && item.size === size))
    );
    toast.success('Produto removido do carrinho');
  };
  
  const updateQuantity = (productId: string, size: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    
    setCartItems(prevItems => {
      return prevItems.map(item => {
        if (item.product.id === productId && item.size === size) {
          return { ...item, quantity };
        }
        return item;
      });
    });
  };
  
  const clearCart = () => {
    setCartItems([]);
    toast.success('Carrinho esvaziado');
  };
  
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity, 
    0
  );
  
  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart,
        totalItems,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
