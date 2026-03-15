import * as React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/query-client";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { Dashboard } from "./pages/Dashboard";
import { TabId } from "./components/layout/Sidebar";
import { AmbassadorAccountability } from "./pages/AmbassadorAccountability";
import { Programs } from "./pages/Programs";
import { Projects } from "./pages/Projects";
import { Partnerships } from "./pages/Partnerships";
import { GrowthMetrics } from "./pages/GrowthMetrics";
import { Roadmap } from "./pages/Roadmap";
import { KnowledgeBase } from "./pages/KnowledgeBase";
import { AlertCircle, GraduationCap, Users, BookOpen } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = React.useState<TabId>("dashboard");
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard": return <Dashboard />;
      case "programs": return <Programs />;
      case "projects": return <Projects />;
      case "partnerships": return <Partnerships />;
      case "growth": return <GrowthMetrics />;
      case "roadmap": return <Roadmap />;
      case "knowledge": return <KnowledgeBase />;
      case "accountability": return <AmbassadorAccountability />;
      case "universities":
        return (
          <div className="flex flex-col items-center justify-center h-96 text-zinc-500 animate-in fade-in duration-500">
            <GraduationCap className="h-12 w-12 mb-4 opacity-20" />
            <h2 className="text-xl font-semibold dark:text-zinc-300">University Directory</h2>
            <p>Detailed university profiles and coverage metrics are being populated.</p>
          </div>
        );
      case "ambassadors":
        return (
          <div className="flex flex-col items-center justify-center h-96 text-zinc-500 animate-in fade-in duration-500">
            <Users className="h-12 w-12 mb-4 opacity-20" />
            <h2 className="text-xl font-semibold dark:text-zinc-300">Ambassador Network</h2>
            <p>Manage your global network of student ambassadors.</p>
          </div>
        );
      case "content":
        return (
          <div className="flex flex-col items-center justify-center h-96 text-zinc-500 animate-in fade-in duration-500">
            <BookOpen className="h-12 w-12 mb-4 opacity-20" />
            <h2 className="text-xl font-semibold dark:text-zinc-300">Content Library</h2>
            <p>Track module performance and distribution metrics.</p>
          </div>
        );
      case "alerts":
        return (
          <div className="flex flex-col items-center justify-center h-96 text-zinc-500 animate-in fade-in duration-500">
            <AlertCircle className="h-12 w-12 mb-4 opacity-20" />
            <h2 className="text-xl font-semibold dark:text-zinc-300">System Alerts</h2>
            <p>No critical alerts at this time. Everything is running smoothly.</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <DashboardLayout 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        isDark={isDark}
        toggleTheme={toggleTheme}
      >
        {renderContent()}
      </DashboardLayout>
    </QueryClientProvider>
  );
}
