import * as React from "react";
import { 
  Linkedin, 
  Twitter, 
  Instagram, 
  Mail, 
  ShieldCheck, 
  Zap, 
  Heart, 
  Cpu, 
  Globe, 
  Command,
  ChevronRight,
  ArrowUpRight
} from "lucide-react";
import { Card, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { motion } from "motion/react";
import { cn } from "../lib/utils";

const TEAM = [
  {
    name: "Rithik Khiani",
    role: "Co-founder",
    bio: "Strategizing growth and empowering the next generation of leadership through innovative mentorship.",
    gradient: "from-emerald-500 to-blue-600",
    glow: "shadow-emerald-500/20",
    badge: "Strategic Vision"
  },
  {
    name: "Daniyal Shahid",
    role: "Co-founder",
    bio: "Visionary leadership, building the future of the ambassador network with deep operational focus.",
    gradient: "from-blue-600 to-emerald-600",
    glow: "shadow-blue-500/20",
    badge: "Network Growth"
  },
  {
    name: "Wajeeha Rafaqat",
    role: "Operations & Systems Lead",
    bio: "Driving the engine of TUFOP with precision engineering and high-performance system designs.",
    gradient: "from-emerald-400 to-cyan-500",
    glow: "shadow-emerald-400/20",
    badge: "Architecture"
  }
];

export function Team() {
  return (
    <div className="space-y-16 py-10 max-w-7xl mx-auto px-4 overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-40 bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="text-center space-y-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-3 px-5 py-2 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.5em] text-emerald-500 shadow-2xl"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          The Executive Command
        </motion.div>
        
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl chic-heading uppercase leading-[0.85]">
            <span className="opacity-40">The</span> <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-400 to-emerald-500">Visionary Core</span>
          </h1>
          <p className="max-w-xl mx-auto text-zinc-500 font-black uppercase tracking-[0.2em] text-[10px] bg-white/5 py-3 rounded-full border border-white/5 px-8">
            Established 2024 • Strategic Operations Unit
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
        {TEAM.map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Card className={cn(
               "group relative overflow-hidden chic-glass border-white/5 rounded-[48px] hover:translate-y-[-16px] transition-all duration-700 shadow-2xl",
               member.glow
            )}>
              <div className={cn("absolute top-0 left-0 w-full h-2 bg-gradient-to-r opacity-30 group-hover:opacity-100 transition-opacity duration-700", member.gradient)} />
              
              <CardContent className="p-10 text-center flex flex-col items-center">
                <div className="relative mb-10">
                  <div className={cn(
                    "h-32 w-32 rounded-[40px] bg-gradient-to-br flex items-center justify-center text-white text-4xl font-black shadow-2xl relative z-20 group-hover:rotate-6 transition-all duration-700", 
                    member.gradient
                  )}>
                    {member.name.split(' ').map(n => n[0]).join('')}
                    <div className="absolute inset-0 bg-white/10 rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="absolute -inset-8 bg-emerald-500/10 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700" />
                  <div className="absolute -bottom-3 -right-3 bg-zinc-950 rounded-2xl p-3 border-4 border-zinc-900 shadow-2xl z-30 group-hover:scale-110 transition-transform">
                     <ShieldCheck className="h-6 w-6 text-emerald-500" />
                  </div>
                </div>

                <div className="space-y-4 mb-10 flex-1">
                   <div>
                      <Badge className="bg-emerald-500/10 text-emerald-400 border-none px-3 py-1 text-[8px] font-black uppercase tracking-widest mb-3">{member.badge}</Badge>
                      <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-none">{member.name}</h3>
                      <p className="text-[10px] font-black text-emerald-500/60 uppercase tracking-widest mt-2">{member.role}</p>
                   </div>
                   
                   <p className="text-zinc-500 text-xs leading-relaxed font-medium line-clamp-3">
                      {member.bio}
                   </p>
                </div>

                <div className="flex w-full gap-3 pt-6 border-t border-white/5">
                   <button className="flex-1 h-12 rounded-2xl bg-white/5 hover:bg-white/10 transition-all flex items-center justify-center hover:scale-105 active:scale-95 group/btn">
                      <Linkedin className="h-5 w-5 text-zinc-600 group-hover/btn:text-blue-400 transition-colors" />
                   </button>
                   <button className="flex-1 h-12 rounded-2xl bg-white/5 hover:bg-white/10 transition-all flex items-center justify-center hover:scale-105 active:scale-95 group/btn">
                      <Mail className="h-5 w-5 text-zinc-600 group-hover/btn:text-emerald-400 transition-colors" />
                   </button>
                   <button className="h-12 w-12 rounded-2xl bg-white/5 hover:bg-emerald-500 hover:text-black transition-all flex items-center justify-center hover:scale-105 active:scale-95">
                      <ArrowUpRight className="h-5 w-5" />
                   </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="flex justify-center items-center gap-12 py-10 opacity-30 grayscale hover:grayscale-0 transition-all duration-700"
      >
         <div className="flex items-center gap-2">
            <Command className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-widest">Protocol V2.0</span>
         </div>
         <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
         <div className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-widest">Global Ops</span>
         </div>
         <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
         <div className="flex items-center gap-2 text-emerald-500">
            <Heart className="w-5 h-5 fill-emerald-500" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white">TUFOP Core</span>
         </div>
      </motion.div>
    </div>
  );
}
