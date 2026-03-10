
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Currency } from '@/contexts/CurrencyContext';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: string | number, targetCurrency: Currency): string {
  let numericValue: number;

  if (typeof value === 'string') {
    // Remove existing currency symbols ($, LKR), spaces, and commas
    const cleanedValue = value.replace(/[$,LKR\s]/g, '').replace(/,/g, '');
    numericValue = parseFloat(cleanedValue);
  } else {
    numericValue = value;
  }

  if (isNaN(numericValue)) {
    // Fallback for unparseable values
    return typeof value === 'string' ? value : String(value);
  }

  const formatterOptions: Intl.NumberFormatOptions = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  if (targetCurrency === 'LKR') {
    // Using a non-breaking space for currency symbol might be better `\u00A0`
    return `LKR ${numericValue.toLocaleString('en-US', formatterOptions)}`;
  } else { // USD
    return `$${numericValue.toLocaleString('en-US', formatterOptions)}`;
  }
}
