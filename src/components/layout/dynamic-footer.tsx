import { getSiteContent } from '@/lib/content';
import { Footer } from '@/components/layout/footer';

export async function DynamicFooter() {
  const content = await getSiteContent();
  return <Footer content={content.footer} siteSettings={content.siteSettings} />;
}
