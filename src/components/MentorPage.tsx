import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  Clock,
  Briefcase 
} from 'lucide-react';
import { MentorJobPortal } from './MentorJobPortal';

interface MentorPageProps {
  onBackToHome?: () => void;
}

const fellowMentors = [
  {
    name: 'Nidhi Singh',
    company: 'Accenture',
    role: 'Lead Analyst – FP&A · Finance & Modelling',
    rating: '4.98',
    sessions: '85+ Sessions',
    image: '/mentors/nidhi_singh.jpg',
    color: '#A100FF',
  },
  {
    name: 'Vishal Motlani',
    company: 'J&J MedTech',
    role: "SIBM P'27 · Ex-Deloitte USI · Advisory",
    rating: '4.95',
    sessions: '60+ Sessions',
    image: '/mentors/vishal_motlani.jpg',
    color: '#D51900',
  },
  {
    name: 'Nandwana Abhishek',
    company: 'Meta',
    role: 'Software Engineer · Meta (London, UK)',
    rating: '4.99',
    sessions: '95+ Sessions',
    image: '/mentors/nandwana_abhishek.jpg',
    color: '#0668E1',
  },
  {
    name: 'Ashish Sachan',
    company: 'Product Leadership',
    role: 'Product & Program Management · 10+ Yrs Exp',
    rating: '4.96',
    sessions: '110+ Sessions',
    image: '/mentors/ashish_sachan.jpg',
    color: '#2563EB',
  },
  {
    name: 'Mohit Khandelwal',
    company: 'ZS',
    role: 'Analytics Consultant · Commercial Analytics',
    rating: '4.97',
    sessions: '75+ Sessions',
    image: '/mentors/mohit_khandelwal.png',
    color: '#005A9C',
  },
  {
    name: 'Sakshi Havelia',
    company: 'Koridge Capital',
    role: 'Founder Advisory · Equity & Debt Fundraising',
    rating: '4.98',
    sessions: '90+ Sessions',
    image: '/mentors/sakshi_havelia.png',
    color: '#D97706',
  },
  {
    name: 'Gagandeep Singh',
    company: 'VALUETE',
    role: 'Founder & Full-Stack Developer · Scalable Tech',
    rating: '4.94',
    sessions: '70+ Sessions',
    image: '/mentors/gagandeep_singh.jpg',
    color: '#10B981',
  },
  {
    name: 'Siddhartha Kumar',
    company: 'Brainstack',
    role: 'Senior Full-Stack Engineer · Agentic AI & RAG',
    rating: '4.96',
    sessions: '80+ Sessions',
    image: '/mentors/siddhartha_kumar.jpg',
    color: '#8B5CF6',
  },
];

