import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Search,
  Download,
  Building,
  Phone,
  Clock,
  AlertCircle,
  FileText,
  Trash2,
  X,
  Save
} from 'lucide-react';
import { useAdminData, type FormSubmission } from '../../../context/AdminDataContext';

export function EnquiriesTab() {
  const {
    enquiries,
    updateEnquiryStatus,
    updateEnquiryNotes,
    deleteEnquiry,
    exportEnquiriesCSV,
  } = useAdminData();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | FormSubmission['status']>('ALL');
  const [selectedEnquiry, setSelectedEnquiry] = useState<FormSubmission | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [activeNotes, setActiveNotes] = useState('');

  // Open full details modal
  const handleOpenDetails = (enq: FormSubmission) => {
    setSelectedEnquiry(enq);
    setActiveNotes(enq.notes || '');
  };

  const handleSaveNotes = () => {
    if (selectedEnquiry) {
      updateEnquiryNotes(selectedEnquiry.id, activeNotes);
      setSelectedEnquiry((prev) => (prev ? { ...prev, notes: activeNotes } : null));
    }
  };

  const handleConfirmDelete = () => {
    if (deletingId) {
      deleteEnquiry(deletingId);
      if (selectedEnquiry?.id === deletingId) {
        setSelectedEnquiry(null);
      }
      setDeletingId(null);
    }
  };

  // Filtered list
  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((e) => {
      if (statusFilter !== 'ALL' && e.status !== statusFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = e.fullName.toLowerCase().includes(q);
        const matchCol = e.collegeName.toLowerCase().includes(q);
        const matchEmail = e.email.toLowerCase().includes(q);
        const matchPhone = e.phone.includes(q);
        const matchProf = e.profession.toLowerCase().includes(q);
        const matchMsg = (e.message || '').toLowerCase().includes(q);
        if (!matchName && !matchCol && !matchEmail && !matchPhone && !matchProf && !matchMsg) {
          return false;
        }
      }
      return true;
    });
  }, [enquiries, statusFilter, searchQuery]);

  const countNew = enquiries.filter((e) => e.status === 'NEW').length;
  const countContacted = enquiries.filter((e) => e.status === 'CONTACTED').length;
  const countInProgress = enquiries.filter((e) => e.status === 'IN_PROGRESS').length;
  const countClosed = enquiries.filter((e) => e.status === 'CLOSED').length;

  return (
    <div className="space-y-6">
      {/* ─── Header & Export Action ─────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-[family-name:var(--font-display)]">
              Connect With Grow 360 &mdash; Form Submissions
            </h1>
            <span className="text-xs font-mono font-bold bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded-full">
              {enquiries.length} Total Submissions
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Review institutional placement enquiries, college TPO consultation requests, and enterprise proposals submitted across the website.
          </p>
        </div>

        <button
          onClick={exportEnquiriesCSV}
          className="bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02] shrink-0"
        >
          <Download size={16} />
          <span>Export to CSV</span>
        </button>
      </div>

      {/* ─── Status Stats Strip ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setStatusFilter(statusFilter === 'NEW' ? 'ALL' : 'NEW')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            statusFilter === 'NEW'
              ? 'bg-amber-500 text-white border-amber-600 shadow-md'
              : 'bg-white border-slate-200/80 hover:border-amber-400'
          }`}
        >
          <span className={`text-[11px] font-mono font-bold uppercase ${statusFilter === 'NEW' ? 'text-amber-100' : 'text-amber-600'}`}>
            NEW Leads
          </span>
          <p className={`text-2xl font-extrabold mt-0.5 ${statusFilter === 'NEW' ? 'text-white' : 'text-slate-900'}`}>
            {countNew}
          </p>
        </button>

        <button
          onClick={() => setStatusFilter(statusFilter === 'CONTACTED' ? 'ALL' : 'CONTACTED')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            statusFilter === 'CONTACTED'
              ? 'bg-blue-600 text-white border-blue-700 shadow-md'
              : 'bg-white border-slate-200/80 hover:border-blue-400'
          }`}
        >
          <span className={`text-[11px] font-mono font-bold uppercase ${statusFilter === 'CONTACTED' ? 'text-blue-100' : 'text-blue-600'}`}>
            Contacted
          </span>
          <p className={`text-2xl font-extrabold mt-0.5 ${statusFilter === 'CONTACTED' ? 'text-white' : 'text-slate-900'}`}>
            {countContacted}
          </p>
        </button>

        <button
          onClick={() => setStatusFilter(statusFilter === 'IN_PROGRESS' ? 'ALL' : 'IN_PROGRESS')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            statusFilter === 'IN_PROGRESS'
              ? 'bg-purple-600 text-white border-purple-700 shadow-md'
              : 'bg-white border-slate-200/80 hover:border-purple-400'
          }`}
        >
          <span className={`text-[11px] font-mono font-bold uppercase ${statusFilter === 'IN_PROGRESS' ? 'text-purple-100' : 'text-purple-600'}`}>
            In Progress
          </span>
          <p className={`text-2xl font-extrabold mt-0.5 ${statusFilter === 'IN_PROGRESS' ? 'text-white' : 'text-slate-900'}`}>
            {countInProgress}
          </p>
        </button>

        <button
          onClick={() => setStatusFilter(statusFilter === 'CLOSED' ? 'ALL' : 'CLOSED')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            statusFilter === 'CLOSED'
              ? 'bg-emerald-600 text-white border-emerald-700 shadow-md'
              : 'bg-white border-slate-200/80 hover:border-emerald-400'
          }`}
        >
          <span className={`text-[11px] font-mono font-bold uppercase ${statusFilter === 'CLOSED' ? 'text-emerald-100' : 'text-emerald-600'}`}>
            Closed / Signed
          </span>
          <p className={`text-2xl font-extrabold mt-0.5 ${statusFilter === 'CLOSED' ? 'text-white' : 'text-slate-900'}`}>
            {countClosed}
          </p>
        </button>
      </div>

      {/* ─── Search & Filters Bar ───────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by college, contact name, email, or phone..."
            className="w-full bg-slate-50 border border-slate-200 focus:border-amber-500 focus:bg-white rounded-xl py-2 pl-10 pr-4 text-xs text-slate-800 placeholder-slate-400 outline-hidden"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {(['ALL', 'NEW', 'CONTACTED', 'IN_PROGRESS', 'CLOSED'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer shrink-0 ${
                statusFilter === st
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {st === 'ALL' ? 'All Inquiries' : st}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Submissions Table / Cards ──────────────────────────────────────── */}
      {filteredEnquiries.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs">
          <Mail size={36} className="mx-auto text-slate-300 mb-3" />
          <h3 className="text-base font-bold text-slate-800">No submissions matching criteria</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
            Try clearing filters or search query to view all form inquiries.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setStatusFilter('ALL');
            }}
            className="text-xs font-bold text-amber-600 hover:underline cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredEnquiries.map((enq) => (
            <div
              key={enq.id}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-slate-300 shadow-xs transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
            >
              {/* Lead Info */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="text-sm font-bold text-slate-900">
                    {enq.fullName}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                      enq.status === 'NEW'
                        ? 'bg-amber-100 text-amber-800'
                        : enq.status === 'CONTACTED'
                        ? 'bg-blue-100 text-blue-800'
                        : enq.status === 'IN_PROGRESS'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {enq.status}
                  </span>
                  <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                    {enq.source === 'HERO_REFERENCE_FORM'
                      ? 'Hero Proposal Form'
                      : enq.source === 'MODAL_ENQUIRY'
                      ? 'Navbar Modal'
                      : enq.source}
                  </span>
                </div>

                {/* College & Designation */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-700 font-medium mb-2">
                  <div className="flex items-center gap-1.5 text-blue-700 font-semibold">
                    <Building size={13} className="shrink-0" />
                    <span>{enq.collegeName}</span>
                  </div>
                  <span className="text-slate-400">&bull;</span>
                  <span className="text-slate-600">{enq.profession}</span>
                </div>

                {/* Contact Links & Timestamp */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                  <a
                    href={`mailto:${enq.email}`}
                    className="hover:text-blue-600 font-mono inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Mail size={12} />
                    <span>{enq.email}</span>
                  </a>
                  <a
                    href={`tel:${enq.phone}`}
                    className="hover:text-emerald-600 font-mono inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Phone size={12} />
                    <span>{enq.phone}</span>
                  </a>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                    <Clock size={11} />
                    <span>{new Date(enq.createdAt).toLocaleString()}</span>
                  </div>
                </div>

                {/* Message Snippet */}
                {enq.message && (
                  <p className="text-xs text-slate-600 mt-2.5 bg-slate-50 p-2.5 rounded-xl border border-slate-100 line-clamp-2">
                    &ldquo;{enq.message}&rdquo;
                  </p>
                )}
              </div>

              {/* Status Selector & Actions */}
              <div className="flex items-center gap-2 shrink-0 self-end lg:self-center">
                <select
                  value={enq.status}
                  onChange={(e) => updateEnquiryStatus(enq.id, e.target.value as any)}
                  className="text-xs bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-semibold cursor-pointer outline-hidden"
                >
                  <option value="NEW">Status: NEW</option>
                  <option value="CONTACTED">Status: CONTACTED</option>
                  <option value="IN_PROGRESS">Status: IN PROGRESS</option>
                  <option value="CLOSED">Status: CLOSED</option>
                </select>

                <button
                  onClick={() => handleOpenDetails(enq)}
                  className="bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <FileText size={14} />
                  <span>View Details</span>
                </button>

                <button
                  onClick={() => setDeletingId(enq.id)}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                  title="Delete Entry"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ─── Modal: Detailed Lead View & Admin Notes ────────────────────────── */}
      <AnimatePresence>
        {selectedEnquiry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEnquiry(null)}
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
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">
                      Institutional Inquiry Details
                    </h2>
                    <p className="text-xs text-slate-500">
                      Submitted on {new Date(selectedEnquiry.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedEnquiry(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-4">
                {/* Contact Card */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 text-sm">
                      {selectedEnquiry.fullName}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold uppercase ${
                        selectedEnquiry.status === 'NEW'
                          ? 'bg-amber-100 text-amber-800'
                          : selectedEnquiry.status === 'CONTACTED'
                          ? 'bg-blue-100 text-blue-800'
                          : selectedEnquiry.status === 'IN_PROGRESS'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {selectedEnquiry.status}
                    </span>
                  </div>

                  <p className="text-xs text-blue-700 font-semibold flex items-center gap-1.5">
                    <Building size={14} />
                    <span>{selectedEnquiry.collegeName}</span>
                  </p>
                  <p className="text-xs text-slate-600">
                    Designation: <strong>{selectedEnquiry.profession}</strong>
                  </p>

                  <div className="pt-2 border-t border-slate-200/60 flex flex-wrap gap-4 text-xs font-mono">
                    <a
                      href={`mailto:${selectedEnquiry.email}`}
                      className="text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <Mail size={12} />
                      <span>{selectedEnquiry.email}</span>
                    </a>
                    <a
                      href={`tel:${selectedEnquiry.phone}`}
                      className="text-emerald-600 hover:underline flex items-center gap-1"
                    >
                      <Phone size={12} />
                      <span>{selectedEnquiry.phone}</span>
                    </a>
                  </div>
                </div>

                {/* Requirements / Message */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Submitted Proposal Request &amp; Message
                  </label>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs text-slate-700 leading-relaxed min-h-[70px]">
                    {selectedEnquiry.message ? (
                      selectedEnquiry.message
                    ) : (
                      <span className="text-slate-400 italic">No additional message provided.</span>
                    )}
                  </div>
                </div>

                {/* Status Switcher */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Lead Status
                  </label>
                  <select
                    value={selectedEnquiry.status}
                    onChange={(e) => {
                      const newStatus = e.target.value as any;
                      updateEnquiryStatus(selectedEnquiry.id, newStatus);
                      setSelectedEnquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs outline-hidden font-semibold"
                  >
                    <option value="NEW">NEW &mdash; Awaiting First Touch</option>
                    <option value="CONTACTED">CONTACTED &mdash; Phone / Email Outreached</option>
                    <option value="IN_PROGRESS">IN_PROGRESS &mdash; Demo / Syllabus Review</option>
                    <option value="CLOSED">CLOSED &mdash; MOU Signed / Partnership Formalized</option>
                  </select>
                </div>

                {/* Admin Internal Notes */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Internal Follow-up Notes (Admin Only)
                  </label>
                  <textarea
                    rows={3}
                    value={activeNotes}
                    onChange={(e) => setActiveNotes(e.target.value)}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    placeholder="Enter notes..."
                    className="w-full bg-slate-50 border border-slate-200 focus:border-amber-500 focus:bg-white rounded-xl py-2 px-3 text-xs outline-hidden"
                  />
                  <div className="flex justify-end mt-1.5">
                    <button
                      type="button"
                      onClick={handleSaveNotes}
                      className="text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer"
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
                      setDeletingId(selectedEnquiry.id);
                    }}
                    className="text-xs text-rose-600 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 size={13} />
                    <span>Delete Submission</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedEnquiry(null)}
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
              <h3 className="text-lg font-bold mb-1">Delete this form submission?</h3>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                This record will be permanently deleted from the database and submission log.
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
                  Yes, Delete Entry
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
