
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, Search } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [logo, setLogo] = useState('/logo.svg');
  const navigate = useNavigate();
  const { cartItems, totalItems } = useCart();
  const { t } = useLanguage();
  const { user, isAuthenticated, isAdmin } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Carregar logo do site
  useEffect(() => {
    const loadStoreLogo = () => {
      const settings = JSON.parse(localStorage.getItem('storeSettings') || '{}');
      if (settings.logo) {
        setLogo(settings.logo);
      }
    };
    
    loadStoreLogo();
    
    const handleSettingsUpdate = () => {
      loadStoreLogo();
    };
    
    window.addEventListener('storeSettingsUpdated', handleSettingsUpdate);
    
    return () => {
      window.removeEventListener('storeSettingsUpdated', handleSettingsUpdate);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Navigate to search page or filter
      navigate(`/catalogo?search=${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isSticky ? 'bg-background shadow-md py-2' : 'bg-background/80 backdrop-blur-lg py-4'
    }`}>
      <div className="container mx-auto px-4 md:px-6">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img 
              src={logo} 
              alt="Xible Shoes" 
              className="h-10 w-auto object-contain" 
              onError={(e) => {
                // Fallback to default logo if custom logo fails to load
                const target = e.target as HTMLImageElement;
                target.src = '/logo.svg'; 
                console.log('Error loading custom logo, falling back to default');
              }}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">{t('home') || 'Início'}</Link>
            <Link to="/catalogo" className="text-sm font-medium hover:text-primary transition-colors">{t('catalog')}</Link>
            <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">{t('about')}</Link>
            <Link to="/contact" className="text-sm font-medium hover:text-primary transition-colors">{t('contact')}</Link>
            {isAdmin && (
              <Link to="/admin" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                {t('admin') || 'Admin'}
              </Link>
            )}
          </div>

          {/* Search & Cart */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder={t('search')}
                className="w-40 lg:w-60 py-1.5 px-3 pr-8 text-sm rounded-full bg-secondary/30 focus:outline-none focus:ring-1 focus:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground">
                <Search className="h-4 w-4" />
              </button>
            </form>

            <LanguageSelector />

            {isAuthenticated ? (
              <Link to="/profile" className="relative flex items-center justify-center h-9 w-9 rounded-full bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <User className="h-5 w-5" />
              </Link>
            ) : (
              <Link to="/login" className="text-sm font-medium hover:text-primary transition-colors">{t('login')}</Link>
            )}

            <Link to="/cart" className="relative flex items-center justify-center h-9 w-9 rounded-full bg-secondary/30 hover:bg-secondary/50 transition-colors">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-4">
            <Link to="/cart" className="relative flex items-center justify-center h-9 w-9 rounded-full bg-secondary/30">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={toggleMenu}
              className="flex items-center justify-center h-9 w-9 rounded-full bg-secondary/30"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border/10 px-4 py-6">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="text-sm font-medium" onClick={() => setIsMenuOpen(false)}>{t('home') || 'Início'}</Link>
            <Link to="/catalogo" className="text-sm font-medium" onClick={() => setIsMenuOpen(false)}>{t('catalog')}</Link>
            <Link to="/about" className="text-sm font-medium" onClick={() => setIsMenuOpen(false)}>{t('about')}</Link>
            <Link to="/contact" className="text-sm font-medium" onClick={() => setIsMenuOpen(false)}>{t('contact')}</Link>
            
            {isAdmin && (
              <Link to="/admin" className="text-sm font-medium text-primary" onClick={() => setIsMenuOpen(false)}>
                {t('admin') || 'Admin'}
              </Link>
            )}
            
            {isAuthenticated ? (
              <Link to="/profile" className="text-sm font-medium" onClick={() => setIsMenuOpen(false)}>{t('profile')}</Link>
            ) : (
              <Link to="/login" className="text-sm font-medium" onClick={() => setIsMenuOpen(false)}>{t('login')}</Link>
            )}
            
            <form onSubmit={handleSearch} className="relative mt-2">
              <input
                type="text"
                placeholder={t('search')}
                className="w-full py-2 px-3 pr-8 text-sm rounded-full bg-secondary/30 focus:outline-none focus:ring-1 focus:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground">
                <Search className="h-4 w-4" />
              </button>
            </form>
            
            <div className="pt-2">
              <LanguageSelector />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
