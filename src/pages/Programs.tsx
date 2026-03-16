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
          <span className="chic-sub mb-1 block">Operational Protocol</span>
          <h1 className="text-4xl chic-heading mb-2">Programs & Initiatives</h1>
          <p className="chic-text-muted">Strategic management of TUFOP mentorship cohorts and archives.</p>
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
            <TableRow className="border-white/10">
              <TableHead className="chic-table-head">Program Name</TableHead>
              <TableHead className="chic-table-head">Category</TableHead>
              <TableHead className="chic-table-head">Lead</TableHead>
              <TableHead className="chic-table-head">Timeline</TableHead>
              <TableHead className="chic-table-head">Participants</TableHead>
              <TableHead className="chic-table-head">Status</TableHead>
              <TableHead className="text-right chic-table-head">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.programs.map((prog) => (
              <TableRow key={prog.id} className="border-white/5 hover:bg-white/5 transition-colors">
                <TableCell className="font-extrabold text-white tracking-tight">{prog.name}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-300 border-none px-3 py-1 text-[9px] font-black uppercase tracking-widest">{prog.category}</Badge>
                </TableCell>
                <TableCell className="text-zinc-300 font-medium">{prog.lead}</TableCell>
                <TableCell className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                  {prog.start} - {prog.end}
                </TableCell>
                <TableCell className="text-white font-black">{prog.participants}</TableCell>
                <TableCell>
                  <Badge variant={prog.status === 'active' ? 'success' : prog.status === 'planned' ? 'warning' : 'secondary'} className="px-3 py-1 font-black uppercase tracking-widest text-[9px]">
                    {prog.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="h-10 w-10 text-zinc-400 hover:text-white hover:bg-emerald-500/20 rounded-xl transition-all"><MoreVertical className="h-5 w-5" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </motion.div>
  );
}
