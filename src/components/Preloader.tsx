import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Disable scroll while preloader is active
    document.body.style.overflow = 'hidden';

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFinished(true);
            document.body.style.overflow = '';
            if (onComplete) onComplete();
          }, 350);
          return 100;
        }
        // Accelerating progress curve
        const increment = Math.floor(Math.random() * 14) + 6;
        return Math.min(prev + increment, 100);
      });
    }, 60);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[999] bg-[#0A0A0D] flex flex-col items-center justify-between p-8 sm:p-12 select-none"
        >
          {/* Top Label */}
          <div className="w-full flex items-center justify-between text-[11px] font-mono text-slate-500 uppercase tracking-widest">
            <span>TEJAS Infrastructure</span>
            <span>Initializing v2.6</span>
          </div>

          {/* Center Brand Animation */}
          <div className="flex flex-col items-center text-center">
            {/* Animated Logo Monogram */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#FF4500] via-[#FF6A00] to-[#FFA000] flex items-center justify-center text-white mb-6 shadow-xl"
            >
              <span className="font-extrabold text-2xl sm:text-3xl font-mono tracking-tight">
                TJ
              </span>
            </motion.div>

            {/* Brand Title Reveal */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-[family-name:var(--font-display)]"
            >
              TEJAS
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="mt-2 text-xs sm:text-sm text-slate-400 font-mono"
            >
              The Placement Infrastructure for Colleges
            </motion.p>
          </div>

          {/* Bottom Progress Bar & Percentage */}
          <div className="w-full max-w-sm flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-500">Loading modules</span>
              <span className="text-[#FF4500] font-bold">{progress}%</span>
            </div>

            {/* Progress Track */}
            <div className="w-full h-1 bg-[#181822] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#FF4500] to-[#FFA000]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
