
'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

// A helper function to capitalize the first letter of a string
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const sampleProductsData = [
  { id: 'PROD001', name: 'Ergonomic Mouse' },
  { id: 'PROD002', name: 'Mechanical Keyboard' },
  { id: 'PROD003', name: 'Organic Coffee Beans' },
  { id: 'PROD004', name: 'Yoga Mat Premium' },
  { id: 'PROD005', name: 'Classic Cotton T-Shirt - White' },
  { id: 'PROD006', name: 'Classic Cotton T-Shirt - Black' },
  { id: 'PROD007', name: 'Classic Cotton T-Shirt - Gray' },
  { id: 'PROD008', name: 'Cozy Fleece Hoodie - Navy' },
  { id: 'PROD009', name: 'Cozy Fleece Hoodie - Heather Gray' },
];


interface PageHeaderProps {
  children?: ReactNode;
}

export function PageHeader({ children }: PageHeaderProps) {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const [pageTitle, setPageTitle] = useState('');

  useEffect(() => {
    if (segments.length > 0) {
      let lastSegment = segments[segments.length - 1];
      if (lastSegment === 'new' && segments[segments.length-2] === 'products') {
        lastSegment = 'New Product';
      }

      let title = capitalize(lastSegment.replace(/-/g, ' '));

      if (segments[segments.length - 2] === 'products' && lastSegment !== 'New Product') {
        const product = sampleProductsData.find(p => p.id === lastSegment);
        if (product) {
          title = product.name;
        }
      }
      
      setPageTitle(title);
    } else {
        setPageTitle('Dashboard'); // Default for root
    }
  }, [pathname, segments]);


  return (
    <div className="px-4 sm:px-6 flex flex-row items-center justify-between gap-4 w-full">
        <h1 className="text-lg font-bold tracking-tight text-foreground">
          {pageTitle}
        </h1>
      {children}
    </div>
  );
}
