import { motion } from 'framer-motion';

interface TopAnnouncementBarProps {
  onOpenCareerCall?: () => void;
  onNavigateToPrograms?: () => void;
}

const ANNOUNCEMENT_ITEMS = [
  { text: '✨ Free 1:1 Career Diagnostic & Senior Mentorship Session', highlight: 'Book Free Call', action: 'call' },
  { text: '✨ Software & AI Engineering Program — 2026 Batch Admissions Open', highlight: 'Explore Tracks', action: 'programs' },
  { text: '✨ Executive Certification in Business & Technology Management', highlight: 'Management Track', action: 'programs' },
  { text: '✨ 90%+ Tier-1 Campus Placement Rate Across 50+ Partner Campuses', highlight: 'Placement Rubrics', action: 'programs' },
  { text: '✨ AI Forward Deployed Engineer & Agentic AI Certification', highlight: 'New Syllabus', action: 'programs' },
  { text: '✨ Corporate Readiness & Mock Technical Drives by Meta & Google Mentors', highlight: 'Learn More', action: 'call' },
  { text: '✨ DevOps, Cloud & AI Platform Engineering — Industry Mapped', highlight: 'View Modules', action: 'programs' },
];

export function TopAnnouncementBar({ onOpenCareerCall, onNavigateToPrograms }: TopAnnouncementBarProps) {
  const handleClick = (action: string) => {
    if (action === 'call' && onOpenCareerCall) {
      onOpenCareerCall();
    } else if (action === 'programs') {
      if (onNavigateToPrograms) {
        onNavigateToPrograms();
      } else {
        window.location.hash = '#training-programs';
      }
    }
  };

  return (
    <div className="bg-[#0B1120] text-white border-b border-white/10 text-[11px] sm:text-xs font-medium py-1.5 sm:py-2 overflow-hidden relative select-none z-50">
      {/* Side gradient overlays for seamless fade */}
      <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-16 bg-gradient-to-r from-[#0B1120] via-[#0B1120]/90 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-16 bg-gradient-to-l from-[#0B1120] via-[#0B1120]/90 to-transparent z-10 pointer-events-none" />

      {/* Infinite Rolling Marquee */}
      <motion.div
        className="flex items-center gap-6 sm:gap-10 w-max"
        animate={{
          x: ['0%', '-50%'],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 35,
            ease: 'linear',
          },
        }}
        whileHover={{ animationPlayState: 'paused' }}
      >
        {[...ANNOUNCEMENT_ITEMS, ...ANNOUNCEMENT_ITEMS].map((item, idx) => (
          <div
            key={idx}
            onClick={() => handleClick(item.action)}
            className="flex items-center gap-2 text-slate-200 hover:text-white transition-colors cursor-pointer whitespace-nowrap group shrink-0"
          >
            <span className="font-normal text-slate-200 group-hover:text-white transition-colors">
              {item.text}
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 group-hover:text-blue-200 text-[10px] font-bold font-mono tracking-wider ml-1">
              {item.highlight} →
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
