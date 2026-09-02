import { motion } from 'framer-motion';
import { Rocket, GraduationCap, Check, Award, Target, Zap } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';

function getModelIcon(iconType?: string, index = 0) {
  const type = (iconType || '').toLowerCase();
  if (type.includes('rocket')) return Rocket;
  if (type.includes('grad') || type.includes('cap') || type.includes('student')) return GraduationCap;
  if (type.includes('award') || type.includes('trophy')) return Award;
  if (type.includes('target') || type.includes('aim')) return Target;
  if (type.includes('zap') || type.includes('fast')) return Zap;
  return index % 2 === 0 ? Rocket : GraduationCap;
}

export function TrainingSolutionsSection() {
  const { trainingModels } = useAdminData();

  const activeModels = trainingModels
    .filter((m) => m.active !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  if (activeModels.length === 0) return null;

  return (
    <section id="training" className="pt-2 pb-6 sm:pb-8 bg-[#F8F9FB] relative border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dynamic Clean & Impressive Delivery Model Cards */}
        <div className={`grid grid-cols-1 ${activeModels.length > 1 ? 'lg:grid-cols-2' : 'max-w-3xl'} gap-8 max-w-6xl mx-auto`}>
          {activeModels.map((model, idx) => {
            const IconComponent = getModelIcon(model.iconType, idx);

            return (
              <motion.div
                key={model.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bento-card p-8 sm:p-10 flex flex-col justify-between hover:border-[#38BDF8]/40 transition-all duration-300 bg-white rounded-3xl border border-black/8 shadow-sm"
              >
                <div>
                  {/* Header */}
                  <div className="flex items-start justify-between mb-8">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-[family-name:var(--font-display)]">
                        {model.title}
                      </h3>
                      {model.badge && (
                        <div className="text-sm font-semibold text-[#2563EB] mt-1.5">
                          {model.badge}
                        </div>
                      )}
                    </div>
                    <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#2563EB] shrink-0">
                      <IconComponent size={20} />
                    </div>
                  </div>

                  {/* Bullet Points with Checkmarks */}
                  {model.points && model.points.length > 0 && (
                    <div className="space-y-4 mb-8 text-sm text-slate-700">
                      {model.points.map((pt, pIdx) => (
                        <div key={pIdx} className="flex items-center gap-3">
                          <Check size={16} className="text-[#2563EB] shrink-0" />
                          <span>
                            <strong className="text-slate-900">{pt.label}:</strong> {pt.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Short Paragraph Description */}
                  {model.description && (
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-8">
                      {model.description}
                    </p>
                  )}
                </div>

                {/* Bottom Footer: Mapped Recruiters / Target Profiles */}
                {model.tags && model.tags.length > 0 && (
                  <div className="pt-6 border-t border-black/8">
                    {model.tagsLabel && (
                      <div className="text-xs text-slate-500 font-medium mb-3">
                        {model.tagsLabel}
                      </div>
                    )}
                    <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-700">
                      {model.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded bg-slate-50 border border-black/5 text-[#2563EB] font-bold text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
