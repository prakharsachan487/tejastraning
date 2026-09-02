import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Phone,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Calendar,
  Layers,
  Code2,
  Cpu,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useEnquiry } from '../context/EnquiryContext';

interface ProfileEvaluationPageProps {
  onBackToHome: () => void;
}

export function ProfileEvaluationPage({ onBackToHome }: ProfileEvaluationPageProps) {
  const { user } = useAuth();
  const { openEnquiry } = useEnquiry();

  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'roadmap' | 'mentors'>('overview');
  const [selectedTrack, setSelectedTrack] = useState<'backend' | 'fullstack' | 'ai-systems'>('backend');

  // Dynamic user name
  const userName = user?.name ? user.name.split(' ')[0].toUpperCase() : 'ENGINEER';
  const fullName = user?.name || 'Aspiring Tech Lead';

  // Dynamic readiness score calculations
  const readinessScore = selectedTrack === 'backend' ? 76 : selectedTrack === 'fullstack' ? 72 : 81;
  const percentile = selectedTrack === 'backend' ? 84 : selectedTrack === 'fullstack' ? 79 : 91;

  const skillPillars = [
    { name: 'Core DSA & Algorithms', score: 82, benchmark: 88, status: 'Strong' },
    { name: 'System Architecture & LLD', score: 68, benchmark: 85, status: 'High Priority Gap' },
    { name: 'AI Code Acceleration & LLM Tooling', score: 74, benchmark: 80, status: 'Growing' },
    { name: 'Production Database & Caching', score: 70, benchmark: 82, status: 'Moderate Gap' },
    { name: 'Live Mock Drive & Communication', score: 78, benchmark: 85, status: 'Good' },
  ];

  const matchedMentors = [
    {
      name: 'Aditya Verma',
      company: 'Meta',
      role: 'Staff Systems Architect',
      exp: '9+ yrs exp',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      tag: 'Distributed Systems & Concurrency',
    },
    {
      name: 'Rohan Deshmukh',
      company: 'Google',
      role: 'Senior SWE (L5)',
      exp: '7+ yrs exp',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      tag: 'Algorithms & Dynamic Programming',
    },
    {
      name: 'Pooja Sundaram',
      company: 'Deloitte Digital',
      role: 'Lead Cloud Architect',
      exp: '8+ yrs exp',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      tag: 'Microservices & Enterprise Scale',
    },
  ];

  const roadmapPhases = [
    {
      phase: 'Phase 01',
      title: 'Foundation & Concurrency Mastery',
      duration: 'Weeks 1 - 4',
      milestones: [
        'Advanced Concurrency, Thread Pools & Lock-Free Data Structures',
        'Complex Dynamic Programming & Graph Network Flow Patterns',
        'Production Clean Code & SOLID Refactoring Labs',
      ],
      impact: '+12% System Score',
    },
    {
      phase: 'Phase 02',
      title: 'Distributed Systems & AI-Assisted Architecture',
      duration: 'Weeks 5 - 8',
      milestones: [
        'Designing High-Throughput Message Brokers (Kafka / RabbitMQ)',
        'Distributed Caching (Redis Cluster) & Cache Invalidation Strategies',
        'Leveraging AI Copilots for 5x Faster Unit Test & Schema Generation',
      ],
      impact: '+18% Architecture Score',
    },
    {
      phase: 'Phase 03',
      title: 'Mock Drives, Resume & Tier-1 Conversions',
      duration: 'Weeks 9 - 12',
      milestones: [
        '3 Mandatory Live 1-on-1 Mock Drives with Google & Meta Mentors',
        'ATS-Optimized Capstone Showcase & Production GitHub Portfolios',
        'Offer Negotiation Strategy & Multi-Offer Closing Playbook',
      ],
      impact: 'Placement Ready (Top 5% Band)',
    },
  ];

  return (
    <div className="min-h-screen bg-[#070B16] text-slate-100 font-sans selection:bg-[#2563EB] selection:text-white pb-24 relative overflow-hidden">
      {/* Background ambient gradient spheres */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-[#1D4ED8]/20 via-[#2563EB]/10 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[140px] pointer-events-none" />

      {/* Top Breadcrumb Header Bar */}
      <div className="border-b border-white/8 bg-[#090E1F]/90 backdrop-blur-xl sticky top-16 md:top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>← Back to Home</span>
            </button>
            <span className="text-slate-600">/</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[11px] font-mono font-semibold">
              <Sparkles size={11} />
              <span>CAREER PROFILE EVALUATION</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Track Switcher */}
            <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/10 text-xs">
              <button
                onClick={() => setSelectedTrack('backend')}
                className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                  selectedTrack === 'backend' ? 'bg-[#2563EB] text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Backend
              </button>
              <button
                onClick={() => setSelectedTrack('fullstack')}
                className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                  selectedTrack === 'fullstack' ? 'bg-[#2563EB] text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Full Stack
              </button>
              <button
                onClick={() => setSelectedTrack('ai-systems')}
                className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                  selectedTrack === 'ai-systems' ? 'bg-[#2563EB] text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                AI &amp; Data
              </button>
            </div>

            <button
              onClick={() => openEnquiry('CAREER_EVALUATION')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-semibold transition-all cursor-pointer"
            >
              <Calendar size={13} className="text-blue-400" />
              <span>Book 1:1 Call</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        {/* ========================================================
            HERO EVALUATION SECTION (Banner + Circular Score Dial)
        ======================================================== */}
        <div className="relative rounded-3xl bg-gradient-to-br from-[#0D152C] via-[#0B1124] to-[#080D1A] border border-blue-500/20 p-6 sm:p-10 lg:p-12 shadow-2xl overflow-hidden mb-12">
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-blue-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  CONFIDENTIAL CAREER DIAGNOSTIC REPORT • {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase()}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-[family-name:var(--font-display)] leading-tight">
                Hey {userName},<br />
                Become an AI-Powered{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-400">
                  10× {selectedTrack === 'backend' ? 'Backend' : selectedTrack === 'fullstack' ? 'Full Stack' : 'AI Systems'} Engineer.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
                Your diagnostic rubric based on 120+ Tier-1 hiring benchmarks. The industry shifts in AI systems you can&apos;t ignore and your fastest tailored trajectory to placement.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <button
                  onClick={() => openEnquiry('CAREER_EVALUATION')}
                  className="btn-pill-primary py-3.5 px-6 text-xs sm:text-sm font-bold flex items-center justify-center gap-2.5 shadow-xl shadow-blue-600/30 cursor-pointer group"
                >
                  <Phone size={15} className="group-hover:rotate-12 transition-transform" />
                  <span>BOOK FREE 1:1 CAREER CALL</span>
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById('report-chapters');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs sm:text-sm font-semibold text-slate-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Explore Chapters</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              {/* Meta information tags */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 pt-3 text-[11px] font-mono text-slate-400 border-t border-white/8">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  30 MIN CALL
                </span>
                <span>•</span>
                <span>100% FREE</span>
                <span>•</span>
                <span>SENIOR CORPORATE CONSULTANT</span>
                <span>•</span>
                <span>5 MIN READ (6 CHAPTERS)</span>
              </div>
            </div>

            {/* Right Content: Circular Score Dial (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full p-2 bg-gradient-to-tr from-blue-600/30 via-indigo-500/20 to-sky-400/30 border border-white/10 flex items-center justify-center shadow-2xl backdrop-blur-md">
                {/* Outer decorative orbit ring */}
                <div className="absolute inset-3 rounded-full border border-dashed border-blue-400/30 animate-[spin_60s_linear_infinite]" />

                {/* Inner Dial Container */}
                <div className="w-52 h-52 sm:w-56 sm:h-56 rounded-full bg-[#090E1F] border border-blue-500/40 flex flex-col items-center justify-center text-center p-4 shadow-inner relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none" />

                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                    Career &amp; AI Readiness
                  </span>

                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl sm:text-6xl font-black text-white font-[family-name:var(--font-display)] tracking-tight">
                      {readinessScore}
                    </span>
                    <span className="text-sm font-semibold text-blue-400">/100</span>
                  </div>

                  <div className="mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-semibold">
                    <TrendingUp size={11} />
                    <span>Top {percentile}% of Peers</span>
                  </div>

                  <span className="text-[9px] text-slate-500 font-mono mt-2">
                    Evaluated for {fullName}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-400 text-center mt-4 max-w-xs font-mono">
                Benchmark calibrated against Google, Meta, and Deloitte campus drive standards.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-white/10 mb-8 overflow-x-auto no-scrollbar gap-2 sm:gap-4">
          {[
            { id: 'overview', label: '01. Diagnostic Overview' },
            { id: 'skills', label: '02. Skill Gap Benchmark' },
            { id: 'roadmap', label: '03. 12-Week Sprint Roadmap' },
            { id: 'mentors', label: '04. Matched Industry Mentors' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3.5 px-2 text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap relative ${
                activeTab === tab.id
                  ? 'text-blue-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>{tab.label}</span>
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeEvaluationTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                />
              )}
            </button>
          ))}
        </div>

        {/* ========================================================
            TAB 1: DIAGNOSTIC OVERVIEW
        ======================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-8" id="report-chapters">
            {/* Chapter 01: Core Diagnostic Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-2xl bg-[#0C1224] border border-white/10 p-6 space-y-3 hover:border-blue-500/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <Code2 size={20} />
                </div>
                <h3 className="text-base font-bold text-white font-[family-name:var(--font-display)]">
                  Algorithmic Depth (DSA)
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Strong grasp of array manipulations and tree traversals. Growth needed in concurrency synchronization and dynamic programming graphs.
                </p>
                <div className="pt-2 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Tier-1 Fit:</span>
                  <span className="text-emerald-400 font-bold">82% (Strong)</span>
                </div>
              </div>

              <div className="rounded-2xl bg-[#0C1224] border border-white/10 p-6 space-y-3 hover:border-blue-500/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Layers size={20} />
                </div>
                <h3 className="text-base font-bold text-white font-[family-name:var(--font-display)]">
                  System Design &amp; LLD
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Solid understanding of REST APIs. High-priority focus area: microservice communication, Redis distributed caching, and database indexing.
                </p>
                <div className="pt-2 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Tier-1 Fit:</span>
                  <span className="text-amber-400 font-bold">68% (Target Gap)</span>
                </div>
              </div>

              <div className="rounded-2xl bg-[#0C1224] border border-white/10 p-6 space-y-3 hover:border-blue-500/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                  <Cpu size={20} />
                </div>
                <h3 className="text-base font-bold text-white font-[family-name:var(--font-display)]">
                  AI-Powered Acceleration
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Ability to utilize LLMs for debugging and automated schema design. Ready for production-grade prompt pipelines and automated unit testing.
                </p>
                <div className="pt-2 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Tier-1 Fit:</span>
                  <span className="text-blue-400 font-bold">74% (Modern 10x Band)</span>
                </div>
              </div>
            </div>

            {/* Chapter 02: What a 10x Engineer Looks Like in 2026 */}
            <div className="rounded-3xl bg-gradient-to-b from-[#0D1429] to-[#090E1F] border border-white/10 p-6 sm:p-10 space-y-6">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-blue-400 font-bold tracking-wider uppercase">
                  CHAPTER 02 • THE 10X PARADIGM SHIFT
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-[family-name:var(--font-display)]">
                What a 10× Software Engineer actually looks like in 2026
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed">
                The bar for software engineers has permanently elevated. Rote memorization of LeetCode is no longer sufficient. Top product companies prioritize engineers who master AI-assisted workflows, production observability, and distributed fault tolerance.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white/5 border border-white/8 space-y-2">
                  <span className="text-xs font-bold text-blue-300 font-mono">01. Architecture Over Syntax</span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    AI writes boilerplate syntax. You design fault-tolerant pipelines, idempotent APIs, and clean domain schemas.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/8 space-y-2">
                  <span className="text-xs font-bold text-indigo-300 font-mono">02. 5× Faster Velocity</span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Harnessing automated testing agents, semantic code search, and instant containerized deployment loops.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/8 space-y-2">
                  <span className="text-xs font-bold text-sky-300 font-mono">03. Production Rigor</span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Zero-downtime database migrations, distributed tracing with OpenTelemetry, and resilient circuit breakers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: SKILL GAP BENCHMARK
        ======================================================== */}
        {activeTab === 'skills' && (
          <div className="rounded-3xl bg-[#0D1429] border border-white/10 p-6 sm:p-10 space-y-8">
            <div>
              <span className="text-xs font-mono text-blue-400 font-bold uppercase tracking-wider">
                CHAPTER 03 • TIER-1 INDUSTRY BENCHMARK
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-[family-name:var(--font-display)] mt-1">
                Your Skills vs. Target Hiring Benchmark
              </h2>
              <p className="text-sm text-slate-300 mt-2 max-w-2xl">
                Visualizing where you currently stand against real requirements from hiring committees at Google, Meta, Amazon, and top startups.
              </p>
            </div>

            <div className="space-y-6">
              {skillPillars.map((pillar, idx) => (
                <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/8 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-blue-400 font-bold">0{idx + 1}.</span>
                      <span className="text-sm font-bold text-white">{pillar.name}</span>
                    </div>
                    <span className={`text-xs font-mono px-2.5 py-0.5 rounded-full border ${
                      pillar.status.includes('Strong')
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                        : pillar.status.includes('Target Gap') || pillar.status.includes('High Priority')
                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                        : 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                    }`}>
                      {pillar.status}
                    </span>
                  </div>

                  {/* Progress Bar with Current vs Benchmark markers */}
                  <div className="space-y-1.5">
                    <div className="h-3 w-full bg-slate-800 rounded-full relative overflow-hidden">
                      {/* Current Score Bar */}
                      <div
                        className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full transition-all duration-1000"
                        style={{ width: `${pillar.score}%` }}
                      />
                    </div>

                    <div className="flex justify-between text-[11px] font-mono text-slate-400 pt-1">
                      <span>Your Score: <strong className="text-white">{pillar.score}%</strong></span>
                      <span>Target Hiring Threshold: <strong className="text-blue-400">{pillar.benchmark}%</strong></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-2xl bg-blue-600/10 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-white">Bridge your system architecture gap with 1-on-1 mentorship.</h4>
                <p className="text-xs text-slate-300 mt-0.5">Schedule a diagnostic call to receive custom practice rubrics and mock drives.</p>
              </div>
              <button
                onClick={() => openEnquiry('CAREER_EVALUATION')}
                className="btn-pill-primary py-2.5 px-5 text-xs font-bold shrink-0 cursor-pointer shadow-md"
              >
                Schedule 1:1 Review
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 3: 12-WEEK SPRINT ROADMAP
        ======================================================== */}
        {activeTab === 'roadmap' && (
          <div className="rounded-3xl bg-[#0D1429] border border-white/10 p-6 sm:p-10 space-y-8">
            <div>
              <span className="text-xs font-mono text-blue-400 font-bold uppercase tracking-wider">
                CHAPTER 04 • TAILORED ROADMAP
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-[family-name:var(--font-display)] mt-1">
                Your 12-Week Fast-Track Sprint to Top Offers
              </h2>
              <p className="text-sm text-slate-300 mt-2 max-w-2xl">
                Engineered for maximum interview impact with zero time wasted on obsolete curriculum.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {roadmapPhases.map((phase, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-white/5 border border-white/10 p-6 flex flex-col justify-between space-y-5 hover:border-blue-500/40 transition-all hover:-translate-y-1"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-blue-400">{phase.phase}</span>
                      <span className="text-[11px] font-mono text-slate-400 px-2 py-0.5 rounded bg-white/5 border border-white/10">
                        {phase.duration}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white font-[family-name:var(--font-display)] leading-snug">
                      {phase.title}
                    </h3>

                    <ul className="space-y-2.5 pt-2">
                      {phase.milestones.map((m, mIdx) => (
                        <li key={mIdx} className="text-xs text-slate-300 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Target Outcome:</span>
                    <span className="text-emerald-400 font-bold">{phase.impact}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-4">
              <button
                onClick={() => openEnquiry('CAREER_ROADMAP')}
                className="btn-pill-primary py-3 px-8 text-xs sm:text-sm font-bold shadow-lg shadow-blue-600/30 cursor-pointer"
              >
                Enroll in Structured 12-Week Cohort
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 4: MATCHED INDUSTRY MENTORS
        ======================================================== */}
        {activeTab === 'mentors' && (
          <div className="rounded-3xl bg-[#0D1429] border border-white/10 p-6 sm:p-10 space-y-8">
            <div>
              <span className="text-xs font-mono text-blue-400 font-bold uppercase tracking-wider">
                CHAPTER 05 • 1-ON-1 MENTOR MATCHES
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-[family-name:var(--font-display)] mt-1">
                Mentors Matched to Your Specific Target Focus
              </h2>
              <p className="text-sm text-slate-300 mt-2 max-w-2xl">
                Practice 1-on-1 mock technical interviews and resume teardowns with practitioners currently building production systems at top tech firms.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {matchedMentors.map((mentor, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-white/5 border border-white/10 p-6 flex flex-col justify-between space-y-4 hover:border-blue-500/40 transition-colors"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-3.5">
                      <img
                        src={mentor.avatar}
                        alt={mentor.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-blue-500/40"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-white">{mentor.name}</h4>
                        <div className="flex items-center gap-1.5 text-xs text-blue-400 font-medium">
                          <span>{mentor.company}</span>
                          <span>•</span>
                          <span className="text-slate-400 font-mono text-[10px]">{mentor.exp}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 font-normal">
                      {mentor.role}
                    </p>

                    <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[11px] font-mono text-blue-300">
                      ⚡ Focus: {mentor.tag}
                    </div>
                  </div>

                  <button
                    onClick={() => openEnquiry('MENTOR_MOCK_DRIVE')}
                    className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-blue-600 text-xs font-bold text-white transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Book Mock Technical Drive</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ========================================================
          STICKY BOTTOM ASSISTANCE BAR (Matching reference screenshot)
      ======================================================== */}
      <div className="fixed bottom-0 inset-x-0 bg-[#060913]/95 backdrop-blur-md border-t border-white/10 py-3.5 px-4 z-50 shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2.5 text-xs text-slate-300">
            <span className="font-bold text-white font-mono">Need help reviewing your evaluation?</span>
            <span className="hidden md:inline text-slate-400">Talk to our senior engineering mentors at</span>
            <a href="tel:08047399623" className="font-bold text-blue-400 hover:underline font-mono">
              +91 80473 99623
            </a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => openEnquiry('INSTANT_CALLBACK')}
              className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white shadow-md transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>Request Instant Callback</span>
              <ExternalLink size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
