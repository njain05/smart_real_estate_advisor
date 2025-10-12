'use client';

import { useState, useEffect } from 'react';
import PropertyCard from "@/components/property/property-card";
import { Heart } from "lucide-react";
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import type { Property } from '@/lib/mock-data';
import { useAuth } from '@/hooks/use-auth';

export default function FavoritesPage() {
  const [favoriteProperties, setFavoriteProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const favoritesCol = collection(db, "users", user.uid, "favorites");
        const favoritesSnapshot = await getDocs(favoritesCol);
        const favs = favoritesSnapshot.docs.map(doc => doc.data() as Property);
        setFavoriteProperties(favs);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  return (
    <div className="container mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-headline font-bold tracking-tight">
          Your Favorites
        </h1>
        <p className="text-muted-foreground mt-2">
          The properties you&apos;ve saved and loved.
        </p>
      </header>

      {loading ? (
        <div className="text-center text-muted-foreground py-16">
          <p>Loading your favorite properties...</p>
        </div>
      ) : favoriteProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="text-center text-muted-foreground py-16">
            <Heart className="h-12 w-12 mx-auto mb-4" />
            <p>You haven&apos;t favorited any properties yet.</p>
        </div>
      )}
    </div>
  );
}
