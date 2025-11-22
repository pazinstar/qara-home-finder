import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit, Trash2, Eye, Upload, X, FileVideo, Image as ImageIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

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

  const properties = [
    { id: 1, title: "Lavington Villa", type: "Buy", price: "KSh 45M", status: "Active", beds: 5, baths: 4, owner: "john_doe", images: 8, video: true },
    { id: 2, title: "Kilimani Apartment", type: "Rent", price: "KSh 150K/mo", status: "Active", beds: 3, baths: 2, owner: "jane_smith", images: 5, video: true },
    { id: 3, title: "Karen House", type: "Buy", price: "KSh 65M", status: "Pending", beds: 6, baths: 5, owner: "mike_wilson", images: 12, video: false },
    { id: 4, title: "Westlands Studio", type: "AirBnB", price: "KSh 8K/night", status: "Active", beds: 1, baths: 1, owner: "sarah_jones", images: 6, video: true },
    { id: 5, title: "Langata Land", type: "Land", price: "KSh 12M", status: "Active", beds: 0, baths: 0, owner: "john_doe", images: 4, video: false },
  ];

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Properties</h2>
          <p className="text-muted-foreground">Manage all property listings</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Property
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh]">
            <DialogHeader>
              <DialogTitle>Add New Property</DialogTitle>
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

                <Button className="w-full">Save Property</Button>
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
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
              {properties.map((property) => (
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
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
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
    </div>
  );
};

export default Properties;
