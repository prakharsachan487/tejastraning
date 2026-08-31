import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  MapPin,
  Briefcase,
  IndianRupee,
  ExternalLink,
  RotateCcw,
  CheckCircle2,
  X,
  Sparkles,
  Building2,
  Globe,
  Mail,
  Send,
  ArrowRight,
  SlidersHorizontal,
  Upload,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { supabase } from '../lib/supabase';

export interface JobOpening {
  id: string | number;
  title: string;
  domain: 'Tech' | 'Non-Tech' | 'Academics' | 'Sales';
  type: 'Full-time' | 'Contract' | 'Part-time' | 'Remote Mentorship';
  location: string;
  locationCategory: 'Remote' | 'Bareilly' | 'Phagwara' | 'Vadodara' | 'Noida' | 'Bangalore';
  salary: string;
  postedDate: string; // '24 hrs', '3 days', '7 days', '30 days'
  postedDaysAgo: number;
  skills: string[];
  summary: string;
  responsibilities: string[];
  requirements: string[];
  openings: number;
}

const JOB_LISTINGS: JobOpening[] = [
  {
    id: 'job-1',
    title: 'Backend Engineer & Technical Mentor',
    domain: 'Tech',
    type: 'Full-time',
    location: 'Remote',
    locationCategory: 'Remote',
    salary: '₹6,00,000 - ₹10,00,000 / year',
    postedDate: '24 hrs ago',
    postedDaysAgo: 1,
    skills: ['Next.js', 'Node.js', 'AWS', 'Azure', 'Docker', 'Redis', 'PostgreSQL', 'MongoDB', 'Data Structures and Algorithms', 'Git Version Control', 'Unit Testing'],
    summary: 'Lead scalable backend curriculum design, build live sandbox code evaluation pipelines, and mentor final-year engineering students on microservices and API architectures.',
    responsibilities: [
      'Architect robust backend services for our live coding and mock interview platform.',
      'Guide students through distributed system design case studies and Redis/PostgreSQL optimizations.',
      'Conduct code reviews and 1-on-1 technical mock interviews.'
    ],
    requirements: [
      '2+ years of production experience with Node.js, Next.js, or Go/Java.',
      'Deep understanding of RESTful APIs, caching strategies, and SQL/NoSQL schema modeling.',
      'Passion for mentoring junior developers and engineering students.'
    ],
    openings: 3
  },
  {
    id: 'job-2',
    title: 'DSA & C++ Technical Trainer',
    domain: 'Tech',
    type: 'Full-time',
    location: 'India, Punjab (Phagwara / Onsite)',
    locationCategory: 'Phagwara',
    salary: '₹6,00,000 - ₹9,00,000 / year',
    postedDate: '3 days ago',
    postedDaysAgo: 3,
    skills: ['DSA', 'C++', 'Hackathons', 'LeetCode', 'Competitive Programming', 'Graph Algorithms', 'Dynamic Programming'],
    summary: 'Train university cohorts in advanced Data Structures & Algorithms, competitive programming patterns, and high-speed problem-solving for tier-1 tech placement drives.',
    responsibilities: [
      'Deliver engaging in-person DSA lectures and interactive problem-solving sprints.',
      'Curate weekly competitive coding contests and algorithmic challenge sets.',
      'Track individual student progress and conduct placement readiness diagnostics.'
    ],
    requirements: [
      'Strong competitive programming background (Knight on LeetCode / Candidate Master on Codeforces or equivalent).',
      'Flawless mastery over C++ STL, complexity analysis, trees, and graphs.',
      'Excellent verbal communication and cohort mentoring abilities.'
    ],
    openings: 2
  },
  {
    id: 'job-3',
    title: 'Business Analyst Instructor',
    domain: 'Non-Tech',
    type: 'Full-time',
    location: 'India, Uttar Pradesh (Bareilly / Onsite)',
    locationCategory: 'Bareilly',
    salary: '₹5,00,000 - ₹7,00,000 / year',
    postedDate: '24 hrs ago',
    postedDaysAgo: 1,
    skills: ['Python', 'SQL', 'Excel', 'Data Analysis', 'Presentation', 'Business Intelligence', 'Tableau'],
    summary: 'Instruct students in data-driven business analytics, financial modeling, SQL reporting, and executive client presentations for management and consulting roles.',
    responsibilities: [
      'Teach real-world business case studies, KPI modeling, and automated Excel reporting.',
      'Train students to query relational databases with SQL and build dashboard presentations.',
      'Organize business pitch competitions and mock interview prep.'
    ],
    requirements: [
      '1+ years experience in Business Analytics, Product Operations, or Consulting.',
      'Expertise in Advanced Excel, SQL, and business storytelling.',
      'Strong presentation skills and patience to mentor freshers.'
    ],
    openings: 2
  },
  {
    id: 'job-4',
    title: 'Technical Trainer (Full-Stack MERN)',
    domain: 'Tech',
    type: 'Full-time',
    location: 'India (Onsite / Hybrid)',
    locationCategory: 'Noida',
    salary: '₹5,00,000 - ₹7,50,000 / year',
    postedDate: '7 days ago',
    postedDaysAgo: 7,
    skills: ['MERN', 'React.js', 'Node.js', 'Express', 'MongoDB', 'Java', 'REST APIs', 'Tailwind CSS'],
    summary: 'Educate student batches on building full-stack cloud applications, full-lifecycle product architecture, and deploying portfolio-worthy SaaS projects.',
    responsibilities: [
      'Deliver structured classroom training on MongoDB, Express.js, React, and Node.js.',
      'Oversee capstone project development and production cloud deployments.',
      'Conduct weekly coding labs and debug student architecture blockers.'
    ],
    requirements: [
      'Hands-on experience delivering MERN stack applications.',
      'Proficiency in React Hooks, state management, and async Node.js APIs.',
      'Prior corporate or bootcamp training experience is a strong plus.'
    ],
    openings: 4
  },
  {
    id: 'job-5',
    title: 'Data Analytics Instructor',
    domain: 'Tech',
    type: 'Contract',
    location: 'India, Gujarat (Vadodara / Onsite)',
    locationCategory: 'Vadodara',
    salary: '₹4,00,000 - ₹6,00,000 / year',
    postedDate: '3 days ago',
    postedDaysAgo: 3,
    skills: ['Tableau', 'Data Visualization', 'Power BI', 'Statistical Analysis', 'Data Analytics', 'Python', 'Pandas'],
    summary: 'Deliver high-impact hands-on workshops in business intelligence tools, statistical analytics, ETL pipelines, and executive dashboards.',
    responsibilities: [
      'Teach data cleaning, exploratory data analysis, and dashboard design using Power BI and Tableau.',
      'Guide students through industry datasets (E-commerce, Healthcare, FinTech).',
      'Provide structured assignment evaluation and feedback.'
    ],
    requirements: [
      'Strong command of Power BI, Tableau, SQL, and Python for data analytics.',
      'Experience working with real-world business datasets and KPI dashboards.',
      'Great communication and student engagement skills.'
    ],
    openings: 2
  },
  {
    id: 'job-6',
    title: 'Software Development Facilitator (P)',
    domain: 'Tech',
    type: 'Full-time',
    location: 'India, Punjab (Onsite)',
    locationCategory: 'Phagwara',
    salary: '₹9,00,000 - ₹14,00,000 / year',
    postedDate: '7 days ago',
    postedDaysAgo: 7,
    skills: ['Data structures and algorithm', 'DSA', 'Competitive programming', 'System Design', 'Code Optimization'],
    summary: 'Senior role to spearhead university tech curriculum excellence, lead elite coding batches, and interface with tier-1 campus hiring partners.',
    responsibilities: [
      'Design master-level curricula for campus placement bootcamps.',
      'Lead top 5% student cohorts through FAANG-grade hard algorithm problems.',
      'Mentor junior trainers and calibrate evaluation benchmarks.'
    ],
    requirements: [
      '3+ years in software development or technical training.',
      'Outstanding track record in algorithm design and mentoring outcomes.',
      'Leadership quality with a student-first pedagogy.'
    ],
    openings: 1
  },
  {
    id: 'job-7',
    title: 'Technical Recruiter & Talent Liaison',
    domain: 'Non-Tech',
    type: 'Full-time',
    location: 'Remote',
    locationCategory: 'Remote',
    salary: '₹25,000 - ₹40,000 / month',
    postedDate: '24 hrs ago',
    postedDaysAgo: 1,
    skills: ['Applicant Tracking Systems', 'Technical Sourcing', 'IT Recruitment', 'Boolean Search', 'Technical Screening', 'Candidate Relationship Management', 'Talent Pipeline Management'],
    summary: 'Manage student placement pipelines, coordinate campus recruitment drives with hiring partners, and match top graduates to tier-1 tech openings.',
    responsibilities: [
      'Source, screen, and schedule candidates for partner hiring pipelines.',
      'Liaise between university training heads and corporate HR teams.',
      'Maintain recruiter relationships and organize campus placement drives.'
    ],
    requirements: [
      '1+ years experience in tech recruitment or talent acquisition.',
      'Familiarity with software engineering terminology and role requirements.',
      'Proactive communicator with exceptional relationship-building abilities.'
    ],
    openings: 3
  },
  {
    id: 'job-8',
    title: 'DSA + Aptitude Instructor',
    domain: 'Tech',
    type: 'Full-time',
    location: 'India, Maharashtra (Kolhapur / Hybrid)',
    locationCategory: 'Remote',
    salary: '₹4,50,000 - ₹6,50,000 / year',
    postedDate: '30 days ago',
    postedDaysAgo: 20,
    skills: ['DSA', 'Quantitative Aptitude', 'Logical Reasoning', 'C++', 'Java', 'Problem Solving'],
    summary: 'Deliver blended training covering foundational algorithmic thinking, data structures, and quantitative aptitude for first-round university placement tests.',
    responsibilities: [
      'Cover aptitude tricks, speed math, logical puzzles, and fundamental coding.',
      'Conduct timed mock exams replicating TCS NQT, Capgemini, and Infosys formats.',
      'Provide targeted weak-area remediation for students.'
    ],
    requirements: [
      'Solid command over quantitative aptitude and foundational DSA.',
      'Proven ability to explain complex mathematical logic with simplicity.',
      'Enthusiastic and motivating classroom presence.'
    ],
    openings: 2
  },
  {
    id: 'job-9',
    title: 'DSA + React.js Instructor',
    domain: 'Tech',
    type: 'Full-time',
    location: 'India, Uttar Pradesh (Lucknow / Remote)',
    locationCategory: 'Remote',
    salary: '₹5,00,000 - ₹8,00,000 / year',
    postedDate: '30 days ago',
    postedDaysAgo: 25,
    skills: ['DSA', 'React.js', 'JavaScript', 'TypeScript', 'Frontend Architecture', 'Redux', 'Live Coding'],
    summary: 'Teach modern frontend engineering alongside foundational data structures to prepare students for modern frontend and full-stack SDE hiring tracks.',
    responsibilities: [
      'Instruct students on React component lifecycle, custom hooks, and modern JavaScript ES6+.',
      'Integrate frontend system design and coding mock sessions.',
      'Guide students in building responsive, production-ready portfolio projects.'
    ],
    requirements: [
      '2+ years frontend development experience with React.js.',
      'Comfortable solving and teaching medium DSA problems.',
      'Clear, patient communication style.'
    ],
    openings: 2
  },
  {
    id: 'job-10',
    title: 'Weekend Mock Interviewer & System Design Mentor',
    domain: 'Tech',
    type: 'Remote Mentorship',
    location: 'Remote (Flexible Hours)',
    locationCategory: 'Remote',
    salary: '₹2,500 - ₹5,500 / session',
    postedDate: '24 hrs ago',
    postedDaysAgo: 1,
    skills: ['System Design', 'Distributed Systems', 'DSA', 'Mock Interviews', 'FAANG Prep', 'Kubernetes', 'Microservices'],
    summary: 'Conduct high-impact 1-on-1 mock interviews and system design feedback sessions for pre-final and final year students on weekends at your convenience.',
    responsibilities: [
      'Host 45-60 minute video mock technical interviews.',
      'Provide structured rubric scoring and actionable diagnostic feedback.',
      'Help students refine their technical storytelling and architecture choices.'
    ],
    requirements: [
      'Current Software Engineer / Tech Lead at a tier-1 product firm or high-growth startup.',
      'Prior experience clearing or conducting technical rounds.',
      'Calendar availability for 2-4 hours over weekends.'
    ],
    openings: 10
  }
];

