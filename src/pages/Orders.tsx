
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Package, 
  ShoppingBag, 
  Truck, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Search
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Mock data for orders
const mockOrders = [
  {
    id: 'ORD-1234',
    date: '2023-08-15',
    total: 159.99,
    status: 'delivered',
    items: [
      { id: 1, name: 'Running Shoes XZ300', price: 89.99, quantity: 1 },
      { id: 2, name: 'Sports Socks', price: 14.99, quantity: 2 },
      { id: 3, name: 'Water Bottle', price: 19.99, quantity: 2 }
    ]
  },
  {
    id: 'ORD-5678',
    date: '2023-09-20',
    total: 249.50,
    status: 'shipped',
    items: [
      { id: 4, name: 'Trail Hiking Boots', price: 129.50, quantity: 1 },
      { id: 5, name: 'Hiking Backpack', price: 89.99, quantity: 1 },
      { id: 6, name: 'First Aid Kit', price: 29.99, quantity: 1 }
    ]
  },
  {
    id: 'ORD-9012',
    date: '2023-10-05',
    total: 174.95,
    status: 'processing',
    items: [
      { id: 7, name: 'Basketball Shoes', price: 119.99, quantity: 1 },
      { id: 8, name: 'Basketball Jersey', price: 54.99, quantity: 1 }
    ]
  },
  {
    id: 'ORD-3456',
    date: '2023-10-12',
    total: 79.99,
    status: 'cancelled',
    items: [
      { id: 9, name: 'Swimming Goggles', price: 29.99, quantity: 1 },
      { id: 10, name: 'Swim Cap', price: 14.99, quantity: 1 },
      { id: 11, name: 'Towel', price: 34.99, quantity: 1 }
    ]
  }
];

