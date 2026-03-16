import * as React from "react";
import { BarChart3, TrendingUp, Users, GraduationCap, BookOpen, MousePointer2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  BarChart as ReBarChart,
  Bar,
  Cell
} from "recharts";
import { useDashboardData } from "../hooks/useDashboardData";
import { motion } from "motion/react";

export function GrowthMetrics() {
  const { data } = useDashboardData();

  const metrics = [
    { label: "Total Ambassadors", value: data?.ambassadors?.length || 0, change: "Active", icon: Users, color: "text-emerald-500" },
    { label: "Universities", value: data?.universities?.length || 0, change: "Hubs", icon: GraduationCap, color: "text-teal-500" },
    { label: "Content Pieces", value: data?.content?.length || 0, change: "Strategic", icon: BookOpen, color: "text-emerald-400" },
    { label: "Student Reach", value: (data?.programs?.reduce((acc, curr) => acc + (curr.participants || 0), 0) || 0).toLocaleString(), change: "Global", icon: MousePointer2, color: "text-teal-400" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-2xl font-bold dark:text-white">Growth & Analytics</h1>
        <p className="text-sm text-zinc-500">Platform performance and engagement trends.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m) => (
          <Card key={m.label} className="chic-glass chic-border rounded-[32px] overflow-hidden">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div className={m.color}>
                  <m.icon className="h-5 w-5" />
                </div>
                <div className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                  {m.change}
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold dark:text-white">{m.value}</div>
                <div className="text-xs text-zinc-500">{m.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="chic-glass chic-border rounded-[32px] overflow-hidden">
          <CardHeader>
            <CardTitle className="text-sm dark:text-white">Engagement Trends (Monthly)</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data?.content}>
                <defs>
                  <linearGradient id="colorEngage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0d9488" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0d9488" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1f1f1f" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#71717a' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#71717a' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #1f1f1f', borderRadius: '8px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="attendance" stroke="#0d9488" fillOpacity={1} fill="url(#colorEngage)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="chic-glass chic-border rounded-[32px] overflow-hidden">
          <CardHeader>
            <CardTitle className="text-sm dark:text-white">Program Participation</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ReBarChart data={data?.programs}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1f1f1f" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 8, fill: '#71717a' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#71717a' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #1f1f1f', borderRadius: '8px', fontSize: '12px' }}
                />
                <Bar dataKey="participants" fill="#14b8a6" radius={[4, 4, 0, 0]} />
              </ReBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
