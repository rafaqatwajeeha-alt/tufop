import { useQuery } from "@tanstack/react-query";
import { KPI, University, Ambassador, ContentPerformance } from "../types/dashboard";

// Mock data for initial development
const MOCK_KPIS: KPI[] = [
  { label: "Total Ambassadors", value: "124", change: "+12", trend: "up" },
  { label: "Active Programs", value: "18", change: "+3", trend: "up" },
  { label: "Universities Covered", value: "42", change: "+5", trend: "up" },
  { label: "Content Published", value: "856", change: "+42", trend: "up" },
];

const MOCK_UNIVERSITIES: University[] = [
  { id: "1", name: "LUMS", coverage: 82, status: "active" },
  { id: "2", name: "NUST", coverage: 76, status: "active" },
  { id: "3", name: "IBA", coverage: 61, status: "active" },
  { id: "4", name: "FAST", coverage: 44, status: "active" },
  { id: "5", name: "UCP", coverage: 18, status: "alert" },
];

const MOCK_AMBASSADORS: Ambassador[] = [
  { id: "1", name: "Sara Ahmed", university: "LUMS", status: "Active", taskCompletion: 92 },
  { id: "2", name: "M. Khan", university: "NUST", status: "Active", taskCompletion: 85 },
  { id: "3", name: "Zara R.", university: "IBA", status: "Active", taskCompletion: 78 },
  { id: "4", name: "A. Farooq", university: "UCP", status: "Alert", taskCompletion: 12 },
];

const MOCK_CONTENT: ContentPerformance[] = [
  { module: "Research 101", date: "Mar 12", attendance: 87, score: 8.9 },
  { module: "CV Workshop", date: "Mar 10", attendance: 74, score: 7.8 },
  { module: "FAST Intro", date: "Mar 8", attendance: 51, score: 5.2 },
  { module: "LinkedIn Clinic", date: "Mar 18", attendance: 92, score: 9.1 },
];

const MOCK_PROGRAMS = [
  { id: "1", name: "Mentorship Cohort 4", category: "Mentorship", lead: "Dr. Sarah", start: "2024-03-01", end: "2024-06-01", participants: 150, status: "active", outcomes: "Ongoing" },
  { id: "2", name: "MedTalk Podcast", category: "Podcast", lead: "Ahmed Ali", start: "2024-01-15", end: "2024-12-31", participants: 5000, status: "active", outcomes: "12 Episodes" },
  { id: "3", name: "USMLE Pathway Session", category: "Workshop", lead: "Dr. Bilal", start: "2024-03-20", end: "2024-03-20", participants: 300, status: "planned", outcomes: "TBD" },
  { id: "4", name: "Instagram Live: PLAB", category: "Social", lead: "Zainab M.", start: "2024-03-10", end: "2024-03-10", participants: 1200, status: "completed", outcomes: "High Engagement" },
];

const MOCK_PROJECTS = [
  { id: "1", name: "Ambassador Expansion", objective: "Reach 100 Universities", owner: "Sara A.", milestones: "50/100", deadline: "2024-08-01", priority: "High", progress: 50, status: "active" },
  { id: "2", name: "Podcast Launch S2", objective: "10 New Episodes", owner: "Ahmed Ali", milestones: "2/10", deadline: "2024-05-15", priority: "Medium", progress: 20, status: "active" },
  { id: "3", name: "Mentorship Batch 5", objective: "Onboard 200 Mentees", owner: "Dr. Sarah", milestones: "Planning", deadline: "2024-07-01", priority: "High", progress: 10, status: "planned" },
];

const MOCK_PARTNERSHIPS = [
  { id: "1", name: "Dr. James Wilson", role: "Mentor", specialty: "Cardiology", organization: "Mayo Clinic", contact: "james@mayo.edu", type: "Guest Speaker", status: "Confirmed", notes: "USMLE Expert" },
  { id: "2", name: "MedEd Global", role: "Partner", specialty: "Resources", organization: "MedEd", contact: "info@meded.com", type: "Content Collab", status: "Active", notes: "Library Access" },
];

const MOCK_ROADMAP = [
  { id: "1", term: "Short-term (1-3m)", goal: "Launch Mobile App Beta", priority: "High", owner: "Tech Team", timeline: "Q2 2024", status: "In Progress" },
  { id: "2", term: "Mid-term (3-6m)", goal: "Expand to MENA Region", priority: "Medium", owner: "Growth Team", timeline: "Q3 2024", status: "Planned" },
  { id: "3", term: "Long-term (6-12m)", goal: "AI Mentorship Matching", priority: "Low", owner: "Product Team", timeline: "Q1 2025", status: "Backlog" },
];

const MOCK_KNOWLEDGE = [
  { id: "1", title: "Ambassador Guide v2", category: "Internal", path: "Guides", lastUpdated: "2024-02-15" },
  { id: "2", title: "USMLE Step 1 Pathway", category: "Pathway", path: "Medical", lastUpdated: "2024-03-01" },
  { id: "3", title: "PLAB 1 Preparation", category: "Pathway", path: "Medical", lastUpdated: "2024-01-20" },
];

const MOCK_RECENT_ACTIVITY = [
  { id: "1", user: "Sara A.", action: "added a new university", target: "King Edward Medical", time: "2h ago" },
  { id: "2", user: "System", action: "completed program", target: "Instagram Live: PLAB", time: "5h ago" },
  { id: "3", user: "Ahmed Ali", action: "uploaded content", target: "MedTalk Ep 12", time: "1d ago" },
];

export function useDashboardData() {
  return useQuery({
    queryKey: ["dashboard-data"],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      return {
        kpis: MOCK_KPIS,
        universities: MOCK_UNIVERSITIES,
        ambassadors: MOCK_AMBASSADORS,
        content: MOCK_CONTENT,
        programs: MOCK_PROGRAMS,
        projects: MOCK_PROJECTS,
        partnerships: MOCK_PARTNERSHIPS,
        roadmap: MOCK_ROADMAP,
        knowledge: MOCK_KNOWLEDGE,
        recentActivity: MOCK_RECENT_ACTIVITY,
      };
    },
  });
}
