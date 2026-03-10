
'use client';

import { CurrencyProvider } from '@/contexts/CurrencyContext';
import type { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return <CurrencyProvider>{children}</CurrencyProvider>;
}
