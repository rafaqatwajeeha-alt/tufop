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
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.projects.map((project) => (
          <Card key={project.id} className="dark:bg-zinc-900/50 hover:border-blue-500/50 transition-colors">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <Badge variant={project.priority === 'High' ? 'destructive' : 'warning'} className="text-[10px]">
                  {project.priority} Priority
                </Badge>
                <Badge variant="secondary" className="text-[10px]">{project.status}</Badge>
              </div>
              <CardTitle className="text-lg mt-2 dark:text-white">{project.name}</CardTitle>
              <p className="text-xs text-zinc-500 line-clamp-2">{project.objective}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-500">Progress</span>
                  <span className="font-bold dark:text-zinc-300">{project.progress}%</span>
                </div>
                <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-blue-600 h-full rounded-full transition-all duration-500" 
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
                <div className="text-xs dark:text-zinc-300 flex items-center gap-2">
                  <Flag className="h-3 w-3 text-blue-500" />
                  {project.milestones}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
