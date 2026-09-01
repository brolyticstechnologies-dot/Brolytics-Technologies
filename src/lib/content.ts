import { promises as fs } from 'fs';
import path from 'path';
import type { SiteContent, ContentSection } from './content-types';

const CONTENT_PATH = path.join(process.cwd(), 'data', 'site-content.json');

export async function getSiteContent(): Promise<SiteContent> {
  const raw = await fs.readFile(CONTENT_PATH, 'utf-8');
  return JSON.parse(raw) as SiteContent;
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
    // Check if the current file exists
    const currentContent = await fs.readFile(CONTENT_PATH, 'utf-8');
    if (!currentContent) return;

    await fs.mkdir(BACKUPS_DIR, { recursive: true });
    
    // Create timestamp string e.g. 2026-09-01T10-38-00-000Z
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFilePath = path.join(BACKUPS_DIR, `site-content.backup-${timestamp}.json`);
    
    await fs.writeFile(backupFilePath, currentContent, 'utf-8');

    // Keep only the most recent backups
    const files = await fs.readdir(BACKUPS_DIR);
    const backupFiles = files
      .filter((file) => file.startsWith('site-content.backup-') && file.endsWith('.json'))
      .sort(); // ascending sort by ISO timestamp in filename

    if (backupFiles.length > MAX_BACKUPS) {
      const filesToDelete = backupFiles.slice(0, backupFiles.length - MAX_BACKUPS);
      for (const file of filesToDelete) {
        await fs.unlink(path.join(BACKUPS_DIR, file)).catch(() => {});
      }
    }
  } catch {
    // If no existing file to backup or read error, proceed gracefully
  }
}

export async function updateSiteContent(content: SiteContent): Promise<void> {
  await fs.mkdir(path.dirname(CONTENT_PATH), { recursive: true });
  // Automatically create a safety backup before overwriting
  await createBackupBeforeSave();
  await fs.writeFile(CONTENT_PATH, JSON.stringify(content, null, 2), 'utf-8');
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
