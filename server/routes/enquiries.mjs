import { Router } from 'express';
import { validateEnquiry } from '../middleware/validation.mjs';
import { sendNotificationEmail, sendConfirmationEmail } from '../services/email.mjs';
import { storeEnquiry } from '../services/database.mjs';

const router = Router();

/**
 * POST /api/enquiries
 * 
 * Unified endpoint for all enquiry types:
 * - PARTNERSHIP
 * - CONSULTATION
 * - PROPOSAL
 * - CONTACT
 */
router.post('/', async (req, res) => {
  try {
    // 1. Validate and sanitize
    const result = validateEnquiry(req.body);

    if (!result.valid) {
      return res.status(400).json({
        success: false,
        message: 'Please check the form and try again.',
        errors: result.errors,
      });
    }

    const data = result.data;

    // 2. Store enquiry in database (backup)
    const dbResult = await storeEnquiry(data);
    if (!dbResult.success && !dbResult.fallback) {
      console.error('[ROUTE] Database storage failed but continuing with email.');
    }

    // 3. Send notification email to Tejas admin
    const notifResult = await sendNotificationEmail(data);

    // 4. Send confirmation email to the enquirer
    const confirmResult = await sendConfirmationEmail(data);

    // Log results
    console.log('[ROUTE] Enquiry processed:', {
      source: data.source,
      college: data.collegeName,
      db: dbResult.success,
      notification: notifResult.success,
      confirmation: confirmResult.success,
    });

    // Return success regardless of email delivery status
    // (the enquiry is stored in DB as backup)
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('[ROUTE] Unexpected error:', err);
    return res.status(500).json({
      success: false,
      message: 'Unable to submit enquiry. Please try again later.',
    });
  }
});

export default router;
