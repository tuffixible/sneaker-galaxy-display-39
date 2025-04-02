
import React, { useEffect, useState, Suspense } from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Providers from "./components/Providers";
import { routes } from "./routes";

// Create a component for rendering routes with Suspense
const AppRoutes = () => {
  const routeElements = useRoutes(routes);
  return (
    <Suspense fallback={<div className="flex h-screen w-full items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
    </div>}>
      {routeElements}
    </Suspense>
  );
};

// Create the query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false
    }
  }
});

const App = () => {
  // State for store settings
  const [storeSettings, setStoreSettings] = useState({
    name: 'Xible Shoes',
    favicon: '/logo.svg',
    logo: '/logo.svg',
    socialLinks: {
      whatsapp: '5511999999999',
      instagram: 'xiblestore'
    }
  });
  
  // Set favicon and other document head elements
  useEffect(() => {
    // Load settings from localStorage
    const loadSettings = () => {
      const savedSettings = localStorage.getItem('storeSettings');
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        setStoreSettings(prevSettings => ({
          ...prevSettings,
          ...parsedSettings
        }));
        
        // Update document head with the loaded settings
        updateDocumentHead(parsedSettings);
      }
    };
    
    // Initial load
    loadSettings();
    
    // Listen for settings updates
    const handleSettingsUpdate = (event: any) => {
      // If specific field was updated
      if (event.detail?.field) {
        setStoreSettings(prev => ({
          ...prev,
          [event.detail.field]: event.detail.value
        }));
        
        // Update just that specific element
        if (event.detail.field === 'favicon') {
          updateFavicon(event.detail.value);
        } else if (event.detail.field === 'name') {
          document.title = event.detail.value || 'Xible Shoes';
        } else if (event.detail.field === 'logo') {
          // The logo is handled in components using storeSettings
          console.log('Logo updated:', event.detail.value);
          // Force update all components that use the logo
          window.dispatchEvent(new Event('storeSettingsUpdated'));
        }
      } 
      // If all settings were updated
      else if (event.detail?.type === 'all' || !event.detail) {
        loadSettings();
      }
    };
    
    window.addEventListener('storeSettingsUpdated', handleSettingsUpdate);
    
    // Cleanup
    return () => {
      window.removeEventListener('storeSettingsUpdated', handleSettingsUpdate);
    };
  }, []);
  
  // Function to update document head elements
  const updateDocumentHead = (settings: any) => {
    // Update favicon
    if (settings.favicon) {
      updateFavicon(settings.favicon);
    }
    
    // Update title
    document.title = settings.name || 'Xible Shoes';
    
    // You could also update other meta tags here if needed
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && settings.description) {
      metaDescription.setAttribute('content', settings.description);
    }
  };
  
  // Function to update just the favicon
  const updateFavicon = (faviconUrl: string) => {
    if (!faviconUrl) return;
    
    // Force cache update by adding timestamp
    const timestamp = new Date().getTime();
    const faviconUrlWithCache = faviconUrl.includes('?') 
      ? `${faviconUrl}&t=${timestamp}` 
      : `${faviconUrl}?t=${timestamp}`;
    
    // Update all favicon links
    const links = document.querySelectorAll("link[rel*='icon']");
    
    // If no icons exist, create a new one
    if (links.length === 0) {
      const link = document.createElement('link');
      link.type = 'image/x-icon'; // Use a generic type that works for multiple formats
      link.rel = 'icon';
      link.href = faviconUrlWithCache;
      document.head.appendChild(link);
    } else {
      // Update all existing icons
      links.forEach(link => {
        if (link instanceof HTMLLinkElement) {
          // Set type based on file extension
          if (faviconUrl.endsWith('.svg')) {
            link.type = 'image/svg+xml';
          } else if (faviconUrl.endsWith('.png')) {
            link.type = 'image/png';
          } else if (faviconUrl.endsWith('.jpg') || faviconUrl.endsWith('.jpeg')) {
            link.type = 'image/jpeg';
          } else if (faviconUrl.endsWith('.webp')) {
            link.type = 'image/webp';
          } else if (faviconUrl.endsWith('.avif')) {
            link.type = 'image/avif';
          } else {
            link.type = 'image/x-icon'; // Default
          }
          link.href = faviconUrlWithCache;
        }
      });
    }
    
    console.log('Favicon updated to:', faviconUrlWithCache);
  };

  return (
    <BrowserRouter>
      <Providers queryClient={queryClient}>
        <AppRoutes />
      </Providers>
    </BrowserRouter>
  );
};

export default App;
