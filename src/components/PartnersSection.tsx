interface CompanyPartner {
  name: string;
  category: string;
  brandColor: string;
  borderColor: string;
  logo: React.ReactNode;
}

const row1Partners: CompanyPartner[] = [
  {
    name: 'Infosys',
    category: 'IT Services',
    brandColor: '#38BDF8',
    borderColor: 'rgba(0, 124, 195, 0.5)',
    logo: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="5" fill="#007CC3" />
        <text x="12" y="16" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold">INSY</text>
      </svg>
    ),
  },
  {
    name: 'TCS',
    category: 'Consulting',
    brandColor: '#60A5FA',
    borderColor: 'rgba(0, 86, 150, 0.5)',
    logo: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="5" fill="#005696" />
        <text x="12" y="16" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold">TCS</text>
      </svg>
    ),
  },
  {
    name: 'Wipro',
    category: 'Global Tech',
    brandColor: '#F59E0B',
    borderColor: 'rgba(245, 158, 11, 0.5)',
    logo: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
        <circle cx="12" cy="4.5" r="2.8" fill="#E41E26" />
        <circle cx="17.5" cy="7.5" r="2.3" fill="#F48220" />
        <circle cx="18.5" cy="13.5" r="2.3" fill="#FBB03B" />
        <circle cx="14.5" cy="18.5" r="2.3" fill="#39B54A" />
        <circle cx="9.5" cy="18.5" r="2.3" fill="#00AEEF" />
        <circle cx="5.5" cy="13.5" r="2.3" fill="#2E3192" />
        <circle cx="6.5" cy="7.5" r="2.3" fill="#92278F" />
        <circle cx="12" cy="11.5" r="1.8" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    name: 'Cognizant',
    category: 'Enterprise IT',
    brandColor: '#38BDF8',
    borderColor: 'rgba(0, 51, 160, 0.5)',
    logo: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="11" fill="#0033A0" />
        <path d="M7 12a5 5 0 0 1 8.5-3.5l-2 2a2.2 2.2 0 0 0-3.5 1.5H7z" fill="#FFFFFF" />
        <path d="M17 12a5 5 0 0 1-8.5 3.5l2-2a2.2 2.2 0 0 0 3.5-1.5H17z" fill="#00A3E0" />
      </svg>
    ),
  },
  {
    name: 'Accenture',
    category: 'Strategy & Tech',
    brandColor: '#C084FC',
    borderColor: 'rgba(161, 0, 255, 0.5)',
    logo: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="5" fill="#A100FF" />
        <path d="M7 16l6-4-6-4v3l2.5 1-2.5 1v3z" fill="#FFFFFF" />
        <path d="M12 16l6-4-6-4v3l2.5 1-2.5 1v3z" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    name: 'Deloitte',
    category: 'Big 4 Advisory',
    brandColor: '#86EFAC',
    borderColor: 'rgba(134, 188, 37, 0.5)',
    logo: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="5" fill="#18181B" stroke="#86BC25" strokeWidth="1" />
        <text x="9" y="16" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">D</text>
        <circle cx="17" cy="14" r="2.2" fill="#86BC25" />
      </svg>
    ),
  },
  {
    name: 'Capgemini',
    category: 'Engineering',
    brandColor: '#38BDF8',
    borderColor: 'rgba(0, 112, 173, 0.5)',
    logo: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="5" fill="#0070AD" />
        <path d="M12 6c-2 2.5-4 4-4 6a4 4 0 0 0 7 2.5l-1.5-1.5a2 2 0 0 1-3.5-1c0-1.2 1.5-2.5 3-4l-1-2z" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    name: 'PwC',
    category: 'Big 4 Advisory',
    brandColor: '#FB923C',
    borderColor: 'rgba(208, 74, 2, 0.5)',
    logo: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="5" fill="#D04A02" />
        <text x="12" y="16" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold">pwc</text>
      </svg>
    ),
  },
  {
    name: 'EY',
    category: 'Assurance & Tech',
    brandColor: '#FDE047',
    borderColor: 'rgba(255, 230, 0, 0.5)',
    logo: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="5" fill="#23232C" />
        <path d="M4 4l16 4v2L4 6z" fill="#FFE600" />
        <text x="12" y="18" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold">EY</text>
      </svg>
    ),
  },
  {
    name: 'HCLTech',
    category: 'Engineering',
    brandColor: '#60A5FA',
    borderColor: 'rgba(28, 90, 181, 0.5)',
    logo: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="5" fill="#1C5AB5" />
        <text x="12" y="16" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold">HCL</text>
      </svg>
    ),
  },
  {
    name: 'Tech Mahindra',
    category: 'Digital Services',
    brandColor: '#F87171',
    borderColor: 'rgba(227, 24, 55, 0.5)',
    logo: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="5" fill="#E31837" />
        <text x="12" y="16" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold">TECH</text>
      </svg>
    ),
  },
  {
    name: 'KPMG',
    category: 'Advisory & Risk',
    brandColor: '#93C5FD',
    borderColor: 'rgba(0, 51, 141, 0.5)',
    logo: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="5" fill="#00338D" />
        <text x="12" y="16" textAnchor="middle" fill="#FFFFFF" fontSize="7" fontWeight="bold">KPMG</text>
      </svg>
    ),
  },
];

