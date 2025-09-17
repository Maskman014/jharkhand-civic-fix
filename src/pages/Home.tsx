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
    <div id="home" className="min-h-screen bg-background">
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
        
        <div className="relative container mx-auto px-4 py-32 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8">
            Report Civic Issues in
            <span className="block text-accent">Jharkhand</span>
          </h1>
          <p className="text-2xl md:text-3xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
            Help make your community better by reporting civic issues. Track progress and see real changes happen in your neighborhood.
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-12 max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              Government of Jharkhand Official Portal
            </h2>
            <p className="text-lg md:text-xl text-white/80">
              This portal is accessible to all citizens of Jharkhand. Report issues like potholes, street lighting, water supply problems, and more. Your reports help local authorities prioritize and address community needs effectively.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/login">
              <Button size="lg" className="bg-warning hover:bg-warning/90 text-warning-foreground text-xl px-12 py-4 h-16">
                <Users className="h-6 w-6 mr-3" />
                Citizen Login
              </Button>
            </Link>
            <Link to="/report">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-xl px-12 py-4 h-16">
                <FileText className="h-6 w-6 mr-3" />
                Report an Issue
              </Button>
            </Link>
            <Link to="/map">
              <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white hover:text-primary text-xl px-12 py-4 h-16">
                <MapPin className="h-6 w-6 mr-3" />
                View Issues Map
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Impact Statistics</h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              See how citizens across Jharkhand are making a difference in their communities
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="pt-8 pb-8">
                    <Icon className={`h-12 w-12 mx-auto mb-4 ${stat.color}`} />
                    <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">{stat.value}</div>
                    <div className="text-lg text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recent Resolved Issues */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Recent Success Stories</h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              See how your reports are making a difference in communities across Jharkhand. Every report matters and contributes to building better infrastructure.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentResolvedIssues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/map">
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                <MapPin className="h-5 w-5 mr-2" />
                View All Issues on Map
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">How It Works</h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Simple steps to report and track civic issues. Your voice matters in building a better Jharkhand.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-primary rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <FileText className="h-12 w-12 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">1. Report Issue</h3>
              <p className="text-lg text-muted-foreground">Submit details about the civic issue with photos and location information to help authorities understand the problem</p>
            </div>
            
            <div className="text-center">
              <div className="bg-warning rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <TrendingUp className="h-12 w-12 text-warning-foreground" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">2. Track Progress</h3>
              <p className="text-lg text-muted-foreground">Monitor the status of your report and receive official responses as authorities work to resolve the issue</p>
            </div>
            
            <div className="text-center">
              <div className="bg-accent rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <CheckCircle className="h-12 w-12 text-accent-foreground" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">3. See Results</h3>
              <p className="text-lg text-muted-foreground">Watch as your community improves through collective action and see the positive impact of your contribution</p>
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