export type JobCategory =
  | 'Full-time'
  | 'Part-time'
  | 'Small gigs'
  | 'Remote'
  | 'Attachment / Internship';

export interface Job {
  id: string;
  title: string;
  employer: string;
  location: string;
  category: JobCategory;
  pay: string; // e.g. "US$350 - $450/month", "US$25/day", "US$15/gig", "Competitive"
  payCurrency: 'USD' | 'ZiG' | 'Negotiable';
  deadline: string; // e.g. "2026-11-15" or "Open until filled"
  applyLink: string; // URL or WhatsApp link e.g. "https://wa.me/263771234567"
  applyType: 'whatsapp' | 'email' | 'url' | 'phone';
  applyContactValue: string; // Phone number or email or URL
  verified: boolean;
  featured?: boolean;
  postedDate: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  isUserSubmitted?: boolean;
}

export interface JobFilterState {
  searchQuery: string;
  category: string; // 'All' | JobCategory
  location: string; // 'All' | specific city
  verifiedOnly: boolean;
  featuredOnly: boolean;
  payCurrency: string; // 'All' | 'USD' | 'ZiG'
  sortBy: 'latest' | 'deadline' | 'featured';
}

export interface LaunchChecklistItem {
  id: string;
  label: string;
  description: string;
  completed: boolean;
}

export interface MonetizationInputs {
  featuredCount: number;
  featuredPrice: number;
  promoCount: number;
  promoPrice: number;
  recruitmentCount: number;
  recruitmentPrice: number;
}
