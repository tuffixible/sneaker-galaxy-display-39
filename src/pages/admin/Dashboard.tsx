
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Box, ShoppingBag, Users, Activity, TrendingUp, TrendingDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const Dashboard = () => {
  const { language } = useLanguage();
  
  // Multilingual content
  const getDashboardContent = () => {
    switch(language) {
      case 'pt':
        return {
          title: "Painel de Controle",
          welcome: "Bem-vindo ao painel de administração",
          summary: "Resumo da Loja",
          salesTitle: "Vendas Totais",
          today: "Hoje",
          thisWeek: "Esta Semana",
          thisMonth: "Este Mês",
          revenue: "Receita",
          orders: "Pedidos",
          products: "Produtos",
          customers: "Clientes",
          recentOrders: "Pedidos Recentes",
          salesOverview: "Visão Geral de Vendas",
          topProducts: "Produtos Mais Vendidos",
          increase: "Aumento",
          decrease: "Diminuição",
          inventoryStatus: "Status do Estoque",
          inStock: "Em Estoque",
          lowStock: "Estoque Baixo",
          outOfStock: "Sem Estoque",
          orderStatus: "Status dos Pedidos",
          processing: "Processando",
          shipped: "Enviado",
          delivered: "Entregue",
          cancelled: "Cancelado"
        };
      case 'es':
        return {
          title: "Panel de Control",
          welcome: "Bienvenido al panel de administración",
          summary: "Resumen de la Tienda",
          salesTitle: "Ventas Totales",
          today: "Hoy",
          thisWeek: "Esta Semana",
          thisMonth: "Este Mes",
          revenue: "Ingresos",
          orders: "Pedidos",
          products: "Productos",
          customers: "Clientes",
          recentOrders: "Pedidos Recientes",
          salesOverview: "Visión General de Ventas",
          topProducts: "Productos Más Vendidos",
          increase: "Aumento",
          decrease: "Disminución",
          inventoryStatus: "Estado del Inventario",
          inStock: "En Stock",
          lowStock: "Stock Bajo",
          outOfStock: "Sin Stock",
          orderStatus: "Estado de los Pedidos",
          processing: "Procesando",
          shipped: "Enviado",
          delivered: "Entregado",
          cancelled: "Cancelado"
        };
      default: // 'en'
        return {
          title: "Dashboard",
          welcome: "Welcome to the admin dashboard",
          summary: "Store Summary",
          salesTitle: "Total Sales",
          today: "Today",
          thisWeek: "This Week",
          thisMonth: "This Month",
          revenue: "Revenue",
          orders: "Orders",
          products: "Products",
          customers: "Customers",
          recentOrders: "Recent Orders",
          salesOverview: "Sales Overview",
          topProducts: "Top Selling Products",
          increase: "Increase",
          decrease: "Decrease",
          inventoryStatus: "Inventory Status",
          inStock: "In Stock",
          lowStock: "Low Stock",
          outOfStock: "Out of Stock",
          orderStatus: "Order Status",
          processing: "Processing",
          shipped: "Shipped",
          delivered: "Delivered",
          cancelled: "Cancelled"
        };
    }
  };
  
  const content = getDashboardContent();
  
  // Mock data for the dashboard
  const salesData = [
    { name: "Jan", sales: 4000 },
    { name: "Feb", sales: 3000 },
    { name: "Mar", sales: 5000 },
    { name: "Apr", sales: 4500 },
    { name: "May", sales: 6000 },
    { name: "Jun", sales: 5500 },
    { name: "Jul", sales: 7000 },
    { name: "Aug", sales: 8000 },
    { name: "Sep", sales: 7500 },
    { name: "Oct", sales: 9000 },
    { name: "Nov", sales: 8500 },
    { name: "Dec", sales: 10000 }
  ];
  
  const weeklyData = [
    { name: "Mon", sales: 1200 },
    { name: "Tue", sales: 1400 },
    { name: "Wed", sales: 1300 },
    { name: "Thu", sales: 1500 },
    { name: "Fri", sales: 1800 },
    { name: "Sat", sales: 2000 },
    { name: "Sun", sales: 1700 }
  ];
  
  const topProducts = [
    { name: "Nike Air Max Pulse", sales: 124, revenue: 19798.76 },
    { name: "Adidas Ultra Boost 22", sales: 98, revenue: 18619.02 },
    { name: "Jordan 1 Retro High", sales: 87, revenue: 14790.00 },
    { name: "New Balance 990v5", sales: 65, revenue: 12024.35 }
  ];
  
  const inventoryStatus = [
    { status: content.inStock, count: 145, color: "bg-green-500" },
    { status: content.lowStock, count: 28, color: "bg-yellow-500" },
    { status: content.outOfStock, count: 12, color: "bg-red-500" }
  ];
  
  const orderStatus = [
    { status: content.processing, count: 24, color: "bg-blue-500" },
    { status: content.shipped, count: 18, color: "bg-purple-500" },
    { status: content.delivered, count: 128, color: "bg-green-500" },
    { status: content.cancelled, count: 7, color: "bg-red-500" }
  ];
  
  // Stats cards data
  const stats = [
    {
      title: content.revenue,
      value: "$86,429.78",
      change: "+12.5%",
      isIncrease: true,
      icon: DollarSign,
      color: "text-green-500"
    },
    {
      title: content.orders,
      value: "1,845",
      change: "+8.2%",
      isIncrease: true,
      icon: ShoppingBag,
      color: "text-blue-500"
    },
    {
      title: content.products,
      value: "185",
      change: "+5.1%",
      isIncrease: true,
      icon: Box,
      color: "text-purple-500"
    },
    {
      title: content.customers,
      value: "5,678",
      change: "-2.3%",
      isIncrease: false,
      icon: Users,
      color: "text-orange-500"
    }
  ];
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{content.title}</h2>
        <p className="text-muted-foreground">{content.welcome}</p>
      </div>
      
      {/* Stats cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="flex items-center text-xs text-muted-foreground">
                {stat.isIncrease ? (
                  <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="mr-1 h-4 w-4 text-red-500" />
                )}
                <span className={stat.isIncrease ? "text-green-500" : "text-red-500"}>
                  {stat.change}
                </span>
                <span className="ml-1">{content.thisMonth}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Charts section */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Sales Overview */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>{content.salesOverview}</CardTitle>
            <CardDescription>{content.thisMonth}</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`$${value}`, content.revenue]} 
                  labelFormatter={(label) => `${label}`}
                />
                <Bar dataKey="sales" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        {/* Weekly Sales */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>{content.salesTitle}</CardTitle>
            <CardDescription>{content.thisWeek}</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`$${value}`, content.revenue]} 
                  labelFormatter={(label) => `${label}`}
                />
                <Line type="monotone" dataKey="sales" stroke="#8b5cf6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* Bottom section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Top Products */}
        <Card className="col-span-1 md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle>{content.topProducts}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, i) => (
                <div key={i} className="flex items-center">
                  <div className="mr-2 h-2 w-2 rounded-full bg-primary" />
                  <div className="flex-1">
                    <div className="font-medium">{product.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {product.sales} {content.orders} | ${product.revenue.toFixed(2)}
                    </div>
                  </div>
                  <div className={`font-medium ${i === 0 ? 'text-green-500' : 'text-foreground'}`}>
                    #{i + 1}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Inventory Status */}
        <Card>
          <CardHeader>
            <CardTitle>{content.inventoryStatus}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {inventoryStatus.map((status, i) => (
                <div key={i} className="flex items-center">
                  <div className={`mr-2 h-2 w-2 rounded-full ${status.color}`} />
                  <div className="flex-1">
                    <div className="font-medium">{status.status}</div>
                  </div>
                  <div className="font-medium">
                    {status.count}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Order Status */}
        <Card>
          <CardHeader>
            <CardTitle>{content.orderStatus}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orderStatus.map((status, i) => (
                <div key={i} className="flex items-center">
                  <div className={`mr-2 h-2 w-2 rounded-full ${status.color}`} />
                  <div className="flex-1">
                    <div className="font-medium">{status.status}</div>
                  </div>
                  <div className="font-medium">
                    {status.count}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
