
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, Download, DollarSign, CreditCard, Wallet, LineChart, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart as ReLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Mock data for finances
const revenueData = [
  { month: "Jan", revenue: 4200, expenses: 2800, profit: 1400 },
  { month: "Feb", revenue: 3800, expenses: 2500, profit: 1300 },
  { month: "Mar", revenue: 5100, expenses: 3200, profit: 1900 },
  { month: "Apr", revenue: 4800, expenses: 3000, profit: 1800 },
  { month: "May", revenue: 6200, expenses: 3800, profit: 2400 },
  { month: "Jun", revenue: 5500, expenses: 3500, profit: 2000 },
  { month: "Jul", revenue: 7000, expenses: 4200, profit: 2800 },
  { month: "Aug", revenue: 8100, expenses: 4800, profit: 3300 },
  { month: "Sep", revenue: 7500, expenses: 4500, profit: 3000 },
  { month: "Oct", revenue: 9200, expenses: 5500, profit: 3700 },
  { month: "Nov", revenue: 8600, expenses: 5200, profit: 3400 },
  { month: "Dec", revenue: 10200, expenses: 6000, profit: 4200 }
];

const transactionsData = [
  { id: "TRX-001", date: "2023-10-16", type: "sale", amount: 159.99, status: "completed", customer: "João Silva" },
  { id: "TRX-002", date: "2023-10-15", type: "sale", amount: 85.00, status: "completed", customer: "Maria Souza" },
  { id: "TRX-003", date: "2023-10-15", type: "refund", amount: -70.00, status: "completed", customer: "José Santos" },
  { id: "TRX-004", date: "2023-10-14", type: "sale", amount: 189.99, status: "completed", customer: "Ana Ferreira" },
  { id: "TRX-005", date: "2023-10-14", type: "sale", amount: 110.00, status: "completed", customer: "Carlos Oliveira" },
  { id: "TRX-006", date: "2023-10-13", type: "fee", amount: -25.00, status: "completed", customer: "Plataforma de Pagamento" },
  { id: "TRX-007", date: "2023-10-12", type: "sale", amount: 374.98, status: "completed", customer: "Luiza Costa" },
  { id: "TRX-008", date: "2023-10-10", type: "withdrawal", amount: -500.00, status: "completed", customer: "Conta Bancária" }
];

