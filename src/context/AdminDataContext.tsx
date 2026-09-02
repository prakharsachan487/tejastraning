import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { supabase } from '../lib/supabase';

// ─── Interfaces ─────────────────────────────────────────────────────────────

export interface JobOpening {
  id: string | number;
  title: string;
  domain: 'Tech' | 'Non-Tech' | 'Academics' | 'Sales';
  type: 'Full-time' | 'Contract' | 'Part-time' | 'Remote Mentorship';
  location: string;
  locationCategory: 'Remote' | 'Bareilly' | 'Phagwara' | 'Vadodara' | 'Noida' | 'Bangalore';
  salary: string;
  postedDate: string;
  postedDaysAgo: number;
  skills: string[];
  summary: string;
  responsibilities: string[];
  requirements: string[];
  openings: number;
  createdAt?: string;
}

export interface GalleryMoment {
  id: string;
  title: string;
  category: string;
  categoryColor: string;
  description: string;
  stats: string;
  location: string;
  image: string;
  createdAt?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  summary: string;
  image: string;
  content: string[];
  tags?: string[];
  createdAt?: string;
}

export interface FormSubmission {
  id: string;
  fullName: string;
  collegeName: string;
  email: string;
  phone: string;
  profession: string;
  message?: string;
  source: 'HERO_REFERENCE_FORM' | 'MODAL_ENQUIRY' | 'CONSULTATION' | 'PARTNERSHIP' | 'GENERAL';
  status: 'NEW' | 'CONTACTED' | 'IN_PROGRESS' | 'CLOSED';
  notes?: string;
  createdAt: string;
}

export interface MentorItem {
  id: string;
  name: string;
  company: string;
  companyColor?: string;
  role: string;
  quote?: string;
  image: string;
  exp?: string;
  tag?: string;
  tilt?: string;
  displayLocation?: 'all' | 'landing' | 'evaluation' | 'hidden';
  order?: number;
  createdAt?: string;
}

export interface ModulePillar {
  id: string;
  number: string;
  title: string;
  badge: string;
  color: string;
  items: string[];
}

export interface CurriculumCourse {
  id: string;
  title: string;
  shortTitle: string;
  tagline: string;
  badge: string;
  order: number;
  targetGroups: string[];
  rollingTracks?: string[];
  outcome: string;
  pillars: ModulePillar[];
}

export interface AnnouncementItem {
  id: string;
  text: string;
  highlight: string;
  action: 'call' | 'programs' | 'roadmap' | 'mentor' | 'none';
  linkUrl?: string;
  active: boolean;
  order: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: 'Leadership & Founders' | 'Engineering & AI' | 'Placements & Corporate Relations' | 'Academic Curriculum';
  badge?: string;
  bio: string;
  photo: string;
  linkedinUrl?: string;
  email?: string;
  active: boolean;
  order: number;
}

export interface JobApplication {
  id: string;
  jobId?: string | number;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  resumeFileName?: string;
  resumeUrl?: string; // Direct link or uploaded path
  portfolioLink?: string;
  experience?: string;
  status: 'Pending' | 'Reviewing' | 'Shortlisted' | 'Interview Scheduled' | 'Offered' | 'Rejected';
  notes?: string;
  createdAt: string;
}

interface AdminDataContextType {
  // Announcements (Top Marquee Ticker)
  announcements: AnnouncementItem[];
  tickerSpeed: 'fast' | 'normal' | 'slow';
  setTickerSpeed: (speed: 'fast' | 'normal' | 'slow') => void;
  addAnnouncement: (item: Omit<AnnouncementItem, 'id'>) => void;
  updateAnnouncement: (id: string, updated: Partial<AnnouncementItem>) => void;
  deleteAnnouncement: (id: string) => void;
  toggleAnnouncementActive: (id: string) => void;

  // Team Members
  teamMembers: TeamMember[];
  addTeamMember: (member: Omit<TeamMember, 'id'>) => void;
  updateTeamMember: (id: string, updated: Partial<TeamMember>) => void;
  deleteTeamMember: (id: string) => void;
  toggleTeamMemberActive: (id: string) => void;

  // Mentors
  mentors: MentorItem[];
  addMentor: (mentor: Omit<MentorItem, 'id'>) => void;
  updateMentor: (id: string, updated: Partial<MentorItem>) => void;
  deleteMentor: (id: string) => void;

  // Curriculum Courses (Tech & Non-Tech)
  curriculumCourses: CurriculumCourse[];
  updateCurriculumCourse: (id: string, updated: Partial<CurriculumCourse>) => void;
  addRollingTrackToCourse: (courseId: string, track: string) => void;
  deleteRollingTrackFromCourse: (courseId: string, trackIndex: number) => void;
  updateRollingTracks: (courseId: string, tracks: string[]) => void;
  addPillarToCourse: (courseId: string, pillar: Omit<ModulePillar, 'id'>) => void;
  updateCoursePillar: (courseId: string, pillarId: string, updated: Partial<ModulePillar>) => void;
  deleteCoursePillar: (courseId: string, pillarId: string) => void;
  resetCurriculumToDefault: () => void;

  // Jobs
  jobs: JobOpening[];
  addJob: (job: Omit<JobOpening, 'id' | 'postedDate' | 'postedDaysAgo'>) => void;
  updateJob: (id: string | number, updated: Partial<JobOpening>) => void;
  deleteJob: (id: string | number) => void;

  // Gallery
  galleryItems: GalleryMoment[];
  addGalleryItem: (item: Omit<GalleryMoment, 'id'>) => void;
  updateGalleryItem: (id: string, updated: Partial<GalleryMoment>) => void;
  deleteGalleryItem: (id: string) => void;

