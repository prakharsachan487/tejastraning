import { useAdminData } from '../../../context/AdminDataContext';
import {
  Briefcase,
  Image,
  BookOpen,
  Mail,
  Users,
  Plus,
  ChevronRight
} from 'lucide-react';

interface OverviewTabProps {
  onNavigateTab: (tab: 'overview' | 'jobs' | 'gallery' | 'blogs' | 'enquiries' | 'applications') => void;
  onOpenAddJob: () => void;
  onOpenAddGallery: () => void;
  onOpenAddBlog: () => void;
}

export function OverviewTab({
  onNavigateTab,
  onOpenAddJob,
  onOpenAddGallery,
  onOpenAddBlog,
}: OverviewTabProps) {
  const { jobs, galleryItems, blogPosts, enquiries, applications, updateEnquiryStatus, updateApplicationStatus } = useAdminData();

  // Metrics
  const totalJobs = jobs.length;
  const totalOpenings = jobs.reduce((acc, curr) => acc + (curr.openings || 1), 0);
  const totalMoments = galleryItems.length;
  const totalBlogs = blogPosts.length;
  const totalEnquiries = enquiries.length;
  const newEnquiries = enquiries.filter((e) => e.status === 'NEW').length;
  const totalApplications = applications.length;
  const pendingApplications = applications.filter((a) => a.status === 'Pending' || a.status === 'Reviewing').length;

  const recentEnquiries = enquiries.slice(0, 4);
  const recentApplications = applications.slice(0, 4);

  return (
    <div className="space-y-6">
      {/* ─── Top Welcome & Quick Actions Bar (Clean Minimalist) ───────────────── */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-7 text-slate-900 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Admin Console Overview</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-[family-name:var(--font-display)]">
              Welcome back, Administrator
            </h1>
            <p className="text-xs text-slate-500 max-w-xl">
              Quick summary of incoming institutional inquiries, candidate job applications, active courses, and platform content.
            </p>
          </div>

          {/* Quick Create Buttons */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={onOpenAddJob}
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3.5 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer transition-all shadow-xs"
            >
              <Plus size={14} />
              <span>Post Job</span>
            </button>

            <button
              onClick={onOpenAddGallery}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3.5 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer transition-all"
            >
              <Plus size={14} />
              <span>Add Moment</span>
            </button>

            <button
              onClick={onOpenAddBlog}
              className="bg-blue-50 hover:bg-blue-100 text-[#2563EB] text-xs font-semibold px-3.5 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer transition-all border border-blue-200/60"
            >
              <Plus size={14} />
              <span>New Article</span>
            </button>
          </div>
        </div>
      </div>

      {/* ─── Metric KPI Cards ────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Card 1: Jobs */}
        <div
          onClick={() => onNavigateTab('jobs')}
          className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Briefcase size={20} />
            </div>
            <span className="text-[11px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
              {totalOpenings} Openings
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Job Posts</p>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-[family-name:var(--font-display)]">
              {totalJobs}
            </span>
            <span className="text-xs font-semibold text-blue-600 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
              Manage <ChevronRight size={13} />
            </span>
          </div>
        </div>

        {/* Card 2: Gallery */}
        <div
          onClick={() => onNavigateTab('gallery')}
          className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-purple-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Image size={20} />
            </div>
            <span className="text-[11px] font-mono text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full font-bold">
              Rolling Strip
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Gallery Moments</p>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-[family-name:var(--font-display)]">
              {totalMoments}
            </span>
            <span className="text-xs font-semibold text-purple-600 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
              Manage <ChevronRight size={13} />
            </span>
          </div>
        </div>

        {/* Card 3: Form Inquiries */}
        <div
          onClick={() => onNavigateTab('enquiries')}
          className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-amber-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Mail size={20} />
            </div>
            {newEnquiries > 0 ? (
              <span className="text-[11px] font-mono text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full font-bold animate-pulse">
                {newEnquiries} New Leads
              </span>
            ) : (
              <span className="text-[11px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full font-bold">
                All Cleared
              </span>
            )}
          </div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Connect 360 Forms</p>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-[family-name:var(--font-display)]">
              {totalEnquiries}
            </span>
            <span className="text-xs font-semibold text-amber-600 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
              Review Leads <ChevronRight size={13} />
            </span>
          </div>
        </div>

        {/* Card 4: Job Applications */}
        <div
          onClick={() => onNavigateTab('applications')}
          className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-emerald-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Users size={20} />
            </div>
            {pendingApplications > 0 ? (
              <span className="text-[11px] font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">
                {pendingApplications} Pending
              </span>
            ) : (
              <span className="text-[11px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full font-bold">
                Up to date
              </span>
            )}
          </div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Job Applications</p>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-[family-name:var(--font-display)]">
              {totalApplications}
            </span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
              Review CVs <ChevronRight size={13} />
            </span>
          </div>
        </div>
      </div>

      {/* ─── 2-Column Split: Recent Leads & Recent Job Applications ─────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Recent Connect 360 Inquiries */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Mail size={16} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900 font-[family-name:var(--font-display)]">
                    Latest Form Inquiries
                  </h2>
                  <p className="text-[11px] text-slate-500">
                    College placement coordinators &amp; institutional demo requests
                  </p>
                </div>
              </div>

              <button
                onClick={() => onNavigateTab('enquiries')}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
              >
                <span>View All</span>
                <ChevronRight size={14} />
              </button>
            </div>

            {recentEnquiries.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-xs">
                No form submissions received yet.
              </div>
            ) : (
              <div className="space-y-3">
                {recentEnquiries.map((enq) => (
                  <div
                    key={enq.id}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-300 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 truncate">
                          {enq.fullName}
                        </span>
                        <span
                          className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                            enq.status === 'NEW'
                              ? 'bg-amber-100 text-amber-800'
                              : enq.status === 'CONTACTED'
                              ? 'bg-blue-100 text-blue-800'
                              : enq.status === 'IN_PROGRESS'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {enq.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 font-medium truncate mt-0.5">
                        {enq.collegeName} &bull; {enq.profession}
                      </p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                        {enq.email} | {enq.phone}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <select
                        value={enq.status}
                        onChange={(e) => updateEnquiryStatus(enq.id, e.target.value as any)}
                        className="text-[10px] bg-white border border-slate-300 rounded-lg px-2 py-1 text-slate-700 font-semibold cursor-pointer outline-hidden"
                      >
                        <option value="NEW">Mark NEW</option>
                        <option value="CONTACTED">Mark CONTACTED</option>
                        <option value="IN_PROGRESS">Mark IN PROGRESS</option>
                        <option value="CLOSED">Mark CLOSED</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Total received: <strong>{totalEnquiries}</strong></span>
            <button
              onClick={() => onNavigateTab('enquiries')}
              className="text-blue-600 hover:underline font-semibold cursor-pointer"
            >
              Go to Form Inquiries Console &rarr;
            </button>
          </div>
        </div>

        {/* Right Column: Recent Job Applications */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Users size={16} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900 font-[family-name:var(--font-display)]">
                    Latest Candidate Applications
                  </h2>
                  <p className="text-[11px] text-slate-500">
                    Instructors, mock interviewers &amp; academic candidates
                  </p>
                </div>
              </div>

              <button
                onClick={() => onNavigateTab('applications')}
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
              >
                <span>View All</span>
                <ChevronRight size={14} />
              </button>
            </div>

            {recentApplications.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-xs">
                No job applications received yet.
              </div>
            ) : (
              <div className="space-y-3">
                {recentApplications.map((app) => (
                  <div
                    key={app.id}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-300 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 truncate">
                          {app.fullName}
                        </span>
                        <span
                          className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold ${
                            app.status === 'Shortlisted'
                              ? 'bg-blue-100 text-blue-800'
                              : app.status === 'Interview Scheduled'
                              ? 'bg-purple-100 text-purple-800'
                              : app.status === 'Offered'
                              ? 'bg-emerald-100 text-emerald-800'
                              : app.status === 'Rejected'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {app.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 font-medium truncate mt-0.5">
                        Applied for: <span className="text-blue-600 font-bold">{app.jobTitle}</span>
                      </p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                        {app.email} &bull; {app.phone}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <select
                        value={app.status}
                        onChange={(e) => updateApplicationStatus(app.id, e.target.value as any)}
                        className="text-[10px] bg-white border border-slate-300 rounded-lg px-2 py-1 text-slate-700 font-semibold cursor-pointer outline-hidden"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Reviewing">Reviewing</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Interview Scheduled">Interview Scheduled</option>
                        <option value="Offered">Offered</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Total candidate submissions: <strong>{totalApplications}</strong></span>
            <button
              onClick={() => onNavigateTab('applications')}
              className="text-emerald-600 hover:underline font-semibold cursor-pointer"
            >
              Go to Candidate Pipeline &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* ─── Bottom Section: Quick Links & Summary Cards ─────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-6 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-3">
              <Briefcase size={18} />
            </div>
            <h3 className="text-base font-bold mb-1">Career &amp; Jobs Hub</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Add technical mentor, instructor, and placement manager positions with detailed compensation and curriculum requirements.
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('jobs')}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            Manage All Jobs ({totalJobs})
          </button>
        </div>

        <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-6 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3">
              <Image size={18} />
            </div>
            <h3 className="text-base font-bold mb-1">Campus Moments Gallery</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Keep the rolling homepage gallery updated with fresh classroom workshops, hackathon triumphs, and milestone celebrations.
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('gallery')}
            className="w-full bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            Manage Gallery ({totalMoments})
          </button>
        </div>

        <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-6 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-3">
              <BookOpen size={18} />
            </div>
            <h3 className="text-base font-bold mb-1">Articles &amp; Blog Engine</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Publish placement guides, system design breakdowns, and analytics insights directly to the public knowledge hub.
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('blogs')}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            Manage Articles ({totalBlogs})
          </button>
        </div>
      </div>
    </div>
  );
}
