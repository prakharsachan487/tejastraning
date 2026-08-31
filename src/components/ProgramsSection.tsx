import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, 
  Cpu, 
  Sparkles, 
  Briefcase, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Award,
  Zap,
  Terminal,
  FileCode
} from 'lucide-react';
import { useEnquiry } from '../context/EnquiryContext';

interface Track {
  title: string;
  duration: string;
  level: string;
  tags: string[];
  outcome: string;
  highlights: string[];
}

interface Category {
  id: string;
  name: string;
  shortName: string;
  badge: string;
  icon: typeof Code2;
  tagline: string;
  stat: string;
  tracks: Track[];
}

const categories: Category[] = [
  {
    id: 'core',
    name: 'Technology & Core CS',
    shortName: 'Core CS & DSA',
    badge: 'Tier-1 Mapped',
    icon: Code2,
    tagline: 'Algorithmic problem solving, scalable architecture, and computer science fundamentals.',
    stat: '700+ LeetCode Patterns Solved',
    tracks: [
      {
        title: 'DSA & Algorithmic Mastery',
        duration: '4 Months',
        level: 'Interview Ready',
        tags: ['Dynamic Programming', 'Graph Theory', 'LeetCode Hard', 'Pattern Drills'],
        outcome: 'Cracks Top Product Firm Technical Coding Rounds',
        highlights: ['50+ Mock Technical Interviews', 'Optimal Time & Space Complexity Drills'],
      },
      {
        title: 'System Design & Scalable Architectures',
        duration: '3 Months',
        level: 'Advanced',
        tags: ['Microservices', 'Kafka Streams', 'Redis Caching', 'Database Sharding'],
        outcome: 'Designs systems handling millions of concurrent users',
        highlights: ['Real Architecture Case Studies', 'High-Availability Distributed Systems'],
      },
      {
        title: 'Core CS Fundamentals (OS, DBMS & Networks)',
        duration: '2 Months',
        level: 'Foundation to Pro',
        tags: ['Linux Concurrency', 'SQL Query Tuning', 'TCP/IP Stack', 'LLD & OOP'],
        outcome: 'Clears core university syllabus & foundational interviews',
        highlights: ['ACID & Transactions Deep Dive', 'SOLID Design Patterns'],
      },
    ],
  },
  {
    id: 'fullstack',
    name: 'Full Stack & Cloud',
    shortName: 'Full Stack & Cloud',
    badge: 'Production Systems',
    icon: Cpu,
    tagline: 'Modern enterprise web development with production deployments on AWS & Vercel.',
    stat: '15+ Live Production Capstones',
    tracks: [
      {
        title: 'Full Stack MERN & Next.js 15',
        duration: '4 Months',
        level: 'Full Lifecycle',
        tags: ['TypeScript', 'Next.js App Router', 'Node.js', 'MongoDB', 'Tailwind'],
        outcome: 'Builds & deploys secure, high-speed web apps',
        highlights: ['JWT & OAuth2 Security', 'Dockerized Deployment to AWS'],
      },
      {
        title: 'Enterprise Java & Spring Boot',
        duration: '4 Months',
        level: 'Enterprise',
        tags: ['Spring Boot 3', 'Hibernate JPA', 'Kafka', 'Microservices'],
        outcome: 'Engineers fault-tolerant backend services',
        highlights: ['Spring Cloud & Security', 'JUnit 5 & Mockito Unit Testing'],
      },
      {
        title: 'Cloud DevOps & Infrastructure',
        duration: '3 Months',
        level: 'Industry Grade',
        tags: ['AWS Architecture', 'Terraform', 'Docker', 'Kubernetes', 'CI/CD'],
        outcome: 'Automates production cloud infrastructure',
        highlights: ['GitHub Actions Automation', 'Prometheus & Grafana Monitoring'],
      },
    ],
  },
  {
    id: 'emerging',
    name: 'AI & Emerging Tech',
    shortName: 'Generative AI & Data',
    badge: 'High Demand',
    icon: Sparkles,
    tagline: 'Generative AI, Large Language Models, Neural Networks, and modern Data BI.',
    stat: '20+ Applied AI Models Built',
    tracks: [
      {
        title: 'Generative AI & LLM Systems',
        duration: '4 Months',
        level: 'Cutting-Edge',
        tags: ['LangChain', 'RAG Pipelines', 'Vector DBs', 'OpenAI & Claude API'],
        outcome: 'Builds autonomous AI agents and enterprise chatbots',
        highlights: ['Pinecone & ChromaDB Integration', 'Prompt Optimization & Fine-Tuning'],
      },
      {
        title: 'Machine Learning & Data Science',
        duration: '4 Months',
        level: 'Applied AI',
        tags: ['Python', 'PyTorch', 'Scikit-Learn', 'FastAPI Deployment'],
        outcome: 'Solves complex business problems using deep learning',
        highlights: ['Real-World Kaggle Case Studies', 'Model Deployment via REST APIs'],
      },
      {
        title: 'Data Analytics & Power BI',
        duration: '3 Months',
        level: 'Analytical',
        tags: ['Advanced SQL', 'PowerBI', 'Tableau', 'Data Warehousing'],
        outcome: 'Transforms raw numbers into executive business dashboards',
        highlights: ['Complex SQL Window Functions', 'Business KPI Storytelling'],
      },
    ],
  },
  {
    id: 'business',
    name: 'Placement & Aptitude Prep',
    shortName: 'Placement & Soft Skills',
    badge: 'Campus Ready',
    icon: Briefcase,
    tagline: 'Company-specific test packs, quantitative reasoning, and interview communication.',
    stat: '1,500+ Exam Questions Simulated',
    tracks: [
      {
        title: 'Company-Specific Campus Test Packs',
        duration: '2 Months',
        level: 'Top Hirers',
        tags: ['TCS NQT', 'Infosys DSE', 'Wipro Turbo', 'Top Tier Startups'],
        outcome: 'Directly simulates exact test patterns of major recruiters',
        highlights: ['Timed Speed Drills', 'Previous Year Question Analysis'],
      },
      {
        title: 'Quantitative & Logical Aptitude',
        duration: '2 Months',
        level: 'Speed & Accuracy',
        tags: ['Speed Math', 'Pattern Recognition', 'Verbal Ability', 'DI'],
        outcome: 'Maximizes clearing rates in preliminary campus screening rounds',
        highlights: ['Mental Math Shortcut Techniques', 'Adaptive Test Simulators'],
      },
      {
        title: 'Corporate Soft Skills & Mock GD/HR',
        duration: '1 Month',
        level: 'Interview Mastery',
        tags: ['STAR Technique', 'Group Discussions', 'ATS Resumes', 'Mock Panels'],
        outcome: 'Empowers students to convert final stage HR & leadership interviews',
        highlights: ['Video Recorded GD Simulations', '1-on-1 Behavioral Coaching'],
      },
    ],
  },
];

