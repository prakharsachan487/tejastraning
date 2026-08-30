import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Flame, Sparkles, Terminal } from 'lucide-react';
import { useEnquiry } from '../context/EnquiryContext';

interface ShatterWordProps {
  word: string;
  startIndex: number;
  totalGradientLength?: number;
  isGradient?: boolean;
}

function ShatterWord({
  word,
  startIndex,
  totalGradientLength = 16,
  isGradient = false,
}: ShatterWordProps) {
  return (
    <span className="inline-flex mr-[0.28em] last:mr-0">
      {word.split('').map((char, charIdx) => {
        const globalIdx = startIndex + charIdx;

        // Deterministic scatter trajectory for slow shatter effect
        const xOffset = ((globalIdx * 37 + 11) % 60) - 30; // -30px to +30px
        const yOffset = ((globalIdx * 43 + 17) % 50) - 25; // -25px to +25px
        const rotOffset = ((globalIdx * 59 + 23) % 40) - 20; // -20deg to +20deg
        const scaleStart = 0.5 + ((globalIdx * 19) % 6) * 0.1; // 0.5 to 1.1

        // Precise mathematical RGB interpolation from #FF4500 (255, 69, 0) to #FFA000 (255, 160, 0)
        let charColor = '#FFFFFF';
        if (isGradient) {
          // Interpolate between #FF4500 (R:255, G:69, B:0) and #FFA000 (R:255, G:160, B:0)
          const g = Math.round(69 + (160 - 69) * ((startIndex + charIdx - 20) / Math.max(totalGradientLength - 1, 1)));
          charColor = `rgb(255, ${Math.min(Math.max(g, 69), 160)}, 0)`;
        }

        return (
          <motion.span
            key={`${char}-${charIdx}`}
            initial={{
              opacity: 0,
              x: xOffset,
              y: yOffset,
              rotate: rotOffset,
              scale: scaleStart,
            }}
            animate={{
              opacity: 1,
              x: 0,
              y: 0,
              rotate: 0,
              scale: 1,
            }}
            transition={{
              duration: 1.2, // Cinematic slow shatter assembly
              delay: 0.1 + globalIdx * 0.035, // Cascading reassembly
              ease: [0.16, 1, 0.3, 1], // Magnetic snap easing
            }}
            style={{ color: charColor }}
            className="inline-block font-extrabold select-none will-change-transform"
          >
            {char}
          </motion.span>
        );
      })}
    </span>
  );
}

