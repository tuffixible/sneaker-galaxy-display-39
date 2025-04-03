
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Search, MoreHorizontal, Eye, FileText, TruckIcon, XCircle } from 'lucide-react';
import { toast } from 'sonner';

// Mock data for orders
const mockOrders = [
  {
    id: "ORD-001",
    customer: "João Silva",
    date: "2023-10-15",
    total: 189.99,
    status: "processing",
    items: 3,
    paymentStatus: "paid"
  },
  {
    id: "ORD-002",
    customer: "Maria Souza",
    date: "2023-10-14",
    total: 85.00,
    status: "shipped",
    items: 1,
    paymentStatus: "paid"
  },
  {
    id: "ORD-003",
    customer: "Carlos Oliveira",
    date: "2023-10-14",
    total: 159.99,
    status: "delivered",
    items: 2,
    paymentStatus: "paid"
  },
  {
    id: "ORD-004",
    customer: "Ana Ferreira",
    date: "2023-10-13",
    total: 229.98,
    status: "processing",
    items: 2,
    paymentStatus: "pending"
  },
  {
    id: "ORD-005",
    customer: "José Santos",
    date: "2023-10-12",
    total: 70.00,
    status: "cancelled",
    items: 1,
    paymentStatus: "refunded"
  },
  {
    id: "ORD-006",
    customer: "Luiza Costa",
    date: "2023-10-11",
    total: 374.98,
    status: "delivered",
    items: 3,
    paymentStatus: "paid"
  },
  {
    id: "ORD-007",
    customer: "Ricardo Almeida",
    date: "2023-10-10",
    total: 110.00,
    status: "delivered",
    items: 1,
    paymentStatus: "paid"
  }
];