  // Blogs
  blogPosts: BlogPost[];
  addBlogPost: (blog: Omit<BlogPost, 'id'>) => void;
  updateBlogPost: (id: string, updated: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;

  // Form Submissions (Connect With Grow 360)
  enquiries: FormSubmission[];
  addEnquiry: (enquiry: Omit<FormSubmission, 'id' | 'createdAt' | 'status'>) => void;
  updateEnquiryStatus: (id: string, status: FormSubmission['status']) => void;
  updateEnquiryNotes: (id: string, notes: string) => void;
  deleteEnquiry: (id: string) => void;
  exportEnquiriesCSV: () => void;

  // Job Applications
  applications: JobApplication[];
  addApplication: (app: Omit<JobApplication, 'id' | 'createdAt' | 'status'>) => void;
  updateApplicationStatus: (id: string, status: JobApplication['status']) => void;
  updateApplicationNotes: (id: string, notes: string) => void;
  deleteApplication: (id: string) => void;
  exportApplicationsCSV: () => void;

  // Reset to default seed data if needed
  resetAllToDefault: () => void;
}

// ─── Default Seed Data ──────────────────────────────────────────────────────

const INITIAL_JOBS: JobOpening[] = [
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
    skills: ['Next.js', 'Node.js', 'AWS', 'Azure', 'Docker', 'Redis', 'PostgreSQL', 'MongoDB', 'Data Structures and Algorithms', 'Git Version Control'],
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
      'Strong problem-solving record (500+ LeetCode / Codeforces rating 1600+).',
      'Solid command over C++ STL, recursion, graphs, and dynamic programming.',
      'Previous teaching or mentorship experience is a significant advantage.'
    ],
    openings: 4
  },
  {
    id: 'job-3',
    title: 'Business Analytics & Power BI Lead Instructor',
    domain: 'Non-Tech',
    type: 'Part-time',
    location: 'Remote',
    locationCategory: 'Remote',
    salary: '₹50,000 - ₹80,000 / month',
    postedDate: '2 days ago',
    postedDaysAgo: 2,
    skills: ['Power BI', 'Advanced Excel', 'SQL', 'Tableau', 'DAX', 'Data Modeling', 'Business Insights', 'Financial Dashboards'],
    summary: 'Spearhead our commercial analytics curriculum, teaching enterprise reporting, DAX calculations, and executive BI dashboards to campus placement aspirants.',
    responsibilities: [
      'Conduct live interactive weekends/evening workshops on Power BI & SQL modeling.',
      'Guide students through end-to-end industry capstone projects (Sales, Supply Chain, Finance).',
      'Review student dashboard portfolios and provide recruiter-level feedback.'
    ],
    requirements: [
      '2+ years working experience in Business Intelligence, Analytics, or Financial Analysis.',
      'Proficiency in building DAX measures, relational data models, and interactive visuals.',
      'Great presentation and explanatory skills.'
    ],
    openings: 2
  },
  {
    id: 'job-4',
    title: 'Enterprise Java & Spring Boot Mentor',
    domain: 'Tech',
    type: 'Full-time',
    location: 'India, Gujarat (Vadodara / Hybrid)',
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
  }
];

const INITIAL_GALLERY: GalleryMoment[] = [
  {
    id: 'gal-1',
    title: 'Pharmaceutical Analytics & BI Dashboard Capstone',
    category: 'Capstone Presentation',
    categoryColor: '#2563EB',
    description: 'Student cohort presenting real-time corporate sales & operational dashboards built with Power BI and data analytics.',
    stats: 'Live Capstone Evaluation',
    location: 'Campus Analytics Lab',
    image: '/moments/moment_bi_dashboard_presentation.jpg',
  },
  {
    id: 'gal-2',
    title: 'On-Campus Placement & Resume Masterclass',
    category: 'Resume & Strategy',
    categoryColor: '#0668E1',
    description: 'Interactive whiteboard breakdown of high-impact recruiter-ready resumes, projects, and domain technical skills.',
    stats: '100% Placement Aligned',
    location: 'Parul University Campus',
    image: '/moments/campus_moment_1.jpg',
  },
  {
    id: 'gal-3',
    title: 'Full-Batch Technical Training & Interview Prep',
    category: 'Batch Cohort',
    categoryColor: '#10B981',
    description: 'Comprehensive classroom training session equipping entire engineering cohorts with real-world corporate readiness.',
    stats: '40+ Candidates in Batch',
    location: 'Academic Training Hall',
    image: '/moments/moment_large_batch_workshop.jpg',
  },
  {
    id: 'gal-4',
    title: 'Milestone Achievement & Cohort Celebration',
    category: 'Cohort Milestone',
    categoryColor: '#EC4899',
    description: 'Celebrating successful completion of rigorous training sprints, assessments, and real-world project submissions.',
    stats: '100% Sprint Completion',
    location: 'Smart Classroom Hub',
    image: '/moments/moment_classroom_celebration.jpg',
  },
  {
    id: 'gal-5',
    title: 'Women in Tech & Leadership Mentorship Circle',
    category: 'Mentorship Circle',
    categoryColor: '#8B5CF6',
    description: 'Targeted career strategy, technical problem-solving, and confidence building for aspiring women technologists.',
    stats: 'Empowerment & Placements',
    location: 'Interactive Seminar Room',
    image: '/moments/moment_girls_cohort_celebration.jpg',
  },
  {
    id: 'gal-6',
    title: 'Engineering Collaboration & Hackathon Sprint',
    category: 'Team Collaboration',
    categoryColor: '#D97706',
    description: 'Peer programming and collaborative product builds preparing students for corporate team dynamics.',
    stats: 'Collaborative Product Builds',
    location: 'Project Innovation Studio',
    image: '/moments/moment_boys_cohort_celebration.jpg',
  },
];

const INITIAL_BLOGS: BlogPost[] = [
  {
    id: 'placement-transformation-2026',
    title: 'How Forward-Thinking Colleges Are Transforming Campus Placements in 2026',
    category: 'Placement Strategy',
    readTime: '5 min read',
    date: 'August 28, 2026',
    author: 'Grow360 Academic Council',
    summary: 'Why traditional rote training is failing campus drives and how live industry rubrics, AI evaluations, and practical project reviews create 90%+ placement outcomes.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
    tags: ['Higher Ed', 'Campus Placement', 'TPO Strategy', 'Industry 4.0'],
    content: [
      'Campus hiring dynamics have permanently shifted. Tech giants and emerging product startups no longer test for textbook memorization — they evaluate production problem-solving, clean code hygiene, and distributed systems understanding.',
      'Colleges adopting continuous 1:1 expert evaluations, simulated mock hiring drives, and live industry-led sprints report an average 3.2x surge in high-tier placement conversions.',
      'By bridging the classroom curriculum with real-world corporate expectations, institutions give their students an unshakeable competitive edge.'
    ],
  },
  {
    id: 'system-design-ai-readiness',
    title: 'Deconstructing Technical Mock Drives: What Industry Evaluators Actually Look For',
    category: 'Technical Roadmaps',
    readTime: '6 min read',
    date: 'August 24, 2026',
    author: 'Vishal Motlani & Nandwana Abhishek',
    summary: 'A detailed breakdown of live mock round rubrics — from algorithmic optimization to microservice architecture and behavioral articulation.',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    tags: ['System Design', 'FAANG Preparation', 'Mock Rounds', 'Coding Hygiene'],
    content: [
      'During technical rounds, senior engineers look beyond just getting code to run. They assess edge-case handling, computational complexity (Big-O), API modularity, and trade-off justification.',
      'In system design rounds, candidates who can articulate cache invalidation, asynchronous queuing, and SQL vs NoSQL sharding stand out in the top 5% of candidate pools.',
      'Regular feedback loops from practitioners at Meta, Deloitte, and Accenture prepare students to speak the exact language of technical hiring panels.'
    ],
  },
  {
    id: 'powerbi-sql-business-analytics',
    title: 'The Rise of Analytics & FP&A Roles in Campus Hiring',
    category: 'Analytics & Finance',
    readTime: '4 min read',
    date: 'August 20, 2026',
    author: 'Nidhi Singh (Accenture FP&A Lead)',
    summary: 'Why commercial analytics, Power BI dashboards, and financial modeling are leading the next wave of high-package corporate campus offers.',
    image: '/moments/moment_bi_dashboard_presentation.jpg',
    tags: ['Power BI', 'SQL', 'Financial Analytics', 'Corporate Careers'],
    content: [
      'Modern enterprise decision-making relies on actionable data intelligence. Top consulting, FMCG, and technology firms actively scout candidates proficient in interactive BI dashboards and automated forecasting pipelines.',
      'Hands-on capstone projects where students build live sales, inventory, and operations trackers prove candidate readiness instantly to recruiters.',
      'Our dedicated analytics curriculum bridges statistical modeling with direct corporate case studies.'
    ],
  },
];

