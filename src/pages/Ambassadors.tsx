import * as React from "react";
import { Users, Mail, Phone, MapPin, Search, Trophy, Medal, Star } from "lucide-react";
import { cn } from "../lib/utils";
import { useDashboardData } from "../hooks/useDashboardData";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { motion } from "motion/react";

export function Ambassadors() {
  const { data } = useDashboardData();
  const [search, setSearch] = React.useState("");
  const [viewType, setViewType] = React.useState<'grid' | 'leaderboard'>('leaderboard');

  const filtered = [...(data?.ambassadors || [])]
    .filter(a => {
      const name = a.name || "";
      const uni = a.university || "";
      return name.toLowerCase().includes(search.toLowerCase()) || 
             uni.toLowerCase().includes(search.toLowerCase());
    })
    .sort((a, b) => (b.taskCompletion || 0) - (a.taskCompletion || 0));

  const getRankBadge = (index: number) => {
    if (index === 0) return (
      <div className="flex items-center gap-2">
        <Trophy className="h-5 w-5 text-amber-500 fill-amber-500/10" />
        <span className="text-[10px] font-black uppercase tracking-widest text-amber-500">Top Performer</span>
      </div>
    );
    if (index === 1) return (
      <div className="flex items-center gap-2">
        <Medal className="h-5 w-5 text-zinc-400 fill-zinc-400/10" />
        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Silver Rank</span>
      </div>
    );
    if (index === 2) return (
      <div className="flex items-center gap-2">
        <Medal className="h-5 w-5 text-amber-700 fill-amber-700/10" />
        <span className="text-[10px] font-black uppercase tracking-widest text-amber-700">Bronze Rank</span>
      </div>
    );
    return <span className="text-xs font-bold text-zinc-400">#{index + 1}</span>;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex items-end justify-between">
        <div className="flex flex-col">
          <span className="chic-sub mb-1 block">Institutional Hub Control</span>
          <h1 className="text-4xl chic-heading mb-2">Asset Grid</h1>
          <p className="chic-text-muted">Strategic management and real-time connectivity with your global student representative network.</p>
        </div>
        <div className="flex gap-2">
          <div className="flex bg-white/10 dark:bg-white/5 p-1 rounded-2xl border border-white/10">
            <Button 
              variant={viewType === 'grid' ? 'secondary' : 'ghost'} 
              size="sm" 
              onClick={() => setViewType('grid')}
              className="text-xs h-8"
            >
              Network View
            </Button>
            <Button 
              variant={viewType === 'leaderboard' ? 'secondary' : 'ghost'} 
              size="sm" 
              onClick={() => setViewType('leaderboard')}
              className="text-xs h-8"
            >
              Leaderboard
            </Button>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <Input 
              placeholder="Search ambassadors..." 
              className="pl-10 dark:bg-zinc-900 dark:border-zinc-800 dark:text-white h-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((amb, index) => (
          <Card key={amb.id} className={cn(
            "group relative overflow-hidden transition-all duration-500",
            index === 0 && viewType === 'leaderboard' ? " ring-4 ring-white/30" : ""
          )}>
            {index === 0 && viewType === 'leaderboard' && (
              <div className="absolute top-0 right-0 p-2 bg-amber-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-bl-lg flex items-center gap-1 shadow-lg">
                <Star className="h-3 w-3 fill-white" />
                Top Performer
              </div>
            )}
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <div className="h-14 w-14 rounded-2xl bg-white/20 flex items-center justify-center text-white font-black text-xl border border-white/30">
                    {(amb.name || "A").split(' ').map((n: string) => n[0]).join('')}
                  </div>
                  {viewType === 'leaderboard' && (
                    <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 shadow-sm border border-white/30">
                      {getRankBadge(index)}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-black text-white transition-colors tracking-tighter leading-none">{amb.name}</h3>
                  <p className="text-[10px] font-black text-white/60 uppercase tracking-widest mt-2">{amb.university}</p>
                </div>
                <Badge className="ml-auto bg-white/20 text-white border-white/30" variant="secondary">
                  {amb.status}
                </Badge>
              </div>
              
              <div className="space-y-4 mt-8 border-t border-white/20 pt-6">
                <div className="flex items-center gap-2 text-[10px] text-white/80 font-black uppercase tracking-widest">
                  <MapPin className="h-4 w-4 text-white" />
                   Strategic Hub Operations
                </div>
                <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden border border-white/20">
                  <div 
                    className="bg-[#6DC7B8] h-full rounded-full shadow-[0_0_8px_rgba(109,199,184,0.5)]" 
                    style={{ width: `${amb.taskCompletion}%` }} 
                  />
                </div>
                <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-white/80">
                  <span>Elite Engagement Matrix</span>
                  <span className="text-white">{amb.taskCompletion}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 bg-white/5 rounded-[40px] border-2 border-dashed border-white/10">
          <Users className="h-16 w-16 mx-auto text-white/10 mb-4" />
          <h3 className="text-xl font-black text-white mb-2">No Ambassadors Found</h3>
          <p className="text-zinc-500 font-black uppercase tracking-[0.2em] text-sm">No Strategic Assets Found</p>
        </div>
      )}
    </motion.div>
  );
}
