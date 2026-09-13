import { promises as fs } from 'fs';
import path from 'path';
import type { SiteContent, ContentSection } from './content-types';

const CONTENT_PATH = path.join(process.cwd(), 'data', 'site-content.json');
const TMP_CONTENT_PATH = path.join('/tmp', 'site-content.json');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://txqkpjedvldlbgzynaqk.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_tS-UgzxJcrJ7wWAQNwwrqw_G318tXnK';

// Runtime in-memory cache to preserve state within the same process
let runtimeCache: SiteContent | null = null;

/**
 * Attempts to load content from Supabase site_content table (if created)
 */
async function loadFromSupabase(): Promise<SiteContent | null> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/site_content?id=eq.current&select=data`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      cache: 'no-store',
    });
    if (res.ok) {
      const rows = await res.json();
      if (Array.isArray(rows) && rows.length > 0 && rows[0]?.data) {
        return rows[0].data as SiteContent;
      }
    }
  } catch {}
  return null;
}

/**
 * Attempts to save content to Supabase site_content table (if created)
 */
async function saveToSupabase(content: SiteContent): Promise<boolean> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/site_content`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Prefer: 'resolution=merge-duplicates',
      },
      body: JSON.stringify({
        id: 'current',
        data: content,
        updated_at: new Date().toISOString(),
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function getSiteContent(): Promise<SiteContent> {
  // 1. Always load from Supabase first (cloud source of truth)
  const supabaseContent = await loadFromSupabase();
  if (supabaseContent) {
    runtimeCache = supabaseContent;
    return supabaseContent;
  }

  // 2. Fallback to in-memory runtime cache if Supabase is offline
  if (runtimeCache) {
    return runtimeCache;
  }

  // 3. Try reading from /tmp/site-content.json (if written previously on serverless)
  try {
    const tmpData = await fs.readFile(TMP_CONTENT_PATH, 'utf-8');
    if (tmpData) {
      const parsed = JSON.parse(tmpData) as SiteContent;
      runtimeCache = parsed;
      return parsed;
    }
  } catch {}

  // 4. Read from bundled data/site-content.json
  try {
    const raw = await fs.readFile(CONTENT_PATH, 'utf-8');
    const parsed = JSON.parse(raw) as SiteContent;
    runtimeCache = parsed;
    return parsed;
  } catch (err) {
    console.error('Failed to read content from disk:', err);
    throw err;
  }
}

export async function getSectionContent<K extends ContentSection>(
  section: K
): Promise<SiteContent[K]> {
  const content = await getSiteContent();
  return content[section];
}

const BACKUPS_DIR = path.join(process.cwd(), 'data', 'backups');
const MAX_BACKUPS = 30;

async function createBackupBeforeSave(): Promise<void> {
  try {
    const currentContent = await fs.readFile(CONTENT_PATH, 'utf-8');
    if (!currentContent) return;

    await fs.mkdir(BACKUPS_DIR, { recursive: true });
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFilePath = path.join(BACKUPS_DIR, `site-content.backup-${timestamp}.json`);
    await fs.writeFile(backupFilePath, currentContent, 'utf-8');

    const files = await fs.readdir(BACKUPS_DIR);
    const backupFiles = files
      .filter((file) => file.startsWith('site-content.backup-') && file.endsWith('.json'))
      .sort();

    if (backupFiles.length > MAX_BACKUPS) {
      const filesToDelete = backupFiles.slice(0, backupFiles.length - MAX_BACKUPS);
      for (const file of filesToDelete) {
        await fs.unlink(path.join(BACKUPS_DIR, file)).catch(() => {});
      }
    }
  } catch {}
}

export async function updateSiteContent(content: SiteContent): Promise<void> {
  // Update memory cache immediately
  runtimeCache = content;

  // Try saving to Supabase (best for serverless cloud persistence)
  await saveToSupabase(content);

  // Try writing to local data/site-content.json (for local dev & persistent servers)
  let diskWriteSuccess = false;
  try {
    await fs.mkdir(path.dirname(CONTENT_PATH), { recursive: true });
    await createBackupBeforeSave();
    await fs.writeFile(CONTENT_PATH, JSON.stringify(content, null, 2), 'utf-8');
    diskWriteSuccess = true;
  } catch (fsErr) {
    console.warn('Local disk write failed (expected on read-only serverless):', fsErr);
  }

  // If local disk write failed or on serverless, write to /tmp
  if (!diskWriteSuccess) {
    try {
      await fs.writeFile(TMP_CONTENT_PATH, JSON.stringify(content, null, 2), 'utf-8');
    } catch (tmpErr) {
      console.warn('Writing to /tmp fallback also encountered error:', tmpErr);
    }
  }
}

export async function updateSectionContent<K extends ContentSection>(
  section: K,
  data: SiteContent[K]
): Promise<SiteContent> {
  const content = await getSiteContent();
  content[section] = data;
  await updateSiteContent(content);
  return content;
}
