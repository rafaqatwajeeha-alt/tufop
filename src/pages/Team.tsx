import * as React from "react";
import { Linkedin, Twitter, Instagram, Mail, ShieldCheck, Zap, Heart } from "lucide-react";
import { Card, CardContent } from "../components/ui/Card";
import { motion } from "motion/react";
import { useDashboardData } from "../hooks/useDashboardData";

const TEAM = [
  {
    name: "Wajeeha",
    role: "Operations & Systems Lead",
    bio: "Driving the engine of TUFOp with precision and high-octane systems.",
    gradient: "from-blue-600 to-indigo-600",
    glow: "shadow-blue-500/20"
  },
  {
    name: "Daniyal Shahid",
    role: "Co-founder",
    bio: "Visionary leadership, building the future of the ambassador network.",
    gradient: "from-emerald-600 to-teal-600",
    glow: "shadow-emerald-500/20"
  },
  {
    name: "Rhithik Khiani",
    role: "Co-founder",
    bio: "Strategizing growth and empowering the next generation of leaders.",
    gradient: "from-purple-600 to-pink-600",
    glow: "shadow-purple-500/20"
  }
];

export function Team() {
  return (
    <div className="space-y-12 py-8">
      <div className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border dark:border-zinc-800 text-[10px] font-bold uppercase tracking-widest text-zinc-500"
        >
          <Zap className="h-3 w-3 text-amber-500 fill-amber-500" />
          The Leadership Core
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-white uppercase">
          Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Visionaries</span>
        </h1>
        <p className="max-w-xl mx-auto text-zinc-500 dark:text-zinc-400 text-lg">
          The team behind the systems, operations, and growth of our global network.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TEAM.map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className={`relative overflow-hidden group border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl hover:translate-y-[-8px] transition-all duration-500 shadow-xl ${member.glow}`}>
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${member.gradient}`} />
              
              <CardContent className="pt-8 pb-8 px-6 text-center">
                <div className="relative inline-block mb-6">
                  <div className={`h-24 w-24 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center text-white text-3xl font-black rotate-3 group-hover:rotate-0 transition-transform duration-500`}>
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-white dark:bg-zinc-950 rounded-full p-2 border dark:border-zinc-800 shadow-lg">
                     <ShieldCheck className="h-4 w-4 text-blue-500" />
                  </div>
                </div>

                <h3 className="text-xl font-bold dark:text-white mb-1 uppercase tracking-tight">{member.name}</h3>
                <p className="text-sm font-bold text-blue-600 dark:text-blue-400 mb-4 px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 inline-block rounded-md uppercase tracking-wider">
                  {member.role}
                </p>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-8 italic">
                  "{member.bio}"
                </p>

                <div className="flex justify-center gap-4">
                  <button className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-blue-500">
                    <Linkedin className="h-4 w-4" />
                  </button>
                   <button className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
                    <Twitter className="h-4 w-4" />
                  </button>
                   <button className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-pink-500">
                    <Instagram className="h-4 w-4" />
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="pt-12 text-center border-t dark:border-zinc-800">
         <p className="text-xs text-zinc-500 uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2">
           Made with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> by the Systems Team
         </p>
      </div>
    </div>
  );
}
