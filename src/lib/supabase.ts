/**
 * Supabase client and helper utilities for Brolytics Technologies
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://txqkpjedvldlbgzynaqk.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_tS-UgzxJcrJ7wWAQNwwrqw_G318tXnK';

export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  created_at?: string;
}

/**
 * Inserts a new contact submission / lead into Supabase
 */
export async function insertContactSubmission(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/contact_submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        message: data.message,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.warn('Supabase insert warning:', errText);
      return { success: false, error: errText };
    }

    return { success: true };
  } catch (err: any) {
    console.error('Supabase contact submission error:', err);
    return { success: false, error: err?.message || 'Network error' };
  }
}

export interface SlotBooking {
  id?: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  booking_date: string;
  booking_time: string;
  meeting_mode: string;
  notes?: string;
  created_at?: string;
}

/**
 * Inserts a slot booking into Supabase (with fallback to contact_submissions)
 */
export async function insertSlotBooking(data: {
  name: string;
  email: string;
  phone: string;
  service: string;
  booking_date: string;
  booking_time: string;
  meeting_mode: string;
  notes?: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    // 1. Try slot_bookings table
    const response = await fetch(`${SUPABASE_URL}/rest/v1/slot_bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return { success: true };
    }

    // 2. Fallback to contact_submissions with structured message
    const formattedMessage = `[MEETING SLOT BOOKED]\n• Service: ${data.service}\n• Date: ${data.booking_date}\n• Time: ${data.booking_time}\n• Mode: ${data.meeting_mode}\n• Notes: ${data.notes || 'None'}`;
    return await insertContactSubmission({
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: formattedMessage,
    });
  } catch (err: any) {
    console.error('Supabase slot booking error:', err);
    return { success: false, error: err?.message || 'Network error' };
  }
}

/**
 * Retrieves all contact submissions (for admin viewing)
 */
export async function getContactSubmissions(): Promise<ContactSubmission[]> {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/contact_submissions?select=*&order=created_at.desc`, {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return [];
    }

    return await response.json();
  } catch {
    return [];
  }
}
