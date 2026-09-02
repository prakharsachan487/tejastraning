import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  Briefcase,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  Layers,
  GraduationCap,
  Users,
  Target,
  Building2,
  TrendingUp,
  Cpu,
  BookOpen,
  Award,
  Zap,
  ShieldCheck,
  Compass
} from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import { useEnquiry } from '../context/EnquiryContext';

// Helper icon resolver
function getPillarIcon(title: string, index: number) {
  const t = title.toLowerCase();
  if (t.includes('ai') || t.includes('technical') || t.includes('domain') || t.includes('tech')) return Cpu;
  if (t.includes('management') || t.includes('productivity')) return TrendingUp;
  if (t.includes('finance') || t.includes('business courses') || t.includes('award')) return Award;
  if (t.includes('communication') || t.includes('presentation')) return BookOpen;
  if (t.includes('etiquette') || t.includes('posh') || t.includes('ethics')) return ShieldCheck;
  if (t.includes('leadership') || t.includes('workplace') || t.includes('values')) return Compass;
  if (t.includes('placement') || t.includes('interview') || t.includes('career') || t.includes('test')) return Target;
  if (t.includes('program') || t.includes('internship') || t.includes('live')) return Layers;
  if (t.includes('corporate')) return Building2;

  const icons = [Cpu, Layers, Target, Building2, TrendingUp, Award, BookOpen, ShieldCheck, Compass];
  return icons[index % icons.length];
}