const row2Partners: CompanyPartner[] = [
  {
    name: 'Flipkart',
    category: 'E-Commerce',
    brandColor: '#FDE047',
    borderColor: 'rgba(40, 116, 240, 0.6)',
    logo: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="5" fill="#2874F0" />
        <path d="M8 8h8l-1.5 10H9.5L8 8z" fill="#FFE11B" />
        <path d="M10 8V6a2 2 0 0 1 4 0v2" stroke="#FFE11B" strokeWidth="1.5" fill="none" />
        <text x="12" y="15" textAnchor="middle" fill="#2874F0" fontSize="7" fontWeight="bold">f</text>
      </svg>
    ),
  },
  {
    name: 'Swiggy',
    category: 'On-Demand Tech',
    brandColor: '#FB923C',
    borderColor: 'rgba(252, 128, 25, 0.5)',
    logo: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="5" fill="#FC8019" />
        <path d="M12 4c-3.3 0-6 2.7-6 6 0 4.5 5.5 9.5 5.7 9.7.2.2.5.2.7 0 .2-.2 5.6-5.2 5.6-9.7 0-3.3-2.7-6-6-6zm0 8.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 7.5 12 7.5s2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5z" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    name: 'Zomato',
    category: 'Food Tech',
    brandColor: '#F87171',
    borderColor: 'rgba(226, 55, 68, 0.5)',
    logo: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="5" fill="#E23744" />
        <text x="12" y="17" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontStyle="italic" fontWeight="900">z</text>
      </svg>
    ),
  },
  {
    name: 'Razorpay',
    category: 'Fintech Payments',
    brandColor: '#38BDF8',
    borderColor: 'rgba(51, 149, 255, 0.5)',
    logo: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="5" fill="#0C2340" />
        <path d="M7 19l4.5-14h5.5l-3.5 6h4.5l-8 8z" fill="#3395FF" />
      </svg>
    ),
  },
  {
    name: 'PhonePe',
    category: 'Digital Payments',
    brandColor: '#C084FC',
    borderColor: 'rgba(95, 37, 159, 0.5)',
    logo: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="5" fill="#5F259F" />
        <text x="12" y="17" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">पे</text>
      </svg>
    ),
  },
  {
    name: 'Paytm',
    category: 'Fintech Ecosystem',
    brandColor: '#38BDF8',
    borderColor: 'rgba(0, 186, 242, 0.5)',
    logo: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="5" fill="#002E6E" />
        <text x="12" y="16" textAnchor="middle" fill="#00BAF2" fontSize="7" fontWeight="bold">Paytm</text>
      </svg>
    ),
  },
  {
    name: 'Zoho',
    category: 'SaaS Cloud',
    brandColor: '#4ADE80',
    borderColor: 'rgba(52, 168, 83, 0.5)',
    logo: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
        <rect x="2" y="2" width="9" height="9" rx="2" fill="#EA4335" />
        <rect x="13" y="2" width="9" height="9" rx="2" fill="#34A853" />
        <rect x="2" y="13" width="9" height="9" rx="2" fill="#4285F4" />
        <rect x="13" y="13" width="9" height="9" rx="2" fill="#FBBC05" />
      </svg>
    ),
  },
  {
    name: 'Freshworks',
    category: 'Customer Cloud',
    brandColor: '#FB923C',
    borderColor: 'rgba(255, 92, 53, 0.5)',
    logo: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="5" fill="#FF5C35" />
        <circle cx="8" cy="12" r="3" fill="#FFFFFF" />
        <circle cx="16" cy="12" r="3" fill="#FFFFFF" />
        <path d="M8 12h8" stroke="#FFFFFF" strokeWidth="2" />
      </svg>
    ),
  },
  {
    name: 'Groww',
    category: 'InvestTech',
    brandColor: '#34D399',
    borderColor: 'rgba(0, 208, 156, 0.5)',
    logo: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="5" fill="#00D09C" />
        <path d="M6 16l4-4 3 3 5-7" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
  {
    name: 'Zerodha',
    category: 'Fintech Platform',
    brandColor: '#60A5FA',
    borderColor: 'rgba(56, 126, 209, 0.5)',
    logo: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="5" fill="#387ED1" />
        <path d="M7 7h10l-10 10h10" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
  {
    name: 'Juspay',
    category: 'Payments OS',
    brandColor: '#818CF8',
    borderColor: 'rgba(0, 82, 255, 0.5)',
    logo: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="5" fill="#0052FF" />
        <path d="M8 6h8v3h-5v3h4v3h-4v3H8V6z" fill="#00D09C" />
      </svg>
    ),
  },
  {
    name: 'Ola',
    category: 'Mobility & EV',
    brandColor: '#A3E635',
    borderColor: 'rgba(155, 231, 0, 0.5)',
    logo: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="11" fill="#9BE700" />
        <circle cx="12" cy="12" r="5" fill="#000000" />
      </svg>
    ),
  },
];

