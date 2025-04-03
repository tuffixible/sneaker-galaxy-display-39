
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Home,
  Package,
  DollarSign,
  ShoppingBag,
  Settings,
  Store,
  Users,
  ScrollText,
  Database,
  Image
} from 'lucide-react';

interface MenuItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  isCollapsed: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ to, icon: Icon, label, isActive, isCollapsed }) => (
  <Link
    to={to}
    className={cn(
      "flex items-center space-x-3 px-3 py-2 rounded-md transition-colors",
      isActive
        ? "bg-primary/10 text-primary font-medium"
        : "hover:bg-muted text-foreground/80"
    )}
  >
    <Icon size={20} />
    {!isCollapsed && <span>{label}</span>}
  </Link>
);

interface AdminSidebarMenuProps {
  isCollapsed: boolean;
  currentPath: string;
  menuItems: {
    path: string;
    name: string;
    icon: React.ElementType;
  }[];
}

const AdminSidebarMenu: React.FC<AdminSidebarMenuProps> = ({
  isCollapsed,
  currentPath,
  menuItems
}) => {
  const isActivePath = (path: string) => {
    if (path === '/admin') {
      return currentPath === '/admin';
    }
    return currentPath.startsWith(path);
  };

  return (
    <div className="flex flex-col flex-grow p-4 space-y-1 overflow-y-auto">
      {menuItems.map((item) => (
        <MenuItem
          key={item.path}
          to={item.path}
          icon={item.icon}
          label={item.name}
          isActive={isActivePath(item.path)}
          isCollapsed={isCollapsed}
        />
      ))}
    </div>
  );
};

export default AdminSidebarMenu;
