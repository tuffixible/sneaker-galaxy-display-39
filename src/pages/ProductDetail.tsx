
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Minus, Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getProductById, products } from '@/data/products';
import { cn } from '@/lib/utils';
import CatalogGrid from '@/components/CatalogGrid';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  const product = id ? getProductById(id) : undefined;
  
  // Similar products (excluding current product)
  const similarProducts = products
    .filter(p => p.id !== id && p.brand === product?.brand)
    .slice(0, 4);
  
  // Initialize selected options when product loads
  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      setSelectedSize(product.sizes[0]);
      setMainImage(product.images[0]);
      
      // Reset scroll position
      window.scrollTo(0, 0);
    }
  }, [product]);

  // Set loaded state after a delay to trigger animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast({
        title: "Please select options",
        description: "You need to select color and size before adding to cart",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Added to cart",
      description: `${quantity} × ${product?.name} added to your cart`,
    });
  };

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Product not found</h1>
            <p className="text-muted-foreground mt-2">The product you're looking for doesn't exist.</p>
            <Link 
              to="/catalog"
              className="mt-6 inline-flex items-center justify-center px-6 py-3 bg-foreground text-background font-medium rounded-full transition-all hover:bg-foreground/90"
            >
              Back to catalog
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-16 px-6 md:px-8">
        {/* Breadcrumbs */}
        <div className="container max-w-7xl mx-auto mb-8">
          <div className="flex items-center text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight size={14} className="mx-2" />
            <Link to="/catalog" className="hover:text-foreground transition-colors">
              Catalog
            </Link>
            <ChevronRight size={14} className="mx-2" />
            <Link to={`/catalog/${product.brand.toLowerCase()}`} className="hover:text-foreground transition-colors">
              {product.brand}
            </Link>
            <ChevronRight size={14} className="mx-2" />
            <span className="text-foreground font-medium truncate">{product.name}</span>
          </div>
        </div>
        
        <div className="container max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {/* Product Images */}
            <div className={cn(
              "transition-opacity duration-700",
              isLoaded ? "opacity-100" : "opacity-0"
            )}>
              <div className="aspect-square rounded-2xl overflow-hidden bg-secondary/30 mb-4">
                <img 
                  src={mainImage} 
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={cn(
                      "aspect-square rounded-lg overflow-hidden border-2 transition-all",
                      mainImage === image
                        ? "border-primary"
                        : "border-transparent hover:border-primary/50"
                    )}
                    onClick={() => setMainImage(image)}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Details */}
            <div className={cn(
              "flex flex-col transition-transform duration-700",
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            )}>
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <div className="inline-block mb-2 py-1 px-3 bg-primary/10 rounded-full">
                    <span className="text-xs font-medium text-primary">{product.brand}</span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>
                  <p className="text-2xl font-semibold mt-2">${product.price.toFixed(2)}</p>
                </div>
                
                <div className="prose prose-sm mb-8 text-muted-foreground">
                  <p>{product.description}</p>
                </div>
                
                {/* Color Selection */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-3">Color: <span className="text-muted-foreground">{selectedColor}</span></h3>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        className={cn(
                          "px-4 py-2 rounded-full text-sm transition-all",
                          selectedColor === color
                            ? "bg-foreground text-background"
                            : "bg-secondary text-foreground hover:bg-secondary/80"
                        )}
                        onClick={() => setSelectedColor(color)}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Size Selection */}
                <div className="mb-8">
                  <h3 className="text-sm font-medium mb-3">Size: <span className="text-muted-foreground">{selectedSize}</span></h3>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        className={cn(
                          "px-4 py-3 rounded-lg text-sm transition-all",
                          selectedSize === size
                            ? "bg-foreground text-background"
                            : "bg-secondary text-foreground hover:bg-secondary/80"
                        )}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Quantity */}
                <div className="mb-8">
                  <h3 className="text-sm font-medium mb-3">Quantity:</h3>
                  <div className="flex items-center">
                    <button
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary text-foreground transition-all hover:bg-secondary/80"
                      onClick={decrementQuantity}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-16 text-center font-medium">{quantity}</span>
                    <button
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary text-foreground transition-all hover:bg-secondary/80"
                      onClick={incrementQuantity}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
                
                {/* Add to Cart */}
                <div className="mt-auto">
                  <button
                    className="w-full py-4 rounded-full bg-foreground text-background font-medium transition-all hover:bg-foreground/90"
                    onClick={handleAddToCart}
                  >
                    View in Store
                  </button>
                  
                  <Link
                    to="/catalog"
                    className="flex items-center justify-center mt-4 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ArrowLeft size={16} className="mr-2" />
                    Back to catalog
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Similar Products */}
          {similarProducts.length > 0 && (
            <div className="mt-24">
              <CatalogGrid 
                products={similarProducts}
                title="You may also like"
                subtitle={`More great products from ${product.brand}`}
              />
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
