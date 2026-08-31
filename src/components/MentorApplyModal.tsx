import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, CheckCircle2, Send, Briefcase, Mail, User, Clock, Award } from 'lucide-react';

interface MentorApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MentorApplyModal({ isOpen, onClose }: MentorApplyModalProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [domain, setDomain] = useState('DSA & Algorithms');
  const [availability, setAvailability] = useState('2-3 hrs / weekend');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 700);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFullName('');
    setEmail('');
    setLinkedin('');
    setCompany('');
    setRole('');
    onClose();
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
            onClick={handleReset}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-xl rounded-3xl bg-white border border-white/15 p-6 sm:p-8 shadow-2xl shadow-black z-10 text-slate-100 overflow-hidden"
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#2563EB]/10 blur-[100px] pointer-events-none rounded-full" />

            {/* Close Button */}
            <button
              onClick={handleReset}
              className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            {submitted ? (
              <div className="text-center py-10 px-4">
                <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-6 shadow-lg shadow-emerald-500/20">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-2xl font-extrabold text-white mb-2 font-[family-name:var(--font-display)]">
                  Application Received!
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto mb-8 leading-relaxed">
                  Thank you for applying to the Grow360 Mentor Guild, <span className="text-white font-semibold">{fullName || 'Engineer'}</span>. Our developer relations team will review your LinkedIn and reach out within 24 hours.
                </p>
                <button
                  onClick={handleReset}
                  className="btn-pill-primary py-3 px-8 text-xs font-bold cursor-pointer"
                >
                  <span>Done</span>
                </button>
              </div>
            ) : (
              <div>
                {/* Modal Header */}
                <div className="mb-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00B4D8]/10 border border-[#00B4D8]/30 text-[#00B4D8] text-xs font-mono font-semibold mb-3">
                    <Sparkles size={13} className="text-[#00B4D8]" />
                    <span>Grow360 Mentor Network</span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-white tracking-tight font-[family-name:var(--font-display)]">
                    Apply as an Industry Mentor
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1.5">
                    Conduct flexible mock interviews, guide college cohorts, and earn attractive honorariums.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                        <User size={13} className="text-[#3B82F6]" />
                        <span>Full Name *</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0A0A0E] border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#2563EB] transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                        <Mail size={13} className="text-[#3B82F6]" />
                        <span>Work / Personal Email *</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="rahul@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0A0A0E] border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#2563EB] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Company */}
                    <div>
                      <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                        <Briefcase size={13} className="text-[#3B82F6]" />
                        <span>Current Organization *</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g. Google, Microsoft, Startup"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0A0A0E] border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#2563EB] transition-colors"
                      />
                    </div>

                    {/* Role */}
                    <div>
                      <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                        <Award size={13} className="text-[#3B82F6]" />
                        <span>Designation / Role *</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="e.g. SDE II, Senior Engineer"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0A0A0E] border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#2563EB] transition-colors"
                      />
                    </div>
                  </div>

                  {/* LinkedIn */}
                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 fill-[#0077B5]" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.65 1.65 0 0 0-1.66 1.66 1.66 1.66 0 0 0 1.66 1.66 1.66 1.66 0 0 0 1.66-1.66c0-.92-.74-1.66-1.66-1.66Z" />
                      </svg>
                      <span>LinkedIn Profile URL *</span>
                    </label>
                    <input
                      type="url"
                      required
                      value={linkedin}
                      onChange={(e) => setLinkedin(e.target.value)}
                      placeholder="https://linkedin.com/in/yourprofile"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0A0A0E] border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#2563EB] transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Domain */}
                    <div>
                      <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
                        Primary Expertise Area
                      </label>
                      <select
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0A0A0E] border border-white/15 text-xs text-white focus:outline-none focus:border-[#2563EB] transition-colors cursor-pointer"
                      >
                        <option value="DSA & Algorithms">DSA & Algorithms</option>
                        <option value="System Design & Backend">System Design & Backend</option>
                        <option value="Full Stack (MERN/Next.js)">Full Stack (MERN/Next.js)</option>
                        <option value="Generative AI & LLMs">Generative AI & LLMs</option>
                        <option value="DevOps & Cloud Systems">DevOps & Cloud Systems</option>
                        <option value="Engineering Management & HR">Engineering Management & HR</option>
                      </select>
                    </div>

                    {/* Availability */}
                    <div>
                      <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                        <Clock size={13} className="text-[#3B82F6]" />
                        <span>Weekly Availability</span>
                      </label>
                      <select
                        value={availability}
                        onChange={(e) => setAvailability(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0A0A0E] border border-white/15 text-xs text-white focus:outline-none focus:border-[#2563EB] transition-colors cursor-pointer"
                      >
                        <option value="1-2 hrs / weekend">1-2 hrs / weekend</option>
                        <option value="2-4 hrs / weekend">2-4 hrs / weekend</option>
                        <option value="5+ hrs / flexible">5+ hrs / flexible</option>
                        <option value="Monthly Masterclasses only">Monthly Masterclasses only</option>
                      </select>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-pill-primary w-full justify-center py-3.5 text-xs sm:text-sm font-bold cursor-pointer disabled:opacity-50"
                    >
                      <span>{loading ? 'Submitting Application...' : 'Submit Mentor Application'}</span>
                      <Send size={14} />
                    </button>
                    <p className="text-[11px] text-slate-500 text-center font-mono mt-2.5">
                      🔒 No spam. We respect your working hours and privacy.
                    </p>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
