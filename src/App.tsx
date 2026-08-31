import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { ProblemSection } from './components/ProblemSection';
import { PlatformSection } from './components/PlatformSection';
import { TrainingSolutionsSection } from './components/TrainingSolutionsSection';
import { MentorsSection } from './components/MentorsSection';
import { PlacementJourneySection } from './components/PlacementJourneySection';
import { ProgramsSection } from './components/ProgramsSection';
import { MetricsSection } from './components/MetricsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { PartnersSection } from './components/PartnersSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { EnquiryProvider } from './context/EnquiryContext';
import { AuthProvider } from './context/AuthContext';
import { EnquiryModal } from './components/EnquiryModal';
import { MentorPage } from './components/MentorPage';
import { StudentDashboard } from './components/StudentDashboard';
import { LegalPage } from './components/LegalPage';
import { AuthPage } from './components/AuthPage';
import { CareerPage } from './components/CareerPage';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'mentor' | 'career' | 'login' | 'signup' | 'dashboard' | 'privacy' | 'terms' | 'cookies'>('home');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#mentor' || hash === '#become-a-mentor') {
        setCurrentPage('mentor');
      } else if (hash === '#career' || hash === '#careers' || hash === '#jobs') {
        setCurrentPage('career');
      } else if (hash === '#login' || hash === '#signin' || hash === '#auth') {
        setCurrentPage('login');
      } else if (hash === '#signup' || hash === '#register') {
        setCurrentPage('signup');
      } else if (hash === '#dashboard' || hash === '#profile') {
        setCurrentPage('dashboard');
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

    // Check initial hash
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleBackToHome = () => {
    window.location.hash = '';
    setCurrentPage('home');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  return (
    <EnquiryProvider>
      <AuthProvider>
        <div className="relative min-h-screen bg-[#0A0A0D] text-slate-100 font-sans selection:bg-[#FF4500] selection:text-white">
          {currentPage === 'mentor' ? (
            <MentorPage onBackToHome={handleBackToHome} />
          ) : currentPage === 'career' ? (
            <CareerPage onBackToHome={handleBackToHome} />
          ) : currentPage === 'login' || currentPage === 'signup' ? (
            <AuthPage />
          ) : currentPage === 'dashboard' ? (
            <StudentDashboard onBackToHome={handleBackToHome} />
          ) : currentPage === 'privacy' || currentPage === 'terms' || currentPage === 'cookies' ? (
            <LegalPage initialTab={currentPage} onBackToHome={handleBackToHome} />
          ) : (
            <>
              {/* 01. Floating Dark Header */}
              <Navbar />

              <main>
                {/* 02. Hero with Dynamic On-Load Entrance & Code Typing Animation */}
                <Hero />

                {/* 03. Engineering Curriculum Trust Strip */}
                <TrustStrip />

                {/* 04. Problem vs. Solution Diagnostic Bento Grid */}
                <ProblemSection />

                {/* 05. Platform Suite (6 Bento Cards with Live UI Visualizers) */}
                <PlatformSection />

                {/* 06. Flagship Training Solutions (Impact & MARQUEE) */}
                <TrainingSolutionsSection />

                {/* 07. Meet Our Industry Leaders & Mentors */}
                <MentorsSection />

                {/* 08. The 7-Stage Placement Journey Roadmap */}
                <PlacementJourneySection />

                {/* 09. Industry-Ready Programs Interactive Catalog */}
                <ProgramsSection />

                {/* 10. Institutional Performance & Animated Metrics */}
                <MetricsSection />

                {/* 11. Testimonials (Editorial Quotation Treatment) */}
                <TestimonialsSection />

                {/* 12. 35+ Campus Hiring Partners 2-Row Logo Marquee */}
                <PartnersSection />

                {/* 13. Cinematic Final CTA */}
                <FinalCTA />
              </main>

              {/* 14. Spacious Dark Minimal Footer */}
              <Footer />
            </>
          )}

          {/* 15. Working Institutional Enquiry & Demo Modal */}
          <EnquiryModal />
        </div>
      </AuthProvider>
    </EnquiryProvider>
  );
}

export default App;
