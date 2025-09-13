import { useState } from "react";
import { ChevronUp, ChevronDown, MessageCircle, Calendar, Filter, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Issue {
  id: string;
  title: string;
  category: string;
  status: "pending" | "in-progress" | "resolved";
  votes: number;
  reportedAt: string;
  description: string;
  location: string;
}

// Mock data
const mockIssues: Issue[] = [
  {
    id: "1",
    title: "Large pothole causing vehicle damage",
    category: "pothole",
    status: "pending",
    votes: 23,
    reportedAt: "2024-01-15",
    description: "Deep pothole on Main Street intersection",
    location: "Main St & 5th Ave"
  },
  {
    id: "2", 
    title: "Streetlight out for over a week",
    category: "streetlight",
    status: "in-progress",
    votes: 15,
    reportedAt: "2024-01-14",
    description: "No lighting making area unsafe at night",
    location: "Park Avenue"
  },
  {
    id: "3",
    title: "Garbage overflowing onto sidewalk",
    category: "garbage",
    status: "pending",
    votes: 31,
    reportedAt: "2024-01-13",
    description: "Bins not collected, attracting pests",
    location: "Elm Street"
  },
  {
    id: "4",
    title: "Water main leak flooding street",
    category: "water",
    status: "resolved",
    votes: 42,
    reportedAt: "2024-01-12",
    description: "Major leak causing flooding",
    location: "Oak Boulevard"
  },
  {
    id: "5",
    title: "Traffic light stuck on red",
    category: "traffic",
    status: "in-progress",
    votes: 18,
    reportedAt: "2024-01-11",
    description: "Signal malfunction causing delays",
    location: "Downtown Intersection"
  }
];

const categoryColors = {
  pothole: "category-pothole",
  garbage: "category-garbage", 
  streetlight: "category-streetlight",
  water: "category-water",
  traffic: "category-traffic",
  other: "category-other",
};

const statusVariants = {
  pending: "destructive",
  "in-progress": "default",
  resolved: "outline",
} as const;

interface IssueCardProps {
  issue: Issue;
  onVote: (issueId: string, type: "up" | "down") => void;
  onSelect: (issue: Issue) => void;
}

function IssueCard({ issue, onVote, onSelect }: IssueCardProps) {
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null);
  const categoryColor = categoryColors[issue.category as keyof typeof categoryColors] || categoryColors.other;
  
  const handleVote = (type: "up" | "down") => {
    if (userVote === type) {
      setUserVote(null);
    } else {
      setUserVote(type);
    }
    onVote(issue.id, type);
  };

  return (
    <Card 
      className="bg-card border-card-border hover:bg-card-hover transition-all duration-200 hover-lift cursor-pointer"
      onClick={() => onSelect(issue)}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex flex-col items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleVote("up");
              }}
              className={`h-8 w-8 p-0 ${userVote === "up" ? "bg-success/20 text-success" : "hover:bg-accent"}`}
            >
              <ChevronUp className="w-4 h-4" />
            </Button>
            <span className="text-sm font-bold text-foreground">{issue.votes}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleVote("down");
              }}
              className={`h-8 w-8 p-0 ${userVote === "down" ? "bg-destructive/20 text-destructive" : "hover:bg-accent"}`}
            >
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold text-foreground line-clamp-2">{issue.title}</h3>
              <Badge 
                variant={statusVariants[issue.status]}
                className="shrink-0 capitalize"
              >
                {issue.status.replace('-', ' ')}
              </Badge>
            </div>
            
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {issue.description}
            </p>
            
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full bg-${categoryColor}`}></div>
                <span className="capitalize">{issue.category}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{new Date(issue.reportedAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-3 h-3" />
                <span>{issue.location}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface IssuesListProps {
  selectedIssue?: Issue | null;
  onIssueSelect: (issue: Issue) => void;
}

export function IssuesList({ selectedIssue, onIssueSelect }: IssuesListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [issues, setIssues] = useState(mockIssues);

  const handleVote = (issueId: string, type: "up" | "down") => {
    setIssues(prev => 
      prev.map(issue => 
        issue.id === issueId 
          ? { ...issue, votes: type === "up" ? issue.votes + 1 : issue.votes - 1 }
          : issue
      )
    );
  };

  const filteredIssues = issues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || issue.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || issue.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <Card className="bg-card border-card-border h-full flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-foreground">Recent Issues</CardTitle>
        
        {/* Filters */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search issues..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-background border-input-border"
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full bg-background border-input-border">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="pothole">Potholes</SelectItem>
                <SelectItem value="garbage">Garbage</SelectItem>
                <SelectItem value="streetlight">Street Lights</SelectItem>
                <SelectItem value="water">Water Issues</SelectItem>
                <SelectItem value="traffic">Traffic</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full bg-background border-input-border">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-auto p-4 pt-0">
        <div className="space-y-3">
          {filteredIssues.length > 0 ? (
            filteredIssues.map((issue) => (
              <IssueCard
                key={issue.id}
                issue={issue}
                onVote={handleVote}
                onSelect={onIssueSelect}
              />
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No issues found matching your criteria.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}