import { cookies } from 'next/headers';
import { getSiteContent } from '@/lib/content';
import type { SiteContent } from '@/lib/content-types';
import { isValidAdminSession, SESSION_COOKIE } from '@/lib/admin-auth';

export async function checkAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  return isValidAdminSession(cookieStore.get(SESSION_COOKIE)?.value);
}

export async function getAdminContent(): Promise<SiteContent | null> {
  const authed = await checkAdminSession();
  if (!authed) return null;
  return getSiteContent();
}
