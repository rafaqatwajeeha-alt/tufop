import * as React from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  Clock,
  Plus, 
  Download,
  AlertCircle,
  CheckCircle2,
  Info,
  Calendar,
  Users,
  Activity
} from "lucide-react";
import { useDashboardData } from "../hooks/useDashboardData";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Dialog } from "../components/ui/Dialog";
import { Input } from "../components/ui/Input";
import { cn } from "../lib/utils";
import { 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

import { useToast, ToastContainer } from "../components/ui/Toast";
import { motion, AnimatePresence } from "motion/react";

export function Dashboard() {
  const { data, loading } = useDashboardData();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { toasts, toast } = useToast();

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse p-4">
        <div className="h-10 w-64 bg-zinc-800 rounded-lg mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-40 bg-zinc-900/50 rounded-3xl border border-white/5" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 h-96 bg-zinc-900/50 rounded-3xl border border-white/5" />
          <div className="h-96 bg-zinc-900/50 rounded-3xl border border-white/5" />
        </div>
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-10 max-w-7xl mx-auto"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.div variants={item}>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
              <Activity className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500/60">Live Intelligence</span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-white">Operations Command</h1>
          <p className="text-zinc-500 font-medium mt-1">Strategic oversight of the TUFOP ecosystem.</p>
        </motion.div>
        
        <motion.div variants={item} className="flex gap-3">
          <Button variant="outline" className="bg-white/5 border-white/5 hover:bg-white/10 text-white rounded-2xl px-6 h-12">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button onClick={() => setIsModalOpen(true)} className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold rounded-2xl px-6 h-12 shadow-xl shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95">
            <Plus className="h-5 w-5 mr-2" />
            New Initiative
          </Button>
        </motion.div>
      </div>

      {/* KPI Section with Shimmer Glass */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {(data?.kpis || []).map((kpi, idx) => (
          <motion.div key={kpi.label} variants={item}>
            <Card className="shimmer group bg-zinc-900/40 backdrop-blur-2xl border-white/5 hover:border-emerald-500/30 transition-all duration-500 rounded-[32px] overflow-hidden">
              <CardContent className="p-7">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2.5 bg-white/5 rounded-2xl border border-white/5 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20 transition-colors">
                    {idx === 0 ? <Users className="w-5 h-5 text-zinc-400 group-hover:text-emerald-400" /> :
                     idx === 1 ? <Calendar className="w-5 h-5 text-zinc-400 group-hover:text-emerald-400" /> :
                     idx === 2 ? <TrendingUp className="w-5 h-5 text-zinc-400 group-hover:text-emerald-400" /> :
                     <ShieldCheck className="w-5 h-5 text-zinc-400 group-hover:text-emerald-400" />}
                  </div>
                  <Badge className={cn(
                    "rounded-xl border shadow-none px-2.5 py-1 text-[10px] font-black",
                    kpi.trend === 'up' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : 
                    "bg-red-500/10 text-red-400 border-red-500/20"
                  )}>
                    {kpi.change}
                  </Badge>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-1">{kpi.label}</p>
                  <h3 className="text-3xl font-black text-white tracking-tighter">{kpi.value}</h3>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Growth Graph */}
        <motion.div variants={item} className="lg:col-span-2">
          <Card className="bg-zinc-900/40 backdrop-blur-2xl border-white/5 rounded-[32px] overflow-hidden flex flex-col h-full">
            <CardHeader className="p-8 pb-0">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-black text-white tracking-tight">Ecosystem Growth</CardTitle>
                  <p className="text-xs font-medium text-zinc-500 mt-1">Real-time attendance & engagement data</p>
                </div>
                <div className="flex gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-xl border border-white/5">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Live</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 pt-6 flex-1">
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data?.content || []}>
                    <defs>
                      <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                    <XAxis 
                      dataKey="date" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fill: '#52525b', fontWeight: 700 }} 
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fill: '#52525b', fontWeight: 700 }} 
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#09090b', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', padding: '12px' }}
                      itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="attendance" 
                      stroke="#10b981" 
                      fillOpacity={1} 
                      fill="url(#colorGrowth)" 
                      strokeWidth={3} 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Priority List */}
        <motion.div variants={item}>
          <Card className="bg-zinc-900/40 backdrop-blur-2xl border-white/5 rounded-[32px] overflow-hidden flex flex-col h-full">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-xl font-black text-white tracking-tight">Active Focus</CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-4">
              {(data?.projects || []).map((proj) => (
                <div key={proj.id} className="group p-5 rounded-[24px] bg-white/5 border border-white/5 hover:border-emerald-500/20 transition-all hover:bg-white/[0.07] relative overflow-hidden">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-2.5 h-2.5 rounded-full shadow-lg",
                        proj.priority === 'High' ? "bg-red-500 shadow-red-500/20" : "bg-amber-500 shadow-amber-500/20"
                      )} />
                      <span className="text-sm font-black text-white tracking-tight">{proj.name}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center border border-white/5">
                        <span className="text-[8px] font-bold text-emerald-400 capitalize">{proj.owner[0]}</span>
                      </div>
                      <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{proj.owner}</span>
                    </div>
                    <span className="text-[10px] font-bold text-white/40">Due: {proj.deadline}</span>
                  </div>
                </div>
              ))}
              <Button variant="ghost" className="w-full h-12 rounded-2xl border border-white/5 text-zinc-500 hover:text-white hover:bg-white/5 text-[10px] font-black uppercase tracking-widest">
                Full Strategic Roadmap
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Add Initiative Modal */}
      <Dialog 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Command: New Initiative"
      >
        <div className="p-1">
          <form className="space-y-6" onSubmit={(e) => {
            e.preventDefault();
            setIsModalOpen(false);
            toast("Strategic initiative deployed", "success");
          }}>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Initiative Label</label>
              <Input placeholder="Enter strategic objective..." required className="bg-white/5 border-white/5 h-14 rounded-2xl focus:ring-emerald-500/20 text-white" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Deployment Date</label>
                <Input type="date" required className="bg-white/5 border-white/5 h-14 rounded-2xl text-white" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Priority Tier</label>
                <select className="flex h-14 w-full rounded-2xl border border-white/5 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20">
                  <option className="bg-zinc-900">Tier A (Critical)</option>
                  <option className="bg-zinc-900">Tier B (Strategic)</option>
                  <option className="bg-zinc-900">Tier C (Operational)</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-white rounded-xl">Cancel</Button>
              <Button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-black font-black rounded-xl px-8 shadow-xl shadow-emerald-500/20">Confirm Deployment</Button>
            </div>
          </form>
        </div>
      </Dialog>
      <ToastContainer toasts={toasts} />
    </motion.div>
  );
}