export function PartnersSection() {
  return (
    <section id="recruiters" className="py-20 bg-[#F2F4F7] border-y border-black/5 overflow-hidden relative">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-gradient-to-r from-[#2563EB]/5 via-[#3B82F6]/5 to-transparent blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/25 text-[#2563EB] text-xs font-semibold tracking-wide mb-3">
            <span>Campus Hiring Ecosystem</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-bold text-[#12151B] font-[family-name:var(--font-display)] tracking-tight">
            Trusted by <span className="text-[#2563EB]">35+ Top Hiring Partners</span> for Campus Drives
          </h3>
          <p className="mt-3 text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            From Tier-1 global IT conglomerates to hyper-growth tech unicorns, our campus cohorts are directly recruited across India.
          </p>
        </div>
      </div>

      {/* Row 1 — Left to Right */}
      <div className="relative w-full overflow-hidden mask-fade-horizontal mb-4">
        <div className="flex items-center gap-4 sm:gap-5 w-max animate-marquee hover:[animation-play-state:paused]">
          {[...row1Partners, ...row1Partners, ...row1Partners].map((partner, i) => (
            <div
              key={`r1-${partner.name}-${i}`}
              style={{
                '--brand-border': partner.borderColor,
              } as React.CSSProperties}
              className="flex items-center gap-3 px-4 sm:px-5 py-2.5 rounded-2xl bg-white border border-black/8 shadow-sm hover:border-[var(--brand-border)] hover:shadow-md transition-all duration-300 whitespace-nowrap select-none cursor-default group"
            >
              <div className="group-hover:scale-110 transition-transform duration-200">
                {partner.logo}
              </div>
              <div className="flex flex-col text-left">
                <span
                  style={{ color: partner.brandColor }}
                  className="text-xs sm:text-sm font-bold tracking-tight"
                >
                  {partner.name}
                </span>
                <span className="text-[10px] font-mono text-slate-500 group-hover:text-slate-700">
                  {partner.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — Right to Left */}
      <div className="relative w-full overflow-hidden mask-fade-horizontal">
        <div className="flex items-center gap-4 sm:gap-5 w-max animate-marquee-reverse hover:[animation-play-state:paused]">
          {[...row2Partners, ...row2Partners, ...row2Partners].map((partner, i) => (
            <div
              key={`r2-${partner.name}-${i}`}
              style={{
                '--brand-border': partner.borderColor,
              } as React.CSSProperties}
              className="flex items-center gap-3 px-4 sm:px-5 py-2.5 rounded-2xl bg-white border border-black/8 shadow-sm hover:border-[var(--brand-border)] hover:shadow-md transition-all duration-300 whitespace-nowrap select-none cursor-default group"
            >
              <div className="group-hover:scale-110 transition-transform duration-200">
                {partner.logo}
              </div>
              <div className="flex flex-col text-left">
                <span
                  style={{ color: partner.brandColor }}
                  className="text-xs sm:text-sm font-bold tracking-tight"
                >
                  {partner.name}
                </span>
                <span className="text-[10px] font-mono text-slate-500 group-hover:text-slate-700">
                  {partner.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
