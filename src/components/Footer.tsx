export function Footer() {
  const nav = (href: string) => {
    if (!href || href === '#') {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    const elem = document.querySelector(href);
    if (elem) {
      elem.scrollIntoView({ behavior: 'instant' });
    }
  };

  return (
    <footer className="bg-[#050508] text-slate-400 pt-20 pb-12 relative overflow-hidden border-t border-white/5 selection:bg-[#FF4500] selection:text-white">
      {/* Background Subtle Gradient & Shadow */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />

      {/* Giant "GROW 360" Background Watermark Typography - Perfectly Centered */}
      <div className="absolute inset-x-0 bottom-8 sm:bottom-12 w-full flex items-center justify-center select-none pointer-events-none z-0 overflow-hidden">
        <span className="text-6xl sm:text-8xl md:text-[11rem] lg:text-[14rem] font-extrabold text-white/[0.035] tracking-tight whitespace-nowrap text-center leading-none">
          GROW 360°
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Main Grid: 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-20">
          
          {/* Column 1: Brand & Backed By (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Grow360 Brand Logo */}
              <div 
                className="flex items-center gap-3 mb-4 cursor-pointer select-none group"
                onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
              >
                <img
                  src="/grow360-logo.png"
                  alt="Grow360 Logo"
                  className="h-10 w-auto object-contain rounded-lg group-hover:scale-105 transition-transform"
                />
                <div className="flex flex-col leading-tight">
                  <span className="text-2xl font-extrabold text-white tracking-tight font-[family-name:var(--font-display)] flex items-center">
                    GROW<span className="text-[#00B4D8]">360°</span>
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 tracking-wider">
                    Decoding the corporate world
                  </span>
                </div>
              </div>

              {/* Tagline */}
              <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed mb-8">
                The comprehensive corporate training, AI-powered interview diagnostics, and campus placement infrastructure.
              </p>

              {/* Backed By Developers From */}
              <div>
                <p className="text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold text-slate-500 mb-4 font-mono">
                  BACKED BY DEVELOPERS FROM
                </p>
                <div className="flex items-center gap-5">
                  {/* Microsoft */}
                  <div className="flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity">
                    <svg className="w-4 h-4" viewBox="0 0 21 21">
                      <rect x="1" y="1" width="9" height="9" fill="#F25022" />
                      <rect x="11" y="1" width="9" height="9" fill="#7FBA00" />
                      <rect x="1" y="11" width="9" height="9" fill="#00A4EF" />
                      <rect x="11" y="11" width="9" height="9" fill="#FFB900" />
                    </svg>
                  </div>

                  {/* Amazon */}
                  <div className="flex items-center opacity-90 hover:opacity-100 transition-opacity">
                    <svg className="w-5 h-4" viewBox="0 0 24 24">
                      <path fill="#FF9900" d="M13.9 14.4c-2.3 1.7-5.7 2.6-8.6 2.6-4.1 0-7.8-1.6-10.6-4.2-.2-.2 0-.5.3-.4 2.8 1.6 6.3 2.6 9.9 2.6 2.6 0 5.4-.6 8-1.8.4-.2.8.2.4.6z" />
                      <path fill="#FF9900" d="M14.9 13.2c-.3-.4-1.9-.2-2.6 0-.2 0-.3-.2-.1-.3 1.1-.9 3-1 3.3-.6.4.4.1 2.3-.9 3.3-.2.1-.3.1-.4 0-.1-.2.2-1.8.7-2.4z" />
                      <text x="7" y="11" fill="#FFFFFF" fontSize="12" fontWeight="bold" fontFamily="sans-serif">a</text>
                    </svg>
                  </div>

                  {/* Uber */}
                  <div className="flex items-center opacity-90 hover:opacity-100 transition-opacity">
                    <span className="text-white font-bold text-xs tracking-tight">
                      Uber
                    </span>
                  </div>

                  {/* Red Tech Icon (Zomato/Oracle) */}
                  <div className="flex items-center opacity-90 hover:opacity-100 transition-opacity">
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <rect width="24" height="24" rx="4" fill="#E23744" />
                      <text x="12" y="17" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontStyle="italic" fontWeight="900">z</text>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Platform (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold text-white tracking-tight mb-5">
              Platform
            </h4>
            <ul className="space-y-3.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => nav('#training')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Training
                </button>
              </li>
              <li>
                <button
                  onClick={() => nav('#recruiters')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Placements
                </button>
              </li>
              <li>
                <button
                  onClick={() => nav('#programs')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Curriculum
                </button>
              </li>
              <li>
                <button
                  onClick={() => nav('#about')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Mentors
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    window.location.hash = '#mentor';
                    window.scrollTo({ top: 0, behavior: 'instant' });
                  }}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Become a Mentor
                </button>
              </li>
              <li>
                <button
                  onClick={() => nav('#career-path')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Placement Journey
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-white tracking-tight mb-5">
              Contact
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-slate-400">
              <div>
                <a
                  href="tel:+919041429928"
                  className="hover:text-white transition-colors block font-mono"
                >
                  +91 9041429928
                </a>
              </div>
              <div>
                <a
                  href="mailto:partnerships@tejasplacement.in"
                  className="hover:text-white transition-colors block break-all font-mono"
                >
                  partnerships@tejasplacement.in
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Legal (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-white tracking-tight mb-5">
              Legal
            </h4>
            <ul className="space-y-3.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => {
                    window.location.hash = '#privacy';
                    window.scrollTo({ top: 0, behavior: 'instant' });
                  }}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left"
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
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left"
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
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Cookie Policy
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Socials */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <p>© {new Date().getFullYear()} Grow360 — Decoding the corporate world. All rights reserved.</p>
          </div>

          {/* Social Icons in Dark Rounded Squares */}
          <div className="flex items-center gap-2.5">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="w-8 h-8 rounded-lg bg-[#14141A] hover:bg-white hover:text-black border border-white/10 text-slate-300 flex items-center justify-center transition-all duration-200"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.65 1.65 0 0 0-1.66 1.66 1.66 1.66 0 0 0 1.66 1.66 1.66 1.66 0 0 0 1.66-1.66c0-.92-.74-1.66-1.66-1.66Z" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="w-8 h-8 rounded-lg bg-[#14141A] hover:bg-white hover:text-black border border-white/10 text-slate-300 flex items-center justify-center transition-all duration-200"
            >
              <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
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
