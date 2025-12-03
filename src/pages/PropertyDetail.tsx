import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Calendar,
  Home,
  Wifi,
  Car,
  Wind,
  Shield,
  ArrowLeft,
  Navigation,
  ZoomIn,
  MessageSquare,
} from "lucide-react";
import ImagePreviewModal from "@/components/ImagePreviewModal";

// Mock property data with multiple images and video
const getPropertyById = (id: string) => {
  const allProperties = [
    {
      id: "1",
      title: "Modern 3-Bedroom Villa",
      location: "Karen, Nairobi",
      price: "KES 180,000",
      type: "rent" as const,
      bedrooms: 3,
      bathrooms: 3,
      area: "250 sqm",
      images: [
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&auto=format&fit=crop",
      ],
      video: "https://www.youtube.com/embed/zumJJUL_ruM",
      description: "Stunning modern villa in the heart of Karen, featuring contemporary design and premium finishes throughout. Perfect for families seeking luxury and comfort.",
      features: ["WiFi", "Parking", "Air Conditioning", "Security", "Garden", "Balcony"],
      yearBuilt: 2022,
      featured: true,
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7744!2d36.7194!3d-1.2921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTcnMzEuNiJTIDM2wrA0MycxMC4wIkU!5e0!3m2!1sen!2ske!4v1234567890",
    },
    {
      id: "2",
      title: "Luxury Penthouse",
      location: "Westlands, Nairobi",
      price: "KES 45,000,000",
      type: "sale" as const,
      bedrooms: 4,
      bathrooms: 4,
      area: "320 sqm",
      images: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&auto=format&fit=crop",
      ],
      video: "https://www.youtube.com/embed/zumJJUL_ruM",
      description: "Exclusive penthouse with panoramic city views. This luxury property offers world-class amenities and sophisticated design.",
      features: ["WiFi", "Parking", "Air Conditioning", "Security", "Gym", "Pool"],
      yearBuilt: 2023,
      featured: true,
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8124!2d36.8076!3d-1.2633!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTUnNDcuOSJTIDM2wrA0OCcyNy40IkU!5e0!3m2!1sen!2ske!4v1234567890",
    },
    {
      id: "3",
      title: "Cozy Studio Apartment",
      location: "Kilimani, Nairobi",
      price: "KES 55,000",
      type: "rent" as const,
      bedrooms: 1,
      bathrooms: 1,
      area: "45 sqm",
      images: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&auto=format&fit=crop",
      ],
      video: "https://www.youtube.com/embed/zumJJUL_ruM",
      description: "Charming studio apartment perfect for young professionals. Modern amenities in a prime location.",
      features: ["WiFi", "Security", "Parking"],
      yearBuilt: 2021,
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8045!2d36.7833!3d-1.2845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTcnMDQuMiJTIDM2wrA0Nic1OS45IkU!5e0!3m2!1sen!2ske!4v1234567890",
    },
  ];

  return allProperties.find((p) => p.id === id);
};

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const property = getPropertyById(id || "");
  
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [locationUnlocked, setLocationUnlocked] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [imagePreviewOpen, setImagePreviewOpen] = useState(false);
  const [previewImageIndex, setPreviewImageIndex] = useState(0);
  
  // Message dialog state
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [messageForm, setMessageForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  const openImagePreview = (index: number) => {
    setPreviewImageIndex(index);
    setImagePreviewOpen(true);
  };

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Property Not Found</h1>
            <Button onClick={() => navigate(-1)}>Go Back</Button>
          </div>
        </div>
      </div>
    );
  }

  const handlePayment = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setLocationUnlocked(true);
      setShowPaymentDialog(false);
      toast({
        title: "Payment Successful!",
        description: "The exact location has been unlocked. Scroll down to view the map.",
      });
    }, 2000);
  };

  const handleSendMessage = () => {
    if (!messageForm.name || !messageForm.email || !messageForm.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSendingMessage(true);
    
    // Simulate sending message
    setTimeout(() => {
      setIsSendingMessage(false);
      setShowMessageDialog(false);
      setMessageForm({ name: "", email: "", phone: "", message: "" });
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });
    }, 1500);
  };

  const amenityIcons: Record<string, any> = {
    WiFi: Wifi,
    Parking: Car,
    "Air Conditioning": Wind,
    Security: Shield,
    Garden: Home,
    Balcony: Home,
    Gym: Home,
    Pool: Home,
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20">
        {/* Back Button */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4 group"
          >
            <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={20} />
            Back to listings
          </Button>
        </div>

        {/* Image Carousel */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Carousel className="w-full">
            <CarouselContent>
              {property.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div 
                    className="relative h-[400px] md:h-[600px] rounded-2xl overflow-hidden cursor-pointer group"
                    onClick={() => openImagePreview(index)}
                  >
                    <img
                      src={image}
                      alt={`${property.title} - Image ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={48} />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>

        {/* Property Details */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Badge className="bg-primary text-primary-foreground font-medium capitalize">
                    For {property.type}
                  </Badge>
                  {property.featured && (
                    <Badge className="bg-accent text-accent-foreground font-semibold">
                      Featured
                    </Badge>
                  )}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{property.title}</h1>
                <div className="flex items-center text-muted-foreground text-lg">
                  <MapPin size={20} className="mr-2" />
                  <span>{property.location}</span>
                </div>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Bed className="mx-auto mb-2 text-primary" size={28} />
                    <p className="text-2xl font-bold">{property.bedrooms}</p>
                    <p className="text-sm text-muted-foreground">Bedrooms</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Bath className="mx-auto mb-2 text-primary" size={28} />
                    <p className="text-2xl font-bold">{property.bathrooms}</p>
                    <p className="text-sm text-muted-foreground">Bathrooms</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Square className="mx-auto mb-2 text-primary" size={28} />
                    <p className="text-2xl font-bold">{property.area}</p>
                    <p className="text-sm text-muted-foreground">Area</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Calendar className="mx-auto mb-2 text-primary" size={28} />
                    <p className="text-2xl font-bold">{property.yearBuilt}</p>
                    <p className="text-sm text-muted-foreground">Year Built</p>
                  </CardContent>
                </Card>
              </div>

              {/* Description */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">About this property</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {property.description}
                  </p>
                </CardContent>
              </Card>

              {/* Features & Amenities */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Features & Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {property.features.map((feature, index) => {
                      const Icon = amenityIcons[feature] || Home;
                      return (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                        >
                          <Icon className="text-primary" size={20} />
                          <span className="font-medium">{feature}</span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Video Tour */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Video Tour</h2>
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <iframe
                      src={property.video}
                      title="Property Video Tour"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Location Map */}
              {locationUnlocked && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                      <Navigation className="text-primary" />
                      Exact Location
                    </h2>
                    <div className="aspect-video rounded-lg overflow-hidden">
                      <iframe
                        src={property.mapUrl}
                        title="Property Location"
                        className="w-full h-full"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6 space-y-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Price</p>
                    <p className="text-4xl font-bold text-primary">{property.price}</p>
                    {property.type === "rent" && (
                      <p className="text-sm text-muted-foreground">per month</p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Button 
                      onClick={() => navigate('/request-tour')}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" 
                      size="lg"
                    >
                      Request a Tour
                    </Button>
                    <Button
                      onClick={() => setShowMessageDialog(true)}
                      variant="outline"
                      className="w-full"
                      size="lg"
                    >
                      <MessageSquare className="mr-2" size={20} />
                      Send Message
                    </Button>
                    {!locationUnlocked && (
                      <Button
                        onClick={() => setShowPaymentDialog(true)}
                        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                        size="lg"
                      >
                        <Navigation className="mr-2" size={20} />
                        Get Exact Location
                      </Button>
                    )}
                  </div>

                  <div className="pt-6 border-t border-border">
                    <h3 className="font-bold mb-3">Property ID</h3>
                    <p className="text-muted-foreground">#{property.id.padStart(6, '0')}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Unlock Exact Location</DialogTitle>
            <DialogDescription>
              Pay KES 1,000 (non-refundable) to view the exact location on Google Maps
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="phone">M-Pesa Phone Number</Label>
              <Input
                id="phone"
                placeholder="07XX XXX XXX"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                type="tel"
              />
            </div>
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <p className="text-sm font-semibold">Payment Details:</p>
              <p className="text-sm">Amount: <span className="font-bold">KES 1,000</span></p>
              <p className="text-xs text-muted-foreground">This fee is non-refundable</p>
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setShowPaymentDialog(false)}
              disabled={isProcessing}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full sm:w-auto bg-primary hover:bg-primary/90"
            >
              {isProcessing ? "Processing..." : "Pay Now"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Message Dialog */}
      <Dialog open={showMessageDialog} onOpenChange={setShowMessageDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Send a Message</DialogTitle>
            <DialogDescription>
              Inquire about: {property.title}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="msg-name">Your Name *</Label>
              <Input
                id="msg-name"
                placeholder="John Doe"
                value={messageForm.name}
                onChange={(e) => setMessageForm({ ...messageForm, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="msg-email">Email Address *</Label>
              <Input
                id="msg-email"
                type="email"
                placeholder="john@example.com"
                value={messageForm.email}
                onChange={(e) => setMessageForm({ ...messageForm, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="msg-phone">Phone Number</Label>
              <Input
                id="msg-phone"
                type="tel"
                placeholder="07XX XXX XXX"
                value={messageForm.phone}
                onChange={(e) => setMessageForm({ ...messageForm, phone: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="msg-message">Your Message *</Label>
              <Textarea
                id="msg-message"
                placeholder="I'm interested in this property..."
                value={messageForm.message}
                onChange={(e) => setMessageForm({ ...messageForm, message: e.target.value })}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setShowMessageDialog(false)}
              disabled={isSendingMessage}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSendMessage}
              disabled={isSendingMessage}
              className="w-full sm:w-auto bg-primary hover:bg-primary/90"
            >
              {isSendingMessage ? "Sending..." : "Send Message"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Image Preview Modal */}
      <ImagePreviewModal
        images={property.images}
        initialIndex={previewImageIndex}
        isOpen={imagePreviewOpen}
        onClose={() => setImagePreviewOpen(false)}
        altPrefix={property.title}
      />
    </div>
  );
};

export default PropertyDetail;
