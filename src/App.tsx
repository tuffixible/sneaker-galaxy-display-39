
import React, { useEffect, useState } from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Providers from "./components/Providers";
import { routes } from "./routes";

// Create a component for rendering routes
const AppRoutes = () => {
  return useRoutes(routes);
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
    name: 'Xible Store',
    favicon: '/logo.svg',
    logo: '/logo.svg',
  });
  
  // Set favicon and other document head elements
  useEffect(() => {
    // Load settings from localStorage
    const loadSettings = () => {
      const savedSettings = localStorage.getItem('storeSettings');
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        setStoreSettings(parsedSettings);
        
        // Update document head with the loaded settings
        updateDocumentHead(parsedSettings);
      }
    };
    
    // Initial load
    loadSettings();
    
    // Listen for settings updates
    const handleSettingsUpdate = (event) => {
      // If specific field was updated
      if (event.detail.field) {
        setStoreSettings(prev => ({
          ...prev,
          [event.detail.field]: event.detail.value
        }));
        
        // Update just that specific element
        if (event.detail.field === 'favicon') {
          updateFavicon(event.detail.value);
        }
      } 
      // If all settings were updated
      else if (event.detail.type === 'all') {
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
  const updateDocumentHead = (settings) => {
    // Update favicon
    updateFavicon(settings.favicon);
    
    // Update title
    document.title = settings.name || 'Xible Store | Admin';
    
    // You could also update other meta tags here if needed
  };
  
  // Function to update just the favicon
  const updateFavicon = (faviconUrl) => {
    if (!faviconUrl) return;
    
    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = faviconUrl;
    
    console.log('Favicon updated to:', faviconUrl);
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
