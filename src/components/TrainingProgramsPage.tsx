import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, GraduationCap, Code2, Award, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import { TrainingSolutionsSection } from './TrainingSolutionsSection';
import { ProgramsSection } from './ProgramsSection';
import { PlacementJourneySection } from './PlacementJourneySection';
import { Footer } from './Footer';
import { useEnquiry } from '../context/EnquiryContext';

interface TrainingProgramsPageProps {
  onBackToHome?: () => void;
}

export function TrainingProgramsPage({ onBackToHome: _ }: TrainingProgramsPageProps) {
  const { openEnquiry } = useEnquiry();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-slate-100 font-sans selection:bg-[#2563EB] selection:text-slate-900">
      {/* ── 02. Hero Banner ── */}
      <section className="pt-32 pb-16 lg:pt-36 lg:pb-20 relative overflow-hidden border-b border-black/5 bg-gradient-to-b from-[#0F0F16] via-[#0A0A0D] to-[#0A0A0D]">
        {/* Glow Spheres */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#2563EB]/10 blur-[130px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/30 text-[#3B82F6] text-xs font-mono font-bold mb-6"
          >
            <GraduationCap size={14} />
            <span>CAMPUS TRAINING &amp; INDUSTRY CURRICULUM</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight font-[family-name:var(--font-display)] max-w-4xl mx-auto leading-tight sm:leading-tight"
          >
            Industry-Mapped Training.{' '}
            <span className="bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#3B82F6] bg-clip-text text-transparent">
              Built for Campus Success.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-sm sm:text-lg text-slate-700 max-w-2xl mx-auto leading-relaxed"
          >
            Explore our comprehensive delivery models and specialized technology tracks designed to elevate student hiring outcomes in top product &amp; consulting companies.
          </motion.p>

          {/* Quick Metrics Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            {[
              { label: 'Partner Campuses', val: '50+', icon: Users, color: '#38BDF8' },
              { label: 'Placement Rate', val: '92%', icon: Award, color: '#22C55E' },
              { label: 'Patterns & Drills', val: '700+', icon: Code2, color: '#3B82F6' },
              { label: 'Highest Package', val: '₹44 LPA', icon: Sparkles, color: '#2563EB' },
            ].map((metric, i) => {
              const Icon = metric.icon;
              return (
                <div key={i} className="p-4 rounded-2xl bg-white shadow-sm border border-black/8 text-left">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl sm:text-2xl font-extrabold text-slate-900 font-mono">{metric.val}</span>
                    <Icon size={16} style={{ color: metric.color }} />
                  </div>
                  <div className="text-xs text-slate-600 font-medium">{metric.label}</div>
                </div>
              );
            })}
          </motion.div>

        </div>
      </section>

      {/* ── 03. Section 1: Flagship Training Delivery Solutions ── */}
      <div id="training">
        <TrainingSolutionsSection />
      </div>

      {/* ── 04. Section 2: Interactive Industry-Ready Programs ── */}
      <div id="programs">
        <ProgramsSection />
      </div>

      {/* ── 05. Section 3: The 7-Stage Placement Journey Roadmap ── */}
      <div id="placement-roadmap">
        <PlacementJourneySection />
      </div>

      {/* ── 06. Institutional Consultation CTA Banner ── */}
      <section className="py-20 bg-gradient-to-b from-[#0A0A0D] to-[#111116] border-t border-black/8 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/30 text-[#3B82F6] text-xs font-mono font-bold mb-4">
            <CheckCircle2 size={13} />
            <span>INSTITUTIONAL PARTNERSHIPS</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-[family-name:var(--font-display)] mb-4">
            Transform Your Campus Placement Record
          </h2>

          <p className="text-xs sm:text-sm text-slate-700 max-w-xl mx-auto mb-8 leading-relaxed">
            Schedule a discovery session with our academic directors to customize syllabus modules, delivery timelines, and live sandbox access for your student cohorts.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openEnquiry('PARTNERSHIP')}
              className="btn-pill-primary text-xs py-3.5 px-8 font-bold cursor-pointer shadow-lg shadow-[#2563EB]/ flex items-center gap-2"
            >
              <span>Schedule Campus Consultation</span>
              <ArrowRight size={14} />
            </button>

            <button
              onClick={() => { window.location.hash = ''; }}
              className="btn-pill-secondary text-xs py-3.5 px-6 font-bold cursor-pointer"
            >
              <span>Return to Home</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── 07. Footer ── */}
      <Footer />

    </div>
  );
}
