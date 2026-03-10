
'use client';

import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  WizardDialog,
  WizardDialogContent,
  WizardDialogFooter,
  WizardDialogTitle,
} from '@/components/common/wizard-dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { Currency } from '@/contexts/CurrencyContext';
import { Combobox, type ComboboxOption } from '@/components/ui/combobox';
import { Switch } from '../ui/switch';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';

// Step 1: Store Setup Form
const storeSetupSchema = z.object({
  businessName: z.string().min(2, { message: 'Business name is required.' }),
  storeCategory: z.string().min(1, { message: 'Please select a category.' }),
  handle: z.string().min(3, { message: 'Handle must be at least 3 characters.' }).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { message: 'Handle can only contain lowercase letters, numbers, and single hyphens.' }),
  address: z.string().min(5, { message: 'Address is required.'}),
  city: z.string().min(2, { message: 'City is required.' }),
  contactEmail: z.string().email({ message: 'A valid email is required.' }),
  contactPhone: z.string().min(1, { message: 'Contact phone is required.' }),
  currency: z.enum(['USD', 'LKR'], { required_error: 'You need to select a currency.' }),
});

type StoreSetupData = z.infer<typeof storeSetupSchema>;

const dummyStoreCategories: ComboboxOption[] = [
  { value: 'fashion', label: 'Fashion & Apparel' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'home_goods', label: 'Home Goods' },
  { value: 'health_beauty', label: 'Health & Beauty' },
  { value: 'food_drink', label: 'Food & Drink' },
  { value: 'sports_outdoors', label: 'Sports & Outdoors' },
  { value: 'toys_hobbies', label: 'Toys & Hobbies' },
  { value: 'digital_products', label: 'Digital Products & Services' },
  { value: 'other', label: 'Other' },
];

