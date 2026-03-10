

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'lucide-react';

const courierServices = [
  { name: 'FedEx', description: 'Reliable global shipping services.', logoUrl: 'https://placehold.co/100x40.png?text=FedEx', dataAiHint: 'shipping courier' },
  { name: 'UPS', description: 'Wide range of logistics solutions.', logoUrl: 'https://placehold.co/100x40.png?text=UPS', dataAiHint: 'delivery truck' },
  { name: 'DHL', description: 'International express mail services.', logoUrl: 'https://placehold.co/100x40.png?text=DHL', dataAiHint: 'logistics company' },
  { name: 'USPS', description: 'Affordable domestic shipping options.', logoUrl: 'https://placehold.co/100x40.png?text=USPS', dataAiHint: 'mail service' },
];

export default function DeliveriesPage() {
  return (
    <>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Available Integrations</CardTitle>
            <CardDescription>
              Connect traxPilot with your preferred courier services to streamline your shipping process.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {courierServices.map((service) => (
                <Card key={service.name} className="flex flex-col items-center p-6 text-center" data-ai-hint={service.dataAiHint}>
                  <img src={service.logoUrl} alt={`${service.name} logo`} className="h-10 mb-4" />
                  <h3 className="text-lg font-semibold mb-1">{service.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-grow">{service.description}</p>
                  <Button variant="outline">
                    <Link className="mr-2 h-4 w-4" />
                    Connect
                  </Button>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>How it Works</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            <p>
              Once connected, traxPilot can automatically fetch shipping rates, generate labels, and update tracking information for your orders. This helps reduce manual work and keeps your customers informed.
            </p>
            <p className="mt-2">
              Further automation features like bulk label printing and automated dispatch notifications will be available based on the capabilities of the integrated courier service.
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
