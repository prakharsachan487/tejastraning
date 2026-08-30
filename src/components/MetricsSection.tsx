import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const metrics = [
  { value: 450, suffix: '+', label: 'Institutions', sub: 'Partner Colleges' },
  { value: 50, suffix: 'K+', label: 'Students Trained', sub: 'Placement Candidates' },
  { value: 35, suffix: '+', label: 'Hiring Partners', sub: 'Corporate Recruiters' },
  { value: 300, suffix: '+', label: 'Curriculum Hours', sub: 'Hands-on Labs' },
  { value: 50, suffix: '+', label: 'Live Projects', sub: 'Production Capstones' },
  { value: 6, prefix: '₹', suffix: ' LPA', label: 'Avg Package', sub: 'Campus Hires' },
];

function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  inView,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  inView: boolean;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value]);

  return (
    <span className="tabular-nums">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

export function MetricsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="py-20 lg:py-24 bg-[#0A0A0D] border-y border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF4500]/10 border border-[#FF4500]/25 text-[#FFA000] text-xs font-semibold tracking-wide mb-4">
            <span>Verified Track Record</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-[family-name:var(--font-display)]">
            Numbers That{' '}
            <span className="bg-gradient-to-r from-[#FF4500] via-[#FF7A00] to-[#FFA000] bg-clip-text text-transparent">
              Move the Needle
            </span>
          </h2>
        </motion.div>

        {/* 6 Metric Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bento-card p-5 sm:p-6 text-center hover:border-[#FF4500]/40 transition-colors"
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-mono bg-gradient-to-r from-white via-slate-100 to-[#FFA000] bg-clip-text text-transparent mb-1">
                <AnimatedCounter
                  value={m.value}
                  prefix={m.prefix}
                  suffix={m.suffix}
                  inView={inView}
                />
              </div>
              <div className="text-xs font-bold text-white font-[family-name:var(--font-display)]">
                {m.label}
              </div>
              <div className="text-[10px] font-mono text-slate-500 mt-0.5">
                {m.sub}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
