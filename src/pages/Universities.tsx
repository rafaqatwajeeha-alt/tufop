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
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">University Directory</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">Status and coverage of participating institutions.</p>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input 
            placeholder="Filter by name..." 
            className="pl-10 dark:bg-zinc-900 dark:border-zinc-800 dark:text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((uni) => (
          <Card key={uni.id} className="dark:bg-zinc-900/50 hover:shadow-lg transition-all border-t-2 border-t-emerald-500">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                  <Building2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
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
                <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full rounded-full" 
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
