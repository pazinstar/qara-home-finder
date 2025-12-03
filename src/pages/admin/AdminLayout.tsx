import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Home, Calendar, Users, Settings, Menu, LogOut, User, MessageSquare, BedDouble } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    navigate("/");
  };
  
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
    { icon: Home, label: "Properties", path: "/admin/properties" },
    { icon: BedDouble, label: "AirBnB", path: "/admin/airbnb" },
    { icon: Calendar, label: "Bookings", path: "/admin/bookings" },
    { icon: MessageSquare, label: "Messages", path: "/admin/messages" },
    { icon: Users, label: "Users", path: "/admin/users" },
    { icon: Settings, label: "Settings", path: "/admin/settings" },
  ];

  const Sidebar = () => (
    <div className="flex h-full flex-col gap-2">
      <div className="flex h-16 items-center border-b border-border px-6">
        <h2 className="text-xl font-bold text-primary">Qara Admin</h2>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className="w-full justify-start gap-3"
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Button>
            </Link>
          );
        })}
      </nav>
    </div>
  );

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 border-r border-border md:block">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center gap-4 border-b border-border px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <Sidebar />
            </SheetContent>
          </Sheet>
          <h1 className="text-lg font-semibold text-foreground">Admin Panel</h1>
          <div className="ml-auto">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48" align="end">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Admin User</div>
                  <div className="text-xs text-muted-foreground">admin@qarahomes.com</div>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start gap-2" 
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
