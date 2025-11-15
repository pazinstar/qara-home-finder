import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const isMobile = useIsMobile();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "AirBnB", path: "/airbnb" },
    { name: "Buy", path: "/buy" },
    { name: "Rent", path: "/rent" },
    { name: "Lands", path: "/lands" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105">
              Qara Homes
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-secondary"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Theme Toggle, Auth & Mobile Menu */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-foreground hover:bg-secondary"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
            
            <Link to="/auth" className="hidden md:block">
              <Button variant="ghost" className="gap-2">
                <LogIn size={18} />
                Sign In
              </Button>
            </Link>

            {isMobile && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="3" y1="12" x2="21" y2="12" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[280px]">
                  <nav className="flex flex-col gap-4 mt-8">
                    {navLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                          isActive(link.path)
                            ? "bg-primary text-primary-foreground"
                            : "text-foreground hover:bg-secondary"
                        }`}
                      >
                        {link.name}
                      </Link>
                    ))}
                    <Link to="/auth" className="mt-4">
                      <Button className="w-full gap-2">
                        <LogIn size={18} />
                        Sign In
                      </Button>
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
