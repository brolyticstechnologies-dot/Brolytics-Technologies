import { Metadata } from 'next';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { getSiteContent } from '@/lib/content';
import { TermsClient } from './terms-client';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Brolytics Technologies',
  description:
    'Review the commercial, technical, intellectual property, payment, and engagement terms of Brolytics Technologies for software, web, and mobile app development.',
  openGraph: {
    title: 'Terms & Conditions | Brolytics Technologies',
    description:
      'Commercial terms, IP ownership, milestone payments, and delivery policies of Brolytics Technologies.',
    type: 'website',
  },
};

export default async function TermsPage() {
  const content = await getSiteContent();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Terms & Conditions — Brolytics Technologies',
    description: 'Commercial terms and service agreements for Brolytics Technologies.',
    publisher: {
      '@type': 'Organization',
      name: 'Brolytics Technologies',
      url: 'https://brolytics.com',
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-silver-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header variant="light" />
      <main className="flex-grow">
        <TermsClient
          termsPage={content.termsPage}
          siteSettings={content.siteSettings}
        />
      </main>
      <Footer content={content.footer} siteSettings={content.siteSettings} />
    </div>
  );
}
