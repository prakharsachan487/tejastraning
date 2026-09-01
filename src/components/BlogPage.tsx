import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpen, Clock, Tag, Search, ArrowUpRight, CheckCircle2, Sparkles, Send } from 'lucide-react';
import { useEnquiry } from '../context/EnquiryContext';
import { useAdminData, type BlogPost } from '../context/AdminDataContext';

export function BlogPage({ onBackToHome }: { onBackToHome: () => void }) {
  const { openEnquiry } = useEnquiry();
  const { blogPosts } = useAdminData();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const displayPosts = blogPosts.length > 0 ? blogPosts : [];

  const filteredPosts = displayPosts.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Navigation Bar */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-[#2563EB] bg-white border border-slate-200 px-4 py-2 rounded-full shadow-xs transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </button>
          
          <span className="text-xs font-mono font-semibold text-slate-500">
            Grow360 Knowledge &amp; Insights
          </span>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/25 text-[#2563EB] text-xs font-bold tracking-wide mb-4">
            <Sparkles size={14} />
            <span>Placement Intelligence &amp; Industry Trends</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight font-[family-name:var(--font-display)] leading-tight mb-4">
            Grow360 Blog &amp; Insights
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Practical strategies, technical roadmaps, and recruiter insights to help colleges maximize student employability and placement success.
          </p>

          {/* Search Bar */}
          <div className="mt-8 relative max-w-md mx-auto">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles by topic, skill, or strategy..."
              className="w-full bg-white border border-slate-300 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 shadow-xs"
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredPosts.map((post) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-[#2563EB]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-black/10 text-[11px] font-bold text-slate-900 shadow-sm flex items-center gap-1">
                    <Tag size={11} className="text-[#2563EB]" />
                    <span>{post.category}</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs font-mono text-slate-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {post.readTime}
                    </span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-snug group-hover:text-[#2563EB] transition-colors mb-2.5">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {post.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#2563EB]">
                <span>Read Full Article</span>
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom Newsletter Card */}
        <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-3xl p-8 sm:p-12 text-white text-center max-w-3xl mx-auto shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#2563EB]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold mb-3">
              <BookOpen size={13} className="text-[#38BDF8]" />
              <span>Campus Placement Digest</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2 font-[family-name:var(--font-display)]">
              Stay Ahead of Campus Hiring Trends
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mb-6">
              Receive curated rubrics, interview questions, and placement strategies directly in your inbox.
            </p>

            {newsletterSubscribed ? (
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-5 py-3 rounded-full text-xs font-bold">
                <CheckCircle2 size={16} />
                <span>Thank you for subscribing! Next issue drops Monday.</span>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (newsletterEmail.trim()) setNewsletterSubscribed(true);
                }}
                className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto"
              >
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter institutional email"
                  className="w-full sm:w-auto flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:bg-white/15 focus:border-[#38BDF8]"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto btn-pill-primary text-xs sm:text-sm font-bold px-6 py-2.5 flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  <span>Subscribe</span>
                  <Send size={14} />
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

      {/* Article Detail Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-10 shadow-2xl border border-slate-200 relative my-8"
            >
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-sm cursor-pointer"
              >
                ✕
              </button>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/10 text-[#2563EB] text-xs font-bold mb-3">
                <Tag size={12} />
                <span>{selectedPost.category}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-[family-name:var(--font-display)] leading-tight mb-3">
                {selectedPost.title}
              </h2>

              <div className="flex items-center gap-3 text-xs font-mono text-slate-500 mb-6 pb-4 border-b border-slate-100">
                <span>By {selectedPost.author}</span>
                <span>•</span>
                <span>{selectedPost.date}</span>
                <span>•</span>
                <span>{selectedPost.readTime}</span>
              </div>

              <div className="h-64 rounded-2xl overflow-hidden mb-6 bg-slate-100">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed mb-8">
                {selectedPost.content.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-slate-500">
                  Looking to transform your college placement statistics?
                </p>
                <button
                  onClick={() => {
                    setSelectedPost(null);
                    openEnquiry('CONSULTATION');
                  }}
                  className="btn-pill-primary text-xs font-bold px-6 py-2.5 cursor-pointer"
                >
                  Book Placement Consultation
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