const AdminOrders = () => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState(mockOrders);
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Multilingual content
  const getOrdersContent = () => {
    switch(language) {
      case 'pt':
        return {
          title: "Pedidos",
          description: "Gerenciar pedidos da loja",
          search: "Buscar pedidos...",
          columns: {
            id: "ID do Pedido",
            customer: "Cliente",
            date: "Data",
            total: "Total",
            status: "Status",
            items: "Itens",
            payment: "Pagamento",
            actions: "Ações"
          },
          status: {
            processing: "Processando",
            shipped: "Enviado",
            delivered: "Entregue",
            cancelled: "Cancelado",
            all: "Todos os Status"
          },
          payment: {
            paid: "Pago",
            pending: "Pendente",
            refunded: "Reembolsado"
          },
          actions: {
            view: "Visualizar Pedido",
            invoice: "Gerar Fatura",
            ship: "Marcar como Enviado",
            cancel: "Cancelar Pedido"
          },
          filters: "Filtros",
          noOrders: "Nenhum pedido encontrado",
          messages: {
            statusUpdated: "Status do pedido atualizado com sucesso!",
            orderCancelled: "Pedido cancelado com sucesso!",
            invoiceGenerated: "Fatura gerada com sucesso!"
          }
        };
      case 'es':
        return {
          title: "Pedidos",
          description: "Gestionar pedidos de la tienda",
          search: "Buscar pedidos...",
          columns: {
            id: "ID del Pedido",
            customer: "Cliente",
            date: "Fecha",
            total: "Total",
            status: "Estado",
            items: "Artículos",
            payment: "Pago",
            actions: "Acciones"
          },
          status: {
            processing: "Procesando",
            shipped: "Enviado",
            delivered: "Entregado",
            cancelled: "Cancelado",
            all: "Todos los Estados"
          },
          payment: {
            paid: "Pagado",
            pending: "Pendiente",
            refunded: "Reembolsado"
          },
          actions: {
            view: "Ver Pedido",
            invoice: "Generar Factura",
            ship: "Marcar como Enviado",
            cancel: "Cancelar Pedido"
          },
          filters: "Filtros",
          noOrders: "No se encontraron pedidos",
          messages: {
            statusUpdated: "¡Estado del pedido actualizado con éxito!",
            orderCancelled: "¡Pedido cancelado con éxito!",
            invoiceGenerated: "¡Factura generada con éxito!"
          }
        };
      default: // 'en'
        return {
          title: "Orders",
          description: "Manage store orders",
          search: "Search orders...",
          columns: {
            id: "Order ID",
            customer: "Customer",
            date: "Date",
            total: "Total",
            status: "Status",
            items: "Items",
            payment: "Payment",
            actions: "Actions"
          },
          status: {
            processing: "Processing",
            shipped: "Shipped",
            delivered: "Delivered",
            cancelled: "Cancelled",
            all: "All Statuses"
          },
          payment: {
            paid: "Paid",
            pending: "Pending",
            refunded: "Refunded"
          },
          actions: {
            view: "View Order",
            invoice: "Generate Invoice",
            ship: "Mark as Shipped",
            cancel: "Cancel Order"
          },
          filters: "Filters",
          noOrders: "No orders found",
          messages: {
            statusUpdated: "Order status updated successfully!",
            orderCancelled: "Order cancelled successfully!",
            invoiceGenerated: "Invoice generated successfully!"
          }
        };
    }
  };
  
  const content = getOrdersContent();
  
  // Filter orders based on search term and status filter
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Update order status
  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    toast.success(content.messages.statusUpdated);
  };
  
  // Get status badge class based on status
  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case 'processing':
        return "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100";
      case 'shipped':
        return "bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100";
      case 'delivered':
        return "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100";
      case 'cancelled':
        return "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };
  
  // Get payment status badge class
  const getPaymentBadgeClass = (paymentStatus: string) => {
    switch(paymentStatus) {
      case 'paid':
        return "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100";
      case 'pending':
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100";
      case 'refunded':
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };
  
  // Get status display text
  const getStatusText = (status: string) => {
    switch(status) {
      case 'processing':
        return content.status.processing;
      case 'shipped':
        return content.status.shipped;
      case 'delivered':
        return content.status.delivered;
      case 'cancelled':
        return content.status.cancelled;
      default:
        return status;
    }
  };
  
  // Get payment status display text
  const getPaymentText = (paymentStatus: string) => {
    switch(paymentStatus) {
      case 'paid':
        return content.payment.paid;
      case 'pending':
        return content.payment.pending;
      case 'refunded':
        return content.payment.refunded;
      default:
        return paymentStatus;
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{content.title}</h2>
        <p className="text-muted-foreground">{content.description}</p>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-2 flex-1">
              <Search className="h-5 w-5 text-muted-foreground" />
              <Input
                placeholder={content.search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{content.filters}:</span>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{content.status.all}</SelectItem>
                  <SelectItem value="processing">{content.status.processing}</SelectItem>
                  <SelectItem value="shipped">{content.status.shipped}</SelectItem>
                  <SelectItem value="delivered">{content.status.delivered}</SelectItem>
                  <SelectItem value="cancelled">{content.status.cancelled}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{content.columns.id}</TableHead>
                  <TableHead>{content.columns.customer}</TableHead>
                  <TableHead>{content.columns.date}</TableHead>
                  <TableHead>{content.columns.total}</TableHead>
                  <TableHead>{content.columns.items}</TableHead>
                  <TableHead>{content.columns.status}</TableHead>
                  <TableHead>{content.columns.payment}</TableHead>
                  <TableHead className="text-right">{content.columns.actions}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                      <TableCell>${order.total.toFixed(2)}</TableCell>
                      <TableCell>{order.items}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          getStatusBadgeClass(order.status)
                        }`}>
                          {getStatusText(order.status)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          getPaymentBadgeClass(order.paymentStatus)
                        }`}>
                          {getPaymentText(order.paymentStatus)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>{order.id}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => console.log(`View order ${order.id}`)}>
                              <Eye className="mr-2 h-4 w-4" />
                              <span>{content.actions.view}</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => toast.success(content.messages.invoiceGenerated)}
                            >
                              <FileText className="mr-2 h-4 w-4" />
                              <span>{content.actions.invoice}</span>
                            </DropdownMenuItem>
                            {order.status === 'processing' && (
                              <DropdownMenuItem 
                                onClick={() => updateOrderStatus(order.id, 'shipped')}
                              >
                                <TruckIcon className="mr-2 h-4 w-4" />
                                <span>{content.actions.ship}</span>
                              </DropdownMenuItem>
                            )}
                            {(order.status === 'processing' || order.status === 'shipped') && (
                              <DropdownMenuItem 
                                onClick={() => updateOrderStatus(order.id, 'cancelled')}
                                className="text-red-600"
                              >
                                <XCircle className="mr-2 h-4 w-4" />
                                <span>{content.actions.cancel}</span>
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      {content.noOrders}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOrders;
