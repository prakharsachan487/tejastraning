import { useState } from 'react';
import { Phone, Sparkles, ArrowRight, TrendingUp, Calendar, ShieldCheck, UserCheck, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAdminData } from '../context/AdminDataContext';
import { CareerCallModal } from './CareerCallModal';

interface ProfileEvaluationPageProps {
  onBackToHome: () => void;
}

export function ProfileEvaluationPage({ onBackToHome }: ProfileEvaluationPageProps) {
  const { user, logout } = useAuth();
  const { mentors } = useAdminData();
  const [isCareerCallOpen, setIsCareerCallOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState('AI-Powered Software Engineering (10x)');

  // Dynamic user name
  const userName = user?.name ? user.name.split(' ')[0] : 'Engineer';
  const fullName = user?.name || 'Aspiring Tech Lead';

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-[#0F172A] font-sans selection:bg-[#2563EB] selection:text-white pb-20">
      {/* Dedicated Evaluation Header (Clean & Minimal) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-black/8 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          {/* Brand Logo & Back */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={onBackToHome}
              className="flex items-center gap-2 cursor-pointer group"
              title="Return to Landing Page"
            >
              <img
                src="/grow360_logo.jpg"
                alt="GROW360"
                className="h-9 w-auto rounded-lg object-contain"
              />
              <div className="flex flex-col text-left">
                <span className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-none group-hover:text-[#2563EB] transition-colors">
                  GROW360°
                </span>
                <span className="text-[10px] text-slate-500 font-mono leading-tight">
                  Decoding the corporate world
                </span>
              </div>
            </button>

            <span className="hidden md:inline text-slate-300">|</span>

            <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-mono font-bold">
              <Sparkles size={12} />
              <span>CAREER PROFILE EVALUATION</span>
            </span>
          </div>

          {/* Right Controls: Book Call & User Profile / Logout */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setSelectedProgram('AI-Powered Software Engineering (10x)');
                setIsCareerCallOpen(true);
              }}
              className="btn-pill-primary px-4 py-2 sm:px-5 sm:py-2.5 text-xs font-bold shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <Phone size={13} />
              <span className="hidden sm:inline">BOOK FREE 1:1 CALL</span>
              <span className="sm:hidden">1:1 Call</span>
            </button>

            {user && (
              <div className="flex items-center gap-2 bg-slate-50 pl-2 pr-3 py-1.5 rounded-full border border-black/10 shadow-2xs">
                <img
                  src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                  alt={user.name}
                  className="w-7 h-7 rounded-full object-cover border border-[#2563EB]/40"
                />
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-800 leading-none">{user.name}</span>
                  <span className="text-[10px] text-[#2563EB] font-mono leading-none mt-0.5">{user.role}</span>
                </div>
                <button
                  onClick={logout}
                  title="Sign Out"
                  className="ml-1 p-1 hover:text-red-500 text-slate-400 transition-colors cursor-pointer"
                >
                  <LogOut size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-10">
        {/* ========================================================
            HERO SECTION: DIAGNOSTIC SCORE + BOOK 1:1 CALL
        ======================================================== */}
        <div className="relative rounded-3xl bg-white border border-black/8 p-6 sm:p-10 lg:p-12 shadow-sm overflow-hidden">
          {/* Subtle decorative background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>EVALUATION COMPLETED FOR {fullName.toUpperCase()}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] tracking-tight font-[family-name:var(--font-display)] leading-[1.15]">
                Hey {userName},<br />
                Transform into an{' '}
                <span className="text-[#2563EB]">
                  Industry-Ready Corporate Leader.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl font-normal">
                Your diagnostic evaluation is complete. Discover where you stand against real-world corporate hiring benchmarks and unlock your customized 1-on-1 mentorship roadmap to top placements.
              </p>

              {/* High-Impact Book 1:1 Call Option */}
              <div className="pt-2 space-y-3">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                  <button
                    onClick={() => {
                      setSelectedProgram('AI-Powered Software Engineering (10x)');
                      setIsCareerCallOpen(true);
                    }}
                    className="btn-pill-primary py-4 px-8 text-sm font-bold flex items-center justify-center gap-2.5 shadow-lg shadow-blue-500/25 cursor-pointer group"
                  >
                    <Phone size={16} className="group-hover:rotate-12 transition-transform" />
                    <span>BOOK FREE 1:1 CAREER CALL</span>
                    <ArrowRight size={16} />
                  </button>

                  <button
                    onClick={() => {
                      const el = document.getElementById('matched-mentors');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="btn-pill-secondary py-4 px-6 text-sm font-semibold text-slate-700 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>View Matched Mentors</span>
                  </button>
                </div>

                {/* Metadata badges below CTA */}
                <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-[11px] font-mono text-slate-500 pt-1">
                  <span className="flex items-center gap-1 text-slate-700 font-semibold">
                    <Calendar size={13} className="text-[#2563EB]" />
                    30 Min Call
                  </span>
                  <span>•</span>
                  <span className="text-emerald-700 font-semibold">100% Free</span>
                  <span>•</span>
                  <span>Senior Corporate Mentors</span>
                  <span>•</span>
                  <span>Custom Placement Rubric</span>
                </div>
              </div>
            </div>

            {/* Right Column: Clean Score Dial Card (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="w-full max-w-sm rounded-3xl bg-gradient-to-b from-[#F0F5FF] via-white to-[#F8FAFC] border border-blue-200/80 p-7 shadow-md flex flex-col items-center text-center relative overflow-hidden">
                <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-3 shadow-md shadow-blue-500/30">
                  <Sparkles size={20} />
                </div>

                <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Overall Readiness Score
                </span>

                <div className="flex items-baseline justify-center gap-1.5 my-2">
                  <span className="text-6xl font-black text-slate-900 font-[family-name:var(--font-display)] tracking-tight">
                    76
                  </span>
                  <span className="text-base font-bold text-slate-400">/ 100</span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold my-2">
                  <TrendingUp size={13} className="text-emerald-600" />
                  <span>Top 18% of Engineering Cohorts</span>
                </div>

                <p className="text-xs text-slate-600 mt-2 leading-relaxed font-normal">
                  Calculated using calibrated scoring rubrics from corporate hiring rounds at Google, Meta, and Deloitte.
                </p>

                <div className="w-full border-t border-slate-200/80 mt-5 pt-4 flex items-center justify-between text-xs font-mono text-slate-600">
                  <span className="flex items-center gap-1">
                    <ShieldCheck size={14} className="text-[#2563EB]" />
                    Verified Rubric
                  </span>
                  <button
                    onClick={() => {
                      setSelectedProgram('1:1 Placement & Mock Drive Sprint');
                      setIsCareerCallOpen(true);
                    }}
                    className="text-[#2563EB] font-bold hover:underline cursor-pointer"
                  >
                    Discuss in 1:1 Call →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            SECTION: MATCHED INDUSTRY MENTORS FOR 1:1 CALL
        ======================================================== */}
        <div id="matched-mentors" className="rounded-3xl bg-white border border-black/8 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/6 pb-5">
            <div>
              <span className="text-xs font-mono text-[#2563EB] font-bold uppercase tracking-wider">
                1-ON-1 SESSIONS
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 font-[family-name:var(--font-display)] tracking-tight mt-0.5">
                Senior Mentors Matched to Your Profile
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Connect 1-on-1 to review your code, refine your resume, and conduct realistic mock drives.
              </p>
            </div>

            <button
              onClick={() => {
                setSelectedProgram('1:1 Corporate Mock Drive & Placement Sprint');
                setIsCareerCallOpen(true);
              }}
              className="btn-pill-primary py-2.5 px-5 text-xs font-bold shrink-0 flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <UserCheck size={14} />
              <span>Book Mock Session</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {mentors.map((mentor) => (
              <div
                key={mentor.id}
                className="rounded-2xl bg-slate-50/80 border border-black/6 p-5 flex flex-col justify-between space-y-4 hover:bg-white hover:border-blue-400/40 hover:shadow-md transition-all group"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={mentor.image}
                      alt={mentor.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-xs"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80';
                      }}
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 font-[family-name:var(--font-display)] group-hover:text-[#2563EB] transition-colors">
                        {mentor.name}
                      </h4>
                      <span
                        className="text-[11px] font-bold px-2 py-0.5 rounded-md inline-block mt-0.5 text-white"
                        style={{ backgroundColor: mentor.companyColor || '#2563EB' }}
                      >
                        {mentor.company}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 font-normal line-clamp-2 leading-relaxed">
                    {mentor.role} • <span className="font-mono text-slate-500">{mentor.exp || '80+ Sessions'}</span>
                  </p>

                  <div className="p-2 rounded-xl bg-blue-50/80 border border-blue-100 text-[11px] font-mono text-[#2563EB] font-medium line-clamp-1">
                    Focus: {mentor.tag || 'Placement Sprint'}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedProgram(`1:1 Mentorship with ${mentor.name} (${mentor.company})`);
                    setIsCareerCallOpen(true);
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-[#2563EB] hover:text-white border border-black/10 text-xs font-bold text-slate-800 transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs group-hover:border-[#2563EB]"
                >
                  <span>Connect with {mentor.name.split(' ')[0]}</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================
            SECTION 4: FINAL ACTION BANNER (Book 1:1 Call)
        ======================================================== */}
        <div className="rounded-3xl bg-gradient-to-r from-[#2563EB] via-[#1D4ED8] to-[#1E40AF] p-8 sm:p-10 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold font-[family-name:var(--font-display)] tracking-tight">
              Ready to fast-track your placements?
            </h3>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl">
              Get a customized 12-week preparation strategy and direct mock interview schedule with top corporate practitioners.
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedProgram('AI-Powered Software Engineering (10x)');
              setIsCareerCallOpen(true);
            }}
            className="px-8 py-4 rounded-full bg-white hover:bg-slate-50 text-[#2563EB] text-xs sm:text-sm font-bold shadow-lg transition-all hover:scale-105 shrink-0 cursor-pointer flex items-center gap-2"
          >
            <Phone size={15} />
            <span>BOOK FREE 1:1 CALL</span>
          </button>
        </div>
      </div>

      {/* Render the 2-step Career Call Modal */}
      <CareerCallModal
        isOpen={isCareerCallOpen}
        onClose={() => setIsCareerCallOpen(false)}
        defaultProgram={selectedProgram}
      />
    </div>
  );
}