export function Hero() {
  const { openEnquiry } = useEnquiry();
  const [activeStep, setActiveStep] = useState(0);

  // Stepped cycle animation for bottom steps (Learn -> Practice -> Achieve)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden obsidian-grid bg-[#0A0A0D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Animated Entrance Headline, Paragraph & Buttons */}
          <div className="lg:col-span-6 flex flex-col text-left">
            
            {/* 01. Eyebrow Tag Badge */}
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF4500]/10 border border-[#FF4500]/25 text-[#FFA000] text-xs font-semibold tracking-wide mb-6 w-max"
            >
              <span className="w-2 h-2 rounded-full bg-[#FF4500] animate-ping" />
              <span>The Placement Infrastructure for Colleges</span>
            </motion.div>

            {/* 02. Slow Shatter Re-assembly Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[3.25rem] xl:text-[3.65rem] font-extrabold tracking-tight leading-[1.15]">
              {/* Line 1: The Infrastructure for (Solid White) */}
              <span className="block whitespace-nowrap overflow-visible">
                <ShatterWord word="The" startIndex={0} />
                <ShatterWord word="Infrastructure" startIndex={3} />
                <ShatterWord word="for" startIndex={17} />
              </span>

              {/* Line 2: Campus Placements (Electric Flame Orange #FF4500 -> #FFA000) */}
              <span className="block whitespace-nowrap overflow-visible mt-1">
                <ShatterWord word="Campus" startIndex={20} isGradient totalGradientLength={16} />
                <ShatterWord word="Placements" startIndex={26} isGradient totalGradientLength={16} />
              </span>
            </h1>

            {/* 03. Subheadline Fade & Slide */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.6, ease: 'easeOut' }}
              className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-xl"
            >
              Industry-led training, AI-powered assessments, interview preparation and hiring support — everything your college needs to improve student employability and placement outcomes.
            </motion.p>

            {/* 04. Pill CTAs with spring entrance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.5, ease: 'easeOut' }}
              className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => openEnquiry('CONSULTATION')}
                className="btn-pill-primary cursor-pointer"
              >
                <Sparkles size={16} className="text-white" />
                <span>Request Demo</span>
                <ArrowRight size={16} />
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="#programs"
                className="btn-pill-secondary cursor-pointer"
              >
                <span>View Programs</span>
                <ArrowRight size={16} className="text-slate-400" />
              </motion.a>
            </motion.div>

            {/* 05. Trust bullet checks */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.15, duration: 0.6 }}
              className="mt-8 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-[#FF4500]" />
                <span>AI Mock Diagnostics</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-[#FF4500]" />
                <span>Industry Mentorship</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-[#FF4500]" />
                <span>Campus Hiring Drives</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: 3D Animated Coder Terminal / Workstation Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, rotateX: 12, rotateY: -8, y: 40 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0, rotateY: 0, y: 0 }}
            transition={{
              duration: 0.85,
              delay: 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="lg:col-span-6 relative perspective-1200"
          >
            <div className="relative rounded-3xl bg-[#111116] border border-slate-700/80 p-5 sm:p-6 overflow-hidden">
              
              {/* Window Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-medium text-slate-400 hidden sm:inline flex items-center gap-1.5">
                    <Terminal size={12} className="text-slate-500" />
                    tejas://student-terminal/workspace
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FF4500]/15 text-[#FFA000] text-[10px] font-semibold border border-[#FF4500]/30 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF4500] animate-pulse" />
                    Live Session
                  </span>
                </div>
              </div>

              {/* Workstation Graphic / Coder Card */}
              <div className="relative rounded-2xl bg-[#15151D] p-6 border border-slate-800 flex flex-col justify-between min-h-[320px]">
                
                {/* Floating Skill Badge with Bounce Reveal */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <motion.div
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.6, type: 'spring', stiffness: 260, damping: 18 }}
                      className="w-12 h-12 rounded-2xl bg-[#FF4500]/15 border border-[#FF4500]/30 flex items-center justify-center text-[#FF4500]"
                    >
                      <Flame size={24} />
                    </motion.div>
                    <div>
                      <div className="text-sm font-bold text-white">
                        Full Stack & DSA Mastery
                      </div>
                      <div className="text-xs text-slate-400">
                        Module 04: System Design
                      </div>
                    </div>
                  </div>

                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.75, type: 'spring', stiffness: 300, damping: 20 }}
                    className="text-xs font-bold text-[#FFA000] bg-[#FF4500]/15 px-2.5 py-1 rounded-lg border border-[#FF4500]/30"
                  >
                    94.2% Ready
                  </motion.span>
                </div>

                {/* Animated Code Diagnostic Terminal Snippet */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  className="my-5 p-3.5 rounded-xl bg-[#0C0C10] border border-slate-800 text-xs text-slate-300 space-y-1.5"
                >
                  <div className="text-slate-500 flex items-center justify-between text-[11px]">
                    <span>// Real-time AI Code Review & Feedback</span>
                    <span className="text-[10px] text-emerald-400 font-semibold">● Compiled</span>
                  </div>
                  <div className="text-[#FF6A00] font-medium">class PlacementEvaluator &#123;</div>
                  <div className="pl-4 text-emerald-300 font-medium">solve(DSA_Problem target, AudioStream mic) &#123;</div>
                  <div className="pl-8 text-slate-400">
                    optimality: <span className="text-[#FFA000] font-bold">O(N log N) [Passed]</span>
                  </div>
                  <div className="pl-8 text-slate-400">
                    speechClarity: <span className="text-[#FF6A00] font-bold">98.5% [Articulate]</span>
                  </div>
                  <div className="pl-4 text-emerald-300 font-medium">&#125;</div>
                  <div className="text-[#FF6A00] font-medium">&#125;</div>
                </motion.div>

                {/* Bottom Step Indicator with Live Cycling Pulse */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-4">
                    <span
                      className={`font-bold flex items-center gap-1.5 transition-all duration-300 ${
                        activeStep === 0 ? 'text-[#FF4500] scale-105' : 'text-slate-500'
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          activeStep === 0 ? 'bg-[#FF4500] animate-ping' : 'bg-slate-700'
                        }`}
                      />{' '}
                      Learn
                    </span>

                    <span
                      className={`font-bold flex items-center gap-1.5 transition-all duration-300 ${
                        activeStep === 1 ? 'text-[#FF8C00] scale-105' : 'text-slate-500'
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          activeStep === 1 ? 'bg-[#FF8C00] animate-ping' : 'bg-slate-700'
                        }`}
                      />{' '}
                      Practice
                    </span>

                    <span
                      className={`font-bold flex items-center gap-1.5 transition-all duration-300 ${
                        activeStep === 2 ? 'text-[#FACC15] scale-105' : 'text-slate-500'
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          activeStep === 2 ? 'bg-[#FACC15] animate-ping' : 'bg-slate-700'
                        }`}
                      />{' '}
                      Achieve
                    </span>
                  </div>
                  <span className="text-slate-400 text-[11px] font-medium">
                    Offer Track #TJ-2026
                  </span>
                </div>

              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
