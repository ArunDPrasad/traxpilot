
'use client';

import type { ReactNode } from 'react';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { AppSidebarNav } from '@/components/navigation/app-sidebar-nav';
import { Breadcrumbs } from '@/components/common/breadcrumbs';
import { LogoIcon } from '@/components/icons/logo-icon';
import { Button } from '@/components/ui/button';
import { PanelLeftClose, PanelRightClose } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Home } from 'lucide-react';

function CustomSidebarHeader() {
    const { state, toggleSidebar } = useSidebar();
    const isExpanded = state === 'expanded';

    return (
        <SidebarHeader className="p-4 flex items-center justify-end">
            <div className={cn("flex items-center")}>
                 <Button variant="ghost" size="icon" onClick={toggleSidebar} className="h-7 w-7">
                    {isExpanded ? <PanelLeftClose /> : <PanelRightClose />}
                 </Button>
            </div>
        </SidebarHeader>
    )
}


export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
          <div className="flex items-center gap-2">
            <LogoIcon />
            <span className="text-lg font-semibold">traxPilot</span>
          </div>
          <div className="flex-1">
            <Breadcrumbs />
          </div>
        </header>
        <div className="flex flex-1">
          <Sidebar collapsible="icon" className="border-r">
            <CustomSidebarHeader />
            <SidebarContent>
              <AppSidebarNav />
            </SidebarContent>
          </Sidebar>
          <main className="flex-1 p-4 sm:p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
