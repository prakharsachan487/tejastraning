import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, Briefcase, BarChart3, Brain, Users, GraduationCap } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { useEnquiry } from '../context/EnquiryContext';

interface Program {
  icon: React.ReactNode;
  category: string;
  description: string;
  skills: string[];
  deliveryMode: string;
}

const programs: Program[] = [
  {
    icon: <Code2 size={20} />,
    category: 'Engineering Programs',
    description:
      'Industry-ready training aligned with B.Tech and engineering student requirements. Hands-on projects and real-world system design.',
    skills: ['DSA', 'Web Development', 'Cloud Computing', 'System Design', 'Projects'],
    deliveryMode: 'On-campus / Hybrid',
  },
  {
    icon: <Briefcase size={20} />,
    category: 'Computer Applications',
    description:
      'Practical skills for BCA, MCA and IT students. Full-stack development, databases, and modern frameworks.',
    skills: ['Full-Stack Dev', 'Database Design', 'API Development', 'DevOps', 'Testing'],
    deliveryMode: 'On-campus / Online',
  },
  {
    icon: <BarChart3 size={20} />,
    category: 'Management Programs',
    description:
      'Employability and soft skills for BBA, MBA students. Analytics, marketing, and communication training.',
    skills: ['Business Analytics', 'Marketing', 'Communication', 'Leadership', 'Finance'],
    deliveryMode: 'On-campus / Hybrid',
  },
  {
    icon: <Brain size={20} />,
    category: 'Aptitude & Employability',
    description:
      'Quantitative, logical reasoning and verbal preparation. Comprehensive aptitude training for placement readiness.',
    skills: ['Quantitative', 'Logical Reasoning', 'Verbal', 'Data Interpretation', 'Mock Tests'],
    deliveryMode: 'On-campus / Online',
  },
  {
    icon: <Users size={20} />,
    category: 'Professional Skills',
    description:
      'Soft skill development, presentation skills, and workplace readiness training for all streams.',
    skills: ['Communication', 'Presentations', 'Team Collaboration', 'Time Management', 'Email Writing'],
    deliveryMode: 'On-campus',
  },
  {
    icon: <GraduationCap size={20} />,
    category: 'Placement Preparation',
    description:
      'Interview preparation, resume building, group discussion practice, and mock placement drives.',
    skills: ['Mock Interviews', 'Resume Building', 'Group Discussion', 'HR Rounds', 'Company Research'],
    deliveryMode: 'On-campus / Hybrid',
  },
];

export function ProgramsSection() {
  const { ref, isInView } = useInView();
  const { openEnquiry } = useEnquiry();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="programs" ref={ref} className="section-padding bg-surface-white relative">
      {/* Section number */}
      <div className="absolute top-6 right-10 font-mono text-[80px] font-bold text-ink-50 leading-none select-none hidden lg:block">
        02
      </div>

      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-10">
        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="section-label-accent">● Our Programs</span>
            </div>
            <h2 className="heading-editorial text-3xl sm:text-4xl lg:text-[2.75rem] text-ink-900">
              Industry-Aligned Training{' '}
              <br className="hidden sm:block" />
              Programs for{' '}
              <span className="text-tejas-red">Every Stream.</span>
            </h2>
          </div>
          <button
            className="inline-flex items-center gap-2 text-sm font-medium text-ink-500 hover:text-tejas-red transition-colors cursor-pointer group"
            onClick={() => openEnquiry('PROPOSAL')}
          >
            Explore All Programs
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Program cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {programs.map((program, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="card-hover group relative"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className={`relative h-full border transition-all duration-400 p-6 ${
                  hoveredIndex === i
                    ? 'border-tejas-red/30 bg-white'
                    : 'border-ink-100 bg-white/60'
                }`}
              >
                {/* Corner marks */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-ink-200 group-hover:border-tejas-red/40 transition-colors" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-ink-200 group-hover:border-tejas-red/40 transition-colors" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-ink-200 group-hover:border-tejas-red/40 transition-colors" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-ink-200 group-hover:border-tejas-red/40 transition-colors" />

                {/* Figure label */}
                <div className="font-mono text-[9px] tracking-[0.15em] text-ink-300 uppercase mb-4">
                  {`SEC.02 / FIG.${String(i + 1).padStart(2, '0')}`}
                </div>

                {/* Icon */}
                <div
                  className={`w-10 h-10 border flex items-center justify-center mb-4 transition-all duration-300 ${
                    hoveredIndex === i
                      ? 'border-tejas-red/30 text-tejas-red bg-tejas-red/5'
                      : 'border-ink-200 text-ink-400'
                  }`}
                >
                  {program.icon}
                </div>

                {/* Category */}
                <h3 className="text-base font-bold text-ink-900 tracking-tight mb-2">
                  {program.category}
                </h3>

                {/* Description */}
                <p className="text-sm text-ink-400 leading-relaxed mb-4">
                  {program.description}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {program.skills.map((skill, j) => (
                    <span
                      key={j}
                      className="tech-tag text-[9px]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-ink-50">
                  <span className="font-mono text-[9px] text-ink-300 tracking-wider uppercase">
                    {program.deliveryMode}
                  </span>
                  <button
                    onClick={() => openEnquiry('PROPOSAL')}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-ink-500 group-hover:text-tejas-red transition-colors cursor-pointer"
                  >
                    View Program
                    <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
