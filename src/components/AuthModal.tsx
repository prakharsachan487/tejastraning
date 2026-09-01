import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Mail,
  User,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function AuthModal() {
  const { isAuthOpen, authMode, closeAuth, setAuthMode, sendEmailOtp, verifyEmailOtp, signInWithGoogle, isLoading } = useAuth();

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'Student' | 'Mentor' | 'Placement Officer'>('Student');
  const [otpCode, setOtpCode] = useState('');
  const [step, setStep] = useState<'email' | 'otp'>('email');

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

  const isSignUp = authMode === 'signup';

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    if (isSignUp && !name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    setErrorMsg('');
    setSuccessMsg('');

    const res = await sendEmailOtp(email.trim());
    if (!res.success) {
      setErrorMsg(res.error || 'Failed to send OTP code.');
    } else {
      setStep('otp');
      setSuccessMsg(`A 6-digit verification code has been dispatched to ${email}.`);
      setResendCooldown(45);
      const timer = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode.trim() || otpCode.trim().length < 6) {
      setErrorMsg('Please enter the complete 6-digit OTP code.');
      return;
    }

    setErrorMsg('');
    const res = await verifyEmailOtp(email.trim(), otpCode.trim(), role, name.trim());
    if (!res.success) {
      setErrorMsg(res.error || 'Invalid or expired OTP code. Please try again.');
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMsg('');
    const res = await signInWithGoogle();
    if (!res.success) {
      setErrorMsg(res.error || 'Google Sign-In initialization failed.');
    }
  };

  return (
    <AnimatePresence>
      {isAuthOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto font-sans">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAuth}
            className="fixed inset-0 bg-slate-900/30 backdrop-blur-md transition-opacity"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ type: 'spring', damping: 26, stiffness: 300 }}
            className="relative w-full max-w-4xl rounded-[2.5rem] bg-[#EAE5D9] text-[#1E1E24] shadow-2xl shadow-black/80 overflow-hidden z-10 grid grid-cols-1 lg:grid-cols-12 border border-white/20"
          >
            {/* Top Close Button */}
            <button
              onClick={closeAuth}
              className="absolute top-5 right-5 z-30 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-slate-700 hover:text-black flex items-center justify-center shadow-md transition-all cursor-pointer hover:scale-105"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Left Column: Form */}
            <div className="lg:col-span-7 p-7 sm:p-10 flex flex-col justify-between bg-gradient-to-b from-[#F7F4EC] via-[#EFEBE0] to-[#E5DFCFC0]">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/15 bg-white/80 shadow-xs">
                    <img src="/grow360-logo.png" alt="Grow360" className="h-4 w-auto object-contain" />
                    <span className="text-xs font-extrabold text-[#1E1E24] tracking-tight">
                      GROW<span className="text-[#2563EB]">360°</span>
                    </span>
                  </div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-[family-name:var(--font-display)] mb-1">
                  {isSignUp ? 'Create your account' : 'Welcome back'}
                </h2>
                <p className="text-xs text-slate-600 mb-6">
                  {isSignUp
                    ? 'Start mock technical interviews and capstone reviews today.'
                    : 'Access your interview performance reports and student dashboard.'}
                </p>

                {/* Google 1-Click Button */}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl bg-white hover:bg-slate-50 border border-black/12 text-xs font-bold text-slate-800 shadow-xs transition-all cursor-pointer disabled:opacity-50"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </button>

                <div className="relative my-5 text-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-black/10"></div>
                  </div>
                  <span className="relative px-3 bg-[#F4F0E6] text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                    or with email OTP
                  </span>
                </div>

                {/* Tab Switcher */}
                <div className="flex p-1 bg-black/5 rounded-xl mb-4">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('login');
                      setStep('email');
                      setErrorMsg('');
                    }}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      !isSignUp ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('signup');
                      setStep('email');
                      setErrorMsg('');
                    }}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      isSignUp ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    Register
                  </button>
                </div>

                {errorMsg && (
                  <div className="mb-3 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-1.5">
                    <AlertCircle size={14} className="shrink-0 mt-0.5 text-rose-600" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {successMsg && (
                  <div className="mb-3 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-1.5">
                    <CheckCircle2 size={14} className="shrink-0 mt-0.5 text-emerald-600" />
                    <span>{successMsg}</span>
                  </div>
                )}

                {step === 'email' ? (
                  <form onSubmit={handleSendOtp} className="space-y-3">
                    {isSignUp && (
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Aryan Sharma"
                            required={isSignUp}
                            className="w-full bg-white border border-black/10 focus:border-[#2563EB] rounded-xl py-2.5 pl-9 pr-3 text-xs text-slate-900 outline-hidden"
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="student@university.edu.in"
                          required
                          className="w-full bg-white border border-black/10 focus:border-[#2563EB] rounded-xl py-2.5 pl-9 pr-3 text-xs text-slate-900 outline-hidden font-mono"
                        />
                      </div>
                    </div>

                    {isSignUp && (
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1">
                          Role
                        </label>
                        <select
                          value={role}
                          onChange={(e) => setRole(e.target.value as any)}
                          className="w-full bg-white border border-black/10 focus:border-[#2563EB] rounded-xl py-2 px-3 text-xs text-slate-800 outline-hidden cursor-pointer"
                        >
                          <option value="Student">Student (Interview Prep &amp; Capstone)</option>
                          <option value="Mentor">Mentor / Industry Instructor</option>
                          <option value="Placement Officer">College Placement Officer</option>
                        </select>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full btn-pill-primary py-3 text-xs font-bold cursor-pointer justify-center flex items-center gap-2 shadow-md shadow-blue-500/20 disabled:opacity-50 mt-2"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          <span>Sending OTP...</span>
                        </>
                      ) : (
                        <>
                          <span>Send 6-Digit OTP</span>
                          <ArrowRight size={14} />
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-bold text-slate-800">
                          Enter 6-Digit Code
                        </label>
                        <button
                          type="button"
                          onClick={() => setStep('email')}
                          className="text-[11px] text-[#2563EB] hover:underline cursor-pointer"
                        >
                          Change Email
                        </button>
                      </div>
                      <div className="relative">
                        <KeyRound size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          maxLength={6}
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                          placeholder="123456"
                          autoFocus
                          required
                          className="w-full bg-white border border-black/10 focus:border-[#2563EB] rounded-xl py-2.5 pl-9 pr-3 text-xs tracking-widest text-slate-900 outline-hidden font-mono font-bold text-center"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading || otpCode.length < 6}
                      className="w-full btn-pill-primary py-3 text-xs font-bold cursor-pointer justify-center flex items-center gap-2 shadow-md shadow-blue-500/20 disabled:opacity-50"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          <span>Verifying...</span>
                        </>
                      ) : (
                        <>
                          <span>Verify &amp; Sign In</span>
                          <CheckCircle2 size={14} />
                        </>
                      )}
                    </button>

                    {resendCooldown > 0 ? (
                      <p className="text-[11px] text-slate-500 font-mono text-center pt-1">
                        Resend in {resendCooldown}s
                      </p>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        className="text-[11px] text-[#2563EB] hover:underline font-bold flex items-center justify-center gap-1 mx-auto cursor-pointer pt-1"
                      >
                        <RotateCcw size={11} />
                        <span>Resend Code</span>
                      </button>
                    )}
                  </form>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-black/5 flex items-center justify-center gap-1.5 text-slate-500 text-[10px] font-mono">
                <ShieldCheck size={13} className="text-[#2563EB]" />
                <span>Supabase Protected</span>
              </div>
            </div>

            {/* Right Column: Decorative */}
            <div className="hidden lg:flex lg:col-span-5 bg-[#0E131F] text-white flex-col justify-between p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-[11px] font-mono font-semibold">
                  <Sparkles size={12} className="text-blue-400" />
                  <span>Student Suite</span>
                </div>
              </div>

              <div className="relative z-10 space-y-3">
                <h3 className="text-xl font-bold font-[family-name:var(--font-display)] leading-snug">
                  1-on-1 Mentorship &amp; AI-Driven Placement Diagnostics.
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Join hundreds of engineering colleges accelerating top placement conversions.
                </p>
              </div>

              <div className="relative z-10 text-[10px] text-slate-400 font-mono">
                &copy; {new Date().getFullYear()} Grow360 Infrastructure
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
