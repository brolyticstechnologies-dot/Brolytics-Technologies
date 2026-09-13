import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { isValidAdminSession, SESSION_COOKIE } from '@/lib/admin-auth';

const MAX_SIZE = 10 * 1024 * 1024; // 10MB

const ALLOWED_MIME_PREFIXES = ['image/'];
const ALLOWED_TYPES = new Set([
  'image/jpeg',
  'image/jpg',
  'image/pjpeg',
  'image/png',
  'image/x-png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
  'image/svg',
  'image/x-icon',
  'image/vnd.microsoft.icon',
  'image/bmp',
  'image/tiff',
  'application/octet-stream', // Fallback for Windows without registered MIME
]);

const ALLOWED_EXTS = new Set([
  'jpg',
  'jpeg',
  'png',
  'webp',
  'gif',
  'svg',
  'ico',
  'bmp',
  'tiff',
]);

export async function POST(request: NextRequest) {
  // Check cookie via request.cookies with safe fallback to cookies()
  let session = request.cookies.get(SESSION_COOKIE)?.value;
  if (!session) {
    try {
      const cookieStore = await cookies();
      session = cookieStore.get(SESSION_COOKIE)?.value;
    } catch {
      // Ignore if cookies() is called outside request store
    }
  }

  if (!isValidAdminSession(session)) {
    return NextResponse.json(
      { error: 'Unauthorized. Please log into the admin dashboard.' },
      { status: 401 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: 'No file provided. Please select an image file.' },
        { status: 400 }
      );
    }

    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    const isMimeAllowed =
      ALLOWED_TYPES.has(file.type) ||
      ALLOWED_MIME_PREFIXES.some((prefix) => file.type?.startsWith(prefix));
    const isExtAllowed = ALLOWED_EXTS.has(ext);

    if (!isMimeAllowed && !isExtAllowed) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload a JPG, PNG, WebP, GIF, or SVG image.' },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: 'File too large. Maximum allowed size is 10MB.' },
        { status: 400 }
      );
    }

    const safeExt = ALLOWED_EXTS.has(ext) ? ext : 'jpg';
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${safeExt}`;

    const buffer = Buffer.from(await file.arrayBuffer());

    // Try saving locally to public/uploads
    try {
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
      await mkdir(uploadsDir, { recursive: true });
      await writeFile(path.join(uploadsDir, filename), buffer);

      return NextResponse.json({
        url: `/uploads/${filename}`,
        success: true,
      });
    } catch (fsErr) {
      console.warn('Local disk write failed, using Base64 data URL fallback:', fsErr);
      // Fallback for read-only serverless filesystems (e.g. Vercel)
      const base64 = buffer.toString('base64');
      const mime = file.type || `image/${safeExt}`;
      const dataUrl = `data:${mime};base64,${base64}`;

      return NextResponse.json({
        url: dataUrl,
        success: true,
        fallback: true,
      });
    }
  } catch (error: any) {
    console.error('Upload failed with error:', error);
    return NextResponse.json(
      { error: error?.message || 'Upload failed. Please try again.' },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';
