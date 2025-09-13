import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, MapPin, Users, CheckCircle, TrendingUp, AlertCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import IssueCard from "@/components/IssueCard";
import heroImage from "@/assets/hero-civic-reporting.jpg";

// Mock data for recent resolved issues
const recentResolvedIssues = [
  {
    id: "1",
    title: "Pothole on Main Street repaired",
    description: "Large pothole causing traffic issues has been successfully repaired by the municipal corporation.",
    location: "Main Street, Ranchi",
    status: "resolved" as const,
    date: "Nov 10, 2024"
  },
  {
    id: "2", 
    title: "Street light installation completed",
    description: "New LED street lights installed in residential area for better safety.",
    location: "Residential Area, Jamshedpur",
    status: "resolved" as const,
    date: "Nov 8, 2024"
  },
  {
    id: "3",
    title: "Drainage system cleaned",
    description: "Blocked drainage causing waterlogging has been cleared.",
    location: "Market Area, Dhanbad",
    status: "resolved" as const,
    date: "Nov 5, 2024"
  }
];

const stats = [
  {
    label: "Issues Reported",
    value: "1,247",
    icon: AlertCircle,
    color: "text-primary"
  },
  {
    label: "Issues Resolved",
    value: "892",
    icon: CheckCircle,
    color: "text-accent"
  },
  {
    label: "In Progress",
    value: "234",
    icon: TrendingUp,
    color: "text-warning"
  }
];

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/90"></div>
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Citizens reporting civic issues in Jharkhand"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        <div className="relative container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Report Civic Issues in
            <span className="block text-accent">Jharkhand</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Help make your community better by reporting civic issues. Track progress and see real changes happen in your neighborhood.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/report">
              <Button size="lg" className="bg-warning hover:bg-warning/90 text-warning-foreground text-lg px-8 py-3">
                <FileText className="h-5 w-5 mr-2" />
                Report an Issue
              </Button>
            </Link>
            <Link to="/map">
              <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-3">
                <MapPin className="h-5 w-5 mr-2" />
                View Issues Map
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="text-center border-0 shadow-sm">
                  <CardContent className="pt-6">
                    <Icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
                    <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recent Resolved Issues */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Recent Success Stories</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See how your reports are making a difference in communities across Jharkhand
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentResolvedIssues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link to="/map">
              <Button variant="outline" size="lg">
                View All Issues
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">Simple steps to report and track civic issues</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">1. Report Issue</h3>
              <p className="text-muted-foreground">Submit details about the civic issue with photos and location</p>
            </div>
            
            <div className="text-center">
              <div className="bg-warning rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-warning-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">2. Track Progress</h3>
              <p className="text-muted-foreground">Monitor the status of your report and official responses</p>
            </div>
            
            <div className="text-center">
              <div className="bg-accent rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">3. See Results</h3>
              <p className="text-muted-foreground">Watch as your community improves through collective action</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">CivicReport Jharkhand</h3>
              <p className="text-primary-foreground/80">
                A student-led initiative to empower citizens and improve civic infrastructure across Jharkhand.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link to="/report" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Report Issue
                </Link>
                <Link to="/map" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  View Map
                </Link>
                <Link to="/about" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  About Us
                </Link>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-primary-foreground/80">
                For inquiries and support:<br />
                Email: contact@civicreport-jharkhand.org
              </p>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
            <p className="text-primary-foreground/80">
              © 2024 CivicReport Jharkhand. A non-profit, student-led initiative.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;