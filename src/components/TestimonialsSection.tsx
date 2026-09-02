import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Sparkles, Building, UserCheck, Briefcase, GraduationCap } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';

const CATEGORY_ICONS: Record<string, typeof Building> = {
  'College Leadership': Building,
  'Placed Students': UserCheck,
  'Campus Recruiters': Briefcase,
};

export function TestimonialsSection() {
  const { testimonials } = useAdminData();
  const [selectedCategory, setSelectedCategory] = useState<string>('College Leadership');

  // Filter active and sort
  const activeTestimonials = useMemo(() => {
    return testimonials
      .filter((t) => t.active !== false)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  }, [testimonials]);

  // Extract unique categories in order
  const categories = useMemo(() => {
    const list: string[] = [];
    activeTestimonials.forEach((t) => {
      if (!list.includes(t.category)) {
        list.push(t.category);
      }
    });
    return list.length > 0 ? list : ['College Leadership', 'Placed Students', 'Campus Recruiters'];
  }, [activeTestimonials]);

  const currentCategory = categories.includes(selectedCategory)
    ? selectedCategory
    : categories[0] || 'College Leadership';

  const categoryQuotes = useMemo(() => {
    return activeTestimonials.filter((t) => t.category === currentCategory);
  }, [activeTestimonials, currentCategory]);

  return (
    <section className="py-20 lg:py-28 bg-[#F8F9FB] relative obsidian-grid border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/25 text-[#2563EB] text-xs font-semibold tracking-wide mb-4">
            <Sparkles size={14} className="text-[#2563EB]" />
            <span>Institutional Testimonials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#12151B] leading-tight font-[family-name:var(--font-display)]">
            What Our{' '}
            <span className="text-[#2563EB]">
              Partners Say
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Real feedback from college deans, placed students, and corporate recruiters.
          </p>
        </motion.div>

        {/* Category Tabs */}
        {categories.length > 1 && (
          <div className="flex justify-center mb-12">
            <div className="flex items-center gap-2 p-1.5 rounded-full bg-slate-100/90 border border-black/5 shadow-inner backdrop-blur-md overflow-x-auto no-scrollbar max-w-full">
              {categories.map((cat) => {
                const Icon = CATEGORY_ICONS[cat] || GraduationCap;
                const isActive = currentCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-white text-[#2563EB] font-bold shadow-sm border border-black/5'
                        : 'text-slate-600 hover:text-black'
                    }`}
                  >
                    <Icon size={14} />
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Editorial Quote Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            {categoryQuotes.map((q, i) => (
              <motion.div
                key={q.id || q.author}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                className="bento-card p-8 sm:p-9 flex flex-col justify-between relative group hover:border-[#2563EB]/40 bg-white shadow-[0_4px_25px_-2px_rgba(0,0,0,0.04)] border border-black/8"
              >
                <div>
                  <Quote className="text-[#2563EB]/20 w-12 h-12 mb-4" />
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic mb-8 font-serif">
                    &ldquo;{q.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-5 border-t border-black/5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {q.avatar && (
                      <img
                        src={q.avatar}
                        alt={q.author}
                        className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                      />
                    )}
                    <div>
                      <div className="text-sm font-bold text-slate-900 font-[family-name:var(--font-display)]">
                        {q.author}
                      </div>
                      <div className="text-xs text-slate-500 font-mono">
                        {q.designation}
                      </div>
                      <div className="text-[11px] font-mono text-[#2563EB] mt-0.5 font-semibold">
                        {q.institution}
                      </div>
                    </div>
                  </div>

                  {q.stats && (
                    <span className="px-2.5 py-1 rounded-lg bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/20 text-[10px] font-mono font-bold shrink-0">
                      {q.stats}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {categoryQuotes.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-black/8 p-8 max-w-xl mx-auto">
            <Quote size={32} className="mx-auto text-slate-400 mb-2" />
            <h4 className="text-base font-bold text-slate-900">No testimonials in this category</h4>
            <p className="text-xs text-slate-500 mt-1">Add or activate testimonials in the Admin Panel.</p>
          </div>
        )}

      </div>
    </section>
  );
}
