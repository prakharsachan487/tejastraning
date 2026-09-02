import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export type EnquirySource =
  | 'PARTNERSHIP'
  | 'CONSULTATION'
  | 'PROPOSAL'
  | 'CONTACT'
  | 'CAREER_EVALUATION'
  | 'CAREER_ROADMAP'
  | 'MENTOR_MOCK_DRIVE'
  | 'INSTANT_CALLBACK';

interface EnquiryContextValue {
  isOpen: boolean;
  source: EnquirySource;
  openEnquiry: (source?: EnquirySource) => void;
  closeEnquiry: () => void;
}

const EnquiryContext = createContext<EnquiryContextValue | null>(null);

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState<EnquirySource>('PARTNERSHIP');

  const openEnquiry = useCallback((src: EnquirySource = 'PARTNERSHIP') => {
    setSource(src);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeEnquiry = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = '';
  }, []);

  return (
    <EnquiryContext.Provider value={{ isOpen, source, openEnquiry, closeEnquiry }}>
      {children}
    </EnquiryContext.Provider>
  );
}

export function useEnquiry() {
  const ctx = useContext(EnquiryContext);
  if (!ctx) throw new Error('useEnquiry must be used within EnquiryProvider');
  return ctx;
}
