

'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingBag, Search, Filter, LayoutGrid, List } from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';
import { formatCurrency } from '@/lib/utils';

const sampleStoreItemsData = [
  { id: 'STORE001', name: 'TraxPilot T-Shirt', category: 'Apparel', price: '25.00', stock: 50, imageUrl: 'https://placehold.co/300x300.png?text=T-Shirt', dataAiHint: 'branded t-shirt', rating: 4.5, reviews: 120, colors: ['Black', 'White', 'Navy'] },
  { id: 'STORE002', name: 'TraxPilot Mug', category: 'Accessories', price: '15.00', stock: 100, imageUrl: 'https://placehold.co/300x300.png?text=Mug', dataAiHint: 'company mug', rating: 4.8, reviews: 250, material: 'Ceramic' },
  { id: 'STORE003', name: 'TraxPilot Cap', category: 'Apparel', price: '20.00', stock: 75, imageUrl: 'https://placehold.co/300x300.png?text=Cap', dataAiHint: 'baseball cap', rating: 4.2, reviews: 80 },
  { id: 'STORE004', name: 'Digital Guide to Success', category: 'Digital Products', price: '9.99', stock: Infinity, imageUrl: 'https://placehold.co/300x300.png?text=Guide', dataAiHint: 'ebook cover', rating: 4.9, reviews: 500, format: 'PDF, EPUB' },
];

export default function TraxStorePage() {
  const { currency } = useCurrency();

  const sampleStoreItems = sampleStoreItemsData.map(item => ({
    ...item,
    price: formatCurrency(item.price, currency),
  }));

  return (
    <>


      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search products..." className="pl-10" />
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="apparel">Apparel</SelectItem>
              <SelectItem value="accessories">Accessories</SelectItem>
              <SelectItem value="digital">Digital Products</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">More Filters</span>
          </Button>
          <Button variant="outline" size="icon">
            <LayoutGrid className="h-4 w-4" />
            <span className="sr-only">Grid View</span>
          </Button>
          <Button variant="ghost" size="icon">
            <List className="h-4 w-4" />
            <span className="sr-only">List View</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sampleStoreItems.map((item) => (
          <Card key={item.id} className="flex flex-col" data-ai-hint={item.dataAiHint}>
            <CardHeader className="p-0">
              <div className="relative h-56 w-full rounded-t-md overflow-hidden">
                <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                <Badge variant="secondary" className="absolute top-2 right-2">
                  {item.category === "Digital Products" ? "Digital" : "Physical"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-4 flex-grow">
              <CardTitle className="text-lg mb-1">{item.name}</CardTitle>
              <CardDescription className="text-sm">{item.category}</CardDescription>
              <div className="mt-2 flex items-center">
                <span className="text-sm text-amber-500">{'★★★★☆'.substring(0, Math.round(item.rating))}{'★★★☆☆'.substring(Math.round(item.rating))}</span>
                <span className="ml-2 text-xs text-muted-foreground">({item.reviews} reviews)</span>
              </div>
              <p className="text-lg font-semibold mt-2">{item.price}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <Button variant="outline" size="sm">View Details</Button>
              <Button size="sm">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
