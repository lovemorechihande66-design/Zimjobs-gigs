import React from 'react';
import { ShieldAlert, AlertTriangle, ArrowRight } from 'lucide-react';

interface AntiScamBannerProps {
  onLearnMore: () => void;
}

export const AntiScamBanner: React.FC<AntiScamBannerProps> = ({ onLearnMore }) => {
  return (
    <div className="bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-amber-500/10 border-y border-amber-300/60 py-2.5 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="shrink-0 p-1 bg-amber-100 text-amber-800 rounded-md">
            <ShieldAlert className="w-4 h-4" />
          </span>
          <p className="text-slate-800 font-medium">
            <strong className="text-amber-950 font-bold">Anti-Scam Protection:</strong> Never pay money for an interview, uniform, medical check, or job application in Zimbabwe. Legitimate employers never charge candidates.
          </p>
        </div>
        <button
          onClick={onLearnMore}
          className="shrink-0 inline-flex items-center gap-1 font-semibold text-emerald-800 hover:text-emerald-950 underline underline-offset-2 ml-6 sm:ml-0"
        >
          <span>Safety guide & report scam</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
