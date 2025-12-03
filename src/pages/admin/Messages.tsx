import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  Search,
  Eye,
  MessageSquare,
  Home,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  Calendar,
  MapPin,
} from "lucide-react";
import { format } from "date-fns";

interface Message {
  id: string;
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  message: string;
  propertyId: string;
  propertyTitle: string;
  propertyLocation: string;
  propertyType: "sale" | "rent" | "airbnb" | "land";
  status: "unread" | "read" | "replied";
  createdAt: Date;
}

// Mock messages data
const mockMessages: Message[] = [
  {
    id: "1",
    senderName: "John Kamau",
    senderEmail: "john.kamau@email.com",
    senderPhone: "0712345678",
    message: "I'm interested in this property. Is it still available? I would like to schedule a viewing this weekend if possible.",
    propertyId: "1",
    propertyTitle: "Modern 3-Bedroom Villa",
    propertyLocation: "Karen, Nairobi",
    propertyType: "rent",
    status: "unread",
    createdAt: new Date(2025, 11, 1, 10, 30),
  },
  {
    id: "2",
    senderName: "Mary Wanjiku",
    senderEmail: "mary.w@email.com",
    senderPhone: "0723456789",
    message: "What is the minimum lease duration for this property? Also, are pets allowed?",
    propertyId: "2",
    propertyTitle: "Luxury Penthouse",
    propertyLocation: "Westlands, Nairobi",
    propertyType: "sale",
    status: "read",
    createdAt: new Date(2025, 10, 28, 14, 15),
  },
  {
    id: "3",
    senderName: "Peter Omondi",
    senderEmail: "peter.o@email.com",
    senderPhone: "0734567890",
    message: "Can you provide more details about the land title and zoning regulations?",
    propertyId: "5",
    propertyTitle: "Prime Land in Juja",
    propertyLocation: "Juja, Kiambu",
    propertyType: "land",
    status: "replied",
    createdAt: new Date(2025, 10, 25, 9, 0),
  },
  {
    id: "4",
    senderName: "Sarah Njeri",
    senderEmail: "sarah.n@email.com",
    senderPhone: "0745678901",
    message: "Is the property available for check-in on December 20th? We are 4 guests.",
    propertyId: "3",
    propertyTitle: "Cozy Studio Apartment",
    propertyLocation: "Kilimani, Nairobi",
    propertyType: "airbnb",
    status: "unread",
    createdAt: new Date(2025, 11, 2, 16, 45),
  },
  {
    id: "5",
    senderName: "David Mwangi",
    senderEmail: "david.m@email.com",
    senderPhone: "0756789012",
    message: "What are the security features in this compound? Is there 24/7 security?",
    propertyId: "1",
    propertyTitle: "Modern 3-Bedroom Villa",
    propertyLocation: "Karen, Nairobi",
    propertyType: "rent",
    status: "read",
    createdAt: new Date(2025, 10, 30, 11, 20),
  },
  {
    id: "6",
    senderName: "Grace Akinyi",
    senderEmail: "grace.a@email.com",
    senderPhone: "0767890123",
    message: "I would like to know more about the payment plan options available for this property.",
    propertyId: "2",
    propertyTitle: "Luxury Penthouse",
    propertyLocation: "Westlands, Nairobi",
    propertyType: "sale",
    status: "unread",
    createdAt: new Date(2025, 11, 3, 8, 0),
  },
];

const ITEMS_PER_PAGE = 5;

