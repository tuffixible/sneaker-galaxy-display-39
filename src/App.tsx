
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import Catalogo from "./pages/Catalogo";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Shipping from "./pages/Shipping";
import Returns from "./pages/Returns";
import SizeGuide from "./pages/SizeGuide";
import FAQ from "./pages/FAQ";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";

// Admin pages
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import SiteConfig from "./pages/admin/SiteConfig";

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
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LanguageProvider>
          <TooltipProvider>
            <CartProvider>
              <Toaster />
              <Sonner />
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/catalogo" element={<Catalogo />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/orders" element={<Orders />} />
                
                {/* Static Pages */}
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/shipping" element={<Shipping />} />
                <Route path="/returns" element={<Returns />} />
                <Route path="/size-guide" element={<SizeGuide />} />
                <Route path="/faq" element={<FAQ />} />
                
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="products" element={<Products />} />
                  <Route path="site-config" element={<SiteConfig />} />
                </Route>
                
                {/* Catch-all route for 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </CartProvider>
          </TooltipProvider>
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;

