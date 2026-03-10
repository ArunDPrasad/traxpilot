
'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useEffect } from 'react';

const variationSchema = z.object({
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

export default function NewProductPage() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      isVariable: false,
      imageUrl: '',
      description: '',
      variations: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variations",
  });

  const isVariable = form.watch('isVariable');
  
  useEffect(() => {
    if (isVariable && fields.length === 0) {
      append({ name: '', price: 0, stock: 0, imageUrl: '' });
    } else if (!isVariable) {
      // Optional: Clear variations when toggling back to simple product
      remove();
    }
  }, [isVariable, fields.length, append, remove]);


  function onSubmit(values: z.infer<typeof productSchema>) {
    console.log(values);
    
    toast({
      title: 'Product Added',
      description: `"${values.name}" has been successfully added.`,
    });
    
    form.reset();
  }

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card className="rounded-none">
            <CardHeader className="flex flex-row justify-between items-start">
                <div>
                    <CardTitle>Add New Product</CardTitle>
                    <CardDescription>
                    Fill in the details below to add a new product to your inventory.
                    </CardDescription>
                </div>
                <FormField
                    control={form.control}
                    name="isVariable"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center gap-2 rounded-lg border p-3 shadow-sm -mt-2">
                            <div className="space-y-0.5">
                                <FormLabel>Variable Product</FormLabel>
                                <FormDescription className="text-xs">
                                    Has multiple options, like sizes or colors.
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
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-x-8">
                    {/* --- Column 1: Main Details --- */}
                    <div className="col-span-1 space-y-4">
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

                        <Card className="bg-muted/50">
                        <CardContent className="p-4 text-sm text-muted-foreground relative">
                            <Lightbulb className="absolute top-4 right-4 h-5 w-5 text-yellow-400 drop-shadow-[0_0_5px_rgba(251,191,36,0.7)]" />
                            <p className="font-semibold text-foreground mb-2">How to name your product:</p>
                            <p>Insert the full qualified name of the product. Combine all the relevant details.</p>
                            <p className="mt-2">For example: <strong className="text-foreground/80">Munchee Tikiri Marie 200g Packet</strong></p>
                            <p className="mt-1 text-xs font-mono bg-background/50 p-2 rounded-md">[Brand] + [Product Name] + [Size/Weight] + [Package Type]</p>
                        </CardContent>
                        </Card>

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

                    {/* --- Column 2: Image & Description --- */}
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
                                <Textarea placeholder="Describe the product..." {...field} className="h-[114px]" />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>
                    </div>

                    <Separator />
                    
                    {isVariable && (
                    <div className="space-y-4 pt-4">
                        <Label>Product Variations</Label>
                        {fields.map((field, index) => (
                        <div key={field.id} className="grid grid-cols-12 gap-2 items-end border p-3 rounded-md relative">
                            <div className="col-span-12 sm:col-span-3">
                            <FormField
                                control={form.control}
                                name={`variations.${index}.name`}
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs">Variation Name</FormLabel>
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
                        
                        <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => append({ name: '', price: 0, stock: 0, imageUrl: '' })}
                        >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Variation
                        </Button>

                        {form.formState.errors.variations && <FormMessage>{form.formState.errors.variations.message}</FormMessage>}
                    </div>
                    )}
                    
                    <div className="flex justify-end pt-4">
                    <Button type="submit">Add Product</Button>
                    </div>
                </div>
            </CardContent>
            </Card>
        </form>
    </Form>
  );
}
