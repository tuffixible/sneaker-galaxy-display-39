
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
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
  const [logo, setLogo] = useState('/images/logo.svg');
  const [storeName, setStoreName] = useState('Xible Shoes');
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, totalItems } = useCart();
  const { t } = useLanguage();
  const { user, isAuthenticated, isAdmin } = useAuth();
  const isMobile = useIsMobile();
  const { theme, toggleTheme } = useTheme();

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

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-primary font-bold' : '';
  };

  const { isEditing } = useEditMode();

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isSticky 
        ? 'bg-white shadow-md py-3' 
        : 'bg-white/90 backdrop-blur-lg py-4'
    }`}>
      <div className="container mx-auto px-4 md:px-6">
        <nav className="flex items-center justify-between">
          {/* Logo and Brand Name */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <img 
              src={logo} 
              alt={storeName} 
              className="h-12 w-auto object-contain transition-transform hover:scale-110" 
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/images/logo.svg';
              }}
            />
            <EditableLink 
              to="/"
              className="text-xl font-bold hidden sm:block text-blue-700 hover:text-blue-500 transition-colors"
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
          <div className="hidden md:flex items-center space-x-1">
            <EditableLink 
              to="/" 
              className={`px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-50 transition-colors ${isActive('/')}`} 
              isEditing={isEditing}
            >
              {t('navHome') || 'Início'}
            </EditableLink>
            <EditableLink 
              to="/catalogo" 
              className={`px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-50 transition-colors ${isActive('/catalogo')}`} 
              isEditing={isEditing}
            >
              {t('navCatalog') || 'Catálogo'}
            </EditableLink>
            <EditableLink 
              to="/about" 
              className={`px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-50 transition-colors ${isActive('/about')}`} 
              isEditing={isEditing}
            >
              {t('navAbout') || 'Sobre nós'}
            </EditableLink>
            <EditableLink 
              to="/contact" 
              className={`px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-50 transition-colors ${isActive('/contact')}`} 
              isEditing={isEditing}
            >
              {t('navContact') || 'Contato'}
            </EditableLink>
            {isAdmin && (
              <Link 
                to="/admin" 
                className={`px-4 py-2 rounded-full text-sm font-medium text-primary hover:bg-blue-50 transition-colors ${isActive('/admin')}`}
              >
                Admin
              </Link>
            )}
          </div>

          {/* Search & Cart */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder={t('search') || 'Buscar'}
                className="w-40 lg:w-60 py-2 px-4 pr-10 text-sm rounded-full bg-blue-50 border-0 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white"
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
                className="rounded-full bg-blue-50 hover:bg-blue-100" 
                onClick={() => navigate('/profile')}
              >
                <User className="text-blue-700" />
              </Button>
            ) : (
              <Button 
                variant="default" 
                size="sm"
                className="rounded-full bg-blue-500 hover:bg-blue-600 text-white"
                onClick={() => navigate('/login')}
              >
                {t('login') || 'Entrar'}
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full bg-blue-50 hover:bg-blue-100"
              onClick={() => navigate('/cart')}
            >
              <ShoppingCart className="text-blue-700" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
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
              className="relative rounded-full bg-blue-50 hover:bg-blue-100"
              onClick={() => navigate('/cart')}
            >
              <ShoppingCart className="text-blue-700" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-blue-50 hover:bg-blue-100"
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
            <Link to="/" className="px-4 py-3 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors flex items-center" onClick={() => setIsMenuOpen(false)}>
              {t('home') || 'Início'}
            </Link>
            <Link to="/catalogo" className="px-4 py-3 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors flex items-center" onClick={() => setIsMenuOpen(false)}>
              {t('catalog') || 'Catálogo'}
            </Link>
            <Link to="/about" className="px-4 py-3 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors flex items-center" onClick={() => setIsMenuOpen(false)}>
              {t('about') || 'Sobre nós'}
            </Link>
            <Link to="/contact" className="px-4 py-3 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors flex items-center" onClick={() => setIsMenuOpen(false)}>
              {t('contact') || 'Contato'}
            </Link>
            
            {isAdmin && (
              <Link to="/admin" className="px-4 py-3 rounded-lg text-sm font-medium text-primary hover:bg-blue-50 transition-colors flex items-center" onClick={() => setIsMenuOpen(false)}>
                {t('admin') || 'Admin'}
              </Link>
            )}
            
            {isAuthenticated ? (
              <Link to="/profile" className="px-4 py-3 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors flex items-center" onClick={() => setIsMenuOpen(false)}>
                <User className="h-4 w-4 mr-2" />
                {t('profile') || 'Perfil'}
              </Link>
            ) : (
              <Link to="/login" className="px-4 py-3 rounded-lg text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors flex items-center justify-center" onClick={() => setIsMenuOpen(false)}>
                {t('login') || 'Entrar'}
              </Link>
            )}
            
            <form onSubmit={handleSearch} className="relative mt-2">
              <input
                type="text"
                placeholder={t('search') || 'Buscar'}
                className="w-full py-3 px-4 pr-10 text-sm rounded-lg bg-blue-50 border-0 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white"
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
