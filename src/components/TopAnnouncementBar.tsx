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

  // Create a dense half-set that comfortably spans wider than any viewport width (min 10-14 items per half)
  const halfItems = useMemo(() => {
    const count = activeAnnouncements.length;
    if (count === 0) return [];
    const repeatMultiplier = Math.max(3, Math.ceil(12 / count));
    const items: typeof activeAnnouncements = [];
    for (let i = 0; i < repeatMultiplier; i++) {
      items.push(...activeAnnouncements);
    }
    return items;
  }, [activeAnnouncements]);

  // Full continuous loop items (Half 1 + Half 2 for seamless 0% -> -50% loop)
  const fullLoopItems = useMemo(() => {
    return [...halfItems, ...halfItems];
  }, [halfItems]);

  // Dynamic Speed Calculation based on item count & admin speed preset:
  const dynamicDuration = useMemo(() => {
    const count = halfItems.length;
    if (count === 0) return 20;

    let secondsPerItem = 2.2; // fast (default brisk pace)
    if (tickerSpeed === 'normal') {
      secondsPerItem = 3.4;
    } else if (tickerSpeed === 'slow') {
      secondsPerItem = 5.0;
    }

    const calculated = count * secondsPerItem;
    return Math.max(14, Math.min(55, calculated));
  }, [halfItems.length, tickerSpeed]);

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
    <div className="bg-[#0B1120] text-white border-b border-white/10 text-[11px] sm:text-xs font-medium py-1.5 sm:py-2 overflow-hidden relative select-none z-50 w-full">
      {/* Side gradient overlays for seamless fade */}
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-[#0B1120] via-[#0B1120]/90 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-[#0B1120] via-[#0B1120]/90 to-transparent z-10 pointer-events-none" />

      {/* Infinite Seamless Dynamic Full-Width Marquee */}
      <motion.div
        key={`full-marquee-${halfItems.length}-${tickerSpeed}-${dynamicDuration}`}
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
        {fullLoopItems.map((item, idx) => (
          <div
            key={idx}
            onClick={() => handleClick(item.action, item.linkUrl)}
            className="flex items-center gap-2 text-slate-200 hover:text-white transition-colors cursor-pointer whitespace-nowrap group shrink-0"
          >
            <span className="font-normal text-slate-200 group-hover:text-white transition-colors">
              {item.text}
            </span>
            {item.highlight && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 group-hover:text-blue-200 text-[10px] font-bold font-mono tracking-wider ml-1">
                {item.highlight} →
              </span>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
