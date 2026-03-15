import * as React from "react";
import { Plus, Handshake, Mail, Globe, MoreVertical, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/Table";
import { Input } from "../components/ui/Input";
import { useDashboardData } from "../hooks/useDashboardData";
import { motion } from "motion/react";

export function Partnerships() {
  const { data } = useDashboardData();

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold dark:text-white">Partnerships & Collaborators</h1>
          <p className="text-sm text-zinc-500">Track guest speakers, mentors, and partner organizations.</p>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Partner
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
        <Input className="pl-10 dark:bg-zinc-900 dark:border-zinc-800" placeholder="Search partners by name, role or organization..." />
      </div>

      <Card className="dark:bg-zinc-900/50">
        <Table>
          <TableHeader>
            <TableRow className="dark:border-zinc-800">
              <TableHead>Partner</TableHead>
              <TableHead>Role / Specialty</TableHead>
              <TableHead>Organization</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Collab Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.partnerships.map((partner) => (
              <TableRow key={partner.id} className="dark:border-zinc-800">
                <TableCell>
                  <div className="font-medium dark:text-zinc-200">{partner.name}</div>
                </TableCell>
                <TableCell>
                  <div className="text-sm dark:text-zinc-400">{partner.role}</div>
                  <div className="text-[10px] text-zinc-500">{partner.specialty}</div>
                </TableCell>
                <TableCell className="dark:text-zinc-400">{partner.organization}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-xs text-blue-500 hover:underline cursor-pointer">
                    <Mail className="h-3 w-3" />
                    {partner.contact}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="text-[10px]">{partner.type}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={partner.status === 'Active' || partner.status === 'Confirmed' ? 'success' : 'warning'}>
                    {partner.status}
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
