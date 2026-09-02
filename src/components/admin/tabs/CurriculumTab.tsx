import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Edit2,
  Plus,
  Trash2,
  CheckCircle2,
  X,
  Layers,
  GraduationCap,
  Briefcase,
  Code2
} from 'lucide-react';
import { useAdminData, type CurriculumCourse, type ModulePillar } from '../../../context/AdminDataContext';

export function CurriculumTab() {
  const {
    curriculumCourses,
    updateCurriculumCourse,
    addRollingTrackToCourse,
    deleteRollingTrackFromCourse,
    addPillarToCourse,
    updateCoursePillar,
    deleteCoursePillar
  } = useAdminData();

  const sortedCourses = [...curriculumCourses].sort((a, b) => (a.order || 0) - (b.order || 0));
  const [selectedCourseId, setSelectedCourseId] = useState<string>(sortedCourses[0]?.id || 'non-tech');
  const [newTrackInput, setNewTrackInput] = useState('');

  // Edit Course Meta Modal
  const [isEditCourseModalOpen, setIsEditCourseModalOpen] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editShortTitle, setEditShortTitle] = useState('');
  const [editTagline, setEditTagline] = useState('');
  const [editBadge, setEditBadge] = useState('');
  const [editTargetGroups, setEditTargetGroups] = useState('');
  const [editRollingTracks, setEditRollingTracks] = useState('');
  const [editOutcome, setEditOutcome] = useState('');

  // Add / Edit Pillar Modal
  const [isPillarModalOpen, setIsPillarModalOpen] = useState(false);
  const [editingPillar, setEditingPillar] = useState<ModulePillar | null>(null);
  const [pillarNumber, setPillarNumber] = useState('');
  const [pillarTitle, setPillarTitle] = useState('');
  const [pillarBadge, setPillarBadge] = useState('');
  const [pillarColor, setPillarColor] = useState('#2563EB');
  const [pillarItems, setPillarItems] = useState('');

  const currentCourse =
    sortedCourses.find((c) => c.id === selectedCourseId) || sortedCourses[0];

  const handleOpenEditCourse = (course: CurriculumCourse) => {
    setEditTitle(course.title);
    setEditShortTitle(course.shortTitle);
    setEditTagline(course.tagline);
    setEditBadge(course.badge);
    setEditTargetGroups(course.targetGroups.join('\n'));
    setEditRollingTracks((course.rollingTracks || []).join('\n'));
    setEditOutcome(course.outcome);
    setIsEditCourseModalOpen(true);
  };

  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCourse) return;

    updateCurriculumCourse(currentCourse.id, {
      title: editTitle.trim(),
      shortTitle: editShortTitle.trim(),
      tagline: editTagline.trim(),
      badge: editBadge.trim(),
      targetGroups: editTargetGroups
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      rollingTracks: editRollingTracks
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      outcome: editOutcome.trim(),
    });

    setIsEditCourseModalOpen(false);
  };

  const handleOpenAddPillar = () => {
    setEditingPillar(null);
    setPillarNumber(String(currentCourse?.pillars.length ? currentCourse.pillars.length + 1 : 1).padStart(2, '0'));
    setPillarTitle('');
    setPillarBadge('Core Module');
    setPillarColor('#2563EB');
    setPillarItems('');
    setIsPillarModalOpen(true);
  };

  const handleOpenEditPillar = (pillar: ModulePillar) => {
    setEditingPillar(pillar);
    setPillarNumber(pillar.number);
    setPillarTitle(pillar.title);
    setPillarBadge(pillar.badge);
    setPillarColor(pillar.color || '#2563EB');
    setPillarItems(pillar.items.join('\n'));
    setIsPillarModalOpen(true);
  };

  const handleSavePillar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCourse) return;

    const itemsArray = pillarItems
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingPillar) {
      updateCoursePillar(currentCourse.id, editingPillar.id, {
        number: pillarNumber.trim(),
        title: pillarTitle.trim(),
        badge: pillarBadge.trim(),
        color: pillarColor,
        items: itemsArray,
      });
    } else {
      addPillarToCourse(currentCourse.id, {
        number: pillarNumber.trim(),
        title: pillarTitle.trim(),
        badge: pillarBadge.trim(),
        color: pillarColor,
        items: itemsArray,
      });
    }

    setIsPillarModalOpen(false);
    setEditingPillar(null);
  };

  if (!currentCourse) return null;

  return (
    <div className="space-y-6">
      {/* ── Top Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-black/8 shadow-2xs">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-mono font-bold mb-2">
            <Sparkles size={12} />
            <span>INSTITUTIONAL SYLLABUS &amp; TRACKS</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 font-[family-name:var(--font-display)] tracking-tight">
            Comprehensive Curriculum Manager
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Edit Course titles, target eligibility, outcomes, module pillars, and bullet points in real-time.
          </p>
        </div>
      </div>

      {/* ── Course Switcher Tabs (Non-Tech #1, Tech #2) ── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {sortedCourses.map((course) => {
          const Icon = course.id === 'tech' ? Code2 : Briefcase;
          const isActive = selectedCourseId === course.id;
          return (
            <button
              key={course.id}
              onClick={() => setSelectedCourseId(course.id)}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap border ${
                isActive
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-white text-slate-700 border-black/10 hover:border-black/25'
              }`}
            >
              <Icon size={16} className={isActive ? 'text-white' : 'text-slate-500'} />
              <span>{course.shortTitle}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-normal ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                {course.pillars.length} Pillars
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Current Selected Course Details Card ── */}
      <div className="bg-white rounded-3xl border border-black/8 p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-1.5 max-w-3xl">
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-md bg-blue-50 text-[#2563EB] border border-blue-200 inline-block">
              {currentCourse.badge}
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-[family-name:var(--font-display)]">
              {currentCourse.title}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {currentCourse.tagline}
            </p>
          </div>

          <button
            onClick={() => handleOpenEditCourse(currentCourse)}
            className="btn-pill-primary px-4 py-2 text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0 shadow-xs"
          >
            <Edit2 size={13} />
            <span>Edit Course Details</span>
          </button>
        </div>

        {/* Target Groups & Outcome preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-[11px] font-mono font-bold text-slate-600 uppercase tracking-wide flex items-center gap-1.5">
              <GraduationCap size={13} className="text-[#2563EB]" />
              <span>Target Group &amp; Eligibility:</span>
            </span>
            <div className="flex flex-wrap gap-1.5">
              {currentCourse.targetGroups.map((g, i) => (
                <span key={i} className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-800">
                  {g}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-1">
            <span className="text-[11px] font-mono font-bold text-[#2563EB] uppercase tracking-wide flex items-center gap-1.5">
              <Sparkles size={13} />
              <span>Rolling Ticker Live Status:</span>
            </span>
            <p className="text-xs text-slate-800 font-medium leading-relaxed">
              {(currentCourse.rollingTracks || []).length} active specialization course pills rolling horizontally on the student page.
            </p>
          </div>
        </div>

        {/* ── Dedicated Rolling Tracks Manager Card ── */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Sparkles size={15} className="text-[#2563EB]" />
              <span className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wide">
                Featured Specialization &amp; Rolling Tracks ({(currentCourse.rollingTracks || []).length}):
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-mono">
              Real-time marquee ticker
            </span>
          </div>

          {/* Existing Rolling Track Pills with Delete Option */}
          <div className="flex flex-wrap gap-2 pt-1">
            {(currentCourse.rollingTracks || []).map((track, idx) => (
              <div
                key={idx}
                className="group pl-3 pr-2 py-1.5 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-xs font-semibold text-slate-800 flex items-center gap-2 transition-all shadow-2xs"
              >
                <Sparkles size={12} className="text-[#2563EB] shrink-0" />
                <span>{track}</span>
                <button
                  onClick={() => deleteRollingTrackFromCourse(currentCourse.id, idx)}
                  className="p-1 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  title="Remove this track from rolling marquee"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
            {(currentCourse.rollingTracks || []).length === 0 && (
              <div className="text-xs text-slate-500 italic py-1">
                No custom tracks added yet. Add below to display in the rolling strip.
              </div>
            )}
          </div>

          {/* Inline Add Track Form */}
          <div className="flex gap-2 pt-2">
            <input
              type="text"
              placeholder="e.g. MERN Stack & Next.js or Corporate Financial Modelling"
              value={newTrackInput}
              onChange={(e) => setNewTrackInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  if (newTrackInput.trim()) {
                    addRollingTrackToCourse(currentCourse.id, newTrackInput.trim());
                    setNewTrackInput('');
                  }
                }
              }}
              className="flex-1 px-3.5 py-2 rounded-xl border border-black/10 text-xs focus:border-[#2563EB] focus:outline-hidden bg-slate-50 focus:bg-white"
            />
            <button
              type="button"
              onClick={() => {
                if (newTrackInput.trim()) {
                  addRollingTrackToCourse(currentCourse.id, newTrackInput.trim());
                  setNewTrackInput('');
                }
              }}
              className="btn-pill-primary px-4 py-2 text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <Plus size={13} />
              <span>Add to Rolling Strip</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Pillars / Modules Management ── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-extrabold text-slate-900 font-[family-name:var(--font-display)] flex items-center gap-2">
              <Layers size={17} className="text-[#2563EB]" />
              <span>Course Modules &amp; Pillars ({currentCourse.pillars.length})</span>
            </h4>
            <p className="text-xs text-slate-500">
              Manage syllabus topics, bullet points, and domain chapters.
            </p>
          </div>

          <button
            onClick={handleOpenAddPillar}
            className="btn-pill-primary px-4 py-2 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus size={14} />
            <span>Add Pillar</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {currentCourse.pillars.map((pillar) => (
            <div
              key={pillar.id || pillar.number}
              className="bg-white rounded-3xl border border-black/8 p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-xs text-white shadow-xs"
                      style={{ backgroundColor: pillar.color || '#2563EB' }}
                    >
                      {pillar.number}
                    </div>
                    <div>
                      <h5 className="text-base font-bold text-slate-900 font-[family-name:var(--font-display)]">
                        {pillar.title}
                      </h5>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                        {pillar.badge}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEditPillar(pillar)}
                      className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-[#2563EB] transition-colors cursor-pointer"
                      title="Edit Pillar"
                    >
                      <Edit2 size={13} />
                    </button>
                    <button
                      onClick={() => deleteCoursePillar(currentCourse.id, pillar.id)}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                      title="Delete Pillar"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                <ul className="space-y-1.5 text-xs text-slate-700 pt-2 border-t border-slate-100">
                  {pillar.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 size={12} className="text-[#2563EB] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Edit Course Metadata Modal ── */}
      <AnimatePresence>
        {isEditCourseModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditCourseModalOpen(false)}
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-black/10 p-6 sm:p-8 z-10 my-8 space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-black/6 pb-3">
                <h3 className="text-lg font-extrabold text-slate-900 font-[family-name:var(--font-display)]">
                  Edit Course Metadata
                </h3>
                <button
                  onClick={() => setIsEditCourseModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleSaveCourse} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Course Title</label>
                  <input
                    type="text"
                    required
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-black/10 text-xs focus:border-[#2563EB] focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Short Tab Title</label>
                    <input
                      type="text"
                      required
                      value={editShortTitle}
                      onChange={(e) => setEditShortTitle(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-black/10 text-xs focus:border-[#2563EB] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Badge Tag</label>
                    <input
                      type="text"
                      required
                      value={editBadge}
                      onChange={(e) => setEditBadge(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-black/10 text-xs focus:border-[#2563EB] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Course Tagline / Subtitle</label>
                  <textarea
                    rows={2}
                    value={editTagline}
                    onChange={(e) => setEditTagline(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-black/10 text-xs focus:border-[#2563EB] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Target Groups &amp; Eligibility (1 per line)
                  </label>
                  <textarea
                    rows={3}
                    value={editTargetGroups}
                    onChange={(e) => setEditTargetGroups(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-black/10 text-xs focus:border-[#2563EB] focus:outline-hidden font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Featured Rolling Tracks &amp; Certifications (1 per line)
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Software and AI Engineering Program&#10;Modern Data Science and ML with specialisation in AI&#10;AI Forward Deployed Engineer Program"
                    value={editRollingTracks}
                    onChange={(e) => setEditRollingTracks(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-black/10 text-xs focus:border-[#2563EB] focus:outline-hidden font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Program Core Outcome</label>
                  <textarea
                    rows={2}
                    value={editOutcome}
                    onChange={(e) => setEditOutcome(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-black/10 text-xs focus:border-[#2563EB] focus:outline-hidden"
                  />
                </div>

                <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-black/6">
                  <button
                    type="button"
                    onClick={() => setIsEditCourseModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-black/10 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-pill-primary px-5 py-2 text-xs font-bold cursor-pointer"
                  >
                    Save Course Details
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Add / Edit Pillar Modal ── */}
      <AnimatePresence>
        {isPillarModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPillarModalOpen(false)}
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-black/10 p-6 sm:p-8 z-10 my-8 space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-black/6 pb-3">
                <h3 className="text-lg font-extrabold text-slate-900 font-[family-name:var(--font-display)]">
                  {editingPillar ? 'Edit Module Pillar' : 'Add New Module Pillar'}
                </h3>
                <button
                  onClick={() => setIsPillarModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleSavePillar} className="space-y-3.5">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Pillar Number (e.g. 01)</label>
                    <input
                      type="text"
                      required
                      value={pillarNumber}
                      onChange={(e) => setPillarNumber(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-black/10 text-xs font-mono font-bold focus:border-[#2563EB] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Badge</label>
                    <input
                      type="text"
                      required
                      value={pillarBadge}
                      onChange={(e) => setPillarBadge(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-black/10 text-xs focus:border-[#2563EB] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Pillar Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Technical & Domain Upskilling"
                    value={pillarTitle}
                    onChange={(e) => setPillarTitle(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-black/10 text-xs focus:border-[#2563EB] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Theme Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={pillarColor}
                      onChange={(e) => setPillarColor(e.target.value)}
                      className="w-8 h-8 rounded-lg border border-black/10 cursor-pointer p-0.5"
                    />
                    <input
                      type="text"
                      value={pillarColor}
                      onChange={(e) => setPillarColor(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl border border-black/10 text-xs font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Modules &amp; Bullet Points (1 per line) *
                  </label>
                  <textarea
                    rows={6}
                    required
                    placeholder="AI & GenAI Workflows&#10;Data Analytics&#10;Power BI Dashboards"
                    value={pillarItems}
                    onChange={(e) => setPillarItems(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-black/10 text-xs focus:border-[#2563EB] focus:outline-hidden font-mono leading-relaxed"
                  />
                </div>

                <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-black/6">
                  <button
                    type="button"
                    onClick={() => setIsPillarModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-black/10 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-pill-primary px-5 py-2 text-xs font-bold cursor-pointer"
                  >
                    {editingPillar ? 'Save Changes' : 'Add Pillar'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
