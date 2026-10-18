import type { Job, JobFilterState, LaunchChecklistItem, MonetizationInputs } from '../types/job.ts';

/**
 * Filter jobs according to user criteria
 */
export function filterJobs(jobs: Job[], filters: JobFilterState): Job[] {
  return jobs.filter((job) => {
    // Search query filter (matches title, employer, description, requirements, location)
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase().trim();
      const matchTitle = job.title.toLowerCase().includes(q);
      const matchEmployer = job.employer.toLowerCase().includes(q);
      const matchLocation = job.location.toLowerCase().includes(q);
      const matchDesc = job.description.toLowerCase().includes(q);
      const matchReq = job.requirements.some((r) => r.toLowerCase().includes(q));
      if (!matchTitle && !matchEmployer && !matchLocation && !matchDesc && !matchReq) {
        return false;
      }
    }

    // Category filter
    if (filters.category && filters.category !== 'All') {
      if (job.category !== filters.category) {
        return false;
      }
    }

    // Location filter
    if (filters.location && filters.location !== 'All Zimbabwe') {
      const jobLoc = job.location.toLowerCase();
      const filterLoc = filters.location.toLowerCase();
      if (!jobLoc.includes(filterLoc)) {
        return false;
      }
    }

    // Verified only filter
    if (filters.verifiedOnly && !job.verified) {
      return false;
    }

    // Featured only filter
    if (filters.featuredOnly && !job.featured) {
      return false;
    }

    // Currency filter
    if (filters.payCurrency && filters.payCurrency !== 'All') {
      if (job.payCurrency !== filters.payCurrency) {
        return false;
      }
    }

    return true;
  }).sort((a, b) => {
    if (filters.sortBy === 'featured') {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
    }
    if (filters.sortBy === 'deadline') {
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    }
    // Default 'latest'
    return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
  });
}

/**
 * Calculate checklist completion stats
 */
export function calculateChecklistProgress(items: LaunchChecklistItem[]): {
  completedCount: number;
  totalCount: number;
  percentage: number;
  isAllDone: boolean;
} {
  const totalCount = items.length;
  const completedCount = items.filter((item) => item.completed).length;
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  return {
    completedCount,
    totalCount,
    percentage,
    isAllDone: totalCount > 0 && completedCount === totalCount
  };
}

/**
 * Calculate estimated monthly revenue based on monetization inputs
 */
export function calculateMonetizationRevenue(inputs: MonetizationInputs): {
  featuredRevenue: number;
  promoRevenue: number;
  recruitmentRevenue: number;
  totalRevenue: number;
} {
  const featuredRevenue = (inputs.featuredCount || 0) * (inputs.featuredPrice || 0);
  const promoRevenue = (inputs.promoCount || 0) * (inputs.promoPrice || 0);
  const recruitmentRevenue = (inputs.recruitmentCount || 0) * (inputs.recruitmentPrice || 0);
  const totalRevenue = featuredRevenue + promoRevenue + recruitmentRevenue;

  return {
    featuredRevenue,
    promoRevenue,
    recruitmentRevenue,
    totalRevenue
  };
}

/**
 * Check if a date string is in the past
 */
export function isDeadlinePassed(deadlineStr: string): boolean {
  if (!deadlineStr || deadlineStr.toLowerCase().includes('open') || deadlineStr.toLowerCase().includes('until')) {
    return false;
  }
  const deadline = new Date(deadlineStr);
  if (isNaN(deadline.getTime())) {
    return false;
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return deadline < today;
}

/**
 * Format date for friendly display
 */
export function formatFriendlyDate(dateStr: string): string {
  if (!dateStr) return 'Ongoing';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

/**
 * Generate viral WhatsApp sharing URL for a job listing
 */
export function generateWhatsAppShareUrl(job: Job, appUrl: string = ''): string {
  const message = `*🇿🇼 Opportunity on ZimJobs & Gigs:*
*${job.title}*
🏢 Employer: ${job.employer}
📍 Location: ${job.location}
💼 Type: ${job.category}
💰 Pay: ${job.pay}
⏳ Deadline: ${formatFriendlyDate(job.deadline)}
✅ Verified No-Fee Vacancy

Apply / View details:
${appUrl ? `${appUrl}?job=${job.id}` : window.location.href}`;

  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

/**
 * Convert jobs array to CSV string matching the Google Sheet format
 */
export function exportJobsToCSV(jobs: Job[]): string {
  const headers = ['Job Title', 'Employer', 'Location', 'Category', 'Pay', 'Deadline', 'Apply Link', 'Verified'];
  const rows = jobs.map((job) => [
    `"${(job.title || '').replace(/"/g, '""')}"`,
    `"${(job.employer || '').replace(/"/g, '""')}"`,
    `"${(job.location || '').replace(/"/g, '""')}"`,
    `"${(job.category || '').replace(/"/g, '""')}"`,
    `"${(job.pay || '').replace(/"/g, '""')}"`,
    `"${(job.deadline || '').replace(/"/g, '""')}"`,
    `"${(job.applyLink || '').replace(/"/g, '""')}"`,
    job.verified ? 'Yes' : 'No'
  ]);

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
}
