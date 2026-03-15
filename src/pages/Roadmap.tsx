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
      <div>
        <h1 className="text-2xl font-bold dark:text-white">Strategic Roadmap</h1>
        <p className="text-sm text-zinc-500">Long-term planning and goal tracking.</p>
      </div>

      <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-zinc-200 dark:before:via-zinc-800 before:to-transparent">
        {data?.roadmap.map((item, idx) => (
          <div key={item.id} className={cn(
            "relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group",
            idx % 2 === 0 ? "is-active" : ""
          )}>
            {/* Icon */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white dark:border-zinc-950 bg-zinc-100 dark:bg-zinc-900 text-zinc-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
              <Flag className="h-4 w-4 text-blue-500" />
            </div>

            {/* Content */}
            <Card className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 dark:bg-zinc-900/50">
              <div className="flex items-center justify-between mb-2">
                <div className="text-[10px] font-bold uppercase tracking-widest text-blue-500">{item.term}</div>
                <Badge variant={item.status === 'In Progress' ? 'warning' : 'secondary'} className="text-[8px]">
                  {item.status}
                </Badge>
              </div>
              <h3 className="font-bold dark:text-white mb-2">{item.goal}</h3>
              <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t dark:border-zinc-800">
                <div className="flex items-center gap-1 text-[10px] text-zinc-500">
                  <Calendar className="h-3 w-3" />
                  {item.timeline}
                </div>
                <div className="flex items-center gap-1 text-[10px] text-zinc-500">
                  <Flag className="h-3 w-3" />
                  {item.priority} Priority
                </div>
                <div className="flex items-center gap-1 text-[10px] text-zinc-500">
                  <Clock className="h-3 w-3" />
                  {item.owner}
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
