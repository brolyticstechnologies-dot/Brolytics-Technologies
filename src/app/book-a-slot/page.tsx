import { Metadata } from 'next';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { getSiteContent } from '@/lib/content';
import { BookSlotClient } from './book-slot-client';

export const metadata: Metadata = {
  title: 'Book a Strategy Call | Brolytics Technologies',
  description:
    'Schedule a free 30-minute consultation call with Brolytics Technologies engineering team. Discuss your website, mobile app, software, AI, or digital growth project.',
  openGraph: {
    title: 'Book a Strategy Call | Brolytics Technologies',
    description:
      'Schedule a free 30-minute consultation call with Brolytics Technologies engineering team.',
    type: 'website',
  },
};

export default async function BookSlotPage() {
  const content = await getSiteContent();

  return (
    <div className="flex flex-col min-h-screen bg-white text-silver-900">
      <Header variant="light" />
      <main className="flex-grow">
        <BookSlotClient siteSettings={content.siteSettings} />
      </main>
      <Footer content={content.footer} siteSettings={content.siteSettings} />
    </div>
  );
}
