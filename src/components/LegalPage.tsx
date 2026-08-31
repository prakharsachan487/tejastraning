import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  FileText,
  Cookie,
  ArrowLeft,
  Lock,
  Eye,
  Database,
  UserCheck,
  Scale,
  Sparkles,
  Mail,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Footer } from './Footer';

export type LegalTab = 'privacy' | 'terms' | 'cookies';

interface LegalPageProps {
  initialTab?: LegalTab;
  onBackToHome: () => void;
}

export function LegalPage({ initialTab = 'privacy', onBackToHome }: LegalPageProps) {
  const [activeTab, setActiveTab] = useState<LegalTab>(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [activeTab]);

  const handleTabChange = (tab: LegalTab) => {
    setActiveTab(tab);
    if (tab === 'privacy') window.location.hash = '#privacy';
    else if (tab === 'terms') window.location.hash = '#terms';
    else if (tab === 'cookies') window.location.hash = '#cookies';
  };

  return (
    <div className="min-h-screen bg-[#07070A] text-slate-100 font-sans selection:bg-[#FF4500] selection:text-white">
      {/* Top Sticky Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#07070A]/90 backdrop-blur-xl border-b border-white/10 h-18 flex items-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={onBackToHome}
              className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer group"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              <span>Back to Home</span>
            </button>

            <div className="h-4 w-px bg-white/10 hidden sm:block" />

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FF4500] to-[#FFA000] flex items-center justify-center text-white font-extrabold text-xs">
                TJ
              </div>
              <span className="text-lg font-extrabold text-white font-[family-name:var(--font-display)]">
                TEJAS <span className="text-xs font-mono font-normal text-[#FFA000] ml-1">Legal</span>
              </span>
            </div>
          </div>

          {/* Tab Selector Buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-2xl">
            <button
              onClick={() => handleTabChange('privacy')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'privacy'
                  ? 'bg-gradient-to-r from-[#FF4500] to-[#FFA000] text-white font-bold shadow-md shadow-orange-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldCheck size={13} />
              <span className="hidden sm:inline">Privacy Policy</span>
              <span className="sm:hidden">Privacy</span>
            </button>
            <button
              onClick={() => handleTabChange('terms')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'terms'
                  ? 'bg-gradient-to-r from-[#FF4500] to-[#FFA000] text-white font-bold shadow-md shadow-orange-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText size={13} />
              <span className="hidden sm:inline">Terms of Service</span>
              <span className="sm:hidden">Terms</span>
            </button>
            <button
              onClick={() => handleTabChange('cookies')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'cookies'
                  ? 'bg-gradient-to-r from-[#FF4500] to-[#FFA000] text-white font-bold shadow-md shadow-orange-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Cookie size={13} />
              <span className="hidden sm:inline">Cookie Policy</span>
              <span className="sm:hidden">Cookies</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Banner */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#121218] via-[#0E0E14] to-[#0A0A0D] border border-white/10 shadow-2xl relative overflow-hidden mb-12">
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#FF4500]/10 via-[#FFA000]/5 to-transparent blur-[120px] pointer-events-none rounded-full" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF4500]/10 border border-[#FF4500]/25 text-[#FFA000] text-xs font-mono font-bold uppercase tracking-wider mb-4">
                <Sparkles size={13} className="text-[#FF4500]" />
                <span>Compliance & Trust</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-[family-name:var(--font-display)] mb-3">
                {activeTab === 'privacy' && 'Privacy Policy'}
                {activeTab === 'terms' && 'Terms of Service'}
                {activeTab === 'cookies' && 'Cookie Policy'}
              </h1>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-2xl">
                {activeTab === 'privacy' &&
                  'Learn how TEJAS collects, protects, processes, and respects your personal and institutional placement information.'}
                {activeTab === 'terms' &&
                  'The standard terms, rules, and conditions governing the use of TEJAS placement infrastructure, assessment platforms, and mentor services.'}
                {activeTab === 'cookies' &&
                  'Details on how we use cookies, session identifiers, and browser technologies to provide secure, reliable platform experiences.'}
              </p>

              <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center gap-4 text-[11px] font-mono text-slate-500">
                <span>Last Updated: August 2026</span>
                <span>•</span>
                <span>Version 2.4</span>
                <span>•</span>
                <span>Applies to TEJAS Training & Placement Infrastructure</span>
              </div>
            </div>
          </div>

          {/* Document Content View */}
          <div className="bg-[#0C0C10] rounded-3xl border border-white/10 p-6 sm:p-10 shadow-xl">
            <AnimatePresence mode="wait">
              {activeTab === 'privacy' && <PrivacyContent key="privacy" />}
              {activeTab === 'terms' && <TermsContent key="terms" />}
              {activeTab === 'cookies' && <CookiesContent key="cookies" />}
            </AnimatePresence>
          </div>

        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

/* =========================================================================
   01. PRIVACY POLICY CONTENT
   ========================================================================= */
function PrivacyContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.2 }}
      className="space-y-10 text-slate-300 text-xs sm:text-sm leading-relaxed"
    >
      <section>
        <div className="flex items-center gap-2.5 text-white font-bold text-base sm:text-lg mb-3">
          <Eye size={18} className="text-[#FF4500]" />
          <h3>1. Introduction & Overview</h3>
        </div>
        <p className="mb-3">
          Welcome to <strong className="text-white">TEJAS</strong> ("we", "our", or "us"). TEJAS is an institutional Training and Placement Infrastructure provider dedicated to bridging tier-2/3 engineering colleges with top tier-1 hiring partners, mentorship programs, and AI-driven placement readiness assessments.
        </p>
        <p>
          This Privacy Policy describes how we collect, store, utilize, and safeguard data when colleges, students, mentors, and recruiters access our website, web application, and training portals.
        </p>
      </section>

      <section className="border-t border-white/10 pt-8">
        <div className="flex items-center gap-2.5 text-white font-bold text-base sm:text-lg mb-3">
          <Database size={18} className="text-[#38BDF8]" />
          <h3>2. Information We Collect</h3>
        </div>
        <p className="mb-3">We collect information to provide and enhance our placement infrastructure services:</p>
        <div className="space-y-3 pl-2">
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
            <strong className="text-white block mb-1">A. Personal Identification & Contact Details</strong>
            <span>Name, email address, phone/WhatsApp number, college name, branch, graduation year, and professional profile links (e.g. LinkedIn, GitHub, LeetCode).</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
            <strong className="text-white block mb-1">B. Institutional & Consultation Enquiries</strong>
            <span>College name, administrator/TPO name, institutional designation, email, phone number, and requested training scope.</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
            <strong className="text-white block mb-1">C. Placement & Skill Diagnostic Records</strong>
            <span>Resume documents, coding test submissions, mock interview feedback rubrics, and platform activity data.</span>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 pt-8">
        <div className="flex items-center gap-2.5 text-white font-bold text-base sm:text-lg mb-3">
          <Lock size={18} className="text-[#22C55E]" />
          <h3>3. How We Use Your Information</h3>
        </div>
        <ul className="space-y-2 list-disc list-inside text-slate-300">
          <li>To operate and provide personalized placement preparation and mentor mock interview sessions.</li>
          <li>To provide verified student candidate profiles and skill summaries to authorized partner recruiters.</li>
          <li>To generate institutional placement audit reports for colleges and training placement cells.</li>
          <li>To verify applicant credentials for mentor and instructor job openings.</li>
          <li>To comply with regulatory standards and maintain platform integrity.</li>
        </ul>
      </section>

      <section className="border-t border-white/10 pt-8">
        <div className="flex items-center gap-2.5 text-white font-bold text-base sm:text-lg mb-3">
          <UserCheck size={18} className="text-[#FFA000]" />
          <h3>4. Data Sharing & Disclosure</h3>
        </div>
        <p className="mb-3">
          We do not sell, rent, or trade your personal data to advertisers. We share information only under the following strict circumstances:
        </p>
        <ul className="space-y-2 list-disc list-inside text-slate-300">
          <li><strong>Partner Hiring Companies:</strong> With student consent, resume and technical assessment performance data are shared with hiring partners for recruitment drives.</li>
          <li><strong>Partner Colleges:</strong> Institutional placement analytics and cohort attendance reports are shared with the respective college placement cell.</li>
          <li><strong>Service Infrastructure:</strong> Secure cloud database and communication providers (e.g. AWS, Render, Vercel) bound by strict confidentiality agreements.</li>
        </ul>
      </section>

      <section className="border-t border-white/10 pt-8">
        <div className="flex items-center gap-2.5 text-white font-bold text-base sm:text-lg mb-3">
          <ShieldCheck size={18} className="text-[#FF4500]" />
          <h3>5. Data Security & Storage</h3>
        </div>
        <p>
          We implement industry-standard 256-bit encryption (TLS/SSL) in transit and at rest. Strict role-based access control is enforced to ensure that only authorized personnel can access sensitive assessment and student records.
        </p>
      </section>

      <section className="border-t border-white/10 pt-8">
        <div className="flex items-center gap-2.5 text-white font-bold text-base sm:text-lg mb-3">
          <Scale size={18} className="text-[#A855F7]" />
          <h3>6. Your Rights & Contact</h3>
        </div>
        <p className="mb-4">
          You have the right to access, rectify, or request deletion of your personal data stored on TEJAS at any time. For privacy inquiries or grievance redressal, please contact our Data Protection Team:
        </p>
        <div className="p-4 rounded-2xl bg-[#111116] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-white font-bold">TEJAS Privacy & Grievance Desk</div>
            <div className="text-xs text-slate-400 font-mono mt-0.5">Email: privacy@tejasplacement.in | Phone: +91 9041429928</div>
          </div>
          <a
            href="mailto:privacy@tejasplacement.in"
            className="btn-pill-secondary text-xs py-2 px-4 whitespace-nowrap cursor-pointer"
          >
            Contact Privacy Team
          </a>
        </div>
      </section>
    </motion.div>
  );
}

