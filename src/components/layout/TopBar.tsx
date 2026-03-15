import { Search, Bell, User, Sun, Moon } from "lucide-react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

interface TopBarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export function TopBar({ isDark, toggleTheme }: TopBarProps) {
  return (
    <header className="h-16 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center justify-between px-8 sticky top-0 z-40 transition-colors">
      <div className="flex items-center gap-4 w-full max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input 
            placeholder="Search universities, ambassadors..." 
            className="pl-10 bg-zinc-50 dark:bg-zinc-900 border-none focus-visible:ring-zinc-200 dark:focus-visible:ring-zinc-800 dark:text-white"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-zinc-500" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-zinc-950"></span>
        </Button>
        <div className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center overflow-hidden border border-zinc-200 dark:border-zinc-700">
          <User className="h-5 w-5 text-zinc-500" />
        </div>
      </div>
    </header>
  );
}
