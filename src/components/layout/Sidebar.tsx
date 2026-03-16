import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  BookOpen, 
  Settings, 
  LogOut, 
  ShieldCheck,
  Briefcase,
  Target,
  Handshake,
  BarChart3,
  Map,
  Library,
  Heart,
  Activity,
  ChevronRight
} from "lucide-react";
import { cn } from "../../lib/utils";
import { useAuth } from "../../lib/AuthContext";
import * as React from "react";

export type TabId = 
  | "dashboard" 
  | "programs"
  | "projects"
  | "universities" 
  | "ambassadors" 
  | "partnerships"
  | "growth"
  | "roadmap"
  | "knowledge"
  | "accountability" 
  | "content" 
  | "alerts"
  | "management"
  | "team";

interface NavSection {
  title: string;
  items: { icon: any, label: string, id: TabId }[];
}

const navSections: NavSection[] = [
  {
    title: "Intelligence",
    items: [
      { icon: LayoutDashboard, label: "Command Center", id: "dashboard" },
      { icon: BarChart3, label: "Growth Metrics", id: "growth" },
      { icon: ShieldCheck, label: "User Management", id: "management" },
    ]
  },
  {
    title: "Operations",
    items: [
      { icon: Briefcase, label: "Programs", id: "programs" },
      { icon: Target, label: "Projects", id: "projects" },
      { icon: GraduationCap, label: "Universities", id: "universities" },
      { icon: Users, label: "Ambassadors", id: "ambassadors" },
      { icon: Handshake, label: "Partnerships", id: "partnerships" },
    ]
  },
  {
    title: "Strategy & Assets",
    items: [
      { icon: Map, label: "Roadmap", id: "roadmap" },
      { icon: Library, label: "Knowledge Base", id: "knowledge" },
      { icon: ShieldCheck, label: "Accountability", id: "accountability" },
      { icon: BookOpen, label: "Content Library", id: "content" },
    ]
  },
  {
    title: "Network",
    items: [
      { icon: Heart, label: "Official Team", id: "team" },
    ]
  }
];

interface SidebarProps {
  activeTab: TabId;
  setActiveTab: (id: TabId) => void;
  userRole?: string;
}

export function Sidebar({ activeTab, setActiveTab, userRole }: SidebarProps) {
  const { signOut } = useAuth();

  const filteredSections = navSections.map(section => ({
    ...section,
    items: section.items.filter(item => {
      if (userRole === 'admin') return true;
      const allowed = ['ambassadors', 'accountability', 'content'];
      return allowed.includes(item.id);
    })
  })).filter(section => section.items.length > 0);

  return (
    <aside className="w-72 border-r border-white/5 bg-zinc-950/40 backdrop-blur-3xl flex flex-col h-screen sticky top-0 transition-all overflow-y-auto custom-scrollbar z-50">
      {/* --- OFFICIAL TUFOP LOGO SECTION --- */}
      <div className="p-8 pb-4">
        <div className="flex flex-col gap-4 mb-4">
          <div className="flex flex-col">
            <h1 className="text-sm font-black text-white tracking-[0.2em] leading-tight">USMLE FORUM</h1>
            <p className="text-[10px] font-black text-emerald-500 tracking-[0.4em] mt-1 uppercase">Pakistan</p>
          </div>
          <div className="h-px w-full bg-gradient-to-r from-emerald-500/40 to-transparent opacity-30" />
        </div>

        <div className="space-y-8 mt-8">
          {filteredSections.map((section) => (
            <div key={section.title}>
              <h3 className="px-4 text-[9px] font-black uppercase tracking-[0.25em] text-zinc-500/60 mb-3 ml-1">
                {section.title}
              </h3>
              <nav className="space-y-1.5">
                {section.items.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={cn(
                        "w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all duration-300 group",
                        isActive
                          ? "bg-white text-zinc-950 shadow-xl shadow-white/5" 
                          : "text-zinc-500 hover:text-white hover:bg-white/5"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className={cn(
                          "h-5 w-5 transition-colors",
                          isActive ? "text-emerald-600" : "text-zinc-600 group-hover:text-zinc-400"
                        )} />
                        <span className="tracking-tight">{item.label}</span>
                      </div>
                      {isActive && <ChevronRight className="h-4 w-4 text-zinc-400" />}
                    </button>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto p-8 border-t border-white/5 bg-zinc-950/20">
        <nav className="space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-zinc-500 hover:text-white hover:bg-white/5 transition-colors">
            <Settings className="h-5 w-5" />
            System Control
          </button>
          <button 
            onClick={() => signOut()}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20"
          >
            <LogOut className="h-5 w-5" />
            Terminate Session
          </button>
        </nav>
        
        <div className="mt-6 flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/5 border border-white/5">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">System Nominal</span>
        </div>
      </div>
    </aside>
  );
}
