import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Plus,
  Edit2,
  Trash2,
  X,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Zap,
  Gauge
} from 'lucide-react';
import { useAdminData, type AnnouncementItem } from '../../../context/AdminDataContext';

export function AnnouncementsTab() {
  const {
    announcements,
    tickerSpeed,
    setTickerSpeed,
    addAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    toggleAnnouncementActive,
  } = useAdminData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AnnouncementItem | null>(null);

  // Form State
  const [text, setText] = useState('');
  const [highlight, setHighlight] = useState('');
  const [action, setAction] = useState<AnnouncementItem['action']>('call');
  const [linkUrl, setLinkUrl] = useState('');
  const [active, setActive] = useState(true);

  const sortedAnnouncements = [...announcements].sort((a, b) => (a.order || 0) - (b.order || 0));

  const handleOpenAdd = () => {
    setEditingItem(null);
    setText('');
    setHighlight('');
    setAction('programs');
    setLinkUrl('');
    setActive(true);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: AnnouncementItem) => {
    setEditingItem(item);
    setText(item.text);
    setHighlight(item.highlight);
    setAction(item.action);
    setLinkUrl(item.linkUrl || '');
    setActive(item.active);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    if (editingItem) {
      updateAnnouncement(editingItem.id, {
        text: text.trim(),
        highlight: highlight.trim(),
        action,
        linkUrl: linkUrl.trim(),
        active,
      });
    } else {
      addAnnouncement({
        text: text.trim(),
        highlight: highlight.trim(),
        action,
        linkUrl: linkUrl.trim(),
        active,
        order: announcements.length + 1,
      });
    }

    setIsModalOpen(false);
    setEditingItem(null);
  };

  const moveOrder = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sortedAnnouncements.length) return;

    const currentItem = sortedAnnouncements[index];
    const targetItem = sortedAnnouncements[targetIndex];

    updateAnnouncement(currentItem.id, { order: targetItem.order || targetIndex + 1 });
    updateAnnouncement(targetItem.id, { order: currentItem.order || index + 1 });
  };

  return (
    <div className="space-y-6">
      {/* ── Top Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-black/8 shadow-2xs">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-mono font-bold mb-2">
            <Sparkles size={12} />
            <span>TOP MARQUEE TICKER</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 font-[family-name:var(--font-display)] tracking-tight">
            Top Announcement Bar Manager
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage the continuous rolling announcements, course updates, and promotional ticker on the website header.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="btn-pill-primary px-5 py-2.5 text-xs font-bold flex items-center gap-2 cursor-pointer self-start sm:self-center shadow-xs"
        >
          <Plus size={14} />
          <span>Add Announcement</span>
        </button>
      </div>

      {/* ── Live Preview Card ── */}
      <div className="bg-slate-900 rounded-3xl p-5 sm:p-6 text-white border border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
            <Sparkles size={14} />
            <span>Live Header Ticker Preview</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            {announcements.filter((a) => a.active).length} Active Tickers
          </span>
        </div>

        <div className="bg-[#0B1120] rounded-2xl p-3.5 border border-white/10 overflow-hidden relative">
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar whitespace-nowrap">
            {sortedAnnouncements
              .filter((a) => a.active)
              .map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-200 shrink-0">
                  <span>{item.text}</span>
                  {item.highlight && (
                    <span className="px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 text-[10px] font-bold font-mono">
                      {item.highlight} →
                    </span>
                  )}
                </div>
              ))}
            {sortedAnnouncements.filter((a) => a.active).length === 0 && (
              <span className="text-xs text-slate-500 italic">No active announcements.</span>
            )}
          </div>
        </div>
      </div>

      {/* ── Dynamic Ticker Speed Controller ── */}
      <div className="bg-white rounded-3xl border border-black/8 p-6 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm font-[family-name:var(--font-display)]">
              <Gauge size={16} className="text-[#2563EB]" />
              <span>Marquee Rolling Speed &amp; Dynamic Flow</span>
            </div>
            <p className="text-xs text-slate-500">
              Auto-adapts dynamically based on the number of active announcements (fewer items = brisk, more items = balanced).
            </p>
          </div>

          {/* Speed Preset Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-black/5">
            <button
              onClick={() => setTickerSpeed('fast')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                tickerSpeed === 'fast'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Zap size={13} />
              <span>Fast (Dynamic)</span>
            </button>

            <button
              onClick={() => setTickerSpeed('normal')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                tickerSpeed === 'normal'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <span>Normal</span>
            </button>

            <button
              onClick={() => setTickerSpeed('slow')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                tickerSpeed === 'slow'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <span>Gentle / Slow</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── List of Announcements ── */}
      <div className="bg-white rounded-3xl border border-black/8 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-900 font-[family-name:var(--font-display)]">
            All Announcement Items ({announcements.length})
          </h3>
          <span className="text-xs text-slate-500 font-mono">
            Drag/reorder priority
          </span>
        </div>

        <div className="space-y-3">
          {sortedAnnouncements.map((item, index) => (
            <div
              key={item.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                item.active
                  ? 'bg-white border-black/8 hover:border-blue-200 shadow-2xs'
                  : 'bg-slate-50 border-dashed border-slate-300 opacity-60'
              }`}
            >
              {/* Left: Order Badge + Text + Highlight + Action */}
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-7 h-7 rounded-xl bg-slate-100 text-slate-700 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-xs sm:text-sm font-semibold text-slate-900 break-words">
                      {item.text}
                    </p>
                    {item.highlight && (
                      <span className="px-2 py-0.5 rounded-full bg-blue-50 text-[#2563EB] border border-blue-200 text-[10px] font-bold font-mono shrink-0">
                        {item.highlight}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-500">
                    <span className="font-mono">
                      Action:{' '}
                      <strong className="text-slate-700">
                        {item.action === 'call' && '📞 Open 1:1 Career Call Modal'}
                        {item.action === 'programs' && '🎓 Navigate to Programs Page'}
                        {item.action === 'roadmap' && '🗺️ Navigate to 7-Stage Roadmap'}
                        {item.action === 'mentor' && '💼 Navigate to Mentor Page'}
                        {item.action === 'none' && 'None'}
                      </strong>
                    </span>
                    {item.linkUrl && (
                      <span className="font-mono text-blue-600 truncate max-w-xs">
                        🔗 {item.linkUrl}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right: Actions (Toggle, Reorder, Edit, Delete) */}
              <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                {/* Reorder Buttons */}
                <button
                  onClick={() => moveOrder(index, 'up')}
                  disabled={index === 0}
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                  title="Move Up"
                >
                  <ArrowUp size={13} />
                </button>
                <button
                  onClick={() => moveOrder(index, 'down')}
                  disabled={index === sortedAnnouncements.length - 1}
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                  title="Move Down"
                >
                  <ArrowDown size={13} />
                </button>

                {/* Toggle Active Button */}
                <button
                  onClick={() => toggleAnnouncementActive(item.id)}
                  className={`p-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 cursor-pointer ${
                    item.active
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                      : 'border-slate-200 bg-slate-100 text-slate-500'
                  }`}
                  title={item.active ? 'Disable Ticker' : 'Enable Ticker'}
                >
                  {item.active ? <Eye size={13} /> : <EyeOff size={13} />}
                  <span className="text-[10px] hidden sm:inline">{item.active ? 'Active' : 'Hidden'}</span>
                </button>

                {/* Edit Button */}
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-600 cursor-pointer"
                  title="Edit Item"
                >
                  <Edit2 size={13} />
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => deleteAnnouncement(item.id)}
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-red-50 hover:text-red-600 cursor-pointer"
                  title="Delete Item"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}

          {announcements.length === 0 && (
            <div className="text-center py-12 text-slate-500 text-xs">
              No announcements created yet. Click <strong>+ Add Announcement</strong> to create one.
            </div>
          )}
        </div>
      </div>

      {/* ── Add / Edit Announcement Modal ── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-black/10 p-6 sm:p-8 z-10 my-8 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-black/6 pb-3">
                <h3 className="text-lg font-extrabold text-slate-900 font-[family-name:var(--font-display)]">
                  {editingItem ? 'Edit Top Announcement' : 'Add Top Announcement'}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Announcement Headline / Text *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ✨ Free 1:1 Career Diagnostic & Senior Mentorship Session"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 text-xs focus:border-[#2563EB] focus:outline-hidden font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Highlight Tag / CTA Text
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Book Free Call or Explore Tracks"
                      value={highlight}
                      onChange={(e) => setHighlight(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-black/10 text-xs focus:border-[#2563EB] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Click Action Target
                    </label>
                    <select
                      value={action}
                      onChange={(e) => setAction(e.target.value as any)}
                      className="w-full px-3.5 py-2 rounded-xl border border-black/10 text-xs focus:border-[#2563EB] focus:outline-hidden bg-white"
                    >
                      <option value="call">📞 Open 1:1 Career Call Modal</option>
                      <option value="programs">🎓 Open Programs Page (#training-programs)</option>
                      <option value="roadmap">🗺️ Open 7-Stage Roadmap (#roadmap)</option>
                      <option value="mentor">💼 Open Mentor Page (#mentor)</option>
                      <option value="none">None / Custom Link</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Custom External URL (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. https://... or leave empty"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-black/10 text-xs focus:border-[#2563EB] focus:outline-hidden font-mono"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="activeToggle"
                    checked={active}
                    onChange={(e) => setActive(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600"
                  />
                  <label htmlFor="activeToggle" className="text-xs font-semibold text-slate-700 cursor-pointer">
                    Enable and display in top rolling header ticker
                  </label>
                </div>

                <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-black/6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-black/10 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-pill-primary px-5 py-2 text-xs font-bold cursor-pointer"
                  >
                    {editingItem ? 'Save Changes' : 'Add Announcement'}
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
