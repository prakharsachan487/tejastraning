import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
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

export function AuthPage() {
  const { sendEmailOtp, verifyEmailOtp, signInWithGoogle, isLoading } = useAuth();
  const [tab, setTab] = useState<'login' | 'signup'>('login');

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'Student' | 'Mentor' | 'Placement Officer'>('Student');
  const [otpCode, setOtpCode] = useState('');
  const [step, setStep] = useState<'email' | 'otp'>('email');

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

  const isSignUp = tab === 'signup';

  // ─── Step 1: Send OTP to Email ─────────────────────────────
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
      setErrorMsg(res.error || 'Failed to send OTP. Please check your Supabase Email provider settings.');
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

  // ─── Step 2: Verify OTP Token ──────────────────────────────
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

  // ─── Google OAuth Login ────────────────────────────────────
  const handleGoogleSignIn = async () => {
    setErrorMsg('');
    const res = await signInWithGoogle();
    if (!res.success) {
      setErrorMsg(res.error || 'Google Sign-In initialization failed.');
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F7F4EC] text-[#1E1E24] flex flex-col lg:flex-row relative font-sans selection:bg-[#2563EB] selection:text-white">
      {/* ========================================================
          LEFT HALF: AUTHENTICATION CONTAINER
      ======================================================== */}
      <div className="w-full lg:w-1/2 min-h-screen flex flex-col justify-between p-6 sm:p-10 lg:p-14 bg-gradient-to-b from-[#FAF8F3] via-[#F4F0E6] to-[#ECE5D8] relative z-10">
        {/* Top Header Row with Back Button & Brand Badge */}
        <div className="flex items-center justify-between w-full">
          <button
            onClick={() => {
              window.location.hash = '';
            }}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-black transition-colors bg-black/5 hover:bg-black/10 px-4 py-2 rounded-full border border-black/10 cursor-pointer"
          >
            <ArrowLeft size={15} />
            <span>Back to Home</span>
          </button>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-black/15 bg-white/80 shadow-xs">
            <img
              src="/grow360-logo.png"
              alt="Grow360 Logo"
              className="h-4 w-auto object-contain rounded"
            />
            <span className="text-xs font-extrabold text-[#1E1E24] tracking-tight">
              GROW<span className="text-[#2563EB]">360°</span>
            </span>
          </div>
        </div>

        {/* Center Form Box */}
        <div className="max-w-md w-full mx-auto my-auto py-8">
          {/* Form Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1F] tracking-tight font-[family-name:var(--font-display)]">
              {isSignUp ? 'Create an account' : 'Welcome back'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 font-normal">
              {isSignUp
                ? 'Join thousands of students and mentors accelerating their careers.'
                : 'Sign in to access your interview reports, capstone rubrics & dashboard.'}
            </p>
          </div>

          {/* Social Sign-In (Google OAuth) */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-50 border border-black/12 text-xs sm:text-sm font-bold text-slate-800 shadow-xs transition-all hover:shadow-md cursor-pointer disabled:opacity-50"
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

          {/* Divider */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-black/10"></div>
            </div>
            <span className="relative px-4 bg-[#F5F2E9] text-[11px] font-mono text-slate-500 uppercase tracking-widest">
              or sign in with email OTP
            </span>
          </div>

          {/* Toggle Login / Signup Pills */}
          <div className="flex p-1 bg-black/5 rounded-2xl mb-6 border border-black/5">
            <button
              type="button"
              onClick={() => {
                setTab('login');
                setStep('email');
                setErrorMsg('');
                setSuccessMsg('');
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                tab === 'login'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-black'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setTab('signup');
                setStep('email');
                setErrorMsg('');
                setSuccessMsg('');
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                tab === 'signup'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-black'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2"
            >
              <AlertCircle size={15} className="shrink-0 mt-0.5 text-rose-600" />
              <span>{errorMsg}</span>
            </motion.div>
          )}

          {/* Success Message */}
          {successMsg && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2"
            >
              <CheckCircle2 size={15} className="shrink-0 mt-0.5 text-emerald-600" />
              <span>{successMsg}</span>
            </motion.div>
          )}

          {/* ── STEP 1: EMAIL ENTRY FORM ── */}
          {step === 'email' ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              {isSignUp && (
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Aryan Sharma"
                      required={isSignUp}
                      className="w-full bg-white border border-black/10 focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] rounded-2xl py-3 pl-10 pr-4 text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-hidden transition-all shadow-inner"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@university.edu.in"
                    required
                    className="w-full bg-white border border-black/10 focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] rounded-2xl py-3 pl-10 pr-4 text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-hidden transition-all shadow-inner font-mono"
                  />
                </div>
              </div>

              {isSignUp && (
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Primary Role
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as any)}
                    className="w-full bg-white border border-black/10 focus:border-[#2563EB] rounded-2xl py-3 px-4 text-xs sm:text-sm text-slate-800 outline-hidden cursor-pointer"
                  >
                    <option value="Student">Student (Interview Preparation &amp; Capstone)</option>
                    <option value="Mentor">Mentor / Industry Instructor</option>
                    <option value="Placement Officer">College Placement Officer (TPO)</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-pill-primary py-3.5 text-xs sm:text-sm font-bold cursor-pointer justify-center flex items-center gap-2 shadow-lg shadow-blue-500/20 disabled:opacity-50 mt-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Dispatching OTP...</span>
                  </>
                ) : (
                  <>
                    <span>Send 6-Digit OTP Code</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* ── STEP 2: 6-DIGIT OTP VERIFICATION FORM ── */
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    Enter 6-Digit Verification Code
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setStep('email');
                      setErrorMsg('');
                    }}
                    className="text-[11px] text-[#2563EB] hover:underline font-semibold cursor-pointer"
                  >
                    Change Email
                  </button>
                </div>
                <div className="relative">
                  <KeyRound size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="123456"
                    autoFocus
                    required
                    className="w-full bg-white border border-black/10 focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] rounded-2xl py-3 pl-10 pr-4 text-sm tracking-widest text-slate-900 placeholder-slate-400 outline-hidden transition-all shadow-inner font-mono font-bold text-center"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || otpCode.length < 6}
                className="w-full btn-pill-primary py-3.5 text-xs sm:text-sm font-bold cursor-pointer justify-center flex items-center gap-2 shadow-lg shadow-blue-500/20 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Verifying Code...</span>
                  </>
                ) : (
                  <>
                    <span>Verify &amp; Enter Dashboard</span>
                    <CheckCircle2 size={16} />
                  </>
                )}
              </button>

              {/* Resend OTP option */}
              <div className="text-center pt-2">
                {resendCooldown > 0 ? (
                  <span className="text-xs text-slate-500 font-mono">
                    Resend code in {resendCooldown}s
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="text-xs text-[#2563EB] hover:underline font-bold flex items-center justify-center gap-1 mx-auto cursor-pointer"
                  >
                    <RotateCcw size={12} />
                    <span>Resend OTP Code</span>
                  </button>
                )}
              </div>
            </form>
          )}

          {/* Privacy Note */}
          <div className="mt-8 text-center">
            <p className="text-[11px] text-slate-500">
              By proceeding, you agree to Grow360&apos;s{' '}
              <a href="#terms" className="underline hover:text-black">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#privacy" className="underline hover:text-black">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>

        {/* Bottom Security Badge */}
        <div className="w-full flex items-center justify-center gap-2 text-slate-500 text-[11px] font-mono">
          <ShieldCheck size={14} className="text-[#2563EB]" />
          <span>Protected by Supabase 256-bit Cloud Security</span>
        </div>
      </div>

      {/* ========================================================
          RIGHT HALF: EDITORIAL BRAND SHOWCASE
      ======================================================== */}
      <div className="hidden lg:flex w-1/2 bg-[#0E131F] text-white flex-col justify-between p-14 relative overflow-hidden">
        {/* Background Ambient Glows */}
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top Feature Pill */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-mono font-semibold">
            <Sparkles size={13} className="text-blue-400" />
            <span>Grow360 Student &amp; Placement Suite</span>
          </div>
        </div>

        {/* Center Editorial Quote & Feature Highlights */}
        <div className="relative z-10 max-w-lg space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-[family-name:var(--font-display)] leading-tight">
            Accelerate your engineering journey with real industry mentors.
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed font-normal">
            Access 1-on-1 mock technical interviews, production system design rubrics, and automated coding performance analytics designed by engineers from Meta, Google, and Deloitte.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
            <div>
              <span className="text-2xl font-extrabold text-white font-[family-name:var(--font-display)]">
                90%+
              </span>
              <p className="text-xs text-slate-400 mt-0.5">Tier-1 Placement Rate</p>
            </div>
            <div>
              <span className="text-2xl font-extrabold text-blue-400 font-[family-name:var(--font-display)]">
                120+
              </span>
              <p className="text-xs text-slate-400 mt-0.5">Corporate Mentors</p>
            </div>
          </div>
        </div>

        {/* Bottom Testimonial Snippet */}
        <div className="relative z-10 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
          <p className="text-xs text-slate-300 italic mb-3">
            &ldquo;Grow360 mock drives helped our batch master live system design questions and clear top software engineering campus drives with ease.&rdquo;
          </p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center font-bold text-xs text-white">
              V
            </div>
            <div>
              <p className="text-xs font-bold text-white">Parul University Cohort</p>
              <p className="text-[10px] font-mono text-slate-400">Placed at Tier-1 MNC</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
