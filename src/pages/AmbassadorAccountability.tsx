import * as React from "react";
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Share2, 
  Download, 
  Calendar,
  MessageSquare,
  BarChart3,
  Users
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { useAuth } from "../lib/AuthContext";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/Table";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from "recharts";
import { useDashboardData } from "../hooks/useDashboardData";

const PERFORMANCE_DATA = [
  { day: "Mon", tasks: 4, responseTime: 12 },
  { day: "Tue", tasks: 6, responseTime: 8 },
  { day: "Wed", tasks: 3, responseTime: 15 },
  { day: "Thu", tasks: 8, responseTime: 5 },
  { day: "Fri", tasks: 5, responseTime: 10 },
  { day: "Sat", tasks: 2, responseTime: 20 },
  { day: "Sun", tasks: 1, responseTime: 25 },
];

export function AmbassadorAccountability() {
  const { data } = useDashboardData();
  const { profile } = useAuth();
  const [selectedAmbassador, setSelectedAmbassador] = React.useState<any>(null);

  // Filter ambassadors based on role
  const availableAmbassadors = React.useMemo(() => {
    if (!data?.ambassadors) return [];
    if (profile?.role === 'admin') return data.ambassadors;

    // For ambassadors, only show their own record
    // We match by the 'ambassador_id' links in the profiles table
    return data.ambassadors.filter(a => a.id === profile?.ambassador_id);
  }, [data?.ambassadors, profile]);

  // Auto-select first available ambassador when data loads
  React.useEffect(() => {
    if (availableAmbassadors.length > 0 && !selectedAmbassador) {
      setSelectedAmbassador(availableAmbassadors[0]);
    }
  }, [availableAmbassadors, selectedAmbassador]);

  const isAdmin = profile?.role === 'admin';

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-end justify-between">
        <div className="flex flex-col">
          <span className="chic-sub text-white/60 mb-1">Performance Protocol</span>
          <h1 className="text-4xl chic-heading mb-2">Accountability Matrix</h1>
          <p className="chic-text-muted">Strategic tracking of personnel response metrics.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white">
            <Share2 className="h-4 w-4 mr-2" />
            Share Report
          </Button>
          <Button size="sm" className="bg-white text-[#6DC7B8] font-black h-9 rounded-xl shadow-xl">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar List - Only for Admins */}
        {isAdmin ? (
          <Card className="lg:col-span-1 chic-glass chic-border rounded-[32px] overflow-hidden">
            <CardHeader>
              <CardTitle className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Ambassadors</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {availableAmbassadors.map((amb: any) => (
                  <button
                    key={amb.id}
                    onClick={() => setSelectedAmbassador(amb)}
                    className={cn(
                      "w-full flex items-center gap-3 p-4 text-left transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50",
                      selectedAmbassador?.id === amb.id ? "bg-zinc-50 dark:bg-zinc-800 border-r-2 border-zinc-900 dark:border-white" : ""
                    )}
                  >
                    <div className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-zinc-600 dark:text-zinc-300">
                      {amb.name.split(' ').map((n: string) => n[0]).join('')}
                    </div>
                    <div>
                      <div className="text-sm font-medium dark:text-white">{amb.name}</div>
                      <div className="text-xs text-zinc-500">{amb.university}</div>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="lg:col-span-1 space-y-4">
             <Card className="chic-glass chic-border rounded-[24px] bg-white/5 border-white/20 shadow-lg shadow-white/5">
               <CardContent className="p-4">
                 <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400">
                   <Users className="h-5 w-5" />
                   <p className="text-xs font-bold uppercase tracking-wider">Personal Dashboard</p>
                 </div>
                 <p className="text-xs text-white/60 mt-2 leading-relaxed">
                   Welcome back, {selectedAmbassador?.name}. You are currently viewing your own performance and task metrics.
                 </p>
               </CardContent>
             </Card>
          </div>
        )}

        {/* Accountability Details */}
        <div className="lg:col-span-3 space-y-8">
          {selectedAmbassador ? (
            <>
              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="chic-glass chic-border rounded-[28px] overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-white/20 rounded-lg border border-white/30">
                        <CheckCircle2 className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="chic-label text-white/60 mb-1">Task Completion</div>
                        <div className="text-2xl font-black text-white">{selectedAmbassador.taskCompletion}%</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="chic-glass chic-border rounded-[28px] overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-white/20 rounded-lg border border-white/30">
                        <Clock className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="chic-label text-white/60 mb-1">Response Time</div>
                        <div className="text-2xl font-black text-white">12.4m</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="chic-glass chic-border rounded-[28px] overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-white/20 rounded-lg border border-white/30">
                        <MessageSquare className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="chic-label text-white/60 mb-1">Conversations</div>
                        <div className="text-2xl font-black text-white">8</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Performance Chart */}
              <Card className="chic-glass chic-border rounded-[32px] overflow-hidden">
                <CardHeader className="p-8 pb-0">
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-mint-500/10 flex items-center justify-center border border-mint-500/20">
                      <BarChart3 className="h-4 w-4 text-mint-500" />
                    </div>
                    <span className="chic-heading text-lg">Weekly Protocol Load</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={PERFORMANCE_DATA}>
                      <defs>
                        <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ffffff" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#ffffff" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#ffffff08" />
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#ffffff', opacity: 0.3, fontWeight: 900 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#ffffff', opacity: 0.3, fontWeight: 900 }} />
                      <Tooltip 
                        contentStyle={{ 
                          borderRadius: '24px', 
                          border: '1px solid rgba(255, 255, 255, 0.4)',
                          backgroundColor: '#6DC7B8',
                          padding: '16px'
                        }} 
                        itemStyle={{ color: '#ffffff', fontWeight: 900, textTransform: 'uppercase', fontSize: '10px' }}
                      />
                      <Area type="monotone" dataKey="tasks" stroke="#ffffff" fillOpacity={1} fill="url(#colorTasks)" strokeWidth={4} dot={{ fill: '#ffffff', r: 4 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Task Log */}
              <Card className="dark:bg-zinc-900 dark:border-zinc-800">
                <CardHeader className="pb-4">
                  <CardTitle className="chic-heading text-lg">Recent Task Responses</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/10">
                        <TableHead className="chic-table-head">Task Name</TableHead>
                        <TableHead className="chic-table-head">Status</TableHead>
                        <TableHead className="chic-table-head">Response Date</TableHead>
                        <TableHead className="text-right chic-table-head">Score</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data?.recentActivity?.slice(0, 3).map((r, i) => (
                        <TableRow key={i} className="border-white/10">
                          <TableCell className="font-extrabold text-white tracking-tight leading-none text-xs">{r.target}</TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="bg-white/20 text-white border-none px-3 py-1 text-[9px] font-black uppercase tracking-widest">{r.action}</Badge>
                          </TableCell>
                          <TableCell className="text-white/60 font-black text-[10px] uppercase tracking-widest">{r.time}</TableCell>
                          <TableCell className="text-right font-black text-white">--</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-96 text-zinc-500">
              <Users className="h-12 w-12 mb-4 opacity-20" />
              <p>Select an ambassador to view accountability metrics.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
