// Core data types for the consulting platform
export interface Industry {
  id: string;
  name: string;
  slug: string;
  description: string;
  overview: string;
  challenges: string[];
  trends: string[];
  services: string[];
  caseStudies: CaseStudy[];
  insights: Insight[];
  experts: Expert[];
  regions: string[];
  featured: boolean;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  overview: string;
  subServices: SubService[];
  methodologies: string[];
  tools: string[];
  industries: string[];
  insights: Insight[];
  experts: Expert[];
  results: ClientResult[];
  featured: boolean;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SubService {
  id: string;
  name: string;
  description: string;
  parentService: string;
}

export interface Insight {
  id: string;
  title: string;
  slug: string;
  type: 'article' | 'report' | 'case-study' | 'video' | 'podcast' | 'webinar' | 'book' | 'brief';
  content: string;
  excerpt: string;
  author: Expert;
  industries: string[];
  services: string[];
  topics: string[];
  regions: string[];
  featured: boolean;
  trending: boolean;
  gated: boolean;
  downloadUrl?: string;
  image: string;
  readTime: number;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Expert {
  id: string;
  name: string;
  slug: string;
  role: string;
  bio: string;
  expertise: string[];
  industries: string[];
  services: string[];
  insights: string[];
  locations: string[];
  image: string;
  email?: string;
  linkedin?: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Office {
  id: string;
  name: string;
  slug: string;
  region: string;
  country: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  coordinates: { lat: number; lng: number };
  leadership: Expert[];
  insights: Insight[];
  careers: Career[];
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Career {
  id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  type: 'full-time' | 'internship' | 'graduate' | 'student';
  experience: 'entry' | 'mid' | 'senior' | 'executive';
  description: string;
  requirements: string[];
  benefits: string[];
  applicationUrl: string;
  featured: boolean;
  publishedAt: Date;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  client: string;
  industry: string;
  services: string[];
  challenge: string;
  solution: string;
  results: string[];
  image: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClientResult {
  id: string;
  metric: string;
  value: string;
  description: string;
  caseStudy: string;
}

export interface MediaItem {
  id: string;
  title: string;
  slug: string;
  type: 'press-release' | 'news' | 'announcement';
  content: string;
  excerpt: string;
  publishedAt: Date;
  featured: boolean;
  image?: string;
  attachments: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SearchResult {
  id: string;
  title: string;
  type: 'page' | 'insight' | 'expert' | 'industry' | 'service' | 'office' | 'career';
  url: string;
  excerpt: string;
  image?: string;
  relevance: number;
}

export interface NavigationItem {
  label: string;
  href?: string;
  children?: NavigationItem[];
  featured?: boolean;
  description?: string;
  image?: string;
}