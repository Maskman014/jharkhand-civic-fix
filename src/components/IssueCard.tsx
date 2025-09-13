import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Eye } from "lucide-react";
import { Link } from "react-router-dom";

interface Issue {
  id: string;
  title: string;
  description: string;
  location: string;
  status: "reported" | "in-progress" | "resolved";
  date: string;
  image?: string;
}

interface IssueCardProps {
  issue: Issue;
  compact?: boolean;
}

const statusConfig = {
  reported: {
    label: "Reported",
    variant: "secondary" as const,
    color: "text-primary"
  },
  "in-progress": {
    label: "In Progress",
    variant: "default" as const,
    color: "text-warning"
  },
  resolved: {
    label: "Resolved",
    variant: "secondary" as const,
    color: "text-accent"
  }
};

const IssueCard = ({ issue, compact = false }: IssueCardProps) => {
  const statusInfo = statusConfig[issue.status];

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
      <CardHeader className={compact ? "pb-2" : ""}>
        <div className="flex items-start justify-between">
          <CardTitle className={`${compact ? "text-base" : "text-lg"} font-semibold text-foreground line-clamp-2`}>
            {issue.title}
          </CardTitle>
          <Badge variant={statusInfo.variant} className={statusInfo.color}>
            {statusInfo.label}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {!compact && (
          <p className="text-muted-foreground text-sm line-clamp-2">
            {issue.description}
          </p>
        )}
        
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <MapPin className="h-3 w-3" />
            <span className="truncate">{issue.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span>{issue.date}</span>
          </div>
        </div>
        
        <div className="flex justify-end pt-2">
          <Link to={`/issue/${issue.id}`}>
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary-dark">
              <Eye className="h-4 w-4 mr-1" />
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default IssueCard;