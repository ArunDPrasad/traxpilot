

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, Search, SlidersHorizontal, FileText, Undo2 } from 'lucide-react';

const sampleReturns = [
  { id: 'RET001', orderId: 'ORD001', customer: 'Alice Wonderland', date: '2024-07-30', status: 'Pending Approval', reason: 'Wrong size', items: 1 },
  { id: 'RET002', orderId: 'ORD003', customer: 'Charlie Brown', date: '2024-07-29', status: 'Refunded', reason: 'Damaged item', items: 2 },
  { id: 'RET003', orderId: 'ORD004', customer: 'Diana Prince', date: '2024-07-28', status: 'Processing', reason: 'Changed mind', items: 1 },
  { id: 'RET004', orderId: 'ORD002', customer: 'Bob The Builder', date: '2024-07-28', status: 'Completed', reason: 'Exchange for different color', items: 1 },
];

export default function ReturnsPage() {
  return (
    <>
      

      <Card>
        <CardHeader>
          <CardTitle>Return Requests</CardTitle>
          <CardDescription>Review and manage incoming return requests.</CardDescription>
          <div className="mt-4 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search by Order ID, Customer..." className="pl-10" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending Approval</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Return ID</TableHead>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleReturns.map((itemReturn) => (
                <TableRow key={itemReturn.id}>
                  <TableCell className="font-medium">{itemReturn.id}</TableCell>
                  <TableCell>{itemReturn.orderId}</TableCell>
                  <TableCell>{itemReturn.customer}</TableCell>
                  <TableCell>{itemReturn.date}</TableCell>
                  <TableCell>{itemReturn.items}</TableCell>
                  <TableCell>{itemReturn.reason}</TableCell>
                  <TableCell>
                    <Badge variant={
                      itemReturn.status === 'Pending Approval' ? 'destructive' :
                      itemReturn.status === 'Processing' ? 'secondary' :
                      itemReturn.status === 'Refunded' ? 'default' : // default is primary
                      'outline' // Completed or other
                    }>
                      {itemReturn.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <FileText className="h-4 w-4" />
                      <span className="sr-only">View Details</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Undo2 className="h-4 w-4" />
                      <span className="sr-only">Process Return</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
