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
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.4)' }}
        >
          <source src="https://cdn.pixabay.com/video/2022/11/07/138419-768661731_large.mp4" type="video/mp4" />
        </video>
        
        {/* Multi-layer gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-transparent to-accent/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,hsl(var(--background))_100%)]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          
          {/* Hero Content */}
          <div className="text-center space-y-8 sm:space-y-12">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-sm animate-fade-in">
              <Award className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Trusted by 1000+ Happy Tenants</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4 sm:space-y-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
                <span className="text-foreground">Your Dream Home</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">
                  Awaits You
                </span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-light">
                Discover premium properties along Thika Road & Waiyaki Way
              </p>
            </div>

            {/* Search Box */}
            <div className="max-w-4xl mx-auto animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-3xl blur-xl opacity-30" />
                
                {/* Search card */}
                <div className="relative backdrop-blur-2xl bg-card/60 border border-border/50 rounded-3xl p-3 sm:p-4 shadow-2xl">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 relative group">
                      <MapPin className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={20} />
                      <Input
                        type="text"
                        placeholder="Search: Thika, Juja, Kinoo..."
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="pl-12 sm:pl-14 h-14 sm:h-16 text-base sm:text-lg bg-background/80 border-0 focus:ring-2 focus:ring-primary/50 rounded-2xl placeholder:text-muted-foreground/60"
                      />
                    </div>
                    <Button 
                      onClick={handleSearch}
                      size="lg"
                      className="h-14 sm:h-16 px-8 sm:px-12 text-base sm:text-lg bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] hover:bg-[position:100%_0] text-primary-foreground font-bold rounded-2xl shadow-purple transition-all duration-500"
                    >
                      <Search className="mr-2" size={20} />
                      <span className="hidden sm:inline">Search Properties</span>
                      <span className="sm:hidden">Search</span>
                    </Button>
                  </div>

                  {/* Popular Locations */}
                  <div className="mt-4 sm:mt-6 flex flex-wrap gap-2 justify-center">
                    <span className="text-xs sm:text-sm text-muted-foreground/80 mr-2">Quick search:</span>
                    {popularCities.map((city) => (
                      <button
                        key={city}
                        onClick={() => setLocation(city)}
                        className="text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground border border-primary/20 hover:border-primary font-medium transition-all duration-300 hover:scale-105"
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center animate-fade-in max-w-2xl mx-auto" style={{ animationDelay: '0.3s' }}>
              <Button 
                onClick={() => navigate('/request-tour')}
                size="lg" 
                className="w-full sm:w-auto h-14 sm:h-16 px-8 sm:px-12 text-base sm:text-lg bg-gradient-to-r from-primary to-accent hover:shadow-purple hover:scale-105 text-primary-foreground font-bold rounded-2xl transition-all duration-300"
              >
                <Home className="mr-2" size={20} />
                Schedule Tour
              </Button>
              <Button 
                onClick={() => window.location.href = 'tel:0745812620'}
                size="lg" 
                variant="outline"
                className="w-full sm:w-auto h-14 sm:h-16 px-8 sm:px-12 text-base sm:text-lg border-2 border-primary/60 bg-background/40 backdrop-blur-sm text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary font-bold rounded-2xl transition-all duration-300"
              >
                <Phone className="mr-2" size={20} />
                Call Now
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-4xl mx-auto pt-8 sm:pt-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative bg-card/30 backdrop-blur-sm border border-border/30 rounded-2xl p-4 sm:p-6 hover:border-primary/50 transition-all">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-primary to-accent">500+</div>
                  <div className="text-xs sm:text-sm md:text-base text-muted-foreground mt-2 font-medium">Properties</div>
                </div>
              </div>
              
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative bg-card/30 backdrop-blur-sm border border-border/30 rounded-2xl p-4 sm:p-6 hover:border-accent/50 transition-all">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-accent to-secondary">1000+</div>
                  <div className="text-xs sm:text-sm md:text-base text-muted-foreground mt-2 font-medium">Happy Clients</div>
                </div>
              </div>
              
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative bg-card/30 backdrop-blur-sm border border-border/30 rounded-2xl p-4 sm:p-6 hover:border-secondary/50 transition-all">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-secondary to-primary">50+</div>
                  <div className="text-xs sm:text-sm md:text-base text-muted-foreground mt-2 font-medium">Locations</div>
                </div>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="pt-8 sm:pt-12 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <button 
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                className="inline-flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
              >
                <span className="text-xs sm:text-sm font-medium">Explore Properties</span>
                <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 animate-bounce" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
