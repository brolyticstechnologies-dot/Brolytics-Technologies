"use server";

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getSiteContent, updateSiteContent, updateSectionContent } from '@/lib/content';
import type { SiteContent, ContentSection } from '@/lib/content-types';
import { SESSION_COOKIE, getSessionToken, getAdminPassword } from '@/lib/admin-auth';
import { checkAdminSession } from '@/lib/admin-session';

export type AdminActionState = {
  success: boolean;
  message: string;
};

export async function loginAdmin(
  _prev: AdminActionState,
  formData: FormData
): Promise<AdminActionState> {
  const input = formData.get('password') as string;
  const adminPassword = getAdminPassword();

  if (!input || input !== adminPassword) {
    return { success: false, message: 'Invalid password. Please try again.' };
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, getSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });

  redirect('/admin');
}

export async function logoutAdmin(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect('/admin/login');
}

export async function updateContentSection<K extends ContentSection>(
  section: K,
  data: SiteContent[K]
): Promise<AdminActionState> {
  const authed = await checkAdminSession();
  if (!authed) {
    return { success: false, message: 'Unauthorized. Please log in again.' };
  }

  try {
    await updateSectionContent(section, data);
    return { success: true, message: `${String(section)} updated successfully!` };
  } catch (error) {
    console.error('Failed to update content:', error);
    return { success: false, message: 'Failed to save changes. Please try again.' };
  }
}

export async function updateContentSections(
  sections: Partial<SiteContent>
): Promise<AdminActionState> {
  const authed = await checkAdminSession();
  if (!authed) {
    return { success: false, message: 'Unauthorized. Please log in again.' };
  }

  try {
    const content = await getSiteContent();
    for (const [section, data] of Object.entries(sections) as [ContentSection, SiteContent[ContentSection]][]) {
      if (data !== undefined) {
        (content as any)[section] = data;
      }
    }
    await updateSiteContent(content);
    const names = Object.keys(sections).join(', ');
    return { success: true, message: `${names} updated successfully!` };
  } catch (error) {
    console.error('Failed to update content:', error);
    return { success: false, message: 'Failed to save changes. Please try again.' };
  }
}

export async function updateFullContent(
  content: SiteContent
): Promise<AdminActionState> {
  const authed = await checkAdminSession();
  if (!authed) {
    return { success: false, message: 'Unauthorized. Please log in again.' };
  }

  try {
    await updateSiteContent(content);
    return { success: true, message: 'All content saved successfully!' };
  } catch (error) {
    console.error('Failed to update content:', error);
    return { success: false, message: 'Failed to save changes. Please try again.' };
  }
}