const INITIAL_ENQUIRIES: FormSubmission[] = [
  {
    id: 'enq-001',
    fullName: 'Dr. Ramesh K. Verma',
    collegeName: 'Dr. A.P.J. Abdul Kalam Technical University Affiliate',
    email: 'ramesh.verma@aktucampus.ac.in',
    phone: '+91 98765 43210',
    profession: 'Dean of Academic Placements & Training',
    message: 'Interested in implementing the full 360 placement training suite for 450+ final year CSE & IT students starting next semester.',
    source: 'HERO_REFERENCE_FORM',
    status: 'NEW',
    notes: 'Requested a comprehensive institutional pitch deck & quotation.',
    createdAt: new Date(Date.now() - 3600 * 1000 * 4).toISOString(),
  },
  {
    id: 'enq-002',
    fullName: 'Prof. Sunita Sharma',
    collegeName: 'Parul University Institute of Engineering',
    email: 'sunita.sharma@paruluniversity.ac.in',
    phone: '+91 98112 34567',
    profession: 'Head of Department (Computer Science)',
    message: 'Looking for live weekend DSA & System Design mock interviewers and full-stack capstone evaluations for 200+ students.',
    source: 'MODAL_ENQUIRY',
    status: 'CONTACTED',
    notes: 'Initial call completed. Demo scheduled for Friday 3 PM.',
    createdAt: new Date(Date.now() - 3600 * 1000 * 24).toISOString(),
  },
  {
    id: 'enq-003',
    fullName: 'Rajesh Mehra',
    collegeName: 'SRM Institute of Science and Technology (NCR)',
    email: 'rajesh.mehra@srmup.edu.in',
    phone: '+91 97654 12389',
    profession: 'Training & Placement Officer (TPO)',
    message: 'We need high-impact Power BI & Business Analytics workshop tracks before upcoming Deloitte & PwC placement drives.',
    source: 'HERO_REFERENCE_FORM',
    status: 'IN_PROGRESS',
    notes: 'Curriculum proposal sent via email.',
    createdAt: new Date(Date.now() - 3600 * 1000 * 48).toISOString(),
  },
  {
    id: 'enq-004',
    fullName: 'Ananya Deshmukh',
    collegeName: 'Pune Institute of Computer Technology',
    email: 'ananya.deshmukh@pict.edu',
    phone: '+91 94567 89012',
    profession: 'Industry Relations Coordinator',
    message: 'Need a customized GenAI & Cloud curriculum module integrated into our pre-final year syllabus.',
    source: 'CONSULTATION',
    status: 'CLOSED',
    notes: 'MOU successfully signed for 2-batch deployment.',
    createdAt: new Date(Date.now() - 3600 * 1000 * 96).toISOString(),
  },
];

const INITIAL_APPLICATIONS: JobApplication[] = [
  {
    id: 'app-001',
    jobId: 'job-1',
    jobTitle: 'Backend Engineer & Technical Mentor',
    fullName: 'Akash Deep Srivastava',
    email: 'akash.srivastava@gmail.com',
    phone: '+91 98234 56781',
    resumeFileName: 'Akash_Srivastava_Backend_Lead_CV.pdf',
    resumeUrl: 'https://github.com/akash-backend-dev',
    portfolioLink: 'https://linkedin.com/in/akash-srivastava-dev',
    experience: '3.5 years in Node.js & Microservices at FinTech Startup',
    status: 'Shortlisted',
    notes: 'Strong backend foundation in Redis & PostgreSQL. High pedagogical scores in preliminary interview.',
    createdAt: new Date(Date.now() - 3600 * 1000 * 8).toISOString(),
  },
  {
    id: 'app-002',
    jobId: 'job-2',
    jobTitle: 'DSA & C++ Technical Trainer',
    fullName: 'Pooja Iyer',
    email: 'pooja.iyer.tech@outlook.com',
    phone: '+91 99123 45678',
    resumeFileName: 'Pooja_Iyer_DSA_Instructor_Resume.pdf',
    portfolioLink: 'https://leetcode.com/pooja_iyer_code',
    experience: 'LeetCode Guardian (2140 rating), 2 years mentor at CodeChef chapter',
    status: 'Interview Scheduled',
    notes: 'Round 2 live teaching trial set for tomorrow at 5 PM.',
    createdAt: new Date(Date.now() - 3600 * 1000 * 26).toISOString(),
  },
  {
    id: 'app-003',
    jobId: 'job-3',
    jobTitle: 'Business Analytics & Power BI Lead Instructor',
    fullName: 'Karanvir Singh',
    email: 'karanvir.analytics@gmail.com',
    phone: '+91 98777 12345',
    resumeFileName: 'Karanvir_Singh_PowerBI_Lead.pdf',
    portfolioLink: 'https://linkedin.com/in/karanvir-bi-lead',
    experience: 'Senior BI Developer at Consulting firm (4 years experience)',
    status: 'Reviewing',
    notes: 'Impressive DAX and sales analytics portfolio.',
    createdAt: new Date(Date.now() - 3600 * 1000 * 52).toISOString(),
  },
  {
    id: 'app-004',
    jobId: 'job-4',
    jobTitle: 'Enterprise Java & Spring Boot Mentor',
    fullName: 'Vikramaditya Rao',
    email: 'vikram.rao.java@yahoo.com',
    phone: '+91 96543 21098',
    resumeFileName: 'Vikram_Rao_Java_FullStack.pdf',
    portfolioLink: 'https://github.com/vikram-java-architect',
    experience: '5 years Java/Spring Boot & AWS Cloud architecture',
    status: 'Offered',
    notes: 'Honorarium contract offer dispatched.',
    createdAt: new Date(Date.now() - 3600 * 1000 * 120).toISOString(),
  }
];

