import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Lock, Eye, Edit, Trash2, Filter, Plus, BarChart3, Users, AlertCircle, CheckCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import { toast } from "sonner";
import jharkhandBg from "@/assets/jharkhand-govt-bg.jpg";

// Mock data for admin dashboard
const mockIssues = [
  {
    id: "1",
    title: "Large pothole on Main Street",
    location: "Main Street, Ranchi",
    status: "in-progress" as const,
    priority: "High",
    reportedDate: "Nov 12, 2024",
    assignedTo: "Roads Department"
  },
  {
    id: "2", 
    title: "Broken street light",
    location: "Residential Area, Jamshedpur",
    status: "reported" as const,
    priority: "Medium",
    reportedDate: "Nov 10, 2024",
    assignedTo: "Electrical Department"
  },
  {
    id: "3",
    title: "Overflowing garbage bins",
    location: "Central Market, Dhanbad", 
    status: "resolved" as const,
    priority: "High",
    reportedDate: "Nov 8, 2024",
    assignedTo: "Sanitation Department"
  }
];

const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [issues, setIssues] = useState(mockIssues);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password check - in real app, use proper authentication
    if (password === "admin123") {
      setIsLoggedIn(true);
      toast("Successfully logged in to admin dashboard");
    } else {
      toast("Invalid password. Please try again.");
    }
  };

  const handleStatusChange = (issueId: string, newStatus: string) => {
    setIssues(prev => prev.map(issue => 
      issue.id === issueId 
        ? { ...issue, status: newStatus as "reported" | "in-progress" | "resolved" }
        : issue
    ));
    toast(`Issue status updated to ${newStatus}`);
  };

  const handleDeleteIssue = (issueId: string) => {
    setIssues(prev => prev.filter(issue => issue.id !== issueId));
    toast("Issue deleted successfully");
  };

  const filteredIssues = selectedFilter === "all" 
    ? issues 
    : issues.filter(issue => issue.status === selectedFilter);

  const stats = {
    total: issues.length,
    reported: issues.filter(i => i.status === "reported").length,
    inProgress: issues.filter(i => i.status === "in-progress").length,
    resolved: issues.filter(i => i.status === "resolved").length
  };

  // Login form
  if (!isLoggedIn) {
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
        
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto">
            <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm border-2 border-white/20">
              <CardHeader className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Lock className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Admin Login</CardTitle>
                <p className="text-muted-foreground">
                  Access the administrative dashboard to manage civic issues
                </p>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Admin Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter admin password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    <Lock className="h-4 w-4 mr-2" />
                    Login to Dashboard
                  </Button>
                </form>
                
                <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground text-center">
                    Demo Password: admin123
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Admin dashboard
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
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage civic issues and monitor system activity</p>
          </div>
          <Button onClick={() => setIsLoggedIn(false)} variant="outline">
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-sm bg-white/95 backdrop-blur-sm border-2 border-white/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Issues</p>
                  <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm bg-white/95 backdrop-blur-sm border-2 border-white/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Reported</p>
                  <p className="text-2xl font-bold text-primary">{stats.reported}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm bg-white/95 backdrop-blur-sm border-2 border-white/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold text-warning">{stats.inProgress}</p>
                </div>
                <Users className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm bg-white/95 backdrop-blur-sm border-2 border-white/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Resolved</p>
                  <p className="text-2xl font-bold text-accent">{stats.resolved}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Issues ({stats.total})</SelectItem>
                <SelectItem value="reported">Reported ({stats.reported})</SelectItem>
                <SelectItem value="in-progress">In Progress ({stats.inProgress})</SelectItem>
                <SelectItem value="resolved">Resolved ({stats.resolved})</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Manual Issue
          </Button>
        </div>

        {/* Issues Table */}
        <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm border-2 border-white/20">
          <CardHeader>
            <CardTitle>Issues Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Issue</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Location</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Priority</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Date</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredIssues.map((issue) => (
                    <tr key={issue.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                      <td className="py-4 px-2">
                        <div>
                          <p className="font-medium text-foreground line-clamp-1">{issue.title}</p>
                          <p className="text-sm text-muted-foreground">ID: #{issue.id}</p>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <p className="text-sm text-muted-foreground">{issue.location}</p>
                      </td>
                      <td className="py-4 px-2">
                        <Select 
                          value={issue.status} 
                          onValueChange={(value) => handleStatusChange(issue.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="reported">Reported</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="resolved">Resolved</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="py-4 px-2">
                        <Badge 
                          variant="outline"
                          className={
                            issue.priority === "High" ? "text-destructive" :
                            issue.priority === "Medium" ? "text-warning" : "text-muted-foreground"
                          }
                        >
                          {issue.priority}
                        </Badge>
                      </td>
                      <td className="py-4 px-2">
                        <p className="text-sm text-muted-foreground">{issue.reportedDate}</p>
                      </td>
                      <td className="py-4 px-2">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteIssue(issue.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredIssues.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No issues found for the selected filter.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;