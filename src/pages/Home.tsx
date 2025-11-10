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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
              Featured Listings
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Premium Properties
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Handpicked luxury homes in prime locations along Thika Road & Waiyaki Way
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
              className="h-14 px-10 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-semibold rounded-xl shadow-cyan group"
            >
              View All Properties
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-semibold mb-4">
              Why Qara Homes
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Your Trusted Partner
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience excellence in real estate services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-3xl bg-card/50 backdrop-blur border border-border/50 hover:border-primary/50 hover:shadow-cyan transition-all duration-300 group"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon size={36} />
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-lg">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-primary opacity-90" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
        
        <div className="relative max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Ready to Find Your
            <span className="block mt-2">Dream Home?</span>
          </h2>
          <p className="text-xl sm:text-2xl mb-12 opacity-95 max-w-2xl mx-auto">
            Let us help you discover the perfect property along Thika Road & Waiyaki Way
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/request-tour')}
              size="lg"
              className="h-16 px-12 text-lg bg-white hover:bg-white/90 text-primary font-bold rounded-2xl shadow-2xl hover:scale-105 transition-all"
            >
              Request a Tour
            </Button>
            <Button
              onClick={() => navigate('/contact')}
              size="lg"
              variant="outline"
              className="h-16 px-12 text-lg border-3 border-white text-white hover:bg-white hover:text-primary font-bold rounded-2xl backdrop-blur hover:scale-105 transition-all"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Qara Homes
            </h3>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              Your trusted partner in finding premium properties along Thika Road & Waiyaki Way
            </p>
            <div className="flex justify-center items-center gap-2 text-muted-foreground">
              <span className="text-sm">📞</span>
              <a href="tel:0745812620" className="text-sm hover:text-primary transition-colors">
                0745 812 620
              </a>
            </div>
            <div className="pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground">
                © 2024 Qara Homes. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
