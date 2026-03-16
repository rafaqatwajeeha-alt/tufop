import * as React from "react";
import { Plus, Target, User, Calendar, Flag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { useDashboardData } from "../hooks/useDashboardData";
import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";

export function Projects() {
  const { data } = useDashboardData();

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold dark:text-white">Strategic Projects</h1>
          <p className="text-sm text-zinc-500">Track major initiatives and milestones.</p>
        </div>
        <Button size="sm" className="bg-white text-[#6DC7B8] font-black rounded-xl">
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.projects.map((project) => (
          <Card key={project.id} className="chic-glass chic-border rounded-[32px] overflow-hidden group hover:scale-[1.02] transition-all duration-500 cursor-pointer border-white/5">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <Badge variant="secondary" className="bg-white/20 text-white border-none px-2 py-0.5 text-[8px] font-black uppercase tracking-widest">
                  {project.priority} Priority
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-none px-2 py-0.5 text-[8px] font-black uppercase tracking-widest">{project.status}</Badge>
              </div>
              <CardTitle className="text-xl font-black text-white mt-2 tracking-tight">{project.name}</CardTitle>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mt-1">{project.objective}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest leading-none mb-1">
                  <span className="text-white/50">Progress</span>
                  <span className="text-white">{project.progress}%</span>
                </div>
                <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden border border-white/10">
                  <div 
                    className="bg-[#6DC7B8] h-full rounded-full transition-all duration-500 shadow-[0_0_15px_rgba(109,199,184,0.4)]" 
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <User className="h-3 w-3" />
                  {project.owner}
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <Calendar className="h-3 w-3" />
                  {project.deadline}
                </div>
              </div>

              <div className="pt-2">
                <div className="text-[10px] font-bold uppercase text-zinc-400 mb-1">Current Milestone</div>
                <div className="text-xs text-white/80 flex items-center gap-2">
                  <Flag className="h-3.5 w-3.5 text-white" />
                  <span className="text-white font-black">{project.milestones}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
