import * as React from "react";
import { Library, FileText, Book, Search, Download, ExternalLink, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useDashboardData } from "../hooks/useDashboardData";
import { motion } from "motion/react";

export function KnowledgeBase() {
  const { data } = useDashboardData();

  const categories = ["All Resources", "Internal Guides", "Pathway Info", "Module Plans", "FAQs", "Documents"];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold dark:text-white">Knowledge Base</h1>
          <p className="text-sm text-zinc-500">Internal guides, module plans, and pathway resources.</p>
        </div>
        <Button size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export All
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 space-y-2">
          {categories.map((cat) => (
            <button
              key={cat}
              className="w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <Input className="pl-10 dark:bg-zinc-900 dark:border-zinc-800" placeholder="Search resources, documents, or pathways..." />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data?.knowledge.map((item) => (
              <Card key={item.id} className="dark:bg-zinc-900/50 hover:bg-zinc-900 transition-colors group">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-bold dark:text-white group-hover:text-blue-500 transition-colors">{item.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-[8px]">{item.category}</Badge>
                          <span className="text-[10px] text-zinc-500">{item.path}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-4 pt-4 border-t dark:border-zinc-800 flex items-center justify-between text-[10px] text-zinc-500">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Updated {item.lastUpdated}
                    </div>
                    <span className="hover:text-blue-500 cursor-pointer">Download PDF</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
