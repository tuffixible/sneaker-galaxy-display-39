
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState('Thank you for your order!');
  
  // Load checkout message from settings
  useEffect(() => {
    const loadCheckoutMessage = () => {
      const settings = JSON.parse(localStorage.getItem('storeSettings') || '{}');
      if (settings.checkoutMessage) {
        setCheckoutMessage(settings.checkoutMessage);
      }
    };
    
    loadCheckoutMessage();
    
    window.addEventListener('storeSettingsUpdated', loadCheckoutMessage);
    
    return () => {
      window.removeEventListener('storeSettingsUpdated', loadCheckoutMessage);
    };
  }, []);
  
  const handleCheckout = () => {
    setIsCheckingOut(true);
    
    // Simulate checkout process
    setTimeout(() => {
      clearCart();
      setIsCheckingOut(false);
      toast.success(checkoutMessage);
    }, 2000);
  };
  
  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow pt-24 flex items-center justify-center">
          <div className="text-center p-8">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-secondary">
              <ShoppingBag size={24} />
            </div>
            <h1 className="text-2xl font-bold mb-2">Seu carrinho está vazio</h1>
            <p className="text-muted-foreground mb-6">
              Explore nosso catálogo para encontrar produtos incríveis!
            </p>
            <Link to="/catalogo">
              <Button className="mt-2">
                Ir para o catálogo <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="container max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Carrinho de Compras</h1>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart items */}
            <div className="w-full lg:w-2/3">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Seus Itens ({totalItems})</h2>
                  <button 
                    onClick={clearCart}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Limpar carrinho
                  </button>
                </div>
                
                <Separator className="mb-4" />
                
                <div className="space-y-6">
                  {cartItems.map((item, index) => (
                    <div key={`${item.product.id}-${item.size}-${index}`} className="flex gap-4">
                      <div className="w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                        <img 
                          src={item.product.images[0]} 
                          alt={item.product.name}
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      
                      <div className="flex-grow">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium">{item.product.name}</h3>
                            <p className="text-sm text-muted-foreground">{item.product.brand}</p>
                            <p className="text-sm mt-1">Tamanho: {item.size}</p>
                          </div>
                          <p className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center">
                            <button 
                              onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center bg-secondary rounded-full"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-8 text-center mx-1">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center bg-secondary rounded-full"
                              aria-label="Increase quantity"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          
                          <button 
                            onClick={() => removeFromCart(item.product.id, item.size)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Order summary */}
            <div className="w-full lg:w-1/3">
              <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Resumo do Pedido</h2>
                
                <Separator className="mb-4" />
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Frete</span>
                    <span>$0.00</span>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-6" 
                  size="lg"
                  disabled={isCheckingOut}
                  onClick={handleCheckout}
                >
                  {isCheckingOut ? 'Processando...' : 'Finalizar Compra'}
                </Button>
                
                <Link to="/catalogo">
                  <Button variant="outline" className="w-full mt-3" size="lg">
                    Continuar Comprando
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
