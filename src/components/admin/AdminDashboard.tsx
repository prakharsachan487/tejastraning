import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Briefcase,
  Image as ImageIcon,
  BookOpen,
  Mail,
  Users,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Menu,
  X,
  KeyRound,
  Check,
  AlertCircle,
  Sparkles,
  TrendingUp,
  MessageSquareQuote
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useAdminData } from '../../context/AdminDataContext';
import { OverviewTab } from './tabs/OverviewTab';
import { AnnouncementsTab } from './tabs/AnnouncementsTab';
import { MetricsTab } from './tabs/MetricsTab';
import { TestimonialsTab } from './tabs/TestimonialsTab';
import { TeamTab } from './tabs/TeamTab';
import { CurriculumTab } from './tabs/CurriculumTab';
import { MentorsTab } from './tabs/MentorsTab';
import { JobsTab } from './tabs/JobsTab';
import { GalleryTab } from './tabs/GalleryTab';
import { BlogsTab } from './tabs/BlogsTab';
import { EnquiriesTab } from './tabs/EnquiriesTab';
import { ApplicationsTab } from './tabs/ApplicationsTab';

type ActiveTab = 'overview' | 'metrics' | 'testimonials' | 'announcements' | 'team' | 'curriculum' | 'mentors' | 'jobs' | 'gallery' | 'blogs' | 'enquiries' | 'applications';

interface AdminDashboardProps {
  onBackToHome: () => void;
}

