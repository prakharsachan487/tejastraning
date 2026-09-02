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

interface NavItem {
  id: ActiveTab;
  label: string;
  icon: any;
  badge: string | null;
  badgeColor?: string;
}

interface NavSection {
  group: string;
  items: NavItem[];
}

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

  const navSections: NavSection[] = [
    {
      group: 'Overview',
      items: [
        {
          id: 'overview' as const,
          label: 'Dashboard Overview',
          icon: LayoutDashboard,
          badge: null,
        },
      ],
    },
    {
      group: 'Landing Page Content',
      items: [
        {
          id: 'metrics' as const,
          label: 'Verified Track Record',
          icon: TrendingUp,
          badge: metricsData.length > 0 ? `${metricsData.length}` : null,
        },
        {
          id: 'testimonials' as const,
          label: 'Institutional Testimonials',
          icon: MessageSquareQuote,
          badge: testimonials.length > 0 ? `${testimonials.length}` : null,
        },
        {
          id: 'announcements' as const,
          label: 'Top Announcement Marquee',
          icon: Sparkles,
          badge: announcements.filter((a) => a.active).length > 0 ? `${announcements.filter((a) => a.active).length} live` : null,
        },
        {
          id: 'team' as const,
          label: 'Team & Leadership',
          icon: Users,
          badge: teamMembers.length > 0 ? `${teamMembers.length}` : null,
        },
      ],
    },
    {
      group: 'Academics & Media',
      items: [
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
          badge: mentors.length > 0 ? `${mentors.length}` : null,
        },
        {
          id: 'gallery' as const,
          label: 'Campus Moments Gallery',
          icon: ImageIcon,
          badge: galleryItems.length > 0 ? `${galleryItems.length}` : null,
        },
        {
          id: 'blogs' as const,
          label: 'Blogs & Articles',
          icon: BookOpen,
          badge: blogPosts.length > 0 ? `${blogPosts.length}` : null,
        },
      ],
    },
    {
      group: 'Leads & Applications',
      items: [
        {
          id: 'enquiries' as const,
          label: 'Connect 360 Inquiries',
          icon: Mail,
          badge: newEnquiriesCount > 0 ? `${newEnquiriesCount} new` : null,
          badgeColor: 'bg-amber-100 text-amber-800 font-bold',
        },
        {
          id: 'applications' as const,
          label: 'Job Applications',
          icon: Users,
          badge: pendingAppsCount > 0 ? `${pendingAppsCount} pending` : null,
          badgeColor: 'bg-blue-100 text-blue-800 font-bold',
        },
        {
          id: 'jobs' as const,
          label: 'Jobs & Openings',
          icon: Briefcase,
          badge: jobs.length > 0 ? `${jobs.length}` : null,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans flex flex-col selection:bg-[#2563EB] selection:text-white">
      {/* ─── Top Executive Bar (Clean, Minimalist) ────────────────────────────── */}
      <header className="bg-white border-b border-slate-200/90 text-slate-900 sticky top-0 z-40 px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between shadow-2xs">
        {/* Left: Mobile menu toggle + Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            className="lg:hidden p-2 text-slate-500 hover:text-slate-900 rounded-xl hover:bg-slate-100 cursor-pointer"
          >
            {isMobileNavOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#2563EB] flex items-center justify-center font-bold text-white text-sm shadow-xs">
              G
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm tracking-tight text-slate-900 font-[family-name:var(--font-display)]">
                  Grow360
                </span>
                <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full border border-slate-200">
                  Admin Console
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Quick actions & Admin Profile Menu */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Public website quick view */}
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200/90 px-3 py-1.5 rounded-xl transition-all cursor-pointer shadow-2xs"
          >
            <span>Live Site</span>
            <ExternalLink size={13} className="text-slate-400" />
          </button>

          {/* Change password button */}
          <button
            type="button"
            onClick={() => setIsPasswordModalOpen(true)}
            title="Change Master Password"
            className="hidden sm:inline-flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200/90 px-2.5 py-1.5 rounded-xl transition-colors cursor-pointer"
          >
            <KeyRound size={13} />
            <span className="text-[11px] font-medium">Security</span>
          </button>

          {/* Logout Button */}
          <button
            type="button"
            onClick={logoutAdmin}
            title="Logout of Admin Portal"
            className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50/80 hover:bg-rose-100 border border-rose-200/80 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
          >
            <LogOut size={13} />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* ─── Main Admin Body Split: Sidebar & Content ───────────────────────── */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
        {/* Left Sidebar (Desktop - Clean Structured) */}
        <aside className="hidden lg:block w-64 shrink-0 space-y-4">
          <div className="bg-white rounded-3xl p-3.5 border border-slate-200/80 shadow-2xs sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto no-scrollbar">
            <nav className="space-y-4">
              {navSections.map((sec, secIdx) => (
                <div key={secIdx}>
                  <div className="px-3 text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider mb-1.5">
                    {sec.group}
                  </div>

                  <div className="space-y-0.5">
                    {sec.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => setActiveTab(item.id)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all cursor-pointer ${
                            isActive
                              ? 'bg-slate-900 text-white font-bold shadow-xs'
                              : 'text-slate-600 hover:bg-slate-100/70 hover:text-slate-900 font-medium'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon
                              size={15}
                              className={isActive ? 'text-blue-400' : 'text-slate-400'}
                            />
                            <span>{item.label}</span>
                          </div>

                          {item.badge && (
                            <span
                              className={`text-[9.5px] font-mono px-1.5 py-0.5 rounded-md ${
                                item.badgeColor || (isActive ? 'bg-slate-800 text-slate-200 font-semibold' : 'bg-slate-100 text-slate-500 font-medium')
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>

            {/* Admin Profile Box in Sidebar */}
            <div className="mt-4 pt-3 border-t border-slate-100 px-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs">
                  A
                </div>
                <div className="leading-tight">
                  <div className="text-[11px] font-bold text-slate-800 truncate max-w-[120px]">
                    {adminUser?.name || 'Administrator'}
                  </div>
                  <div className="text-[9px] font-mono text-emerald-600 font-semibold">
                    ● Master Session
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileNavOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs lg:hidden"
              onClick={() => setIsMobileNavOpen(false)}
            >
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 280 }}
                className="w-72 max-w-[80vw] h-full bg-white p-5 shadow-2xl overflow-y-auto flex flex-col justify-between"
                onClick={(e) => e.stopPropagation()}
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                    <span className="font-bold text-sm text-slate-900">Admin Console</span>
                    <button
                      onClick={() => setIsMobileNavOpen(false)}
                      className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <nav className="space-y-4">
                    {navSections.map((sec, secIdx) => (
                      <div key={secIdx}>
                        <div className="px-2 text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider mb-1">
                          {sec.group}
                        </div>
                        <div className="space-y-0.5">
                          {sec.items.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeTab === item.id;
                            return (
                              <button
                                key={item.id}
                                onClick={() => {
                                  setActiveTab(item.id);
                                  setIsMobileNavOpen(false);
                                }}
                                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all cursor-pointer ${
                                  isActive
                                    ? 'bg-slate-900 text-white font-bold'
                                    : 'text-slate-600 hover:bg-slate-100'
                                }`}
                              >
                                <div className="flex items-center gap-2.5">
                                  <Icon size={15} />
                                  <span>{item.label}</span>
                                </div>
                                {item.badge && (
                                  <span className="text-[9.5px] font-mono px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 font-bold">
                                    {item.badge}
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
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
              </motion.div>
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

              <form onSubmit={handlePasswordSubmit} autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck={false} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    autoComplete="new-password"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
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
                    autoComplete="new-password"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
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
                    autoComplete="new-password"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
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