/* =========================================================================
   02. TERMS OF SERVICE CONTENT
   ========================================================================= */
function TermsContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.2 }}
      className="space-y-10 text-slate-300 text-xs sm:text-sm leading-relaxed"
    >
      <section>
        <div className="flex items-center gap-2.5 text-white font-bold text-base sm:text-lg mb-3">
          <Scale size={18} className="text-[#FF4500]" />
          <h3>1. Acceptance of Terms</h3>
        </div>
        <p>
          By accessing or using the TEJAS platform, websites, institutional training modules, or mentor programs, you agree to be bound by these Terms of Service. If you are using the platform on behalf of an educational institution or company, you represent that you have the requisite authority to bind that entity to these terms.
        </p>
      </section>

      <section className="border-t border-white/10 pt-8">
        <div className="flex items-center gap-2.5 text-white font-bold text-base sm:text-lg mb-3">
          <CheckCircle2 size={18} className="text-[#22C55E]" />
          <h3>2. Platform Services & Eligibility</h3>
        </div>
        <p className="mb-3">
          TEJAS provides specialized engineering placement training, algorithmic assessments, live mock interviews, ATS optimization, and recruitment networking.
        </p>
        <ul className="space-y-2 list-disc list-inside text-slate-300">
          <li>Users must provide accurate, verifiable information during account registration and profile setup.</li>
          <li>Accounts are non-transferable and intended solely for the registered student, educator, mentor, or recruiter.</li>
        </ul>
      </section>

      <section className="border-t border-white/10 pt-8">
        <div className="flex items-center gap-2.5 text-white font-bold text-base sm:text-lg mb-3">
          <AlertCircle size={18} className="text-[#FFA000]" />
          <h3>3. User Conduct & Acceptable Use</h3>
        </div>
        <p className="mb-3">When using TEJAS, you agree not to:</p>
        <ul className="space-y-2 list-disc list-inside text-slate-300">
          <li>Engage in plagiarism or automated cheating during algorithmic assessments or coding evaluations.</li>
          <li>Submit falsified resume credentials, academic transcripts, or employment records.</li>
          <li>Attempt to decompile, reverse-engineer, or scrape any portion of our web portals or question banks.</li>
          <li>Use offensive, defamatory, or harassing language during live video mentor sessions.</li>
        </ul>
      </section>

      <section className="border-t border-white/10 pt-8">
        <div className="flex items-center gap-2.5 text-white font-bold text-base sm:text-lg mb-3">
          <Lock size={18} className="text-[#38BDF8]" />
          <h3>4. Mentor & Honorarium Terms</h3>
        </div>
        <p>
          Industry professionals participating in the TEJAS Mentor Network agree to conduct technical mock interviews in accordance with provided evaluation rubrics. Honorariums are disbursed on scheduled weekly cycles based on successfully completed sessions. Mentors operate as independent contractors with complete scheduling flexibility.
        </p>
      </section>

      <section className="border-t border-white/10 pt-8">
        <div className="flex items-center gap-2.5 text-white font-bold text-base sm:text-lg mb-3">
          <ShieldCheck size={18} className="text-[#A855F7]" />
          <h3>5. Intellectual Property</h3>
        </div>
        <p>
          All proprietary training curricula, mock question repositories, evaluation benchmarks, and branding assets on the TEJAS platform remain the exclusive intellectual property of TEJAS. No content may be reproduced or distributed without explicit written permission.
        </p>
      </section>

      <section className="border-t border-white/10 pt-8">
        <div className="flex items-center gap-2.5 text-white font-bold text-base sm:text-lg mb-3">
          <Scale size={18} className="text-[#FF4500]" />
          <h3>6. Governing Law & Dispute Resolution</h3>
        </div>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or related to these terms shall be subject to the exclusive jurisdiction of the competent courts in New Delhi, India.
        </p>
      </section>
    </motion.div>
  );
}

