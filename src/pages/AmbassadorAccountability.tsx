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
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500/60 mb-1">Performance Protocol</span>
          <h1 className="text-4xl chic-heading mb-2">Accountability Matrix</h1>
          <p className="text-zinc-500 font-medium">Strategic tracking of personnel response metrics.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="dark:border-zinc-800 dark:text-zinc-300">
            <Share2 className="h-4 w-4 mr-2" />
            Share Report
          </Button>
          <Button size="sm">
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
             <Card className="chic-glass chic-border rounded-[24px] bg-blue-500/5 border-blue-500/20 shadow-lg shadow-blue-500/5">
               <CardContent className="p-4">
                 <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400">
                   <Users className="h-5 w-5" />
                   <p className="text-xs font-bold uppercase tracking-wider">Personal Dashboard</p>
                 </div>
                 <p className="text-xs text-blue-500/80 mt-2 leading-relaxed">
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
                      <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <div className="text-sm text-zinc-500">Task Completion</div>
                        <div className="text-2xl font-bold dark:text-white">{selectedAmbassador.taskCompletion}%</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="chic-glass chic-border rounded-[28px] overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                        <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <div className="text-sm text-zinc-500">Avg. Response Time</div>
                        <div className="text-2xl font-bold dark:text-white">12.4m</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="chic-glass chic-border rounded-[28px] overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <div className="text-sm text-zinc-500">Active Conversations</div>
                        <div className="text-2xl font-bold dark:text-white">8</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Performance Chart */}
              <Card className="chic-glass chic-border rounded-[32px] overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-zinc-400" />
                    Weekly Activity Trend
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={PERFORMANCE_DATA}>
                      <defs>
                        <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#18181b" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#18181b" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" className="dark:stroke-zinc-800" />
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#71717a' }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#71717a' }} />
                      <Tooltip 
                        contentStyle={{ 
                          borderRadius: '8px', 
                          border: '1px solid #e4e4e7',
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          backdropFilter: 'blur(4px)'
                        }} 
                      />
                      <Area type="monotone" dataKey="tasks" stroke="#18181b" fillOpacity={1} fill="url(#colorTasks)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Task Log */}
              <Card className="dark:bg-zinc-900 dark:border-zinc-800">
                <CardHeader>
                  <CardTitle>Recent Task Responses</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="dark:border-zinc-800">
                        <TableHead>Task Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Response Date</TableHead>
                        <TableHead className="text-right">Score</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data?.recentActivity?.slice(0, 3).map((r, i) => (
                        <TableRow key={i} className="dark:border-zinc-800">
                          <TableCell className="font-medium dark:text-zinc-200">{r.target}</TableCell>
                          <TableCell>
                            <Badge variant={i === 0 ? "success" : "warning"}>{r.action}</Badge>
                          </TableCell>
                          <TableCell className="text-zinc-500">{r.time}</TableCell>
                          <TableCell className="text-right font-bold dark:text-white">--</TableCell>
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
