
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, DollarSign, Users, ShoppingCart, Activity } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SetupWizard } from '@/components/common/setup-wizard';

const summaryCards = [
  { title: 'Total Revenue', value: '$12,345', change: '+12.5%', icon: DollarSign, dataAiHint: 'revenue amount' },
  { title: 'New Customers', value: '89', change: '+20%', icon: Users, dataAiHint: 'customer count' },
  { title: 'Total Orders', value: '245', change: '+8.2%', icon: ShoppingCart, dataAiHint: 'order number' },
  { title: 'Conversion Rate', value: '3.45%', change: '-0.5%', icon: Activity, dataAiHint: 'conversion chart' },
];

export default function DashboardPage() {
    const router = useRouter();
    const [isSetupWizardOpen, setSetupWizardOpen] = useState(false);
    
    // Simulate checking if setup is complete. In a real app, this would be a check against a database.
    useEffect(() => {
        const setupComplete = localStorage.getItem('traxPilotSetupComplete');
        if (!setupComplete) {
            setSetupWizardOpen(true);
        }
    }, []);

    const handleSetupFinish = () => {
        localStorage.setItem('traxPilotSetupComplete', 'true');
        setSetupWizardOpen(false);
        // You might want to refresh data or re-validate state here
    };

    return (
        <>
            <SetupWizard
                open={isSetupWizardOpen}
                onOpenChange={setSetupWizardOpen}
                onFinish={handleSetupFinish}
            />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
                {summaryCards.map((card) => (
                    <Card key={card.title} data-ai-hint={card.dataAiHint}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                            <card.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{card.value}</div>
                            <p className="text-xs text-muted-foreground">{card.change} from last period</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>An overview of recent orders and customer sign-ups.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                            <p>Activity feed will be displayed here.</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>Common tasks at your fingertips.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <Button onClick={() => router.push('/products/new')}>Add New Product</Button>
                        <Button variant="secondary" onClick={() => router.push('/orders')}>View All Orders</Button>
                        <Button variant="outline" onClick={() => router.push('/analytics')}>View Analytics</Button>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
