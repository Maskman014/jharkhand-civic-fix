import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Filter, Eye, Calendar } from "lucide-react";
import Navigation from "@/components/Navigation";
import IssueCard from "@/components/IssueCard";
import jharkhandBg from "@/assets/jharkhand-govt-bg.jpg";

// Mock data for issues
const mockIssues = [
  {
    id: "1",
    title: "Large pothole on Main Street",
    description: "Deep pothole causing damage to vehicles and creating traffic congestion during rush hours.",
    location: "Main Street, Ranchi",
    status: "in-progress" as const,
    date: "Nov 12, 2024",
    coordinates: { lat: 23.3441, lng: 85.3096 }
  },
  {
    id: "2",
    title: "Broken street light in residential area",
    description: "Street light has been non-functional for over a week, creating safety concerns for residents.",
    location: "Residential Colony, Jamshedpur",
    status: "reported" as const,
    date: "Nov 10, 2024",
    coordinates: { lat: 22.8046, lng: 86.2029 }
  },
  {
    id: "3",
    title: "Overflowing garbage bins at market",
    description: "Multiple garbage bins are overflowing, creating unhygienic conditions and bad odor.",
    location: "Central Market, Dhanbad",
    status: "reported" as const,
    date: "Nov 11, 2024",
    coordinates: { lat: 23.7957, lng: 86.4304 }
  },
  {
    id: "4",
    title: "Water logging in residential area",
    description: "Poor drainage system causing water accumulation after rainfall.",
    location: "Housing Society, Bokaro",
    status: "in-progress" as const,
    date: "Nov 9, 2024",
    coordinates: { lat: 23.6693, lng: 86.1511 }
  },
  {
    id: "5",
    title: "Damaged road signs on highway",
    description: "Several road signs are damaged or missing, creating confusion for drivers.",
    location: "National Highway, Hazaribag",
    status: "resolved" as const,
    date: "Nov 5, 2024",
    coordinates: { lat: 23.9981, lng: 85.3615 }
  }
];

const Map = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);
  
  const filteredIssues = selectedFilter === "all" 
    ? mockIssues 
    : mockIssues.filter(issue => issue.status === selectedFilter);

  const statusCounts = {
    all: mockIssues.length,
    reported: mockIssues.filter(i => i.status === "reported").length,
    "in-progress": mockIssues.filter(i => i.status === "in-progress").length,
    resolved: mockIssues.filter(i => i.status === "resolved").length
  };

  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: `linear-gradient(rgba(30, 58, 138, 0.85), rgba(30, 58, 138, 0.85)), url(${jharkhandBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Issues Map</h1>
          <p className="text-lg text-muted-foreground">
            Track civic issues across Jharkhand and see real-time updates on their resolution status
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Issues ({statusCounts.all})</SelectItem>
                <SelectItem value="reported">Reported ({statusCounts.reported})</SelectItem>
                <SelectItem value="in-progress">In Progress ({statusCounts["in-progress"]})</SelectItem>
                <SelectItem value="resolved">Resolved ({statusCounts.resolved})</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex gap-2">
            <Badge variant="secondary" className="text-primary">
              {filteredIssues.length} issues shown
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Placeholder */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] border-0 shadow-lg bg-white/95 backdrop-blur-sm border-2 border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Interactive Map</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="h-full">
                <div className="w-full h-full bg-muted/30 rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/20">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">Interactive Map Coming Soon</h3>
                    <p className="text-muted-foreground max-w-md">
                      The interactive map feature will display all reported issues with clickable markers. 
                      For now, browse issues in the sidebar.
                    </p>
                    <div className="mt-4 p-4 bg-background rounded-lg">
                      <p className="text-sm text-muted-foreground mb-2">Current locations:</p>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {filteredIssues.slice(0, 4).map(issue => (
                          <div key={issue.id} className="flex items-center space-x-1">
                            <div className={`w-2 h-2 rounded-full ${
                              issue.status === 'resolved' ? 'bg-accent' :
                              issue.status === 'in-progress' ? 'bg-warning' : 'bg-primary'
                            }`}></div>
                            <span className="truncate">{issue.location}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Issues List */}
          <div className="space-y-4">
            <Card className="border-0 shadow-sm bg-white/95 backdrop-blur-sm border-2 border-white/20">
              <CardHeader>
                <CardTitle className="text-lg">Issues List</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredIssues.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No issues found for the selected filter.</p>
                    </div>
                  ) : (
                    filteredIssues.map((issue) => (
                      <div
                        key={issue.id}
                        className={`p-4 rounded-lg border cursor-pointer transition-all ${
                          selectedIssue === issue.id 
                            ? 'border-primary bg-primary/5' 
                            : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => setSelectedIssue(selectedIssue === issue.id ? null : issue.id)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-sm line-clamp-2">{issue.title}</h4>
                          <Badge 
                            variant={issue.status === 'resolved' ? 'secondary' : 'default'}
                            className={`ml-2 text-xs ${
                              issue.status === 'resolved' ? 'text-accent' :
                              issue.status === 'in-progress' ? 'text-warning' : 'text-primary'
                            }`}
                          >
                            {issue.status === 'in-progress' ? 'In Progress' : 
                             issue.status === 'resolved' ? 'Resolved' : 'Reported'}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center text-xs text-muted-foreground mb-2">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span className="truncate">{issue.location}</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>{issue.date}</span>
                          </div>
                          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                        </div>
                        
                        {selectedIssue === issue.id && (
                          <div className="mt-3 pt-3 border-t border-border">
                            <p className="text-xs text-muted-foreground">
                              {issue.description}
                            </p>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Legend */}
        <Card className="mt-6 border-0 shadow-sm bg-white/95 backdrop-blur-sm border-2 border-white/20">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-3">Map Legend</h3>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="text-sm text-muted-foreground">Reported Issues</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-warning rounded-full"></div>
                <span className="text-sm text-muted-foreground">In Progress</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-accent rounded-full"></div>
                <span className="text-sm text-muted-foreground">Resolved</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Map;