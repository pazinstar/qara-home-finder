import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Properties = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const allProperties = [
    { id: 1, title: "Lavington Villa", type: "Buy", price: "KSh 45M", status: "Active", beds: 5, baths: 4, owner: "john_doe" },
    { id: 2, title: "Kilimani Apartment", type: "Rent", price: "KSh 150K/mo", status: "Active", beds: 3, baths: 2, owner: "jane_smith" },
    { id: 3, title: "Karen House", type: "Buy", price: "KSh 65M", status: "Pending", beds: 6, baths: 5, owner: "mike_wilson" },
    { id: 4, title: "Westlands Studio", type: "AirBnB", price: "KSh 8K/night", status: "Active", beds: 1, baths: 1, owner: "sarah_jones" },
    { id: 5, title: "Langata Land", type: "Land", price: "KSh 12M", status: "Active", beds: 0, baths: 0, owner: "john_doe" },
    { id: 6, title: "Runda Mansion", type: "Buy", price: "KSh 95M", status: "Active", beds: 7, baths: 6, owner: "john_doe" },
    { id: 7, title: "Parklands Flat", type: "Rent", price: "KSh 80K/mo", status: "Active", beds: 2, baths: 1, owner: "jane_smith" },
    { id: 8, title: "Nyali Beach House", type: "AirBnB", price: "KSh 15K/night", status: "Pending", beds: 4, baths: 3, owner: "mike_wilson" },
    { id: 9, title: "Muthaiga Estate", type: "Buy", price: "KSh 120M", status: "Active", beds: 8, baths: 7, owner: "john_doe" },
    { id: 10, title: "Ngong Road Office", type: "Rent", price: "KSh 200K/mo", status: "Active", beds: 0, baths: 2, owner: "jane_smith" },
  ];

  const filteredProperties = allProperties.filter(property =>
    property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.owner.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProperties = filteredProperties.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Properties</h2>
          <p className="text-muted-foreground">Manage all property listings</p>
        </div>
        <Button className="gap-2">
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
                <TableHead>Beds</TableHead>
                <TableHead>Baths</TableHead>
                <TableHead>Owner</TableHead>
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
                  <TableCell>{property.beds}</TableCell>
                  <TableCell>{property.baths}</TableCell>
                  <TableCell className="text-muted-foreground">{property.owner}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" title="View">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Edit">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Delete">
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
    </div>
  );
};

export default Properties;
