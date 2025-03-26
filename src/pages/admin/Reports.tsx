
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, Download, BarChart, LineChart, PieChart } from 'lucide-react';
import { BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart as ReLineChart, Line, PieChart as RePieChart, Pie, Cell } from 'recharts';

// Mock data for reports
const salesData = [
  { month: "Jan", revenue: 4200, orders: 45 },
  { month: "Feb", revenue: 3800, orders: 42 },
  { month: "Mar", revenue: 5100, orders: 55 },
  { month: "Apr", revenue: 4800, orders: 48 },
  { month: "May", revenue: 6200, orders: 62 },
  { month: "Jun", revenue: 5500, orders: 58 },
  { month: "Jul", revenue: 7000, orders: 72 },
  { month: "Aug", revenue: 8100, orders: 85 },
  { month: "Sep", revenue: 7500, orders: 78 },
  { month: "Oct", revenue: 9200, orders: 95 },
  { month: "Nov", revenue: 8600, orders: 88 },
  { month: "Dec", revenue: 10200, orders: 108 }
];

const topProductsData = [
  { name: "Nike Air Max Pulse", value: 32 },
  { name: "Adidas Ultra Boost 22", value: 25 },
  { name: "Jordan 1 Retro High", value: 21 },
  { name: "New Balance 990v5", value: 12 },
  { name: "Vans Old Skool", value: 10 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const Reports = () => {
  const { language } = useLanguage();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [period, setPeriod] = useState('year');
  
  // Multilingual content
  const getReportsContent = () => {
    switch(language) {
      case 'pt':
        return {
          title: "Relatórios",
          description: "Visualize relatórios e análises da loja",
          sections: {
            sales: "Vendas",
            products: "Produtos",
            customers: "Clientes"
          },
          filters: {
            period: "Período",
            date: "Data",
            selectDate: "Selecione uma data",
            year: "Anual",
            month: "Mensal",
            week: "Semanal",
            custom: "Personalizado"
          },
          charts: {
            salesOverview: "Visão Geral de Vendas",
            salesDescription: "Receita e número de pedidos ao longo do tempo",
            topProducts: "Produtos Mais Vendidos",
            topProductsDescription: "Os produtos mais vendidos por quantidade",
            customerActivity: "Atividade de Clientes",
            customerActivityDescription: "Aquisição e retenção de clientes"
          },
          buttons: {
            download: "Baixar Relatório",
            export: "Exportar CSV"
          },
          data: {
            revenue: "Receita",
            orders: "Pedidos",
            percent: "Porcentagem"
          }
        };
      case 'es':
        return {
          title: "Informes",
          description: "Visualice informes y análisis de la tienda",
          sections: {
            sales: "Ventas",
            products: "Productos",
            customers: "Clientes"
          },
          filters: {
            period: "Período",
            date: "Fecha",
            selectDate: "Seleccione una fecha",
            year: "Anual",
            month: "Mensual",
            week: "Semanal",
            custom: "Personalizado"
          },
          charts: {
            salesOverview: "Visión General de Ventas",
            salesDescription: "Ingresos y número de pedidos a lo largo del tiempo",
            topProducts: "Productos Más Vendidos",
            topProductsDescription: "Los productos más vendidos por cantidad",
            customerActivity: "Actividad de Clientes",
            customerActivityDescription: "Adquisición y retención de clientes"
          },
          buttons: {
            download: "Descargar Informe",
            export: "Exportar CSV"
          },
          data: {
            revenue: "Ingresos",
            orders: "Pedidos",
            percent: "Porcentaje"
          }
        };
      default: // 'en'
        return {
          title: "Reports",
          description: "View store reports and analytics",
          sections: {
            sales: "Sales",
            products: "Products",
            customers: "Customers"
          },
          filters: {
            period: "Period",
            date: "Date",
            selectDate: "Select a date",
            year: "Yearly",
            month: "Monthly",
            week: "Weekly",
            custom: "Custom"
          },
          charts: {
            salesOverview: "Sales Overview",
            salesDescription: "Revenue and order count over time",
            topProducts: "Top Selling Products",
            topProductsDescription: "Best-selling products by quantity",
            customerActivity: "Customer Activity",
            customerActivityDescription: "Customer acquisition and retention"
          },
          buttons: {
            download: "Download Report",
            export: "Export CSV"
          },
          data: {
            revenue: "Revenue",
            orders: "Orders",
            percent: "Percentage"
          }
        };
    }
  };
  
  const content = getReportsContent();
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{content.title}</h2>
        <p className="text-muted-foreground">{content.description}</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex gap-4">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={content.filters.period} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="year">{content.filters.year}</SelectItem>
              <SelectItem value="month">{content.filters.month}</SelectItem>
              <SelectItem value="week">{content.filters.week}</SelectItem>
              <SelectItem value="custom">{content.filters.custom}</SelectItem>
            </SelectContent>
          </Select>
          
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
        </div>
        
        <Button>
          <Download className="mr-2 h-4 w-4" />
          {content.buttons.download}
        </Button>
      </div>
      
      <Tabs defaultValue="sales" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="sales">{content.sections.sales}</TabsTrigger>
          <TabsTrigger value="products">{content.sections.products}</TabsTrigger>
          <TabsTrigger value="customers">{content.sections.customers}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sales">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <BarChart className="mr-2 h-5 w-5" />
                    {content.charts.salesOverview}
                  </CardTitle>
                  <CardDescription>{content.charts.salesDescription}</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  {content.buttons.export}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ReBarChart
                    data={salesData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="revenue" name={content.data.revenue} fill="#8884d8" />
                    <Bar yAxisId="right" dataKey="orders" name={content.data.orders} fill="#82ca9d" />
                  </ReBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="products">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <PieChart className="mr-2 h-5 w-5" />
                      {content.charts.topProducts}
                    </CardTitle>
                    <CardDescription>{content.charts.topProductsDescription}</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    {content.buttons.export}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                      <Pie
                        data={topProductsData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {topProductsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value, name, props) => [`${value} ${content.data.orders}`, name]} />
                    </RePieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <LineChart className="mr-2 h-5 w-5" />
                      {content.charts.customerActivity}
                    </CardTitle>
                    <CardDescription>{content.charts.customerActivityDescription}</CardDescription>
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
                      data={salesData}
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
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="orders" name="Novos Clientes" stroke="#8884d8" />
                      <Line type="monotone" dataKey="revenue" name="Clientes Ativos" stroke="#82ca9d" />
                    </ReLineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="customers">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <LineChart className="mr-2 h-5 w-5" />
                    {content.charts.customerActivity}
                  </CardTitle>
                  <CardDescription>{content.charts.customerActivityDescription}</CardDescription>
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
                    data={salesData}
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
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="orders" name="Novos Clientes" stroke="#8884d8" />
                    <Line type="monotone" dataKey="revenue" name="Clientes Ativos" stroke="#82ca9d" />
                  </ReLineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
