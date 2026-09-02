import { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Briefcase,
  Send,
  CheckCircle2
} from 'lucide-react';
import { MentorJobPortal } from './MentorJobPortal';
import { MentorApplyModal } from './MentorApplyModal';

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
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  // Track if this is a direct job application view (opened in a new tab)
  const [isDirectJobView, setIsDirectJobView] = useState(() => {
    return typeof window !== 'undefined' && window.location.hash.includes('jobId=');
  });

  // Instantly scroll to top or target hash when page opens
  useEffect(() => {
    const handleHashChange = () => {
      const isJob = window.location.hash.includes('jobId=');
      setIsDirectJobView(isJob);
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);

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

    return () => window.removeEventListener('hashchange', handleHashChange);
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
      <main className={`relative z-10 ${isDirectJobView ? 'pt-24 pb-16' : 'pt-28 pb-20'} overflow-hidden`}>
        
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-tr from-[#2563EB]/10 via-[#3B82F6]/10 to-transparent blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute top-1/2 -left-48 w-96 h-96 bg-blue-500/5 blur-[120px] pointer-events-none rounded-full" />

        {/* ========================================================
            01. HERO SECTION (FOCUSED & IMPACTFUL) - HIDDEN ON DIRECT JOB VIEW
        ======================================================== */}
        {!isDirectJobView && (
          <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
            <div className="p-8 sm:p-12 lg:p-14 rounded-3xl bg-white shadow-sm border border-black/8 relative overflow-hidden">
              
              {/* Corner Decorative Glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#2563EB]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-start">
                
                {/* Left Column: Headline, Description & CTAs (7 cols) */}
                <div className="lg:col-span-7">
                  
                  {/* Main Headline */}
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 font-[family-name:var(--font-display)] leading-[1.1] mb-6">
                    Join Us in Shaping the Future,{' '}
                    <span className="bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#60A5FA] bg-clip-text text-transparent">
                      Empowering the Next Generation
                    </span>
                  </h1>

                  {/* Subtitle */}
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mb-8">
                    Collaborate with Grow360 to mentor ambitious college graduates across campuses nationwide. Lead live, industry-focused masterclasses in technology, analytics, and business, empowering the next generation with practical skills and real-world insights.
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

                {/* Right Column: Direct Application CTA Card (5 cols - NO embedded form) */}
                <div className="lg:col-span-5 w-full">
                  <div className="rounded-3xl bg-white border border-slate-200/90 p-7 sm:p-8 shadow-xl relative overflow-hidden space-y-6">
                    
                    {/* Eyebrow Pill */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/25 text-[#2563EB] text-xs font-semibold">
                      <Sparkles size={13} className="text-[#2563EB]" />
                      <span>Mentor Network Application</span>
                    </div>

                    {/* Title & Subtitle */}
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-[family-name:var(--font-display)] mb-1.5">
                        Share Your Profile With Us
                      </h2>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Join an elite network of tech and business leaders training the next generation of campus engineers.
                      </p>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-3 text-xs text-slate-700">
                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                        <CheckCircle2 size={16} className="text-[#2563EB] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-slate-900">High-Impact Weekend Sprints</span>
                          <p className="text-[11.5px] text-slate-500 mt-0.5">Flexible 1:1 and cohort sessions matching your corporate schedule.</p>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                        <CheckCircle2 size={16} className="text-[#2563EB] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-slate-900">Competitive Honorarium</span>
                          <p className="text-[11.5px] text-slate-500 mt-0.5">Industry-leading compensation for design, code, and mock interview reviews.</p>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-2">
                      <button
                        onClick={() => setIsApplyModalOpen(true)}
                        className="w-full btn-pill-primary py-3.5 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md"
                      >
                        <Send size={14} />
                        <span>Apply for Mentor Role</span>
                        <ArrowRight size={14} />
                      </button>
                      <p className="text-[11px] text-slate-400 text-center mt-2.5 font-mono">
                        Our Talent Guild responds within 24–48 hours
                      </p>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </section>
        )}

        {/* ========================================================
            02. CAREER OPPORTUNITIES (INTEGRATED JOB PORTAL)
        ======================================================== */}
        <section id="career-portal" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {!isDirectJobView && (
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
          )}

          {/* Embedded Job Portal */}
          <MentorJobPortal />
        </section>

      </main>

      {/* Mentor Apply Modal */}
      <MentorApplyModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
      />

    </div>
  );
}
