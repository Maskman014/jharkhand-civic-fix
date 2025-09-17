import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Calendar, User, Camera, MessageSquare, Clock } from "lucide-react";
import Navigation from "@/components/Navigation";
import jharkhandBg from "@/assets/jharkhand-govt-bg.jpg";

// Mock data - in real app this would come from API
const mockIssue = {
  id: "1",
  title: "Large pothole on Main Street",
  description: "There is a large pothole on Main Street near the traffic light intersection. It's approximately 2 feet wide and 6 inches deep, causing vehicles to swerve dangerously to avoid it. This has been creating traffic congestion during rush hours and poses a safety risk to both drivers and pedestrians.",
  location: "Main Street, Ranchi, Near Traffic Light Intersection",
  coordinates: "23.3441, 85.3096",
  status: "in-progress" as const,
  category: "Roads & Traffic",
  reportedDate: "November 12, 2024",
  lastUpdated: "November 15, 2024",
  reporterEmail: "citizen@example.com",
  assignedTo: "Ranchi Municipal Corporation - Roads Department",
  estimatedResolution: "November 25, 2024",
  priority: "High",
  photos: [
    "/placeholder-pothole-1.jpg",
    "/placeholder-pothole-2.jpg"
  ],
  updates: [
    {
      date: "November 15, 2024",
      status: "in-progress",
      message: "Issue has been assigned to the Roads Department. Site inspection scheduled for November 18, 2024.",
      author: "System Admin"
    },
    {
      date: "November 13, 2024", 
      status: "reported",
      message: "Issue report has been verified and is now in the system for processing.",
      author: "Verification Team"
    },
    {
      date: "November 12, 2024",
      status: "reported", 
      message: "Issue reported by citizen. Photos and location details recorded.",
      author: "System"
    }
  ]
};

const statusConfig = {
  reported: {
    label: "Reported",
    color: "bg-primary text-primary-foreground",
    description: "Issue has been submitted and is awaiting review"
  },
  "in-progress": {
    label: "In Progress", 
    color: "bg-warning text-warning-foreground",
    description: "Issue is being actively worked on by authorities"
  },
  resolved: {
    label: "Resolved",
    color: "bg-accent text-accent-foreground", 
    description: "Issue has been successfully resolved"
  }
};

const IssueDetail = () => {
  const { id } = useParams();
  const issue = mockIssue; // In real app, fetch by ID
  const statusInfo = statusConfig[issue.status];

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
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/map">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Issues Map
            </Button>
          </Link>
        </div>

        {/* Issue Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{issue.title}</h1>
              <p className="text-muted-foreground">Issue ID: #{issue.id}</p>
            </div>
            <div className="flex flex-col items-start lg:items-end gap-2">
              <Badge className={`${statusInfo.color} text-sm px-3 py-1`}>
                {statusInfo.label}
              </Badge>
              <p className="text-sm text-muted-foreground">{statusInfo.description}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm border-2 border-white/20">
              <CardHeader>
                <CardTitle>Issue Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{issue.description}</p>
              </CardContent>
            </Card>

            {/* Photos */}
            <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm border-2 border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Camera className="h-5 w-5" />
                  <span>Photos</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {issue.photos.map((photo, index) => (
                    <div key={index} className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Camera className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Photo {index + 1}</p>
                        <p className="text-xs text-muted-foreground">Pothole documentation</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Updates Timeline */}
            <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm border-2 border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5" />
                  <span>Status Updates</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {issue.updates.map((update, index) => (
                    <div key={index} className="flex space-x-4">
                      <div className="flex-shrink-0">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          update.status === 'resolved' ? 'bg-accent' :
                          update.status === 'in-progress' ? 'bg-warning' : 'bg-primary'
                        }`}>
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-sm">{update.author}</h4>
                          <span className="text-xs text-muted-foreground">{update.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{update.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Issue Details */}
            <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm border-2 border-white/20">
              <CardHeader>
                <CardTitle>Issue Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-1">Category</h4>
                  <p className="text-foreground">{issue.category}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-1">Priority</h4>
                  <Badge variant="outline" className="text-warning">{issue.priority}</Badge>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-1">Reported Date</h4>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">{issue.reportedDate}</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-1">Last Updated</h4>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">{issue.lastUpdated}</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-1">Estimated Resolution</h4>
                  <p className="text-foreground">{issue.estimatedResolution}</p>
                </div>
              </CardContent>
            </Card>

            {/* Location Details */}
            <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm border-2 border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Location</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-foreground">{issue.location}</p>
                  <p className="text-sm text-muted-foreground">
                    Coordinates: {issue.coordinates}
                  </p>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Map View</p>
                      <p className="text-xs text-muted-foreground">Interactive map coming soon</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Assigned Department */}
            <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm border-2 border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Assigned To</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground font-medium">{issue.assignedTo}</p>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm border-2 border-white/20">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <Button className="w-full" variant="outline">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Add Comment
                  </Button>
                  <Button className="w-full" variant="outline">
                    <MapPin className="h-4 w-4 mr-2" />
                    View on Map
                  </Button>
                  <Link to="/report" className="block">
                    <Button className="w-full">
                      Report Similar Issue
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetail;