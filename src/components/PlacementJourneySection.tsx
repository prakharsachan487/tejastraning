import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  Cpu,
  Building2,
  Award,
  Terminal,
  FileCheck,
} from 'lucide-react';
import { useEnquiry } from '../context/EnquiryContext';

const stages = [
  {
    step: '01',
    label: 'Learn',
    title: 'Industry Curriculum',
    subtitle: 'Industry-focused curriculum delivered by practitioners. Your batches build job-ready skills your placement cell can stand behind.',
    bullets: [
      'DSA, system design, and core CS taught by working engineers',
      'Curricula mapped to university credits and real hiring expectations',
      'Weekly progress reviews so no learner falls behind',
    ],
    metrics: [
      { value: '300+', label: 'Curriculum Hours' },
      { value: '700+', label: 'DSA Practice Problems' },
    ],
    badge: 'Semester-Mapped',
  },
  {
    step: '02',
    label: 'Practice',
    title: 'Coding + Assessments',
    subtitle: 'Timed daily problem-solving and automated assessments that simulate real recruitment coding rounds.',
    bullets: [
      'Adaptive problem sets from array patterns to advanced graphs and dynamic programming',
      'Weekly timed contest sprints with automated test cases and memory/runtime profiling',
      'Gamified daily coding streaks and cohort benchmarking',
    ],
    metrics: [
      { value: '700+', label: 'Curated Challenges' },
      { value: '98%', label: 'Test Pass Index' },
    ],
    badge: 'Daily Contests',
  },
  {
    step: '03',
    label: 'Build',
    title: 'Projects + Portfolios',
    subtitle: 'Students build, containerize, and deploy live full-stack microservices and AI applications that stand out in recruiter reviews.',
    bullets: [
      'Production Next.js, Spring Boot, and PostgreSQL cloud microservices',
      'Docker, Kubernetes, and automated GitHub Actions CI/CD to AWS',
      'Code reviews and PR approvals with senior engineering mentors',
    ],
    metrics: [
      { value: '50+', label: 'Live Projects' },
      { value: '12+', label: 'Cloud Deployments' },
    ],
    badge: 'GitHub Repos',
  },
  {
    step: '04',
    label: 'Prepare',
    title: 'Mock Interviews',
    subtitle: 'Simulated 1-on-1 tech and HR panels conducted by industry veterans to eliminate interview anxiety.',
    bullets: [
      'Live technical whiteboard coding rounds with deep edge-case and trade-off questioning',
      'HR behavioral rounds using the STAR method for leadership and cultural evaluation',
      'Company-specific test packs calibrated for top tier tech firms and unicorns',
    ],
    metrics: [
      { value: '20+', label: 'Mock Rounds' },
      { value: '1-on-1', label: 'Mentor Panels' },
    ],
    badge: 'FAANG-Calibrated',
  },
  {
    step: '05',
    label: 'Improve',
    title: 'AI Feedback + Mentor Feedback',
    subtitle: 'Real-time AI speech diagnostics and ATS resume optimization paired with granular mentor debriefs.',
    bullets: [
      'Adaptive AI speech analytics measuring clarity, pace, filler words, and confidence',
      'Resume scoring and ATS rewrite loops until reaching 95%+ pass index',
      'Granular post-interview scorecard debriefs highlighting exact growth areas',
    ],
    metrics: [
      { value: '95+', label: 'ATS Pass Score' },
      { value: 'Real-time', label: 'Speech Diagnostics' },
    ],
    badge: 'AI Diagnostics',
  },
  {
    step: '06',
    label: 'Interview',
    title: 'Campus Hiring Drives',
    subtitle: 'Curated recruitment drives with 35+ verified enterprise hiring partners directly on campus.',
    bullets: [
      'Direct campus drive scheduling with 35+ verified corporate partners',
      'Pre-vetted capability scorecards sent directly to recruiter ATS tables',
      'Dedicated recruitment slots and high shortlist conversion for trained cohorts',
    ],
    metrics: [
      { value: '35+', label: 'Hiring Partners' },
      { value: '3.8x', label: 'Higher Shortlist' },
    ],
    badge: 'Direct Drives',
  },
  {
    step: '07',
    label: 'Get Placed',
    title: 'Offer Letter',
    subtitle: 'Signed corporate offer letters, salary negotiation coaching, and complete post-selection onboarding support.',
    bullets: [
      'Signed offer letters from tier-1 MNCs, high-growth startups & unicorns',
      'CTC negotiation guidance and transparent offer validation',
      'Post-placement corporate readiness transition support for day-one impact',
    ],
    metrics: [
      { value: '94.2%', label: 'Placement Rate' },
      { value: '₹8.4 LPA', label: 'Average CTC' },
    ],
    badge: 'Verified Outcome',
  },
];

