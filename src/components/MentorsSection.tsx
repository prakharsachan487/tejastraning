import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

const mentors = [
  {
    name: 'Nidhi Singh',
    company: 'Accenture',
    companyColor: '#A100FF',
    companyLogo: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#A100FF">
        <path d="M0 18.291l9.646-3.708L0 10.875v7.416zm0-9.708l15.417-5.917L0 0v8.583zm0 15.417l24-9.25L0 15.458V24z"/>
      </svg>
    ),
    role: 'Lead Analyst – FP&A · Accenture',
    quote: 'Power BI dashboards, financial modelling, budgeting & forecasting, SOX controls, and corporate FP&A with a focus on data-driven insights.',
    image: '/mentors/nidhi_singh.jpg',
    tilt: '-0.8deg',
  },
  {
    name: 'Vishal Motlani',
    company: 'J&J MedTech',
    companyColor: '#D51900',
    companyLogo: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#D51900">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-4-4 1.41-1.41L11 14.17l6.59-6.59L19 9l-8 8z"/>
      </svg>
    ),
    role: "SIBM P'27 · Ex-Deloitte USI · Ex-Urban Company",
    quote: 'National Winner of J&J Imagivators 2025 and CISI Level 1 certified with deep experience in business strategy, financial advisory, and risk consulting.',
    image: '/mentors/vishal_motlani.jpg',
    tilt: '0.6deg',
  },
  {
    name: 'Nandwana Abhishek',
    company: 'Meta',
    companyColor: '#0668E1',
    companyLogo: (
      <svg className="w-4 h-4" viewBox="0 0 24 24">
        <path fill="#0668E1" d="M12 7.234C10.088 4.195 7.643 2.5 4.954 2.5 2.22 2.5 0 4.743 0 7.502c0 3.702 3.037 6.947 7.027 10.963l4.973 4.985 4.973-4.985c3.99-4.016 7.027-7.261 7.027-10.963 0-2.759-2.22-5.002-4.954-5.002-2.689 0-5.134 1.695-7.046 4.734z"/>
      </svg>
    ),
    role: 'Software Engineer · Meta (London, UK)',
    quote: 'Software Engineer at Meta working on scalable software systems and production-grade engineering solutions based in London.',
    image: '/mentors/nandwana_abhishek.jpg',
    tilt: '-1.2deg',
  },
  {
    name: 'Ashish Sachan',
    company: 'Product Leadership',
    companyColor: '#2563EB',
    companyLogo: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#2563EB">
        <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l-8-4v6l8 4 8-4v-6l-8 4zm0 6l-8-4v6l8 4 8-4v-6l-8 4z"/>
      </svg>
    ),
    role: 'Product & Program Management · 10+ Yrs Exp',
    quote: '10+ years of experience across web technologies, AI systems, project execution, and cross-functional leadership for high-impact tech products.',
    image: '/mentors/ashish_sachan.jpg',
    tilt: '0.9deg',
  },
  {
    name: 'Mohit Khandelwal',
    company: 'ZS',
    companyColor: '#005A9C',
    companyLogo: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#005A9C">
        <rect width="24" height="24" rx="4"/>
        <text x="12" y="17" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold">ZS</text>
      </svg>
    ),
    role: 'Analytics Consultant · Commercial Analytics',
    quote: 'Analytics Consultant specialized in commercial analytics, incentive compensation modeling, Power BI, SQL, and US pharma healthcare analytics.',
    image: '/mentors/mohit_khandelwal.png',
    tilt: '-0.6deg',
  },
  {
    name: 'Sakshi Havelia',
    company: 'Koridge Capital',
    companyColor: '#D97706',
    companyLogo: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#D97706">
        <path d="M12 2L2 19h20L12 2zm0 4l6 11H6l6-11z"/>
      </svg>
    ),
    role: 'Founder Advisory · Equity & Debt Fundraising',
    quote: 'Helping ambitious founders prepare and raise capital with confidence across equity & debt fundraising, M&A advisory, and Pre-IPO stages.',
    image: '/mentors/sakshi_havelia.png',
    tilt: '0.8deg',
  },
  {
    name: 'Gagandeep Singh',
    company: 'VALUETE',
    companyColor: '#10B981',
    companyLogo: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#10B981">
        <path d="M12 2L1 21h22L12 2zm0 3.84L19.46 19H4.54L12 5.84z"/>
      </svg>
    ),
    role: 'Founder & Full-Stack Developer · VALUETE',
    quote: 'Founder and Full-Stack Developer turning ideas into scalable technology architectures, robust cloud backends, and high-velocity builds.',
    image: '/mentors/gagandeep_singh.jpg',
    tilt: '-1.0deg',
  },
  {
    name: 'Siddhartha Kumar',
    company: 'Brainstack',
    companyColor: '#8B5CF6',
    companyLogo: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#8B5CF6">
        <circle cx="12" cy="12" r="10"/>
        <path d="M8 12h8M12 8v8" stroke="#FFFFFF" strokeWidth="2"/>
      </svg>
    ),
    role: 'Senior Full-Stack Engineer · Agentic AI & RAG',
    quote: 'Senior Full-Stack Engineer building intelligent web platforms with deep expertise in React, Node.js, MongoDB, Agentic AI, and RAG architectures.',
    image: '/mentors/siddhartha_kumar.jpg',
    tilt: '0.7deg',
  },
];

