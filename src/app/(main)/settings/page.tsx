

'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCurrency, type Currency } from '@/contexts/CurrencyContext';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import { CreditCard, Download } from 'lucide-react';

const sampleUsers = [
  { id: 'USER001', name: 'Admin User', role: 'Administrator', email: 'admin@traxpilot.com' },
  { id: 'USER002', name: 'Sales Manager', role: 'Manager', email: 'sales.manager@traxpilot.com' },
  { id: 'USER003', name: 'Support Staff', role: 'Staff', email: 'support@traxpilot.com' },
];

const sampleIntegrations = [
  { name: 'QuickBooks', description: 'Sync your sales and expenses.', connected: true },
  { name: 'Mailchimp', description: 'Manage email marketing campaigns.', connected: false },
  { name: 'Shopify', description: 'Connect your e-commerce store.', connected: true },
];

const currentSubscription = {
  plan: 'Pro Plan',
  status: 'Active' as const,
  nextPaymentDate: '2024-08-15',
  nextPaymentAmount: '99.00',
};

const paymentHistory = [
  { id: 'INV0724', date: '2024-07-15', plan: 'Pro Plan (Monthly)', amount: '99.00', status: 'Paid' as const },
  { id: 'INV0624', date: '2024-06-15', plan: 'Pro Plan (Monthly)', amount: '99.00', status: 'Paid' as const },
  { id: 'INV0524', date: '2024-05-15', plan: 'Pro Plan (Monthly)', amount: '99.00', status: 'Paid' as const },
  { id: 'INV0424', date: '2024-04-15', plan: 'Free Plan', amount: '0.00', status: 'Paid' as const },
];

export default function SettingsPage() {
  const { currency, setCurrency } = useCurrency();

  return (
    <>
      
      <Tabs defaultValue="business" className="w-full">
        <TabsList className="h-8">
          <TabsTrigger value="business" className="h-7 text-xs">Business</TabsTrigger>
          <TabsTrigger value="permissions" className="h-7 text-xs">Permissions</TabsTrigger>
          <TabsTrigger value="integrations" className="h-7 text-xs">Integrations</TabsTrigger>
          <TabsTrigger value="subscription" className="h-7 text-xs">Subscription</TabsTrigger>
        </TabsList>

        <TabsContent value="business">
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>Update your company details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input id="businessName" defaultValue="traxPilot Inc." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" defaultValue="123 Commerce St, Business City, TX 75001" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input id="contactEmail" type="email" defaultValue="contact@traxpilot.com" />
              </div>
              <div className="space-y-2">
                <Label>Currency</Label>
                <RadioGroup
                  value={currency}
                  onValueChange={(value) => setCurrency(value as Currency)}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="USD" id="currency-usd" />
                    <Label htmlFor="currency-usd">USD ($)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="LKR" id="currency-lkr" />
                    <Label htmlFor="currency-lkr">LKR (LKR)</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions">
          <Card>
            <CardHeader>
              <CardTitle>User Permissions</CardTitle>
              <CardDescription>Manage user roles and access levels.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sampleUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex justify-end mt-4">
                <Button>Add User</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Integration Options</CardTitle>
              <CardDescription>Connect traxPilot with other services.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {sampleIntegrations.map((integration) => (
                <Card key={integration.name}>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div>
                      <CardTitle className="text-base">{integration.name}</CardTitle>
                      <CardDescription className="text-xs">{integration.description}</CardDescription>
                    </div>
                    <Switch checked={integration.connected} aria-label={`Connect ${integration.name}`} />
                  </CardHeader>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscription">
            <div className="grid gap-6">
                <Card>
                    <CardHeader className="p-4">
                        <CardTitle className="text-lg">Current Subscription</CardTitle>
                        <CardDescription className="text-xs">Details about your current plan and billing.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-3 gap-4 p-4 pt-0">
                        <div className="flex flex-col space-y-1.5">
                            <Label className="text-xs">Current Plan</Label>
                            <p className="font-semibold text-sm">{currentSubscription.plan}</p>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label className="text-xs">Status</Label>
                            <div className="text-sm"><Badge variant={currentSubscription.status === 'Active' ? 'default' : 'destructive'}>{currentSubscription.status}</Badge></div>
                        </div>
                         <div className="flex flex-col space-y-1.5">
                            <Label className="text-xs">Next Payment</Label>
                            <p className="font-semibold text-sm">{formatCurrency(currentSubscription.nextPaymentAmount, currency)} on {currentSubscription.nextPaymentDate}</p>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between p-4 pt-0">
                        <Button variant="outline" size="sm" className="h-7">Change Plan</Button>
                        <Button variant="destructive" size="sm" className="h-7">Cancel Subscription</Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader className="p-4">
                        <CardTitle className="text-lg">Payment History</CardTitle>
                        <CardDescription className="text-xs">A log of all your past subscription payments.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                         <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="px-2 py-2 text-xs">Invoice ID</TableHead>
                                    <TableHead className="px-2 py-2 text-xs">Date</TableHead>
                                    <TableHead className="px-2 py-2 text-xs">Plan</TableHead>
                                    <TableHead className="px-2 py-2 text-xs">Amount</TableHead>
                                    <TableHead className="px-2 py-2 text-xs">Status</TableHead>
                                    <TableHead className="text-right px-2 py-2 text-xs">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paymentHistory.map((payment) => (
                                    <TableRow key={payment.id}>
                                        <TableCell className="font-medium px-2 py-2 text-xs">{payment.id}</TableCell>
                                        <TableCell className="px-2 py-2 text-xs">{payment.date}</TableCell>
                                        <TableCell className="px-2 py-2 text-xs">{payment.plan}</TableCell>
                                        <TableCell className="px-2 py-2 text-xs">{formatCurrency(payment.amount, currency)}</TableCell>
                                        <TableCell className="px-2 py-2 text-xs">
                                            <Badge variant={payment.status === 'Paid' ? 'secondary' : 'destructive'}>
                                                {payment.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right px-2 py-2 text-xs">
                                            <Button variant="outline" size="sm" className="h-7">
                                                <Download className="mr-2 h-3 w-3" />
                                                Invoice
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
