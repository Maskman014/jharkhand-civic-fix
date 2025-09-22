import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Filter, MapPin, AlertCircle, CheckCircle, Clock, ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Issue {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  priority: string;
  address: string;
  images: string[];
  created_at: string;
  fraud_score: number;
  duplicate_of: string | null;
  auto_rejected: boolean;
}

const IssuesList = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    checkAuthAndFetchIssues();
  }, []);

  const checkAuthAndFetchIssues = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please login to view issues.",
          variant: "destructive"
        });
        navigate('/login?type=citizen');
        return;
      }

      await fetchIssues();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load issues. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchIssues = async () => {
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    setIssues(data || []);
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      pending: { label: "Pending", variant: "secondary" as const, icon: Clock },
      "in-progress": { label: "In Progress", variant: "default" as const, icon: Clock },
      resolved: { label: "Resolved", variant: "default" as const, icon: CheckCircle }
    };
    
    const config = statusMap[status as keyof typeof statusMap] || statusMap.pending;
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className={`${status === 'resolved' ? 'bg-accent text-accent-foreground' : ''}`}>
        <Icon className="h-3 w-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  const getPriorityColor = (priority: string) => {
    const priorityColors = {
      low: "border-l-accent",
      medium: "border-l-secondary", 
      high: "border-l-warning",
      urgent: "border-l-destructive"
    };
    return priorityColors[priority as keyof typeof priorityColors] || "border-l-muted";
  };

  const filteredIssues = issues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.address?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || issue.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || issue.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Civic Issues</h1>
              <p className="text-muted-foreground text-lg">View and track reported civic issues in Jharkhand</p>
            </div>
            
            <Link to="/report-issue/general">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Plus className="h-4 w-4 mr-2" />
                Report New Issue
              </Button>
            </Link>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search issues..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Road">Road</SelectItem>
                <SelectItem value="Water">Water</SelectItem>
                <SelectItem value="Electricity">Electricity</SelectItem>
                <SelectItem value="Garbage">Garbage</SelectItem>
                <SelectItem value="Traffic">Traffic</SelectItem>
                <SelectItem value="Public Facility">Public Facility</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex items-center text-sm text-muted-foreground">
              <Filter className="h-4 w-4 mr-2" />
              {filteredIssues.length} issues found
            </div>
          </div>
        </div>

        {/* Issues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIssues.map((issue) => (
            <Card key={issue.id} className={`hover:shadow-lg transition-shadow cursor-pointer border-l-4 ${getPriorityColor(issue.priority)}`}>
              <Link to={`/issue/${issue.id}`}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg font-semibold line-clamp-2">
                      {issue.title}
                    </CardTitle>
                    {getStatusBadge(issue.status)}
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">
                      {issue.category}
                    </Badge>
                    <Badge variant="outline" className={`text-xs ${
                      issue.priority === 'urgent' ? 'border-destructive text-destructive' :
                      issue.priority === 'high' ? 'border-warning text-warning' :
                      issue.priority === 'medium' ? 'border-secondary text-secondary' :
                      'border-accent text-accent'
                    }`}>
                      {issue.priority} priority
                    </Badge>
                    {issue.duplicate_of && (
                      <Badge variant="outline" className="text-xs border-warning text-warning">
                        Duplicate
                      </Badge>
                    )}
                    {issue.fraud_score > 0.7 && (
                      <Badge variant="outline" className="text-xs border-destructive text-destructive">
                        Flagged
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent>
                  {issue.images && issue.images.length > 0 && (
                    <div className="mb-3">
                      <img
                        src={issue.images[0]}
                        alt="Issue"
                        className="w-full h-32 object-cover rounded-md"
                      />
                    </div>
                  )}
                  
                  <p className="text-muted-foreground text-sm line-clamp-3 mb-3">
                    {issue.description}
                  </p>
                  
                  {issue.address && (
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                      <span className="line-clamp-1">{issue.address}</span>
                    </div>
                  )}
                  
                  <div className="text-xs text-muted-foreground">
                    Reported on {new Date(issue.created_at).toLocaleDateString()}
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        {filteredIssues.length === 0 && (
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No Issues Found</h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm || statusFilter !== "all" || categoryFilter !== "all"
                ? "Try adjusting your filters to see more results."
                : "No civic issues have been reported yet."}
            </p>
            <Link to="/report-issue/general">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Plus className="h-4 w-4 mr-2" />
                Report the First Issue
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default IssuesList;