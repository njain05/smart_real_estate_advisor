"use client";

import Link from "next/link";
import {
  Home,
  Heart,
  LineChart,
  Gavel,
  Calculator,
  FileCheck2,
  Users,
  Scale,
  Settings,
  LifeBuoy,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils";

const bottomNavItems = [
    { href: "/dashboard/settings", icon: Settings, label: "Settings" },
    { href: "/dashboard/support", icon: LifeBuoy, label: "Support" },
]

const NavLink = ({ href, icon: Icon, label, badge, currentPath }: { href: string; icon: React.ElementType; label: string; badge?: string, currentPath: string }) => {
    const isActive = currentPath === href;
    return (
        <Link
            href={href}
            className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-all duration-200 hover:text-primary hover:bg-muted/50 group",
                isActive && "bg-primary/10 text-primary border-r-2 border-primary shadow-sm"
            )}
        >
            <Icon className={cn(
                "h-4 w-4 transition-colors duration-200",
                isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"
            )} />
            <span className="font-medium">{label}</span>
            {badge && (
                <Badge className="ml-auto flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs bg-primary text-primary-foreground">
                    {badge}
                </Badge>
            )}
        </Link>
    )
};

export default function AppSidebar({ isMobile = false, favoritesCount = 0 }) {
    const pathname = usePathname();

    const navItems = [
        { href: "/dashboard", icon: Home, label: "Properties" },
        { href: "/dashboard/favorites", icon: Heart, label: "Favorites", badge: favoritesCount > 0 ? String(favoritesCount) : undefined },
        { href: "/dashboard/analytics", icon: LineChart, label: "Analytics" },
        { href: "/dashboard/ai-assistant", icon: Sparkles, label: "AI Assistant" },
        { href: "/dashboard/verify-documents", icon: FileCheck2, label: "Verify Docs" },
        { href: "/dashboard/mortgage-calculator", icon: Calculator, label: "Calculator" },
        { href: "/dashboard/legal-resources", icon: Gavel, label: "Legal Resources" },
        { href: "/dashboard/connect-lawyer", icon: Users, label: "Lawyer Connect" },
    ]

    return (
        <div className={cn(!isMobile && "hidden md:block", "border-r bg-muted/40 h-screen sticky top-0")}>
            <div className="flex h-full flex-col">
                {/* Header - Fixed at top */}
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 flex-shrink-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <Link href="/dashboard" className="flex items-center gap-2 font-semibold font-headline">
                        <Scale className="h-6 w-6 text-primary" />
                        <span className="text-lg">SRE Advisor</span>
                    </Link>
                </div>
                
                {/* Main Navigation - Scrollable area */}
                <div className="flex-1 overflow-y-auto py-2">
                    <nav className="space-y-1 px-2 text-sm font-medium lg:px-4">
                        {navItems.map(item => <NavLink key={item.href} {...item} currentPath={pathname} />)}
                    </nav>
                </div>
                
                {/* Bottom Navigation - Fixed at bottom */}
                <div className="border-t bg-gradient-to-t from-muted/40 to-muted/20 p-4 flex-shrink-0">
                    <nav className="space-y-2">
                      {bottomNavItems.map(item => <NavLink key={item.href} {...item} currentPath={pathname} />)}
                    </nav>
                </div>
            </div>
        </div>
    );
}
