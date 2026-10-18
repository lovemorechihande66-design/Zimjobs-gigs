import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, AlertTriangle, CheckCircle, Send, MessageCircle } from 'lucide-react';

export const AntiScamShield: React.FC = () => {
  const [reportEmployer, setReportEmployer] = useState('');
  const [reportReason, setReportReason] = useState('');
  const [reportContact, setReportContact] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportEmployer || !reportReason) return;
    setSubmitted(true);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Hero Badge */}
      <div className="bg-gradient-to-br from-emerald-900 via-slate-900 to-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-heading text-xl sm:text-2xl font-bold">
              ZimJobs Anti-Scam Shield & Safety Hub
            </h2>
            <p className="text-xs text-slate-300">
              Protecting Zimbabwean job seekers from fraudulent recruitment and fee extortions.
            </p>
          </div>
        </div>

        <p className="text-sm text-slate-200 leading-relaxed mt-2">
          In Zimbabwe, fraudulent agents often exploit job seekers by demanding "uniform fees", "interview booking fees",
          or "fake medical certificates". Our mission is to keep job hunting <strong>100% free</strong> and safe for everyone.
        </p>
      </div>

      {/* The 4 Golden Rules */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
        <h3 className="font-heading text-base font-bold text-slate-900 uppercase tracking-wider">
          The 4 Golden Rules of Safe Job Hunting in Zimbabwe
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/40 space-y-2">
            <div className="flex items-center gap-2 font-bold text-rose-950 text-sm">
              <span className="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs">
                1
              </span>
              <span>Never Pay Any Money</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Legitimate employers in Zimbabwe NEVER charge candidates to apply, sit for an interview, or receive an offer letter.
              If anyone asks for EcoCash, Innbucks, or cash, decline immediately.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/40 space-y-2">
            <div className="flex items-center gap-2 font-bold text-rose-950 text-sm">
              <span className="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs">
                2
              </span>
              <span>Beware of "Uniform & Medical" Scams</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Scammers often pretend to hire you for a supermarket or mine, then instruct you to send US$15–$30 for "company uniforms" or "clinic medicals". Real employers provide uniforms and cover required tests.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-2">
            <div className="flex items-center gap-2 font-bold text-emerald-950 text-sm">
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">
                3
              </span>
              <span>Verify Physical Business Address</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Legitimate employers have established shops, offices, or verified contact persons. Always meet in open, public business premises during daylight hours.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-2">
            <div className="flex items-center gap-2 font-bold text-emerald-950 text-sm">
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">
                4
              </span>
              <span>Guard Personal Identity Documents</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Never send high-resolution photos of your national ID, passport, or bank login PIN over WhatsApp before an official contract has been signed in person.
            </p>
          </div>
        </div>
      </div>

      {/* Report Suspicious Employer Form */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
        <h3 className="font-heading text-base font-bold text-slate-900 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <span>Report a Suspicious Employer or Scam</span>
        </h3>
        <p className="text-xs text-slate-500">
          Encountered a fake listing or an employer demanding money? Let us know and we will investigate and blacklist them.
        </p>

        {submitted ? (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-900 space-y-1">
              <strong className="font-bold text-sm">Thank You for Reporting!</strong>
              <p>
                Our moderation team will investigate this report immediately and warn other Zimbabwean job seekers.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs font-semibold underline mt-2 inline-block"
              >
                Submit another report
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <div>
              <label htmlFor="report-emp-input" className="block font-semibold text-slate-700 mb-1">
                Employer / Recruiter Name or Phone Number *
              </label>
              <input
                id="report-emp-input"
                type="text"
                required
                value={reportEmployer}
                onChange={(e) => setReportEmployer(e.target.value)}
                placeholder="e.g. EcoCash Agent Recruiter / 077 123 4567"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label htmlFor="report-reason-input" className="block font-semibold text-slate-700 mb-1">
                What happened? *
              </label>
              <textarea
                id="report-reason-input"
                required
                rows={3}
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                placeholder="e.g. They demanded US$10 for an interview form via EcoCash before sending the address..."
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label htmlFor="report-contact-input" className="block font-semibold text-slate-700 mb-1">
                Your Email or WhatsApp (optional, for follow-up)
              </label>
              <input
                id="report-contact-input"
                type="text"
                value={reportContact}
                onChange={(e) => setReportContact(e.target.value)}
                placeholder="+263 7..."
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-bold text-xs shadow-xs transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Scam Report</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
