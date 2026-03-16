import * as React from "react";
import { Search, Bell, User, Sun, Moon, CheckCircle2, AlertCircle as AlertIcon, Info, LogOut, Settings, MapPin, ShieldCheck } from "lucide-react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useAuth } from "../../lib/AuthContext";
import { useDashboardData } from "../../hooks/useDashboardData";
import { cn } from "../../lib/utils";
import { supabase } from "../../lib/supabase";
import { motion, AnimatePresence } from "motion/react";

interface TopBarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export function TopBar({ isDark, toggleTheme }: TopBarProps) {
  const { profile, signOut } = useAuth();
  const { data } = useDashboardData(profile?.id);
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [showProfileMenu, setShowProfileMenu] = React.useState(false);
  
  const userInitial = profile?.full_name ? profile.full_name[0] : null;
  const unreadCount = (data?.notifications || []).filter(n => !n.is_read).length || 0;

  const markAllAsRead = async () => {
    if (!profile?.id) return;
    await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', profile.id);
  };

  return (
    <header className="h-20 border-b border-white/5 bg-zinc-950/40 backdrop-blur-3xl flex items-center justify-between px-8 sticky top-0 z-40 transition-all">
      <div className="flex items-center gap-4 w-full max-w-lg">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
          <Input 
            placeholder="Search TUFOP records and archives..." 
            className="pl-12 bg-white/5 border-white/5 focus-visible:ring-emerald-500/20 text-white rounded-2xl h-12"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 bg-white/5 p-1 rounded-2xl border border-white/5 mr-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-zinc-500 hover:text-white rounded-xl h-10 w-10">
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          <div className="relative">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfileMenu(false);
              }}
              className={cn(
                "relative text-zinc-500 hover:text-white transition-colors rounded-xl h-10 w-10",
                showNotifications && "bg-zinc-800 text-white"
              )}
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-emerald-500 rounded-full border-2 border-zinc-950 animate-pulse" />
              )}
            </Button>

            {/* Notifications Dropdown */}
            <AnimatePresence>
              {showNotifications && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-14 right-[-50px] w-80 bg-zinc-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden z-50 pointer-events-auto backdrop-blur-3xl"
                >
                  <div className="p-5 border-b border-white/10 flex items-center justify-between bg-white/5">
                    <h3 className="font-bold text-[10px] uppercase tracking-[0.2em] text-zinc-500">Alert Center</h3>
                    {unreadCount > 0 && (
                      <button 
                        onClick={markAllAsRead}
                        className="text-[10px] font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
                      >
                        Clear All
                      </button>
                    )}
                  </div>
                  <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                    {data?.notifications.length === 0 ? (
                      <div className="p-10 text-center">
                        <Bell className="h-8 w-8 text-zinc-800 mx-auto mb-3" />
                        <p className="text-xs text-zinc-500">Perfectly quiet!</p>
                      </div>
                    ) : (
                      data?.notifications.map((notif) => (
                        <div 
                          key={notif.id} 
                          className={cn(
                            "p-5 transition-colors hover:bg-white/5 relative group",
                            !notif.is_read && "bg-emerald-500/[0.03]"
                          )}
                        >
                          <div className="flex gap-4">
                            <div className={cn(
                              "h-10 w-10 rounded-xl flex items-center justify-center shrink-0 border border-white/5",
                              notif.type === 'success' ? "bg-emerald-500/10 text-emerald-500" :
                              notif.type === 'error' ? "bg-red-500/10 text-red-500" :
                              "bg-blue-500/10 text-blue-500"
                            )}>
                               {notif.type === 'success' ? <CheckCircle2 className="h-5 w-5" /> :
                                notif.type === 'error' ? <AlertIcon className="h-5 w-5" /> :
                                <Info className="h-5 w-5" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-white mb-1">{notif.title}</p>
                              <p className="text-[11px] text-zinc-500 leading-relaxed font-medium line-clamp-2">{notif.message}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* --- PREMIUM PROFILE INTERACTIVE COMPONENT --- */}
        <div className="relative">
          <button 
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className={cn(
              "flex items-center gap-3 pl-4 pr-1 py-1 rounded-2xl border transition-all duration-300 group",
              showProfileMenu 
                ? "bg-white border-white shadow-xl shadow-white/5" 
                : "bg-white/5 border-white/5 hover:border-white/20"
            )}
          >
            <div className="text-right hidden sm:block">
              <p className={cn(
                "text-sm font-black tracking-tight leading-none transition-colors",
                showProfileMenu ? "text-zinc-950" : "text-white"
              )}>
                {profile?.full_name || 'TUFOP Member'}
              </p>
              <p className={cn(
                "text-[9px] font-black uppercase tracking-widest mt-1 opacity-60",
                showProfileMenu ? "text-emerald-700" : "text-emerald-400"
              )}>
                {profile?.designation || 'Operational Tier'}
              </p>
            </div>
            
            <div className={cn(
              "h-10 w-10 rounded-xl flex items-center justify-center overflow-hidden border shadow-sm transition-all duration-300",
              showProfileMenu 
                ? "bg-zinc-950 border-white ring-2 ring-emerald-500/20" 
                : "bg-zinc-900 border-white/10 group-hover:scale-105"
            )}>
              {userInitial ? (
                <span className={cn(
                  "font-black text-sm transition-colors",
                  showProfileMenu ? "text-emerald-400" : "text-emerald-400"
                )}>
                  {userInitial}
                </span>
              ) : (
                <User className="h-5 w-5 text-zinc-500" />
              )}
            </div>
          </button>

          {/* PROFILE DROPDOWN */}
          <AnimatePresence>
            {showProfileMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-16 right-0 w-72 bg-white rounded-[32px] shadow-2xl p-6 z-50 overflow-hidden"
              >
                <div className="relative">
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-2xl rounded-full" />
                  
                  <div className="flex flex-col items-center text-center mb-8">
                    <div className="w-16 h-16 rounded-3xl bg-zinc-950 flex items-center justify-center mb-4 border-4 border-zinc-100 shadow-xl">
                      <span className="text-2xl font-black text-emerald-400">{userInitial}</span>
                    </div>
                    <h2 className="text-xl font-black text-zinc-950 tracking-tight">{profile?.full_name}</h2>
                    <div className="flex items-center gap-1.5 mt-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700">{profile?.role} Verified</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <button className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-zinc-50 transition-colors group">
                      <div className="flex items-center gap-4">
                        <User className="w-5 h-5 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
                        <span className="text-sm font-bold text-zinc-600 group-hover:text-zinc-900 transition-colors">Admin Profile</span>
                      </div>
                    </button>
                    <button className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-zinc-50 transition-colors group">
                      <div className="flex items-center gap-4">
                        <Settings className="w-5 h-5 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
                        <span className="text-sm font-bold text-zinc-600 group-hover:text-zinc-900 transition-colors">System Settings</span>
                      </div>
                    </button>
                  </div>

                  <div className="mt-6 pt-6 border-t border-zinc-100">
                    <button 
                      onClick={() => signOut()}
                      className="w-full flex items-center gap-4 p-4 rounded-2xl bg-red-50 hover:bg-red-100 text-red-600 transition-all font-bold text-sm"
                    >
                      <LogOut className="w-5 h-5" />
                      Log Out Securely
                    </button>
                  </div>

                  <p className="mt-6 text-center text-[9px] text-zinc-400 font-bold uppercase tracking-widest leading-relaxed">
                    TUFOP Digital Asset <br />
                    Secure Version 2.0.4
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
