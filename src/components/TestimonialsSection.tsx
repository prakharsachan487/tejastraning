import { useState } from 'react';
import { motion } from 'framer-motion';
import { Quote, Sparkles, Building, UserCheck, Briefcase } from 'lucide-react';

const testimonials = [
  {
    category: 'College Leadership',
    icon: Building,
    quotes: [
      {
        quote: 'Grow360 transformed our campus placements. We saw a 3x surge in product company offers within two consecutive semesters. The AI assessment diagnostics gave our placement cell clarity on exact student readiness.',
        author: 'Dr. Ramesh Kumar',
        designation: 'Training & Placement Officer',
        institution: 'SRM Institute of Science & Technology',
        stats: '3x Surge in Tier-1 Offers',
      },
      {
        quote: 'The batch readiness dashboard gave us live visibility we never had before. For the first time, our faculty could pinpoint which students needed intervention well before campus recruitment season started.',
        author: 'Prof. Sunita Patel',
        designation: 'Dean of Academic Affairs',
        institution: 'VIT University',
        stats: '89.4% Batch Conversion Rate',
      },
    ],
  },
  {
    category: 'Placed Students',
    icon: UserCheck,
    quotes: [
      {
        quote: 'The AI mock interview simulations were a game-changer. I practiced over 40 technical rounds with real-time speech and code optimality diagnostics. When my Google interview happened, I felt totally prepared.',
        author: 'Aditya Rajan',
        designation: 'Software Development Engineer',
        institution: 'Placed at Google • 2025 Batch',
        stats: 'Offer Package: ₹28 LPA',
      },
      {
        quote: 'I used to struggle with algorithmic system design questions. Grow360 mentors walked us through real microservice architectures. That directly helped me crack my dream company in just 60 days.',
        author: 'Kavitha Menon',
        designation: 'Backend Cloud Engineer',
        institution: 'Placed at Adobe • 2025 Batch',
        stats: 'Offer Package: ₹18.5 LPA',
      },
    ],
  },
  {
    category: 'Campus Recruiters',
    icon: Briefcase,
    quotes: [
      {
        quote: 'Candidates coming through Grow360 partner colleges are noticeably superior. Their system design fundamentals and live coding poise save our engineering interviewers dozens of wasted panel hours.',
        author: 'Sanjay Gupta',
        designation: 'Head of University Talent Acquisition',
        institution: 'Leading Global FinTech',
        stats: '60% Faster Drive Execution',
      },
      {
        quote: 'The standardized readiness scorecard provided by Grow360 is the only metric we trust for pre-filtering campus talent before setting foot on university grounds.',
        author: 'Megha Srinivasan',
        designation: 'Director of Early Talent Hiring',
        institution: 'Top Enterprise SaaS Cloud',
        stats: '95% Interview-to-Offer Ratio',
      },
    ],
  },
];

export function TestimonialsSection() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section className="py-20 lg:py-28 bg-[#0A0A0D] relative obsidian-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF4500]/10 border border-[#FF4500]/25 text-[#FFA000] text-xs font-semibold tracking-wide mb-4">
            <Sparkles size={14} className="text-[#FF4500]" />
            <span>Institutional Testimonials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight font-[family-name:var(--font-display)]">
            What Our{' '}
            <span className="bg-gradient-to-r from-[#FF4500] via-[#FF7A00] to-[#FFA000] bg-clip-text text-transparent">
              Partners Say
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            Real feedback from college deans, placed students, and corporate recruiters.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-2 p-1.5 rounded-full bg-[#14141C] border border-white/10 backdrop-blur-md">
            {testimonials.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeCategory === index;
              return (
                <button
                  key={item.category}
                  onClick={() => setActiveCategory(index)}
                  className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#FF4500] to-[#FF7A00] text-white font-bold shadow-md shadow-orange-500/25'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Icon size={14} />
                  <span>{item.category}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Editorial Quote Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials[activeCategory].quotes.map((q, i) => (
            <motion.div
              key={q.author}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.1 }}
              className="bento-card p-8 sm:p-9 flex flex-col justify-between relative group hover:border-[#FF4500]/40"
            >
              <div>
                <Quote className="text-[#FF4500]/25 w-12 h-12 mb-4" />
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed italic mb-8">
                  "{q.quote}"
                </p>
              </div>

              <div className="pt-5 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white font-[family-name:var(--font-display)]">
                    {q.author}
                  </div>
                  <div className="text-xs text-slate-400 font-mono">
                    {q.designation}
                  </div>
                  <div className="text-[11px] font-mono text-[#FFA000] mt-0.5">
                    {q.institution}
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-lg bg-[#FF4500]/15 text-[#FFA000] border border-[#FF4500]/30 text-[10px] font-mono font-bold">
                  {q.stats}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
