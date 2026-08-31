import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  ChevronDown, 
  Code2, 
  Video,
  Layers,
  Terminal,
  Compass,
  Star,
  FileCode
} from 'lucide-react';

interface MentorPageProps {
  onBackToHome?: () => void;
}

const steps = [
  {
    step: '01',
    badgeColor: '#2563EB',
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
    desc: 'Evaluate student code performance, problem-solving speed, and communication depth using Grow360 scoring rubrics.',
    meta: 'Structured rubric provided',
  },
];

const benefits = [
  {
    num: '01',
    title: 'Competitive Honorarium',
    desc: 'Get compensated with high hourly payouts (₹2,500 – ₹6,000 per session) credited directly to your bank account weekly.',
    accent: '#2563EB',
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
    name: 'Nidhi Singh',
    company: 'Accenture',
    role: 'Lead Analyst – FP&A · Finance & Modelling',
    rating: '4.98',
    sessions: '85+ Sessions',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    color: '#A100FF',
  },
  {
    name: 'Ashish Sachan',
    company: 'Product Leadership',
    role: 'Product & Program Management · 10+ Yrs Exp',
    rating: '4.96',
    sessions: '110+ Sessions',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    color: '#2563EB',
  },
  {
    name: 'Nandwana Abhishek',
    company: 'Meta',
    role: 'Software Engineer · Meta (London, UK)',
    rating: '4.99',
    sessions: '95+ Sessions',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    color: '#0668E1',
  },
  {
    name: 'Vishal Motlani',
    company: 'J&J MedTech',
    role: "SIBM P'27 · Ex-Deloitte USI · Advisory",
    rating: '4.95',
    sessions: '60+ Sessions',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    color: '#D51900',
  },
  {
    name: 'Mohit Khandelwal',
    company: 'ZS',
    role: 'Analytics Consultant · Commercial Analytics',
    rating: '4.97',
    sessions: '75+ Sessions',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    color: '#005A9C',
  },
  {
    name: 'Sakshi Havelia',
    company: 'Koridge Capital',
    role: 'Founder Advisory · Equity & Debt Fundraising',
    rating: '4.98',
    sessions: '90+ Sessions',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
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
    image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
    color: '#8B5CF6',
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
    a: 'Grow360 provides a built-in browser IDE with live code execution, audio/video conferencing, and real-time collaborative whiteboard. You do not need to install any third-party software.',
  },
];

