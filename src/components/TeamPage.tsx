import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Sparkles,
  ArrowLeft,
  Mail,
  CheckCircle2,
  ShieldCheck,
  Award,
  GraduationCap,
  Building2,
  ChevronRight,
  UserPlus
} from 'lucide-react';
import { useAdminData, type TeamMember } from '../context/AdminDataContext';
import { useEnquiry } from '../context/EnquiryContext';

interface TeamPageProps {
  onBackToHome?: () => void;
}

type DepartmentFilter = 'ALL' | TeamMember['department'];

const DEPARTMENTS: { label: string; value: DepartmentFilter }[] = [
  { label: 'All Team Members', value: 'ALL' },
  { label: 'Leadership & Founders', value: 'Leadership & Founders' },
  { label: 'Engineering & AI', value: 'Engineering & AI' },
  { label: 'Placements & Corporate', value: 'Placements & Corporate Relations' },
  { label: 'Academic Curriculum', value: 'Academic Curriculum' },
];

export function TeamPage({ onBackToHome }: TeamPageProps) {
  const { teamMembers } = useAdminData();
  const { openEnquiry } = useEnquiry();
  const [activeDept, setActiveDept] = useState<DepartmentFilter>('ALL');

  const activeMembers = teamMembers
    .filter((m) => m.active !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const filteredMembers =
    activeDept === 'ALL'
      ? activeMembers
      : activeMembers.filter((m) => m.department === activeDept);

  const handleBack = () => {
    if (onBackToHome) {
      onBackToHome();
    } else {
      window.location.hash = '';
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-slate-900 font-sans selection:bg-[#2563EB] selection:text-white">
      {/* ── 01. Breadcrumb & Back Strip ── */}
      <div className="bg-white border-b border-black/6 pt-24 sm:pt-28 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#2563EB] transition-colors cursor-pointer bg-slate-50 hover:bg-blue-50 px-3 py-1.5 rounded-full border border-black/5"
            >
              <ArrowLeft size={14} />
              <span>Back to Home</span>
            </button>

            <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
              <span>Home</span>
              <span>/</span>
              <span className="text-[#2563EB] font-bold">Leadership &amp; Team</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 02. Hero Banner ── */}
      <section className="relative pt-12 pb-16 sm:pb-20 overflow-hidden obsidian-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-mono font-bold uppercase tracking-wider mb-5 shadow-2xs">
            <Sparkles size={13} className="text-[#2563EB]" />
            <span>The Minds Behind Grow360</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-[family-name:var(--font-display)] max-w-4xl mx-auto leading-tight">
            Leadership &amp; Industry Practitioners Bridging Campus to Corporate
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mt-4 leading-relaxed font-normal">
            Meet our team of corporate leaders, AI architects, university deans, and placement strategists committed to elevating institutional career outcomes.
          </p>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto mt-10">
            <div className="p-4 rounded-2xl bg-white/90 backdrop-blur-xs border border-black/8 shadow-2xs text-center">
              <span className="block text-2xl sm:text-3xl font-black text-[#2563EB] font-[family-name:var(--font-display)]">
                50+
              </span>
              <span className="text-xs text-slate-600 font-medium">Partner Campuses</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/90 backdrop-blur-xs border border-black/8 shadow-2xs text-center">
              <span className="block text-2xl sm:text-3xl font-black text-slate-900 font-[family-name:var(--font-display)]">
                20+
              </span>
              <span className="text-xs text-slate-600 font-medium">Industry Leaders</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/90 backdrop-blur-xs border border-black/8 shadow-2xs text-center">
              <span className="block text-2xl sm:text-3xl font-black text-emerald-600 font-[family-name:var(--font-display)]">
                90%+
              </span>
              <span className="text-xs text-slate-600 font-medium">Placement Benchmark</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/90 backdrop-blur-xs border border-black/8 shadow-2xs text-center">
              <span className="block text-2xl sm:text-3xl font-black text-indigo-600 font-[family-name:var(--font-display)]">
                100%
              </span>
              <span className="text-xs text-slate-600 font-medium">Practitioner Delivery</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 03. Department Filter Navigation ── */}
      <section className="sticky top-20 z-20 bg-white/95 backdrop-blur-md border-y border-black/8 py-3 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {DEPARTMENTS.map((dept) => {
              const isActive = activeDept === dept.value;
              return (
                <button
                  key={dept.value}
                  onClick={() => setActiveDept(dept.value)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap border ${
                    isActive
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                      : 'bg-white text-slate-700 border-black/10 hover:border-black/25 hover:bg-slate-50'
                  }`}
                >
                  {dept.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 04. Team Members Grid ── */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredMembers.map((member) => (
              <motion.div
                key={member.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-3xl border border-black/8 overflow-hidden shadow-2xs hover:shadow-lg hover:border-blue-300/80 transition-all group flex flex-col justify-between"
              >
                <div>
                  {/* Photo & Badge Area */}
                  <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent" />

                    {/* Department Tag */}
                    <div className="absolute top-3.5 left-3.5">
                      <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-mono font-bold text-slate-900 border border-white/50 shadow-xs">
                        {member.department}
                      </span>
                    </div>

                    {/* Background / Experience Badge */}
                    {member.badge && (
                      <div className="absolute bottom-3.5 left-3.5 right-3.5">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-600/90 backdrop-blur-md text-white text-xs font-semibold shadow-xs">
                          <Award size={13} className="text-amber-300 shrink-0" />
                          <span className="truncate">{member.badge}</span>
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Body Details */}
                  <div className="p-6 space-y-3">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 font-[family-name:var(--font-display)] group-hover:text-[#2563EB] transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-xs font-semibold text-slate-600 mt-0.5">
                        {member.role}
                      </p>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {member.bio}
                    </p>
                  </div>
                </div>

                {/* Footer Links & Contact */}
                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {member.linkedinUrl && (
                      <a
                        href={member.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-[#0A66C2] hover:border-blue-300 flex items-center justify-center transition-all shadow-2xs"
                        title="LinkedIn Profile"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.65 1.65 0 0 0-1.66 1.66 1.66 1.66 0 0 0 1.66 1.66 1.66 1.66 0 0 0 1.66-1.66c0-.92-.74-1.66-1.66-1.66Z" />
                        </svg>
                      </a>
                    )}
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="w-8 h-8 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-[#2563EB] hover:border-blue-300 flex items-center justify-center transition-all shadow-2xs"
                        title="Send Email"
                      >
                        <Mail size={15} />
                      </a>
                    )}
                  </div>

                  <span className="text-[10px] font-mono text-slate-400">
                    Grow360 Team
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredMembers.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-black/8 p-8">
            <Users size={36} className="mx-auto text-slate-400 mb-3" />
            <h3 className="text-lg font-bold text-slate-900">No members found</h3>
            <p className="text-xs text-slate-500 mt-1">Try selecting another department filter above.</p>
          </div>
        )}
      </section>

      {/* ── 05. Core Mission & Guiding Principles Bento ── */}
      <section className="py-12 bg-white border-y border-black/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-mono font-bold mb-2">
              <ShieldCheck size={12} />
              <span>OUR VALUES &amp; STANDARDS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-[family-name:var(--font-display)]">
              How Our Team Drives Measurable Campus Placement Results
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-100 text-[#2563EB] flex items-center justify-center font-bold">
                <Building2 size={20} />
              </div>
              <h4 className="text-base font-bold text-slate-900 font-[family-name:var(--font-display)]">
                Industry-Practitioner Led
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every curriculum module and mock assessment is instructed by active engineers and consultants from Meta, Google, and Deloitte — not academic theorists.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <CheckCircle2 size={20} />
              </div>
              <h4 className="text-base font-bold text-slate-900 font-[family-name:var(--font-display)]">
                Diagnostic-First Approach
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                We assess student readiness across 7 stages with quantifiable rubrics, ensuring campus TPOs have full visibility on cohort placement conversion.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                <GraduationCap size={20} />
              </div>
              <h4 className="text-base font-bold text-slate-900 font-[family-name:var(--font-display)]">
                Campus-Integrated Delivery
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Flexible semester-integrated and impact sprint formats designed to seamlessly embed into existing college timetables and academic calendars.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 06. Join Our Mission CTA ── */}
      <section className="py-16 bg-slate-950 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 text-xs font-mono font-bold">
            <UserPlus size={13} />
            <span>GROW WITH US</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-[family-name:var(--font-display)]">
            Want to Join Our Leadership &amp; Mentorship Network?
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Whether you are a senior industry engineer looking to mentor student cohorts, or an institution seeking to transform campus hiring, let&apos;s collaborate.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => openEnquiry('LEADERSHIP_PAGE')}
              className="btn-pill-primary px-6 py-3 text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-500/25"
            >
              <span>Schedule Institutional Call</span>
              <ChevronRight size={15} />
            </button>

            <button
              onClick={() => {
                window.location.hash = '#mentor';
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
              className="btn-pill-secondary px-6 py-3 text-xs sm:text-sm font-bold text-white bg-slate-900/80 border-slate-700 hover:bg-slate-800 flex items-center gap-2 cursor-pointer"
            >
              <span>Apply as Industry Mentor</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
