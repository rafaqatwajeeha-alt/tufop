import * as React from "react";
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
  const [data, setData] = React.useState<DashboardData | null>(null);
  const [loading, setLoading] = React.useState(true);

  const fetchData = React.useCallback(async () => {
    try {
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

      setData({
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
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchData();

    // Setup real-time listeners
    let channel: any;
    const setupRealtime = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      channel = supabase
        .channel('dashboard-updates')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'ambassadors' },
          () => fetchData()
        )
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'universities' },
          () => fetchData()
        )
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'programs' },
          () => fetchData()
        )
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'projects' },
          () => fetchData()
        );

      if (user?.id) {
        channel.on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'notifications', filter: `user_id=eq.${user.id}` },
          () => fetchData()
        );
      }

      channel.subscribe();
    };

    setupRealtime();

    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, [fetchData]);

  return { data, loading };
}
