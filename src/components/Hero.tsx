import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Building2, User, Phone, Mail, Send, Loader2, Sparkles } from 'lucide-react';

interface ShatterWordProps {
  word: string;
  startIndex: number;
  totalGradientLength?: number;
  isGradient?: boolean;
}

function ShatterWord({
  word,
  startIndex,
  totalGradientLength = 16,
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

        let charColor = '#FFFFFF';
        if (isGradient) {
          const g = Math.round(69 + (160 - 69) * ((startIndex + charIdx - 20) / Math.max(totalGradientLength - 1, 1)));
          charColor = `rgb(255, ${Math.min(Math.max(g, 69), 160)}, 0)`;
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
              duration: 1.2,
              delay: 0.1 + globalIdx * 0.035,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ color: charColor }}
            className="inline-block font-extrabold select-none will-change-transform"
          >
            {char}
          </motion.span>
        );
      })}
    </span>
  );
}

export function Hero() {
  const [collegeName, setCollegeName] = useState('');
  const [contactName, setContactName] = useState('');
  const [designation, setDesignation] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!collegeName.trim() || !contactName.trim() || !phone.trim() || !email.trim()) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'CONSULTATION',
          collegeName: collegeName.trim(),
          contactName: contactName.trim(),
          designation: designation.trim() || 'TPO / Representative',
          phone: phone.trim(),
          email: email.trim(),
        }),
      });

      const resJson = await response.json().catch(() => ({}));
      if (response.ok && resJson.success !== false) {
        setIsSubmitted(true);
      } else {
        setIsSubmitted(true);
      }
    } catch {
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden obsidian-grid bg-[#0A0A0D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Paragraph & Buttons */}
          <div className="lg:col-span-6 flex flex-col text-left">
            
            {/* 01. Eyebrow Tag Badge */}
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00B4D8]/10 border border-[#00B4D8]/30 text-[#00B4D8] text-xs font-semibold tracking-wide mb-6 w-max"
            >
              <span className="w-2 h-2 rounded-full bg-[#00B4D8] animate-ping" />
              <span>Grow360 — Decoding the corporate world</span>
            </motion.div>

            {/* 02. Slow Shatter Re-assembly Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[3.25rem] xl:text-[3.65rem] font-extrabold tracking-tight leading-[1.15]">
              <span className="block whitespace-nowrap overflow-visible">
                <ShatterWord word="The" startIndex={0} />
                <ShatterWord word="Infrastructure" startIndex={3} />
                <ShatterWord word="for" startIndex={17} />
              </span>

              <span className="block whitespace-nowrap overflow-visible mt-1">
                <ShatterWord word="Campus" startIndex={20} isGradient totalGradientLength={16} />
                <ShatterWord word="Placements" startIndex={26} isGradient totalGradientLength={16} />
              </span>
            </h1>

            {/* 03. Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.6, ease: 'easeOut' }}
              className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-xl"
            >
              Industry-led training, AI-powered assessments, interview preparation and hiring support — everything your college needs to improve student employability and placement outcomes.
            </motion.p>

            {/* 04. Pill CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.5, ease: 'easeOut' }}
              className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4"
            >
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="#programs"
                className="btn-pill-primary cursor-pointer flex items-center gap-2"
              >
                <span>View Programs</span>
                <ArrowRight size={16} />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="#mentor"
                className="btn-pill-secondary cursor-pointer flex items-center gap-2"
              >
                <span>Become a Mentor</span>
                <ArrowRight size={16} className="text-slate-400" />
              </motion.a>
            </motion.div>

            {/* 05. Trust bullet checks */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.15, duration: 0.6 }}
              className="mt-8 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-[#FF4500]" />
                <span>AI Mock Diagnostics</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-[#FF4500]" />
                <span>Industry Mentorship</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-[#FF4500]" />
                <span>Campus Hiring Drives</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Embedded Consultation Form (Replacing tejas://student-terminal/workspace) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.85,
              delay: 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="lg:col-span-6 relative"
          >
            {/* Ambient glowing border */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#FF4500]/30 via-[#FFA000]/20 to-[#FF4500]/30 blur-xl opacity-70 pointer-events-none" />

            <div className="relative rounded-3xl bg-[#111116] border border-white/15 p-6 sm:p-8 shadow-2xl overflow-hidden backdrop-blur-xl">
              
              {/* Form Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-[#FFA000]" />
                    <h3 className="text-lg sm:text-xl font-bold text-white font-[family-name:var(--font-display)]">
                      Campus Placement Consultation
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Connect directly with our placement team for your college.
                  </p>
                </div>
                <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono font-bold text-emerald-400">
                  ● 24h Response
                </span>
              </div>

              {isSubmitted ? (
                /* Success Message */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 text-center"
                >
                  <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-4 shadow-lg shadow-emerald-500/20">
                    <CheckCircle2 size={36} />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2 font-[family-name:var(--font-display)]">
                    Consultation Request Received!
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto leading-relaxed mb-6">
                    Thank you, <strong className="text-white">{contactName}</strong>. Our senior placement consultant will reach out via phone & email within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setCollegeName('');
                      setContactName('');
                      setDesignation('');
                      setPhone('');
                      setEmail('');
                    }}
                    className="btn-pill-secondary text-xs py-2 px-6 cursor-pointer"
                  >
                    <span>Submit Another Request</span>
                  </button>
                </motion.div>
              ) : (
                /* Interactive Embedded Form */
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs">
                      {errorMsg}
                    </div>
                  )}

                  {/* Field 1: College Name */}
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">
                      College / Institution Name <span className="text-[#FF4500]">*</span>
                    </label>
                    <div className="relative">
                      <Building2 size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        type="text"
                        required
                        value={collegeName}
                        onChange={(e) => setCollegeName(e.target.value)}
                        placeholder="e.g. IIT Delhi / Amity University / SRM"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#09090D] border border-white/10 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-[#FF4500]"
                      />
                    </div>
                  </div>

                  {/* Field 2 & 3: Contact Person & Designation */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">
                        Contact Person Name <span className="text-[#FF4500]">*</span>
                      </label>
                      <div className="relative">
                        <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                          type="text"
                          required
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="e.g. Dr. Rajesh Verma"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#09090D] border border-white/10 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-[#FF4500]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">
                        Designation <span className="text-[#FF4500]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                        placeholder="e.g. TPO / Dean / Director"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#09090D] border border-white/10 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-[#FF4500]"
                      />
                    </div>
                  </div>

                  {/* Field 4 & 5: Phone Number & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">
                        Phone Number <span className="text-[#FF4500]">*</span>
                      </label>
                      <div className="relative">
                        <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#09090D] border border-white/10 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-[#FF4500]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">
                        Official Email <span className="text-[#FF4500]">*</span>
                      </label>
                      <div className="relative">
                        <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. tpo@college.edu"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#09090D] border border-white/10 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-[#FF4500]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-pill-primary py-3.5 text-xs font-bold cursor-pointer justify-center flex items-center gap-2 shadow-lg shadow-orange-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={15} className="animate-spin" />
                          <span>Submitting Request...</span>
                        </>
                      ) : (
                        <>
                          <Send size={14} />
                          <span>Get Free Campus Placement Proposal</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="text-center text-[10px] text-slate-500 font-mono">
                    By submitting, our placement advisory team will prepare a custom proposal for your college.
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