const StepStoreSetup = ({ onSave, initialData }: { onSave: (data: StoreSetupData) => void; initialData: Partial<StoreSetupData> }) => {
  const [storeCategories, setStoreCategories] = useState<ComboboxOption[]>([]);
  const form = useForm<StoreSetupData>({
    resolver: zodResolver(storeSetupSchema),
    defaultValues: {
      businessName: '',
      storeCategory: '',
      handle: '',
      address: '',
      city: '',
      contactEmail: '',
      contactPhone: '',
      currency: 'USD',
      ...initialData,
    },
  });

  useEffect(() => {
    // API Call for Step 1
    async function fetchStoreCategories() {
      // This is where you would make the API call to your backend.
      // e.g., const response = await fetch('/api/shoptypes');
      // const data = await response.json();
      // setStoreCategories(data);
      setStoreCategories(dummyStoreCategories);
    }
    fetchStoreCategories();
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSave)}>
         <div className="grid grid-cols-3 gap-x-4 gap-y-6">
            <FormField control={form.control} name="businessName" render={({ field }) => (
                <FormItem><FormLabel>Business Name</FormLabel><FormControl><Input placeholder="e.g., Pioneer Apparel" {...field} onChange={(e) => {
                    const sanitized = e.target.value.replace(/[^a-zA-Z0-9\s.,&'-]/g, '');
                    field.onChange(sanitized);
                  }} className="h-8" /></FormControl><FormMessage /></FormItem>
            )}/>
             <FormField control={form.control} name="storeCategory" render={({ field }) => (
              <FormItem><FormLabel>Store Category</FormLabel><Combobox options={storeCategories} value={field.value} onChange={field.onChange} placeholder="Select a category..." searchPlaceholder="Search categories..." emptyPlaceholder="No category found." className="h-8" /><FormMessage /></FormItem>
            )}/>
            <FormField
              control={form.control}
              name="handle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Handle</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="your-store-name"
                      {...field}
                      onChange={(e) => {
                        const sanitized = e.target.value
                          .toLowerCase()
                          .replace(/[^a-z0-9-]/g, '') // Allow letters, numbers, and hyphens
                          .replace(/--+/g, '-') // Replace consecutive hyphens with a single one
                          .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
                        field.onChange(sanitized);
                      }}
                      className="h-8"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="col-span-2">
                <FormField control={form.control} name="address" render={({ field }) => (
                    <FormItem><FormLabel>Address</FormLabel><FormControl><Input placeholder="123 Main St" {...field} onChange={(e) => {
                        const sanitized = e.target.value.replace(/[^a-zA-Z0-9\s.,#-]/g, '');
                        field.onChange(sanitized);
                      }} className="h-8" /></FormControl><FormMessage /></FormItem>
                )}/>
            </div>

            <FormField control={form.control} name="city" render={({ field }) => (
                <FormItem><FormLabel>City</FormLabel><FormControl><Input placeholder="San Francisco" {...field} onChange={(e) => {
                    const sanitized = e.target.value.replace(/[^a-zA-Z\s-]/g, '');
                    field.onChange(sanitized);
                  }} className="h-8" /></FormControl><FormMessage /></FormItem>
            )}/>
            
             <FormField control={form.control} name="contactEmail" render={({ field }) => (
                <FormItem><FormLabel>Contact Email</FormLabel><FormControl><Input type="email" placeholder="contact@example.com" {...field} className="h-8" /></FormControl><FormMessage /></FormItem>
            )}/>

            <FormField control={form.control} name="contactPhone" render={({ field }) => (
                <FormItem><FormLabel>Contact Phone</FormLabel><FormControl><Input placeholder="+1 (555) 123-4567" {...field} onChange={(e) => {
                    const sanitized = e.target.value.replace(/[^\d+()-\s]/g, '');
                    field.onChange(sanitized);
                  }} className="h-8" /></FormControl><FormMessage /></FormItem>
            )}/>
            
            <FormField control={form.control} name="currency" render={({ field }) => (
                <FormItem className="space-y-3"><FormLabel>Default Currency</FormLabel>
                <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                    <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="USD" id="currency-usd" /></FormControl><FormLabel htmlFor="currency-usd" className="font-normal">USD ($)</FormLabel></FormItem>
                    <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="LKR" id="currency-lkr" /></FormControl><FormLabel htmlFor="currency-lkr" className="font-normal">LKR (LKR)</FormLabel></FormItem>
                    </RadioGroup>
                </FormControl><FormMessage />
                </FormItem>
            )}/>
        </div>
        <button type="submit" id="submit-step-1" className="hidden" />
      </form>
    </Form>
  );
};

// Step 2: Product Context
const productContextSchema = z.object({
  attributes: z.record(z.boolean()),
});

type ProductContextData = z.infer<typeof productContextSchema>;
type Attribute = { id: string; name: string; description: string; isRequired?: boolean };

const dummyRecommendedAttributes: Record<string, Attribute[]> = {
    fashion: [
        { id: 'color', name: 'Color', description: 'Product color variants (e.g., Red, Blue).', isRequired: true },
        { id: 'size', name: 'Size', description: 'Sizing options (e.g., S, M, L, XL).', isRequired: true },
        { id: 'material', name: 'Material', description: 'Fabric or material type (e.g., Cotton, Polyester).' },
    ],
    electronics: [
        { id: 'color', name: 'Color', description: 'Device color options.' },
        { id: 'storage', name: 'Storage', description: 'Internal storage capacity (e.g., 64GB, 256GB).', isRequired: true },
        { id: 'condition', name: 'Condition', description: 'Condition of the item (e.g., New, Refurbished).' },
    ],
    home_goods: [
        { id: 'material', name: 'Material', description: 'Main material of the product (e.g., Wood, Metal, Plastic).', isRequired: true },
        { id: 'color', name: 'Color', description: 'Color variants for the item.' },
        { id: 'finish', name: 'Finish', description: 'Surface finish (e.g., Matte, Glossy, Brushed).' },
    ],
    health_beauty: [
        { id: 'skin_type', name: 'Skin Type', description: 'Recommended skin type (e.g., Oily, Dry, Combination).' },
        { id: 'size_volume', name: 'Size/Volume', description: 'Product size or volume (e.g., 50ml, 100g).', isRequired: true },
        { id: 'fragrance', name: 'Fragrance', description: 'Scent profile of the product.' },
    ],
    food_drink: [
        { id: 'dietary_info', name: 'Dietary Info', description: 'Dietary features (e.g., Gluten-Free, Vegan, Nut-Free).' },
        { id: 'allergens', name: 'Allergens', description: 'List of common allergens present.' },
        { id: 'expiration_date', name: 'Expiration Date', description: 'Best before or expiration date.', isRequired: true },
    ],
    sports_outdoors: [
        { id: 'age_group', name: 'Age Group', description: 'Recommended for Adults, Kids, etc.' },
        { id: 'skill_level', name: 'Skill Level', description: 'Beginner, Intermediate, or Advanced.' },
        { id: 'gender', name: 'Gender', description: 'Recommended for Men, Women, or Unisex.' },
    ],
    toys_hobbies: [
        { id: 'age_range', name: 'Age Range', description: 'Recommended age for the toy (e.g., 3+, 8-12).', isRequired: true },
        { id: 'skill_level', name: 'Skill Level', description: 'Complexity or skill required.' },
        { id: 'assembly_required', name: 'Assembly Required', description: 'If the user needs to assemble the product.' },
    ],
    digital_products: [
        { id: 'file_format', name: 'File Format', description: 'File type (e.g., PDF, ZIP, MP4).', isRequired: true },
        { id: 'license_type', name: 'License Type', description: 'Usage rights (e.g., Personal, Commercial).', isRequired: true },
        { id: 'version', name: 'Version', description: 'Software or product version number.' },
    ],
    other: [],
};

const dummyOtherAttributes: Attribute[] = [
    { id: 'weight', name: 'Weight', description: 'Shipping weight of the product.' },
    { id: 'dimensions', name: 'Dimensions', description: 'Product size (L x W x H).' },
    { id: 'warranty', name: 'Warranty', description: 'Warranty period (e.g., 1 Year, 90 Days).' },
    { id: 'brand', name: 'Brand', description: 'The manufacturer or brand name.' },
];


const StepProductContext = ({ onSave, storeCategory, initialData }: { onSave: (data: ProductContextData) => void; storeCategory?: string; initialData: Partial<ProductContextData> }) => {
  const [recommended, setRecommended] = useState<Attribute[]>([]);
  const [other, setOther] = useState<Attribute[]>([]);

  useEffect(() => {
    const category = storeCategory || 'other';

    // API Call for Recommended Attributes
    async function fetchRecommended() {
        // e.g., const response = await fetch(`/api/attributes-recommended/${category}`);
        // const data = await response.json();
        // setRecommended(data);
        setRecommended(dummyRecommendedAttributes[category] || []);
    }

    // API Call for Other Attributes
    async function fetchOther() {
        // e.g., const response = await fetch(`/api/attributes-other`);
        // const data = await response.json();
        // setOther(data);
        setOther(dummyOtherAttributes);
    }

    fetchRecommended();
    fetchOther();
  }, [storeCategory]);
  
  const form = useForm<ProductContextData>({
    resolver: zodResolver(productContextSchema),
    defaultValues: initialData,
  });
  
  useEffect(() => {
    const allAttributes = [...recommended, ...other];
    const defaultValues = {
      attributes: allAttributes.reduce((acc, attr) => {
        // Use existing data if available, otherwise set defaults
        if (initialData.attributes && initialData.attributes[attr.id] !== undefined) {
          acc[attr.id] = initialData.attributes[attr.id];
        } else {
          acc[attr.id] = !!attr.isRequired;
        }
        return acc;
      }, {} as Record<string, boolean>),
    };
    form.reset(defaultValues);
  }, [recommended, other, form, initialData]);

  const renderAttributeSwitches = (attributes: Attribute[]) => (
    <div className="grid grid-cols-3 gap-x-8 gap-y-4">
      {attributes.map((attr) => (
        <FormField
          key={attr.id}
          control={form.control}
          name={`attributes.${attr.id}`}
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-2">
              <FormControl>
                <Switch 
                  checked={field.value} 
                  onCheckedChange={field.onChange} 
                  id={field.name}
                  disabled={attr.isRequired} 
                />
              </FormControl>
              <FormLabel htmlFor={field.name} className="font-normal cursor-pointer">{attr.name}</FormLabel>
            </FormItem>
          )}
        />
      ))}
    </div>
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSave)} className="space-y-8">
        <div>
            <h3 className="text-lg font-medium">Recommended for You</h3>
            <p className="text-sm text-muted-foreground">Based on your store category, we suggest enabling these attributes.</p>
            <div className="mt-4">
                {renderAttributeSwitches(recommended)}
            </div>
        </div>

        <div>
            <h3 className="text-lg font-medium">Other Available Attributes</h3>
            <p className="text-sm text-muted-foreground">Enable any other attributes you might need for your products.</p>
            <div className="mt-4">
                {renderAttributeSwitches(other)}
            </div>
        </div>
        <button type="submit" id="submit-step-2" className="hidden" />
      </form>
    </Form>
  );
};


