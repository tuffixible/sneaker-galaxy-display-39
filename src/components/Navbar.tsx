
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, Search } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEditMode } from '@/contexts/EditModeContext';
import { EditableLink } from './editable/EditableLink';
import LanguageSelector from './LanguageSelector';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from './ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [logo, setLogo] = useState('/logo.svg');
  const [storeName, setStoreName] = useState('Xible Shoes');
  const navigate = useNavigate();
  const { cartItems, totalItems } = useCart();
  const { t } = useLanguage();
  const { user, isAuthenticated, isAdmin } = useAuth();
  const isMobile = useIsMobile();
  const { theme } = useTheme();

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
  
  // Load store logo and name
  useEffect(() => {
    const loadStoreSettings = () => {
      const settings = JSON.parse(localStorage.getItem('storeSettings') || '{}');
      if (settings.logo) {
        setLogo(settings.logo);
      }
      if (settings.name) {
        setStoreName(settings.name);
      }
    };
    
    loadStoreSettings();
    
    const handleSettingsUpdate = () => {
      loadStoreSettings();
    };
    
    window.addEventListener('storeSettingsUpdated', handleSettingsUpdate);
    
    return () => {
      window.removeEventListener('storeSettingsUpdated', handleSettingsUpdate);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/catalogo?search=${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
      setIsMenuOpen(false);
    }
  };

  const { isEditing } = useEditMode();

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isSticky 
        ? 'bg-blue-50 shadow-md py-2' 
        : 'bg-blue-50/90 backdrop-blur-lg py-4'
    }`}>
      <div className="container mx-auto px-4 md:px-6">
        <nav className="flex items-center justify-between">
          {/* Logo and Brand Name */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <img 
              src={logo} 
              alt={storeName} 
              className="h-10 w-auto object-contain transition-transform hover:scale-105" 
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/logo.svg';
              }}
            />
            <EditableLink 
              to="/"
              className="text-lg font-semibold hidden sm:block text-blue-900 hover:text-blue-700 transition-colors"
              isEditing={isEditing}
              onSave={(text) => {
                setStoreName(text);
                localStorage.setItem('storeSettings', JSON.stringify({ ...JSON.parse(localStorage.getItem('storeSettings') || '{}'), name: text }));
              }}
            >
              {storeName}
            </EditableLink>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <EditableLink to="/" className="text-sm font-medium text-blue-800 hover:text-primary transition-colors" isEditing={isEditing}>{t('navHome')}</EditableLink>
            <EditableLink to="/catalogo" className="text-sm font-medium text-blue-800 hover:text-primary transition-colors" isEditing={isEditing}>{t('navCatalog')}</EditableLink>
            <EditableLink to="/about" className="text-sm font-medium text-blue-800 hover:text-primary transition-colors" isEditing={isEditing}>{t('navAbout')}</EditableLink>
            <EditableLink to="/contact" className="text-sm font-medium text-blue-800 hover:text-primary transition-colors" isEditing={isEditing}>{t('navContact')}</EditableLink>
            {isAdmin && (
              <Link to="/admin" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                Admin
              </Link>
            )}
          </div>

          {/* Search & Cart */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder={t('search')}
                className="w-40 lg:w-60 py-1.5 px-3 pr-8 text-sm rounded-full bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-700">
                <Search className="h-4 w-4" />
              </button>
            </form>

            <LanguageSelector />

            {isAuthenticated ? (
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full bg-white/50 hover:bg-white/80" 
                onClick={() => navigate('/profile')}
              >
                <User className="text-blue-700" />
              </Button>
            ) : (
              <Button 
                variant="ghost" 
                className="text-sm font-medium text-blue-800 hover:text-primary hover:bg-white/50"
                onClick={() => navigate('/login')}
              >
                {t('login')}
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full bg-white/50 hover:bg-white/80"
              onClick={() => navigate('/cart')}
            >
              <ShoppingCart className="text-blue-700" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {totalItems}
                </span>
              )}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full bg-white/50 hover:bg-white/80"
              onClick={() => navigate('/cart')}
            >
              <ShoppingCart className="text-blue-700" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {totalItems}
                </span>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-white/50 hover:bg-white/80"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="text-blue-700" /> : <Menu className="text-blue-700" />}
            </Button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-blue-100 px-4 py-6 shadow-lg animate-fade-in">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="text-sm font-medium text-blue-800 hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>{t('home') || 'Home'}</Link>
            <Link to="/catalogo" className="text-sm font-medium text-blue-800 hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>{t('catalog') || 'Catalog'}</Link>
            <Link to="/about" className="text-sm font-medium text-blue-800 hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>{t('about') || 'About Us'}</Link>
            <Link to="/contact" className="text-sm font-medium text-blue-800 hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>{t('contact') || 'Contact'}</Link>
            
            {isAdmin && (
              <Link to="/admin" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors" onClick={() => setIsMenuOpen(false)}>
                {t('admin') || 'Admin'}
              </Link>
            )}
            
            {isAuthenticated ? (
              <Link to="/profile" className="text-sm font-medium text-blue-800 hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>{t('profile')}</Link>
            ) : (
              <Link to="/login" className="text-sm font-medium text-blue-800 hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>{t('login')}</Link>
            )}
            
            <form onSubmit={handleSearch} className="relative mt-2">
              <input
                type="text"
                placeholder={t('search')}
                className="w-full py-2 px-3 pr-8 text-sm rounded-full bg-blue-50 focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-700">
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
