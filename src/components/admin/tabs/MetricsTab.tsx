import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  Plus,
  Edit2,
  Trash2,
  X,
  ArrowUp,
  ArrowDown,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useAdminData, type MetricItem } from '../../../context/AdminDataContext';

export function MetricsTab() {
  const { metricsData, updateMetric, addMetric, deleteMetric } = useAdminData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MetricItem | null>(null);

  // Form State
  const [value, setValue] = useState<number>(0);
  const [prefix, setPrefix] = useState<string>('');
  const [suffix, setSuffix] = useState<string>('');
  const [label, setLabel] = useState<string>('');
  const [sub, setSub] = useState<string>('');

  const sortedMetrics = [...metricsData].sort((a, b) => (a.order || 0) - (b.order || 0));

  const handleOpenAdd = () => {
    setEditingItem(null);
    setValue(0);
    setPrefix('');
    setSuffix('');
    setLabel('');
    setSub('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: MetricItem) => {
    setEditingItem(item);
    setValue(item.value);
    setPrefix(item.prefix || '');
    setSuffix(item.suffix || '');
    setLabel(item.label);
    setSub(item.sub);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!label.trim()) return;

    if (editingItem) {
      updateMetric(editingItem.id, {
        value: Number(value) || 0,
        prefix: prefix.trim(),
        suffix: suffix.trim(),
        label: label.trim(),
        sub: sub.trim(),
      });
    } else {
      addMetric({
        value: Number(value) || 0,
        prefix: prefix.trim(),
        suffix: suffix.trim(),
        label: label.trim(),
        sub: sub.trim(),
        order: sortedMetrics.length + 1,
      });
    }

    setIsModalOpen(false);
    setEditingItem(null);
  };

  const moveOrder = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sortedMetrics.length) return;

    const currentItem = sortedMetrics[index];
    const targetItem = sortedMetrics[targetIndex];

    updateMetric(currentItem.id, { order: targetItem.order || targetIndex + 1 });
    updateMetric(targetItem.id, { order: currentItem.order || index + 1 });
  };

  return (
    <div className="space-y-6">
      {/* ── Top Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-black/8 shadow-2xs">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-mono font-bold mb-2">
            <TrendingUp size={12} />
            <span>HOMEPAGE TRACK RECORD</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 font-[family-name:var(--font-display)] tracking-tight">
            Verified Track Record Manager
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage the numerical impact statistics, partner metrics, and placement benchmarks displayed on the landing page.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="btn-pill-primary px-5 py-2.5 text-xs font-bold flex items-center gap-2 cursor-pointer self-start sm:self-center shadow-xs"
        >
          <Plus size={14} />
          <span>Add New Metric</span>
        </button>
      </div>

      {/* ── Live Preview Grid ── */}
      <div className="bg-slate-900 rounded-3xl p-6 text-white border border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
            <Sparkles size={14} />
            <span>Live Section Preview</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            {metricsData.length} Live Badges
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {sortedMetrics.map((m) => (
            <div
              key={m.id}
              className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700 text-center space-y-1"
            >
              <div className="text-2xl font-extrabold font-mono text-white">
                {m.prefix}
                {m.value}
                {m.suffix}
              </div>
              <div className="text-xs font-bold text-slate-200 truncate">
                {m.label}
              </div>
              <div className="text-[10px] text-slate-400 truncate">
                {m.sub}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── List & Editor Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {sortedMetrics.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl border border-black/8 p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                {/* Header Badge */}
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-[#2563EB] text-[11px] font-mono font-bold">
                    <span>Card #{index + 1}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      disabled={index === 0}
                      onClick={() => moveOrder(index, 'up')}
                      className="p-1.5 text-slate-400 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      title="Move Left / Up"
                    >
                      <ArrowUp size={14} />
                    </button>
                    <button
                      disabled={index === sortedMetrics.length - 1}
                      onClick={() => moveOrder(index, 'down')}
                      className="p-1.5 text-slate-400 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      title="Move Right / Down"
                    >
                      <ArrowDown size={14} />
                    </button>
                  </div>
                </div>

                {/* Display Value & Label */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center space-y-1">
                  <div className="text-3xl font-extrabold font-mono text-slate-900">
                    {item.prefix}
                    <span className="text-[#2563EB]">{item.value}</span>
                    {item.suffix}
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 font-[family-name:var(--font-display)]">
                    {item.label}
                  </h4>
                  <p className="text-xs text-slate-500 font-mono">
                    {item.sub}
                  </p>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-[#2563EB] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Edit2 size={12} />
                  <span>Edit Metric</span>
                </button>

                {sortedMetrics.length > 1 && (
                  <button
                    onClick={() => {
                      if (confirm(`Delete metric "${item.label}"?`)) {
                        deleteMetric(item.id);
                      }
                    }}
                    className="p-1.5 rounded-xl hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                    title="Delete Metric"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ── Add / Edit Modal ── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-black/10 shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold">
                    <TrendingUp size={16} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {editingItem ? 'Edit Track Metric' : 'Add New Track Metric'}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Configure numerical value, prefix, suffix, and title labels.
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

              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {/* Prefix */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 font-mono">
                      Prefix (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. ₹ or $"
                      value={prefix}
                      onChange={(e) => setPrefix(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>

                  {/* Numerical Value */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 font-mono">
                      Number Value *
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="25"
                      value={value}
                      onChange={(e) => setValue(Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs font-mono font-bold rounded-xl border border-slate-200 focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>

                  {/* Suffix */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 font-mono">
                      Suffix
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. +, K+, .2 LPA"
                      value={suffix}
                      onChange={(e) => setSuffix(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>
                </div>

                {/* Main Label */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 font-mono">
                    Main Metric Label *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Partner Campuses, Students Trained, Avg Package"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#2563EB]"
                  />
                </div>

                {/* Sub Description */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 font-mono">
                    Sub-Label / Category
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Institutional Pilots, Assessed & Upskilled, Campus Hires"
                    value={sub}
                    onChange={(e) => setSub(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#2563EB]"
                  />
                </div>

                {/* Modal Live Preview */}
                <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-200/80 text-center space-y-0.5">
                  <span className="text-[10px] font-mono text-blue-600 font-bold uppercase tracking-wider block">
                    Card Preview
                  </span>
                  <div className="text-2xl font-black font-mono text-slate-900">
                    {prefix}{value}{suffix}
                  </div>
                  <div className="text-xs font-bold text-slate-800">
                    {label || 'Metric Label'}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    {sub || 'Sub-label'}
                  </div>
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
                    <span>{editingItem ? 'Save Changes' : 'Add Metric'}</span>
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
