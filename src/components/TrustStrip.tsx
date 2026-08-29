import { useInView } from '../hooks/useInView';

const trustMarks = [
  'VIT',
  'SRM',
  'Chitkara',
  'Amity',
  'LPU',
  'Jain',
];

export function TrustStrip() {
  const { ref, isInView } = useInView();

  return (
    <section
      ref={ref}
      className="relative py-10 border-y border-ink-100 bg-surface-white overflow-hidden"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
          {/* Label */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="section-label-accent">●</span>
            <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-ink-400 whitespace-nowrap">
              Trusted by Leading Institutions
            </span>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-8 bg-ink-200" />

          {/* Partner marks */}
          <div
            className={`flex flex-wrap items-center justify-center gap-x-8 gap-y-4 transition-all duration-700 ${
              isInView ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {trustMarks.map((mark, i) => (
              <div
                key={i}
                className="group flex items-center gap-2 cursor-default"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Placeholder institutional mark */}
                <div className="w-8 h-8 border border-ink-200 flex items-center justify-center bg-white group-hover:border-tejas-red/30 transition-colors duration-300">
                  <span className="text-[10px] font-bold text-ink-400 group-hover:text-tejas-red transition-colors duration-300">
                    {mark[0]}
                  </span>
                </div>
                <span className="text-xs font-semibold text-ink-500 group-hover:text-ink-700 transition-colors duration-300 tracking-wide">
                  {mark}
                </span>
              </div>
            ))}
            <div className="flex items-center gap-2 text-xs text-ink-400 font-medium">
              <span className="text-ink-300">+</span>
              many more…
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
