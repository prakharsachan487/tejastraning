import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

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
        const xOffset = ((globalIdx * 37 + 11) % 60) - 30;
        const yOffset = ((globalIdx * 43 + 17) % 50) - 25;
        const rotOffset = ((globalIdx * 59 + 23) % 40) - 20;
        const scaleStart = 0.5 + ((globalIdx * 19) % 6) * 0.1;

        let charColor = '#FFFFFF';
        if (isGradient) {
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
              delay: 0.15 + globalIdx * 0.022,
              duration: 0.55,
              ease: [0.175, 0.885, 0.32, 1.275],
            }}
            className="inline-block origin-center"
            style={{ color: charColor }}
          >
            {char}
          </motion.span>
        );
      })}
    </span>
  );
}

const AI_BANNER_SLIDES = [
  {
    image: '/banner_ai_workspace_1788173044744.jpg',
    tag: 'Cloud Sandbox Environment',
    title: 'Live Coding & Automated Test Evaluation',
    desc: 'Real-time telemetry, memory footprint analytics, and execution benchmarks.',
    stat: '99.4% Eval Speed',
    badgeColor: '#00B4D8'
  },
  {
    image: '/banner_ai_interview_1788173123799.jpg',
    tag: 'AI Diagnostic Suite',
    title: '1-on-1 Technical Mock Interviews',
    desc: 'Audio-visual rubric scoring, algorithmic optimization, and system design drills.',
    stat: '15,000+ Rounds',
    badgeColor: '#FF4500'
  },
  {
    image: '/banner_ai_mentor_1788173076955.jpg',
    tag: 'Industry Mentorship Guild',
    title: 'Trained by Senior Tier-1 Engineers',
    desc: 'Personalized code reviews, architecture guidance, and resume refinement.',
    stat: '300+ Mentors',
    badgeColor: '#FFA000'
  },
  {
    image: '/banner_ai_hackathon_1788173097894.jpg',
    tag: 'Campus Competitive Arena',
    title: 'Live Speed Contests & Hackathons',
    desc: 'Timed problem-solving sprints designed for campus placement filtration.',
    stat: '700+ Problems',
    badgeColor: '#22C55E'
  },
  {
    image: '/banner_ai_career_1788173147327.jpg',
    tag: 'Placement Transformation',
    title: 'Decoding Corporate Hiring Tracks',
    desc: 'Bridging tier-2/3 engineering colleges directly with top tech firms.',
    stat: '₹44 LPA Peak',
    badgeColor: '#8B5CF6'
  }
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto scroll banner slides every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % AI_BANNER_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const slide = AI_BANNER_SLIDES[currentSlide];

  return (
    <section className="relative pt-32 pb-16 lg:pt-38 lg:pb-24 overflow-hidden obsidian-grid bg-[#0A0A0D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Headline, Paragraph & Action Button */}
          <div className="lg:col-span-6 flex flex-col text-left">
            
            {/* 01. Eyebrow Tag Badge */}
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00B4D8]/10 border border-[#00B4D8]/30 text-[#00B4D8] text-xs font-semibold tracking-wide mb-6 w-max"
            >
              <span className="w-2 h-2 rounded-full bg-[#00B4D8] animate-ping" />
              <span>Grow360 — Decoding the corporate world</span>
            </motion.div>

            {/* 02. Slow Shatter Re-assembly Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[3.25rem] xl:text-[3.65rem] font-extrabold tracking-tight leading-[1.15]">
              <span className="block whitespace-nowrap overflow-visible">
                <ShatterWord word="The" startIndex={0} />
                <ShatterWord word="Infrastructure" startIndex={3} />
                <ShatterWord word="for" startIndex={17} />
              </span>

              <span className="block whitespace-nowrap overflow-visible mt-1">
                <ShatterWord word="Campus" startIndex={20} isGradient totalGradientLength={16} />
                <ShatterWord word="Placements" startIndex={26} isGradient totalGradientLength={16} />
              </span>
            </h1>

            {/* 03. Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.6, ease: 'easeOut' }}
              className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-xl"
            >
              Industry-led training, AI-powered assessments, interview preparation and hiring support — everything your college needs to improve student employability and placement outcomes.
            </motion.p>

            {/* 04. Action CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.5, ease: 'easeOut' }}
              className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4"
            >
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="#training-programs"
                className="btn-pill-primary cursor-pointer flex items-center gap-2 shadow-lg shadow-orange-500/20 px-7 py-3 text-sm"
              >
                <span>View Programs &amp; Curriculum</span>
                <ArrowRight size={16} />
              </motion.a>
            </motion.div>

            {/* 05. Trust bullet checks */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.15, duration: 0.6 }}
              className="mt-8 pt-6 border-t border-white/5 flex flex-wrap items-center gap-5 text-xs text-slate-400 font-mono"
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

          {/* Right Column: Animated AI Interactive Showcase Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.85,
              delay: 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="lg:col-span-6 relative"
          >
            {/* Ambient glowing border */}
            <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-[#00B4D8]/30 via-[#FF4500]/25 to-[#FFA000]/30 blur-2xl opacity-75 pointer-events-none" />

            <div className="relative rounded-3xl bg-[#111116] border border-white/15 p-4 sm:p-5 shadow-2xl overflow-hidden backdrop-blur-xl group">
              
              {/* Carousel Image Container */}
              <div className="relative h-72 sm:h-84 md:h-96 rounded-2xl overflow-hidden bg-black/60 border border-white/10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.65, ease: 'easeInOut' }}
                    className="absolute inset-0"
                  >
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover object-center"
                    />

                    {/* Gradient Overlay for Text Legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0D] via-[#0A0A0D]/50 to-transparent" />
                  </motion.div>
                </AnimatePresence>

                {/* Floating Top Tag */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-xs font-mono font-bold text-white shadow-lg">
                    <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: slide.badgeColor }} />
                    <span>{slide.tag}</span>
                  </div>
                </div>

                {/* Floating Stat Pill */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[11px] font-mono font-bold text-[#FFA000]">
                    {slide.stat}
                  </div>
                </div>

                {/* Bottom Overlay Text */}
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <motion.div
                    key={`text-${currentSlide}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h3 className="text-lg sm:text-xl font-extrabold text-white font-[family-name:var(--font-display)] drop-shadow-md mb-1">
                      {slide.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 drop-shadow">
                      {slide.desc}
                    </p>
                  </motion.div>
                </div>

                {/* Manual Navigation Arrows on Hover */}
                <button
                  onClick={() => setCurrentSlide((prev) => (prev - 1 + AI_BANNER_SLIDES.length) % AI_BANNER_SLIDES.length)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-20 border border-white/10"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft size={16} />
                </button>

                <button
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % AI_BANNER_SLIDES.length)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-20 border border-white/10"
                  aria-label="Next Slide"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Bottom Indicators & Feature Badges */}
              <div className="mt-4 flex items-center justify-between px-1">
                {/* Slide dots */}
                <div className="flex items-center gap-1.5">
                  {AI_BANNER_SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        idx === currentSlide ? 'w-6 bg-[#00B4D8]' : 'w-2 bg-white/20 hover:bg-white/40'
                      }`}
                      aria-label={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <div className="text-[11px] font-mono text-slate-400">
                  Grow360 Campus Suite • <span className="text-[#00B4D8]">Live AI Sandbox</span>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