export function AdminDashboard({ onBackToHome }: AdminDashboardProps) {
  const { adminUser, logoutAdmin, updateAdminPassword } = useAdminAuth();
  const { enquiries, applications, mentors, jobs, galleryItems, blogPosts, announcements, teamMembers, metricsData, testimonials } = useAdminData();

  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  // Change Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStatusMsg, setPasswordStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Unread / pending badges
  const newEnquiriesCount = enquiries.filter((e) => e.status === 'NEW').length;
  const pendingAppsCount = applications.filter((a) => a.status === 'Pending').length;

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordStatusMsg(null);

    if (newPassword !== confirmPassword) {
      setPasswordStatusMsg({ type: 'error', text: 'New passwords do not match.' });
      return;
    }

    const res = updateAdminPassword(currentPassword, newPassword);
    if (!res.success) {
      setPasswordStatusMsg({ type: 'error', text: res.error || 'Failed to update password.' });
    } else {
      setPasswordStatusMsg({ type: 'success', text: 'Master password updated successfully!' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        setIsPasswordModalOpen(false);
        setPasswordStatusMsg(null);
      }, 1500);
    }
  };

  const navItems = [
    {
      id: 'overview' as const,
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'metrics' as const,
      label: 'Verified Track Record',
      icon: TrendingUp,
      badge: metricsData.length > 0 ? `${metricsData.length} Stats` : null,
    },
    {
      id: 'testimonials' as const,
      label: 'Institutional Testimonials',
      icon: MessageSquareQuote,
      badge: testimonials.length > 0 ? `${testimonials.length} Quotes` : null,
    },
    {
      id: 'announcements' as const,
      label: 'Top Marquee Ticker',
      icon: Sparkles,
      badge: announcements.filter((a) => a.active).length > 0 ? `${announcements.filter((a) => a.active).length} Active` : null,
    },
    {
      id: 'team' as const,
      label: 'Team & Leadership',
      icon: Users,
      badge: teamMembers.length > 0 ? String(teamMembers.length) : null,
    },
    {
      id: 'curriculum' as const,
      label: 'Curriculum & Courses',
      icon: BookOpen,
      badge: '2 Tracks',
    },
    {
      id: 'mentors' as const,
      label: 'Faculty & Mentors',
      icon: Users,
      badge: mentors.length > 0 ? String(mentors.length) : null,
    },
    {
      id: 'jobs' as const,
      label: 'Jobs & Openings',
      icon: Briefcase,
      badge: jobs.length > 0 ? String(jobs.length) : null,
    },
    {
      id: 'gallery' as const,
      label: 'Campus Gallery',
      icon: ImageIcon,
      badge: galleryItems.length > 0 ? String(galleryItems.length) : null,
    },
    {
      id: 'blogs' as const,
      label: 'Blogs & Articles',
      icon: BookOpen,
      badge: blogPosts.length > 0 ? String(blogPosts.length) : null,
    },
    {
      id: 'enquiries' as const,
      label: 'Connect 360 Forms',
      icon: Mail,
      badge: newEnquiriesCount > 0 ? `${newEnquiriesCount} New` : null,
      badgeColor: 'bg-amber-500 text-white font-bold animate-pulse',
    },
    {
      id: 'applications' as const,
      label: 'Job Applications',
      icon: Users,
      badge: pendingAppsCount > 0 ? `${pendingAppsCount} Pending` : null,
      badgeColor: 'bg-emerald-500 text-white font-bold',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4F6FA] text-slate-800 font-sans flex flex-col selection:bg-[#2563EB] selection:text-white">
      {/* ─── Top Executive Bar ────────────────────────────────────────────── */}
      <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-40 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between shadow-md">
        {/* Left: Mobile menu toggle + Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
          >
            {isMobileNavOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-extrabold text-white text-sm shadow-md shadow-blue-500/30">
              G
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-tight text-white font-[family-name:var(--font-display)]">
                Grow360
              </span>
              <span className="ml-2 text-[10px] font-mono uppercase bg-blue-500/20 border border-blue-400/30 text-blue-300 px-2 py-0.5 rounded-full font-bold">
                Admin Suite
              </span>
            </div>
          </div>
        </div>

        {/* Right: Quick actions & Admin Profile Menu */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Public website quick view */}
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-xl transition-all cursor-pointer shadow-xs"
          >
            <span>View Public Site</span>
            <ExternalLink size={13} className="text-slate-400" />
          </button>

          {/* Change password button */}
          <button
            type="button"
            onClick={() => setIsPasswordModalOpen(true)}
            title="Change Master Password"
            className="hidden sm:inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 px-2.5 py-1.5 rounded-xl transition-colors cursor-pointer"
          >
            <KeyRound size={14} />
            <span className="text-[11px]">Security</span>
          </button>

          {/* Logout Button */}
          <button
            type="button"
            onClick={logoutAdmin}
            title="Logout of Admin Portal"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-400 hover:text-white bg-rose-950/40 hover:bg-rose-600 border border-rose-800/50 hover:border-rose-600 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
          >
            <LogOut size={14} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* ─── Main Admin Body Split: Sidebar & Content ───────────────────────── */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
        {/* Left Sidebar (Desktop) */}
        <aside className="hidden lg:block w-64 shrink-0 space-y-6">
          {/* Navigation Card */}
          <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs sticky top-20">
            <div className="px-3 py-2 text-[11px] font-mono font-bold uppercase text-slate-400 tracking-wider">
              Navigation Console
            </div>

            <nav className="space-y-1 mt-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-slate-900 text-white shadow-md'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon
                        size={16}
                        className={isActive ? 'text-blue-400' : 'text-slate-400'}
                      />
                      <span>{item.label}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                          item.badgeColor || (isActive ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-600')
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Admin Profile Box in Sidebar */}
            <div className="mt-6 pt-4 border-t border-slate-100 px-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                  A
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate">
                    {adminUser?.name || 'SuperAdmin'}
                  </p>
                  <p className="text-[10px] text-slate-400 font-mono truncate">
                    {adminUser?.email || 'admin@grow360.in'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileNavOpen && (
            <motion.div
              initial={{ opacity: 0, x: -200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -200 }}
              className="fixed inset-0 z-50 lg:hidden flex"
            >
              <div
                className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
                onClick={() => setIsMobileNavOpen(false)}
              />
              <div className="relative w-72 max-w-[80vw] bg-white h-full p-6 shadow-2xl z-10 flex flex-col justify-between overflow-y-auto">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                    <span className="font-bold text-sm text-slate-900">Admin Console</span>
                    <button
                      onClick={() => setIsMobileNavOpen(false)}
                      className="p-1 text-slate-400 hover:text-slate-700"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <nav className="space-y-1.5">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setActiveTab(item.id);
                            setIsMobileNavOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                            isActive
                              ? 'bg-slate-900 text-white'
                              : 'text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon size={16} />
                            <span>{item.label}</span>
                          </div>
                          {item.badge && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold">
                              {item.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </nav>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <button
                    onClick={onBackToHome}
                    className="w-full text-xs font-bold text-slate-700 bg-slate-100 py-2.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ExternalLink size={14} />
                    <span>View Public Site</span>
                  </button>
                  <button
                    onClick={logoutAdmin}
                    className="w-full text-xs font-bold text-rose-600 bg-rose-50 py-2.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <LogOut size={14} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Right Main Content Area */}
        <main className="flex-1 min-w-0 pb-16">
          {activeTab === 'overview' && (
            <OverviewTab
              onNavigateTab={(tab) => setActiveTab(tab)}
              onOpenAddJob={() => setActiveTab('jobs')}
              onOpenAddGallery={() => setActiveTab('gallery')}
              onOpenAddBlog={() => setActiveTab('blogs')}
            />
          )}

          {activeTab === 'metrics' && <MetricsTab />}

          {activeTab === 'testimonials' && <TestimonialsTab />}

          {activeTab === 'announcements' && <AnnouncementsTab />}

          {activeTab === 'team' && <TeamTab />}

          {activeTab === 'curriculum' && <CurriculumTab />}

          {activeTab === 'mentors' && <MentorsTab />}

          {activeTab === 'jobs' && <JobsTab />}

          {activeTab === 'gallery' && <GalleryTab />}

          {activeTab === 'blogs' && <BlogsTab />}

          {activeTab === 'enquiries' && <EnquiriesTab />}

          {activeTab === 'applications' && <ApplicationsTab />}
        </main>
      </div>

      {/* ─── Change Password Modal ─────────────────────────────────────────── */}
      <AnimatePresence>
        {isPasswordModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPasswordModalOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-slate-900"
            >
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <ShieldCheck size={18} />
                  </div>
                  <h3 className="text-base font-bold">Update Master Password</h3>
                </div>
                <button
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-700"
                >
                  <X size={18} />
                </button>
              </div>

              {passwordStatusMsg && (
                <div
                  className={`mb-4 p-3 rounded-xl text-xs flex items-center gap-2 ${
                    passwordStatusMsg.type === 'success'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-rose-50 text-rose-800 border border-rose-200'
                  }`}
                >
                  {passwordStatusMsg.type === 'success' ? (
                    <Check size={14} className="text-emerald-600" />
                  ) : (
                    <AlertCircle size={14} className="text-rose-600" />
                  )}
                  <span>{passwordStatusMsg.text}</span>
                </div>
              )}

              <form onSubmit={handlePasswordSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter existing password"
                    required
                    className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl py-2 px-3 text-xs outline-hidden font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    required
                    className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl py-2 px-3 text-xs outline-hidden font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat new password"
                    required
                    className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl py-2 px-3 text-xs outline-hidden font-mono"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsPasswordModalOpen(false)}
                    className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md shadow-blue-600/30 cursor-pointer"
                  >
                    Save New Password
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
