import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Home,
  Package,
  DollarSign,
  ShoppingBag,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Store,
  Users,
  ScrollText,
  Database,
  Image
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import LanguageSelector from '../LanguageSelector';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const AdminSidebar = () => {
  const { logout, user } = useAuth();
  const { t, language } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  // Multilingual menu items
  const getMenuItems = () => {
    switch(language) {
      case 'pt':
        return {
          dashboard: "Painel",
          products: "Produtos",
          inventory: "Estoque",
          orders: "Pedidos",
          customers: "Clientes",
          reports: "Relatórios",
          finances: "Finanças",
          settings: "Configurações",
          siteContent: "Conteúdo do Site",
          viewStore: "Ver Loja",
          logout: "Sair"
        };
      case 'es':
        return {
          dashboard: "Panel",
          products: "Productos",
          inventory: "Inventario",
          orders: "Pedidos",
          customers: "Clientes",
          reports: "Informes",
          finances: "Finanzas",
          settings: "Ajustes",
          siteContent: "Contenido del Sitio",
          viewStore: "Ver Tienda",
          logout: "Cerrar Sesión"
        };
      default: // 'en'
        return {
          dashboard: "Dashboard",
          products: "Products",
          inventory: "Inventory",
          orders: "Orders",
          customers: "Customers",
          reports: "Reports",
          finances: "Finances",
          settings: "Settings",
          siteContent: "Site Content",
          viewStore: "View Store",
          logout: "Logout"
        };
    }
  };
  
  const menuItems = getMenuItems();
  
  const sidebarLinks = [
    { name: menuItems.dashboard, icon: Home, path: '/admin' },
    { name: menuItems.products, icon: Package, path: '/admin/products' },
    { name: menuItems.inventory, icon: Database, path: '/admin/inventory' },
    { name: menuItems.orders, icon: ShoppingBag, path: '/admin/orders' },
    { name: menuItems.customers, icon: Users, path: '/admin/customers' },
    { name: menuItems.reports, icon: ScrollText, path: '/admin/reports' },
    { name: menuItems.finances, icon: DollarSign, path: '/admin/finances' },
    { name: menuItems.siteContent, icon: Store, path: '/admin/site-content' },
    { name: menuItems.settings, icon: Settings, path: '/admin/site-config' }
  ];
  
  const isActivePath = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };
  
  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      
      {/* Mobile toggle */}
      <button
        className="fixed top-4 left-4 z-50 lg:hidden bg-primary text-primary-foreground h-10 w-10 rounded-md flex items-center justify-center"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-40 transition-all duration-300 bg-card border-r shadow-sm flex flex-col",
          isCollapsed ? "w-20" : "w-72",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b h-16">
          {!isCollapsed && (
            <Link to="/admin" className="text-xl font-bold truncate">
              Xible Admin
            </Link>
          )}
          
          <button
            className="h-8 w-8 rounded-md flex items-center justify-center bg-secondary hover:bg-secondary/80 transition-colors lg:block hidden"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
        
        <div className="flex flex-col flex-grow p-4 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-md transition-colors",
                isActivePath(link.path)
                  ? "bg-primary/10 text-primary font-medium"
                  : "hover:bg-muted text-foreground/80"
              )}
            >
              <link.icon size={20} />
              {!isCollapsed && <span>{link.name}</span>}
            </Link>
          ))}
          
          {/* Informação sobre formatos de imagem */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-md text-muted-foreground mt-4",
                  isCollapsed ? "justify-center" : ""
                )}>
                  <Image size={20} />
                  {!isCollapsed && <span className="text-xs">{t('adminImageFormats')}</span>}
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{t('adminImageFormats')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="p-4 border-t space-y-4">
          {!isCollapsed && (
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                {user?.name?.charAt(0).toUpperCase() || 'A'}
              </div>
              <div className="truncate">
                <p className="font-medium truncate">{user?.name || 'Admin'}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email || 'admin@xiblestore.com'}</p>
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <Link
              to="/"
              className="flex items-center space-x-3 px-3 py-2 rounded-md transition-colors hover:bg-muted w-full"
            >
              <Store size={20} />
              {!isCollapsed && <span>{menuItems.viewStore}</span>}
            </Link>
            
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="flex items-center space-x-3 px-3 py-2 rounded-md transition-colors hover:bg-destructive/10 hover:text-destructive w-full justify-start"
            >
              <LogOut size={20} />
              {!isCollapsed && <span>{menuItems.logout}</span>}
            </Button>
          </div>
          
          {!isCollapsed && (
            <div className="mt-4">
              <LanguageSelector />
            </div>
          )}
        </div>
      </aside>
      
      {/* Sidebar spacer for layout */}
      <div className={cn(
        "hidden lg:block",
        isCollapsed ? "w-20" : "w-72"
      )} />
    </>
  );
};

export default AdminSidebar;
