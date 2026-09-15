import React from 'react';

const BASE_URL = 'https://brolyticstechnologies.com';

/**
 * Organization and WebSite Structured Data Schema (JSON-LD)
 * Essential for Google Knowledge Graph, Generative Engine Optimization (GEO)
 * and Answer Engine Optimization (AEO).
 */
export function RootJsonLd() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization`,
    name: 'Brolytics Technologies',
    alternateName: ['Brolytics', 'Brolytics Tech'],
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/newwblt.png`,
      caption: 'Brolytics Technologies Logo',
    },
    description:
      'Premier software development agency specializing in high-performance web development, mobile apps (iOS/Android), custom enterprise ERP/SaaS software, and generative AI agent engineering.',
    foundingDate: '2023',
    foundingLocation: {
      '@type': 'Place',
      name: 'India',
    },
    areaServed: [
      { '@type': 'Country', name: 'India' },
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'Country', name: 'United Arab Emirates' },
      { '@type': 'Country', name: 'Australia' },
      { '@type': 'Country', name: 'Canada' },
    ],
    knowsAbout: [
      'Custom Software Development',
      'Next.js & React Web Applications',
      'Mobile Application Development (React Native, Flutter, Swift, Kotlin)',
      'Artificial Intelligence & Large Language Model (LLM) Integration',
      'Enterprise ERP & CRM Architecture',
      'Cloud Architecture & DevOps (AWS, GCP, Azure)',
      'UI/UX Design and Product Prototyping',
      'Search Engine Optimization (SEO) & Performance Engineering',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer & Technical Inquiries',
      telephone: '+91-9569766904',
      email: 'contact@brolyticstechnologies.com',
      availableLanguage: ['English', 'Hindi'],
    },
    sameAs: [
      'https://www.linkedin.com/company/brolytics-technologies',
      'https://github.com/brolyticstechnologies',
      'https://twitter.com/brolyticstech',
      'https://www.instagram.com/brolyticstechnologies',
    ],
  };

  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    url: BASE_URL,
    name: 'Brolytics Technologies',
    description:
      'Official website of Brolytics Technologies — Custom Software, Mobile Apps, Modern Websites & AI Solutions.',
    publisher: {
      '@id': `${BASE_URL}/#organization`,
    },
    inLanguage: 'en-US',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
    </>
  );
}

/**
 * Service Structured Data Schema (JSON-LD)
 */
export function ServiceJsonLd({
  name,
  description,
  serviceType,
  url,
  providerName = 'Brolytics Technologies',
}: {
  name: string;
  description: string;
  serviceType: string;
  url: string;
  providerName?: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    serviceType,
    url: `${BASE_URL}${url}`,
    provider: {
      '@type': 'Organization',
      name: providerName,
      url: BASE_URL,
    },
    termsOfService: `${BASE_URL}/terms`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * FAQPage Structured Data Schema (JSON-LD)
 * Powers Google Rich Results FAQ snippets and AI Overviews.
 */
export function FaqJsonLd({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * BreadcrumbList Structured Data Schema (JSON-LD)
 */
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; item: string }[];
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((crumb, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: crumb.name,
      item: `${BASE_URL}${crumb.item}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
