import { motion } from 'framer-motion';
import { Sparkles, MapPin, Users, Calendar } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';

export function RollingGallerySection() {
  const { galleryItems } = useAdminData();
  const displayItems = galleryItems.length > 0 ? galleryItems : [];

  return (
    <section className="py-16 lg:py-20 bg-[#F1F4F9] border-b border-black/5 overflow-hidden relative">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[300px] bg-gradient-to-r from-[#2563EB]/5 via-[#3B82F6]/5 to-transparent blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/25 text-[#2563EB] text-xs font-semibold tracking-wide mb-3">
            <Sparkles size={14} className="text-[#2563EB]" />
            <span>Moments in Action</span>
          </div>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#12151B] font-[family-name:var(--font-display)] leading-tight">
            Mentoring Moments.{' '}
            <span className="text-[#2563EB]">Growing Together.</span>
          </h3>
        </motion.div>
      </div>

      {/* ── CONTINUOUS INFINITE ROLLING ACTIVITY GALLERY ── */}
      <div className="relative w-full overflow-hidden mask-fade-horizontal py-2">
        <div className="flex items-stretch gap-6 w-max animate-marquee hover:[animation-play-state:paused]">
          {[...displayItems, ...displayItems, ...displayItems].map((moment, index) => (
            <div
              key={`moment-${moment.title}-${index}`}
              className="w-[340px] sm:w-[380px] shrink-0 rounded-3xl bg-white border border-black/8 overflow-hidden shadow-[0_4px_20px_-2px_rgba(0,0,0,0.06)] hover:border-[#2563EB]/40 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between select-none group"
            >
              {/* Photo Showcase with Badges */}
              <div className="relative w-full h-52 sm:h-56 overflow-hidden bg-slate-100">
                <img
                  src={moment.image}
                  alt={moment.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  draggable={false}
                />
                
                {/* Gradient Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                {/* Top-Left Category Tag */}
                <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-black/10 text-[11px] font-bold text-slate-900 shadow-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: moment.categoryColor }} />
                  <span>{moment.category}</span>
                </div>

                {/* Top-Right Location Tag */}
                <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-medium text-white shadow-sm flex items-center gap-1">
                  <MapPin size={10} className="text-white" />
                  <span>{moment.location}</span>
                </div>

                {/* Bottom Stats Overlay inside Image */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px] font-medium">
                  <span className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
                    <Users size={11} className="text-[#38BDF8]" />
                    <span>{moment.stats}</span>
                  </span>
                  <span className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10 text-[10px] font-mono text-slate-300">
                    <Calendar size={10} />
                    <span>Active Cohort</span>
                  </span>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-5 text-left">
                <h4 className="text-base font-bold text-slate-900 tracking-tight leading-snug group-hover:text-[#2563EB] transition-colors mb-2">
                  {moment.title}
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed font-normal line-clamp-2">
                  {moment.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
