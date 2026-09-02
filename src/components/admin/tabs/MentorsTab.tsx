import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  Sparkles,
  Upload,
  ArrowUp,
  ArrowDown,
  Globe,
  Layout,
  FileText,
  EyeOff
} from 'lucide-react';
import { useAdminData, type MentorItem } from '../../../context/AdminDataContext';

const PRESET_AVATARS = [
  { label: 'Abhishek', path: '/mentors/nandwana_abhishek.jpg' },
  { label: 'Nidhi', path: '/mentors/nidhi_singh.jpg' },
  { label: 'Vishal', path: '/mentors/vishal_motlani.jpg' },
  { label: 'Ashish', path: '/mentors/ashish_sachan.jpg' },
  { label: 'Mohit', path: '/mentors/mohit_khandelwal.png' },
  { label: 'Sakshi', path: '/mentors/sakshi_havelia.png' },
  { label: 'Gagandeep', path: '/mentors/gagandeep_singh.jpg' },
  { label: 'Siddhartha', path: '/mentors/siddhartha_kumar.jpg' },
];

export function MentorsTab() {
  const { mentors, addMentor, updateMentor, deleteMentor } = useAdminData();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterLocation, setFilterLocation] = useState<'all' | 'landing' | 'evaluation' | 'hidden' | 'filter_all'>('filter_all');
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
  const [displayLocation, setDisplayLocation] = useState<'all' | 'landing' | 'evaluation' | 'hidden'>('all');
  const [order, setOrder] = useState<number>(1);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const openAddModal = () => {
    setName('');
    setCompany('');
    setCompanyColor('#2563EB');
    setRole('');
    setExp('80+ Sessions');
    setTag('System Design & Placement Sprint');
    setQuote('');
    setImage('/mentors/nandwana_abhishek.jpg');
    setDisplayLocation('all');
    setOrder(mentors.length + 1);
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
    setDisplayLocation(mentor.displayLocation || 'all');
    setOrder(mentor.order || 1);
    setEditingMentor(mentor);
    setIsAddModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !company.trim() || !role.trim() || !image.trim()) return;

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
        displayLocation,
        order: Number(order) || 1,
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
        image: image.trim(),
        displayLocation,
        order: Number(order) || mentors.length + 1,
      });
    }

    setIsAddModalOpen(false);
    setEditingMentor(null);
  };

  const moveOrder = (mentorId: string, direction: 'up' | 'down') => {
    const currentIndex = mentors.findIndex((m) => m.id === mentorId);
    if (currentIndex === -1) return;

    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= mentors.length) return;

    const currentMentor = mentors[currentIndex];
    const targetMentor = mentors[targetIndex];

    const currentOrder = currentMentor.order ?? (currentIndex + 1);
    const targetOrder = targetMentor.order ?? (targetIndex + 1);

    updateMentor(currentMentor.id, { order: targetOrder });
    updateMentor(targetMentor.id, { order: currentOrder });
  };

  // Sort mentors by order or index
  const sortedMentors = [...mentors].sort((a, b) => (a.order || 0) - (b.order || 0));

  const filteredMentors = sortedMentors.filter((m) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      m.name.toLowerCase().includes(q) ||
      m.company.toLowerCase().includes(q) ||
      m.role.toLowerCase().includes(q) ||
      (m.tag && m.tag.toLowerCase().includes(q));

    if (!matchesSearch) return false;

    if (filterLocation === 'filter_all') return true;
    if (filterLocation === 'landing') return m.displayLocation === 'landing' || m.displayLocation === 'all' || !m.displayLocation;
    if (filterLocation === 'evaluation') return m.displayLocation === 'evaluation' || m.displayLocation === 'all' || !m.displayLocation;
    if (filterLocation === 'hidden') return m.displayLocation === 'hidden';
    return true;
  });

  const getLocationBadge = (loc?: 'all' | 'landing' | 'evaluation' | 'hidden') => {
    switch (loc) {
      case 'landing':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
            <Layout size={10} />
            <span>Landing Only</span>
          </span>
        );
      case 'evaluation':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 text-[10px] font-bold border border-purple-200">
            <FileText size={10} />
            <span>Evaluation Only</span>
          </span>
        );
      case 'hidden':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold border border-slate-200">
            <EyeOff size={10} />
            <span>Draft / Hidden</span>
          </span>
        );
      case 'all':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 text-[#2563EB] text-[10px] font-bold border border-blue-200">
            <Globe size={10} />
            <span>Landing &amp; Evaluation</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Search / Add Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-black/8 shadow-2xs">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-mono font-bold mb-2">
            <Sparkles size={12} />
            <span>GLOBAL FACULTY &amp; PLACEMENT MENTORS</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 font-[family-name:var(--font-display)] tracking-tight">
            Industry Leaders &amp; 1:1 Mentors ({mentors.length})
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Add new mentors, upload photos, reorder placements, and choose where each mentor appears.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search mentors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2.5 rounded-full border border-black/10 bg-slate-50 text-xs text-slate-900 focus:outline-hidden focus:border-[#2563EB] w-44 sm:w-56 transition-all"
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

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs font-semibold">
        <button
          onClick={() => setFilterLocation('filter_all')}
          className={`px-3.5 py-1.5 rounded-full border transition-all cursor-pointer ${
            filterLocation === 'filter_all'
              ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
              : 'bg-white text-slate-600 border-black/8 hover:border-black/20'
          }`}
        >
          All Mentors ({mentors.length})
        </button>
        <button
          onClick={() => setFilterLocation('landing')}
          className={`px-3.5 py-1.5 rounded-full border transition-all cursor-pointer ${
            filterLocation === 'landing'
              ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-xs'
              : 'bg-white text-slate-600 border-black/8 hover:border-black/20'
          }`}
        >
          🏠 Landing Page Visible
        </button>
        <button
          onClick={() => setFilterLocation('evaluation')}
          className={`px-3.5 py-1.5 rounded-full border transition-all cursor-pointer ${
            filterLocation === 'evaluation'
              ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-xs'
              : 'bg-white text-slate-600 border-black/8 hover:border-black/20'
          }`}
        >
          📊 Evaluation Report Visible
        </button>
        <button
          onClick={() => setFilterLocation('hidden')}
          className={`px-3.5 py-1.5 rounded-full border transition-all cursor-pointer ${
            filterLocation === 'hidden'
              ? 'bg-slate-700 text-white border-slate-700 shadow-xs'
              : 'bg-white text-slate-600 border-black/8 hover:border-black/20'
          }`}
        >
          🔒 Hidden / Draft
        </button>
      </div>

      {/* Mentors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredMentors.map((mentor, index) => (
          <div
            key={mentor.id}
            className="bg-white rounded-2xl border border-black/8 p-5 flex flex-col justify-between space-y-4 shadow-2xs hover:shadow-md transition-all group relative"
          >
            <div className="space-y-3">
              {/* Header: Photo + Name + Company */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={mentor.image}
                      alt={mentor.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-xs"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80';
                      }}
                    />
                    <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] font-mono font-bold flex items-center justify-center shadow-xs">
                      {mentor.order ?? index + 1}
                    </span>
                  </div>
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

              {/* Placement Badge */}
              <div className="pt-0.5">
                {getLocationBadge(mentor.displayLocation)}
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

            {/* Position Order Control (Up / Down) */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="text-[11px] font-mono">Position #{mentor.order ?? index + 1}</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => moveOrder(mentor.id, 'up')}
                  disabled={index === 0}
                  className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                  title="Move Up"
                >
                  <ArrowUp size={12} />
                </button>
                <button
                  onClick={() => moveOrder(mentor.id, 'down')}
                  disabled={index === sortedMentors.length - 1}
                  className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                  title="Move Down"
                >
                  <ArrowDown size={12} />
                </button>
              </div>
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
              className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-black/10 p-6 sm:p-8 z-10 my-8 space-y-5 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-black/6 pb-4">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 font-[family-name:var(--font-display)]">
                    {editingMentor ? 'Edit Mentor Profile' : 'Add New Industry Mentor'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Upload photo and choose exact display placement on website.
                  </p>
                </div>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                {/* 1. Image Upload Section */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <label className="block text-xs font-bold text-slate-800">
                    Mentor Photograph / Avatar *
                  </label>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    {/* Image Preview */}
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-white border-2 border-[#2563EB] shrink-0 shadow-xs">
                      <img
                        src={image}
                        alt="Mentor Preview"
                        className="w-full h-full object-cover object-top"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80';
                        }}
                      />
                    </div>

                    {/* Upload button & Presets */}
                    <div className="flex-1 space-y-2 w-full">
                      <div className="flex items-center gap-2">
                        <input
                          type="file"
                          ref={fileInputRef}
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="btn-pill-primary px-4 py-2 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <Upload size={14} />
                          <span>Upload Photo from Computer</span>
                        </button>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] text-slate-400 font-mono">Or pick preset avatar:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {PRESET_AVATARS.map((p) => (
                            <button
                              key={p.label}
                              type="button"
                              onClick={() => setImage(p.path)}
                              className={`px-2 py-0.5 rounded-md text-[10px] font-mono border cursor-pointer transition-all ${
                                image === p.path
                                  ? 'bg-[#2563EB] text-white border-[#2563EB] font-bold'
                                  : 'bg-white text-slate-600 border-black/10 hover:border-black/25'
                              }`}
                            >
                              {p.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Manual URL Input fallback */}
                  <div>
                    <input
                      type="text"
                      placeholder="Or paste external image URL (e.g. https://...)"
                      value={image.startsWith('data:') ? 'Image uploaded from device (base64)' : image}
                      onChange={(e) => {
                        if (!e.target.value.startsWith('Image uploaded')) {
                          setImage(e.target.value);
                        }
                      }}
                      className="w-full px-3 py-1.5 rounded-xl border border-black/10 text-[11px] font-mono bg-white focus:border-[#2563EB] focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* 2. Placement / Display Destination */}
                <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-2">
                  <label className="block text-xs font-bold text-slate-800">
                    Where should this mentor appear? *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <label
                      className={`p-3 rounded-xl border cursor-pointer flex items-center gap-2 text-xs transition-all ${
                        displayLocation === 'all'
                          ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-xs'
                          : 'bg-white text-slate-700 border-black/10 hover:border-black/25'
                      }`}
                    >
                      <input
                        type="radio"
                        name="displayLocation"
                        value="all"
                        checked={displayLocation === 'all'}
                        onChange={() => setDisplayLocation('all')}
                        className="hidden"
                      />
                      <Globe size={15} />
                      <span>🌐 Both Landing &amp; Evaluation</span>
                    </label>

                    <label
                      className={`p-3 rounded-xl border cursor-pointer flex items-center gap-2 text-xs transition-all ${
                        displayLocation === 'landing'
                          ? 'bg-emerald-600 text-white border-emerald-600 font-bold shadow-xs'
                          : 'bg-white text-slate-700 border-black/10 hover:border-black/25'
                      }`}
                    >
                      <input
                        type="radio"
                        name="displayLocation"
                        value="landing"
                        checked={displayLocation === 'landing'}
                        onChange={() => setDisplayLocation('landing')}
                        className="hidden"
                      />
                      <Layout size={15} />
                      <span>🏠 Only Landing Page</span>
                    </label>

                    <label
                      className={`p-3 rounded-xl border cursor-pointer flex items-center gap-2 text-xs transition-all ${
                        displayLocation === 'evaluation'
                          ? 'bg-purple-600 text-white border-purple-600 font-bold shadow-xs'
                          : 'bg-white text-slate-700 border-black/10 hover:border-black/25'
                      }`}
                    >
                      <input
                        type="radio"
                        name="displayLocation"
                        value="evaluation"
                        checked={displayLocation === 'evaluation'}
                        onChange={() => setDisplayLocation('evaluation')}
                        className="hidden"
                      />
                      <FileText size={15} />
                      <span>📊 Only Evaluation Report</span>
                    </label>

                    <label
                      className={`p-3 rounded-xl border cursor-pointer flex items-center gap-2 text-xs transition-all ${
                        displayLocation === 'hidden'
                          ? 'bg-slate-700 text-white border-slate-700 font-bold shadow-xs'
                          : 'bg-white text-slate-700 border-black/10 hover:border-black/25'
                      }`}
                    >
                      <input
                        type="radio"
                        name="displayLocation"
                        value="hidden"
                        checked={displayLocation === 'hidden'}
                        onChange={() => setDisplayLocation('hidden')}
                        className="hidden"
                      />
                      <EyeOff size={15} />
                      <span>🔒 Hidden / Draft</span>
                    </label>
                  </div>
                </div>

                {/* 3. Name & Company */}
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

                {/* 4. Company Badge Color & Display Position */}
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
                    <label className="block text-xs font-bold text-slate-700 mb-1">Display Priority / Order #</label>
                    <input
                      type="number"
                      min={1}
                      value={order}
                      onChange={(e) => setOrder(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 text-xs focus:border-[#2563EB] focus:outline-hidden font-mono font-bold"
                    />
                  </div>
                </div>

                {/* 5. Role & Designation */}
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

                {/* 6. Tag & Experience */}
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

                {/* 7. Quote / Bio */}
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
                    className="btn-pill-primary px-6 py-2.5 text-xs font-bold cursor-pointer shadow-md"
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
