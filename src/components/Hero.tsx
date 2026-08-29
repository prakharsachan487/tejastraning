import { useRef, useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useEnquiry } from '../context/EnquiryContext';

/* ─────────────────────────────────────────────
   INTERACTIVE 3D-STYLE ECOSYSTEM (CSS-based)
   ───────────────────────────────────────────── */

interface EcoNode {
  label: string;
  shortLabel: string;
  x: number;
  y: number;
  delay: number;
}

const ecosystemNodes: EcoNode[] = [
  { label: 'Practical Training', shortLabel: 'TRAINING', x: -220, y: -140, delay: 0.2 },
  { label: 'Certifications', shortLabel: 'CERTIFY', x: 220, y: -150, delay: 0.35 },
  { label: 'Live Projects', shortLabel: 'PROJECTS', x: -250, y: 40, delay: 0.5 },
  { label: 'Interview Prep', shortLabel: 'INTERVIEW', x: 250, y: 30, delay: 0.65 },
  { label: 'Aptitude', shortLabel: 'APTITUDE', x: -160, y: 170, delay: 0.8 },
  { label: 'Placement Support', shortLabel: 'PLACEMENT', x: 180, y: 170, delay: 0.95 },
];

function EcosystemVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMousePos({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={containerRef}
      className="ecosystem-container relative w-full aspect-square max-w-[560px] mx-auto"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(215,38,56,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(215,38,56,0.08) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          transform: `translate(${mousePos.x * -3}px, ${mousePos.y * -3}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      />

      {/* Orbital rings */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="-300 -250 600 500"
        fill="none"
        style={{
          transform: `rotateX(${mousePos.y * 3}deg) rotateY(${mousePos.x * 3}deg)`,
          transition: 'transform 0.2s ease-out',
        }}
      >
        {/* Dashed concentric circles */}
        <ellipse
          cx="0" cy="0" rx="140" ry="90"
          stroke="rgba(215,38,56,0.15)"
          strokeWidth="1"
          strokeDasharray="6 4"
          fill="none"
        />
        <ellipse
          cx="0" cy="0" rx="230" ry="160"
          stroke="rgba(0,0,0,0.06)"
          strokeWidth="1"
          strokeDasharray="4 6"
          fill="none"
        />

        {/* Connection lines from center to nodes */}
        {ecosystemNodes.map((node, i) => (
          <line
            key={i}
            x1="0" y1="0"
            x2={node.x * 0.85} y2={node.y * 0.85}
            stroke={hoveredNode === i ? 'rgba(215,38,56,0.4)' : 'rgba(0,0,0,0.08)'}
            strokeWidth="1"
            strokeDasharray="3 3"
            style={{ transition: 'stroke 0.3s ease' }}
          />
        ))}

        {/* Center registration marks */}
        <line x1="-12" y1="0" x2="12" y2="0" stroke="rgba(215,38,56,0.3)" strokeWidth="1" />
        <line x1="0" y1="-12" x2="0" y2="12" stroke="rgba(215,38,56,0.3)" strokeWidth="1" />
        <circle cx="0" cy="0" r="6" stroke="rgba(215,38,56,0.3)" strokeWidth="1" fill="none" />
      </svg>

      {/* Center element */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        style={{
          transform: `translate(calc(-50% + ${mousePos.x * 5}px), calc(-50% + ${mousePos.y * 5}px))`,
          transition: 'transform 0.2s ease-out',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6, type: 'spring' }}
      >
        <div className="relative">
          {/* Outer ring */}
          <div className="w-28 h-28 border border-tejas-red/20 flex items-center justify-center relative">
            <div className="w-20 h-20 bg-tejas-red flex items-center justify-center">
              <span className="text-white font-black text-lg tracking-[0.1em]">TEJAS</span>
            </div>
            {/* Corner registration marks */}
            <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-tejas-red/40" />
            <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-tejas-red/40" />
            <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-tejas-red/40" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-tejas-red/40" />
          </div>
        </div>
      </motion.div>

      {/* Ecosystem nodes */}
      {ecosystemNodes.map((node, i) => (
        <motion.div
          key={i}
          className="absolute z-10 cursor-pointer group"
          style={{
            top: `calc(50% + ${node.y * 0.55}px + ${mousePos.y * (8 + i * 2)}px)`,
            left: `calc(50% + ${node.x * 0.55}px + ${mousePos.x * (8 + i * 2)}px)`,
            transform: 'translate(-50%, -50%)',
            transition: 'top 0.2s ease-out, left 0.2s ease-out',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: node.delay + 0.4, duration: 0.5 }}
          onMouseEnter={() => setHoveredNode(i)}
          onMouseLeave={() => setHoveredNode(null)}
        >
          <div
            className={`relative px-3 py-2 border transition-all duration-300 ${
              hoveredNode === i
                ? 'border-tejas-red/40 bg-tejas-red/5 shadow-lg shadow-tejas-red/10'
                : 'border-ink-200 bg-white/80'
            }`}
          >
            {/* Technical label */}
            <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-ink-400 mb-0.5">
              {`FIG.${String(i + 1).padStart(2, '0')}`}
            </div>
            <div
              className={`font-semibold text-xs tracking-wide uppercase transition-colors duration-300 ${
                hoveredNode === i ? 'text-tejas-red' : 'text-ink-800'
              }`}
            >
              {node.label}
            </div>
            {/* Connector dot */}
            <div
              className={`absolute w-1.5 h-1.5 transition-colors duration-300 ${
                hoveredNode === i ? 'bg-tejas-red' : 'bg-ink-300'
              }`}
              style={{
                top: '50%',
                [node.x < 0 ? 'right' : 'left']: '-6px',
                transform: 'translateY(-50%)',
              }}
            />
          </div>
        </motion.div>
      ))}

      {/* Corner technical annotations */}
      <div className="absolute top-2 left-2 font-mono text-[8px] text-ink-300 tracking-[0.15em] uppercase">
        SYS.DIAGRAM.01
      </div>
      <div className="absolute bottom-2 right-2 font-mono text-[8px] text-ink-300 tracking-[0.15em] uppercase">
        TEJAS ECOSYSTEM
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   HERO SECTION
   ───────────────────────────────────────────── */

const stats = [
  { value: '50+', label: 'College Partnerships' },
  { value: '500+', label: 'Students Trained' },
  { value: '200+', label: 'Projects Delivered' },
  { value: '95%', label: 'Placement Readiness' },
];

export function Hero() {
  const { openEnquiry } = useEnquiry();
  const [, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-10 overflow-hidden grid-bg">
      {/* Subtle background accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-tejas-red/[0.02] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-tejas-red/[0.03] rounded-full blur-[80px] pointer-events-none" />

      {/* Top editorial bar */}
      <div className="absolute top-20 left-0 right-0 border-b border-ink-100">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-10 flex items-center justify-between py-2">
          <span className="font-mono text-[10px] tracking-[0.15em] text-ink-300 uppercase hidden sm:block">
            Industry-Focused. College-Partners.
          </span>
          <span className="font-mono text-[10px] tracking-[0.15em] text-ink-300 uppercase hidden sm:block">
            SEC.01
          </span>
        </div>
      </div>

      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-xl"
          >
            {/* Eyebrow tag */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-8"
            >
              <span className="tech-tag">
                <span className="w-1.5 h-1.5 bg-tejas-red mr-2 animate-pulse" />
                Industry-Focused Learning
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="heading-editorial text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl text-ink-900"
            >
              Turn Students Into{' '}
              <br className="hidden sm:block" />
              Industry-Ready{' '}
              <br className="hidden sm:block" />
              <span className="text-tejas-red">Professionals.</span>
            </motion.h1>

            {/* Supporting copy */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-6 text-base text-ink-500 leading-relaxed max-w-lg"
            >
              Tejas partners with colleges and universities to deliver practical training,
              certifications, projects, aptitude preparation, interview preparation and
              placement support that prepares students for the real world.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <button
                onClick={() => openEnquiry('PARTNERSHIP')}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-tejas-red text-white text-sm font-semibold hover:bg-tejas-red-dark hover:shadow-lg hover:shadow-tejas-red/20 transition-all duration-300 cursor-pointer magnetic-btn"
              >
                Partner with Tejas
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => openEnquiry('CONSULTATION')}
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-ink-200 text-ink-700 text-sm font-semibold hover:border-tejas-red hover:text-tejas-red transition-all duration-300 cursor-pointer"
              >
                Book a Campus Consultation
                <ArrowRight size={16} />
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6"
            >
              {stats.map((stat, i) => (
                <div key={i} className="relative">
                  <div className="text-2xl font-bold text-ink-900 tracking-tight">{stat.value}</div>
                  <div className="text-[11px] text-ink-400 mt-1 font-medium tracking-wide">
                    {stat.label}
                  </div>
                  {i < stats.length - 1 && (
                    <div className="absolute right-0 top-1 bottom-1 w-px bg-ink-100 hidden sm:block" />
                  )}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Interactive Ecosystem */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="hidden lg:block"
          >
            <EcosystemVisual />
          </motion.div>
        </div>
      </div>

      {/* Bottom section number */}
      <div className="absolute bottom-6 right-10 font-mono text-[80px] font-bold text-ink-50 leading-none select-none hidden lg:block">
        01
      </div>
    </section>
  );
}
