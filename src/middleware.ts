import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { isValidAdminSession, SESSION_COOKIE } from '@/lib/admin-auth';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith('/admin')) return NextResponse.next();

  const isServerAction =
    request.method === 'POST' &&
    (request.headers.has('next-action') || request.headers.has('Next-Action'));

  const isLoginPage = pathname === '/admin/login';
  const session = request.cookies.get(SESSION_COOKIE)?.value;
  const isAuthed = isValidAdminSession(session);

  // Let server actions through; auth is enforced inside the action itself.
  if (isServerAction) {
    return NextResponse.next();
  }

  if (isLoginPage && isAuthed) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  if (!isLoginPage && !isAuthed) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
