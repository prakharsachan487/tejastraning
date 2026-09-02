import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  Plus,
  Search,
  Edit3,
  Trash2,
  MapPin,
  IndianRupee,
  X,
  AlertTriangle,
  ExternalLink
} from 'lucide-react';
import { useAdminData, type JobOpening } from '../../../context/AdminDataContext';

export function JobsTab() {
  const { jobs, addJob, updateJob, deleteJob } = useAdminData();

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('All');

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobOpening | null>(null);
  const [deletingJobId, setDeletingJobId] = useState<string | number | null>(null);

  // Form Fields State
  const [formTitle, setFormTitle] = useState('');
  const [formDomain, setFormDomain] = useState<JobOpening['domain']>('Tech');
  const [formType, setFormType] = useState<JobOpening['type']>('Full-time');
  const [formLocation, setFormLocation] = useState('');
  const [formLocationCategory, setFormLocationCategory] = useState<JobOpening['locationCategory']>('Remote');
  const [formSalary, setFormSalary] = useState('');
  const [formOpenings, setFormOpenings] = useState(1);
  const [formSummary, setFormSummary] = useState('');
  const [formSkills, setFormSkills] = useState('');
  const [formResponsibilities, setFormResponsibilities] = useState('');
  const [formRequirements, setFormRequirements] = useState('');

  // Reset form
  const resetForm = () => {
    setFormTitle('');
    setFormDomain('Tech');
    setFormType('Full-time');
    setFormLocation('');
    setFormLocationCategory('Remote');
    setFormSalary('');
    setFormOpenings(1);
    setFormSummary('');
    setFormSkills('');
    setFormResponsibilities('');
    setFormRequirements('');
  };

  const handleOpenAdd = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (job: JobOpening) => {
    setEditingJob(job);
    setFormTitle(job.title);
    setFormDomain(job.domain);
    setFormType(job.type);
    setFormLocation(job.location);
    setFormLocationCategory(job.locationCategory);
    setFormSalary(job.salary);
    setFormOpenings(job.openings);
    setFormSummary(job.summary);
    setFormSkills(job.skills.join(', '));
    setFormResponsibilities(job.responsibilities.join('\n'));
    setFormRequirements(job.requirements.join('\n'));
  };

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const skillsArray = formSkills
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const respArray = formResponsibilities
      .split('\n')
      .map((r) => r.trim())
      .filter(Boolean);

    const reqArray = formRequirements
      .split('\n')
      .map((r) => r.trim())
      .filter(Boolean);

    addJob({
      title: formTitle.trim(),
      domain: formDomain,
      type: formType,
      location: formLocation.trim(),
      locationCategory: formLocationCategory,
      salary: formSalary.trim(),
      openings: Number(formOpenings) || 1,
      summary: formSummary.trim(),
      skills: skillsArray.length > 0 ? skillsArray : ['DSA', 'Problem Solving'],
      responsibilities: respArray.length > 0 ? respArray : ['Mentor students in batch'],
      requirements: reqArray.length > 0 ? reqArray : ['Relevant industry or teaching experience'],
    });

    setIsAddModalOpen(false);
    resetForm();
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingJob || !formTitle.trim()) return;

    const skillsArray = formSkills
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const respArray = formResponsibilities
      .split('\n')
      .map((r) => r.trim())
      .filter(Boolean);

    const reqArray = formRequirements
      .split('\n')
      .map((r) => r.trim())
      .filter(Boolean);

    updateJob(editingJob.id, {
      title: formTitle.trim(),
      domain: formDomain,
      type: formType,
      location: formLocation.trim(),
      locationCategory: formLocationCategory,
      salary: formSalary.trim(),
      openings: Number(formOpenings) || 1,
      summary: formSummary.trim(),
      skills: skillsArray,
      responsibilities: respArray,
      requirements: reqArray,
    });

    setEditingJob(null);
    resetForm();
  };

  const handleConfirmDelete = () => {
    if (deletingJobId !== null) {
      deleteJob(deletingJobId);
      setDeletingJobId(null);
    }
  };

  // Filtered jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      if (selectedDomain !== 'All' && job.domain !== selectedDomain) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = job.title.toLowerCase().includes(q);
        const matchLoc = job.location.toLowerCase().includes(q);
        const matchSummary = job.summary.toLowerCase().includes(q);
        const matchSkills = job.skills.some((s) => s.toLowerCase().includes(q));
        if (!matchTitle && !matchLoc && !matchSummary && !matchSkills) {
          return false;
        }
      }
      return true;
    });
  }, [jobs, selectedDomain, searchQuery]);

  return (
    <div className="space-y-6">
      {/* ─── Header & Add Action ────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-[family-name:var(--font-display)]">
              Manage Job Openings &amp; Mentor Roles
            </h1>
            <span className="text-xs font-mono font-bold bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full">
              {jobs.length} Active Positions
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Create, modify, and manage full-time and remote mentorship opportunities displayed on the public Careers portal.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-md shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02] shrink-0"
        >
          <Plus size={16} />
          <span>Post New Job</span>
        </button>
      </div>

      {/* ─── Search & Filters Bar ───────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by job title, skill or location..."
            className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl py-2 pl-10 pr-4 text-xs text-slate-800 placeholder-slate-400 outline-hidden transition-colors"
          />
        </div>

        {/* Domain filter pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {['All', 'Tech', 'Non-Tech', 'Academics', 'Sales'].map((dom) => (
            <button
              key={dom}
              onClick={() => setSelectedDomain(dom)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer shrink-0 ${
                selectedDomain === dom
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {dom}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Jobs Grid / Table ──────────────────────────────────────────────── */}
      {filteredJobs.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs">
          <Briefcase size={36} className="mx-auto text-slate-300 mb-3" />
          <h3 className="text-base font-bold text-slate-800">No matching job postings found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
            Try adjusting your search criteria or domain filter, or create a brand new job opening.
          </p>
          <button
            onClick={handleOpenAdd}
            className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
          >
            + Create New Job Opening
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-slate-300 shadow-xs flex flex-col justify-between transition-all"
            >
              <div>
                {/* Badges & Actions */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                        job.domain === 'Tech'
                          ? 'bg-blue-50 text-blue-700'
                          : job.domain === 'Non-Tech'
                          ? 'bg-purple-50 text-purple-700'
                          : job.domain === 'Academics'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {job.domain}
                    </span>
                    <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-semibold">
                      {job.type}
                    </span>
                    <span className="text-[10px] font-mono bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md">
                      {job.openings} {job.openings === 1 ? 'opening' : 'openings'}
                    </span>
                  </div>

                  {/* Actions (Edit & Delete) */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(job)}
                      title="Edit Job"
                      className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <Edit3 size={15} />
                    </button>
                    <button
                      onClick={() => setDeletingJobId(job.id)}
                      title="Delete Job"
                      className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                {/* Job Title */}
                <h3 className="text-base font-bold text-slate-900 leading-snug mb-1">
                  {job.title}
                </h3>

                {/* Location & Salary */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 mb-3">
                  <div className="flex items-center gap-1">
                    <MapPin size={13} className="text-slate-400 shrink-0" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1 font-semibold text-emerald-700">
                    <IndianRupee size={13} className="shrink-0" />
                    <span>{job.salary}</span>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                  {job.summary}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {job.skills.slice(0, 4).map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[10px] bg-slate-100 text-slate-600 font-mono px-2 py-0.5 rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                  {job.skills.length > 4 && (
                    <span className="text-[10px] text-slate-400 font-mono px-1">
                      +{job.skills.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer: Quick info & Public link */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span className="font-mono">Posted: {job.postedDate}</span>
                <a
                  href={`#career?jobId=${encodeURIComponent(job.id)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Public View</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ─── Modal: Add / Edit Job ─────────────────────────────────────────── */}
      <AnimatePresence>
        {(isAddModalOpen || editingJob !== null) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsAddModalOpen(false);
                setEditingJob(null);
              }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-slate-900 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Briefcase size={18} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">
                      {editingJob ? 'Edit Job Posting' : 'Post New Job Opening'}
                    </h2>
                    <p className="text-xs text-slate-500">
                      Configure job attributes and hiring requirements
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingJob(null);
                  }}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={editingJob ? handleSaveEdit : handleSaveAdd} autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck={false} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    autoComplete="new-password"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    placeholder="Enter job title"
                    required
                    className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl py-2 px-3 text-xs sm:text-sm outline-hidden transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Domain Category
                    </label>
                    <select
                      value={formDomain}
                      onChange={(e) => setFormDomain(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl py-2 px-3 text-xs outline-hidden"
                    >
                      <option value="Tech">Tech</option>
                      <option value="Non-Tech">Non-Tech</option>
                      <option value="Academics">Academics</option>
                      <option value="Sales">Sales</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Employment Type
                    </label>
                    <select
                      value={formType}
                      onChange={(e) => setFormType(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl py-2 px-3 text-xs outline-hidden"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Remote Mentorship">Remote Mentorship</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Openings Count
                    </label>
                    <input
                      type="number"
                      min="1"
                      autoComplete="new-password"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck={false}
                      value={formOpenings}
                      onChange={(e) => setFormOpenings(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl py-2 px-3 text-xs outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Location Name
                    </label>
                    <input
                      type="text"
                      value={formLocation}
                      onChange={(e) => setFormLocation(e.target.value)}
                      autoComplete="new-password"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck={false}
                      placeholder="Enter location"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl py-2 px-3 text-xs outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Salary / Honorarium
                    </label>
                    <input
                      type="text"
                      value={formSalary}
                      onChange={(e) => setFormSalary(e.target.value)}
                      autoComplete="new-password"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck={false}
                      placeholder="Enter salary / honorarium"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl py-2 px-3 text-xs outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Job Summary
                  </label>
                  <textarea
                    rows={2}
                    value={formSummary}
                    onChange={(e) => setFormSummary(e.target.value)}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    placeholder="Enter job summary..."
                    className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl py-2 px-3 text-xs outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Key Skills (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formSkills}
                    onChange={(e) => setFormSkills(e.target.value)}
                    autoComplete="new-password"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    placeholder="Enter key skills"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl py-2 px-3 text-xs outline-hidden font-mono"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Responsibilities (one per line)
                    </label>
                    <textarea
                      rows={3}
                      value={formResponsibilities}
                      onChange={(e) => setFormResponsibilities(e.target.value)}
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck={false}
                      placeholder="Enter responsibilities (one per line)"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl py-2 px-3 text-xs outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Requirements (one per line)
                    </label>
                    <textarea
                      rows={3}
                      value={formRequirements}
                      onChange={(e) => setFormRequirements(e.target.value)}
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck={false}
                      placeholder="Enter requirements (one per line)"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl py-2 px-3 text-xs outline-hidden"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddModalOpen(false);
                      setEditingJob(null);
                    }}
                    className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md shadow-blue-600/30 transition-all cursor-pointer"
                  >
                    {editingJob ? 'Save Changes' : 'Publish Job Opening'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── Delete Confirmation Modal ──────────────────────────────────────── */}
      <AnimatePresence>
        {deletingJobId !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeletingJobId(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl z-10 text-slate-900"
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
                <AlertTriangle size={24} />
              </div>
              <h3 className="text-lg font-bold mb-1">Delete this job opening?</h3>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                This job position will be immediately removed from the live website and public career portal. Are you sure?
              </p>
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setDeletingJobId(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  className="px-5 py-2 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-md shadow-rose-600/30 cursor-pointer"
                >
                  Yes, Delete Job
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
