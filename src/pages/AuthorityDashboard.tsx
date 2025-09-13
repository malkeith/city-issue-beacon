import { useState } from "react";
import { Shield, Clock, CheckCircle2, TrendingUp, Users, MapPin } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface AuthorityIssue {
  id: string;
  title: string;
  category: string;
  status: "pending" | "in-progress" | "resolved";
  priority: "low" | "medium" | "high";
  votes: number;
  reportedAt: string;
  location: string;
  assignedTo?: string;
}

const mockIssues: AuthorityIssue[] = [
  {
    id: "1",
    title: "Large pothole causing vehicle damage",
    category: "pothole",
    status: "pending",
    priority: "high",
    votes: 23,
    reportedAt: "2024-01-15",
    location: "Main St & 5th Ave"
  },
  {
    id: "2",
    title: "Streetlight out for over a week",
    category: "streetlight", 
    status: "in-progress",
    priority: "medium",
    votes: 15,
    reportedAt: "2024-01-14",
    location: "Park Avenue",
    assignedTo: "Electric Dept."
  },
  {
    id: "3",
    title: "Garbage overflowing onto sidewalk",
    category: "garbage",
    status: "pending",
    priority: "high", 
    votes: 31,
    reportedAt: "2024-01-13",
    location: "Elm Street"
  }
];

const priorityColors = {
  low: "bg-success/20 text-success border-success/20",
  medium: "bg-warning/20 text-warning border-warning/20", 
  high: "bg-destructive/20 text-destructive border-destructive/20"
};

const statusColors = {
  pending: "destructive",
  "in-progress": "default",
  resolved: "outline"
} as const;

export default function AuthorityDashboard() {
  const { toast } = useToast();
  const [issues, setIssues] = useState(mockIssues);
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const updateIssueStatus = (issueId: string, newStatus: "pending" | "in-progress" | "resolved") => {
    setIssues(prev => 
      prev.map(issue => 
        issue.id === issueId 
          ? { ...issue, status: newStatus }
          : issue
      )
    );
    
    toast({
      title: "Status Updated",
      description: `Issue status changed to ${newStatus.replace('-', ' ')}`,
    });
  };

  const assignIssue = (issueId: string, department: string) => {
    setIssues(prev =>
      prev.map(issue =>
        issue.id === issueId 
          ? { ...issue, assignedTo: department, status: "in-progress" as const }
          : issue
      )
    );
    
    toast({
      title: "Issue Assigned",
      description: `Issue assigned to ${department}`,
    });
  };

  const stats = [
    {
      title: "Total Issues",
      value: "847",
      change: "+12.3%",
      icon: Shield,
      color: "primary" as const,
    },
    {
      title: "Resolved This Month", 
      value: "234",
      change: "+8.7%",
      icon: CheckCircle2,
      color: "success" as const,
    },
    {
      title: "Avg. Resolution Time",
      value: "4.2 days",
      change: "-1.3 days",
      icon: Clock,
      color: "warning" as const,
    },
    {
      title: "Active Citizens",
      value: "1,203",
      change: "+15.2%", 
      icon: Users,
      color: "primary" as const,
    },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
            <Shield className="w-8 h-8 text-primary" />
            Authority Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage and resolve civic issues across the city
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="bg-card border-card-border hover:bg-card-hover transition-all duration-200 hover-lift">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-foreground">{stat.title}</CardTitle>
                <stat.icon className={`w-4 h-4 ${
                  stat.color === "primary" ? "text-primary" :
                  stat.color === "success" ? "text-success" :
                  stat.color === "warning" ? "text-warning" :
                  "text-destructive"
                }`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className={`inline-flex items-center ${
                    stat.change.startsWith('+') ? "text-success" : "text-destructive"
                  }`}>
                    <TrendingUp className={`w-3 h-3 mr-1 ${
                      stat.change.startsWith('-') ? "rotate-180" : ""
                    }`} />
                    {stat.change}
                  </span>
                  {" "}from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Issues Management */}
        <Card className="bg-card border-card-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Issues Management</CardTitle>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-48 bg-background border-input-border">
                  <SelectValue placeholder="Filter by department" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="roads">Roads & Infrastructure</SelectItem>
                  <SelectItem value="electric">Electric Department</SelectItem>
                  <SelectItem value="waste">Waste Management</SelectItem>
                  <SelectItem value="water">Water Department</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {issues.map((issue) => (
                <Card key={issue.id} className="bg-background-secondary border-border">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-foreground">{issue.title}</h3>
                          <Badge className={priorityColors[issue.priority]}>
                            {issue.priority} priority
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {issue.location}
                          </div>
                          <div>{issue.votes} votes</div>
                          <div>Reported {new Date(issue.reportedAt).toLocaleDateString()}</div>
                          {issue.assignedTo && <div>Assigned to: {issue.assignedTo}</div>}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Badge variant={statusColors[issue.status]} className="capitalize">
                            {issue.status.replace('-', ' ')}
                          </Badge>
                          
                          <Select
                            value={issue.status}
                            onValueChange={(value: "pending" | "in-progress" | "resolved") => 
                              updateIssueStatus(issue.id, value)
                            }
                          >
                            <SelectTrigger className="w-32 h-8 text-xs bg-background border-input-border">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-popover border-border">
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="in-progress">In Progress</SelectItem>
                              <SelectItem value="resolved">Resolved</SelectItem>
                            </SelectContent>
                          </Select>
                          
                          {!issue.assignedTo && (
                            <Select
                              onValueChange={(value) => assignIssue(issue.id, value)}
                            >
                              <SelectTrigger className="w-40 h-8 text-xs bg-background border-input-border">
                                <SelectValue placeholder="Assign to..." />
                              </SelectTrigger>
                              <SelectContent className="bg-popover border-border">
                                <SelectItem value="Roads Dept.">Roads Department</SelectItem>
                                <SelectItem value="Electric Dept.">Electric Department</SelectItem>
                                <SelectItem value="Waste Mgmt.">Waste Management</SelectItem>
                                <SelectItem value="Water Dept.">Water Department</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <Button size="sm" variant="outline" className="text-xs">
                          View Details
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs">
                          Contact Reporter
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}