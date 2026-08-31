import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Eye,
  EyeOff,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function AuthModal() {
  const { isAuthOpen, authMode, closeAuth, setAuthMode, login } = useAuth();

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
      }, 700);
    }, 600);
  };

  const handleSocialLogin = (provider: 'Google' | 'Apple') => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      login({
        name: `${provider} User`,
        email: `user@${provider.toLowerCase()}.com`,
        role: 'Student',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      });
    }, 600);
  };

  const isSignUp = authMode === 'signup';

  return (
    <AnimatePresence>
      {isAuthOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAuth}
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ type: 'spring', damping: 26, stiffness: 300 }}
            className="relative w-full max-w-5xl rounded-[2.5rem] bg-[#EAE5D9] text-[#1E1E24] shadow-2xl shadow-black/80 overflow-hidden z-10 grid grid-cols-1 lg:grid-cols-12 border border-white/20"
          >
            {/* Top Close Button (Desktop & Mobile) */}
            <button
              onClick={closeAuth}
              className="absolute top-5 right-5 z-30 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-slate-700 hover:text-black flex items-center justify-center shadow-md transition-all cursor-pointer hover:scale-105"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

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
                          <a href="#forgot" className="text-[11px] text-[#FF4500] hover:underline font-medium">
                            Forgot?
                          </a>
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
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-black transition-colors"
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>

                    {/* Primary Submit Button (Golden Amber Pill matching reference image) */}
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
                        onClick={() => handleSocialLogin('Google')}
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
                      Have any account?{' '}
                      <button
                        onClick={() => setAuthMode('login')}
                        className="font-bold text-[#1E1E24] hover:underline cursor-pointer"
                      >
                        Sign in
                      </button>
                    </span>
                  ) : (
                    <span>
                      Don't have an account?{' '}
                      <button
                        onClick={() => setAuthMode('signup')}
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
                    alert('TEJAS Placement & Mentorship Terms of Service.');
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

                {/* 1. TOP FLOATING BADGE: "Task Review With Team · 09:30am-10:00am" */}
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

                {/* 2. FLOATING AVATAR CLUSTER (Right side of the image) */}
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

                {/* 3. FROSTED GLASS CALENDAR STRIP (Bottom-Middle overlay) */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="absolute bottom-28 left-6 right-6 z-20"
                >
                  <div className="p-3.5 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 text-white shadow-2xl overflow-hidden relative">
                    
                    {/* Diagonal glass texture stripes */}
                    <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]" />

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
                          <div className="text-xs font-bold mt-0.5">{item.date}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* 4. BOTTOM FLOATING CARD: "Daily Meeting · 12:00pm-01:00pm" */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute bottom-6 left-6 z-20"
                >
                  <div className="px-4 py-3 rounded-2xl bg-white text-[#1E1E24] shadow-xl border border-white/80 max-w-[220px]">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div>
                        <div className="text-xs font-bold">Daily Meeting</div>
                        <div className="text-[10px] text-slate-500 font-mono">12:00pm-01:00pm</div>
                      </div>
                      <span className="w-2 h-2 rounded-full bg-[#FFB800] shrink-0" />
                    </div>

                    {/* Participant Avatar Stack */}
                    <div className="flex items-center -space-x-1.5 pt-1">
                      {[
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
                        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
                        'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80',
                        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
                      ].map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt="Participant"
                          className="w-6 h-6 rounded-full object-cover border-2 border-white shadow-xs"
                        />
                      ))}
                      <div className="w-6 h-6 rounded-full bg-slate-100 border-2 border-white text-[9px] font-bold text-slate-600 flex items-center justify-center">
                        +5
                      </div>
                    </div>
                  </div>
                </motion.div>

              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
