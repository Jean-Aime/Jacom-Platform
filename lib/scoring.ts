// Lead Scoring Algorithm
// Score range: 0-100

interface LeadProfile {
  email: string;
  company?: string;
  jobTitle?: string;
  source: string;
  downloadedContent?: number;
  pagesVisited?: number;
  timeOnSite?: number;
  hasCompanyEmail?: boolean;
}

export function calculateLeadScore(profile: LeadProfile): number {
  let score = 0;

  // Source scoring (0-25 points)
  const sourceScores: { [key: string]: number } = {
    'gated_content': 25,      // High intent
    'contact_form': 20,       // Direct inquiry
    'newsletter': 10,         // Interest
    'website': 5              // Low intent
  };
  score += sourceScores[profile.source] || 5;

  // Company email scoring (0-15 points)
  if (profile.email && profile.hasCompanyEmail !== false) {
    const emailDomain = profile.email.split('@')[1];
    const freeEmailProviders = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
    if (!freeEmailProviders.includes(emailDomain)) {
      score += 15; // Corporate email
    }
  }

  // Company provided (0-10 points)
  if (profile.company && profile.company.trim().length > 0) {
    score += 10;
  }

  // Job title scoring (0-20 points)
  if (profile.jobTitle) {
    const title = profile.jobTitle.toLowerCase();
    if (title.includes('ceo') || title.includes('founder') || title.includes('president')) {
      score += 20; // C-level
    } else if (title.includes('director') || title.includes('vp') || title.includes('head')) {
      score += 15; // Director level
    } else if (title.includes('manager') || title.includes('lead')) {
      score += 10; // Manager level
    } else {
      score += 5; // Other
    }
  }

  // Engagement scoring (0-30 points)
  if (profile.downloadedContent) {
    score += Math.min(profile.downloadedContent * 5, 15); // Max 15 points
  }
  if (profile.pagesVisited) {
    score += Math.min(Math.floor(profile.pagesVisited / 3), 10); // Max 10 points
  }
  if (profile.timeOnSite && profile.timeOnSite > 60) {
    score += 5; // Spent more than 1 minute
  }

  return Math.min(score, 100); // Cap at 100
}

export function getLeadGrade(score: number): string {
  if (score >= 80) return 'A'; // Hot lead
  if (score >= 60) return 'B'; // Warm lead
  if (score >= 40) return 'C'; // Qualified lead
  if (score >= 20) return 'D'; // Cold lead
  return 'F'; // Unqualified
}

export function getLeadPriority(score: number): 'high' | 'medium' | 'low' {
  if (score >= 70) return 'high';
  if (score >= 40) return 'medium';
  return 'low';
}

export function getLeadStatus(score: number): string {
  if (score >= 80) return 'Hot - Contact Immediately';
  if (score >= 60) return 'Warm - Follow Up Soon';
  if (score >= 40) return 'Qualified - Nurture';
  if (score >= 20) return 'Cold - Long-term Nurture';
  return 'Unqualified';
}
