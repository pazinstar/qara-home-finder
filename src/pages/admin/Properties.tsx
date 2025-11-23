import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit, Trash2, Eye, Upload, X, FileVideo, Image as ImageIcon, Filter, ArrowUpDown } from "lucide-react";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

interface MediaFile {
  id: string;
  name: string;
  type: 'image' | 'video';
  path: string;
  file?: File;
}

const Properties = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [ownerUsername, setOwnerUsername] = useState("");
  const [propertyTitle, setPropertyTitle] = useState("");
  const [images, setImages] = useState<MediaFile[]>([]);
  const [video, setVideo] = useState<MediaFile | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<any>(null);
  const [deletePropertyId, setDeletePropertyId] = useState<number | null>(null);
  const [viewProperty, setViewProperty] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("id");
  const itemsPerPage = 10;

  // Mock user role - in real app this would come from auth
  const userRole = "admin"; // Can be "admin", "moderator", or "user"

  const allProperties = [
    { id: 1, title: "Lavington Villa", type: "Buy", price: "KSh 45M", status: "Active", beds: 5, baths: 4, owner: "john_doe", images: 8, video: true, location: "Lavington", area: 450, description: "Luxury villa with modern amenities" },
    { id: 2, title: "Kilimani Apartment", type: "Rent", price: "KSh 150K/mo", status: "Active", beds: 3, baths: 2, owner: "jane_smith", images: 5, video: true, location: "Kilimani", area: 150, description: "Modern apartment in prime location" },
    { id: 3, title: "Karen House", type: "Buy", price: "KSh 65M", status: "Pending", beds: 6, baths: 5, owner: "mike_wilson", images: 12, video: false, location: "Karen", area: 600, description: "Spacious family home" },
    { id: 4, title: "Westlands Studio", type: "AirBnB", price: "KSh 8K/night", status: "Active", beds: 1, baths: 1, owner: "sarah_jones", images: 6, video: true, location: "Westlands", area: 45, description: "Cozy studio apartment" },
    { id: 5, title: "Langata Land", type: "Land", price: "KSh 12M", status: "Active", beds: 0, baths: 0, owner: "john_doe", images: 4, video: false, location: "Langata", area: 2000, description: "Prime land for development" },
    { id: 6, title: "Runda Mansion", type: "Buy", price: "KSh 95M", status: "Active", beds: 7, baths: 6, owner: "john_doe", images: 15, video: true, location: "Runda", area: 800, description: "Exclusive mansion with pool" },
    { id: 7, title: "Parklands Flat", type: "Rent", price: "KSh 80K/mo", status: "Active", beds: 2, baths: 1, owner: "jane_smith", images: 4, video: false, location: "Parklands", area: 90, description: "Affordable flat" },
    { id: 8, title: "Nyali Beach House", type: "AirBnB", price: "KSh 15K/night", status: "Pending", beds: 4, baths: 3, owner: "mike_wilson", images: 10, video: true, location: "Nyali", area: 300, description: "Beachfront property" },
  ];

  // Filter properties
  const filteredProperties = allProperties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.owner.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || property.type === typeFilter;
    const matchesStatus = statusFilter === "all" || property.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  // Sort properties
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case "price":
        const priceA = parseFloat(a.price.replace(/[^\d.]/g, ''));
        const priceB = parseFloat(b.price.replace(/[^\d.]/g, ''));
        return priceB - priceA;
      case "title":
        return a.title.localeCompare(b.title);
      case "owner":
        return a.owner.localeCompare(b.owner);
      case "status":
        return a.status.localeCompare(b.status);
      default:
        return b.id - a.id;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedProperties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProperties = sortedProperties.slice(startIndex, startIndex + itemsPerPage);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: MediaFile[] = Array.from(files).map((file, index) => {
      const sanitizedTitle = propertyTitle.toLowerCase().replace(/\s+/g, '_') || 'property';
      const sanitizedUsername = ownerUsername.toLowerCase().replace(/\s+/g, '_') || 'user';
      const timestamp = Date.now();
      const imageName = `${sanitizedUsername}_${sanitizedTitle}_${timestamp}_${index + 1}.jpg`;
      
      return {
        id: `img_${timestamp}_${index}`,
        name: imageName,
        type: 'image' as const,
        path: `public/${sanitizedUsername}/images/${imageName}`,
        file
      };
    });

    setImages([...images, ...newImages]);
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const sanitizedTitle = propertyTitle.toLowerCase().replace(/\s+/g, '_') || 'property';
    const sanitizedUsername = ownerUsername.toLowerCase().replace(/\s+/g, '_') || 'user';
    const timestamp = Date.now();
    const videoName = `${sanitizedUsername}_${sanitizedTitle}_${timestamp}.mp4`;

    setVideo({
      id: `vid_${timestamp}`,
      name: videoName,
      type: 'video',
      path: `public/${sanitizedUsername}/videos/${videoName}`,
      file
    });
  };

  const removeImage = (id: string) => {
    setImages(images.filter(img => img.id !== id));
  };

  const removeVideo = () => {
    setVideo(null);
  };

  const renameMedia = (id: string, newName: string) => {
    setImages(images.map(img => {
      if (img.id === id) {
        const sanitizedUsername = ownerUsername.toLowerCase().replace(/\s+/g, '_') || 'user';
        return {
          ...img,
          name: newName,
          path: `public/${sanitizedUsername}/images/${newName}`
        };
      }
      return img;
    }));
  };

  const handleEdit = (property: any) => {
    setEditingProperty(property);
    setOwnerUsername(property.owner);
    setPropertyTitle(property.title);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setDeletePropertyId(id);
  };

  const confirmDelete = () => {
    toast.success("Property deleted successfully");
    setDeletePropertyId(null);
  };

  const handleSubmit = () => {
    if (editingProperty) {
      toast.success("Property updated successfully");
    } else {
      toast.success("Property added successfully");
    }
    handleDialogClose();
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingProperty(null);
    setOwnerUsername("");
    setPropertyTitle("");
    setImages([]);
    setVideo(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Properties</h2>
          <p className="text-muted-foreground">Manage all property listings</p>
        </div>
        {(userRole === "admin" || userRole === "moderator") && (
          <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Property
              </Button>
            </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh]">
            <DialogHeader>
              <DialogTitle>{editingProperty ? "Edit Property" : "Add New Property"}</DialogTitle>
            </DialogHeader>
            <ScrollArea className="max-h-[calc(90vh-8rem)] pr-4">
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="owner">Owner Username</Label>
                    <Input 
                      id="owner" 
                      placeholder="e.g. john_doe" 
                      value={ownerUsername}
                      onChange={(e) => setOwnerUsername(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Files will be saved in: public/{ownerUsername || 'username'}/
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="title">Property Title</Label>
                    <Input 
                      id="title" 
                      placeholder="Enter property title"
                      value={propertyTitle}
                      onChange={(e) => setPropertyTitle(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Select>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="buy">Buy</SelectItem>
                        <SelectItem value="rent">Rent</SelectItem>
                        <SelectItem value="airbnb">AirBnB</SelectItem>
                        <SelectItem value="land">Land</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="price">Price</Label>
                    <Input id="price" type="number" placeholder="Enter price" />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <Label htmlFor="beds">Bedrooms</Label>
                    <Input id="beds" type="number" placeholder="0" />
                  </div>
                  <div>
                    <Label htmlFor="baths">Bathrooms</Label>
                    <Input id="baths" type="number" placeholder="0" />
                  </div>
                  <div>
                    <Label htmlFor="area">Area (sqm)</Label>
                    <Input id="area" type="number" placeholder="0" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Enter location" />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Enter property description" rows={4} />
                </div>

                {/* Media Upload Section */}
                <div className="space-y-4 border-t pt-4">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <ImageIcon className="h-5 w-5" />
                    Property Images
                  </h3>
                  
                  <div>
                    <Label htmlFor="images" className="cursor-pointer">
                      <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg hover:border-primary transition-colors">
                        <div className="text-center">
                          <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">Click to upload images</p>
                          <p className="text-xs text-muted-foreground mt-1">Multiple files supported</p>
                        </div>
                      </div>
                      <Input 
                        id="images" 
                        type="file" 
                        accept="image/*" 
                        multiple 
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </Label>
                  </div>

                  {images.length > 0 && (
                    <div className="space-y-2">
                      {images.map((img) => (
                        <div key={img.id} className="flex items-center gap-2 p-2 border rounded-lg bg-muted/50">
                          <ImageIcon className="h-4 w-4 text-muted-foreground" />
                          <div className="flex-1 min-w-0">
                            <Input 
                              value={img.name} 
                              onChange={(e) => renameMedia(img.id, e.target.value)}
                              className="h-8 text-xs"
                            />
                            <p className="text-xs text-muted-foreground truncate mt-1">{img.path}</p>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => removeImage(img.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-4 border-t pt-4">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <FileVideo className="h-5 w-5" />
                    Property Video
                  </h3>
                  
                  {!video ? (
                    <div>
                      <Label htmlFor="video" className="cursor-pointer">
                        <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg hover:border-primary transition-colors">
                          <div className="text-center">
                            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">Click to upload video</p>
                            <p className="text-xs text-muted-foreground mt-1">Single video file</p>
                          </div>
                        </div>
                        <Input 
                          id="video" 
                          type="file" 
                          accept="video/*" 
                          className="hidden"
                          onChange={handleVideoUpload}
                        />
                      </Label>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 p-2 border rounded-lg bg-muted/50">
                      <FileVideo className="h-4 w-4 text-muted-foreground" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{video.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{video.path}</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={removeVideo}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleDialogClose} className="flex-1">
                    Cancel
                  </Button>
                  <Button onClick={handleSubmit} className="flex-1">
                    {editingProperty ? "Update Property" : "Save Property"}
                  </Button>
                </div>
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
        )}
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search properties..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Buy">Buy</SelectItem>
                  <SelectItem value="Rent">Rent</SelectItem>
                  <SelectItem value="AirBnB">AirBnB</SelectItem>
                  <SelectItem value="Land">Land</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="id">Newest First</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                  <SelectItem value="owner">Owner</SelectItem>
                  <SelectItem value="status">Status</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Media</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedProperties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell className="font-medium">#{property.id}</TableCell>
                  <TableCell>{property.title}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{property.owner}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{property.type}</Badge>
                  </TableCell>
                  <TableCell>{property.price}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <ImageIcon className="h-3 w-3" />
                        {property.images}
                      </div>
                      <div className="flex items-center gap-1">
                        <FileVideo className="h-3 w-3" />
                        {property.video ? "Yes" : "No"}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={property.status === "Active" ? "default" : "secondary"}>
                      {property.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => setViewProperty(property)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      {(userRole === "admin" || userRole === "moderator") && (
                        <>
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(property)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          {userRole === "admin" && (
                            <Button variant="ghost" size="icon" onClick={() => handleDelete(property.id)}>
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          )}
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i + 1}>
                <PaginationLink
                  onClick={() => setCurrentPage(i + 1)}
                  isActive={currentPage === i + 1}
                  className="cursor-pointer"
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      <AlertDialog open={deletePropertyId !== null} onOpenChange={() => setDeletePropertyId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Property</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this property? This will permanently delete all media files and cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Property Detail View */}
      <Dialog open={viewProperty !== null} onOpenChange={() => setViewProperty(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Property Details</DialogTitle>
          </DialogHeader>
          {viewProperty && (
            <ScrollArea className="max-h-[calc(90vh-8rem)] pr-4">
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label className="text-muted-foreground">Title</Label>
                    <p className="text-lg font-semibold">{viewProperty.title}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Owner</Label>
                    <Badge variant="secondary" className="mt-1">{viewProperty.owner}</Badge>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <Label className="text-muted-foreground">Type</Label>
                    <Badge variant="outline" className="mt-1">{viewProperty.type}</Badge>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Price</Label>
                    <p className="text-lg font-bold text-primary">{viewProperty.price}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Status</Label>
                    <Badge variant={viewProperty.status === "Active" ? "default" : "secondary"} className="mt-1">
                      {viewProperty.status}
                    </Badge>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <Label className="text-muted-foreground">Bedrooms</Label>
                    <p className="text-lg">{viewProperty.beds}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Bathrooms</Label>
                    <p className="text-lg">{viewProperty.baths}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Area</Label>
                    <p className="text-lg">{viewProperty.area} sqm</p>
                  </div>
                </div>

                <div>
                  <Label className="text-muted-foreground">Location</Label>
                  <p className="text-lg">{viewProperty.location}</p>
                </div>

                <div>
                  <Label className="text-muted-foreground">Description</Label>
                  <p className="text-foreground">{viewProperty.description}</p>
                </div>

                <div className="border-t pt-4">
                  <Label className="text-muted-foreground">Media</Label>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="h-4 w-4 text-muted-foreground" />
                      <span>{viewProperty.images} images</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileVideo className="h-4 w-4 text-muted-foreground" />
                      <span>{viewProperty.video ? "1 video" : "No video"}</span>
                    </div>
                  </div>
                </div>

                <Button onClick={() => setViewProperty(null)} className="w-full">
                  Close
                </Button>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Properties;
