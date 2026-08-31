import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { useEnquiry } from '../context/EnquiryContext';

const benefits = [
  'Customized Training Roadmap',
  'Dedicated Program Manager',
  'Program Proposal',
  'Expected Outcomes Overview',
];

export function PartnerCTA() {
  const { ref, isInView } = useInView();
  const { openEnquiry } = useEnquiry();

  return (
    <section
      id="partner-cta"
      ref={ref}
      className="section-padding relative bg-surface-white grid-bg overflow-hidden"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative border border-ink-900 bg-ink-900 overflow-hidden"
        >
          {/* Background grid */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'linear-gradient(rgba(215,38,56,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(215,38,56,0.1) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          {/* Red accent line at top */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-tejas-red" />

          {/* Corner marks */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-tejas-red/30" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-tejas-red/30" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-tejas-red/30" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-tejas-red/30" />

          <div className="relative z-10 grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12 p-8 sm:p-10 lg:p-14">
            {/* Left content */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-[10px] tracking-[0.15em] text-tejas-red uppercase">
                  ● Start Your Partnership
                </span>
              </div>

              <h2 className="heading-editorial text-2xl sm:text-3xl lg:text-4xl text-white mb-4">
                Let's Build a Stronger{' '}
                <br className="hidden sm:block" />
                Talent Pipeline{' '}
                <span className="text-tejas-red">Together.</span>
              </h2>

              <p className="text-sm text-ink-400 leading-relaxed mb-8 max-w-md">
                Book a free consultation with our experts and explore how we can help your
                institution build industry-ready talent.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => openEnquiry('PARTNERSHIP')}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-tejas-red text-white text-sm font-semibold hover:bg-tejas-red-dark hover:shadow-lg hover:shadow-tejas-red/25 transition-all duration-300 cursor-pointer"
                >
                  Partner with Grow360
                  <ArrowRight size={16} />
                </button>
                <button
                  onClick={() => openEnquiry('CONSULTATION')}
                  className="inline-flex items-center gap-2 px-7 py-3.5 border border-ink-600 text-white text-sm font-semibold hover:border-tejas-red hover:text-tejas-red transition-all duration-300 cursor-pointer"
                >
                  Book a Campus Consultation
                </button>
              </div>
            </div>

            {/* Right - Benefits */}
            <div className="flex flex-col justify-center">
              <div className="font-mono text-[10px] tracking-[0.15em] text-ink-500 uppercase mb-4">
                ● What You Get
              </div>
              <div className="space-y-3">
                {benefits.map((benefit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 size={16} className="text-tejas-red shrink-0" />
                    <span className="text-sm text-ink-300 font-medium">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
