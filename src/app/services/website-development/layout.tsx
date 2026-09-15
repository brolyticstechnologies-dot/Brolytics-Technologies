import type { Metadata } from 'next';
import { ServiceJsonLd, BreadcrumbJsonLd, FaqJsonLd } from '@/components/seo/json-ld';

export const metadata: Metadata = {
  title: 'Website Development Services | High-Performance Web Apps',
  description:
    'Custom web development services by Brolytics Technologies: responsive corporate portals, e-commerce stores, custom SaaS platforms, and blazing-fast Next.js websites.',
  alternates: {
    canonical: '/services/website-development',
  },
  openGraph: {
    title: 'Website Development Services | Brolytics Technologies',
    description:
      'Fast, modern, SEO-optimized web development services for global businesses. Built with React, Next.js, and TypeScript.',
    url: 'https://brolyticstechnologies.com/services/website-development',
    type: 'website',
  },
};

const faqs = [
  {
    question: 'What is the typical process for a website development project?',
    answer:
      'Our process begins with comprehensive discovery, followed by UI/UX wireframing, frontend and backend sprint development, rigorous QA testing, and secure cloud deployment.',
  },
  {
    question: 'How long does it take to build a custom website?',
    answer:
      'A standard marketing site requires 4-8 weeks, while full-scale custom web applications, SaaS dashboards, or complex e-commerce platforms take 2-4 months.',
  },
  {
    question: 'Will my website be mobile-friendly and optimized for SEO?',
    answer:
      'Yes, all websites engineered by Brolytics follow a mobile-first philosophy, passing Core Web Vitals with semantic HTML, Schema markup, and sub-second load times.',
  },
];

export default function WebsiteDevelopmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ServiceJsonLd
        name="Website Development Services"
        description="Bespoke website design and full-stack development services engineered for speed, SEO, and conversion."
        serviceType="WebDevelopment"
        url="/services/website-development"
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', item: '/' },
          { name: 'Services', item: '/#services' },
          { name: 'Website Development', item: '/services/website-development' },
        ]}
      />
      <FaqJsonLd faqs={faqs} />
      {children}
    </>
  );
}
