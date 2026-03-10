

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlusCircle } from 'lucide-react';

const sampleCustomers = [
  { id: 'CUST001', name: 'Eleanor Vance', email: 'eleanor@example.com', phone: '555-0101', totalOrders: 12, avatarUrl: 'https://placehold.co/40x40.png', dataAiHint: 'woman portrait' },
  { id: 'CUST002', name: 'Marcus Cole', email: 'marcus@example.com', phone: '555-0102', totalOrders: 5, avatarUrl: 'https://placehold.co/40x40.png', dataAiHint: 'man portrait' },
  { id: 'CUST003', name: 'Isabelle Moreau', email: 'isabelle@example.com', phone: '555-0103', totalOrders: 8, avatarUrl: 'https://placehold.co/40x40.png', dataAiHint: 'person smiling' },
  { id: 'CUST004', name: 'Jasper Kim', email: 'jasper@example.com', phone: '555-0104', totalOrders: 21, avatarUrl: 'https://placehold.co/40x40.png', dataAiHint: 'professional headshot' },
];

export default function CustomersPage() {
  return (
    <>
      
      <Card>
        <CardHeader>
          <CardTitle>All Customers</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead className="text-right">Total Orders</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar data-ai-hint={customer.dataAiHint}>
                        <AvatarImage src={customer.avatarUrl} alt={customer.name} />
                        <AvatarFallback>{customer.name.substring(0,2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{customer.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell className="text-right">{customer.totalOrders}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
