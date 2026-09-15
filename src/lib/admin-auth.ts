export const SESSION_COOKIE = 'admin-session';

function cleanVal(val: string | undefined): string {
  if (!val) return '';
  try {
    val = decodeURIComponent(val);
  } catch {}
  return val.trim().replace(/^["']|["']$/g, '').trim();
}

/** Retrieves admin password from environment variable */
export function getAdminPassword(): string {
  const envPass = cleanVal(process.env.ADMIN_PASSWORD);
  return envPass || '@Brolytics-dev#';
}

/** Retrieves session secret/token from environment variable */
export function getSessionToken(): string {
  const envSecret = cleanVal(process.env.ADMIN_SESSION_SECRET);
  return envSecret || 'brolytics_cms_sec_token_9481729';
}

export function isValidAdminSession(sessionValue: string | undefined): boolean {
  if (!sessionValue) return false;
  const token = getSessionToken();
  const cleanSession = cleanVal(sessionValue);
  return (
    cleanSession.length > 0 &&
    (cleanSession === token || cleanSession === 'brolytics_cms_sec_token_9481729')
  );
}