// Step 3: Courier Service
const courierServiceSchema = z.object({
  templateAttributes: z.record(z.boolean()),
});

type CourierServiceData = z.infer<typeof courierServiceSchema>;
type TemplateAttribute = { id: string; name: string; description: string; isRequired?: boolean };

const dummyOrderTemplateAttributes: TemplateAttribute[] = [
    { id: 'orderId', name: 'Order ID', description: 'The unique identifier for the order.', isRequired: true },
    { id: 'customerName', name: 'Customer Name', description: "The full name of the recipient.", isRequired: true },
    { id: 'deliveryAddress', name: 'Delivery Address', description: 'The full shipping address.', isRequired: true },
    { id: 'contactNumber', name: 'Contact Number', description: "The customer's phone number.", isRequired: true },
    { id: 'orderValue', name: 'Order Value', description: 'Total value of the order for COD.', isRequired: true },
    { id: 'productDescription', name: 'Product Description', description: 'A summary of the items in the order.' },
    { id: 'quantity', name: 'Total Quantity', description: 'Total number of items in the order.' },
    { id: 'weight', name: 'Package Weight (kg)', description: 'Estimated weight of the package.' },
    { id: 'notes', name: 'Special Notes', description: 'Any special delivery instructions.' },
    { id: 'sku', name: 'Product SKUs', description: 'Comma-separated list of product SKUs.' },
];

