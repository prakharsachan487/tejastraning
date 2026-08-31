import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  ChevronDown, 
  Code2, 
  ArrowLeft,
  Video,
  Layers,
  Terminal,
  Compass,
  Star,
  FileCode
} from 'lucide-react';
import { MentorJobPortal } from './MentorJobPortal';
import { Footer } from './Footer';

interface MentorPageProps {
  onBackToHome: () => void;
}

const steps = [
  {
    step: '01',
    badgeColor: '#FF4500',
    title: 'Submit your application',
    desc: 'Fill our 2-minute form with your LinkedIn profile, current organization, and areas of engineering expertise.',
  },
  {
    step: '02',
    badgeColor: '#38BDF8',
    title: 'Short 15-min sync',
    desc: 'An informal video chat with our developer relations team to understand your preferred domains and calendar bandwidth.',
  },
  {
    step: '03',
    badgeColor: '#FBBF24',
    title: 'Introductory mentor kit',
    desc: 'Receive our structured mock question bank, live browser IDE access, and rubric scoring sheets.',
  },
  {
    step: '04',
    badgeColor: '#22C55E',
    title: 'Start mentoring & earning',
    desc: 'Open your preferred time slots on your calendar. Conduct mock interviews and receive direct weekly honorariums.',
  },
];

const responsibilities = [
  {
    icon: Code2,
    title: '1-on-1 Technical Mock Interviews',
    badge: 'Core Responsibility',
    desc: 'Simulate high-bar FAANG and tier-1 product startup technical interviews with real-time algorithmic problem solving.',
    meta: '45–60 mins per session',
  },
  {
    icon: Layers,
    title: 'System Design & Code Architecture',
    badge: 'Architecture',
    desc: 'Review distributed systems case studies, database sharding models, and microservice projects built by campus students.',
    meta: 'High-depth technical feedback',
  },
  {
    icon: Video,
    title: 'Weekend Live Masterclasses & AMAs',
    badge: 'Community',
    desc: 'Deliver 60-minute cohort webinars sharing engineering war stories, production debugging tips, and career strategies.',
    meta: 'Flexible weekend scheduling',
  },
  {
    icon: FileCode,
    title: 'Placement Readiness Evaluation',
    badge: 'Diagnostic',
    desc: 'Evaluate student code performance, problem-solving speed, and communication depth using TEJAS scoring rubrics.',
    meta: 'Structured rubric provided',
  },
];

const benefits = [
  {
    num: '01',
    title: 'Competitive Honorarium',
    desc: 'Get compensated with high hourly payouts (₹2,500 – ₹6,000 per session) credited directly to your bank account weekly.',
    accent: '#FF4500',
  },
  {
    num: '02',
    title: 'Own Your Schedule',
    desc: '100% calendar autonomy. Mentor 2 hours on a Sunday or 4 hours a month. Zero lock-in and zero micro-management.',
    accent: '#38BDF8',
  },
  {
    num: '03',
    title: 'Give Back to the Community',
    desc: 'Directly empower ambitious engineers from tier-2 and tier-3 engineering colleges who lack direct access to senior tech mentors.',
    accent: '#F59E0B',
  },
  {
    num: '04',
    title: 'Grow Your Leadership Network',
    desc: 'Join an exclusive private guild of senior engineers, tech leads, and engineering managers from top tech firms.',
    accent: '#8B5CF6',
  },
];

const expectations = [
  {
    title: 'Real-world Engineering Insight',
    desc: 'Share how production code is actually written, what engineering managers test for in final rounds, and how to structure scalable solutions.',
    icon: Terminal,
  },
  {
    title: 'Constructive & Honest Feedback',
    desc: 'Pinpoint algorithmic bottlenecks, weak communication spots, and actionable steps students need to take to convert offers.',
    icon: Compass,
  },
  {
    title: 'Empathy & Confidence Building',
    desc: 'Many students have the technical capability but struggle with interview anxiety. A supportive mentor transforms their trajectory.',
    icon: Star,
  },
];

