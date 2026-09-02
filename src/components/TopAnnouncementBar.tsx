import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useAdminData } from '../context/AdminDataContext';

interface TopAnnouncementBarProps {
  onOpenCareerCall?: () => void;
  onNavigateToPrograms?: () => void;
}

export function TopAnnouncementBar({ onOpenCareerCall, onNavigateToPrograms }: TopAnnouncementBarProps) {
  const { announcements, tickerSpeed } = useAdminData();

  // Filter active and sort
  const activeAnnouncements = useMemo(() => {
    return announcements
      .filter((a) => a.active !== false)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  }, [announcements]);

  // Dynamic Speed Calculation based on item count & admin speed preset:
  // "kam items me speed jyada (low duration), jyada items me speed steady"
  const dynamicDuration = useMemo(() => {
    const count = activeAnnouncements.length;
    if (count === 0) return 10;

    let multiplier = 2.4; // fast (default)
    let minDur = 8;
    let maxDur = 22;

    if (tickerSpeed === 'normal') {
      multiplier = 3.6;
      minDur = 12;
      maxDur = 32;
    } else if (tickerSpeed === 'slow') {
      multiplier = 5.2;
      minDur = 16;
      maxDur = 45;
    }

    const calculated = count * multiplier;
    return Math.max(minDur, Math.min(maxDur, calculated));
  }, [activeAnnouncements.length, tickerSpeed]);

  if (activeAnnouncements.length === 0) return null;

  const handleClick = (action: string, linkUrl?: string) => {
    if (linkUrl) {
      if (linkUrl.startsWith('http')) {
        window.open(linkUrl, '_blank', 'noopener,noreferrer');
      } else {
        window.location.hash = linkUrl;
      }
      return;
    }

    if (action === 'call') {
      if (onOpenCareerCall) onOpenCareerCall();
    } else if (action === 'programs') {
      if (onNavigateToPrograms) onNavigateToPrograms();
      else window.location.hash = '#training-programs';
    } else if (action === 'roadmap') {
      window.location.hash = '#roadmap';
    } else if (action === 'mentor') {
      window.location.hash = '#mentor';
    }
  };

  return (
    <div className="bg-[#0B1120] text-white border-b border-white/10 text-[11px] sm:text-xs font-medium py-1.5 sm:py-2 overflow-hidden relative select-none z-50">
      {/* Side gradient overlays for seamless fade */}
      <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-16 bg-gradient-to-r from-[#0B1120] via-[#0B1120]/90 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-16 bg-gradient-to-l from-[#0B1120] via-[#0B1120]/90 to-transparent z-10 pointer-events-none" />

      {/* Infinite Dynamic Speed Rolling Marquee */}
      <motion.div
        key={`marquee-${activeAnnouncements.length}-${tickerSpeed}-${dynamicDuration}`}
        className="flex items-center gap-6 sm:gap-10 w-max"
        animate={{
          x: ['0%', '-50%'],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: dynamicDuration,
            ease: 'linear',
          },
        }}
        whileHover={{ animationPlayState: 'paused' }}
      >
        {[...activeAnnouncements, ...activeAnnouncements].map((item, idx) => (
          <div
            key={idx}
            onClick={() => handleClick(item.action, item.linkUrl)}
            className="flex items-center gap-2 text-slate-200 hover:text-white transition-colors cursor-pointer whitespace-nowrap group shrink-0"
          >
            <span className="font-normal text-slate-200 group-hover:text-white transition-colors">
              {item.text}
            </span>
            {item.highlight && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 group-hover:text-blue-200 text-[10px] font-bold font-mono tracking-wider ml-1">
                {item.highlight} →
              </span>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
