import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import posterImage from "@/assets/hero-video-poster.jpg";

const Hero = () => {
  const [location, setLocation] = useState("");
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();

  const popularCities = ["Thika", "Juja", "Kamakis", "Kinoo", "Kangemi", "Kikuyu"];

  useEffect(() => {
    // Force video to play on mount
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.log("Video autoplay failed:", err);
      });
    }
  }, []);

  const handleSearch = () => {
    if (location.trim()) {
      navigate(`/rent?location=${encodeURIComponent(location)}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video with Enhanced Overlay */}
      <div className="absolute inset-0 bg-background">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster={posterImage}
          onLoadedData={() => setIsVideoLoaded(true)}
          className="w-full h-full object-cover opacity-40"
        >
          <source src="https://cdn.pixabay.com/video/2022/11/07/138419-768661731_large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background" />
        
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 animate-pulse" style={{ animationDuration: '4s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          {/* Heading */}
          <div className="space-y-4 animate-fade-in">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground">
              Find Your Perfect
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mt-2">
                Dream Home
              </span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Premium properties along Thika Road & Waiyaki Way
            </p>
          </div>

          {/* Enhanced Search Bar */}
          <div className="max-w-3xl mx-auto animate-scale-in">
            <div className="backdrop-blur-xl bg-card/40 border border-border/50 rounded-3xl p-4 sm:p-6 shadow-2xl">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground" size={22} />
                  <Input
                    type="text"
                    placeholder="Thika, Juja, Kinoo, Kikuyu..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="pl-14 h-16 text-lg bg-background/50 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-2xl"
                  />
                </div>
                <Button 
                  onClick={handleSearch}
                  size="lg"
                  className="h-16 px-10 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-2xl shadow-cyan hover:shadow-xl transition-all duration-300"
                >
                  <Search className="mr-2" size={22} />
                  Search
                </Button>
              </div>

              {/* Popular Cities */}
              <div className="mt-6 flex flex-wrap gap-2 justify-center items-center">
                <span className="text-sm font-medium text-muted-foreground">Popular locations:</span>
                {popularCities.map((city) => (
                  <button
                    key={city}
                    onClick={() => setLocation(city)}
                    className="text-sm px-4 py-2 rounded-full bg-secondary/80 hover:bg-secondary text-secondary-foreground font-medium hover:scale-105 transition-all duration-200 shadow-sm"
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in pt-4">
            <Button 
              onClick={() => navigate('/request-tour')}
              size="lg" 
              className="h-14 px-10 text-lg bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-semibold rounded-2xl shadow-cyan hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
            >
              <Play className="mr-2" size={20} />
              Request a Tour
            </Button>
            <Button 
              onClick={() => navigate('/rent')}
              size="lg" 
              variant="outline"
              className="h-14 px-10 text-lg border-2 border-primary text-foreground hover:bg-primary hover:text-primary-foreground font-semibold rounded-2xl transition-all duration-300 w-full sm:w-auto"
            >
              View All Properties
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-3xl mx-auto pt-8 animate-fade-in">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary">500+</div>
              <div className="text-sm sm:text-base text-muted-foreground mt-1">Properties</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-secondary">1000+</div>
              <div className="text-sm sm:text-base text-muted-foreground mt-1">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary">50+</div>
              <div className="text-sm sm:text-base text-muted-foreground mt-1">Locations</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
