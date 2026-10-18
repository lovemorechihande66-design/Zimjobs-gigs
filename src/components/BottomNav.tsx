import React from 'react';
import { Briefcase, Bookmark, PlusCircle, BookOpen, ShieldCheck } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'browse' | 'post' | 'saved' | 'builder' | 'safety';
  setActiveTab: (tab: 'browse' | 'post' | 'saved' | 'builder' | 'safety') => void;
  savedCount: number;
  onOpenPostModal: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  onOpenPostModal
}) => {
  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1 shadow-lg"
      aria-label="Mobile Navigation"
    >
      <div className="grid grid-cols-5 gap-1 items-center">
        <button
          onClick={() => setActiveTab('browse')}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-colors ${
            activeTab === 'browse'
              ? 'text-emerald-700 font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
          aria-label="Browse Jobs"
        >
          <Briefcase className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] leading-tight">Jobs</span>
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-colors relative ${
            activeTab === 'saved'
              ? 'text-emerald-700 font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
          aria-label="Saved Jobs"
        >
          <div className="relative">
            <Bookmark className="w-5 h-5 mb-0.5" />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-2 w-4 h-4 bg-amber-500 text-white rounded-full text-[9px] flex items-center justify-center font-bold">
                {savedCount}
              </span>
            )}
          </div>
          <span className="text-[10px] leading-tight">Saved</span>
        </button>

        <button
          onClick={onOpenPostModal}
          className="flex flex-col items-center justify-center py-1 px-1 -mt-3 text-white"
          aria-label="Post Job or Gig"
        >
          <div className="w-11 h-11 rounded-full bg-emerald-600 flex items-center justify-center shadow-md active:scale-95 transition-transform">
            <PlusCircle className="w-6 h-6" />
          </div>
          <span className="text-[10px] text-slate-800 font-semibold mt-0.5">Post</span>
        </button>

        <button
          onClick={() => setActiveTab('builder')}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-colors ${
            activeTab === 'builder'
              ? 'text-emerald-700 font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
          aria-label="Builder Toolkit"
        >
          <BookOpen className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] leading-tight">Builder</span>
        </button>

        <button
          onClick={() => setActiveTab('safety')}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-colors ${
            activeTab === 'safety'
              ? 'text-emerald-700 font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
          aria-label="Safety Shield"
        >
          <ShieldCheck className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] leading-tight">Safety</span>
        </button>
      </div>
    </nav>
  );
};
