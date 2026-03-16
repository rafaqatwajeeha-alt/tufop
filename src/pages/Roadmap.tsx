import * as React from "react";
import { Map, Flag, CheckCircle2, Clock, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { useDashboardData } from "../hooks/useDashboardData";
import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";

export function Roadmap() {
  const { data } = useDashboardData();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <motion.div>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-mint-500/10 rounded-lg border border-mint-500/20">
            <Map className="w-5 h-5 text-mint-500" />
          </div>
          <span className="chic-sub">Strategic Trajectory</span>
        </div>
        <h1 className="text-4xl chic-heading mb-2">Protocol Roadmap</h1>
        <p className="chic-text-muted">High-fidelity planning and long-term ecosystem goal tracking.</p>
      </motion.div>

      <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-zinc-200 dark:before:via-zinc-800 before:to-transparent">
        {data?.roadmap.map((item, idx) => (
          <div key={item.id} className={cn(
            "relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group",
            idx % 2 === 0 ? "is-active" : ""
          )}>
            {/* Icon */}
            <div className="flex items-center justify-center w-12 h-12 rounded-full border border-mint-500/20 bg-zinc-950 text-white shadow-lg shadow-mint-500/10 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
              <Flag className="h-5 w-5 text-mint-500" />
            </div>

            {/* Content */}
            <Card className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] chic-glass chic-border rounded-[24px] group-hover:scale-[1.02] transition-all duration-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="chic-label text-mint-500/80">{item.term}</div>
                  <Badge variant={item.status === 'In Progress' ? 'success' : 'secondary'} className="text-[9px] px-3 py-1 font-black uppercase tracking-widest rounded-full">
                    {item.status}
                  </Badge>
                </div>
                <h3 className="text-xl font-black text-white tracking-tight mb-4">{item.goal}</h3>
                <div className="flex flex-wrap gap-6 mt-6 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-2 text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                    <Calendar className="h-3.5 w-3.5 text-mint-500" />
                    {item.timeline}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                    <Flag className="h-3.5 w-3.5 text-mint-500" />
                    {item.priority} Priority
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-auto">
                    <div className="w-5 h-5 rounded-full bg-mint-500/10 flex items-center justify-center border border-mint-500/20">
                      <span className="text-[8px] text-mint-500">{item.owner[0]}</span>
                    </div>
                    {item.owner}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
