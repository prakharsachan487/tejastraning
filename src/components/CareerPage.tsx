import { MentorJobPortal } from './MentorJobPortal';

interface CareerPageProps {
  onBackToHome?: () => void;
}

export function CareerPage({ onBackToHome: _onBackToHome }: CareerPageProps) {
  return (
    <div className="min-h-screen bg-[#F8F9FB] text-slate-900 font-sans selection:bg-[#2563EB] selection:text-white flex flex-col justify-between">
      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 w-full flex-1">
        {/* Editorial Page Headline */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/25 text-[#2563EB] text-xs font-semibold tracking-wide mb-4">
            <span>Career Opportunities</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-[family-name:var(--font-display)] mb-4">
            Explore Open <span className="bg-gradient-to-r from-[#2563EB] to-[#3B82F6] bg-clip-text text-transparent">Mentor &amp; Instructor</span> Roles
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Apply to flexible mock interviewing, DSA instruction, cloud architecture, and corporate training positions. Conduct sessions remotely and earn weekly honorariums.
          </p>
        </div>

        {/* The Dedicated Job Portal Component */}
        <MentorJobPortal />
      </main>
    </div>
  );
}
