

'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, ArrowDownLeft, Download, PlusCircle, TrendingUp, Banknote, Landmark as LandmarkIcon, FilePieChart } from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';
import { formatCurrency } from '@/lib/utils';

const sampleTransactionsData = [
  { id: 'TRN001', date: '2024-07-30', description: 'Sale - Order ORD001', type: 'Income', amount: '125.50', status: 'Completed' },
  { id: 'TRN002', date: '2024-07-29', description: 'Supplier Payment - INV0722A', type: 'Expense', amount: '350.00', status: 'Completed' },
  { id: 'TRN003', date: '2024-07-28', description: 'Refund - Return RET002', type: 'Expense', amount: '78.00', status: 'Completed' },
  { id: 'TRN004', date: '2024-07-27', description: 'Platform Subscription', type: 'Expense', amount: '49.00', status: 'Recurring' },
  { id: 'TRN005', date: '2024-07-26', description: 'Sale - Order ORD004', type: 'Income', amount: '55.20', status: 'Pending' },
];

const accountSummariesData = [
 { name: 'Main Checking Account', balance: '15234.80', type: 'Checking', dataAiHint: 'bank statement', icon: LandmarkIcon },
 { name: 'Business Savings', balance: '50102.00', type: 'Savings', dataAiHint: 'piggy bank', icon: Banknote },
 { name: 'Stripe Payouts', balance: '1876.55', type: 'Payment Processor', dataAiHint: 'online payment', icon: FilePieChart },
];

const summaryCardData = {
  totalIncome: '5890.32',
  totalExpenses: '2120.75',
  netProfit: '3769.57',
  totalBalance: '67213.35'
};

export default function FinancesPage() {
  const { currency } = useCurrency();

  const sampleTransactions = sampleTransactionsData.map(transaction => ({
    ...transaction,
    amountFormatted: (transaction.type === 'Income' ? '+' : '-') + formatCurrency(transaction.amount, currency),
  }));

  const accountSummaries = accountSummariesData.map(account => ({
    ...account,
    balance: formatCurrency(account.balance, currency),
  }));

  return (
    <>
      

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card data-ai-hint="total income graph">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{formatCurrency(summaryCardData.totalIncome, currency)}</div>
            <p className="text-xs text-muted-foreground">+15.2% from last month</p>
          </CardContent>
        </Card>
        <Card data-ai-hint="total expenses chart">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <ArrowDownLeft className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{formatCurrency(summaryCardData.totalExpenses, currency)}</div>
            <p className="text-xs text-muted-foreground">+5.1% from last month</p>
          </CardContent>
        </Card>
        <Card data-ai-hint="net profit graph">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{formatCurrency(summaryCardData.netProfit, currency)}</div>
            <p className="text-xs text-muted-foreground">+22.8% from last month</p>
          </CardContent>
        </Card>
         <Card data-ai-hint="account balance summary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <LandmarkIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{formatCurrency(summaryCardData.totalBalance, currency)}</div>
            <p className="text-xs text-muted-foreground">Across 3 accounts</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions">
        <TabsList className="mb-4">
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="accounts">Accounts</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>View your latest financial activities.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sampleTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell className="font-medium">{transaction.description}</TableCell>
                      <TableCell>
                        <Badge variant={transaction.type === 'Income' ? 'secondary' : 'outline'}>
                          {transaction.type}
                        </Badge>
                      </TableCell>
                      <TableCell className={transaction.type === 'Income' ? 'text-green-500' : 'text-red-500'}>
                        {transaction.amountFormatted}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge variant={transaction.status === 'Completed' ? 'default' : transaction.status === 'Recurring' ? 'secondary': 'destructive'}>
                            {transaction.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="accounts">
          <Card>
            <CardHeader>
              <CardTitle>Connected Accounts</CardTitle>
              <CardDescription>Manage your bank accounts and payment processors.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {accountSummaries.map((account) => {
                const Icon = account.icon;
                return (
                  <Card key={account.name} data-ai-hint={account.dataAiHint}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <div className="flex items-center gap-3">
                        <Icon className="h-6 w-6 text-muted-foreground" />
                        <div>
                          <CardTitle className="text-sm">{account.name}</CardTitle>
                          <CardDescription className="text-xs">{account.type}</CardDescription>
                        </div>
                      </div>
                      <div className="text-lg font-semibold">{account.balance}</div>
                    </CardHeader>
                     <CardContent className="flex justify-end">
                        <Button variant="outline" size="sm">View Details</Button>
                     </CardContent>
                  </Card>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports">
            <Card data-ai-hint="financial report generation">
                <CardHeader>
                    <CardTitle>Financial Reports</CardTitle>
                    <CardDescription>Generate profit & loss, balance sheets, and other financial statements.</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex flex-col items-center justify-center space-y-4">
                    <FilePieChart className="h-16 w-16 text-muted-foreground" />
                    <p className="text-muted-foreground">Select report type and date range to generate.</p>
                    <Button>Generate New Report</Button>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
