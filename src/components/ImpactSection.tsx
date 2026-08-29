import { useInView } from '../hooks/useInView';
import { useCountUp } from '../hooks/useCountUp';

interface Metric {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
}

const metrics: Metric[] = [
  { value: 50, suffix: '+', label: 'College Partnerships', sublabel: 'Across India' },
  { value: 500, suffix: '+', label: 'Students Trained', sublabel: 'Industry-Ready Graduates' },
  { value: 200, suffix: '+', label: 'Projects Delivered', sublabel: 'Real-World Applications' },
  { value: 95, suffix: '%', label: 'Placement Readiness', sublabel: 'Employability Score' },
];

function MetricCard({ metric, isInView, index }: { metric: Metric; isInView: boolean; index: number }) {
  const count = useCountUp(metric.value, 2000, isInView);

  return (
    <div
      className="relative group"
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="text-center lg:text-left">
        {/* Tech label */}
        <div className="font-mono text-[9px] tracking-[0.15em] text-ink-500 uppercase mb-3">
          {`METRIC.${String(index + 1).padStart(2, '0')}`}
        </div>

        {/* Value */}
        <div className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
          {count}
          <span className="text-tejas-red">{metric.suffix}</span>
        </div>

        {/* Label */}
        <div className="text-sm font-semibold text-white/80 mt-2 tracking-wide">
          {metric.label}
        </div>

        {/* Sublabel */}
        <div className="text-xs text-ink-400 mt-1">
          {metric.sublabel}
        </div>
      </div>

      {/* Divider (not on last) */}
      {index < metrics.length - 1 && (
        <div className="absolute right-0 top-4 bottom-4 w-px bg-ink-700 hidden lg:block" />
      )}
    </div>
  );
}

export function ImpactSection() {
  const { ref, isInView } = useInView();

  return (
    <section
      id="impact"
      ref={ref}
      className="section-padding relative bg-ink-950 text-white overflow-hidden"
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Red accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-tejas-red/[0.04] rounded-full blur-[100px] pointer-events-none" />

      {/* Top line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-tejas-red/30 to-transparent" />

      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-10">
        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-[10px] tracking-[0.15em] text-tejas-red uppercase">
                ● Driving Real Impact
              </span>
            </div>
            <h2 className="heading-editorial text-3xl sm:text-4xl lg:text-[2.75rem] text-white">
              Better Skills.{' '}
              <br className="hidden sm:block" />
              Better Placements.{' '}
              <br className="hidden sm:block" />
              <span className="text-tejas-red">Better Futures.</span>
            </h2>
          </div>
          <p className="text-sm text-ink-400 max-w-sm leading-relaxed">
            Measurable outcomes that demonstrate the value of partnership.
            <br />
            <span className="text-[10px] text-ink-500 font-mono mt-2 block">
              *Based on internal assessments and feedback
            </span>
          </p>
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {metrics.map((metric, i) => (
            <MetricCard key={i} metric={metric} isInView={isInView} index={i} />
          ))}
        </div>
      </div>

      {/* Section number */}
      <div className="absolute bottom-6 right-10 font-mono text-[80px] font-bold text-white/[0.02] leading-none select-none hidden lg:block">
        05
      </div>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-tejas-red/20 to-transparent" />
    </section>
  );
}
