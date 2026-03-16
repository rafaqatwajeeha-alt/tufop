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
  Activity,
  ShieldCheck
} from "lucide-react";
import { useDashboardData } from "../hooks/useDashboardData";
import { useAuth } from "../lib/AuthContext";
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
  CartesianGrid,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from "recharts";

import { useToast, ToastContainer } from "../components/ui/Toast";
import { motion, AnimatePresence } from "motion/react";

export function Dashboard() {
  const { profile } = useAuth();
  const { data, loading } = useDashboardData(profile?.id);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { toasts, toast } = useToast();

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse p-4">
        <div className="h-10 w-64 bg-zinc-800 rounded-lg mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-40 chic-glass chic-border rounded-[32px] shadow-2xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 h-96 chic-glass chic-border rounded-[32px]" />
          <div className="h-96 chic-glass chic-border rounded-[32px]" />
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
            <div className="p-2 bg-mint-500/10 rounded-lg border border-mint-500/20 shadow-lg shadow-mint-500/5">
              <Activity className="w-5 h-5 text-mint-500" />
            </div>
            <span className="chic-sub">Live Intelligence Protocol</span>
          </div>
          <h1 className="text-5xl chic-heading mb-3">Operations Command</h1>
          <p className="chic-text-muted">Strategic ecosystem oversight & real-time metric tracking.</p>
        </motion.div>
        
        <motion.div variants={item} className="flex gap-3">
          <Button variant="outline" className="chic-glass border-white/5 hover:bg-white/10 text-white rounded-2xl px-6 h-12 transition-all">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button onClick={() => setIsModalOpen(true)} className="bg-mint-500 hover:bg-mint-600 text-zinc-950 font-black rounded-2xl px-6 h-12 shadow-xl shadow-mint-500/20 transition-all hover:scale-105 active:scale-95 uppercase tracking-widest text-[10px]">
            <Plus className="h-5 w-5 mr-2" />
            New Initiative
          </Button>
        </motion.div>
      </div>

      {/* KPI Section with Shimmer Glass */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {(data?.kpis || []).map((kpi, idx) => (
          <motion.div key={kpi.label} variants={item}>
            <Card className="shimmer group chic-glass chic-border rounded-[32px] overflow-hidden">
              <CardContent className="p-7">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2.5 bg-mint-500/5 rounded-2xl border border-white/5 group-hover:bg-mint-500/10 group-hover:border-mint-500/20 transition-all duration-500">
                    {idx === 0 ? <Users className="w-5 h-5 text-zinc-400 group-hover:text-mint-500" /> :
                     idx === 1 ? <Calendar className="w-5 h-5 text-zinc-400 group-hover:text-mint-500" /> :
                     idx === 2 ? <TrendingUp className="w-5 h-5 text-zinc-400 group-hover:text-mint-500" /> :
                     <ShieldCheck className="w-5 h-5 text-zinc-400 group-hover:text-mint-500" />}
                  </div>
                  <Badge className={cn(
                    "rounded-xl border shadow-none px-2.5 py-1 text-[10px] font-black uppercase tracking-tighter",
                    kpi.trend === 'up' ? "bg-mint-500/10 text-mint-500 border-mint-500/20" : 
                    "bg-red-500/10 text-red-400 border-red-500/20"
                  )}>
                    {kpi.change}
                  </Badge>
                </div>
                <div>
                  <p className="chic-label mb-1 opacity-80">{kpi.label}</p>
                  <h3 className="text-4xl font-black text-white tracking-tighter">{kpi.value}</h3>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Growth Graph */}
        <motion.div variants={item} className="lg:col-span-2">
          <Card className="chic-glass chic-border rounded-[32px] overflow-hidden flex flex-col h-full">
            <CardHeader className="p-8 pb-0">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl chic-heading">Ecosystem Pulse</CardTitle>
                  <p className="chic-sub mt-1">Real-time engagement matrix</p>
                </div>
                <div className="flex gap-2">
                    <div className="flex items-center gap-2 px-4 py-2 chic-glass rounded-2xl border border-mint-500/20 shadow-lg shadow-mint-500/5">
                    <div className="w-2 h-2 rounded-full bg-mint-500 animate-pulse shadow-[0_0_10px_rgba(124,191,176,0.6)]" />
                    <span className="text-[10px] font-black text-mint-500 uppercase tracking-widest">Live Flow</span>
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
                        <stop offset="5%" stopColor="#7CBFB0" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#7CBFB0" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#ffffff08" />
                    <XAxis 
                      dataKey="date" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 9, fill: '#ffffff', fontWeight: 900, opacity: 0.3 }} 
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 9, fill: '#ffffff', fontWeight: 900, opacity: 0.3 }} 
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#020617', border: '1px solid rgba(124, 191, 176, 0.2)', borderRadius: '24px', padding: '16px' }}
                      itemStyle={{ color: '#7CBFB0', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="attendance" 
                      stroke="#7CBFB0" 
                      fillOpacity={1} 
                      fill="url(#colorGrowth)" 
                      strokeWidth={4} 
                      dot={{ fill: '#7CBFB0', strokeWidth: 2, r: 4, stroke: '#020617' }}
                      activeDot={{ r: 6, strokeWidth: 0, fill: '#ffffff' }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Priority List */}
        <motion.div variants={item}>
          <Card className="chic-glass chic-border rounded-[32px] overflow-hidden flex flex-col h-full">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-xl font-black text-white tracking-tight">Active Focus</CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-4">
              {(data?.projects || []).map((proj) => (
                <div key={proj.id} className="group p-5 rounded-[24px] bg-mint-500/5 border border-mint-500/10 hover:border-mint-500/30 transition-all hover:bg-mint-500/10 relative overflow-hidden">
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
                      <div className="w-5 h-5 rounded-full bg-zinc-900 flex items-center justify-center border border-white/10 shadow-lg">
                        <span className="text-[8px] font-black text-mint-500 uppercase">{proj.owner[0]}</span>
                      </div>
                      <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest leading-none">{proj.owner}</span>
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

      {/* Strategic Analytics Deep Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 pb-12">
        {/* University Distribution (Bar Chart) */}
        <motion.div variants={item}>
          <Card className="chic-glass chic-border rounded-[32px] overflow-hidden flex flex-col h-[450px]">
            <CardHeader className="p-8 pb-0">
               <CardTitle className="text-xl chic-heading uppercase tracking-tighter">Strategic Coverage</CardTitle>
               <p className="chic-sub text-mint-500/60 mt-1">Institutional distribution of assets</p>
            </CardHeader>
            <CardContent className="p-8 pt-6 flex-1">
               <div className="h-full w-full">
                 <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={React.useMemo(() => {
                     const counts: Record<string, number> = {};
                     (data?.ambassadors || []).forEach(a => {
                       const uni = a.university || "Other";
                       counts[uni] = (counts[uni] || 0) + 1;
                     });
                     return Object.entries(counts).map(([name, value]) => ({ name, value }));
                   }, [data?.ambassadors])}>
                     <XAxis dataKey="name" hide />
                     <Tooltip 
                       cursor={{ fill: 'rgba(124, 191, 176, 0.05)' }}
                       contentStyle={{ backgroundColor: '#020617', border: '1px solid rgba(124, 191, 176, 0.1)', borderRadius: '24px', padding: '16px' }}
                       itemStyle={{ color: '#7CBFB0', fontWeight: 900, textTransform: 'uppercase', fontSize: '10px' }}
                     />
                     <Bar dataKey="value" radius={[12, 12, 0, 0]}>
                       {(data?.ambassadors || []).map((_, index) => (
                         <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#7CBFB0" : "#6FB5A5"} />
                       ))}
                     </Bar>
                   </BarChart>
                 </ResponsiveContainer>
               </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Project Priority (Pie Chart) */}
        <motion.div variants={item}>
          <Card className="chic-glass chic-border rounded-[32px] overflow-hidden flex flex-col h-[450px]">
            <CardHeader className="p-8 pb-0">
               <CardTitle className="text-xl chic-heading uppercase tracking-tighter">Priority Allocation</CardTitle>
               <p className="chic-sub text-blue-400 mt-1">Resource distribution by operation tier</p>
            </CardHeader>
            <CardContent className="p-8 pt-6 flex-1 flex flex-col items-center justify-center">
               <div className="h-[250px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                   <PieChart>
                     <Pie
                       data={React.useMemo(() => {
                         const counts: Record<string, number> = { "High": 0, "Medium": 0, "Low": 0 };
                         (data?.projects || []).forEach(p => {
                           const priority = p.priority || "Medium";
                           counts[priority] = (counts[priority] || 0) + 1;
                         });
                         return Object.entries(counts).map(([name, value]) => ({ name, value }));
                       }, [data?.projects])}
                       innerRadius={70}
                       outerRadius={90}
                       paddingAngle={10}
                       dataKey="value"
                       stroke="none"
                     >
                       <Cell fill="#ef4444" /> {/* High */}
                       <Cell fill="#f59e0b" /> {/* Medium */}
                       <Cell fill="#7CBFB0" /> {/* Low */}
                     </Pie>
                     <Tooltip 
                       contentStyle={{ backgroundColor: '#020617', border: '1px solid rgba(124, 191, 176, 0.1)', borderRadius: '24px', padding: '16px' }}
                       itemStyle={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', color: '#7CBFB0' }}
                     />
                   </PieChart>
                 </ResponsiveContainer>
               </div>
               <div className="grid grid-cols-3 gap-6 mt-8 w-full">
                  <div className="text-center">
                    <div className="w-2 h-2 rounded-full bg-red-500 mx-auto mb-2 shadow-[0_0_10px_rgba(239,68,68,0.5)]"/> 
                    <span className="chic-label">Tier A</span>
                  </div>
                  <div className="text-center">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mx-auto mb-2 shadow-[0_0_10px_rgba(245,158,11,0.5)]"/> 
                    <span className="chic-label">Tier B</span>
                  </div>
                  <div className="text-center">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 mx-auto mb-2 shadow-[0_0_10px_rgba(16,185,129,0.5)]"/> 
                    <span className="chic-label">Tier C</span>
                  </div>
               </div>
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
              <label className="chic-label text-zinc-500 ml-1">Initiative Label</label>
              <Input placeholder="Enter strategic objective..." required className="chic-glass border-white/5 h-14 rounded-2xl focus:ring-mint-500/20 text-white" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="chic-label text-zinc-500 ml-1">Deployment Date</label>
                <Input type="date" required className="chic-glass border-white/5 h-14 rounded-2xl text-white" />
              </div>
              <div className="space-y-2">
                <label className="chic-label text-zinc-500 ml-1">Priority Tier</label>
                <select className="flex h-14 w-full rounded-2xl border border-white/5 bg-zinc-950/40 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-mint-500/20 backdrop-blur-3xl">
                  <option className="bg-zinc-900">Tier A (Critical)</option>
                  <option className="bg-zinc-900">Tier B (Strategic)</option>
                  <option className="bg-zinc-900">Tier C (Operational)</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-white rounded-xl">Cancel</Button>
              <Button type="submit" className="bg-mint-500 hover:bg-mint-600 text-zinc-950 font-black rounded-xl px-8 shadow-xl shadow-mint-500/20">Confirm Deployment</Button>
            </div>
          </form>
        </div>
      </Dialog>
      <ToastContainer toasts={toasts} />
    </motion.div>
  );
}
