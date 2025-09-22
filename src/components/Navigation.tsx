import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

const Navigation = () => {
  const location = useLocation();

  return (
    <header className="bg-primary text-primary-foreground border-b-4 border-secondary">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
              <Shield className="h-7 w-7 text-secondary-foreground" />
            </div>
            <div>
              <div className="font-bold text-xl">Government of Jharkhand</div>
              <div className="text-primary-foreground/90 text-sm">Civic Reporting System</div>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-lg font-medium transition-colors ${
                location.pathname === "/" 
                  ? "text-secondary" 
                  : "text-primary-foreground/90 hover:text-primary-foreground"
              }`}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`text-lg font-medium transition-colors ${
                location.pathname === "/about" 
                  ? "text-secondary" 
                  : "text-primary-foreground/90 hover:text-primary-foreground"
              }`}
            >
              About Us
            </Link>
            <Link 
              to="/help" 
              className={`text-lg font-medium transition-colors ${
                location.pathname === "/help" 
                  ? "text-secondary" 
                  : "text-primary-foreground/90 hover:text-primary-foreground"
              }`}
            >
              Help
            </Link>
          </div>

          {/* Mobile menu items */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/about">
              <Button variant="ghost" size="sm" className="text-primary-foreground/90 hover:text-primary-foreground">
                About
              </Button>
            </Link>
            <Link to="/help">
              <Button variant="ghost" size="sm" className="text-primary-foreground/90 hover:text-primary-foreground">
                Help
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;