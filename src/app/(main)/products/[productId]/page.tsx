

'use client';

import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { notFound } from 'next/navigation';

// Mock data, in a real app this would be fetched from an API
const sampleProductsData = [
  { id: 'PROD001', name: 'Ergonomic Mouse', category: 'Electronics', price: '75.00', stock: 120, imageUrl: 'https://placehold.co/300x200.png', description: 'A comfortable and efficient ergonomic mouse.' },
  { id: 'PROD002', name: 'Mechanical Keyboard', category: 'Electronics', price: '120.00', stock: 85, imageUrl: 'https://placehold.co/300x200.png', description: 'A tactile mechanical keyboard for gaming and typing.' },
  { id: 'PROD003', name: 'Organic Coffee Beans', category: 'Groceries', price: '22.50', stock: 200, imageUrl: 'https://placehold.co/300x200.png', description: 'High-quality single-origin organic coffee beans.' },
  { id: 'PROD004', name: 'Yoga Mat Premium', category: 'Sports', price: '40.00', stock: 150, imageUrl: 'https://placehold.co/300x200.png', description: 'A premium, non-slip yoga mat for all levels.' },
  { id: 'PROD005', name: 'Classic Cotton T-Shirt - White', category: 'Apparel', price: '18.00', stock: 300, imageUrl: 'https://placehold.co/300x200.png', description: 'A classic white cotton t-shirt.' },
  { id: 'PROD006', name: 'Classic Cotton T-Shirt - Black', category: 'Apparel', price: '18.00', stock: 250, imageUrl: 'https://placehold.co/300x200.png', description: 'A classic black cotton t-shirt.' },
  { id: 'PROD007', name: 'Classic Cotton T-Shirt - Gray', category: 'Apparel', price: '18.00', stock: 200, imageUrl: 'https://placehold.co/300x200.png', description: 'A classic gray cotton t-shirt.' },
  { id: 'PROD008', name: 'Cozy Fleece Hoodie - Navy', category: 'Apparel', price: '55.00', stock: 100, imageUrl: 'https://placehold.co/300x200.png', description: 'A cozy navy fleece hoodie.' },
  { id: 'PROD009', name: 'Cozy Fleece Hoodie - Heather Gray', category: 'Apparel', price: '55.00', stock: 120, imageUrl: 'https://placehold.co/300x200.png', description: 'A cozy heather gray fleece hoodie.' },
];

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.productId as string;
  
  const product = sampleProductsData.find(p => p.id === productId);

  if (!product) {
    notFound();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>Product ID: {product.id}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
            <div>
                <img src={product.imageUrl} alt={product.name} className="rounded-lg object-cover w-full aspect-video" />
            </div>
            <div className="space-y-4">
                <p><strong>Category:</strong> {product.category}</p>
                <p><strong>Price:</strong> ${product.price}</p>
                <p><strong>Stock:</strong> {product.stock} units</p>
                <p><strong>Description:</strong> {product.description}</p>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
