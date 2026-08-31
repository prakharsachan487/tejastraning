import { motion } from 'framer-motion';
import { Rocket, GraduationCap, Check } from 'lucide-react';

export function TrainingSolutionsSection() {
  return (
    <section id="training" className="py-20 lg:py-28 bg-[#0A0A0D] relative border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7A9D96]/10 border border-[#7A9D96]/25 text-[#9CBDB7] text-xs font-semibold tracking-wide mb-4">
            <span>Flagship Delivery Models</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Industry Engineers.{' '}
            <span className="bg-gradient-to-r from-[#7A9D96] via-[#9CBDB7] to-[#9CBDB7] bg-clip-text text-transparent">
              On Your Campus.
            </span>
          </h2>
          <p className="mt-4 text-base text-slate-400">
            Simple, structured training formats tailored for institutional campus placements.
          </p>
        </motion.div>

        {/* 2 Clean & Impressive Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          
          {/* 01. Impact Training */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bento-card p-8 sm:p-10 flex flex-col justify-between hover:border-[#38BDF8]/40 transition-all duration-300"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Impact Training
                  </h3>
                  <div className="text-sm font-semibold text-[#38BDF8] mt-1.5">
                    Placement-Focused Intensive
                  </div>
                </div>
                <div className="w-11 h-11 rounded-2xl bg-[#0F1E36] border border-[#38BDF8]/20 flex items-center justify-center text-[#38BDF8] shrink-0">
                  <Rocket size={20} />
                </div>
              </div>

              {/* Bullet Points with Checkmarks */}
              <div className="space-y-4 mb-8 text-sm text-slate-300">
                <div className="flex items-center gap-3">
                  <Check size={16} className="text-[#38BDF8] shrink-0" />
                  <span><strong className="text-slate-200">Audience:</strong> Final-year batches</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check size={16} className="text-[#38BDF8] shrink-0" />
                  <span><strong className="text-slate-200">Duration:</strong> 40-60 Days</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check size={16} className="text-[#38BDF8] shrink-0" />
                  <span><strong className="text-slate-200">Focus:</strong> Company-specific drive prep</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check size={16} className="text-[#38BDF8] shrink-0" />
                  <span><strong className="text-slate-200">Coverage:</strong> All degrees and branches</span>
                </div>
              </div>

              {/* Short Paragraph Description */}
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-8">
                A high-intensity program built to lift selection rates in upcoming campus drives. Aptitude, coding, and interview readiness, delivered as one package.
              </p>
            </div>

            {/* Bottom Footer: Mapped Recruiters */}
            <div className="pt-6 border-t border-white/10">
              <div className="text-xs text-slate-400 font-medium mb-3">
                Mapped to recruiters like
              </div>
              <div className="flex items-center gap-3 text-xs font-semibold text-slate-300">
                <span className="px-2.5 py-1 rounded bg-[#161622] border border-white/5 text-[#005696] font-bold">
                  TCS
                </span>
                <span className="px-2.5 py-1 rounded bg-[#161622] border border-white/5 text-[#007CC3] font-bold">
                  Infosys
                </span>
                <span className="px-2.5 py-1 rounded bg-[#161622] border border-white/5 text-[#92278F] font-bold">
                  Wipro
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  + more
                </span>
              </div>
            </div>
          </motion.div>

          {/* 02. MARQUEE Training */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bento-card p-8 sm:p-10 flex flex-col justify-between hover:border-[#C084FC]/40 transition-all duration-300"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    MARQUEE Training
                  </h3>
                  <div className="text-sm font-semibold text-[#C084FC] mt-1.5">
                    Multi-year capability building
                  </div>
                </div>
                <div className="w-11 h-11 rounded-2xl bg-[#231436] border border-[#C084FC]/20 flex items-center justify-center text-[#C084FC] shrink-0">
                  <GraduationCap size={20} />
                </div>
              </div>

              {/* Bullet Points with Checkmarks */}
              <div className="space-y-4 mb-8 text-sm text-slate-300">
                <div className="flex items-center gap-3">
                  <Check size={16} className="text-[#C084FC] shrink-0" />
                  <span><strong className="text-slate-200">Audience:</strong> Years 1 through 4</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check size={16} className="text-[#C084FC] shrink-0" />
                  <span><strong className="text-slate-200">Duration:</strong> 6 to 36 Months</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check size={16} className="text-[#C084FC] shrink-0" />
                  <span><strong className="text-slate-200">Focus:</strong> Semester-wise skill building</span>
                </div>
              </div>

              {/* Short Paragraph Description */}
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-8">
                We operate as your technical training partner, embedded in the academic timetable to build foundations from year one.
              </p>
            </div>

            {/* Bottom Footer: Aligned Top Tier Tech Companies */}
            <div className="pt-6 border-t border-white/10">
              <div className="text-xs text-slate-400 font-medium mb-3">
                Aligned to hiring bars at
              </div>
              <div className="flex items-center gap-3">
                {/* Google Logo */}
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>

                {/* Microsoft Logo */}
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 21 21">
                  <rect x="1" y="1" width="9" height="9" fill="#F25022"/>
                  <rect x="11" y="1" width="9" height="9" fill="#7FBA00"/>
                  <rect x="1" y="11" width="9" height="9" fill="#00A4EF"/>
                  <rect x="11" y="11" width="9" height="9" fill="#FFB900"/>
                </svg>

                {/* Amazon Logo */}
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path fill="#FF9900" d="M13.9 14.4c-2.3 1.7-5.7 2.6-8.6 2.6-4.1 0-7.8-1.6-10.6-4.2-.2-.2 0-.5.3-.4 2.8 1.6 6.3 2.6 9.9 2.6 2.6 0 5.4-.6 8-1.8.4-.2.8.2.4.6z"/>
                  <path fill="#FF9900" d="M14.9 13.2c-.3-.4-1.9-.2-2.6 0-.2 0-.3-.2-.1-.3 1.1-.9 3-1 3.3-.6.4.4.1 2.3-.9 3.3-.2.1-.3.1-.4 0-.1-.2.2-1.8.7-2.4z"/>
                </svg>

                <span className="text-xs text-slate-400 font-medium ml-1">
                  + more
                </span>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
