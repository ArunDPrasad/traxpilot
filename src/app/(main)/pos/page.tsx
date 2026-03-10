

'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PlusCircle, Minus, Trash2, Edit, Gift, Percent } from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';
import { formatCurrency, cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const allProductsData = [
  { id: 'PROD001', name: 'Ergonomic Mouse', category: 'Electronics', price: 75.00, imageUrl: 'https://placehold.co/100x100.png', dataAiHint: 'computer mouse' },
  { id: 'PROD002', name: 'Mechanical Keyboard', category: 'Electronics', price: 120.00, imageUrl: 'https://placehold.co/100x100.png', dataAiHint: 'keyboard gaming' },
  { id: 'PROD003', name: 'Organic Coffee Beans', category: 'Groceries', price: 22.50, imageUrl: 'https://placehold.co/100x100.png', dataAiHint: 'coffee beans' },
  { id: 'PROD004', name: 'Yoga Mat Premium', category: 'Sports', price: 40.00, imageUrl: 'https://placehold.co/100x100.png', dataAiHint: 'yoga mat' },
  { id: 'PROD005', name: 'Classic Cotton T-Shirt - White', category: 'Apparel', price: 18.00, imageUrl: 'https://placehold.co/100x100.png', dataAiHint: 'white t-shirt' },
  { id: 'PROD006', name: 'Classic Cotton T-Shirt - Black', category: 'Apparel', price: 18.00, imageUrl: 'https://placehold.co/100x100.png', dataAiHint: 'black t-shirt' },
  { id: 'PROD007', name: 'Classic Cotton T-Shirt - Gray', category: 'Apparel', price: 18.00, imageUrl: 'https://placehold.co/100x100.png', dataAiHint: 'gray t-shirt' },
  { id: 'PROD008', name: 'Cozy Fleece Hoodie - Navy', category: 'Apparel', price: 55.00, imageUrl: 'https://placehold.co/100x100.png', dataAiHint: 'navy hoodie' },
  { id: 'PROD009', name: 'Cozy Fleece Hoodie - Heather Gray', category: 'Apparel', price: 55.00, imageUrl: 'https://placehold.co/100x100.png', dataAiHint: 'gray hoodie' },
  { id: 'MILKSHAKE_VANILLA', name: 'Milkshake (Vanilla)', category: 'Food & Drink', price: 800.00, imageUrl: 'https://placehold.co/100x100.png', dataAiHint: 'vanilla milkshake' },
  { id: 'CHICKEN_FRIED_RICE', name: 'Chicken Fried Rice', category: 'Food & Drink', price: 1050.00, imageUrl: 'https://placehold.co/100x100.png', dataAiHint: 'fried rice dish' },
];

const productCategories = ['All', ...Array.from(new Set(allProductsData.map(p => p.category)))];

type Product = typeof allProductsData[0];
type CartItem = Product & { quantity: number };


export default function POSPage() {
  const { currency } = useCurrency();
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentTime, setCurrentTime] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const formattedTime = new Intl.DateTimeFormat('en-US', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }).format(now).replace(',', ' -');
      setCurrentTime(formattedTime);
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  
  const handleAddToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, change: 'increase' | 'decrease') => {
    setCartItems(prevItems => {
      return prevItems.map(item => {
        if (item.id === productId) {
          const newQuantity = change === 'increase' ? item.quantity + 1 : item.quantity - 1;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };
  
  const handleRemoveFromCart = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };


  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  
  const filteredProducts = allProductsData
    .filter(product => activeCategory === 'All' || product.category === activeCategory)
    .map(item => ({
      ...item,
      priceFormatted: formatCurrency(item.price, currency),
    }));

  return (
    <div className="grid md:grid-cols-5 gap-6 p-4">
      {/* --- Left Column: Billing & Payment --- */}
      <div className="md:col-span-2 space-y-6">
        <Card className="flex flex-col">
            <CardHeader className="pb-2">
                <p className="text-xs text-muted-foreground">{currentTime}</p>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="pl-6 text-xs">Product</TableHead>
                            <TableHead className="text-xs">Qty</TableHead>
                            <TableHead className="text-xs">Price</TableHead>
                            <TableHead className="text-xs">Sub</TableHead>
                            <TableHead className="pr-6"></TableHead>
                        </TableRow>
                    </TableHeader>
                </Table>
                <ScrollArea className="h-[200px]">
                    <Table>
                        <TableBody>
                            {cartItems.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell className="pl-6 font-medium text-xs py-1">
                                      <div className="flex items-center gap-2">
                                        {item.name}
                                      </div>
                                    </TableCell>
                                    <TableCell className="py-0">
                                        <div className="flex items-center gap-1">
                                            <Button variant="outline" size="icon" className="h-5 w-5" onClick={() => handleUpdateQuantity(item.id, 'decrease')}><Minus className="h-3 w-3" /></Button>
                                            <Input type="text" value={item.quantity} className="h-5 w-7 text-center text-xs p-0" readOnly />
                                            <Button variant="outline" size="icon" className="h-5 w-5" onClick={() => handleUpdateQuantity(item.id, 'increase')}><PlusCircle className="h-3 w-3" /></Button>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-xs py-1">{formatCurrency(item.price, currency)}</TableCell>
                                    <TableCell className="text-xs py-1">{formatCurrency(item.price * item.quantity, currency)}</TableCell>
                                    <TableCell className="pr-6 py-1">
                                        <Button variant="ghost" size="icon" className="h-5 w-5 text-destructive hover:text-destructive" onClick={() => handleRemoveFromCart(item.id)}>
                                            <Trash2 className="h-3 w-3" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </ScrollArea>
            </CardContent>
            <CardFooter className="flex-col items-end mt-auto p-4">
                 <div className="text-right mb-3">
                    <p className="text-xs text-muted-foreground">Total Items: {totalItems}</p>
                    <p className="text-xl font-bold">Total: {formatCurrency(subtotal, currency)}</p>
                </div>

                <div className="w-full grid grid-cols-3 gap-2 mb-2">
                    <Button variant="outline" size="sm" className="bg-green-100 text-green-800 border-green-300 hover:bg-green-200 h-8">
                        <Gift className="mr-2 h-3 w-3" /> Offers
                    </Button>
                    <div className="relative">
                        <Input placeholder="Tax" className="pr-8 h-8 text-xs" />
                        <Percent className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                    </div>
                     <div className="relative">
                        <Input placeholder="Delivery" className="h-8 text-xs" />
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">{currency}</span>
                    </div>
                </div>

                <div className="w-full grid grid-cols-3 gap-2">
                    <Button variant="secondary" size="sm" className="bg-gray-600 text-white hover:bg-gray-700 h-9">Reset</Button>
                    <Button variant="secondary" size="sm" className="bg-gray-600 text-white hover:bg-gray-700 h-9">Hold</Button>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 h-9">Pay Now</Button>
                </div>
            </CardFooter>
        </Card>
      </div>
      
      {/* --- Right Column: Product Grid --- */}
      <div className="md:col-span-3">
        <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>Products</CardTitle>
              <CardDescription>Select products to add to the sale.</CardDescription>
              <Tabs value={activeCategory} onValueChange={setActiveCategory} className="pt-2">
                <TabsList>
                  {productCategories.map(category => (
                    <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="flex-grow">
              <ScrollArea className="h-[calc(100vh-14rem)]">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 pr-4">
                  {filteredProducts.map(item => (
                    <Button variant="outline" className="h-32 flex flex-col p-3 space-y-1 whitespace-normal" key={item.id} data-ai-hint={item.dataAiHint} onClick={() => handleAddToCart(item)}>
                      <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md mb-2" />
                      <span className="text-xs font-medium text-center block leading-tight">{item.name}</span>
                      <span className="text-xs text-muted-foreground">{item.priceFormatted}</span>
                    </Button>
                  ))}
                   <Button variant="outline" className="h-32 flex flex-col p-3 space-y-1 justify-center items-center">
                      <PlusCircle className="w-8 h-8 text-muted-foreground mb-2" />
                      <span className="text-sm font-medium text-center block">Custom Item</span>
                    </Button>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
      </div>
    </div>
  );
}

    
