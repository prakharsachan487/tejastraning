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
      }, 700);
    }, 600);
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
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#07070A] text-slate-100 flex flex-col justify-between p-4 sm:p-6 lg:p-10 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-br from-[#FF4500]/15 via-[#FFA000]/10 to-transparent blur-[160px] pointer-events-none rounded-full" />

      {/* Top Header / Back Navigation */}
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between z-10 mb-6">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.location.hash = '';
          }}
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-300 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl border border-white/10"
        >
          <ArrowLeft size={15} />
          <span>Back to Home</span>
        </a>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>TEJAS Placement Portal</span>
        </div>
      </div>

      {/* Main 2-Column Auth Card Container (Exact Beautiful Design) */}
      <div className="max-w-5xl w-full mx-auto my-auto z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', damping: 26, stiffness: 300 }}
          className="relative w-full rounded-[2.5rem] bg-[#EAE5D9] text-[#1E1E24] shadow-2xl shadow-black/80 overflow-hidden grid grid-cols-1 lg:grid-cols-12 border border-white/20"
        >
          {/* ========================================================
              LEFT COLUMN: AUTH FORM
          ======================================================== */}
          <div className="lg:col-span-6 p-7 sm:p-10 lg:p-12 flex flex-col justify-between relative bg-gradient-to-b from-[#F7F4EC] via-[#EFEBE0] to-[#E5DFCFC0]">
            
            {/* Top Header & Brand Pill */}
            <div>
              <div className="flex items-center justify-between mb-8">
                {/* Brand Pill Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1E1E24]/20 bg-white/60 shadow-xs">
                  <div className="w-2 h-2 rounded-full bg-[#FF4500]" />
                  <span className="text-xs font-bold text-[#1E1E24] tracking-tight">TEJAS</span>
                </div>
              </div>

              {/* Form Title & Subtitle */}
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1F] tracking-tight font-[family-name:var(--font-display)]">
                  {isSignUp ? 'Create an account' : 'Welcome back'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1.5 font-normal">
                  {isSignUp
                    ? 'Sign up and get 30 day free trial & placement prep'
                    : 'Log in to access your mock sessions and placement portal'}
                </p>
              </div>

              {/* Success Animation Notification */}
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-600 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {isSignUp ? 'Account Created Successfully!' : 'Welcome Back!'}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Redirecting to your personalized portal...
                  </p>
                </motion.div>
              ) : (
                /* Input Form */
                <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
                  {/* Full Name Field (Sign Up Only) */}
                  {isSignUp && (
                    <div>
                      <label className="block text-[11px] font-medium text-slate-600 mb-1.5 ml-3.5">
                        Full name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Amélie Laurent"
                          className="w-full px-5 py-3.5 rounded-full bg-white/90 border border-black/10 text-xs sm:text-sm text-[#1E1E24] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FFB800] focus:border-transparent shadow-xs transition-all"
                        />
                      </div>
                    </div>
                  )}

                  {/* Email Field */}
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1.5 ml-3.5">
                      Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="amelielaurent7622@gmail.com"
                        className="w-full px-5 py-3.5 rounded-full bg-white/90 border border-black/10 text-xs sm:text-sm text-[#1E1E24] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FFB800] focus:border-transparent shadow-xs transition-all"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <div className="flex items-center justify-between ml-3.5 mb-1.5">
                      <label className="block text-[11px] font-medium text-slate-600">
                        Password
                      </label>
                      {!isSignUp && (
                        <button
                          type="button"
                          onClick={() => alert('Password reset link sent to your registered email!')}
                          className="text-[11px] text-[#FF4500] hover:underline font-medium cursor-pointer"
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
                        className="w-full pl-5 pr-12 py-3.5 rounded-full bg-white/90 border border-black/10 text-xs sm:text-sm text-[#1E1E24] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FFB800] focus:border-transparent shadow-xs transition-all"
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

                  {/* Primary Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#FFCC4D] via-[#FFB800] to-[#FFA000] hover:from-[#FFD566] hover:to-[#FFB014] text-[#1E1E24] font-bold text-xs sm:text-sm shadow-md shadow-amber-500/20 active:scale-[0.99] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <span className="inline-block w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                      ) : (
                        <span>Submit</span>
                      )}
                    </button>
                  </div>

                  {/* Social Login Button (Google) */}
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => handleSocialLogin()}
                      className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-full bg-white/80 hover:bg-white border border-black/10 text-xs font-semibold text-[#1E1E24] shadow-xs hover:shadow transition-all cursor-pointer"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
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
            </div>

            {/* Bottom Footer Row */}
            <div className="pt-8 mt-6 border-t border-black/10 flex flex-wrap items-center justify-between text-[11px] text-slate-600">
              <div>
                {isSignUp ? (
                  <span>
                    Have an account?{' '}
                    <button
                      onClick={() => setTab('login')}
                      className="font-bold text-[#1E1E24] hover:underline cursor-pointer"
                    >
                      Sign in
                    </button>
                  </span>
                ) : (
                  <span>
                    Don't have an account?{' '}
                    <button
                      onClick={() => setTab('signup')}
                      className="font-bold text-[#1E1E24] hover:underline cursor-pointer"
                    >
                      Sign up
                    </button>
                  </span>
                )}
              </div>

              <a
                href="#terms"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.hash = '#terms';
                }}
                className="hover:underline text-slate-500 hover:text-black cursor-pointer"
              >
                Terms & Conditions
              </a>
            </div>

          </div>

          {/* ========================================================
              RIGHT COLUMN: VISUAL HERO & FLOATING SCHEDULING WIDGETS
          ======================================================== */}
          <div className="hidden lg:block lg:col-span-6 relative p-4 bg-[#EAE5D9]">
            
            {/* Inner Rounded Image Card */}
            <div className="relative w-full h-full min-h-[580px] rounded-[2rem] overflow-hidden shadow-inner border border-black/10">
              {/* Background Image */}
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                alt="Team collaboration"
                className="w-full h-full object-cover"
              />

              {/* Gradient vignette for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30 pointer-events-none" />

              {/* 1. TOP FLOATING BADGE */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="absolute top-6 left-6 flex flex-col gap-1.5 z-20"
              >
                {/* Yellow Meeting Tag */}
                <div className="px-4 py-2.5 rounded-2xl bg-[#FFCC4D] text-[#1E1E24] shadow-lg shadow-black/20 flex items-center justify-between gap-4 font-semibold text-xs border border-amber-300">
                  <div>
                    <div className="font-bold">Task Review With Team</div>
                    <div className="text-[10px] opacity-80">09:30am-10:00am</div>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-black shrink-0" />
                </div>

                {/* Dark Tag sub-card */}
                <div className="px-3.5 py-1.5 rounded-xl bg-black/70 backdrop-blur-md text-white text-[10px] font-mono shadow-md w-fit flex items-center gap-2 border border-white/10">
                  <span>09:30am-10:00am</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                </div>
              </motion.div>

              {/* 2. FLOATING AVATAR CLUSTER */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute top-28 right-10 flex flex-col items-center gap-1 z-20"
              >
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                    alt="Mentor 1"
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-lg"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
                </div>
                
                <div className="flex -space-x-2">
                  <img
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80"
                    alt="Mentor 2"
                    className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-md"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80"
                    alt="Mentor 3"
                    className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-md"
                  />
                </div>
              </motion.div>

              {/* 3. FROSTED GLASS CALENDAR STRIP */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="absolute bottom-28 left-6 right-6 z-20"
              >
                <div className="p-3.5 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 text-white shadow-2xl overflow-hidden relative">
                  <div className="grid grid-cols-7 gap-1 text-center font-mono">
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
                        className={`py-1.5 px-1 rounded-xl transition-all ${
                          item.active
                            ? 'bg-white text-black font-bold shadow-md scale-105'
                            : 'hover:bg-white/10'
                        }`}
                      >
                        <div className={`text-[10px] ${item.active ? 'text-slate-700' : 'text-slate-300'}`}>
                          {item.day}
                        </div>
                        <div className="text-xs font-bold">{item.date}</div>
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
                className="absolute bottom-8 left-8 z-20 flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-black/75 backdrop-blur-md border border-white/15 text-white shadow-xl"
              >
                <div className="w-7 h-7 rounded-xl bg-amber-400 flex items-center justify-center text-black font-bold text-xs">
                  ★
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold">Placement readiness test ready</div>
                  <div className="text-[10px] text-slate-300 font-mono">35 mock tests waiting</div>
                </div>
              </motion.div>

            </div>
          </div>

        </motion.div>
      </div>

      {/* Footer copyright */}
      <div className="text-center text-xs text-slate-500 font-mono z-10 mt-6">
        © {new Date().getFullYear()} TEJAS. All rights reserved.
      </div>
    </div>
  );
}
