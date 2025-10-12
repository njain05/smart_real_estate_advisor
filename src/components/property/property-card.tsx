import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BedDouble, Bath, Car, Heart, ShieldCheck, IndianRupee } from "lucide-react";
import type { Property } from "@/lib/mock-data";
import { db } from "@/lib/firebase";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { useAuth } from "@/hooks/use-auth";

export default function PropertyCard({ property }: { property: Property }) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    const checkFavorite = async () => {
      const favRef = doc(db, "users", user.uid, "favorites", String(property.id));
      const docSnap = await getDoc(favRef);
      setIsFavorited(docSnap.exists());
      setLoading(false);
    };
    checkFavorite();
  }, [property.id, user]);

  const toggleFavorite = async () => {
    if (!user) {
      // TODO: Prompt user to sign in
      return;
    }
    setLoading(true);
    const favRef = doc(db, "users", user.uid, "favorites", String(property.id));
    if (isFavorited) {
      await deleteDoc(favRef);
      setIsFavorited(false);
    } else {
      await setDoc(favRef, { ...property });
      setIsFavorited(true);
    }
    setLoading(false);
  };

  return (
    <Card className="w-full max-w-sm overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="p-0 relative">
        <Link href={`/dashboard/property/${property.id}`}>
          <Image
            src={property.image}
            alt={property.title}
            width={400}
            height={225}
            className="object-cover w-full h-[225px] transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={property.id % 2 === 0 ? 'apartment interior' : 'house exterior'}
          />
        </Link>
        {property.verified && (
          <Badge variant="default" className="absolute top-3 right-3 bg-green-600 hover:bg-green-700">
            <ShieldCheck className="mr-1 h-4 w-4" />
            Verified
          </Badge>
        )}
        <Button 
          variant="secondary" 
          size="icon" 
          className="absolute top-3 left-3 rounded-full bg-background/70 hover:bg-background"
          onClick={toggleFavorite}
          disabled={loading || !user}
        >
          <Heart 
            className={`h-5 w-5 ${isFavorited ? 'text-red-500 fill-current' : 'text-destructive'}`} 
          />
        </Button>
      </CardHeader>
      <CardContent className="p-4">
        <Link href={`/dashboard/property/${property.id}`}>
          <CardTitle className="text-lg font-headline mb-1 truncate">{property.title}</CardTitle>
        </Link>
        <p className="text-sm text-muted-foreground">{property.location}</p>
        <div className="flex items-baseline my-3">
            <p className="text-2xl font-bold text-primary flex items-center">
              <IndianRupee className="h-6 w-6 mr-1" />
              {property.price.toLocaleString('en-IN')}
            </p>
            <p className="text-sm text-muted-foreground ml-1">/month</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center bg-muted/50">
        <div className="flex gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
                <BedDouble className="h-4 w-4" />
                <span>{property.beds}</span>
            </div>
            <div className="flex items-center gap-1">
                <Bath className="h-4 w-4" />
                <span>{property.baths}</span>
            </div>
            <div className="flex items-center gap-1">
                <Car className="h-4 w-4" />
                <span>{property.parking}</span>
            </div>
        </div>
      </CardFooter>
    </Card>
  );
}
