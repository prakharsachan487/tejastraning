const companyLogos = [
  {
    name: 'Google',
    logo: (
      <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
      </svg>
    ),
  },
  {
    name: 'Microsoft',
    logo: (
      <svg className="w-5 h-5 shrink-0" viewBox="0 0 21 21">
        <rect x="1" y="1" width="9" height="9" fill="#F25022"/>
        <rect x="11" y="1" width="9" height="9" fill="#7FBA00"/>
        <rect x="1" y="11" width="9" height="9" fill="#00A4EF"/>
        <rect x="11" y="11" width="9" height="9" fill="#FFB900"/>
      </svg>
    ),
  },
  {
    name: 'Amazon',
    logo: (
      <svg className="w-6 h-5 shrink-0" viewBox="0 0 24 24">
        <path fill="#FF9900" d="M13.9 14.4c-2.3 1.7-5.7 2.6-8.6 2.6-4.1 0-7.8-1.6-10.6-4.2-.2-.2 0-.5.3-.4 2.8 1.6 6.3 2.6 9.9 2.6 2.6 0 5.4-.6 8-1.8.4-.2.8.2.4.6z"/>
        <path fill="#FF9900" d="M14.9 13.2c-.3-.4-1.9-.2-2.6 0-.2 0-.3-.2-.1-.3 1.1-.9 3-1 3.3-.6.4.4.1 2.3-.9 3.3-.2.1-.3.1-.4 0-.1-.2.2-1.8.7-2.4z"/>
        <path fill="#FFFFFF" d="M10.8 4.2c-2.6 0-4.6 1.8-4.6 4.3 0 2.2 1.4 3.7 3.5 3.7 1.3 0 2.3-.7 2.8-1.6v1.3h2.3V4.5h-2.3v1.1c-.5-.8-1.4-1.4-2.7-1.4zm.5 6.1c-1.3 0-2.3-1-2.3-2.3 0-1.4 1-2.3 2.3-2.3s2.3 1 2.3 2.3c0 1.4-1 2.3-2.3 2.3z"/>
      </svg>
    ),
  },
  {
    name: 'Adobe',
    logo: (
      <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
        <path fill="#FF0000" d="M13.966 22h10.034V2h-10.034l5.017 12.338zm-13.966 0h10.034V2H0l5.017 12.338zm7.531-7.469h4.938L12 3.656z"/>
      </svg>
    ),
  },
  {
    name: 'Meta',
    logo: (
      <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
        <path fill="#0668E1" d="M12 7.234C10.088 4.195 7.643 2.5 4.954 2.5 2.22 2.5 0 4.743 0 7.502c0 3.702 3.037 6.947 7.027 10.963l4.973 4.985 4.973-4.985c3.99-4.016 7.027-7.261 7.027-10.963 0-2.759-2.22-5.002-4.954-5.002-2.689 0-5.134 1.695-7.046 4.734z"/>
      </svg>
    ),
  },
  {
    name: 'Salesforce',
    logo: (
      <svg className="w-6 h-5 shrink-0" viewBox="0 0 24 24">
        <path fill="#00A1E0" d="M19.4 9.1c-.5-2.6-2.8-4.6-5.5-4.6-1.7 0-3.3.8-4.2 2.1C9.2 6.2 8.5 6 7.8 6 5.7 6 4 7.7 4 9.8c0 .3 0 .7.1 1C2.3 11.4 1 13.1 1 15.2c0 2.6 2.1 4.8 4.8 4.8h13.4c2.6 0 4.8-2.1 4.8-4.8 0-2.3-1.6-4.3-3.8-4.7-.1-.5-.4-.9-.8-1.4z"/>
      </svg>
    ),
  },
  {
    name: 'Netflix',
    logo: (
      <svg className="w-4 h-5 shrink-0" viewBox="0 0 24 24">
        <path fill="#E50914" d="M4 0h3.5l6.5 16.5V0h3.5v24h-3.5L7.5 7.5V24H4V0z"/>
      </svg>
    ),
  },
  {
    name: 'Oracle',
    logo: (
      <svg className="w-6 h-5 shrink-0" viewBox="0 0 24 24">
        <path fill="#F80000" d="M7.6 19.5c-4.2 0-7.6-3.4-7.6-7.5s3.4-7.5 7.6-7.5h8.8c4.2 0 7.6 3.4 7.6 7.5s-3.4 7.5-7.6 7.5H7.6zm8.6-3.4c2.3 0 4.2-1.9 4.2-4.1s-1.9-4.1-4.2-4.1H7.8c-2.3 0-4.2 1.9-4.2 4.1s1.9 4.1 4.2 4.1h8.4z"/>
      </svg>
    ),
  },
  {
    name: 'Wipro',
    logo: (
      <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
        <circle cx="12" cy="4.5" r="2.8" fill="#E41E26"/>
        <circle cx="17.5" cy="7.5" r="2.3" fill="#F48220"/>
        <circle cx="18.5" cy="13.5" r="2.3" fill="#FBB03B"/>
        <circle cx="14.5" cy="18.5" r="2.3" fill="#39B54A"/>
        <circle cx="9.5" cy="18.5" r="2.3" fill="#00AEEF"/>
        <circle cx="5.5" cy="13.5" r="2.3" fill="#2E3192"/>
        <circle cx="6.5" cy="7.5" r="2.3" fill="#92278F"/>
        <circle cx="12" cy="11.5" r="1.8" fill="#FFFFFF"/>
      </svg>
    ),
  },
  {
    name: 'Goldman Sachs',
    logo: (
      <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="4" fill="#7399C6"/>
        <text x="12" y="16" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">GS</text>
      </svg>
    ),
  },
  {
    name: 'Atlassian',
    logo: (
      <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
        <path fill="#0052CC" d="M11.53 2c0 2.4-1.2 4.6-3.1 5.9L4.8 10.7c-2.3 1.6-3.7 4.2-3.7 7 0 3.5 2.1 6.3 5.4 6.3h7.2c-2-2.3-3.2-5.3-3.2-8.6 0-3.3 1.3-6.4 3.4-8.7L11.53 2z"/>
        <path fill="#2684FF" d="M12.47 22c0-2.4 1.2-4.6 3.1-5.9l3.63-2.8c2.3-1.6 3.7-4.2 3.7-7 0-3.5-2.1-6.3-5.4-6.3h-7.2c2 2.3 3.2 5.3 3.2 8.6 0 3.3-1.3 6.4-3.4 8.7L12.47 22z"/>
      </svg>
    ),
  },
  {
    name: 'Infosys',
    logo: (
      <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="5" fill="#007CC3"/>
        <text x="12" y="16" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">Infy</text>
      </svg>
    ),
  },
  {
    name: 'TCS',
    logo: (
      <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="5" fill="#1A3B8B"/>
        <text x="12" y="16" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold">TCS</text>
      </svg>
    ),
  },
  {
    name: 'Uber',
    logo: (
      <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="6" fill="#000000"/>
        <text x="12" y="16" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold">Uber</text>
      </svg>
    ),
  },
];

export function TrustStrip() {
  return (
    <section className="py-8 bg-[#F2F4F7] border-y border-black/5 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-wider text-slate-500 mb-6 font-mono">
          Curriculum Built with Engineers from Industry Leaders
        </p>
      </div>

      <div className="relative w-full overflow-hidden mask-fade-horizontal">
        <div className="flex items-center gap-6 sm:gap-8 w-max animate-marquee hover:[animation-play-state:paused]">
          {[...companyLogos, ...companyLogos, ...companyLogos].map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="flex items-center gap-3 px-4 sm:px-5 py-2.5 rounded-full bg-white border border-black/8 shadow-sm hover:border-[#2563EB]/50 transition-all whitespace-nowrap select-none cursor-default group"
            >
              {item.logo}
              <span className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-black">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
