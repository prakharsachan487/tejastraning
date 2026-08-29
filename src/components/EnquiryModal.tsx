import { useState, useCallback, useEffect, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useEnquiry } from '../context/EnquiryContext';

/* ─────────────────────────────────────────────
   FORM OPTIONS
   ───────────────────────────────────────────── */

const DESIGNATIONS = [
  'Principal',
  'Director',
  'Dean',
  'Training & Placement Officer',
  'Placement Cell',
  'HOD',
  'Faculty',
  'Management',
  'Other',
];

const TRAINING_INTERESTS = [
  'Technical Training',
  'Aptitude & Employability',
  'Certifications',
  'Industry Projects',
  'Interview Preparation',
  'Placement Preparation',
  'Soft Skills',
  'Customized Training',
];

const TRAINING_MODES = ['On Campus', 'Online', 'Hybrid'];

const SOURCE_TITLES: Record<string, string> = {
  PARTNERSHIP: 'Partner with Tejas',
  CONSULTATION: 'Book a Campus Consultation',
  PROPOSAL: 'Request a Proposal',
  CONTACT: 'Contact Us',
};

/* ─────────────────────────────────────────────
   FORM STATE
   ───────────────────────────────────────────── */

interface FormData {
  collegeName: string;
  contactName: string;
  designation: string;
  email: string;
  phone: string;
  city: string;
  studentCount: string;
  programs: string;
  interests: string[];
  trainingMode: string;
  message: string;
}

const initialFormData: FormData = {
  collegeName: '',
  contactName: '',
  designation: '',
  email: '',
  phone: '',
  city: '',
  studentCount: '',
  programs: '',
  interests: [],
  trainingMode: '',
  message: '',
};

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

/* ─────────────────────────────────────────────
   CLIENT-SIDE VALIDATION
   ───────────────────────────────────────────── */

function validateClient(data: FormData): string[] {
  const errors: string[] = [];
  if (!data.collegeName.trim()) errors.push('College / University Name is required.');
  if (!data.contactName.trim()) errors.push('Contact Person Name is required.');
  if (!data.designation) errors.push('Designation is required.');
  if (!data.email.trim()) errors.push('Official Email is required.');
  else if (!/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(data.email.trim())) {
    errors.push('Please enter a valid email address.');
  }
  if (!data.phone.trim()) errors.push('Phone Number is required.');
  else if (!/^\+?[\d\s\-()]{10,}$/.test(data.phone.trim())) {
    errors.push('Please enter a valid phone number.');
  }
  return errors;
}

/* ─────────────────────────────────────────────
   COMPONENT
   ───────────────────────────────────────────── */