export function ProgramsSection() {
  const { curriculumCourses } = useAdminData();
  const { openEnquiry } = useEnquiry();

  // Sort courses by order (Non-Tech #1, Tech #2)
  const sortedCourses = [...curriculumCourses].sort((a, b) => (a.order || 0) - (b.order || 0));

  const [activeCourseId, setActiveCourseId] = useState<string>(
    sortedCourses[0]?.id || 'non-tech'
  );

  const currentCourse =
    sortedCourses.find((c) => c.id === activeCourseId) || sortedCourses[0];

  const CourseIcon = currentCourse?.id === 'tech' ? Code2 : Briefcase;

  if (!currentCourse) return null;

  return (
    <section id="programs" className="pt-4 pb-20 lg:pb-28 bg-[#F8F9FB] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-br from-[#2563EB]/10 via-[#3B82F6]/5 to-transparent blur-[120px] pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* ── Section Header ── */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/25 text-[#2563EB] text-xs font-bold font-mono tracking-wide">
            <Sparkles size={14} className="text-[#2563EB]" />
            <span>COMPREHENSIVE CURRICULUM</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 font-[family-name:var(--font-display)] leading-tight">
            Specialized Programs for{' '}
            <span className="text-[#2563EB]">
              Management &amp; Engineering
            </span>
          </h2>
          
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Institutional learning paths structured with domain upskilling, live industry mentorship, corporate readiness, and placement drive preparation.
          </p>
        </div>

        {/* ── 2 Main Course Selector Tabs (Non-Tech First, Tech Second) ── */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 bg-slate-200/80 rounded-2xl border border-black/10 gap-2 max-w-full overflow-x-auto shadow-inner">
            {sortedCourses.map((course) => {
              const TabIcon = course.id === 'tech' ? Code2 : Briefcase;
              const isActive = activeCourseId === course.id;
              return (
                <button
                  key={course.id}
                  onClick={() => setActiveCourseId(course.id)}
                  className={`flex items-center gap-2.5 px-5 sm:px-7 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-white text-[#2563EB] shadow-md border border-black/5 font-extrabold'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <TabIcon size={17} className={isActive ? 'text-[#2563EB]' : 'text-slate-500'} />
                  <span>{course.shortTitle}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Active Course Content ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCourse.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="space-y-8"
          >
            {/* Header Card: Course Title + Target Group + Outcome */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/8 shadow-sm space-y-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#2563EB] text-xs font-mono font-bold border border-blue-200">
                    <CourseIcon size={13} />
                    <span>{currentCourse.badge}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-[family-name:var(--font-display)] tracking-tight">
                    {currentCourse.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
                    {currentCourse.tagline}
                  </p>
                </div>

                <button
                  onClick={() => openEnquiry('PARTNERSHIP')}
                  className="btn-pill-primary py-3 px-6 text-xs font-bold shrink-0 flex items-center gap-2 shadow-md cursor-pointer self-start lg:self-center"
                >
                  <span>Request Full Syllabus</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              {/* Target Group Badges */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-slate-500">
                  Target Group &amp; Eligibility:
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentCourse.targetGroups.map((group, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 flex items-center gap-1.5"
                    >
                      <GraduationCap size={13} className="text-[#2563EB]" />
                      <span>{group}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Outcome Highlight Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50/80 via-indigo-50/50 to-blue-50/80 border border-blue-200/80 flex items-start gap-3">
                <CheckCircle2 size={18} className="text-[#2563EB] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-mono font-bold text-[#2563EB] uppercase tracking-wide">
                    Program Core Outcome:
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-800 mt-0.5 leading-relaxed">
                    {currentCourse.outcome}
                  </p>
                </div>
              </div>
            </div>

            {/* ── Course Pillars Grid ── */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-slate-900 font-[family-name:var(--font-display)] flex items-center gap-2">
                  <Layers size={17} className="text-[#2563EB]" />
                  <span>Curriculum Modules &amp; Coverage ({currentCourse.pillars.length} Core Pillars)</span>
                </h4>
                <span className="text-xs text-slate-500 font-mono hidden sm:inline-block">
                  Institutional Delivery Mapped
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {currentCourse.pillars.map((pillar, idx) => {
                  const PillarIcon = getPillarIcon(pillar.title, idx);
                  return (
                    <div
                      key={pillar.id || pillar.number}
                      className="p-6 sm:p-7 rounded-3xl bg-white border border-black/8 shadow-2xs hover:shadow-md hover:border-blue-300/60 transition-all flex flex-col justify-between space-y-5 group"
                    >
                      <div className="space-y-4">
                        {/* Header: Number + Icon + Title + Badge */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-10 h-10 rounded-2xl flex items-center justify-center font-mono font-bold text-sm text-white shadow-xs"
                              style={{ backgroundColor: pillar.color || '#2563EB' }}
                            >
                              {pillar.number}
                            </div>
                            <div>
                              <h5 className="text-base sm:text-lg font-bold text-slate-900 font-[family-name:var(--font-display)] group-hover:text-[#2563EB] transition-colors leading-snug">
                                {pillar.title}
                              </h5>
                              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 mt-0.5 inline-block">
                                {pillar.badge || 'Core Module'}
                              </span>
                            </div>
                          </div>

                          <PillarIcon size={18} className="text-slate-400 group-hover:text-[#2563EB] transition-colors shrink-0" />
                        </div>

                        {/* Bullet Items List */}
                        <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                          {pillar.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle2 size={13} className="text-[#2563EB] shrink-0 mt-0.5" />
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Delivery Framework Banner (Dono Courses ke liye) ── */}
            <div className="rounded-3xl bg-white border border-black/8 p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#2563EB] uppercase tracking-wider">
                <Clock size={14} />
                <span>Flexible Institutional Delivery Models</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
                {/* Delivery 1 */}
                <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-900 font-[family-name:var(--font-display)]">
                    <Zap size={16} className="text-[#2563EB]" />
                    <span>Intensive Placement Workshops</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong className="text-slate-900">Format:</strong> 16 hours / 2-day bootcamps to 4-week structured sprint modules designed right before campus recruitment drives.
                  </p>
                </div>

                {/* Delivery 2 */}
                <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-900 font-[family-name:var(--font-display)]">
                    <Users size={16} className="text-[#2563EB]" />
                    <span>Blended Learning Architecture</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong className="text-slate-900">Format:</strong> Self-paced digital curriculum modules + live interactive role-playing + real-time 1-on-1 industry mentor feedback.
                  </p>
                </div>
              </div>
            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
