import { useState } from "react";
import { parseISO } from "date-fns";
import Navbar from "@/components/Navbar";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Filter, List, Map, CalendarCheck } from "lucide-react";
import AirBnBMap from "@/components/AirBnBMap";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import AirBnBFilterSidebar from "@/components/AirBnBFilterSidebar";
import AirBnBReservationDialog from "@/components/AirBnBReservationDialog";

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
  const [reservationOpen, setReservationOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<AirBnBProperty | null>(null);

  const handleReserve = (property: AirBnBProperty) => {
    setSelectedProperty(property);
    setReservationOpen(true);
  };
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
      id: "airbnb-1",
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
      id: "airbnb-2",
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
      id: "airbnb-3",
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
      id: "airbnb-4",
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
      id: "airbnb-5",
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
      id: "airbnb-6",
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
                          hasActiveFilters={checkIn !== undefined || checkOut !== undefined || guests > 1 || priceRange[0] > 0 || priceRange[1] < 20000 || selectedAmenities.length > 0 || selectedPropertyTypes.length > 0 || selectedLocation !== ""}
                          checkIn={checkIn}
                          setCheckIn={setCheckIn}
                          checkOut={checkOut}
                          setCheckOut={setCheckOut}
                          guests={guests}
                          setGuests={setGuests}
                          selectedLocation={selectedLocation}
                          setSelectedLocation={setSelectedLocation}
                          locations={locations}
                          locationOpen={locationOpen}
                          setLocationOpen={setLocationOpen}
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
                        {(checkIn || checkOut || guests > 1 || selectedLocation || selectedPropertyTypes.length > 0 || selectedAmenities.length > 0 || priceRange[0] > 0 || priceRange[1] < 20000) && (
                          <span className="bg-primary text-primary-foreground rounded-full px-1.5 py-0.5 text-xs">
                            {(checkIn ? 1 : 0) + (checkOut ? 1 : 0) + (guests > 1 ? 1 : 0) + (selectedLocation ? 1 : 0) + selectedPropertyTypes.length + selectedAmenities.length + (priceRange[0] > 0 || priceRange[1] < 20000 ? 1 : 0)}
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
                hasActiveFilters={checkIn !== undefined || checkOut !== undefined || guests > 1 || priceRange[0] > 0 || priceRange[1] < 20000 || selectedAmenities.length > 0 || selectedPropertyTypes.length > 0 || selectedLocation !== ""}
                checkIn={checkIn}
                setCheckIn={setCheckIn}
                checkOut={checkOut}
                setCheckOut={setCheckOut}
                guests={guests}
                setGuests={setGuests}
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                locations={locations}
                locationOpen={locationOpen}
                setLocationOpen={setLocationOpen}
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
                    <div key={property.id} className="relative group">
                      <PropertyCard {...property} />
                      {calculateTotalPrice(property.pricePerNight) && (
                        <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium z-10">
                          {calculateTotalPrice(property.pricePerNight)}
                        </div>
                      )}
                      <Button
                        onClick={() => handleReserve(property)}
                        className="absolute bottom-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-primary hover:bg-primary/90"
                      >
                        <CalendarCheck className="mr-2 h-4 w-4" />
                        Reserve
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Reservation Dialog */}
            <AirBnBReservationDialog
              property={selectedProperty}
              open={reservationOpen}
              onOpenChange={setReservationOpen}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirBnB;
