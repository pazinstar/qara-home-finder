import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Calendar, Users, DollarSign, TrendingUp, Eye } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const stats = [
    { title: "Total Properties", value: "156", icon: Home, trend: "+12%", color: "text-primary" },
    { title: "Active Bookings", value: "43", icon: Calendar, trend: "+8%", color: "text-blue-500" },
    { title: "Total Users", value: "892", icon: Users, trend: "+23%", color: "text-green-500" },
    { title: "Revenue", value: "KSh 2.4M", icon: DollarSign, trend: "+15%", color: "text-yellow-500" },
  ];

  const recentBookings = [
    { id: "BK001", property: "Lavington Villa", user: "John Doe", date: "2025-11-25", status: "confirmed" },
    { id: "BK002", property: "Kilimani Apartment", user: "Jane Smith", date: "2025-11-26", status: "pending" },
    { id: "BK003", property: "Karen House", user: "Mike Johnson", date: "2025-11-27", status: "confirmed" },
    { id: "BK004", property: "Westlands Studio", user: "Sarah Lee", date: "2025-11-28", status: "cancelled" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Dashboard</h2>
        <p className="text-muted-foreground">Overview of your property management system</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="flex items-center text-xs text-muted-foreground">
                  <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                  {stat.trend} from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Recent Bookings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.id}</TableCell>
                    <TableCell>{booking.property}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          booking.status === "confirmed"
                            ? "default"
                            : booking.status === "pending"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {booking.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Popular Properties */}
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Popular Properties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["Lavington Villa", "Kilimani Apartment", "Karen House", "Westlands Studio"].map((property, i) => (
                <div key={property} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Eye className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{property}</p>
                      <p className="text-sm text-muted-foreground">{150 - i * 20} views</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
