import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, Sparkles, Check, ChevronRight, Award, Share2, Gauge, Briefcase, Code } from 'lucide-react';
import { useEnquiry } from '../context/EnquiryContext';

export function PlatformSection() {
  const { openEnquiry } = useEnquiry();
  const [diagnosticTrack, setDiagnosticTrack] = useState<'NON_TECH' | 'TECH'>('NON_TECH');

  return (
    <section id="solutions" className="py-12 sm:py-16 bg-[#F8F9FB] relative obsidian-grid border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-8 sm:mb-10 text-left"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/25 text-[#3B82F6] text-xs font-semibold tracking-wide mb-4">
            <Sparkles size={14} className="text-[#2563EB]" />
            <span>Complete Placement Infrastructure</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#12151B] font-[family-name:var(--font-display)] leading-tight">
            One Platform.{' '}
            <span className=" text-[#2563EB]">
              Complete Infrastructure.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            From diagnostic testing to live mock rounds, batch readiness dashboards, verified certifications, and recruiter drive pipelines.
          </p>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════════
            ROW 1: TWO LARGE CARDS (AI Mock Interviews & Batch Readiness)
            ══════════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          
          {/* Card 1: Mock Interviews by Industry Experts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bento-card p-7 sm:p-9 flex flex-col justify-between group hover:border-[#2563EB]/50"
          >
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Mock Interviews by Industry Experts
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed max-w-lg mb-4">
                1-on-1 rigorous mock rounds conducted by senior engineers, product leaders, and hiring managers with actionable feedback before placement drives begin.
              </p>

              {/* Tag Pill Link */}
              <button
                onClick={() => openEnquiry('CONSULTATION')}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-black/10 hover:border-[#2563EB]/40 transition-colors text-xs font-medium text-slate-700 mb-8 cursor-pointer group/btn"
              >
                <span className="px-2 py-0.5 rounded-md bg-[#2563EB] text-white text-[10px] font-bold">
                  1-ON-1
                </span>
                <span>Grow360 Expert Interview Panel</span>
                <ChevronRight size={14} className="text-slate-500 group-hover/btn:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Inner Interactive Widget: Live 1-on-1 Expert Interview Simulator */}
            <div className="rounded-2xl bg-slate-50 border border-black/10 p-5 sm:p-6 shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-black/5 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#2563EB] flex items-center justify-center text-white font-bold text-xs shadow-md">
                    EXP
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 leading-tight">Senior Industry Mentor</div>
                    <div className="text-[11px] text-slate-600">Tier-1 Tech &amp; Consulting Panel</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-700 text-[11px] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Live Evaluation</span>
                </div>
              </div>

              {/* Prompt Box */}
              <div className="p-3.5 rounded-xl bg-white border border-black/5 text-sm text-slate-800 mb-4 italic">
                "Walk me through how you optimize distributed caching for high concurrency."
              </div>

              {/* Evaluation Metrics Pillars */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="p-2.5 rounded-xl bg-white border border-black/5 text-center">
                  <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-0.5">Problem Solving</div>
                  <div className="text-sm font-extrabold text-emerald-600">94% · Top 5%</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-black/5 text-center">
                  <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-0.5">Architecture</div>
                  <div className="text-sm font-extrabold text-[#2563EB]">90% · Strong</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-black/5 text-center">
                  <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-0.5">Communication</div>
                  <div className="text-sm font-extrabold text-emerald-600">96% · Fluent</div>
                </div>
              </div>

              {/* Bottom Status Bar */}
              <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
                <div className="flex items-center gap-1.5 text-slate-700">
                  <Mic size={14} className="text-[#3B82F6]" />
                  <span>Real-time Rubric &amp; Feedback</span>
                </div>
                <span className="font-semibold text-slate-800">Round 2 / 3</span>
              </div>

              {/* Progress Track */}
              <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                <div className="w-[68%] h-full bg-[#2563EB] rounded-full" />
              </div>
            </div>
          </motion.div>

          {/* Card 2: Online Assessment & Batch Skill Diagnostics Meter (Tech & Non-Tech) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bento-card p-7 sm:p-9 flex flex-col justify-between group hover:border-[#2563EB]/50"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#2563EB] text-xs font-mono font-bold border border-blue-200">
                  <Gauge size={13} />
                  <span>Dual Track Skill Diagnostic Meter</span>
                </div>

                {/* Tech / Non-Tech Interactive Tab Switcher */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-black/5">
                  <button
                    onClick={() => setDiagnosticTrack('NON_TECH')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                      diagnosticTrack === 'NON_TECH'
                        ? 'bg-white text-[#2563EB] shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Briefcase size={12} />
                    <span>Non-Tech</span>
                  </button>
                  <button
                    onClick={() => setDiagnosticTrack('TECH')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                      diagnosticTrack === 'TECH'
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Code size={12} />
                    <span>Tech</span>
                  </button>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Online Assessment &amp; Batch Readiness
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed max-w-lg mb-6">
                Diagnose the real-time skill status of student cohorts across technical and business domains with standardized benchmark meters and hiring rubrics.
              </p>
            </div>

            {/* Inner Dashboard UI Mockup: Real-Time Diagnostic Meter */}
            <div className="rounded-2xl bg-[#F8FAFC] p-4 sm:p-5 text-slate-800 shadow-2xl border border-slate-200 space-y-4">
              
              {/* Dashboard Nav & Status Strip */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 text-[11px]">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                  </span>
                  <span className="font-bold text-slate-900">
                    {diagnosticTrack === 'NON_TECH'
                      ? 'Business & Consulting Benchmark Live'
                      : 'Tech & Engineering Benchmark Live'}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-[#2563EB] font-bold text-[10px] font-mono">
                  {diagnosticTrack === 'NON_TECH'
                    ? 'Cohort: MBA / BBA / B.Com (320 Evaluated)'
                    : 'Cohort: B.Tech / M.Tech / BCA (480 Evaluated)'}
                </span>
              </div>

              {/* Central Overall Score Dial & Gauge Meter */}
              <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className={`w-14 h-14 rounded-2xl text-white flex flex-col items-center justify-center font-bold shadow-md shrink-0 ${
                    diagnosticTrack === 'NON_TECH'
                      ? 'bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-blue-500/25'
                      : 'bg-gradient-to-tr from-slate-900 to-blue-700 shadow-slate-900/25'
                  }`}>
                    <span className="text-lg leading-none">{diagnosticTrack === 'NON_TECH' ? '91' : '89'}</span>
                    <span className="text-[8.5px] font-mono opacity-80 uppercase tracking-tighter">/ 100</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">
                        {diagnosticTrack === 'NON_TECH' ? 'Management Readiness Status' : 'Engineering Readiness Status'}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono font-bold">Grade A+</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {diagnosticTrack === 'NON_TECH'
                        ? 'Big 4, MNC Consulting & Analytics Drive Ready'
                        : 'Tier-1 Product, AI & Cloud Systems Drive Ready'}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0 hidden sm:block">
                  <span className="text-xs font-mono font-bold text-emerald-600 block">
                    {diagnosticTrack === 'NON_TECH' ? '96.4% Pass Rate' : '94.2% Pass Rate'}
                  </span>
                  <span className="text-[10px] text-slate-400">Campus Benchmark Met</span>
                </div>
              </div>

              {/* 4 Multi-Dimension Skill Meters (Dynamically switches Tech / Non-Tech) */}
              <div className="space-y-2.5 pt-1">
                {diagnosticTrack === 'NON_TECH' ? (
                  <>
                    {/* Non-Tech Meter 1 */}
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-semibold mb-1">
                        <span className="text-slate-800 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                          <span>Financial Modelling &amp; Advanced Excel</span>
                        </span>
                        <span className="font-mono text-blue-600 font-bold">94% (Advanced)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full transition-all duration-700" style={{ width: '94%' }} />
                      </div>
                    </div>

                    {/* Non-Tech Meter 2 */}
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-semibold mb-1">
                        <span className="text-slate-800 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                          <span>Business Analytics (Power BI &amp; SQL)</span>
                        </span>
                        <span className="font-mono text-indigo-600 font-bold">89% (Proficient)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                        <div className="h-full bg-indigo-600 rounded-full transition-all duration-700" style={{ width: '89%' }} />
                      </div>
                    </div>

                    {/* Non-Tech Meter 3 */}
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-semibold mb-1">
                        <span className="text-slate-800 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                          <span>Corporate Communication &amp; GD Dynamics</span>
                        </span>
                        <span className="font-mono text-emerald-600 font-bold">93% (Job Ready)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                        <div className="h-full bg-emerald-600 rounded-full transition-all duration-700" style={{ width: '93%' }} />
                      </div>
                    </div>

                    {/* Non-Tech Meter 4 */}
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-semibold mb-1">
                        <span className="text-slate-800 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                          <span>GTM Strategy, Case Analysis &amp; ERP</span>
                        </span>
                        <span className="font-mono text-purple-600 font-bold">88% (High)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                        <div className="h-full bg-purple-600 rounded-full transition-all duration-700" style={{ width: '88%' }} />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Tech Meter 1 */}
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-semibold mb-1">
                        <span className="text-slate-800 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                          <span>DSA &amp; Problem Solving Patterns</span>
                        </span>
                        <span className="font-mono text-blue-600 font-bold">92% (Advanced)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full transition-all duration-700" style={{ width: '92%' }} />
                      </div>
                    </div>

                    {/* Tech Meter 2 */}
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-semibold mb-1">
                        <span className="text-slate-800 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                          <span>System Design &amp; Cloud Microservices</span>
                        </span>
                        <span className="font-mono text-indigo-600 font-bold">86% (Proficient)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                        <div className="h-full bg-indigo-600 rounded-full transition-all duration-700" style={{ width: '86%' }} />
                      </div>
                    </div>

                    {/* Tech Meter 3 */}
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-semibold mb-1">
                        <span className="text-slate-800 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                          <span>Full-Stack &amp; Applied AI Workflows</span>
                        </span>
                        <span className="font-mono text-emerald-600 font-bold">88% (High)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                        <div className="h-full bg-emerald-600 rounded-full transition-all duration-700" style={{ width: '88%' }} />
                      </div>
                    </div>

                    {/* Tech Meter 4 */}
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-semibold mb-1">
                        <span className="text-slate-800 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                          <span>Architecture Code Reviews &amp; Soft Skills</span>
                        </span>
                        <span className="font-mono text-purple-600 font-bold">85% (Job Ready)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                        <div className="h-full bg-purple-600 rounded-full transition-all duration-700" style={{ width: '85%' }} />
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Lower Status Bar */}
              <div className="flex items-center justify-between text-[10px] text-slate-600 pt-2 border-t border-slate-200">
                <span className="flex items-center gap-1 font-semibold text-emerald-700">
                  <Check size={12} />
                  <span>
                    {diagnosticTrack === 'NON_TECH'
                      ? '275 Students Shortlisted for Big 4 & MNC Consulting'
                      : '380 Students Verified for Tier-1 Product & Tech Drives'}
                  </span>
                </span>
                <span className="font-mono font-bold text-[#2563EB]">Live Meter Active →</span>
              </div>

            </div>
          </motion.div>

        </div>

        {/* ══════════════════════════════════════════════════════════════════
            ROW 2: FOUR EQUAL CARDS (Non-Tech, Resume Builder, Tech Profiles, Certificates)
            ══════════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Non-Tech Profiles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="bento-card p-6 flex flex-col justify-between group hover:border-[#2563EB]/50"
          >
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1.5">
                Non-Tech Profiles
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-5">
                Prepare learners for high-growth roles beyond software engineering with focused profile tracks.
              </p>
            </div>

            {/* Inner JSON / Code Snippet Panel */}
            <div className="rounded-xl bg-slate-50 border border-black/10 p-3.5 text-xs">
              <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-black/5 text-[10px] text-slate-600">
                <span className="font-bold text-slate-700">PROFILE_TRACKS.JSON</span>
                <span className="text-emerald-400">● Active</span>
              </div>
              <div className="space-y-1.5 text-[10px]">
                <div className="flex justify-between items-center text-slate-700">
                  <span>• Product Management</span>
                  <span className="text-[#3B82F6] font-bold">12 PRDs</span>
                </div>
                <div className="flex justify-between items-center text-slate-700">
                  <span>• Data Analytics</span>
                  <span className="text-[#3B82F6] font-bold">SQL / Tableau</span>
                </div>
                <div className="flex justify-between items-center text-slate-700">
                  <span>• Business Consulting</span>
                  <span className="text-emerald-400 font-bold">Case Frameworks</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Resume Builder & ATS Checker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bento-card p-6 flex flex-col justify-between group hover:border-[#2563EB]/50"
          >
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1.5">
                Resume Builder &amp; ATS
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-5">
                Help batches ship 90%+ parse rate ATS-ready resumes before campus hiring opens.
              </p>
            </div>

            {/* Inner Mini Resume Preview Sheet */}
            <div className="rounded-xl bg-[#F8FAFC] border border-slate-200 p-3.5 text-slate-800 shadow-lg">
              <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-200">
                <div>
                  <div className="text-[11px] font-bold text-slate-900">Rahul Sharma</div>
                  <div className="text-[9px] text-slate-500">B.Tech Computer Science</div>
                </div>
                <span className="px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[9px] font-bold border border-emerald-300">
                  96/100 ATS
                </span>
              </div>
              <div className="flex flex-wrap gap-1 text-[8.5px] font-semibold text-slate-700">
                <span className="px-1.5 py-0.5 rounded bg-slate-200">✓ React.js</span>
                <span className="px-1.5 py-0.5 rounded bg-slate-200">✓ System Design</span>
                <span className="px-1.5 py-0.5 rounded bg-slate-200">✓ Docker CI/CD</span>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Tech Profiles Training */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="bento-card p-6 flex flex-col justify-between group hover:border-[#2563EB]/50"
          >
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1.5">
                Tech Profiles Training
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-5">
                Targeted patterns, mocks, and company-specific interview sprint tracks.
              </p>
            </div>

            {/* Inner Company Target Icons & Prep Modules */}
            <div className="rounded-xl bg-slate-50 border border-black/10 p-3.5">
              <div className="text-[9.5px] font-bold text-slate-600 uppercase tracking-wider mb-2">
                Target Company Tracks
              </div>
              
              {/* Company Logo Badges */}
              <div className="grid grid-cols-4 gap-1.5 mb-2.5">
                <div className="p-1 rounded bg-white border border-black/5 text-center text-[9px] font-bold text-[#3B82F6]">
                  Amazon
                </div>
                <div className="p-1 rounded bg-white border border-black/5 text-center text-[9px] font-bold text-[#3B82F6]">
                  Google
                </div>
                <div className="p-1 rounded bg-white border border-black/5 text-center text-[9px] font-bold text-emerald-400">
                  Microsoft
                </div>
                <div className="p-1 rounded bg-white border border-black/5 text-center text-[9px] font-bold text-rose-400">
                  Adobe
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-700 pt-1.5 border-t border-black/5">
                <span>700+ LeetCode Patterns</span>
                <span className="text-[#3B82F6] font-bold">50+ Mocks</span>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Industry-Approved Certification */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bento-card p-6 flex flex-col justify-between group hover:border-[#2563EB]/50"
          >
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1.5">
                Industry-Approved Certification
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-5">
                Tamper-proof, QR-verifiable industry credentials recognized by corporate recruiters.
              </p>
            </div>

            {/* Inner Certificate Mockup Widget */}
            <div className="rounded-xl bg-gradient-to-br from-white to-slate-50 border border-blue-200 p-3.5 text-xs shadow-md">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-black/10">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-[#3B82F6]/20 flex items-center justify-center text-[#3B82F6]">
                    <Award size={12} />
                  </div>
                  <span className="text-[10px] font-bold text-[#3B82F6]">Grow360 Certified</span>
                </div>
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 text-[8.5px] font-bold border border-emerald-500/30">
                  QR Verified
                </span>
              </div>

              <div className="text-[10.5px] font-bold text-slate-900 mb-0.5">
                Full Stack &amp; System Design
              </div>
              <div className="text-[9px] text-slate-600 mb-2.5">
                Credential ID: G360-2026-8942
              </div>

              <div className="flex items-center justify-between text-[9px] pt-2 border-t border-black/10 text-slate-600">
                <span>4 Academic Credits</span>
                <span className="flex items-center gap-1 text-[#3B82F6] font-semibold">
                  <Share2 size={10} /> LinkedIn
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
