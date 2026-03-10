
'use client';

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// Mock product data - in a real app, this would be fetched or passed as a prop
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

type Product = typeof sampleProductsData[0];

interface ProductSearchComboboxProps {
  onProductSelect: (product: Product) => void;
  excludeProductIds?: string[];
}

export function ProductSearchCombobox({ onProductSelect, excludeProductIds = [] }: ProductSearchComboboxProps) {
  const [open, setOpen] = React.useState(true); // Open by default when rendered
  const [value, setValue] = React.useState("");

  const products = sampleProductsData.filter(
    (product) => !excludeProductIds.includes(product.id)
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? products.find((product) => product.id === value)?.name
            : "Select product..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <Command>
          <CommandInput placeholder="Search for a product to add as variation..." />
          <CommandList>
            <CommandEmpty>No product found.</CommandEmpty>
            <CommandGroup>
              {products.map((product) => (
                <CommandItem
                  key={product.id}
                  value={product.id}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    const selectedProduct = products.find(p => p.id === currentValue);
                    if (selectedProduct) {
                      onProductSelect(selectedProduct);
                    }
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === product.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {product.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
