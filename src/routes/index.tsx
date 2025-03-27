
import { lazy } from "react";
import AdminLayout from "../components/admin/AdminLayout";

// Lazy loaded pages
const Index = lazy(() => import("../pages/Index"));
const Catalogo = lazy(() => import("../pages/Catalogo"));
const About = lazy(() => import("../pages/About"));
const Contact = lazy(() => import("../pages/Contact"));
const ProductDetail = lazy(() => import("../pages/ProductDetail"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Profile = lazy(() => import("../pages/Profile"));
const Orders = lazy(() => import("../pages/Orders"));
const Cart = lazy(() => import("../pages/Cart"));
const NotFound = lazy(() => import("../pages/NotFound"));
const FAQ = lazy(() => import("../pages/FAQ"));
const SizeGuide = lazy(() => import("../pages/SizeGuide"));
const Returns = lazy(() => import("../pages/Returns"));
const Shipping = lazy(() => import("../pages/Shipping"));

// Admin Pages
const Dashboard = lazy(() => import("../pages/admin/Dashboard"));
const Products = lazy(() => import("../pages/admin/Products"));
const ProductCreate = lazy(() => import("../pages/admin/ProductCreate"));
const ProductEdit = lazy(() => import("../pages/admin/ProductEdit"));
const Orders_Admin = lazy(() => import("../pages/admin/Orders"));
const Customers = lazy(() => import("../pages/admin/Customers"));
const Reports = lazy(() => import("../pages/admin/Reports"));
const Finances = lazy(() => import("../pages/admin/Finances"));
const SiteContent = lazy(() => import("../pages/admin/SiteContent"));
const SiteConfig = lazy(() => import("../pages/admin/SiteConfig"));
const Inventory = lazy(() => import("../pages/admin/Inventory"));

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
