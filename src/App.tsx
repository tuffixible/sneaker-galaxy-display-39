
import React from "react";
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

const App = () => (
  <BrowserRouter>
    <Providers queryClient={queryClient}>
      <AppRoutes />
    </Providers>
  </BrowserRouter>
);

export default App;
