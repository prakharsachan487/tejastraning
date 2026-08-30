import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Sparkles, ChevronRight, LogIn } from 'lucide-react';
import { useEnquiry } from '../context/EnquiryContext';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Training', href: '#training' },
  { label: 'Programs', href: '#programs' },
  { label: 'Career Path', href: '#career-path' },
  { label: 'About Us', href: '#about' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { openEnquiry } = useEnquiry();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.replace('#', ''));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.25, rootMargin: '-70px 0px -40% 0px' }
      );
      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const handleNavClick = useCallback((href: string) => {
    setIsMobileOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0A0A0D]/90 backdrop-blur-xl border-b border-white/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              isScrolled ? 'h-16' : 'h-20'
            }`}
          >
            {/* Brand Logo - TEJAS */}
            <a
              href="#"
              className="flex items-center gap-3 group focus:outline-none"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF4500] via-[#FF6A00] to-[#FFA000] flex items-center justify-center text-white font-extrabold text-sm group-hover:scale-105 transition-transform duration-200">
                TJ
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-xl font-extrabold tracking-tight text-white font-[family-name:var(--font-display)]">
                  TEJAS
                </span>
                <span className="text-[10px] font-medium text-slate-400 tracking-tight hidden sm:block">
                  The Placement Infrastructure for Colleges
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1.5 bg-[#14141C] p-1.5 rounded-full border border-white/10">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <button
                    key={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white/15 text-[#FF6A00] font-bold border border-[#FF4500]/40'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Action Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={() => openEnquiry('CONSULTATION')}
                className="text-xs font-bold text-slate-300 hover:text-[#FFA000] px-3.5 py-2 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <LogIn size={14} className="text-[#FF6A00]" />
                <span>Login</span>
              </button>
              <button
                onClick={() => openEnquiry('CONSULTATION')}
                className="btn-pill-primary cursor-pointer active:scale-95 text-xs py-2.5 px-5"
              >
                <Sparkles size={14} className="text-white" />
                <span>Request Demo</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden p-2 rounded-xl text-slate-300 hover:bg-white/10 focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 md:hidden"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-[#111116] z-50 md:hidden flex flex-col justify-between p-6 border-l border-white/10"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF4500] to-[#FFA000] flex items-center justify-center text-white font-bold text-xs">
                      TJ
                    </div>
                    <span className="font-extrabold text-lg text-white font-[family-name:var(--font-display)]">
                      TEJAS
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMobileOpen(false)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="py-6 flex flex-col gap-1">
                  {navItems.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => handleNavClick(item.href)}
                      className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:text-[#FFA000] hover:bg-white/5 transition-colors text-left"
                    >
                      <span>{item.label}</span>
                      <ChevronRight size={16} className="text-slate-500" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setIsMobileOpen(false);
                    openEnquiry('CONSULTATION');
                  }}
                  className="btn-pill-secondary w-full justify-center text-xs py-3 flex items-center gap-2"
                >
                  <LogIn size={14} className="text-[#FF6A00]" />
                  <span>Login</span>
                </button>
                <button
                  onClick={() => {
                    setIsMobileOpen(false);
                    openEnquiry('CONSULTATION');
                  }}
                  className="btn-pill-primary w-full justify-center text-xs py-3"
                >
                  <Sparkles size={14} className="text-white" />
                  <span>Request Demo</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
