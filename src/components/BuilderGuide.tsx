import React, { useState } from 'react';
import {
  FileSpreadsheet,
  CheckSquare,
  TrendingUp,
  Calendar,
  Smartphone,
  Copy,
  Check,
  Download,
  ExternalLink,
  ShieldAlert,
  DollarSign,
  Share2,
  Users,
  Sparkles
} from 'lucide-react';
import { Job, LaunchChecklistItem, MonetizationInputs } from '../types/job';
import {
  calculateChecklistProgress,
  calculateMonetizationRevenue,
  exportJobsToCSV
} from '../utils/jobUtils';

interface BuilderGuideProps {
  jobs: Job[];
  checklist: LaunchChecklistItem[];
  onToggleChecklist: (id: string) => void;
  onOpenPostJob: () => void;
}

export const BuilderGuide: React.FC<BuilderGuideProps> = ({
  jobs,
  checklist,
  onToggleChecklist,
  onOpenPostJob
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'sheets' | 'checklist' | 'monetization' | 'roadmap' | 'app'>('checklist');
  const [copiedHeadings, setCopiedHeadings] = useState(false);

  // Monetization Calculator state
  const [calcInputs, setCalcInputs] = useState<MonetizationInputs>({
    featuredCount: 10,
    featuredPrice: 5,
    promoCount: 2,
    promoPrice: 10,
    recruitmentCount: 1,
    recruitmentPrice: 30
  });

  const progress = calculateChecklistProgress(checklist);
  const revenue = calculateMonetizationRevenue(calcInputs);

  const copySheetHeadings = () => {
    const headings = 'Job Title\tEmployer\tLocation\tCategory\tPay\tDeadline\tApply Link\tVerified';
    navigator.clipboard.writeText(headings);
    setCopiedHeadings(true);
    setTimeout(() => setCopiedHeadings(false), 2500);
  };

  const handleDownloadCSV = () => {
    const csvContent = exportJobsToCSV(jobs);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'zimbabwe_jobs_and_gigs.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Guide Intro */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Side-Income Entrepreneur Playbook</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Build & Monetize Zimbabwe Jobs & Gigs
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Turn this job board into a thriving, trusted local side business using free tools on your Android phone.
            Keep your database in sync, complete the launch checklist, and track your projected earnings.
          </p>
        </div>

        {/* Sub-Tabs navigation */}
        <div className="mt-6 pt-5 border-t border-slate-800 flex flex-wrap gap-2 text-xs font-semibold">
          <button
            onClick={() => setActiveSubTab('checklist')}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeSubTab === 'checklist'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Launch Checklist ({progress.completedCount}/{progress.totalCount})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('sheets')}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeSubTab === 'sheets'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Google Sheets Database</span>
          </button>

          <button
            onClick={() => setActiveSubTab('monetization')}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeSubTab === 'monetization'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Monetization Calculator</span>
          </button>

          <button
            onClick={() => setActiveSubTab('roadmap')}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeSubTab === 'roadmap'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>30-Day Growth Plan</span>
          </button>

          <button
            onClick={() => setActiveSubTab('app')}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeSubTab === 'app'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Free Tools & Android</span>
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: LAUNCH CHECKLIST */}
      {activeSubTab === 'checklist' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-heading text-lg font-bold text-slate-900">
                Launch Checklist: Test Before You Try to Earn
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Complete these 6 core verification steps before sharing your job portal with the public.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200">
              <span>{progress.completedCount} of {progress.totalCount} completed</span>
              <div className="w-20 bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-full transition-all duration-300"
                  style={{ width: `${progress.percentage}%` }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {checklist.map((item) => (
              <label
                key={item.id}
                className={`flex items-start gap-3 p-4 rounded-xl border transition-all cursor-pointer ${
                  item.completed
                    ? 'border-emerald-200 bg-emerald-50/50'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => onToggleChecklist(item.id)}
                  className="mt-0.5 w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
                />
                <div className="space-y-0.5 text-xs">
                  <span
                    className={`font-bold block ${
                      item.completed ? 'text-emerald-950 line-through opacity-85' : 'text-slate-900'
                    }`}
                  >
                    {item.label}
                  </span>
                  <p className="text-slate-600 leading-relaxed">{item.description}</p>
                </div>
              </label>
            ))}
          </div>

          {/* Ethics callout from the prompt */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
            <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold block text-sm">Important Ethical Rule:</strong>
              <p className="mt-1 leading-relaxed">
                Never ask job seekers to pay you to access a vacancy. Don't publish unverified opportunities,
                request sensitive identity documents, or promise that someone will get hired. Trust is your biggest asset.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: GOOGLE SHEETS DATABASE */}
      {activeSubTab === 'sheets' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-heading text-lg font-bold text-slate-900 flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                <span>Step 1: Your Google Sheets Job Database</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Your spreadsheet is the master repository where you record employer, role, location, deadline, and application links.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={copySheetHeadings}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
              >
                {copiedHeadings ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedHeadings ? 'Copied to Clipboard!' : 'Copy Column Headings'}</span>
              </button>

              <button
                onClick={handleDownloadCSV}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Current Jobs CSV</span>
              </button>
            </div>
          </div>

          {/* Heading instruction card */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs font-bold text-slate-700 block mb-2 uppercase tracking-wider">
              Exact Column Names in Row 1:
            </span>
            <div className="p-3 bg-white rounded-lg border border-slate-200 font-mono text-xs text-slate-800 overflow-x-auto select-all">
              Job Title | Employer | Location | Category | Pay | Deadline | Apply Link | Verified
            </div>
          </div>

          {/* Live Data Preview Table */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Live Database Snapshot ({jobs.length} entries)
              </span>
              <a
                href="https://sheets.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1"
              >
                <span>Open Google Sheets</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-x-auto">
              <table className="min-w-full text-xs text-left">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="px-3 py-2.5">Job Title</th>
                    <th className="px-3 py-2.5">Employer</th>
                    <th className="px-3 py-2.5">Location</th>
                    <th className="px-3 py-2.5">Category</th>
                    <th className="px-3 py-2.5">Pay</th>
                    <th className="px-3 py-2.5">Deadline</th>
                    <th className="px-3 py-2.5">Apply Link</th>
                    <th className="px-3 py-2.5">Verified</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  {jobs.slice(0, 6).map((job) => (
                    <tr key={job.id} className="hover:bg-slate-50/80">
                      <td className="px-3 py-2 font-semibold text-slate-900">{job.title}</td>
                      <td className="px-3 py-2">{job.employer}</td>
                      <td className="px-3 py-2">{job.location}</td>
                      <td className="px-3 py-2">{job.category}</td>
                      <td className="px-3 py-2 font-medium text-emerald-700">{job.pay}</td>
                      <td className="px-3 py-2">{job.deadline}</td>
                      <td className="px-3 py-2 truncate max-w-[140px] text-slate-400 font-mono">
                        {job.applyLink}
                      </td>
                      <td className="px-3 py-2">
                        {job.verified ? (
                          <span className="text-emerald-600 font-bold">Yes</span>
                        ) : (
                          <span className="text-slate-400">No</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {jobs.length > 6 && (
              <p className="text-[11px] text-slate-400 text-right">
                Showing 6 of {jobs.length} rows. Export CSV to view full database.
              </p>
            )}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: MONETIZATION CALCULATOR */}
      {activeSubTab === 'monetization' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
          <div>
            <h3 className="font-heading text-lg font-bold text-slate-900">
              How You Can Make Money: Side-Income Calculator
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Don't expect the app to pay automatically. First, build trust and attract people who use it.
              Then introduce clearly labelled featured listings and business promotions.
            </p>
          </div>

          {/* Reference Table from Prompt */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Reference Blueprint: What Could You Earn?
            </span>
            <div className="grid grid-cols-3 gap-2 text-xs text-center border border-slate-200 rounded-lg overflow-hidden bg-white">
              <div className="p-2.5 bg-slate-100 font-semibold text-slate-700">Paid promotions/mo</div>
              <div className="p-2.5 bg-slate-100 font-semibold text-slate-700">Price each</div>
              <div className="p-2.5 bg-slate-100 font-semibold text-slate-700">Monthly revenue</div>

              <div className="p-2 border-t border-slate-100 text-slate-700">5</div>
              <div className="p-2 border-t border-slate-100 text-slate-700">$3</div>
              <div className="p-2 border-t border-slate-100 font-bold text-emerald-700">$15 USD</div>

              <div className="p-2 border-t border-slate-100 text-slate-700">10</div>
              <div className="p-2 border-t border-slate-100 text-slate-700">$5</div>
              <div className="p-2 border-t border-slate-100 font-bold text-emerald-700">$50 USD</div>

              <div className="p-2 border-t border-slate-100 text-slate-700">20</div>
              <div className="p-2 border-t border-slate-100 text-slate-700">$5</div>
              <div className="p-2 border-t border-slate-100 font-bold text-emerald-700">$100 USD</div>
            </div>
            <p className="text-[11px] text-slate-400">
              *Figures in US Dollars. Revenue before data expenses. Building trust and active job seeker traffic is step 1.
            </p>
          </div>

          {/* Interactive Calculator */}
          <div className="p-5 rounded-xl border border-emerald-200 bg-gradient-to-br from-white via-emerald-50/20 to-white space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-heading font-bold text-sm text-slate-900">
                Interactive Monthly Revenue Simulator
              </span>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">
                  Projected Monthly Revenue
                </span>
                <span className="font-heading font-extrabold text-2xl text-emerald-700">
                  ${revenue.totalRevenue} <span className="text-xs font-semibold">USD/mo</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {/* Stage 1: Featured Listings */}
              <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-800 block">
                  Stage 1: Featured Job Adverts
                </span>
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="featured-count-input" className="text-slate-500">Adverts per month:</label>
                  <input
                    id="featured-count-input"
                    type="number"
                    min="0"
                    max="100"
                    value={calcInputs.featuredCount}
                    onChange={(e) =>
                      setCalcInputs({ ...calcInputs, featuredCount: parseInt(e.target.value) || 0 })
                    }
                    className="w-16 px-2 py-1 rounded border border-slate-300 text-right font-bold"
                  />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="featured-price-input" className="text-slate-500">Price each (USD):</label>
                  <input
                    id="featured-price-input"
                    type="number"
                    min="1"
                    max="50"
                    value={calcInputs.featuredPrice}
                    onChange={(e) =>
                      setCalcInputs({ ...calcInputs, featuredPrice: parseInt(e.target.value) || 0 })
                    }
                    className="w-16 px-2 py-1 rounded border border-slate-300 text-right font-bold text-emerald-700"
                  />
                </div>
                <div className="pt-2 border-t border-slate-100 text-right text-xs font-semibold text-slate-700">
                  Subtotal: <strong className="text-emerald-700">${revenue.featuredRevenue}</strong>
                </div>
              </div>

              {/* Stage 2: Small Business Promotions */}
              <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-800 block">
                  Stage 2: Business Promotions
                </span>
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="promo-count-input" className="text-slate-500">Adverts per month:</label>
                  <input
                    id="promo-count-input"
                    type="number"
                    min="0"
                    max="50"
                    value={calcInputs.promoCount}
                    onChange={(e) =>
                      setCalcInputs({ ...calcInputs, promoCount: parseInt(e.target.value) || 0 })
                    }
                    className="w-16 px-2 py-1 rounded border border-slate-300 text-right font-bold"
                  />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="promo-price-input" className="text-slate-500">Price each (USD):</label>
                  <input
                    id="promo-price-input"
                    type="number"
                    min="1"
                    max="100"
                    value={calcInputs.promoPrice}
                    onChange={(e) =>
                      setCalcInputs({ ...calcInputs, promoPrice: parseInt(e.target.value) || 0 })
                    }
                    className="w-16 px-2 py-1 rounded border border-slate-300 text-right font-bold text-emerald-700"
                  />
                </div>
                <div className="pt-2 border-t border-slate-100 text-right text-xs font-semibold text-slate-700">
                  Subtotal: <strong className="text-emerald-700">${revenue.promoRevenue}</strong>
                </div>
              </div>

              {/* Stage 3: Employer Recruitment Services */}
              <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-800 block">
                  Stage 3: Recruitment Distribution
                </span>
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="recruit-count-input" className="text-slate-500">Services per month:</label>
                  <input
                    id="recruit-count-input"
                    type="number"
                    min="0"
                    max="20"
                    value={calcInputs.recruitmentCount}
                    onChange={(e) =>
                      setCalcInputs({ ...calcInputs, recruitmentCount: parseInt(e.target.value) || 0 })
                    }
                    className="w-16 px-2 py-1 rounded border border-slate-300 text-right font-bold"
                  />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="recruit-price-input" className="text-slate-500">Fee each (USD):</label>
                  <input
                    id="recruit-price-input"
                    type="number"
                    min="5"
                    max="200"
                    value={calcInputs.recruitmentPrice}
                    onChange={(e) =>
                      setCalcInputs({ ...calcInputs, recruitmentPrice: parseInt(e.target.value) || 0 })
                    }
                    className="w-16 px-2 py-1 rounded border border-slate-300 text-right font-bold text-emerald-700"
                  />
                </div>
                <div className="pt-2 border-t border-slate-100 text-right text-xs font-semibold text-slate-700">
                  Subtotal: <strong className="text-emerald-700">${revenue.recruitmentRevenue}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: 30-DAY ROADMAP */}
      {activeSubTab === 'roadmap' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
          <div>
            <h3 className="font-heading text-lg font-bold text-slate-900">
              Your First 30 Days Execution Plan
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Follow this 4-week step-by-step roadmap to get genuine traction in Zimbabwe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Week 1 */}
            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/30 space-y-2">
              <span className="px-2 py-0.5 rounded bg-emerald-600 text-white font-bold text-[11px] uppercase tracking-wider">
                Week 1: Build the Foundation
              </span>
              <h4 className="font-heading font-bold text-sm text-slate-900">
                Setup database and publish genuine listings
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Set up your Google Sheets database, populate 3–5 real opportunities from trustworthy sources,
                and publish your web portal. Check that every application link or WhatsApp contact is accurate.
              </p>
            </div>

            {/* Week 2 */}
            <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/30 space-y-2">
              <span className="px-2 py-0.5 rounded bg-blue-600 text-white font-bold text-[11px] uppercase tracking-wider">
                Week 2: Find Your First Visitors
              </span>
              <h4 className="font-heading font-bold text-sm text-slate-900">
                Distribute in WhatsApp & Facebook communities
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Share helpful, verified vacancies into relevant Zimbabwean job seeker WhatsApp groups and
                Facebook groups where sharing is welcomed. Highlight that all positions are 100% free with no scam fees.
              </p>
            </div>

            {/* Week 3 */}
            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/30 space-y-2">
              <span className="px-2 py-0.5 rounded bg-amber-600 text-white font-bold text-[11px] uppercase tracking-wider">
                Week 3: Improve & Listen
              </span>
              <h4 className="font-heading font-bold text-sm text-slate-900">
                Ask users what they need most
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Talk to job seekers and friends: Are they looking for retail, remote work, drivers, or industrial attachments?
                Refine categories and remove expired vacancies promptly to maintain absolute credibility.
              </p>
            </div>

            {/* Week 4 */}
            <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/30 space-y-2">
              <span className="px-2 py-0.5 rounded bg-purple-600 text-white font-bold text-[11px] uppercase tracking-wider">
                Week 4: Approach Local Employers
              </span>
              <h4 className="font-heading font-bold text-sm text-slate-900">
                Offer featured promotion for US$3–$5
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Visit or message legitimate local shops, hair studios, and small businesses. Show them your traffic and offer
                to feature their vacancy at the top with direct WhatsApp application routing for a modest US$3–$5 fee.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 5: FREE TOOLS & ANDROID APPS */}
      {activeSubTab === 'app' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
          <div>
            <h3 className="font-heading text-lg font-bold text-slate-900">
              The 3 Free Tools Recommended for Beginners
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              You do not need to pay a developer or spend money to start testing your idea.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                1
              </div>
              <h4 className="font-heading font-bold text-sm text-slate-900">Google Sites</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your no-code website builder. Create pages for jobs, categories, and contact details without code.
              </p>
              <a
                href="https://sites.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1"
              >
                <span>Open Google Sites</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                2
              </div>
              <h4 className="font-heading font-bold text-sm text-slate-900">Google Sheets</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your cloud database. Record employer, role, location, deadline, application link, and verification status.
              </p>
              <a
                href="https://sheets.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1"
              >
                <span>Open Google Sheets</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                3
              </div>
              <h4 className="font-heading font-bold text-sm text-slate-900">MIT App Inventor</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                When you are ready to compile a native Android APK, use free visual blocks. Google Play charges a 1-time US$25 developer fee.
              </p>
              <a
                href="https://appinventor.mit.edu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1"
              >
                <span>Open MIT App Inventor</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
