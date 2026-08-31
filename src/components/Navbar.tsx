import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'About Us', href: '#about' },
  { label: 'Training', href: '#training' },
  { label: 'Programs', href: '#programs' },
  { label: 'Career Path', href: '#career-path' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { user, logout } = useAuth();

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
      element.scrollIntoView({ behavior: 'instant' });
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
            {/* Brand Logo - Grow360 */}
            <a
              href="#"
              className="flex items-center gap-3 group focus:outline-none"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
            >
              <img
                src="/grow360-logo.png"
                alt="Grow360 Logo"
                className="h-10 w-auto object-contain rounded-lg group-hover:scale-105 transition-transform"
              />
              <div className="flex flex-col leading-tight">
                <span className="text-xl font-extrabold tracking-tight text-white font-[family-name:var(--font-display)] flex items-center">
                  GROW<span className="text-[#00B4D8]">360°</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400 tracking-wider hidden sm:block">
                  Decoding the corporate world
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
              {user ? (
                <div className="flex items-center gap-2.5 bg-[#14141C] pl-2 pr-3 py-1.5 rounded-full border border-white/10 shadow-sm">
                  <div
                    onClick={() => {
                      window.location.hash = '#dashboard';
                    }}
                    className="flex items-center gap-2 cursor-pointer group"
                    title="Go to Dashboard"
                  >
                    <img
                      src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                      alt={user.name}
                      className="w-7 h-7 rounded-full object-cover border border-amber-400/40 group-hover:scale-105 transition-transform"
                    />
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-bold text-white leading-none group-hover:text-[#FFA000] transition-colors">{user.name}</span>
                      <span className="text-[10px] text-[#FFA000] font-mono leading-none mt-0.5">{user.role}</span>
                    </div>
                  </div>
                  <button
                    onClick={logout}
                    title="Sign Out"
                    className="ml-1 p-1 hover:text-red-400 text-slate-400 transition-colors cursor-pointer"
                  >
                    <LogOut size={13} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    window.location.hash = '#login';
                  }}
                  className="btn-pill-primary px-5 py-2.5 text-xs font-bold cursor-pointer flex items-center gap-1.5 shadow-md shadow-orange-500/20"
                >
                  <LogIn size={14} className="text-white" />
                  <span>Login</span>
                </button>
              )}
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
                    <img
                      src="/grow360-logo.png"
                      alt="Grow360 Logo"
                      className="h-8 w-auto object-contain rounded-lg"
                    />
                    <span className="font-extrabold text-lg text-white font-[family-name:var(--font-display)] flex items-center">
                      GROW<span className="text-[#00B4D8]">360°</span>
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
                {user ? (
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-[#09090D] border border-white/10">
                    <div
                      onClick={() => {
                        window.location.hash = '#dashboard';
                        setIsMobileOpen(false);
                      }}
                      className="flex items-center gap-2.5 cursor-pointer flex-1"
                    >
                      <img
                        src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover border border-amber-400/40"
                      />
                      <div className="text-left">
                        <div className="text-xs font-bold text-white">{user.name}</div>
                        <div className="text-[10px] text-[#FFA000] font-mono">{user.role} · Tap to open Dashboard</div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setIsMobileOpen(false);
                      }}
                      className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                    >
                      <LogOut size={16} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setIsMobileOpen(false);
                      window.location.hash = '#login';
                    }}
                    className="btn-pill-secondary w-full justify-center text-xs py-3 flex items-center gap-2"
                  >
                    <LogIn size={14} className="text-white" />
                    <span>Login / Sign Up</span>
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
