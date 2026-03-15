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
  const [selectedAmbassador, setSelectedAmbassador] = React.useState(data?.ambassadors[0]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">Ambassador Accountability</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">Track performance, tasks, and response metrics.</p>
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
        {/* Sidebar List */}
        <Card className="lg:col-span-1 dark:bg-zinc-900/50 dark:border-zinc-800">
          <CardHeader>
            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Ambassadors</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {data?.ambassadors.map((amb) => (
                <button
                  key={amb.id}
                  onClick={() => setSelectedAmbassador(amb)}
                  className={cn(
                    "w-full flex items-center gap-3 p-4 text-left transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50",
                    selectedAmbassador?.id === amb.id ? "bg-zinc-50 dark:bg-zinc-800 border-r-2 border-zinc-900 dark:border-white" : ""
                  )}
                >
                  <div className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-zinc-600 dark:text-zinc-300">
                    {amb.name.split(' ').map(n => n[0]).join('')}
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

        {/* Accountability Details */}
        <div className="lg:col-span-3 space-y-8">
          {selectedAmbassador ? (
            <>
              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="dark:bg-zinc-900 dark:border-zinc-800">
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
                <Card className="dark:bg-zinc-900 dark:border-zinc-800">
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
                <Card className="dark:bg-zinc-900 dark:border-zinc-800">
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
              <Card className="dark:bg-zinc-900 dark:border-zinc-800">
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
                      <TableRow className="dark:border-zinc-800">
                        <TableCell className="font-medium dark:text-zinc-200">University Outreach</TableCell>
                        <TableCell><Badge variant="success">Completed</Badge></TableCell>
                        <TableCell className="text-zinc-500">Mar 14, 2026</TableCell>
                        <TableCell className="text-right font-bold dark:text-white">9.5</TableCell>
                      </TableRow>
                      <TableRow className="dark:border-zinc-800">
                        <TableCell className="font-medium dark:text-zinc-200">Content Distribution</TableCell>
                        <TableCell><Badge variant="success">Completed</Badge></TableCell>
                        <TableCell className="text-zinc-500">Mar 12, 2026</TableCell>
                        <TableCell className="text-right font-bold dark:text-white">8.8</TableCell>
                      </TableRow>
                      <TableRow className="dark:border-zinc-800">
                        <TableCell className="font-medium dark:text-zinc-200">Student Feedback Collection</TableCell>
                        <TableCell><Badge variant="warning">Pending</Badge></TableCell>
                        <TableCell className="text-zinc-500">--</TableCell>
                        <TableCell className="text-right font-bold dark:text-white">--</TableCell>
                      </TableRow>
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