const Messages = () => {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  // Filter messages
  const filteredMessages = useMemo(() => {
    return messages.filter((msg) => {
      const matchesSearch =
        msg.senderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.senderEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.propertyTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.message.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "all" || msg.status === statusFilter;
      const matchesType = typeFilter === "all" || msg.propertyType === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [messages, searchQuery, statusFilter, typeFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredMessages.length / ITEMS_PER_PAGE);
  const paginatedMessages = filteredMessages.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleView = (message: Message) => {
    setSelectedMessage(message);
    setViewDialogOpen(true);
    // Mark as read
    if (message.status === "unread") {
      setMessages((prev) =>
        prev.map((m) => (m.id === message.id ? { ...m, status: "read" as const } : m))
      );
    }
  };

  const handleMarkAsReplied = (messageId: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === messageId ? { ...m, status: "replied" as const } : m))
    );
    setViewDialogOpen(false);
  };

  const getStatusBadge = (status: Message["status"]) => {
    switch (status) {
      case "unread":
        return <Badge className="bg-destructive text-destructive-foreground">Unread</Badge>;
      case "read":
        return <Badge variant="secondary">Read</Badge>;
      case "replied":
        return <Badge className="bg-green-600 text-white">Replied</Badge>;
    }
  };

  const getTypeBadge = (type: Message["propertyType"]) => {
    switch (type) {
      case "sale":
        return <Badge variant="outline">For Sale</Badge>;
      case "rent":
        return <Badge variant="outline">For Rent</Badge>;
      case "airbnb":
        return <Badge variant="outline">AirBnB</Badge>;
      case "land":
        return <Badge variant="outline">Land</Badge>;
    }
  };

  const unreadCount = messages.filter((m) => m.status === "unread").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Messages</h1>
          <p className="text-muted-foreground">
            Manage property inquiries from users
          </p>
        </div>
        {unreadCount > 0 && (
          <Badge className="bg-destructive text-destructive-foreground text-lg px-4 py-2">
            {unreadCount} Unread
          </Badge>
        )}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, property..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-9"
              />
            </div>
            <Select
              value={statusFilter}
              onValueChange={(value) => {
                setStatusFilter(value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="unread">Unread</SelectItem>
                <SelectItem value="read">Read</SelectItem>
                <SelectItem value="replied">Replied</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={typeFilter}
              onValueChange={(value) => {
                setTypeFilter(value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="sale">For Sale</SelectItem>
                <SelectItem value="rent">For Rent</SelectItem>
                <SelectItem value="airbnb">AirBnB</SelectItem>
                <SelectItem value="land">Land</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Messages Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            All Messages ({filteredMessages.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sender</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedMessages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No messages found
                  </TableCell>
                </TableRow>
              ) : (
                paginatedMessages.map((message) => (
                  <TableRow key={message.id} className={message.status === "unread" ? "bg-muted/30" : ""}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{message.senderName}</p>
                        <p className="text-sm text-muted-foreground">{message.senderEmail}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Home className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-sm">{message.propertyTitle}</p>
                          {getTypeBadge(message.propertyType)}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[200px]">
                      <p className="truncate text-sm">{message.message}</p>
                    </TableCell>
                    <TableCell>{getStatusBadge(message.status)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {format(message.createdAt, "MMM d, yyyy")}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleView(message)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-muted-foreground">
                Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
                {Math.min(currentPage * ITEMS_PER_PAGE, filteredMessages.length)} of{" "}
                {filteredMessages.length} messages
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Message Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Message Details</DialogTitle>
            <DialogDescription>
              Inquiry about property
            </DialogDescription>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4">
              {/* Sender Info */}
              <div className="space-y-2 p-4 bg-muted rounded-lg">
                <h4 className="font-semibold">Sender Information</h4>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{selectedMessage.senderName}</span>
                    {getStatusBadge(selectedMessage.status)}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <a href={`mailto:${selectedMessage.senderEmail}`} className="hover:underline">
                      {selectedMessage.senderEmail}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <a href={`tel:${selectedMessage.senderPhone}`} className="hover:underline">
                      {selectedMessage.senderPhone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {format(selectedMessage.createdAt, "MMMM d, yyyy 'at' h:mm a")}
                  </div>
                </div>
              </div>

              {/* Property Info */}
              <div className="space-y-2 p-4 border rounded-lg">
                <h4 className="font-semibold flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Referenced Property
                </h4>
                <div className="space-y-1">
                  <p className="font-medium">{selectedMessage.propertyTitle}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {selectedMessage.propertyLocation}
                  </div>
                  <div className="flex items-center gap-2">
                    {getTypeBadge(selectedMessage.propertyType)}
                    <span className="text-xs text-muted-foreground">
                      ID: #{selectedMessage.propertyId.padStart(6, "0")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Message Content */}
              <div className="space-y-2">
                <h4 className="font-semibold">Message</h4>
                <p className="text-muted-foreground bg-muted/50 p-4 rounded-lg">
                  {selectedMessage.message}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => window.open(`mailto:${selectedMessage.senderEmail}`, "_blank")}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Reply via Email
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => window.open(`tel:${selectedMessage.senderPhone}`, "_blank")}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </Button>
              </div>
              {selectedMessage.status !== "replied" && (
                <Button
                  className="w-full"
                  onClick={() => handleMarkAsReplied(selectedMessage.id)}
                >
                  Mark as Replied
                </Button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Messages;
