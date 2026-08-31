import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { useEnquiry } from '../context/EnquiryContext';

export function FinalCTA() {
  const { openEnquiry } = useEnquiry();

  return (
    <section id="about" className="py-28 lg:py-36 bg-[#F8F9FB] relative overflow-hidden obsidian-grid border-t border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7A9D96]/10 border border-[#7A9D96]/25 text-[#7A9D96] text-xs font-semibold tracking-wide mb-6">
            <Sparkles size={14} className="text-[#7A9D96]" />
            <span>Institutional Transformation</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#12151B] tracking-tight leading-[1.1] font-[family-name:var(--font-display)]">
            Ready to Build{' '}
            <span className="text-[#7A9D96]">
              Placement-Ready
            </span>{' '}
            Campuses?
          </h2>

          <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto">
            Assess student competencies, deliver industry curriculum, track readiness in real time, and execute high-converting campus hiring drives.
          </p>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => openEnquiry('CONSULTATION')}
              className="btn-pill-primary cursor-pointer active:scale-95 text-sm py-3.5 px-8 shadow-md"
            >
              <Sparkles size={16} className="text-white" />
              <span>Request Institutional Demo</span>
              <ArrowRight size={16} />
            </button>
            <a
              href="#training-programs"
              className="btn-pill-secondary cursor-pointer text-sm py-3.5 px-8"
            >
              <span>Explore Programs</span>
              <ArrowRight size={16} className="text-slate-500" />
            </a>
          </div>

          {/* Trust Guarantees */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-y-2 gap-x-8 text-xs text-slate-500">
            {['Zero disruption to academic timetable', 'Dedicated TPO Success Director', 'Customized college cohort pricing'].map((t) => (
              <div key={t} className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#7A9D96]" />
                <span>{t}</span>
              </div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
}