const DOMAINS = ['All', 'Tech', 'Non-Tech', 'Academics', 'Sales'] as const;
const EMPLOYMENT_TYPES = ['All', 'Full-time', 'Contract', 'Part-time', 'Remote Mentorship'] as const;
const DATE_POSTED_OPTIONS = [
  { label: 'Any time', days: 365 },
  { label: '24 hrs', days: 1 },
  { label: '3 days', days: 3 },
  { label: '7 days', days: 7 },
  { label: '30 days', days: 30 }
];
const LOCATIONS = ['All', 'Remote', 'Bareilly', 'Phagwara', 'Vadodara', 'Noida', 'Bangalore'] as const;

function mapSupabaseJob(row: any): JobOpening {
  const dateStr = row.posted_date || row.created_at;
  let postedDaysAgo = 1;
  let postedDate = '24 hrs ago';
  if (dateStr) {
    const diffMs = Date.now() - new Date(dateStr).getTime();
    const days = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
    postedDaysAgo = days;
    if (days === 0) postedDate = 'Today';
    else if (days === 1) postedDate = '24 hrs ago';
    else if (days < 7) postedDate = `${days} days ago`;
    else if (days < 30) postedDate = `${Math.floor(days / 7)} weeks ago`;
    else postedDate = `${Math.floor(days / 30)} months ago`;
  }

  const parseArray = (val: any): string[] => {
    if (Array.isArray(val)) return val;
    if (typeof val === 'string') {
      try {
        const parsed = JSON.parse(val);
        if (Array.isArray(parsed)) return parsed;
      } catch {
        if (val.startsWith('{') && val.endsWith('}')) {
          return val.slice(1, -1).split(',').map((s: string) => s.replace(/^"|"$/g, '').trim());
        }
      }
      return [val];
    }
    return [];
  };

  return {
    id: row.id,
    title: row.title || 'Untitled Role',
    domain: (row.domain as JobOpening['domain']) || 'Tech',
    type: (row.job_type || row.type as JobOpening['type']) || 'Full-time',
    location: row.location || 'Remote',
    locationCategory: (row.location_category || row.locationCategory as JobOpening['locationCategory']) || 'Remote',
    salary: row.salary || 'Competitive',
    postedDate,
    postedDaysAgo,
    skills: parseArray(row.skills),
    summary: row.summary || row.description || '',
    responsibilities: parseArray(row.responsibilities),
    requirements: parseArray(row.requirements),
    openings: typeof row.openings === 'number' ? row.openings : 1,
  };
}

