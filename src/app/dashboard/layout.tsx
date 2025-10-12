"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import AppFooter from "@/components/layout/app-footer";
import AppSidebar from "@/components/layout/app-sidebar";
import dynamic from "next/dynamic";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";

const AppHeader = dynamic(() => import("@/components/layout/app-header"), {
  ssr: false,
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [favoritesCount, setFavoritesCount] = useState(0);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      const favoritesCol = collection(db, "users", user.uid, "favorites");
      const unsubscribe = onSnapshot(favoritesCol, (snapshot) => {
        setFavoritesCount(snapshot.size);
      });
      return () => unsubscribe();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen w-full flex">
      <AppSidebar favoritesCount={favoritesCount} />
      <div className="flex flex-col flex-1">
        <AppHeader />
        <main className="flex-1 p-4 md:p-6 lg:p-8 bg-background overflow-auto">
          {children}
        </main>
        <AppFooter />
      </div>
    </div>
  );
}
