import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PropertyCard from "@/components/PropertyCard";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Shield, HeartHandshake } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  
  // Sample featured properties
  const featuredProperties = [
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
      id: "3",
      title: "Cozy Studio Apartment",
      location: "Kilimani, Nairobi",
      price: "KES 55,000",
      type: "rent" as const,
      bedrooms: 1,
      bathrooms: 1,
      area: "45 sqm",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop",
    },
  ];

  const features = [
    {
      icon: Award,
      title: "Premium Properties",
      description: "Handpicked luxury homes in prime locations",
    },
    {
      icon: Shield,
      title: "Secure & Verified",
      description: "All properties verified and legally compliant",
    },
    {
      icon: HeartHandshake,
      title: "Trusted Service",
      description: "Dedicated support throughout your journey",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <WhatsAppFloat />

      {/* Featured Properties Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Featured Properties
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our handpicked selection of premium properties
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>

          <div className="text-center">
            <Button
              onClick={() => navigate('/rent')}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 group"
            >
              View All Properties
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Why Choose Qara Homes
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your trusted partner in finding the perfect home
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-2xl bg-card hover:shadow-lg transition-all duration-300 group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <feature.icon size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-primary/80">
        <div className="max-w-4xl mx-auto text-center text-primary-foreground">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Let us help you discover the perfect property that matches your lifestyle
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
            <Button
              onClick={() => navigate('/request-tour')}
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 shadow-gold"
            >
              Request a Tour
            </Button>
            <Button
              onClick={() => navigate('/contact')}
              size="lg"
              variant="outline"
              className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-semibold px-8"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Qara Homes</h3>
          <p className="text-background/80 mb-6">
            Your trusted partner in real estate
          </p>
          <p className="text-sm text-background/60">
            © 2024 Qara Homes. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
