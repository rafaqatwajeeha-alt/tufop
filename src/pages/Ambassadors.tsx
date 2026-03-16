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
    if (index === 0) return <Trophy className="h-5 w-5 text-amber-500 fill-amber-500/10" />;
    if (index === 1) return <Medal className="h-5 w-5 text-zinc-400 fill-zinc-400/10" />;
    if (index === 2) return <Medal className="h-5 w-5 text-amber-700 fill-amber-700/10" />;
    return <span className="text-xs font-bold text-zinc-400">#{index + 1}</span>;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">Ambassador Network</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">Manage and connect with your student representative network.</p>
        </div>
        <div className="flex gap-2">
          <div className="flex bg-zinc-100 dark:bg-zinc-900 p-1 rounded-lg">
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
            "hover:border-zinc-300 dark:hover:border-zinc-700 transition-all cursor-pointer group relative overflow-hidden",
            index === 0 && viewType === 'leaderboard' ? "border-amber-500/50 bg-amber-50/10" : ""
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
                  <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-lg">
                    {(amb.name || "A").split(' ').map((n: string) => n[0]).join('')}
                  </div>
                  {viewType === 'leaderboard' && (
                    <div className="absolute -top-1 -right-1 bg-white dark:bg-zinc-900 rounded-full p-0.5 shadow-sm border dark:border-zinc-800">
                      {getRankBadge(index)}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-bold dark:text-white group-hover:text-blue-500 transition-colors">{amb.name}</h3>
                  <p className="text-xs text-zinc-500">{amb.university}</p>
                </div>
                <Badge className="ml-auto" variant={amb.status === 'Active' ? 'success' : 'warning'}>
                  {amb.status}
                </Badge>
              </div>
              
              <div className="space-y-2 mt-6 border-t dark:border-zinc-800 pt-4">
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <MapPin className="h-3 w-3" />
                   Main Campus
                </div>
                <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full mt-4 overflow-hidden">
                  <div 
                    className="bg-blue-600 h-full rounded-full transition-all duration-1000" 
                    style={{ width: `${amb.taskCompletion}%` }} 
                  />
                </div>
                <div className="flex justify-between text-[10px] font-medium uppercase tracking-wider text-zinc-400">
                  <span>Engagement</span>
                  <span>{amb.taskCompletion}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900/30 rounded-2xl border-2 border-dashed dark:border-zinc-800">
          <Users className="h-12 w-12 mx-auto text-zinc-300 mb-4" />
          <p className="text-zinc-500">No ambassadors found matching your search.</p>
        </div>
      )}
    </motion.div>
  );
}
