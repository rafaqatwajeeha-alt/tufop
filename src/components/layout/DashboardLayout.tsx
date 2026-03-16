import { ReactNode } from "react";
import { Sidebar, TabId } from "./Sidebar";
import { TopBar } from "./TopBar";
import { motion } from "motion/react";

interface DashboardLayoutProps {
  children: ReactNode;
  activeTab: TabId;
  setActiveTab: (id: TabId) => void;
  isDark: boolean;
  toggleTheme: () => void;
  userRole?: string;
}

export function DashboardLayout({ children, activeTab, setActiveTab, isDark, toggleTheme, userRole }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-[#020617] relative overflow-hidden transition-colors selection:bg-emerald-500/20">
      {/* --- DASHBOARD BACKGROUND (Extra Cool) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/5 blur-[120px] rounded-full animate-float opacity-50" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full animate-float-delayed opacity-50" />
      </div>

      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} userRole={userRole} />
      
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        <TopBar isDark={isDark} toggleTheme={toggleTheme} />
        <main className="p-8 lg:p-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