/* =========================================================================
   03. COOKIE POLICY CONTENT
   ========================================================================= */
function CookiesContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.2 }}
      className="space-y-10 text-slate-300 text-xs sm:text-sm leading-relaxed"
    >
      <section>
        <div className="flex items-center gap-2.5 text-white font-bold text-base sm:text-lg mb-3">
          <Cookie size={18} className="text-[#FFA000]" />
          <h3>1. What Are Cookies?</h3>
        </div>
        <p>
          Cookies are small text files placed on your computer or mobile device when you browse websites. They help websites remember your device, preserve login states, save preferences, and deliver optimal performance.
        </p>
      </section>

      <section className="border-t border-white/10 pt-8">
        <div className="flex items-center gap-2.5 text-white font-bold text-base sm:text-lg mb-3">
          <Database size={18} className="text-[#38BDF8]" />
          <h3>2. Cookies We Use on TEJAS</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <strong className="text-white block mb-1 text-xs sm:text-sm">Essential & Authentication Cookies</strong>
            <p className="text-xs text-slate-400">
              Required for security, user authentication, session maintenance, and student dashboard persistence.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <strong className="text-white block mb-1 text-xs sm:text-sm">Performance & Analytics Cookies</strong>
            <p className="text-xs text-slate-400">
              Help us measure page load speeds, diagnose bottlenecks, and understand feature utilization across devices.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <strong className="text-white block mb-1 text-xs sm:text-sm">Preference & Customization Cookies</strong>
            <p className="text-xs text-slate-400">
              Remember your selected filters (e.g. mentor domain tags, employment type, location preferences).
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <strong className="text-white block mb-1 text-xs sm:text-sm">Security & Integrity Cookies</strong>
            <p className="text-xs text-slate-400">
              Prevent Cross-Site Request Forgery (CSRF) and protect user submissions during test sessions.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 pt-8">
        <div className="flex items-center gap-2.5 text-white font-bold text-base sm:text-lg mb-3">
          <ShieldCheck size={18} className="text-[#22C55E]" />
          <h3>3. Managing Your Cookie Preferences</h3>
        </div>
        <p className="mb-3">
          Most web browsers allow you to control or delete cookies through browser settings. You can configure your browser to reject cookies or notify you when a cookie is placed:
        </p>
        <ul className="space-y-1.5 list-disc list-inside text-slate-300">
          <li><strong>Google Chrome:</strong> Settings &gt; Privacy and Security &gt; Cookies and other site data</li>
          <li><strong>Mozilla Firefox:</strong> Options &gt; Privacy & Security &gt; Cookies and Site Data</li>
          <li><strong>Apple Safari:</strong> Preferences &gt; Privacy &gt; Manage Website Data</li>
        </ul>
        <p className="mt-3 text-slate-400 text-xs">
          Note: Disabling essential authentication cookies may affect your ability to log in to the student dashboard.
        </p>
      </section>

      <section className="border-t border-white/10 pt-8">
        <div className="flex items-center gap-2.5 text-white font-bold text-base sm:text-lg mb-3">
          <Mail size={18} className="text-[#FF4500]" />
          <h3>4. Questions About Cookies?</h3>
        </div>
        <p>
          If you have any questions regarding our cookie practices, please contact us at <a href="mailto:support@tejasplacement.in" className="text-[#FFA000] hover:underline font-mono">support@tejasplacement.in</a>.
        </p>
      </section>
    </motion.div>
  );
}