const Orders = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/orders' } } });
    }
  }, [isAuthenticated, navigate]);

  // Get translated content
  const getOrdersContent = () => {
    switch(language) {
      case 'pt':
        return {
          title: "Meus Pedidos",
          subtitle: "Veja o histórico e o status dos seus pedidos",
          orderDetails: "Detalhes do Pedido",
          id: "ID do Pedido",
          date: "Data",
          total: "Total",
          status: "Status",
          items: "Itens",
          itemName: "Nome do Item",
          quantity: "Quantidade",
          price: "Preço",
          subtotal: "Subtotal",
          backToList: "Voltar para Lista",
          search: "Buscar pedido...",
          emptyState: "Você ainda não realizou nenhum pedido",
          statusDelivered: "Entregue",
          statusShipped: "Enviado",
          statusProcessing: "Processando",
          statusCancelled: "Cancelado",
          noResults: "Nenhum pedido encontrado",
          orderHistory: "Histórico de Pedidos"
        };
      case 'es':
        return {
          title: "Mis Pedidos",
          subtitle: "Ver el historial y estado de tus pedidos",
          orderDetails: "Detalles del Pedido",
          id: "ID del Pedido",
          date: "Fecha",
          total: "Total",
          status: "Estado",
          items: "Artículos",
          itemName: "Nombre del Artículo",
          quantity: "Cantidad",
          price: "Precio",
          subtotal: "Subtotal",
          backToList: "Volver a la Lista",
          search: "Buscar pedido...",
          emptyState: "Aún no has realizado ningún pedido",
          statusDelivered: "Entregado",
          statusShipped: "Enviado",
          statusProcessing: "Procesando",
          statusCancelled: "Cancelado",
          noResults: "No se encontraron pedidos",
          orderHistory: "Historial de Pedidos"
        };
      default: // 'en'
        return {
          title: "My Orders",
          subtitle: "View your order history and status",
          orderDetails: "Order Details",
          id: "Order ID",
          date: "Date",
          total: "Total",
          status: "Status",
          items: "Items",
          itemName: "Item Name",
          quantity: "Quantity",
          price: "Price",
          subtotal: "Subtotal",
          backToList: "Back to List",
          search: "Search order...",
          emptyState: "You haven't placed any orders yet",
          statusDelivered: "Delivered",
          statusShipped: "Shipped",
          statusProcessing: "Processing",
          statusCancelled: "Cancelled",
          noResults: "No orders found",
          orderHistory: "Order History"
        };
    }
  };

  const content = getOrdersContent();

  // Format date based on current language
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (language === 'pt') {
      return date.toLocaleDateString('pt-BR');
    } else if (language === 'es') {
      return date.toLocaleDateString('es');
    } else {
      return date.toLocaleDateString('en-US');
    }
  };

  // Format currency based on current language
  const formatCurrency = (amount: number) => {
    if (language === 'pt') {
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount);
    } else if (language === 'es') {
      return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount);
    } else {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    }
  };

  // Get status badge color and text
  const getStatusBadge = (status: string) => {
    let color = '';
    let statusText = '';
    let icon = null;

    switch (status) {
      case 'delivered':
        color = 'bg-green-100 text-green-800';
        statusText = content.statusDelivered;
        icon = <CheckCircle className="h-4 w-4 mr-1" />;
        break;
      case 'shipped':
        color = 'bg-blue-100 text-blue-800';
        statusText = content.statusShipped;
        icon = <Truck className="h-4 w-4 mr-1" />;
        break;
      case 'processing':
        color = 'bg-yellow-100 text-yellow-800';
        statusText = content.statusProcessing;
        icon = <Clock className="h-4 w-4 mr-1" />;
        break;
      case 'cancelled':
        color = 'bg-red-100 text-red-800';
        statusText = content.statusCancelled;
        icon = <AlertCircle className="h-4 w-4 mr-1" />;
        break;
      default:
        color = 'bg-gray-100 text-gray-800';
        statusText = status;
        break;
    }

    return (
      <Badge variant="outline" className={`${color} flex items-center`}>
        {icon}
        {statusText}
      </Badge>
    );
  };

  // Filter orders based on search term
  const filteredOrders = mockOrders.filter(order => 
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Show detailed view of selected order
  const renderOrderDetail = () => {
    const order = mockOrders.find(o => o.id === selectedOrder);
    
    if (!order) return null;
    
    return (
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center">
                <Package className="mr-2 h-5 w-5" />
                {content.orderDetails}
              </CardTitle>
              <CardDescription>{order.id} - {formatDate(order.date)}</CardDescription>
            </div>
            <Button 
              variant="ghost" 
              onClick={() => setSelectedOrder(null)}
            >
              {content.backToList}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">{content.status}</h4>
              {getStatusBadge(order.status)}
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">{content.total}</h4>
              <p className="text-xl font-bold">{formatCurrency(order.total)}</p>
            </div>
          </div>
          
          <h3 className="font-medium mb-3">{content.items}</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{content.itemName}</TableHead>
                <TableHead className="text-right">{content.price}</TableHead>
                <TableHead className="text-right">{content.quantity}</TableHead>
                <TableHead className="text-right">{content.subtotal}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="text-right">{formatCurrency(item.price)}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">{formatCurrency(item.price * item.quantity)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  };

  // Show order list
  const renderOrderList = () => {
    if (filteredOrders.length === 0) {
      return (
        <div className="text-center py-12">
          <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">
            {searchTerm ? content.noResults : content.emptyState}
          </h3>
        </div>
      );
    }
    
    return (
      <Table>
        <TableCaption>{content.orderHistory}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>{content.id}</TableHead>
            <TableHead>{content.date}</TableHead>
            <TableHead>{content.total}</TableHead>
            <TableHead>{content.status}</TableHead>
            <TableHead className="text-right">{content.items}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOrders.map((order) => (
            <TableRow 
              key={order.id} 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => setSelectedOrder(order.id)}
            >
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{formatDate(order.date)}</TableCell>
              <TableCell>{formatCurrency(order.total)}</TableCell>
              <TableCell>{getStatusBadge(order.status)}</TableCell>
              <TableCell className="text-right">{order.items.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  if (!isAuthenticated) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container max-w-5xl mx-auto px-4">
          {!selectedOrder ? (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold mb-2">{content.title}</h1>
                <p className="text-muted-foreground">{content.subtitle}</p>
              </div>
              
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="search"
                  placeholder={content.search}
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {renderOrderList()}
            </>
          ) : (
            renderOrderDetail()
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Orders;