export function MentorsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -360 : 360;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-[#F8F9FB] relative border-b border-black/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-14 gap-6">
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
              <span className="text-[#2563EB]">
                Industry Leaders
              </span>
            </h2>
            <p className="mt-4 text-base text-slate-600">
              Working engineers and leaders from global companies who mentor cohorts, conduct mock panels, and elevate student standards.
            </p>
          </motion.div>

          {/* Navigation Controls (Left / Right Buttons) */}
          <div className="flex items-center gap-3 self-start sm:self-end">
            <button
              onClick={() => scroll('left')}
              className="w-11 h-11 rounded-full bg-white shadow-sm border border-black/10 flex items-center justify-center text-slate-800 hover:text-[#2563EB] hover:border-[#2563EB]/50 hover:shadow-md transition-all cursor-pointer"
              aria-label="Scroll Mentors Left"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-11 h-11 rounded-full bg-white shadow-sm border border-black/10 flex items-center justify-center text-slate-800 hover:text-[#2563EB] hover:border-[#2563EB]/50 hover:shadow-md transition-all cursor-pointer"
              aria-label="Scroll Mentors Right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

      </div>

      {/* ── CONTINUOUS HORIZONTAL ROLLING GALLERY (MARQUEE & MANUAL SCROLL) ── */}
      <div 
        ref={scrollContainerRef}
        className="w-full overflow-x-auto scrollbar-none py-4 px-4 sm:px-8 touch-pan-x"
      >
        <div className="flex items-stretch gap-6 w-max animate-marquee hover:[animation-play-state:paused]">
          {[...mentors, ...mentors, ...mentors].map((mentor, index) => (
            <div
              key={`mentor-${mentor.name}-${index}`}
              className="w-[280px] sm:w-[320px] shrink-0 bento-card overflow-hidden flex flex-col justify-between group hover:border-[#2563EB]/50 bg-white border border-black/8 rounded-3xl transition-all duration-300 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.06)] hover:shadow-xl hover:-translate-y-2 select-none"
            >
              <div>
                {/* Full Color Portrait Photo with Top-Left Company Badge */}
                <div className="relative w-full h-64 sm:h-72 overflow-hidden bg-slate-100">
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    draggable={false}
                  />
                  
                  {/* Subtle Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/20" />

                  {/* Top-Left Company Logo Badge */}
                  <div className="absolute top-3.5 left-3.5 w-10 h-10 rounded-full bg-white/95 backdrop-blur-md border border-black/10 flex items-center justify-center shadow-md">
                    {mentor.companyLogo}
                  </div>
                </div>

                {/* Mentor Content */}
                <div className="p-5 sm:p-6 text-left">
                  {/* Name */}
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight leading-tight">
                    {mentor.name}
                  </h3>

                  {/* Company & Role */}
                  <div className="flex items-center gap-1.5 mt-2 mb-1">
                    <span className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
                      {mentor.companyLogo}
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      {mentor.company}
                    </span>
                  </div>

                  <p className="text-[11px] font-semibold text-slate-600 leading-tight mb-3">
                    {mentor.role}
                  </p>

                  {/* Direct Quote / Bio */}
                  <p className="text-xs text-slate-700 leading-relaxed font-normal line-clamp-3">
                    {mentor.quote}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile / Desktop Bottom Callout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 text-center">
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
    </section>
  );
}
