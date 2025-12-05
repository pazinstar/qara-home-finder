import { useState } from "react";
import { format, differenceInDays } from "date-fns";
import { Calendar, Phone, User, Mail, Loader2, CheckCircle, XCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface AirBnBProperty {
  id: string;
  title: string;
  location: string;
  pricePerNight: number;
  image: string;
  maxGuests: number;
}

interface AirBnBReservationDialogProps {
  property: AirBnBProperty | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type PaymentStatus = "idle" | "processing" | "success" | "failed";

const AirBnBReservationDialog = ({
  property,
  open,
  onOpenChange,
}: AirBnBReservationDialogProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState<"dates" | "contact" | "payment" | "confirmation">("dates");
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(1);
  const [contactDetails, setContactDetails] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("idle");

  const resetForm = () => {
    setStep("dates");
    setCheckIn(undefined);
    setCheckOut(undefined);
    setGuests(1);
    setContactDetails({ fullName: "", email: "", phone: "" });
    setPaymentStatus("idle");
  };

  const handleClose = () => {
    resetForm();
    onOpenChange(false);
  };

  const nights = checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0;
  const totalPrice = property ? nights * property.pricePerNight : 0;

  const handleDatesContinue = () => {
    if (!checkIn || !checkOut) {
      toast({ title: "Please select check-in and check-out dates", variant: "destructive" });
      return;
    }
    if (nights <= 0) {
      toast({ title: "Check-out must be after check-in", variant: "destructive" });
      return;
    }
    setStep("contact");
  };

  const handleContactContinue = () => {
    if (!contactDetails.fullName || !contactDetails.email || !contactDetails.phone) {
      toast({ title: "Please fill all contact details", variant: "destructive" });
      return;
    }
    if (!/^07\d{8}$/.test(contactDetails.phone) && !/^2547\d{8}$/.test(contactDetails.phone)) {
      toast({ title: "Please enter a valid Safaricom number (07XXXXXXXX)", variant: "destructive" });
      return;
    }
    setStep("payment");
  };

  const handlePayment = async () => {
    setPaymentStatus("processing");
    
    // Simulate STK push processing
    toast({
      title: "STK Push Sent",
      description: `Please enter your M-Pesa PIN on your phone (${contactDetails.phone})`,
    });

    // Simulate payment processing delay
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // Randomly succeed or fail for demo (80% success rate)
    const success = Math.random() > 0.2;
    
    if (success) {
      setPaymentStatus("success");
      setStep("confirmation");
      toast({
        title: "Payment Successful!",
        description: `KES ${totalPrice.toLocaleString()} received. Booking confirmed!`,
      });
    } else {
      setPaymentStatus("failed");
      toast({
        title: "Payment Failed",
        description: "Transaction was not completed. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!property) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {step === "confirmation" ? "Booking Confirmed!" : `Reserve ${property.title}`}
          </DialogTitle>
        </DialogHeader>

        {/* Property Summary */}
        <div className="flex gap-4 p-4 bg-muted rounded-lg mb-4">
          <img
            src={property.image}
            alt={property.title}
            className="w-20 h-20 object-cover rounded-lg"
          />
          <div className="flex-1">
            <h3 className="font-semibold">{property.title}</h3>
            <p className="text-sm text-muted-foreground">{property.location}</p>
            <p className="text-sm font-medium text-primary">
              KES {property.pricePerNight.toLocaleString()}/night
            </p>
          </div>
        </div>

        {/* Step 1: Date Selection */}
        {step === "dates" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
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
                      <Calendar className="mr-2 h-4 w-4" />
                      {checkIn ? format(checkIn, "MMM d, yyyy") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={checkIn}
                      onSelect={setCheckIn}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className="pointer-events-auto"
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
                      <Calendar className="mr-2 h-4 w-4" />
                      {checkOut ? format(checkOut, "MMM d, yyyy") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={checkOut}
                      onSelect={setCheckOut}
                      disabled={(date) => date < (checkIn || new Date())}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Guests</Label>
              <Input
                type="number"
                min={1}
                max={property.maxGuests}
                value={guests}
                onChange={(e) => setGuests(Math.min(Number(e.target.value), property.maxGuests))}
              />
              <p className="text-xs text-muted-foreground">Maximum {property.maxGuests} guests</p>
            </div>

            {nights > 0 && (
              <div className="p-4 bg-primary/10 rounded-lg">
                <div className="flex justify-between text-sm">
                  <span>KES {property.pricePerNight.toLocaleString()} × {nights} nights</span>
                  <span className="font-semibold">KES {totalPrice.toLocaleString()}</span>
                </div>
              </div>
            )}

            <Button onClick={handleDatesContinue} className="w-full">
              Continue to Contact Details
            </Button>
          </div>
        )}

        {/* Step 2: Contact Details */}
        {step === "contact" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="John Doe"
                  value={contactDetails.fullName}
                  onChange={(e) => setContactDetails({ ...contactDetails, fullName: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="john@example.com"
                  value={contactDetails.email}
                  onChange={(e) => setContactDetails({ ...contactDetails, email: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>M-Pesa Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="0712345678"
                  value={contactDetails.phone}
                  onChange={(e) => setContactDetails({ ...contactDetails, phone: e.target.value })}
                  className="pl-10"
                />
              </div>
              <p className="text-xs text-muted-foreground">STK push will be sent to this number</p>
            </div>

            <div className="p-4 bg-primary/10 rounded-lg">
              <div className="flex justify-between">
                <span>Total Amount</span>
                <span className="font-bold text-lg">KES {totalPrice.toLocaleString()}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {format(checkIn!, "MMM d")} - {format(checkOut!, "MMM d, yyyy")} • {nights} nights • {guests} guest(s)
              </p>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep("dates")} className="flex-1">
                Back
              </Button>
              <Button onClick={handleContactContinue} className="flex-1">
                Proceed to Payment
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {step === "payment" && (
          <div className="space-y-4">
            <div className="p-6 border rounded-lg text-center space-y-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/1200px-M-PESA_LOGO-01.svg.png"
                alt="M-Pesa"
                className="h-12 mx-auto"
              />
              
              {paymentStatus === "idle" && (
                <>
                  <p className="text-muted-foreground">
                    Click the button below to receive an STK push on your phone
                  </p>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Phone Number</p>
                    <p className="font-semibold">{contactDetails.phone}</p>
                    <p className="text-sm text-muted-foreground mt-2">Amount</p>
                    <p className="font-bold text-xl text-primary">KES {totalPrice.toLocaleString()}</p>
                  </div>
                </>
              )}

              {paymentStatus === "processing" && (
                <div className="py-8 space-y-4">
                  <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
                  <p className="font-medium">Processing Payment...</p>
                  <p className="text-sm text-muted-foreground">
                    Please check your phone and enter your M-Pesa PIN
                  </p>
                </div>
              )}

              {paymentStatus === "failed" && (
                <div className="py-4 space-y-4">
                  <XCircle className="h-12 w-12 mx-auto text-destructive" />
                  <p className="font-medium text-destructive">Payment Failed</p>
                  <p className="text-sm text-muted-foreground">
                    The transaction was not completed. Please try again.
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setPaymentStatus("idle");
                  setStep("contact");
                }}
                className="flex-1"
                disabled={paymentStatus === "processing"}
              >
                Back
              </Button>
              <Button
                onClick={handlePayment}
                className="flex-1 bg-green-600 hover:bg-green-700"
                disabled={paymentStatus === "processing"}
              >
                {paymentStatus === "processing" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : paymentStatus === "failed" ? (
                  "Retry Payment"
                ) : (
                  "Pay with M-Pesa"
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {step === "confirmation" && (
          <div className="space-y-4 text-center py-4">
            <CheckCircle className="h-16 w-16 mx-auto text-green-500" />
            <h3 className="text-xl font-bold">Booking Confirmed!</h3>
            <p className="text-muted-foreground">
              Your reservation has been successfully placed.
            </p>

            <div className="p-4 bg-muted rounded-lg text-left space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Booking ID</span>
                <span className="font-mono font-semibold">QH{Date.now().toString().slice(-8)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Property</span>
                <span className="font-semibold">{property.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Check-in</span>
                <span>{format(checkIn!, "MMM d, yyyy")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Check-out</span>
                <span>{format(checkOut!, "MMM d, yyyy")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Guests</span>
                <span>{guests}</span>
              </div>
              <div className="flex justify-between border-t pt-2 mt-2">
                <span className="text-muted-foreground">Total Paid</span>
                <span className="font-bold text-primary">KES {totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              A confirmation email has been sent to {contactDetails.email}
            </p>

            <Button onClick={handleClose} className="w-full">
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AirBnBReservationDialog;
