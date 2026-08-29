-- ═══════════════════════════════════════════════════════
-- Tejas Training — Enquiries Table
-- Run this in your Supabase SQL Editor to create the table.
-- ═══════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS enquiries (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  source        TEXT NOT NULL DEFAULT 'CONTACT'
                  CHECK (source IN ('PARTNERSHIP', 'CONSULTATION', 'PROPOSAL', 'CONTACT')),
  college_name  TEXT NOT NULL,
  contact_name  TEXT NOT NULL,
  designation   TEXT NOT NULL,
  email         TEXT NOT NULL,
  phone         TEXT NOT NULL,
  city          TEXT,
  student_count TEXT,
  programs      TEXT,
  interests     TEXT,
  training_mode TEXT,
  message       TEXT,
  status        TEXT NOT NULL DEFAULT 'NEW'
                  CHECK (status IN ('NEW', 'CONTACTED', 'CLOSED')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for quick lookups by status and date
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries (status);
CREATE INDEX IF NOT EXISTS idx_enquiries_created ON enquiries (created_at DESC);

-- Enable Row Level Security (Supabase best practice)
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Policy: Only the service role key can insert (server-side only)
CREATE POLICY "Service role can insert enquiries"
  ON enquiries
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Policy: Only the service role key can read enquiries
CREATE POLICY "Service role can read enquiries"
  ON enquiries
  FOR SELECT
  TO service_role
  USING (true);

-- Policy: Only the service role key can update enquiries
CREATE POLICY "Service role can update enquiries"
  ON enquiries
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);
