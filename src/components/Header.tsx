import React from 'react';
import { Briefcase, PlusCircle, Bookmark, BookOpen, ShieldCheck, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeTab: 'browse' | 'post' | 'saved' | 'builder' | 'safety';
  setActiveTab: (tab: 'browse' | 'post' | 'saved' | 'builder' | 'safety') => void;
  savedCount: number;
  totalJobsCount: number;
  onOpenPostModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  totalJobsCount,
  onOpenPostModal
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo & Brand */}
          <button
            onClick={() => setActiveTab('browse')}
            className="flex items-center gap-3 text-left group focus:outline-hidden focus:ring-2 focus:ring-emerald-500 rounded-lg p-1"
            aria-label="ZimJobs and Gigs Home"
          >
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-amber-600 p-0.5 shadow-md group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center text-white font-black text-xl tracking-tighter">
                <span className="text-emerald-400">Z</span>
                <span className="text-amber-400 font-bold">J</span>
              </div>
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white" title="Zimbabwe Flag Accent" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-xl text-slate-900 tracking-tight">
                  ZimJobs <span className="text-emerald-600">& Gigs</span>
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  🇿🇼 Zimbabwe
                </span>
              </div>
              <p className="hidden sm:block text-xs text-slate-500 font-medium">
                Find opportunities. Take your next step.
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
            <button
              onClick={() => setActiveTab('browse')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${
                activeTab === 'browse'
                  ? 'bg-emerald-50 text-emerald-800'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Briefcase className="w-4 h-4 text-emerald-600" />
              <span>Jobs & Gigs</span>
              <span className="ml-1 text-xs px-1.5 py-0.5 rounded-full bg-emerald-200/70 text-emerald-900 font-bold">
                {totalJobsCount}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('saved')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${
                activeTab === 'saved'
                  ? 'bg-emerald-50 text-emerald-800'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Bookmark className="w-4 h-4 text-amber-600" />
              <span>Saved</span>
              {savedCount > 0 && (
                <span className="ml-1 text-xs px-1.5 py-0.5 rounded-full bg-amber-200 text-amber-900 font-bold">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('builder')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${
                activeTab === 'builder'
                  ? 'bg-emerald-50 text-emerald-800'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>Builder Guide</span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800">
                Toolkit
              </span>
            </button>

            <button
              onClick={() => setActiveTab('safety')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${
                activeTab === 'safety'
                  ? 'bg-emerald-50 text-emerald-800'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Anti-Scam Shield</span>
            </button>
          </nav>

          {/* Action Button: hidden on mobile where bottom nav provides quick Post button */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={onOpenPostModal}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold text-sm shadow-sm hover:shadow transition-all focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              aria-label="Post a Job or Gig"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post a Job / Gig</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
