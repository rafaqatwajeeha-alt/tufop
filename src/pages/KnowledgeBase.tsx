import * as React from "react";
import { 
  Library, 
  FileText, 
  Plus, 
  Search, 
  Download, 
  ExternalLink, 
  Clock, 
  FileCode, 
  Layout, 
  ChevronRight,
  ArrowUpRight,
  Share2,
  Bookmark,
  Activity
} from "lucide-react";
import { Card, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Dialog } from "../components/ui/Dialog";
import { useDashboardData } from "../hooks/useDashboardData";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";

export function KnowledgeBase() {
  const { data } = useDashboardData();
  const [activeCategory, setActiveCategory] = React.useState("All Resources");
  const [isNewResourceOpen, setIsNewResourceOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  const categories = [
    { name: "All Resources", icon: Library },
    { name: "Internal Guides", icon: FileText },
    { name: "Pathway Info", icon: Layout },
    { name: "Module Plans", icon: FileCode },
    { name: "Documents", icon: Bookmark },
    { name: "FAQs", icon: Share2 }
  ];

  const filteredKnowledge = (data?.knowledge || []).filter(item => {
    const matchesCategory = activeCategory === "All Resources" || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemAnim = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-10 max-w-7xl mx-auto"
    >
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.div variants={itemAnim}>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white/20 rounded-lg border border-white/30">
              <Library className="w-5 h-5 text-white" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">Asset Library</span>
          </div>
          <h1 className="text-4xl chic-heading mb-2">Knowledge Base</h1>
          <p className="text-zinc-500 font-medium mt-1 uppercase tracking-widest text-[10px]">Strategic Documentation & Operational Resources</p>
        </motion.div>
        
        <motion.div variants={itemAnim} className="flex gap-3">
          <Button onClick={() => setIsNewResourceOpen(true)} className="bg-white text-[#6DC7B8] font-black rounded-2xl px-6 h-12 shadow-xl shadow-white/5 transition-all hover:scale-105 active:scale-95">
            <Plus className="h-5 w-5 mr-2" />
            New Asset
          </Button>
        </motion.div>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10">
        {/* --- LEFT SIDEBAR (CHIC TABS) --- */}
        <motion.div variants={itemAnim} className="lg:col-span-3 space-y-8">
          <div className="space-y-2">
            <p className="text-[10px] font-black tracking-[0.2em] text-zinc-600 uppercase mb-4 ml-1">Categories</p>
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={cn(
                  "w-full flex items-center justify-between px-5 py-4 rounded-2xl text-xs font-black transition-all duration-300 group relative overflow-hidden",
                  activeCategory === cat.name
                    ? "bg-white text-[#6DC7B8] shadow-xl" 
                    : "text-white/70 hover:text-white hover:bg-white/10"
                )}
              >
                <div className="flex items-center gap-3 relative z-10">
                  <cat.icon className={cn(
                    "h-4 w-4 transition-colors",
                    activeCategory === cat.name ? "text-[#6DC7B8]" : "text-white/60 group-hover:text-white"
                  )} />
                  <span className="tracking-widest uppercase">{cat.name}</span>
                </div>
                {activeCategory === cat.name && <ChevronRight className="h-4 w-4 text-[#6DC7B8] relative z-10" />}
              </button>
            ))}
          </div>

          <Card className="chic-glass chic-border rounded-3xl p-6 bg-white/5">
             <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-white/80" />
                <span className="text-[10px] font-black text-white/80 uppercase tracking-widest">Recent Activity</span>
             </div>
             <div className="space-y-4">
                {[1,2].map(i => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="w-1 h-8 bg-white/20 rounded-full mt-1" />
                    <div>
                      <p className="text-[11px] font-bold text-white">Pathway Schema v2.4</p>
                      <p className="text-[9px] text-zinc-500 uppercase mt-0.5">Updated 4h ago</p>
                    </div>
                  </div>
                ))}
             </div>
          </Card>
        </motion.div>

        {/* --- MAIN CONTENT AREA --- */}
        <div className="lg:col-span-9 space-y-6">
          <motion.div variants={itemAnim} className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50 group-focus-within:text-white transition-colors" />
            <Input 
              className="pl-14 h-16 chic-glass chic-border rounded-[24px] text-white placeholder:text-white/40 focus:ring-white/20 text-lg tracking-tight" 
              placeholder="Search the neural network..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 flex gap-2">
                <Badge className="bg-white/10 text-white border-none px-3 py-1 text-[9px] font-black uppercase tracking-widest">Cmd + K</Badge>
            </div>
          </motion.div>

          {/* ASSET GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredKnowledge.length > 0 ? (
                filteredKnowledge.map((item, idx) => (
                  <motion.div 
                    layout
                    key={item.id} 
                    variants={itemAnim}
                    initial="hidden"
                    animate="show"
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <Card className="group chic-glass chic-border rounded-[32px] overflow-hidden hover:scale-[1.02] transition-all duration-500 cursor-pointer h-full border-white/5">
                      <CardContent className="p-8">
                        <div className="flex justify-between items-start mb-6">
                          <div className="p-4 bg-white/10 rounded-2xl border border-white/20 group-hover:bg-white/20 transition-all duration-500">
                            <FileCode className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-white/5 opacity-0 group-hover:opacity-100 transition-all hover:bg-white/10">
                              <ArrowUpRight className="h-4 w-4 text-white" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <Badge className="bg-white/20 text-white border-none px-2 py-0.5 text-[8px] font-black uppercase tracking-widest mb-3">
                              {item.category}
                            </Badge>
                            <h3 className="text-xl font-black text-white tracking-tight leading-tight group-hover:text-white/80 transition-colors duration-300">
                              {item.title}
                            </h3>
                            <p className="text-zinc-500 text-xs mt-2 font-medium line-clamp-2 leading-relaxed">
                              {item.description || "Internal resource documentation for strategic operations and system architecture."}
                            </p>
                          </div>

                          <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center overflow-hidden">
                                <Activity className="w-3 h-3 text-blue-400" />
                              </div>
                              <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">v2.1</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-white/60 group-hover:text-white transition-colors duration-300">
                               <Download className="w-3 h-3" />
                               <span className="text-[10px] font-black uppercase tracking-widest">Fetch Asset</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center space-y-4">
                  <div className="inline-flex p-4 rounded-3xl bg-zinc-900 border border-white/5">
                    <Search className="w-10 h-10 text-zinc-700" />
                  </div>
                  <div>
                    <p className="text-white font-black text-xl">No assets found</p>
                    <p className="text-zinc-500 text-sm">Adjust filters to find what you're looking for.</p>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* --- NEW RESOURCE DIALOG --- */}
      <Dialog 
        isOpen={isNewResourceOpen} 
        onClose={() => setIsNewResourceOpen(false)} 
        title="Asset Forge: New Resource"
      >
        <div className="p-1">
          <form className="space-y-6" onSubmit={(e) => {
            e.preventDefault();
            setIsNewResourceOpen(false);
          }}>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Asset Identity</label>
              <Input placeholder="Resource Title..." required className="bg-white/5 border-white/10 h-14 rounded-2xl focus:ring-white/10 text-white" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Classification</label>
                <select className="flex h-14 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/10">
                  {categories.slice(1).map(cat => (
                    <option key={cat.name} className="bg-zinc-900">{cat.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Access Level</label>
                <select className="flex h-14 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/10">
                  <option className="bg-zinc-900">Standard</option>
                  <option className="bg-zinc-900">Confidential</option>
                  <option className="bg-zinc-900">Core Access</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Operational Description</label>
                <textarea 
                  placeholder="Briefly describe the asset's purpose..."
                  className="w-full min-h-[100px] rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/10 placeholder:text-zinc-600"
                />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="ghost" type="button" onClick={() => setIsNewResourceOpen(false)} className="text-zinc-500 hover:text-white rounded-xl">Cancel</Button>
              <Button type="submit" className="bg-white text-[#6DC7B8] font-black rounded-2xl px-8 shadow-xl shadow-white/10">
                Deploy Asset
              </Button>
            </div>
          </form>
        </div>
      </Dialog>
    </motion.div>
  );
}
