

'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, LineChart as LineChartIcon, Users, ShoppingCart, DollarSign, Download, CalendarDays, AlertTriangle } from 'lucide-react';
import { Bar, BarChart as RechartsBarChart, Line, LineChart as RechartsLineChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCurrency } from '@/contexts/CurrencyContext';
import { formatCurrency } from '@/lib/utils';

const salesData = [
  { month: 'Jan', sales: 4000, revenue: 2400 },
  { month: 'Feb', sales: 3000, revenue: 1398 },
  { month: 'Mar', sales: 2000, revenue: 9800 },
  { month: 'Apr', sales: 2780, revenue: 3908 },
  { month: 'May', sales: 1890, revenue: 4800 },
  { month: 'Jun', sales: 2390, revenue: 3800 },
  { month: 'Jul', sales: 3490, revenue: 4300 },
];

const customerGrowthData = [
  { date: '2024-01', newCustomers: 50, totalCustomers: 200 },
  { date: '2024-02', newCustomers: 70, totalCustomers: 270 },
  { date: '2024-03', newCustomers: 60, totalCustomers: 330 },
  { date: '2024-04', newCustomers: 90, totalCustomers: 420 },
  { date: '2024-05', newCustomers: 80, totalCustomers: 500 },
  { date: '2024-06', newCustomers: 110, totalCustomers: 610 },
  { date: '2024-07', newCustomers: 100, totalCustomers: 710 },
];

const chartConfig = {
  sales: { label: "Sales", color: "hsl(210 90% 60%)" },
  revenue: { label: "Revenue", color: "hsl(170 70% 50%)" },
  newCustomers: { label: "New Customers", color: "hsl(280 70% 65%)" },
  totalCustomers: { label: "Total Customers", color: "hsl(35 85% 60%)" },
} satisfies Record<string, {label: string; color: string;}>;

const initialSummaryCards = {
  totalSalesValue: "1258", // This is a count, not currency
  totalRevenueValue: "35789.50",
  newCustomersValue: "87", // Count
  avgOrderValue: "28.45",
};

export default function AnalyticsPage() {
  const { currency } = useCurrency();

  return (
    <>
      

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card data-ai-hint="total sales number">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{initialSummaryCards.totalSalesValue}</div>
            <p className="text-xs text-muted-foreground">+12% from last period</p>
          </CardContent>
        </Card>
        <Card data-ai-hint="total revenue amount">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{formatCurrency(initialSummaryCards.totalRevenueValue, currency)}</div>
            <p className="text-xs text-muted-foreground">+8.5% from last period</p>
          </CardContent>
        </Card>
        <Card data-ai-hint="new customers count">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{initialSummaryCards.newCustomersValue}</div>
            <p className="text-xs text-muted-foreground">+25% from last period</p>
          </CardContent>
        </Card>
        <Card data-ai-hint="average order value">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{formatCurrency(initialSummaryCards.avgOrderValue, currency)}</div>
            <p className="text-xs text-muted-foreground">-1.2% from last period</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="sales_overview">
        <TabsList className="mb-4 grid w-full grid-cols-2 sm:grid-cols-4">
          <TabsTrigger value="sales_overview">Sales Overview</TabsTrigger>
          <TabsTrigger value="customer_insights">Customer Insights</TabsTrigger>
          <TabsTrigger value="product_performance">Product Performance</TabsTrigger>
          <TabsTrigger value="custom_reports">Custom Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="sales_overview">
          <Card data-ai-hint="sales trend line chart">
            <CardHeader>
              <CardTitle>Sales & Revenue Trend</CardTitle>
              <CardDescription>Monthly sales and revenue overview.</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] pr-6">
              <ChartContainer config={chartConfig} className="w-full h-full">
                <RechartsLineChart data={salesData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                  <XAxis dataKey="month" tickLine={false} axisLine={false} />
                  <YAxis 
                    yAxisId="left" 
                    stroke="var(--color-sales)" 
                    tickLine={false} 
                    axisLine={false}
                    tickFormatter={(value) => formatCurrency(value, currency).replace(/[.,]00$/, '')}
                  />
                  <YAxis 
                    yAxisId="right" 
                    orientation="right" 
                    stroke="var(--color-revenue)" 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(value) => formatCurrency(value, currency).replace(/[.,]00$/, '')}
                  />
                  <ChartTooltip 
                    content={<ChartTooltipContent 
                        indicator="line" 
                        formatter={(value, name, item) => {
                            const label = item.dataKey === 'sales' ? chartConfig.sales.label : chartConfig.revenue.label;
                            return [formatCurrency(Number(value), currency), label];
                        }}
                    />} 
                  />
                  <Legend content={<ChartLegendContent />} />
                  <Line yAxisId="left" type="monotone" dataKey="sales" strokeWidth={2} stroke="var(--color-sales)" dot={false} />
                  <Line yAxisId="right" type="monotone" dataKey="revenue" strokeWidth={2} stroke="var(--color-revenue)" dot={false} />
                </RechartsLineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customer_insights">
          <Card data-ai-hint="customer growth bar chart">
            <CardHeader>
              <CardTitle>Customer Growth</CardTitle>
              <CardDescription>New vs. Total Customers Over Time.</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] pr-6">
               <ChartContainer config={chartConfig} className="w-full h-full">
                <RechartsBarChart data={customerGrowthData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                  <XAxis dataKey="date" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend content={<ChartLegendContent />} />
                  <Bar dataKey="newCustomers" fill="var(--color-newCustomers)" radius={[4, 4, 0, 0]} name="New Customers" />
                  <Bar dataKey="totalCustomers" fill="var(--color-totalCustomers)" radius={[4, 4, 0, 0]} name="Total Customers" />
                </RechartsBarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="product_performance">
          <Card data-ai-hint="top selling products list">
            <CardHeader>
              <CardTitle>Product Performance</CardTitle>
              <CardDescription>Analysis of best-selling and most viewed products.</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <LineChartIcon className="mx-auto h-12 w-12 mb-2" />
                <p>Product performance charts and tables will be displayed here.</p>
                <p className="text-xs">Coming soon: top sellers, conversion rates, etc.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="custom_reports">
             <Card data-ai-hint="custom report builder">
                <CardHeader>
                    <CardTitle>Custom Reports</CardTitle>
                    <CardDescription>Build and save your own analytical reports.</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px] flex flex-col items-center justify-center space-y-4">
                    <AlertTriangle className="h-16 w-16 text-muted-foreground" />
                    <p className="text-muted-foreground">Custom report builder is under development.</p>
                    <Button disabled>Create Custom Report</Button>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
