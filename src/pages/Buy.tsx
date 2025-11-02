import Navbar from "@/components/Navbar";
import PropertyCard from "@/components/PropertyCard";
import FilterPanel from "@/components/FilterPanel";

const Buy = () => {
  const properties = [
    {
      id: "1",
      title: "Luxury Penthouse",
      location: "Westlands, Nairobi",
      price: "KES 45,000,000",
      type: "sale" as const,
      bedrooms: 4,
      bathrooms: 4,
      area: "320 sqm",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop",
      featured: true,
    },
    {
      id: "2",
      title: "Modern Family Home",
      location: "Runda, Nairobi",
      price: "KES 35,000,000",
      type: "sale" as const,
      bedrooms: 5,
      bathrooms: 4,
      area: "400 sqm",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop",
    },
    {
      id: "3",
      title: "Contemporary Villa",
      location: "Karen, Nairobi",
      price: "KES 52,000,000",
      type: "sale" as const,
      bedrooms: 6,
      bathrooms: 5,
      area: "500 sqm",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop",
      featured: true,
    },
    {
      id: "4",
      title: "Executive Townhouse",
      location: "Lavington, Nairobi",
      price: "KES 28,000,000",
      type: "sale" as const,
      bedrooms: 4,
      bathrooms: 3,
      area: "280 sqm",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop",
    },
    {
      id: "5",
      title: "Beachfront Villa",
      location: "Nyali, Mombasa",
      price: "KES 75,000,000",
      type: "sale" as const,
      bedrooms: 7,
      bathrooms: 6,
      area: "650 sqm",
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&auto=format&fit=crop",
      featured: true,
    },
    {
      id: "6",
      title: "Garden Apartment",
      location: "Spring Valley, Nairobi",
      price: "KES 18,500,000",
      type: "sale" as const,
      bedrooms: 3,
      bathrooms: 2,
      area: "180 sqm",
      image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop",
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
              Properties for Sale
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover your dream home from our exclusive collection
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

export default Buy;
