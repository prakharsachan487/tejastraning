import { motion } from 'framer-motion';
import {
  Sparkles,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Phone
} from 'lucide-react';
import { PlacementJourneySection } from './PlacementJourneySection';
import { useEnquiry } from '../context/EnquiryContext';

interface RoadmapPageProps {
  onBackToHome: () => void;
}

export function RoadmapPage({ onBackToHome }: RoadmapPageProps) {
  const { openEnquiry } = useEnquiry();

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-[#0F172A] font-sans selection:bg-[#2563EB] selection:text-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── 01. Breadcrumb / Back Navigation ── */}
        <div className="mb-6 sm:mb-8 flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#2563EB] transition-colors bg-white px-3.5 py-2 rounded-full border border-black/8 shadow-2xs cursor-pointer group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-mono font-bold">
            <Sparkles size={13} />
            <span>CAMPUS-TO-CORPORATE METHODOLOGY</span>
          </div>
        </div>

        {/* ── 02. Hero Banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-white border border-black/8 p-8 sm:p-12 shadow-sm mb-12 relative overflow-hidden text-center sm:text-left"
        >
          {/* Subtle Background Glow */}
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

          <div className="max-w-3xl relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/25 text-[#2563EB] text-xs font-bold font-mono">
              <span>END-TO-END PLACEMENT ARCHITECTURE</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-[family-name:var(--font-display)] leading-tight">
              The 7-Stage Placement <span className="text-[#2563EB]">Journey Roadmap</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              A comprehensive step-by-step diagnostic framework designed by senior engineers from Meta, Google, Deloitte, and Accenture. From foundational DSA to live cloud microservices, mock panel drives, and institutional campus hiring.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4">
              <button
                onClick={() => openEnquiry('PARTNERSHIP')}
                className="btn-pill-primary px-6 py-3 text-xs font-bold flex items-center gap-2 shadow-md cursor-pointer"
              >
                <span>Book Institutional Walkthrough</span>
                <ArrowRight size={14} />
              </button>

              <button
                onClick={() => openEnquiry('CONSULTATION')}
                className="btn-pill-secondary px-6 py-3 text-xs font-bold flex items-center gap-2 cursor-pointer bg-slate-50 border border-slate-200"
              >
                <Phone size={14} className="text-[#2563EB]" />
                <span>Request Student Diagnostic Sprint</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center sm:text-left">
            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-slate-900 font-[family-name:var(--font-display)]">300+ Hrs</div>
              <div className="text-xs text-slate-500 font-mono mt-0.5">Industry Curriculum</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-slate-900 font-[family-name:var(--font-display)]">700+ Problems</div>
              <div className="text-xs text-slate-500 font-mono mt-0.5">Automated Assessments</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-slate-900 font-[family-name:var(--font-display)]">1:1 Mentors</div>
              <div className="text-xs text-slate-500 font-mono mt-0.5">Meta &amp; Tier-1 Leaders</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-slate-900 font-[family-name:var(--font-display)]">90%+ Rate</div>
              <div className="text-xs text-slate-500 font-mono mt-0.5">Placement Conversion</div>
            </div>
          </div>
        </motion.div>

        {/* ── 03. The 7-Stage Roadmap Component ── */}
        <div className="bg-white rounded-3xl border border-black/8 shadow-sm overflow-hidden mb-12">
          <PlacementJourneySection />
        </div>

        {/* ── 04. Institutional Consultation CTA Banner ── */}
        <section className="py-16 bg-[#F1F4F9] rounded-3xl border border-black/8 relative overflow-hidden text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/30 text-[#2563EB] text-xs font-mono font-bold">
              <CheckCircle2 size={13} />
              <span>COLLEGE &amp; UNIVERSITY ONBOARDING</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-[family-name:var(--font-display)]">
              Integrate the 7-Stage Roadmap in Your Campus
            </h2>

            <p className="text-xs sm:text-sm text-slate-700 max-w-xl mx-auto leading-relaxed">
              Schedule a discovery session with our academic directors to customize syllabus modules, delivery timelines, and live sandbox access for your student cohorts.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => openEnquiry('PARTNERSHIP')}
                className="btn-pill-primary text-xs py-3.5 px-8 font-bold cursor-pointer shadow-lg flex items-center gap-2"
              >
                <span>Schedule Campus Consultation</span>
                <ArrowRight size={14} />
              </button>

              <button
                onClick={onBackToHome}
                className="btn-pill-secondary text-xs py-3.5 px-6 font-bold cursor-pointer bg-white border border-slate-300"
              >
                <span>Explore All Programs</span>
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