const fellowMentors = [
  {
    name: 'Ritik Ramuka',
    company: 'DocuSign',
    role: 'Software Engineer II · Ex-Microsoft',
    rating: '4.95',
    sessions: '65+ Sessions',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    color: '#4C6EF5',
  },
  {
    name: 'Apoorv Kumar',
    company: 'Google',
    role: 'Software Engineer · Codeforces GM',
    rating: '4.98',
    sessions: '90+ Sessions',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    color: '#4285F4',
  },
  {
    name: 'Karan Singh',
    company: 'Adobe',
    role: 'System Architect · 8+ Yrs Exp',
    rating: '4.92',
    sessions: '50+ Sessions',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    color: '#FF0000',
  },
  {
    name: 'Neha Sharma',
    company: 'Amazon',
    role: 'Senior SDE · Distributed Systems',
    rating: '4.97',
    sessions: '75+ Sessions',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    color: '#FF9900',
  },
];

const faqs = [
  {
    q: 'How long does the mentor onboarding process take?',
    a: 'The entire process takes less than 48 hours. After you submit your LinkedIn profile and domain interests, we schedule a brief 15-minute sync, set up your calendar portal, and you can start accepting mock sessions immediately.',
  },
  {
    q: 'How much time commitment is required per week?',
    a: 'There is zero minimum commitment. You have complete flexibility to open slots that fit your schedule—whether it is 1 hour on a Saturday morning or 3 hours across the week.',
  },
  {
    q: 'What is the honorarium and how are payouts processed?',
    a: 'Mentors receive attractive hourly honorariums (₹2,500 to ₹6,000 per session depending on domain and seniority). Payouts are automatically computed and transferred directly to your bank account on a weekly cycle.',
  },
  {
    q: 'Do I need prior coaching experience?',
    a: 'No prior coaching experience is required. As long as you have cleared tech interviews at reputable companies and have 1+ years of software engineering experience, our structured rubrics and question kits will guide you through conducting flawless mock sessions.',
  },
  {
    q: 'What tools and IDE are used for the sessions?',
    a: 'TEJAS provides a built-in browser IDE with live code execution, audio/video conferencing, and real-time collaborative whiteboard. You do not need to install any third-party software.',
  },
];

