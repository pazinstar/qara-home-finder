import { useState } from "react";
import { format, parseISO } from "date-fns";
import Navbar from "@/components/Navbar";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { CalendarIcon, Check, ChevronsUpDown, Filter, List, Map, MapPin, Users, X } from "lucide-react";
import AirBnBMap from "@/components/AirBnBMap";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import AirBnBFilterSidebar from "@/components/AirBnBFilterSidebar";

interface AirBnBProperty {
  id: string;
  title: string;
  location: string;
  pricePerNight: number;
  price: string;
  type: "rent";
  category: "airbnb";
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  image: string;
  featured?: boolean;
  maxGuests: number;
  availableFrom: string;
  availableTo: string;
  amenities: string[];
}

const AirBnB = () => {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [locationOpen, setLocationOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  const propertyTypes = ["Bedsitter", "Studio", "1 Bedroom", "2 Bedroom", "3 Bedroom", "4+ Bedroom"];
  const locations = [
    { value: "", label: "All Locations" },
    { value: "thika-road", label: "Thika Road" },
    { value: "waiyaki-way", label: "Waiyaki Way" },
    { value: "juja", label: "Juja" },
    { value: "kikuyu", label: "Kikuyu" },
    { value: "kinoo", label: "Kinoo" },
    { value: "ruaka", label: "Ruaka" },
  ];

  const properties: AirBnBProperty[] = [
    {
      id: "1",
      title: "Modern 2BR Apartment",
      location: "Thika Road, Nairobi",
      pricePerNight: 4500,
      price: "KES 4,500/night",
      type: "rent",
      category: "airbnb",
      propertyType: "2 Bedroom",
      bedrooms: 2,
      bathrooms: 2,
      area: "85 sqm",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop",
      featured: true,
      maxGuests: 4,
      availableFrom: "2024-01-01",
      availableTo: "2025-12-31",
      amenities: ["WiFi", "Kitchen", "Parking", "Pool"],
    },
    {
      id: "2",
      title: "Luxury 3BR Penthouse",
      location: "Waiyaki Way, Nairobi",
      pricePerNight: 8500,
      price: "KES 8,500/night",
      type: "rent",
      category: "airbnb",
      propertyType: "3 Bedroom",
      bedrooms: 3,
      bathrooms: 3,
      area: "150 sqm",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop",
      featured: true,
      maxGuests: 6,
      availableFrom: "2024-01-01",
      availableTo: "2025-12-31",
      amenities: ["WiFi", "Kitchen", "Parking", "Pool", "Gym"],
    },
    {
      id: "3",
      title: "Cozy Studio in Juja",
      location: "Juja, Kiambu",
      pricePerNight: 2500,
      price: "KES 2,500/night",
      type: "rent",
      category: "airbnb",
      propertyType: "Studio",
      bedrooms: 1,
      bathrooms: 1,
      area: "40 sqm",
      image: "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800&auto=format&fit=crop",
      maxGuests: 2,
      availableFrom: "2024-06-01",
      availableTo: "2025-12-31",
      amenities: ["WiFi", "Kitchen"],
    },
    {
      id: "4",
      title: "Family 4BR House",
      location: "Kikuyu, Kiambu",
      pricePerNight: 12000,
      price: "KES 12,000/night",
      type: "rent",
      category: "airbnb",
      propertyType: "4+ Bedroom",
      bedrooms: 4,
      bathrooms: 3,
      area: "200 sqm",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop",
      featured: true,
      maxGuests: 8,
      availableFrom: "2024-01-01",
      availableTo: "2025-12-31",
      amenities: ["WiFi", "Kitchen", "Parking", "Garden", "BBQ"],
    },
    {
      id: "5",
      title: "Executive Loft",
      location: "Kinoo, Kiambu",
      pricePerNight: 6500,
      price: "KES 6,500/night",
      type: "rent",
      category: "airbnb",
      propertyType: "1 Bedroom",
      bedrooms: 2,
      bathrooms: 2,
      area: "95 sqm",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop",
      maxGuests: 4,
      availableFrom: "2024-03-01",
      availableTo: "2025-12-31",
      amenities: ["WiFi", "Kitchen", "Parking", "Workspace"],
    },
    {
      id: "6",
      title: "Compact Bedsitter",
      location: "Ruaka, Kiambu",
      pricePerNight: 1800,
      price: "KES 1,800/night",
      type: "rent",
      category: "airbnb",
      propertyType: "Bedsitter",
      bedrooms: 1,
      bathrooms: 1,
      area: "25 sqm",
      image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop",
      maxGuests: 1,
      availableFrom: "2024-01-01",
      availableTo: "2025-06-30",
      amenities: ["WiFi", "Kitchen"],
    },
  ];

  const allAmenities = ["WiFi", "Kitchen", "Parking", "Pool", "Gym", "Garden", "BBQ", "Workspace"];

  const filteredProperties = properties.filter((property) => {
    // Price filter
    if (property.pricePerNight < priceRange[0] || property.pricePerNight > priceRange[1]) {
      return false;
    }

    // Guest filter
    if (property.maxGuests < guests) {
      return false;
    }

    // Property type filter
    if (selectedPropertyTypes.length > 0 && !selectedPropertyTypes.includes(property.propertyType)) {
      return false;
    }

    // Location filter
    if (selectedLocation) {
      const locationLower = property.location.toLowerCase();
      if (!locationLower.includes(selectedLocation.replace("-", " "))) {
        return false;
      }
    }

    // Date availability filter
    if (checkIn && checkOut) {
      const availFrom = parseISO(property.availableFrom);
      const availTo = parseISO(property.availableTo);
      
      if (checkIn < availFrom || checkOut > availTo) {
        return false;
      }
    }

    // Amenities filter
    if (selectedAmenities.length > 0) {
      const hasAllAmenities = selectedAmenities.every(amenity => 
        property.amenities.includes(amenity)
      );
      if (!hasAllAmenities) return false;
    }

    return true;
  });

  const clearFilters = () => {
    setCheckIn(undefined);
    setCheckOut(undefined);
    setGuests(1);
    setPriceRange([0, 20000]);
    setSelectedAmenities([]);
    setSelectedPropertyTypes([]);
    setSelectedLocation("");
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const togglePropertyType = (type: string) => {
    setSelectedPropertyTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const calculateTotalPrice = (pricePerNight: number) => {
    if (checkIn && checkOut) {
      const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
      return nights > 0 ? `KES ${(pricePerNight * nights).toLocaleString()} total` : null;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              AirBnB Properties
            </h1>
            <p className="text-lg text-muted-foreground">
              Short-term rentals with free location access • View exact locations at no cost
            </p>
          </div>

          {/* Date & Guest Search Bar */}
          <Card className="mb-8">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4 items-end">
                {/* Check-in Date */}
                <div className="flex-1 space-y-2">
                  <Label>Check-in</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !checkIn && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {checkIn ? format(checkIn, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-popover z-50" align="start">
                      <Calendar
                        mode="single"
                        selected={checkIn}
                        onSelect={setCheckIn}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Check-out Date */}
                <div className="flex-1 space-y-2">
                  <Label>Check-out</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !checkOut && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {checkOut ? format(checkOut, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-popover z-50" align="start">
                      <Calendar
                        mode="single"
                        selected={checkOut}
                        onSelect={setCheckOut}
                        disabled={(date) => date < (checkIn || new Date())}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Guests */}
                <div className="flex-1 space-y-2">
                  <Label>Guests</Label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      disabled={guests <= 1}
                    >
                      -
                    </Button>
                    <div className="flex items-center gap-2 px-4 py-2 border rounded-md flex-1 justify-center">
                      <Users className="h-4 w-4" />
                      <span>{guests} {guests === 1 ? "Guest" : "Guests"}</span>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setGuests(guests + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>

                {/* Location Filter */}
                <div className="flex-1 space-y-2">
                  <Label>Location</Label>
                  <Popover open={locationOpen} onOpenChange={setLocationOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={locationOpen}
                        className="w-full justify-between"
                      >
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-4 w-4" />
                          {selectedLocation
                            ? locations.find((loc) => loc.value === selectedLocation)?.label || selectedLocation
                            : "All Locations"}
                        </div>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0 bg-popover z-50">
                      <Command>
                        <CommandInput
                          placeholder="Search or type location..."
                          value={selectedLocation}
                          onValueChange={(value) => setSelectedLocation(value)}
                        />
                        <CommandList>
                          <CommandEmpty>
                            <span className="text-sm text-muted-foreground">
                              Using: "{selectedLocation}"
                            </span>
                          </CommandEmpty>
                          <CommandGroup>
                            {locations.map((loc) => (
                              <CommandItem
                                key={loc.value || "all"}
                                value={loc.label}
                                onSelect={() => {
                                  setSelectedLocation(loc.value);
                                  setLocationOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    selectedLocation === loc.value ? "opacity-100" : "opacity-0"
                                  )}
                                />
                                {loc.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Clear Filters */}
                {(checkIn || checkOut || guests > 1 || priceRange[0] > 0 || priceRange[1] < 20000 || selectedAmenities.length > 0 || selectedPropertyTypes.length > 0 || selectedLocation) && (
                  <Button variant="ghost" onClick={clearFilters} className="gap-2">
                    <X className="h-4 w-4" />
                    Clear
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Desktop Filters Sidebar - Hidden on mobile */}
            <div className="hidden lg:block lg:col-span-1">
              <AirBnBFilterSidebar
                propertyTypes={propertyTypes}
                selectedPropertyTypes={selectedPropertyTypes}
                togglePropertyType={togglePropertyType}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                allAmenities={allAmenities}
                selectedAmenities={selectedAmenities}
                toggleAmenity={toggleAmenity}
                clearFilters={clearFilters}
                hasActiveFilters={priceRange[0] > 0 || priceRange[1] < 20000 || selectedAmenities.length > 0 || selectedPropertyTypes.length > 0}
              />
            </div>

            {/* Property Grid */}
            <div className="lg:col-span-3">
              <div className="mb-6 flex items-center justify-between">
                <p className="text-muted-foreground">
                  Showing {filteredProperties.length} of {properties.length} properties
                </p>
                <div className="flex items-center gap-2 sm:gap-4">
                  {checkIn && checkOut && (
                    <p className="text-sm text-primary font-medium hidden sm:block">
                      {Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))} nights selected
                    </p>
                  )}
                  
                  {/* Mobile Filter Button */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm" className="lg:hidden gap-2">
                        <Filter className="h-4 w-4" />
                        Filters
                        {(selectedPropertyTypes.length > 0 || selectedAmenities.length > 0 || priceRange[0] > 0 || priceRange[1] < 20000) && (
                          <span className="bg-primary text-primary-foreground rounded-full px-1.5 py-0.5 text-xs">
                            {selectedPropertyTypes.length + selectedAmenities.length + (priceRange[0] > 0 || priceRange[1] < 20000 ? 1 : 0)}
                          </span>
                        )}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[300px] sm:w-[350px] overflow-y-auto">
                      <SheetHeader>
                        <SheetTitle>Filters</SheetTitle>
                      </SheetHeader>
                      <div className="mt-6">
                        <AirBnBFilterSidebar
                          propertyTypes={propertyTypes}
                          selectedPropertyTypes={selectedPropertyTypes}
                          togglePropertyType={togglePropertyType}
                          priceRange={priceRange}
                          setPriceRange={setPriceRange}
                          allAmenities={allAmenities}
                          selectedAmenities={selectedAmenities}
                          toggleAmenity={toggleAmenity}
                          clearFilters={clearFilters}
                          hasActiveFilters={priceRange[0] > 0 || priceRange[1] < 20000 || selectedAmenities.length > 0 || selectedPropertyTypes.length > 0}
                        />
                      </div>
                    </SheetContent>
                  </Sheet>

                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="rounded-none"
                    >
                      <List className="h-4 w-4 mr-1" />
                      List
                    </Button>
                    <Button
                      variant={viewMode === "map" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("map")}
                      className="rounded-none"
                    >
                      <Map className="h-4 w-4 mr-1" />
                      Map
                    </Button>
                  </div>
                </div>
              </div>

              {viewMode === "map" ? (
                <AirBnBMap properties={filteredProperties} />
              ) : filteredProperties.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground mb-4">
                    No properties match your filters
                  </p>
                  <Button onClick={clearFilters}>Clear all filters</Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredProperties.map((property) => (
                    <div key={property.id} className="relative">
                      <PropertyCard {...property} />
                      {calculateTotalPrice(property.pricePerNight) && (
                        <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium z-10">
                          {calculateTotalPrice(property.pricePerNight)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirBnB;
