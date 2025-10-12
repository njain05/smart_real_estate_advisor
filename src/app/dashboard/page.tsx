
"use client";

import { Suspense, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { ListFilter, Search, Home } from "lucide-react";
import PropertyCard from "@/components/property/property-card";
import { Skeleton } from "@/components/ui/skeleton";
import { properties as allProperties } from "@/lib/mock-data";
import type { Property } from "@/lib/mock-data";

function PropertyListings({ properties }: { properties: Property[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}

function PropertySkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
         <div key={i} className="flex flex-col space-y-3">
          <Skeleton className="h-[225px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  );
}


export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [properties, setProperties] = useState(allProperties);
  const [filters, setFilters] = useState({
    forSale: true,
    forRent: true,
    verified: false,
    singleSharing: false,
    doubleSharing: false,
    forBoys: false,
    forGirls: false,
  });

  const handleSearch = () => {
    const filtered = allProperties.filter(p => 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setProperties(filtered);
  };

  const handleFilterChange = (filterName: keyof typeof filters) => {
    setFilters(prev => ({...prev, [filterName]: !prev[filterName]}));
    // Note: In a real app, filtering logic would be more complex and happen here or on search.
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <header className="mb-6 md:mb-8 text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-headline font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-3">
          Find Your Next Property
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto sm:mx-0">
          Browse listings, get legal tips, and make informed decisions with our smart platform.
        </p>
      </header>

      <div className="mb-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Search by location, city, or property name..." 
            className="pl-10 h-12 text-base shadow-sm border-2 focus:border-primary transition-colors" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <div className="flex gap-3">
          <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-12 px-4 gap-2 shadow-sm border-2 hover:border-primary transition-colors">
              <ListFilter className="h-4 w-4" />
              <span className="font-medium">Filter</span>
            </Button>
          </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-64 p-2">
            <DropdownMenuLabel className="font-semibold text-base">Property Type</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked={filters.forSale} onCheckedChange={() => handleFilterChange('forSale')}>
              For Sale
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={filters.forRent} onCheckedChange={() => handleFilterChange('forRent')}>
              For Rent
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="font-semibold text-base">Room Type</DropdownMenuLabel>
            <DropdownMenuSeparator />
             <DropdownMenuCheckboxItem checked={filters.singleSharing} onCheckedChange={() => handleFilterChange('singleSharing')}>
              Single Sharing
             </DropdownMenuCheckboxItem>
             <DropdownMenuCheckboxItem checked={filters.doubleSharing} onCheckedChange={() => handleFilterChange('doubleSharing')}>
              Double Sharing
             </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
             <DropdownMenuLabel className="font-semibold text-base">Tenant Type</DropdownMenuLabel>
            <DropdownMenuSeparator />
             <DropdownMenuCheckboxItem checked={filters.forBoys} onCheckedChange={() => handleFilterChange('forBoys')}>
              For Boys
             </DropdownMenuCheckboxItem>
             <DropdownMenuCheckboxItem checked={filters.forGirls} onCheckedChange={() => handleFilterChange('forGirls')}>
              For Girls
             </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked={filters.verified} onCheckedChange={() => handleFilterChange('verified')}>
              Verified Only
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button onClick={handleSearch} className="h-12 px-6 text-base font-medium shadow-sm hover:shadow-md transition-all">
          Search
        </Button>
        </div>
      </div>
      
      <Suspense fallback={<PropertySkeleton />}>
        <PropertyListings properties={properties} />
      </Suspense>
    </div>
  );
}
