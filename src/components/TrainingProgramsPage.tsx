import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, GraduationCap, Code2, Award, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import { TrainingSolutionsSection } from './TrainingSolutionsSection';
import { ProgramsSection } from './ProgramsSection';
import { PlacementJourneySection } from './PlacementJourneySection';
import { Footer } from './Footer';
import { useEnquiry } from '../context/EnquiryContext';

interface TrainingProgramsPageProps {
  onBackToHome?: () => void;
}

export function TrainingProgramsPage({ onBackToHome }: TrainingProgramsPageProps) {
  const { openEnquiry } = useEnquiry();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  const handleBack = () => {
    if (onBackToHome) {
      onBackToHome();
    } else {
      window.location.hash = '';
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0D] text-slate-100 font-sans selection:bg-[#7A9D96] selection:text-white">
      
      {/* ── 01. Top Sticky Navigation Bar ── */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#0A0A0D]/90 backdrop-blur-xl border-b border-white/10 h-18 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between">
          
          {/* Left: Back + Brand Logo */}
          <div className="flex items-center gap-6">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer group"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              <span>Back to Home</span>
            </button>

            <div className="h-4 w-px bg-white/10 hidden sm:block" />

            <div 
              className="flex items-center gap-2.5 cursor-pointer"
              onClick={() => { window.location.hash = ''; }}
            >
              <img
                src="/grow360-logo.png"
                alt="Grow360 Logo"
                className="h-8 w-auto object-contain rounded-lg"
              />
              <span className="text-lg font-extrabold text-white font-[family-name:var(--font-display)]">
                GROW<span className="text-[#7A9D96]">360°</span>
                <span className="text-xs font-mono font-normal text-slate-400 ml-1.5 hidden md:inline">
                  Training &amp; Programs
                </span>
              </span>
            </div>
          </div>

          {/* Center: Quick Section Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {[
              { label: 'Delivery Models', id: 'training' },
              { label: 'Programs Catalog', id: 'programs' },
              { label: 'Placement Journey', id: 'placement-roadmap' },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-full transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => openEnquiry('CONSULTATION')}
              className="btn-pill-primary text-xs py-2 px-5 font-bold cursor-pointer flex items-center gap-2"
            >
              <Sparkles size={13} />
              <span>Enquire for Campus</span>
            </button>
          </div>

        </div>
      </header>

      {/* ── 02. Hero Banner ── */}
      <section className="pt-32 pb-16 lg:pt-36 lg:pb-20 relative overflow-hidden border-b border-white/5 bg-gradient-to-b from-[#0F0F16] via-[#0A0A0D] to-[#0A0A0D]">
        {/* Glow Spheres */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#7A9D96]/10 blur-[130px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7A9D96]/10 border border-[#7A9D96]/30 text-[#9CBDB7] text-xs font-mono font-bold mb-6"
          >
            <GraduationCap size={14} />
            <span>CAMPUS TRAINING &amp; INDUSTRY CURRICULUM</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight font-[family-name:var(--font-display)] max-w-4xl mx-auto leading-tight sm:leading-tight"
          >
            Industry-Mapped Training.{' '}
            <span className="bg-gradient-to-r from-[#7A9D96] via-[#9CBDB7] to-[#9CBDB7] bg-clip-text text-transparent">
              Built for Campus Success.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed"
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
              { label: 'Patterns & Drills', val: '700+', icon: Code2, color: '#9CBDB7' },
              { label: 'Highest Package', val: '₹44 LPA', icon: Sparkles, color: '#7A9D96' },
            ].map((metric, i) => {
              const Icon = metric.icon;
              return (
                <div key={i} className="p-4 rounded-2xl bg-[#111116] border border-white/10 text-left">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl sm:text-2xl font-extrabold text-white font-mono">{metric.val}</span>
                    <Icon size={16} style={{ color: metric.color }} />
                  </div>
                  <div className="text-xs text-slate-400 font-medium">{metric.label}</div>
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
      <section className="py-20 bg-gradient-to-b from-[#0A0A0D] to-[#111116] border-t border-white/10 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7A9D96]/10 border border-[#7A9D96]/30 text-[#9CBDB7] text-xs font-mono font-bold mb-4">
            <CheckCircle2 size={13} />
            <span>INSTITUTIONAL PARTNERSHIPS</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-[family-name:var(--font-display)] mb-4">
            Transform Your Campus Placement Record
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed">
            Schedule a discovery session with our academic directors to customize syllabus modules, delivery timelines, and live sandbox access for your student cohorts.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openEnquiry('PARTNERSHIP')}
              className="btn-pill-primary text-xs py-3.5 px-8 font-bold cursor-pointer shadow-lg shadow-[#7A9D96]/ flex items-center gap-2"
            >
              <span>Schedule Campus Consultation</span>
              <ArrowRight size={14} />
            </button>

            <button
              onClick={handleBack}
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
