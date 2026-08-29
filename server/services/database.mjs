import { createClient } from '@supabase/supabase-js';

/**
 * Database service for storing enquiries.
 * Uses Supabase (PostgreSQL) as the backing store.
 *
 * Requires:
 * - SUPABASE_URL environment variable
 * - SUPABASE_SERVICE_KEY environment variable
 *
 * If credentials are not configured, enquiries are logged to console
 * as a fallback so no data is silently lost.
 */

let supabaseClient = null;

function getClient() {
  if (!supabaseClient) {
    let url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_KEY;

    if (!url || !key) {
      console.warn('[DB] SUPABASE_URL or SUPABASE_SERVICE_KEY not set — database storage disabled.');
      return null;
    }

    // Automatically strip any trailing /rest/v1 or slashes
    url = url.trim().replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');

    supabaseClient = createClient(url, key);
  }
  return supabaseClient;
}

/**
 * Store a validated enquiry in the database.
 * Falls back to console logging if database is not configured.
 */
export async function storeEnquiry(data) {
  const client = getClient();

  // Safely parse student_count to integer or null for PostgreSQL integer column
  let studentCount = null;
  if (data.studentCount) {
    const parsed = parseInt(String(data.studentCount).replace(/[^0-9]/g, ''), 10);
    if (!isNaN(parsed)) {
      studentCount = parsed;
    }
  }

  const record = {
    source: data.source || 'CONTACT',
    college_name: data.collegeName ? String(data.collegeName).trim() : '',
    contact_name: data.contactName ? String(data.contactName).trim() : '',
    designation: data.designation ? String(data.designation).trim() : '',
    email: data.email ? String(data.email).trim() : '',
    phone: data.phone ? String(data.phone).trim() : '',
    city: data.city && String(data.city).trim() ? String(data.city).trim() : null,
    student_count: studentCount,
    programs: data.programs && String(data.programs).trim() ? String(data.programs).trim() : null,
    interests: Array.isArray(data.interests) && data.interests.length > 0 
      ? data.interests.join(', ') 
      : (data.interests && String(data.interests).trim() ? String(data.interests).trim() : null),
    training_mode: data.trainingMode && String(data.trainingMode).trim() ? String(data.trainingMode).trim() : null,
    message: data.message && String(data.message).trim() ? String(data.message).trim() : null,
    status: 'NEW',
    created_at: new Date().toISOString(),
  };

  if (!client) {
    // Fallback: log the enquiry so it's not lost
    console.log('[DB] (fallback) Enquiry record:', JSON.stringify(record, null, 2));
    return { success: true, fallback: true };
  }

  try {
    const { data: inserted, error } = await client
      .from('enquiries')
      .insert([record])
      .select('id')
      .single();

    if (error) {
      console.error('[DB] Insert failed:', error.message);
      // Still log so data isn't lost
      console.log('[DB] (fallback) Enquiry record:', JSON.stringify(record, null, 2));
      return { success: false, reason: error.message };
    }

    console.log('[DB] Enquiry stored with id:', inserted.id);
    return { success: true, id: inserted.id };
  } catch (err) {
    console.error('[DB] Unexpected error:', err.message);
    console.log('[DB] (fallback) Enquiry record:', JSON.stringify(record, null, 2));
    return { success: false, reason: err.message };
  }
}
