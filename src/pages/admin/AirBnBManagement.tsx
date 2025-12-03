import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  Home,
  CalendarDays,
  Users,
  DollarSign,
  MapPin,
  Wifi,
  Car,
  Wind,
  Utensils,
  Tv,
  Bath,
} from "lucide-react";
import { format } from "date-fns";

interface AirBnBProperty {
  id: string;
  title: string;
  location: string;
  type: string;
  pricePerNight: number;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  images: string[];
  description: string;
  status: "active" | "inactive" | "maintenance";
  bookedDates: Date[];
  createdAt: Date;
}

interface AirBnBBooking {
  id: string;
  propertyId: string;
  propertyTitle: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  createdAt: Date;
}

const AMENITIES_OPTIONS = [
  { id: "wifi", label: "WiFi", icon: Wifi },
  { id: "parking", label: "Parking", icon: Car },
  { id: "ac", label: "Air Conditioning", icon: Wind },
  { id: "kitchen", label: "Kitchen", icon: Utensils },
  { id: "tv", label: "TV", icon: Tv },
  { id: "bathroom", label: "Private Bathroom", icon: Bath },
];

const PROPERTY_TYPES = [
  "Bedsitter",
  "Studio",
  "1 Bedroom",
  "2 Bedroom",
  "3 Bedroom",
  "4+ Bedroom",
  "Entire House",
  "Villa",
];

// Mock data
const mockProperties: AirBnBProperty[] = [
  {
    id: "1",
    title: "Cozy Studio in Westlands",
    location: "Westlands, Nairobi",
    type: "Studio",
    pricePerNight: 4500,
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    amenities: ["wifi", "parking", "ac", "tv"],
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"],
    description: "Modern studio apartment with all amenities.",
    status: "active",
    bookedDates: [new Date(2025, 11, 10), new Date(2025, 11, 11), new Date(2025, 11, 12)],
    createdAt: new Date(2025, 9, 15),
  },
  {
    id: "2",
    title: "Luxury 2BR Apartment",
    location: "Kilimani, Nairobi",
    type: "2 Bedroom",
    pricePerNight: 8500,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    amenities: ["wifi", "parking", "ac", "kitchen", "tv", "bathroom"],
    images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"],
    description: "Spacious 2-bedroom apartment with city views.",
    status: "active",
    bookedDates: [new Date(2025, 11, 20), new Date(2025, 11, 21)],
    createdAt: new Date(2025, 10, 1),
  },
  {
    id: "3",
    title: "Beach House Retreat",
    location: "Diani, Mombasa",
    type: "Entire House",
    pricePerNight: 15000,
    maxGuests: 8,
    bedrooms: 4,
    bathrooms: 3,
    amenities: ["wifi", "parking", "ac", "kitchen", "tv", "bathroom"],
    images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"],
    description: "Beautiful beachfront property.",
    status: "maintenance",
    bookedDates: [],
    createdAt: new Date(2025, 8, 20),
  },
];

const mockBookings: AirBnBBooking[] = [
  {
    id: "1",
    propertyId: "1",
    propertyTitle: "Cozy Studio in Westlands",
    guestName: "John Kamau",
    guestEmail: "john@email.com",
    guestPhone: "0712345678",
    checkIn: new Date(2025, 11, 10),
    checkOut: new Date(2025, 11, 13),
    guests: 2,
    totalPrice: 13500,
    status: "confirmed",
    createdAt: new Date(2025, 11, 1),
  },
  {
    id: "2",
    propertyId: "2",
    propertyTitle: "Luxury 2BR Apartment",
    guestName: "Mary Wanjiku",
    guestEmail: "mary@email.com",
    guestPhone: "0723456789",
    checkIn: new Date(2025, 11, 20),
    checkOut: new Date(2025, 11, 22),
    guests: 3,
    totalPrice: 17000,
    status: "pending",
    createdAt: new Date(2025, 11, 2),
  },
  {
    id: "3",
    propertyId: "1",
    propertyTitle: "Cozy Studio in Westlands",
    guestName: "Peter Omondi",
    guestEmail: "peter@email.com",
    guestPhone: "0734567890",
    checkIn: new Date(2025, 10, 25),
    checkOut: new Date(2025, 10, 28),
    guests: 1,
    totalPrice: 13500,
    status: "completed",
    createdAt: new Date(2025, 10, 20),
  },
];

