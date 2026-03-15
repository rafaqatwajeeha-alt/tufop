export interface KPI {
  label: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down' | 'neutral';
}

export interface University {
  id: string;
  name: string;
  coverage: number;
  status: 'active' | 'inactive' | 'alert';
}

export interface Ambassador {
  id: string;
  name: string;
  university: string;
  status: 'Active' | 'Idle' | 'Alert';
  taskCompletion: number;
}

export interface ContentPerformance {
  module: string;
  date: string;
  attendance: number;
  score: number;
}

export interface Cohort {
  id: string;
  name: string;
  mentor: string;
  mentees: number;
  completion: number;
}
