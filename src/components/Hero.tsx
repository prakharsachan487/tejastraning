import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Building2,
  Send,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { useEnquiry } from '../context/EnquiryContext';
import { useAdminData } from '../context/AdminDataContext';
import { supabase } from '../lib/supabase';

// Helper component for clean word animation
function ShatterWord({
  word,
  isGradient = false,
}: {
  word: string;
  startIndex: number;
  isGradient?: boolean;
  gradientStartIndex?: number;
  totalGradientLength?: number;
}) {
  return (
    <span
      className={`inline-block mr-[0.28em] last:mr-0 ${
        isGradient
          ? 'bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#60A5FA] bg-clip-text text-transparent drop-shadow-xs'
          : 'text-slate-900'
      }`}
    >
      {word}
    </span>
  );
}

export function Hero() {
  const { openEnquiry } = useEnquiry();
  const { addEnquiry } = useAdminData();

  // Clean Form State (Zero prefilled data)
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [profession, setProfession] = useState('');
  const [requestDetails, setRequestDetails] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const payload = {
        source: 'HERO_REFERENCE_FORM' as const,
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phoneNumber.trim(),
        collegeName: collegeName.trim() || 'N/A',
        profession: profession.trim() || 'Institutional Partner',
        message: requestDetails.trim() || undefined,
      };

      // 1. Record in AdminDataContext
      addEnquiry(payload);

      // 2. Insert into Supabase
      if (supabase) {
        try {
          await supabase.from('enquiries').insert([
            {
              college_name: collegeName.trim() || 'N/A',
              contact_name: fullName.trim(),
              designation: profession.trim() || 'Institutional Partner',
              email: email.trim().toLowerCase(),
              phone: phoneNumber.trim(),
              source: 'CONSULTATION',
              message: requestDetails.trim() || null
            }
          ]);
        } catch (sbErr) {
          console.warn('[Supabase] Hero enquiry fallback:', sbErr);
        }
      }

      setIsSubmitted(true);
    } catch (err: any) {
      console.warn('[Form] Submission note:', err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setFullName('');
    setEmail('');
    setPhoneNumber('');
    setCollegeName('');
    setProfession('');
    setRequestDetails('');
  };

  return (
    <section className="relative pt-36 pb-16 lg:pt-40 lg:pb-24 overflow-hidden obsidian-grid bg-[#F8F9FB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          
          {/* Left Column: Headline, Subheadline & Quick Links (7 cols) */}
          <div className="lg:col-span-7 flex flex-col text-left pt-1">
            
            {/* 01. Eyebrow Tag Badge */}
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/30 text-[#2563EB] text-xs font-semibold tracking-wide mb-5 w-max"
            >
              <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-ping" />
              <span>Grow360 — Decoding the corporate world</span>
            </motion.div>

            {/* 02. Shatter Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-[3.2rem] font-bold tracking-tight leading-[1.18] text-[#12151B] font-[family-name:var(--font-display)]">
              <span className="block whitespace-nowrap overflow-visible">
                <ShatterWord word="Turn" startIndex={0} />
                <ShatterWord word="Students" startIndex={5} />
                <ShatterWord word="into" startIndex={14} />
              </span>

              <span className="block overflow-visible mt-1">
                <ShatterWord word="Industry-Ready" startIndex={19} isGradient gradientStartIndex={19} totalGradientLength={27} />
                <ShatterWord word="Professionals" startIndex={34} isGradient gradientStartIndex={19} totalGradientLength={27} />
              </span>
            </h1>

            {/* 03. Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
              className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-xl"
            >
              We partner with colleges and universities to build industry-ready talent through practical training, projects, certifications, assessments, and end-to-end placement support — bridging the gap between education and hiring.
            </motion.p>

            {/* 04. Action CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => openEnquiry('CONSULTATION')}
                className="btn-pill-primary cursor-pointer flex items-center gap-2 px-7 py-3.5 text-sm font-bold shadow-md"
              >
                <Sparkles size={16} />
                <span>Request Institutional Demo</span>
                <ArrowRight size={16} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  window.location.hash = '#training-programs';
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                className="btn-pill-secondary cursor-pointer flex items-center gap-2 px-6 py-3.5 text-sm font-semibold"
              >
                <span>View Programs</span>
                <ArrowRight size={16} className="text-slate-500" />
              </motion.button>
            </motion.div>

            {/* 05. Trust bullet checks */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-9 pt-5 border-t border-black/5 flex flex-wrap items-center gap-5 text-xs text-slate-500 font-medium"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-[#2563EB]" />
                <span>Expert Mock Interviews</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-[#2563EB]" />
                <span>Industry Mentorship</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-[#2563EB]" />
                <span>Campus Hiring Drives</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Form Format for Institutional Partnerships (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="lg:col-span-5 relative w-full"
          >
            {/* Ambient subtle glow background */}
            <div className="absolute -inset-1 rounded-3xl bg-[#2563EB]/15 blur-xl opacity-70 pointer-events-none" />

            <div className="relative rounded-3xl bg-white border border-black/8 p-6 sm:p-7 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.08)] overflow-hidden">
              
              {/* Header with INSTITUTIONAL PARTNERSHIPS badge */}
              <div className="flex items-center justify-between pb-4 border-b border-black/8 mb-5">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2563EB] text-[10px] font-mono font-bold mb-1.5">
                    <Building2 size={12} />
                    <span>INSTITUTIONAL PARTNERSHIPS</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 font-[family-name:var(--font-display)]">
                    Connect with Grow360
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Speak with our placement &amp; academic consulting team.
                  </p>
                </div>
                <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-mono font-bold text-emerald-700">
                  ● 24h Response
                </span>
              </div>

              {isSubmitted ? (
                /* Success Notification View */
                <div className="py-8 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto mb-3.5 shadow-sm">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-1.5 font-[family-name:var(--font-display)]">
                    Request Received Successfully!
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed mb-6">
                    Thank you, <strong className="text-slate-900">{fullName}</strong>. Our senior placement consultant will contact you within 24 hours.
                  </p>
                  <button
                    onClick={handleResetForm}
                    className="btn-pill-secondary text-xs py-2 px-6 cursor-pointer"
                  >
                    <span>Submit Another Request</span>
                  </button>
                </div>
              ) : (
                /* Clean Interactive Form (No suggestions, No autofill) */
                <form
                  onSubmit={handleSubmit}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  className="space-y-3.5"
                >
                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs flex items-center gap-2">
                      <AlertCircle size={14} className="shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Row 1: Full Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Full Name <span className="text-[#2563EB] font-bold">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        autoComplete="new-password"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck={false}
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter full name"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/80 border border-black/10 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#2563EB] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Email <span className="text-[#2563EB] font-bold">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        autoComplete="new-password"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck={false}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email address"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/80 border border-black/10 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#2563EB] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone Number & College */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Phone Number <span className="text-[#2563EB] font-bold">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        autoComplete="new-password"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck={false}
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Enter phone number"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/80 border border-black/10 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#2563EB] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        College / Institution
                      </label>
                      <input
                        type="text"
                        autoComplete="new-password"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck={false}
                        value={collegeName}
                        onChange={(e) => setCollegeName(e.target.value)}
                        placeholder="Enter college name"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/80 border border-black/10 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#2563EB] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 3: Profession */}
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Profession / Designation
                    </label>
                    <input
                      type="text"
                      autoComplete="new-password"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck={false}
                      value={profession}
                      onChange={(e) => setProfession(e.target.value)}
                      placeholder="Enter profession / designation"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/80 border border-black/10 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#2563EB] transition-colors"
                    />
                  </div>

                  {/* Row 4: Tell us more about your request */}
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Tell us more about your request
                    </label>
                    <textarea
                      rows={3}
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck={false}
                      value={requestDetails}
                      onChange={(e) => setRequestDetails(e.target.value)}
                      placeholder="Enter request details..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/80 border border-black/10 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#2563EB] transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-1.5">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-pill-primary py-3.5 text-xs font-bold cursor-pointer justify-center flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={15} className="animate-spin" />
                          <span>Submitting Request...</span>
                        </>
                      ) : (
                        <>
                          <Send size={14} />
                          <span>Submit Request</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
