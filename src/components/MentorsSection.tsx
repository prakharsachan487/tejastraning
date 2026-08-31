import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

const mentors = [
  {
    name: 'Ritik Ramuka',
    company: 'DocuSign',
    companyColor: '#4C6EF5',
    companyLogo: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-2h2v2zm0-4h-2V7h2v5.5z"/>
      </svg>
    ),
    role: 'Software Engineer II at DocuSign · Ex-Microsoft',
    quote: 'From FAANG-style system design to production Java stacks, I help campuses raise the depth recruiters probe for in final rounds.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    tilt: '-0.8deg',
  },
  {
    name: 'Apoorv Kumar',
    company: 'Google',
    companyColor: '#4285F4',
    companyLogo: (
      <svg className="w-4 h-4" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
      </svg>
    ),
    role: 'Software Engineer at Google · Codeforces GM',
    quote: 'Competitive programming is not memorizing patterns. I coach batches to think under pressure and convert ratings into interview offers.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    tilt: '0.6deg',
  },
  {
    name: 'Karan Singh',
    company: 'Adobe',
    companyColor: '#FF0000',
    companyLogo: (
      <svg className="w-4 h-4" viewBox="0 0 24 24">
        <path fill="#FF0000" d="M13.966 22h10.034V2h-10.034l5.017 12.338zm-13.966 0h10.034V2H0l5.017 12.338zm7.531-7.469h4.938L12 3.656z"/>
      </svg>
    ),
    role: 'MTS II at Adobe',
    quote: 'Modern frontend is craft and speed. I mentor cohorts through TypeScript, React, and product UI work that holds up in hiring loops.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    tilt: '-1.2deg',
  },
  {
    name: 'Bhavya Pandey',
    company: 'Leena AI',
    companyColor: '#38BDF8',
    companyLogo: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#38BDF8">
        <circle cx="12" cy="12" r="10"/>
      </svg>
    ),
    role: 'Backend Engineer at Leena AI · Ex-Schlumberger',
    quote: 'Backend interviews reward clarity. I take batches from FastAPI fundamentals to scalable service design used in real hiring loops.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    tilt: '1.0deg',
  },
  {
    name: 'Sneha Reddy',
    company: 'Microsoft',
    companyColor: '#00A4EF',
    companyLogo: (
      <svg className="w-4 h-4" viewBox="0 0 21 21">
        <rect x="1" y="1" width="9" height="9" fill="#F25022"/>
        <rect x="11" y="1" width="9" height="9" fill="#7FBA00"/>
        <rect x="1" y="11" width="9" height="9" fill="#00A4EF"/>
        <rect x="11" y="11" width="9" height="9" fill="#FFB900"/>
      </svg>
    ),
    role: 'Tech Lead — AI/ML at Microsoft · Ex-Goldman Sachs',
    quote: 'Generative AI and statistical modeling require rigorous real-world architectures, not shallow toy tutorials.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    tilt: '-0.6deg',
  },
  {
    name: 'Rahul Verma',
    company: 'Amazon',
    companyColor: '#FF9900',
    companyLogo: (
      <svg className="w-4 h-4" viewBox="0 0 24 24">
        <path fill="#FF9900" d="M13.9 14.4c-2.3 1.7-5.7 2.6-8.6 2.6-4.1 0-7.8-1.6-10.6-4.2-.2-.2 0-.5.3-.4 2.8 1.6 6.3 2.6 9.9 2.6 2.6 0 5.4-.6 8-1.8.4-.2.8.2.4.6z"/>
      </svg>
    ),
    role: 'Principal SDE at Amazon · Ex-Microsoft',
    quote: 'We drill high-concurrency distributed caching, sharding, and resilience strategies demanded in Tier-1 product panels.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
    tilt: '0.8deg',
  },
  {
    name: 'Ananya Das',
    company: 'Meta',
    companyColor: '#0668E1',
    companyLogo: (
      <svg className="w-4 h-4" viewBox="0 0 24 24">
        <path fill="#0668E1" d="M12 7.234C10.088 4.195 7.643 2.5 4.954 2.5 2.22 2.5 0 4.743 0 7.502c0 3.702 3.037 6.947 7.027 10.963l4.973 4.985 4.973-4.985c3.99-4.016 7.027-7.261 7.027-10.963 0-2.759-2.22-5.002-4.954-5.002-2.689 0-5.134 1.695-7.046 4.734z"/>
      </svg>
    ),
    role: 'Staff ML Researcher at Meta · Ex-Adobe Research',
    quote: 'Teaching students how to fine-tune open weights, build RAG pipelines, and measure model hallucinations with precision.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    tilt: '-1.0deg',
  },
  {
    name: 'Deepa Nair',
    company: 'Netflix',
    companyColor: '#E50914',
    companyLogo: (
      <svg className="w-4 h-4" viewBox="0 0 24 24">
        <path fill="#E50914" d="M4 0h3.5l6.5 16.5V0h3.5v24h-3.5L7.5 7.5V24H4V0z"/>
      </svg>
    ),
    role: 'Senior Frontend Architect at Netflix · Ex-Swiggy',
    quote: 'Core web vitals, state machines, and micro-frontend decoupling make students immediately productive on Day 1.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    tilt: '0.7deg',
  },
];

export function MentorsSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const mentorsPerPage = 4;
  const totalPages = Math.ceil(mentors.length / mentorsPerPage);
  const visibleMentors = mentors.slice(currentPage * mentorsPerPage, (currentPage + 1) * mentorsPerPage);

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

          {/* Navigation Page Controls */}
          {totalPages > 1 && (
            <div className="flex items-center gap-2.5 self-start sm:self-end">
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

        {/* Top Connecting Node Wire / Hierarchy Circuit */}
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

        {/* 4 Hanging Mentor Cards Matching Target Design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {visibleMentors.map((mentor) => (
            <motion.div
              key={mentor.name}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, rotate: 0, transition: { duration: 0.25 } }}
              style={{ rotate: mentor.tilt }}
              transition={{ duration: 0.5 }}
              className="bento-card overflow-hidden flex flex-col justify-between group hover:border-[#2563EB]/50 bg-white border border-black/8 rounded-2xl transition-all duration-300"
            >
              <div>
                {/* Portrait Photo Container with Top Left Company Badge */}
                <div className="relative w-full h-64 sm:h-72 overflow-hidden bg-slate-100">
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
                    loading="lazy"
                  />
                  
                  {/* Subtle Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/30" />

                  {/* Top-Left Company Logo Badge */}
                  <div className="absolute top-3.5 left-3.5 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md border border-black/10 flex items-center justify-center shadow-lg">
                    {mentor.companyLogo}
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
                      {mentor.companyLogo}
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
