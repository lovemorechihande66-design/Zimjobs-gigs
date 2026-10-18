import React, { useState, useEffect } from 'react';
import {
  X,
  MapPin,
  Clock,
  DollarSign,
  Bookmark,
  Share2,
  CheckCircle2,
  ShieldAlert,
  MessageCircle,
  Mail,
  ExternalLink,
  Flag,
  Sparkles,
  Check
} from 'lucide-react';
import { Job } from '../types/job';
import { formatFriendlyDate, generateWhatsAppShareUrl, isDeadlinePassed } from '../utils/jobUtils';

interface JobDetailModalProps {
  job: Job | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (jobId: string) => void;
  onReportJob: (job: Job) => void;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({
  job,
  onClose,
  isSaved,
  onToggleSave,
  onReportJob
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [reportSubmitted, setReportSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (job) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [job, onClose]);

  if (!job) return null;

  const isExpired = isDeadlinePassed(job.deadline);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const url = generateWhatsAppShareUrl(job);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleReport = () => {
    onReportJob(job);
    setReportSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="job-detail-title"
    >
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header bar */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between gap-4 bg-gradient-to-b from-slate-50 to-white">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              {job.featured && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                  Featured Vacancy
                </span>
              )}
              <span className="px-2 py-0.5 rounded text-xs font-semibold bg-emerald-100 text-emerald-800">
                {job.category}
              </span>
              {job.verified && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Verified No-Fee Listing
                </span>
              )}
            </div>

            <h2 id="job-detail-title" className="font-heading text-2xl font-bold text-slate-900 pt-1">
              {job.title}
            </h2>
            <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-sm text-slate-600">
              <span className="font-semibold text-slate-800">{job.employer}</span>
              <span className="flex items-center gap-1 text-slate-500">
                <MapPin className="w-4 h-4 text-emerald-600" />
                {job.location}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            aria-label="Close job details modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700">
          {/* Key Facts Card */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div>
              <span className="text-xs uppercase font-medium text-slate-500 block">
                Pay / Compensation
              </span>
              <span className="text-base font-bold text-emerald-700">{job.pay}</span>
            </div>
            <div>
              <span className="text-xs uppercase font-medium text-slate-500 block">
                Application Deadline
              </span>
              <span className={`text-sm font-semibold ${isExpired ? 'text-rose-600' : 'text-slate-900'}`}>
                {formatFriendlyDate(job.deadline)}
                {isExpired && ' (Expired)'}
              </span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-xs uppercase font-medium text-slate-500 block">
                Application Method
              </span>
              <span className="text-sm font-semibold text-slate-900 capitalize">
                {job.applyType} Direct
              </span>
            </div>
          </div>

          {/* Anti-Scam Reassurance Notice */}
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 space-y-1">
              <p className="font-bold">⚠️ ZimJobs Safe Job Guarantee</p>
              <p>
                Legitimate employers in Zimbabwe will <strong>never ask you to send money</strong> via
                EcoCash, Innbucks, or cash for application forms, uniforms, interview bookings, or
                medical screenings. If this employer requests money, do not pay and report them below.
              </p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-slate-900 mb-2">
              Role Overview
            </h4>
            <p className="text-slate-700 leading-relaxed whitespace-pre-line">{job.description}</p>
          </div>

          {/* Responsibilities */}
          {job.responsibilities && job.responsibilities.length > 0 && (
            <div>
              <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-slate-900 mb-2">
                What You Will Do
              </h4>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
                {job.responsibilities.map((resp, idx) => (
                  <li key={idx}>{resp}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Requirements */}
          {job.requirements && job.requirements.length > 0 && (
            <div>
              <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-slate-900 mb-2">
                Requirements & Skills
              </h4>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
                {job.requirements.map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer with Apply CTA & Actions */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleSave(job.id)}
              className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl border text-sm font-semibold transition-colors ${
                isSaved
                  ? 'border-amber-300 bg-amber-50 text-amber-800'
                  : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-500' : ''}`} />
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>

            <button
              onClick={handleShareWhatsApp}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-sm font-semibold transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>WhatsApp Share</span>
            </button>

            {!reportSubmitted ? (
              <button
                onClick={handleReport}
                className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                title="Report suspicious vacancy"
                aria-label="Report listing"
              >
                <Flag className="w-4 h-4" />
              </button>
            ) : (
              <span className="text-xs font-semibold text-rose-600 px-2">Reported</span>
            )}
          </div>

          {/* Primary Apply Button */}
          {job.applyType === 'whatsapp' ? (
            <a
              href={job.applyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm shadow-sm transition-all focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Apply via WhatsApp ({job.applyContactValue})</span>
            </a>
          ) : job.applyType === 'email' ? (
            <a
              href={job.applyLink}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm shadow-sm transition-all focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            >
              <Mail className="w-4 h-4" />
              <span>Send CV via Email</span>
            </a>
          ) : (
            <a
              href={job.applyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm shadow-sm transition-all focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Visit Application Page</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
