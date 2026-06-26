export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'ecommerce' | 'saas' | 'architecture' | 'performance';
  featured: boolean;
  year: string;
  duration: string;
  problem: string;
  role: string;
  architecture: string;
  stack: string[];
  metrics: { label: string; value: string }[];
  results: { label: string; value: string }[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  duration: string;
  type: string;
  description: string;
  impact: string;
  achievements: string[];
  technologies: string[];
}

export interface Skill {
  name: string;
  category: string;
  level: number;
  experience: string;
}

export interface ProcessPhase {
  number: string;
  title: string;
  description: string;
  activities: string[];
  quote: string;
}

export type NavSection =
  | 'hero'
  | 'projects'
  | 'about'
  | 'skills'
  | 'experience'
  | 'process'
  | 'recruiter'
  | 'contact';
