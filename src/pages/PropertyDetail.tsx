import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Calendar,
  Home,
  Wifi,
  Car,
  Wind,
  Shield,
  ArrowLeft,
} from "lucide-react";

// Mock property data with multiple images and video
const getPropertyById = (id: string) => {
  const allProperties = [
    {
      id: "1",
      title: "Modern 3-Bedroom Villa",
      location: "Karen, Nairobi",
      price: "KES 180,000",
      type: "rent" as const,
      bedrooms: 3,
      bathrooms: 3,
      area: "250 sqm",
      images: [
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&auto=format&fit=crop",
      ],
      video: "https://www.youtube.com/embed/zumJJUL_ruM",
      description: "Stunning modern villa in the heart of Karen, featuring contemporary design and premium finishes throughout. Perfect for families seeking luxury and comfort.",
      features: ["WiFi", "Parking", "Air Conditioning", "Security", "Garden", "Balcony"],
      yearBuilt: 2022,
      featured: true,
    },
    {
      id: "2",
      title: "Luxury Penthouse",
      location: "Westlands, Nairobi",
      price: "KES 45,000,000",
      type: "sale" as const,
      bedrooms: 4,
      bathrooms: 4,
      area: "320 sqm",
      images: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&auto=format&fit=crop",
      ],
      video: "https://www.youtube.com/embed/zumJJUL_ruM",
      description: "Exclusive penthouse with panoramic city views. This luxury property offers world-class amenities and sophisticated design.",
      features: ["WiFi", "Parking", "Air Conditioning", "Security", "Gym", "Pool"],
      yearBuilt: 2023,
      featured: true,
    },
    {
      id: "3",
      title: "Cozy Studio Apartment",
      location: "Kilimani, Nairobi",
      price: "KES 55,000",
      type: "rent" as const,
      bedrooms: 1,
      bathrooms: 1,
      area: "45 sqm",
      images: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&auto=format&fit=crop",
      ],
      video: "https://www.youtube.com/embed/zumJJUL_ruM",
      description: "Charming studio apartment perfect for young professionals. Modern amenities in a prime location.",
      features: ["WiFi", "Security", "Parking"],
      yearBuilt: 2021,
    },
  ];

  return allProperties.find((p) => p.id === id);
};

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = getPropertyById(id || "");

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Property Not Found</h1>
            <Button onClick={() => navigate(-1)}>Go Back</Button>
          </div>
        </div>
      </div>
    );
  }

  const amenityIcons: Record<string, any> = {
    WiFi: Wifi,
    Parking: Car,
    "Air Conditioning": Wind,
    Security: Shield,
    Garden: Home,
    Balcony: Home,
    Gym: Home,
    Pool: Home,
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20">
        {/* Back Button */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4 group"
          >
            <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={20} />
            Back to listings
          </Button>
        </div>

        {/* Image Carousel */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Carousel className="w-full">
            <CarouselContent>
              {property.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative h-[400px] md:h-[600px] rounded-2xl overflow-hidden">
                    <img
                      src={image}
                      alt={`${property.title} - Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>

        {/* Property Details */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Badge className="bg-primary text-primary-foreground font-medium capitalize">
                    For {property.type}
                  </Badge>
                  {property.featured && (
                    <Badge className="bg-accent text-accent-foreground font-semibold">
                      Featured
                    </Badge>
                  )}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{property.title}</h1>
                <div className="flex items-center text-muted-foreground text-lg">
                  <MapPin size={20} className="mr-2" />
                  <span>{property.location}</span>
                </div>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Bed className="mx-auto mb-2 text-primary" size={28} />
                    <p className="text-2xl font-bold">{property.bedrooms}</p>
                    <p className="text-sm text-muted-foreground">Bedrooms</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Bath className="mx-auto mb-2 text-primary" size={28} />
                    <p className="text-2xl font-bold">{property.bathrooms}</p>
                    <p className="text-sm text-muted-foreground">Bathrooms</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Square className="mx-auto mb-2 text-primary" size={28} />
                    <p className="text-2xl font-bold">{property.area}</p>
                    <p className="text-sm text-muted-foreground">Area</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Calendar className="mx-auto mb-2 text-primary" size={28} />
                    <p className="text-2xl font-bold">{property.yearBuilt}</p>
                    <p className="text-sm text-muted-foreground">Year Built</p>
                  </CardContent>
                </Card>
              </div>

              {/* Description */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">About this property</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {property.description}
                  </p>
                </CardContent>
              </Card>

              {/* Features & Amenities */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Features & Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {property.features.map((feature, index) => {
                      const Icon = amenityIcons[feature] || Home;
                      return (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                        >
                          <Icon className="text-primary" size={20} />
                          <span className="font-medium">{feature}</span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Video Tour */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Video Tour</h2>
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <iframe
                      src={property.video}
                      title="Property Video Tour"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6 space-y-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Price</p>
                    <p className="text-4xl font-bold text-primary">{property.price}</p>
                    {property.type === "rent" && (
                      <p className="text-sm text-muted-foreground">per month</p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" size="lg">
                      Request a Tour
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      size="lg"
                    >
                      Contact Agent
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      size="lg"
                    >
                      Save Property
                    </Button>
                  </div>

                  <div className="pt-6 border-t border-border">
                    <h3 className="font-bold mb-3">Property ID</h3>
                    <p className="text-muted-foreground">#{property.id.padStart(6, '0')}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
