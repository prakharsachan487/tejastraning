import { motion } from 'framer-motion';
import { Mic, ArrowRight, Sparkles, Check, ChevronRight, Award, Share2 } from 'lucide-react';
import { useEnquiry } from '../context/EnquiryContext';

export function PlatformSection() {
  const { openEnquiry } = useEnquiry();

  return (
    <section id="solutions" className="py-20 lg:py-28 bg-[#F8F9FB] relative obsidian-grid border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-14 text-left"
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
          
          {/* Card 1: AI Mock Interviews */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bento-card p-7 sm:p-9 flex flex-col justify-between group hover:border-[#2563EB]/50"
          >
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                AI Mock Interviews
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed max-w-lg mb-4">
                Scale mock interviews across batches with AI feedback on communication, technical depth, and confidence before drives begin.
              </p>

              {/* Tag Pill Link */}
              <button
                onClick={() => openEnquiry('CONSULTATION')}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-black/10 hover:border-[#2563EB]/40 transition-colors text-xs font-medium text-slate-700 mb-8 cursor-pointer group/btn"
              >
                <span className="px-2 py-0.5 rounded-md bg-[#2563EB] text-slate-900 text-[10px] font-bold">
                  NEW
                </span>
                <span>Grow360 AI Interview Module</span>
                <ChevronRight size={14} className="text-slate-500 group-hover/btn:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Inner Interactive Widget: AI Voice Interview Simulator */}
            <div className="rounded-2xl bg-slate-50 border border-black/10 p-5 sm:p-6 shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-black/5 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#2563EB] flex items-center justify-center text-slate-900 font-bold text-xs">
                    AI
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 leading-tight">AI Interviewer</div>
                    <div className="text-[11px] text-slate-600">Grow360 Mock Round</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-950/40 border border-rose-500/30 text-rose-400 text-[11px] font-medium">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  <span>Recording...</span>
                </div>
              </div>

              {/* Prompt Box */}
              <div className="p-4 rounded-xl bg-white border border-black/5 text-sm text-slate-800 mb-5 italic">
                "Tell me about a project you're proud of."
              </div>

              {/* Audio Waveform Equalizer */}
              <div className="flex items-center justify-center gap-1.5 h-10 px-3 bg-slate-100 rounded-xl border border-black/5 mb-5">
                {[18, 28, 40, 24, 38, 52, 30, 48, 60, 42, 28, 36, 50, 26, 44, 58, 32, 22].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-[#3B82F6] rounded-full animate-wave"
                    style={{
                      height: `${h}%`,
                      animationDelay: `${i * 0.07}s`,
                    }}
                  />
                ))}
              </div>

              {/* Bottom Status Bar */}
              <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
                <div className="flex items-center gap-1.5 text-slate-700">
                  <Mic size={14} className="text-[#3B82F6]" />
                  <span>Listening</span>
                </div>
                <span>Question 3 / 10</span>
              </div>

              {/* Progress Track */}
              <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="w-[30%] h-full bg-[#3B82F6] rounded-full" />
              </div>
            </div>
          </motion.div>

          {/* Card 2: Batch Readiness Dashboard (White Mockup in Dark Card) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bento-card p-7 sm:p-9 flex flex-col justify-between group hover:border-[#2563EB]/50"
          >
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Batch Readiness
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed max-w-lg mb-8">
                Give TPOs a live view of skill gaps and placement readiness across the batch.
              </p>
            </div>

            {/* Inner Dashboard UI Mockup (Light Slate Panel matching screenshot) */}
            <div className="rounded-2xl bg-[#F8FAFC] p-4 sm:p-5 text-slate-800 shadow-2xl border border-slate-200">
              
              {/* Dashboard Nav Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4 text-[11px]">
                <div className="flex items-center gap-3 overflow-x-auto">
                  <span className="font-semibold text-slate-500">Assessments</span>
                  <span className="font-bold text-[#2563EB] border-b-2 border-[#2563EB] pb-0.5">Readiness</span>
                  <span className="font-semibold text-slate-500">Dashboards</span>
                  <span className="font-semibold text-slate-500 hidden sm:inline">Repositories</span>
                </div>
                <div className="w-4 h-4 rounded-full bg-slate-300 flex items-center justify-center text-[9px] text-slate-600">
                  ?
                </div>
              </div>

              {/* Student Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-slate-300 border border-slate-400 overflow-hidden flex items-center justify-center text-xs font-bold text-slate-700">
                    SC
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 leading-tight">Student Cohort</div>
                    <div className="text-[10px] text-slate-500">B.Tech 2026 Batch • 480 Enrolled</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-700">
                  94.2% Tracked
                </span>
              </div>

              {/* Learning Path Roadmap Nodes */}
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs mb-3">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-800 mb-2.5">
                  <span>Learning Path Roadmap</span>
                  <span className="text-[10px] text-slate-500 font-normal">Cohort A1</span>
                </div>

                {/* Connected Flowchart Nodes */}
                <div className="grid grid-cols-5 gap-1.5 text-center text-[10px]">
                  <div className="p-2 rounded-lg bg-blue-50 border border-blue-200">
                    <div className="w-4 h-4 mx-auto mb-1 rounded-full bg-[#2563EB] text-slate-900 flex items-center justify-center text-[8px] font-bold">
                      ✓
                    </div>
                    <div className="font-bold text-blue-900 text-[9px]">Basics</div>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="w-4 h-4 mx-auto mb-1 rounded-full bg-emerald-500 text-slate-900 flex items-center justify-center text-[8px] font-bold">
                      ✓
                    </div>
                    <div className="font-bold text-slate-700 text-[9px]">Core CS</div>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="w-4 h-4 mx-auto mb-1 rounded-full bg-emerald-500 text-slate-900 flex items-center justify-center text-[8px] font-bold">
                      ✓
                    </div>
                    <div className="font-bold text-slate-700 text-[9px]">Full Stack</div>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="w-4 h-4 mx-auto mb-1 rounded-full bg-emerald-500 text-slate-900 flex items-center justify-center text-[8px] font-bold">
                      ✓
                    </div>
                    <div className="font-bold text-slate-700 text-[9px]">Cloud AWS</div>
                  </div>

                  <div className="p-2 rounded-lg bg-[#2563EB]/10 border border-[#2563EB]/30">
                    <div className="w-4 h-4 mx-auto mb-1 rounded-full bg-[#2563EB] text-slate-900 flex items-center justify-center text-[8px] font-bold">
                      ★
                    </div>
                    <div className="font-bold text-[#2563EB] text-[9px]">Drive Ready</div>
                  </div>
                </div>
              </div>

              {/* Lower Status Bar */}
              <div className="flex items-center justify-between text-[10px] text-slate-600 pt-1">
                <span className="flex items-center gap-1 font-semibold text-emerald-700">
                  <Check size={12} />
                  <span>380 Students Verified for Tier-1 Drives</span>
                </span>
                <span className="font-bold text-slate-700">Batch Score: 88/100</span>
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

          {/* Card 4: Verified Certificates (NEW) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bento-card p-6 flex flex-col justify-between group hover:border-[#2563EB]/50"
          >
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1.5">
                Verified Certificates
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-5">
                Tamper-proof, QR-verifiable industry credentials recognized by corporate recruiters.
              </p>
            </div>

            {/* Inner Certificate Mockup Widget */}
            <div className="rounded-xl bg-gradient-to-br from-[#161622] to-[#0D0D12] border border-[#3B82F6]/30 p-3.5 text-xs shadow-md">
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

        {/* CTA Bar */}
        <div className="mt-14 text-center">
          <button
            onClick={() => openEnquiry('PROPOSAL')}
            className="btn-pill-primary cursor-pointer active:scale-95 text-xs py-3 px-6"
          >
            <span>Request Full Platform Breakdown</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </section>
  );
}
