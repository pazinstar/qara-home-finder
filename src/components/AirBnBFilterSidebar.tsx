import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

interface AirBnBFilterSidebarProps {
  propertyTypes: string[];
  selectedPropertyTypes: string[];
  togglePropertyType: (type: string) => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  allAmenities: string[];
  selectedAmenities: string[];
  toggleAmenity: (amenity: string) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
}

const AirBnBFilterSidebar = ({
  propertyTypes,
  selectedPropertyTypes,
  togglePropertyType,
  priceRange,
  setPriceRange,
  allAmenities,
  selectedAmenities,
  toggleAmenity,
  clearFilters,
  hasActiveFilters,
}: AirBnBFilterSidebarProps) => {
  return (
    <div className="space-y-6">
      {/* Property Type */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Property Type</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {propertyTypes.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={`type-${type}`}
                checked={selectedPropertyTypes.includes(type)}
                onCheckedChange={() => togglePropertyType(type)}
              />
              <label
                htmlFor={`type-${type}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {type}
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Price per night</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            min={0}
            max={20000}
            step={500}
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>KES {priceRange[0].toLocaleString()}</span>
            <span>KES {priceRange[1].toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>

      {/* Amenities */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Amenities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {allAmenities.map((amenity) => (
            <div key={amenity} className="flex items-center space-x-2">
              <Checkbox
                id={`amenity-${amenity}`}
                checked={selectedAmenities.includes(amenity)}
                onCheckedChange={() => toggleAmenity(amenity)}
              />
              <label
                htmlFor={`amenity-${amenity}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {amenity}
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <Button variant="outline" onClick={clearFilters} className="w-full">
          Clear All Filters
        </Button>
      )}
    </div>
  );
};

export default AirBnBFilterSidebar;
