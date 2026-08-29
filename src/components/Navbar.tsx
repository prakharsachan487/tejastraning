import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useEnquiry } from '../context/EnquiryContext';

const navLinks = [
  { label: 'Programs', href: '#programs' },
  { label: 'For Colleges', href: '#why-partner' },
  { label: 'How We Work', href: '#how-we-work' },
  { label: 'Impact', href: '#impact' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { openEnquiry } = useEnquiry();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map((l) => l.href.replace('#', ''));
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.2, rootMargin: '-80px 0px -50% 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleClick = useCallback((href: string) => {
    setIsMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <>
      <motion.nav
        initial={false}
        animate={{
          backgroundColor: isScrolled ? 'rgba(250,250,249,0.92)' : 'rgba(250,250,249,0)',
          backdropFilter: isScrolled ? 'blur(20px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 ${
          isScrolled ? 'border-b border-ink-100' : ''
        }`}
      >
        <div
          className={`max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-10 flex items-center justify-between transition-all duration-300 ${
            isScrolled ? 'h-16' : 'h-20'
          }`}
        >
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-3 group"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            {/* Logo mark */}
            <div className="relative w-8 h-8">
              <div className="w-8 h-8 bg-tejas-red flex items-center justify-center text-white font-black text-sm tracking-tight">
                T
              </div>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-bold tracking-[0.08em] text-ink-900 uppercase">
                Tejas
              </span>
              <span className="text-[9px] font-medium tracking-[0.15em] text-ink-400 uppercase mt-0.5">
                Learning & Development
              </span>
            </div>
          </a>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <button
                  key={link.href}
                  onClick={() => handleClick(link.href)}
                  className={`px-3.5 py-2 text-xs font-medium tracking-wide uppercase transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-tejas-red'
                      : 'text-ink-500 hover:text-ink-900'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => openEnquiry('PARTNERSHIP')}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-tejas-red text-white text-xs font-semibold tracking-wide uppercase hover:bg-tejas-red-dark transition-all duration-300 cursor-pointer"
            >
              Partner With Us
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-ink-600 hover:text-ink-900 transition-colors"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-40 lg:hidden"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-surface-white z-50 lg:hidden overflow-y-auto border-l border-ink-100"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-10">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 bg-tejas-red flex items-center justify-center text-white font-black text-xs">
                      T
                    </div>
                    <div className="flex flex-col leading-none">
                      <span className="text-sm font-bold tracking-[0.08em] text-ink-900 uppercase">
                        Tejas
                      </span>
                      <span className="text-[8px] font-medium tracking-[0.15em] text-ink-400 uppercase mt-0.5">
                        Learning & Development
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMobileOpen(false)}
                    className="p-2 hover:bg-ink-50 text-ink-400"
                    aria-label="Close menu"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <button
                      key={link.href}
                      onClick={() => handleClick(link.href)}
                      className="text-left px-4 py-3 text-sm font-medium text-ink-600 hover:text-tejas-red hover:bg-tejas-red/5 transition-all cursor-pointer tracking-wide uppercase"
                    >
                      {link.label}
                    </button>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-ink-100">
                  <button
                    onClick={() => { setIsMobileOpen(false); openEnquiry('PARTNERSHIP'); }}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-tejas-red text-white text-sm font-semibold tracking-wide uppercase hover:bg-tejas-red-dark transition-colors cursor-pointer"
                  >
                    Partner With Us
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
