import { useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { MentorJobPortal } from './MentorJobPortal';
import { Footer } from './Footer';

interface CareerPageProps {
  onBackToHome?: () => void;
}

export function CareerPage({ onBackToHome: _ }: CareerPageProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-slate-100 font-sans selection:bg-[#7A9D96] selection:text-slate-900">
      {/* Main Container */}
      <main className="pt-24 pb-12">
        {/* Banner Hero */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7A9D96]/10 border border-[#7A9D96]/30 text-[#7A9D96] text-xs font-semibold tracking-wide mb-4">
            <Sparkles size={14} className="text-[#7A9D96]" />
            <span>Grow360 Open Opportunities</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-[family-name:var(--font-display)] mb-4">
            Explore Open <span className="bg-gradient-to-r from-[#00B4D8] via-[#0077B6] to-[#90E0EF] bg-clip-text text-transparent">Mentor &amp; Instructor</span> Roles
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
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
