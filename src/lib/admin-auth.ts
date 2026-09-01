export const SESSION_COOKIE = 'admin-session';

/** Retrieves admin password from environment variable */
export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || 'BrolyticsAdminSecure2026!';
}

/** Retrieves session secret/token from environment variable */
export function getSessionToken(): string {
  return process.env.ADMIN_SESSION_SECRET || 'brolytics_cms_sec_token_9481729';
}

export function isValidAdminSession(sessionValue: string | undefined): boolean {
  const token = getSessionToken();
  return !!token && sessionValue === token;
}

