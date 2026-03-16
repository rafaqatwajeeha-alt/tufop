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
import { AuthProvider, useAuth } from "./lib/AuthContext";
import { AlertCircle, GraduationCap, Users, BookOpen, Heart } from "lucide-react";
import { Ambassadors } from "./pages/Ambassadors";
import { Universities } from "./pages/Universities";
import { Team } from "./pages/Team";
import { Management } from "./pages/Management";
import { LoginPage } from "./pages/LoginPage";
import { ErrorBoundary } from "./components/ErrorBoundary";

function AppContent() {
  const { session, profile, loading } = useAuth();
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="h-8 w-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) {
    return <LoginPage />;
  }

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
      case "universities": return <Universities />;
      case "ambassadors": return <Ambassadors />;
      case "management": return <Management />;
      case "team": return <Team />;
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
    <DashboardLayout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab}
      isDark={isDark}
      toggleTheme={toggleTheme}
      userRole={profile?.role}
    >
      {renderContent()}
    </DashboardLayout>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ErrorBoundary>
          <AppContent />
        </ErrorBoundary>
      </AuthProvider>
    </QueryClientProvider>
  );
}

