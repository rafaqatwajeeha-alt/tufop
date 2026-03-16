import * as React from "react";
import { Search, Bell, User, Sun, Moon, CheckCircle2, AlertCircle as AlertIcon, Info, X } from "lucide-react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useAuth } from "../../lib/AuthContext";
import { useDashboardData } from "../../hooks/useDashboardData";
import { cn } from "../../lib/utils";
import { supabase } from "../../lib/supabase";

interface TopBarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export function TopBar({ isDark, toggleTheme }: TopBarProps) {
  const { profile } = useAuth();
  const { data } = useDashboardData();
  const [showNotifications, setShowNotifications] = React.useState(false);
  
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
    <header className="h-16 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-40 transition-all">
      <div className="flex items-center gap-4 w-full max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input 
            placeholder="Search TUFOP network..." 
            className="pl-10 bg-zinc-50 dark:bg-zinc-900 border-none focus-visible:ring-zinc-200 dark:focus-visible:ring-zinc-800 dark:text-white"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 relative">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          <div className="relative">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setShowNotifications(!showNotifications)}
              className={cn(
                "relative text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors",
                showNotifications && "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white"
              )}
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full border-2 border-white dark:border-zinc-950 animate-pulse" />
              )}
            </Button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute top-12 right-0 w-80 bg-white dark:bg-zinc-950 border dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2">
                <div className="p-4 border-b dark:border-zinc-800 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/50">
                  <h3 className="font-bold text-xs uppercase tracking-widest text-zinc-500">Notifications</h3>
                  {unreadCount > 0 && (
                    <button 
                      onClick={markAllAsRead}
                      className="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>
                <div className="max-h-[320px] overflow-y-auto divide-y dark:divide-zinc-800">
                  {data?.notifications.length === 0 ? (
                    <div className="p-8 text-center">
                      <div className="h-10 w-10 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Bell className="h-5 w-5 text-zinc-400" />
                      </div>
                      <p className="text-xs text-zinc-500">All caught up!</p>
                    </div>
                  ) : (
                    data?.notifications.map((notif) => (
                      <div 
                        key={notif.id} 
                        className={cn(
                          "p-4 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/50 relative group",
                          !notif.is_read && "bg-blue-50/30 dark:bg-blue-900/5"
                        )}
                      >
                        {!notif.is_read && (
                          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-600" />
                        )}
                        <div className="flex gap-3">
                          <div className={cn(
                            "h-8 w-8 rounded-lg flex items-center justify-center shrink-0",
                            notif.type === 'success' ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600" :
                            notif.type === 'error' ? "bg-red-100 dark:bg-red-900/30 text-red-600" :
                            "bg-blue-100 dark:bg-blue-900/30 text-blue-600"
                          )}>
                             {notif.type === 'success' ? <CheckCircle2 className="h-4 w-4" /> :
                              notif.type === 'error' ? <AlertIcon className="h-4 w-4" /> :
                              <Info className="h-4 w-4" />}
                          </div>
                          <div>
                            <p className="text-xs font-bold dark:text-white mb-0.5">{notif.title}</p>
                            <p className="text-[11px] text-zinc-500 leading-relaxed">{notif.message}</p>
                            <p className="text-[9px] text-zinc-400 mt-2 font-medium">Recently</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 pl-6 border-l dark:border-zinc-800">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold dark:text-white leading-none capitalize">{profile?.full_name || 'Loading Account...'}</p>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mt-1">{profile?.designation || profile?.role || 'Guest'}</p>
          </div>
          <div className="h-9 w-9 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center overflow-hidden border dark:border-zinc-800 shadow-sm transition-transform hover:scale-105 cursor-pointer">
            {userInitial ? (
              <span className="font-black text-blue-600 dark:text-blue-400 text-sm">{userInitial}</span>
            ) : (
              <User className="h-5 w-5 text-zinc-400" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