export function MentorPage({ onBackToHome }: MentorPageProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Instantly scroll to top when page opens
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  const scrollToSection = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'instant' });
    }
  };

  return (
    <div className="min-h-screen bg-[#07070A] text-slate-100 font-sans selection:bg-[#FF4500] selection:text-white">
      
      {/* ========================================================
          STICKY MENTOR HEADER
      ======================================================== */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#07070A]/90 backdrop-blur-xl border-b border-white/10 h-18 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between">
          
          {/* Brand & Back Button */}
          <div className="flex items-center gap-6">
            <button
              onClick={onBackToHome}
              className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer group"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              <span>Back to Campus Home</span>
            </button>

            <div className="h-4 w-px bg-white/10 hidden sm:block" />

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FF4500] to-[#FFA000] flex items-center justify-center text-white font-extrabold text-xs">
                TJ
              </div>
              <span className="text-lg font-extrabold text-white font-[family-name:var(--font-display)]">
                TEJAS <span className="text-xs font-mono font-normal text-[#FFA000] ml-1">Mentors</span>
              </span>
            </div>
          </div>

          {/* Quick Anchor Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-slate-400">
            <button onClick={() => scrollToSection('open-roles')} className="hover:text-white text-[#FFA000] font-semibold transition-colors cursor-pointer flex items-center gap-1">
              <Sparkles size={12} />
              <span>Open Roles</span>
            </button>
            <button onClick={() => scrollToSection('how-it-works')} className="hover:text-white transition-colors cursor-pointer">
              Process
            </button>
            <button onClick={() => scrollToSection('what-you-do')} className="hover:text-white transition-colors cursor-pointer">
              Role
            </button>
            <button onClick={() => scrollToSection('benefits')} className="hover:text-white transition-colors cursor-pointer">
              Benefits
            </button>
            <button onClick={() => scrollToSection('mentors')} className="hover:text-white transition-colors cursor-pointer">
              Fellow Mentors
            </button>
            <button onClick={() => scrollToSection('faq')} className="hover:text-white transition-colors cursor-pointer">
              FAQ
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollToSection('open-roles')}
              className="btn-pill-primary text-xs py-2.5 px-5 cursor-pointer shadow-lg shadow-orange-500/20"
            >
              <Sparkles size={14} className="text-white" />
              <span>Apply as Mentor</span>
              <ArrowRight size={14} />
            </button>
          </div>

        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24">
        
        {/* ========================================================
            01. HERO SECTION
        ======================================================== */}
        <section className="py-16 sm:py-24 relative overflow-hidden obsidian-grid">
          {/* Subtle Ambient Backlight Glow */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-br from-[#FF4500]/15 via-[#FFA000]/10 to-transparent blur-[140px] pointer-events-none rounded-full" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Hero Copy */}
              <div className="lg:col-span-7 text-left">
                
                {/* Pill Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF4500]/10 border border-[#FF4500]/25 text-[#FFA000] text-xs font-semibold tracking-wide mb-6">
                  <Sparkles size={14} className="text-[#FF4500]" />
                  <span>Mentor with TEJAS</span>
                </div>

                {/* Main Headline */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] font-[family-name:var(--font-display)] mb-6">
                  Coach the interviews <br />
                  <span className="bg-gradient-to-r from-[#FF4500] via-[#FF7A00] to-[#FFA000] bg-clip-text text-transparent">
                    you already cleared.
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl mb-8">
                  Guide ambitious engineering students across 50+ tier-2/3 campuses. Conduct high-impact 1-on-1 mock interviews, review architecture capstones, and get compensated on your own 100% flexible schedule.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 mb-10">
                  <button
                    onClick={() => scrollToSection('open-roles')}
                    className="btn-pill-primary py-3.5 px-8 text-xs sm:text-sm font-bold cursor-pointer"
                  >
                    <span>Apply as Mentor</span>
                    <ArrowRight size={16} />
                  </button>

                  <button
                    onClick={() => scrollToSection('how-it-works')}
                    className="btn-pill-secondary py-3.5 px-6 text-xs sm:text-sm cursor-pointer"
                  >
                    <span>See How It Works</span>
                  </button>
                </div>

                {/* Social Proof Strip */}
                <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                  <div className="flex -space-x-2.5">
                    {fellowMentors.map((m, idx) => (
                      <img
                        key={idx}
                        src={m.image}
                        alt={m.name}
                        className="w-9 h-9 rounded-full border-2 border-[#07070A] object-cover"
                      />
                    ))}
                  </div>
                  <div className="text-xs text-slate-400">
                    <span className="text-white font-bold">80+ Senior Engineers</span> from Google, Microsoft, Amazon & Adobe are already mentoring.
                  </div>
                </div>

              </div>

              {/* Right Column: Interactive Mock Visualizer Card */}
              <div className="lg:col-span-5">
                <div className="relative rounded-3xl bg-[#111116] border border-white/15 p-6 shadow-2xl shadow-black overflow-hidden">
                  
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                    <div className="flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs font-mono font-bold text-white">Live Mock Session #482</span>
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-[#FF4500]/15 text-[#FFA000] border border-[#FF4500]/30 font-bold">
                      ₹3,500 / hr Honorarium
                    </span>
                  </div>

                  {/* Mock Visual Content */}
                  <div className="space-y-4">
                    
                    {/* Simulated Candidate */}
                    <div className="p-3.5 rounded-2xl bg-[#09090D] border border-white/10 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">Aditya Verma (Final Year CSE)</div>
                        <div className="text-[11px] text-slate-400 font-mono">Target: SDE 1 at Tier-1 Startup</div>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        System Design
                      </span>
                    </div>

                    {/* Simulated IDE Snippet */}
                    <div className="p-3.5 rounded-2xl bg-[#09090D] border border-white/10 font-mono text-[11px] text-slate-300">
                      <div className="text-slate-500 text-[10px] mb-1.5">// Mentor Feedback Evaluation</div>
                      <div className="text-emerald-400">✓ Graph Traversal Optimality: 95/100</div>
                      <div className="text-amber-400">⚠ Distributed Cache Eviction: Discuss Redis TTL</div>
                      <div className="text-blue-400">✓ Communication & Edge Cases: 90/100</div>
                    </div>

                    {/* Honorarium & Scheduling Guarantee */}
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-[#181822] to-[#111116] border border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Clock size={16} className="text-[#FFA000]" />
                        <div className="text-xs font-medium text-slate-200">
                          Your Calendar, Your Terms
                        </div>
                      </div>
                      <div className="text-[11px] font-mono text-emerald-400 font-bold">
                        Instant Weekly Credit
                      </div>
                    </div>

                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================
            02. HERE'S HOW YOU JOIN US (4 STEPS)
        ======================================================== */}
        <section id="how-it-works" className="py-20 bg-[#0A0A0D] border-t border-white/5 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-[family-name:var(--font-display)]">
                Here's how you <span className="text-[#FFA000]">join us</span>
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-slate-400">
                A simple, friction-free 4-step onboarding designed for busy working engineers.
              </p>
            </div>

            {/* 4 Step Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {steps.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-[#111116] border border-white/10 hover:border-[#FF4500]/40 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div
                      style={{ color: item.badgeColor, borderColor: item.badgeColor }}
                      className="w-10 h-10 rounded-2xl border flex items-center justify-center font-mono font-extrabold text-sm mb-6 bg-white/[0.03]"
                    >
                      {item.step}
                    </div>
                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#FFA000] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => scrollToSection('open-roles')}
                className="btn-pill-primary py-3 px-8 text-xs sm:text-sm cursor-pointer"
              >
                <span>Browse Open Positions</span>
                <ArrowRight size={15} />
              </button>
              <button
                onClick={() => scrollToSection('open-roles')}
                className="btn-pill-secondary py-3 px-6 text-xs sm:text-sm cursor-pointer"
              >
                <span>View All Openings</span>
              </button>
            </div>

          </div>
        </section>

        {/* ========================================================
            03. OPEN POSITIONS & MENTOR OPENINGS (JOB PORTAL)
        ======================================================== */}
        <MentorJobPortal />

        {/* ========================================================
            04. WHAT YOU ACTUALLY DO (RESPONSIBILITIES)
        ======================================================== */}
        <section id="what-you-do" className="py-20 bg-[#07070A] border-t border-white/5 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-[family-name:var(--font-display)]">
                What you actually <span className="bg-gradient-to-r from-[#FF4500] to-[#FFA000] bg-clip-text text-transparent">do as a mentor</span>
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-slate-400">
                Pick the activities you enjoy most. Zero micromanagement and full creative freedom.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {responsibilities.map((r, idx) => {
                const Icon = r.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 sm:p-8 rounded-3xl bg-[#111116] border border-white/10 hover:border-[#FF4500]/40 transition-all group"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF4500]/20 to-[#FFA000]/10 border border-[#FF4500]/30 flex items-center justify-center text-[#FFA000] shrink-0">
                        <Icon size={22} />
                      </div>
                      <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-white/5 text-slate-300 border border-white/10 font-bold">
                        {r.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#FFA000] transition-colors">
                      {r.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                      {r.desc}
                    </p>

                    <div className="pt-4 border-t border-white/10 text-xs font-mono text-slate-400 flex items-center gap-2">
                      <Clock size={13} className="text-[#FF6A00]" />
                      <span>{r.meta}</span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ========================================================
            04. BENEFITS YOU GET (4 NUMBERED BENTO CARDS)
        ======================================================== */}
        <section id="benefits" className="py-20 bg-[#0A0A0D] border-t border-white/5 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-[family-name:var(--font-display)]">
                Benefits <span className="text-[#FFA000]">you get</span>
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-slate-400">
                Rewarding both financially and in meaningful community impact.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {benefits.map((b, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-3xl bg-[#111116] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between relative overflow-hidden group"
                >
                  <span className="text-6xl font-black text-white/[0.04] absolute top-4 right-6 select-none font-mono">
                    {b.num}
                  </span>

                  <div>
                    <span 
                      style={{ color: b.accent }}
                      className="text-xs font-mono font-bold uppercase tracking-wider mb-2 block"
                    >
                      Advantage {b.num}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#FFA000] transition-colors">
                      {b.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {b.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ========================================================
            05. WHAT STUDENTS EXPECT FROM YOU (3 CARDS)
        ======================================================== */}
        <section className="py-20 bg-[#07070A] border-t border-white/5 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-[family-name:var(--font-display)]">
                What students <span className="text-[#38BDF8]">expect from you</span>
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-slate-400">
                Actionable, honest, and constructive mentorship that changes their placement trajectory.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {expectations.map((exp, idx) => {
                const Icon = exp.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl bg-[#111116] border border-white/10 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FFA000] mb-5">
                        <Icon size={20} />
                      </div>
                      <h3 className="text-base font-bold text-white mb-2">
                        {exp.title}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {exp.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ========================================================
            06. YOU'LL BE IN GOOD COMPANY (MENTOR SHOWCASE)
        ======================================================== */}
        <section id="mentors" className="py-20 bg-[#0A0A0D] border-t border-white/5 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-[family-name:var(--font-display)]">
                You'll be in <span className="text-[#FFA000]">good company</span>
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-slate-400">
                Join senior engineers from tier-1 firms already guiding college cohorts on TEJAS.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {fellowMentors.map((m, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-3xl bg-[#111116] border border-white/10 hover:border-[#FF4500]/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3.5 mb-4">
                      <img
                        src={m.image}
                        alt={m.name}
                        className="w-12 h-12 rounded-2xl object-cover border border-white/15"
                      />
                      <div>
                        <div className="text-sm font-bold text-white leading-tight">{m.name}</div>
                        <div 
                          style={{ color: m.color }}
                          className="text-xs font-bold mt-0.5"
                        >
                          {m.company}
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 mb-4">
                      {m.role}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                    <div className="flex items-center gap-1 text-[#FFA000]">
                      <span>★</span>
                      <span>{m.rating}</span>
                    </div>
                    <span>{m.sessions}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ========================================================
            07. READY TO MENTOR (GRADIENT CTA BANNER)
        ======================================================== */}
        <section className="py-16 bg-[#07070A] border-t border-white/5 relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#1A1A26] via-[#14141C] to-[#101014] border border-white/15 shadow-2xl relative overflow-hidden">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left CTA */}
                <div className="lg:col-span-7">
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-[family-name:var(--font-display)]">
                    Ready to mentor with{' '}
                    <span className="bg-gradient-to-r from-[#FF4500] via-[#FF7A00] to-[#FFA000] bg-clip-text text-transparent">
                      TEJAS?
                    </span>
                  </h2>
                  <p className="mt-3 text-xs sm:text-sm text-slate-300 max-w-lg leading-relaxed mb-8">
                    Apply in 2 minutes. Start taking flexible mock interviews and empower the next generation of engineers.
                  </p>
                  <button
                    onClick={() => scrollToSection('open-roles')}
                    className="btn-pill-primary py-3.5 px-8 text-xs sm:text-sm font-bold cursor-pointer"
                  >
                    <span>Browse All Open Roles</span>
                    <ArrowRight size={16} />
                  </button>
                </div>

                {/* Right Checklist */}
                <div className="lg:col-span-5 space-y-3 text-xs sm:text-sm text-slate-200">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={16} className="text-[#22C55E] shrink-0" />
                    <span>100% remote & flexible scheduling</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={16} className="text-[#22C55E] shrink-0" />
                    <span>Direct hourly honorarium with zero delays</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={16} className="text-[#22C55E] shrink-0" />
                    <span>Automated calendar slots — 0 operational hassle</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={16} className="text-[#22C55E] shrink-0" />
                    <span>Structured question bank & live IDE provided</span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* ========================================================
            08. FREQUENTLY ASKED QUESTIONS (FAQ)
        ======================================================== */}
        <section id="faq" className="py-20 bg-[#0A0A0D] border-t border-white/5 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-[family-name:var(--font-display)]">
                Frequently asked <span className="text-[#FFA000]">questions</span>
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-slate-400">
                Everything you need to know about becoming a mentor on TEJAS.
              </p>
            </div>

            <div className="space-y-3.5">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl bg-[#111116] border border-white/10 overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <span className="text-sm sm:text-base font-bold text-white">
                        {faq.q}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`text-slate-400 transition-transform duration-200 shrink-0 ${
                          isOpen ? 'rotate-180 text-[#FF4500]' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="px-5 sm:px-6 pb-5 sm:pb-6 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-white/5 pt-3"
                        >
                          {faq.a}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}