export function EnquiryModal() {
  const { isOpen, source, closeEnquiry } = useEnquiry();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [clientErrors, setClientErrors] = useState<string[]>([]);
  const [serverError, setServerError] = useState('');

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData(initialFormData);
      setSubmitState('idle');
      setClientErrors([]);
      setServerError('');
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) closeEnquiry();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, closeEnquiry]);

  const handleChange = useCallback(
    (field: keyof FormData, value: string | string[]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setClientErrors([]);
    },
    []
  );

  const toggleInterest = useCallback((interest: string) => {
    setFormData((prev) => {
      const interests = prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests };
    });
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      // Client validation
      const errors = validateClient(formData);
      if (errors.length > 0) {
        setClientErrors(errors);
        return;
      }

      setSubmitState('submitting');
      setServerError('');

      try {
        // Try relative endpoint (via Vite proxy) or direct backend URL
        const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
          ? 'http://localhost:3001/api/enquiries'
          : '/api/enquiries';

        const res = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            source,
          }),
        });

        const data = await res.json();

        if (data.success) {
          setSubmitState('success');
        } else {
          setSubmitState('error');
          const errorMsg = data.errors && data.errors.length > 0 
            ? data.errors.join(', ') 
            : (data.message || 'Something went wrong. Please try again or contact us directly.');
          setServerError(errorMsg);
        }
      } catch (err) {
        console.error('Submission error:', err);
        setSubmitState('error');
        setServerError('Something went wrong. Please check your network and try again.');
      }
    },
    [formData, source]
  );

  const title = SOURCE_TITLES[source] || 'Get in Touch';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-[100]"
            onClick={closeEnquiry}
          />

          {/* Modal panel */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-2xl sm:max-h-[90vh] bg-surface-white border border-ink-100 z-[101] overflow-y-auto"
          >
            {/* Red accent bar */}
            <div className="h-1 bg-tejas-red" />

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-ink-100">
              <div>
                <div className="font-mono text-[9px] tracking-[0.15em] text-tejas-red uppercase mb-1">
                  ● Institutional Enquiry
                </div>
                <h2 className="text-lg font-bold text-ink-900 tracking-tight">{title}</h2>
              </div>
              <button
                onClick={closeEnquiry}
                className="p-2 text-ink-400 hover:text-ink-700 hover:bg-ink-50 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-6">
              {submitState === 'success' ? (
                <SuccessState onClose={closeEnquiry} />
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  {/* Error display */}
                  {(clientErrors.length > 0 || serverError) && (
                    <div className="mb-6 p-4 border border-red-200 bg-red-50 text-sm">
                      <div className="flex items-center gap-2 text-red-700 font-semibold mb-2">
                        <AlertCircle size={16} />
                        Please fix the following:
                      </div>
                      {clientErrors.map((err, i) => (
                        <div key={i} className="text-red-600 text-xs ml-6">
                          • {err}
                        </div>
                      ))}
                      {serverError && (
                        <div className="text-red-600 text-xs ml-6">• {serverError}</div>
                      )}
                    </div>
                  )}

                  {/* Row 1: College + Contact */}
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <FormField
                      label="College / University Name"
                      required
                      value={formData.collegeName}
                      onChange={(v) => handleChange('collegeName', v)}
                      placeholder="e.g. VIT University"
                    />
                    <FormField
                      label="Contact Person Name"
                      required
                      value={formData.contactName}
                      onChange={(v) => handleChange('contactName', v)}
                      placeholder="Full name"
                    />
                  </div>

                  {/* Row 2: Designation + Email */}
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <FormSelect
                      label="Designation"
                      required
                      value={formData.designation}
                      onChange={(v) => handleChange('designation', v)}
                      options={DESIGNATIONS}
                      placeholder="Select your role"
                    />
                    <FormField
                      label="Official Email"
                      required
                      type="email"
                      value={formData.email}
                      onChange={(v) => handleChange('email', v)}
                      placeholder="name@college.edu"
                    />
                  </div>

                  {/* Row 3: Phone + City */}
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <FormField
                      label="Phone Number"
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(v) => handleChange('phone', v)}
                      placeholder="+91 98765 43210"
                    />
                    <FormField
                      label="City"
                      value={formData.city}
                      onChange={(v) => handleChange('city', v)}
                      placeholder="e.g. Bangalore"
                    />
                  </div>

                  {/* Row 4: Students + Programs */}
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <FormField
                      label="Number of Students"
                      value={formData.studentCount}
                      onChange={(v) => handleChange('studentCount', v)}
                      placeholder="Approximate count"
                    />
                    <FormField
                      label="Programs / Departments"
                      value={formData.programs}
                      onChange={(v) => handleChange('programs', v)}
                      placeholder="e.g. B.Tech CSE, BBA"
                    />
                  </div>

                  {/* Training interests */}
                  <div className="mb-4">
                    <label className="block text-xs font-semibold text-ink-600 tracking-wide uppercase mb-2">
                      Interested Training Solutions
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {TRAINING_INTERESTS.map((interest) => {
                        const selected = formData.interests.includes(interest);
                        return (
                          <button
                            key={interest}
                            type="button"
                            onClick={() => toggleInterest(interest)}
                            className={`px-3 py-1.5 text-xs font-medium border transition-all duration-200 cursor-pointer ${selected
                                ? 'border-tejas-red text-tejas-red bg-tejas-red/5'
                                : 'border-ink-200 text-ink-500 hover:border-ink-300'
                              }`}
                          >
                            {interest}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Training mode */}
                  <div className="mb-4">
                    <label className="block text-xs font-semibold text-ink-600 tracking-wide uppercase mb-2">
                      Preferred Training Mode
                    </label>
                    <div className="flex gap-3">
                      {TRAINING_MODES.map((mode) => {
                        const selected = formData.trainingMode === mode;
                        return (
                          <button
                            key={mode}
                            type="button"
                            onClick={() => handleChange('trainingMode', mode)}
                            className={`px-4 py-2 text-xs font-medium border transition-all duration-200 cursor-pointer ${selected
                                ? 'border-tejas-red text-tejas-red bg-tejas-red/5'
                                : 'border-ink-200 text-ink-500 hover:border-ink-300'
                              }`}
                          >
                            {mode}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="mb-6">
                    <label className="block text-xs font-semibold text-ink-600 tracking-wide uppercase mb-2">
                      Message
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      placeholder="Tell us about your requirements, goals or any specific questions..."
                      rows={3}
                      maxLength={2000}
                      className="w-full px-4 py-3 border border-ink-200 text-sm text-ink-800 placeholder:text-ink-300 focus:border-tejas-red focus:outline-none transition-colors resize-none bg-white"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitState === 'submitting'}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-tejas-red text-white text-sm font-semibold hover:bg-tejas-red-dark transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitState === 'submitting' ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Sending enquiry...
                      </>
                    ) : (
                      <>
                        Submit Enquiry
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>

                  <p className="mt-3 text-[10px] text-ink-400 text-center">
                    Your information is secure and will only be used to respond to your enquiry.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────
   SUCCESS STATE
   ───────────────────────────────────────────── */

function SuccessState({ onClose }: { onClose: () => void }) {
  return (
    <div className="text-center py-8">
      <div className="w-16 h-16 mx-auto mb-6 border border-tejas-red/20 flex items-center justify-center bg-tejas-red/5">
        <CheckCircle2 size={32} className="text-tejas-red" />
      </div>
      <h3 className="text-xl font-bold text-ink-900 tracking-tight mb-2">
        Thank you for reaching out.
      </h3>
      <p className="text-sm text-ink-400 leading-relaxed max-w-md mx-auto mb-8">
        Your partnership enquiry has been received. Our team will review your requirements and
        contact you shortly.
      </p>
      <button
        onClick={onClose}
        className="inline-flex items-center gap-2 px-6 py-3 border border-ink-200 text-ink-700 text-sm font-semibold hover:border-tejas-red hover:text-tejas-red transition-all cursor-pointer"
      >
        Back to website
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FORM FIELD COMPONENTS
   ───────────────────────────────────────────── */

interface FormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}

function FormField({
  label,
  value,
  onChange,
  placeholder = '',
  type = 'text',
  required = false,
}: FormFieldProps) {
  return (
    <div>
      <label className="block text-xs font-semibold text-ink-600 tracking-wide uppercase mb-1.5">
        {label}
        {required && <span className="text-tejas-red ml-0.5">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-2.5 border border-ink-200 text-sm text-ink-800 placeholder:text-ink-300 focus:border-tejas-red focus:outline-none transition-colors bg-white"
      />
    </div>
  );
}

interface FormSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  required?: boolean;
}

function FormSelect({
  label,
  value,
  onChange,
  options,
  placeholder = 'Select...',
  required = false,
}: FormSelectProps) {
  return (
    <div>
      <label className="block text-xs font-semibold text-ink-600 tracking-wide uppercase mb-1.5">
        {label}
        {required && <span className="text-tejas-red ml-0.5">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full px-4 py-2.5 border border-ink-200 text-sm text-ink-800 focus:border-tejas-red focus:outline-none transition-colors bg-white appearance-none cursor-pointer"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
