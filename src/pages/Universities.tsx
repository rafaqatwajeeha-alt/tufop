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
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60 mb-1">Institutional Network</span>
          <h1 className="text-4xl chic-heading mb-2">University Hubs</h1>
          <p className="text-zinc-500 font-medium">Coverage and status of participating medical institutions.</p>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input 
            placeholder="Filter by name..." 
            className="pl-14 h-14 chic-glass chic-border rounded-[20px] text-white placeholder:text-white/40 focus:ring-white/10"
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
                <div className="p-2.5 bg-[#6DC7B8]/10 rounded-xl border border-[#6DC7B8]/20">
                  <Building2 className="h-6 w-6 text-[#6DC7B8]" />
                </div>
                <Badge variant="secondary" className="bg-[#6DC7B8]/20 text-white border-none px-3 py-1 text-[9px] font-black uppercase tracking-widest">
                  {uni.status}
                </Badge>
              </div>
              
              <h3 className="text-xl font-black text-white tracking-tight mb-1">{uni.name}</h3>
              <div className="flex items-center gap-2 text-xs text-zinc-500 mb-6">
                <MapPin className="h-3 w-3" />
                Pakistan Operations
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest leading-none mb-1">
                  <span className="text-white/60">Platform Coverage</span>
                  <span className="text-white">{uni.coverage}%</span>
                </div>
                <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden border border-white/10">
                  <div 
                    className="bg-[#6DC7B8] h-full rounded-full transition-all duration-500 shadow-[0_0_15px_rgba(109,199,184,0.4)]" 
                    style={{ width: `${uni.progress}%` }} 
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