const INITIAL_MENTORS: MentorItem[] = [
  {
    id: 'mentor-1',
    name: 'Nidhi Singh',
    company: 'Accenture',
    companyColor: '#A100FF',
    role: 'Lead Analyst – FP&A · Accenture',
    quote: 'Power BI dashboards, financial modelling, budgeting & forecasting, SOX controls, and corporate FP&A with a focus on data-driven insights.',
    image: '/mentors/nidhi_singh.jpg',
    exp: '85+ Sessions',
    tag: 'Corporate Strategy & FP&A',
    tilt: '-0.8deg',
    displayLocation: 'all',
    order: 1,
  },
  {
    id: 'mentor-2',
    name: 'Vishal Motlani',
    company: 'J&J MedTech (Ex-Deloitte)',
    companyColor: '#D51900',
    role: "SIBM P'27 · Ex-Deloitte USI · Ex-Urban Company",
    quote: 'National Winner of J&J Imagivators 2025 and CISI Level 1 certified with deep experience in business strategy, financial advisory, and risk consulting.',
    image: '/mentors/vishal_motlani.jpg',
    exp: '60+ Sessions',
    tag: 'Problem Solving & Mock Drives',
    tilt: '0.6deg',
    displayLocation: 'all',
    order: 2,
  },
  {
    id: 'mentor-3',
    name: 'Nandwana Abhishek',
    company: 'Meta (London)',
    companyColor: '#0668E1',
    role: 'Software Engineer · Meta (London, UK)',
    quote: 'Software Engineer at Meta working on scalable software systems and production-grade engineering solutions based in London.',
    image: '/mentors/nandwana_abhishek.jpg',
    exp: '95+ Sessions',
    tag: 'System Design & Distributed Tech',
    tilt: '-1.2deg',
    displayLocation: 'all',
    order: 3,
  },
  {
    id: 'mentor-4',
    name: 'Ashish Sachan',
    company: 'Product Leadership',
    companyColor: '#2563EB',
    role: 'Product & Program Management · 10+ Yrs Exp',
    quote: '10+ years of experience across web technologies, AI systems, project execution, and cross-functional leadership for high-impact tech products.',
    image: '/mentors/ashish_sachan.jpg',
    exp: '110+ Sessions',
    tag: 'Tech Leadership & Product Vision',
    tilt: '0.9deg',
    displayLocation: 'all',
    order: 4,
  },
  {
    id: 'mentor-5',
    name: 'Mohit Khandelwal',
    company: 'ZS Associates',
    companyColor: '#005A9C',
    role: 'Analytics Consultant · Commercial Analytics',
    quote: 'Analytics Consultant specialized in commercial analytics, incentive compensation modeling, Power BI, SQL, and US pharma healthcare analytics.',
    image: '/mentors/mohit_khandelwal.png',
    exp: '75+ Sessions',
    tag: 'Commercial Analytics & BI',
    tilt: '-0.6deg',
    displayLocation: 'all',
    order: 5,
  },
  {
    id: 'mentor-6',
    name: 'Sakshi Havelia',
    company: 'Koridge Capital',
    companyColor: '#D97706',
    role: 'Founder Advisory · Equity & Debt Fundraising',
    quote: 'Helping ambitious founders prepare and raise capital with confidence across equity & debt fundraising, M&A advisory, and Pre-IPO stages.',
    image: '/mentors/sakshi_havelia.png',
    exp: '50+ Sessions',
    tag: 'Fundraising & Strategic Advisory',
    tilt: '0.8deg',
    displayLocation: 'all',
    order: 6,
  },
  {
    id: 'mentor-7',
    name: 'Gagandeep Singh',
    company: 'VALUETE',
    companyColor: '#10B981',
    role: 'Founder & Full-Stack Developer · VALUETE',
    quote: 'Founder and Full-Stack Developer turning ideas into scalable technology architectures, robust cloud backends, and high-velocity builds.',
    image: '/mentors/gagandeep_singh.jpg',
    exp: '80+ Sessions',
    tag: 'Full-Stack & Cloud Architecture',
    tilt: '-1.0deg',
    displayLocation: 'all',
    order: 7,
  },
  {
    id: 'mentor-8',
    name: 'Siddhartha Kumar',
    company: 'Brainstack',
    companyColor: '#8B5CF6',
    role: 'Senior Full-Stack Engineer · Agentic AI & RAG',
    quote: 'Senior Full-Stack Engineer building intelligent web platforms with deep expertise in React, Node.js, MongoDB, Agentic AI, and RAG architectures.',
    image: '/mentors/siddhartha_kumar.jpg',
    exp: '90+ Sessions',
    tag: 'Agentic AI, LLMs & Full-Stack',
    tilt: '0.7deg',
    displayLocation: 'all',
    order: 8,
  },
];

