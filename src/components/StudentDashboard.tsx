import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  Library,
  ClipboardCheck,
  Code2,
  Building2,
  FileText,
  Award,
  LogOut,
  Share2,
  Pencil,
  Upload,
  ChevronDown,
  Sun,
  Moon,
  Flame,
  X,
  Plus,
  Globe,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface StudentDashboardProps {
  onBackToHome: () => void;
}

const AVATAR_OPTIONS = [
  {
    id: 'av-1',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    name: 'Hijab / Modern Student',
  },
  {
    id: 'av-2',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    name: 'Coder Guy (Red Shirt)',
  },
  {
    id: 'av-3',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    name: 'Tech Lead (Yellow Jacket)',
  },
  {
    id: 'av-4',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    name: 'Turbanned Developer',
  },
];

export function StudentDashboard({ onBackToHome }: StudentDashboardProps) {
  const { user, logout } = useAuth();

  // Load any previously saved student profile from localStorage
  const savedProfile = useMemo(() => {
    try {
      const raw = localStorage.getItem('tejas_student_profile');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, []);

  // Navigation & Tabs
  const [activeSidebarItem, setActiveSidebarItem] = useState<string>('dashboard');
  const [activeTab, setActiveTab] = useState<'personal' | 'academics' | 'experience' | 'projects' | 'social'>('personal');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Form State initialized from user login / empty for user to fill
  const [selectedAvatar, setSelectedAvatar] = useState(
    savedProfile?.avatar || user?.avatar || AVATAR_OPTIONS[0].url
  );
  const [firstName, setFirstName] = useState(
    savedProfile?.firstName ?? (user?.name ? user.name.split(' ')[0] : '')
  );
  const [lastName, setLastName] = useState(
    savedProfile?.lastName ?? (user?.name && user.name.split(' ')[1] ? user.name.split(' ').slice(1).join(' ') : '')
  );
  const [currentState, setCurrentState] = useState(savedProfile?.currentState || '');
  const [currentCity, setCurrentCity] = useState(savedProfile?.currentCity || '');
  const [phone, setPhone] = useState(savedProfile?.phone || '');
  const [email, setEmail] = useState(savedProfile?.email || user?.email || '');
  const [whatsapp, setWhatsapp] = useState(savedProfile?.whatsapp || '');
  const [gender, setGender] = useState(savedProfile?.gender || '');
  const [dob, setDob] = useState(savedProfile?.dob || '');
  const [languages, setLanguages] = useState<string[]>(savedProfile?.languages || []);
  const [preferredLanguage, setPreferredLanguage] = useState(savedProfile?.preferredLanguage || '');
  const [fatherName, setFatherName] = useState(savedProfile?.fatherName || '');
  const [parentContact, setParentContact] = useState(savedProfile?.parentContact || '');
  const [skills, setSkills] = useState<string[]>(savedProfile?.skills || []);
  const [newSkillInput, setNewSkillInput] = useState('');
  const [leetcodeUser, setLeetcodeUser] = useState(savedProfile?.leetcodeUser || '');

  // Resume State
  const [resumeUrl, setResumeUrl] = useState(savedProfile?.resumeUrl || '');

  // Academic Info State
  const [college, setCollege] = useState(savedProfile?.college || '');
  const [degree, setDegree] = useState(savedProfile?.degree || '');
  const [cgpa, setCgpa] = useState(savedProfile?.cgpa || '');
  const [gradYear, setGradYear] = useState(savedProfile?.gradYear || '');

  // Social Links
  const [linkedinUrl, setLinkedinUrl] = useState(savedProfile?.linkedinUrl || '');
  const [githubUrl, setGithubUrl] = useState(savedProfile?.githubUrl || '');
  const [portfolioUrl, setPortfolioUrl] = useState(savedProfile?.portfolioUrl || '');

  // Dynamic Profile Completeness Percentage
  const profileCompletion = useMemo(() => {
    const fields = [
      Boolean(firstName.trim()),
      Boolean(lastName.trim()),
      Boolean(email.trim()),
      Boolean(phone.trim()),
      Boolean(whatsapp.trim()),
      Boolean(currentState.trim()),
      Boolean(currentCity.trim()),
      Boolean(gender.trim()),
      Boolean(dob.trim()),
      languages.length > 0,
      Boolean(preferredLanguage.trim()),
      Boolean(fatherName.trim()),
      Boolean(parentContact.trim()),
      skills.length > 0,
      Boolean(leetcodeUser.trim()),
    ];
    const filled = fields.filter(Boolean).length;
    return Math.round((filled / fields.length) * 100);
  }, [
    firstName,
    lastName,
    email,
    phone,
    whatsapp,
    currentState,
    currentCity,
    gender,
    dob,
    languages,
    preferredLanguage,
    fatherName,
    parentContact,
    skills,
    leetcodeUser,
  ]);

  const handleFieldChange = () => {
    setHasChanges(true);
    setIsSaved(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const profileToSave = {
      avatar: selectedAvatar,
      firstName,
      lastName,
      currentState,
      currentCity,
      phone,
      email,
      whatsapp,
      gender,
      dob,
      languages,
      preferredLanguage,
      fatherName,
      parentContact,
      skills,
      leetcodeUser,
      resumeUrl,
      college,
      degree,
      cgpa,
      gradYear,
      linkedinUrl,
      githubUrl,
      portfolioUrl,
    };
    localStorage.setItem('tejas_student_profile', JSON.stringify(profileToSave));
    setIsSaved(true);
    setHasChanges(false);
    setTimeout(() => {
      setIsSaved(false);
    }, 3000);
  };

  const handleRemoveLanguage = (langToRemove: string) => {
    setLanguages(languages.filter((l) => l !== langToRemove));
    handleFieldChange();
  };

  const handleAddLanguage = (lang: string) => {
    if (!languages.includes(lang)) {
      setLanguages([...languages, lang]);
      handleFieldChange();
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
    handleFieldChange();
  };

  const handleAddSkill = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newSkillInput.trim()) {
      e.preventDefault();
      if (!skills.includes(newSkillInput.trim()) && skills.length < 5) {
        setSkills([...skills, newSkillInput.trim()]);
        setNewSkillInput('');
        handleFieldChange();
      }
    }
  };

  const handleQuickAddSkill = (skill: string) => {
    if (!skills.includes(skill) && skills.length < 5) {
      setSkills([...skills, skill]);
      handleFieldChange();
    }
  };

  const handleCopyProfileLink = () => {
    const handle = (firstName || 'student').toLowerCase() + (lastName ? `-${lastName.toLowerCase()}` : '');
    navigator.clipboard.writeText(`https://tejas-tech.in/profile/${handle}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleLogout = () => {
    logout();
    window.location.hash = '';
    onBackToHome();
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#0F0F14] text-slate-100' : 'bg-[#F8F9FA] text-slate-800'} font-sans transition-colors duration-200`}>
      
      {/* ========================================================
          01. TOP NAVBAR
      ======================================================== */}
      <header className={`sticky top-0 z-30 h-16 border-b ${isDarkMode ? 'bg-[#15151D]/90 border-white/10' : 'bg-white border-slate-200'} backdrop-blur-md px-4 sm:px-6 flex items-center justify-between`}>
        {/* Left: Brand & Home Link */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={handleLogout} title="Click to logout and go to home">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FF4500] via-[#FF6A00] to-[#FFA000] flex items-center justify-center text-white font-extrabold text-xs shadow-sm">
              TJ
            </div>
            <span className={`text-lg font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'} font-[family-name:var(--font-display)]`}>
              TrainX <span className="text-[10px] font-mono font-medium text-[#FF4500] bg-orange-500/10 px-1.5 py-0.5 rounded ml-1">Portal</span>
            </span>
          </div>

          <div className={`h-4 w-px ${isDarkMode ? 'bg-white/10' : 'bg-slate-200'} hidden sm:block`} />

          {/* Logout Button in place of Main Website */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 text-xs font-bold transition-colors cursor-pointer border border-red-500/20 shadow-xs"
            title="Logout and return to landing page"
          >
            <LogOut size={14} />
            <span>Logout</span>
          </button>
        </div>

        {/* Right Controls: Theme Toggle, Streak Pill, User Avatar & Logout */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Theme Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-xl border ${isDarkMode ? 'bg-white/5 border-white/10 text-yellow-400 hover:bg-white/10' : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'} transition-colors cursor-pointer`}
            title="Toggle theme"
          >
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Streak / XP Pill */}
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${isDarkMode ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' : 'bg-amber-50 border-amber-200 text-amber-600'} text-xs font-bold font-mono`}>
            <Flame size={14} className="text-amber-500 fill-amber-500" />
            <span>0</span>
          </div>

          {/* User Avatar & Info */}
          <div className="flex items-center gap-2.5">
            <img
              src={selectedAvatar}
              alt="User"
              className="w-8 h-8 rounded-full object-cover border-2 border-amber-400/50 shadow-xs"
            />
            <span className={`text-xs font-bold hidden md:inline-block ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
              {firstName || 'Student'} {lastName}
            </span>
          </div>
        </div>
      </header>

      {/* ========================================================
          02. DASHBOARD BODY (SIDEBAR + 2 CONTENT COLUMNS)
      ======================================================== */}
      <div className="max-w-[1600px] mx-auto flex">
        
        {/* ==========================================
            LEFT MAIN SIDEBAR
        ========================================== */}
        <aside className={`w-64 shrink-0 border-r ${isDarkMode ? 'bg-[#12121A] border-white/10' : 'bg-white border-slate-200'} min-h-[calc(100vh-4rem)] p-4 flex flex-col justify-between hidden md:flex`}>
          <div className="space-y-6">
            
            {/* Dashboard Link */}
            <div>
              <button
                onClick={() => setActiveSidebarItem('dashboard')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeSidebarItem === 'dashboard'
                    ? isDarkMode
                      ? 'bg-white/10 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-900 shadow-xs'
                    : isDarkMode
                    ? 'text-slate-400 hover:text-white hover:bg-white/5'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <LayoutDashboard size={16} className="text-blue-500" />
                  <span>Dashboard</span>
                </div>
              </button>
            </div>

            {/* ACADEMICS */}
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2 px-3">
                Academics
              </div>
              <div className="space-y-1">
                {[
                  { id: 'courses', label: 'All Courses', icon: BookOpen },
                  { id: 'timetable', label: 'Timetable', icon: Calendar },
                  { id: 'curriculum', label: 'Curriculum', icon: Library },
                  { id: 'attendance', label: 'Attendance', icon: ClipboardCheck },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSidebarItem === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSidebarItem(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                        isActive
                          ? isDarkMode ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-900 font-bold'
                          : isDarkMode ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon size={15} />
                        <span>{item.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ASSESSMENTS */}
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2 px-3">
                Assessments
              </div>
              <div className="space-y-1">
                {[
                  { id: 'codebank', label: 'Code Bank', icon: Code2 },
                  { id: 'companykits', label: 'Company Kits', icon: Building2 },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSidebarItem === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSidebarItem(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                        isActive
                          ? isDarkMode ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-900 font-bold'
                          : isDarkMode ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon size={15} />
                        <span>{item.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CAREER & DOCUMENTS */}
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2 px-3">
                Career & Documents
              </div>
              <div className="space-y-1">
                {[
                  { id: 'resumebuilder', label: 'Resume Builder', icon: FileText },
                  { id: 'certificates', label: 'Certificates', icon: Award },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSidebarItem === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSidebarItem(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                        isActive
                          ? isDarkMode ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-900 font-bold'
                          : isDarkMode ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon size={15} />
                        <span>{item.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* SUPPORT / LOGOUT */}
          <div className={`pt-4 border-t ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`}>
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2 px-3">
              Support
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
            >
              <LogOut size={15} />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* ==========================================
            CENTER / MAIN WORKSPACE GRID
        ========================================== */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start overflow-x-hidden">
          
          {/* ==========================================
              LEFT PROFILE COLUMN (User Profile & Resume Card)
          ========================================== */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* 1. Main Profile Card */}
            <div className={`rounded-3xl border ${isDarkMode ? 'bg-[#15151D] border-white/10' : 'bg-white border-slate-200'} p-6 shadow-sm`}>
              <div className="flex items-start gap-4 mb-4">
                <div className="relative">
                  <img
                    src={selectedAvatar}
                    alt={firstName}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-400/40 shadow-xs"
                  />
                  <button
                    onClick={() => setActiveTab('personal')}
                    className="absolute -bottom-1.5 -right-1.5 p-1.5 rounded-full bg-blue-500 text-white shadow hover:bg-blue-600 transition-colors cursor-pointer"
                    title="Change Avatar"
                  >
                    <Pencil size={11} />
                  </button>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className={`text-base font-bold truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {firstName} {lastName}
                    </h3>
                    <Pencil size={13} className="text-slate-400 cursor-pointer hover:text-blue-500" onClick={() => setActiveTab('personal')} />
                  </div>
                  <div className="text-xs text-slate-400 truncate mt-0.5">{email}</div>
                  <div className="text-[11px] font-mono text-slate-400 mt-1">Joined: 31/08/2026</div>
                </div>
              </div>

              {/* Social Links Icons */}
              <div className="pt-3 border-t border-slate-100 dark:border-white/5 mb-4">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-2 font-bold">
                  Social
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-8 h-8 rounded-full border ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-blue-500/20' : 'bg-slate-50 border-slate-200 hover:bg-blue-50'} flex items-center justify-center text-blue-500 transition-colors`}
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                  </a>
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-8 h-8 rounded-full border ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-slate-700' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'} flex items-center justify-center text-slate-700 dark:text-slate-300 transition-colors`}
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                    </svg>
                  </a>
                  <a
                    href={portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-8 h-8 rounded-full border ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-amber-500/20' : 'bg-slate-50 border-slate-200 hover:bg-amber-50'} flex items-center justify-center text-amber-500 transition-colors`}
                  >
                    <Globe size={14} />
                  </a>
                </div>
              </div>

              {/* Share Public Profile Button */}
              <button
                onClick={() => setShowShareModal(true)}
                className={`w-full py-2.5 px-4 rounded-xl border ${isDarkMode ? 'border-white/15 bg-white/5 hover:bg-white/10 text-white' : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'} text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs`}
              >
                <Share2 size={14} />
                <span>Share Public Profile</span>
              </button>
            </div>

            {/* 2. Profile Completion Card */}
            <div className={`rounded-3xl border ${isDarkMode ? 'bg-[#15151D] border-white/10' : 'bg-white border-slate-200'} p-6 shadow-sm`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                  Profile completion
                </span>
                <span className="text-xs font-mono font-bold text-blue-500">{profileCompletion}%</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden mb-3">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300"
                  style={{ width: `${profileCompletion}%` }}
                />
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Complete your personal details, academics and work experience to make your profile feel complete and easier to share.
              </p>
            </div>

            {/* 3. Resume PDF Card */}
            <div className={`rounded-3xl border ${isDarkMode ? 'bg-[#15151D] border-white/10' : 'bg-white border-slate-200'} p-6 shadow-sm`}>
              <div className="flex items-center justify-between mb-1">
                <h4 className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                  Resume PDF
                </h4>
                {resumeUrl ? (
                  <span className="text-[10px] font-mono text-emerald-500 font-bold">Uploaded</span>
                ) : (
                  <span className="text-[10px] font-mono text-amber-500 font-bold">Pending</span>
                )}
              </div>
              
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                Upload a PDF resume (max 4MB). Use the resume builder for a generated version.
              </p>

              <div className={`p-2.5 rounded-xl border ${isDarkMode ? 'bg-black/30 border-white/10 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-600'} text-[11px] font-mono truncate mb-3 flex items-center gap-2`}>
                <FileText size={13} className="text-blue-500 shrink-0" />
                <span className="truncate">{resumeUrl || 'No resume uploaded yet'}</span>
              </div>

              <button
                onClick={() => {
                  const newUrl = prompt('Enter Google Drive or PDF link to your resume:', resumeUrl);
                  if (newUrl !== null) {
                    setResumeUrl(newUrl);
                    handleFieldChange();
                  }
                }}
                className={`w-full py-2.5 px-4 rounded-xl ${isDarkMode ? 'bg-white/10 hover:bg-white/15 text-white' : 'bg-slate-900 hover:bg-black text-white'} text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2`}
              >
                <Upload size={14} />
                <span>{resumeUrl ? 'Update PDF' : 'Upload Resume PDF'}</span>
              </button>
            </div>

          </div>

          {/* ==========================================
              RIGHT EDIT PROFILE PANEL (Form & Tabs)
          ========================================== */}
          <div className={`lg:col-span-8 rounded-3xl border ${isDarkMode ? 'bg-[#15151D] border-white/10' : 'bg-white border-slate-200'} p-6 sm:p-8 shadow-sm`}>
            
            {/* Panel Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100 dark:border-white/10 mb-6">
              <div>
                <h2 className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'} tracking-tight font-[family-name:var(--font-display)]`}>
                  Edit Profile
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Update your profile information here.
                </p>
              </div>

              {/* Profile Completeness Pill Dropdown */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span>Profile completeness: {profileCompletion}%</span>
                <ChevronDown size={13} />
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex items-center gap-1.5 pb-4 border-b border-slate-100 dark:border-white/10 mb-6 overflow-x-auto">
              {[
                { id: 'personal', label: 'Personal Details' },
                { id: 'academics', label: 'Academics' },
                { id: 'experience', label: 'Work Experience' },
                { id: 'projects', label: 'Projects' },
                { id: 'social', label: 'Social' },
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? isDarkMode
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'bg-slate-900 text-white shadow-xs'
                        : isDarkMode
                        ? 'text-slate-400 hover:text-white hover:bg-white/5'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* TAB CONTENT: 1. PERSONAL DETAILS (Matching exact screenshot fields) */}
            {activeTab === 'personal' && (
              <form onSubmit={handleSave} className="space-y-6">
                
                {/* 1. Avatar Chooser */}
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="relative">
                      <img
                        src={selectedAvatar}
                        alt="Current Avatar"
                        className="w-14 h-14 rounded-full object-cover border-2 border-blue-500 shadow-xs"
                      />
                      <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center">
                        <Pencil size={9} />
                      </span>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mb-2">
                    Or choose an avatar
                  </div>

                  {/* 4 Avatar Presets */}
                  <div className="flex items-center gap-3">
                    {AVATAR_OPTIONS.map((av) => (
                      <button
                        key={av.id}
                        type="button"
                        onClick={() => {
                          setSelectedAvatar(av.url);
                          handleFieldChange();
                        }}
                        className={`p-0.5 rounded-full border-2 transition-all cursor-pointer ${
                          selectedAvatar === av.url
                            ? 'border-blue-500 scale-110 shadow-sm'
                            : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={av.url}
                          alt={av.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Names & Location (First Name, Last Name, State, City) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* First Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Prakhar"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                        handleFieldChange();
                      }}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs ${isDarkMode ? 'bg-[#0E0E14] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'} focus:outline-none focus:border-blue-500 shadow-xs`}
                    />
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      Locked after account setup to keep Resume Builder identity secure.
                    </span>
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sachan"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                        handleFieldChange();
                      }}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs ${isDarkMode ? 'bg-[#0E0E14] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'} focus:outline-none focus:border-blue-500 shadow-xs`}
                    />
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      Locked after account setup to keep Resume Builder identity secure.
                    </span>
                  </div>

                  {/* Current State */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Current State <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={currentState}
                      onChange={(e) => {
                        setCurrentState(e.target.value);
                        handleFieldChange();
                      }}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs ${isDarkMode ? 'bg-[#0E0E14] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'} focus:outline-none focus:border-blue-500 shadow-xs`}
                    >
                      <option value="">Select State</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Delhi NCR">Delhi NCR</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Haryana">Haryana</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                    </select>
                  </div>

                  {/* City / District */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      City / District <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Kanpur / Noida / Lucknow"
                      value={currentCity}
                      onChange={(e) => {
                        setCurrentCity(e.target.value);
                        handleFieldChange();
                      }}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs ${isDarkMode ? 'bg-[#0E0E14] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'} focus:outline-none focus:border-blue-500 shadow-xs`}
                    />
                  </div>
                </div>

                {/* 3. Contact Info (Phone, Email, WhatsApp) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9026015605"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        handleFieldChange();
                      }}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs ${isDarkMode ? 'bg-[#0E0E14] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'} focus:outline-none focus:border-blue-500 shadow-xs`}
                    />
                    <span className="text-[10px] text-slate-400 mt-1 block">Locked after account setup</span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Email ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. prakharsachan700@gmail.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        handleFieldChange();
                      }}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs ${isDarkMode ? 'bg-[#0E0E14] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'} focus:outline-none focus:border-blue-500 shadow-xs`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Whatsapp Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9026015605"
                      value={whatsapp}
                      onChange={(e) => {
                        setWhatsapp(e.target.value);
                        handleFieldChange();
                      }}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs ${isDarkMode ? 'bg-[#0E0E14] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'} focus:outline-none focus:border-blue-500 shadow-xs`}
                    />
                  </div>
                </div>

                {/* 4. Demographics & Languages (Gender, DOB, Languages Spoken) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={gender}
                      onChange={(e) => {
                        setGender(e.target.value);
                        handleFieldChange();
                      }}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs ${isDarkMode ? 'bg-[#0E0E14] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'} focus:outline-none focus:border-blue-500 shadow-xs`}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Date Of Birth <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => {
                        setDob(e.target.value);
                        handleFieldChange();
                      }}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs ${isDarkMode ? 'bg-[#0E0E14] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'} focus:outline-none focus:border-blue-500 shadow-xs`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Languages Spoken <span className="text-red-500">*</span>
                    </label>
                    <div className={`p-1.5 rounded-xl border flex flex-wrap gap-1.5 items-center min-h-[42px] ${isDarkMode ? 'bg-[#0E0E14] border-white/10' : 'bg-white border-slate-200'}`}>
                      {languages.map((lang) => (
                        <span
                          key={lang}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-blue-500/10 text-blue-500 text-[11px] font-medium border border-blue-500/20"
                        >
                          <span>{lang}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveLanguage(lang)}
                            className="hover:text-red-500 cursor-pointer"
                          >
                            <X size={11} />
                          </button>
                        </span>
                      ))}
                      {languages.length === 0 && (
                        <span className="text-[11px] text-slate-400 pl-1">No languages selected</span>
                      )}
                    </div>
                    {/* Quick Add Languages */}
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {['Hindi', 'English', 'Punjabi', 'Gujarati', 'Marathi'].map((l) => (
                        <button
                          key={l}
                          type="button"
                          onClick={() => handleAddLanguage(l)}
                          className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-blue-500 cursor-pointer"
                        >
                          + {l}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 5. Preferred Coding Language */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Preferred Coding Language <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={preferredLanguage}
                    onChange={(e) => {
                      setPreferredLanguage(e.target.value);
                      handleFieldChange();
                    }}
                    className={`w-full max-w-sm px-3.5 py-2.5 rounded-xl border text-xs ${isDarkMode ? 'bg-[#0E0E14] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'} focus:outline-none focus:border-blue-500 shadow-xs`}
                  >
                    <option value="">Select Preferred Language</option>
                    <option value="Python">Python</option>
                    <option value="C++">C++</option>
                    <option value="Java">Java</option>
                    <option value="JavaScript">JavaScript / TypeScript</option>
                    <option value="Go">Golang</option>
                    <option value="Rust">Rust</option>
                  </select>
                </div>

                {/* 6. Parents Info */}
                <div className="pt-2">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-3 font-bold">
                    Parents Info
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Father Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Father's Name"
                        value={fatherName}
                        onChange={(e) => {
                          setFatherName(e.target.value);
                          handleFieldChange();
                        }}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs ${isDarkMode ? 'bg-[#0E0E14] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'} focus:outline-none focus:border-blue-500 shadow-xs`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Parent Contact <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. 9026015605"
                        value={parentContact}
                        onChange={(e) => {
                          setParentContact(e.target.value);
                          handleFieldChange();
                        }}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs ${isDarkMode ? 'bg-[#0E0E14] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'} focus:outline-none focus:border-blue-500 shadow-xs`}
                      />
                    </div>
                  </div>
                </div>

                {/* 7. Skills (Up to 5) */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      Skills
                    </label>
                    <span className="text-[11px] text-slate-400">You can select upto 5</span>
                  </div>
                  <div className={`p-2 rounded-xl border flex flex-wrap gap-2 items-center ${isDarkMode ? 'bg-[#0E0E14] border-white/10' : 'bg-white border-slate-200'}`}>
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-500/10 text-blue-500 text-xs font-medium border border-blue-500/20"
                      >
                        <span>{skill}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill)}
                          className="hover:text-red-500 cursor-pointer"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                    {skills.length < 5 && (
                      <input
                        type="text"
                        placeholder="Type skill & press Enter..."
                        value={newSkillInput}
                        onChange={(e) => setNewSkillInput(e.target.value)}
                        onKeyDown={handleAddSkill}
                        className="text-xs bg-transparent focus:outline-none text-slate-700 dark:text-slate-300 min-w-[140px]"
                      />
                    )}
                  </div>
                  {/* Quick Add Skills */}
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {['SQL', 'Python', 'DSA', 'C++', 'Java', 'React.js', 'Node.js', 'System Design'].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => handleQuickAddSkill(s)}
                        className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-blue-500 cursor-pointer"
                      >
                        + {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 8. Coding Profiles */}
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2 font-bold">
                    Coding Profiles
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Leetcode Username
                    </label>
                    <input
                      type="text"
                      value={leetcodeUser}
                      onChange={(e) => {
                        setLeetcodeUser(e.target.value);
                        handleFieldChange();
                      }}
                      placeholder="e.g. prakhar_leetcode"
                      className={`w-full max-w-sm px-3.5 py-2.5 rounded-xl border text-xs ${isDarkMode ? 'bg-[#0E0E14] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'} focus:outline-none focus:border-blue-500 shadow-xs`}
                    />
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      Social links (LinkedIn, website, X, resume) are managed in the Social tab.
                    </span>
                  </div>
                </div>

                {/* Bottom Action / Save Bar */}
                <div className="pt-6 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
                  <div className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                    {isSaved ? (
                      <span className="text-emerald-500 flex items-center gap-1 font-bold">
                        <CheckCircle2 size={14} />
                        <span>Changes saved successfully!</span>
                      </span>
                    ) : hasChanges ? (
                      <span className="text-amber-500 flex items-center gap-1 font-bold">
                        <AlertCircle size={14} />
                        <span>Unsaved changes</span>
                      </span>
                    ) : (
                      <span>No unsaved changes</span>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="px-8 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 active:scale-95 transition-all cursor-pointer"
                  >
                    Save
                  </button>
                </div>

              </form>
            )}

            {/* TAB CONTENT: 2. ACADEMICS */}
            {activeTab === 'academics' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">College / University</label>
                    <input
                      type="text"
                      placeholder="e.g. PSIT Kanpur / AKTU"
                      value={college}
                      onChange={(e) => {
                        setCollege(e.target.value);
                        handleFieldChange();
                      }}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs ${isDarkMode ? 'bg-[#0E0E14] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'}`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Degree & Major</label>
                    <input
                      type="text"
                      placeholder="e.g. B.Tech Computer Science & Engineering"
                      value={degree}
                      onChange={(e) => {
                        setDegree(e.target.value);
                        handleFieldChange();
                      }}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs ${isDarkMode ? 'bg-[#0E0E14] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'}`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Current CGPA / Percentage</label>
                    <input
                      type="text"
                      placeholder="e.g. 8.64"
                      value={cgpa}
                      onChange={(e) => {
                        setCgpa(e.target.value);
                        handleFieldChange();
                      }}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs ${isDarkMode ? 'bg-[#0E0E14] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'}`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Graduation Year</label>
                    <input
                      type="text"
                      placeholder="e.g. 2026"
                      value={gradYear}
                      onChange={(e) => {
                        setGradYear(e.target.value);
                        handleFieldChange();
                      }}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs ${isDarkMode ? 'bg-[#0E0E14] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'}`}
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer shadow-sm"
                >
                  Update Academics
                </button>
              </div>
            )}

            {/* TAB CONTENT: 3. WORK EXPERIENCE */}
            {activeTab === 'experience' && (
              <div className="space-y-4">
                <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-black/20 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-bold">Engineering Intern / Fresher Project</h4>
                    <span className="text-[11px] font-mono text-blue-500">Summer 2025</span>
                  </div>
                  <div className="text-xs text-slate-500">TechCorp Solutions · Remote</div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                    Built responsive web dashboards using React, TypeScript, and Tailwind CSS. Integrated REST APIs and improved performance.
                  </p>
                </div>
                <button className="px-4 py-2 rounded-xl border border-dashed border-blue-500 text-blue-500 font-bold text-xs flex items-center gap-1.5 cursor-pointer">
                  <Plus size={14} />
                  <span>Add Experience</span>
                </button>
              </div>
            )}

            {/* TAB CONTENT: 4. PROJECTS */}
            {activeTab === 'projects' && (
              <div className="space-y-4">
                <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-black/20 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-bold">AI Placement Readiness Portal</h4>
                    <span className="text-[11px] font-mono text-emerald-500">Live Project</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    Full-stack portal featuring mock interview simulations, automated code grading, and resume parsing.
                  </p>
                  <div className="flex gap-1.5 mt-3">
                    {['React', 'Node.js', 'PostgreSQL', 'Docker'].map((t) => (
                      <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-500">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <button className="px-4 py-2 rounded-xl border border-dashed border-blue-500 text-blue-500 font-bold text-xs flex items-center gap-1.5 cursor-pointer">
                  <Plus size={14} />
                  <span>Add Project</span>
                </button>
              </div>
            )}

            {/* TAB CONTENT: 5. SOCIAL LINKS */}
            {activeTab === 'social' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">LinkedIn Profile</label>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/username"
                    value={linkedinUrl}
                    onChange={(e) => {
                      setLinkedinUrl(e.target.value);
                      handleFieldChange();
                    }}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs ${isDarkMode ? 'bg-[#0E0E14] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'}`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">GitHub Profile</label>
                  <input
                    type="url"
                    placeholder="https://github.com/username"
                    value={githubUrl}
                    onChange={(e) => {
                      setGithubUrl(e.target.value);
                      handleFieldChange();
                    }}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs ${isDarkMode ? 'bg-[#0E0E14] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'}`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Personal Portfolio / Website</label>
                  <input
                    type="url"
                    placeholder="https://yourportfolio.dev"
                    value={portfolioUrl}
                    onChange={(e) => {
                      setPortfolioUrl(e.target.value);
                      handleFieldChange();
                    }}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs ${isDarkMode ? 'bg-[#0E0E14] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'}`}
                  />
                </div>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer shadow-sm"
                >
                  Save Links
                </button>
              </div>
            )}

          </div>

        </main>
      </div>

      {/* ========================================================
          SHARE PROFILE MODAL
      ======================================================== */}
      <AnimatePresence>
        {showShareModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowShareModal(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`relative z-10 w-full max-w-md p-6 rounded-3xl border shadow-2xl ${isDarkMode ? 'bg-[#15151D] border-white/15 text-white' : 'bg-white border-slate-200 text-slate-900'}`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold">Share Public Profile</h3>
                <button onClick={() => setShowShareModal(false)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                  <X size={18} />
                </button>
              </div>

              <p className="text-xs text-slate-500 mb-4">
                Anyone with this link can view your verified placement scorecard, resume, and coding profiles.
              </p>

              <div className={`p-3 rounded-2xl border flex items-center justify-between gap-2 mb-4 ${isDarkMode ? 'bg-black/30 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                <span className="text-xs font-mono text-blue-500 truncate">
                  https://tejas-tech.in/profile/{firstName.toLowerCase()}-{lastName.toLowerCase()}
                </span>
                <button
                  onClick={handleCopyProfileLink}
                  className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold cursor-pointer shrink-0"
                >
                  {copiedLink ? 'Copied!' : 'Copy'}
                </button>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setShowShareModal(false)}
                  className={`px-5 py-2 rounded-xl text-xs font-bold ${isDarkMode ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-700'}`}
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