const Finances = () => {
  const { language } = useLanguage();
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Multilingual content
  const getFinancesContent = () => {
    switch(language) {
      case 'pt':
        return {
          title: "Finanças",
          description: "Gerenciar finanças e transações da loja",
          sections: {
            overview: "Visão Geral",
            transactions: "Transações",
            invoices: "Faturas",
            taxes: "Impostos"
          },
          cards: {
            revenue: "Receita Total",
            expenses: "Despesas Totais",
            profit: "Lucro Líquido",
            pending: "Pagamentos Pendentes"
          },
          charts: {
            financialOverview: "Visão Geral Financeira",
            financialDescription: "Receita, despesas e lucro ao longo do tempo",
            thisMonth: "Este Mês",
            lastMonth: "Mês Passado"
          },
          table: {
            id: "ID",
            date: "Data",
            type: "Tipo",
            amount: "Valor",
            status: "Status",
            customer: "Cliente",
            actions: "Ações"
          },
          types: {
            sale: "Venda",
            refund: "Reembolso",
            fee: "Taxa",
            withdrawal: "Saque"
          },
          status: {
            completed: "Concluído",
            pending: "Pendente",
            failed: "Falhou"
          },
          buttons: {
            download: "Baixar Relatório",
            export: "Exportar CSV",
            viewDetails: "Ver Detalhes"
          },
          filters: {
            date: "Data",
            selectDate: "Selecione uma data"
          },
          data: {
            revenue: "Receita",
            expenses: "Despesas",
            profit: "Lucro"
          },
          noTransactions: "Nenhuma transação encontrada"
        };
      case 'es':
        return {
          title: "Finanzas",
          description: "Gestionar finanzas y transacciones de la tienda",
          sections: {
            overview: "Visión General",
            transactions: "Transacciones",
            invoices: "Facturas",
            taxes: "Impuestos"
          },
          cards: {
            revenue: "Ingresos Totales",
            expenses: "Gastos Totales",
            profit: "Beneficio Neto",
            pending: "Pagos Pendientes"
          },
          charts: {
            financialOverview: "Visión General Financiera",
            financialDescription: "Ingresos, gastos y beneficios a lo largo del tiempo",
            thisMonth: "Este Mes",
            lastMonth: "Mes Pasado"
          },
          table: {
            id: "ID",
            date: "Fecha",
            type: "Tipo",
            amount: "Importe",
            status: "Estado",
            customer: "Cliente",
            actions: "Acciones"
          },
          types: {
            sale: "Venta",
            refund: "Reembolso",
            fee: "Comisión",
            withdrawal: "Retiro"
          },
          status: {
            completed: "Completado",
            pending: "Pendiente",
            failed: "Fallido"
          },
          buttons: {
            download: "Descargar Informe",
            export: "Exportar CSV",
            viewDetails: "Ver Detalles"
          },
          filters: {
            date: "Fecha",
            selectDate: "Seleccione una fecha"
          },
          data: {
            revenue: "Ingresos",
            expenses: "Gastos",
            profit: "Beneficio"
          },
          noTransactions: "No se encontraron transacciones"
        };
      default: // 'en'
        return {
          title: "Finances",
          description: "Manage store finances and transactions",
          sections: {
            overview: "Overview",
            transactions: "Transactions",
            invoices: "Invoices",
            taxes: "Taxes"
          },
          cards: {
            revenue: "Total Revenue",
            expenses: "Total Expenses",
            profit: "Net Profit",
            pending: "Pending Payments"
          },
          charts: {
            financialOverview: "Financial Overview",
            financialDescription: "Revenue, expenses, and profit over time",
            thisMonth: "This Month",
            lastMonth: "Last Month"
          },
          table: {
            id: "ID",
            date: "Date",
            type: "Type",
            amount: "Amount",
            status: "Status",
            customer: "Customer",
            actions: "Actions"
          },
          types: {
            sale: "Sale",
            refund: "Refund",
            fee: "Fee",
            withdrawal: "Withdrawal"
          },
          status: {
            completed: "Completed",
            pending: "Pending",
            failed: "Failed"
          },
          buttons: {
            download: "Download Report",
            export: "Export CSV",
            viewDetails: "View Details"
          },
          filters: {
            date: "Date",
            selectDate: "Select a date"
          },
          data: {
            revenue: "Revenue",
            expenses: "Expenses",
            profit: "Profit"
          },
          noTransactions: "No transactions found"
        };
    }
  };
  
  const content = getFinancesContent();
  
  // Calculate totals
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
  const totalExpenses = revenueData.reduce((sum, item) => sum + item.expenses, 0);
  const totalProfit = revenueData.reduce((sum, item) => sum + item.profit, 0);
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };
  
  // Get status badge class based on transaction type
  const getTypeBadgeClass = (type: string) => {
    switch(type) {
      case 'sale':
        return "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100";
      case 'refund':
        return "bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100";
      case 'fee':
        return "bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100";
      case 'withdrawal':
        return "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };
  
  // Get type display text
  const getTypeText = (type: string) => {
    switch(type) {
      case 'sale':
        return content.types.sale;
      case 'refund':
        return content.types.refund;
      case 'fee':
        return content.types.fee;
      case 'withdrawal':
        return content.types.withdrawal;
      default:
        return type;
    }
  };
  
  // Get amount text color based on value
  const getAmountTextClass = (amount: number) => {
    return amount >= 0 ? "text-green-600" : "text-red-600";
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{content.title}</h2>
        <p className="text-muted-foreground">{content.description}</p>
      </div>
      
      <div className="flex justify-end items-center gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>{content.filters.selectDate}</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        
        <Button>
          <Download className="mr-2 h-4 w-4" />
          {content.buttons.download}
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {content.cards.revenue}
            </CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
            <p className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
              <span className="text-green-500">+12.5%</span>
              <span className="ml-1">{content.charts.thisMonth}</span>
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {content.cards.expenses}
            </CardTitle>
            <Wallet className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalExpenses)}</div>
            <p className="flex items-center text-xs text-muted-foreground">
              <TrendingDown className="mr-1 h-4 w-4 text-red-500" />
              <span className="text-red-500">+8.2%</span>
              <span className="ml-1">{content.charts.thisMonth}</span>
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {content.cards.profit}
            </CardTitle>
            <LineChart className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalProfit)}</div>
            <p className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
              <span className="text-green-500">+18.4%</span>
              <span className="ml-1">{content.charts.thisMonth}</span>
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {content.cards.pending}
            </CardTitle>
            <CreditCard className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(189.99)}</div>
            <p className="flex items-center text-xs text-muted-foreground">
              <span className="text-orange-500">2 {content.status.pending}</span>
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="overview">{content.sections.overview}</TabsTrigger>
          <TabsTrigger value="transactions">{content.sections.transactions}</TabsTrigger>
          <TabsTrigger value="invoices">{content.sections.invoices}</TabsTrigger>
          <TabsTrigger value="taxes">{content.sections.taxes}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <LineChart className="mr-2 h-5 w-5" />
                    {content.charts.financialOverview}
                  </CardTitle>
                  <CardDescription>{content.charts.financialDescription}</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  {content.buttons.export}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ReLineChart
                    data={revenueData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [formatCurrency(Number(value)), ""]} />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" name={content.data.revenue} stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="expenses" name={content.data.expenses} stroke="#FF8042" strokeWidth={2} />
                    <Line type="monotone" dataKey="profit" name={content.data.profit} stroke="#82ca9d" strokeWidth={2} />
                  </ReLineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{content.sections.transactions}</CardTitle>
                <Button variant="outline" size="sm">
                  {content.buttons.export}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{content.table.id}</TableHead>
                      <TableHead>{content.table.date}</TableHead>
                      <TableHead>{content.table.type}</TableHead>
                      <TableHead>{content.table.amount}</TableHead>
                      <TableHead>{content.table.status}</TableHead>
                      <TableHead>{content.table.customer}</TableHead>
                      <TableHead className="text-right">{content.table.actions}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactionsData.length > 0 ? (
                      transactionsData.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-medium">{transaction.id}</TableCell>
                          <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              getTypeBadgeClass(transaction.type)
                            }`}>
                              {getTypeText(transaction.type)}
                            </span>
                          </TableCell>
                          <TableCell className={getAmountTextClass(transaction.amount)}>
                            {formatCurrency(transaction.amount)}
                          </TableCell>
                          <TableCell>{content.status[transaction.status as keyof typeof content.status]}</TableCell>
                          <TableCell>{transaction.customer}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              {content.buttons.viewDetails}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          {content.noTransactions}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="invoices">
          <Card>
            <CardHeader>
              <CardTitle>{content.sections.invoices}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-8 text-center text-muted-foreground">
                Em construção...
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="taxes">
          <Card>
            <CardHeader>
              <CardTitle>{content.sections.taxes}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-8 text-center text-muted-foreground">
                Em construção...
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Finances;
