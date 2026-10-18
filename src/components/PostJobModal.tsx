import React, { useState } from 'react';
import { X, PlusCircle, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { Job, JobCategory } from '../types/job';
import { ZIMBABWE_LOCATIONS, JOB_CATEGORIES } from '../data/initialJobs';

interface PostJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddJob: (newJob: Job) => void;
}

export const PostJobModal: React.FC<PostJobModalProps> = ({
  isOpen,
  onClose,
  onAddJob
}) => {
  const [title, setTitle] = useState('');
  const [employer, setEmployer] = useState('');
  const [location, setLocation] = useState('Harare');
  const [customLocation, setCustomLocation] = useState('');
  const [category, setCategory] = useState<JobCategory>('Part-time');
  const [payAmount, setPayAmount] = useState('');
  const [payCurrency, setPayCurrency] = useState<'USD' | 'ZiG' | 'Negotiable'>('USD');
  const [deadline, setDeadline] = useState('');
  const [applyType, setApplyType] = useState<'whatsapp' | 'email' | 'url'>('whatsapp');
  const [contactValue, setContactValue] = useState('');
  const [description, setDescription] = useState('');
  const [requirementsInput, setRequirementsInput] = useState('');
  const [responsibilitiesInput, setResponsibilitiesInput] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [agreedToNoFeePolicy, setAgreedToNoFeePolicy] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!title.trim()) {
      setErrorMsg('Please enter a Job Title');
      return;
    }
    if (!employer.trim()) {
      setErrorMsg('Please enter your Business or Employer name');
      return;
    }
    if (!payAmount.trim()) {
      setErrorMsg('Please enter compensation (e.g. US$150/month or US$20/day)');
      return;
    }
    if (!contactValue.trim()) {
      setErrorMsg('Please provide your WhatsApp number, email, or application link');
      return;
    }
    if (!description.trim()) {
      setErrorMsg('Please enter a short description of the opportunity');
      return;
    }
    if (!agreedToNoFeePolicy) {
      setErrorMsg('You must certify that this opportunity does not charge candidates any fees.');
      return;
    }

    // Determine final applyLink
    let finalApplyLink = contactValue.trim();
    if (applyType === 'whatsapp') {
      const cleanPhone = contactValue.replace(/[^0-9]/g, '');
      const phoneWithPrefix = cleanPhone.startsWith('263')
        ? cleanPhone
        : cleanPhone.startsWith('0')
        ? '263' + cleanPhone.slice(1)
        : '263' + cleanPhone;
      finalApplyLink = `https://wa.me/${phoneWithPrefix}?text=${encodeURIComponent(
        `Hello, I am inquiring about the ${title} opportunity listed on ZimJobs & Gigs.`
      )}`;
    } else if (applyType === 'email') {
      finalApplyLink = `mailto:${contactValue}?subject=${encodeURIComponent(
        `Application for ${title} - via ZimJobs`
      )}`;
    }

    const finalLocation = location === 'Other' && customLocation.trim() ? customLocation.trim() : location;

    const requirements = requirementsInput
      .split('\n')
      .map((r) => r.trim())
      .filter(Boolean);

    const responsibilities = responsibilitiesInput
      .split('\n')
      .map((r) => r.trim())
      .filter(Boolean);

    const newJob: Job = {
      id: `zim-${Date.now()}`,
      title: title.trim(),
      employer: employer.trim(),
      location: finalLocation,
      category,
      pay: payAmount.trim(),
      payCurrency,
      deadline: deadline || 'Open until filled',
      applyLink: finalApplyLink,
      applyType,
      applyContactValue: contactValue.trim(),
      verified: true,
      featured: isFeatured,
      postedDate: new Date().toISOString().split('T')[0],
      description: description.trim(),
      requirements: requirements.length > 0 ? requirements : ['Willingness to learn and positive work ethic'],
      responsibilities: responsibilities.length > 0 ? responsibilities : ['Execute daily assigned tasks diligently'],
      isUserSubmitted: true
    };

    onAddJob(newJob);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="post-job-title"
    >
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <h2 id="post-job-title" className="font-heading text-xl font-bold text-slate-900">
              Post a Job or Small Gig
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Connect with reliable Zimbabwean workers, shop assistants, or freelancers.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-200 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-sm">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold">
              {errorMsg}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Title */}
            <div>
              <label htmlFor="job-title-input" className="block text-xs font-semibold text-slate-700 mb-1">
                Job Title *
              </label>
              <input
                id="job-title-input"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Shop Assistant, Delivery Rider..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>

            {/* Employer */}
            <div>
              <label htmlFor="employer-input" className="block text-xs font-semibold text-slate-700 mb-1">
                Employer / Business Name *
              </label>
              <input
                id="employer-input"
                type="text"
                required
                value={employer}
                onChange={(e) => setEmployer(e.target.value)}
                placeholder="e.g. Samora Grocers, Private Family..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Location */}
            <div>
              <label htmlFor="job-loc-select" className="block text-xs font-semibold text-slate-700 mb-1">
                Location in Zimbabwe *
              </label>
              <select
                id="job-loc-select"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              >
                {ZIMBABWE_LOCATIONS.filter((l) => l !== 'All Zimbabwe').map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
                <option value="Other">Other City / Growth Point</option>
              </select>
              {location === 'Other' && (
                <input
                  type="text"
                  value={customLocation}
                  onChange={(e) => setCustomLocation(e.target.value)}
                  placeholder="Enter location (e.g. Rusape, Karoi, Zvishavane)"
                  className="mt-2 w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              )}
            </div>

            {/* Category */}
            <div>
              <label htmlFor="job-cat-select" className="block text-xs font-semibold text-slate-700 mb-1">
                Category *
              </label>
              <select
                id="job-cat-select"
                value={category}
                onChange={(e) => setCategory(e.target.value as JobCategory)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              >
                {JOB_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Pay */}
            <div>
              <label htmlFor="pay-input" className="block text-xs font-semibold text-slate-700 mb-1">
                Pay / Compensation *
              </label>
              <input
                id="pay-input"
                type="text"
                required
                value={payAmount}
                onChange={(e) => setPayAmount(e.target.value)}
                placeholder="e.g. US$180/month or US$20/day"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>

            {/* Deadline */}
            <div>
              <label htmlFor="deadline-input" className="block text-xs font-semibold text-slate-700 mb-1">
                Application Deadline
              </label>
              <input
                id="deadline-input"
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Application Method */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label htmlFor="apply-method-select" className="block text-xs font-semibold text-slate-700 mb-1">
                Apply Channel *
              </label>
              <select
                id="apply-method-select"
                value={applyType}
                onChange={(e) => setApplyType(e.target.value as 'whatsapp' | 'email' | 'url')}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              >
                <option value="whatsapp">WhatsApp Number</option>
                <option value="email">Email Address</option>
                <option value="url">Web Link</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="contact-val-input" className="block text-xs font-semibold text-slate-700 mb-1">
                {applyType === 'whatsapp'
                  ? 'WhatsApp Phone Number (e.g. 0772 123 456)'
                  : applyType === 'email'
                  ? 'Employer Email Address'
                  : 'Application Web Link'} *
              </label>
              <input
                id="contact-val-input"
                type="text"
                required
                value={contactValue}
                onChange={(e) => setContactValue(e.target.value)}
                placeholder={
                  applyType === 'whatsapp'
                    ? '+263 77 123 4567'
                    : applyType === 'email'
                    ? 'jobs@yourbusiness.co.zw'
                    : 'https://...'
                }
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="job-desc-input" className="block text-xs font-semibold text-slate-700 mb-1">
              Job Description *
            </label>
            <textarea
              id="job-desc-input"
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe daily tasks, working hours, shop/office environment..."
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>

          {/* Requirements & Qualifications */}
          <div>
            <label htmlFor="job-req-input" className="block text-xs font-semibold text-slate-700 mb-1">
              Requirements (one per line)
            </label>
            <textarea
              id="job-req-input"
              rows={2}
              value={requirementsInput}
              onChange={(e) => setRequirementsInput(e.target.value)}
              placeholder="e.g. 5 O-Levels including Maths&#10;Driver's license Class 3&#10;Residing in Harare"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>

          {/* Anti-Scam Compliance Checkbox */}
          <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={agreedToNoFeePolicy}
                onChange={(e) => setAgreedToNoFeePolicy(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-amber-300"
              />
              <span className="text-xs text-amber-950 font-medium">
                <strong>Anti-Scam Declaration:</strong> I confirm this listing is genuine and candidates will
                <strong> never be charged</strong> any application fee, registration fee, interview booking fee,
                or medical screening fee.
              </span>
            </label>
          </div>

          {/* Optional Featured promotion preview */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <label className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-semibold text-slate-800">
                  Feature this job (Highlight on top of feed)
                </span>
              </div>
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
              />
            </label>
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm shadow-sm transition-all focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Publish Job Listing</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
