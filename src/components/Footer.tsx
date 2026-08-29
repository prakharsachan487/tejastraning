import { ArrowUp, Mail, Phone, MapPin } from 'lucide-react';
import { useEnquiry } from '../context/EnquiryContext';

const footerLinks = {
  Programs: ['Engineering Programs', 'Computer Applications', 'Management Programs', 'Aptitude & Employability', 'Placement Preparation'],
  'For Colleges': ['Why Partner With Us', 'Training Methodology', 'Success Stories', 'Resources', 'FAQs'],
  Company: ['About Us', 'Our Team', 'Careers', 'Contact Us'],
};

export function Footer() {
  const { openEnquiry } = useEnquiry();

  const handleLinkClick = (e: React.MouseEvent, link: string) => {
    e.preventDefault();
    if (link === 'Contact Us') {
      openEnquiry('CONTACT');
    } else if (link === 'Why Partner With Us') {
      document.getElementById('why-partner')?.scrollIntoView({ behavior: 'smooth' });
    } else if (link.includes('Programs') || link.includes('Applications') || link.includes('Management') || link.includes('Aptitude') || link.includes('Placement Preparation')) {
      openEnquiry('PROPOSAL');
    } else {
      openEnquiry('CONTACT');
    }
  };

  return (
    <footer id="contact" className="bg-ink-950 text-ink-400 border-t border-ink-800">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-10 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <a href="#" className="flex items-center gap-3 mb-4 group" onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}>
              <div className="w-8 h-8 bg-tejas-red flex items-center justify-center text-white font-black text-sm">
                T
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-sm font-bold tracking-[0.08em] text-white uppercase">
                  Tejas
                </span>
                <span className="text-[9px] font-medium tracking-[0.15em] text-ink-500 uppercase mt-0.5">
                  Learning & Development
                </span>
              </div>
            </a>
            <p className="text-sm text-ink-500 leading-relaxed mb-6 max-w-xs">
              Industry-focused learning and employability development company partnering with
              colleges to build industry-ready talent.
            </p>
            <div className="space-y-2.5 text-sm">
              <a
                href="mailto:contact@tejastraining.com"
                className="flex items-center gap-2.5 text-ink-500 hover:text-tejas-red transition-colors"
              >
                <Mail size={14} className="shrink-0" />
                contact@tejastraining.com
              </a>
              <a
                href="tel:+919876543210"
                className="flex items-center gap-2.5 text-ink-500 hover:text-tejas-red transition-colors"
              >
                <Phone size={14} className="shrink-0" />
                +91 98765 43210
              </a>
              <span className="flex items-center gap-2.5 text-ink-500">
                <MapPin size={14} className="shrink-0" />
                Bangalore, Karnataka, India
              </span>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold text-white tracking-[0.08em] uppercase mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      onClick={(e) => handleLinkClick(e, link)}
                      className="text-sm text-ink-500 hover:text-tejas-red transition-colors cursor-pointer"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-ink-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ink-600">
            © {new Date().getFullYear()} Tejas Learning & Development. All rights reserved.
          </p>

          {/* Social */}
          <div className="flex items-center gap-3">
            {['LinkedIn', 'Instagram', 'YouTube'].map((social) => (
              <a
                key={social}
                href="#"
                className="w-8 h-8 border border-ink-700 flex items-center justify-center text-ink-500 hover:border-tejas-red hover:text-tejas-red transition-all text-[10px] font-bold tracking-wider uppercase"
                aria-label={social}
              >
                {social.slice(0, 2)}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4 text-xs text-ink-600">
            <a href="#" className="hover:text-ink-400 transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-ink-400 transition-colors">Terms of Use</a>
          </div>

          {/* Back to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-9 h-9 border border-ink-700 flex items-center justify-center text-ink-500 hover:text-tejas-red hover:border-tejas-red transition-colors cursor-pointer"
            aria-label="Back to top"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
