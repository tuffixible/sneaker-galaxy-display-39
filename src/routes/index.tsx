import { lazy, Suspense } from "react";
import AdminLayout from "../components/admin/AdminLayout";

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex h-full w-full items-center justify-center p-8">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
  </div>
);

// Helper function to wrap lazy components with Suspense
const lazyLoad = (importFunc) => {
  const LazyComponent = lazy(importFunc);
  return (props) => (
    <Suspense fallback={<LoadingFallback />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

// Lazy loaded pages with proper Suspense handling
const Index = lazyLoad(() => import("../pages/Index"));
const Catalogo = lazyLoad(() => import("../pages/Catalogo"));
const About = lazyLoad(() => import("../pages/About"));
const Contact = lazyLoad(() => import("../pages/Contact"));
const ProductDetail = lazyLoad(() => import("../pages/ProductDetail"));
const Login = lazyLoad(() => import("../pages/Login"));
const Register = lazyLoad(() => import("../pages/Register"));
const Profile = lazyLoad(() => import("../pages/Profile"));
const Orders = lazyLoad(() => import("../pages/Orders"));
const Cart = lazyLoad(() => import("../pages/Cart"));
const NotFound = lazyLoad(() => import("../pages/NotFound"));
const FAQ = lazyLoad(() => import("../pages/FAQ"));
const SizeGuide = lazyLoad(() => import("../pages/SizeGuide"));
const Returns = lazyLoad(() => import("../pages/Returns"));
const Shipping = lazyLoad(() => import("../pages/Shipping"));

// Admin Pages
const Dashboard = lazyLoad(() => import("../pages/admin/Dashboard"));
const Products = lazyLoad(() => import("../pages/admin/Products"));
const ProductCreate = lazyLoad(() => import("../pages/admin/ProductCreate"));
const ProductEdit = lazyLoad(() => import("../pages/admin/ProductEdit"));
const Orders_Admin = lazyLoad(() => import("../pages/admin/Orders"));
const Customers = lazyLoad(() => import("../pages/admin/Customers"));
const Reports = lazyLoad(() => import("../pages/admin/Reports"));
const Finances = lazyLoad(() => import("../pages/admin/Finances"));
const SiteContent = lazyLoad(() => import("../pages/admin/SiteContent"));
const SiteConfig = lazyLoad(() => import("../pages/admin/SiteConfig"));
const Inventory = lazyLoad(() => import("../pages/admin/inventory"));

export const routes = [
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/catalogo",
    element: <Catalogo />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/product/:id",
    element: <ProductDetail />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/orders",
    element: <Orders />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/faq",
    element: <FAQ />,
  },
  {
    path: "/size-guide",
    element: <SizeGuide />,
  },
  {
    path: "/returns",
    element: <Returns />,
  },
  {
    path: "/shipping",
    element: <Shipping />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "products/new",
        element: <ProductCreate />,
      },
      {
        path: "products/edit/:id",
        element: <ProductEdit />,
      },
      {
        path: "inventory",
        element: <Inventory />,
      },
      {
        path: "orders",
        element: <Orders_Admin />,
      },
      {
        path: "customers",
        element: <Customers />,
      },
      {
        path: "reports",
        element: <Reports />,
      },
      {
        path: "finances",
        element: <Finances />,
      },
      {
        path: "site-content",
        element: <SiteContent />,
      },
      {
        path: "site-config",
        element: <SiteConfig />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
