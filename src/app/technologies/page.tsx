import { Metadata } from 'next';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { getSiteContent } from '@/lib/content';
import { TechnologiesClient } from './technologies-client';

export const metadata: Metadata = {
  title: 'Technology Stack & Engineering Arsenal | Brolytics Technologies',
  description:
    'Explore the 100+ technologies, frameworks, languages, databases, and cloud infrastructure used by Brolytics Technologies to engineer high-performance software, mobile apps, websites, and AI systems.',
  keywords: [
    'Technology Stack',
    'Web Development Frameworks',
    'Mobile App Technologies',
    'Next.js Development Company',
    'React Native Development',
    'Flutter App Developers',
    'Python AI Engineering',
    'Cloud DevOps Infrastructure',
    'Enterprise Software Architecture',
    'Brolytics Technologies',
  ],
  openGraph: {
    title: 'Technology Stack & Engineering Arsenal | Brolytics Technologies',
    description:
      'Explore the 100+ technologies, frameworks, languages, databases, and cloud infrastructure used by Brolytics Technologies.',
    type: 'website',
  },
};

export default async function TechnologiesPage() {
  const content = await getSiteContent();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    'headline': 'Brolytics Technologies — Technology Matrix & Engineering Stack',
    'description': 'Comprehensive technology ecosystem covering Web, Mobile, Cloud, AI, and DevOps.',
    'publisher': {
      '@type': 'Organization',
      'name': 'Brolytics Technologies',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://brolytics.com/newwblt.png',
      },
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
        <TechnologiesClient
          technologiesPage={content.technologiesPage}
          siteSettings={content.siteSettings}
        />
      </main>
      <Footer content={content.footer} siteSettings={content.siteSettings} />
    </div>
  );
}
