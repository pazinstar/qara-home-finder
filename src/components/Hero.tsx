import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Home, Award, Users, ChevronDown, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import posterImage from "@/assets/hero-video-poster.jpg";

const Hero = () => {
  const [location, setLocation] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();

  const popularCities = ["Thika", "Juja", "Kamakis", "Kinoo", "Kangemi", "Kikuyu"];

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Multiple attempts to ensure video plays
      const playVideo = () => {
        video.play().catch(() => {
          // Retry after a short delay
          setTimeout(() => video.play().catch(() => {}), 500);
        });
      };
      
      // Try to play immediately
      playVideo();
      
      // Also try when the video loads
      video.addEventListener('loadeddata', playVideo);
      
      return () => video.removeEventListener('loadeddata', playVideo);
    }
  }, []);

  const handleSearch = () => {
    if (location.trim()) {
      navigate(`/rent?location=${encodeURIComponent(location)}`);
    } else {
      navigate('/rent');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Video Background Layer */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster={posterImage}
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        >
          <source src="/videos/hero-background.mp4" type="video/mp4" />
        </video>
        
        {/* Light overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background/60" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          
          {/* Hero Content */}
          <div className="text-center space-y-8 sm:space-y-10">

            {/* Main Heading */}
            <div className="space-y-4 animate-fade-in">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight drop-shadow-2xl">
                <span className="text-white">Your Dream Home</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary drop-shadow-lg">
                  Awaits You
                </span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-2xl mx-auto font-medium drop-shadow-lg">
                Premium properties along Thika Road & Waiyaki Way
              </p>
            </div>

            {/* Search Box */}
            <div className="max-w-3xl mx-auto animate-scale-in">
              <div className="relative">
                {/* Search card */}
                <div className="relative backdrop-blur-xl bg-background/80 border border-border/50 rounded-2xl p-3 sm:p-4 shadow-2xl">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                      <Input
                        type="text"
                        placeholder="Search: Thika, Juja, Kinoo..."
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="pl-12 h-14 text-base bg-background border-border focus:ring-2 focus:ring-primary rounded-xl"
                      />
                    </div>
                    <Button 
                      onClick={handleSearch}
                      size="lg"
                      className="h-14 px-8 text-base bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground font-bold rounded-xl shadow-lg transition-all"
                    >
                      <Search className="mr-2" size={20} />
                      Search
                    </Button>
                  </div>

                  {/* Popular Locations */}
                  <div className="mt-4 flex flex-wrap gap-2 justify-center">
                    {popularCities.map((city) => (
                      <button
                        key={city}
                        onClick={() => setLocation(city)}
                        className="text-sm px-4 py-2 rounded-full bg-primary/20 hover:bg-primary hover:text-primary-foreground border border-primary/30 hover:border-primary font-medium transition-all"
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center animate-fade-in max-w-xl mx-auto">
              <Button 
                onClick={() => navigate('/request-tour')}
                size="lg" 
                className="w-full sm:w-auto h-14 px-8 text-base bg-gradient-to-r from-primary to-accent hover:scale-105 text-primary-foreground font-bold rounded-xl shadow-lg transition-all"
              >
                <Home className="mr-2" size={20} />
                Schedule Tour
              </Button>
              <Button 
                onClick={() => window.location.href = 'tel:0745812620'}
                size="lg" 
                className="w-full sm:w-auto h-14 px-8 text-base border-2 border-white/80 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-background font-bold rounded-xl transition-all"
              >
                <Phone className="mr-2" size={20} />
                Call Now
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto pt-6 animate-fade-in">
              <div className="bg-background/60 backdrop-blur-md rounded-xl p-4 border border-border/30">
                <div className="text-3xl sm:text-4xl font-bold text-primary">500+</div>
                <div className="text-xs sm:text-sm text-foreground/80 mt-1">Properties</div>
              </div>
              
              <div className="bg-background/60 backdrop-blur-md rounded-xl p-4 border border-border/30">
                <div className="text-3xl sm:text-4xl font-bold text-accent">1000+</div>
                <div className="text-xs sm:text-sm text-foreground/80 mt-1">Clients</div>
              </div>
              
              <div className="bg-background/60 backdrop-blur-md rounded-xl p-4 border border-border/30">
                <div className="text-3xl sm:text-4xl font-bold text-secondary">50+</div>
                <div className="text-xs sm:text-sm text-foreground/80 mt-1">Locations</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
