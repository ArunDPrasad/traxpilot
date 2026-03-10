
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, ListFilter, File, Share, Store as StoreIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ProductsPageClient } from './products-page-client';

const sampleProductsData = [
  { id: 'PROD001', name: 'Ergonomic Mouse', category: 'Electronics', price: '75.00', stock: 120, imageUrl: 'https://placehold.co/300x200.png', dataAiHint: 'computer mouse', traxStoreStatus: 'published' as const },
  { id: 'PROD002', name: 'Mechanical Keyboard', category: 'Electronics', price: '120.00', stock: 85, imageUrl: 'https://placehold.co/300x200.png', dataAiHint: 'keyboard gaming', traxStoreStatus: 'unpublished' as const },
  { id: 'PROD003', name: 'Organic Coffee Beans', category: 'Groceries', price: '22.50', stock: 200, imageUrl: 'https://placehold.co/300x200.png', dataAiHint: 'coffee beans', traxStoreStatus: 'published' as const },
  { id: 'PROD004', name: 'Yoga Mat Premium', category: 'Sports', price: '40.00', stock: 150, imageUrl: 'https://placehold.co/300x200.png', dataAiHint: 'yoga mat', traxStoreStatus: 'unpublished' as const },
  { id: 'PROD005', name: 'Classic Cotton T-Shirt - White', category: 'Apparel', price: '18.00', stock: 300, imageUrl: 'https://placehold.co/300x200.png', dataAiHint: 'white t-shirt', traxStoreStatus: 'published' as const },
  { id: 'PROD006', name: 'Classic Cotton T-Shirt - Black', category: 'Apparel', price: '18.00', stock: 250, imageUrl: 'https://placehold.co/300x200.png', dataAiHint: 'black t-shirt', traxStoreStatus: 'published' as const },
  { id: 'PROD007', name: 'Classic Cotton T-Shirt - Gray', category: 'Apparel', price: '18.00', stock: 200, imageUrl: 'https://placehold.co/300x200.png', dataAiHint: 'gray t-shirt', traxStoreStatus: 'published' as const },
  { id: 'PROD008', name: 'Cozy Fleece Hoodie - Navy', category: 'Apparel', price: '55.00', stock: 100, imageUrl: 'https://placehold.co/300x200.png', dataAiHint: 'navy hoodie', traxStoreStatus: 'unpublished' as const },
  { id: 'PROD009', name: 'Cozy Fleece Hoodie - Heather Gray', category: 'Apparel', price: '55.00', stock: 120, imageUrl: 'https://placehold.co/300x200.png', dataAiHint: 'gray hoodie', traxStoreStatus: 'unpublished' as const },
];

export default function ProductsPage() {
  return <ProductsPageClient products={sampleProductsData} />;
}
