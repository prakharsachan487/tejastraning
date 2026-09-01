-- ═══════════════════════════════════════════════════════════════════════════
-- Grow360 / Tejas Training — Complete Supabase Database & Storage Setup
-- Copy and run this entire script in your Supabase Dashboard -> SQL Editor -> Run
-- ═══════════════════════════════════════════════════════════════════════════

-- ─── 1. ENQUIRIES TABLE (Connect With Grow 360 Forms) ────────────────────────
CREATE TABLE IF NOT EXISTS public.enquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  college_name TEXT NOT NULL DEFAULT 'N/A',
  contact_name TEXT NOT NULL DEFAULT 'Anonymous',
  full_name TEXT,
  designation TEXT DEFAULT 'General',
  profession TEXT DEFAULT 'General',
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT,
  request_details TEXT,
  source TEXT NOT NULL DEFAULT 'CONSULTATION',
  status TEXT NOT NULL DEFAULT 'NEW' CHECK (status IN ('NEW', 'CONTACTED', 'IN_PROGRESS', 'CLOSED')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── 2. JOBS TABLE (Active Openings & Mentor Roles) ──────────────────────────
CREATE TABLE IF NOT EXISTS public.mentor_jobs (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  domain TEXT NOT NULL DEFAULT 'Tech' CHECK (domain IN ('Tech', 'Non-Tech', 'Academics', 'Sales')),
  job_type TEXT NOT NULL DEFAULT 'Full-time',
  location TEXT NOT NULL DEFAULT 'Remote',
  location_category TEXT NOT NULL DEFAULT 'Remote',
  salary TEXT NOT NULL DEFAULT 'Competitive',
  skills TEXT DEFAULT '[]', -- JSON array of strings
  summary TEXT,
  responsibilities TEXT DEFAULT '[]', -- JSON array of strings
  requirements TEXT DEFAULT '[]', -- JSON array of strings
  openings INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── 3. JOB APPLICATIONS TABLE (Candidate Profiles & Resumes) ───────────────
CREATE TABLE IF NOT EXISTS public.mentor_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id BIGINT,
  applied_role TEXT DEFAULT 'Mentor / Instructor Role',
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  resume_path TEXT,
  resume_link TEXT,
  portfolio_link TEXT,
  experience TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'approved', 'rejected', 'shortlisted', 'interview_scheduled', 'offered')),
  admin_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── 4. INDEXES FOR HIGH-SPEED QUERIES ───────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON public.enquiries (status);
CREATE INDEX IF NOT EXISTS idx_enquiries_created ON public.enquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_mentor_jobs_domain ON public.mentor_jobs (domain);
CREATE INDEX IF NOT EXISTS idx_mentor_apps_job_id ON public.mentor_applications (job_id);
CREATE INDEX IF NOT EXISTS idx_mentor_apps_created ON public.mentor_applications (created_at DESC);

-- ─── 5. ROW LEVEL SECURITY (RLS) POLICIES ────────────────────────────────────
-- Enable RLS
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentor_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentor_applications ENABLE ROW LEVEL SECURITY;

-- Allow Public & Anonymous Insert + Read (for live website & admin panel)
DROP POLICY IF EXISTS "Public can insert enquiries" ON public.enquiries;
CREATE POLICY "Public can insert enquiries" ON public.enquiries FOR INSERT TO public WITH CHECK (true);

DROP POLICY IF EXISTS "Public can read enquiries" ON public.enquiries;
CREATE POLICY "Public can read enquiries" ON public.enquiries FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "Public can update enquiries" ON public.enquiries;
CREATE POLICY "Public can update enquiries" ON public.enquiries FOR UPDATE TO public USING (true);

DROP POLICY IF EXISTS "Public can delete enquiries" ON public.enquiries;
CREATE POLICY "Public can delete enquiries" ON public.enquiries FOR DELETE TO public USING (true);

-- Mentor Jobs Policies
DROP POLICY IF EXISTS "Public can read mentor_jobs" ON public.mentor_jobs;
CREATE POLICY "Public can read mentor_jobs" ON public.mentor_jobs FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "Public can insert mentor_jobs" ON public.mentor_jobs;
CREATE POLICY "Public can insert mentor_jobs" ON public.mentor_jobs FOR INSERT TO public WITH CHECK (true);

DROP POLICY IF EXISTS "Public can update mentor_jobs" ON public.mentor_jobs;
CREATE POLICY "Public can update mentor_jobs" ON public.mentor_jobs FOR UPDATE TO public USING (true);

DROP POLICY IF EXISTS "Public can delete mentor_jobs" ON public.mentor_jobs;
CREATE POLICY "Public can delete mentor_jobs" ON public.mentor_jobs FOR DELETE TO public USING (true);

-- Mentor Applications Policies
DROP POLICY IF EXISTS "Public can insert mentor_applications" ON public.mentor_applications;
CREATE POLICY "Public can insert mentor_applications" ON public.mentor_applications FOR INSERT TO public WITH CHECK (true);

DROP POLICY IF EXISTS "Public can read mentor_applications" ON public.mentor_applications;
CREATE POLICY "Public can read mentor_applications" ON public.mentor_applications FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "Public can update mentor_applications" ON public.mentor_applications;
CREATE POLICY "Public can update mentor_applications" ON public.mentor_applications FOR UPDATE TO public USING (true);

DROP POLICY IF EXISTS "Public can delete mentor_applications" ON public.mentor_applications;
CREATE POLICY "Public can delete mentor_applications" ON public.mentor_applications FOR DELETE TO public USING (true);

-- ─── 6. STORAGE BUCKET FOR RESUMES & ATTACHMENTS ────────────────────────────
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS Policies for resumes bucket
DROP POLICY IF EXISTS "Public Access to Resumes" ON storage.objects;
CREATE POLICY "Public Access to Resumes" ON storage.objects
  FOR SELECT TO public USING (bucket_id = 'resumes');

DROP POLICY IF EXISTS "Public Upload to Resumes" ON storage.objects;
CREATE POLICY "Public Upload to Resumes" ON storage.objects
  FOR INSERT TO public WITH CHECK (bucket_id = 'resumes');

-- ─── 7. INITIAL SAMPLE JOBS SEED ─────────────────────────────────────────────
INSERT INTO public.mentor_jobs (title, domain, job_type, location, location_category, salary, skills, summary, openings)
VALUES 
  ('Backend Engineer & Technical Mentor', 'Tech', 'Full-time', 'Remote', 'Remote', '₹6,00,000 - ₹10,00,000 / year', '["Next.js", "Node.js", "AWS", "Redis", "PostgreSQL"]', 'Lead scalable backend curriculum design, build sandbox code evaluation pipelines, and mentor final-year students.', 3),
  ('DSA & C++ Technical Trainer', 'Tech', 'Full-time', 'India, Punjab (Phagwara / Onsite)', 'Phagwara', '₹6,00,000 - ₹9,00,000 / year', '["DSA", "C++", "Competitive Programming", "Graph Algorithms"]', 'Train university cohorts in advanced Data Structures & Algorithms for tier-1 tech placement drives.', 4),
  ('Business Analytics & Power BI Lead Instructor', 'Non-Tech', 'Part-time', 'Remote', 'Remote', '₹50,000 - ₹80,000 / month', '["Power BI", "SQL", "Tableau", "DAX", "Data Modeling"]', 'Spearhead our commercial analytics curriculum, teaching enterprise reporting and executive dashboards.', 2)
ON CONFLICT DO NOTHING;
