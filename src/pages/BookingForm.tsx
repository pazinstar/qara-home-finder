import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, CreditCard, Home } from "lucide-react";

const BookingForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    propertyId: "",
    moveInDate: "",
    notes: "",
  });
  const [paymentData, setPaymentData] = useState({
    phoneNumber: "",
    amount: "",
  });
  const [step, setStep] = useState<"details" | "payment">("details");

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.propertyId) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setStep("payment");
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!paymentData.phoneNumber || !paymentData.amount) {
      toast({
        title: "Payment Required",
        description: "Please enter your M-Pesa phone number and amount",
        variant: "destructive",
      });
      return;
    }

    // Simulate payment processing
    toast({
      title: "Booking Confirmed! 🎉",
      description: "Your 50% deposit has been received. We'll contact you shortly to complete the process.",
    });

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Button
          variant="ghost"
          onClick={() => step === "payment" ? setStep("details") : navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Book Your Property
          </h1>
          <p className="text-muted-foreground">
            {step === "details" ? "Step 1: Enter your details" : "Step 2: Pay 50% deposit"}
          </p>
        </div>

        {step === "details" ? (
          <Card className="p-6 md:p-8 border-border">
            <form onSubmit={handleDetailsSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-foreground">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className="mt-2 bg-background border-border"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-foreground">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  className="mt-2 bg-background border-border"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-foreground">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="0745812620"
                  className="mt-2 bg-background border-border"
                  required
                />
              </div>

              <div>
                <Label htmlFor="propertyId" className="text-foreground">Property ID/Name *</Label>
                <Input
                  id="propertyId"
                  value={formData.propertyId}
                  onChange={(e) => setFormData({ ...formData, propertyId: e.target.value })}
                  placeholder="e.g., Modern 2BR Apartment"
                  className="mt-2 bg-background border-border"
                  required
                />
              </div>

              <div>
                <Label htmlFor="moveInDate" className="text-foreground">Preferred Move-in Date</Label>
                <Input
                  id="moveInDate"
                  type="date"
                  value={formData.moveInDate}
                  onChange={(e) => setFormData({ ...formData, moveInDate: e.target.value })}
                  className="mt-2 bg-background border-border"
                />
              </div>

              <div>
                <Label htmlFor="notes" className="text-foreground">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Any special requests or questions..."
                  className="mt-2 bg-background border-border"
                  rows={4}
                />
              </div>

              <Button 
                type="submit" 
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Proceed to Payment
              </Button>
            </form>
          </Card>
        ) : (
          <Card className="p-6 md:p-8 border-border">
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">Payment Details</h3>
                  <p className="text-sm text-muted-foreground">Pay 50% to secure your booking</p>
                </div>
              </div>
            </div>

            <form onSubmit={handlePaymentSubmit} className="space-y-6">
              <div className="bg-muted/30 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-foreground mb-2">Booking Summary</h4>
                <div className="space-y-1 text-sm">
                  <p className="text-muted-foreground">Name: <span className="text-foreground">{formData.name}</span></p>
                  <p className="text-muted-foreground">Property: <span className="text-foreground">{formData.propertyId}</span></p>
                  <p className="text-muted-foreground">Email: <span className="text-foreground">{formData.email}</span></p>
                </div>
              </div>

              <div>
                <Label htmlFor="amount" className="text-foreground">Deposit Amount (50%) *</Label>
                <Input
                  id="amount"
                  type="number"
                  value={paymentData.amount}
                  onChange={(e) => setPaymentData({ ...paymentData, amount: e.target.value })}
                  placeholder="e.g., 22500"
                  className="mt-2 bg-background border-border"
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Enter 50% of the total rent amount
                </p>
              </div>

              <div>
                <Label htmlFor="mpesa" className="text-foreground">M-Pesa Phone Number *</Label>
                <Input
                  id="mpesa"
                  type="tel"
                  value={paymentData.phoneNumber}
                  onChange={(e) => setPaymentData({ ...paymentData, phoneNumber: e.target.value })}
                  placeholder="254745812620"
                  className="mt-2 bg-background border-border"
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  You'll receive an M-Pesa prompt on this number
                </p>
              </div>

              <Button 
                type="submit" 
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <CreditCard className="mr-2" />
                Pay Now
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                By proceeding, you agree to our terms and conditions
              </p>
            </form>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BookingForm;