export function ProgramsSection() {
  const [activeId, setActiveId] = useState('core');
  const { openEnquiry } = useEnquiry();
  const currentCategory = categories.find((c) => c.id === activeId) || categories[0];

  return (
    <section id="programs" className="py-20 lg:py-28 bg-[#F8F9FB] relative obsidian-grid overflow-hidden">
      {/* Background Subtle Gradient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-br from-[#2563EB]/10 via-[#3B82F6]/5 to-transparent blur-[120px] pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/25 text-[#3B82F6] text-xs font-semibold tracking-wide mb-4 shadow-sm shadow-[#2563EB]/">
            <Sparkles size={14} className="text-[#2563EB]" />
            <span>Comprehensive Curriculum</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight font-[family-name:var(--font-display)]">
            Industry-Ready Programs.{' '}
            <span className="bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#3B82F6] bg-clip-text text-transparent">
              Built for Your Campus.
            </span>
          </h2>
          
          <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Practical, credit-mapped engineering & employability tracks tailored to your semester schedules and top hiring standards.
          </p>

          {/* Quick Value Badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-700">
            <div className="flex items-center gap-1.5 bg-white shadow-sm px-3 py-1.5 rounded-full border border-black/8">
              <Award size={14} className="text-[#3B82F6]" />
              <span>University Credit Aligned</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white shadow-sm px-3 py-1.5 rounded-full border border-black/8">
              <Terminal size={14} className="text-[#38BDF8]" />
              <span>Live Engineer Mentorship</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white shadow-sm px-3 py-1.5 rounded-full border border-black/8">
              <Zap size={14} className="text-[#22C55E]" />
              <span>Placement-Guaranteed Sprints</span>
            </div>
          </div>
        </motion.div>

        {/* Interactive Category Navigation Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 bg-[#121218] border border-black/8 rounded-2xl max-w-full overflow-x-auto no-scrollbar gap-1.5">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeId === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveId(cat.id)}
                  className={`relative px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer shrink-0 ${
                    isActive ? 'text-slate-900 font-bold' : 'text-slate-600 hover:text-slate-200 hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeProgramTab"
                      className="absolute inset-0 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] rounded-xl shadow-lg shadow-[#2563EB]/ -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon size={16} className={isActive ? 'text-slate-900' : 'text-slate-600'} />
                  <span>{cat.shortName}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Description Banner */}
        <motion.div
          key={currentCategory.id + '-banner'}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-white shadow-sm border border-black/8"
        >
          <div className="flex items-center gap-3.5 text-left">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2563EB]/20 to-[#3B82F6]/10 border border-[#2563EB]/30 flex items-center justify-center text-[#3B82F6] shrink-0">
              <currentCategory.icon size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">
                  {currentCategory.name}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-slate-700 font-medium">
                  {currentCategory.badge}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                {currentCategory.tagline}
              </p>
            </div>
          </div>

          <div className="shrink-0 px-3.5 py-1.5 rounded-xl bg-white/5 border border-black/8 text-xs font-mono text-[#3B82F6] flex items-center gap-2">
            <Sparkles size={13} className="text-[#2563EB]" />
            <span>{currentCategory.stat}</span>
          </div>
        </motion.div>

        {/* Animated 3-Card Grid for Tracks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {currentCategory.tracks.map((track, i) => (
              <motion.div
                key={`${currentCategory.id}-${track.title}`}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.98 }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                className="group relative rounded-2xl bg-white shadow-sm border border-black/8 p-6 flex flex-col justify-between hover:border-[#2563EB]/50 transition-all duration-300 hover:shadow-xl hover:shadow-teal-950/20"
              >
                <div>
                  {/* Top Bar with Duration & Level */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#3B82F6] bg-[#2563EB]/10 px-2.5 py-1 rounded-md border border-[#2563EB]/25">
                      <Clock size={12} />
                      <span>{track.duration}</span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-600 bg-white/5 px-2 py-0.5 rounded border border-black/5">
                      {track.level}
                    </span>
                  </div>

                  {/* Track Title */}
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#3B82F6] transition-colors leading-snug mb-3 font-[family-name:var(--font-display)]">
                    {track.title}
                  </h3>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {track.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#181822] text-slate-700 border border-black/8 group-hover:border-white/20 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Highlights with Icons */}
                  <div className="space-y-2 mb-5">
                    {track.highlights.map((item) => (
                      <div key={item} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 size={13} className="text-[#22C55E] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Outcome & CTA */}
                <div className="pt-4 border-t border-black/8">
                  <div className="mb-3.5 p-2.5 rounded-lg bg-white/[0.03] border border-black/5">
                    <div className="text-[10px] uppercase font-mono tracking-wider text-slate-600 mb-0.5">
                      Target Outcome
                    </div>
                    <div className="text-xs font-medium text-slate-200 leading-snug">
                      {track.outcome}
                    </div>
                  </div>

                  <button
                    onClick={() => openEnquiry('PROPOSAL')}
                    className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-[#2563EB] text-slate-200 hover:text-slate-900 text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group/btn"
                  >
                    <span>Request Syllabus</span>
                    <ArrowRight size={13} className="transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom Custom Syllabus Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#181824] via-[#14141C] to-[#121218] border border-black/8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#3B82F6] flex items-center justify-center text-slate-900 shrink-0 shadow-lg shadow-[#2563EB]/">
              <FileCode size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-[family-name:var(--font-display)]">
                Need a Custom Syllabus Aligned to Your University?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
                We customize modules, practical lab exercises, and assessments according to your college branch, academic timetable, and semester exam dates.
              </p>
            </div>
          </div>

          <button
            onClick={() => openEnquiry('CONSULTATION')}
            className="btn-pill-primary shrink-0 py-3 px-6 text-xs sm:text-sm cursor-pointer whitespace-nowrap"
          >
            <Sparkles size={15} className="text-slate-900" />
            <span>Request Custom Syllabus</span>
            <ArrowRight size={15} />
          </button>
        </motion.div>

      </div>
    </section>
  );
}
