/**
 * Server-side validation and sanitization for enquiry submissions.
 * Never trust client-side validation alone.
 */

const VALID_DESIGNATIONS = [
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

const VALID_SOURCES = ['PARTNERSHIP', 'CONSULTATION', 'PROPOSAL', 'CONTACT'];

const VALID_TRAINING_MODES = ['On Campus', 'Online', 'Hybrid'];

const VALID_INTERESTS = [
  'Technical Training',
  'Aptitude & Employability',
  'Certifications',
  'Industry Projects',
  'Interview Preparation',
  'Placement Preparation',
  'Soft Skills',
  'Customized Training',
];

/**
 * Sanitize a string: trim, strip HTML tags, limit length.
 */
function sanitize(value, maxLength = 500) {
  if (typeof value !== 'string') return '';
  return value
    .trim()
    .replace(/<[^>]*>/g, '')  // Strip HTML tags
    .replace(/&[a-z]+;/gi, '') // Strip HTML entities
    .slice(0, maxLength);
}

/**
 * Validate email format (basic RFC 5322 pattern).
 */
function isValidEmail(email) {
  return /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email);
}

/**
 * Validate phone number (Indian format, 10+ digits).
 */
function isValidPhone(phone) {
  const digits = phone.replace(/[\s\-\+\(\)]/g, '');
  return /^\d{7,15}$/.test(digits);
}

/**
 * Validate and sanitize the full enquiry payload.
 * Returns { valid: true, data: {...} } or { valid: false, errors: [...] }
 */
export function validateEnquiry(body) {
  const errors = [];

  // Required fields
  const collegeName = sanitize(body.collegeName, 200);
  if (!collegeName) errors.push('College / University Name is required.');

  const contactName = sanitize(body.contactName, 100);
  if (!contactName) errors.push('Contact Person Name is required.');

  const designation = sanitize(body.designation, 100);
  if (!designation) errors.push('Designation is required.');

  const email = sanitize(body.email, 254);
  if (!email) errors.push('Official Email is required.');
  else if (!isValidEmail(email)) errors.push('Invalid email format.');

  const phone = sanitize(body.phone, 30);
  if (!phone) errors.push('Phone Number is required.');
  else if (!isValidPhone(phone)) errors.push('Invalid phone number format.');

  // Optional fields
  const city = sanitize(body.city, 100);
  const studentCount = sanitize(body.studentCount, 50);
  const programs = sanitize(body.programs, 500);
  const message = sanitize(body.message, 2000);
  const trainingMode = sanitize(body.trainingMode, 50);

  // Interests: accept array of strings
  let interests = [];
  if (Array.isArray(body.interests)) {
    interests = body.interests
      .map(i => sanitize(i, 100))
      .filter(Boolean);
  }

  // Source
  const source = sanitize(body.source, 50);
  const validSource = VALID_SOURCES.includes(source) ? source : 'CONTACT';

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    data: {
      collegeName,
      contactName,
      designation,
      email,
      phone,
      city,
      studentCount,
      programs,
      interests,
      trainingMode,
      message,
      source: validSource,
    },
  };
}
