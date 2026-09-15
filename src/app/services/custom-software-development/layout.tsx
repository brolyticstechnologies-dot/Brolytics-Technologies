import type { Metadata } from 'next';
import { ServiceJsonLd, BreadcrumbJsonLd, FaqJsonLd } from '@/components/seo/json-ld';

export const metadata: Metadata = {
  title: 'Custom Software Development Services | Enterprise ERP & SaaS',
  description:
    'Tailored enterprise software development by Brolytics Technologies. We engineer robust custom ERPs, CRMs, multi-tenant SaaS platforms, and distributed cloud microservices.',
  alternates: {
    canonical: '/services/custom-software-development',
  },
  openGraph: {
    title: 'Custom Software Development Services | Brolytics Technologies',
    description:
      'Turn manual operations into automated software systems. Scalable architectures built on Node.js, Go, Python, and PostgreSQL.',
    url: 'https://brolyticstechnologies.com/services/custom-software-development',
    type: 'website',
  },
};

const faqs = [
  {
    question: 'Why choose custom software development over commercial off-the-shelf software?',
    answer:
      'Custom software eliminates recurring licensing costs, integrates directly with your existing internal workflows, guarantees total data ownership, and offers infinite scalability tailored to your business.',
  },
  {
    question: 'How do you handle software scalability and database architecture?',
    answer:
      'We design multi-tier microservices or modular monoliths utilizing PostgreSQL/MySQL with read replicas, Redis distributed caching, Kafka/RabbitMQ message queues, and Kubernetes orchestration.',
  },
  {
    question: 'What is the pricing model for custom enterprise software?',
    answer:
      'We offer both milestone-based fixed price contracts for well-defined scopes and dedicated sprint-based squad models for evolving products with weekly roadmap reviews.',
  },
];

export default function CustomSoftwareDevelopmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ServiceJsonLd
        name="Custom Software Development Services"
        description="Scalable enterprise software, SaaS products, ERP systems, and cloud-native backend engineering."
        serviceType="SoftwareDevelopment"
        url="/services/custom-software-development"
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', item: '/' },
          { name: 'Services', item: '/#services' },
          { name: 'Custom Software Development', item: '/services/custom-software-development' },
        ]}
      />
      <FaqJsonLd faqs={faqs} />
      {children}
    </>
  );
}
