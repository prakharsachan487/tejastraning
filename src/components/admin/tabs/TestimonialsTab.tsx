import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Quote,
  Plus,
  Edit2,
  Trash2,
  X,
  Upload,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  CheckCircle2
} from 'lucide-react';
import { useAdminData, type TestimonialItem } from '../../../context/AdminDataContext';

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
];

const CATEGORIES = ['College Leadership', 'Placed Students', 'Campus Recruiters'];

export function TestimonialsTab() {
  const {
    testimonials,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    toggleTestimonialActive,
  } = useAdminData();

  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);

  // Form State
  const [category, setCategory] = useState<string>('College Leadership');
  const [author, setAuthor] = useState<string>('');
  const [designation, setDesignation] = useState<string>('');
  const [institution, setInstitution] = useState<string>('');
  const [quote, setQuote] = useState<string>('');
  const [stats, setStats] = useState<string>('');
  const [avatar, setAvatar] = useState<string>(PRESET_AVATARS[0]);
  const [active, setActive] = useState<boolean>(true);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const sortedTestimonials = [...testimonials].sort((a, b) => (a.order || 0) - (b.order || 0));

  const filteredTestimonials =
    activeFilter === 'ALL'
      ? sortedTestimonials
      : sortedTestimonials.filter((t) => t.category === activeFilter);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setCategory('College Leadership');
    setAuthor('');
    setDesignation('');
    setInstitution('');
    setQuote('');
    setStats('');
    setAvatar('');
    setActive(true);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: TestimonialItem) => {
    setEditingItem(item);
    setCategory(item.category);
    setAuthor(item.author);
    setDesignation(item.designation);
    setInstitution(item.institution);
    setQuote(item.quote);
    setStats(item.stats || '');
    setAvatar(item.avatar || PRESET_AVATARS[0]);
    setActive(item.active !== false);
    setIsModalOpen(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !quote.trim()) return;

    if (editingItem) {
      updateTestimonial(editingItem.id, {
        category,
        author: author.trim(),
        designation: designation.trim(),
        institution: institution.trim(),
        quote: quote.trim(),
        stats: stats.trim(),
        avatar,
        active,
      });
    } else {
      addTestimonial({
        category,
        author: author.trim(),
        designation: designation.trim(),
        institution: institution.trim(),
        quote: quote.trim(),
        stats: stats.trim(),
        avatar,
        active,
        order: sortedTestimonials.length + 1,
      });
    }

    setIsModalOpen(false);
    setEditingItem(null);
  };

  const moveOrder = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sortedTestimonials.length) return;

    const currentItem = sortedTestimonials[index];
    const targetItem = sortedTestimonials[targetIndex];

    updateTestimonial(currentItem.id, { order: targetItem.order || targetIndex + 1 });
    updateTestimonial(targetItem.id, { order: currentItem.order || index + 1 });
  };

  return (
    <div className="space-y-6">
      {/* ── Top Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-black/8 shadow-2xs">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-mono font-bold mb-2">
            <Quote size={12} />
            <span>PARTNER TESTIMONIALS</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 font-[family-name:var(--font-display)] tracking-tight">
            Institutional Testimonials Manager
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage feedback quotes from College Deans &amp; TPOs, Placed Students, and Corporate Recruiters.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="btn-pill-primary px-5 py-2.5 text-xs font-bold flex items-center gap-2 cursor-pointer self-start sm:self-center shadow-xs"
        >
          <Plus size={14} />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* ── Category Filters ── */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        <button
          onClick={() => setActiveFilter('ALL')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer border whitespace-nowrap ${
            activeFilter === 'ALL'
              ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
              : 'bg-white text-slate-700 border-black/8 hover:bg-slate-50'
          }`}
        >
          All Testimonials ({testimonials.length})
        </button>
        {CATEGORIES.map((cat) => {
          const count = testimonials.filter((t) => t.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer border whitespace-nowrap ${
                activeFilter === cat
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-white text-slate-700 border-black/8 hover:bg-slate-50'
              }`}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* ── Testimonials Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredTestimonials.map((item, index) => {
            const isInactive = item.active === false;
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`bg-white rounded-3xl border border-black/8 p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between ${
                  isInactive ? 'opacity-60 bg-slate-50/80 border-dashed' : ''
                }`}
              >
                <div className="space-y-4">
                  {/* Card Header Top */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#2563EB] text-xs font-mono font-bold border border-blue-200">
                      <span>{item.category}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => toggleTestimonialActive(item.id)}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          isInactive
                            ? 'text-slate-400 hover:text-slate-700 bg-slate-100'
                            : 'text-emerald-600 hover:bg-emerald-50'
                        }`}
                        title={isInactive ? 'Hidden from website (Click to activate)' : 'Visible on website (Click to hide)'}
                      >
                        {isInactive ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>

                      <button
                        disabled={index === 0}
                        onClick={() => moveOrder(index, 'up')}
                        className="p-1.5 text-slate-400 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                        title="Move Up"
                      >
                        <ArrowUp size={14} />
                      </button>
                      <button
                        disabled={index === sortedTestimonials.length - 1}
                        onClick={() => moveOrder(index, 'down')}
                        className="p-1.5 text-slate-400 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                        title="Move Down"
                      >
                        <ArrowDown size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Quote Body */}
                  <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed font-serif">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                {/* Author Info & Actions */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    {item.avatar && (
                      <img
                        src={item.avatar}
                        alt={item.author}
                        className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0"
                      />
                    )}
                    <div>
                      <div className="text-xs font-bold text-slate-900">{item.author}</div>
                      <div className="text-[10.5px] text-slate-500">{item.designation}</div>
                      <div className="text-[10px] font-mono text-[#2563EB] font-bold">{item.institution}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.stats && (
                      <span className="px-2 py-0.5 rounded-md bg-blue-50 text-[#2563EB] text-[9.5px] font-mono font-bold border border-blue-200/80">
                        {item.stats}
                      </span>
                    )}

                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="p-1.5 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-[#2563EB] transition-colors cursor-pointer"
                      title="Edit Testimonial"
                    >
                      <Edit2 size={13} />
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Delete testimonial by "${item.author}"?`)) {
                          deleteTestimonial(item.id);
                        }
                      }}
                      className="p-1.5 rounded-xl hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                      title="Delete Testimonial"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filteredTestimonials.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border border-black/8 p-8">
          <Quote size={36} className="mx-auto text-slate-400 mb-2" />
          <h3 className="text-lg font-bold text-slate-900">No testimonials found</h3>
          <p className="text-xs text-slate-500 mt-1">Add a new testimonial using the button above.</p>
        </div>
      )}

      {/* ── Add / Edit Modal ── */}
      <AnimatePresence>
        {isModalOpen && (
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
                    <Quote size={16} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {editingItem ? 'Edit Testimonial' : 'Add New Testimonial'}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Institutional quote, speaker profile, and measurable stats.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSave} autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck={false} className="space-y-4">
                {/* Category & Status */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 font-mono">
                      Category *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#2563EB] bg-white font-medium"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 font-mono">
                      Impact Stat Badge (Optional)
                    </label>
                    <input
                      type="text"
                      autoComplete="new-password"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck={false}
                      placeholder=""
                      value={stats}
                      onChange={(e) => setStats(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>
                </div>

                {/* Author Name & Designation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 font-mono">
                      Author / Speaker Name *
                    </label>
                    <input
                      type="text"
                      required
                      autoComplete="new-password"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck={false}
                      placeholder="Enter author name"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 font-mono">
                      Designation / Role *
                    </label>
                    <input
                      type="text"
                      required
                      autoComplete="new-password"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck={false}
                      placeholder="Enter designation / role"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>
                </div>

                {/* Institution / Organization */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 font-mono">
                    College / Institution / Company *
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="new-password"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    placeholder="Enter institution / organization"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#2563EB]"
                  />
                </div>

                {/* Testimonial Quote */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 font-mono">
                    Feedback Quote *
                  </label>
                  <textarea
                    required
                    rows={4}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    placeholder="Enter testimonial quote"
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#2563EB] leading-relaxed font-serif"
                  />
                </div>

                {/* Author Photo */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 font-mono block">
                    Author Photo / Avatar
                  </label>

                  <div className="flex items-center gap-3">
                    <img
                      src={avatar}
                      alt="Avatar Preview"
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#2563EB]/40 shadow-xs shrink-0"
                    />

                    <div className="flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1.5 cursor-pointer"
                        >
                          <Upload size={13} />
                          <span>Upload From Device</span>
                        </button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileUpload}
                        />
                      </div>

                      {/* Preset Avatars */}
                      <div className="flex items-center gap-2 overflow-x-auto py-1">
                        {PRESET_AVATARS.map((p, idx) => (
                          <img
                            key={idx}
                            src={p}
                            alt={`Preset ${idx + 1}`}
                            onClick={() => setAvatar(p)}
                            className={`w-7 h-7 rounded-full object-cover cursor-pointer border-2 transition-transform hover:scale-110 ${
                              avatar === p ? 'border-[#2563EB] scale-110 ring-2 ring-blue-200' : 'border-transparent opacity-70 hover:opacity-100'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Active Checkbox */}
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="testActive"
                    checked={active}
                    onChange={(e) => setActive(e.target.checked)}
                    className="rounded text-[#2563EB] focus:ring-[#2563EB] cursor-pointer"
                  />
                  <label htmlFor="testActive" className="text-xs font-semibold text-slate-700 cursor-pointer">
                    Display actively on public website
                  </label>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-pill-primary px-6 py-2 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <CheckCircle2 size={14} />
                    <span>{editingItem ? 'Save Changes' : 'Add Testimonial'}</span>
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
