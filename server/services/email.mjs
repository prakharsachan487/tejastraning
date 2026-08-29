import { Resend } from 'resend';

/**
 * Email service for sending notification and confirmation emails.
 * Uses Resend as the transactional email provider.
 * 
 * Requires:
 * - RESEND_API_KEY environment variable
 * - ADMIN_EMAIL environment variable (recipient for notifications)
 * - FROM_EMAIL environment variable (sender address, must be verified in Resend)
 */

let resendClient = null;

function getClient() {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn('[EMAIL] RESEND_API_KEY not set — emails will be skipped.');
      return null;
    }
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

/**
 * Send notification email to Tejas admin about a new enquiry.
 */
export async function sendNotificationEmail(data) {
  const client = getClient();
  if (!client) {
    console.warn('[EMAIL] Skipping notification email — no API key configured.');
    return { success: false, reason: 'no_api_key' };
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) {
    console.warn('[EMAIL] Skipping notification email — ADMIN_EMAIL not set.');
    return { success: false, reason: 'no_admin_email' };
  }

  const fromEmail = process.env.FROM_EMAIL || 'noreply@tejastraining.com';
  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  const sourceLabels = {
    PARTNERSHIP: 'Partnership Enquiry',
    CONSULTATION: 'Campus Consultation Request',
    PROPOSAL: 'Proposal Request',
    CONTACT: 'Contact Form',
  };

  const sourceLabel = sourceLabels[data.source] || 'Website Enquiry';

  try {
    await client.emails.send({
      from: fromEmail,
      to: [adminEmail],
      subject: `New College Partnership Enquiry — ${data.collegeName}`,
      text: `
NEW TEJAS TRAINING ENQUIRY
${'═'.repeat(50)}

Type: ${sourceLabel}

College / University:
${data.collegeName}

Contact Person:
${data.contactName}

Designation:
${data.designation}

Official Email:
${data.email}

Phone:
${data.phone}

City:
${data.city || '—'}

Number of Students:
${data.studentCount || '—'}

Programs / Departments:
${data.programs || '—'}

Interested In:
${Array.isArray(data.interests) ? data.interests.join(', ') : data.interests || '—'}

Preferred Training Mode:
${data.trainingMode || '—'}

Message:
${data.message || '—'}

${'─'.repeat(50)}
Submitted At: ${timestamp}
Source: Tejas Training Website
      `.trim(),
    });

    console.log('[EMAIL] Notification sent to', adminEmail);
    return { success: true };
  } catch (err) {
    console.error('[EMAIL] Failed to send notification:', err.message);
    return { success: false, reason: err.message };
  }
}

/**
 * Send auto-reply confirmation to the enquirer's email.
 */
export async function sendConfirmationEmail(data) {
  const client = getClient();
  if (!client) {
    console.warn('[EMAIL] Skipping confirmation email — no API key configured.');
    return { success: false, reason: 'no_api_key' };
  }

  const fromEmail = process.env.FROM_EMAIL || 'noreply@tejastraining.com';

  try {
    await client.emails.send({
      from: fromEmail,
      to: [data.email],
      subject: 'We received your enquiry — Tejas Training',
      text: `
Hello ${data.contactName},

Thank you for reaching out to Tejas Training.

We have received your enquiry regarding institutional training and partnership opportunities.

Our team will review your requirements and get in touch with you shortly.

Regards,
Tejas Training
Learning & Development

---
This is an automated message. Please do not reply to this email.
      `.trim(),
    });

    console.log('[EMAIL] Confirmation sent to', data.email);
    return { success: true };
  } catch (err) {
    console.error('[EMAIL] Failed to send confirmation:', err.message);
    return { success: false, reason: err.message };
  }
}
