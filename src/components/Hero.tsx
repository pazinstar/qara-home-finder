import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroImage from "@/assets/hero-home.jpg";

const Hero = () => {
  const [location, setLocation] = useState("");

  const popularCities = ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret"];

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Luxury modern home"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
          Find Your Dream Home
        </h1>
        <p className="text-lg sm:text-xl text-white/90 mb-12 max-w-2xl mx-auto animate-fade-in">
          Discover luxury properties for rent or purchase in prime locations across the city
        </p>

        {/* Floating Search Bar */}
        <div className="bg-white rounded-2xl p-6 shadow-2xl animate-scale-in">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                type="text"
                placeholder="Enter location or city..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-12 h-14 text-base border-border focus:border-primary"
              />
            </div>
            <Button className="h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-lg hover:shadow-xl transition-all duration-300">
              <Search className="mr-2" size={20} />
              Search
            </Button>
          </div>

          {/* Popular Cities */}
          <div className="mt-6 flex flex-wrap gap-2 justify-center">
            <span className="text-sm text-muted-foreground">Popular:</span>
            {popularCities.map((city) => (
              <button
                key={city}
                onClick={() => setLocation(city)}
                className="text-sm px-3 py-1 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-200"
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-12 flex flex-wrap gap-4 justify-center animate-fade-in">
          <Button 
            size="lg" 
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 shadow-gold hover:shadow-xl transition-all duration-300"
          >
            Request a Tour
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-2 border-white text-white hover:bg-white hover:text-foreground font-semibold px-8 transition-all duration-300"
          >
            View All Properties
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
