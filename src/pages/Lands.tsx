import Navbar from "@/components/Navbar";
import PropertyCard from "@/components/PropertyCard";
import FilterPanel from "@/components/FilterPanel";

const Lands = () => {
  const properties = [
    {
      id: "land1",
      title: "Prime Commercial Land - Westlands",
      location: "Westlands, Nairobi",
      price: "KES 45M",
      type: "sale" as const,
      category: "sale" as const,
      bedrooms: 0,
      bathrooms: 0,
      area: "2000 sqm",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop",
      featured: true,
    },
    {
      id: "land2",
      title: "Residential Plot - Karen",
      location: "Karen, Nairobi",
      price: "KES 28M",
      type: "sale" as const,
      category: "sale" as const,
      bedrooms: 0,
      bathrooms: 0,
      area: "1500 sqm",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop",
    },
    {
      id: "land3",
      title: "Agricultural Land - Kiambu",
      location: "Kiambu County",
      price: "KES 15M",
      type: "sale" as const,
      category: "sale" as const,
      bedrooms: 0,
      bathrooms: 0,
      area: "5000 sqm",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&auto=format&fit=crop",
    },
    {
      id: "land4",
      title: "Beachfront Land - Diani",
      location: "Diani Beach, Mombasa",
      price: "KES 65M",
      type: "sale" as const,
      category: "sale" as const,
      bedrooms: 0,
      bathrooms: 0,
      area: "3000 sqm",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&auto=format&fit=crop",
      featured: true,
    },
    {
      id: "land5",
      title: "Industrial Plot - Ruiru",
      location: "Ruiru, Kiambu",
      price: "KES 22M",
      type: "sale" as const,
      category: "sale" as const,
      bedrooms: 0,
      bathrooms: 0,
      area: "2500 sqm",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop",
    },
    {
      id: "land6",
      title: "Mixed-Use Land - Kilimani",
      location: "Kilimani, Nairobi",
      price: "KES 52M",
      type: "sale" as const,
      category: "sale" as const,
      bedrooms: 0,
      bathrooms: 0,
      area: "1800 sqm",
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Land for Sale
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover prime land opportunities for commercial, residential, and agricultural purposes
            </p>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters */}
            <div className="lg:col-span-1">
              <FilterPanel />
            </div>

            {/* Properties Grid */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <PropertyCard key={property.id} {...property} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Lands;