const StepCourierService = ({ onSave, initialData }: { onSave: (data: CourierServiceData) => void; initialData: Partial<CourierServiceData> }) => {
    const [attributes, setAttributes] = useState<TemplateAttribute[]>([]);

    useEffect(() => {
        // API Call for Step 3
        async function fetchTemplateAttributes() {
            // e.g., const response = await fetch('/api/order-template-attributes');
            // const data = await response.json();
            // setAttributes(data);
            setAttributes(dummyOrderTemplateAttributes);
        }
        fetchTemplateAttributes();
    }, []);

    const form = useForm<CourierServiceData>({
        resolver: zodResolver(courierServiceSchema),
        defaultValues: initialData,
    });

    useEffect(() => {
        const defaultValues = {
            templateAttributes: attributes.reduce((acc, attr) => {
                if (initialData.templateAttributes && initialData.templateAttributes[attr.id] !== undefined) {
                    acc[attr.id] = initialData.templateAttributes[attr.id];
                } else {
                    acc[attr.id] = true;
                }
                return acc;
            }, {} as Record<string, boolean>),
        };
        form.reset(defaultValues);
    }, [attributes, form, initialData]);

    const requiredAttributes = attributes.filter(attr => attr.isRequired);
    const optionalAttributes = attributes.filter(attr => !attr.isRequired);

    const renderAttributeSwitches = (attrs: TemplateAttribute[]) => (
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            {attrs.map((attr) => (
                <FormField
                    key={attr.id}
                    control={form.control}
                    name={`templateAttributes.${attr.id}`}
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                             <div className="space-y-0.5">
                                <FormLabel className="cursor-pointer">{attr.name}</FormLabel>
                                <FormDescription>{attr.description}</FormDescription>
                            </div>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    id={field.name}
                                    disabled={attr.isRequired}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
            ))}
        </div>
    );

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSave)} className="space-y-8">
                 <div>
                    <h3 className="text-lg font-medium">Required Fields</h3>
                    <p className="text-sm text-muted-foreground">These fields are essential for most courier services and cannot be disabled.</p>
                    <div className="mt-4">
                        {renderAttributeSwitches(requiredAttributes)}
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-medium">Optional Fields</h3>
                    <p className="text-sm text-muted-foreground">Enable or disable these fields to match your courier's specific template.</p>
                    <div className="mt-4">
                        {renderAttributeSwitches(optionalAttributes)}
                    </div>
                </div>
                <button type="submit" id="submit-step-3" className="hidden" />
            </form>
        </Form>
    );
};


const steps = [
  { id: 1, title: 'Setup Store', description: 'Configure your basic store details.', component: StepStoreSetup, schema: storeSetupSchema },
  { id: 2, title: 'Product Context', description: 'Define default settings for new products.', component: StepProductContext, schema: productContextSchema },
  { id: 3, title: 'Courier Service', description: 'Create a template for courier orders.', component: StepCourierService, schema: courierServiceSchema },
];

