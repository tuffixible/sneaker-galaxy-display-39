
import React, { useEffect } from "react";
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
  // Set favicon and other document head elements
  useEffect(() => {
    // This is where you would normally fetch from an API or backend
    // For now, we're using the static values
    const favicon = '/logo.svg'; // Default favicon from public directory
    
    // Update favicon link
    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = favicon;
    
    // You could also update other head elements like title, meta, etc.
    document.title = 'Xible Store | Admin';
  }, []);

  return (
    <BrowserRouter>
      <Providers queryClient={queryClient}>
        <AppRoutes />
      </Providers>
    </BrowserRouter>
  );
};

export default App;
