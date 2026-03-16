import * as React from "react";
import { Linkedin, Twitter, Instagram, Mail, ShieldCheck, Zap, Heart } from "lucide-react";
import { Card, CardContent } from "../components/ui/Card";
import { motion } from "motion/react";

const TEAM = [
  {
    name: "Rhithik Khiani",
    role: "Co-founder",
    bio: "Strategizing growth and empowering the next generation of leadership through innovative mentorship.",
    gradient: "from-emerald-500 to-teal-700",
    glow: "shadow-emerald-500/20"
  },
  {
    name: "Daniyal Shahid",
    role: "Co-founder",
    bio: "Visionary leadership, building the future of the ambassador network with deep operational focus.",
    gradient: "from-teal-600 to-emerald-800",
    glow: "shadow-teal-500/20"
  },
  {
    name: "Wajeeha Rafaqat",
    role: "Operations & Systems Lead",
    bio: "Driving the engine of TUFOP with precision engineering and high-performance system designs.",
    gradient: "from-emerald-400 to-teal-600",
    glow: "shadow-emerald-400/20"
  }
];

export function Team() {
  return (
    <div className="space-y-12 py-10 max-w-7xl mx-auto px-4">
      <div className="text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500"
        >
          <Zap className="h-3.5 w-3.5 fill-emerald-500" />
          The Leadership Core
        </motion.div>
        
        <div className="space-y-2">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-white uppercase">
            Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-600">Visionaries</span>
          </h1>
          <p className="max-w-2xl mx-auto text-zinc-500 font-medium text-lg italic">
            "Combining clinical foresight with operational excellence."
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {TEAM.map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, ease: "easeOut" }}
          >
            <Card className={`relative overflow-hidden group border-white/5 bg-zinc-900/40 backdrop-blur-3xl hover:translate-y-[-12px] transition-all duration-700 rounded-[40px] shadow-2xl ${member.glow}`}>
              <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${member.gradient} opacity-50`} />
              
              <CardContent className="pt-12 pb-12 px-8 text-center relative z-10">
                <div className="relative inline-block mb-8">
                  <div className={`h-28 w-28 rounded-[32px] bg-gradient-to-br ${member.gradient} flex items-center justify-center text-white text-4xl font-black shadow-2xl relative z-10 group-hover:scale-110 transition-transform duration-500`}>
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="absolute -inset-4 bg-emerald-500/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute -bottom-2 -right-2 bg-emerald-500 rounded-2xl p-2.5 border-4 border-zinc-950 shadow-xl z-20">
                     <ShieldCheck className="h-5 w-5 text-zinc-950" />
                  </div>
                </div>

                <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">{member.name}</h3>
                <div className="inline-block mb-6">
                  <span className="text-[10px] font-black text-emerald-500 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full uppercase tracking-[0.2em]">
                    {member.role}
                  </span>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed mb-10 font-medium">
                  {member.bio}
                </p>

                <div className="flex justify-center gap-5">
                  <button className="p-3 rounded-2xl bg-white/5 hover:bg-emerald-500/10 transition-all text-zinc-500 hover:text-emerald-400 border border-transparent hover:border-emerald-500/20">
                    <Linkedin className="h-5 w-5" />
                  </button>
                   <button className="p-3 rounded-2xl bg-white/5 hover:bg-emerald-500/10 transition-all text-zinc-500 hover:text-white border border-transparent hover:border-white/10">
                    <Twitter className="h-5 w-5" />
                  </button>
                   <button className="p-3 rounded-2xl bg-white/5 hover:bg-emerald-500/10 transition-all text-zinc-500 hover:text-pink-400 border border-transparent hover:border-pink-500/20">
                    <Instagram className="h-5 w-5" />
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="pt-16 pb-8 text-center border-t border-white/5">
         <div className="flex flex-col items-center gap-3">
            <p className="text-[10px] text-zinc-500 uppercase tracking-[0.4em] font-black flex items-center justify-center gap-2">
              The USMLE Forum Of Pakistan <Heart className="h-3 w-3 text-emerald-500 fill-emerald-500" /> Executive Core
            </p>
            <div className="flex items-center gap-2 text-[8px] font-black text-zinc-700 uppercase tracking-widest">
               <span>Established 2024</span>
               <span className="w-1 h-1 rounded-full bg-zinc-800" />
               <span>Strategic Operations Unit</span>
            </div>
         </div>
      </div>
    </div>
  );
}
