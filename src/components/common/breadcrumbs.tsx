
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';
import { Home } from 'lucide-react';

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

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  const breadcrumbPath = segments.map((segment, index) => {
      const href = `/${segments.slice(0, index + 1).join('/')}`;
      let name = capitalize(segment.replace(/-/g, ' '));

      if (segments[index-1] === 'products' && segment !== 'new') {
        const product = sampleProductsData.find(p => p.id === segment);
        if (product) {
          name = product.name;
        }
      }
      
      if (segment === 'new' && segments[index-1] === 'products') {
        name = 'New Product';
      }
      
      // Don't show 'Dashboard' in text, it's represented by the Home icon
      if (name === 'Dashboard') {
        return null;
      }

      return { name, href };
  }).filter(Boolean) as { name: string, href: string }[];

  return (
    <nav aria-label="Breadcrumb" className="flex items-center text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
            <Home className="h-4 w-4" />
            <span className="sr-only">Dashboard</span>
        </Link>
      {breadcrumbPath.length > 0 && <span className="mx-1">/</span>}
      {breadcrumbPath.map((item, index) => (
        <Fragment key={item.name}>
          <Link href={item.href} className="hover:text-foreground">
              {item.name}
          </Link>
          {index < breadcrumbPath.length -1 && <span className="mx-1">/</span>}
        </Fragment>
      ))}
    </nav>
  );
}
