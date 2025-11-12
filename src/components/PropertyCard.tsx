import { Heart, MapPin, Bed, Bath, Square } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface PropertyCardProps {
  id: string;
  title: string;
  location: string;
  price: string;
  type: "rent" | "sale";
  bedrooms: number;
  bathrooms: number;
  area: string;
  image: string;
  featured?: boolean;
}

const PropertyCard = ({
  id,
  title,
  location,
  price,
  type,
  bedrooms,
  bathrooms,
  area,
  image,
  featured = false,
}: PropertyCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  return (
    <Card 
      className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
      onClick={() => navigate(`/property/${id}`)}
    >
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
          aria-label="Add to favorites"
        >
          <Heart
            size={20}
            className={`transition-colors ${
              isFavorite ? "fill-red-500 text-red-500" : "text-foreground"
            }`}
          />
        </button>
        {featured && (
          <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground font-semibold">
            Featured
          </Badge>
        )}
        <Badge className="absolute bottom-4 left-4 bg-primary text-primary-foreground font-medium capitalize">
          For {type}
        </Badge>
      </div>

      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <div className="flex items-center text-muted-foreground mb-4">
          <MapPin size={16} className="mr-1" />
          <span className="text-sm">{location}</span>
        </div>

        <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Bed size={18} />
              <span>{bedrooms}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath size={18} />
              <span>{bathrooms}</span>
            </div>
            <div className="flex items-center gap-1">
              <Square size={18} />
              <span>{area}</span>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-2xl font-bold text-primary">{price}</p>
          {type === "rent" && <p className="text-sm text-muted-foreground">per month</p>}
        </div>
        
        <div className="flex gap-2">
          <Button 
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/view-location?propertyId=${id}`);
            }}
            variant="outline"
            className="flex-1"
          >
            View Free
          </Button>
          <Button 
            onClick={(e) => {
              e.stopPropagation();
              navigate('/booking');
            }}
            className="flex-1"
          >
            Book Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
