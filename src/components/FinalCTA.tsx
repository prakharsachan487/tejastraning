import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { useEnquiry } from '../context/EnquiryContext';

export function FinalCTA() {
  const { ref, isInView } = useInView();
  const { openEnquiry } = useEnquiry();

  return (
    <section
      id="about"
      ref={ref}
      className="section-padding relative bg-surface-cream overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <span className="section-label-accent">● Ready to Partner</span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="heading-editorial text-3xl sm:text-4xl lg:text-5xl text-ink-900 mb-6"
          >
            Ready to Build an{' '}
            <br className="hidden sm:block" />
            <span className="text-tejas-red">Industry-Ready</span> Campus?
          </motion.h2>

          {/* Supporting text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-base text-ink-400 leading-relaxed mb-10 max-w-lg mx-auto"
          >
            Let's design a training ecosystem that prepares your students for the careers ahead.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <button
              onClick={() => openEnquiry('PARTNERSHIP')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-tejas-red text-white text-sm font-semibold hover:bg-tejas-red-dark hover:shadow-lg hover:shadow-tejas-red/20 transition-all duration-300 cursor-pointer magnetic-btn"
            >
              Partner With Tejas
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => openEnquiry('CONSULTATION')}
              className="inline-flex items-center gap-2 px-8 py-4 border border-ink-200 text-ink-700 text-sm font-semibold hover:border-tejas-red hover:text-tejas-red transition-all duration-300 cursor-pointer"
            >
              Book a Campus Consultation
              <ArrowRight size={16} />
            </button>
          </motion.div>

          {/* Trust line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-10 flex items-center justify-center gap-6 text-xs text-ink-400"
          >
            <span className="flex items-center gap-2">
              <span className="w-1 h-1 bg-tejas-red rounded-full" />
              Free consultation
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1 h-1 bg-tejas-red rounded-full" />
              No commitment
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1 h-1 bg-tejas-red rounded-full" />
              Custom proposals
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
