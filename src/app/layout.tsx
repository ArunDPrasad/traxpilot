
import type { ReactNode } from 'react';
import { GeistSans } from 'geist/font/sans';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { Providers } from './providers';
import './globals.css';

export const metadata = {
  title: 'traxPilot',
  description: 'Your business management copilot.',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={cn('antialiased', GeistSans.variable)}>
      <body>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
