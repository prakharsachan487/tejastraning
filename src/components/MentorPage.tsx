import { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Briefcase,
  Upload,
  Send,
  CheckCircle2,
  AlertCircle,
  FileText
} from 'lucide-react';
import { MentorJobPortal } from './MentorJobPortal';
import { supabase } from '../lib/supabase';

interface MentorPageProps {
  onBackToHome?: () => void;
}

const fellowMentors = [
  {
    name: 'Nidhi Singh',
    company: 'Accenture',
    role: 'Lead Analyst – FP&A · Finance & Modelling',
    rating: '4.98',
    sessions: '85+ Sessions',
    image: '/mentors/nidhi_singh.jpg',
    color: '#A100FF',
  },
  {
    name: 'Vishal Motlani',
    company: 'J&J MedTech',
    role: "SIBM P'27 · Ex-Deloitte USI · Advisory",
    rating: '4.95',
    sessions: '60+ Sessions',
    image: '/mentors/vishal_motlani.jpg',
    color: '#D51900',
  },
  {
    name: 'Nandwana Abhishek',
    company: 'Meta',
    role: 'Software Engineer · Meta (London, UK)',
    rating: '4.99',
    sessions: '95+ Sessions',
    image: '/mentors/nandwana_abhishek.jpg',
    color: '#0668E1',
  },
  {
    name: 'Ashish Sachan',
    company: 'Product Leadership',
    role: 'Product & Program Management · 10+ Yrs Exp',
    rating: '4.96',
    sessions: '110+ Sessions',
    image: '/mentors/ashish_sachan.jpg',
    color: '#2563EB',
  },
  {
    name: 'Mohit Khandelwal',
    company: 'ZS',
    role: 'Analytics Consultant · Commercial Analytics',
    rating: '4.97',
    sessions: '75+ Sessions',
    image: '/mentors/mohit_khandelwal.png',
    color: '#005A9C',
  },
  {
    name: 'Sakshi Havelia',
    company: 'Koridge Capital',
    role: 'Founder Advisory · Equity & Debt Fundraising',
    rating: '4.98',
    sessions: '90+ Sessions',
    image: '/mentors/sakshi_havelia.png',
    color: '#D97706',
  },
  {
    name: 'Gagandeep Singh',
    company: 'VALUETE',
    role: 'Founder & Full-Stack Developer · Scalable Tech',
    rating: '4.94',
    sessions: '70+ Sessions',
    image: '/mentors/gagandeep_singh.jpg',
    color: '#10B981',
  },
  {
    name: 'Siddhartha Kumar',
    company: 'Brainstack',
    role: 'Senior Full-Stack Engineer · Agentic AI & RAG',
    rating: '4.96',
    sessions: '80+ Sessions',
    image: '/mentors/siddhartha_kumar.jpg',
    color: '#8B5CF6',
  },
];

