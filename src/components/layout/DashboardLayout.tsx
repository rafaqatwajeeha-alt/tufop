import { ReactNode } from "react";
import { Sidebar, TabId } from "./Sidebar";
import { TopBar } from "./TopBar";

interface DashboardLayoutProps {
  children: ReactNode;
  activeTab: TabId;
  setActiveTab: (id: TabId) => void;
  isDark: boolean;
  toggleTheme: () => void;
}

export function DashboardLayout({ children, activeTab, setActiveTab, isDark, toggleTheme }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-zinc-50/50 dark:bg-zinc-950 transition-colors">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar isDark={isDark} toggleTheme={toggleTheme} />
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
