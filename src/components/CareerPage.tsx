import { useEffect } from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { MentorJobPortal } from './MentorJobPortal';
import { Footer } from './Footer';

interface CareerPageProps {
  onBackToHome?: () => void;
}

export function CareerPage({ onBackToHome }: CareerPageProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  const handleBack = () => {
    if (window.location.hash === '#careers') {
      window.location.hash = '#mentor';
    } else if (onBackToHome) {
      onBackToHome();
    } else {
      window.location.hash = '';
    }
  };

  return (
    <div className="min-h-screen bg-[#07070A] text-slate-100 font-sans selection:bg-[#00B4D8] selection:text-white">
      {/* Top Sticky Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#07070A]/90 backdrop-blur-xl border-b border-white/10 h-18 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between">
          
          <div className="flex items-center gap-6">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer group"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              <span>Back to Mentors</span>
            </button>

            <div className="h-4 w-px bg-white/10 hidden sm:block" />

            <div 
              className="flex items-center gap-2.5 cursor-pointer"
              onClick={() => { window.location.hash = ''; }}
            >
              <img
                src="/grow360-logo.png"
                alt="Grow360 Logo"
                className="h-8 w-auto object-contain rounded-lg"
              />
              <span className="text-lg font-extrabold text-white font-[family-name:var(--font-display)]">
                GROW<span className="text-[#00B4D8]">360°</span> <span className="text-xs font-mono font-normal text-[#00B4D8] ml-1">Careers</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Hiring Active</span>
            </div>

            <button
              onClick={() => { window.location.hash = ''; }}
              className="btn-pill-secondary py-1.5 px-4 text-xs cursor-pointer"
            >
              Campus Home
            </button>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="pt-24 pb-12">
        {/* Banner Hero */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00B4D8]/10 border border-[#00B4D8]/30 text-[#00B4D8] text-xs font-semibold tracking-wide mb-4">
            <Sparkles size={14} className="text-[#00B4D8]" />
            <span>Grow360 Open Opportunities</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-[family-name:var(--font-display)] mb-4">
            Explore Open <span className="bg-gradient-to-r from-[#00B4D8] via-[#0077B6] to-[#90E0EF] bg-clip-text text-transparent">Mentor &amp; Instructor</span> Roles
          </h1>

          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Apply to flexible mock interviewing, DSA instruction, cloud architecture, and corporate training positions. Conduct sessions remotely and earn weekly honorariums.
          </p>
        </div>

        {/* The Dedicated Job Portal Component */}
        <MentorJobPortal />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