interface SetupWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFinish: () => void;
}

export function SetupWizard({ open, onOpenChange, onFinish }: SetupWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<StoreSetupData & ProductContextData & CourierServiceData>>({});

  const handleNext = async () => {
    // Programmatically trigger form submission for the current step
    document.getElementById(`submit-step-${steps[currentStep].id}`)?.click();
  };

  const handleStepSave = (data: any) => {
    const updatedData = {...formData, ...data};
    setFormData(updatedData);

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // This is the final step. Time to submit everything.
      console.log('Final Setup Data:', updatedData);
      
      const tenantId = 'tenant_xyz123'; // Placeholder for tenant ID from session.

      // 1. Submit Store Details (from Step 1)
      // fetch('/api/store-details', {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify({ tenantId, ...updatedData }),
      // });
      
      // 2. Submit Product Context (from Step 2)
      if ((updatedData as any).attributes) {
        const productContextData = {
          tenantId,
          enabledAttributes: Object.keys((updatedData as any).attributes).filter(
            (key) => (updatedData as any).attributes[key] === true
          ),
        };
        console.log('Data to be sent to POST /product-context:', productContextData);
        // fetch('/api/product-context', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(productContextData),
        // });
      }

      // 3. Submit Order Template Context (from Step 3)
      if ((updatedData as any).templateAttributes) {
          const orderTemplateData = {
              tenantId,
              enabledAttributes: Object.keys((updatedData as any).templateAttributes).filter(
                  (key) => (updatedData as any).templateAttributes[key] === true
              ),
          };
          console.log('Data to be sent to POST /order-template-context:', orderTemplateData);
          // fetch('/api/order-template-context', {
          //     method: 'POST',
          //     headers: { 'Content-Type': 'application/json' },
          //     body: JSON.stringify(orderTemplateData),
          // });
      }

      onFinish();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <WizardDialog open={open} onOpenChange={onOpenChange}>
      <WizardDialogContent className="sm:max-w-4xl p-0" onInteractOutside={(e) => e.preventDefault()}>
        <div className="grid grid-cols-3">
           <div className="col-span-1 bg-muted/50 p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="z-10">
              <WizardDialogTitle className="text-2xl">{`Step ${currentStep + 1}: ${steps[currentStep].title}`}</WizardDialogTitle>
              <p className="mt-2 text-sm text-muted-foreground">{steps[currentStep].description}</p>
              {currentStep === 1 && (
                <p className="mt-2 text-sm text-muted-foreground">ඔබගේ products සදහා අදාළ වන විස්තර තෝරන්න.</p>
              )}
            </div>
            <div className="absolute inset-0 h-full w-full">
              <svg width="100%" height="100%" viewBox="0 0 400 800" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M-200,800 C-100,700 100,750 200,800 S400,700 500,800 V0 H-200 Z" fill="hsl(var(--primary) / 0.05)" />
                <path d="M-100,800 C0,650 200,700 300,800 S500,650 600,800 V0 H-100 Z" fill="hsl(var(--primary) / 0.07)" />
              </svg>
            </div>
          </div>
          <div className="col-span-2 p-8 flex flex-col">
            <div className="flex-grow max-h-[60vh] overflow-y-auto pr-2 min-h-[450px]">
              <div className="flex items-center justify-center space-x-2 mb-8">
                  {steps.map((_, index) => (
                      <div key={index} className={`h-2 w-8 rounded-full ${index <= currentStep ? 'bg-primary' : 'bg-muted'}`} />
                  ))}
              </div>

              <div className="py-4">
                  <CurrentStepComponent 
                    onSave={handleStepSave} 
                    initialData={formData}
                    {...(steps[currentStep].id === 2 && { storeCategory: (formData as any).storeCategory })}
                  />
              </div>
            </div>
            
            <WizardDialogFooter className="justify-between pt-4 border-t mt-auto">
              <div>
                {currentStep > 0 && (
                  <Button variant="outline" onClick={handleBack}>
                    Back
                  </Button>
                )}
              </div>
              <div>
                <Button onClick={handleNext}>
                  {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </WizardDialogFooter>
          </div>
        </div>
      </WizardDialogContent>
    </WizardDialog>
  );
}

    
