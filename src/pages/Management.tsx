import * as React from "react";
import { 
  UserPlus, 
  Key, 
  Copy, 
  Check, 
  Shield, 
  Users, 
  Mail, 
  RefreshCw 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useDashboardData } from "../hooks/useDashboardData";
import { supabase } from "../lib/supabase";
import { motion, AnimatePresence } from "motion/react";

export function Management() {
  const { data } = useDashboardData();
  const [name, setName] = React.useState("");
  const [university, setUniversity] = React.useState("");
  const [generatedId, setGeneratedId] = React.useState("");
  const [generatedPass, setGeneratedPass] = React.useState("");
  const [copied, setCopied] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const generateCredentials = () => {
    if (!name) return;
    const cleanName = name.toLowerCase().replace(/\s+/g, '_');
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const id = `${cleanName}${randomSuffix}@tufop.dashboard`;
    
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%";
    let password = "Tufop_";
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    setGeneratedId(id);
    setGeneratedPass(password);
  };

  const handleCreate = async () => {
    setIsLoading(true);
    try {
      // 1. Add to ambassadors table
      const { data: ambData, error: ambError } = await supabase
        .from('ambassadors')
        .insert([{ name, university, status: 'Active', taskCompletion: 0 }])
        .select()
        .single();

      if (ambError) throw ambError;

      // 2. Note: Supabase doesn't allow front-end user creation without service role.
      // We will show the "Card" for the admin to use in the Supabase Auth UI.
      // Or provide the SQL in a handy box.
      
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    const text = `ID: ${generatedId}\nPassword: ${generatedPass}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">User Management</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">Register co-founders and auto-generate ambassador credentials.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Registration Form */}
        <Card className="dark:bg-zinc-900/50 dark:border-zinc-800 border-zinc-200 shadow-xl shadow-zinc-200/50 dark:shadow-none bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <UserPlus className="h-5 w-5 text-blue-500" />
              Register New Ambassador
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Full Name</label>
              <Input 
                placeholder="e.g. Sarah Ahmed" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={generateCredentials}
                className="dark:bg-zinc-900 dark:border-zinc-800 dark:text-white h-11"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">University</label>
              <Input 
                placeholder="e.g. NUST" 
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                className="dark:bg-zinc-900 dark:border-zinc-800 dark:text-white h-11"
              />
            </div>

            <div className="pt-4">
               <Button 
                onClick={handleCreate} 
                disabled={!name || !university || isLoading}
                className="w-full h-11 bg-zinc-900 dark:bg-white dark:text-zinc-950 hover:opacity-90"
               >
                 {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : "Stage in Database"}
               </Button>
            </div>
          </CardContent>
        </Card>

        {/* Credential Card */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {generatedId ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <Card className="border-2 border-dashed border-blue-500/30 bg-blue-500/5 dark:bg-blue-500/5 backdrop-blur-sm overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-3">
                    <Shield className="h-10 w-10 text-blue-500/10" />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">Credential Card</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-1">
                      <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">TUFOP ID</p>
                      <div className="flex items-center justify-between p-3 bg-white dark:bg-zinc-900 rounded-lg border dark:border-zinc-800">
                        <code className="text-sm font-mono dark:text-white">{generatedId}</code>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">TEMP PASSWORD</p>
                      <div className="flex items-center justify-between p-3 bg-white dark:bg-zinc-900 rounded-lg border dark:border-zinc-800">
                        <code className="text-sm font-mono dark:text-white">{generatedPass}</code>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={copyToClipboard}
                      variant="outline"
                      className="w-full flex items-center gap-2 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all font-bold"
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4 text-emerald-500" />
                          Copied to Clipboard
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          Copy Invitation Data
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <div className="h-full min-h-[300px] border-2 border-dashed dark:border-zinc-800 rounded-2xl flex flex-col items-center justify-center p-8 text-center text-zinc-500">
                <Key className="h-12 w-12 mb-4 opacity-10" />
                <p className="text-sm">Credentials will appear here once you enter a name.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* SQL Migration Box */}
      {generatedId && (
        <Card className="dark:bg-zinc-950/50 border-emerald-500/20 bg-emerald-500/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg shrink-0">
                <Mail className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-emerald-700 dark:text-emerald-400">Next Step: Auth Creation</h3>
                <p className="text-xs text-emerald-600/80 dark:text-emerald-400/60 leading-relaxed">
                  Front-end code cannot create secure Auth users directly for security reasons. 
                  Please go to your **Supabase Dashboard {"->"} Authentication {"->"} Add User** and paste the ID/Password there.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