export function MentorPage({ onBackToHome: _ }: MentorPageProps) {
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
    <div className="min-h-screen bg-[#F8F9FB] text-slate-100 font-sans selection:bg-[#2563EB] selection:text-slate-900">

      {/* Main Content */}
      <main className="pt-24">
        
        {/* ========================================================
            01. HERO SECTION
        ======================================================== */}
        <section className="py-16 sm:py-24 relative overflow-hidden obsidian-grid">
          {/* Subtle Ambient Backlight Glow */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-br from-[#2563EB]/15 via-[#3B82F6]/10 to-transparent blur-[140px] pointer-events-none rounded-full" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Hero Copy */}
              <div className="lg:col-span-7 text-left">
                
                {/* Pill Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/30 text-[#2563EB] text-xs font-semibold tracking-wide mb-6">
                  <Sparkles size={14} className="text-[#2563EB]" />
                  <span>Mentor with Grow360</span>
                </div>

                {/* Main Headline */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1] font-[family-name:var(--font-display)] mb-6">
                  Coach the interviews <br />
                  <span className="bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#3B82F6] bg-clip-text text-transparent">
                    you already cleared.
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-xl mb-8">
                  Guide ambitious engineering students across 50+ tier-2/3 campuses. Conduct high-impact 1-on-1 mock interviews, review architecture capstones, and get compensated on your own 100% flexible schedule.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 mb-10">
                  <button
                    onClick={() => { window.location.hash = '#careers'; }}
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
                <div className="flex items-center gap-4 pt-6 border-t border-black/8">
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
                  <div className="text-xs text-slate-600">
                    <span className="text-slate-900 font-bold">80+ Senior Engineers</span> from Google, Microsoft, Amazon & Adobe are already mentoring.
                  </div>
                </div>

              </div>

              {/* Right Column: Interactive Mock Visualizer Card */}
              <div className="lg:col-span-5">
                <div className="relative rounded-3xl bg-white shadow-sm border border-black/10 p-6 shadow-2xl shadow-black overflow-hidden">
                  
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-black/8 mb-5">
                    <div className="flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs font-mono font-bold text-slate-900">Live Mock Session #482</span>
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-[#2563EB]/15 text-[#3B82F6] border border-[#2563EB]/30 font-bold">
                      ₹3,500 / hr Honorarium
                    </span>
                  </div>

                  {/* Mock Visual Content */}
                  <div className="space-y-4">
                    
                    {/* Simulated Candidate */}
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-black/8 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-slate-900">Aditya Verma (Final Year CSE)</div>
                        <div className="text-[11px] text-slate-600 font-mono">Target: SDE 1 at Tier-1 Startup</div>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        System Design
                      </span>
                    </div>

                    {/* Simulated IDE Snippet */}
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-black/8 font-mono text-[11px] text-slate-700">
                      <div className="text-slate-500 text-[10px] mb-1.5">// Mentor Feedback Evaluation</div>
                      <div className="text-emerald-400">✓ Graph Traversal Optimality: 95/100</div>
                      <div className="text-[#3B82F6]">⚠ Distributed Cache Eviction: Discuss Redis TTL</div>
                      <div className="text-blue-400">✓ Communication & Edge Cases: 90/100</div>
                    </div>

                    {/* Honorarium & Scheduling Guarantee */}
                    <div className="p-4 rounded-2xl bg-slate-50 border border-black/8 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Clock size={16} className="text-[#3B82F6]" />
                        <div className="text-xs font-medium text-slate-700">
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
        <section id="how-it-works" className="py-20 bg-[#F8F9FB] border-t border-black/5 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-[family-name:var(--font-display)]">
                Here's how you <span className="text-[#3B82F6]">join us</span>
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-slate-600">
                A simple, friction-free 4-step onboarding designed for busy working engineers.
              </p>
            </div>

            {/* 4 Step Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {steps.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-white shadow-sm border border-black/8 hover:border-[#2563EB]/40 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div
                      style={{ color: item.badgeColor, borderColor: item.badgeColor }}
                      className="w-10 h-10 rounded-2xl border flex items-center justify-center font-mono font-extrabold text-sm mb-6 bg-white/[0.03]"
                    >
                      {item.step}
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-[#3B82F6] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => { window.location.hash = '#careers'; }}
                className="btn-pill-primary py-3 px-8 text-xs sm:text-sm cursor-pointer"
              >
                <span>Browse Open Positions</span>
                <ArrowRight size={15} />
              </button>
              <button
                onClick={() => { window.location.hash = '#careers'; }}
                className="btn-pill-secondary py-3 px-6 text-xs sm:text-sm cursor-pointer"
              >
                <span>View All Openings</span>
              </button>
            </div>

          </div>
        </section>

        {/* ========================================================
            04. WHAT YOU ACTUALLY DO (RESPONSIBILITIES)
        ======================================================== */}
        <section id="what-you-do" className="py-20 bg-[#F8F9FB] border-t border-black/5 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-[family-name:var(--font-display)]">
                What you actually <span className="bg-gradient-to-r from-[#2563EB] to-[#3B82F6] bg-clip-text text-transparent">do as a mentor</span>
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-slate-600">
                Pick the activities you enjoy most. Zero micromanagement and full creative freedom.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {responsibilities.map((r, idx) => {
                const Icon = r.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 sm:p-8 rounded-3xl bg-white shadow-sm border border-black/8 hover:border-[#2563EB]/40 transition-all group"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2563EB]/20 to-[#3B82F6]/10 border border-[#2563EB]/30 flex items-center justify-center text-[#3B82F6] shrink-0">
                        <Icon size={22} />
                      </div>
                      <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-white/5 text-slate-700 border border-black/8 font-bold">
                        {r.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#3B82F6] transition-colors">
                      {r.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                      {r.desc}
                    </p>

                    <div className="pt-4 border-t border-black/8 text-xs font-mono text-slate-600 flex items-center gap-2">
                      <Clock size={13} className="text-[#2563EB]" />
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
        <section id="benefits" className="py-20 bg-[#F8F9FB] border-t border-black/5 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-[family-name:var(--font-display)]">
                Benefits <span className="text-[#3B82F6]">you get</span>
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-slate-600">
                Rewarding both financially and in meaningful community impact.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {benefits.map((b, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-3xl bg-white shadow-sm border border-black/8 hover:border-white/20 transition-all flex flex-col justify-between relative overflow-hidden group"
                >
                  <span className="text-6xl font-black text-slate-900/[0.04] absolute top-4 right-6 select-none font-mono">
                    {b.num}
                  </span>

                  <div>
                    <span 
                      style={{ color: b.accent }}
                      className="text-xs font-mono font-bold uppercase tracking-wider mb-2 block"
                    >
                      Advantage {b.num}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#3B82F6] transition-colors">
                      {b.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
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
        <section className="py-20 bg-[#F8F9FB] border-t border-black/5 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-[family-name:var(--font-display)]">
                What students <span className="text-[#38BDF8]">expect from you</span>
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-slate-600">
                Actionable, honest, and constructive mentorship that changes their placement trajectory.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {expectations.map((exp, idx) => {
                const Icon = exp.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl bg-white shadow-sm border border-black/8 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-black/8 flex items-center justify-center text-[#3B82F6] mb-5">
                        <Icon size={20} />
                      </div>
                      <h3 className="text-base font-bold text-slate-900 mb-2">
                        {exp.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
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
        <section id="mentors" className="py-20 bg-[#F8F9FB] border-t border-black/5 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-[family-name:var(--font-display)]">
                You'll be in <span className="text-[#3B82F6]">good company</span>
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-slate-600">
                Join senior engineers from tier-1 firms already guiding college cohorts on Grow360.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {fellowMentors.map((m, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-3xl bg-white shadow-sm border border-black/8 hover:border-[#2563EB]/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3.5 mb-4">
                      <img
                        src={m.image}
                        alt={m.name}
                        className="w-12 h-12 rounded-2xl object-cover border border-black/10"
                      />
                      <div>
                        <div className="text-sm font-bold text-slate-900 leading-tight">{m.name}</div>
                        <div 
                          style={{ color: m.color }}
                          className="text-xs font-bold mt-0.5"
                        >
                          {m.company}
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 mb-4">
                      {m.role}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-black/8 flex items-center justify-between text-xs font-mono text-slate-600">
                    <div className="flex items-center gap-1 text-[#3B82F6]">
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
        <section className="py-16 bg-[#F8F9FB] border-t border-black/5 relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-8 sm:p-12 rounded-3xl bg-white shadow-lg border border-black/8 border border-black/10 shadow-2xl relative overflow-hidden">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left CTA */}
                <div className="lg:col-span-7">
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-[family-name:var(--font-display)]">
                    Ready to mentor with{' '}
                    <span className="bg-gradient-to-r from-[#2563EB] to-[#3B82F6] bg-clip-text text-transparent">
                      Grow360?
                    </span>
                  </h2>
                  <p className="mt-3 text-xs sm:text-sm text-slate-700 max-w-lg leading-relaxed mb-8">
                    Apply in 2 minutes. Start taking flexible mock interviews and empower the next generation of engineers.
                  </p>
                  <button
                    onClick={() => { window.location.hash = '#careers'; }}
                    className="btn-pill-primary py-3.5 px-8 text-xs sm:text-sm font-bold cursor-pointer"
                  >
                    <span>Browse All Open Roles</span>
                    <ArrowRight size={16} />
                  </button>
                </div>

                {/* Right Checklist */}
                <div className="lg:col-span-5 space-y-3 text-xs sm:text-sm text-slate-700">
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
        <section id="faq" className="py-20 bg-[#F8F9FB] border-t border-black/5 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-[family-name:var(--font-display)]">
                Frequently asked <span className="text-[#3B82F6]">questions</span>
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-slate-600">
                Everything you need to know about becoming a mentor on Grow360.
              </p>
            </div>

            <div className="space-y-3.5">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl bg-white shadow-sm border border-black/8 overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <span className="text-sm sm:text-base font-bold text-slate-900">
                        {faq.q}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`text-slate-600 transition-transform duration-200 shrink-0 ${
                          isOpen ? 'rotate-180 text-[#2563EB]' : ''
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
                          className="px-5 sm:px-6 pb-5 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-black/5 pt-3"
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

    </div>
  );
}