const INITIAL_CURRICULUM: CurriculumCourse[] = [
  {
    id: 'non-tech',
    title: 'Non-Technical & Management Corporate Program',
    shortTitle: 'Course 1: Management & Non-Technical',
    tagline: 'Executive management capabilities, corporate communication, business ethics, and placement mastery designed for non-technical cohorts.',
    badge: 'Management & Corporate Track',
    order: 1,
    targetGroups: ['Graduates (BBA, B.Com, BA, B.Sc)', 'Post-Graduates (MBA, PGDM, M.Com)', 'Management Students', 'Non-Technical Career Aspirants'],
    rollingTracks: [
      'Executive Certification in Business & Technology Management',
      'Corporate Financial Modelling & Valuation',
      'Strategic Human Resource & Talent Management',
      'Modern Product Marketing & Brand Strategy',
      'International Business & Supply Chain Operations',
      'Agile Project Management & Scrum Leadership',
      'Executive Business Communication & Storytelling',
      'POSH Compliance & International Workplace Ethics',
    ],
    outcome: 'Non-technical/management students ko corporate communication, management, leadership, professional etiquette aur placement readiness ke liye prepare karna.',
    pillars: [
      {
        id: 'p-nt-1',
        number: '01',
        title: 'Management & Productivity',
        badge: 'Operational Excellence',
        color: '#D97706',
        items: [
          'Strategic Project Planning & Milestones',
          'Time Management & Priority Matrix',
          '80/20 Pareto Rule for High Business Impact',
          'Agile Frameworks & Scrum Methodologies',
          'People Management & Delegation Principles',
          'Team Management & Conflict Navigation',
          'Result & KPI-Driven Business Orientation',
        ],
      },
      {
        id: 'p-nt-2',
        number: '02',
        title: 'Management & Business Courses',
        badge: 'Domain Specialization',
        color: '#2563EB',
        items: [
          'Finance Leadership Program & Corporate FP&A',
          'Human Resource Management & Talent Strategy',
          'Marketing Strategy & Brand Growth',
          'International Business & Cross-Border Trade',
          'Professional Ethics on International Standards',
        ],
      },
      {
        id: 'p-nt-3',
        number: '03',
        title: 'Business Communication',
        badge: 'Executive Voice',
        color: '#8B5CF6',
        items: [
          'Workplace Emails & Executive Briefs',
          'Active Listening & Client Empathy',
          'Formal Business Presentations & Pitches',
          'Effective & Impactful Communication',
          'Corporate Storytelling & Stakeholder Influence',
        ],
      },
      {
        id: 'p-nt-4',
        number: '04',
        title: 'Professional Etiquette & Compliance',
        badge: 'Workplace Standards',
        color: '#10B981',
        items: [
          'Corporate Grooming & Professional Presence',
          'Emotional Intelligence (EQ) & Self-Regulation',
          'POSH Compliance & Sensitization Standards',
          'International Business Etiquettes & Protocol',
          'Professional Work Ethics & Corporate Integrity',
        ],
      },
      {
        id: 'p-nt-5',
        number: '05',
        title: 'Workplace & Leadership Skills',
        badge: 'Leadership Mastery',
        color: '#EC4899',
        items: [
          'Diversity & Inclusion in Modern Workplaces',
          'Impact of Core Corporate Values',
          'Decisive Decision Making Under Uncertainty',
          'Assertiveness & Executive Confidence',
          'Customer & Client-Centric Orientation',
          'Conflict Resolution & Interpersonal Dynamics',
          'Win-Win Negotiation Frameworks',
          'Creative Problem Solving & Case Methodologies',
          'High-Impact Presentation Skills',
          'Stress Management & Workplace Resilience',
        ],
      },
      {
        id: 'p-nt-6',
        number: '06',
        title: 'Career & Placement Preparation',
        badge: 'Placement Sprint',
        color: '#0668E1',
        items: [
          'Personalized Career Guidance & Track Mapping',
          'Corporate Resume & LinkedIn Profile Writing',
          '1-on-1 Mock HR & Case Study Interviews',
          'Group Discussions (GD) Leadership & Body Language',
          'Final Interview Success Frameworks',
          'Campus Placement Drive Simulation Rounds',
        ],
      },
    ],
  },
  {
    id: 'tech',
    title: 'Technical Career & Corporate Readiness Program',
    shortTitle: 'Course 2: Technical & Engineering',
    tagline: 'Comprehensive technical domain upskilling integrated with Tier-1 campus placement training and professional corporate readiness.',
    badge: 'Flagship Tech Track',
    order: 2,
    targetGroups: ['B.E / B.Tech', 'M.Tech', 'Ph.D', 'Engineering & CS Graduates', 'Post-Graduate Tech Aspirants'],
    rollingTracks: [
      'Software and AI Engineering Program',
      'Modern Data Science and ML with Specialisation in AI',
      'AI Forward Deployed Engineer Program',
      'AI & Machine Learning with Agentic AI',
      'DevOps, Cloud & AI Platform Engineering',
      'AI Engineering Advanced Certification',
      'Full-Stack MERN & Next.js Architecture',
      'Scalable Distributed Systems & High-Load Architecture',
    ],
    outcome: 'Technical students ko technical upskilling ke saath placement aur corporate environment ke liye end-to-end prepare karna.',
    pillars: [
      {
        id: 'p-t-1',
        number: '01',
        title: 'Technical & Domain Upskilling',
        badge: 'Core Competency',
        color: '#2563EB',
        items: [
          'Artificial Intelligence & GenAI Workflows',
          'Data Analytics & Business Intelligence',
          'Core Engineering Workflows & Architecture',
          'Power BI Dashboards & Enterprise Reporting',
          'Advanced SQL Queries & Database Modeling',
          'Advanced Excel & Data Analytics',
          'SAP & Enterprise ERP Tools',
          'Full-Stack Web Development (Modern Stacks)',
          'Data Analysis & Statistical Techniques',
          'Financial Modelling & Corporate Insights',
        ],
      },
      {
        id: 'p-t-2',
        number: '02',
        title: 'Technical Programs & Practice',
        badge: 'Hands-On Applied',
        color: '#0668E1',
        items: [
          'Engineering Leadership Program',
          'Group Internship Program & Team Capstones',
          'Technical Brush-up in Live Production Environments',
          'Industrial Visits & Corporate Campus Immersions (Optional)',
        ],
      },
      {
        id: 'p-t-3',
        number: '03',
        title: 'Placement & Career Preparation',
        badge: 'Hiring Sprints',
        color: '#10B981',
        items: [
          'Getting Ready for Campus Placement Drives',
          'Handling Online Assessments – Tips & Tricks',
          'Aptitude Tests (Quantitative, Logical & Verbal)',
          'Group Discussions (GD) Strategies & Round Table Drills',
          'ATS-Compliant Resume & Portfolio Building',
          '1-on-1 Mock Technical Interviews with Meta/Deloitte Mentors',
          'Personalized Career Guidance & Profile Diagnostics',
          'Final Interview Success Frameworks',
        ],
      },
      {
        id: 'p-t-4',
        number: '04',
        title: 'Corporate Readiness & Workplace Skills',
        badge: 'Executive Presence',
        color: '#8B5CF6',
        items: [
          'Executive Business Communication',
          'Workplace Emails & Asynchronous Messaging',
          'Active Listening & Corporate Empathy',
          'Formal Presentations & Deck Storytelling',
          'Cross-Functional Teamwork & Collaboration',
          'Time Management & High-Velocity Execution',
          'Professional Etiquette & Corporate Grooming',
        ],
      },
    ],
  },
];

const INITIAL_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: 'ann-1',
    text: '✨ Free 1:1 Career Diagnostic & Senior Mentorship Session',
    highlight: 'Book Free Call',
    action: 'call',
    active: true,
    order: 1,
  },
  {
    id: 'ann-2',
    text: '✨ Software & AI Engineering Program — 2026 Batch Admissions Open',
    highlight: 'Explore Tracks',
    action: 'programs',
    active: true,
    order: 2,
  },
  {
    id: 'ann-3',
    text: '✨ Executive Certification in Business & Technology Management',
    highlight: 'Management Track',
    action: 'programs',
    active: true,
    order: 3,
  },
  {
    id: 'ann-4',
    text: '✨ 90%+ Tier-1 Campus Placement Rate Across 50+ Partner Campuses',
    highlight: 'Placement Rubrics',
    action: 'programs',
    active: true,
    order: 4,
  },
  {
    id: 'ann-5',
    text: '✨ AI Forward Deployed Engineer & Agentic AI Certification',
    highlight: 'New Syllabus',
    action: 'programs',
    active: true,
    order: 5,
  },
  {
    id: 'ann-6',
    text: '✨ Corporate Readiness & Mock Technical Drives by Meta & Google Mentors',
    highlight: 'Learn More',
    action: 'call',
    active: true,
    order: 6,
  },
  {
    id: 'ann-7',
    text: '✨ DevOps, Cloud & AI Platform Engineering — Industry Mapped',
    highlight: 'View Modules',
    action: 'programs',
    active: true,
    order: 7,
  },
];

