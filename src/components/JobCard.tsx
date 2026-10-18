import React from 'react';
import {
  MapPin,
  Clock,
  DollarSign,
  Bookmark,
  Share2,
  CheckCircle2,
  ExternalLink,
  MessageCircle,
  Mail,
  Sparkles
} from 'lucide-react';
import { Job } from '../types/job';
import { isDeadlinePassed, formatFriendlyDate, generateWhatsAppShareUrl } from '../utils/jobUtils';

interface JobCardProps {
  job: Job;
  isSaved: boolean;
  onToggleSave: (jobId: string) => void;
  onSelect: (job: Job) => void;
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  isSaved,
  onToggleSave,
  onSelect
}) => {
  const isExpired = isDeadlinePassed(job.deadline);

  // Category badge styles
  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'Part-time':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Small gigs':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Remote':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Attachment / Internship':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Full-time':
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = generateWhatsAppShareUrl(job);
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleSave(job.id);
  };

  return (
    <article
      onClick={() => onSelect(job)}
      className={`group relative bg-white rounded-2xl border transition-all duration-200 cursor-pointer hover:shadow-md ${
        job.featured
          ? 'border-emerald-300 ring-1 ring-emerald-400/40 bg-gradient-to-br from-white via-emerald-50/20 to-white'
          : 'border-slate-200 hover:border-slate-300'
      } p-5 flex flex-col justify-between`}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(job);
        }
      }}
      aria-label={`View details for ${job.title} at ${job.employer}`}
    >
      <div>
        {/* Top Badges & Actions */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {job.featured && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-400/20 text-amber-900 border border-amber-300">
                <Sparkles className="w-3 h-3 text-amber-600 fill-amber-500" />
                Featured
              </span>
            )}
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold border ${getCategoryBadgeClass(
                job.category
              )}`}
            >
              {job.category}
            </span>
            {job.verified && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Verified
              </span>
            )}
          </div>

          {/* Quick buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={handleShare}
              className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
              title="Share on WhatsApp"
              aria-label={`Share ${job.title} to WhatsApp`}
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleSaveToggle}
              className={`p-1.5 rounded-lg transition-colors ${
                isSaved
                  ? 'text-amber-600 bg-amber-50 hover:bg-amber-100'
                  : 'text-slate-400 hover:text-amber-600 hover:bg-slate-100'
              }`}
              title={isSaved ? 'Remove from Saved' : 'Save for later'}
              aria-label={isSaved ? `Unsave ${job.title}` : `Save ${job.title}`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Job Title & Employer */}
        <h3 className="font-heading font-bold text-lg text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
          {job.title}
        </h3>

        <div className="mt-1 flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-600">
          <span className="font-semibold text-slate-800">{job.employer}</span>
          <span className="flex items-center gap-1 text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            {job.location}
          </span>
        </div>

        {/* Description snippet */}
        <p className="mt-3 text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {job.description}
        </p>
      </div>

      {/* Footer Info & Application Trigger */}
      <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
        <div>
          <span className="text-[10px] uppercase font-semibold text-slate-400 block tracking-wider">
            Compensation
          </span>
          <span className="font-bold text-slate-900 text-sm">{job.pay}</span>
        </div>

        <div className="flex items-center gap-2">
          {isExpired ? (
            <span className="px-2 py-1 rounded bg-rose-50 text-rose-700 font-semibold text-[11px] border border-rose-200">
              Expired
            </span>
          ) : (
            <span className="text-slate-500 flex items-center gap-1 text-[11px]">
              <Clock className="w-3 h-3 text-slate-400" />
              Due: {formatFriendlyDate(job.deadline)}
            </span>
          )}

          <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 group-hover:text-emerald-800 ml-1 text-xs">
            View & Apply
            <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
};
