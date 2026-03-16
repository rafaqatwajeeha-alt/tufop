import * as React from "react";
import { Plus, Search, Filter, MoreVertical, Briefcase, Users, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/Table";
import { Input } from "../components/ui/Input";
import { useDashboardData } from "../hooks/useDashboardData";
import { motion } from "motion/react";

export function Programs() {
  const { data, loading } = useDashboardData();

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold dark:text-white">Programs & Initiatives</h1>
          <p className="text-sm text-zinc-500">Manage mentorship cohorts, podcasts, and workshops.</p>
        </div>
        <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold h-10 px-6 rounded-xl">
          <Plus className="h-4 w-4 mr-2" />
          Create Program
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input className="pl-10 bg-emerald-500/5 border-white/5 text-white placeholder:text-zinc-600 focus:border-emerald-500/50 focus:ring-emerald-500/20 rounded-xl" placeholder="Search programs..." />
        </div>
        <Button variant="outline" size="sm" className="bg-white/5 border-white/5 hover:bg-white/10 text-white rounded-xl h-10 px-4">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      <Card className="dark:bg-zinc-900/50">
        <Table>
          <TableHeader>
            <TableRow className="dark:border-zinc-800">
              <TableHead>Program Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Lead</TableHead>
              <TableHead>Timeline</TableHead>
              <TableHead>Participants</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.programs.map((prog) => (
              <TableRow key={prog.id} className="dark:border-zinc-800">
                <TableCell className="font-medium dark:text-zinc-200">{prog.name}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="text-[10px]">{prog.category}</Badge>
                </TableCell>
                <TableCell className="dark:text-zinc-400">{prog.lead}</TableCell>
                <TableCell className="text-xs dark:text-zinc-500">
                  {prog.start} - {prog.end}
                </TableCell>
                <TableCell className="dark:text-zinc-400">{prog.participants}</TableCell>
                <TableCell>
                  <Badge variant={prog.status === 'active' ? 'success' : prog.status === 'planned' ? 'warning' : 'secondary'}>
                    {prog.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </motion.div>
  );
}
