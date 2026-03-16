import * as React from "react";
import { Handshake, Globe, ExternalLink, ArrowUpRight, Plus, Search, Filter, Cpu, Target, Share2, Mail } from "lucide-react";
import { Card, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useDashboardData } from "../hooks/useDashboardData";
import { motion, AnimatePresence } from "motion/react";

export function Partnerships() {
  const { data, loading } = useDashboardData();
  const [searchQuery, setSearchQuery] = React.useState("");

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">Synchronizing Global Grid...</p>
        </div>
      </div>
    );
  }

  const filteredPartners = (data?.partnerships || []).filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.sector.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.div variants={itemAnim}>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white/10 rounded-lg border border-white/20 shadow-lg shadow-white/5">
              <Handshake className="w-5 h-5 text-white" />
            </div>
            <span className="chic-sub text-white/60 tracking-[0.4em]">Collaborative Network</span>
          </div>
          <h1 className="text-5xl chic-heading mb-3">Global Alliances</h1>
          <p className="chic-text-muted">Strategic Institutional Alignments & Global Medical Ecosystems.</p>
        </motion.div>
        
        <motion.div variants={itemAnim} className="flex gap-3">
          <Button className="bg-white text-[#6DC7B8] hover:bg-white/90 font-black rounded-2xl px-6 h-12 shadow-xl shadow-white/5 transition-all hover:scale-105 active:scale-95">
            <Plus className="h-5 w-5 mr-2" />
            New Alliance
          </Button>
        </motion.div>
      </div>

      <motion.div variants={itemAnim} className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500 group-focus-within:text-blue-400 transition-colors" />
          <Input 
            className="pl-14 h-16 chic-glass chic-border rounded-[24px] text-white placeholder:text-white/40 focus:ring-white/10 text-lg tracking-tight border-white/10" 
            placeholder="Search alliance database..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="h-16 px-8 rounded-[24px] chic-glass chic-border text-zinc-400 hover:text-white hover:bg-white/5 border-white/5 font-black uppercase tracking-widest text-[10px]">
          <Share2 className="h-4 w-4 mr-2" />
          Broadcast Interest
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredPartners.map((item) => (
            <motion.div 
              layout
              key={item.id} 
              variants={itemAnim}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <Card className="group chic-glass chic-border rounded-[32px] overflow-hidden hover:scale-[1.02] transition-all duration-500 cursor-pointer h-full border-white/5 relative">
                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-4 bg-white/10 rounded-2xl border border-white/10 group-hover:bg-white/20 group-hover:border-white/30 transition-all duration-500">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <Badge variant={item.status === 'Active' || item.status === 'Confirmed' ? 'success' : 'secondary'} className="px-3 py-1 text-[8px] font-black uppercase tracking-widest rounded-full border-none">
                      {item.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                         <span className="chic-label text-blue-400/80 block mb-2">{item.sector}</span>
                         <h3 className="text-3xl font-black text-white tracking-tighter leading-tight group-hover:text-blue-400 transition-colors duration-300">
                           {item.name}
                         </h3>
                         <p className="text-[11px] font-black text-zinc-400 uppercase tracking-widest mt-2">{item.organization}</p>
                    </div>

                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                        <div className="flex items-center gap-2 mb-2">
                           <Target className="w-3 h-3 text-zinc-500" />
                           <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Protocol</span>
                        </div>
                        <p className="text-white font-bold text-xs tracking-tight line-clamp-2 leading-relaxed">
                           Strategic institutional alignment for medical excellence and pathway optimization.
                        </p>
                    </div>

                    <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                           <Mail className="h-4 w-4 text-zinc-400" />
                           <span className="text-[10px] font-black text-zinc-300 uppercase tracking-widest truncate max-w-[100px]">{item.contact}</span>
                        </div>
                        <Badge variant="secondary" className="bg-white/20 text-white text-[9px] font-black uppercase tracking-widest border-none px-3 py-1">{item.type}</Badge>
                      </div>
                      <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl bg-white/5 opacity-0 group-hover:opacity-100 transition-all hover:bg-white/20 text-white border border-white/5">
                        <ArrowUpRight className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredPartners.length === 0 && (
        <div className="text-center py-20 chic-glass rounded-[40px] border-2 border-dashed border-white/5">
          <Handshake className="h-16 w-16 mx-auto text-white/10 mb-4" />
          <p className="text-zinc-600 font-black uppercase tracking-[0.3em] text-xs">No strategic alliances found</p>
        </div>
      )}
    </motion.div>
  );
}
