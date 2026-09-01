import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Plus,
  Edit3,
  Trash2,
  Clock,
  User,
  Upload,
  X,
  AlertTriangle,
  ExternalLink,
  Search
} from 'lucide-react';
import { useAdminData, type BlogPost } from '../../../context/AdminDataContext';

export function BlogsTab() {
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost } = useAdminData();

  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Form Fields
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('Placement Strategy');
  const [formReadTime, setFormReadTime] = useState('5 min read');
  const [formDate, setFormDate] = useState(() =>
    new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  );
  const [formAuthor, setFormAuthor] = useState('Grow360 Academic Council');
  const [formSummary, setFormSummary] = useState('');
  const [formImage, setFormImage] = useState('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80');
  const [formContent, setFormContent] = useState('');
  const [formTags, setFormTags] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setFormTitle('');
    setFormCategory('Placement Strategy');
    setFormReadTime('5 min read');
    setFormDate(new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }));
    setFormAuthor('Grow360 Academic Council');
    setFormSummary('');
    setFormImage('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80');
    setFormContent('');
    setFormTags('');
  };

  const handleOpenAdd = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormTitle(post.title);
    setFormCategory(post.category);
    setFormReadTime(post.readTime);
    setFormDate(post.date);
    setFormAuthor(post.author);
    setFormSummary(post.summary);
    setFormImage(post.image);
    setFormContent(post.content.join('\n\n'));
    setFormTags((post.tags || []).join(', '));
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
    if (!formTitle.trim() || !formSummary.trim()) return;

    const contentParagraphs = formContent
      .split('\n\n')
      .map((p) => p.trim())
      .filter(Boolean);

    const tagsArray = formTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    addBlogPost({
      title: formTitle.trim(),
      category: formCategory.trim(),
      readTime: formReadTime.trim(),
      date: formDate.trim(),
      author: formAuthor.trim(),
      summary: formSummary.trim(),
      image: formImage.trim(),
      content: contentParagraphs.length > 0 ? contentParagraphs : [formSummary.trim()],
      tags: tagsArray.length > 0 ? tagsArray : ['Placement Strategy', 'Industry 4.0'],
    });

    setIsAddModalOpen(false);
    resetForm();
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost || !formTitle.trim()) return;

    const contentParagraphs = formContent
      .split('\n\n')
      .map((p) => p.trim())
      .filter(Boolean);

    const tagsArray = formTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    updateBlogPost(editingPost.id, {
      title: formTitle.trim(),
      category: formCategory.trim(),
      readTime: formReadTime.trim(),
      date: formDate.trim(),
      author: formAuthor.trim(),
      summary: formSummary.trim(),
      image: formImage.trim(),
      content: contentParagraphs,
      tags: tagsArray,
    });

    setEditingPost(null);
    resetForm();
  };

  const handleConfirmDelete = () => {
    if (deletingId) {
      deleteBlogPost(deletingId);
      setDeletingId(null);
    }
  };

  const filteredPosts = blogPosts.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.author.toLowerCase().includes(q) ||
      p.summary.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* ─── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-[family-name:var(--font-display)]">
              Manage Articles &amp; Blogs
            </h1>
            <span className="text-xs font-mono font-bold bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full">
              {blogPosts.length} Published
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Author and publish institutional placement strategies, technical interview guides, and industry reports.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02] shrink-0"
        >
          <Plus size={16} />
          <span>Write New Article</span>
        </button>
      </div>

      {/* ─── Search Bar ─────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles by title, category, or author..."
            className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white rounded-xl py-2 pl-10 pr-4 text-xs text-slate-800 placeholder-slate-400 outline-hidden"
          />
        </div>

        <a
          href="#blog"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1.5 cursor-pointer"
        >
          <span>View Public Blog Page</span>
          <ExternalLink size={13} />
        </a>
      </div>

      {/* ─── Blog Articles Grid ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            {/* Featured Image */}
            <div className="relative aspect-video bg-slate-100 overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <div className="absolute top-3 left-3">
                <span className="text-[10px] font-bold bg-indigo-600 text-white px-2.5 py-1 rounded-full shadow-md">
                  {post.category}
                </span>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-2 font-mono">
                  <span>{post.date}</span>
                  <span>&bull;</span>
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug mb-2 line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-3">
                  {post.summary}
                </p>

                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-3">
                  <User size={12} className="text-indigo-500 shrink-0" />
                  <span className="truncate">{post.author}</span>
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {post.tags.slice(0, 3).map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[9px] font-mono bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-sm"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Actions */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400">
                  {post.content.length} {post.content.length === 1 ? 'paragraph' : 'paragraphs'}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(post)}
                    className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                    title="Edit Article"
                  >
                    <Edit3 size={15} />
                  </button>
                  <button
                    onClick={() => setDeletingId(post.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="Delete Article"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ─── Modal: Add / Edit Blog Article ─────────────────────────────────── */}
      <AnimatePresence>
        {(isAddModalOpen || editingPost !== null) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsAddModalOpen(false);
                setEditingPost(null);
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
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <BookOpen size={18} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">
                      {editingPost ? 'Edit Blog Article' : 'Write New Article'}
                    </h2>
                    <p className="text-xs text-slate-500">
                      Draft rich educational &amp; industry content for the Grow360 publication
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingPost(null);
                  }}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={editingPost ? handleSaveEdit : handleSaveAdd} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. How Forward-Thinking Colleges Are Transforming Campus Placements in 2026"
                    required
                    className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white rounded-xl py-2 px-3 text-xs sm:text-sm outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Category
                    </label>
                    <input
                      type="text"
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      placeholder="e.g. Placement Strategy"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white rounded-xl py-2 px-3 text-xs outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Read Time
                    </label>
                    <input
                      type="text"
                      value={formReadTime}
                      onChange={(e) => setFormReadTime(e.target.value)}
                      placeholder="e.g. 5 min read"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white rounded-xl py-2 px-3 text-xs outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Author Name / Byline
                    </label>
                    <input
                      type="text"
                      value={formAuthor}
                      onChange={(e) => setFormAuthor(e.target.value)}
                      placeholder="e.g. Grow360 Academic Council"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white rounded-xl py-2 px-3 text-xs outline-hidden"
                    />
                  </div>
                </div>

                {/* Featured Image */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Featured Image URL or Upload *
                  </label>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={formImage}
                      onChange={(e) => setFormImage(e.target.value)}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white rounded-xl py-2 px-3 text-xs outline-hidden font-mono"
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
                        <span>Upload local image</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Executive Summary Snippet *
                  </label>
                  <textarea
                    rows={2}
                    value={formSummary}
                    onChange={(e) => setFormSummary(e.target.value)}
                    placeholder="Short 2-3 sentence overview that appears on preview cards..."
                    required
                    className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white rounded-xl py-2 px-3 text-xs outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Article Full Content (Separate paragraphs with double enter / empty line)
                  </label>
                  <textarea
                    rows={6}
                    value={formContent}
                    onChange={(e) => setFormContent(e.target.value)}
                    placeholder="First paragraph...&#10;&#10;Second paragraph with analysis and observations...&#10;&#10;Conclusion and key actionable takeaways..."
                    className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white rounded-xl py-2 px-3 text-xs outline-hidden leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Article Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formTags}
                    onChange={(e) => setFormTags(e.target.value)}
                    placeholder="e.g. Higher Ed, Campus Placement, TPO Strategy, System Design"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white rounded-xl py-2 px-3 text-xs outline-hidden font-mono"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddModalOpen(false);
                      setEditingPost(null);
                    }}
                    className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md shadow-indigo-600/30 cursor-pointer"
                  >
                    {editingPost ? 'Update Article' : 'Publish Article'}
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
              <h3 className="text-lg font-bold mb-1">Delete this article?</h3>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                This blog post will be permanently unpublished from the Grow360 knowledge &amp; insights hub.
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
                  Yes, Delete Article
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
