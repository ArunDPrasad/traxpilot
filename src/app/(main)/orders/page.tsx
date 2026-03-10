

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle, AlertTriangle, FilePlus2, Loader2, CheckCircle2, ListOrdered, ShoppingCart, Calendar as CalendarIcon, Plus, X, Pin, XCircle, MoreVertical } from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';
import { format, formatISO } from 'date-fns';
import { cn, formatCurrency } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const allSampleOrdersData = [
    { id: 'ORD001', customer: 'Alice Wonderland', date: '2024-07-28', orderStatus: 'Delivered', paymentStatus: 'Paid', total: '125.50', items: 2, paymentMethod: 'Online', paymentMethodValue: '125.50', returnReason: 'N/A', customerMobile: '555-0101' },
    { id: 'ORD002', customer: 'Bob The Builder', date: '2024-07-27', orderStatus: 'Processing', paymentStatus: 'Paid', total: '78.00', items: 3, paymentMethod: 'Bank Transfer', paymentMethodValue: '78.00', returnReason: 'N/A', customerMobile: '555-0102' },
    { id: 'ORD003', customer: 'Charlie Brown', date: '2024-07-27', orderStatus: 'Delivered', paymentStatus: 'Paid', total: '210.00', items: 4, paymentMethod: 'Bank Transfer', paymentMethodValue: '210.00', returnReason: 'N/A', customerMobile: '555-0103' },
    { id: 'ORD004', customer: 'Diana Prince', date: '2024-07-26', orderStatus: 'Returned', paymentStatus: 'Refunded', total: '55.20', items: 1, paymentMethod: 'COD', paymentMethodValue: '55.20', returnReason: 'Customer Fault', customerMobile: '555-0104' },
    { id: 'ORD005', customer: 'Eva Green', date: '2024-07-31', orderStatus: 'Processing', paymentStatus: 'Paid', total: '99.00', items: 2, paymentMethod: 'Online', paymentMethodValue: '99.00', returnReason: 'N/A', customerMobile: '555-0105' },
    { id: 'ORD006', customer: 'Frank Miller', date: '2024-07-31', orderStatus: 'Delivered', paymentStatus: 'Paid', total: '42.50', items: 1, paymentMethod: 'COD', paymentMethodValue: '42.50', returnReason: 'N/A', customerMobile: '555-0106' },
    { id: 'ORD007', customer: 'Grace Hopper', date: '2024-07-30', orderStatus: 'Processing', paymentStatus: 'Paid', total: '150.25', items: 5, paymentMethod: 'Online', paymentMethodValue: '150.25', returnReason: 'N/A', customerMobile: '555-0107' },
    { id: 'ORD008', customer: 'Henry Ford', date: '2024-07-29', orderStatus: 'Delivered', paymentStatus: 'Paid', total: '88.00', items: 1, paymentMethod: 'COD', paymentMethodValue: '88.00', returnReason: 'N/A', customerMobile: '555-0108' },
    { id: 'ORD009', customer: 'Isaac Newton', date: '2024-07-25', orderStatus: 'Returned', paymentStatus: 'Paid', total: '30.00', items: 1, paymentMethod: 'Bank Transfer', paymentMethodValue: '30.00', returnReason: 'Courier Fault', customerMobile: '555-0109' },
    { id: 'ORD010', customer: 'Jane Austen', date: '2024-07-24', orderStatus: 'Returned', paymentStatus: 'Paid', total: '45.00', items: 1, paymentMethod: 'Online', paymentMethodValue: '45.00', returnReason: 'Courier Fault', customerMobile: '555-0110' },
  ];

const sampleNewOrdersData = allSampleOrdersData.filter(o => ['Pending Payment', 'Awaiting Fulfillment'].includes(o.orderStatus));
const sampleProcessingOrdersData = allSampleOrdersData.filter(o => o.orderStatus === 'Processing');
const sampleCompletedOrdersData = allSampleOrdersData.filter(o => o.orderStatus === 'Delivered');
const sampleReturnedOrdersData = allSampleOrdersData.filter(o => o.orderStatus === 'Returned');


