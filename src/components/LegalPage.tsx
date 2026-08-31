import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  FileText,
  Cookie,
  Lock,
  Eye,
  Database,
  Scale,
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Footer } from './Footer';

export type LegalTab = 'privacy' | 'terms' | 'cookies';

interface LegalPageProps {
  initialTab?: LegalTab;
  onBackToHome?: () => void;
}

export function LegalPage({ initialTab = 'privacy', onBackToHome: _ }: LegalPageProps) {
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
    <div className="min-h-screen bg-[#F8F9FB] text-slate-100 font-sans selection:bg-[#2563EB] selection:text-slate-900">
      {/* Main Container */}
      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header Title Card */}
          <div className="mb-10 p-6 sm:p-8 rounded-3xl bg-white shadow-sm border border-black/8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#2563EB]/10 to-transparent blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-black/8 text-xs font-mono text-[#2563EB]">
                  <Sparkles size={12} />
                  <span>Grow360 Trust &amp; Compliance</span>
                </div>

                {/* Tab Selector Buttons */}
                <div className="flex items-center gap-1.5 p-1 bg-white/5 border border-black/8 rounded-2xl">
                  <button
                    onClick={() => handleTabChange('privacy')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeTab === 'privacy'
                        ? 'bg-gradient-to-r from-[#2563EB] to-[#6B8E87] text-slate-900 font-bold shadow-md'
                        : 'text-slate-600 hover:text-slate-900'
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
                        ? 'bg-gradient-to-r from-[#2563EB] to-[#6B8E87] text-slate-900 font-bold shadow-md'
                        : 'text-slate-600 hover:text-slate-900'
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
                        ? 'bg-gradient-to-r from-[#2563EB] to-[#6B8E87] text-slate-900 font-bold shadow-md'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Cookie size={13} />
                    <span className="hidden sm:inline">Cookie Policy</span>
                    <span className="sm:hidden">Cookies</span>
                  </button>
                </div>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-[family-name:var(--font-display)] tracking-tight mb-3">
                {activeTab === 'privacy' && 'Privacy Policy'}
                {activeTab === 'terms' && 'Terms of Service'}
                {activeTab === 'cookies' && 'Cookie Policy'}
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                {activeTab === 'privacy' &&
                  'Learn how Grow360 collects, protects, processes, and respects your personal and institutional placement information.'}
                {activeTab === 'terms' &&
                  'The standard terms, rules, and conditions governing the use of Grow360 placement infrastructure, assessment platforms, and mentor services.'}
                {activeTab === 'cookies' &&
                  'Details on how we use cookies, session identifiers, and browser technologies to provide secure, reliable platform experiences.'}
              </p>

              <div className="mt-6 pt-4 border-t border-black/8 flex flex-wrap items-center gap-4 text-[11px] font-mono text-slate-500">
                <span>Last Updated: August 2026</span>
                <span>•</span>
                <span>Version 2.4</span>
                <span>•</span>
                <span>Applies to Grow360 Training & Placement Infrastructure</span>
              </div>
            </div>
          </div>

          {/* Document Content View */}
          <div className="bg-[#0C0C10] rounded-3xl border border-black/8 p-6 sm:p-10 shadow-xl">
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
      className="space-y-10 text-slate-700 text-xs sm:text-sm leading-relaxed"
    >
      <section>
        <div className="flex items-center gap-2.5 text-slate-900 font-bold text-base sm:text-lg mb-3">
          <Eye size={18} className="text-[#2563EB]" />
          <h3>1. Introduction & Overview</h3>
        </div>
        <p className="mb-3">
          Welcome to <strong className="text-slate-900">Grow360</strong> ("we", "our", or "us"). Grow360 — Decoding the corporate world is an institutional Training and Placement Infrastructure provider dedicated to bridging engineering colleges with top hiring partners, mentorship programs, and AI-driven placement readiness assessments.
        </p>
        <p>
          This Privacy Policy describes how we collect, store, utilize, and safeguard data when colleges, students, mentors, and recruiters access our website, web application, and training portals.
        </p>
      </section>

      <section className="border-t border-black/8 pt-8">
        <div className="flex items-center gap-2.5 text-slate-900 font-bold text-base sm:text-lg mb-3">
          <Database size={18} className="text-[#38BDF8]" />
          <h3>2. Information We Collect</h3>
        </div>
        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-black/5">
            <strong className="text-slate-900 block mb-1">A. Student Data</strong>
            <p className="text-xs text-slate-600">
              Name, email address, contact numbers, college affiliation, academic transcripts, technical assessment telemetry, coding submissions, and uploaded resumes/CV links.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-black/5">
            <strong className="text-slate-900 block mb-1">B. Institutional & TPO Data</strong>
            <p className="text-xs text-slate-600">
              College name, authorized coordinator contact details, department designations, batch sizes, and placement drive participation history.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-black/5">
            <strong className="text-slate-900 block mb-1">C. Mentor & Interviewer Data</strong>
            <p className="text-xs text-slate-600">
              Professional LinkedIn profiles, current engineering domains, honorarium payment information, and session feedback logs.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-black/8 pt-8">
        <div className="flex items-center gap-2.5 text-slate-900 font-bold text-base sm:text-lg mb-3">
          <Lock size={18} className="text-[#3B82F6]" />
          <h3>3. How We Use Information</h3>
        </div>
        <ul className="space-y-2 list-disc list-inside text-slate-700">
          <li>Delivering customized technical curriculum modules and AI mock interview feedback.</li>
          <li>Generating verified placement scorecards for student profiles.</li>
          <li>Facilitating recruitment shortlisting and campus drive scheduling with hiring partners.</li>
          <li>Maintaining institutional security, preventing unauthorized access, and improving platform latency.</li>
        </ul>
      </section>

      <section className="border-t border-black/8 pt-8">
        <div className="flex items-center gap-2.5 text-slate-900 font-bold text-base sm:text-lg mb-3">
          <ShieldCheck size={18} className="text-[#22C55E]" />
          <h3>4. Data Sharing & Third Parties</h3>
        </div>
        <p className="mb-3">
          Grow360 never sells personal or academic data to third-party advertisers. Data is shared exclusively under the following strict circumstances:
        </p>
        <ul className="space-y-2 list-disc list-inside text-slate-700">
          <li><strong>Partner Hiring Companies:</strong> With student consent, resume and technical assessment performance data are shared with hiring partners for recruitment drives.</li>
          <li><strong>Partner Colleges:</strong> Institutional placement analytics and cohort attendance reports are shared with the respective college placement cell.</li>
          <li><strong>Service Infrastructure:</strong> Secure cloud database and communication providers (e.g. Supabase, AWS, Render, Vercel) bound by strict confidentiality agreements.</li>
        </ul>
      </section>

      <section className="border-t border-black/8 pt-8">
        <div className="flex items-center gap-2.5 text-slate-900 font-bold text-base sm:text-lg mb-3">
          <ShieldCheck size={18} className="text-[#2563EB]" />
          <h3>5. Data Security & Storage</h3>
        </div>
        <p>
          We implement industry-standard 256-bit encryption (TLS/SSL) in transit and at rest. Strict role-based access control is enforced to ensure that only authorized personnel can access sensitive assessment and student records.
        </p>
      </section>

      <section className="border-t border-black/8 pt-8">
        <div className="flex items-center gap-2.5 text-slate-900 font-bold text-base sm:text-lg mb-3">
          <Scale size={18} className="text-[#A855F7]" />
          <h3>6. Your Rights & Contact</h3>
        </div>
        <p className="mb-4">
          You have the right to access, rectify, or request deletion of your personal data stored on Grow360 at any time. For privacy inquiries or grievance redressal, please contact our Data Protection Team:
        </p>
        <div className="p-4 rounded-2xl bg-white shadow-sm border border-black/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-slate-900 font-bold">Grow360 Privacy & Grievance Desk</div>
            <div className="text-xs text-slate-600 font-mono mt-0.5">Email: privacy@grow360.in</div>
          </div>
          <a
            href="mailto:privacy@grow360.in"
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
      className="space-y-10 text-slate-700 text-xs sm:text-sm leading-relaxed"
    >
      <section>
        <div className="flex items-center gap-2.5 text-slate-900 font-bold text-base sm:text-lg mb-3">
          <Scale size={18} className="text-[#2563EB]" />
          <h3>1. Acceptance of Terms</h3>
        </div>
        <p>
          By accessing or using the Grow360 platform, websites, institutional training modules, or mentor programs, you agree to be bound by these Terms of Service. If you are using the platform on behalf of an educational institution or company, you represent that you have the requisite authority to bind that entity to these terms.
        </p>
      </section>

      <section className="border-t border-black/8 pt-8">
        <div className="flex items-center gap-2.5 text-slate-900 font-bold text-base sm:text-lg mb-3">
          <CheckCircle2 size={18} className="text-[#22C55E]" />
          <h3>2. Platform Services & Eligibility</h3>
        </div>
        <p className="mb-3">
          Grow360 provides specialized engineering placement training, algorithmic assessments, live mock interviews, ATS optimization, and recruitment networking.
        </p>
        <ul className="space-y-2 list-disc list-inside text-slate-700">
          <li>Users must provide accurate, verifiable information during account registration and profile setup.</li>
          <li>Accounts are non-transferable and intended solely for the registered student, educator, mentor, or recruiter.</li>
        </ul>
      </section>

      <section className="border-t border-black/8 pt-8">
        <div className="flex items-center gap-2.5 text-slate-900 font-bold text-base sm:text-lg mb-3">
          <AlertCircle size={18} className="text-[#3B82F6]" />
          <h3>3. User Conduct & Acceptable Use</h3>
        </div>
        <p className="mb-3">When using Grow360, you agree not to:</p>
        <ul className="space-y-2 list-disc list-inside text-slate-700">
          <li>Engage in plagiarism or automated cheating during algorithmic assessments or coding evaluations.</li>
          <li>Submit falsified resume credentials, academic transcripts, or employment records.</li>
          <li>Attempt to decompile, reverse-engineer, or scrape any portion of our web portals or question banks.</li>
          <li>Use offensive, defamatory, or harassing language during live video mentor sessions.</li>
        </ul>
      </section>

      <section className="border-t border-black/8 pt-8">
        <div className="flex items-center gap-2.5 text-slate-900 font-bold text-base sm:text-lg mb-3">
          <Lock size={18} className="text-[#38BDF8]" />
          <h3>4. Mentor & Honorarium Terms</h3>
        </div>
        <p>
          Industry professionals participating in the Grow360 Mentor Network agree to conduct technical mock interviews in accordance with provided evaluation rubrics. Honorariums are disbursed on scheduled weekly cycles based on successfully completed sessions. Mentors operate as independent contractors with complete scheduling flexibility.
        </p>
      </section>

      <section className="border-t border-black/8 pt-8">
        <div className="flex items-center gap-2.5 text-slate-900 font-bold text-base sm:text-lg mb-3">
          <ShieldCheck size={18} className="text-[#A855F7]" />
          <h3>5. Intellectual Property</h3>
        </div>
        <p>
          All proprietary training curricula, mock question repositories, evaluation benchmarks, and branding assets on the Grow360 platform remain the exclusive intellectual property of Grow360. No content may be reproduced or distributed without explicit written permission.
        </p>
      </section>

      <section className="border-t border-black/8 pt-8">
        <div className="flex items-center gap-2.5 text-slate-900 font-bold text-base sm:text-lg mb-3">
          <Scale size={18} className="text-[#2563EB]" />
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
      className="space-y-10 text-slate-700 text-xs sm:text-sm leading-relaxed"
    >
      <section>
        <div className="flex items-center gap-2.5 text-slate-900 font-bold text-base sm:text-lg mb-3">
          <Cookie size={18} className="text-[#3B82F6]" />
          <h3>1. What Are Cookies?</h3>
        </div>
        <p>
          Cookies are small text files placed on your computer or mobile device when you browse websites. They help websites remember your device, preserve login states, save preferences, and deliver optimal performance.
        </p>
      </section>

      <section className="border-t border-black/8 pt-8">
        <div className="flex items-center gap-2.5 text-slate-900 font-bold text-base sm:text-lg mb-3">
          <Database size={18} className="text-[#38BDF8]" />
          <h3>2. Cookies We Use on Grow360</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-black/5">
            <strong className="text-slate-900 block mb-1 text-xs sm:text-sm">Essential & Authentication Cookies</strong>
            <p className="text-xs text-slate-600">
              Required for security, user authentication, session maintenance, and student dashboard persistence.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-black/5">
            <strong className="text-slate-900 block mb-1 text-xs sm:text-sm">Performance & Analytics Cookies</strong>
            <p className="text-xs text-slate-600">
              Help us measure page load speeds, diagnose bottlenecks, and understand feature utilization across devices.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-black/5">
            <strong className="text-slate-900 block mb-1 text-xs sm:text-sm">Preference & Customization Cookies</strong>
            <p className="text-xs text-slate-600">
              Remember your selected filters (e.g. mentor domain tags, employment type, location preferences).
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-black/8 pt-8">
        <div className="flex items-center gap-2.5 text-slate-900 font-bold text-base sm:text-lg mb-3">
          <Lock size={18} className="text-[#22C55E]" />
          <h3>3. Managing Cookie Preferences</h3>
        </div>
        <p>
          Most modern browsers permit you to block or delete cookies through browser settings. Note that disabling essential cookies may impact authentication and interactive features on the Grow360 platform.
        </p>
      </section>
    </motion.div>
  );
}
