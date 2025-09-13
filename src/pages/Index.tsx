import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { IssueMap } from "@/components/dashboard/IssueMap";
import { IssuesList } from "@/components/dashboard/IssuesList";

const Index = () => {
  const [selectedIssue, setSelectedIssue] = useState(null);

  const handleIssueSelect = (issue: any) => {
    setSelectedIssue(issue);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome to CityPulse
          </h1>
          <p className="text-muted-foreground">
            Monitor and report civic issues in your community
          </p>
        </div>
        
        <DashboardStats />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px]">
          <IssueMap 
            selectedIssue={selectedIssue}
            onIssueSelect={handleIssueSelect}
          />
          <IssuesList
            selectedIssue={selectedIssue}
            onIssueSelect={handleIssueSelect}
          />
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
