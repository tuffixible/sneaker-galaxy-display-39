
import { RouteObject } from "react-router-dom";

// Public Pages
import Index from "@/pages/Index";
import ProductDetail from "@/pages/ProductDetail";
import Catalogo from "@/pages/Catalogo";
import Cart from "@/pages/Cart";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Profile from "@/pages/Profile";
import Orders from "@/pages/Orders";

// Static Pages
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Shipping from "@/pages/Shipping";
import Returns from "@/pages/Returns";
import SizeGuide from "@/pages/SizeGuide";
import FAQ from "@/pages/FAQ";
import NotFound from "@/pages/NotFound";

// Admin Pages
import AdminLayout from "@/components/admin/AdminLayout";
import Dashboard from "@/pages/admin/Dashboard";
import Products from "@/pages/admin/Products";
import ProductEdit from "@/pages/admin/ProductEdit";
import AdminOrders from "@/pages/admin/Orders";
import Customers from "@/pages/admin/Customers";
import Reports from "@/pages/admin/Reports";
import Finances from "@/pages/admin/Finances";
import SiteContent from "@/pages/admin/SiteContent";
import SiteConfig from "@/pages/admin/SiteConfig";
import Inventory from "@/pages/admin/Inventory";

export const routes: RouteObject[] = [
  // Public Routes
  {
    path: "/",
    element: <Index />
  },
  {
    path: "/product/:id",
    element: <ProductDetail />
  },
  {
    path: "/catalogo",
    element: <Catalogo />
  },
  {
    path: "/cart",
    element: <Cart />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/orders",
    element: <Orders />
  },
  
  // Static Pages
  {
    path: "/about",
    element: <About />
  },
  {
    path: "/contact",
    element: <Contact />
  },
  {
    path: "/shipping",
    element: <Shipping />
  },
  {
    path: "/returns",
    element: <Returns />
  },
  {
    path: "/size-guide",
    element: <SizeGuide />
  },
  {
    path: "/faq",
    element: <FAQ />
  },
  
  // Admin Routes
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: "products",
        element: <Products />
      },
      {
        path: "products/edit/:id",
        element: <ProductEdit />
      },
      {
        path: "products/new",
        element: <ProductEdit />
      },
      {
        path: "orders",
        element: <AdminOrders />
      },
      {
        path: "customers",
        element: <Customers />
      },
      {
        path: "reports",
        element: <Reports />
      },
      {
        path: "finances",
        element: <Finances />
      },
      {
        path: "site-content",
        element: <SiteContent />
      },
      {
        path: "inventory",
        element: <Inventory />
      },
      {
        path: "site-config",
        element: <SiteConfig />
      }
    ]
  },
  
  // Catch-all route for 404
  {
    path: "*",
    element: <NotFound />
  }
];
