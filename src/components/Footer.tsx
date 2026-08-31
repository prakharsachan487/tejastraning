import { useState } from 'react';
import { useEnquiry } from '../context/EnquiryContext';
import { MapPin, Phone, Mail, Send, CheckCircle2, BookOpen, Users, GraduationCap, UserCheck } from 'lucide-react';

export function Footer() {
  const { openEnquiry } = useEnquiry();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const nav = (href: string) => {
    if (!href || href === '#') {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    if (href === '#training' || href === '#programs') {
      window.location.hash = '#training-programs';
      return;
    }
    if (href === '#blog' || href === '#blogs' || href === '#articles') {
      window.location.hash = '#blog';
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    const elem = document.querySelector(href);
    if (elem) {
      elem.scrollIntoView({ behavior: 'instant' });
    } else {
      window.location.hash = href;
    }
  };

  return (
    <footer className="bg-[#F1F4F9] text-slate-600 pt-12 pb-8 relative overflow-hidden border-t border-slate-200/80 selection:bg-[#2563EB] selection:text-white">
      {/* Giant "GROW 360" Background Watermark Typography - Perfectly Centered */}
      <div className="absolute inset-x-0 bottom-6 sm:bottom-8 w-full flex items-center justify-center select-none pointer-events-none z-0 overflow-hidden">
        <span className="text-6xl sm:text-7xl md:text-[8rem] lg:text-[10rem] font-extrabold text-slate-900/[0.03] tracking-tight whitespace-nowrap text-center leading-none">
          GROW 360°
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid: 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 mb-10">
          
          {/* Column 1: Brand, Newsletter & Backed By (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              {/* Grow360 Brand Logo */}
              <div 
                className="flex items-center gap-2.5 mb-3 cursor-pointer select-none group"
                onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
              >
                <img
                  src="/grow360-logo.png"
                  alt="Grow360 Logo"
                  className="h-8.5 w-auto object-contain rounded-lg group-hover:scale-105 transition-transform"
                />
                <div className="flex flex-col leading-tight">
                  <span className="text-xl font-extrabold text-[#0F172A] tracking-tight font-[family-name:var(--font-display)] flex items-center">
                    GROW<span className="text-[#2563EB]">360°</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 tracking-wider">
                    Decoding the corporate world
                  </span>
                </div>
              </div>

              {/* Newsletter Subscription Box */}
              <div className="mt-2 mb-4 max-w-sm">
                <p className="text-xs font-bold text-slate-900 mb-1 flex items-center gap-1.5 font-[family-name:var(--font-display)]">
                  <Send size={12} className="text-[#2563EB]" />
                  <span>Placement &amp; Industry Newsletter</span>
                </p>
                <p className="text-[11px] text-slate-500 mb-2 leading-relaxed">
                  Weekly hiring rubrics, curriculum guides, and placement trends.
                </p>
                {isSubscribed ? (
                  <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                    <span>Subscribed! Welcome to Grow360 insights.</span>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (newsletterEmail.trim()) setIsSubscribed(true);
                    }}
                    className="flex items-center gap-1.5"
                  >
                    <input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Enter college or work email"
                      className="bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] w-full shadow-2xs"
                    />
                    <button
                      type="submit"
                      className="btn-pill-primary text-xs px-3 py-1.5 font-bold shrink-0 cursor-pointer"
                    >
                      Subscribe
                    </button>
                  </form>
                )}
              </div>

              {/* Backed By Developers From */}
              <div>
                <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 mb-2 font-mono">
                  BACKED BY DEVELOPERS FROM
                </p>
                <div className="flex items-center gap-4">
                  {/* Microsoft */}
                  <div className="flex items-center gap-1 opacity-90 hover:opacity-100 transition-opacity">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 21 21">
                      <rect x="1" y="1" width="9" height="9" fill="#F25022" />
                      <rect x="11" y="1" width="9" height="9" fill="#7FBA00" />
                      <rect x="1" y="11" width="9" height="9" fill="#00A4EF" />
                      <rect x="11" y="11" width="9" height="9" fill="#FFB900" />
                    </svg>
                  </div>

                  {/* Amazon */}
                  <div className="flex items-center opacity-90 hover:opacity-100 transition-opacity">
                    <svg className="w-4.5 h-3.5" viewBox="0 0 24 24">
                      <path fill="#FF9900" d="M13.9 14.4c-2.3 1.7-5.7 2.6-8.6 2.6-4.1 0-7.8-1.6-10.6-4.2-.2-.2 0-.5.3-.4 2.8 1.6 6.3 2.6 9.9 2.6 2.6 0 5.4-.6 8-1.8.4-.2.8.2.4.6z" />
                      <path fill="#FF9900" d="M14.9 13.2c-.3-.4-1.9-.2-2.6 0-.2 0-.3-.2-.1-.3 1.1-.9 3-1 3.3-.6.4.4.1 2.3-.9 3.3-.2.1-.3.1-.4 0-.1-.2.2-1.8.7-2.4z" />
                      <text x="7" y="11" fill="#0F172A" fontSize="12" fontWeight="bold" fontFamily="sans-serif">a</text>
                    </svg>
                  </div>

                  {/* Uber */}
                  <div className="flex items-center opacity-90 hover:opacity-100 transition-opacity">
                    <span className="text-slate-900 font-bold text-xs tracking-tight">
                      Uber
                    </span>
                  </div>

                  {/* Red Tech Icon (Zomato/Oracle) */}
                  <div className="flex items-center opacity-90 hover:opacity-100 transition-opacity">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                      <rect width="24" height="24" rx="4" fill="#E23744" />
                      <text x="12" y="17" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontStyle="italic" fontWeight="900">z</text>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Platform & Resources (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight mb-3.5 font-[family-name:var(--font-display)]">
              Platform &amp; Resources
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => nav('#about')}
                  className="text-slate-600 hover:text-[#2563EB] transition-colors cursor-pointer text-left font-medium flex items-center gap-2 group"
                >
                  <Users size={14} className="text-[#2563EB] group-hover:scale-110 transition-transform" />
                  <span>About Us</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => nav('#training-programs')}
                  className="text-slate-600 hover:text-[#2563EB] transition-colors cursor-pointer text-left font-medium flex items-center gap-2 group"
                >
                  <GraduationCap size={14} className="text-[#2563EB] group-hover:scale-110 transition-transform" />
                  <span>Training &amp; Programs</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    window.location.hash = '#mentor';
                    window.scrollTo({ top: 0, behavior: 'instant' });
                  }}
                  className="text-slate-600 hover:text-[#2563EB] transition-colors cursor-pointer text-left font-medium flex items-center gap-2 group"
                >
                  <UserCheck size={14} className="text-[#2563EB] group-hover:scale-110 transition-transform" />
                  <span>Become a Mentor</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => nav('#blog')}
                  className="text-slate-600 hover:text-[#2563EB] transition-colors cursor-pointer text-left font-medium flex items-center gap-2 group"
                >
                  <BookOpen size={14} className="text-[#2563EB] group-hover:scale-110 transition-transform" />
                  <span>Blog &amp; Articles</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Office (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight mb-3.5 font-[family-name:var(--font-display)]">
              Contact &amp; Office
            </h4>
            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="flex items-start gap-2 text-slate-700">
                <MapPin size={15} className="text-[#2563EB] shrink-0 mt-0.5" />
                <span className="leading-relaxed text-[11px] sm:text-xs">
                  A-301, Godrej Prana, Near Dhruv Global School, Undri, Pune, Maharashtra – 411060
                </span>
              </div>
              <div className="flex items-center gap-2 pt-0.5">
                <Phone size={13} className="text-[#2563EB] shrink-0" />
                <a
                  href="tel:+917652006897"
                  className="hover:text-[#2563EB] transition-colors font-mono font-medium text-xs"
                >
                  +91 7652006897
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={13} className="text-[#2563EB] shrink-0" />
                <a
                  href="mailto:partnerships@grow360.in"
                  className="hover:text-[#2563EB] transition-colors break-all font-mono font-medium text-xs"
                >
                  partnerships@grow360.in
                </a>
              </div>
              <div className="pt-0.5">
                <button
                  onClick={() => openEnquiry('CONTACT')}
                  className="text-xs font-bold text-[#2563EB] hover:underline cursor-pointer flex items-center gap-1"
                >
                  <span>Open Contact Form</span>
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          </div>

          {/* Column 4: Legal (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight mb-3.5 font-[family-name:var(--font-display)]">
              Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    window.location.hash = '#privacy';
                    window.scrollTo({ top: 0, behavior: 'instant' });
                  }}
                  className="text-slate-600 hover:text-[#2563EB] transition-colors cursor-pointer text-left font-medium"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    window.location.hash = '#terms';
                    window.scrollTo({ top: 0, behavior: 'instant' });
                  }}
                  className="text-slate-600 hover:text-[#2563EB] transition-colors cursor-pointer text-left font-medium"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    window.location.hash = '#cookies';
                    window.scrollTo({ top: 0, behavior: 'instant' });
                  }}
                  className="text-slate-600 hover:text-[#2563EB] transition-colors cursor-pointer text-left font-medium"
                >
                  Cookie Policy
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Socials */}
        <div className="pt-5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            <p>© {new Date().getFullYear()} Grow360 — Decoding the corporate world. All rights reserved.</p>
          </div>

          {/* Social Icons in Clean Rounded Squares */}
          <div className="flex items-center gap-2">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="w-7 h-7 rounded-lg bg-white hover:bg-[#2563EB] hover:text-white border border-slate-200 text-slate-700 flex items-center justify-center transition-all duration-200 shadow-2xs"
            >
              <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.65 1.65 0 0 0-1.66 1.66 1.66 1.66 0 0 0 1.66 1.66 1.66 1.66 0 0 0 1.66-1.66c0-.92-.74-1.66-1.66-1.66Z" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="w-7 h-7 rounded-lg bg-white hover:bg-[#2563EB] hover:text-white border border-slate-200 text-slate-700 flex items-center justify-center transition-all duration-200 shadow-2xs"
            >
              <svg className="w-3 h-3 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
