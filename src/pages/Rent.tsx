import Navbar from "@/components/Navbar";
import PropertyCard from "@/components/PropertyCard";
import FilterPanel from "@/components/FilterPanel";

const Rent = () => {
  const properties = [
    {
      id: "1",
      title: "Modern 3-Bedroom Villa",
      location: "Karen, Nairobi",
      price: "KES 180,000",
      type: "rent" as const,
      bedrooms: 3,
      bathrooms: 3,
      area: "250 sqm",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop",
      featured: true,
    },
    {
      id: "2",
      title: "Cozy Studio Apartment",
      location: "Kilimani, Nairobi",
      price: "KES 55,000",
      type: "rent" as const,
      bedrooms: 1,
      bathrooms: 1,
      area: "45 sqm",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop",
    },
    {
      id: "3",
      title: "Spacious 2-Bedroom Flat",
      location: "Westlands, Nairobi",
      price: "KES 95,000",
      type: "rent" as const,
      bedrooms: 2,
      bathrooms: 2,
      area: "120 sqm",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop",
      featured: true,
    },
    {
      id: "4",
      title: "Garden Apartment",
      location: "Lavington, Nairobi",
      price: "KES 120,000",
      type: "rent" as const,
      bedrooms: 3,
      bathrooms: 2,
      area: "180 sqm",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop",
    },
    {
      id: "5",
      title: "Executive 4-Bedroom House",
      location: "Runda, Nairobi",
      price: "KES 250,000",
      type: "rent" as const,
      bedrooms: 4,
      bathrooms: 4,
      area: "350 sqm",
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&auto=format&fit=crop",
      featured: true,
    },
    {
      id: "6",
      title: "Modern Loft",
      location: "Parklands, Nairobi",
      price: "KES 75,000",
      type: "rent" as const,
      bedrooms: 2,
      bathrooms: 1,
      area: "90 sqm",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Properties for Rent
            </h1>
            <p className="text-lg text-muted-foreground">
              Find your perfect rental home in prime locations
            </p>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters */}
            <div className="lg:col-span-1">
              <FilterPanel />
            </div>

            {/* Property Grid */}
            <div className="lg:col-span-3">
              <div className="mb-6 flex items-center justify-between">
                <p className="text-muted-foreground">
                  Showing {properties.length} properties
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {properties.map((property) => (
                  <PropertyCard key={property.id} {...property} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rent;
