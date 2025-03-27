
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, ShoppingBag, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import LanguageSelector from './LanguageSelector';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartItems, setCartItems] = useState<number>(0);
  const [storeLogo, setStoreLogo] = useState('/logo.svg');
  const [storeName, setStoreName] = useState('Xible Store');
  const location = useLocation();
  const {
    t,
    language
  } = useLanguage();
  const {
    user,
    isAuthenticated,
    isAdmin,
    logout
  } = useAuth();

  // Toggle the mobile menu
  const toggleMenu = () => setIsOpen(!isOpen);

  // Load store settings
  useEffect(() => {
    const loadSettings = () => {
      const savedSettings = localStorage.getItem('storeSettings');
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        if (parsedSettings.logo) {
          setStoreLogo(parsedSettings.logo);
        }
        if (parsedSettings.name) {
          setStoreName(parsedSettings.name);
        }
      }
    };
    
    // Initial load
    loadSettings();
    
    // Listen for settings updates
    const handleSettingsUpdate = () => {
      loadSettings();
    };
    
    window.addEventListener('storeSettingsUpdated', handleSettingsUpdate);
    
    return () => {
      window.removeEventListener('storeSettingsUpdated', handleSettingsUpdate);
    };
  }, []);

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

  // Update cart count from localStorage
  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartItems(cart.length);
    };

    // Initial load
    updateCartCount();

    // Listen for storage events to update cart count across tabs
    window.addEventListener('storage', updateCartCount);
    // Custom event for same-tab updates
    window.addEventListener('cartUpdated', updateCartCount);
    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // User menu content based on authentication status
  const getUserMenuContent = () => {
    if (isAuthenticated) {
      return <>
          <DropdownMenuLabel>
            {language === 'pt' ? 'Olá' : language === 'es' ? 'Hola' : 'Hello'}, {user?.name}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {isAdmin && <DropdownMenuItem asChild>
              <Link to="/admin" className="Admin">Admin</Link>
            </DropdownMenuItem>}
          <DropdownMenuItem asChild>
            <Link to="/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/orders">Orders</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout}>
            Logout
          </DropdownMenuItem>
        </>;
    } else {
      return <>
          <DropdownMenuLabel>
            {t ? t('navAccount') : 'Account'}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link to="/login">{t ? t('navLogin') : 'Login'}</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/register">{t ? t('navRegister') : 'Register'}</Link>
          </DropdownMenuItem>
        </>;
    }
  };

  return <header className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out-expo py-4 px-6 md:px-8', isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent')}>
      <div className="container max-w-7xl mx-auto">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src={storeLogo} alt={storeName} className="w-10 h-10 object-contain" />
            <span className="text-2xl font-bold tracking-tight">
              {storeName}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={cn("text-sm font-medium hover:text-primary transition-colors", location.pathname === "/" && "text-primary")}>
              {t ? t('navHome') : 'Home'}
            </Link>
            <Link to="/catalogo" className={cn("text-sm font-medium hover:text-primary transition-colors", location.pathname === "/catalogo" && "text-primary")}>
              {t ? t('navCatalog') : 'Catalog'}
            </Link>
            <Link to="/about" className={cn("text-sm font-medium hover:text-primary transition-colors", location.pathname === "/about" && "text-primary")}>
              {t ? t('navAbout') : 'About'}
            </Link>
            <Link to="/contact" className={cn("text-sm font-medium hover:text-primary transition-colors", location.pathname === "/contact" && "text-primary")}>
              {t ? t('navContact') : 'Contact'}
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary text-foreground transition-all hover:bg-secondary/80" aria-label="Search">
              <Search size={18} />
            </button>
            
            <Link to="/cart" className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary text-foreground transition-all hover:bg-secondary/80 relative" aria-label="Cart">
              <ShoppingBag size={18} />
              {cartItems > 0 && <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems}
                </span>}
            </Link>
            
            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary text-foreground transition-all hover:bg-secondary/80" aria-label="User menu">
                  <User size={18} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {getUserMenuContent()}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <LanguageSelector />
            
            <button className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-secondary text-foreground transition-all hover:bg-secondary/80" onClick={toggleMenu} aria-label="Toggle menu">
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div className={cn("fixed inset-0 bg-white z-40 transition-transform duration-500 ease-out-expo pt-20", isOpen ? "translate-x-0" : "translate-x-full")}>
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col space-y-6">
            <Link to="/" className="text-lg font-medium py-2 border-b border-border">
              {t ? t('navHome') : 'Home'}
            </Link>
            <Link to="/catalogo" className="text-lg font-medium py-2 border-b border-border">
              {t ? t('navCatalog') : 'Catalog'}
            </Link>
            <Link to="/about" className="text-lg font-medium py-2 border-b border-border">
              {t ? t('navAbout') : 'About'}
            </Link>
            <Link to="/contact" className="text-lg font-medium py-2 border-b border-border">
              {t ? t('navContact') : 'Contact'}
            </Link>
            {isAuthenticated ? <>
                {isAdmin && <Link to="/admin" className="text-lg font-medium py-2 border-b border-border">
                    Admin
                  </Link>}
                <Link to="/profile" className="text-lg font-medium py-2 border-b border-border">
                  Profile
                </Link>
                <Link to="/orders" className="text-lg font-medium py-2 border-b border-border">
                  Orders
                </Link>
                <button onClick={logout} className="text-lg font-medium py-2 border-b border-border text-left text-red-500">
                  Logout
                </button>
              </> : <>
                <Link to="/login" className="text-lg font-medium py-2 border-b border-border">
                  {t ? t('navLogin') : 'Login'}
                </Link>
                <Link to="/register" className="text-lg font-medium py-2 border-b border-border">
                  {t ? t('navRegister') : 'Register'}
                </Link>
              </>}
          </div>
        </div>
      </div>
    </header>;
};

export default Navbar;