const INITIAL_TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Prakhar Sachan',
    role: 'Founder & Chief Executive Officer',
    department: 'Leadership & Founders',
    badge: 'Founding Partner',
    bio: 'Pioneering scalable institutional readiness frameworks, transforming engineering & management cohorts into day-one billable corporate talent across 50+ campuses.',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    linkedinUrl: 'https://linkedin.com',
    email: 'prakhar@grow360.in',
    active: true,
    order: 1,
  },
  {
    id: 'team-2',
    name: 'Ananya Sharma',
    role: 'Head of Engineering & AI Curriculum',
    department: 'Engineering & AI',
    badge: 'Ex-Google · IIT Delhi',
    bio: 'Architecting cutting-edge AI, Agentic Workflows, and Distributed Systems curriculum tailored for tier-1 campus hiring benchmarks.',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    linkedinUrl: 'https://linkedin.com',
    email: 'ananya@grow360.in',
    active: true,
    order: 2,
  },
  {
    id: 'team-3',
    name: 'Rohan Verma',
    role: 'Director of Corporate Relations & Placements',
    department: 'Placements & Corporate Relations',
    badge: 'Ex-Deloitte Advisory',
    bio: 'Overseeing placement drives, corporate liaison partnerships, and institutional mock interview rubrics with leading MNCs and unicorns.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    linkedinUrl: 'https://linkedin.com',
    email: 'rohan@grow360.in',
    active: true,
    order: 3,
  },
  {
    id: 'team-4',
    name: 'Dr. Arvind Mehta',
    role: 'Dean of Academic & Institutional Partnerships',
    department: 'Academic Curriculum',
    badge: 'Ph.D. Education Strategy',
    bio: 'Aligning university credit structures, NBA/NAAC compliance, and semester-integrated delivery models with academic boards across India.',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    linkedinUrl: 'https://linkedin.com',
    email: 'arvind@grow360.in',
    active: true,
    order: 4,
  },
  {
    id: 'team-5',
    name: 'Priya Nambiar',
    role: 'Lead Corporate Etiquette & Executive Presence Coach',
    department: 'Leadership & Founders',
    badge: 'Ex-McKinsey Coach',
    bio: 'Mentoring thousands of engineering & MBA graduates in boardroom presence, high-stakes communication, and technical interview diplomacy.',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    linkedinUrl: 'https://linkedin.com',
    email: 'priya@grow360.in',
    active: true,
    order: 5,
  },
  {
    id: 'team-6',
    name: 'Sameer Kulkarni',
    role: 'Lead Cloud & Systems Architect',
    department: 'Engineering & AI',
    badge: 'Ex-AWS Solutions Architect',
    bio: 'Guiding live enterprise architecture capstones, CI/CD platform pipelines, and multi-cloud container orchestration drills for pre-final year students.',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    linkedinUrl: 'https://linkedin.com',
    email: 'sameer@grow360.in',
    active: true,
    order: 6,
  },
];

const AdminDataContext = createContext<AdminDataContextType | null>(null);

