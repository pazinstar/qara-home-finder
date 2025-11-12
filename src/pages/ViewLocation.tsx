import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Phone, Mail, Home, ArrowLeft } from "lucide-react";

const ViewLocation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const propertyId = searchParams.get("propertyId") || "1";
  
  // Mock property data
  const property = {
    title: "Modern 2BR Apartment",
    location: "Thika Road, Nairobi",
    exactLocation: "Garden City Mall Area, Thika Road",
    price: "KES 45,000/month",
    description: "Beautiful 2-bedroom apartment with modern finishes, located near Garden City Mall. Features include spacious living room, fully fitted kitchen, and balcony with a great view.",
    features: [
      "2 Bedrooms with built-in wardrobes",
      "2 Bathrooms",
      "Fully fitted kitchen",
      "Spacious balcony",
      "Secure parking",
      "24/7 Security",
      "Backup water",
      "Close to shopping centers"
    ],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"
    ],
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8177458087474!2d36.88747631475395!3d-1.2832533990649838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1172d84d49a7%3A0xf7cf0254b297924c!2sThika%20Rd%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1234567890"
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-12">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back to Properties
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Images */}
            <div className="grid grid-cols-2 gap-4">
              {property.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={property.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              ))}
            </div>

            {/* Property Details */}
            <Card className="p-6 border-border">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {property.title}
              </h1>
              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <MapPin className="w-5 h-5 text-accent" />
                <span className="text-lg">{property.exactLocation}</span>
              </div>
              <p className="text-2xl font-bold text-accent mb-6">{property.price}</p>
              
              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold text-foreground mb-3">Description</h3>
                <p className="text-muted-foreground mb-6">{property.description}</p>
                
                <h3 className="text-xl font-semibold text-foreground mb-3">Features</h3>
                <ul className="grid grid-cols-2 gap-2">
                  {property.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                      <span className="text-accent mt-1">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>

            {/* Map */}
            <Card className="p-6 border-border">
              <h3 className="text-xl font-semibold text-foreground mb-4">Location</h3>
              <div className="aspect-video w-full rounded-lg overflow-hidden">
                <iframe
                  src={property.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Property Location"
                />
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6 border-border sticky top-24">
              <div className="space-y-4">
                <div className="bg-accent/10 rounded-lg p-4 text-center">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    Free Location View
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Full location details available
                  </p>
                </div>

                <Button
                  size="lg"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => navigate('/booking')}
                >
                  <Home className="mr-2" />
                  Book This Property
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-border hover:bg-accent hover:text-accent-foreground"
                  onClick={() => window.location.href = 'tel:0745812620'}
                >
                  <Phone className="mr-2" />
                  Call Agent
                </Button>

                <div className="pt-4 border-t border-border">
                  <h4 className="font-semibold text-foreground mb-3">Contact Agent</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      <span>0745 812 620</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      <span>info@qarahomes.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewLocation;
