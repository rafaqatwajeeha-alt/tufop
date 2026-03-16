import * as React from "react";
import { supabase } from "../lib/supabase";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card, CardContent } from "../components/ui/Card";
import { KeyRound, Mail, AlertCircle, Loader2, ShieldCheck, Stethoscope } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function LoginPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
    } catch (err: any) {
      setError(err.message || "Failed to sign in. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] p-6 relative overflow-hidden font-sans">
      {/* --- EXTRA COOL DYNAMIC BACKGROUND --- */}
      <div className="absolute inset-0 z-0">
        {/* Animated Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/10 blur-[120px] rounded-full animate-float" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full animate-float-delayed" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-indigo-500/5 blur-[100px] rounded-full animate-pulse" />
        
        {/* Subtle Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`, 
            backgroundSize: '32px 32px' 
          }} 
        />
      </div>



      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10 p-1 group"
      >
        {/* BRANDING HEADER */}
        <div className="text-center mb-10">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none mb-4"
          >
            THE USMLE FORUM <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
              OF PAKISTAN
            </span>
          </motion.h1>
          
          <motion.div 
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] uppercase tracking-[0.2em] font-bold"
          >
            <Stethoscope className="w-3 h-3" />
            Official Member Portal
          </motion.div>
        </div>
        {/* BRANDING HEADER */}
        <div className="text-center mb-10">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] uppercase tracking-[0.2em] font-bold mb-6"
          >
            <Stethoscope className="w-3 h-3" />
            Official Member Portal
          </motion.div>
          

          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-zinc-400 text-sm font-medium tracking-wide"
          >
            Advancing Medical Excellence Across Borders
          </motion.p>
        </div>

        {/* LOGIN CARD */}
        <Card className="shimmer border-white/5 bg-zinc-900/40 backdrop-blur-2xl shadow-2xl rounded-3xl overflow-hidden">
          <CardContent className="p-8 pt-10">
            <form onSubmit={handleLogin} className="space-y-6">
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-sm text-red-400">
                      <AlertCircle className="h-5 w-5 shrink-0" />
                      <p>{error}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-5">
                {/* EMAIL FIELD */}
                <motion.div 
                   initial={{ x: -10, opacity: 0 }}
                   animate={{ x: 0, opacity: 1 }}
                   transition={{ delay: 0.5 }}
                >
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2 block ml-1">
                    System Identity (Email)
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500 group-focus-within:text-emerald-400 transition-colors" />
                    <Input
                      type="email"
                      placeholder="Enter your registered email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-12 bg-zinc-800/50 border-white/5 text-white placeholder:text-zinc-600 focus:border-emerald-500/50 focus:ring-emerald-500/20 rounded-2xl h-14 text-base transition-all"
                      disabled={isLoading}
                    />
                  </div>
                </motion.div>

                {/* PASSWORD FIELD */}
                <motion.div 
                   initial={{ x: -10, opacity: 0 }}
                   animate={{ x: 0, opacity: 1 }}
                   transition={{ delay: 0.6 }}
                >
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2 block ml-1">
                    Security Key
                  </label>
                  <div className="relative group">
                    <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500 group-focus-within:text-blue-400 transition-colors" />
                    <Input
                      type="password"
                      placeholder="••••••••••••"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-12 bg-zinc-800/50 border-white/5 text-white placeholder:text-zinc-600 focus:border-blue-500/50 focus:ring-blue-500/20 rounded-2xl h-14 text-base transition-all"
                      disabled={isLoading}
                    />
                  </div>
                </motion.div>
              </div>

              {/* ACTION BUTTON */}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <Button 
                  type="submit" 
                  className="w-full h-14 bg-white hover:bg-zinc-200 text-black font-bold text-lg rounded-2xl transition-all active:scale-[0.98] shadow-xl shadow-white/5 flex items-center justify-center gap-2 group" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : (
                    <>
                      Verify Identity
                      <ShieldCheck className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </motion.div>
            </form>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 pt-6 border-t border-white/5"
            >
              <div className="flex items-center justify-between text-[11px] font-medium text-zinc-500 uppercase tracking-widest">
                <span>Access: Restricted</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Tier: Operations Lead</span>
              </div>
            </motion.div>
          </CardContent>
        </Card>

        {/* FOOTER */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-10 text-center text-[10px] text-zinc-600 uppercase tracking-[0.3em] font-black"
        >
          Secure Operations Portal <br />
          <span className="text-emerald-500/40 mt-1 block">R-22 TUFOP CORE ACCESS</span>
        </motion.p>
      </motion.div>
    </div>
  );
}
