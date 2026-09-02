import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  Sparkles
} from 'lucide-react';
import { useAdminData, type MentorItem } from '../../../context/AdminDataContext';

export function MentorsTab() {
  const { mentors, addMentor, updateMentor, deleteMentor } = useAdminData();

  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingMentor, setEditingMentor] = useState<MentorItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form fields
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [companyColor, setCompanyColor] = useState('#2563EB');
  const [role, setRole] = useState('');
  const [exp, setExp] = useState('80+ Sessions');
  const [tag, setTag] = useState('System Design & Placement Sprint');
  const [quote, setQuote] = useState('');
  const [image, setImage] = useState('/mentors/nandwana_abhishek.jpg');

  const openAddModal = () => {
    setName('');
    setCompany('');
    setCompanyColor('#2563EB');
    setRole('');
    setExp('80+ Sessions');
    setTag('System Design & Placement Sprint');
    setQuote('');
    setImage('/mentors/nandwana_abhishek.jpg');
    setEditingMentor(null);
    setIsAddModalOpen(true);
  };

  const openEditModal = (mentor: MentorItem) => {
    setName(mentor.name);
    setCompany(mentor.company);
    setCompanyColor(mentor.companyColor || '#2563EB');
    setRole(mentor.role);
    setExp(mentor.exp || '80+ Sessions');
    setTag(mentor.tag || 'System Design & Placement Sprint');
    setQuote(mentor.quote || '');
    setImage(mentor.image);
    setEditingMentor(mentor);
    setIsAddModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !company.trim() || !role.trim()) return;

    if (editingMentor) {
      updateMentor(editingMentor.id, {
        name: name.trim(),
        company: company.trim(),
        companyColor,
        role: role.trim(),
        exp: exp.trim(),
        tag: tag.trim(),
        quote: quote.trim(),
        image: image.trim(),
      });
    } else {
      addMentor({
        name: name.trim(),
        company: company.trim(),
        companyColor,
        role: role.trim(),
        exp: exp.trim(),
        tag: tag.trim(),
        quote: quote.trim(),
        image: image.trim() || '/mentors/nandwana_abhishek.jpg',
      });
    }

    setIsAddModalOpen(false);
    setEditingMentor(null);
  };

  const filteredMentors = mentors.filter((m) => {
    const q = searchQuery.toLowerCase();
    return (
      m.name.toLowerCase().includes(q) ||
      m.company.toLowerCase().includes(q) ||
      m.role.toLowerCase().includes(q) ||
      (m.tag && m.tag.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      {/* Top Header & Search / Add Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-black/8 shadow-2xs">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-mono font-bold mb-2">
            <Sparkles size={12} />
            <span>GLOBAL FACULTY &amp; MENTORS</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 font-[family-name:var(--font-display)] tracking-tight">
            Industry Leaders &amp; 1:1 Mentors ({mentors.length})
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage mentors displayed on the landing page and candidate career evaluation report.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search mentors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2.5 rounded-full border border-black/10 bg-slate-50 text-xs text-slate-900 focus:outline-hidden focus:border-[#2563EB] w-48 sm:w-60 transition-all"
            />
          </div>

          <button
            onClick={openAddModal}
            className="btn-pill-primary px-4 py-2.5 text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer shrink-0"
          >
            <Plus size={15} />
            <span>Add Mentor</span>
          </button>
        </div>
      </div>

      {/* Mentors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredMentors.map((mentor) => (
          <div
            key={mentor.id}
            className="bg-white rounded-2xl border border-black/8 p-5 flex flex-col justify-between space-y-4 shadow-2xs hover:shadow-md transition-all group relative"
          >
            <div className="space-y-3">
              {/* Header: Photo + Name + Company */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-xs"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80';
                    }}
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 font-[family-name:var(--font-display)] group-hover:text-[#2563EB] transition-colors">
                      {mentor.name}
                    </h4>
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-md inline-block mt-0.5 text-white"
                      style={{ backgroundColor: mentor.companyColor || '#2563EB' }}
                    >
                      {mentor.company}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(mentor)}
                    className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-[#2563EB] transition-colors cursor-pointer"
                    title="Edit Mentor"
                  >
                    <Edit2 size={13} />
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(mentor.id)}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                    title="Delete Mentor"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>

              {/* Role & Sessions */}
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-normal">
                {mentor.role}
              </p>

              {/* Tag & Sessions pill */}
              <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
                <span className="px-2 py-0.5 rounded-md bg-blue-50 text-[#2563EB] font-semibold border border-blue-100">
                  {mentor.tag || 'Placement Sprint'}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                  {mentor.exp || '80+ Sessions'}
                </span>
              </div>

              {mentor.quote && (
                <p className="text-[11px] text-slate-500 italic line-clamp-2 border-l-2 border-blue-400 pl-2">
                  &ldquo;{mentor.quote}&rdquo;
                </p>
              )}
            </div>

            {/* Delete confirmation inline */}
            {deleteConfirmId === mentor.id && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs space-y-2 mt-2">
                <p className="text-red-700 font-bold">Remove this mentor?</p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      deleteMentor(mentor.id);
                      setDeleteConfirmId(null);
                    }}
                    className="px-3 py-1 rounded-md bg-red-600 text-white font-bold cursor-pointer"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(null)}
                    className="px-3 py-1 rounded-md bg-slate-200 text-slate-700 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredMentors.length === 0 && (
        <div className="p-12 text-center bg-white rounded-3xl border border-black/8">
          <Users size={36} className="mx-auto text-slate-300 mb-2" />
          <h3 className="text-base font-bold text-slate-700">No mentors found</h3>
          <p className="text-xs text-slate-400 mt-1">Try a different search query or add a new mentor.</p>
        </div>
      )}

      {/* Add / Edit Mentor Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-black/10 p-6 sm:p-8 z-10 my-8 space-y-5"
            >
              <div className="flex items-center justify-between border-b border-black/6 pb-4">
                <h3 className="text-lg font-extrabold text-slate-900 font-[family-name:var(--font-display)]">
                  {editingMentor ? 'Edit Mentor Profile' : 'Add New Industry Mentor'}
                </h3>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Mentor Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Nandwana Abhishek"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 text-xs focus:border-[#2563EB] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Company / Organization *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Meta, Accenture, Deloitte"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 text-xs focus:border-[#2563EB] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Company Badge Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={companyColor}
                        onChange={(e) => setCompanyColor(e.target.value)}
                        className="w-9 h-9 rounded-lg border border-black/10 cursor-pointer p-0.5"
                      />
                      <input
                        type="text"
                        value={companyColor}
                        onChange={(e) => setCompanyColor(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-black/10 text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Experience / Sessions</label>
                    <input
                      type="text"
                      placeholder="e.g. 95+ Sessions or 10+ Yrs Exp"
                      value={exp}
                      onChange={(e) => setExp(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 text-xs focus:border-[#2563EB] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Role / Designation *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Software Engineer · Meta (London, UK)"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 text-xs focus:border-[#2563EB] focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Focus Tag</label>
                    <input
                      type="text"
                      placeholder="e.g. System Design & Distributed Tech"
                      value={tag}
                      onChange={(e) => setTag(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 text-xs focus:border-[#2563EB] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Photo URL / Path</label>
                    <input
                      type="text"
                      placeholder="/mentors/nandwana_abhishek.jpg"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 text-xs focus:border-[#2563EB] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mentor Bio / Quote</label>
                  <textarea
                    rows={2}
                    placeholder="Brief description or background..."
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 text-xs focus:border-[#2563EB] focus:outline-hidden"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-black/6">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl border border-black/10 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-pill-primary px-6 py-2.5 text-xs font-bold cursor-pointer"
                  >
                    {editingMentor ? 'Save Changes' : 'Create Mentor'}
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
