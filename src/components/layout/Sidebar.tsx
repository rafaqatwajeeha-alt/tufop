import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  BookOpen, 
  Settings, 
  LogOut, 
  Bell, 
  ShieldCheck,
  Briefcase,
  Target,
  Handshake,
  BarChart3,
  Map,
  Library,
  Heart
} from "lucide-react";
import { cn } from "../../lib/utils";
import { useAuth } from "../../lib/AuthContext";

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
    title: "Overview",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
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
    title: "Strategy & Resources",
    items: [
      { icon: Map, label: "Roadmap", id: "roadmap" },
      { icon: Library, label: "Knowledge Base", id: "knowledge" },
      { icon: ShieldCheck, label: "Accountability", id: "accountability" },
      { icon: BookOpen, label: "Content", id: "content" },
    ]
  },
  {
    title: "Community",
    items: [
      { icon: Heart, label: "Meet the Team", id: "team" },
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

  // Filter sections based on role
  const filteredSections = navSections.map(section => ({
    ...section,
    items: section.items.filter(item => {
      if (userRole === 'admin') return true;
      // Ambassadors can only see these
      const allowed = ['ambassadors', 'accountability', 'content'];
      return allowed.includes(item.id);
    })
  })).filter(section => section.items.length > 0);

  return (
    <aside className="w-64 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col h-screen sticky top-0 transition-colors overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-zinc-900 dark:bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">T</span>
          </div>
          <span className="font-bold text-xl tracking-tight dark:text-white">TUFOp</span>
        </div>

        <div className="space-y-6">
          {filteredSections.map((section) => (
            <div key={section.title}>
              <h3 className="px-3 text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-600 mb-2">
                {section.title}
              </h3>
              <nav className="space-y-1">
                {section.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
                      activeTab === item.id
                        ? "bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-sm border dark:border-zinc-800" 
                        : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                    )}
                  >
                    <item.icon className={cn("h-4 w-4", activeTab === item.id ? "text-zinc-900 dark:text-blue-500" : "text-zinc-400")} />
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto p-6 border-t border-zinc-100 dark:border-zinc-900">
        <nav className="space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900">
            <Settings className="h-4 w-4" />
            Settings
          </button>
          <button 
            onClick={() => signOut()}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </nav>
      </div>
    </aside>
  );
}

