import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || '';

// If credentials aren't provided, we'll use mock data in the services
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