const ITEMS_PER_PAGE = 5;

const AirBnBManagement = () => {
  // Properties state
  const [properties, setProperties] = useState<AirBnBProperty[]>(mockProperties);
  const [propertySearch, setPropertySearch] = useState("");
  const [propertyPage, setPropertyPage] = useState(1);
  const [propertyDialogOpen, setPropertyDialogOpen] = useState(false);
  const [propertyViewOpen, setPropertyViewOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<AirBnBProperty | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<AirBnBProperty | null>(null);

  // Bookings state
  const [bookings, setBookings] = useState<AirBnBBooking[]>(mockBookings);
  const [bookingSearch, setBookingSearch] = useState("");
  const [bookingStatusFilter, setBookingStatusFilter] = useState("all");
  const [bookingPage, setBookingPage] = useState(1);
  const [bookingViewOpen, setBookingViewOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<AirBnBBooking | null>(null);

  // Property form state
  const [formData, setFormData] = useState<{
    title: string;
    location: string;
    type: string;
    pricePerNight: string;
    maxGuests: string;
    bedrooms: string;
    bathrooms: string;
    description: string;
    status: "active" | "inactive" | "maintenance";
  }>({
    title: "",
    location: "",
    type: "",
    pricePerNight: "",
    maxGuests: "",
    bedrooms: "",
    bathrooms: "",
    description: "",
    status: "active",
  });
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);

  // Filter properties
  const filteredProperties = useMemo(() => {
    return properties.filter(
      (p) =>
        p.title.toLowerCase().includes(propertySearch.toLowerCase()) ||
        p.location.toLowerCase().includes(propertySearch.toLowerCase())
    );
  }, [properties, propertySearch]);

  // Filter bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const matchesSearch =
        b.guestName.toLowerCase().includes(bookingSearch.toLowerCase()) ||
        b.propertyTitle.toLowerCase().includes(bookingSearch.toLowerCase());
      const matchesStatus = bookingStatusFilter === "all" || b.status === bookingStatusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [bookings, bookingSearch, bookingStatusFilter]);

  // Pagination
  const propertyTotalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE);
  const paginatedProperties = filteredProperties.slice(
    (propertyPage - 1) * ITEMS_PER_PAGE,
    propertyPage * ITEMS_PER_PAGE
  );

  const bookingTotalPages = Math.ceil(filteredBookings.length / ITEMS_PER_PAGE);
  const paginatedBookings = filteredBookings.slice(
    (bookingPage - 1) * ITEMS_PER_PAGE,
    bookingPage * ITEMS_PER_PAGE
  );

  // Property handlers
  const resetForm = () => {
    setFormData({
      title: "",
      location: "",
      type: "",
      pricePerNight: "",
      maxGuests: "",
      bedrooms: "",
      bathrooms: "",
      description: "",
      status: "active",
    });
    setSelectedAmenities([]);
    setBookedDates([]);
    setEditingProperty(null);
  };

  const handleAddProperty = () => {
    resetForm();
    setPropertyDialogOpen(true);
  };

  const handleEditProperty = (property: AirBnBProperty) => {
    setEditingProperty(property);
    setFormData({
      title: property.title,
      location: property.location,
      type: property.type,
      pricePerNight: property.pricePerNight.toString(),
      maxGuests: property.maxGuests.toString(),
      bedrooms: property.bedrooms.toString(),
      bathrooms: property.bathrooms.toString(),
      description: property.description,
      status: property.status,
    });
    setSelectedAmenities(property.amenities);
    setBookedDates(property.bookedDates);
    setPropertyDialogOpen(true);
  };

  const handleViewProperty = (property: AirBnBProperty) => {
    setSelectedProperty(property);
    setPropertyViewOpen(true);
  };

  const handleSaveProperty = () => {
    if (editingProperty) {
      setProperties((prev) =>
        prev.map((p) =>
          p.id === editingProperty.id
            ? {
                ...p,
                ...formData,
                pricePerNight: Number(formData.pricePerNight),
                maxGuests: Number(formData.maxGuests),
                bedrooms: Number(formData.bedrooms),
                bathrooms: Number(formData.bathrooms),
                amenities: selectedAmenities,
                bookedDates,
              }
            : p
        )
      );
    } else {
      const newProperty: AirBnBProperty = {
        id: Date.now().toString(),
        ...formData,
        pricePerNight: Number(formData.pricePerNight),
        maxGuests: Number(formData.maxGuests),
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        amenities: selectedAmenities,
        bookedDates,
        images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"],
        createdAt: new Date(),
      };
      setProperties((prev) => [newProperty, ...prev]);
    }
    setPropertyDialogOpen(false);
    resetForm();
  };

  const handleDeleteProperty = (id: string) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
  };

  // Booking handlers
  const handleViewBooking = (booking: AirBnBBooking) => {
    setSelectedBooking(booking);
    setBookingViewOpen(true);
  };

  const handleUpdateBookingStatus = (id: string, status: AirBnBBooking["status"]) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    setBookingViewOpen(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-600 text-white">Active</Badge>;
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>;
      case "maintenance":
        return <Badge className="bg-yellow-600 text-white">Maintenance</Badge>;
      case "pending":
        return <Badge className="bg-yellow-600 text-white">Pending</Badge>;
      case "confirmed":
        return <Badge className="bg-green-600 text-white">Confirmed</Badge>;
      case "cancelled":
        return <Badge className="bg-destructive text-destructive-foreground">Cancelled</Badge>;
      case "completed":
        return <Badge variant="outline">Completed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  // Stats
  const totalRevenue = bookings
    .filter((b) => b.status === "completed" || b.status === "confirmed")
    .reduce((sum, b) => sum + b.totalPrice, 0);
  const activeListings = properties.filter((p) => p.status === "active").length;
  const pendingBookings = bookings.filter((b) => b.status === "pending").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">AirBnB Management</h1>
        <p className="text-muted-foreground">Manage your short-term rental properties and bookings</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Home className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Listings</p>
              <p className="text-2xl font-bold">{activeListings}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-green-500/10 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <p className="text-2xl font-bold">KES {totalRevenue.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-yellow-500/10 rounded-lg">
              <CalendarDays className="h-6 w-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending Bookings</p>
              <p className="text-2xl font-bold">{pendingBookings}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <Users className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Bookings</p>
              <p className="text-2xl font-bold">{bookings.length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="properties" className="space-y-4">
        <TabsList>
          <TabsTrigger value="properties">Properties</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
        </TabsList>

        {/* Properties Tab */}
        <TabsContent value="properties" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>AirBnB Properties</CardTitle>
              <Button onClick={handleAddProperty}>
                <Plus className="h-4 w-4 mr-2" />
                Add Property
              </Button>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search properties..."
                    value={propertySearch}
                    onChange={(e) => {
                      setPropertySearch(e.target.value);
                      setPropertyPage(1);
                    }}
                    className="pl-9"
                  />
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Property</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Price/Night</TableHead>
                    <TableHead>Max Guests</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedProperties.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No properties found
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedProperties.map((property) => (
                      <TableRow key={property.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <img
                              src={property.images[0]}
                              alt={property.title}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <p className="font-medium">{property.title}</p>
                              <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {property.location}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{property.type}</TableCell>
                        <TableCell>KES {property.pricePerNight.toLocaleString()}</TableCell>
                        <TableCell>{property.maxGuests}</TableCell>
                        <TableCell>{getStatusBadge(property.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="sm" onClick={() => handleViewProperty(property)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleEditProperty(property)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive"
                              onClick={() => handleDeleteProperty(property.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>

              {propertyTotalPages > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-muted-foreground">
                    Page {propertyPage} of {propertyTotalPages}
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPropertyPage((p) => Math.max(1, p - 1))}
                      disabled={propertyPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPropertyPage((p) => Math.min(propertyTotalPages, p + 1))}
                      disabled={propertyPage === propertyTotalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Bookings Tab */}
        <TabsContent value="bookings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AirBnB Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search bookings..."
                    value={bookingSearch}
                    onChange={(e) => {
                      setBookingSearch(e.target.value);
                      setBookingPage(1);
                    }}
                    className="pl-9"
                  />
                </div>
                <Select
                  value={bookingStatusFilter}
                  onValueChange={(value) => {
                    setBookingStatusFilter(value);
                    setBookingPage(1);
                  }}
                >
                  <SelectTrigger className="w-full md:w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Guest</TableHead>
                    <TableHead>Property</TableHead>
                    <TableHead>Check-in</TableHead>
                    <TableHead>Check-out</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedBookings.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No bookings found
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{booking.guestName}</p>
                            <p className="text-sm text-muted-foreground">{booking.guestEmail}</p>
                          </div>
                        </TableCell>
                        <TableCell>{booking.propertyTitle}</TableCell>
                        <TableCell>{format(booking.checkIn, "MMM d, yyyy")}</TableCell>
                        <TableCell>{format(booking.checkOut, "MMM d, yyyy")}</TableCell>
                        <TableCell>KES {booking.totalPrice.toLocaleString()}</TableCell>
                        <TableCell>{getStatusBadge(booking.status)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => handleViewBooking(booking)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>

              {bookingTotalPages > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-muted-foreground">
                    Page {bookingPage} of {bookingTotalPages}
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setBookingPage((p) => Math.max(1, p - 1))}
                      disabled={bookingPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setBookingPage((p) => Math.min(bookingTotalPages, p + 1))}
                      disabled={bookingPage === bookingTotalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Property Form Dialog */}
      <Dialog open={propertyDialogOpen} onOpenChange={setPropertyDialogOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProperty ? "Edit Property" : "Add New Property"}</DialogTitle>
            <DialogDescription>
              {editingProperty ? "Update property details" : "Add a new AirBnB listing"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Property Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Cozy Studio Apartment"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Westlands, Nairobi"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Property Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {PROPERTY_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price per Night (KES)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.pricePerNight}
                  onChange={(e) => setFormData({ ...formData, pricePerNight: e.target.value })}
                  placeholder="4500"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="guests">Max Guests</Label>
                <Input
                  id="guests"
                  type="number"
                  value={formData.maxGuests}
                  onChange={(e) => setFormData({ ...formData, maxGuests: e.target.value })}
                  placeholder="2"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input
                  id="bedrooms"
                  type="number"
                  value={formData.bedrooms}
                  onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                  placeholder="1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input
                  id="bathrooms"
                  type="number"
                  value={formData.bathrooms}
                  onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                  placeholder="1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: "active" | "inactive" | "maintenance") =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Amenities</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {AMENITIES_OPTIONS.map((amenity) => {
                  const Icon = amenity.icon;
                  return (
                    <div key={amenity.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={amenity.id}
                        checked={selectedAmenities.includes(amenity.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedAmenities([...selectedAmenities, amenity.id]);
                          } else {
                            setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity.id));
                          }
                        }}
                      />
                      <Label htmlFor={amenity.id} className="flex items-center gap-2 cursor-pointer">
                        <Icon className="h-4 w-4" />
                        {amenity.label}
                      </Label>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your property..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                Booked Dates (click to mark as booked)
              </Label>
              <Calendar
                mode="multiple"
                selected={bookedDates}
                onSelect={(dates) => setBookedDates(dates || [])}
                className="rounded-md border"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPropertyDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveProperty}>
              {editingProperty ? "Update" : "Add"} Property
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Property Dialog */}
      <Dialog open={propertyViewOpen} onOpenChange={setPropertyViewOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Property Details</DialogTitle>
          </DialogHeader>
          {selectedProperty && (
            <div className="space-y-4">
              <img
                src={selectedProperty.images[0]}
                alt={selectedProperty.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div>
                <h3 className="font-bold text-lg">{selectedProperty.title}</h3>
                <p className="text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {selectedProperty.location}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(selectedProperty.status)}
                <Badge variant="outline">{selectedProperty.type}</Badge>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-2xl font-bold">KES {selectedProperty.pricePerNight.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">per night</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-2xl font-bold">{selectedProperty.maxGuests}</p>
                  <p className="text-xs text-muted-foreground">max guests</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-2xl font-bold">{selectedProperty.bedrooms}</p>
                  <p className="text-xs text-muted-foreground">bedrooms</p>
                </div>
              </div>
              <div>
                <p className="font-semibold mb-2">Amenities</p>
                <div className="flex flex-wrap gap-2">
                  {selectedProperty.amenities.map((a) => {
                    const amenity = AMENITIES_OPTIONS.find((opt) => opt.id === a);
                    return amenity ? (
                      <Badge key={a} variant="secondary" className="flex items-center gap-1">
                        <amenity.icon className="h-3 w-3" />
                        {amenity.label}
                      </Badge>
                    ) : null;
                  })}
                </div>
              </div>
              <div>
                <p className="font-semibold mb-2">Description</p>
                <p className="text-sm text-muted-foreground">{selectedProperty.description}</p>
              </div>
              {selectedProperty.bookedDates.length > 0 && (
                <div>
                  <p className="font-semibold mb-2">Booked Dates</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedProperty.bookedDates.map((date, i) => (
                      <Badge key={i} variant="outline">
                        {format(date, "MMM d")}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* View Booking Dialog */}
      <Dialog open={bookingViewOpen} onOpenChange={setBookingViewOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">Guest Information</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="text-muted-foreground">Name:</span> {selectedBooking.guestName}</p>
                  <p><span className="text-muted-foreground">Email:</span> {selectedBooking.guestEmail}</p>
                  <p><span className="text-muted-foreground">Phone:</span> {selectedBooking.guestPhone}</p>
                  <p><span className="text-muted-foreground">Guests:</span> {selectedBooking.guests}</p>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Property</h4>
                <p>{selectedBooking.propertyTitle}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Check-in</p>
                  <p className="font-semibold">{format(selectedBooking.checkIn, "MMM d, yyyy")}</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Check-out</p>
                  <p className="font-semibold">{format(selectedBooking.checkOut, "MMM d, yyyy")}</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg">
                <span className="font-semibold">Total Price</span>
                <span className="text-xl font-bold">KES {selectedBooking.totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Status</span>
                {getStatusBadge(selectedBooking.status)}
              </div>
              {selectedBooking.status === "pending" && (
                <div className="flex gap-2">
                  <Button
                    className="flex-1"
                    onClick={() => handleUpdateBookingStatus(selectedBooking.id, "confirmed")}
                  >
                    Confirm Booking
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => handleUpdateBookingStatus(selectedBooking.id, "cancelled")}
                  >
                    Cancel
                  </Button>
                </div>
              )}
              {selectedBooking.status === "confirmed" && (
                <Button
                  className="w-full"
                  onClick={() => handleUpdateBookingStatus(selectedBooking.id, "completed")}
                >
                  Mark as Completed
                </Button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AirBnBManagement;
