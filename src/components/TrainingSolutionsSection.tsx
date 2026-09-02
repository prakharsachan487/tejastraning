import { motion } from 'framer-motion';
import { Rocket, GraduationCap, Check } from 'lucide-react';

export function TrainingSolutionsSection() {
  return (
    <section id="training" className="pt-2 pb-6 sm:pb-8 bg-[#F8F9FB] relative border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 2 Clean & Impressive Cards (Impact Training & Semester-Integrated) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          
          {/* 01. Impact Training */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bento-card p-8 sm:p-10 flex flex-col justify-between hover:border-[#38BDF8]/40 transition-all duration-300 bg-white rounded-3xl border border-black/8 shadow-sm"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-[family-name:var(--font-display)]">
                    Impact Training
                  </h3>
                  <div className="text-sm font-semibold text-[#2563EB] mt-1.5">
                    Placement-Focused Intensive
                  </div>
                </div>
                <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#2563EB] shrink-0">
                  <Rocket size={20} />
                </div>
              </div>

              {/* Bullet Points with Checkmarks */}
              <div className="space-y-4 mb-8 text-sm text-slate-700">
                <div className="flex items-center gap-3">
                  <Check size={16} className="text-[#2563EB] shrink-0" />
                  <span><strong className="text-slate-900">Audience:</strong> Final-year batches</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check size={16} className="text-[#2563EB] shrink-0" />
                  <span><strong className="text-slate-900">Duration:</strong> 40-60 Days</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check size={16} className="text-[#2563EB] shrink-0" />
                  <span><strong className="text-slate-900">Focus:</strong> Company-specific drive prep</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check size={16} className="text-[#2563EB] shrink-0" />
                  <span><strong className="text-slate-900">Coverage:</strong> All degrees and branches</span>
                </div>
              </div>

              {/* Short Paragraph Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-8">
                A high-intensity program built to lift selection rates in upcoming campus drives. Aptitude, coding, and interview readiness, delivered as one package.
              </p>
            </div>

            {/* Bottom Footer: Mapped Recruiters */}
            <div className="pt-6 border-t border-black/8">
              <div className="text-xs text-slate-500 font-medium mb-3">
                Mapped to recruiters like
              </div>
              <div className="flex items-center gap-3 text-xs font-semibold text-slate-700">
                <span className="px-2.5 py-1 rounded bg-slate-50 border border-black/5 text-[#005696] font-bold">
                  TCS
                </span>
                <span className="px-2.5 py-1 rounded bg-slate-50 border border-black/5 text-[#007CC3] font-bold">
                  Infosys
                </span>
                <span className="px-2.5 py-1 rounded bg-slate-50 border border-black/5 text-[#92278F] font-bold">
                  Wipro
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  + more
                </span>
              </div>
            </div>
          </motion.div>

          {/* 02. Semester-Integrated Training */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bento-card p-8 sm:p-10 flex flex-col justify-between hover:border-[#38BDF8]/40 transition-all duration-300 bg-white rounded-3xl border border-black/8 shadow-sm"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-[family-name:var(--font-display)]">
                    Semester-Integrated
                  </h3>
                  <div className="text-sm font-semibold text-[#2563EB] mt-1.5">
                    Continuous Capability Building
                  </div>
                </div>
                <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#2563EB] shrink-0">
                  <GraduationCap size={20} />
                </div>
              </div>

              {/* Bullet Points with Checkmarks */}
              <div className="space-y-4 mb-8 text-sm text-slate-700">
                <div className="flex items-center gap-3">
                  <Check size={16} className="text-[#2563EB] shrink-0" />
                  <span><strong className="text-slate-900">Audience:</strong> 2nd and 3rd year students</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check size={16} className="text-[#2563EB] shrink-0" />
                  <span><strong className="text-slate-900">Duration:</strong> Full academic year</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check size={16} className="text-[#2563EB] shrink-0" />
                  <span><strong className="text-slate-900">Focus:</strong> Industry technologies &amp; engineering depth</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check size={16} className="text-[#2563EB] shrink-0" />
                  <span><strong className="text-slate-900">Integration:</strong> Built into university timetable</span>
                </div>
              </div>

              {/* Short Paragraph Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-8">
                Long-term skill development woven directly into your academic calendar. From fundamental data structures to hands-on projects, readying students before placement season starts.
              </p>
            </div>

            {/* Bottom Footer: Target Profiles */}
            <div className="pt-6 border-t border-black/8">
              <div className="text-xs text-slate-500 font-medium mb-3">
                Prepares students for
              </div>
              <div className="flex items-center gap-3 text-xs font-semibold text-slate-700">
                <span className="px-2.5 py-1 rounded bg-slate-50 border border-black/5 text-[#2563EB] font-bold">
                  SDE-1 Roles
                </span>
                <span className="px-2.5 py-1 rounded bg-slate-50 border border-black/5 text-[#2563EB] font-bold">
                  Tier-1 Hiring
                </span>
                <span className="px-2.5 py-1 rounded bg-slate-50 border border-black/5 text-[#2563EB] font-bold">
                  Product Companies
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
