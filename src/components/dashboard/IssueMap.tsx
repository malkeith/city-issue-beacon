import { MapPin, Navigation } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface MapIssue {
  id: string;
  title: string;
  category: string;
  status: "pending" | "in-progress" | "resolved";
  position: { lat: number; lng: number; x: number; y: number };
  votes: number;
}

// Mock data for demonstration
const mockIssues: MapIssue[] = [
  {
    id: "1",
    title: "Pothole on Main Street",
    category: "pothole",
    status: "pending",
    position: { lat: 40.7128, lng: -74.0060, x: 25, y: 30 },
    votes: 15,
  },
  {
    id: "2",
    title: "Broken streetlight",
    category: "streetlight",
    status: "in-progress",
    position: { lat: 40.7589, lng: -73.9851, x: 45, y: 20 },
    votes: 8,
  },
  {
    id: "3",
    title: "Garbage overflow",
    category: "garbage",
    status: "pending",
    position: { lat: 40.7505, lng: -73.9934, x: 65, y: 60 },
    votes: 23,
  },
  {
    id: "4",
    title: "Water leak",
    category: "water",
    status: "resolved",
    position: { lat: 40.7282, lng: -74.0776, x: 80, y: 45 },
    votes: 12,
  },
  {
    id: "5",
    title: "Traffic signal malfunction",
    category: "traffic",
    status: "in-progress",
    position: { lat: 40.7614, lng: -73.9776, x: 30, y: 70 },
    votes: 31,
  },
];

const categoryColors = {
  pothole: "category-pothole",
  garbage: "category-garbage",
  streetlight: "category-streetlight",
  water: "category-water",
  traffic: "category-traffic",
  other: "category-other",
};

const statusColors = {
  pending: "destructive",
  "in-progress": "warning",
  resolved: "success",
};

interface IssuePinProps {
  issue: MapIssue;
  onClick: (issue: MapIssue) => void;
}

function IssuePin({ issue, onClick }: IssuePinProps) {
  const categoryColor = categoryColors[issue.category as keyof typeof categoryColors] || categoryColors.other;
  
  return (
    <div 
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover-lift transition-all duration-200 z-10`}
      style={{ left: `${issue.position.x}%`, top: `${issue.position.y}%` }}
      onClick={() => onClick(issue)}
    >
      <div className={`w-8 h-8 rounded-full bg-${categoryColor} border-2 border-background shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-200`}>
        <MapPin className="w-4 h-4 text-background" />
      </div>
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity duration-200">
        <div className="bg-popover text-popover-foreground px-2 py-1 rounded text-xs whitespace-nowrap shadow-lg border">
          {issue.title}
        </div>
      </div>
    </div>
  );
}

interface IssueMapProps {
  selectedIssue?: MapIssue | null;
  onIssueSelect: (issue: MapIssue) => void;
}

export function IssueMap({ selectedIssue, onIssueSelect }: IssueMapProps) {
  return (
    <Card className="bg-card border-card-border hover:bg-card-hover transition-all duration-200 h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
            <Navigation className="w-5 h-5 text-primary" />
            Live Issue Map
          </CardTitle>
          <Button variant="outline" size="sm" className="border-primary/20 hover:bg-primary/10">
            <MapPin className="w-4 h-4 mr-2" />
            Center Map
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative h-96 bg-gradient-to-br from-background-secondary to-background-tertiary rounded-lg mx-4 mb-4 overflow-hidden border border-card-border">
          {/* Mock city map background */}
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-success/10 relative">
              {/* Mock streets */}
              <div className="absolute w-full h-0.5 bg-muted-foreground/30 top-1/4"></div>
              <div className="absolute w-full h-0.5 bg-muted-foreground/30 top-1/2"></div>
              <div className="absolute w-full h-0.5 bg-muted-foreground/30 top-3/4"></div>
              <div className="absolute w-0.5 h-full bg-muted-foreground/30 left-1/4"></div>
              <div className="absolute w-0.5 h-full bg-muted-foreground/30 left-1/2"></div>
              <div className="absolute w-0.5 h-full bg-muted-foreground/30 left-3/4"></div>
            </div>
          </div>
          
          {/* Issue pins */}
          {mockIssues.map((issue) => (
            <IssuePin key={issue.id} issue={issue} onClick={onIssueSelect} />
          ))}
          
          {/* Selected issue highlight */}
          {selectedIssue && (
            <div 
              className="absolute w-12 h-12 rounded-full border-2 border-primary animate-pulse transform -translate-x-1/2 -translate-y-1/2 z-20"
              style={{ 
                left: `${selectedIssue.position.x}%`, 
                top: `${selectedIssue.position.y}%` 
              }}
            />
          )}
        </div>
        
        {/* Map legend */}
        <div className="px-4 pb-4">
          <div className="flex flex-wrap gap-2">
            {Object.entries(categoryColors).map(([category, colorClass]) => (
              <div key={category} className="flex items-center gap-1 text-xs">
                <div className={`w-3 h-3 rounded-full bg-${colorClass}`}></div>
                <span className="text-muted-foreground capitalize">{category}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}