import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search, MapPin, Home, Star, Calendar, Users, Shield, TrendingUp } from "lucide-react";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { ScrollReveal } from "@/hooks/use-scroll-animation";

const Index = () => {
  const navigate = useNavigate();
  const [searchLocation, setSearchLocation] = useState("");

  const handleSearch = () => {
    if (searchLocation.trim()) {
      navigate(`/rent?location=${encodeURIComponent(searchLocation)}`);
    } else {
      navigate('/rent');
    }
  };

  const featuredProperties = [
    {
      id: 1,
      title: "Modern 2BR Apartment",
      location: "Thika Road, Nairobi",
      price: "KES 45,000/month",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      rating: 4.9,
      reviews: 127,
      type: "Entire apartment"
    },
    {
      id: 2,
      title: "Luxury 3BR Penthouse",
      location: "Waiyaki Way, Nairobi",
      price: "KES 85,000/month",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
      rating: 5.0,
      reviews: 89,
      type: "Entire apartment"
    },
    {
      id: 3,
      title: "Cozy Studio in Juja",
      location: "Juja, Kiambu",
      price: "KES 25,000/month",
      image: "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800",
      rating: 4.7,
      reviews: 64,
      type: "Studio"
    },
    {
      id: 4,
      title: "Family 4BR House",
      location: "Kikuyu, Kiambu",
      price: "KES 120,000/month",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
      rating: 4.8,
      reviews: 92,
      type: "Entire house"
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "Verified Properties",
      description: "All properties are thoroughly verified and inspected for your peace of mind"
    },
    {
      icon: TrendingUp,
      title: "Best Prices",
      description: "Competitive pricing with transparent costs and no hidden fees"
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "24/7 customer support to help you find your perfect home"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <WhatsAppFloat />

      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero-background.mp4" type="video/mp4" />
        </video>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 tracking-tight">
            Find Your Perfect Home
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12">
            Premium properties along Thika Road & Waiyaki Way
          </p>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto">
            <Card className="p-2 backdrop-blur-sm bg-card/50 border-border">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1 relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                  <Input
                    placeholder="Search locations: Thika, Juja, Kinoo..."
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="pl-12 h-14 bg-background border-none text-base"
                  />
                </div>
                <Button 
                  onClick={handleSearch}
                  size="lg"
                  className="h-14 px-8 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Search className="mr-2" size={20} />
                  Search
                </Button>
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Button 
              variant="outline" 
              onClick={() => navigate('/rent')}
              className="border-border hover:bg-accent hover:text-accent-foreground"
            >
              Browse All Properties
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate('/contact')}
              className="border-border hover:bg-accent hover:text-accent-foreground"
            >
              <Calendar className="mr-2" size={16} />
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Browse by Category</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal delay={0}>
              <div 
                onClick={() => navigate('/airbnb')}
                className="group relative overflow-hidden rounded-xl cursor-pointer transform hover:scale-105 transition-all duration-300"
              >
                <img 
                  src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600" 
                  alt="AirBnB" 
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent flex items-end p-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">AirBnB</h3>
                    <p className="text-sm text-white/80">Free location access</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div 
                onClick={() => navigate('/rent')}
                className="group relative overflow-hidden rounded-xl cursor-pointer transform hover:scale-105 transition-all duration-300"
              >
                <img 
                  src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600" 
                  alt="For Rent" 
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent flex items-end p-6">
                  <h3 className="text-2xl font-bold text-white">For Rent</h3>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div 
                onClick={() => navigate('/buy')}
                className="group relative overflow-hidden rounded-xl cursor-pointer transform hover:scale-105 transition-all duration-300"
              >
                <img 
                  src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600" 
                  alt="For Sale" 
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent flex items-end p-6">
                  <h3 className="text-2xl font-bold text-white">For Sale</h3>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Properties
            </h2>
            <p className="text-muted-foreground text-lg">
              Handpicked homes for you
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProperties.map((property, index) => (
            <ScrollReveal key={property.id} delay={index * 100}>
              <Card 
                className="group cursor-pointer overflow-hidden border-border hover:shadow-lg transition-all h-full"
                onClick={() => navigate(`/property/${property.id}`)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={property.image} 
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">{property.type}</p>
                      <h3 className="font-semibold text-foreground">{property.title}</h3>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <span className="text-sm font-medium">{property.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {property.location}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-foreground">{property.price}</p>
                    <p className="text-xs text-muted-foreground">{property.reviews} reviews</p>
                  </div>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="text-center mt-12">
            <Button 
              size="lg"
              onClick={() => navigate('/rent')}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              View All Properties
            </Button>
          </div>
        </ScrollReveal>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Why Choose Qara Homes
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              We're committed to making your property search experience seamless and trustworthy
            </p>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <Card className="p-6 hover:shadow-lg transition-shadow h-full">
                  <feature.icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                How It Works
              </h2>
              <p className="text-muted-foreground text-lg">
                Simple steps to find your dream home
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal delay={0}>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Search Properties</h3>
                <p className="text-muted-foreground">
                  Browse through our extensive collection of properties or search by location
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Book or View Free</h3>
                <p className="text-muted-foreground">
                  View locations for free or pay 50% to secure your booking
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Home className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Move In</h3>
                <p className="text-muted-foreground">
                  Schedule a tour, complete payment, and move into your new home
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <ScrollReveal delay={0}>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">500+</div>
                <div className="text-muted-foreground">Properties Listed</div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">1000+</div>
                <div className="text-muted-foreground">Happy Clients</div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">50+</div>
                <div className="text-muted-foreground">Locations</div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">98%</div>
                <div className="text-muted-foreground">Satisfaction Rate</div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-accent/20 to-primary/10">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Ready to Find Your Home?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of happy tenants who found their perfect home with QARA HOMES
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => navigate('/request-tour')}
                className="h-14 px-8 text-lg bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Schedule a Tour
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => window.location.href = 'tel:0745812620'}
                className="h-14 px-8 text-lg border-border hover:bg-accent hover:text-accent-foreground"
              >
                Call Us Now
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4 text-foreground">QARA HOMES</h3>
              <p className="text-muted-foreground text-sm">
                Your trusted partner in finding the perfect home along Thika Road and Waiyaki Way.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/rent" className="text-muted-foreground hover:text-accent">Browse Properties</a></li>
                <li><a href="/about" className="text-muted-foreground hover:text-accent">About Us</a></li>
                <li><a href="/contact" className="text-muted-foreground hover:text-accent">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/rent" className="text-muted-foreground hover:text-accent">Rent</a></li>
                <li><a href="/buy" className="text-muted-foreground hover:text-accent">Buy</a></li>
                <li><a href="/request-tour" className="text-muted-foreground hover:text-accent">Schedule Tour</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Phone: 0745 812 620</li>
                <li>Email: info@qarahomes.com</li>
                <li>Nairobi, Kenya</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            © 2024 QARA HOMES. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
