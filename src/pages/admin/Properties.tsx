import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit, Trash2, Eye, Upload, X, FileVideo, Image as ImageIcon } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
  preview?: string;
}

interface Property {
  id: number;
  title: string;
  type: string;
  price: string;
  status: string;
  beds: number;
  baths: number;
  area: number;
  location: string;
  description: string;
  owner: string;
  images: MediaFile[];
  video: MediaFile | null;
}

const Properties = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [deletePropertyId, setDeletePropertyId] = useState<number | null>(null);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [viewProperty, setViewProperty] = useState<Property | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    owner: "",
    title: "",
    type: "buy",
    price: "",
    beds: 0,
    baths: 0,
    area: 0,
    location: "",
    description: "",
    status: "active"
  });
  const [images, setImages] = useState<MediaFile[]>([]);
  const [video, setVideo] = useState<MediaFile | null>(null);
  
  const itemsPerPage = 8;

  const [allProperties, setAllProperties] = useState<Property[]>([
    { 
      id: 1, 
      title: "Lavington Villa", 
      type: "Buy", 
      price: "KSh 45M", 
      status: "Active", 
      beds: 5, 
      baths: 4, 
      area: 450,
      location: "Lavington",
      description: "Luxury villa with modern amenities",
      owner: "john_doe",
      images: [
        { id: "1", name: "john_doe_lavington_villa_1.jpg", type: "image", path: "public/john_doe/images/john_doe_lavington_villa_1.jpg" },
        { id: "2", name: "john_doe_lavington_villa_2.jpg", type: "image", path: "public/john_doe/images/john_doe_lavington_villa_2.jpg" }
      ],
      video: { id: "v1", name: "john_doe_lavington_villa.mp4", type: "video", path: "public/john_doe/videos/john_doe_lavington_villa.mp4" }
    },
    { 
      id: 2, 
      title: "Kilimani Apartment", 
      type: "Rent", 
      price: "KSh 150K/mo", 
      status: "Active", 
      beds: 3, 
      baths: 2,
      area: 150,
      location: "Kilimani",
      description: "Modern apartment in prime location",
      owner: "jane_smith",
      images: [
        { id: "3", name: "jane_smith_kilimani_apartment_1.jpg", type: "image", path: "public/jane_smith/images/jane_smith_kilimani_apartment_1.jpg" }
      ],
      video: null
    },
  ]);

  const filteredProperties = allProperties.filter(property =>
    property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProperties = filteredProperties.slice(startIndex, startIndex + itemsPerPage);

  const resetForm = () => {
    setFormData({
      owner: "",
      title: "",
      type: "buy",
      price: "",
      beds: 0,
      baths: 0,
      area: 0,
      location: "",
      description: "",
      status: "active"
    });
    setImages([]);
    setVideo(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const sanitizedTitle = formData.title.toLowerCase().replace(/\s+/g, '_') || 'property';
    const sanitizedUsername = formData.owner.toLowerCase().replace(/\s+/g, '_') || 'user';
    const timestamp = Date.now();

    const newImages: MediaFile[] = Array.from(files).map((file, index) => {
      const imageName = `${sanitizedUsername}_${sanitizedTitle}_${timestamp}_${index + 1}.jpg`;
      
      return {
        id: `img_${timestamp}_${index}`,
        name: imageName,
        type: 'image',
        path: `public/${sanitizedUsername}/images/${imageName}`,
        preview: URL.createObjectURL(file)
      };
    });

    setImages([...images, ...newImages]);
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const sanitizedTitle = formData.title.toLowerCase().replace(/\s+/g, '_') || 'property';
    const sanitizedUsername = formData.owner.toLowerCase().replace(/\s+/g, '_') || 'user';
    const timestamp = Date.now();
    const videoName = `${sanitizedUsername}_${sanitizedTitle}_${timestamp}.mp4`;

    setVideo({
      id: `vid_${timestamp}`,
      name: videoName,
      type: 'video',
      path: `public/${sanitizedUsername}/videos/${videoName}`,
      preview: URL.createObjectURL(file)
    });
  };

  const removeImage = (id: string) => {
    setImages(images.filter(img => img.id !== id));
  };

  const removeVideo = () => {
    setVideo(null);
  };

  const renameImage = (id: string, newName: string) => {
    setImages(images.map(img => {
      if (img.id === id) {
        const sanitizedUsername = formData.owner.toLowerCase().replace(/\s+/g, '_') || 'user';
        return {
          ...img,
          name: newName,
          path: `public/${sanitizedUsername}/images/${newName}`
        };
      }
      return img;
    }));
  };

  const handleAdd = () => {
    if (!formData.owner || !formData.title) {
      toast.error("Please fill in owner username and property title");
      return;
    }

    const newProperty: Property = {
      id: allProperties.length + 1,
      title: formData.title,
      type: formData.type.charAt(0).toUpperCase() + formData.type.slice(1),
      price: formData.price,
      status: formData.status.charAt(0).toUpperCase() + formData.status.slice(1),
      beds: formData.beds,
      baths: formData.baths,
      area: formData.area,
      location: formData.location,
      description: formData.description,
      owner: formData.owner,
      images: images,
      video: video
    };

    setAllProperties([...allProperties, newProperty]);
    toast.success("Property added successfully");
    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleEdit = (property: Property) => {
    setEditingProperty(property);
    setFormData({
      owner: property.owner,
      title: property.title,
      type: property.type.toLowerCase(),
      price: property.price,
      beds: property.beds,
      baths: property.baths,
      area: property.area,
      location: property.location,
      description: property.description,
      status: property.status.toLowerCase()
    });
    setImages(property.images);
    setVideo(property.video);
    setIsEditDialogOpen(true);
  };

  const handleUpdate = () => {
    if (!editingProperty) return;

    const updatedProperties = allProperties.map(prop => 
      prop.id === editingProperty.id 
        ? {
            ...prop,
            title: formData.title,
            type: formData.type.charAt(0).toUpperCase() + formData.type.slice(1),
            price: formData.price,
            status: formData.status.charAt(0).toUpperCase() + formData.status.slice(1),
            beds: formData.beds,
            baths: formData.baths,
            area: formData.area,
            location: formData.location,
            description: formData.description,
            owner: formData.owner,
            images: images,
            video: video
          }
        : prop
    );

    setAllProperties(updatedProperties);
    toast.success("Property updated successfully");
    setIsEditDialogOpen(false);
    setEditingProperty(null);
    resetForm();
  };

  const confirmDelete = () => {
    if (deletePropertyId === null) return;
    
    setAllProperties(allProperties.filter(prop => prop.id !== deletePropertyId));
    toast.success("Property deleted successfully");
    setDeletePropertyId(null);
  };

  const handleView = (property: Property) => {
    setViewProperty(property);
    setIsViewDialogOpen(true);
  };

  const PropertyForm = () => (
    <ScrollArea className="max-h-[calc(80vh-8rem)] pr-4">
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="owner">Owner Username *</Label>
            <Input 
              id="owner" 
              placeholder="e.g. john_doe" 
              value={formData.owner}
              onChange={(e) => setFormData({...formData, owner: e.target.value})}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Files saved in: public/{formData.owner || 'username'}/
            </p>
          </div>
          <div>
            <Label htmlFor="title">Property Title *</Label>
            <Input 
              id="title" 
              placeholder="Enter property title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="type">Type</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
              <SelectTrigger id="type">
                <SelectValue />
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
            <Input 
              id="price" 
              placeholder="e.g. KSh 45M" 
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <Label htmlFor="beds">Bedrooms</Label>
            <Input 
              id="beds" 
              type="number" 
              value={formData.beds}
              onChange={(e) => setFormData({...formData, beds: parseInt(e.target.value) || 0})}
            />
          </div>
          <div>
            <Label htmlFor="baths">Bathrooms</Label>
            <Input 
              id="baths" 
              type="number" 
              value={formData.baths}
              onChange={(e) => setFormData({...formData, baths: parseInt(e.target.value) || 0})}
            />
          </div>
          <div>
            <Label htmlFor="area">Area (sqm)</Label>
            <Input 
              id="area" 
              type="number" 
              value={formData.area}
              onChange={(e) => setFormData({...formData, area: parseInt(e.target.value) || 0})}
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="location">Location</Label>
            <Input 
              id="location" 
              placeholder="Enter location"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
            />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
              <SelectTrigger id="status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea 
            id="description" 
            placeholder="Enter property description" 
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
        </div>

        {/* Images Upload */}
        <div className="space-y-4 border-t pt-4">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            Property Images (Multiple)
          </h3>
          
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

          {images.length > 0 && (
            <div className="space-y-2">
              {images.map((img) => (
                <div key={img.id} className="flex items-center gap-2 p-2 border rounded-lg bg-muted/50">
                  <ImageIcon className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1 min-w-0">
                    <Input 
                      value={img.name} 
                      onChange={(e) => renameImage(img.id, e.target.value)}
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

        {/* Video Upload */}
        <div className="space-y-4 border-t pt-4">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <FileVideo className="h-5 w-5" />
            Property Video (Single)
          </h3>
          
          {!video ? (
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
      </div>
    </ScrollArea>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Properties</h2>
          <p className="text-muted-foreground">Manage all property listings</p>
        </div>
        <Button className="gap-2" onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4" />
          Add Property
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search properties..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-9"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Media</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedProperties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell className="font-medium">#{property.id}</TableCell>
                  <TableCell>{property.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{property.type}</Badge>
                  </TableCell>
                  <TableCell>{property.price}</TableCell>
                  <TableCell>
                    <Badge variant={property.status === "Active" ? "default" : "secondary"}>
                      {property.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{property.owner}</TableCell>
                  <TableCell>
                    <div className="text-xs text-muted-foreground">
                      {property.images.length} imgs{property.video ? ' + 1 video' : ''}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" title="View" onClick={() => handleView(property)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Edit" onClick={() => handleEdit(property)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Delete" onClick={() => setDeletePropertyId(property.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) setCurrentPage(currentPage - 1);
                }}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(page);
                      }}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return (
                  <PaginationItem key={page}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }
              return null;
            })}
            <PaginationItem>
              <PaginationNext 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                }}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {/* Add Property Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Add New Property</DialogTitle>
          </DialogHeader>
          <PropertyForm />
          <div className="flex gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => { setIsAddDialogOpen(false); resetForm(); }} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleAdd} className="flex-1">
              Add Property
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Property Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Edit Property</DialogTitle>
          </DialogHeader>
          <PropertyForm />
          <div className="flex gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => { setIsEditDialogOpen(false); setEditingProperty(null); resetForm(); }} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleUpdate} className="flex-1">
              Update Property
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Property Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Property Details</DialogTitle>
          </DialogHeader>
          {viewProperty && (
            <ScrollArea className="max-h-[70vh]">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Title</Label>
                    <p className="font-medium">{viewProperty.title}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Owner</Label>
                    <p className="font-medium">{viewProperty.owner}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Type</Label>
                    <Badge variant="outline">{viewProperty.type}</Badge>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Status</Label>
                    <Badge>{viewProperty.status}</Badge>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Price</Label>
                    <p className="font-medium">{viewProperty.price}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Location</Label>
                    <p className="font-medium">{viewProperty.location}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Bedrooms</Label>
                    <p className="font-medium">{viewProperty.beds}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Bathrooms</Label>
                    <p className="font-medium">{viewProperty.baths}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Area</Label>
                    <p className="font-medium">{viewProperty.area} sqm</p>
                  </div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Description</Label>
                  <p className="mt-1">{viewProperty.description}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Images ({viewProperty.images.length})</Label>
                  <div className="mt-2 space-y-1">
                    {viewProperty.images.map(img => (
                      <p key={img.id} className="text-xs text-muted-foreground">{img.path}</p>
                    ))}
                  </div>
                </div>
                {viewProperty.video && (
                  <div>
                    <Label className="text-muted-foreground">Video</Label>
                    <p className="text-xs text-muted-foreground mt-1">{viewProperty.video.path}</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deletePropertyId !== null} onOpenChange={() => setDeletePropertyId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Property</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this property? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Properties;
