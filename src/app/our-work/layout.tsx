import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/seo/json-ld';

export const metadata: Metadata = {
  title: 'Our Work & Case Studies | Brolytics Technologies Portfolio',
  description:
    'Explore featured case studies and software engineering projects delivered by Brolytics Technologies across enterprise web applications, mobile apps, SaaS platforms, and AI systems.',
  alternates: {
    canonical: '/our-work',
  },
  openGraph: {
    title: 'Our Work & Case Studies | Brolytics Technologies',
    description:
      'Over 50+ software and digital products delivered globally with 98% client success rate. View our case studies.',
    url: 'https://brolyticstechnologies.com/our-work',
    type: 'website',
  },
};

export default function OurWorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', item: '/' },
          { name: 'Our Work', item: '/our-work' },
        ]}
      />
      {children}
    </>
  );
}
