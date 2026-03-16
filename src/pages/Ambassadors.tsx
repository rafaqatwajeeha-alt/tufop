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
          <div className="flex bg-emerald-500/5 dark:bg-emerald-950/20 p-1 rounded-2xl border border-white/5">
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
            "group relative overflow-hidden bg-emerald-950/20 backdrop-blur-2xl border-white/5 hover:border-emerald-500/50 transition-all duration-500 rounded-[32px]",
            index === 0 && viewType === 'leaderboard' ? "border-emerald-500/50 bg-emerald-500/10" : ""
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
                  <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 font-black text-xl border border-emerald-500/20">
                    {(amb.name || "A").split(' ').map((n: string) => n[0]).join('')}
                  </div>
                  {viewType === 'leaderboard' && (
                    <div className="absolute -top-1 -right-1 bg-white dark:bg-zinc-900 rounded-full p-0.5 shadow-sm border dark:border-zinc-800">
                      {getRankBadge(index)}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-black text-white group-hover:text-emerald-400 transition-colors tracking-tighter leading-none">{amb.name}</h3>
                  <p className="text-[10px] font-black text-emerald-500/60 uppercase tracking-widest mt-2">{amb.university}</p>
                </div>
                <Badge className="ml-auto" variant={amb.status === 'Active' ? 'success' : 'warning'}>
                  {amb.status}
                </Badge>
              </div>
              
              <div className="space-y-4 mt-8 border-t border-white/10 pt-6">
                <div className="flex items-center gap-2 text-[10px] text-zinc-300 font-black uppercase tracking-widest">
                  <MapPin className="h-4 w-4 text-emerald-500" />
                   Strategic Hub Operations
                </div>
                <div className="w-full bg-white/5 h-3 rounded-full overflow-hidden border border-white/10">
                  <div 
                    className="bg-gradient-to-r from-emerald-600 to-emerald-400 h-full rounded-full shadow-[0_0_20px_rgba(16,185,129,0.3)]" 
                    style={{ width: `${amb.taskCompletion}%` }} 
                  />
                </div>
                <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-emerald-500/80">
                  <span>Elite Engagement Matrix</span>
                  <span className="text-white">{amb.taskCompletion}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 bg-emerald-500/5 rounded-[40px] border-2 border-dashed border-emerald-500/10">
          <Users className="h-16 w-16 mx-auto text-emerald-500/20 mb-4" />
          <p className="text-zinc-500 font-black uppercase tracking-[0.2em] text-sm">No Strategic Assets Found</p>
        </div>
      )}
    </motion.div>
  );
}
