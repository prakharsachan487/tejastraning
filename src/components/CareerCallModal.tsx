import { useState, useEffect, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAdminData } from '../context/AdminDataContext';
import { supabase } from '../lib/supabase';

interface CareerCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProgram?: string;
}

export function CareerCallModal({ isOpen, onClose, defaultProgram }: CareerCallModalProps) {
  const { user } = useAuth();
  const { addEnquiry } = useAdminData();

  // Multi-step modal state
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [backgroundType, setBackgroundType] = useState<'non-tech' | 'tech' | ''>('');

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [jobTitle, setJobTitle] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Auto-populate user data if logged in
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setStep(1);
      setBackgroundType('');
      setName(user?.name || '');
      setEmail(user?.email || '');
      setPhone('');
      setJobTitle('');
      setErrorMsg('');
      setIsSubmitting(false);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, user]);

  // Handle escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const handleSelectBackground = (type: 'non-tech' | 'tech') => {
    setBackgroundType(type);
    if (type === 'non-tech') {
      setJobTitle('Non-Tech / Career Switcher');
    } else {
      setJobTitle('Software / Data Professional');
    }
    setStep(2);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!email.trim()) {
      setErrorMsg('Please enter your email address.');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('Please enter your active phone / WhatsApp number.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const payload = {
        fullName: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        collegeName: 'N/A',
        profession: `${jobTitle} (${backgroundType === 'non-tech' ? 'Non-Tech Transition' : 'Tech Pro'})`,
        message: `Program Interest: ${defaultProgram || 'AI-Powered Software Engineering (10x)'} | Background: ${backgroundType}`,
        source: 'CONSULTATION' as const,
      };

      // 1. Admin Context Record
      addEnquiry(payload);

      // 2. Supabase Insert
      if (supabase) {
        try {
          await supabase.from('enquiries').insert([
            {
              full_name: payload.fullName,
              contact_name: payload.fullName,
              email: payload.email,
              phone: payload.phone,
              college_name: 'N/A',
              profession: payload.profession,
              designation: jobTitle || 'Candidate',
              message: payload.message,
              request_details: `1:1 Career Consultation Booking | Background: ${backgroundType}`,
              source: 'CAREER_1ON1_CALL',
            },
          ]);
        } catch (dbErr) {
          console.error('Database write error:', dbErr);
        }
      }

      setIsSubmitting(false);
      setStep(3); // Success Screen
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMsg(err?.message || 'Failed to submit consultation request. Please try again.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-black/10 overflow-hidden z-10 my-8"
          >
            {/* Top Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors z-20 cursor-pointer"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* ========================================================
                STEP 1: BACKGROUND SELECTION
            ======================================================== */}
            {step === 1 && (
              <div className="p-7 sm:p-10 space-y-7">
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold tracking-widest text-amber-600 uppercase">
                    01 · START
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-[family-name:var(--font-display)]">
                    What&apos;s your current background?
                  </h2>
                  <p className="text-sm text-slate-500 font-normal">
                    Select your current experience level so our mentors can personalize your 1:1 roadmap.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {/* Option 1: Non-Tech / Career Switcher */}
                  <div
                    onClick={() => handleSelectBackground('non-tech')}
                    className="p-6 rounded-2xl border border-slate-200 hover:border-[#2563EB] bg-white hover:bg-blue-50/30 transition-all cursor-pointer group flex flex-col justify-between space-y-6 shadow-xs hover:shadow-md"
                  >
                    <div className="space-y-2">
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-[#2563EB] transition-colors font-[family-name:var(--font-display)]">
                        Non-Tech / Career Switcher
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Looking to transition into tech from a non-technical background.
                      </p>
                    </div>
                    <div className="flex items-center text-slate-400 group-hover:text-[#2563EB] transition-colors font-bold text-sm">
                      <span>Continue</span>
                      <ArrowRight size={16} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Option 2: Software, Data & AI Professional */}
                  <div
                    onClick={() => handleSelectBackground('tech')}
                    className="p-6 rounded-2xl border border-slate-200 hover:border-[#2563EB] bg-white hover:bg-blue-50/30 transition-all cursor-pointer group flex flex-col justify-between space-y-6 shadow-xs hover:shadow-md"
                  >
                    <div className="space-y-2">
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-[#2563EB] transition-colors font-[family-name:var(--font-display)]">
                        Software, Data &amp; AI Professional
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Working in software, data, ML, AI, or DevOps — and looking to grow.
                      </p>
                    </div>
                    <div className="flex items-center text-slate-400 group-hover:text-[#2563EB] transition-colors font-bold text-sm">
                      <span>Continue</span>
                      <ArrowRight size={16} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs text-slate-400 font-mono">
                  <span>Step 1 of 2</span>
                  <span>100% Free · 30 Min Mentor Call</span>
                </div>
              </div>
            )}

            {/* ========================================================
                STEP 2: FULL DETAILS FORM
            ======================================================== */}
            {step === 2 && (
              <div className="p-7 sm:p-10 space-y-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setStep(1)}
                      className="text-xs text-slate-400 hover:text-[#2563EB] font-mono cursor-pointer"
                    >
                      ← Change Background ({backgroundType === 'non-tech' ? 'Non-Tech' : 'Tech Pro'})
                    </button>
                  </div>
                  <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight font-[family-name:var(--font-display)]">
                    Schedule Your Free 1:1 Career Call
                  </h2>
                  <p className="text-xs text-slate-500">
                    Fill in your details below. A senior engineering mentor will connect with you.
                  </p>
                </div>

                {errorMsg && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-3.5">
                  {/* Name Input */}
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Enter your name *"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all placeholder:text-slate-400"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Enter your email *"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all placeholder:text-slate-400"
                    />
                  </div>

                  {/* Phone with India Flag */}
                  <div className="relative flex items-center">
                    <div className="absolute left-3 flex items-center gap-1.5 text-xs font-semibold text-slate-600 pointer-events-none">
                      <span className="text-base">🇮🇳</span>
                      <span>+91</span>
                      <span className="text-slate-300">|</span>
                    </div>
                    <input
                      type="tel"
                      required
                      placeholder="Enter your phone number *"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-20 pr-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all placeholder:text-slate-400"
                    />
                  </div>

                  {/* Job Title Dropdown / Select */}
                  <div>
                    <select
                      required
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all bg-white"
                    >
                      <option value="" disabled>Search / Select job title *</option>
                      <option value="Student / Fresher">Student / Fresher</option>
                      <option value="Software Engineer">Software Engineer</option>
                      <option value="Frontend Developer">Frontend Developer</option>
                      <option value="Backend Developer">Backend Developer</option>
                      <option value="Full Stack Developer">Full Stack Developer</option>
                      <option value="Data Analyst / Scientist">Data Analyst / Scientist</option>
                      <option value="QA / Test Automation">QA / Test Automation</option>
                      <option value="DevOps / Cloud Engineer">DevOps / Cloud Engineer</option>
                      <option value="Non-Tech Professional">Non-Tech Professional</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>Scheduling Call...</span>
                        </>
                      ) : (
                        <>
                          <span>REQUEST A CALL</span>
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Disclaimer */}
                  <p className="text-[10px] text-slate-500 text-center leading-relaxed pt-1 font-mono">
                    By submitting this form, you agree to our{' '}
                    <a href="#terms" onClick={onClose} className="underline hover:text-slate-800">
                      Terms of Service
                    </a>{' '}
                    &amp;{' '}
                    <a href="#privacy" onClick={onClose} className="underline hover:text-slate-800">
                      Privacy Policy
                    </a>{' '}
                    and to be contacted by us via Call/Email/WhatsApp/SMS.
                  </p>
                </form>
              </div>
            )}

            {/* ========================================================
                STEP 3: SUCCESS CONFIRMATION
            ======================================================== */}
            {step === 3 && (
              <div className="p-8 sm:p-12 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 size={36} />
                </div>

                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-mono font-bold">
                    <Sparkles size={12} />
                    <span>APPOINTMENT REQUEST RECEIVED</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-[family-name:var(--font-display)]">
                    You&apos;re All Set, {name.split(' ')[0]}!
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Our Senior Career Mentor will connect with you on <strong className="text-slate-900">+91 {phone}</strong> to review your diagnostic evaluation and create your tailored sprint plan.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left max-w-md mx-auto space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-slate-600">
                    <span>Role / Background:</span>
                    <span className="font-bold text-slate-900">{jobTitle || 'Candidate'}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Session:</span>
                    <span className="font-bold text-emerald-600">1:1 Diagnostic (30 Mins Free)</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={onClose}
                    className="btn-pill-primary py-3 px-8 text-xs font-bold cursor-pointer shadow-md"
                  >
                    <span>Return to Evaluation</span>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
