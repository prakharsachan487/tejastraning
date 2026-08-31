import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Send, Loader2, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useEnquiry } from '../context/EnquiryContext';

interface ShatterWordProps {
  word: string;
  startIndex: number;
  gradientStartIndex?: number;
  totalGradientLength?: number;
  isGradient?: boolean;
}

function ShatterWord({
  word,
  startIndex,
  gradientStartIndex = 0,
  totalGradientLength = 27,
  isGradient = false,
}: ShatterWordProps) {
  return (
    <span className="inline-flex mr-[0.28em] last:mr-0">
      {word.split('').map((char, charIdx) => {
        const globalIdx = startIndex + charIdx;
        const xOffset = ((globalIdx * 37 + 11) % 60) - 30;
        const yOffset = ((globalIdx * 43 + 17) % 50) - 25;
        const rotOffset = ((globalIdx * 59 + 23) % 40) - 20;
        const scaleStart = 0.5 + ((globalIdx * 19) % 6) * 0.1;

        let charColor = '#12151B';
        if (isGradient) {
          const ratio = Math.max(0, Math.min(1, (globalIdx - gradientStartIndex) / Math.max(totalGradientLength - 1, 1)));
          const r = Math.round(37 + (96 - 37) * ratio);
          const g = Math.round(99 + (165 - 99) * ratio);
          const b = Math.round(235 + (250 - 235) * ratio);
          charColor = `rgb(${r}, ${g}, ${b})`;
        }

        return (
          <motion.span
            key={`${char}-${charIdx}`}
            initial={{
              opacity: 0,
              x: xOffset,
              y: yOffset,
              rotate: rotOffset,
              scale: scaleStart,
            }}
            animate={{
              opacity: 1,
              x: 0,
              y: 0,
              rotate: 0,
              scale: 1,
            }}
            transition={{
              delay: 0.15 + globalIdx * 0.022,
              duration: 0.55,
              ease: [0.175, 0.885, 0.32, 1.275],
            }}
            className="inline-block origin-center"
            style={{ color: charColor }}
          >
            {char}
          </motion.span>
        );
      })}
    </span>
  );
}

export function Hero() {
  const { openEnquiry } = useEnquiry();
  // Form State
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
        source: 'HERO_REFERENCE_FORM',
        full_name: fullName.trim(),
        email: email.trim(),
        phone: phoneNumber.trim(),
        college_name: collegeName.trim(),
        profession: profession.trim() || 'General Inquiry',
        message: requestDetails.trim() || null,
        created_at: new Date().toISOString(),
      };

      // 1. Send to Supabase enquiries table
      try {
        await supabase.from('enquiries').insert([
          {
            college_name: collegeName.trim(),
            contact_name: fullName.trim(),
            designation: profession.trim() || 'General',
            email: email.trim(),
            phone: phoneNumber.trim(),
            source: 'CONSULTATION'
          }
        ]);
      } catch (sbErr) {
        console.warn('[Supabase] Hero enquiry fallback:', sbErr);
      }

      // 2. Fallback to API if active
      try {
        await fetch('/api/enquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch {}

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
    <section className="relative pt-32 pb-16 lg:pt-36 lg:pb-24 overflow-hidden obsidian-grid bg-[#F8F9FB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          
          {/* Left Column: Headline, Subheadline & Quick Links (7 cols for ample text width) */}
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

            {/* 02. Slow Shatter Re-assembly Headline */}
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
              transition={{ delay: 0.85, duration: 0.6, ease: 'easeOut' }}
              className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-xl"
            >
              We partner with colleges and universities to build industry-ready talent through practical training, projects, certifications, assessments, and end-to-end placement support — bridging the gap between education and hiring.
            </motion.p>

            {/* 04. Action CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.5, ease: 'easeOut' }}
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
              transition={{ delay: 1.15, duration: 0.6 }}
              className="mt-9 pt-5 border-t border-black/5 flex flex-wrap items-center gap-5 text-xs text-slate-500 font-medium"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-[#2563EB]" />
                <span>AI Mock Diagnostics</span>
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

          {/* Right Column: Reference Form Box (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.75,
              delay: 0.25,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="lg:col-span-5 relative w-full"
          >
            {/* Ambient subtle glow background */}
            <div className="absolute -inset-1 rounded-3xl bg-[#2563EB]/15 blur-xl opacity-70 pointer-events-none" />

            <div className="relative rounded-3xl bg-white border border-black/8 p-6 sm:p-7 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.08)] overflow-hidden">
              
              {/* Form Header */}
              <div className="flex items-center justify-between pb-4 border-b border-black/8 mb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-[#2563EB]" />
                    <h3 className="text-lg font-bold text-slate-900 font-[family-name:var(--font-display)]">
                      Connect with Grow360
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Speak with our placement &amp; academic consulting directors.
                  </p>
                </div>
                <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-mono font-bold text-emerald-700">
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
                /* Main 2-Column Clean Form */
                <form onSubmit={handleSubmit} autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck={false} className="space-y-3.5">
                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs">
                      {errorMsg}
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
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/80 border border-black/10 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#2563EB] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        College
                      </label>
                      <input
                        type="text"
                        autoComplete="new-password"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck={false}
                        value={collegeName}
                        onChange={(e) => setCollegeName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/80 border border-black/10 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#2563EB] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 3: Profession (Optional Direct Fill Input) */}
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Profession
                    </label>
                    <input
                      type="text"
                      autoComplete="new-password"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck={false}
                      value={profession}
                      onChange={(e) => setProfession(e.target.value)}
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
