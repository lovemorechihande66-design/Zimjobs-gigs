import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Bookmark,
  PlusCircle,
  Share2,
  Sparkles,
  CheckCircle2,
  Search,
  MapPin,
  ExternalLink,
  BookOpen,
  ShieldCheck,
  Building2,
  Zap,
  Info
} from 'lucide-react';
import { Job, JobFilterState, LaunchChecklistItem } from './types/job';
import { INITIAL_JOBS, INITIAL_CHECKLIST } from './data/initialJobs';
import { filterJobs } from './utils/jobUtils';
import { Header } from './components/Header';
import { AntiScamBanner } from './components/AntiScamBanner';
import { SearchBar } from './components/SearchBar';
import { JobCard } from './components/JobCard';
import { JobDetailModal } from './components/JobDetailModal';
import { PostJobModal } from './components/PostJobModal';
import { BuilderGuide } from './components/BuilderGuide';
import { AntiScamShield } from './components/AntiScamShield';
import { BottomNav } from './components/BottomNav';

export default function App() {
  // Load saved jobs from localStorage
  const [jobs, setJobs] = useState<Job[]>(() => {
    try {
      const saved = localStorage.getItem('zimjobs_listings');
      return saved ? JSON.parse(saved) : INITIAL_JOBS;
    } catch {
      return INITIAL_JOBS;
    }
  });

  // Saved bookmarks
  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('zimjobs_saved_ids');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Launch checklist
  const [checklist, setChecklist] = useState<LaunchChecklistItem[]>(() => {
    try {
      const saved = localStorage.getItem('zimjobs_checklist');
      return saved ? JSON.parse(saved) : INITIAL_CHECKLIST;
    } catch {
      return INITIAL_CHECKLIST;
    }
  });

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<'browse' | 'post' | 'saved' | 'builder' | 'safety'>('browse');

  // Modals
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  // Toast message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filters state
  const [filters, setFilters] = useState<JobFilterState>({
    searchQuery: '',
    category: 'All',
    location: 'All Zimbabwe',
    verifiedOnly: false,
    featuredOnly: false,
    payCurrency: 'All',
    sortBy: 'latest'
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('zimjobs_listings', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('zimjobs_saved_ids', JSON.stringify(savedJobIds));
  }, [savedJobIds]);

  useEffect(() => {
    localStorage.setItem('zimjobs_checklist', JSON.stringify(checklist));
  }, [checklist]);

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeTab]);

  // Check query params on mount for deep linking (e.g. ?job=zim-001)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const jobId = params.get('job');
      if (jobId) {
        const found = jobs.find((j) => j.id === jobId);
        if (found) {
          setSelectedJob(found);
        }
      }
      const tabParam = params.get('tab');
      if (tabParam && ['browse', 'saved', 'builder', 'safety'].includes(tabParam)) {
        setActiveTab(tabParam as any);
      }
    } catch (e) {
      // Ignore URL parse errors
    }
  }, [jobs]);

  // Toggle bookmark
  const handleToggleSave = (jobId: string) => {
    setSavedJobIds((prev) => {
      const exists = prev.includes(jobId);
      const updated = exists ? prev.filter((id) => id !== jobId) : [...prev, jobId];
      showToast(exists ? 'Removed from saved jobs' : 'Opportunity saved for later');
      return updated;
    });
  };

  // Add new job
  const handleAddJob = (newJob: Job) => {
    setJobs((prev) => [newJob, ...prev]);
    showToast(`Vacancy "${newJob.title}" published successfully!`);
    setActiveTab('browse');
  };

  // Toggle checklist item
  const handleToggleChecklist = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  // Report job
  const handleReportJob = (job: Job) => {
    showToast(`Report received for "${job.title}". We will investigate.`);
  };

  // Filtered jobs
  const filteredJobs = filterJobs(jobs, filters);
  const savedJobs = jobs.filter((j) => savedJobIds.includes(j.id));

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 pb-20 md:pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-20 right-4 sm:right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-top-2 border border-slate-700"
        >
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedJobIds.length}
        totalJobsCount={jobs.length}
        onOpenPostModal={() => setIsPostModalOpen(true)}
      />

      {/* Anti-Scam Top Warning Banner */}
      <AntiScamBanner onLearnMore={() => setActiveTab('safety')} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* VIEW 1: BROWSE JOBS FEED */}
        {activeTab === 'browse' && (
          <div className="space-y-6">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-emerald-800 via-emerald-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-md relative overflow-hidden">
              <div className="relative z-10 max-w-2xl space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-700/60 text-emerald-200 text-xs font-semibold border border-emerald-500/30">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Verified Zimbabwe Opportunities</span>
                </div>

                <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                  Find opportunities. <br />
                  <span className="text-emerald-300">Take your next step.</span>
                </h1>

                <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                  Browse legitimate vacancies, part-time retail work, temporary side gigs, and remote roles across Harare, Bulawayo, Mutare, and nationwide.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-emerald-200">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Free to apply
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Direct WhatsApp & Email
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Zero Application Fees
                  </span>
                </div>
              </div>

              {/* Decorative graphic backdrop */}
              <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-400 via-emerald-400 to-transparent pointer-events-none" />
            </div>

            {/* Search & Filter Component */}
            <SearchBar
              filters={filters}
              onFilterChange={setFilters}
              totalFilteredCount={filteredJobs.length}
            />

            {/* Featured & Latest Opportunities Heading */}
            <div className="flex items-center justify-between pt-2">
              <div>
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-slate-900">
                  {filters.category !== 'All' ? `${filters.category} in Zimbabwe` : 'Latest Opportunities'}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Hand-verified vacancies and small local gigs. Never pay to apply.
                </p>
              </div>

              <button
                onClick={() => setIsPostModalOpen(true)}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors border border-emerald-200"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Post Free Listing</span>
              </button>
            </div>

            {/* Job Grid */}
            {filteredJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    isSaved={savedJobIds.includes(job.id)}
                    onToggleSave={handleToggleSave}
                    onSelect={setSelectedJob}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Search className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-heading text-base font-bold text-slate-900">
                    No vacancies match your search
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Try searching for different keywords, clear category pills, or switch location to "All Zimbabwe".
                  </p>
                </div>
                <button
                  onClick={() =>
                    setFilters({
                      searchQuery: '',
                      category: 'All',
                      location: 'All Zimbabwe',
                      verifiedOnly: false,
                      featuredOnly: false,
                      payCurrency: 'All',
                      sortBy: 'latest'
                    })
                  }
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors"
                >
                  Reset all filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: SAVED JOBS */}
        {activeTab === 'saved' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <h2 className="font-heading text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <Bookmark className="w-6 h-6 text-amber-500 fill-amber-500" />
                  <span>Saved Opportunities ({savedJobs.length})</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Vacancies you bookmarked on this phone for quick offline review and applying.
                </p>
              </div>

              {savedJobs.length > 0 && (
                <button
                  onClick={() => {
                    setSavedJobIds([]);
                    showToast('Cleared all saved vacancies');
                  }}
                  className="text-xs font-semibold text-rose-600 hover:text-rose-800 self-start sm:self-auto"
                >
                  Clear all saved
                </button>
              )}
            </div>

            {savedJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {savedJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    isSaved={true}
                    onToggleSave={handleToggleSave}
                    onSelect={setSelectedJob}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mx-auto">
                  <Bookmark className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-heading text-base font-bold text-slate-900">
                    No saved jobs yet
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Click the bookmark icon on any job card in the listings to save it here for later.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('browse')}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors"
                >
                  Browse opportunities
                </button>
              </div>
            )}
          </div>
        )}

        {/* VIEW 3: BUILDER GUIDE & TOOLKIT */}
        {activeTab === 'builder' && (
          <BuilderGuide
            jobs={jobs}
            checklist={checklist}
            onToggleChecklist={handleToggleChecklist}
            onOpenPostJob={() => setIsPostModalOpen(true)}
          />
        )}

        {/* VIEW 4: ANTI-SCAM SAFETY SHIELD */}
        {activeTab === 'safety' && <AntiScamShield />}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-10 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-sm">
                ZJ
              </div>
              <span className="font-heading font-extrabold text-base text-slate-900">
                ZimJobs & Gigs
              </span>
            </div>
            <p className="text-slate-600 leading-relaxed max-w-md">
              A community initiative helping people across Zimbabwe find legitimate job vacancies, part-time work,
              temporary gigs, and small local opportunities without paying scammers or intermediaries.
            </p>
            <p className="text-[11px] text-slate-400">
              Disclaimer: Sample and verified listings provided for community empowerment. Always exercise due diligence before attending interviews.
            </p>
          </div>

          <div>
            <span className="font-heading font-bold text-slate-900 block mb-3 uppercase tracking-wider text-[11px]">
              Recommended Free Tools
            </span>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://sites.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-700 flex items-center gap-1"
                >
                  Google Sites (Website) <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://sheets.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-700 flex items-center gap-1"
                >
                  Google Sheets (Database) <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://appinventor.mit.edu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-700 flex items-center gap-1"
                >
                  MIT App Inventor (Android) <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <span className="font-heading font-bold text-slate-900 block mb-3 uppercase tracking-wider text-[11px]">
              Safety & Ethics
            </span>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveTab('safety')}
                  className="hover:text-emerald-700 text-left"
                >
                  Anti-Scam Protection Rules
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('builder')}
                  className="hover:text-emerald-700 text-left"
                >
                  Launch Verification Checklist
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsPostModalOpen(true)}
                  className="hover:text-emerald-700 text-left text-emerald-700 font-semibold"
                >
                  Post a Verified Job (Free)
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
          <p>© 2026 ZimJobs & Gigs. Made for Zimbabwe 🇿🇼</p>
          <p>Find opportunities. Take your next step.</p>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedJobIds.length}
        onOpenPostModal={() => setIsPostModalOpen(true)}
      />

      {/* Job Details Modal */}
      <JobDetailModal
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
        isSaved={selectedJob ? savedJobIds.includes(selectedJob.id) : false}
        onToggleSave={handleToggleSave}
        onReportJob={handleReportJob}
      />

      {/* Post Job Modal */}
      <PostJobModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        onAddJob={handleAddJob}
      />
    </div>
  );
}
