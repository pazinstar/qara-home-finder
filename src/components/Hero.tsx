import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import posterImage from "@/assets/hero-video-poster.jpg";

const Hero = () => {
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const popularCities = ["Thika", "Juja", "Kamakis", "Kinoo", "Kangemi", "Kikuyu"];

  const handleSearch = () => {
    if (location.trim()) {
      navigate(`/rent?location=${encodeURIComponent(location)}`);
    }
  };

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Video with Overlay */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={posterImage}
          className="w-full h-full object-cover"
        >
          <source src="https://cdn.pixabay.com/video/2022/11/07/138419-768661731_large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/80" />
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
            <Button 
              onClick={handleSearch}
              className="h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            >
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
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in px-4">
          <Button 
            onClick={() => navigate('/request-tour')}
            size="lg" 
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 shadow-gold hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
          >
            Request a Tour
          </Button>
          <Button 
            onClick={() => navigate('/rent')}
            size="lg" 
            variant="outline" 
            className="border-2 border-white text-white hover:bg-white hover:text-foreground font-semibold px-8 transition-all duration-300 w-full sm:w-auto"
          >
            View All Properties
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
