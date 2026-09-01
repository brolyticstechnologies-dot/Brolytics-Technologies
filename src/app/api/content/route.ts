import { NextResponse } from 'next/server';
import { getSiteContent } from '@/lib/content';

export async function GET() {
  try {
    const content = await getSiteContent();
    return NextResponse.json(content);
  } catch (error) {
    console.error('Failed to load content:', error);
    return NextResponse.json({ error: 'Failed to load content' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
