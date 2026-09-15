import type { Metadata } from 'next';
import { ServiceJsonLd, BreadcrumbJsonLd, FaqJsonLd } from '@/components/seo/json-ld';

export const metadata: Metadata = {
  title: 'SEO & Digital Marketing Services | Technical SEO & Organic Growth',
  description:
    'Data-driven organic search marketing by Brolytics Technologies: Technical SEO audits, Core Web Vitals optimization, programmatic content scaling, high-intent link building, and high-ROI PPC campaigns.',
  alternates: {
    canonical: '/services/seo-and-digital-marketing',
  },
  openGraph: {
    title: 'SEO & Digital Marketing Services | Brolytics Technologies',
    description:
      'Rank #1 on Google, capture AI Overviews (AEO/GEO), and scale inbound pipeline with engineering-grade SEO strategies.',
    url: 'https://brolyticstechnologies.com/services/seo-and-digital-marketing',
    type: 'website',
  },
};

const faqs = [
  {
    question: 'How long does it take to see real organic SEO ranking results?',
    answer:
      'Technical SEO fixes and page speed improvements often yield indexation and ranking boosts within 30-45 days. Substantial organic traffic growth and competitive keyword dominance typically mature within 3-6 months.',
  },
  {
    question: 'What is Technical SEO and why is it critical?',
    answer:
      'Technical SEO ensures search engines can seamlessly crawl, render, and index your website. It includes resolving crawl errors, perfecting canonicalization, optimizing Core Web Vitals, and implementing JSON-LD schema markup.',
  },
  {
    question: 'How do you optimize for Google AI Overviews and Answer Engines (AEO)?',
    answer:
      'We structure content with concise, authoritative definition summaries, structured data FAQ schemas, and semantic entity hierarchies that AI systems (Perplexity, ChatGPT, Gemini) prioritize for citation.',
  },
];

export default function SeoAndDigitalMarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ServiceJsonLd
        name="SEO & Digital Marketing Services"
        description="Comprehensive technical SEO, Generative Engine Optimization (GEO), Answer Engine Optimization (AEO), and digital performance marketing."
        serviceType="SEOServices"
        url="/services/seo-and-digital-marketing"
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', item: '/' },
          { name: 'Services', item: '/#services' },
          { name: 'SEO & Digital Marketing', item: '/services/seo-and-digital-marketing' },
        ]}
      />
      <FaqJsonLd faqs={faqs} />
      {children}
    </>
  );
}
