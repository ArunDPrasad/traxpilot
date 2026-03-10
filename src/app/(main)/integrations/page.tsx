

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plug, Settings, Search, Filter, AlertTriangle, ExternalLink } from 'lucide-react';
import Image from 'next/image';

const availableIntegrations = [
  { id: 'integ_quickbooks', name: 'QuickBooks', category: 'Accounting', description: 'Sync invoices, expenses, and manage your bookkeeping seamlessly.', logoUrl: 'https://placehold.co/64x64.png?text=QB', dataAiHint: 'accounting software', status: 'Connected', version: 'v2.1.0' },
  { id: 'integ_mailchimp', name: 'Mailchimp', category: 'Marketing', description: 'Automate email campaigns and manage subscriber lists.', logoUrl: 'https://placehold.co/64x64.png?text=MC', dataAiHint: 'email marketing', status: 'Not Connected', version: 'v3.0.5' },
  { id: 'integ_shopify', name: 'Shopify', category: 'E-commerce', description: 'Connect your online store to sync products, orders, and inventory.', logoUrl: 'https://placehold.co/64x64.png?text=S', dataAiHint: 'ecommerce platform', status: 'Connected', version: 'v4.11.2' },
  { id: 'integ_stripe', name: 'Stripe', category: 'Payment', description: 'Process online payments securely and manage subscriptions.', logoUrl: 'https://placehold.co/64x64.png?text=Stripe', dataAiHint: 'payment gateway', status: 'Connected', version: 'v5.2.0' },
  { id: 'integ_slack', name: 'Slack', category: 'Communication', description: 'Receive real-time notifications for important business events.', logoUrl: 'https://placehold.co/64x64.png?text=Slack', dataAiHint: 'team chat', status: 'Not Connected', version: 'v1.8.3' },
  { id: 'integ_google_analytics', name: 'Google Analytics', category: 'Analytics', description: 'Track website traffic and user behavior for better insights.', logoUrl: 'https://placehold.co/64x64.png?text=GA', dataAiHint: 'web analytics', status: 'Requires Setup', version: 'GA4' },
];

export default function IntegrationsPage() {
  return (
    <>
      

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Integration Management</CardTitle>
          <CardDescription>Search, filter, and manage your connected applications.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search integrations (e.g., Shopify, QuickBooks)..." className="pl-10" />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter by Category
            </Button>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {availableIntegrations.map((integration) => (
          <Card key={integration.id} className="flex flex-col" data-ai-hint={integration.dataAiHint}>
            <CardHeader className="flex flex-row items-start gap-4">
              <Image src={integration.logoUrl} alt={`${integration.name} logo`} width={48} height={48} className="rounded-md" />
              <div>
                <CardTitle className="text-lg">{integration.name}</CardTitle>
                <CardDescription className="text-xs">{integration.category} - {integration.version}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground mb-3">{integration.description}</p>
              <div>
                Status: <Badge variant={
                  integration.status === 'Connected' ? 'default' :
                  integration.status === 'Not Connected' ? 'outline' :
                  'destructive'
                }>{integration.status}</Badge>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <ExternalLink className="mr-2 h-4 w-4" />
                Learn More
              </Button>
              {integration.status === 'Connected' && (
                <Button variant="outline" size="sm">
                  <Settings className="mr-2 h-4 w-4" />
                  Configure
                </Button>
              )}
              {integration.status === 'Not Connected' && (
                <Button size="sm">
                  <Plug className="mr-2 h-4 w-4" />
                  Connect
                </Button>
              )}
              {integration.status === 'Requires Setup' && (
                <Button variant="secondary" size="sm">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Setup Required
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
