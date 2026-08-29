import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { Search, PenTool, Play, BarChart3, Zap } from 'lucide-react';

interface TimelineStep {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  details: string[];
}

const steps: TimelineStep[] = [
  {
    number: '01',
    title: 'Discover',
    description: 'Understand institution goals, student profiles and placement requirements.',
    icon: <Search size={20} />,
    details: ['Campus assessment', 'Student profiling', 'Goal alignment'],
  },
  {
    number: '02',
    title: 'Design',
    description: 'Create a customized training roadmap aligned with your objectives.',
    icon: <PenTool size={20} />,
    details: ['Curriculum mapping', 'Timeline planning', 'Resource allocation'],
  },
  {
    number: '03',
    title: 'Deliver',
    description: 'Conduct expert-led training on campus or online with practical focus.',
    icon: <Play size={20} />,
    details: ['Expert trainers', 'Live projects', 'Hands-on labs'],
  },
  {
    number: '04',
    title: 'Assess',
    description: 'Evaluate learning, projects and employability through continuous assessment.',
    icon: <BarChart3 size={20} />,
    details: ['Skill assessments', 'Project reviews', 'Progress tracking'],
  },
  {
    number: '05',
    title: 'Transform',
    description: 'Build industry-ready students and stronger placement outcomes.',
    icon: <Zap size={20} />,
    details: ['Placement readiness', 'Mock interviews', 'Career outcomes'],
  },
];

export function HowWeWorkSection() {
  const { ref, isInView } = useInView();
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Scroll-based activation
  useEffect(() => {
    if (!isInView) return;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const scrolledInSection = window.innerHeight / 2 - rect.top;
      const progress = Math.max(0, Math.min(1, scrolledInSection / sectionHeight));
      const step = Math.min(steps.length - 1, Math.floor(progress * steps.length));
      setActiveStep(step);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isInView]);

  const handleStepClick = useCallback((index: number) => {
    setActiveStep(index);
  }, []);

  return (
    <section
      id="how-we-work"
      ref={(el) => {
        (sectionRef as any).current = el;
        (ref as any).current = el;
      }}
      className="section-padding bg-surface-white relative grid-bg overflow-hidden"
    >
      {/* Section number */}
      <div className="absolute top-6 right-10 font-mono text-[80px] font-bold text-ink-50 leading-none select-none hidden lg:block">
        04
      </div>

      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-10">
        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="section-label-accent">● How We Work</span>
            </div>
            <h2 className="heading-editorial text-3xl sm:text-4xl lg:text-[2.75rem] text-ink-900">
              A Proven{' '}
              <span className="text-tejas-red">5-Step</span>{' '}
              <br className="hidden sm:block" />
              Partnership Process.
            </h2>
          </div>
          <p className="text-sm text-ink-400 max-w-md leading-relaxed">
            We collaborate with your institution to design, deliver and drive measurable impact
            through a structured partnership process.
          </p>
        </div>

        {/* Timeline */}
        <div className="grid lg:grid-cols-[280px_1fr] gap-8 lg:gap-12">
          {/* Step selector (vertical on desktop) */}
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {steps.map((step, i) => (
              <button
                key={i}
                onClick={() => handleStepClick(i)}
                className={`flex items-center gap-4 px-4 py-3 text-left transition-all duration-400 cursor-pointer shrink-0 lg:shrink border ${
                  activeStep === i
                    ? 'border-tejas-red/30 bg-tejas-red/5'
                    : 'border-transparent hover:border-ink-100 hover:bg-ink-50/50'
                }`}
              >
                <span
                  className={`font-mono text-lg font-bold transition-colors duration-300 ${
                    activeStep === i ? 'text-tejas-red' : 'text-ink-200'
                  }`}
                >
                  {step.number}
                </span>
                <div>
                  <span
                    className={`text-sm font-semibold tracking-wide uppercase transition-colors duration-300 ${
                      activeStep === i ? 'text-ink-900' : 'text-ink-400'
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Step detail */}
          <div className="relative">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={false}
                animate={{
                  opacity: activeStep === i ? 1 : 0,
                  y: activeStep === i ? 0 : 20,
                  pointerEvents: activeStep === i ? 'auto' as const : 'none' as const,
                }}
                transition={{ duration: 0.4 }}
                className={`${activeStep === i ? '' : 'absolute inset-0'}`}
              >
                <div className="border border-ink-100 p-8 lg:p-10 bg-white relative">
                  {/* Corner registration marks */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-tejas-red/20" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-tejas-red/20" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-tejas-red/20" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-tejas-red/20" />

                  {/* Tech label */}
                  <div className="font-mono text-[9px] tracking-[0.15em] text-ink-300 uppercase mb-6">
                    {`STEP.${step.number} / ${step.title.toUpperCase()}`}
                  </div>

                  <div className="flex items-start gap-6">
                    {/* Icon */}
                    <div className="w-14 h-14 border border-tejas-red/20 flex items-center justify-center text-tejas-red bg-tejas-red/5 shrink-0">
                      {step.icon}
                    </div>

                    <div className="flex-1">
                      {/* Step number large */}
                      <div className="font-mono text-5xl font-bold text-ink-50 mb-2">
                        {step.number}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-ink-900 tracking-tight mb-3">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-ink-400 leading-relaxed mb-6 max-w-md">
                        {step.description}
                      </p>

                      {/* Details */}
                      <div className="flex flex-wrap gap-2">
                        {step.details.map((detail, j) => (
                          <span key={j} className="tech-tag text-[9px]">
                            {detail}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Progress bar */}
            <div className="mt-4 flex gap-1">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className="flex-1 h-0.5 transition-all duration-500"
                  style={{
                    backgroundColor:
                      i <= activeStep
                        ? 'var(--color-tejas-red)'
                        : 'var(--color-ink-100)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
