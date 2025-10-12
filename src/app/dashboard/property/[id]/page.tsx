'use client';

import { use } from "react";
import { properties } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BedDouble, Bath, Car, ShieldCheck, Heart, MapPin, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const property = properties.find((p) => p.id === parseInt(id));

  if (!property) {
    notFound();
  }

  return (
    <div className="container mx-auto">
      <Card>
        <CardHeader className="p-0">
          <Image
            src={property.image}
            alt={property.title}
            width={1200}
            height={500}
            className="object-cover w-full h-[500px] rounded-t-lg"
          />
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl font-headline mb-2">{property.title}</CardTitle>
              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <MapPin className="h-5 w-5" />
                <span>{property.location}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
                {property.verified && (
                    <Badge variant="default" className="bg-green-600 hover:bg-green-700 text-base">
                        <ShieldCheck className="mr-1 h-4 w-4" />
                        Verified
                    </Badge>
                )}
                <Button variant="secondary" size="icon" className="rounded-full bg-background/70 hover:bg-background">
                    <Heart className="h-6 w-6 text-destructive" />
                </Button>
            </div>
          </div>
          
          <div className="my-6">
              <p className="text-4xl font-bold text-primary flex items-center">
                <IndianRupee className="h-8 w-8 mr-1" />
                {property.price.toLocaleString('en-IN')}
                <span className="text-lg text-muted-foreground ml-1">/month</span>
              </p>
          </div>

          <div className="flex gap-8 text-lg text-muted-foreground my-6 border-y py-4">
              <div className="flex items-center gap-2">
                  <BedDouble className="h-6 w-6 text-primary" />
                  <span>{property.beds} Beds</span>
              </div>
              <div className="flex items-center gap-2">
                  <Bath className="h-6 w-6 text-primary" />
                  <span>{property.baths} Baths</span>
              </div>
              <div className="flex items-center gap-2">
                  <Car className="h-6 w-6 text-primary" />
                  <span>{property.parking} Parking</span>
              </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2">About this property</h3>
            <p className="text-muted-foreground">
                A beautiful, spacious, and modern property located in the heart of {property.location}.
                This {property.beds}BHK comes fully furnished with all modern amenities. It&apos;s perfect for families or working professionals looking for a comfortable and convenient living space.
                The location is well-connected to public transport, schools, and markets. Don&apos;t miss this opportunity!
            </p>
          </div>
          
          <div className="mt-8">
            <Button size="lg">Contact Owner</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
