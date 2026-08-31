import { motion } from 'framer-motion';
import { Sparkles, Star, CheckCircle2 } from 'lucide-react';

interface GalleryCard {
  name: string;
  company: string;
  companyColor: string;
  role: string;
  domain: string;
  rating: string;
  sessions: string;
  image: string;
  badge: string;
}

const galleryMentorsRow1: GalleryCard[] = [
  {
    name: 'Nidhi Singh',
    company: 'Accenture',
    companyColor: '#A100FF',
    role: 'Lead Analyst – FP&A',
    domain: 'Finance & Analytics',
    rating: '4.98',
    sessions: '85+ Mock Rounds',
    image: '/mentors/nidhi_singh.jpg',
    badge: 'FP&A & Power BI',
  },
  {
    name: 'Vishal Motlani',
    company: 'J&J MedTech',
    companyColor: '#D51900',
    role: "SIBM P'27 · Ex-Deloitte",
    domain: 'Strategy & Advisory',
    rating: '4.95',
    sessions: '60+ Mock Rounds',
    image: '/mentors/vishal_motlani.jpg',
    badge: 'J&J Imagivator 2025',
  },
  {
    name: 'Nandwana Abhishek',
    company: 'Meta',
    companyColor: '#0668E1',
    role: 'Software Engineer',
    domain: 'Systems & Scalability',
    rating: '4.99',
    sessions: '95+ Mock Rounds',
    image: '/mentors/nandwana_abhishek.jpg',
    badge: 'London, UK Panel',
  },
  {
    name: 'Ashish Sachan',
    company: 'Product Leadership',
    companyColor: '#2563EB',
    role: 'Product & Program Lead',
    domain: 'AI & Web Platforms',
    rating: '4.96',
    sessions: '110+ Mock Rounds',
    image: '/mentors/ashish_sachan.jpg',
    badge: '10+ Yrs Tech Lead',
  },
  {
    name: 'Mohit Khandelwal',
    company: 'ZS',
    companyColor: '#005A9C',
    role: 'Analytics Consultant',
    domain: 'Commercial Analytics',
    rating: '4.97',
    sessions: '75+ Mock Rounds',
    image: '/mentors/mohit_khandelwal.png',
    badge: 'Pharma & BI Lead',
  },
  {
    name: 'Sakshi Havelia',
    company: 'Koridge Capital',
    companyColor: '#D97706',
    role: 'Founder Advisory',
    domain: 'Equity & Fundraising',
    rating: '4.98',
    sessions: '90+ Mock Rounds',
    image: '/mentors/sakshi_havelia.png',
    badge: 'M&A & Pre-IPO',
  },
  {
    name: 'Gagandeep Singh',
    company: 'VALUETE',
    companyColor: '#10B981',
    role: 'Founder & Full-Stack Lead',
    domain: 'Scalable Engineering',
    rating: '4.94',
    sessions: '70+ Mock Rounds',
    image: '/mentors/gagandeep_singh.jpg',
    badge: 'Cloud & Next.js',
  },
  {
    name: 'Siddhartha Kumar',
    company: 'Brainstack',
    companyColor: '#8B5CF6',
    role: 'Senior Full-Stack Engineer',
    domain: 'Agentic AI & RAG',
    rating: '4.96',
    sessions: '80+ Mock Rounds',
    image: '/mentors/siddhartha_kumar.jpg',
    badge: 'AI & Full Stack',
  },
];

export function RollingGallerySection() {
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
            <span>Campus Mentorship In Action</span>
          </div>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#12151B] font-[family-name:var(--font-display)] leading-tight">
            Mentoring Moments.{' '}
            <span className="text-[#2563EB]">Growing Together.</span>
          </h3>
        </motion.div>
      </div>

      {/* ── CONTINUOUS INFINITE ROLLING GALLERY ROW ── */}
      <div className="relative w-full overflow-hidden mask-fade-horizontal py-2">
        <div className="flex items-stretch gap-5 w-max animate-marquee hover:[animation-play-state:paused]">
          {[...galleryMentorsRow1, ...galleryMentorsRow1, ...galleryMentorsRow1].map((item, index) => (
            <div
              key={`gallery-${item.name}-${index}`}
              className="w-[290px] sm:w-[310px] shrink-0 rounded-3xl bg-white border border-black/8 p-4 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] hover:border-[#2563EB]/40 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between select-none group"
            >
              {/* Top Row: Photo + Badges */}
              <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-slate-100 mb-3.5">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  draggable={false}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

                {/* Company Tag (Top-Left) */}
                <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-black/10 text-[10px] font-bold text-slate-900 shadow-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.companyColor }} />
                  <span>{item.company}</span>
                </div>

                {/* Rating Badge (Top-Right) */}
                <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md text-[10px] font-bold text-amber-300 shadow-sm flex items-center gap-1">
                  <Star size={10} className="fill-amber-300 text-amber-300" />
                  <span>{item.rating}</span>
                </div>

                {/* Floating Speciality Pill (Bottom-Left) */}
                <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-semibold text-white">
                  {item.badge}
                </div>
              </div>

              {/* Bottom Details */}
              <div className="text-left">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-slate-900 tracking-tight group-hover:text-[#2563EB] transition-colors">
                    {item.name}
                  </h4>
                  <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    Verified
                  </span>
                </div>

                <p className="text-xs font-semibold text-slate-700 mt-1">
                  {item.role}
                </p>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-black/5 text-[11px] text-slate-500 font-medium">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 size={13} className="text-[#2563EB]" />
                    <span>{item.domain}</span>
                  </span>
                  <span className="font-mono text-slate-600 font-semibold">{item.sessions}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
