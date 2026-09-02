import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ChevronLeft, ChevronRight, Building2 } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';

export function MentorsSection() {
  const { mentors } = useAdminData();
  const [currentPage, setCurrentPage] = useState(0);
  const mentorsPerPage = 4;

  const landingMentors = mentors
    .filter((m) => m.displayLocation === 'all' || m.displayLocation === 'landing' || !m.displayLocation)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const totalPages = Math.max(1, Math.ceil(landingMentors.length / mentorsPerPage));
  const visibleMentors = landingMentors.slice(currentPage * mentorsPerPage, (currentPage + 1) * mentorsPerPage);

  return (
    <section className="py-20 lg:py-28 bg-[#F8F9FB] relative border-b border-black/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/25 text-[#2563EB] text-xs font-semibold tracking-wide mb-4">
              <Sparkles size={14} className="text-[#2563EB]" />
              <span>Top Tier Engineering Faculty</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#12151B] font-[family-name:var(--font-display)] leading-tight">
              Meet Our{' '}
              <span className=" text-[#2563EB]">
                Industry Leaders
              </span>
            </h2>
            <p className="mt-4 text-base text-slate-600">
              Working engineers from global tech companies who mentor cohorts, conduct mock panels, and elevate student standards.
            </p>
          </motion.div>

          {/* Navigation Page Controls (Desktop/Tablet) */}
          {totalPages > 1 && (
            <div className="hidden sm:flex items-center gap-2.5 self-start sm:self-end">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                disabled={currentPage === 0}
                className="w-10 h-10 rounded-full bg-white shadow-sm border border-black/8 flex items-center justify-center text-slate-900 hover:border-[#2563EB]/50 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                aria-label="Previous Mentors"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="text-xs text-slate-600 font-medium px-2">
                {currentPage + 1} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
                disabled={currentPage === totalPages - 1}
                className="w-10 h-10 rounded-full bg-white shadow-sm border border-black/8 flex items-center justify-center text-slate-900 hover:border-[#2563EB]/50 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                aria-label="Next Mentors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>

        {/* Top Connecting Node Wire / Hierarchy Circuit (Desktop Only) */}
        <div className="hidden lg:block relative w-full mb-2">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
          <div className="grid grid-cols-4 w-full">
            {visibleMentors.map((m) => (
              <div key={`wire-${m.name}`} className="flex flex-col items-center">
                <div className="w-2.5 h-2.5 -mt-1.5 rounded-full bg-slate-400 border-2 border-white" />
                <div className="w-px h-6 bg-slate-300" />
              </div>
            ))}
          </div>
        </div>

        {/* ── MOBILE VIEW (< sm): Smooth Horizontal Swipe Scroll with All Mentors ── */}
        <div className="sm:hidden -mx-4 px-4 overflow-x-auto snap-x snap-mandatory flex gap-4 pb-4 scrollbar-none touch-pan-x">
          {landingMentors.map((mentor) => (
            <div
              key={`mobile-${mentor.id || mentor.name}`}
              className="w-[82vw] max-w-[300px] shrink-0 snap-center bento-card overflow-hidden flex flex-col justify-between bg-white border border-black/8 rounded-2xl shadow-sm"
            >
              <div>
                {/* Full Color Portrait Photo */}
                <div className="relative w-full h-64 overflow-hidden bg-slate-100">
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                  
                  {/* Subtle Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/20" />

                  {/* Top-Left Company Logo Badge */}
                  <div className="absolute top-3.5 left-3.5 w-9 h-9 rounded-full bg-white/95 backdrop-blur-md border border-black/10 flex items-center justify-center shadow-md">
                    <Building2 size={16} style={{ color: mentor.companyColor || '#2563EB' }} />
                  </div>
                </div>

                {/* Mentor Content */}
                <div className="p-5">
                  <h3 className="text-base font-bold text-slate-900 tracking-tight leading-tight">
                    {mentor.name}
                  </h3>

                  <div className="flex items-center gap-1.5 mt-1.5 mb-1">
                    <span className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
                      <Building2 size={13} style={{ color: mentor.companyColor || '#2563EB' }} />
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      {mentor.company}
                    </span>
                  </div>

                  <p className="text-[11px] font-medium text-slate-600 leading-tight mb-3">
                    {mentor.role}
                  </p>

                  <p className="text-xs text-slate-700 leading-relaxed font-normal">
                    {mentor.quote}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Swipe Navigation Hint */}
        <div className="sm:hidden flex items-center justify-center gap-2 mt-2 text-[11px] font-mono font-medium text-slate-400">
          <span>← Swipe to explore all mentors →</span>
        </div>

        {/* ── DESKTOP / TABLET VIEW (>= sm): Paginated 4-Grid Hanging Cards ── */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {visibleMentors.map((mentor) => (
            <motion.div
              key={mentor.id || mentor.name}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, rotate: 0, transition: { duration: 0.25 } }}
              style={{ rotate: mentor.tilt }}
              transition={{ duration: 0.5 }}
              className="bento-card overflow-hidden flex flex-col justify-between group hover:border-[#2563EB]/50 bg-white border border-black/8 rounded-2xl transition-all duration-300 shadow-sm"
            >
              <div>
                {/* Full Color Portrait Photo with Top Left Company Badge */}
                <div className="relative w-full h-64 sm:h-72 overflow-hidden bg-slate-100">
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80';
                    }}
                  />
                  
                  {/* Subtle Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/25" />

                  {/* Top-Left Company Logo Badge */}
                  <div className="absolute top-3.5 left-3.5 w-9 h-9 rounded-full bg-white/95 backdrop-blur-md border border-black/10 flex items-center justify-center shadow-md">
                    <Building2 size={16} style={{ color: mentor.companyColor || '#2563EB' }} />
                  </div>
                </div>

                {/* Mentor Content */}
                <div className="p-5 sm:p-6">
                  {/* Name */}
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight leading-tight">
                    {mentor.name}
                  </h3>

                  {/* Company & Role */}
                  <div className="flex items-center gap-1.5 mt-2 mb-1">
                    <span className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
                      <Building2 size={13} style={{ color: mentor.companyColor || '#2563EB' }} />
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      {mentor.company}
                    </span>
                  </div>

                  <p className="text-[11px] font-medium text-slate-600 leading-tight mb-4">
                    {mentor.role}
                  </p>

                  {/* Direct Quote / Bio */}
                  <p className="text-xs text-slate-700 leading-relaxed font-normal">
                    {mentor.quote}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Callout to Become a Mentor */}
        <div className="mt-14 text-center">
          <div className="inline-flex items-center gap-3 p-2 pr-5 rounded-full bg-white shadow-sm border border-black/8 text-xs text-slate-700">
            <span className="px-3 py-1 rounded-full bg-[#2563EB]/15 text-[#2563EB] font-bold font-mono">
              Join Our Network
            </span>
            <span>Are you an engineering leader or senior developer?</span>
            <button
              onClick={() => {
                window.location.hash = '#mentor';
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
              className="text-[#2563EB] font-bold hover:text-slate-900 transition-colors cursor-pointer flex items-center gap-1 ml-1"
            >
              <span>Become a Mentor</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
