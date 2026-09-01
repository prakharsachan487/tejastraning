import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Search,
  Download,
  Briefcase,
  FileText,
  Phone,
  Mail,
  ExternalLink,
  Trash2,
  Clock,
  AlertCircle,
  X,
  Save,
  Link as LinkIcon
} from 'lucide-react';
import { useAdminData, type JobApplication } from '../../../context/AdminDataContext';

export function ApplicationsTab() {
  const {
    applications,
    updateApplicationStatus,
    updateApplicationNotes,
    deleteApplication,
    exportApplicationsCSV,
  } = useAdminData();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | JobApplication['status']>('ALL');
  const [selectedApp, setSelectedApp] = useState<JobApplication | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [activeNotes, setActiveNotes] = useState('');

  const handleOpenDetails = (app: JobApplication) => {
    setSelectedApp(app);
    setActiveNotes(app.notes || '');
  };

  const handleSaveNotes = () => {
    if (selectedApp) {
      updateApplicationNotes(selectedApp.id, activeNotes);
      setSelectedApp((prev) => (prev ? { ...prev, notes: activeNotes } : null));
    }
  };

  const handleConfirmDelete = () => {
    if (deletingId) {
      deleteApplication(deletingId);
      if (selectedApp?.id === deletingId) {
        setSelectedApp(null);
      }
      setDeletingId(null);
    }
  };

  // Filtered applicants
  const filteredApps = useMemo(() => {
    return applications.filter((a) => {
      if (statusFilter !== 'ALL' && a.status !== statusFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = a.fullName.toLowerCase().includes(q);
        const matchRole = a.jobTitle.toLowerCase().includes(q);
        const matchEmail = a.email.toLowerCase().includes(q);
        const matchPhone = a.phone.includes(q);
        const matchExp = (a.experience || '').toLowerCase().includes(q);
        if (!matchName && !matchRole && !matchEmail && !matchPhone && !matchExp) {
          return false;
        }
      }
      return true;
    });
  }, [applications, statusFilter, searchQuery]);

  const countPending = applications.filter((a) => a.status === 'Pending').length;
  const countShortlisted = applications.filter((a) => a.status === 'Shortlisted').length;
  const countInterviewing = applications.filter((a) => a.status === 'Interview Scheduled').length;
  const countOffered = applications.filter((a) => a.status === 'Offered').length;

  return (
    <div className="space-y-6">
      {/* ─── Header & Export Action ─────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-[family-name:var(--font-display)]">
              Job Applications &amp; Candidate Resumes
            </h1>
            <span className="text-xs font-mono font-bold bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full">
              {applications.length} Total Applicants
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Review applicant profiles, resume submissions, candidate hiring stages, and interview evaluations.
          </p>
        </div>

        <button
          onClick={exportApplicationsCSV}
          className="bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02] shrink-0"
        >
          <Download size={16} />
          <span>Export Candidates CSV</span>
        </button>
      </div>

      {/* ─── Status Pipeline Cards ──────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setStatusFilter(statusFilter === 'Pending' ? 'ALL' : 'Pending')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            statusFilter === 'Pending'
              ? 'bg-amber-500 text-white border-amber-600 shadow-md'
              : 'bg-white border-slate-200/80 hover:border-amber-400'
          }`}
        >
          <span className={`text-[11px] font-mono font-bold uppercase ${statusFilter === 'Pending' ? 'text-amber-100' : 'text-amber-600'}`}>
            Pending Review
          </span>
          <p className={`text-2xl font-extrabold mt-0.5 ${statusFilter === 'Pending' ? 'text-white' : 'text-slate-900'}`}>
            {countPending}
          </p>
        </button>

        <button
          onClick={() => setStatusFilter(statusFilter === 'Shortlisted' ? 'ALL' : 'Shortlisted')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            statusFilter === 'Shortlisted'
              ? 'bg-blue-600 text-white border-blue-700 shadow-md'
              : 'bg-white border-slate-200/80 hover:border-blue-400'
          }`}
        >
          <span className={`text-[11px] font-mono font-bold uppercase ${statusFilter === 'Shortlisted' ? 'text-blue-100' : 'text-blue-600'}`}>
            Shortlisted
          </span>
          <p className={`text-2xl font-extrabold mt-0.5 ${statusFilter === 'Shortlisted' ? 'text-white' : 'text-slate-900'}`}>
            {countShortlisted}
          </p>
        </button>

        <button
          onClick={() => setStatusFilter(statusFilter === 'Interview Scheduled' ? 'ALL' : 'Interview Scheduled')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            statusFilter === 'Interview Scheduled'
              ? 'bg-purple-600 text-white border-purple-700 shadow-md'
              : 'bg-white border-slate-200/80 hover:border-purple-400'
          }`}
        >
          <span className={`text-[11px] font-mono font-bold uppercase ${statusFilter === 'Interview Scheduled' ? 'text-purple-100' : 'text-purple-600'}`}>
            Interviewing
          </span>
          <p className={`text-2xl font-extrabold mt-0.5 ${statusFilter === 'Interview Scheduled' ? 'text-white' : 'text-slate-900'}`}>
            {countInterviewing}
          </p>
        </button>

        <button
          onClick={() => setStatusFilter(statusFilter === 'Offered' ? 'ALL' : 'Offered')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            statusFilter === 'Offered'
              ? 'bg-emerald-600 text-white border-emerald-700 shadow-md'
              : 'bg-white border-slate-200/80 hover:border-emerald-400'
          }`}
        >
          <span className={`text-[11px] font-mono font-bold uppercase ${statusFilter === 'Offered' ? 'text-emerald-100' : 'text-emerald-600'}`}>
            Selected / Hired
          </span>
          <p className={`text-2xl font-extrabold mt-0.5 ${statusFilter === 'Offered' ? 'text-white' : 'text-slate-900'}`}>
            {countOffered}
          </p>
        </button>
      </div>

      {/* ─── Search & Status Filter Bar ─────────────────────────────────────── */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search applicants by name, role, email, or skill..."
            className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white rounded-xl py-2 pl-10 pr-4 text-xs text-slate-800 placeholder-slate-400 outline-hidden"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {(['ALL', 'Pending', 'Reviewing', 'Shortlisted', 'Interview Scheduled', 'Offered', 'Rejected'] as const).map(
            (st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer shrink-0 ${
                  statusFilter === st
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {st === 'ALL' ? 'All Applicants' : st}
              </button>
            )
          )}
        </div>
      </div>

      {/* ─── Applications List ──────────────────────────────────────────────── */}
      {filteredApps.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs">
          <Users size={36} className="mx-auto text-slate-300 mb-3" />
          <h3 className="text-base font-bold text-slate-800">No applications match your criteria</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
            Try adjusting your search query or selecting a different candidate pipeline stage.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setStatusFilter('ALL');
            }}
            className="text-xs font-bold text-emerald-600 hover:underline cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredApps.map((app) => (
            <div
              key={app.id}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-slate-300 shadow-xs transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
            >
              {/* Applicant Info */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="text-sm font-bold text-slate-900">
                    {app.fullName}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold ${
                      app.status === 'Shortlisted'
                        ? 'bg-blue-100 text-blue-800'
                        : app.status === 'Interview Scheduled'
                        ? 'bg-purple-100 text-purple-800'
                        : app.status === 'Offered'
                        ? 'bg-emerald-100 text-emerald-800'
                        : app.status === 'Rejected'
                        ? 'bg-rose-100 text-rose-800'
                        : app.status === 'Reviewing'
                        ? 'bg-indigo-100 text-indigo-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {app.status}
                  </span>
                  <div className="inline-flex items-center gap-1 text-[10px] font-mono bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-bold">
                    <Briefcase size={11} />
                    <span className="truncate max-w-[200px]">{app.jobTitle}</span>
                  </div>
                </div>

                {/* Experience & Links */}
                {app.experience && (
                  <p className="text-xs text-slate-600 font-medium mb-2">
                    {app.experience}
                  </p>
                )}

                {/* Contact & Resume Pill Links */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-500">
                  <a
                    href={`mailto:${app.email}`}
                    className="hover:text-blue-600 font-mono inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Mail size={12} />
                    <span>{app.email}</span>
                  </a>
                  <a
                    href={`tel:${app.phone}`}
                    className="hover:text-emerald-600 font-mono inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Phone size={12} />
                    <span>{app.phone}</span>
                  </a>

                  {/* Resume link/file badge */}
                  {(app.resumeUrl || app.resumeFileName || app.portfolioLink) && (
                    <div className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-mono text-[11px] font-bold">
                      <FileText size={12} />
                      <span className="truncate max-w-[150px]">
                        {app.resumeFileName || 'Resume CV'}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                    <Clock size={11} />
                    <span>{new Date(app.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Status Selector & Action Buttons */}
              <div className="flex items-center gap-2 shrink-0 self-end lg:self-center">
                <select
                  value={app.status}
                  onChange={(e) => updateApplicationStatus(app.id, e.target.value as any)}
                  className="text-xs bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-semibold cursor-pointer outline-hidden"
                >
                  <option value="Pending">Stage: Pending</option>
                  <option value="Reviewing">Stage: Reviewing</option>
                  <option value="Shortlisted">Stage: Shortlisted</option>
                  <option value="Interview Scheduled">Stage: Interview Scheduled</option>
                  <option value="Offered">Stage: Offered / Hired</option>
                  <option value="Rejected">Stage: Rejected</option>
                </select>

                <button
                  onClick={() => handleOpenDetails(app)}
                  className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <FileText size={14} />
                  <span>Candidate Details</span>
                </button>

                <button
                  onClick={() => setDeletingId(app.id)}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                  title="Delete Application"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ─── Modal: Detailed Candidate View & Resume ───────────────────────── */}
      <AnimatePresence>
        {selectedApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedApp(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-slate-900 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Users size={18} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">
                      Candidate Profile &amp; Resume Review
                    </h2>
                    <p className="text-xs text-slate-500">
                      Applied on {new Date(selectedApp.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedApp(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-4">
                {/* Candidate Overview Card */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900">
                      {selectedApp.fullName}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold ${
                        selectedApp.status === 'Shortlisted'
                          ? 'bg-blue-100 text-blue-800'
                          : selectedApp.status === 'Interview Scheduled'
                          ? 'bg-purple-100 text-purple-800'
                          : selectedApp.status === 'Offered'
                          ? 'bg-emerald-100 text-emerald-800'
                          : selectedApp.status === 'Rejected'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {selectedApp.status}
                    </span>
                  </div>

                  <p className="text-xs text-blue-700 font-semibold flex items-center gap-1.5">
                    <Briefcase size={14} />
                    <span>Applied for: {selectedApp.jobTitle}</span>
                  </p>

                  <div className="pt-2 border-t border-slate-200/60 flex flex-wrap gap-4 text-xs font-mono">
                    <a
                      href={`mailto:${selectedApp.email}`}
                      className="text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <Mail size={12} />
                      <span>{selectedApp.email}</span>
                    </a>
                    <a
                      href={`tel:${selectedApp.phone}`}
                      className="text-emerald-600 hover:underline flex items-center gap-1"
                    >
                      <Phone size={12} />
                      <span>{selectedApp.phone}</span>
                    </a>
                  </div>
                </div>

                {/* Experience & Qualifications */}
                {selectedApp.experience && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Background &amp; Experience
                    </label>
                    <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 text-xs text-slate-700 leading-relaxed">
                      {selectedApp.experience}
                    </div>
                  </div>
                )}

                {/* Resume & Portfolio Links */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Submitted Resume &amp; Links
                  </label>
                  <div className="space-y-2">
                    {selectedApp.resumeUrl || selectedApp.resumeFileName ? (
                      <div className="p-3 bg-emerald-50/80 border border-emerald-200/80 rounded-xl flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-emerald-800 text-xs font-medium truncate">
                          <FileText size={16} className="text-emerald-600 shrink-0" />
                          <span className="truncate font-mono">
                            {selectedApp.resumeFileName || selectedApp.resumeUrl}
                          </span>
                        </div>
                        {selectedApp.resumeUrl && (
                          <a
                            href={selectedApp.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg shrink-0 flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <span>Open Resume</span>
                            <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                    ) : (
                      <div className="text-xs text-slate-400 italic">No resume file attached.</div>
                    )}

                    {selectedApp.portfolioLink && (
                      <div className="p-3 bg-blue-50/80 border border-blue-200/80 rounded-xl flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-blue-800 text-xs font-medium truncate">
                          <LinkIcon size={16} className="text-blue-600 shrink-0" />
                          <span className="truncate font-mono">{selectedApp.portfolioLink}</span>
                        </div>
                        <a
                          href={selectedApp.portfolioLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg shrink-0 flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <span>Open Portfolio</span>
                          <ExternalLink size={12} />
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Candidate Hiring Pipeline Stage */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Application Hiring Stage
                  </label>
                  <select
                    value={selectedApp.status}
                    onChange={(e) => {
                      const newStatus = e.target.value as any;
                      updateApplicationStatus(selectedApp.id, newStatus);
                      setSelectedApp((prev) => (prev ? { ...prev, status: newStatus } : null));
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs outline-hidden font-semibold"
                  >
                    <option value="Pending">Pending &mdash; Under initial queue</option>
                    <option value="Reviewing">Reviewing &mdash; CV evaluation in progress</option>
                    <option value="Shortlisted">Shortlisted &mdash; Passed preliminary screening</option>
                    <option value="Interview Scheduled">Interview Scheduled &mdash; Live tech/pedagogical round</option>
                    <option value="Offered">Offered &mdash; Offer letter / Contract dispatched</option>
                    <option value="Rejected">Rejected &mdash; Does not match current criteria</option>
                  </select>
                </div>

                {/* Internal Candidate Notes */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Internal Evaluator Notes &amp; Rubric Scores
                  </label>
                  <textarea
                    rows={3}
                    value={activeNotes}
                    onChange={(e) => setActiveNotes(e.target.value)}
                    placeholder="Add interview scores, communication ratings, or salary negotiation details..."
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white rounded-xl py-2 px-3 text-xs outline-hidden"
                  />
                  <div className="flex justify-end mt-1.5">
                    <button
                      type="button"
                      onClick={handleSaveNotes}
                      className="text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer"
                    >
                      <Save size={13} />
                      <span>Save Notes</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => {
                      setDeletingId(selectedApp.id);
                    }}
                    className="text-xs text-rose-600 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 size={13} />
                    <span>Delete Candidate</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedApp(null)}
                    className="px-5 py-2 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-xl cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── Delete Confirmation Modal ──────────────────────────────────────── */}
      <AnimatePresence>
        {deletingId !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeletingId(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl z-10 text-slate-900"
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
                <AlertCircle size={24} />
              </div>
              <h3 className="text-lg font-bold mb-1">Delete this candidate application?</h3>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                This applicant record and resume reference will be permanently removed.
              </p>
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setDeletingId(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  className="px-5 py-2 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-md shadow-rose-600/30 cursor-pointer"
                >
                  Yes, Delete Application
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
