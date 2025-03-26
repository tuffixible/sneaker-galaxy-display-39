
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Search, MoreHorizontal, Eye, Mail, User, ShoppingBag } from 'lucide-react';

// Mock data for customers
const mockCustomers = [
  {
    id: "1",
    name: "João Silva",
    email: "joao.silva@example.com",
    orders: 5,
    totalSpent: 543.21,
    status: "active",
    lastOrder: "2023-10-10",
    createdAt: "2022-05-15"
  },
  {
    id: "2",
    name: "Maria Souza",
    email: "maria.souza@example.com",
    orders: 8,
    totalSpent: 837.45,
    status: "active",
    lastOrder: "2023-10-14",
    createdAt: "2022-03-22"
  },
  {
    id: "3",
    name: "Carlos Oliveira",
    email: "carlos.oliveira@example.com",
    orders: 2,
    totalSpent: 159.99,
    status: "active",
    lastOrder: "2023-09-28",
    createdAt: "2023-01-05"
  },
  {
    id: "4",
    name: "Ana Ferreira",
    email: "ana.ferreira@example.com",
    orders: 0,
    totalSpent: 0,
    status: "inactive",
    lastOrder: null,
    createdAt: "2023-02-18"
  },
  {
    id: "5",
    name: "José Santos",
    email: "jose.santos@example.com",
    orders: 3,
    totalSpent: 249.99,
    status: "active",
    lastOrder: "2023-08-20",
    createdAt: "2022-11-30"
  },
  {
    id: "6",
    name: "Luiza Costa",
    email: "luiza.costa@example.com",
    orders: 12,
    totalSpent: 1254.87,
    status: "vip",
    lastOrder: "2023-10-12",
    createdAt: "2021-09-10"
  }
];

const Customers = () => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [customers] = useState(mockCustomers);
  
  // Multilingual content
  const getCustomersContent = () => {
    switch(language) {
      case 'pt':
        return {
          title: "Clientes",
          description: "Gerenciar clientes da loja",
          search: "Buscar clientes...",
          columns: {
            name: "Nome",
            email: "E-mail",
            orders: "Pedidos",
            spent: "Total Gasto",
            status: "Status",
            lastOrder: "Último Pedido",
            joined: "Cadastrado em",
            actions: "Ações"
          },
          status: {
            active: "Ativo",
            inactive: "Inativo",
            vip: "VIP"
          },
          actions: {
            view: "Ver Detalhes",
            viewOrders: "Ver Pedidos",
            sendEmail: "Enviar E-mail"
          },
          noCustomers: "Nenhum cliente encontrado",
          notAvailable: "N/A"
        };
      case 'es':
        return {
          title: "Clientes",
          description: "Gestionar clientes de la tienda",
          search: "Buscar clientes...",
          columns: {
            name: "Nombre",
            email: "Correo electrónico",
            orders: "Pedidos",
            spent: "Total Gastado",
            status: "Estado",
            lastOrder: "Último Pedido",
            joined: "Registrado el",
            actions: "Acciones"
          },
          status: {
            active: "Activo",
            inactive: "Inactivo",
            vip: "VIP"
          },
          actions: {
            view: "Ver Detalles",
            viewOrders: "Ver Pedidos",
            sendEmail: "Enviar Correo"
          },
          noCustomers: "No se encontraron clientes",
          notAvailable: "N/D"
        };
      default: // 'en'
        return {
          title: "Customers",
          description: "Manage store customers",
          search: "Search customers...",
          columns: {
            name: "Name",
            email: "Email",
            orders: "Orders",
            spent: "Total Spent",
            status: "Status",
            lastOrder: "Last Order",
            joined: "Joined On",
            actions: "Actions"
          },
          status: {
            active: "Active",
            inactive: "Inactive",
            vip: "VIP"
          },
          actions: {
            view: "View Details",
            viewOrders: "View Orders",
            sendEmail: "Send Email"
          },
          noCustomers: "No customers found",
          notAvailable: "N/A"
        };
    }
  };
  
  const content = getCustomersContent();
  
  // Filter customers based on search term
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Get status badge variant
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <Badge variant="default">{content.status.active}</Badge>;
      case 'inactive':
        return <Badge variant="secondary">{content.status.inactive}</Badge>;
      case 'vip':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
          {content.status.vip}
        </Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  // Format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return content.notAvailable;
    return new Date(dateString).toLocaleDateString();
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{content.title}</h2>
        <p className="text-muted-foreground">{content.description}</p>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-2">
            <Search className="h-5 w-5 text-muted-foreground" />
            <Input
              placeholder={content.search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{content.columns.name}</TableHead>
                  <TableHead>{content.columns.email}</TableHead>
                  <TableHead>{content.columns.orders}</TableHead>
                  <TableHead>{content.columns.spent}</TableHead>
                  <TableHead>{content.columns.status}</TableHead>
                  <TableHead>{content.columns.lastOrder}</TableHead>
                  <TableHead>{content.columns.joined}</TableHead>
                  <TableHead className="text-right">{content.columns.actions}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.orders}</TableCell>
                      <TableCell>${customer.totalSpent.toFixed(2)}</TableCell>
                      <TableCell>{getStatusBadge(customer.status)}</TableCell>
                      <TableCell>{formatDate(customer.lastOrder)}</TableCell>
                      <TableCell>{formatDate(customer.createdAt)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>{customer.name}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <User className="mr-2 h-4 w-4" />
                              <span>{content.actions.view}</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <ShoppingBag className="mr-2 h-4 w-4" />
                              <span>{content.actions.viewOrders}</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              <span>{content.actions.sendEmail}</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      {content.noCustomers}
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

export default Customers;
