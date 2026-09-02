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
  Code2,
  Rocket,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  BookOpen
} from 'lucide-react';
import {
  useAdminData,
  type CurriculumCourse,
  type ModulePillar,
  type TrainingModel
} from '../../../context/AdminDataContext';

export function CurriculumTab() {
  const {
    trainingModels,
    addTrainingModel,
    updateTrainingModel,
    deleteTrainingModel,
    toggleTrainingModelActive,
    curriculumCourses,
    updateCurriculumCourse,
    addRollingTrackToCourse,
    deleteRollingTrackFromCourse,
    addPillarToCourse,
    updateCoursePillar,
    deleteCoursePillar
  } = useAdminData();

  // Top sub-tab: 'models' (Campus Training Delivery Models) vs 'curriculum' (Tracks & Modules)
  const [subTab, setSubTab] = useState<'models' | 'curriculum'>('models');

  // ─── Training Model State ───
  const sortedModels = [...trainingModels].sort((a, b) => (a.order || 0) - (b.order || 0));
  const [isModelModalOpen, setIsModelModalOpen] = useState(false);
  const [editingModel, setEditingModel] = useState<TrainingModel | null>(null);

  const [modelTitle, setModelTitle] = useState('');
  const [modelBadge, setModelBadge] = useState('');
  const [modelIconType, setModelIconType] = useState('rocket');
  const [modelPoints, setModelPoints] = useState<string>('');
  const [modelDescription, setModelDescription] = useState('');
  const [modelTagsLabel, setModelTagsLabel] = useState('Mapped to recruiters like');
  const [modelTags, setModelTags] = useState('');
  const [modelActive, setModelActive] = useState(true);

  // ─── Curriculum Courses State ───
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

  // ── Model Handlers ──
  const handleOpenAddModel = () => {
    setEditingModel(null);
    setModelTitle('New Delivery Model');
    setModelBadge('Campus Specialization');
    setModelIconType('rocket');
    setModelPoints('Audience: Final-year batches\nDuration: 40-60 Days\nFocus: Placement Preparation\nCoverage: All Degrees');
    setModelDescription('High-impact structured training modules tailored for institutional placement velocity.');
    setModelTagsLabel('Mapped to recruiters like');
    setModelTags('TCS, Infosys, Wipro, Accenture');
    setModelActive(true);
    setIsModelModalOpen(true);
  };

  const handleOpenEditModel = (model: TrainingModel) => {
    setEditingModel(model);
    setModelTitle(model.title);
    setModelBadge(model.badge);
    setModelIconType(model.iconType || 'rocket');
    setModelPoints(model.points.map((p) => `${p.label}: ${p.value}`).join('\n'));
    setModelDescription(model.description);
    setModelTagsLabel(model.tagsLabel || 'Mapped to recruiters like');
    setModelTags(model.tags.join(', '));
    setModelActive(model.active !== false);
    setIsModelModalOpen(true);
  };

  const handleSaveModel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modelTitle.trim()) return;

    const parsedPoints = modelPoints
      .split('\n')
      .map((line) => {
        const parts = line.split(':');
        if (parts.length >= 2) {
          return { label: parts[0].trim(), value: parts.slice(1).join(':').trim() };
        }
        return { label: 'Key Highlight', value: line.trim() };
      })
      .filter((p) => p.value.length > 0);

    const parsedTags = modelTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    if (editingModel) {
      updateTrainingModel(editingModel.id, {
        title: modelTitle.trim(),
        badge: modelBadge.trim(),
        iconType: modelIconType,
        points: parsedPoints,
        description: modelDescription.trim(),
        tagsLabel: modelTagsLabel.trim(),
        tags: parsedTags,
        active: modelActive,
      });
    } else {
      addTrainingModel({
        title: modelTitle.trim(),
        badge: modelBadge.trim(),
        iconType: modelIconType,
        points: parsedPoints,
        description: modelDescription.trim(),
        tagsLabel: modelTagsLabel.trim(),
        tags: parsedTags,
        active: modelActive,
        order: sortedModels.length + 1,
      });
    }

    setIsModelModalOpen(false);
    setEditingModel(null);
  };

  const moveModelOrder = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sortedModels.length) return;

    const currentItem = sortedModels[index];
    const targetItem = sortedModels[targetIndex];

    updateTrainingModel(currentItem.id, { order: targetItem.order || targetIndex + 1 });
    updateTrainingModel(targetItem.id, { order: currentItem.order || index + 1 });
  };

  // ── Course Handlers ──
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
    if (!currentCourse || !pillarTitle.trim()) return;

    const itemsArray = pillarItems
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingPillar) {
      updateCoursePillar(currentCourse.id, editingPillar.id, {
        number: pillarNumber.trim(),
        title: pillarTitle.trim(),
        badge: pillarBadge.trim(),
        color: pillarColor.trim(),
        items: itemsArray,
      });
    } else {
      addPillarToCourse(currentCourse.id, {
        number: pillarNumber.trim(),
        title: pillarTitle.trim(),
        badge: pillarBadge.trim(),
        color: pillarColor.trim(),
        items: itemsArray,
      });
    }

    setIsPillarModalOpen(false);
    setEditingPillar(null);
  };

  return (
    <div className="space-y-6">
      {/* ── Top Header Card ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-mono font-bold mb-2">
            <GraduationCap size={12} />
            <span>CAMPUS TRAINING &amp; CURRICULUM CONSOLE</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 font-[family-name:var(--font-display)] tracking-tight">
            Campus Training &amp; Industry Curriculum
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage Campus Delivery Models (Impact / Semester Boxes), Specialized Tracks, and Syllabus Modules.
          </p>
        </div>

        {subTab === 'models' ? (
          <button
            onClick={handleOpenAddModel}
            className="btn-pill-primary px-5 py-2.5 text-xs font-bold flex items-center gap-2 cursor-pointer self-start sm:self-center shadow-xs"
          >
            <Plus size={14} />
            <span>Add Delivery Model</span>
          </button>
        ) : (
          <button
            onClick={() => currentCourse && handleOpenEditCourse(currentCourse)}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2 cursor-pointer self-start sm:self-center shadow-xs transition-colors"
          >
            <Edit2 size={13} />
            <span>Edit Course Track</span>
          </button>
        )}
      </div>

      {/* ── Sub-Navigation Switcher ── */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-200/60 border border-slate-300/60 max-w-fit">
        <button
          onClick={() => setSubTab('models')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            subTab === 'models'
              ? 'bg-white text-[#2563EB] shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Rocket size={14} />
          <span>Campus Training Delivery Models ({trainingModels.length})</span>
        </button>

        <button
          onClick={() => setSubTab('curriculum')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            subTab === 'curriculum'
              ? 'bg-white text-[#2563EB] shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BookOpen size={14} />
          <span>Industry Curriculum Tracks (2 Tracks)</span>
        </button>
      </div>

      {/* ═════════════════════════════════════════════════════════════════════ */}
      {/* 1. CAMPUS TRAINING DELIVERY MODELS SUB-TAB                           */}
      {/* ═════════════════════════════════════════════════════════════════════ */}
      {subTab === 'models' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {sortedModels.map((model, index) => {
                const isInactive = model.active === false;
                return (
                  <motion.div
                    key={model.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`bg-white rounded-3xl border border-black/8 p-6 sm:p-7 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between ${
                      isInactive ? 'opacity-60 bg-slate-50/80 border-dashed' : ''
                    }`}
                  >
                    <div className="space-y-4">
                      {/* Card Top Header */}
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2563EB] text-[11px] font-mono font-bold mb-1.5">
                            <span>Delivery Model #{index + 1}</span>
                          </div>
                          <h3 className="text-xl font-bold text-slate-900 font-[family-name:var(--font-display)]">
                            {model.title}
                          </h3>
                          {model.badge && (
                            <p className="text-xs font-semibold text-[#2563EB]">
                              {model.badge}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => toggleTrainingModelActive(model.id)}
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                              isInactive
                                ? 'text-slate-400 hover:text-slate-700 bg-slate-100'
                                : 'text-emerald-600 hover:bg-emerald-50'
                            }`}
                            title={isInactive ? 'Hidden from website' : 'Visible on website'}
                          >
                            {isInactive ? <EyeOff size={14} /> : <Eye size={14} />}
                          </button>

                          <button
                            disabled={index === 0}
                            onClick={() => moveModelOrder(index, 'up')}
                            className="p-1.5 text-slate-400 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                            title="Move Left / Up"
                          >
                            <ArrowUp size={14} />
                          </button>
                          <button
                            disabled={index === sortedModels.length - 1}
                            onClick={() => moveModelOrder(index, 'down')}
                            className="p-1.5 text-slate-400 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                            title="Move Right / Down"
                          >
                            <ArrowDown size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Bullet Highlights */}
                      <div className="space-y-2 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                        {model.points.map((pt, pIdx) => (
                          <div key={pIdx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                            <strong className="text-slate-900">{pt.label}:</strong>
                            <span>{pt.value}</span>
                          </div>
                        ))}
                      </div>

                      {/* Description */}
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {model.description}
                      </p>

                      {/* Footer Tags */}
                      {model.tags && model.tags.length > 0 && (
                        <div className="pt-3 border-t border-slate-100">
                          <div className="text-[11px] font-medium text-slate-500 mb-2">
                            {model.tagsLabel || 'Target recruiters / profiles'}
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {model.tags.map((t, tIdx) => (
                              <span
                                key={tIdx}
                                className="px-2 py-0.5 rounded-md bg-blue-50 text-[#2563EB] text-[11px] font-mono font-bold"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Bar */}
                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEditModel(model)}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-[#2563EB] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Edit2 size={12} />
                        <span>Edit Model Box</span>
                      </button>

                      {sortedModels.length > 1 && (
                        <button
                          onClick={() => {
                            if (confirm(`Delete delivery model "${model.title}"?`)) {
                              deleteTrainingModel(model.id);
                            }
                          }}
                          className="p-1.5 rounded-xl hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                          title="Delete Model Box"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════════════ */}
      {/* 2. INDUSTRY CURRICULUM TRACKS SUB-TAB                                */}
      {/* ═════════════════════════════════════════════════════════════════════ */}
      {subTab === 'curriculum' && (
        <div className="space-y-6">
          {/* Course Selector Tabs */}
          <div className="flex items-center gap-3">
            {sortedCourses.map((course) => {
              const TabIcon = course.id === 'tech' ? Code2 : Briefcase;
              const isActive = selectedCourseId === course.id;
              return (
                <button
                  key={course.id}
                  onClick={() => setSelectedCourseId(course.id)}
                  className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <TabIcon size={16} className={isActive ? 'text-blue-400' : 'text-slate-500'} />
                  <span>{course.shortTitle}</span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-slate-800 text-blue-300' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {course.pillars.length} Pillars
                  </span>
                </button>
              );
            })}
          </div>

          {currentCourse && (
            <div className="space-y-6">
              {/* Course Meta Banner Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-[#2563EB] text-xs font-mono font-bold mb-2">
                      <span>{currentCourse.badge}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 font-[family-name:var(--font-display)]">
                      {currentCourse.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
                      {currentCourse.tagline}
                    </p>
                  </div>

                  <button
                    onClick={() => handleOpenEditCourse(currentCourse)}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-[#2563EB] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                  >
                    <Edit2 size={13} />
                    <span>Edit Track Info</span>
                  </button>
                </div>

                {/* Target Audience & Outcome Pills */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block mb-1">
                      Target Audience Cohorts
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {currentCourse.targetGroups.map((g, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-800 text-[11px] font-semibold">
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block mb-1">
                      Placement Target Outcome
                    </span>
                    <p className="text-slate-800 font-medium text-xs">
                      {currentCourse.outcome}
                    </p>
                  </div>
                </div>
              </div>

              {/* Rolling Specializations Strip Manager */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 font-[family-name:var(--font-display)] flex items-center gap-2">
                      <Sparkles size={14} className="text-[#2563EB]" />
                      <span>Rolling Specialized Programs ({currentCourse.rollingTracks?.length || 0})</span>
                    </h4>
                    <p className="text-xs text-slate-500">
                      These dynamic badges roll infinitely across the course card on the public website.
                    </p>
                  </div>
                </div>

                {/* Add new track item inline */}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Enter new specialization track title..."
                    value={newTrackInput}
                    onChange={(e) => setNewTrackInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && newTrackInput.trim()) {
                        e.preventDefault();
                        addRollingTrackToCourse(currentCourse.id, newTrackInput.trim());
                        setNewTrackInput('');
                      }
                    }}
                    className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#2563EB]"
                  />
                  <button
                    onClick={() => {
                      if (newTrackInput.trim()) {
                        addRollingTrackToCourse(currentCourse.id, newTrackInput.trim());
                        setNewTrackInput('');
                      }
                    }}
                    className="btn-pill-primary px-4 py-2 text-xs font-bold cursor-pointer"
                  >
                    Add
                  </button>
                </div>

                {/* Track Badges Grid */}
                <div className="flex flex-wrap gap-2">
                  {(currentCourse.rollingTracks || []).map((track, tIdx) => (
                    <span
                      key={tIdx}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/70 text-slate-800 text-xs font-medium border border-slate-200/80 group transition-colors"
                    >
                      <span>{track}</span>
                      <button
                        onClick={() => deleteRollingTrackFromCourse(currentCourse.id, tIdx)}
                        className="text-slate-400 hover:text-red-600 cursor-pointer"
                        title="Delete Track"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Pillars (Modules) List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 font-[family-name:var(--font-display)] flex items-center gap-2">
                      <Layers size={15} className="text-[#2563EB]" />
                      <span>Curriculum Pillars ({currentCourse.pillars.length})</span>
                    </h4>
                    <p className="text-xs text-slate-500">
                      Detailed syllabus breakdown with sub-items and competencies.
                    </p>
                  </div>

                  <button
                    onClick={handleOpenAddPillar}
                    className="btn-pill-primary px-4 py-2 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Plus size={13} />
                    <span>Add Pillar</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentCourse.pillars.map((pillar) => (
                    <div
                      key={pillar.id}
                      className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded-md">
                            Pillar {pillar.number}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500 px-2 py-0.5 rounded-md bg-slate-100">
                            {pillar.badge}
                          </span>
                        </div>

                        <h5 className="text-sm font-bold text-slate-900 font-[family-name:var(--font-display)]">
                          {pillar.title}
                        </h5>

                        <ul className="space-y-1.5 text-xs text-slate-600">
                          {pillar.items.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-blue-500 mt-0.5">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEditPillar(pillar)}
                          className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-[#2563EB] text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Edit2 size={11} />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete pillar "${pillar.title}"?`)) {
                              deleteCoursePillar(currentCourse.id, pillar.id);
                            }
                          }}
                          className="p-1.5 rounded-xl hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                          title="Delete Pillar"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════════════ */}
      {/* MODAL: ADD / EDIT DELIVERY MODEL                                     */}
      {/* ═════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isModelModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-black/10 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto no-scrollbar"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold">
                    <Rocket size={16} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {editingModel ? 'Edit Delivery Model Box' : 'Add New Delivery Model Box'}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Configure title, audience highlights, paragraph description, and recruiter tags.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsModelModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSaveModel} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 font-mono">
                      Box Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Impact Training, Semester-Integrated"
                      value={modelTitle}
                      onChange={(e) => setModelTitle(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 font-mono">
                      Badge / Tagline *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Placement-Focused Intensive"
                      value={modelBadge}
                      onChange={(e) => setModelBadge(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>
                </div>

                {/* Bullet Points */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 font-mono">
                    Bullet Points (One per line in "Label: Value" format) *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Audience: Final-year batches&#10;Duration: 40-60 Days&#10;Focus: Company-specific drive prep&#10;Coverage: All degrees and branches"
                    value={modelPoints}
                    onChange={(e) => setModelPoints(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs font-mono rounded-xl border border-slate-200 focus:outline-none focus:border-[#2563EB]"
                  />
                </div>

                {/* Paragraph Description */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 font-mono">
                    Card Paragraph Description *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Enter short description explaining this delivery solution..."
                    value={modelDescription}
                    onChange={(e) => setModelDescription(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#2563EB]"
                  />
                </div>

                {/* Recruiter / Profile Tags */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 font-mono">
                      Footer Label
                    </label>
                    <input
                      type="text"
                      placeholder="Mapped to recruiters like"
                      value={modelTagsLabel}
                      onChange={(e) => setModelTagsLabel(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 font-mono">
                      Tags (Comma separated)
                    </label>
                    <input
                      type="text"
                      placeholder="TCS, Infosys, Wipro, + more"
                      value={modelTags}
                      onChange={(e) => setModelTags(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>
                </div>

                {/* Active Checkbox */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="modelActiveCheck"
                    checked={modelActive}
                    onChange={(e) => setModelActive(e.target.checked)}
                    className="rounded text-[#2563EB] focus:ring-[#2563EB] cursor-pointer"
                  />
                  <label htmlFor="modelActiveCheck" className="text-xs font-semibold text-slate-700 cursor-pointer">
                    Display actively on public website
                  </label>
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsModelModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-pill-primary px-6 py-2 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <CheckCircle2 size={14} />
                    <span>{editingModel ? 'Save Changes' : 'Add Model'}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ═════════════════════════════════════════════════════════════════════ */}
      {/* MODAL: EDIT COURSE META                                              */}
      {/* ═════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isEditCourseModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-black/10 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto no-scrollbar"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">
                  Edit Track: {currentCourse?.shortTitle}
                </h3>
                <button
                  onClick={() => setIsEditCourseModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSaveCourse} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 font-mono">Full Course Title *</label>
                  <input
                    type="text"
                    required
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#2563EB]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 font-mono">Short Tab Title *</label>
                    <input
                      type="text"
                      required
                      value={editShortTitle}
                      onChange={(e) => setEditShortTitle(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 font-mono">Badge Label</label>
                    <input
                      type="text"
                      value={editBadge}
                      onChange={(e) => setEditBadge(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 font-mono">Tagline / Overview *</label>
                  <textarea
                    required
                    rows={2}
                    value={editTagline}
                    onChange={(e) => setEditTagline(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#2563EB]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 font-mono">
                    Target Groups (One per line)
                  </label>
                  <textarea
                    rows={3}
                    value={editTargetGroups}
                    onChange={(e) => setEditTargetGroups(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#2563EB]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 font-mono">Placement Outcome</label>
                  <input
                    type="text"
                    value={editOutcome}
                    onChange={(e) => setEditOutcome(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#2563EB]"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsEditCourseModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-pill-primary px-6 py-2 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <CheckCircle2 size={14} />
                    <span>Save Track Info</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ═════════════════════════════════════════════════════════════════════ */}
      {/* MODAL: ADD / EDIT PILLAR                                             */}
      {/* ═════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isPillarModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-black/10 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto no-scrollbar"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">
                  {editingPillar ? `Edit Pillar ${editingPillar.number}` : 'Add New Curriculum Pillar'}
                </h3>
                <button
                  onClick={() => setIsPillarModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSavePillar} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 font-mono">Pillar Number *</label>
                    <input
                      type="text"
                      required
                      placeholder="01"
                      value={pillarNumber}
                      onChange={(e) => setPillarNumber(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs font-mono font-bold rounded-xl border border-slate-200 focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 font-mono">Pillar Badge</label>
                    <input
                      type="text"
                      placeholder="e.g. Core Module"
                      value={pillarBadge}
                      onChange={(e) => setPillarBadge(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 font-mono">Pillar Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Data Structures & System Architecture"
                    value={pillarTitle}
                    onChange={(e) => setPillarTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#2563EB]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 font-mono">
                    Syllabus Topics (One per line) *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Trees, Graphs & Dynamic Programming&#10;Microservices & API Architecture&#10;Distributed Systems Design"
                    value={pillarItems}
                    onChange={(e) => setPillarItems(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#2563EB]"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsPillarModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-pill-primary px-6 py-2 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <CheckCircle2 size={14} />
                    <span>{editingPillar ? 'Save Pillar' : 'Add Pillar'}</span>
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
