import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, CheckCircle2, ArrowRight } from 'lucide-react';
import { TrainingSolutionsSection } from './TrainingSolutionsSection';
import { ProgramsSection } from './ProgramsSection';
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
      <section className="pt-28 pb-4 sm:pt-32 sm:pb-6 relative overflow-hidden bg-[#F8F9FB]">
        {/* Glow Spheres */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#2563EB]/10 blur-[130px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/30 text-[#3B82F6] text-xs font-mono font-bold mb-6"
          >
            <GraduationCap size={14} />
            <span>CAMPUS TRAINING &amp; INDUSTRY CURRICULUM</span>
          </motion.div>

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

        </div>
      </section>

      {/* ── 03. Section 1: Impact & Semester Training Delivery Models ── */}
      <div id="training">
        <TrainingSolutionsSection />
      </div>

      {/* ── 04. Section 2: Interactive Industry-Ready Programs ── */}
      <div id="programs">
        <ProgramsSection />
      </div>

      {/* ── 05. Institutional Consultation CTA Banner ── */}
      <section className="py-20 bg-[#F1F4F9] border-t border-black/8 relative overflow-hidden">
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
              className="btn-pill-primary text-xs py-3.5 px-8 font-bold cursor-pointer shadow-lg flex items-center gap-2"
            >
              <span>Schedule Campus Consultation</span>
              <ArrowRight size={14} />
            </button>

            <button
              onClick={() => { window.location.hash = ''; }}
              className="btn-pill-secondary text-xs py-3.5 px-6 font-bold cursor-pointer bg-white border border-slate-300"
            >
              <span>Return to Home</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
