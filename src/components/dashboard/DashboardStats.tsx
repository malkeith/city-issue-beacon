import { TrendingUp, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ComponentType<{ className?: string }>;
  color: "primary" | "success" | "warning" | "destructive";
}

function StatCard({ title, value, change, trend, icon: Icon, color }: StatCardProps) {
  const colorClasses = {
    primary: "text-primary bg-primary/10 border-primary/20",
    success: "text-success bg-success/10 border-success/20",
    warning: "text-warning bg-warning/10 border-warning/20",
    destructive: "text-destructive bg-destructive/10 border-destructive/20",
  };

  return (
    <Card className="bg-card border-card-border hover:bg-card-hover transition-all duration-200 hover-lift glow-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-foreground">{title}</CardTitle>
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-4 h-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <p className="text-xs text-muted-foreground">
          <span className={`inline-flex items-center ${
            trend === "up" ? "text-success" : "text-destructive"
          }`}>
            <TrendingUp className={`w-3 h-3 mr-1 ${trend === "down" ? "rotate-180" : ""}`} />
            {change}
          </span>
          {" "}from last month
        </p>
      </CardContent>
    </Card>
  );
}

export function DashboardStats() {
  const stats = [
    {
      title: "Total Issues",
      value: "2,847",
      change: "+12.3%",
      trend: "up" as const,
      icon: AlertTriangle,
      color: "primary" as const,
    },
    {
      title: "Resolved",
      value: "1,923",
      change: "+8.7%",
      trend: "up" as const,
      icon: CheckCircle,
      color: "success" as const,
    },
    {
      title: "In Progress",
      value: "456",
      change: "-2.1%",
      trend: "down" as const,
      icon: Clock,
      color: "warning" as const,
    },
    {
      title: "Pending",
      value: "468",
      change: "+15.2%",
      trend: "up" as const,
      icon: AlertTriangle,
      color: "destructive" as const,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}