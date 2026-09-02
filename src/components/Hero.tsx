import { motion } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Building2,
  TrendingUp,
  Award,
  Users,
  Calendar
} from 'lucide-react';
import { useEnquiry } from '../context/EnquiryContext';

// Helper component for clean word animation
function ShatterWord({
  word,
  isGradient = false,
}: {
  word: string;
  startIndex: number;
  isGradient?: boolean;
  gradientStartIndex?: number;
  totalGradientLength?: number;
}) {
  return (
    <span
      className={`inline-block mr-[0.28em] last:mr-0 ${
        isGradient
          ? 'bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#60A5FA] bg-clip-text text-transparent drop-shadow-xs'
          : 'text-slate-900'
      }`}
    >
      {word}
    </span>
  );
}

export function Hero() {
  const { openEnquiry } = useEnquiry();

  return (
    <section className="relative pt-36 pb-16 lg:pt-40 lg:pb-24 overflow-hidden obsidian-grid bg-[#F8F9FB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Subheadline & Quick Links (7 cols) */}
          <div className="lg:col-span-7 flex flex-col text-left pt-1">
            
            {/* 01. Eyebrow Tag Badge */}
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/30 text-[#2563EB] text-xs font-semibold tracking-wide mb-5 w-max"
            >
              <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-ping" />
              <span>Grow360 — Decoding the corporate world</span>
            </motion.div>

            {/* 02. Shatter Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-[3.2rem] font-bold tracking-tight leading-[1.18] text-[#12151B] font-[family-name:var(--font-display)]">
              <span className="block whitespace-nowrap overflow-visible">
                <ShatterWord word="Turn" startIndex={0} />
                <ShatterWord word="Students" startIndex={5} />
                <ShatterWord word="into" startIndex={14} />
              </span>

              <span className="block overflow-visible mt-1">
                <ShatterWord word="Industry-Ready" startIndex={19} isGradient gradientStartIndex={19} totalGradientLength={27} />
                <ShatterWord word="Professionals" startIndex={34} isGradient gradientStartIndex={19} totalGradientLength={27} />
              </span>
            </h1>

            {/* 03. Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
              className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-xl"
            >
              We partner with colleges and universities to build industry-ready talent through practical training, projects, certifications, assessments, and end-to-end placement support — bridging the gap between education and hiring.
            </motion.p>

            {/* 04. Action CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => openEnquiry('CONSULTATION')}
                className="btn-pill-primary cursor-pointer flex items-center gap-2 px-7 py-3.5 text-sm font-bold shadow-md"
              >
                <Sparkles size={16} />
                <span>Request Institutional Demo</span>
                <ArrowRight size={16} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  window.location.hash = '#training-programs';
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                className="btn-pill-secondary cursor-pointer flex items-center gap-2 px-6 py-3.5 text-sm font-semibold"
              >
                <span>View Programs</span>
                <ArrowRight size={16} className="text-slate-500" />
              </motion.button>
            </motion.div>

            {/* 05. Trust bullet checks */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-9 pt-5 border-t border-black/5 flex flex-wrap items-center gap-5 text-xs text-slate-500 font-medium"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-[#2563EB]" />
                <span>Expert Mock Interviews</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-[#2563EB]" />
                <span>Industry Mentorship</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-[#2563EB]" />
                <span>Campus Hiring Drives</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Platform Impact Showcase Bento Card (5 cols - NO embedded form) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="lg:col-span-5 relative w-full"
          >
            {/* Ambient glow */}
            <div className="absolute -inset-1 rounded-3xl bg-[#2563EB]/15 blur-xl opacity-70 pointer-events-none" />

            <div className="relative rounded-3xl bg-white border border-black/8 p-7 sm:p-8 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.06)] space-y-6">
              
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-black/6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#2563EB] text-[11px] font-mono font-bold mb-2">
                    <Building2 size={13} />
                    <span>INSTITUTIONAL PARTNERSHIPS</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 font-[family-name:var(--font-display)]">
                    Elevate Your Campus Placements
                  </h3>
                </div>
              </div>

              {/* 3 Value Metric Points */}
              <div className="space-y-3.5 text-xs text-slate-700">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold shrink-0">
                    <TrendingUp size={16} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">3x Surge in Tier-1 Offers</h4>
                    <p className="text-[11.5px] text-slate-500 mt-0.5">
                      Company-specific drive preparation and live coding optimality diagnostics.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold shrink-0">
                    <Award size={16} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Batch Readiness Scorecard</h4>
                    <p className="text-[11.5px] text-slate-500 mt-0.5">
                      Multi-dimensional skill diagnostics for both Engineering and Non-Tech cohorts.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold shrink-0">
                    <Users size={16} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">100+ Hiring Partners Network</h4>
                    <p className="text-[11.5px] text-slate-500 mt-0.5">
                      Direct campus interview access with leading tech firms, fintech, and corporate recruiters.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={() => openEnquiry('CONSULTATION')}
                  className="w-full btn-pill-primary py-3.5 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Calendar size={15} />
                  <span>Book Discovery Consultation</span>
                  <ArrowRight size={14} />
                </button>
                <p className="text-[11px] text-slate-400 text-center mt-2.5 font-mono">
                  Customized college cohort syllabus &amp; zero timetable disruption
                </p>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
