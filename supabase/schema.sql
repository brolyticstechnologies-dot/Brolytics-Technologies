-- ==============================================================================
-- Brolytics Technologies: Supabase Database Schema
-- Run this script in your Supabase SQL Editor: https://supabase.com/dashboard/project/txqkpjedvldlbgzynaqk/sql
-- ==============================================================================

-- 1. Create contact submissions table
CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Allow public anonymous visitors to INSERT new inquiries
CREATE POLICY "Allow anonymous contact form submissions"
ON public.contact_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- 4. Policy: Allow authenticated / service role to view inquiries
CREATE POLICY "Allow authenticated read contact submissions"
ON public.contact_submissions
FOR SELECT
TO authenticated, service_role
USING (true);

-- Indexes for query performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at 
ON public.contact_submissions (created_at DESC);