export function MentorPage({ onBackToHome: _ }: MentorPageProps) {
  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [portfolioLink, setPortfolioLink] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Track if this is a direct job application view (opened in a new tab)
  const [isDirectJobView, setIsDirectJobView] = useState(() => {
    return typeof window !== 'undefined' && (window.location.hash.includes('jobId=') || window.location.hash.includes('job-'));
  });

  // Instantly scroll to top or target hash when page opens
  useEffect(() => {
    const handleHashChange = () => {
      const isJob = window.location.hash.includes('jobId=') || window.location.hash.includes('job-');
      setIsDirectJobView(isJob);
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);

    if (window.location.hash === '#career-portal' || window.location.hash === '#careers' || window.location.hash === '#jobs') {
      setTimeout(() => {
        const elem = document.getElementById('career-portal');
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const scrollToCareers = () => {
    const elem = document.getElementById('career-portal');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    if (!resumeFile && !portfolioLink.trim()) {
      setErrorMsg('Please upload a resume or provide a portfolio/LinkedIn link.');
      return;
    }

    setErrorMsg('');
    setSubmitting(true);

    try {
      // 1. Try submitting to Supabase if configured
      if (supabase) {
        await supabase.from('mentor_applications').insert([
          {
            full_name: fullName.trim(),
            email: email.trim(),
            phone: phone.trim(),
            resume_link: portfolioLink.trim() || (resumeFile ? resumeFile.name : ''),
            applied_role: 'Direct Mentor & Technical Instructor Application',
            created_at: new Date().toISOString()
          }
        ]);
      }

      // 2. LocalStorage backup
      const existing = JSON.parse(localStorage.getItem('grow360_mentor_applications') || '[]');
      existing.push({
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        resume: resumeFile ? resumeFile.name : portfolioLink.trim(),
        date: new Date().toISOString()
      });
      localStorage.setItem('grow360_mentor_applications', JSON.stringify(existing));

      setSubmitted(true);
    } catch {
      // Fallback success
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-slate-900 font-sans selection:bg-[#2563EB] selection:text-white">

      {/* Main Content Area */}
      <main className={`relative z-10 ${isDirectJobView ? 'pt-24 pb-16' : 'pt-28 pb-20'} overflow-hidden`}>
        
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-tr from-[#2563EB]/10 via-[#3B82F6]/10 to-transparent blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute top-1/2 -left-48 w-96 h-96 bg-blue-500/5 blur-[120px] pointer-events-none rounded-full" />

        {/* ========================================================
            01. HERO SECTION (FOCUSED & IMPACTFUL) - HIDDEN ON DIRECT JOB VIEW
        ======================================================== */}
        {!isDirectJobView && (
          <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
            <div className="p-8 sm:p-12 lg:p-14 rounded-3xl bg-white shadow-sm border border-black/8 relative overflow-hidden">
              
              {/* Corner Decorative Glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#2563EB]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-start">
                
                {/* Left Column: Headline, Description & CTAs (7 cols) */}
                <div className="lg:col-span-7">
                  
                  {/* Main Headline */}
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 font-[family-name:var(--font-display)] leading-[1.1] mb-6">
                    Join Us in Shaping the Future,{' '}
                    <span className="bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#60A5FA] bg-clip-text text-transparent">
                      Empowering the Next Generation
                    </span>
                  </h1>

                  {/* Subtitle */}
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mb-8">
                    Collaborate with Grow360 to mentor ambitious college graduates across 50+ campuses nationwide. Conduct 1-on-1 mock interviews, lead live industry masterclasses in tech, analytics, and business, and earn competitive honorariums on your own 100% flexible schedule.
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-4 mb-10">
                    <button
                      onClick={scrollToCareers}
                      className="btn-pill-primary py-3.5 px-8 text-xs sm:text-sm font-bold cursor-pointer flex items-center gap-2"
                    >
                      <span>Apply as Mentor</span>
                      <ArrowRight size={16} />
                    </button>

                    <button
                      onClick={scrollToCareers}
                      className="btn-pill-secondary py-3.5 px-6 text-xs sm:text-sm cursor-pointer"
                    >
                      <span>View All Openings</span>
                    </button>
                  </div>

                  {/* Social Proof Strip */}
                  <div className="flex items-center gap-4 pt-6 border-t border-black/8">
                    <div className="flex -space-x-2.5">
                      {fellowMentors.map((m, idx) => (
                        <img
                          key={idx}
                          src={m.image}
                          alt={m.name}
                          className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-xs"
                        />
                      ))}
                    </div>
                    <div className="text-xs text-slate-600">
                      <span className="text-slate-900 font-bold">80+ Senior Engineers</span> from Google, Microsoft, Amazon &amp; Meta are already mentoring.
                    </div>
                  </div>

                </div>

                {/* Right Column: Direct Application Form (5 cols) */}
                <div className="lg:col-span-5 w-full">
                  <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 shadow-xl relative overflow-hidden">
                    
                    {/* Eyebrow Pill */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/25 text-[#2563EB] text-xs font-semibold mb-3">
                      <Sparkles size={13} className="text-[#2563EB]" />
                      <span>Direct Application</span>
                    </div>

                    {/* Form Title & Subtitle */}
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-[family-name:var(--font-display)] mb-1">
                      Share Your Profile With Us
                    </h2>
                    <p className="text-xs text-slate-500 mb-5 leading-relaxed">
                      Submit your details below. Our team responds within 24–48 hours.
                    </p>

                    {submitted ? (
                      <div className="py-8 text-center space-y-3">
                        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                          <CheckCircle2 size={28} />
                        </div>
                        <h3 className="text-base font-bold text-slate-900">Application Submitted!</h3>
                        <p className="text-xs text-slate-600 max-w-xs mx-auto">
                          Thank you, {fullName}. Our Talent Guild team will review your profile and reach out within 24–48 hours.
                        </p>
                        <button
                          onClick={() => {
                            setSubmitted(false);
                            setFullName('');
                            setEmail('');
                            setPhone('');
                            setResumeFile(null);
                            setPortfolioLink('');
                          }}
                          className="text-xs font-bold text-[#2563EB] hover:underline pt-2 cursor-pointer"
                        >
                          Submit another application
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmitApplication} className="space-y-4">
                        
                        {/* Full Name */}
                        <div>
                          <label className="block text-xs font-bold text-slate-800 mb-1.5">
                            Full Name <span className="text-blue-600">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="e.g. Rahul Sharma"
                            className="w-full bg-[#F8FAFC] border border-slate-200 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15 transition-all shadow-2xs"
                          />
                        </div>

                        {/* Email Address */}
                        <div>
                          <label className="block text-xs font-bold text-slate-800 mb-1.5">
                            Email Address <span className="text-blue-600">*</span>
                          </label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="rahul@example.com"
                            className="w-full bg-[#F8FAFC] border border-slate-200 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15 transition-all shadow-2xs"
                          />
                        </div>

                        {/* Phone Number */}
                        <div>
                          <label className="block text-xs font-bold text-slate-800 mb-1.5">
                            Phone Number <span className="text-blue-600">*</span>
                          </label>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="e.g. +91 98765 43210"
                            className="w-full bg-[#F8FAFC] border border-slate-200 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15 transition-all shadow-2xs"
                          />
                        </div>

                        {/* Resume / CV Upload & Link */}
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <label className="text-xs font-bold text-slate-800">
                              Resume / CV <span className="text-blue-600">*</span>
                            </label>
                            <span className="text-[10px] font-semibold text-[#2563EB] bg-[#2563EB]/10 px-2 py-0.5 rounded-md">
                              File OR Link
                            </span>
                          </div>

                          {/* File Upload Box */}
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept=".pdf,.doc,.docx"
                            className="hidden"
                          />
                          
                          <div
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full p-3 rounded-2xl bg-[#F8FAFC] border border-slate-200 hover:border-[#2563EB]/40 flex items-center justify-between cursor-pointer transition-colors mb-2 group shadow-2xs"
                          >
                            <div className="flex items-center gap-2 text-xs text-slate-600">
                              {resumeFile ? (
                                <>
                                  <FileText size={15} className="text-emerald-600" />
                                  <span className="font-semibold text-slate-900 truncate max-w-[180px] sm:max-w-[220px]">
                                    {resumeFile.name}
                                  </span>
                                </>
                              ) : (
                                <>
                                  <Upload size={15} className="text-[#2563EB] group-hover:scale-110 transition-transform" />
                                  <span>Upload PDF / Word Resume</span>
                                </>
                              )}
                            </div>
                            <span className="text-xs font-bold text-slate-700 bg-white border border-slate-200 px-3 py-1 rounded-xl shadow-2xs group-hover:border-[#2563EB]">
                              Browse
                            </span>
                          </div>

                          {/* Link Fallback */}
                          <input
                            type="text"
                            value={portfolioLink}
                            onChange={(e) => setPortfolioLink(e.target.value)}
                            placeholder="Or paste Google Drive / Portfolio Link..."
                            className="w-full bg-[#F8FAFC] border border-slate-200 rounded-2xl px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15 transition-all shadow-2xs"
                          />
                        </div>

                        {errorMsg && (
                          <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 font-medium">
                            <AlertCircle size={14} className="shrink-0" />
                            <span>{errorMsg}</span>
                          </div>
                        )}

                        {/* Submit Button */}
                        <button
                          type="submit"
                          disabled={submitting}
                          className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#60A5FA] text-white text-xs sm:text-sm font-bold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-2"
                        >
                          <Send size={14} />
                          <span>{submitting ? 'Submitting Application...' : 'Submit Application for Mentor Role'}</span>
                        </button>

                        {/* Footer Note */}
                        <p className="text-[11px] text-slate-500 text-center pt-1 font-normal">
                          Your application is securely submitted to Grow360 Talent Guild.
                        </p>

                      </form>
                    )}

                  </div>
                </div>

              </div>
            </div>
          </section>
        )}

        {/* ========================================================
            02. CAREER OPPORTUNITIES (INTEGRATED JOB PORTAL)
        ======================================================== */}
        <section id="career-portal" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {!isDirectJobView && (
            <div className="text-center max-w-3xl mx-auto mb-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/25 text-[#2563EB] text-xs font-semibold tracking-wide mb-3">
                <Briefcase size={14} className="text-[#2563EB]" />
                <span>Open Positions &amp; Roles</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-[family-name:var(--font-display)] mb-3">
                Career <span className="text-[#2563EB]">Opportunities</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Explore open flexible mock interviewing, DSA instruction, cloud architecture, and corporate training positions. Apply directly with your resume or LinkedIn profile.
              </p>
            </div>
          )}

          {/* Embedded Job Portal */}
          <MentorJobPortal />
        </section>

      </main>

    </div>
  );
}
