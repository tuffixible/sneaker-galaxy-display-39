
import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getProductById } from '@/data/products';
import { toast } from 'sonner';
import { useCart } from '@/contexts/CartContext';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = getProductById(id || '');
  
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate('/catalogo')}>
              Back to Catalog
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Por favor, selecione um tamanho');
      return;
    }
    
    addToCart(product, selectedSize, quantity);
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="container max-w-7xl mx-auto px-4 py-8">
          <Link to="/catalogo" className="inline-flex items-center text-sm mb-8 hover:text-primary transition-colors">
            <ArrowLeft size={16} className="mr-1" /> Back to Catalog
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div>
              <div className="aspect-square bg-secondary/30 rounded-xl overflow-hidden mb-4">
                <img 
                  src={product.images[activeImageIndex]} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex space-x-2">
                {product.images.map((img, index) => (
                  <button 
                    key={index}
                    className={`w-20 h-20 overflow-hidden rounded-lg border-2 ${
                      index === activeImageIndex ? 'border-primary' : 'border-transparent'
                    }`}
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <img src={img} alt={`${product.name} view ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Details */}
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="text-lg text-muted-foreground mb-2">{product.brand}</p>
              <p className="text-2xl font-semibold mb-6">${product.price.toFixed(2)}</p>
              
              <div className="mb-6">
                <h2 className="text-sm font-medium mb-2">Cores disponíveis</h2>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-secondary rounded-full text-sm"
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h2 className="text-sm font-medium mb-2">Selecione o tamanho</h2>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium ${
                        selectedSize === size 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-secondary hover:bg-secondary/80'
                      }`}
                      onClick={() => setSelectedSize(Number(size))}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {selectedSize === null && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Selecione um tamanho para continuar
                  </p>
                )}
              </div>
              
              <div className="mb-8">
                <h2 className="text-sm font-medium mb-2">Quantidade</h2>
                <div className="flex items-center">
                  <button 
                    onClick={decreaseQuantity}
                    className="w-10 h-10 flex items-center justify-center bg-secondary rounded-full"
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center mx-2 font-medium">{quantity}</span>
                  <button 
                    onClick={increaseQuantity}
                    className="w-10 h-10 flex items-center justify-center bg-secondary rounded-full"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Button 
                  size="lg" 
                  className="flex-grow"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag className="mr-2" size={18} /> Adicionar ao Carrinho
                </Button>
              </div>
              
              <div className="mt-8">
                <h2 className="text-lg font-semibold mb-2">Descrição</h2>
                <p className="text-muted-foreground">{product.description}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
