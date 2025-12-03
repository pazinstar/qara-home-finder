import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { CalendarIcon, Check, ChevronsUpDown, MapPin, Users } from "lucide-react";

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
  checkIn: Date | undefined;
  setCheckIn: (date: Date | undefined) => void;
  checkOut: Date | undefined;
  setCheckOut: (date: Date | undefined) => void;
  guests: number;
  setGuests: (guests: number) => void;
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  locations: { value: string; label: string }[];
  locationOpen: boolean;
  setLocationOpen: (open: boolean) => void;
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
  checkIn,
  setCheckIn,
  checkOut,
  setCheckOut,
  guests,
  setGuests,
  selectedLocation,
  setSelectedLocation,
  locations,
  locationOpen,
  setLocationOpen,
}: AirBnBFilterSidebarProps) => {
  return (
    <div className="space-y-6">
      {/* Check-in & Check-out */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Dates</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Check-in</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !checkIn && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {checkIn ? format(checkIn, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-popover z-50" align="start">
                <Calendar
                  mode="single"
                  selected={checkIn}
                  onSelect={setCheckIn}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label>Check-out</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !checkOut && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {checkOut ? format(checkOut, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-popover z-50" align="start">
                <Calendar
                  mode="single"
                  selected={checkOut}
                  onSelect={setCheckOut}
                  disabled={(date) => date < (checkIn || new Date())}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>

      {/* Guests */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Guests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setGuests(Math.max(1, guests - 1))}
              disabled={guests <= 1}
            >
              -
            </Button>
            <div className="flex items-center gap-2 px-4 py-2 border rounded-md flex-1 justify-center">
              <Users className="h-4 w-4" />
              <span>{guests} {guests === 1 ? "Guest" : "Guests"}</span>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setGuests(guests + 1)}
            >
              +
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Location */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Location</CardTitle>
        </CardHeader>
        <CardContent>
          <Popover open={locationOpen} onOpenChange={setLocationOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={locationOpen}
                className="w-full justify-between"
              >
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4" />
                  {selectedLocation
                    ? locations.find((loc) => loc.value === selectedLocation)?.label || selectedLocation
                    : "All Locations"}
                </div>
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 bg-popover z-50">
              <Command>
                <CommandInput
                  placeholder="Search or type location..."
                  value={selectedLocation}
                  onValueChange={(value) => setSelectedLocation(value)}
                />
                <CommandList>
                  <CommandEmpty>
                    <span className="text-sm text-muted-foreground">
                      Using: "{selectedLocation}"
                    </span>
                  </CommandEmpty>
                  <CommandGroup>
                    {locations.map((loc) => (
                      <CommandItem
                        key={loc.value || "all"}
                        value={loc.label}
                        onSelect={() => {
                          setSelectedLocation(loc.value);
                          setLocationOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedLocation === loc.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {loc.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </CardContent>
      </Card>

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