export function MentorJobPortal() {
  // Jobs State (Fetched from Supabase with static fallback)
  const [jobs, setJobs] = useState<JobOpening[]>(JOB_LISTINGS);
  const [isLoadingJobs, setIsLoadingJobs] = useState<boolean>(true);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedDatePosted, setSelectedDatePosted] = useState<string>('Any time');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [selectedSkill, setSelectedSkill] = useState<string>('All');

  // Modal / Drawer States
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Application Form State (Name, Email, Phone, Resume File OR Link)
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [resumeFileName, setResumeFileName] = useState('');
  const [resumeFileObject, setResumeFileObject] = useState<File | null>(null);
  const [resumeLink, setResumeLink] = useState('');

  // ─── Fetch Jobs from Supabase ─────────────────────────
  useEffect(() => {
    let isMounted = true;

    async function fetchJobs() {
      try {
        setIsLoadingJobs(true);
        const { data, error } = await supabase
          .from('mentor_jobs')
          .select('*')
          .order('id', { ascending: true });

        if (error) {
          console.warn('[Supabase] Could not fetch mentor_jobs, using default listings:', error.message);
          return;
        }

        if (data && data.length > 0 && isMounted) {
          const mapped = data.map((row) => mapSupabaseJob(row));
          setJobs(mapped);
        }
      } catch (err) {
        console.warn('[Supabase] Exception fetching mentor_jobs:', err);
      } finally {
        if (isMounted) {
          setIsLoadingJobs(false);
        }
      }
    }

    fetchJobs();

    return () => {
      isMounted = false;
    };
  }, []);

  // Extract all unique skills
  const allSkills = useMemo(() => {
    const skillsSet = new Set<string>();
    jobs.forEach(job => {
      job.skills.forEach(s => skillsSet.add(s));
    });
    return Array.from(skillsSet).slice(0, 14);
  }, [jobs]);

  // Filter logic
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(q);
        const matchesSkills = job.skills.some(s => s.toLowerCase().includes(q));
        const matchesLocation = job.location.toLowerCase().includes(q);
        const matchesDomain = job.domain.toLowerCase().includes(q);
        if (!matchesTitle && !matchesSkills && !matchesLocation && !matchesDomain) {
          return false;
        }
      }

      // Domain match
      if (selectedDomain !== 'All' && job.domain !== selectedDomain) {
        return false;
      }

      // Employment type match
      if (selectedType !== 'All' && job.type !== selectedType) {
        return false;
      }

      // Date posted match
      if (selectedDatePosted !== 'Any time') {
        const option = DATE_POSTED_OPTIONS.find(o => o.label === selectedDatePosted);
        if (option && job.postedDaysAgo > option.days) {
          return false;
        }
      }

      // Location match
      if (selectedLocation !== 'All') {
        if (selectedLocation === 'Remote') {
          if (!job.location.toLowerCase().includes('remote')) return false;
        } else {
          if (!job.location.toLowerCase().includes(selectedLocation.toLowerCase())) return false;
        }
      }

      // Skill match
      if (selectedSkill !== 'All' && !job.skills.includes(selectedSkill)) {
        return false;
      }

      return true;
    });
  }, [jobs, searchQuery, selectedDomain, selectedType, selectedDatePosted, selectedLocation, selectedSkill]);

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedDomain !== 'All' ||
    selectedType !== 'All' ||
    selectedDatePosted !== 'Any time' ||
    selectedLocation !== 'All' ||
    selectedSkill !== 'All';

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedDomain('All');
    setSelectedType('All');
    setSelectedDatePosted('Any time');
    setSelectedLocation('All');
    setSelectedSkill('All');
  };

  const handleOpenJobApply = (job: JobOpening) => {
    setSelectedJob(job);
    setIsApplyModalOpen(true);
    setApplySuccess(false);
    setSubmitError('');
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;

    if (!resumeFileName && !resumeLink.trim()) {
      setSubmitError('Please upload a resume file or provide a link.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      let uploadedResumePath: string | null = null;

      // 1. Upload resume to Supabase Storage if file object provided
      if (resumeFileObject) {
        try {
          const fileExt = resumeFileObject.name.split('.').pop() || 'pdf';
          const cleanFileName = resumeFileObject.name.replace(/[^a-zA-Z0-9._-]/g, '_');
          const storagePath = `mentor_${Date.now()}_${cleanFileName}`;

          const { data: uploadRes, error: uploadErr } = await supabase.storage
            .from('resumes')
            .upload(storagePath, resumeFileObject, {
              contentType: resumeFileObject.type || (fileExt === 'pdf' ? 'application/pdf' : 'application/octet-stream'),
              upsert: true
            });

          if (!uploadErr && uploadRes?.path) {
            uploadedResumePath = uploadRes.path;
          } else {
            uploadedResumePath = resumeFileName;
          }
        } catch (storageErr) {
          console.warn('[Supabase Storage] Fallback to file name:', storageErr);
          uploadedResumePath = resumeFileName;
        }
      } else if (resumeFileName) {
        uploadedResumePath = resumeFileName;
      }

      // 2. Parse numeric job_id
      const numericJobId = typeof selectedJob.id === 'number'
        ? selectedJob.id
        : parseInt(String(selectedJob.id).replace(/\D/g, ''), 10) || 1;

      // 3. Insert record into public.mentor_applications
      const { data: insertData, error: insertErr } = await supabase
        .from('mentor_applications')
        .insert([
          {
            job_id: numericJobId,
            full_name: applicantName.trim(),
            email: applicantEmail.trim(),
            phone: applicantPhone.trim(),
            resume_path: uploadedResumePath,
            resume_link: resumeLink.trim() || null,
            status: 'pending'
          }
        ])
        .select();

      if (insertErr) {
        console.error('[Supabase] Application submission error:', insertErr);
        setSubmitError(insertErr.message || 'Failed to submit application. Please try again.');
        setIsSubmitting(false);
        return;
      }

      console.log('[Supabase] Application submitted successfully:', insertData);
      setIsSubmitting(false);
      setApplySuccess(true);
    } catch (err: any) {
      console.error('[Supabase] Application submission exception:', err);
      setSubmitError(err?.message || 'Network error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setIsApplyModalOpen(false);
    setSelectedJob(null);
    setApplySuccess(false);
    setApplicantName('');
    setApplicantEmail('');
    setApplicantPhone('');
    setResumeFileName('');
    setResumeFileObject(null);
    setResumeLink('');
    setSubmitError('');
  };

  return (
    <section id="open-roles" className="py-20 bg-[#07070A] border-t border-white/10 relative">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-br from-[#FF4500]/10 via-[#FFA000]/5 to-transparent blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================
            01. SECTION HERO BANNER (Layout ref: Top Banner with World Map)
        ======================================================== */}
        <div className="rounded-3xl bg-gradient-to-br from-[#111116] via-[#0E0E14] to-[#0A0A0D] border border-white/10 p-8 sm:p-10 mb-12 shadow-2xl relative overflow-hidden">
          
          {/* Accent corner light */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#FF4500]/15 via-transparent to-transparent pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF4500]/10 border border-[#FF4500]/25 text-[#FFA000] text-xs font-mono font-semibold mb-4">
                <Sparkles size={13} className="text-[#FF4500]" />
                <span>Careers & Mentor Openings</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15] font-[family-name:var(--font-display)] mb-4">
                Elevate Your Career <br />
                <span className="bg-gradient-to-r from-[#FF4500] via-[#FF7A00] to-[#FFA000] bg-clip-text text-transparent">
                  With Us
                </span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
                Every great engineer starts with the right people. Find your place here as a full-time technical instructor, campus trainer, or flexible weekend mentor.
              </p>

              {/* Quick stats pills */}
              <div className="flex flex-wrap items-center gap-3 mt-6 pt-6 border-t border-white/10 text-xs font-medium text-slate-300">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-bold text-white">{JOB_LISTINGS.length}+ Active Openings</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                  <Globe size={13} className="text-[#38BDF8]" />
                  <span>Remote & Campus Hybrid</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                  <IndianRupee size={13} className="text-[#FFA000]" />
                  <span>Transparent Compensation</span>
                </div>
              </div>
            </div>

            {/* Right Visualizer: Stylized Map & Mentor Nodes */}
            <div className="lg:col-span-5 relative hidden sm:block">
              <div className="relative rounded-2xl bg-[#14141C]/80 border border-white/10 p-6 overflow-hidden">
                
                {/* Stylized world dot matrix grid */}
                <div className="h-44 w-full relative flex items-center justify-center">
                  <svg className="w-full h-full opacity-30" viewBox="0 0 400 180" fill="none">
                    <pattern id="dotGrid" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="1.5" fill="#FF4500" fillOpacity="0.6" />
                    </pattern>
                    <rect width="400" height="180" fill="url(#dotGrid)" />
                    {/* Connection arcs */}
                    <path d="M 60 90 Q 140 20 220 70 T 350 110" stroke="#FF4500" strokeWidth="1.5" strokeDasharray="4 4" fill="none" opacity="0.6" />
                    <path d="M 100 130 Q 200 150 320 60" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="3 3" fill="none" opacity="0.5" />
                  </svg>

                  {/* Mentor avatar pin 1 */}
                  <div className="absolute top-4 left-10 flex items-center gap-2 bg-[#1C1C26] border border-orange-500/40 rounded-full px-2 py-1 shadow-lg shadow-orange-500/20">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                      alt="Mentor"
                      className="w-6 h-6 rounded-full object-cover border border-white/20"
                    />
                    <span className="text-[10px] font-mono font-bold text-white">Noida HQ</span>
                  </div>

                  {/* Mentor avatar pin 2 */}
                  <div className="absolute bottom-6 left-28 flex items-center gap-2 bg-[#1C1C26] border border-blue-500/40 rounded-full px-2 py-1 shadow-lg shadow-blue-500/20">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                      alt="Mentor"
                      className="w-6 h-6 rounded-full object-cover border border-white/20"
                    />
                    <span className="text-[10px] font-mono font-bold text-white">Phagwara</span>
                  </div>

                  {/* Mentor avatar pin 3 */}
                  <div className="absolute top-10 right-8 flex items-center gap-2 bg-[#1C1C26] border border-emerald-500/40 rounded-full px-2 py-1 shadow-lg shadow-emerald-500/20">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80"
                      alt="Mentor"
                      className="w-6 h-6 rounded-full object-cover border border-white/20"
                    />
                    <span className="text-[10px] font-mono font-bold text-white">Remote</span>
                  </div>

                  {/* Center live pulse */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-[#FF4500]/20 border border-[#FF4500]/40 flex items-center justify-center animate-ping absolute inset-0 m-auto" />
                    <div className="w-8 h-8 rounded-full bg-[#FF4500] text-white flex items-center justify-center text-xs font-bold shadow-lg shadow-orange-500/50 relative z-10">
                      TJ
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Mentors active in 18+ cities</span>
                  <span className="text-emerald-400 font-bold">● Hiring actively</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================
            02. MAIN TWO-COLUMN SECTION: FILTERS & JOB LISTINGS
        ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ==========================================
              LEFT COLUMN: FILTERS SIDEBAR
          ========================================== */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-24 rounded-3xl bg-[#111116] border border-white/10 p-6 shadow-xl backdrop-blur-md">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2 text-white font-bold text-base font-[family-name:var(--font-display)]">
                  <SlidersHorizontal size={18} className="text-[#FFA000]" />
                  <span>Filters</span>
                  {hasActiveFilters && (
                    <span className="w-2 h-2 rounded-full bg-[#FF4500]" />
                  )}
                </div>

                {hasActiveFilters && (
                  <button
                    onClick={handleClearFilters}
                    className="text-xs text-slate-400 hover:text-[#FFA000] flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <RotateCcw size={12} />
                    <span>Clear</span>
                  </button>
                )}
              </div>

              {/* 1. Search Box */}
              <div className="mb-6">
                <div className="relative">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search job title, skills..."
                    className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-[#09090D] border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#FF4500] transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              </div>

              {/* 2. Domain Filter */}
              <div className="mb-6">
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-2.5 font-bold">
                  Domain
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {DOMAINS.map((domain) => {
                    const isSelected = selectedDomain === domain;
                    return (
                      <button
                        key={domain}
                        onClick={() => setSelectedDomain(domain)}
                        className={`text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#FF4500]/15 border-[#FF4500] text-[#FFA000] font-bold shadow-sm shadow-orange-500/20'
                            : 'bg-[#09090D] border-white/10 text-slate-300 hover:border-white/20 hover:text-white'
                        }`}
                      >
                        {domain}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Employment Type Filter */}
              <div className="mb-6">
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-2.5 font-bold">
                  Employment Type
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {EMPLOYMENT_TYPES.map((type) => {
                    const isSelected = selectedType === type;
                    return (
                      <button
                        key={type}
                        onClick={() => setSelectedType(type)}
                        className={`text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#38BDF8]/15 border-[#38BDF8] text-[#38BDF8] font-bold shadow-sm shadow-blue-500/20'
                            : 'bg-[#09090D] border-white/10 text-slate-300 hover:border-white/20 hover:text-white'
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. Date Posted */}
              <div className="mb-6">
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-2.5 font-bold">
                  Date Posted
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {DATE_POSTED_OPTIONS.map((opt) => {
                    const isSelected = selectedDatePosted === opt.label;
                    return (
                      <button
                        key={opt.label}
                        onClick={() => setSelectedDatePosted(opt.label)}
                        className={`text-xs px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-500/15 border-emerald-500 text-emerald-400 font-bold'
                            : 'bg-[#09090D] border-white/10 text-slate-300 hover:border-white/20 hover:text-white'
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 5. Location */}
              <div className="mb-6">
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-2.5 font-bold">
                  Location
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {LOCATIONS.map((loc) => {
                    const isSelected = selectedLocation === loc;
                    return (
                      <button
                        key={loc}
                        onClick={() => setSelectedLocation(loc)}
                        className={`text-xs px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1 ${
                          isSelected
                            ? 'bg-[#FFA000]/15 border-[#FFA000] text-[#FFA000] font-bold'
                            : 'bg-[#09090D] border-white/10 text-slate-300 hover:border-white/20 hover:text-white'
                        }`}
                      >
                        <MapPin size={11} className={isSelected ? 'text-[#FFA000]' : 'text-slate-400'} />
                        <span>{loc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 6. Popular Skills Filter */}
              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-2.5 font-bold">
                  Skills & Tech Stack
                </label>
                <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                  {allSkills.map((skill) => {
                    const isSelected = selectedSkill === skill;
                    return (
                      <button
                        key={skill}
                        onClick={() => setSelectedSkill(isSelected ? 'All' : skill)}
                        className={`text-[11px] px-2.5 py-1 rounded-md border font-mono transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#FF4500] border-[#FF4500] text-white font-bold'
                            : 'bg-[#09090D] border-white/10 text-slate-400 hover:text-slate-200 hover:border-white/20'
                        }`}
                      >
                        {skill}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>

          {/* ==========================================
              RIGHT COLUMN: JOB CARDS LIST
          ========================================== */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Header info bar */}
            <div className="flex items-center justify-between px-2 py-1 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <span>Showing <span className="font-bold text-white">{filteredJobs.length}</span> positions</span>
                {isLoadingJobs && (
                  <span className="inline-block w-3 h-3 border-2 border-orange-500/30 border-t-[#FF4500] rounded-full animate-spin" />
                )}
                {hasActiveFilters && <span className="text-[#FFA000] ml-1">(Filtered)</span>}
              </div>
              <div className="text-[11px] font-mono text-slate-400">
                Sorted by: <span className="text-slate-200">Recommended</span>
              </div>
            </div>

            {/* Empty State */}
            {filteredJobs.length === 0 && (
              <div className="rounded-3xl bg-[#111116] border border-white/10 p-12 text-center">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 mx-auto mb-4">
                  <Search size={24} />
                </div>
                <h3 className="text-lg font-bold text-white mb-1 font-[family-name:var(--font-display)]">
                  No open positions found
                </h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto mb-6">
                  Try clearing some filters or searching with different keywords like 'DSA', 'Remote', or 'Full-time'.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="btn-pill-secondary text-xs py-2.5 px-6 cursor-pointer"
                >
                  <RotateCcw size={14} />
                  <span>Reset All Filters</span>
                </button>
              </div>
            )}

            {/* List of Job Cards */}
            {filteredJobs.map((job) => {
              return (
                <motion.div
                  key={job.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-3xl bg-[#111116] border border-white/10 hover:border-[#FF4500]/40 transition-all p-6 sm:p-7 shadow-lg group relative overflow-hidden"
                >
                  {/* Subtle hover accent gradient */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#FF4500]/5 via-transparent to-transparent pointer-events-none group-hover:from-[#FF4500]/10 transition-colors" />

                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                    <div>
                      {/* Job Title & Badges */}
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#FFA000] transition-colors font-[family-name:var(--font-display)]">
                          {job.title}
                        </h3>
                        
                        <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold border ${
                          job.type === 'Full-time'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : job.type === 'Contract'
                            ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                            : 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                        }`}>
                          {job.type}
                        </span>
                      </div>

                      {/* Meta info row */}
                      <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-300 font-medium">
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <Briefcase size={14} className="text-[#FF4500]" />
                          <span>{job.domain}</span>
                        </div>

                        <div className="flex items-center gap-1.5 text-slate-400">
                          <MapPin size={14} className="text-[#38BDF8]" />
                          <span>{job.location}</span>
                        </div>

                        <div className="flex items-center gap-1.5 text-slate-300 font-mono">
                          <IndianRupee size={14} className="text-[#FFA000]" />
                          <span className="font-bold text-white">{job.salary}</span>
                        </div>
                      </div>
                    </div>

                    {/* Desktop View & Apply Button */}
                    <div className="hidden sm:block shrink-0">
                      <button
                        onClick={() => handleOpenJobApply(job)}
                        className="btn-pill-primary text-xs py-2.5 px-5 font-bold cursor-pointer flex items-center gap-1.5 shadow-md shadow-orange-500/10"
                      >
                        <span>View Job & Apply</span>
                        <ExternalLink size={13} />
                      </button>
                    </div>
                  </div>

                  {/* Skills tags list */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5 mb-4">
                    {job.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-[#09090D] text-slate-300 border border-white/10"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Mobile Action Button & Posted Date */}
                  <div className="flex items-center justify-between pt-2 text-[11px] font-mono text-slate-400">
                    <span>Posted {job.postedDate}</span>
                    <div className="sm:hidden">
                      <button
                        onClick={() => handleOpenJobApply(job)}
                        className="btn-pill-primary text-xs py-2 px-4 font-bold cursor-pointer flex items-center gap-1.5"
                      >
                        <span>View & Apply</span>
                        <ExternalLink size={12} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}

          </div>

        </div>

        {/* ========================================================
            03. CONNECT WITH US SECTION (Layout ref: Bottom Banner)
        ======================================================== */}
        <div className="mt-16 rounded-3xl bg-gradient-to-br from-[#111116] via-[#0E0E14] to-[#0A0A0D] border border-white/10 p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Info */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src="/grow360-logo.png"
                  alt="Grow360 Logo"
                  className="h-9 w-auto object-contain rounded-lg"
                />
                <h3 className="text-2xl sm:text-3xl font-black text-white font-[family-name:var(--font-display)]">
                  Connect With <span className="italic font-serif text-[#00B4D8]">Us</span>
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg">
                At Grow360, we believe great work happens when talented instructors and mentors are given the trust, tools, and environment they need to thrive. We are building something we are proud of, and we would love for you to be part of it.
              </p>

              {/* Office & Website Details */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#09090D] border border-white/10">
                  <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-[#FF4500] shrink-0">
                    <Building2 size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Main Office</div>
                    <div className="text-[11px] text-slate-400">Gurugram / Noida, National Capital Region (NCR), India</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#09090D] border border-white/10">
                  <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-[#38BDF8] shrink-0">
                    <Globe size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Website & Mentor Portal</div>
                    <a
                      href="https://tejas-tech.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-[#38BDF8] hover:underline"
                    >
                      https://tejas-tech.in
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#09090D] border border-white/10">
                  <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-[#22C55E] shrink-0">
                    <Mail size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Direct Recruitment Contact</div>
                    <div className="text-[11px] text-slate-300 font-mono">careers@tejas-tech.in</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Interactive Campus Map / Hub Network Visualizer */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl bg-[#09090D] border border-white/10 p-6 relative overflow-hidden">
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-mono font-bold text-white">Campus Centers & Partner Nodes</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10">
                    50+ Campuses
                  </span>
                </div>

                {/* Node Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { city: 'Noida Hub', state: 'Uttar Pradesh', status: 'Active Training', color: '#FF4500' },
                    { city: 'Phagwara', state: 'Punjab Hub', status: 'Batch #14 Live', color: '#38BDF8' },
                    { city: 'Vadodara', state: 'Gujarat Hub', status: 'Analytics Lab', color: '#FFA000' },
                    { city: 'Bareilly', state: 'UP East Hub', status: 'Campus Program', color: '#22C55E' },
                    { city: 'Kolhapur', state: 'Maharashtra Hub', status: 'Aptitude & DSA', color: '#8B5CF6' },
                    { city: 'Remote Cohort', state: 'Pan-India', status: '1-on-1 Mocks', color: '#EC4899' },
                  ].map((hub, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-[#111116] border border-white/10 hover:border-white/20 transition-all">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: hub.color }} />
                        <span className="text-xs font-bold text-white">{hub.city}</span>
                      </div>
                      <div className="text-[10px] text-slate-400">{hub.state}</div>
                      <div className="text-[9px] font-mono text-slate-500 mt-1">{hub.status}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>Powered by Grow360 Engineering Guild</span>
                  <span className="text-slate-300">Updated Today</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* ========================================================
          04. VIEW JOB DETAILS & APPLICATION MODAL
      ======================================================== */}
      <AnimatePresence>
        {isApplyModalOpen && selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl rounded-3xl bg-[#111116] border border-white/15 p-6 sm:p-8 shadow-2xl shadow-black z-10 text-slate-100 max-h-[90vh] overflow-y-auto"
            >
              {/* Glow Accent */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF4500]/10 blur-[100px] pointer-events-none rounded-full" />

              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              {applySuccess ? (
                /* Success State */
                <div className="text-center py-10 px-4">
                  <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-6 shadow-lg shadow-emerald-500/20">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="text-2xl font-extrabold text-white mb-2 font-[family-name:var(--font-display)]">
                    Application Submitted!
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto mb-6 leading-relaxed">
                    Thank you for applying for <span className="text-white font-semibold">{selectedJob.title}</span>. Our engineering & talent team will review your profile and contact you within 24–48 hours.
                  </p>
                  <button
                    onClick={handleCloseModal}
                    className="btn-pill-primary py-3 px-8 text-xs font-bold cursor-pointer"
                  >
                    <span>Done</span>
                  </button>
                </div>
              ) : (
                <div>
                  {/* Job Header */}
                  <div className="mb-6 pb-6 border-b border-white/10">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-[#FF4500]/15 text-[#FFA000] border border-[#FF4500]/30">
                        {selectedJob.domain}
                      </span>
                      <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        {selectedJob.type}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-[family-name:var(--font-display)] mb-3">
                      {selectedJob.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-300">
                      <div className="flex items-center gap-1 text-slate-400">
                        <MapPin size={14} className="text-[#38BDF8]" />
                        <span>{selectedJob.location}</span>
                      </div>
                      <div className="flex items-center gap-1 font-mono text-[#FFA000]">
                        <IndianRupee size={14} />
                        <span className="font-bold text-white">{selectedJob.salary}</span>
                      </div>
                    </div>
                  </div>

                  {/* Summary & Responsibilities */}
                  <div className="space-y-4 mb-6 text-xs sm:text-sm text-slate-300">
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-1.5">
                        About The Role
                      </h4>
                      <p className="leading-relaxed">{selectedJob.summary}</p>
                    </div>

                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-1.5">
                        Key Responsibilities
                      </h4>
                      <ul className="space-y-1.5 list-disc list-inside text-slate-300">
                        {selectedJob.responsibilities.map((r, i) => (
                          <li key={i} className="leading-relaxed">{r}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-1.5">
                        Requirements & Skills
                      </h4>
                      <ul className="space-y-1.5 list-disc list-inside text-slate-300">
                        {selectedJob.requirements.map((req, i) => (
                          <li key={i} className="leading-relaxed">{req}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Quick Application Form (Name, Email, Phone, Resume) */}
                  <div className="p-5 rounded-2xl bg-[#09090D] border border-white/10 mb-6">
                    <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                      <Send size={15} className="text-[#FF4500]" />
                      <span>Apply for this position</span>
                    </h4>

                    {submitError && (
                      <div className="mb-4 p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                        <AlertCircle size={15} className="shrink-0 text-rose-400" />
                        <span>{submitError}</span>
                      </div>
                    )}

                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      {/* Row 1: Full Name & Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-mono text-slate-400 mb-1">
                            Full Name <span className="text-[#FF4500]">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={applicantName}
                            onChange={(e) => setApplicantName(e.target.value)}
                            placeholder="e.g. Rahul Sharma"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-[#111116] border border-white/10 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-[#FF4500]"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono text-slate-400 mb-1">
                            Work / Personal Email <span className="text-[#FF4500]">*</span>
                          </label>
                          <input
                            type="email"
                            required
                            value={applicantEmail}
                            onChange={(e) => setApplicantEmail(e.target.value)}
                            placeholder="rahul@example.com"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-[#111116] border border-white/10 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-[#FF4500]"
                          />
                        </div>
                      </div>

                      {/* Row 2: Phone Number */}
                      <div>
                        <label className="block text-[11px] font-mono text-slate-400 mb-1">
                          Phone Number <span className="text-[#FF4500]">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={applicantPhone}
                          onChange={(e) => setApplicantPhone(e.target.value)}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#111116] border border-white/10 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-[#FF4500]"
                        />
                      </div>

                      {/* Row 3: Resume (Upload File OR Paste Link - Either one is required) */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="block text-[11px] font-mono text-slate-300">
                            Resume / CV <span className="text-[#FF4500]">*</span>
                          </label>
                          <span className="text-[10px] font-mono text-[#FFA000] bg-[#FFA000]/10 border border-[#FFA000]/20 px-2 py-0.5 rounded-full">
                            Upload File OR Paste Link (Any one)
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {/* Option 1: File Upload */}
                          <div>
                            <label className={`w-full px-3.5 py-2.5 rounded-xl border ${
                              resumeFileName 
                                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300' 
                                : 'bg-[#111116] border-dashed border-white/20 hover:border-[#FF4500]/50 text-slate-300'
                            } text-xs flex items-center justify-between cursor-pointer transition-all group h-[42px]`}>
                              <div className="flex items-center gap-2 overflow-hidden">
                                <Upload size={14} className={`${resumeFileName ? 'text-emerald-400' : 'text-[#FFA000]'} shrink-0 group-hover:scale-110 transition-transform`} />
                                <span className="truncate">
                                  {resumeFileName ? resumeFileName : 'Upload PDF / DOC file'}
                                </span>
                              </div>
                              <span className="text-[10px] font-mono font-bold text-slate-400 bg-white/5 px-2 py-0.5 rounded shrink-0">
                                {resumeFileName ? 'Change' : 'Browse'}
                              </span>
                              <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    setResumeFileName(file.name);
                                    setResumeFileObject(file);
                                  }
                                }}
                              />
                            </label>
                          </div>

                          {/* Option 2: Link */}
                          <div>
                            <input
                              type="url"
                              placeholder="Or paste Drive / Portfolio link..."
                              value={resumeLink}
                              onChange={(e) => setResumeLink(e.target.value)}
                              className={`w-full px-3.5 py-2.5 rounded-xl bg-[#111116] border ${
                                resumeLink.trim()
                                  ? 'border-emerald-500/40 text-emerald-300 focus:border-emerald-500'
                                  : 'border-white/10 text-white placeholder:text-slate-600 focus:border-[#FF4500]'
                              } text-xs focus:outline-none transition-all h-[42px]`}
                            />
                          </div>
                        </div>

                        {/* Confirmation Badge */}
                        {(resumeFileName || resumeLink.trim()) && (
                          <div className="mt-2 flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl">
                            <CheckCircle2 size={13} className="shrink-0" />
                            <span className="truncate">
                              {resumeFileName && resumeLink.trim()
                                ? `Resume: File (${resumeFileName}) & Link provided`
                                : resumeFileName
                                ? `Attached File: ${resumeFileName}`
                                : `Resume Link: ${resumeLink.trim()}`}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting || (!resumeFileName && !resumeLink.trim())}
                          className="w-full btn-pill-primary py-3.5 text-xs font-bold cursor-pointer justify-center flex items-center gap-2 shadow-lg shadow-orange-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 size={15} className="animate-spin" />
                              <span>Submitting Application to Database...</span>
                            </>
                          ) : (
                            <>
                              <span>Submit Application for {selectedJob.title}</span>
                              <ArrowRight size={14} />
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
