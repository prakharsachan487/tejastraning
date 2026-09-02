import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight, KeyRound, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

interface AdminLoginProps {
  onBackToHome?: () => void;
}

export function AdminLogin({ onBackToHome }: AdminLoginProps) {
  const { loginAsAdmin } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setErrorMsg('Please enter your administrator email and password.');
      return;
    }

    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      const res = loginAsAdmin(email, password);
      setIsLoading(false);
      if (!res.success) {
        setErrorMsg(res.error || 'Authentication failed. Invalid credentials.');
      } else {
        // Successful login
        window.location.hash = '#admin';
      }
    }, 500);
  };

  const handleQuickDemoFill = () => {
    setEmail('admin@grow360.in');
    setPassword('Admin@Grow360#2026');
    setErrorMsg('');
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col justify-between relative overflow-hidden font-sans selection:bg-[#2563EB] selection:text-white">
      {/* Background Decorative Gradients & Mesh */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />
      </div>

      {/* Top Header with Back link */}
      <header className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">
            G
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-sm tracking-tight text-white font-[family-name:var(--font-display)]">
              Grow360
            </span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-blue-400">
              Admin Portal
            </span>
          </div>
        </div>

        {onBackToHome && (
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 px-3.5 py-1.5 rounded-full transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Back to Public Site</span>
          </button>
        )}
      </header>

      {/* Main Center Card */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 my-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md bg-slate-900/90 border border-slate-800/80 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl shadow-black/80"
        >
          {/* Security Badge */}
          <div className="flex items-center justify-between mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[11px] font-mono font-semibold">
              <ShieldCheck size={13} className="text-blue-400" />
              <span>Secure Executive Access</span>
            </div>

            <span className="text-[10px] font-mono text-slate-500 uppercase">
              v3.2 Secure
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-[family-name:var(--font-display)] mb-2">
            Administrator Login
          </h1>
          <p className="text-xs text-slate-400 leading-relaxed mb-6">
            Enter authorized master credentials to access the Grow360 portal management console.
          </p>

          {/* Quick Demo Pill Helper */}
          <div className="mb-6 p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <KeyRound size={15} className="text-amber-400 shrink-0" />
              <span className="text-[11px]">Demo Admin: <strong>admin@grow360.in</strong></span>
            </div>
            <button
              type="button"
              onClick={handleQuickDemoFill}
              className="text-[10px] font-mono uppercase font-bold text-blue-400 hover:text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
            >
              Auto Fill
            </button>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-start gap-2"
            >
              <AlertCircle size={15} className="shrink-0 mt-0.5 text-red-400" />
              <span>{errorMsg}</span>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck={false} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Admin Email / Username
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  autoComplete="new-password"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email / username"
                  className="w-full bg-slate-950/70 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-white placeholder-slate-600 outline-hidden transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  Master Password
                </label>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full bg-slate-950/70 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl py-2.5 pl-10 pr-10 text-xs sm:text-sm text-white placeholder-slate-600 outline-hidden transition-colors font-mono"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-slate-400 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-800 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                />
                <span>Keep session active</span>
              </label>

              <span className="text-slate-500 text-[11px]">
                256-bit Encrypted
              </span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          {/* Footer Note */}
          <div className="mt-6 pt-5 border-t border-slate-800/80 text-center">
            <p className="text-[11px] text-slate-500">
              Grow360 Internal Administrative Console. Unauthorized access attempts are monitored and logged.
            </p>
          </div>
        </motion.div>
      </main>

      {/* Page Bottom Copyright */}
      <footer className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-6 text-center text-xs text-slate-600">
        &copy; {new Date().getFullYear()} Grow360 Higher-Ed Placement Infrastructure. Master Control Suite.
      </footer>
    </div>
  );
}
