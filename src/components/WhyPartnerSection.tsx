import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import {
  Target,
  Wrench,
  LineChart,
  Award,
  Shield,
  Settings,
} from 'lucide-react';

interface Solution {
  icon: React.ReactNode;
  title: string;
  description: string;
  tag: string;
}

const solutions: Solution[] = [
  {
    icon: <Target size={22} />,
    title: 'Industry-Aligned Curriculum',
    description: 'Training designed around current industry expectations and emerging technologies.',
    tag: 'CURRICULUM',
  },
  {
    icon: <Wrench size={22} />,
    title: 'Practical Learning',
    description: 'Projects, case studies and hands-on implementation that builds real capabilities.',
    tag: 'HANDS-ON',
  },
  {
    icon: <LineChart size={22} />,
    title: 'Measurable Outcomes',
    description: 'Track student skill development and employability improvement with data-driven reporting.',
    tag: 'ANALYTICS',
  },
  {
    icon: <Award size={22} />,
    title: 'Placement Readiness',
    description: 'Comprehensive aptitude, interview and placement preparation for every student.',
    tag: 'PLACEMENT',
  },
  {
    icon: <Shield size={22} />,
    title: 'End-to-End Support',
    description: 'Continuous support from training design through delivery and placement readiness.',
    tag: 'SUPPORT',
  },
  {
    icon: <Settings size={22} />,
    title: 'Customized Programs',
    description: 'Programs adapted to your institutional requirements, student profile and goals.',
    tag: 'CUSTOM',
  },
];

export function WhyPartnerSection() {
  const { ref, isInView } = useInView();

  return (
    <section
      id="why-partner"
      ref={ref}
      className="section-padding relative bg-ink-900 text-white overflow-hidden grid-bg-dark"
    >
      {/* Section number */}
      <div className="absolute top-6 right-10 font-mono text-[80px] font-bold text-white/[0.03] leading-none select-none hidden lg:block">
        03
      </div>

      {/* Subtle red accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-tejas-red/30 to-transparent" />

      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-10">
        {/* Section header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[10px] tracking-[0.15em] text-tejas-red uppercase">
              ● Why Colleges Partner With Grow360
            </span>
          </div>
          <h2 className="heading-editorial text-3xl sm:text-4xl lg:text-[2.75rem] text-white max-w-2xl">
            We Don't Just Train.{' '}
            <br className="hidden sm:block" />
            We Transform{' '}
            <span className="text-tejas-red">Outcomes.</span>
          </h2>
        </div>

        {/* Solutions grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {solutions.map((solution, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="card-hover group"
            >
              <div className="relative h-full border border-ink-700 p-6 hover:border-tejas-red/30 transition-all duration-400 bg-ink-800/50">
                {/* Technical label */}
                <div className="font-mono text-[9px] tracking-[0.15em] text-ink-500 uppercase mb-5">
                  {solution.tag}
                </div>

                {/* Icon */}
                <div className="w-11 h-11 border border-ink-600 flex items-center justify-center text-ink-400 group-hover:text-tejas-red group-hover:border-tejas-red/30 transition-all duration-300 mb-5">
                  {solution.icon}
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-white tracking-tight mb-2">
                  {solution.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-ink-400 leading-relaxed">
                  {solution.description}
                </p>

                {/* Corner accents */}
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-ink-700 group-hover:border-tejas-red/30 transition-colors" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-ink-700 group-hover:border-tejas-red/30 transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-tejas-red/20 to-transparent" />
    </section>
  );
}
