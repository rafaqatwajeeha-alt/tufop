import * as React from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Plus, 
  AlertTriangle, 
  CheckCircle2, 
  Clock,
  MoreHorizontal,
  Filter,
  Download
} from "lucide-react";
import { useDashboardData } from "../hooks/useDashboardData";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/Table";
import { Dialog } from "../components/ui/Dialog";
import { Input } from "../components/ui/Input";
import { cn } from "../lib/utils";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area
} from "recharts";

import { useToast, ToastContainer } from "../components/ui/Toast";

import { motion } from "motion/react";

export function Dashboard() {
  const { data, isLoading, error } = useDashboardData();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { toasts, toast } = useToast();

  if (isLoading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-32 bg-zinc-200 dark:bg-zinc-800 rounded-xl"></div>
          ))}
        </div>
        <div className="h-96 bg-zinc-200 dark:bg-zinc-800 rounded-xl"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-xl font-semibold dark:text-white">Failed to load dashboard</h2>
        <p className="text-zinc-500 dark:text-zinc-400 mt-2">Please check your connection and try again.</p>
        <Button className="mt-4" onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 max-w-7xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">Operations Overview</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">Platform status and strategic growth metrics.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="dark:border-zinc-800 dark:text-zinc-300">
            <Download className="h-4 w-4 mr-2" />
            Report
          </Button>
          <Button size="sm" onClick={() => setIsModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Initiative
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data?.kpis.map((kpi, idx) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 border-l-4 border-l-blue-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                  {kpi.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline justify-between">
                  <div className="text-2xl font-bold dark:text-white">{kpi.value}</div>
                  <div className={cn(
                    "flex items-center text-xs font-medium px-1.5 py-0.5 rounded",
                    kpi.trend === 'up' ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20" : kpi.trend === 'down' ? "text-red-600 bg-red-50 dark:bg-red-900/20" : "text-zinc-500 bg-zinc-50 dark:bg-zinc-900/20"
                  )}>
                    {kpi.trend === 'up' && <TrendingUp className="h-3 w-3 mr-1" />}
                    {kpi.trend === 'down' && <TrendingDown className="h-3 w-3 mr-1" />}
                    {kpi.change}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Program Progress */}
        <Card className="lg:col-span-2 dark:bg-zinc-900/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="dark:text-white">Active Initiatives</CardTitle>
            <Button variant="ghost" size="sm" className="text-xs text-blue-500">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {data?.programs.slice(0, 3).map((prog) => (
                <div key={prog.id} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium dark:text-zinc-200">{prog.name}</span>
                    <span className="text-zinc-500">{prog.participants} participants</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-full rounded-full" style={{ width: '65%' }} />
                    </div>
                    <span className="text-xs font-bold dark:text-zinc-400">65%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="dark:bg-zinc-900/50">
          <CardHeader>
            <CardTitle className="dark:text-white">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data?.recentActivity.map((act) => (
                <div key={act.id} className="flex gap-3 text-sm">
                  <div className="h-8 w-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0">
                    <Clock className="h-4 w-4 text-zinc-400" />
                  </div>
                  <div>
                    <p className="dark:text-zinc-300">
                      <span className="font-bold text-zinc-900 dark:text-white">{act.user}</span> {act.action} <span className="font-medium text-blue-500">{act.target}</span>
                    </p>
                    <span className="text-[10px] text-zinc-500">{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Growth Chart */}
        <Card className="dark:bg-zinc-900/50">
          <CardHeader>
            <CardTitle className="dark:text-white">Platform Growth</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data?.content}>
                <defs>
                  <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1f1f1f" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#71717a' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#71717a' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #1f1f1f', borderRadius: '8px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="attendance" stroke="#3b82f6" fillOpacity={1} fill="url(#colorGrowth)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card className="dark:bg-zinc-900/50">
          <CardHeader>
            <CardTitle className="dark:text-white">Upcoming Deadlines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data?.projects.map((proj) => (
                <div key={proj.id} className="flex items-center justify-between p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 border dark:border-zinc-800">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      proj.priority === 'High' ? "bg-red-500" : "bg-amber-500"
                    )} />
                    <div>
                      <div className="text-sm font-bold dark:text-zinc-200">{proj.name}</div>
                      <div className="text-[10px] text-zinc-500">Due: {proj.deadline}</div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-[10px]">{proj.owner}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Ambassador Modal */}
      <Dialog 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Add New Ambassador"
      >
        <form className="space-y-4" onSubmit={(e) => {
          e.preventDefault();
          setIsModalOpen(false);
          toast("Ambassador created successfully", "success");
        }}>
          <div className="space-y-2">
            <label className="text-sm font-medium dark:text-zinc-300">Full Name</label>
            <Input placeholder="e.g. Ahmed Raza" required className="dark:bg-zinc-900 dark:border-zinc-800 dark:text-white" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium dark:text-zinc-300">University</label>
            <Input placeholder="e.g. LUMS" required className="dark:bg-zinc-900 dark:border-zinc-800 dark:text-white" />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)} className="dark:border-zinc-800 dark:text-zinc-400">Cancel</Button>
            <Button type="submit">Create Ambassador</Button>
          </div>
        </form>
      </Dialog>
      <ToastContainer toasts={toasts} />
    </motion.div>
  );
}
