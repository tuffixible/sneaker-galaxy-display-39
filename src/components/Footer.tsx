
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t, language } = useLanguage();
  
  // Translated description based on current language
  const getDescription = () => {
    switch(language) {
      case 'pt':
        return "Catálogo premium de tênis apresentando os últimos estilos e clássicos favoritos. Encontre seu par perfeito com nossa coleção selecionada.";
      case 'es':
        return "Catálogo premium de zapatillas que muestra los últimos estilos y los clásicos favoritos. Encuentra tu par perfecto con nuestra colección seleccionada.";
      default: // 'en'
        return "Premium sneaker catalog showcasing the latest styles and classic favorites. Find your perfect pair with our curated collection.";
    }
  };
  
  return (
    <footer className="bg-secondary py-16 px-6 md:px-8">
      <div className="container max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Link to="/" className="text-2xl font-bold tracking-tight">
              Xible Store
            </Link>
            <p className="mt-4 text-muted-foreground max-w-md">
              {getDescription()}
            </p>
            <div className="mt-6 flex space-x-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-background text-foreground transition-all hover:bg-foreground hover:text-background"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-background text-foreground transition-all hover:bg-foreground hover:text-background"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-background text-foreground transition-all hover:bg-foreground hover:text-background"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('footerNavigation')}</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('navHome')}
                </Link>
              </li>
              <li>
                <Link to="/catalogo" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('navCatalog')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('navAbout')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('navContact')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('footerCustomerCare')}</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/shipping" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('footerShippingInfo')}
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('footerReturns')}
                </Link>
              </li>
              <li>
                <Link to="/size-guide" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('footerSizeGuide')}
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('footerFAQ')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {currentYear} Xible Store. {t('footerRights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
