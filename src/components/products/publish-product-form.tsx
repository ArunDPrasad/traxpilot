
'use client';

import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  ProductDialog,
  ProductDialogContent,
  ProductDialogDescription,
  ProductDialogFooter,
  ProductDialogHeader,
  ProductDialogTitle,
} from '@/components/products/product-dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { PlusCircle, Trash2, Lightbulb } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ProductSearchCombobox } from './product-search-combobox';

const variationSchema = z.object({
  productId: z.string(), // To track for duplicates
  name: z.string().min(1, { message: 'Variation name is required.' }),
  price: z.coerce.number().min(0, { message: 'Price must be a positive number.' }),
  stock: z.coerce.number().int().min(0, { message: 'Stock must be a positive integer.' }),
  imageUrl: z.string().url({ message: 'Please enter a valid URL.' }).optional().or(z.literal('')),
});

const productSchema = z.object({
  name: z.string().min(2, { message: 'Product name must be at least 2 characters.' }),
  isVariable: z.boolean().default(false),
  imageUrl: z.string().url({ message: 'Please enter a valid image URL.' }).optional().or(z.literal('')),
  description: z.string().optional(),
  category: z.string().optional(),
  subCategory: z.string().optional(),
  price: z.coerce.number().min(0).optional(),
  stock: z.coerce.number().int().min(0).optional(),
  variations: z.array(variationSchema).optional(),
}).refine(data => {
    if (data.isVariable) {
        return Array.isArray(data.variations) && data.variations.length > 0;
    }
    return data.price !== undefined && data.stock !== undefined;
}, {
    message: "For variable products, at least one variation is required. For simple products, price and stock are required.",
    path: ["variations"],
});

interface PublishProductFormProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    product: any;
    onPublishSuccess: () => void;
}

export function PublishProductForm({ open, onOpenChange, product, onPublishSuccess }: PublishProductFormProps) {
  const { toast } = useToast();
  const [showProductSearch, setShowProductSearch] = useState(false);
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      isVariable: false,
      imageUrl: '',
      description: '',
      category: '',
      subCategory: '',
      price: 0,
      stock: 0,
      variations: [],
    },
  });

  useEffect(() => {
    if (product) {
      const isVariable = Array.isArray(product.variations) && product.variations.length > 0;
      form.reset({
        ...product,
        price: parseFloat(product.price),
        stock: product.stock,
        isVariable: isVariable,
        variations: isVariable ? product.variations.map((v: any) => ({...v, productId: v.id || v.productId})) : [],
      });
    }
  }, [product, form]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variations",
  });

  const isVariable = form.watch('isVariable');
  const existingVariationIds = form.watch('variations')?.map(v => v.productId) || [];

  function onSubmit(values: z.infer<typeof productSchema>) {
    console.log("Publishing product:", values);
    
    toast({
      title: 'Publishing Product',
      description: `"${values.name}" is being published to traxStore.`,
    });
    
    onPublishSuccess();
  }

  return (
    <ProductDialog open={open} onOpenChange={onOpenChange}>
      <ProductDialogContent className="sm:max-w-6xl">
        <ProductDialogHeader>
          <ProductDialogTitle>Publish Product into traxStore</ProductDialogTitle>
          <ProductDialogDescription>
            Review and confirm the details before publishing this product.
          </ProductDialogDescription>
        </ProductDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4 max-h-[70vh] overflow-y-auto pr-6">
            <div className="grid grid-cols-3 gap-x-8">
              {/* --- Column 1 & 2: Main Details --- */}
              <div className="col-span-2 space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Ergonomic Mouse" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="category" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl><Input placeholder="e.g., Electronics" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                    <FormField control={form.control} name="subCategory" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Sub Category</FormLabel>
                            <FormControl><Input placeholder="e.g., Peripherals" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                </div>

                {!isVariable && (
                   <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="e.g., 75.00" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="stock"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Stock Quantity</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="e.g., 120" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </div>

              {/* --- Column 3: Image & Description --- */}
              <div className="col-span-1 space-y-4">
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/image.png" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Describe the product..." {...field} rows={8} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator />
            
            <FormField
                control={form.control}
                name="isVariable"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <FormLabel>Is this a variable product?</FormLabel>
                            <FormDescription>
                                Enable if the product has multiple options, like different sizes or colors.
                            </FormDescription>
                        </div>
                        <FormControl>
                            <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            />
                        </FormControl>
                    </FormItem>
                )}
            />

            {isVariable && (
              <div className="space-y-4">
                <Label>Product Variations</Label>
                {fields.map((field, index) => (
                  <div key={field.id} className="grid grid-cols-12 gap-2 items-end border p-3 rounded-md relative">
                    <div className="col-span-12 sm:col-span-3">
                      <FormField
                        control={form.control}
                        name={`variations.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs">Variation</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Red / Small" {...field} />
                            </FormControl>
                             <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                     <div className="col-span-12 sm:col-span-4">
                      <FormField
                        control={form.control}
                        name={`variations.${index}.imageUrl`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs">Image URL</FormLabel>
                            <FormControl>
                              <Input placeholder="https://example.com/image.png" {...field} />
                            </FormControl>
                             <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                     <div className="col-span-6 sm:col-span-2">
                       <FormField
                          control={form.control}
                          name={`variations.${index}.price`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs">Price</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="e.g., 75.00" {...field} />
                              </FormControl>
                               <FormMessage />
                            </FormItem>
                          )}
                        />
                    </div>
                    <div className="col-span-6 sm:col-span-2">
                      <FormField
                        control={form.control}
                        name={`variations.${index}.stock`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs">Stock</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="e.g., 120" {...field} />
                            </FormControl>
                             <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-12 sm:col-span-1 flex justify-end">
                        <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                  </div>
                ))}
                
                <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowProductSearch(prev => !prev)}
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Variation from Existing
                    </Button>
                </div>
                 {showProductSearch && (
                    <div className="w-full md:w-1/2">
                        <ProductSearchCombobox 
                            excludeProductIds={existingVariationIds}
                            onProductSelect={(selected) => {
                                append({
                                    productId: selected.id,
                                    name: selected.name,
                                    price: parseFloat(selected.price),
                                    stock: selected.stock,
                                    imageUrl: selected.imageUrl,
                                });
                                setShowProductSearch(false);
                            }}
                        />
                    </div>
                 )}

                 {form.formState.errors.variations && <FormMessage>{form.formState.errors.variations.message}</FormMessage>}
              </div>
            )}
            
            <ProductDialogFooter className="pt-4">
              <Button type="submit">Publish to traxStore</Button>
            </ProductDialogFooter>
          </form>
        </Form>
      </ProductDialogContent>
    </ProductDialog>
  );
}
