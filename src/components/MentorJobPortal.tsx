import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  MapPin,
  Briefcase,
  IndianRupee,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  Send,
  ArrowRight,
  Upload,
  AlertCircle,
  Loader2,
  ArrowLeft,
  Calendar,
  Layers,
  Award
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAdminData, type JobOpening } from '../context/AdminDataContext';

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
    skills: ['Data Visualization', 'SQL', 'Tableau', 'Power BI', 'Advanced Excel', 'Financial Modeling', 'Business Strategy'],
    summary: 'Instruct pre-placement cohorts in data-driven decision making, business analytics workflows, SQL querying, and executive KPI dashboard creation.',
    responsibilities: [
      'Deliver case study-driven lectures on business analytics and financial modeling.',
      'Mentor students on creating compelling portfolio dashboards in Tableau & Power BI.',
      'Simulate client-facing presentation rounds and business case interviews.'
    ],
    requirements: [
      '1+ years experience in business analysis, consulting, or analytics.',
      'Hands-on expertise with SQL, Power BI/Tableau, and Advanced Excel modeling.',
      'Strong problem-solving orientation and storytelling ability.'
    ],
    openings: 1
  },
  {
    id: 'job-4',
    title: 'Technical Trainer (Java & Cloud Ecosystem)',
    domain: 'Tech',
    type: 'Full-time',
    location: 'India, Gujarat (Vadodara / Onsite)',
    locationCategory: 'Vadodara',
    salary: '₹6,00,000 - ₹8,50,000 / year',
    postedDate: '7 days ago',
    postedDaysAgo: 7,
    skills: ['Java', 'Spring Boot', 'AWS', 'Microservices', 'REST APIs', 'MySQL', 'Hibernate', 'Docker'],
    summary: 'Anchor the enterprise Java training track, teaching Spring Boot microservices, cloud deployments, and production backend best practices to pre-final year students.',
    responsibilities: [
      'Teach Java fundamentals, OOP, Spring Boot, and enterprise cloud architecture.',
      'Build end-to-end full stack capstone projects with student teams.',
      'Evaluate campus batch coding challenges and provide automated test feedback.'
    ],
    requirements: [
      '2+ years backend engineering or technical instruction experience with Java/Spring.',
      'Solid command over RDBMS, JPA/Hibernate, and cloud basics on AWS.',
      'Good pedagogical instincts and student empathy.'
    ],
    openings: 2
  },
  {
    id: 'job-5',
    title: 'Full Stack Web Development Mentor',
    domain: 'Tech',
    type: 'Full-time',
    location: 'India, Uttar Pradesh (Noida / Hybrid)',
    locationCategory: 'Noida',
    salary: '₹7,00,000 - ₹11,00,000 / year',
    postedDate: '24 hrs ago',
    postedDaysAgo: 1,
    skills: ['React.js', 'Next.js', 'Node.js', 'TypeScript', 'TailwindCSS', 'PostgreSQL', 'Prisma', 'GraphQL', 'Vercel'],
    summary: 'Lead our modern web development track, guiding college developers from JavaScript fundamentals to full-stack Next.js production deployments.',
    responsibilities: [
      'Deliver interactive live coding sessions covering modern full-stack web stacks.',
      'Review student GitHub pull requests and coach clean architecture principles.',
      'Conduct mock system architecture interviews for product startup roles.'
    ],
    requirements: [
      'Strong portfolio of shipped web applications with React/Next.js and Node.js.',
      'Fluency in TypeScript and modern frontend/backend patterns.',
      'Active open source presence or mentorship track record is a strong plus.'
    ],
    openings: 4
  },
  {
    id: 'job-6',
    title: 'Aptitude & Logical Reasoning Trainer',
    domain: 'Academics',
    type: 'Contract',
    location: 'Remote',
    locationCategory: 'Remote',
    salary: '₹35,000 - ₹60,000 / month',
    postedDate: '30 days ago',
    postedDaysAgo: 28,
    skills: ['Quantitative Aptitude', 'Logical Reasoning', 'Verbal Ability', 'Speed Math', 'TCS NQT Prep', 'Campus Filtering Tests'],
    summary: 'Prepare engineering students for national campus screening tests (AMCAT, CoCubes, TCS NQT, eLitmus) with high-speed mental math and shortcut strategies.',
    responsibilities: [
      'Conduct daily speed problem-solving webinars across multiple college batches.',
      'Create high-yield question sets and timed diagnostic mock tests.',
      'Identify speed bottlenecks and teach shortcut reasoning frameworks.'
    ],
    requirements: [
      'Top percentiles in CAT, GRE, or national competitive aptitude exams.',
      'Demonstrated experience boosting student clearing rates in placement tests.',
      'High-energy, engaging online delivery style.'
    ],
    openings: 5
  },
  {
    id: 'job-7',
    title: 'Campus Institutional Sales Manager',
    domain: 'Sales',
    type: 'Full-time',
    location: 'India, Karnataka (Bangalore / Onsite)',
    locationCategory: 'Bangalore',
    salary: '₹8,00,000 - ₹14,00,000 / year',
    postedDate: '3 days ago',
    postedDaysAgo: 3,
    skills: ['B2B Sales', 'EdTech', 'Campus Outreach', 'College TPO Relations', 'Lead Generation', 'Contract Negotiation'],
    summary: 'Expand Grow360 placement infrastructure footprint across leading university colleges, polytechnics, and engineering institutions across South India.',
    responsibilities: [
      'Partner with College Directors, Deans, and TPOs to integrate Grow360 training platforms.',
      'Manage the institutional sales pipeline from discovery demos to contract closure.',
      'Coordinate with academic operations for smooth campus onboarding.'
    ],
    requirements: [
      '3+ years B2B institutional sales experience in Higher Education or EdTech.',
      'Established network with engineering college placement directors.',
      'Excellent negotiation and relationship-building skills.'
    ],
    openings: 2
  },
  {
    id: 'job-8',
    title: 'Python & AI/ML Curriculum Specialist',
    domain: 'Tech',
    type: 'Full-time',
    location: 'Remote',
    locationCategory: 'Remote',
    salary: '₹7,50,000 - ₹12,00,000 / year',
    postedDate: '24 hrs ago',
    postedDaysAgo: 1,
    skills: ['Python', 'PyTorch', 'TensorFlow', 'Scikit-Learn', 'GenAI', 'Prompt Engineering', 'LangChain', 'Computer Vision'],
    summary: 'Design cutting-edge machine learning and applied Generative AI projects that help college students stand out during tech placement drives.',
    responsibilities: [
      'Build hands-on ML and LLM application workshops for campus cohorts.',
      'Mentor students on publishing open-source models, Hugging Face spaces, and AI apps.',
      'Evaluate capstone ML implementations and guide architecture refinements.'
    ],
    requirements: [
      'Strong foundation in Python, mathematics for ML, and modern neural architectures.',
      'Experience building with LangChain, OpenAI APIs, or open-source LLMs.',
      'Passionate about simplifying complex concepts for undergraduates.'
    ],
    openings: 2
  },
  {
    id: 'job-9',
    title: 'Frontend React Development Instructor',
    domain: 'Tech',
    type: 'Part-time',
    location: 'Remote',
    locationCategory: 'Remote',
    salary: '₹40,000 - ₹75,000 / month',
    postedDate: '7 days ago',
    postedDaysAgo: 7,
    skills: ['React.js', 'JavaScript ES6+', 'HTML5', 'CSS3', 'TailwindCSS', 'Redux Toolkit', 'REST APIs', 'UI/UX Principles'],
    summary: 'Teach frontend engineering fundamentals, UI state management, and modern component architecture in flexible evening/weekend batches.',
    responsibilities: [
      'Conduct live component breakdown walkthroughs and code reviews.',
      'Teach industry best practices for accessibility, performance, and responsive layout.',
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
    }
    return [];
  };

  return {
    id: row.id,
    title: row.title || 'Instructor / Mentor Role',
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
  const { jobs: contextJobs, addApplication } = useAdminData();
  // Jobs State (Fetched from Supabase with context fallback)
  const [jobs, setJobs] = useState<JobOpening[]>(contextJobs && contextJobs.length > 0 ? contextJobs : JOB_LISTINGS);
  const [isLoadingJobs, setIsLoadingJobs] = useState<boolean>(false);

  useEffect(() => {
    if (contextJobs && contextJobs.length > 0) {
      setJobs(contextJobs);
    }
  }, [contextJobs]);

  // Filter States (Search & Domain)
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('All');

  // Selected Job for Full Page View
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
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

  // Filter logic (Search + Domain)
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const titleMatch = job.title.toLowerCase().includes(q);
        const descMatch = job.summary.toLowerCase().includes(q);
        const locationMatch = job.location.toLowerCase().includes(q);
        const skillMatch = job.skills.some(s => s.toLowerCase().includes(q));
        if (!titleMatch && !descMatch && !locationMatch && !skillMatch) {
          return false;
        }
      }

      // Domain match
      if (selectedDomain !== 'All' && job.domain !== selectedDomain) {
        return false;
      }

      return true;
    });
  }, [jobs, searchQuery, selectedDomain]);

  const hasActiveFilters = searchQuery !== '' || selectedDomain !== 'All';

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedDomain('All');
  };

  useEffect(() => {
    const checkHashJob = () => {
      const hash = window.location.hash;
      if (hash.includes('jobId=')) {
        const match = hash.match(/jobId=([^&]+)/);
        if (match && match[1]) {
          const targetId = decodeURIComponent(match[1]);
          const found = jobs.find(j => String(j.id) === targetId || String(j.id).toLowerCase() === targetId.toLowerCase());
          if (found) {
            setSelectedJob(found);
            setApplySuccess(false);
            setSubmitError('');
            window.scrollTo({ top: 0, behavior: 'instant' });
            document.documentElement.scrollTop = 0;
          }
        }
      }
    };

    checkHashJob();
    window.addEventListener('hashchange', checkHashJob);
    return () => window.removeEventListener('hashchange', checkHashJob);
  }, [jobs]);

  const handleOpenJobApply = (job: JobOpening) => {
    const targetUrl = `${window.location.origin}${window.location.pathname}#career?jobId=${encodeURIComponent(job.id)}`;
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCloseJobDetail = () => {
    setSelectedJob(null);
    setApplySuccess(false);
    setSubmitError('');
    setApplicantName('');
    setApplicantEmail('');
    setApplicantPhone('');
    setResumeFileName('');
    setResumeFileObject(null);
    setResumeLink('');
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
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
      if (supabase) {
        try {
          const { error: insertErr } = await supabase
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
            ]);
          if (insertErr) {
            console.warn('[Supabase] Mentor application insert warning:', insertErr.message);
          }
        } catch (sbErr) {
          console.warn('[Supabase] Mentor application exception:', sbErr);
        }
      }

      // 4. Record into AdminDataContext
      addApplication({
        jobId: selectedJob.id,
        jobTitle: selectedJob.title,
        fullName: applicantName.trim(),
        email: applicantEmail.trim(),
        phone: applicantPhone.trim(),
        resumeFileName: resumeFileName || uploadedResumePath || 'Resume Attached',
        resumeUrl: resumeLink.trim() || uploadedResumePath || '',
        portfolioLink: resumeLink.trim() || undefined,
        experience: 'Applied via Career Portal',
        notes: `Applied for ${selectedJob.title} (${selectedJob.type}, ${selectedJob.location})`,
      });

      setIsSubmitting(false);
      setApplySuccess(true);
    } catch (err: any) {
      // Fallback add to AdminDataContext
      if (selectedJob) {
        addApplication({
          jobId: selectedJob.id,
          jobTitle: selectedJob.title,
          fullName: applicantName.trim(),
          email: applicantEmail.trim(),
          phone: applicantPhone.trim(),
          resumeFileName: resumeFileName || 'Resume Attached',
          resumeUrl: resumeLink.trim() || '',
          portfolioLink: resumeLink.trim() || undefined,
          experience: 'Applied via Career Portal',
        });
      }
      setIsSubmitting(false);
      setApplySuccess(true);
    }
  };

  // =========================================================================
  // VIEW A: DEDICATED FULL-PAGE JOB DESCRIPTION & APPLICATION VIEW
  // =========================================================================
  if (selectedJob) {
    return (
      <section className="py-8 bg-[#F8F9FB] text-slate-100 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Breadcrumb & Navigation Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-black/8">
            <button
              onClick={handleCloseJobDetail}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-700 hover:text-slate-900 border border-black/8 transition-all cursor-pointer group"
            >
              <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />
              <span>Back to All Openings</span>
            </button>

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-slate-500">Careers</span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-600">{selectedJob.domain}</span>
              <span className="text-slate-600">/</span>
              <span className="text-[#2563EB] font-bold truncate max-w-[200px] sm:max-w-none">{selectedJob.title}</span>
            </div>
          </div>

          {/* Main 2-Column Dedicated Page Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* ── LEFT COLUMN (7 Cols): FULL JOB DESCRIPTION & REQUIREMENTS ── */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Job Header Hero Box */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white shadow-sm border border-black/8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-500/10 via-transparent to-transparent pointer-events-none blur-2xl" />

                {/* Domain & Type Badges */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#2563EB]/15 text-[#3B82F6] border border-[#2563EB]/30">
                    {selectedJob.domain}
                  </span>
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    {selectedJob.type}
                  </span>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 text-slate-700 border border-black/8">
                    {selectedJob.openings} Openings Available
                  </span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-[family-name:var(--font-display)] mb-4">
                  {selectedJob.title}
                </h1>

                <div className="flex flex-wrap items-center gap-5 text-xs sm:text-sm font-medium text-slate-700 pt-2 border-t border-black/5">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <MapPin size={16} className="text-[#38BDF8]" />
                    <span>{selectedJob.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-[#3B82F6]">
                    <IndianRupee size={16} />
                    <span className="font-bold text-slate-900">{selectedJob.salary}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-600 font-mono text-xs">
                    <Calendar size={14} className="text-slate-500" />
                    <span>Posted {selectedJob.postedDate}</span>
                  </div>
                </div>
              </div>

              {/* 01. About The Role */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white shadow-sm border border-black/8 shadow-lg">
                <h3 className="text-sm font-mono uppercase tracking-wider text-[#2563EB] font-bold mb-3 flex items-center gap-2">
                  <Briefcase size={16} />
                  <span>About The Role &amp; Mission</span>
                </h3>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {selectedJob.summary}
                </p>
              </div>

              {/* 02. Key Responsibilities */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white shadow-sm border border-black/8 shadow-lg">
                <h3 className="text-sm font-mono uppercase tracking-wider text-[#3B82F6] font-bold mb-4 flex items-center gap-2">
                  <Layers size={16} />
                  <span>Key Responsibilities</span>
                </h3>
                <ul className="space-y-3">
                  {selectedJob.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                      <div className="w-5 h-5 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/20 text-[#3B82F6] flex items-center justify-center shrink-0 mt-0.5 font-mono text-[10px]">
                        ✓
                      </div>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 03. Candidate Requirements */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white shadow-sm border border-black/8 shadow-lg">
                <h3 className="text-sm font-mono uppercase tracking-wider text-emerald-400 font-bold mb-4 flex items-center gap-2">
                  <Award size={16} />
                  <span>Candidate Requirements &amp; Background</span>
                </h3>
                <ul className="space-y-3">
                  {selectedJob.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 font-mono text-[10px]">
                        ★
                      </div>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* ── RIGHT COLUMN (5 Cols): DEDICATED STICKY APPLICATION FORM ── */}
            <div className="lg:col-span-5 lg:sticky lg:top-24">
              <div className="rounded-3xl bg-white shadow-sm border border-black/10 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#2563EB]/10 blur-3xl pointer-events-none rounded-full" />

                {applySuccess ? (
                  /* Success Notification State */
                  <div className="text-center py-10 px-2">
                    <div className="w-16 h-16 rounded-3xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto mb-6 shadow-xl shadow-emerald-500/20">
                      <CheckCircle2 size={36} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2 font-[family-name:var(--font-display)]">
                      Application Submitted!
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 max-w-sm mx-auto mb-6 leading-relaxed">
                      Thank you for applying for <span className="text-slate-900 font-semibold">{selectedJob.title}</span>. Our team will review your profile and contact you within 24–48 hours.
                    </p>
                    <button
                      onClick={handleCloseJobDetail}
                      className="btn-pill-primary py-3 px-8 text-xs font-bold cursor-pointer w-full justify-center"
                    >
                      <span>Return to All Openings</span>
                    </button>
                  </div>
                ) : (
                  /* Main Application Form */
                  <div>
                    <div className="mb-6">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/30 text-[#2563EB] text-xs font-mono font-semibold mb-2">
                        <Sparkles size={13} />
                        <span>Direct Application</span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 tracking-tight font-[family-name:var(--font-display)]">
                        Apply for this Role
                      </h3>
                      <p className="text-xs text-slate-600 mt-1">
                        Submit your details below. Our team responds within 24-48 hours.
                      </p>
                    </div>

                    {submitError && (
                      <div className="mb-4 p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                        <AlertCircle size={15} className="shrink-0 text-rose-400" />
                        <span>{submitError}</span>
                      </div>
                    )}

                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      {/* Full Name */}
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1.5">
                          Full Name <span className="text-[#2563EB]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={applicantName}
                          onChange={(e) => setApplicantName(e.target.value)}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-black/8 text-xs text-slate-900 placeholder:text-slate-600 focus:outline-none focus:border-[#2563EB] transition-colors"
                        />
                      </div>

                      {/* Email Address */}
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1.5">
                          Email Address <span className="text-[#2563EB]">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={applicantEmail}
                          onChange={(e) => setApplicantEmail(e.target.value)}
                          placeholder="rahul@example.com"
                          className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-black/8 text-xs text-slate-900 placeholder:text-slate-600 focus:outline-none focus:border-[#2563EB] transition-colors"
                        />
                      </div>

                      {/* Phone Number */}
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1.5">
                          Phone Number <span className="text-[#2563EB]">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={applicantPhone}
                          onChange={(e) => setApplicantPhone(e.target.value)}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-black/8 text-xs text-slate-900 placeholder:text-slate-600 focus:outline-none focus:border-[#2563EB] transition-colors"
                        />
                      </div>

                      {/* Resume Upload (File OR Link - Either is accepted) */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="block text-xs font-medium text-slate-700">
                            Resume / CV <span className="text-[#2563EB]">*</span>
                          </label>
                          <span className="text-[10px] font-mono text-[#3B82F6] bg-[#3B82F6]/10 border border-[#3B82F6]/20 px-2 py-0.5 rounded-full">
                            File OR Link
                          </span>
                        </div>
                        
                        <div className="space-y-2">
                          {/* File Upload Button */}
                          <label className={`w-full px-4 py-3 rounded-2xl border ${
                            resumeFileName 
                              ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300' 
                              : 'bg-slate-50 border-dashed border-white/20 hover:border-[#2563EB]/50 text-slate-700'
                          } text-xs flex items-center justify-between cursor-pointer transition-all group`}>
                            <div className="flex items-center gap-2 overflow-hidden">
                              <Upload size={15} className={`${resumeFileName ? 'text-emerald-400' : 'text-[#2563EB]'} shrink-0 group-hover:scale-110 transition-transform`} />
                              <span className="truncate">
                                {resumeFileName ? resumeFileName : 'Upload PDF / Word Resume'}
                              </span>
                            </div>
                            <span className="text-[10px] font-mono font-bold text-slate-600 bg-white/5 px-2 py-1 rounded-lg shrink-0">
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

                          {/* Or Link Input */}
                          <input
                            type="url"
                            placeholder="Or paste Google Drive / Portfolio Link..."
                            value={resumeLink}
                            onChange={(e) => setResumeLink(e.target.value)}
                            className={`w-full px-4 py-3 rounded-2xl bg-slate-50 border ${
                              resumeLink.trim()
                                ? 'border-emerald-500/40 text-emerald-300 focus:border-emerald-500'
                                : 'border-black/8 text-slate-900 placeholder:text-slate-600 focus:border-[#2563EB]'
                            } text-xs focus:outline-none transition-all`}
                          />
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

                      {/* Submit Button */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting || (!resumeFileName && !resumeLink.trim())}
                          className="w-full btn-pill-primary py-4 text-xs font-bold cursor-pointer justify-center flex items-center gap-2 shadow-lg shadow-[#2563EB]/ disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 size={15} className="animate-spin" />
                              <span>Submitting Application to Database...</span>
                            </>
                          ) : (
                            <>
                              <Send size={14} />
                              <span>Submit Application for {selectedJob.title}</span>
                            </>
                          )}
                        </button>
                      </div>

                      <p className="text-[10px] text-slate-500 text-center font-mono pt-1">
                        Your application is securely submitted to Grow360 Talent Guild.
                      </p>
                    </form>
                  </div>
                )}

              </div>
            </div>

          </div>

        </div>
      </section>
    );
  }

  // =========================================================================
  // VIEW B: JOB LISTINGS GRID WITH SEARCH & FILTERS (When no job is selected)
  // =========================================================================
  return (
    <section id="open-roles" className="py-8 bg-[#F8F9FB] text-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================
            01. SEARCH & CATEGORY FILTER ROW
        ======================================================== */}
        <div className="mb-10 space-y-4">
          
          {/* Main Search Bar & Quick Counters */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by job title, skill (e.g. Next.js, DSA, C++, AWS), or location..."
                className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-white shadow-sm border border-black/8 text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-[#2563EB] transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-500 hover:text-slate-900"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Clear All Filters Button */}
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-[#3B82F6] border border-[#3B82F6]/30 transition-all cursor-pointer"
              >
                <RotateCcw size={14} />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          {/* Quick Domain Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-wider shrink-0 mr-1 hidden sm:inline">
              Domain:
            </span>
            {DOMAINS.map((domain) => {
              const isActive = selectedDomain === domain;
              return (
                <button
                  key={domain}
                  onClick={() => setSelectedDomain(domain)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white shadow-md shadow-blue-500/20'
                      : 'bg-white shadow-sm text-slate-600 hover:text-slate-900 border border-black/8'
                  }`}
                >
                  {domain}
                </button>
              );
            })}
          </div>

        </div>

        {/* ========================================================
            02. JOB CARDS LIST (Balanced 2-Column Modern Grid)
        ======================================================== */}
        <div className="max-w-6xl mx-auto space-y-6">
          
          {/* Header info bar */}
          <div className="flex items-center justify-between px-2 py-1 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <span>Showing <span className="font-bold text-slate-900 text-sm">{filteredJobs.length}</span> positions</span>
              {isLoadingJobs && (
                <span className="inline-block w-3 h-3 border-2 border-cyan-500/30 border-t-[#00B4D8] rounded-full animate-spin" />
              )}
              {hasActiveFilters && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#2563EB]/15 text-[#2563EB] font-mono font-bold">
                  Filtered
                </span>
              )}
            </div>
            <div className="text-[11px] font-mono text-slate-600 hidden sm:block">
              Sorted by: <span className="text-slate-200">Recommended</span>
            </div>
          </div>

          {/* Empty State */}
          {filteredJobs.length === 0 && (
            <div className="rounded-3xl bg-white shadow-sm border border-black/8 p-12 text-center">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-black/8 flex items-center justify-center text-slate-600 mx-auto mb-4">
                <Search size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1 font-[family-name:var(--font-display)]">
                No open positions found
              </h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto mb-6">
                Try clearing your search query or selecting a different domain category.
              </p>
              <button
                onClick={handleClearFilters}
                className="btn-pill-secondary text-xs py-2.5 px-6 cursor-pointer"
              >
                <RotateCcw size={14} />
                <span>Reset Filters</span>
              </button>
            </div>
          )}

          {/* 2-Column Responsive Grid of Job Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {filteredJobs.map((job) => {
              return (
                <motion.div
                  key={job.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-3xl bg-white shadow-sm border border-black/8 hover:border-[#2563EB]/50 transition-all duration-300 p-6 sm:p-7 shadow-lg hover:shadow-2xl hover:shadow-cyan-500/10 group flex flex-col justify-between relative overflow-hidden"
                >
                  {/* Top Ambient Glow */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-blue-500/10 via-transparent to-transparent pointer-events-none group-hover:from-blue-500/20 transition-colors" />

                  <div>
                    {/* Top Badges & Posted Time */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold border ${
                          job.domain === 'Tech' 
                            ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' 
                            : job.domain === 'Non-Tech'
                            ? 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                            : job.domain === 'Academics'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : 'bg-[#2563EB]/10 text-[#3B82F6] border-[#2563EB]/30'
                        }`}>
                          {job.domain}
                        </span>

                        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 text-slate-700 border border-black/8 font-bold">
                          {job.type}
                        </span>
                      </div>

                      <span className="text-[10px] font-mono text-slate-500">
                        {job.postedDate}
                      </span>
                    </div>

                    {/* Job Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[#2563EB] transition-colors font-[family-name:var(--font-display)] leading-snug mb-2 line-clamp-1">
                      {job.title}
                    </h3>

                    {/* Location & Compensation Meta */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-700 mb-3.5">
                      <div className="flex items-center gap-1 text-slate-600">
                        <MapPin size={13} className="text-[#38BDF8] shrink-0" />
                        <span className="truncate max-w-[160px]">{job.location}</span>
                      </div>

                      <div className="flex items-center gap-1 font-mono text-[#3B82F6]">
                        <IndianRupee size={13} className="shrink-0" />
                        <span className="font-bold text-slate-900">{job.salary}</span>
                      </div>
                    </div>

                    {/* Summary Snippet */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2 mb-4">
                      {job.summary}
                    </p>

                    {/* Skills tags list */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {job.skills.slice(0, 4).map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-slate-50 text-slate-700 border border-black/8"
                        >
                          {skill}
                        </span>
                      ))}
                      {job.skills.length > 4 && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-lg bg-white/5 text-slate-500">
                          +{job.skills.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom: Openings & Apply Button */}
                  <div className="pt-4 border-t border-black/5 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-600">
                      {job.openings} {job.openings === 1 ? 'opening' : 'openings'}
                    </span>

                    <a
                      href={`#career?jobId=${encodeURIComponent(job.id)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.preventDefault();
                        handleOpenJobApply(job);
                      }}
                      className="btn-pill-primary text-xs py-2 px-4 font-bold cursor-pointer shadow-md shadow-cyan-500/15 flex items-center gap-1.5 group/btn"
                    >
                      <span>View &amp; Apply</span>
                      <ArrowRight size={13} className="group-hover/btn:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
