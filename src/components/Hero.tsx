import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Search, Send, Loader2, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';

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
  // Form State (matching user reference)
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [profession, setProfession] = useState('');
  const [country, setCountry] = useState('India');
  const [requestDetails, setRequestDetails] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
      const payload = {
        source: 'HERO_REFERENCE_FORM',
        full_name: fullName,
        email: workEmail.trim(),
        phone: phoneNumber.trim(),
        organization_name: organizationName.trim(),
        job_title: jobTitle.trim(),
        profession: profession || 'Institutional Partner',
        country: country.trim() || 'India',
        message: requestDetails.trim() || null,
        created_at: new Date().toISOString(),
      };

      // 1. Send to Supabase enquiries table
      try {
        await supabase.from('enquiries').insert([
          {
            college_name: organizationName.trim(),
            contact_name: fullName,
            designation: `${jobTitle.trim()} (${profession || 'General'})`,
            email: workEmail.trim(),
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
    setFirstName('');
    setLastName('');
    setWorkEmail('');
    setPhoneNumber('');
    setOrganizationName('');
    setJobTitle('');
    setProfession('');
    setCountry('India');
    setRequestDetails('');
  };

  return (
    <section className="relative pt-32 pb-16 lg:pt-36 lg:pb-24 overflow-hidden obsidian-grid bg-[#0A0A0D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
          
          {/* Left Column: Headline, Subheadline & Quick Links */}
          <div className="lg:col-span-6 flex flex-col text-left pt-2">
            
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

            {/* 04. Action CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.5, ease: 'easeOut' }}
              className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4"
            >
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="#training-programs"
                className="btn-pill-primary cursor-pointer flex items-center gap-2 shadow-lg shadow-orange-500/20 px-7 py-3 text-sm font-bold"
              >
                <span>View Programs &amp; Curriculum</span>
                <ArrowRight size={16} />
              </motion.a>
            </motion.div>

            {/* 05. Trust bullet checks */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.15, duration: 0.6 }}
              className="mt-10 pt-6 border-t border-white/5 flex flex-wrap items-center gap-5 text-xs text-slate-400 font-mono"
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

          {/* Right Column: Reference Form Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.75,
              delay: 0.25,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="lg:col-span-6 relative"
          >
            {/* Ambient subtle glow background */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#00B4D8]/20 via-[#FF4500]/15 to-[#FFA000]/20 blur-xl opacity-60 pointer-events-none" />

            <div className="relative rounded-3xl bg-[#111116] border border-white/15 p-6 sm:p-7 shadow-2xl overflow-hidden backdrop-blur-xl">
              
              {/* Form Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-[#00B4D8]" />
                    <h3 className="text-lg font-bold text-white font-[family-name:var(--font-display)]">
                      Connect with Grow360
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Speak with our placement &amp; academic consulting directors.
                  </p>
                </div>
                <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono font-bold text-emerald-400">
                  ● 24h Response
                </span>
              </div>

              {isSubmitted ? (
                /* Success Notification View */
                <div className="py-8 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-3.5 shadow-lg shadow-emerald-500/20">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-1.5 font-[family-name:var(--font-display)]">
                    Request Received Successfully!
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto leading-relaxed mb-6">
                    Thank you, <strong className="text-white">{firstName} {lastName}</strong>. Our senior placement consultant will contact you within 24 hours.
                  </p>
                  <button
                    onClick={handleResetForm}
                    className="btn-pill-secondary text-xs py-2 px-6 cursor-pointer"
                  >
                    <span>Submit Another Request</span>
                  </button>
                </div>
              ) : (
                /* Main 2-Column Clean Form (Matching User Reference) */
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs">
                      {errorMsg}
                    </div>
                  )}

                  {/* Row 1: First Name & Last Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        First Name <span className="text-[#FF4500] font-bold">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="e.g. Rahul"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#09090D] border border-white/15 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00B4D8] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Last Name <span className="text-[#FF4500] font-bold">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="e.g. Sharma"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#09090D] border border-white/15 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00B4D8] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 2: Work Email & Phone Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Work Email <span className="text-[#FF4500] font-bold">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={workEmail}
                        onChange={(e) => setWorkEmail(e.target.value)}
                        placeholder="rahul@college.edu"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#09090D] border border-white/15 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00B4D8] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Phone Number <span className="text-[#FF4500] font-bold">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#09090D] border border-white/15 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00B4D8] transition-colors"
                      />
                      <span className="block text-[10px] text-slate-500 font-mono mt-1">
                        Please include country code.
                      </span>
                    </div>
                  </div>

                  {/* Row 3: Organization Name & Job Title */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Organization Name <span className="text-[#FF4500] font-bold">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={organizationName}
                        onChange={(e) => setOrganizationName(e.target.value)}
                        placeholder="e.g. SRM University / ABC Corp"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#09090D] border border-white/15 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00B4D8] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Job Title <span className="text-[#FF4500] font-bold">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        placeholder="e.g. Head of Placement / Dean"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#09090D] border border-white/15 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00B4D8] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 4: Profession & Country */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Profession <span className="text-[#FF4500] font-bold">*</span>
                      </label>
                      <select
                        required
                        value={profession}
                        onChange={(e) => setProfession(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#09090D] border border-white/15 text-xs text-white focus:outline-none focus:border-[#00B4D8] transition-colors cursor-pointer"
                      >
                        <option value="" disabled>Please select...</option>
                        <option value="Training & Placement Officer (TPO)">Training &amp; Placement Officer (TPO)</option>
                        <option value="College Dean / Director">College Dean / Director / Principal</option>
                        <option value="Academic Faculty / Professor">Academic Faculty / Professor</option>
                        <option value="Corporate HR / Recruiter">Corporate HR / Recruiter</option>
                        <option value="Student / Candidate">Student / Graduate</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Country <span className="text-[#FF4500] font-bold">*</span>
                      </label>
                      <div className="relative">
                        <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                          type="text"
                          required
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          placeholder="Search or enter country..."
                          className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#09090D] border border-white/15 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00B4D8] transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 5: Tell us more about your request */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Tell us more about your request
                    </label>
                    <textarea
                      rows={3}
                      value={requestDetails}
                      onChange={(e) => setRequestDetails(e.target.value)}
                      placeholder="Share details about student batch size, preferred training tracks, or institutional timeline..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#09090D] border border-white/15 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00B4D8] transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-1.5">
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
