
'use client';

import { useState, createContext, useContext, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, ListFilter, File, Share, Store as StoreIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCurrency } from '@/contexts/CurrencyContext';
import { formatCurrency } from '@/lib/utils';
import { PublishProductForm } from '@/components/products/publish-product-form';

type ViewMode = 'list' | 'grid';

interface ProductViewContextType {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const ProductViewContext = createContext<ProductViewContextType | undefined>(undefined);

export function useProductView() {
  const context = useContext(ProductViewContext);
  if (!context) {
    throw new Error('useProductView must be used within a ProductViewProvider');
  }
  return context;
}

function ProductViewProvider({ children }: { children: ReactNode }) {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <ProductViewContext.Provider value={{ viewMode, setViewMode, selectedCategory, setSelectedCategory }}>
      {children}
    </ProductViewContext.Provider>
  );
}

const ProductCard = ({ product, currency }: { product: any; currency: string }) => {
    const router = useRouter();
    const [isPublishing, setIsPublishing] = useState(false);
    
    return (
        <>
         <PublishProductForm 
            open={isPublishing} 
            onOpenChange={setIsPublishing}
            product={product}
            onPublishSuccess={() => {
                setIsPublishing(false);
                // Here you might want to refetch or update the product list
            }}
        />
        <Card key={product.id} className="flex flex-col" data-ai-hint={product.dataAiHint}>
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="cursor-pointer" onClick={() => router.push(`/products/${product.id}`)}>
              {product.name}
            </CardTitle>
            <Badge variant={product.stock > 0 ? 'secondary' : 'destructive'}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
            </Badge>
          </div>
          <CardDescription>{product.category}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <img src={product.imageUrl} alt={product.name} className="rounded-lg object-cover w-full aspect-video" />
          <p className="text-lg font-semibold mt-4">{formatCurrency(product.price, currency as any)}</p>
        </CardContent>
        <CardFooter className="flex justify-between">
            {product.traxStoreStatus === 'published' ? (
                <Button variant="ghost" size="sm" className="text-green-500 hover:text-green-600">
                    <StoreIcon className="mr-2 h-4 w-4" />
                    Published
                </Button>
            ) : (
                <Button variant="outline" size="sm" onClick={() => setIsPublishing(true)}>
                    <StoreIcon className="mr-2 h-4 w-4" />
                    Publish
                </Button>
            )}
            <Button variant="outline" size="sm" onClick={() => router.push(`/products/${product.id}`)}>View Details</Button>
        </CardFooter>
      </Card>
      </>
    );
};


export function ProductsPageClient({ products }: { products: any[] }) {
    const router = useRouter();
    const { currency } = useCurrency();

    return (
        <ProductViewProvider>
            <>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-bold">Products</h1>
                        <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                            <ListFilter className="mr-2 h-4 w-4" />
                            Filter
                        </Button>
                        <Button variant="outline" size="sm">
                            <Share className="mr-2 h-4 w-4" />
                            Export
                        </Button>
                        </div>
                    </div>
                    <Button onClick={() => router.push('/products/new')}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Product
                    </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} currency={currency} />
                    ))}
                </div>
            </>
        </ProductViewProvider>
    );
}
