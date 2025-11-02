import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";

const FilterPanel = () => {
  const [priceRange, setPriceRange] = useState([0, 5000000]);

  return (
    <Card className="p-6 sticky top-24">
      <h3 className="text-lg font-bold mb-6">Filter Properties</h3>

      <div className="space-y-6">
        {/* Property Type */}
        <div>
          <Label className="text-sm font-semibold mb-2 block">Property Type</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="villa">Villa</SelectItem>
              <SelectItem value="studio">Studio</SelectItem>
              <SelectItem value="penthouse">Penthouse</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bedrooms */}
        <div>
          <Label className="text-sm font-semibold mb-2 block">Bedrooms</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
              <SelectItem value="5">5+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bathrooms */}
        <div>
          <Label className="text-sm font-semibold mb-2 block">Bathrooms</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div>
          <Label className="text-sm font-semibold mb-2 block">
            Price Range (KES)
          </Label>
          <div className="pt-2">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={10000000}
              step={100000}
              className="mb-4"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{priceRange[0].toLocaleString()}</span>
              <span>{priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Location */}
        <div>
          <Label className="text-sm font-semibold mb-2 block">Location</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="All locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="nairobi">Nairobi</SelectItem>
              <SelectItem value="mombasa">Mombasa</SelectItem>
              <SelectItem value="kisumu">Kisumu</SelectItem>
              <SelectItem value="nakuru">Nakuru</SelectItem>
              <SelectItem value="eldoret">Eldoret</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Buttons */}
        <div className="space-y-2 pt-4">
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            Apply Filters
          </Button>
          <Button variant="outline" className="w-full">
            Reset All
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default FilterPanel;