export function AdminDataProvider({ children }: { children: ReactNode }) {
  // 00a. Team Members State
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => {
    const saved = localStorage.getItem('grow360_admin_team');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return INITIAL_TEAM_MEMBERS;
  });

  // 00. Announcements (Top Marquee Ticker) State & Dynamic Speed
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>(() => {
    const saved = localStorage.getItem('grow360_admin_announcements');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return INITIAL_ANNOUNCEMENTS;
  });

  const [tickerSpeed, setTickerSpeedState] = useState<'fast' | 'normal' | 'slow'>(() => {
    const saved = localStorage.getItem('grow360_admin_ticker_speed');
    if (saved === 'fast' || saved === 'normal' || saved === 'slow') {
      return saved;
    }
    return 'fast';
  });

  const setTickerSpeed = (speed: 'fast' | 'normal' | 'slow') => {
    setTickerSpeedState(speed);
    localStorage.setItem('grow360_admin_ticker_speed', speed);
  };

  // 0a. Curriculum Courses State
  const [curriculumCourses, setCurriculumCourses] = useState<CurriculumCourse[]>(() => {
    const saved = localStorage.getItem('grow360_admin_curriculum');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return INITIAL_CURRICULUM;
  });

  // 0b. Mentors State
  const [mentors, setMentors] = useState<MentorItem[]>(() => {
    const saved = localStorage.getItem('grow360_admin_mentors');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return INITIAL_MENTORS;
  });

  // 1. Jobs State
  const [jobs, setJobs] = useState<JobOpening[]>(() => {
    const saved = localStorage.getItem('grow360_admin_jobs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return INITIAL_JOBS;
  });

  // 2. Gallery State
  const [galleryItems, setGalleryItems] = useState<GalleryMoment[]>(() => {
    const saved = localStorage.getItem('grow360_admin_gallery');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return INITIAL_GALLERY;
  });

  // 3. Blogs State
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('grow360_admin_blogs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return INITIAL_BLOGS;
  });

  // 4. Enquiries State
  const [enquiries, setEnquiries] = useState<FormSubmission[]>(() => {
    const saved = localStorage.getItem('grow360_admin_enquiries');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return INITIAL_ENQUIRIES;
  });

  // 5. Applications State
  const [applications, setApplications] = useState<JobApplication[]>(() => {
    const saved = localStorage.getItem('grow360_admin_applications');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return INITIAL_APPLICATIONS;
  });

  // ─── Persistence to LocalStorage ──────────────────────────

  useEffect(() => {
    localStorage.setItem('grow360_admin_mentors', JSON.stringify(mentors));
  }, [mentors]);

  useEffect(() => {
    localStorage.setItem('grow360_admin_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('grow360_admin_gallery', JSON.stringify(galleryItems));
  }, [galleryItems]);

  useEffect(() => {
    localStorage.setItem('grow360_admin_blogs', JSON.stringify(blogPosts));
  }, [blogPosts]);

  useEffect(() => {
    localStorage.setItem('grow360_admin_enquiries', JSON.stringify(enquiries));
  }, [enquiries]);

  useEffect(() => {
    localStorage.setItem('grow360_admin_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('grow360_admin_curriculum', JSON.stringify(curriculumCourses));
  }, [curriculumCourses]);

  useEffect(() => {
    localStorage.setItem('grow360_admin_announcements', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('grow360_admin_team', JSON.stringify(teamMembers));
  }, [teamMembers]);

  // ─── Team Member Handlers ─────────────────────────────────

  const addTeamMember = (memberData: Omit<TeamMember, 'id'>) => {
    const newMember: TeamMember = {
      ...memberData,
      id: `team-${Date.now()}`,
    };
    setTeamMembers((prev) => [...prev, newMember]);
  };

  const updateTeamMember = (id: string, updated: Partial<TeamMember>) => {
    setTeamMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updated } : m))
    );
  };

  const deleteTeamMember = (id: string) => {
    setTeamMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const toggleTeamMemberActive = (id: string) => {
    setTeamMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, active: !m.active } : m))
    );
  };

  // ─── Announcement Handlers ────────────────────────────────

  const addAnnouncement = (itemData: Omit<AnnouncementItem, 'id'>) => {
    const newItem: AnnouncementItem = {
      ...itemData,
      id: `ann-${Date.now()}`,
    };
    setAnnouncements((prev) => [...prev, newItem]);
  };

  const updateAnnouncement = (id: string, updated: Partial<AnnouncementItem>) => {
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updated } : a))
    );
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  };

  const toggleAnnouncementActive = (id: string) => {
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a))
    );
  };

  // ─── Curriculum Handlers ──────────────────────────────────

  const updateCurriculumCourse = (id: string, updated: Partial<CurriculumCourse>) => {
    setCurriculumCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updated } : c))
    );
  };

  const addRollingTrackToCourse = (courseId: string, track: string) => {
    if (!track.trim()) return;
    setCurriculumCourses((prev) =>
      prev.map((c) => {
        if (c.id !== courseId) return c;
        const currentTracks = c.rollingTracks || [];
        return {
          ...c,
          rollingTracks: [...currentTracks, track.trim()],
        };
      })
    );
  };

  const deleteRollingTrackFromCourse = (courseId: string, trackIndex: number) => {
    setCurriculumCourses((prev) =>
      prev.map((c) => {
        if (c.id !== courseId) return c;
        const currentTracks = c.rollingTracks || [];
        return {
          ...c,
          rollingTracks: currentTracks.filter((_, i) => i !== trackIndex),
        };
      })
    );
  };

  const updateRollingTracks = (courseId: string, tracks: string[]) => {
    setCurriculumCourses((prev) =>
      prev.map((c) => {
        if (c.id !== courseId) return c;
        return {
          ...c,
          rollingTracks: tracks.map((t) => t.trim()).filter(Boolean),
        };
      })
    );
  };

  const addPillarToCourse = (courseId: string, pillarData: Omit<ModulePillar, 'id'>) => {
    const newPillar: ModulePillar = {
      ...pillarData,
      id: `p-${Date.now()}`,
    };
    setCurriculumCourses((prev) =>
      prev.map((c) => {
        if (c.id !== courseId) return c;
        return {
          ...c,
          pillars: [...c.pillars, newPillar],
        };
      })
    );
  };

  const updateCoursePillar = (courseId: string, pillarId: string, updated: Partial<ModulePillar>) => {
    setCurriculumCourses((prev) =>
      prev.map((c) => {
        if (c.id !== courseId) return c;
        return {
          ...c,
          pillars: c.pillars.map((p) => (p.id === pillarId ? { ...p, ...updated } : p)),
        };
      })
    );
  };

  const deleteCoursePillar = (courseId: string, pillarId: string) => {
    setCurriculumCourses((prev) =>
      prev.map((c) => {
        if (c.id !== courseId) return c;
        return {
          ...c,
          pillars: c.pillars.filter((p) => p.id !== pillarId),
        };
      })
    );
  };

  const resetCurriculumToDefault = () => {
    setCurriculumCourses(INITIAL_CURRICULUM);
    localStorage.removeItem('grow360_admin_curriculum');
  };

  // Reset to default seed
  const resetAllToDefault = () => {
    setCurriculumCourses(INITIAL_CURRICULUM);
    setMentors(INITIAL_MENTORS);
    setJobs(INITIAL_JOBS);
    setGalleryItems(INITIAL_GALLERY);
    setBlogPosts(INITIAL_BLOGS);
    setEnquiries(INITIAL_ENQUIRIES);
    setApplications(INITIAL_APPLICATIONS);
    localStorage.removeItem('grow360_admin_curriculum');
    localStorage.removeItem('grow360_admin_mentors');
    localStorage.removeItem('grow360_admin_jobs');
    localStorage.removeItem('grow360_admin_gallery');
    localStorage.removeItem('grow360_admin_blogs');
    localStorage.removeItem('grow360_admin_enquiries');
    localStorage.removeItem('grow360_admin_applications');
  };

  // ─── Sync with Supabase on Initial Load (if online/available) ─

  useEffect(() => {
    let isMounted = true;
    async function loadSupabaseData() {
      try {
        // Enquiries
        const { data: sbEnquiries, error: enqErr } = await supabase
          .from('enquiries')
          .select('*')
          .order('created_at', { ascending: false });

        if (!enqErr && sbEnquiries && sbEnquiries.length > 0 && isMounted) {
          setEnquiries((prev) => {
            const existingIds = new Set(prev.map((e) => e.id));
            const newMapped: FormSubmission[] = sbEnquiries
              .filter((row: any) => !existingIds.has(String(row.id)))
              .map((row: any) => ({
                id: String(row.id),
                fullName: row.contact_name || row.full_name || 'Anonymous Applicant',
                collegeName: row.college_name || 'N/A',
                email: row.email || '',
                phone: row.phone || '',
                profession: row.designation || row.profession || 'General',
                message: row.message || row.request_details || '',
                source: (row.source as any) || 'CONSULTATION',
                status: (row.status as any) || 'NEW',
                createdAt: row.created_at || new Date().toISOString(),
              }));
            return [...newMapped, ...prev];
          });
        }

        // Mentor Applications
        const { data: sbApps, error: appErr } = await supabase
          .from('mentor_applications')
          .select('*')
          .order('created_at', { ascending: false });

        if (!appErr && sbApps && sbApps.length > 0 && isMounted) {
          setApplications((prev) => {
            const existingIds = new Set(prev.map((a) => a.id));
            const newMapped: JobApplication[] = sbApps
              .filter((row: any) => !existingIds.has(String(row.id)))
              .map((row: any) => ({
                id: String(row.id),
                jobId: row.job_id || 'general',
                jobTitle: row.applied_role || 'Mentor / Instructor Applicant',
                fullName: row.full_name || '',
                email: row.email || '',
                phone: row.phone || '',
                resumeFileName: row.resume_path || row.resume_link || 'Resume Document',
                resumeUrl: row.resume_link || row.resume_path || '',
                portfolioLink: row.portfolio_link || row.resume_link || '',
                experience: row.experience || '',
                status: row.status === 'approved' ? 'Shortlisted' : row.status === 'rejected' ? 'Rejected' : 'Pending',
                notes: row.admin_notes || '',
                createdAt: row.created_at || new Date().toISOString(),
              }));
            return [...newMapped, ...prev];
          });
        }
      } catch (err) {
        console.warn('[AdminDataContext] Supabase initial sync note:', err);
      }
    }

    loadSupabaseData();
    return () => {
      isMounted = false;
    };
  }, []);

  // ─── Job Handlers ─────────────────────────────────────────

  const addJob = (newJobData: Omit<JobOpening, 'id' | 'postedDate' | 'postedDaysAgo'>) => {
    const newId = `job-${Date.now()}`;
    const newJob: JobOpening = {
      ...newJobData,
      id: newId,
      postedDate: 'Just now',
      postedDaysAgo: 0,
      createdAt: new Date().toISOString(),
    };
    setJobs((prev) => [newJob, ...prev]);

    // Async sync to Supabase
    supabase.from('mentor_jobs').insert([
      {
        title: newJob.title,
        domain: newJob.domain,
        job_type: newJob.type,
        location: newJob.location,
        location_category: newJob.locationCategory,
        salary: newJob.salary,
        skills: JSON.stringify(newJob.skills),
        summary: newJob.summary,
        responsibilities: JSON.stringify(newJob.responsibilities),
        requirements: JSON.stringify(newJob.requirements),
        openings: newJob.openings,
      }
    ]).then(({ error }) => {
      if (error) console.warn('[Supabase Insert Job error]', error);
    });
  };

  const updateJob = (id: string | number, updated: Partial<JobOpening>) => {
    setJobs((prev) =>
      prev.map((job) => (String(job.id) === String(id) ? { ...job, ...updated } : job))
    );
  };

  const deleteJob = (id: string | number) => {
    setJobs((prev) => prev.filter((job) => String(job.id) !== String(id)));
  };

  // ─── Gallery Handlers ─────────────────────────────────────

  const addGalleryItem = (itemData: Omit<GalleryMoment, 'id'>) => {
    const newItem: GalleryMoment = {
      ...itemData,
      id: `gal-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setGalleryItems((prev) => [newItem, ...prev]);
  };

  const updateGalleryItem = (id: string, updated: Partial<GalleryMoment>) => {
    setGalleryItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
  };

  const deleteGalleryItem = (id: string) => {
    setGalleryItems((prev) => prev.filter((item) => item.id !== id));
  };

  // ─── Blog Handlers ────────────────────────────────────────

  const addBlogPost = (blogData: Omit<BlogPost, 'id'>) => {
    const newId = blogData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `blog-${Date.now()}`;
    const newBlog: BlogPost = {
      ...blogData,
      id: newId,
      createdAt: new Date().toISOString(),
    };
    setBlogPosts((prev) => [newBlog, ...prev]);
  };

  const updateBlogPost = (id: string, updated: Partial<BlogPost>) => {
    setBlogPosts((prev) =>
      prev.map((blog) => (blog.id === id ? { ...blog, ...updated } : blog))
    );
  };

  const deleteBlogPost = (id: string) => {
    setBlogPosts((prev) => prev.filter((blog) => blog.id !== id));
  };

  // ─── Enquiry Handlers ─────────────────────────────────────

  const addEnquiry = (enquiryData: Omit<FormSubmission, 'id' | 'createdAt' | 'status'>) => {
    const newEnquiry: FormSubmission = {
      ...enquiryData,
      id: `enq-${Date.now()}`,
      status: 'NEW',
      createdAt: new Date().toISOString(),
    };
    setEnquiries((prev) => [newEnquiry, ...prev]);
  };

  const updateEnquiryStatus = (id: string, status: FormSubmission['status']) => {
    setEnquiries((prev) =>
      prev.map((enq) => (enq.id === id ? { ...enq, status } : enq))
    );
  };

  const updateEnquiryNotes = (id: string, notes: string) => {
    setEnquiries((prev) =>
      prev.map((enq) => (enq.id === id ? { ...enq, notes } : enq))
    );
  };

  const deleteEnquiry = (id: string) => {
    setEnquiries((prev) => prev.filter((enq) => enq.id !== id));
  };

  const exportEnquiriesCSV = () => {
    const headers = ['ID', 'Full Name', 'College/Organization', 'Email', 'Phone', 'Profession', 'Source', 'Status', 'Notes', 'Date'];
    const rows = enquiries.map((e) => [
      `"${e.id}"`,
      `"${e.fullName.replace(/"/g, '""')}"`,
      `"${e.collegeName.replace(/"/g, '""')}"`,
      `"${e.email}"`,
      `"${e.phone}"`,
      `"${e.profession.replace(/"/g, '""')}"`,
      `"${e.source}"`,
      `"${e.status}"`,
      `"${(e.notes || '').replace(/"/g, '""')}"`,
      `"${new Date(e.createdAt).toLocaleString()}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `grow360_enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ─── Application Handlers ─────────────────────────────────

  const addApplication = (appData: Omit<JobApplication, 'id' | 'createdAt' | 'status'>) => {
    const newApp: JobApplication = {
      ...appData,
      id: `app-${Date.now()}`,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };
    setApplications((prev) => [newApp, ...prev]);
  };

  const updateApplicationStatus = (id: string, status: JobApplication['status']) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status } : app))
    );
  };

  const updateApplicationNotes = (id: string, notes: string) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, notes } : app))
    );
  };

  const deleteApplication = (id: string) => {
    setApplications((prev) => prev.filter((app) => app.id !== id));
  };

  const exportApplicationsCSV = () => {
    const headers = ['Application ID', 'Candidate Name', 'Applied Role', 'Email', 'Phone', 'Experience', 'Resume / Portfolio', 'Status', 'Notes', 'Date'];
    const rows = applications.map((a) => [
      `"${a.id}"`,
      `"${a.fullName.replace(/"/g, '""')}"`,
      `"${a.jobTitle.replace(/"/g, '""')}"`,
      `"${a.email}"`,
      `"${a.phone}"`,
      `"${(a.experience || '').replace(/"/g, '""')}"`,
      `"${a.resumeUrl || a.resumeFileName || a.portfolioLink || ''}"`,
      `"${a.status}"`,
      `"${(a.notes || '').replace(/"/g, '""')}"`,
      `"${new Date(a.createdAt).toLocaleString()}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `grow360_job_applications_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ─── Mentor Handlers ───────────────────────────────────────

  const addMentor = (newMentorData: Omit<MentorItem, 'id'>) => {
    const newId = `mentor-${Date.now()}`;
    const newMentor: MentorItem = {
      ...newMentorData,
      id: newId,
      createdAt: new Date().toISOString(),
    };
    setMentors((prev) => [newMentor, ...prev]);
  };

  const updateMentor = (id: string, updated: Partial<MentorItem>) => {
    setMentors((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updated } : m))
    );
  };

  const deleteMentor = (id: string) => {
    setMentors((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <AdminDataContext.Provider
      value={{
        announcements,
        tickerSpeed,
        setTickerSpeed,
        addAnnouncement,
        updateAnnouncement,
        deleteAnnouncement,
        toggleAnnouncementActive,
        teamMembers,
        addTeamMember,
        updateTeamMember,
        deleteTeamMember,
        toggleTeamMemberActive,
        curriculumCourses,
        updateCurriculumCourse,
        addRollingTrackToCourse,
        deleteRollingTrackFromCourse,
        updateRollingTracks,
        addPillarToCourse,
        updateCoursePillar,
        deleteCoursePillar,
        resetCurriculumToDefault,
        mentors,
        addMentor,
        updateMentor,
        deleteMentor,
        jobs,
        addJob,
        updateJob,
        deleteJob,
        galleryItems,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        blogPosts,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        enquiries,
        addEnquiry,
        updateEnquiryStatus,
        updateEnquiryNotes,
        deleteEnquiry,
        exportEnquiriesCSV,
        applications,
        addApplication,
        updateApplicationStatus,
        updateApplicationNotes,
        deleteApplication,
        exportApplicationsCSV,
        resetAllToDefault,
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
}

export function useAdminData() {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error('useAdminData must be used within an AdminDataProvider');
  }
  return context;
}
