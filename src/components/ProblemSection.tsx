import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface ProblemSolutionCard {
  id: string;
  tag: string;
  problemTitle: string;
  problemDesc: string;
  solutionTitle: string;
  solutionPoints: string[];
  bgColor: string;
  accentBadgeColor: string;
}

const cardsData: ProblemSolutionCard[] = [
  {
    id: '01',
    tag: 'Curriculum Depth',
    problemTitle: 'Academic Syllabus Gaps',
    problemDesc: 'Colleges teach core theory, but recruiters test live cloud microservices and high-scale system design.',
    solutionTitle: 'Industry Project Curriculum',
    solutionPoints: [
      'Production codebases designed by working engineers',
      'System design, Docker & live AWS deployments',
    ],
    bgColor: 'bg-[#FBE885]',
    accentBadgeColor: 'bg-[#E5CE4C] text-[#4A3D06]',
  },
  {
    id: '02',
    tag: 'Interview Readiness',
    problemTitle: 'Low Interview Conversion',
    problemDesc: 'Students clear aptitude tests but freeze during live whiteboard coding and technical grilling.',
    solutionTitle: 'AI + Mentor Mock Panels',
    solutionPoints: [
      'Real-time speech analytics & ATS resume scoring',
      '1-on-1 technical & HR debriefs before campus drives',
    ],
    bgColor: 'bg-[#C9B6DA]',
    accentBadgeColor: 'bg-[#B19CC4] text-[#331C44]',
  },
  {
    id: '03',
    tag: 'Batch Visibility',
    problemTitle: 'Zero Real-Time Tracking',
    problemDesc: 'TPOs rely on static spreadsheets without visibility into which students are truly drive-ready.',
    solutionTitle: 'Live TPO Command Center',
    solutionPoints: [
      'Real-time student skill & diagnostic scorecards',
      'Instant verified shortlists calibrated for each company',
    ],
    bgColor: 'bg-[#C4E88C]',
    accentBadgeColor: 'bg-[#ACD46E] text-[#254607]',
  },
  {
    id: '04',
    tag: 'Recruiter Outreach',
    problemTitle: 'Campus Drive Friction',
    problemDesc: 'Connecting with premium tech recruiters and managing multiple rounds causes heavy overhead.',
    solutionTitle: '35+ Corporate Hiring Partners',
    solutionPoints: [
      'Direct on-campus recruitment pipelines',
      'Pre-vetted scorecards sent straight to recruiter ATS',
    ],
    bgColor: 'bg-[#FCA891]',
    accentBadgeColor: 'bg-[#E58F78] text-[#4C180B]',
  },
];

export function ProblemSection() {
  return (
    <section id="colleges" className="py-24 lg:py-32 bg-[#0A0A0D] relative border-b border-white/5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-[#FF4500]/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF4500]/10 border border-[#FF4500]/25 text-[#FFA000] text-xs font-semibold tracking-wide mb-4">
            <Sparkles size={14} className="text-[#FF4500]" />
            <span>Institutional Diagnostic</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Your Students Learn. But Are They{' '}
            <span className="bg-gradient-to-r from-[#FF4500] via-[#FF7A00] to-[#FFA000] bg-clip-text text-transparent">
              Placement Ready?
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto font-normal">
            Bridging the structural gap between classroom learning and recruiter expectations.
          </p>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════
            CARD GRID (PROBLEM + SOLUTION TOGETHER INSIDE EACH CARD)
            ══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {cardsData.map((item, index) => {
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="group relative rounded-[32px] bg-[#F8FAFC] text-slate-900 p-4 sm:p-5 flex flex-col justify-between shadow-2xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-orange-500/10 border border-white/80"
              >
                {/* ── TOP HALF: THE PROBLEM ── */}
                <div className="p-2 sm:p-2.5">
                  {/* Pill Tag & Circular Arrow */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-slate-200/80 text-slate-700 text-[11px] font-semibold tracking-wide">
                      {item.tag}
                    </span>

                    <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-slate-200/80 flex items-center justify-center text-slate-700 group-hover:bg-[#FF4500] group-hover:text-white group-hover:border-[#FF4500] transition-colors">
                      <ArrowUpRight size={16} />
                    </div>
                  </div>

                  {/* Problem Badge & Title */}
                  <div className="flex items-center gap-1.5 text-rose-600 text-[11px] font-bold uppercase tracking-wider mb-1">
                    <AlertCircle size={13} />
                    <span>Challenge</span>
                  </div>

                  <h3 className="text-xl sm:text-[22px] font-extrabold text-slate-900 tracking-tight leading-snug mb-2">
                    {item.problemTitle}
                  </h3>

                  {/* Problem Description */}
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
                    {item.problemDesc}
                  </p>
                </div>

                {/* ── BOTTOM HALF: THE SOLUTION (DIRECTLY EMBEDDED) ── */}
                <div className={`mt-5 w-full rounded-[24px] ${item.bgColor} p-4 sm:p-4.5 flex flex-col justify-between relative overflow-hidden shadow-inner text-left`}>
                  <div>
                    {/* Solution Tag */}
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${item.accentBadgeColor} flex items-center gap-1`}>
                        <CheckCircle2 size={11} />
                        <span>Grow360 Solution</span>
                      </span>
                    </div>

                    {/* Solution Title */}
                    <h4 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug mb-2.5">
                      {item.solutionTitle}
                    </h4>

                    {/* Concise Solution Points */}
                    <ul className="space-y-1.5 text-xs text-slate-800 font-medium">
                      {item.solutionPoints.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-slate-900 font-bold leading-none mt-0.5">•</span>
                          <span className="leading-snug">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom strip */}
                  <div className="mt-3.5 pt-2 border-t border-black/10 flex items-center justify-between text-[11px] font-semibold text-slate-700">
                    <span>Outcome-Driven</span>
                    <span className="text-slate-900 font-bold">
                      100% Industry-Aligned
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
