
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, // Added for Dashboard
  ShoppingCart,
  Package,
  Users,
  Truck,
  Settings as SettingsIcon,
  Printer,
  Store,
  ArchiveRestore,
  Landmark,
  LineChart,
  Trophy,
  Puzzle,
} from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/orders", label: "Orders", icon: ShoppingCart },
  { href: "/pos", label: "POS", icon: Printer },
  { href: "/store", label: "TraxStore", icon: Store },
  { href: "/products", label: "Products", icon: Package },
  { href: "/deliveries", label: "Deliveries", icon: Truck },
  { href: "/customers", label: "Customers", icon: Users },
  { href: "/returns", label: "Returns", icon: ArchiveRestore },
  { href: "/finances", label: "Finances", icon: Landmark },
  { href: "/analytics", label: "Analytics", icon: LineChart },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/integrations", label: "Integrations", icon: Puzzle },
  { href: "/settings", label: "Settings", icon: SettingsIcon },
];

export function AppSidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => {
        const Icon = item.icon;
        
        let isActive;
        if (item.href === "/dashboard") {
          // Special case for dashboard to be active on the exact path
          isActive = pathname === item.href || pathname === '/';
        } else {
          isActive = pathname.startsWith(item.href);
        }

        return (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton
              asChild
              isActive={isActive}
              size="sm"
              className={cn(
                "w-full justify-start",
                isActive && "bg-sidebar-accent text-sidebar-accent-foreground"
              )}
              tooltip={item.label}
            >
              <Link href={item.href}>
                <Icon className="mr-2 h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
