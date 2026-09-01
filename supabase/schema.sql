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

-- 5. Create slot_bookings table (Book a Meeting / Strategy Slot)
CREATE TABLE IF NOT EXISTS public.slot_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    service TEXT NOT NULL,
    booking_date TEXT NOT NULL,
    booking_time TEXT NOT NULL,
    meeting_mode TEXT NOT NULL DEFAULT 'Google Meet',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on slot_bookings
ALTER TABLE public.slot_bookings ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts for slot bookings
CREATE POLICY "Allow anonymous slot bookings"
ON public.slot_bookings
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Allow authenticated / service role read access
CREATE POLICY "Allow authenticated read slot bookings"
ON public.slot_bookings
FOR SELECT
TO authenticated, service_role
USING (true);

CREATE INDEX IF NOT EXISTS idx_slot_bookings_created_at 
ON public.slot_bookings (created_at DESC);

