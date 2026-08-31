import { useState, useCallback, useEffect, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, CheckCircle2, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { useEnquiry } from '../context/EnquiryContext';

const SOURCE_TITLES: Record<string, string> = {
  PARTNERSHIP: 'Partner with Grow360',
  CONSULTATION: 'Request an Institutional Demo',
  PROPOSAL: 'Request Campus Training Proposal',
  CONTACT: 'Contact Grow360',
};

/* ─────────────────────────────────────────────
   FORM STATE (5 Essential Fields with Typed Designation)
   ───────────────────────────────────────────── */

interface FormData {
  collegeName: string;
  contactName: string;
  designation: string;
  email: string;
  phone: string;
}

const initialFormData: FormData = {
  collegeName: '',
  contactName: '',
  designation: '',
  email: '',
  phone: '',
};

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

/* ─────────────────────────────────────────────
   CLIENT-SIDE VALIDATION
   ───────────────────────────────────────────── */

function validateClient(data: FormData): string[] {
  const errors: string[] = [];
  if (!data.collegeName.trim()) errors.push('College / University Name is required.');
  if (!data.contactName.trim()) errors.push('Person Name is required.');
  if (!data.designation.trim()) errors.push('Designation is required.');
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
    (field: keyof FormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setClientErrors([]);
    },
    []
  );

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
        const apiUrl = 'https://tejastraning-api.onrender.com/api/enquiries';

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
          const errorMsg =
            data.errors && data.errors.length > 0
              ? data.errors.join(', ')
              : data.message || 'Something went wrong. Please try again or contact us directly.';
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

  const title = SOURCE_TITLES[source] || 'Get in Touch with Grow360';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/30 backdrop-blur-md z-[100]"
            onClick={closeEnquiry}
          />

          {/* Modal panel with Electric Flame Orange Accent */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-xl sm:max-h-[90vh] bg-white shadow-sm rounded-3xl border border-black/8 z-[101] overflow-y-auto shadow-2xl"
          >
            {/* Top Flame Accent Strip */}
            <div className="h-1.5 bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#3B82F6]" />

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-black/8">
              <div>
                <div className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold tracking-wider text-[#2563EB] uppercase mb-1">
                  <Sparkles size={12} className="text-[#2563EB]" />
                  <span>Institutional Placement Infrastructure</span>
                </div>
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight font-[family-name:var(--font-display)]">
                  {title}
                </h2>
              </div>
              <button
                onClick={closeEnquiry}
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-6 text-left">
              {submitState === 'success' ? (
                <SuccessState onClose={closeEnquiry} />
              ) : (
                <form onSubmit={handleSubmit} noValidate autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck={false}>
                  {/* Error display */}
                  {(clientErrors.length > 0 || serverError) && (
                    <div className="mb-6 p-4 rounded-2xl border border-rose-500/30 bg-rose-950/40 text-sm">
                      <div className="flex items-center gap-2 text-rose-400 font-semibold mb-2">
                        <AlertCircle size={16} />
                        Please fix the following:
                      </div>
                      {clientErrors.map((err, i) => (
                        <div key={i} className="text-rose-300 text-xs ml-6">
                          • {err}
                        </div>
                      ))}
                      {serverError && (
                        <div className="text-rose-300 text-xs ml-6">• {serverError}</div>
                      )}
                    </div>
                  )}

                  {/* Row 1: College Name & Person Name */}
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <FormField
                      label="College / University Name"
                      required
                      value={formData.collegeName}
                      onChange={(v) => handleChange('collegeName', v)}
                      placeholder="e.g. SRM Institute / AKTU College"
                    />
                    <FormField
                      label="Person Name"
                      required
                      value={formData.contactName}
                      onChange={(v) => handleChange('contactName', v)}
                      placeholder="e.g. Dr. Rajesh Sharma"
                    />
                  </div>

                  {/* Row 2: Designation (Typed Input) & Phone Number */}
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <FormField
                      label="Designation"
                      required
                      value={formData.designation}
                      onChange={(v) => handleChange('designation', v)}
                      placeholder="e.g. TPO / Principal / Dean / HOD"
                    />
                    <FormField
                      label="Phone Number"
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(v) => handleChange('phone', v)}
                      placeholder="e.g. +91 98765 43210"
                    />
                  </div>

                  {/* Row 3: Email Address */}
                  <div className="mb-6">
                    <FormField
                      label="Email Address"
                      required
                      type="email"
                      value={formData.email}
                      onChange={(v) => handleChange('email', v)}
                      placeholder="e.g. placement@college.edu.in"
                    />
                  </div>

                  {/* Submit with Pill Button */}
                  <button
                    type="submit"
                    disabled={submitState === 'submitting'}
                    className="btn-pill-primary w-full justify-center text-sm py-3.5 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-[#2563EB]/"
                  >
                    {submitState === 'submitting' ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Transmitting enquiry...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Request</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>

                  <p className="mt-3 text-[11px] text-slate-500 text-center font-mono">
                    Your institutional details are securely handled under Grow360 privacy guidelines.
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
      <div className="w-16 h-16 mx-auto mb-6 rounded-2xl border border-emerald-500/40 flex items-center justify-center bg-emerald-500/10 text-emerald-400 shadow-lg">
        <CheckCircle2 size={32} />
      </div>
      <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-2 font-[family-name:var(--font-display)]">
        Demo Request Received
      </h3>
      <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto mb-8">
        Thank you for contacting Grow360. Our Institutional Partnerships team will review your requirements and reach out within 1 business day.
      </p>
      <button
        onClick={onClose}
        className="btn-pill-secondary px-6 py-3 cursor-pointer"
      >
        <span>Back to Grow360</span>
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
      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5 font-mono">
        {label}
        {required && <span className="text-[#2563EB] ml-0.5">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        autoComplete="new-password"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-500 focus:border-[#2563EB] focus:outline-none transition-all bg-white"
      />
    </div>
  );
}


