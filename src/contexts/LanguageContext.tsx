import React, { createContext, useContext, useState, useEffect } from 'react';

// Define available languages
export type Language = 'pt' | 'en' | 'es';

// Interface for translations
export interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

// Define translations for the app
export const translations: Translations = {
  // Navigation
  navHome: {
    en: 'Home',
    pt: 'Início',
    es: 'Inicio'
  },
  navCatalog: {
    en: 'Catalog',
    pt: 'Catálogo',
    es: 'Catálogo'
  },
  navAbout: {
    en: 'About',
    pt: 'Sobre nós',
    es: 'Acerca de'
  },
  navContact: {
    en: 'Contact',
    pt: 'Contato',
    es: 'Contacto'
  },
  // Footer
  footerNavigation: {
    en: 'Navigation',
    pt: 'Navegação',
    es: 'Navegación'
  },
  footerCustomerCare: {
    en: 'Customer Care',
    pt: 'Atendimento ao Cliente',
    es: 'Atención al Cliente'
  },
  footerShippingInfo: {
    en: 'Shipping Info',
    pt: 'Informações de Envio',
    es: 'Información de Envío'
  },
  footerReturns: {
    en: 'Returns & Exchanges',
    pt: 'Devoluções e Trocas',
    es: 'Devoluciones y Cambios'
  },
  footerSizeGuide: {
    en: 'Size Guide',
    pt: 'Guia de Tamanhos',
    es: 'Guía de Tallas'
  },
  footerFAQ: {
    en: 'FAQ',
    pt: 'Perguntas Frequentes',
    es: 'Preguntas Frecuentes'
  },
  footerRights: {
    en: 'All rights reserved.',
    pt: 'Todos os direitos reservados.',
    es: 'Todos los derechos reservados.'
  },
  // Cart
  cartTitle: {
    en: 'Shopping Cart',
    pt: 'Carrinho de Compras',
    es: 'Carrito de Compras'
  },
  cartEmpty: {
    en: 'Your cart is empty',
    pt: 'Seu carrinho está vazio',
    es: 'Tu carrito está vacío'
  },
  cartTotal: {
    en: 'Total',
    pt: 'Total',
    es: 'Total'
  },
  cartCheckout: {
    en: 'Checkout',
    pt: 'Finalizar Compra',
    es: 'Finalizar Compra'
  },
  // Product
  productAddToCart: {
    en: 'Add to Cart',
    pt: 'Adicionar ao Carrinho',
    es: 'Añadir al Carrito'
  },
  productSize: {
    en: 'Size',
    pt: 'Tamanho',
    es: 'Talla'
  },
  productQuantity: {
    en: 'Quantity',
    pt: 'Quantidade',
    es: 'Cantidad'
  },
  // General
  viewDetails: {
    en: 'View details',
    pt: 'Ver detalhes',
    es: 'Ver detalles'
  },
  browseCatalog: {
    en: 'Browse catalog',
    pt: 'Navegar catálogo',
    es: 'Explorar catálogo'
  },
  languageSelector: {
    en: 'Language',
    pt: 'Idioma',
    es: 'Idioma'
  },
  // Admin
  adminImageFormats: {
    en: 'Compatible image formats: JPG, JPEG, PNG, GIF, WEBP and SVG',
    pt: 'Formatos de imagem compatíveis: JPG, JPEG, PNG, GIF, WEBP e SVG',
    es: 'Formatos de imagen compatibles: JPG, JPEG, PNG, GIF, WEBP y SVG'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get browser language or use default
  const getBrowserLanguage = (): Language => {
    const browserLang = navigator.language.split('-')[0];
    return (browserLang === 'pt' || browserLang === 'en' || browserLang === 'es') 
      ? browserLang as Language 
      : 'en';
  };

  // Initialize language from localStorage or browser language
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    return (savedLanguage === 'pt' || savedLanguage === 'en' || savedLanguage === 'es')
      ? savedLanguage as Language
      : getBrowserLanguage();
  });

  // Save language preference to localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('preferredLanguage', lang);
  };

  // Translation function
  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translations[key][language] || translations[key]['en'] || key;
  };

  // Set HTML lang attribute
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
