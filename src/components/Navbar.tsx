
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Toggle the mobile menu
  const toggleMenu = () => setIsOpen(!isOpen);

  // Handle scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out-expo py-4 px-6 md:px-8',
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      )}
    >
      <div className="container max-w-7xl mx-auto">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-bold tracking-tight hover:opacity-80 transition-opacity"
          >
            Xible Store
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={cn(
                "text-sm font-medium hover:text-primary transition-colors",
                location.pathname === "/" && "text-primary"
              )}
            >
              Home
            </Link>
            <Link 
              to="/catalog" 
              className={cn(
                "text-sm font-medium hover:text-primary transition-colors",
                location.pathname.includes("/catalog") && "text-primary"
              )}
            >
              Catalog
            </Link>
            <Link 
              to="/about" 
              className={cn(
                "text-sm font-medium hover:text-primary transition-colors",
                location.pathname === "/about" && "text-primary"
              )}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={cn(
                "text-sm font-medium hover:text-primary transition-colors",
                location.pathname === "/contact" && "text-primary"
              )}
            >
              Contact
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <button 
              className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary text-foreground transition-all hover:bg-secondary/80"
              aria-label="Search"
            >
              <Search size={18} />
            </button>
            <button
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-secondary text-foreground transition-all hover:bg-secondary/80"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-0 bg-white z-40 transition-transform duration-500 ease-out-expo pt-20",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col space-y-6">
            <Link 
              to="/" 
              className="text-lg font-medium py-2 border-b border-border"
            >
              Home
            </Link>
            <Link 
              to="/catalog" 
              className="text-lg font-medium py-2 border-b border-border"
            >
              Catalog
            </Link>
            <Link 
              to="/about" 
              className="text-lg font-medium py-2 border-b border-border"
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="text-lg font-medium py-2 border-b border-border"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
