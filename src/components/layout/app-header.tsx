"use client";

import Link from "next/link";
import {
  Bell,
  Search,
  PanelLeft,
  LifeBuoy,
  LogOut,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AppSidebar from "./app-sidebar";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { getAuth, signOut } from "firebase/auth";
import { app } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function AppHeader() {
  const [isClient, setIsClient] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const auth = getAuth(app);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <div className="md:hidden">
        {isClient && (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col p-0">
              <div className="sr-only">Navigation Menu</div>
              <AppSidebar isMobile={true} />
            </SheetContent>
          </Sheet>
        )}
      </div>
      <div className="w-full flex-1 flex justify-center">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search properties..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-auto lg:w-[32rem]"
            />
          </div>
        </form>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full"
            aria-label="View notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>New property matches your search.</DropdownMenuItem>
          <DropdownMenuItem>
            Price drop for a favorited property.
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {user && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full h-9 w-9 sm:h-10 sm:w-10"
              aria-label="User account menu"
            >
              <Avatar className="h-8 w-8 sm:h-9 sm:w-9">
                <AvatarImage src={user.photoURL || ""} alt="@user" />
                <AvatarFallback>
                  {user.email ? user.email.charAt(0).toUpperCase() : "U"}
                </AvatarFallback>
              </Avatar>
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/support">
                <LifeBuoy className="mr-2 h-4 w-4" />
                Support
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  );
}
