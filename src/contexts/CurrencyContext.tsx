
'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useEffect } from 'react';

export type Currency = 'USD' | 'LKR';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'traxPilotCurrency';

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>('USD'); // Default to USD

  useEffect(() => {
    // Load currency from localStorage on initial client-side render
    try {
      const storedCurrency = localStorage.getItem(LOCAL_STORAGE_KEY) as Currency | null;
      if (storedCurrency && (storedCurrency === 'USD' || storedCurrency === 'LKR')) {
        setCurrencyState(storedCurrency);
      }
    } catch (error) {
      console.warn('Could not access localStorage for currency setting:', error);
    }
  }, []);

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, newCurrency);
    } catch (error) {
      console.warn('Could not save currency setting to localStorage:', error);
    }
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