export function PlacementJourneySection() {
  const { openEnquiry } = useEnquiry();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const [activeStage, setActiveStage] = useState(0);
  const stageProgress = useTransform(
    scrollYProgress,
    [0, 0.16, 0.33, 0.5, 0.66, 0.83, 1],
    [0, 1, 2, 3, 4, 5, 6]
  );

  useEffect(() => {
    const unsub = stageProgress.on('change', (latest) => {
      setActiveStage(Math.min(6, Math.max(0, Math.round(latest))));
    });
    return unsub;
  }, [stageProgress]);

  return (
    <section ref={containerRef} id="career-path" className="py-24 lg:py-32 bg-[#F8F9FB] relative border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-24 text-left"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/25 text-[#3B82F6] text-xs font-semibold tracking-wide mb-4">
            <Sparkles size={14} className="text-[#2563EB]" />
            <span>The 7-Stage Roadmap</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
            Training Means Nothing <br />
            <span className="text-slate-500">
              Without Placement.
            </span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
            We stay after training ends. We bring hiring partners to campus and support your placement cell through offers.
          </p>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════
            VERTICAL 7 STAGES WITH STICKY TIMELINE & INTERACTIVE CARDS
            ══════════════════════════════════════════════════════════════ */}
        <div className="space-y-32">
          
          {/* ──────────────────────────────────────────────────────────
              STAGE 01: LEARN (Industry Curriculum)
              ────────────────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Stage Title & Sticky Timeline Line */}
            <div className="lg:col-span-4 flex items-center gap-6 lg:sticky lg:top-36">
              <div className="flex flex-col items-center">
                <div className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                  activeStage >= 0 ? 'border-[#2563EB] bg-[#2563EB] ring-4 ring-[#2563EB]/20' : 'border-slate-600 bg-[#F8F9FB]'
                }`} />
                <div className="w-0.5 h-56 bg-slate-800 my-2 hidden lg:block" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] block mb-1">
                  Stage 01
                </span>
                <h3 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold transition-colors duration-300 ${
                  activeStage === 0 ? 'text-slate-900' : 'text-slate-500'
                }`}>
                  Learn
                </h3>
              </div>
            </div>

            {/* Right Stage Content & Simulator Card */}
            <div className="lg:col-span-8 space-y-8">
              <div>
                <p className="text-lg sm:text-xl text-slate-900 font-medium leading-relaxed mb-5">
                  {stages[0].subtitle}
                </p>

                <ul className="space-y-3 text-sm text-slate-700 mb-6">
                  {stages[0].bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <span className="text-[#2563EB] font-bold text-base">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {/* Metric Badges */}
                <div className="flex items-center gap-4">
                  {stages[0].metrics.map((m) => (
                    <div key={m.label} className="p-4 rounded-xl bg-white shadow-sm border border-black/8 min-w-[140px]">
                      <div className="text-xl font-bold text-slate-900">{m.value}</div>
                      <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mt-0.5">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Night Grind Coding Workstation Card */}
              <div className="rounded-2xl bg-[#0D131F] border border-slate-800 p-5 sm:p-6 shadow-2xl">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4 text-xs">
                  <span className="px-2.5 py-1 rounded bg-[#1E3A8A]/50 text-[#60A5FA] font-bold uppercase text-[10px] tracking-wider">
                    NIGHT GRIND
                  </span>
                  <span className="text-slate-600 font-mono text-xs">2:14 AM</span>
                </div>

                <div className="p-4 rounded-xl bg-[#080B11] border border-slate-800 mb-5">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      <span className="ml-2 text-xs font-mono text-slate-600">two-sum.cpp</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                      Accepted
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-12 gap-4">
                    <div className="sm:col-span-8 font-mono text-xs text-slate-700 space-y-1">
                      <div className="text-slate-500">// LC 1 · Easy</div>
                      <div className="text-[#38BDF8]">class Solution &#123;</div>
                      <div className="pl-4 text-emerald-300">vector&lt;int&gt; twoSum(...) &#123;</div>
                      <div className="pl-8 text-slate-700">unordered_map&lt;int, int&gt; m;</div>
                      <div className="pl-8 text-slate-700">return &#123;i, m[t]&#125;;</div>
                      <div className="pl-4 text-emerald-300">&#125;</div>
                      <div className="text-[#38BDF8]">&#125;</div>
                    </div>

                    <div className="sm:col-span-4 border-l border-slate-800 pl-4 space-y-2 text-xs">
                      <div className="font-bold text-slate-900">Two Sum</div>
                      <div className="text-[11px] text-slate-600">Find indices that add up to target.</div>
                      <div className="space-y-1 text-[11px] pt-1">
                        <div className="text-emerald-400 font-semibold">✓ Hash map</div>
                        <div className="text-emerald-400 font-semibold">✓ O(n) time</div>
                        <div className="text-emerald-400 font-semibold">✓ Edge cases</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#1E293B] border border-slate-700 flex items-center justify-center text-slate-700 text-xs font-bold">
                      🧑‍💻
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">Aarav · 3rd year</div>
                      <div className="text-[10px] text-slate-600">DSA streak: day 47</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 rounded bg-[#162032] text-amber-300 text-[10px] font-semibold border border-[#2563EB]/20">
                      Arrays
                    </span>
                    <span className="px-2 py-1 rounded bg-[#162032] text-cyan-300 text-[10px] font-semibold border border-cyan-400/20">
                      Trees
                    </span>
                    <span className="px-2 py-1 rounded bg-[#162032] text-emerald-300 text-[10px] font-semibold border border-emerald-400/20">
                      DP
                    </span>
                    <div className="ml-2 px-2.5 py-1 rounded-lg bg-[#1E293B] text-[#3B82F6] text-xs font-bold border border-slate-700">
                      312 <span className="text-[9px] text-slate-600 uppercase font-normal">Problems</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ──────────────────────────────────────────────────────────
              STAGE 02: PRACTICE (Coding + Assessments)
              ────────────────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 flex items-center gap-6 lg:sticky lg:top-36">
              <div className="flex flex-col items-center">
                <div className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                  activeStage >= 1 ? 'border-[#2563EB] bg-[#2563EB] ring-4 ring-[#2563EB]/20' : 'border-slate-600 bg-[#F8F9FB]'
                }`} />
                <div className="w-0.5 h-56 bg-slate-800 my-2 hidden lg:block" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] block mb-1">
                  Stage 02
                </span>
                <h3 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold transition-colors duration-300 ${
                  activeStage === 1 ? 'text-slate-900' : 'text-slate-500'
                }`}>
                  Practice
                </h3>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-8">
              <div>
                <p className="text-lg sm:text-xl text-slate-900 font-medium leading-relaxed mb-5">
                  {stages[1].subtitle}
                </p>

                <ul className="space-y-3 text-sm text-slate-700 mb-6">
                  {stages[1].bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <span className="text-[#2563EB] font-bold text-base">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-4">
                  {stages[1].metrics.map((m) => (
                    <div key={m.label} className="p-4 rounded-xl bg-white shadow-sm border border-black/8 min-w-[140px]">
                      <div className="text-xl font-bold text-slate-900">{m.value}</div>
                      <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mt-0.5">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Assessment Contest Card */}
              <div className="rounded-2xl bg-[#0D131F] border border-slate-800 p-5 sm:p-6 shadow-2xl">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4 text-xs">
                  <div className="flex items-center gap-2">
                    <Terminal size={14} className="text-[#38BDF8]" />
                    <span className="px-2.5 py-1 rounded bg-[#1E3A8A]/50 text-[#60A5FA] font-bold uppercase text-[10px] tracking-wider">
                      CAMPUS CODING SPRINT
                    </span>
                  </div>
                  <span className="text-slate-600 font-mono text-xs">Live Assessment Round</span>
                </div>

                <div className="grid sm:grid-cols-3 gap-3 text-xs mb-4">
                  <div className="p-3.5 rounded-xl bg-[#080B11] border border-slate-800">
                    <div className="text-slate-600 text-[10px] font-bold">TOTAL SUBMISSIONS</div>
                    <div className="text-lg font-bold text-slate-900 mt-1">1,480+</div>
                    <div className="text-[10px] text-emerald-400 mt-1">✓ Automated Test Suites</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#080B11] border border-slate-800">
                    <div className="text-slate-600 text-[10px] font-bold">AVERAGE RUNTIME</div>
                    <div className="text-lg font-bold text-cyan-400 mt-1">14 ms</div>
                    <div className="text-[10px] text-slate-600 mt-1">O(N log N) Optimal</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#080B11] border border-slate-800">
                    <div className="text-slate-600 text-[10px] font-bold">BENCHMARK SCORE</div>
                    <div className="text-lg font-bold text-[#3B82F6] mt-1">94.8 / 100</div>
                    <div className="text-[10px] text-emerald-400 mt-1">Top Tier Tier-1 Readiness</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600 pt-2 border-t border-slate-800">
                  <span className="text-slate-700">Weekly campus-wide leaderboards &amp; proctored contests</span>
                  <span className="text-emerald-400 font-bold">100% Proctored</span>
                </div>
              </div>
            </div>
          </div>

          {/* ──────────────────────────────────────────────────────────
              STAGE 03: BUILD (Projects + Portfolios)
              ────────────────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 flex items-center gap-6 lg:sticky lg:top-36">
              <div className="flex flex-col items-center">
                <div className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                  activeStage >= 2 ? 'border-[#2563EB] bg-[#2563EB] ring-4 ring-[#2563EB]/20' : 'border-slate-600 bg-[#F8F9FB]'
                }`} />
                <div className="w-0.5 h-56 bg-slate-800 my-2 hidden lg:block" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] block mb-1">
                  Stage 03
                </span>
                <h3 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold transition-colors duration-300 ${
                  activeStage === 2 ? 'text-slate-900' : 'text-slate-500'
                }`}>
                  Build
                </h3>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-8">
              <div>
                <p className="text-lg sm:text-xl text-slate-900 font-medium leading-relaxed mb-5">
                  {stages[2].subtitle}
                </p>

                <ul className="space-y-3 text-sm text-slate-700 mb-6">
                  {stages[2].bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <span className="text-[#2563EB] font-bold text-base">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-4">
                  {stages[2].metrics.map((m) => (
                    <div key={m.label} className="p-4 rounded-xl bg-white shadow-sm border border-black/8 min-w-[140px]">
                      <div className="text-xl font-bold text-slate-900">{m.value}</div>
                      <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mt-0.5">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cloud Architecture & GitHub Deploy Card */}
              <div className="rounded-2xl bg-[#0D131F] border border-slate-800 p-5 sm:p-6 shadow-2xl">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="font-mono text-slate-700 font-bold">github.com/grow360-cohort/microservices-platform</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                    Deployed to AWS
                  </span>
                </div>

                <div className="grid sm:grid-cols-3 gap-3 text-xs mb-4">
                  <div className="p-3.5 rounded-xl bg-[#090D15] border border-slate-800">
                    <div className="text-slate-600 text-[10px] font-bold">API GATEWAY</div>
                    <div className="text-sm font-bold text-slate-900 mt-1">Next.js App Router</div>
                    <div className="text-[10px] text-emerald-400 mt-1">✓ 100% Type-Safe</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#090D15] border border-slate-800">
                    <div className="text-slate-600 text-[10px] font-bold">CORE BACKEND</div>
                    <div className="text-sm font-bold text-slate-900 mt-1">Spring Boot 3 + Redis</div>
                    <div className="text-[10px] text-cyan-400 mt-1">✓ Kafka Event Streams</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#090D15] border border-slate-800">
                    <div className="text-slate-600 text-[10px] font-bold">DATABASE LAYER</div>
                    <div className="text-sm font-bold text-slate-900 mt-1">PostgreSQL Shards</div>
                    <div className="text-[10px] text-[#3B82F6] mt-1">✓ ACID Guaranteed</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600 pt-2 border-t border-slate-800">
                  <span className="text-slate-700">Reviewed by Staff Engineers at Google &amp; Adobe</span>
                  <span className="text-emerald-400 font-bold">Production Approved</span>
                </div>
              </div>
            </div>
          </div>

          {/* ──────────────────────────────────────────────────────────
              STAGE 04: PREPARE (Mock Interviews)
              ────────────────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 flex items-center gap-6 lg:sticky lg:top-36">
              <div className="flex flex-col items-center">
                <div className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                  activeStage >= 3 ? 'border-[#2563EB] bg-[#2563EB] ring-4 ring-[#2563EB]/20' : 'border-slate-600 bg-[#F8F9FB]'
                }`} />
                <div className="w-0.5 h-56 bg-slate-800 my-2 hidden lg:block" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] block mb-1">
                  Stage 04
                </span>
                <h3 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold transition-colors duration-300 ${
                  activeStage === 3 ? 'text-slate-900' : 'text-slate-500'
                }`}>
                  Prepare
                </h3>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-8">
              <div>
                <p className="text-lg sm:text-xl text-slate-900 font-medium leading-relaxed mb-5">
                  {stages[3].subtitle}
                </p>

                <ul className="space-y-3 text-sm text-slate-700 mb-6">
                  {stages[3].bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <span className="text-[#2563EB] font-bold text-base">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-4">
                  {stages[3].metrics.map((m) => (
                    <div key={m.label} className="p-4 rounded-xl bg-white shadow-sm border border-black/8 min-w-[140px]">
                      <div className="text-xl font-bold text-slate-900">{m.value}</div>
                      <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mt-0.5">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mock Interview Simulation Card */}
              <div className="rounded-2xl bg-[#0D131F] border border-slate-800 p-5 sm:p-6 shadow-2xl">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4 text-xs">
                  <span className="px-2.5 py-1 rounded bg-[#1E3A8A]/50 text-[#60A5FA] font-bold uppercase text-[10px] tracking-wider">
                    MOCK INTERVIEW
                  </span>
                  <div className="flex items-center gap-1.5 text-rose-400 font-mono text-xs">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                    <span>Live · 18:42</span>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-5">
                  <div className="p-4 rounded-xl bg-[#090D15] border border-slate-800 flex flex-col justify-between min-h-[140px]">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-full bg-slate-300 flex items-center justify-center text-slate-800 text-xs font-bold">
                        👤
                      </div>
                      <span className="text-xs font-bold text-slate-600">Interviewer (Staff Engineer)</span>
                    </div>
                    <div className="text-xs text-slate-700 bg-[#111827] p-2.5 rounded-lg border border-slate-800 leading-relaxed italic">
                      "Walk me through your approach to binary search on answer space."
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#090D15] border border-slate-800 flex flex-col justify-between min-h-[140px]">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-full bg-[#2563EB] flex items-center justify-center text-slate-900 text-xs font-bold">
                        🎓
                      </div>
                      <span className="text-xs font-bold text-slate-600">You (Student)</span>
                    </div>
                    <div className="text-xs text-slate-700 bg-[#111827] p-2.5 rounded-lg border border-slate-800 leading-relaxed italic">
                      "I'd set lo/hi on the answer space, then check feasibility with mid in O(N)..."
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-3 text-center text-xs">
                  <div className="p-2.5 rounded-xl bg-[#0B251E] border border-emerald-500/20 text-emerald-400">
                    <div className="text-[10px] font-mono text-slate-600 uppercase">Clarity</div>
                    <div className="text-sm font-bold">9/10</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#0F2033] border border-cyan-500/20 text-cyan-400">
                    <div className="text-[10px] font-mono text-slate-600 uppercase">DSA Depth</div>
                    <div className="text-sm font-bold">8.5/10</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#2E200F] border border-[#2563EB]/20 text-[#3B82F6]">
                    <div className="text-[10px] font-mono text-slate-600 uppercase">STAR Format</div>
                    <div className="text-sm font-bold">Excellent</div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-600 text-center font-medium pt-2 border-t border-slate-800">
                  Mentor note: Strong fundamentals. Practice high-scale distributed caching next.
                </div>
              </div>
            </div>
          </div>

          {/* ──────────────────────────────────────────────────────────
              STAGE 05: IMPROVE (AI Feedback + Mentor Feedback)
              ────────────────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 flex items-center gap-6 lg:sticky lg:top-36">
              <div className="flex flex-col items-center">
                <div className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                  activeStage >= 4 ? 'border-[#2563EB] bg-[#2563EB] ring-4 ring-[#2563EB]/20' : 'border-slate-600 bg-[#F8F9FB]'
                }`} />
                <div className="w-0.5 h-56 bg-slate-800 my-2 hidden lg:block" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] block mb-1">
                  Stage 05
                </span>
                <h3 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold transition-colors duration-300 ${
                  activeStage === 4 ? 'text-slate-900' : 'text-slate-500'
                }`}>
                  Improve
                </h3>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-8">
              <div>
                <p className="text-lg sm:text-xl text-slate-900 font-medium leading-relaxed mb-5">
                  {stages[4].subtitle}
                </p>

                <ul className="space-y-3 text-sm text-slate-700 mb-6">
                  {stages[4].bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <span className="text-[#2563EB] font-bold text-base">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-4">
                  {stages[4].metrics.map((m) => (
                    <div key={m.label} className="p-4 rounded-xl bg-white shadow-sm border border-black/8 min-w-[140px]">
                      <div className="text-xl font-bold text-slate-900">{m.value}</div>
                      <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mt-0.5">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Diagnostics & Scorecard */}
              <div className="rounded-2xl bg-[#0D131F] border border-slate-800 p-5 sm:p-6 shadow-2xl space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                  <div className="flex items-center gap-2">
                    <Cpu size={14} className="text-[#EC4899]" />
                    <span className="font-bold text-slate-900 uppercase text-[10px] tracking-wider">
                      AI &amp; MENTOR DIAGNOSTICS DASHBOARD
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-pink-950/60 text-pink-400 text-[10px] font-bold border border-pink-500/30">
                    Analysis Complete
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-[#090D15] border border-slate-800">
                    <div className="text-[10px] text-slate-600 uppercase font-bold">Speech Clarity Index</div>
                    <div className="text-xl font-extrabold text-emerald-400 mt-1">94%</div>
                    <div className="text-[10px] text-slate-600 mt-0.5">Pace: 135 WPM (Optimal)</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#090D15] border border-slate-800">
                    <div className="text-[10px] text-slate-600 uppercase font-bold">Resume ATS Score</div>
                    <div className="text-xl font-extrabold text-cyan-400 mt-1">96 / 100</div>
                    <div className="text-[10px] text-slate-600 mt-0.5">Keywords: 100% Matched</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#080B11] border border-slate-800 text-xs">
                  <div className="text-[11px] font-bold text-slate-900 mb-1">Mentor Growth Recommendation:</div>
                  <p className="text-[11px] text-slate-700 leading-relaxed">
                    "Solid understanding of asynchronous concurrency. Emphasize impact metrics and latency reduction in capstone project walkthroughs."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ──────────────────────────────────────────────────────────
              STAGE 06: INTERVIEW (Campus Hiring Drives)
              ────────────────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 flex items-center gap-6 lg:sticky lg:top-36">
              <div className="flex flex-col items-center">
                <div className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                  activeStage >= 5 ? 'border-[#2563EB] bg-[#2563EB] ring-4 ring-[#2563EB]/20' : 'border-slate-600 bg-[#F8F9FB]'
                }`} />
                <div className="w-0.5 h-56 bg-slate-800 my-2 hidden lg:block" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] block mb-1">
                  Stage 06
                </span>
                <h3 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold transition-colors duration-300 ${
                  activeStage === 5 ? 'text-slate-900' : 'text-slate-500'
                }`}>
                  Interview
                </h3>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-8">
              <div>
                <p className="text-lg sm:text-xl text-slate-900 font-medium leading-relaxed mb-5">
                  {stages[5].subtitle}
                </p>

                <ul className="space-y-3 text-sm text-slate-700 mb-6">
                  {stages[5].bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <span className="text-[#2563EB] font-bold text-base">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-4">
                  {stages[5].metrics.map((m) => (
                    <div key={m.label} className="p-4 rounded-xl bg-white shadow-sm border border-black/8 min-w-[140px]">
                      <div className="text-xl font-bold text-slate-900">{m.value}</div>
                      <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mt-0.5">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Campus Drive Pipeline Card */}
              <div className="rounded-2xl bg-[#0D131F] border border-slate-800 p-5 sm:p-6 shadow-2xl">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4 text-xs">
                  <div className="flex items-center gap-2">
                    <Building2 size={14} className="text-[#10B981]" />
                    <span className="px-2.5 py-1 rounded bg-emerald-950/60 text-emerald-400 font-bold uppercase text-[10px] tracking-wider border border-emerald-500/30">
                      CAMPUS HIRING DRIVE
                    </span>
                  </div>
                  <span className="text-slate-600 font-mono text-xs">Phase 03 Active</span>
                </div>

                <div className="grid sm:grid-cols-3 gap-3 text-xs mb-4">
                  <div className="p-3 rounded-xl bg-[#080B11] border border-slate-800">
                    <div className="text-slate-600 text-[10px] uppercase font-bold">Applied</div>
                    <div className="text-xl font-bold text-slate-900 mt-1">420</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Online Assessment</div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#080B11] border border-slate-800">
                    <div className="text-slate-600 text-[10px] uppercase font-bold">Shortlisted</div>
                    <div className="text-xl font-bold text-[#3B82F6] mt-1">96</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Tech Interview Panels</div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#080B11] border border-slate-800">
                    <div className="text-slate-600 text-[10px] uppercase font-bold">Offers Rolled</div>
                    <div className="text-xl font-bold text-emerald-400 mt-1">38</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Avg: ₹8.4 LPA</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600 pt-2 border-t border-slate-800">
                  <span className="text-slate-700 font-semibold">Tier-1 Drives Executed This Season</span>
                  <span className="text-[#3B82F6] font-bold">100% Verified</span>
                </div>
              </div>
            </div>
          </div>

          {/* ──────────────────────────────────────────────────────────
              STAGE 07: GET PLACED (Offer Letter)
              ────────────────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 flex items-center gap-6 lg:sticky lg:top-36">
              <div className="flex flex-col items-center">
                <div className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                  activeStage >= 6 ? 'border-emerald-400 bg-emerald-400 ring-4 ring-emerald-400/20' : 'border-slate-600 bg-[#F8F9FB]'
                }`} />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                  Stage 07
                </span>
                <h3 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold transition-colors duration-300 ${
                  activeStage === 6 ? 'text-slate-900' : 'text-slate-500'
                }`}>
                  Get Placed
                </h3>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-8">
              <div>
                <p className="text-lg sm:text-xl text-slate-900 font-medium leading-relaxed mb-5">
                  {stages[6].subtitle}
                </p>

                <ul className="space-y-3 text-sm text-slate-700 mb-6">
                  {stages[6].bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <span className="text-emerald-400 font-bold text-base">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-4">
                  {stages[6].metrics.map((m) => (
                    <div key={m.label} className="p-4 rounded-xl bg-white shadow-sm border border-black/8 min-w-[140px]">
                      <div className="text-xl font-bold text-emerald-400">{m.value}</div>
                      <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mt-0.5">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Offer Letter Verification Card */}
              <div className="rounded-2xl bg-gradient-to-br from-[#0D1F17] to-[#0A130F] border border-emerald-500/30 p-5 sm:p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20 text-xs">
                  <div className="flex items-center gap-2">
                    <Award size={16} className="text-emerald-400" />
                    <span className="font-bold text-emerald-300 uppercase text-[11px] tracking-wider">
                      SIGNED OFFER LETTER CONFIRMATION
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-400/30">
                    100% Verified
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[#06120D] border border-emerald-500/30 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Position:</span>
                    <span className="font-bold text-slate-900">Full-Stack Software Development Engineer</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Compensation (CTC):</span>
                    <span className="font-extrabold text-emerald-400 text-sm">₹12.50 LPA</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Joining Status:</span>
                    <span className="text-cyan-300 font-semibold">Offer Accepted &amp; Verified</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-700 pt-2 border-t border-emerald-500/20">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <FileCheck size={14} />
                    Signed &amp; Transition Support Active
                  </span>
                  <span className="text-slate-600">Cohort 2026</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Action Button */}
        <div className="mt-24 text-center">
          <button
            onClick={() => openEnquiry('CONSULTATION')}
            className="btn-pill-primary cursor-pointer active:scale-95 text-xs py-3.5 px-8 inline-flex items-center gap-2 shadow-xl shadow-[#2563EB]/20"
          >
            <span>Deploy This Infrastructure on Campus</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </section>
  );
}
