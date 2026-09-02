import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Mail,
  User,
  KeyRound,
  Lock,
  Eye,
  EyeOff,
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
  const {
    user,
    isAuthOpen,
    closeAuth,
    signInWithPassword,
    signUpWithEmailPassword,
    verifySignUpOtp,
    sendForgotPasswordOtp,
    resetPasswordWithOtp,
    signInWithGoogle,
    isLoading
  } = useAuth();

  useEffect(() => {
    if (user && isAuthOpen) {
      closeAuth();
      window.location.hash = '#evaluation';
    }
  }, [user, isAuthOpen, closeAuth]);

  const [viewMode, setViewMode] = useState<'login' | 'signup' | 'forgot'>('login');

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const role = 'Student';
  
  // OTP Verification States
  const [otpStep, setOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

  // Status Alerts
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const startCooldown = () => {
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
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setErrorMsg('Please enter your email and password.');
      return;
    }

    setErrorMsg('');
    setSuccessMsg('');

    const res = await signInWithPassword(email.trim(), password);
    if (!res.success) {
      setErrorMsg(res.error || 'Invalid email or password.');
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    setErrorMsg('');
    setSuccessMsg('');

    const res = await signUpWithEmailPassword(email.trim(), password, name.trim(), role);
    if (!res.success) {
      setErrorMsg(res.error || 'Registration failed.');
    } else if (res.requiresOtp) {
      setOtpStep(true);
      setSuccessMsg(`We sent a 6-digit verification code to ${email}.`);
      startCooldown();
    }
  };

  const handleVerifySignupOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode.trim() || otpCode.trim().length < 6) {
      setErrorMsg('Please enter the complete 6-digit OTP code.');
      return;
    }

    setErrorMsg('');
    const res = await verifySignUpOtp(email.trim(), otpCode.trim(), name.trim(), role);
    if (!res.success) {
      setErrorMsg(res.error || 'Invalid or expired OTP code.');
    }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter your registered email address.');
      return;
    }

    setErrorMsg('');
    setSuccessMsg('');

    const res = await sendForgotPasswordOtp(email.trim());
    if (!res.success) {
      setErrorMsg(res.error || 'Failed to send reset code.');
    } else {
      setOtpStep(true);
      setSuccessMsg(`Password reset instructions and verification code sent to ${email}.`);
      startCooldown();
    }
  };

  const handleResetPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode.trim() || otpCode.trim().length < 6) {
      setErrorMsg('Please enter the 6-digit verification code.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('New password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setErrorMsg('');
    const res = await resetPasswordWithOtp(email.trim(), otpCode.trim(), password);
    if (!res.success) {
      setErrorMsg(res.error || 'Password update failed.');
    } else {
      setSuccessMsg('Password updated successfully! You can now sign in.');
      setTimeout(() => {
        setViewMode('login');
        setOtpStep(false);
        setPassword('');
        setConfirmPassword('');
      }, 1200);
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAuth}
            className="fixed inset-0 bg-slate-900/30 backdrop-blur-md transition-opacity"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ type: 'spring', damping: 26, stiffness: 300 }}
            className="relative w-full max-w-4xl rounded-[2.5rem] bg-[#EAE5D9] text-[#1E1E24] shadow-2xl shadow-black/80 overflow-hidden z-10 grid grid-cols-1 lg:grid-cols-12 border border-white/20"
          >
            <button
              onClick={closeAuth}
              className="absolute top-5 right-5 z-30 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-slate-700 hover:text-black flex items-center justify-center shadow-md transition-all cursor-pointer hover:scale-105"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Left Column: Form */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-b from-[#F7F4EC] via-[#EFEBE0] to-[#E5DFCFC0]">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/15 bg-white/80 shadow-xs">
                    <img src="/grow360-logo.png" alt="Grow360" className="h-4 w-auto object-contain" />
                    <span className="text-xs font-extrabold text-[#1E1E24] tracking-tight">
                      GROW<span className="text-[#2563EB]">360°</span>
                    </span>
                  </div>
                </div>

                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight font-[family-name:var(--font-display)] mb-1">
                  {viewMode === 'signup'
                    ? 'Create your account'
                    : viewMode === 'forgot'
                    ? 'Reset Password'
                    : 'Welcome back'}
                </h2>
                <p className="text-xs text-slate-600 mb-4">
                  {viewMode === 'signup'
                    ? 'Start mock technical interviews and capstone reviews today.'
                    : viewMode === 'forgot'
                    ? 'Enter your email to receive recovery instructions.'
                    : 'Access your interview performance reports and student dashboard.'}
                </p>

                {/* Google 1-Click Button */}
                {viewMode !== 'forgot' && !otpStep && (
                  <>
                    <button
                      type="button"
                      onClick={handleGoogleSignIn}
                      disabled={isLoading}
                      className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-2xl bg-white hover:bg-slate-50 border border-black/12 text-xs font-bold text-slate-800 shadow-xs transition-all cursor-pointer disabled:opacity-50"
                    >
                      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                      </svg>
                      <span>Continue with Google</span>
                    </button>

                    <div className="relative my-4 text-center">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-black/10"></div>
                      </div>
                      <span className="relative px-3 bg-[#F4F0E6] text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                        or with email
                      </span>
                    </div>
                  </>
                )}

                {/* Tab Switcher */}
                {viewMode !== 'forgot' && !otpStep && (
                  <div className="flex p-1 bg-black/5 rounded-xl mb-4">
                    <button
                      type="button"
                      onClick={() => {
                        setViewMode('login');
                        setErrorMsg('');
                        setSuccessMsg('');
                      }}
                      className={`flex-1 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                        viewMode === 'login' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      Sign In
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setViewMode('signup');
                        setErrorMsg('');
                        setSuccessMsg('');
                      }}
                      className={`flex-1 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                        viewMode === 'signup' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      Create Account
                    </button>
                  </div>
                )}

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

                {/* Flow A: Login */}
                {viewMode === 'login' && (
                  <form onSubmit={handleLoginSubmit} className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="student@university.edu.in"
                          required
                          className="w-full bg-white border border-black/10 focus:border-[#2563EB] rounded-xl py-2 pl-9 pr-3 text-xs text-slate-900 outline-hidden font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-bold text-slate-800">
                          Password *
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            setViewMode('forgot');
                            setOtpStep(false);
                            setErrorMsg('');
                            setSuccessMsg('');
                          }}
                          className="text-[11px] text-[#2563EB] hover:underline font-semibold cursor-pointer"
                        >
                          Forgot Password?
                        </button>
                      </div>
                      <div className="relative">
                        <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          required
                          className="w-full bg-white border border-black/10 focus:border-[#2563EB] rounded-xl py-2 pl-9 pr-9 text-xs text-slate-900 outline-hidden font-mono"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                        >
                          {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full btn-pill-primary py-2.5 text-xs font-bold cursor-pointer justify-center flex items-center gap-2 shadow-md shadow-blue-500/20 disabled:opacity-50 mt-1"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          <span>Signing in...</span>
                        </>
                      ) : (
                        <>
                          <span>Sign In</span>
                          <ArrowRight size={14} />
                        </>
                      )}
                    </button>
                  </form>
                )}

                {/* Flow B: Signup */}
                {viewMode === 'signup' && !otpStep && (
                  <form onSubmit={handleSignupSubmit} className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Aryan Sharma"
                          required
                          className="w-full bg-white border border-black/10 focus:border-[#2563EB] rounded-xl py-2 pl-9 pr-3 text-xs text-slate-900 outline-hidden"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="student@university.edu.in"
                          required
                          className="w-full bg-white border border-black/10 focus:border-[#2563EB] rounded-xl py-2 pl-9 pr-3 text-xs text-slate-900 outline-hidden font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        Create Password *
                      </label>
                      <div className="relative">
                        <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="At least 6 characters"
                          required
                          minLength={6}
                          className="w-full bg-white border border-black/10 focus:border-[#2563EB] rounded-xl py-2 pl-9 pr-9 text-xs text-slate-900 outline-hidden font-mono"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                        >
                          {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full btn-pill-primary py-2.5 text-xs font-bold cursor-pointer justify-center flex items-center gap-2 shadow-md shadow-blue-500/20 disabled:opacity-50 mt-1"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          <span>Creating Account...</span>
                        </>
                      ) : (
                        <>
                          <span>Create Account &amp; Verify</span>
                          <ArrowRight size={14} />
                        </>
                      )}
                    </button>
                  </form>
                )}

                {/* Flow B (Stage 2): Signup OTP Verification */}
                {viewMode === 'signup' && otpStep && (
                  <form onSubmit={handleVerifySignupOtp} className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-bold text-slate-800">
                          Enter 6-Digit Code
                        </label>
                        <button
                          type="button"
                          onClick={() => setOtpStep(false)}
                          className="text-[11px] text-[#2563EB] hover:underline cursor-pointer"
                        >
                          Change Email
                        </button>
                      </div>
                      <div className="relative">
                        <KeyRound size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          maxLength={6}
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                          placeholder="123456"
                          autoFocus
                          required
                          className="w-full bg-white border border-black/10 focus:border-[#2563EB] rounded-xl py-2 pl-9 pr-3 text-xs tracking-widest text-slate-900 outline-hidden font-mono font-bold text-center"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading || otpCode.length < 6}
                      className="w-full btn-pill-primary py-2.5 text-xs font-bold cursor-pointer justify-center flex items-center gap-2 shadow-md shadow-blue-500/20 disabled:opacity-50"
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
                      <p className="text-[10px] text-slate-500 font-mono text-center pt-1">
                        Resend in {resendCooldown}s
                      </p>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSignupSubmit}
                        className="text-[10px] text-[#2563EB] hover:underline font-bold flex items-center justify-center gap-1 mx-auto cursor-pointer pt-1"
                      >
                        <RotateCcw size={11} />
                        <span>Resend Code</span>
                      </button>
                    )}
                  </form>
                )}

                {/* Flow C: Forgot Password */}
                {viewMode === 'forgot' && !otpStep && (
                  <form onSubmit={handleForgotSubmit} className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        Registered Email Address *
                      </label>
                      <div className="relative">
                        <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="student@university.edu.in"
                          required
                          className="w-full bg-white border border-black/10 focus:border-[#2563EB] rounded-xl py-2 pl-9 pr-3 text-xs text-slate-900 outline-hidden font-mono"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full btn-pill-primary py-2.5 text-xs font-bold cursor-pointer justify-center flex items-center gap-2 shadow-md shadow-blue-500/20 disabled:opacity-50 mt-1"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          <span>Sending Code...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Reset Code</span>
                          <ArrowRight size={14} />
                        </>
                      )}
                    </button>

                    <div className="text-center pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setViewMode('login');
                          setErrorMsg('');
                          setSuccessMsg('');
                        }}
                        className="text-xs text-slate-600 hover:text-black font-semibold cursor-pointer"
                      >
                        ← Back to Sign In
                      </button>
                    </div>
                  </form>
                )}

                {/* Flow C (Stage 2): Reset Password */}
                {viewMode === 'forgot' && otpStep && (
                  <form onSubmit={handleResetPasswordSubmit} className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        6-Digit Recovery OTP *
                      </label>
                      <div className="relative">
                        <KeyRound size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          maxLength={6}
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                          placeholder="123456"
                          required
                          className="w-full bg-white border border-black/10 focus:border-[#2563EB] rounded-xl py-2 pl-9 pr-3 text-xs tracking-widest text-slate-900 outline-hidden font-mono font-bold text-center"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        New Password *
                      </label>
                      <div className="relative">
                        <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Min 6 characters"
                          required
                          minLength={6}
                          className="w-full bg-white border border-black/10 focus:border-[#2563EB] rounded-xl py-2 pl-9 pr-9 text-xs text-slate-900 outline-hidden font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        Confirm New Password *
                      </label>
                      <div className="relative">
                        <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm new password"
                          required
                          minLength={6}
                          className="w-full bg-white border border-black/10 focus:border-[#2563EB] rounded-xl py-2 pl-9 pr-9 text-xs text-slate-900 outline-hidden font-mono"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading || otpCode.length < 6}
                      className="w-full btn-pill-primary py-2.5 text-xs font-bold cursor-pointer justify-center flex items-center gap-2 shadow-md shadow-blue-500/20 disabled:opacity-50 mt-1"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          <span>Updating...</span>
                        </>
                      ) : (
                        <>
                          <span>Update Password &amp; Sign In</span>
                          <CheckCircle2 size={14} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              <div className="pt-3 mt-3 border-t border-black/5 flex items-center justify-center gap-1.5 text-slate-500 text-[10px] font-mono">
                <ShieldCheck size={13} className="text-[#2563EB]" />
                <span>Supabase 256-bit Cloud Security</span>
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
                  1-on-1 Mentorship &amp; Placement Diagnostics.
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
