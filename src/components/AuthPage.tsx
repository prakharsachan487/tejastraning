import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Eye,
  EyeOff,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function AuthPage() {
  const { login } = useAuth();
  const [tab, setTab] = useState<'login' | 'signup'>('login');

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const isSignUp = tab === 'signup';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);

      setTimeout(() => {
        const enteredName = name.trim() || (email ? email.split('@')[0] : 'Student User');
        login({
          name: enteredName,
          email: email.trim(),
          role: 'Student',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        });
        setIsSuccess(false);
        window.location.hash = '#dashboard';
      }, 600);
    }, 500);
  };

  const handleSocialLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      login({
        name: `Google User`,
        email: email || `user@google.com`,
        role: 'Student',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      });
      window.location.hash = '#dashboard';
    }, 500);
  };

  return (
    <div className="min-h-screen w-full bg-[#F7F4EC] text-[#1E1E24] flex flex-col lg:flex-row relative">
      
      {/* ========================================================
          LEFT HALF: FULL SCREEN AUTH FORM
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
            <span className="text-xs font-extrabold text-[#1E1E24] tracking-tight">GROW<span className="text-[#00B4D8]">360°</span></span>
          </div>
        </div>

        {/* Center Form Content */}
        <div className="max-w-md w-full mx-auto my-auto py-8">
          
          {/* Form Title & Subtitle */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1F] tracking-tight font-[family-name:var(--font-display)]">
              {isSignUp ? 'Create an account' : 'Welcome back'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 font-normal">
              {isSignUp
                ? 'Grow360 — Decoding the corporate world. Sign up to get started.'
                : 'Log in to access your placement roadmap, diagnostics & mentor sessions.'}
            </p>
          </div>

          {/* Success Animation Notification */}
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-600 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                {isSignUp ? 'Account Created Successfully!' : 'Welcome Back!'}
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Redirecting to your dashboard...
              </p>
            </motion.div>
          ) : (
            /* Main Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Full Name Field (Sign Up Only) */}
              {isSignUp && (
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5 ml-3.5">
                    Full name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Amélie Laurent"
                    className="w-full px-5 py-3.5 rounded-full bg-white border border-black/10 text-sm text-[#1E1E24] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#A5C4BE] focus:border-transparent shadow-xs transition-all"
                  />
                </div>
              )}

              {/* Email Field */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5 ml-3.5">
                  Email address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="amelielaurent7622@gmail.com"
                  className="w-full px-5 py-3.5 rounded-full bg-white border border-black/10 text-sm text-[#1E1E24] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#A5C4BE] focus:border-transparent shadow-xs transition-all"
                />
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between ml-3.5 mb-1.5">
                  <label className="block text-xs font-medium text-slate-700">
                    Password
                  </label>
                  {!isSignUp && (
                    <button
                      type="button"
                      onClick={() => alert('Password reset link sent to your email!')}
                      className="text-xs text-[#7A9D96] hover:underline font-medium cursor-pointer"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••••••"
                    className="w-full pl-5 pr-12 py-3.5 rounded-full bg-white border border-black/10 text-sm text-[#1E1E24] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#A5C4BE] focus:border-transparent shadow-xs transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-black transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Primary Golden Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-[#B8D5CF] via-[#A5C4BE] to-[#9CBDB7] hover:from-[#CBE3DE] hover:to-[#7A9D96] text-[#1E1E24] font-bold text-sm shadow-md shadow-[#7A9D96]/ active:scale-[0.99] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <span className="inline-block w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  ) : (
                    <span>{isSignUp ? 'Create Account' : 'Sign In to Dashboard'}</span>
                  )}
                </button>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 my-4">
                <div className="flex-1 h-px bg-black/10" />
                <span className="text-[11px] font-mono uppercase text-slate-400 tracking-wider">
                  or
                </span>
                <div className="flex-1 h-px bg-black/10" />
              </div>

              {/* Social Login Button (Google) */}
              <div>
                <button
                  type="button"
                  onClick={() => handleSocialLogin()}
                  className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-full bg-white hover:bg-slate-50 border border-black/10 text-xs font-semibold text-[#1E1E24] shadow-xs hover:shadow transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#EA4335"
                      d="M12 5c1.56 0 2.97.55 4.08 1.45l3.06-3.06C17.29 1.7 14.8 1 12 1 7.4 1 3.47 3.6 1.56 7.42l3.71 2.88C6.18 7.35 8.84 5 12 5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58l3.71 2.88c2.16-2 3.71-4.94 3.71-8.7z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.27 14.3c-.24-.72-.38-1.49-.38-2.3s.14-1.58.38-2.3L1.56 6.82C.56 8.8 0 11.02 0 13.4s.56 4.6 1.56 6.58l3.71-2.88z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c3.24 0 5.95-1.08 7.93-2.91l-3.71-2.88c-1.08.72-2.45 1.16-4.22 1.16-3.16 0-5.82-2.35-6.73-5.3L1.56 16.95C3.47 20.77 7.4 23 12 23z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </button>
              </div>
            </form>
          )}

          {/* Bottom Switcher */}
          <div className="mt-8 text-center text-xs text-slate-600">
            {isSignUp ? (
              <span>
                Already have an account?{' '}
                <button
                  onClick={() => setTab('login')}
                  className="font-bold text-[#1E1E24] hover:underline cursor-pointer ml-1"
                >
                  Sign in
                </button>
              </span>
            ) : (
              <span>
                Don't have an account?{' '}
                <button
                  onClick={() => setTab('signup')}
                  className="font-bold text-[#1E1E24] hover:underline cursor-pointer ml-1"
                >
                  Sign up
                </button>
              </span>
            )}
          </div>
        </div>

        {/* Bottom Footer Row */}
        <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-6 border-t border-black/10">
          <span>© {new Date().getFullYear()} Grow360 — Decoding the corporate world. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a
              href="#terms"
              onClick={(e) => {
                e.preventDefault();
                window.location.hash = '#terms';
              }}
              className="hover:underline hover:text-black transition-colors"
            >
              Terms
            </a>
            <a
              href="#privacy"
              onClick={(e) => {
                e.preventDefault();
                window.location.hash = '#privacy';
              }}
              className="hover:underline hover:text-black transition-colors"
            >
              Privacy Policy
            </a>
          </div>
        </div>

      </div>

      {/* ========================================================
          RIGHT HALF: FULL SCREEN VISUAL & INTERACTIVE SHOWCASE
      ======================================================== */}
      <div className="hidden lg:flex lg:w-1/2 min-h-screen relative overflow-hidden bg-[#0A0A0D]">
        
        {/* Full Screen Background Image */}
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=85"
          alt="Team collaboration"
          className="w-full h-full object-cover select-none"
        />

        {/* Gradient vignette for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40 pointer-events-none" />

        {/* 1. TOP FLOATING BADGE: "Task Review With Team · 09:30am-10:00am" */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute top-10 left-10 flex flex-col gap-2 z-20"
        >
          <div className="px-5 py-3 rounded-2xl bg-[#B8D5CF] text-[#1E1E24] shadow-xl shadow-black/40 flex items-center justify-between gap-6 font-semibold text-xs border border-amber-300">
            <div>
              <div className="font-bold text-sm">Task Review With Team</div>
              <div className="text-xs opacity-80 mt-0.5">09:30am-10:00am</div>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-black shrink-0" />
          </div>

          <div className="px-4 py-2 rounded-xl bg-black/80 backdrop-blur-md text-white text-xs font-mono shadow-md w-fit flex items-center gap-2 border border-white/15">
            <span>09:30am-10:00am</span>
            <span className="w-2 h-2 rounded-full bg-amber-400" />
          </div>
        </motion.div>

        {/* 2. FLOATING AVATAR CLUSTER (Right side) */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute top-36 right-12 flex flex-col items-center gap-1.5 z-20"
        >
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
              alt="Mentor 1"
              className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-xl"
            />
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
          </div>
          
          <div className="flex -space-x-2.5">
            <img
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80"
              alt="Mentor 2"
              className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
            />
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
              alt="Mentor 3"
              className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
            />
          </div>
        </motion.div>

        {/* 3. FROSTED GLASS CALENDAR STRIP */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="absolute bottom-32 left-10 right-10 z-20"
        >
          <div className="p-4 rounded-3xl bg-white/20 backdrop-blur-xl border border-white/30 text-white shadow-2xl overflow-hidden relative">
            <div className="grid grid-cols-7 gap-2 text-center font-mono">
              {[
                { day: 'Sun', date: '22' },
                { day: 'Mon', date: '23' },
                { day: 'Tue', date: '24' },
                { day: 'Wed', date: '25', active: true },
                { day: 'Thu', date: '26' },
                { day: 'Fri', date: '27' },
                { day: 'Sat', date: '28' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`py-2 px-1.5 rounded-2xl transition-all ${
                    item.active
                      ? 'bg-white text-black font-bold shadow-lg scale-105'
                      : 'hover:bg-white/10'
                  }`}
                >
                  <div className={`text-xs ${item.active ? 'text-slate-700' : 'text-slate-300'}`}>
                    {item.day}
                  </div>
                  <div className="text-sm font-bold mt-0.5">{item.date}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 4. BOTTOM FLOATING PILL */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-10 left-10 z-20 flex items-center gap-3 px-5 py-3 rounded-2xl bg-black/80 backdrop-blur-md border border-white/15 text-white shadow-2xl"
        >
          <div className="w-8 h-8 rounded-xl bg-amber-400 flex items-center justify-center text-black font-bold text-sm">
            ★
          </div>
          <div className="text-left">
            <div className="text-xs sm:text-sm font-bold">Placement readiness test ready</div>
            <div className="text-[11px] text-slate-300 font-mono">35 mock tests waiting</div>
          </div>
        </motion.div>

      </div>

    </div>
  );
}
