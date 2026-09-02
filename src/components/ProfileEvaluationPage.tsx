import { Phone, Sparkles, ArrowRight, TrendingUp, Calendar, ShieldCheck, UserCheck, Code2, Layers, Cpu, MessageSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useEnquiry } from '../context/EnquiryContext';

interface ProfileEvaluationPageProps {
  onBackToHome: () => void;
}

export function ProfileEvaluationPage({ onBackToHome }: ProfileEvaluationPageProps) {
  const { user } = useAuth();
  const { openEnquiry } = useEnquiry();

  // Dynamic user name
  const userName = user?.name ? user.name.split(' ')[0] : 'Engineer';
  const fullName = user?.name || 'Aspiring Tech Lead';

  const skillPillars = [
    {
      name: 'Core DSA & Problem Solving',
      icon: <Code2 size={16} className="text-[#2563EB]" />,
      score: 82,
      status: 'Strong Candidate',
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      description: 'Solid intuition in graph traversals & dynamic programming. Ready for advanced concurrency & lock-free data structures.',
    },
    {
      name: 'System Architecture & LLD',
      icon: <Layers size={16} className="text-indigo-600" />,
      score: 68,
      status: 'Target Focus Area',
      badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
      description: 'Understands basic REST APIs. Key growth area: distributed caching (Redis), message queues (Kafka), and database indexing.',
    },
    {
      name: 'AI Code Acceleration & Modern Tooling',
      icon: <Cpu size={16} className="text-sky-600" />,
      score: 74,
      status: 'Above Average',
      badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
      description: 'Effective use of AI assistants for rapid boilerplate & unit test synthesis. Ready for production-grade prompt pipelines.',
    },
    {
      name: 'Technical Communication & Mock Drives',
      icon: <MessageSquare size={16} className="text-violet-600" />,
      score: 78,
      status: 'Good Articulation',
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      description: 'Clear thought process during code walkthroughs. Practice needed on handling deep architectural trade-off questions.',
    },
  ];

  const matchedMentors = [
    {
      name: 'Nandwana Abhishek',
      company: 'Meta (London)',
      role: 'Software Engineer',
      exp: '95+ Sessions',
      image: '/mentors/nandwana_abhishek.jpg',
      tag: 'System Design & Distributed Tech',
    },
    {
      name: 'Nidhi Singh',
      company: 'Accenture',
      role: 'Lead Analyst · Advisory',
      exp: '85+ Sessions',
      image: '/mentors/nidhi_singh.jpg',
      tag: 'Corporate Readiness & Strategy',
    },
    {
      name: 'Vishal Motlani',
      company: 'J&J MedTech (Ex-Deloitte)',
      role: 'Senior Consultant',
      exp: '60+ Sessions',
      image: '/mentors/vishal_motlani.jpg',
      tag: 'Problem Solving & Mock Drives',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-[#0F172A] font-sans selection:bg-[#2563EB] selection:text-white pt-24 pb-20">
      {/* Top Breadcrumb & Status Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-[#2563EB] transition-colors cursor-pointer"
          >
            <span>← Back to Home</span>
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-mono font-bold">
            <Sparkles size={13} />
            <span>CAREER PROFILE DIAGNOSTIC • LIVE EVALUATION</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
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
                Become an AI-Powered{' '}
                <span className="text-[#2563EB]">
                  10× Software Engineer.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl font-normal">
                Your diagnostic rubric is ready. We analysed your engineering depth against Tier-1 hiring benchmarks to give you an actionable roadmap to top placements.
              </p>

              {/* High-Impact Book 1:1 Call Option */}
              <div className="pt-2 space-y-3">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                  <button
                    onClick={() => openEnquiry('CAREER_EVALUATION')}
                    className="btn-pill-primary py-4 px-8 text-sm font-bold flex items-center justify-center gap-2.5 shadow-lg shadow-blue-500/25 cursor-pointer group"
                  >
                    <Phone size={16} className="group-hover:rotate-12 transition-transform" />
                    <span>BOOK FREE 1:1 CAREER CALL</span>
                    <ArrowRight size={16} />
                  </button>

                  <button
                    onClick={() => {
                      const el = document.getElementById('skill-breakdown');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="btn-pill-secondary py-4 px-6 text-sm font-semibold text-slate-700 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>View Skill Gaps</span>
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
                    onClick={() => openEnquiry('CAREER_EVALUATION')}
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
            SECTION 2: CORE SKILL BREAKDOWN (Clean & Clutter-Free)
        ======================================================== */}
        <div id="skill-breakdown" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-2">
            <div>
              <span className="text-xs font-mono text-[#2563EB] font-bold uppercase tracking-wider">
                DIAGNOSTIC PILLARS
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 font-[family-name:var(--font-display)] tracking-tight mt-0.5">
                Your Engineering Benchmark Breakdown
              </h2>
            </div>
            <p className="text-xs text-slate-500 font-mono">
              Target Tier-1 Campus Benchmark: 85%+
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skillPillars.map((pillar, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-black/8 p-5 sm:p-6 shadow-xs space-y-4 hover:border-blue-400/50 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center">
                      {pillar.icon}
                    </div>
                    <span className="text-sm font-bold text-slate-900 font-[family-name:var(--font-display)]">
                      {pillar.name}
                    </span>
                  </div>

                  <span className={`text-xs font-mono px-2.5 py-0.5 rounded-full border font-semibold ${pillar.badgeClass}`}>
                    {pillar.status}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-500 font-medium">Candidate Score:</span>
                    <span className="text-slate-900 font-bold">{pillar.score}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#2563EB] rounded-full transition-all duration-700"
                      style={{ width: `${pillar.score}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================
            SECTION 3: MATCHED INDUSTRY MENTORS FOR 1:1 CALL
        ======================================================== */}
        <div className="rounded-3xl bg-white border border-black/8 p-6 sm:p-10 shadow-sm space-y-6">
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
              onClick={() => openEnquiry('MENTOR_MOCK_DRIVE')}
              className="btn-pill-primary py-2.5 px-5 text-xs font-bold shrink-0 flex items-center gap-1.5 shadow-sm"
            >
              <UserCheck size={14} />
              <span>Book Mock Session</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {matchedMentors.map((mentor, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-slate-50/80 border border-black/6 p-5 flex flex-col justify-between space-y-4 hover:bg-white hover:border-blue-400/40 hover:shadow-md transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={mentor.image}
                      alt={mentor.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-xs"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 font-[family-name:var(--font-display)]">
                        {mentor.name}
                      </h4>
                      <p className="text-xs text-[#2563EB] font-semibold">{mentor.company}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 font-normal">
                    {mentor.role} • <span className="font-mono text-slate-500">{mentor.exp}</span>
                  </p>

                  <div className="p-2 rounded-xl bg-blue-50/80 border border-blue-100 text-[11px] font-mono text-[#2563EB] font-medium">
                    Focus: {mentor.tag}
                  </div>
                </div>

                <button
                  onClick={() => openEnquiry('MENTOR_MOCK_DRIVE')}
                  className="w-full py-2 px-3 rounded-xl bg-white hover:bg-[#2563EB] hover:text-white border border-black/10 text-xs font-bold text-slate-800 transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
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
            onClick={() => openEnquiry('CAREER_EVALUATION')}
            className="px-8 py-4 rounded-full bg-white hover:bg-slate-50 text-[#2563EB] text-xs sm:text-sm font-bold shadow-lg transition-all hover:scale-105 shrink-0 cursor-pointer flex items-center gap-2"
          >
            <Phone size={15} />
            <span>BOOK FREE 1:1 CALL</span>
          </button>
        </div>
      </div>
    </div>
  );
}
