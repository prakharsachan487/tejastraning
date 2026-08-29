import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { ProgramsSection } from './components/ProgramsSection';
import { WhyPartnerSection } from './components/WhyPartnerSection';
import { HowWeWorkSection } from './components/HowWeWorkSection';
import { ImpactSection } from './components/ImpactSection';
import { PartnerCTA } from './components/PartnerCTA';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { EnquiryProvider } from './context/EnquiryContext';
import { EnquiryModal } from './components/EnquiryModal';

function App() {
  return (
    <EnquiryProvider>
      <div className="relative">
        <Navbar />
        <main>
          {/* 01 */ }
          <Hero />
          {/* Trust */}
          <TrustStrip />
          {/* 02 */}
          <ProgramsSection />
          {/* 03 */}
          <WhyPartnerSection />
          {/* 04 */}
          <HowWeWorkSection />
          {/* 05 */}
          <ImpactSection />
          {/* Partnership CTA */}
          <PartnerCTA />
          {/* Final CTA */}
          <FinalCTA />
        </main>
        <Footer />
        <EnquiryModal />
      </div>
    </EnquiryProvider>
  );
}

export default App;
