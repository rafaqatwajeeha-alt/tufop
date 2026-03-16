import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

export interface DashboardData {
  ambassadors: any[];
  universities: any[];
  kpis: any[];
  roadmap: any[];
  knowledge: any[];
  notifications: any[];
  programs: any[];
  recentActivity: any[];
  content: any[];
  projects: any[];
}

export function useDashboardData() {
  const { data, isLoading: loading, refetch } = useQuery<DashboardData>({
    queryKey: ['dashboard-data'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();

      const [
        ambassadorsRes,
        universitiesRes,
        kpisRes,
        roadmapRes,
        knowledgeRes,
        notificationsRes,
        programsRes,
        recentActivityRes,
        contentRes,
        projectsRes
      ] = await Promise.all([
        supabase.from('ambassadors').select('*'),
        supabase.from('universities').select('*'),
        supabase.from('kpis').select('*'),
        supabase.from('roadmap').select('*'),
        supabase.from('knowledge').select('*'),
        supabase.from('notifications')
          .select('*')
          .eq('user_id', user?.id || '')
          .order('created_at', { ascending: false }),
        supabase.from('programs').select('*'),
        supabase.from('recent_activity').select('*'),
        supabase.from('content_performance').select('*'),
        supabase.from('projects').select('*')
      ]);

      const ambassadors = ambassadorsRes.data || [];
      const universities = universitiesRes.data || [];
      const kpis = kpisRes.data || [];
      const roadmap = roadmapRes.data || [];
      const knowledge = knowledgeRes.data || [];
      const notifications = notificationsRes.data || [];
      const programs = programsRes.data || [];
      const recentActivity = recentActivityRes.data || [];
      const content = contentRes.data || [];
      const projects = projectsRes.data || [];

      // Dynamic counts for KPIs
      const ambassadorCount = ambassadors.length;
      const universityCount = universities.length;
      
      const mappedKpis = kpis.map(kpi => {
        if (kpi.label === 'Total Ambassadors') return { ...kpi, value: ambassadorCount.toString() };
        if (kpi.label === 'Universities Covered') return { ...kpi, value: universityCount.toString() };
        return kpi;
      });

      return {
        ambassadors,
        universities,
        kpis: mappedKpis,
        roadmap,
        knowledge,
        notifications,
        programs,
        recentActivity,
        content,
        projects
      };
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Setup one global listener if we haven't already
  // Note: In a real app, you'd do this in a provider or a more global location
  // to avoid multiple subscriptions, but QueryClient handles the deduplication of the fetch itself.
  return { data, loading, refetch };
}
