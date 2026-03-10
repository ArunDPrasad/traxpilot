

'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Zap, ShoppingBag, Users, Crown, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';
import { formatCurrency } from '@/lib/utils';

const salesLeaderboardDataSrc = [
  { rank: 1, name: 'Eleanor Vance', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'woman portrait', value: '12580.50', trend: 'up', team: 'Alpha Squad' },
  { rank: 2, name: 'Marcus Cole', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'man portrait', value: '11230.00', trend: 'up', team: 'Bravo Team' },
  { rank: 3, name: 'Jasper Kim', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'professional headshot', value: '9870.75', trend: 'down', team: 'Alpha Squad' },
  { rank: 4, name: 'Isabelle Moreau', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'person smiling', value: '9550.20', trend: 'stable', team: 'Charlie Co.' },
  { rank: 5, name: 'Liam Patel', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'man headshot', value: '8120.00', trend: 'up', team: 'Bravo Team' },
];

const productLeaderboardDataSrc = [
  { rank: 1, name: 'Ergonomic Mouse', imageUrl: 'https://placehold.co/40x40.png', dataAiHint: 'computer mouse', category: 'Electronics', unitsSold: 582, revenue: '43650.00' },
  { rank: 2, name: 'Mechanical Keyboard', imageUrl: 'https://placehold.co/40x40.png', dataAiHint: 'keyboard gaming', category: 'Electronics', unitsSold: 412, revenue: '49440.00' },
  { rank: 3, name: 'Organic Coffee Beans', imageUrl: 'https://placehold.co/40x40.png', dataAiHint: 'coffee beans', category: 'Groceries', unitsSold: 890, revenue: '20025.00' },
];

const customerLeaderboardDataSrc = [
   { rank: 1, name: 'Tech Solutions Inc.', avatar: 'https://placehold.co/40x40.png?text=TS', dataAiHint: 'company logo', type: 'B2B', totalSpent: '25600.00', orders: 15 },
   { rank: 2, name: 'Global Goods Ltd.', avatar: 'https://placehold.co/40x40.png?text=GG', dataAiHint: 'corporate building', type: 'B2B', totalSpent: '18950.00', orders: 22 },
   { rank: 3, name: 'Alice Wonderland', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'woman smiling', type: 'B2C', totalSpent: '1250.80', orders: 8 },
];

const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
  if (trend === 'up') return <ArrowUp className="h-4 w-4 text-green-500" />;
  if (trend === 'down') return <ArrowDown className="h-4 w-4 text-red-500" />;
  return <Minus className="h-4 w-4 text-muted-foreground" />;
};

const getRankIndicator = (rank: number) => {
  if (rank === 1) return <Crown className="h-5 w-5 text-yellow-500" />;
  if (rank === 2) return <Trophy className="h-5 w-5 text-slate-400" />;
  if (rank === 3) return <Zap className="h-5 w-5 text-orange-400" />;
  return <span className="font-semibold">{rank}</span>;
};

export default function LeaderboardPage() {
  const { currency } = useCurrency();

  const salesLeaderboardData = salesLeaderboardDataSrc.map(item => ({
    ...item,
    value: formatCurrency(item.value, currency),
  }));
  const productLeaderboardData = productLeaderboardDataSrc.map(item => ({
    ...item,
    revenue: formatCurrency(item.revenue, currency),
  }));
  const customerLeaderboardData = customerLeaderboardDataSrc.map(item => ({
    ...item,
    totalSpent: formatCurrency(item.totalSpent, currency),
  }));

  return (
    <>
      
      
      <Tabs defaultValue="sales">
        <TabsList className="mb-6 grid w-full grid-cols-3">
          <TabsTrigger value="sales">
            <Trophy className="mr-2 h-4 w-4" /> Sales Reps
          </TabsTrigger>
          <TabsTrigger value="products">
            <ShoppingBag className="mr-2 h-4 w-4" /> Products
          </TabsTrigger>
          <TabsTrigger value="customers">
            <Users className="mr-2 h-4 w-4" /> Customers
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sales">
          <Card data-ai-hint="sales team performance">
            <CardHeader>
              <CardTitle>Top Sales Representatives</CardTitle>
              <CardDescription>Ranking based on total sales value in the current period.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Rank</TableHead>
                    <TableHead>Representative</TableHead>
                    <TableHead>Team</TableHead>
                    <TableHead className="text-right">Sales Value</TableHead>
                    <TableHead className="text-center w-[100px]">Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salesLeaderboardData.map((rep) => (
                    <TableRow key={rep.rank}>
                      <TableCell className="font-medium text-center">{getRankIndicator(rep.rank)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar data-ai-hint={rep.dataAiHint}>
                            <AvatarImage src={rep.avatar} alt={rep.name} />
                            <AvatarFallback>{rep.name.substring(0,2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{rep.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{rep.team}</TableCell>
                      <TableCell className="text-right font-semibold">{rep.value}</TableCell>
                      <TableCell className="text-center">{getTrendIcon(rep.trend as 'up' | 'down' | 'stable')}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products">
          <Card data-ai-hint="best selling products">
            <CardHeader>
              <CardTitle>Top Performing Products</CardTitle>
              <CardDescription>Ranking based on units sold and total revenue.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Rank</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Units Sold</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productLeaderboardData.map((product) => (
                    <TableRow key={product.rank}>
                      <TableCell className="font-medium text-center">{getRankIndicator(product.rank)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                           <Image src={product.imageUrl} alt={product.name} width={40} height={40} className="rounded-sm" data-ai-hint={product.dataAiHint} />
                          <span className="font-medium">{product.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell className="text-right">{product.unitsSold}</TableCell>
                      <TableCell className="text-right font-semibold">{product.revenue}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="customers">
          <Card data-ai-hint="top spending customers">
            <CardHeader>
              <CardTitle>Top Customers</CardTitle>
              <CardDescription>Ranking based on total spending and order frequency.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Rank</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Total Orders</TableHead>
                    <TableHead className="text-right">Total Spent</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customerLeaderboardData.map((customer) => (
                    <TableRow key={customer.rank}>
                      <TableCell className="font-medium text-center">{getRankIndicator(customer.rank)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar data-ai-hint={customer.dataAiHint}>
                            <AvatarImage src={customer.avatar} alt={customer.name} />
                            <AvatarFallback>{customer.name.substring(0,2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{customer.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{customer.type}</TableCell>
                      <TableCell className="text-right">{customer.orders}</TableCell>
                      <TableCell className="text-right font-semibold">{customer.totalSpent}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
