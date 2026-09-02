import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { ProblemSection } from './components/ProblemSection';
import { PlatformSection } from './components/PlatformSection';
import { MentorsSection } from './components/MentorsSection';
import { RollingGallerySection } from './components/RollingGallerySection';
import { MetricsSection } from './components/MetricsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { PartnersSection } from './components/PartnersSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { EnquiryProvider } from './context/EnquiryContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext';
import { AdminDataProvider } from './context/AdminDataContext';
import { EnquiryModal } from './components/EnquiryModal';
import { MentorPage } from './components/MentorPage';
import { ProfileEvaluationPage } from './components/ProfileEvaluationPage';
import { LegalPage } from './components/LegalPage';
import { AuthPage } from './components/AuthPage';
import { CareerPage } from './components/CareerPage';
import { TrainingProgramsPage } from './components/TrainingProgramsPage';
import { RoadmapPage } from './components/RoadmapPage';
import { BlogPage } from './components/BlogPage';
import { TeamPage } from './components/TeamPage';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';

function AdminView({ onBackToHome }: { onBackToHome: () => void }) {
  const { isAdminAuthenticated } = useAdminAuth();

  if (!isAdminAuthenticated) {
    return <AdminLogin onBackToHome={onBackToHome} />;
  }

  return <AdminDashboard onBackToHome={onBackToHome} />;
}

function MainAppContent() {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState<
    | 'home'
    | 'mentor'
    | 'career'
    | 'training-programs'
    | 'roadmap'
    | 'team'
    | 'login'
    | 'signup'
    | 'evaluation'
    | 'privacy'
    | 'terms'
    | 'cookies'
    | 'blog'
    | 'admin'
  >('home');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;

      if (
        hash === '#admin' ||
        hash === '#admin-login' ||
        hash === '#admin-dashboard' ||
        hash.startsWith('#admin') ||
        hash === '#control-panel'
      ) {
        setCurrentPage('admin');
      } else if (
        hash === '#evaluation' ||
        hash === '#profile' ||
        hash === '#career-profile' ||
        hash === '#career-evaluation' ||
        hash === '#readiness' ||
        hash === '#assessment' ||
        hash === '#dashboard'
      ) {
        setCurrentPage('evaluation');
      } else if (
        hash.startsWith('#mentor') ||
        hash.startsWith('#become-a-mentor') ||
        hash.startsWith('#career') ||
        hash.startsWith('#careers') ||
        hash.startsWith('#jobs')
      ) {
        setCurrentPage('mentor');
      } else if (
        hash.startsWith('#roadmap') ||
        hash.startsWith('#placement-roadmap') ||
        hash.startsWith('#placement-journey') ||
        hash.startsWith('#7-stage')
      ) {
        setCurrentPage('roadmap');
      } else if (
        hash.startsWith('#training-programs') ||
        hash.startsWith('#training') ||
        hash.startsWith('#programs') ||
        hash.startsWith('#courses')
      ) {
        setCurrentPage('training-programs');
      } else if (
        hash.startsWith('#team') ||
        hash.startsWith('#our-team') ||
        hash.startsWith('#leadership') ||
        hash.startsWith('#founders')
      ) {
        setCurrentPage('team');
      } else if (hash === '#blog' || hash === '#blogs' || hash === '#articles') {
        setCurrentPage('blog');
      } else if (hash === '#login' || hash === '#signin' || hash === '#auth') {
        if (user) {
          setCurrentPage('evaluation');
          window.location.hash = '#evaluation';
        } else {
          setCurrentPage('login');
        }
      } else if (hash === '#signup' || hash === '#register') {
        if (user) {
          setCurrentPage('evaluation');
          window.location.hash = '#evaluation';
        } else {
          setCurrentPage('signup');
        }
      } else if (hash === '#privacy' || hash === '#privacy-policy') {
        setCurrentPage('privacy');
      } else if (hash === '#terms' || hash === '#terms-of-service') {
        setCurrentPage('terms');
      } else if (hash === '#cookies' || hash === '#cookie-policy') {
        setCurrentPage('cookies');
      } else {
        setCurrentPage('home');
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // Run on initial load and whenever hash or user state changes
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [user]);

  const handleBackToHome = () => {
    window.location.hash = '';
    setCurrentPage('home');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  // If viewing the hidden Admin section
  if (currentPage === 'admin') {
    return <AdminView onBackToHome={handleBackToHome} />;
  }

  return (
    <div className="relative min-h-screen bg-[#F8F9FB] text-slate-100 font-sans selection:bg-[#2563EB] selection:text-white flex flex-col">
      {/* Universal Header across public pages (hidden on auth and evaluation pages) */}
      {currentPage !== 'login' &&
        currentPage !== 'signup' &&
        currentPage !== 'evaluation' && <Navbar />}

      <div className="flex-1">
        {currentPage === 'evaluation' ? (
          <ProfileEvaluationPage onBackToHome={handleBackToHome} />
        ) : currentPage === 'mentor' ? (
          <MentorPage onBackToHome={handleBackToHome} />
        ) : currentPage === 'career' ? (
          <CareerPage onBackToHome={handleBackToHome} />
        ) : currentPage === 'training-programs' ? (
          <TrainingProgramsPage onBackToHome={handleBackToHome} />
        ) : currentPage === 'roadmap' ? (
          <RoadmapPage onBackToHome={handleBackToHome} />
        ) : currentPage === 'team' ? (
          <TeamPage onBackToHome={handleBackToHome} />
        ) : currentPage === 'login' || currentPage === 'signup' ? (
          <AuthPage />
        ) : currentPage === 'privacy' || currentPage === 'terms' || currentPage === 'cookies' ? (
          <LegalPage initialTab={currentPage} onBackToHome={handleBackToHome} />
        ) : currentPage === 'blog' ? (
          <BlogPage onBackToHome={handleBackToHome} />
        ) : (
          <main>
            {/* 02. Hero with Dynamic On-Load Entrance & Reference Consultation Form */}
            <Hero />

            {/* 03. Engineering Curriculum Trust Strip */}
            <TrustStrip />

            {/* 04. Problem vs. Solution Diagnostic Bento Grid */}
            <ProblemSection />

            {/* 05. Platform Suite (6 Bento Cards with Live UI Visualizers) */}
            <PlatformSection />

            {/* 06. Meet Our Industry Leaders & Mentors */}
            <MentorsSection />

            {/* 06b. Horizontal Rolling Mentors & Leaders Gallery */}
            <RollingGallerySection />

            {/* 07. Institutional Performance & Animated Metrics */}
            <MetricsSection />

            {/* 08. Testimonials (Editorial Quotation Treatment) */}
            <TestimonialsSection />

            {/* 09. 35+ Campus Hiring Partners 2-Row Logo Marquee */}
            <PartnersSection />

            {/* 10. Cinematic Final CTA */}
            <FinalCTA />
          </main>
        )}
      </div>

      {/* Global Universal Footer across Home, Mentor, Career, Training & Legal */}
      {currentPage !== 'login' && currentPage !== 'signup' && (
        <Footer />
      )}

      {/* Institutional Enquiry & Demo Modal */}
      <EnquiryModal />
    </div>
  );
}

function App() {
  return (
    <AdminAuthProvider>
      <AdminDataProvider>
        <EnquiryProvider>
          <AuthProvider>
            <MainAppContent />
          </AuthProvider>
        </EnquiryProvider>
      </AdminDataProvider>
    </AdminAuthProvider>
  );
}

export default App;