const getStatusBadgeVariant = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending':
    case 'pending payment':
    case 'awaiting fulfillment':
        return 'destructive';
    case 'paid':
        return 'secondary';
    case 'processing':
        return 'secondary';
    case 'shipped':
        return 'default';
    case 'delivered':
        return 'outline';
    case 'returned':
    case 'refunded':
        return 'destructive';
    default:
        return 'default';
  }
};


const OrderStatusTabs = ({ activeSheetId }: { activeSheetId: string }) => {
  const { currency } = useCurrency();
  const formatOrderList = (orders: typeof allSampleOrdersData) => 
    orders.map(order => ({ 
      ...order, 
      total: formatCurrency(order.total, currency),
      paymentMethodValue: formatCurrency(order.paymentMethodValue, currency) 
    }));

  const sampleNewOrders = formatOrderList(sampleNewOrdersData);
  const sampleProcessingOrders = formatOrderList(sampleProcessingOrdersData);
  const sampleCompletedOrders = formatOrderList(sampleCompletedOrdersData);
  const allSampleOrders = formatOrderList(allSampleOrdersData);
  
  const todaySheetId = formatISO(new Date(), { representation: 'date' });
  const showNewOrderButton = activeSheetId === 'master' || activeSheetId === todaySheetId;
  const isMasterSheet = activeSheetId === 'master';
  
  const renderTable = (orders: typeof allSampleOrders, emptyIcon: React.ReactNode, emptyText: string) => (
    <Card className='rounded-none'>
      <CardContent className="pt-0">
        {orders.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-2 py-2 text-xs">#</TableHead>
                <TableHead className="px-2 py-2 min-w-[100px] text-xs">Order Number</TableHead>
                <TableHead className="px-2 py-2 text-xs">Customer</TableHead>
                {isMasterSheet && <TableHead className="px-2 py-2 text-xs">Date</TableHead>}
                <TableHead className="px-2 py-2 text-xs">Order Value</TableHead>
                <TableHead className="px-2 py-2 text-xs">Order Status</TableHead>
                <TableHead className="px-2 py-2 text-xs">Payment Status</TableHead>
                <TableHead className="px-2 py-2 text-center text-xs">COD</TableHead>
                <TableHead className="px-2 py-2 text-center text-xs">Bank Transfer</TableHead>
                <TableHead className="px-2 py-2 text-center text-xs">Online</TableHead>
                <TableHead className="px-2 py-2 text-xs">Return Reason</TableHead>
                <TableHead className="px-2 py-2 min-w-[120px] text-xs">Customer Mobile</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order, index) => (
                <TableRow key={order.id}>
                  <TableCell className="px-2 py-2 whitespace-nowrap text-xs">{index + 1}</TableCell>
                  <TableCell className="px-2 py-2 whitespace-nowrap font-medium text-xs">{order.id}</TableCell>
                  <TableCell className="px-2 py-2 whitespace-nowrap text-xs">{order.customer}</TableCell>
                  {isMasterSheet && <TableCell className="px-2 py-2 whitespace-nowrap text-xs">{order.date}</TableCell>}
                  <TableCell className="px-2 py-2 whitespace-nowrap text-xs">{order.total}</TableCell>
                  <TableCell className="px-2 py-2 whitespace-nowrap text-xs">
                    <Badge variant={getStatusBadgeVariant(order.orderStatus)}>
                      {order.orderStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-2 py-2 whitespace-nowrap text-xs">
                     <Badge variant={getStatusBadgeVariant(order.paymentStatus)}>
                      {order.paymentStatus}
                    </Badge>
                  </TableCell>
                   <TableCell className="px-2 py-2 whitespace-nowrap text-center text-xs">
                    {order.paymentMethod === 'COD' ? order.paymentMethodValue : '-'}
                  </TableCell>
                  <TableCell className="px-2 py-2 whitespace-nowrap text-center text-xs">
                    {order.paymentMethod === 'Bank Transfer' ? order.paymentMethodValue : '-'}
                  </TableCell>
                  <TableCell className="px-2 py-2 whitespace-nowrap text-center text-xs">
                    {order.paymentMethod === 'Online' ? order.paymentMethodValue : '-'}
                  </TableCell>
                  <TableCell className="px-2 py-2 whitespace-nowrap text-xs">{order.returnReason}</TableCell>
                  <TableCell className="px-2 py-2 whitespace-nowrap text-xs">{order.customerMobile}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            {emptyIcon}
            <p className="text-muted-foreground">{emptyText}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <Tabs defaultValue="all_orders" className="w-full">
      <div className="mb-0 flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-4">
          <TabsList className="h-auto rounded-md my-2">
              <TabsTrigger value="all_orders" className="h-7 text-xs data-[state=active]:rounded-sm">All Orders</TabsTrigger>
              <TabsTrigger value="new_orders" className="h-7 text-xs data-[state=active]:rounded-sm">New Orders</TabsTrigger>
              <TabsTrigger value="processing_orders" className="h-7 text-xs data-[state=active]:rounded-sm">Processing</TabsTrigger>
              <TabsTrigger value="completed_orders" className="h-7 text-xs data-[state=active]:rounded-sm">Completed</TabsTrigger>
          </TabsList>
          {showNewOrderButton && (
            <div className="flex items-center gap-2">
              <Button size="sm" className="h-8 rounded-none">
                <PlusCircle className="mr-2 h-4 w-4" />
                New Order
              </Button>
            </div>
          )}
      </div>
      <TabsContent value="all_orders" className="mt-0">
        {renderTable(allSampleOrders, <ListOrdered className="h-12 w-12 text-muted-foreground mb-3" />, 'No orders found.')}
      </TabsContent>
      <TabsContent value="new_orders" className="mt-0">
        {renderTable(sampleNewOrders, <AlertTriangle className="h-12 w-12 text-muted-foreground mb-3" />, 'No new orders at the moment.')}
      </TabsContent>
      <TabsContent value="processing_orders" className="mt-0">
        {renderTable(sampleProcessingOrders, <Loader2 className="h-12 w-12 text-muted-foreground mb-3 animate-spin" />, 'No orders currently processing.')}
      </TabsContent>
      <TabsContent value="completed_orders" className="mt-0">
        {renderTable(sampleCompletedOrders, <CheckCircle2 className="h-12 w-12 text-muted-foreground mb-3" />, 'No completed orders to display yet.')}
      </TabsContent>
    </Tabs>
  );
};


type Sheet = {
  id: string;
  title: string;
  pinned: boolean;
};

const getInitialSheets = (): Sheet[] => {
    const today = new Date();
    const todaySheetId = formatISO(today, { representation: 'date' });
    return [
        { id: 'master', title: 'Master', pinned: true },
        { id: todaySheetId, title: 'Today', pinned: true }
    ];
};


export default function OrdersPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isDatePickerOpen, setDatePickerOpen] = useState(false);

  const [sheets, setSheets] = useState<Sheet[]>(getInitialSheets());
  const [activeSheet, setActiveSheet] = useState(getInitialSheets()[0].id);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;
    setDate(selectedDate);
    const newSheetId = formatISO(selectedDate, { representation: 'date' });
    
    if (!sheets.some(sheet => sheet.id === newSheetId)) {
      const newSheet: Sheet = {
        id: newSheetId,
        title: format(selectedDate, 'MM/dd'),
        pinned: false,
      };
      setSheets([...sheets, newSheet]);
      setActiveSheet(newSheetId);
    } else {
        setActiveSheet(newSheetId);
    }
    setDatePickerOpen(false);
  };
  
  const handleCloseSheet = (sheetIdToClose: string) => {
    const sheetToClose = sheets.find(s => s.id === sheetIdToClose);
    if (!sheetToClose || sheetToClose.pinned) return;
  
    const closingSheetIndex = sheets.findIndex(s => s.id === sheetIdToClose);
  
    if (activeSheet === sheetIdToClose) {
      const newActiveIndex = Math.max(0, closingSheetIndex - 1);
      setActiveSheet(sheets[newActiveIndex].id);
    }
  
    setSheets(prevSheets => prevSheets.filter(sheet => sheet.id !== sheetIdToClose));
  };


  const handlePinSheet = (sheetIdToPin: string) => {
    setSheets(prevSheets => {
      const newSheets = prevSheets.map(sheet => 
        sheet.id === sheetIdToPin ? { ...sheet, pinned: !sheet.pinned } : sheet
      );
      
      return newSheets.sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        
        const aIsInitial = getInitialSheets().map(s => s.id).includes(a.id);
        const bIsInitial = getInitialSheets().map(s => s.id).includes(b.id);
        if (aIsInitial && !bIsInitial) return -1;
        if (!aIsInitial && bIsInitial) return 1;
        
        if (a.id === 'master') return -1;
        if (b.id === 'master') return 1;
        if (a.id === getInitialSheets()[1].id) return -1;
        if (b.id === getInitialSheets()[1].id) return 1;


        if (a.id.match(/^\d{4}-\d{2}-\d{2}$/) && b.id.match(/^\d{4}-\d{2}-\d{2}$/)) {
          return new Date(a.id).getTime() - new Date(b.id).getTime();
        }
        return a.title.localeCompare(b.title);
      });
    });
  };

  const handleCloseAllSheets = () => {
    setSheets(getInitialSheets());
    setActiveSheet(getInitialSheets()[0].id);
  };
  
  const initialSheetIds = getInitialSheets().map(s => s.id);

  return (
    <>
      <Tabs value={activeSheet} onValueChange={setActiveSheet} className="w-full">
        <div className="flex items-center px-4">
          <TabsList data-testid="SheetControls" className="h-auto rounded-md my-2">
            {sheets.map((sheet) => (
              <div key={sheet.id} className="relative group">
                <TabsTrigger 
                  value={sheet.id}
                  className={cn("pr-8 h-7 text-xs data-[state=active]:rounded-sm")}
                >
                  {sheet.pinned && !initialSheetIds.includes(sheet.id) && <Pin className="h-3 w-3 mr-1.5 text-muted-foreground" />}
                  <span>{sheet.title}</span>
                </TabsTrigger>
                {!initialSheetIds.includes(sheet.id) && (
                   <div className="absolute right-1 top-1/2 -translate-y-1/2 h-full flex items-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                           <Button variant="ghost" size="icon" className="h-6 w-6 rounded-none">
                              <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="rounded-none">
                            <DropdownMenuItem onClick={() => handlePinSheet(sheet.id)}>
                                <Pin className="mr-2 h-4 w-4" />
                                <span>{sheet.pinned ? 'Unpin' : 'Pin'}</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleCloseSheet(sheet.id)}>
                                <XCircle className="mr-2 h-4 w-4" />
                                <span>Close</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </div>
            ))}
          </TabsList>
           <Popover open={isDatePickerOpen} onOpenChange={setDatePickerOpen}>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-2 h-8 w-8 rounded-none">
                  <Plus className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 rounded-none" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateSelect}
                  disabled={(d) => d > new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {sheets.filter(s => !s.pinned).length > 0 && (
                <Button
                    variant="ghost"
                    size="sm"
                    className="ml-auto text-xs rounded-none"
                    onClick={handleCloseAllSheets}
                >
                    Close Unpinned
                </Button>
            )}
        </div>
        {sheets.map((sheet) => (
          <TabsContent key={sheet.id} value={sheet.id} className="mt-0">
            <Card className="rounded-none">
              <CardContent className="p-0">
                <OrderStatusTabs activeSheetId={sheet.id}/>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
}
