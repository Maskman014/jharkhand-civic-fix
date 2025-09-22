import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, UserCheck, Building } from "lucide-react";
import jharkhandBgImage from "@/assets/jharkhand-govt-bg.jpg";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Government Header */}
      <header className="bg-primary text-primary-foreground py-4 border-b-4 border-secondary">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
                <Shield className="h-10 w-10 text-secondary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Government of Jharkhand</h1>
                <p className="text-primary-foreground/90 text-sm">Official Civic Reporting Portal</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/about" className="text-primary-foreground/90 hover:text-primary-foreground transition-colors">
                About Us
              </Link>
              <Link to="/help" className="text-primary-foreground/90 hover:text-primary-foreground transition-colors">
                Help
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Background */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="absolute inset-0">
          <img
            src={jharkhandBgImage}
            alt="Government of Jharkhand"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Crowdsourced Civic Issue Reporting and Resolution System
            </h1>
            <h2 className="text-3xl md:text-4xl font-semibold text-primary mb-8">
              – Jharkhand –
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Official Government of Jharkhand initiative for reporting and resolving civic issues. 
              Empowering citizens to build a better tomorrow through transparent governance.
            </p>
          </div>

          {/* Login Portal Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Citizen Login */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 bg-card/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-10 w-10 text-accent-foreground" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground">Citizen Portal</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-6 text-lg">
                  Report civic issues in your area. Simple registration with name and phone number.
                </p>
                <Link to="/login?type=citizen">
                  <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-6">
                    Citizen Login
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Administrator Login */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 bg-card/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <UserCheck className="h-10 w-10 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground">Administrator Portal</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-6 text-lg">
                  Manage and oversee all civic issues across Jharkhand. Secure login required.
                </p>
                <Link to="/login?type=admin">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6">
                    Administrator Login
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Municipality Head Login */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 bg-card/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-secondary to-secondary/80 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Building className="h-10 w-10 text-secondary-foreground" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground">Municipality Portal</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-6 text-lg">
                  Municipal heads and coordinators. Manage local area civic issues and resolutions.
                </p>
                <Link to="/login?type=municipality">
                  <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg py-6">
                    Municipality Login
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">© Government of Jharkhand 2025</h3>
              <p className="text-primary-foreground/90 text-lg leading-relaxed">
                This is an official initiative for reporting civic issues and ensuring transparent governance across Jharkhand.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Official Disclaimer</h3>
              <p className="text-primary-foreground/90 text-lg leading-relaxed">
                This portal is maintained by the Government of Jharkhand. All reports are reviewed and processed by authorized officials.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              <div className="text-primary-foreground/90 text-lg space-y-2">
                <p>Email: civic.support@jharkhand.gov.in</p>
                <p>Phone: 1800-XXX-XXXX</p>
                <p>Address: Secretariat, Ranchi, Jharkhand</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
            <p className="text-primary-foreground/90 text-lg">
              Official Government of Jharkhand Digital Initiative | Powered by Technology for Good Governance
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;