export function MentorPage({ onBackToHome: _ }: MentorPageProps) {
  // Instantly scroll to top or target hash when page opens
  useEffect(() => {
    if (window.location.hash === '#career-portal' || window.location.hash === '#careers' || window.location.hash === '#jobs') {
      setTimeout(() => {
        const elem = document.getElementById('career-portal');
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, []);

  const scrollToCareers = () => {
    const elem = document.getElementById('career-portal');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-slate-900 font-sans selection:bg-[#2563EB] selection:text-white">

      {/* Main Content Area */}
      <main className="relative z-10 pt-28 pb-20 overflow-hidden">
        
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-tr from-[#2563EB]/10 via-[#3B82F6]/10 to-transparent blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute top-1/2 -left-48 w-96 h-96 bg-blue-500/5 blur-[120px] pointer-events-none rounded-full" />

        {/* ========================================================
            01. HERO SECTION (FOCUSED & IMPACTFUL)
        ======================================================== */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
          <div className="p-8 sm:p-12 lg:p-16 rounded-3xl bg-white shadow-sm border border-black/8 relative overflow-hidden">
            
            {/* Corner Decorative Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#2563EB]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Left Column: Headline, Description & CTAs */}
              <div className="lg:col-span-7">
                
                {/* Eyebrow Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[#2563EB] text-xs font-semibold tracking-wide mb-6"
                >
                  <Sparkles size={14} className="text-[#2563EB]" />
                  <span>Join Grow360 Senior Engineering Guild</span>
                </motion.div>

                {/* Main Headline */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 font-[family-name:var(--font-display)] leading-[1.1] mb-6">
                  Shape the Next Generation of Engineers.{' '}
                  <span className="bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#60A5FA] bg-clip-text text-transparent">
                    On Your Own Schedule.
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mb-8">
                  Guide ambitious engineering students across 50+ tier-2/3 campuses. Conduct high-impact 1-on-1 mock interviews, review architecture capstones, and get compensated on your own 100% flexible schedule.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 mb-10">
                  <button
                    onClick={scrollToCareers}
                    className="btn-pill-primary py-3.5 px-8 text-xs sm:text-sm font-bold cursor-pointer flex items-center gap-2"
                  >
                    <span>Apply as Mentor</span>
                    <ArrowRight size={16} />
                  </button>

                  <button
                    onClick={scrollToCareers}
                    className="btn-pill-secondary py-3.5 px-6 text-xs sm:text-sm cursor-pointer"
                  >
                    <span>View All Openings</span>
                  </button>
                </div>

                {/* Social Proof Strip */}
                <div className="flex items-center gap-4 pt-6 border-t border-black/8">
                  <div className="flex -space-x-2.5">
                    {fellowMentors.map((m, idx) => (
                      <img
                        key={idx}
                        src={m.image}
                        alt={m.name}
                        className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-xs"
                      />
                    ))}
                  </div>
                  <div className="text-xs text-slate-600">
                    <span className="text-slate-900 font-bold">80+ Senior Engineers</span> from Google, Microsoft, Amazon &amp; Meta are already mentoring.
                  </div>
                </div>

              </div>

              {/* Right Column: Interactive Mock Visualizer Card */}
              <div className="lg:col-span-5">
                <div className="relative rounded-3xl bg-slate-50 border border-black/10 p-6 shadow-xl overflow-hidden">
                  
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-black/8 mb-5">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-mono font-bold text-slate-900">Live Mock Evaluation</span>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-[#2563EB] bg-[#2563EB]/10 px-2 py-0.5 rounded-full">
                      1-on-1 Session
                    </span>
                  </div>

                  {/* Mock Visual Content */}
                  <div className="space-y-4">
                    
                    {/* Simulated Candidate */}
                    <div className="p-3.5 rounded-2xl bg-white border border-black/8 flex items-center justify-between shadow-2xs">
                      <div>
                        <div className="text-xs font-bold text-slate-900">Aditya Verma (Final Year CSE)</div>
                        <div className="text-[11px] text-slate-600 font-mono">Target: SDE 1 at Tier-1 Product Firm</div>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-[#2563EB] border border-blue-500/20 font-semibold">
                        System Design
                      </span>
                    </div>

                    {/* Simulated IDE Snippet */}
                    <div className="p-3.5 rounded-2xl bg-[#0F172A] text-white border border-black/8 font-mono text-[11px] shadow-2xs">
                      <div className="text-slate-400 text-[10px] mb-1.5">// Live Evaluator Rubrics</div>
                      <div className="text-emerald-400">✓ Graph Traversal Optimality: 95/100</div>
                      <div className="text-sky-300">⚠ Distributed Cache Eviction: Discuss Redis TTL</div>
                      <div className="text-blue-400">✓ Communication &amp; Edge Cases: 90/100</div>
                    </div>

                    {/* Honorarium & Scheduling Guarantee */}
                    <div className="p-4 rounded-2xl bg-white border border-black/8 flex items-center justify-between shadow-2xs">
                      <div className="flex items-center gap-2.5">
                        <Clock size={16} className="text-[#2563EB]" />
                        <div className="text-xs font-medium text-slate-700">
                          Your Calendar, Your Terms
                        </div>
                      </div>
                      <div className="text-[11px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                        Weekly Direct Credit
                      </div>
                    </div>

                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================
            02. CAREER OPPORTUNITIES (INTEGRATED JOB PORTAL)
        ======================================================== */}
        <section id="career-portal" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/25 text-[#2563EB] text-xs font-semibold tracking-wide mb-3">
              <Briefcase size={14} className="text-[#2563EB]" />
              <span>Open Positions &amp; Roles</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-[family-name:var(--font-display)] mb-3">
              Career <span className="text-[#2563EB]">Opportunities</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Explore open flexible mock interviewing, DSA instruction, cloud architecture, and corporate training positions. Apply directly with your resume or LinkedIn profile.
            </p>
          </div>

          {/* Embedded Job Portal */}
          <MentorJobPortal />
        </section>

      </main>

    </div>
  );
}
