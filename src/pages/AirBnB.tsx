import Navbar from "@/components/Navbar";
import PropertyCard from "@/components/PropertyCard";
import FilterPanel from "@/components/FilterPanel";

const AirBnB = () => {
  const properties = [
    {
      id: "1",
      title: "Modern 2BR Apartment",
      location: "Thika Road, Nairobi",
      price: "KES 45,000",
      type: "rent" as const,
      category: "airbnb" as const,
      bedrooms: 2,
      bathrooms: 2,
      area: "85 sqm",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop",
      featured: true,
    },
    {
      id: "2",
      title: "Luxury 3BR Penthouse",
      location: "Waiyaki Way, Nairobi",
      price: "KES 85,000",
      type: "rent" as const,
      category: "airbnb" as const,
      bedrooms: 3,
      bathrooms: 3,
      area: "150 sqm",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop",
      featured: true,
    },
    {
      id: "3",
      title: "Cozy Studio in Juja",
      location: "Juja, Kiambu",
      price: "KES 25,000",
      type: "rent" as const,
      category: "airbnb" as const,
      bedrooms: 1,
      bathrooms: 1,
      area: "40 sqm",
      image: "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800&auto=format&fit=crop",
    },
    {
      id: "4",
      title: "Family 4BR House",
      location: "Kikuyu, Kiambu",
      price: "KES 120,000",
      type: "rent" as const,
      category: "airbnb" as const,
      bedrooms: 4,
      bathrooms: 3,
      area: "200 sqm",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop",
      featured: true,
    },
    {
      id: "5",
      title: "Executive Loft",
      location: "Kinoo, Kiambu",
      price: "KES 65,000",
      type: "rent" as const,
      category: "airbnb" as const,
      bedrooms: 2,
      bathrooms: 2,
      area: "95 sqm",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop",
    },
    {
      id: "6",
      title: "Garden Apartment",
      location: "Ruaka, Kiambu",
      price: "KES 55,000",
      type: "rent" as const,
      category: "airbnb" as const,
      bedrooms: 2,
      bathrooms: 1,
      area: "75 sqm",
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
              AirBnB Properties
            </h1>
            <p className="text-lg text-muted-foreground">
              Short-term rentals with free location access • View exact locations at no cost
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

export default AirBnB;
