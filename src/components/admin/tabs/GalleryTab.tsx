import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Image as ImageIcon,
  Plus,
  Edit3,
  Trash2,
  MapPin,
  Sparkles,
  Upload,
  X,
  AlertTriangle,
  Eye
} from 'lucide-react';
import { useAdminData, type GalleryMoment } from '../../../context/AdminDataContext';

const PRESET_COLORS = [
  { label: 'Blue', color: '#2563EB' },
  { label: 'Cyan', color: '#0668E1' },
  { label: 'Emerald', color: '#10B981' },
  { label: 'Pink', color: '#EC4899' },
  { label: 'Purple', color: '#8B5CF6' },
  { label: 'Amber', color: '#D97706' },
];

export function GalleryTab() {
  const { galleryItems, addGalleryItem, updateGalleryItem, deleteGalleryItem } = useAdminData();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryMoment | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [previewImageModal, setPreviewImageModal] = useState<string | null>(null);

  // Form Fields
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('Capstone Presentation');
  const [formCategoryColor, setFormCategoryColor] = useState('#2563EB');
  const [formDescription, setFormDescription] = useState('');
  const [formStats, setFormStats] = useState('100% Placement Aligned');
  const [formLocation, setFormLocation] = useState('Campus Innovation Hub');
  const [formImage, setFormImage] = useState('/moments/moment_bi_dashboard_presentation.jpg');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setFormTitle('');
    setFormCategory('Capstone Presentation');
    setFormCategoryColor('#2563EB');
    setFormDescription('');
    setFormStats('100% Placement Aligned');
    setFormLocation('Campus Innovation Hub');
    setFormImage('/moments/moment_bi_dashboard_presentation.jpg');
  };

  const handleOpenAdd = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (item: GalleryMoment) => {
    setEditingItem(item);
    setFormTitle(item.title);
    setFormCategory(item.category);
    setFormCategoryColor(item.categoryColor || '#2563EB');
    setFormDescription(item.description);
    setFormStats(item.stats);
    setFormLocation(item.location);
    setFormImage(item.image);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setFormImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formImage.trim()) return;

    addGalleryItem({
      title: formTitle.trim(),
      category: formCategory.trim(),
      categoryColor: formCategoryColor,
      description: formDescription.trim(),
      stats: formStats.trim(),
      location: formLocation.trim(),
      image: formImage.trim(),
    });

    setIsAddModalOpen(false);
    resetForm();
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !formTitle.trim() || !formImage.trim()) return;

    updateGalleryItem(editingItem.id, {
      title: formTitle.trim(),
      category: formCategory.trim(),
      categoryColor: formCategoryColor,
      description: formDescription.trim(),
      stats: formStats.trim(),
      location: formLocation.trim(),
      image: formImage.trim(),
    });

    setEditingItem(null);
    resetForm();
  };

  const handleConfirmDelete = () => {
    if (deletingId) {
      deleteGalleryItem(deletingId);
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* ─── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-[family-name:var(--font-display)]">
              Manage Campus Moments &amp; Gallery
            </h1>
            <span className="text-xs font-mono font-bold bg-purple-50 text-purple-700 px-2.5 py-0.5 rounded-full">
              {galleryItems.length} Moments
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Upload and configure high-resolution event photographs, workshop highlights, and student placement milestone showcases.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-md shadow-purple-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02] shrink-0"
        >
          <Plus size={16} />
          <span>Add Gallery Moment</span>
        </button>
      </div>

      {/* ─── Gallery Grid ──────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {galleryItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            {/* Image Preview Container */}
            <div className="relative aspect-video bg-slate-100 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              {/* Category Pill */}
              <div className="absolute top-3 left-3">
                <span
                  style={{ backgroundColor: item.categoryColor || '#2563EB' }}
                  className="text-[10px] font-bold text-white px-2.5 py-1 rounded-full shadow-md shadow-black/40"
                >
                  {item.category}
                </span>
              </div>

              {/* Quick Preview Fullscreen Button */}
              <button
                onClick={() => setPreviewImageModal(item.image)}
                title="Preview full size"
                className="absolute top-3 right-3 p-1.5 bg-black/60 hover:bg-black text-white rounded-lg backdrop-blur-xs transition-colors cursor-pointer"
              >
                <Eye size={14} />
              </button>

              {/* Location Badge */}
              <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[11px] text-white/90 font-medium">
                <MapPin size={12} className="text-amber-400 shrink-0" />
                <span className="truncate max-w-[200px]">{item.location}</span>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 leading-snug mb-1.5 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                  {item.description}
                </p>

                <div className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
                  <Sparkles size={10} />
                  <span>{item.stats}</span>
                </div>
              </div>

              {/* Card Actions */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400 uppercase">
                  Live in Carousel
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-1.5 text-slate-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors cursor-pointer"
                    title="Edit Moment"
                  >
                    <Edit3 size={15} />
                  </button>
                  <button
                    onClick={() => setDeletingId(item.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="Delete Moment"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ─── Modal: Add / Edit Gallery Moment ──────────────────────────────── */}
      <AnimatePresence>
        {(isAddModalOpen || editingItem !== null) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsAddModalOpen(false);
                setEditingItem(null);
              }}
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
                  <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                    <ImageIcon size={18} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">
                      {editingItem ? 'Edit Gallery Moment' : 'Add New Gallery Moment'}
                    </h2>
                    <p className="text-xs text-slate-500">
                      Upload image and enter descriptive metadata
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingItem(null);
                  }}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={editingItem ? handleSaveEdit : handleSaveAdd} className="space-y-4">
                {/* Image Selection & Preview */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Moment Photograph (URL or File Upload) *
                  </label>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={formImage}
                      onChange={(e) => setFormImage(e.target.value)}
                      placeholder="e.g. /moments/campus_moment_1.jpg or https://..."
                      className="w-full bg-slate-50 border border-slate-200 focus:border-purple-500 focus:bg-white rounded-xl py-2 px-3 text-xs outline-hidden font-mono"
                      required
                    />

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
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer"
                      >
                        <Upload size={14} />
                        <span>Upload local image file</span>
                      </button>
                      <span className="text-[11px] text-slate-400">
                        Supports PNG, JPG, WebP
                      </span>
                    </div>

                    {/* Thumbnail preview */}
                    {formImage && (
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 border border-slate-200 mt-2 max-h-36">
                        <img
                          src={formImage}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Headline Title *
                  </label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. Pharmaceutical Analytics & BI Dashboard Capstone"
                    required
                    className="w-full bg-slate-50 border border-slate-200 focus:border-purple-500 focus:bg-white rounded-xl py-2 px-3 text-xs outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Category Tag
                    </label>
                    <input
                      type="text"
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      placeholder="e.g. Capstone Presentation"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-purple-500 focus:bg-white rounded-xl py-2 px-3 text-xs outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Accent Color
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {PRESET_COLORS.map((pc) => (
                          <button
                            key={pc.color}
                            type="button"
                            onClick={() => setFormCategoryColor(pc.color)}
                            style={{ backgroundColor: pc.color }}
                            className={`w-6 h-6 rounded-full cursor-pointer transition-transform ${
                              formCategoryColor === pc.color ? 'scale-125 ring-2 ring-slate-900 ring-offset-2' : ''
                            }`}
                          />
                        ))}
                      </div>
                      <input
                        type="color"
                        value={formCategoryColor}
                        onChange={(e) => setFormCategoryColor(e.target.value)}
                        className="w-8 h-8 rounded-lg cursor-pointer border border-slate-300 p-0.5"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Location / Campus
                    </label>
                    <input
                      type="text"
                      value={formLocation}
                      onChange={(e) => setFormLocation(e.target.value)}
                      placeholder="e.g. Parul University Campus"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-purple-500 focus:bg-white rounded-xl py-2 px-3 text-xs outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Outcome / Stat Highlight
                    </label>
                    <input
                      type="text"
                      value={formStats}
                      onChange={(e) => setFormStats(e.target.value)}
                      placeholder="e.g. 100% Placement Aligned"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-purple-500 focus:bg-white rounded-xl py-2 px-3 text-xs outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Description &amp; Highlights
                  </label>
                  <textarea
                    rows={3}
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Provide context regarding the workshop, cohort achievements, and deliverables..."
                    className="w-full bg-slate-50 border border-slate-200 focus:border-purple-500 focus:bg-white rounded-xl py-2 px-3 text-xs outline-hidden"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddModalOpen(false);
                      setEditingItem(null);
                    }}
                    className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-md shadow-purple-600/30 cursor-pointer"
                  >
                    {editingItem ? 'Save Changes' : 'Publish to Gallery'}
                  </button>
                </div>
              </form>
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
                <AlertTriangle size={24} />
              </div>
              <h3 className="text-lg font-bold mb-1">Delete this gallery moment?</h3>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                This item will be removed from the rolling campus moments gallery on the homepage.
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
                  Yes, Remove
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── Image Fullscreen Preview Modal ──────────────────────────────────── */}
      <AnimatePresence>
        {previewImageModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setPreviewImageModal(null)}
          >
            <div className="relative max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={previewImageModal}
                alt="Full Preview"
                className="w-full h-full object-contain max-h-[85vh]"
              />
              <button
                onClick={() => setPreviewImageModal(null)}
                className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black text-white rounded-full cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
