import { Trophy, Star, Award, TrendingUp, Medal, Crown, Target } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

interface User {
  id: string;
  name: string;
  avatar?: string;
  points: number;
  issuesReported: number;
  issuesResolved: number;
  badges: string[];
  level: number;
  rank: number;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  progress?: number;
  maxProgress?: number;
  unlocked: boolean;
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "/placeholder-avatar.jpg",
    points: 2350,
    issuesReported: 47,
    issuesResolved: 23,
    badges: ["reporter", "resolver", "community-hero"],
    level: 8,
    rank: 1,
  },
  {
    id: "2", 
    name: "Mike Chen",
    points: 1890,
    issuesReported: 32,
    issuesResolved: 18,
    badges: ["reporter", "resolver"],
    level: 6,
    rank: 2,
  },
  {
    id: "3",
    name: "Emily Davis",
    points: 1650,
    issuesReported: 28,
    issuesResolved: 15,
    badges: ["reporter", "good-citizen"],
    level: 5,
    rank: 3,
  },
  {
    id: "4",
    name: "Alex Rodriguez", 
    points: 1420,
    issuesReported: 25,
    issuesResolved: 12,
    badges: ["reporter"],
    level: 4,
    rank: 4,
  },
  {
    id: "5",
    name: "Jordan Taylor",
    points: 1180,
    issuesReported: 19,
    issuesResolved: 9,
    badges: ["new-member"],
    level: 3,
    rank: 5,
  }
];

const achievements: Achievement[] = [
  {
    id: "1",
    name: "First Report",
    description: "Submit your first civic issue report",
    icon: Star,
    color: "text-primary",
    unlocked: true,
  },
  {
    id: "2",
    name: "Community Hero",
    description: "Report 50+ issues to help your community",
    icon: Award,
    color: "text-warning",
    progress: 47,
    maxProgress: 50,
    unlocked: false,
  },
  {
    id: "3", 
    name: "Problem Solver",
    description: "Have 25+ of your reports resolved",
    icon: Target,
    color: "text-success",
    progress: 23,
    maxProgress: 25,
    unlocked: false,
  },
  {
    id: "4",
    name: "Top Contributor",
    description: "Reach the monthly leaderboard top 3",
    icon: Trophy,
    color: "text-destructive",
    unlocked: true,
  },
  {
    id: "5",
    name: "Level Master", 
    description: "Reach level 10",
    icon: Crown,
    color: "text-category-other",
    progress: 8,
    maxProgress: 10,
    unlocked: false,
  },
];

const currentUser = mockUsers[0]; // Simulate current user

function getRankIcon(rank: number) {
  switch (rank) {
    case 1: return <Crown className="w-5 h-5 text-warning" />;
    case 2: return <Medal className="w-5 h-5 text-muted-foreground" />;
    case 3: return <Award className="w-5 h-5 text-category-streetlight" />;
    default: return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>;
  }
}

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('');
}

export default function Leaderboard() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
            <Trophy className="w-8 h-8 text-primary" />
            Community Leaderboard
          </h1>
          <p className="text-muted-foreground">
            Recognize and celebrate our most engaged community members
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Current User Stats */}
          <Card className="bg-gradient-card border-card-border glow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-primary" />
                Your Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={currentUser.avatar} />
                    <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                      {getInitials(currentUser.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">{currentUser.name}</p>
                    <p className="text-sm text-muted-foreground">Level {currentUser.level}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground">Points</span>
                    <span className="font-bold text-primary">{currentUser.points}</span>
                  </div>
                  <Progress 
                    value={(currentUser.points % 500) / 5} 
                    className="h-2" 
                  />
                  <p className="text-xs text-muted-foreground">
                    {500 - (currentUser.points % 500)} points to next level
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">{currentUser.issuesReported}</p>
                    <p className="text-xs text-muted-foreground">Reported</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-success">{currentUser.issuesResolved}</p>
                    <p className="text-xs text-muted-foreground">Resolved</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="bg-card border-card-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-warning" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {achievements.map((achievement) => (
                  <div 
                    key={achievement.id} 
                    className={`p-3 rounded-lg border transition-all duration-200 ${
                      achievement.unlocked 
                        ? "bg-success/10 border-success/20" 
                        : "bg-background-secondary border-border hover:bg-card-hover"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <achievement.icon 
                        className={`w-6 h-6 ${
                          achievement.unlocked ? "text-success" : achievement.color
                        }`} 
                      />
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium ${
                          achievement.unlocked ? "text-success" : "text-foreground"
                        }`}>
                          {achievement.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {achievement.description}
                        </p>
                        {achievement.progress !== undefined && (
                          <div className="mt-1">
                            <Progress 
                              value={(achievement.progress / achievement.maxProgress!) * 100} 
                              className="h-1"
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                              {achievement.progress}/{achievement.maxProgress}
                            </p>
                          </div>
                        )}
                      </div>
                      {achievement.unlocked && (
                        <Badge variant="outline" className="text-success border-success/20 bg-success/10">
                          Unlocked
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Contributors */}
          <Card className="bg-card border-card-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Top Contributors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockUsers.slice(0, 5).map((user) => (
                  <div 
                    key={user.id}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                      user.rank <= 3 
                        ? "bg-gradient-to-r from-primary/10 to-transparent border border-primary/20" 
                        : "hover:bg-background-secondary"
                    }`}
                  >
                    <div className="flex items-center justify-center w-8">
                      {getRankIcon(user.rank)}
                    </div>
                    
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm">{user.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Level {user.level} • {user.issuesReported} reports
                      </p>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-bold text-primary text-sm">{user.points}</p>
                      <p className="text-xs text-muted-foreground">points</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}