import * as React from "react";
import { GraduationCap, MapPin, Building2, TrendingUp, Search } from "lucide-react";
import { useDashboardData } from "../hooks/useDashboardData";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Input } from "../components/ui/Input";
import { motion } from "motion/react";

export function Universities() {
  const { data } = useDashboardData();
  const [search, setSearch] = React.useState("");

  const filtered = data?.universities.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase())
  ) || [];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-8"
    >
      <div className="flex items-end justify-between">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500/60 mb-1">Institutional Network</span>
          <h1 className="text-4xl chic-heading mb-2">University Hubs</h1>
          <p className="text-zinc-500 font-medium">Coverage and status of participating medical institutions.</p>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input 
            placeholder="Filter by name..." 
            className="pl-14 h-14 chic-glass chic-border rounded-[20px] text-white placeholder:text-zinc-700 focus:ring-emerald-500/20"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((uni) => (
          <Card key={uni.id} className="chic-glass chic-border rounded-[32px] overflow-hidden group hover:scale-[1.02] transition-all duration-500">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2.5 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                  <Building2 className="h-6 w-6 text-emerald-400" />
                </div>
                <Badge variant={uni.status === 'active' ? 'success' : 'warning'}>
                  {uni.status}
                </Badge>
              </div>
              
              <h3 className="text-lg font-bold dark:text-white mb-1">{uni.name}</h3>
              <div className="flex items-center gap-2 text-xs text-zinc-500 mb-6">
                <MapPin className="h-3 w-3" />
                Pakistan Operations
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-500 font-medium">Platform Coverage</span>
                  <span className="dark:text-white font-bold">{uni.coverage}%</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/5">
                  <div 
                    className="bg-gradient-to-r from-emerald-600 to-emerald-400 h-full rounded-full transition-all duration-1000" 
                    style={{ width: `${uni.coverage}%` }} 
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <GraduationCap className="h-12 w-12 mx-auto text-zinc-300 mb-4 opacity-20" />
          <p className="text-zinc-500">No universities found matching your criteria.</p>
        </div>
      )}
    </motion.div>
  );
}
