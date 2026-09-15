import type { Metadata } from 'next';
import { ServiceJsonLd, BreadcrumbJsonLd, FaqJsonLd } from '@/components/seo/json-ld';

export const metadata: Metadata = {
  title: 'UI/UX & Graphic Design Services | Product & Brand Identity',
  description:
    'Award-winning digital product design by Brolytics Technologies: interactive Figma prototypes, design systems, modern web & mobile UI/UX, and comprehensive brand identity packages.',
  alternates: {
    canonical: '/services/graphics-design',
  },
  openGraph: {
    title: 'UI/UX & Graphic Design Services | Brolytics Technologies',
    description:
      'Human-centric interface design and cohesive brand identities that elevate conversions and user delight.',
    url: 'https://brolyticstechnologies.com/services/graphics-design',
    type: 'website',
  },
};

const faqs = [
  {
    question: 'What deliverables do you provide for UI/UX design projects?',
    answer:
      'We deliver complete Figma source files, atomic component design systems, clickable high-fidelity interactive prototypes, and exhaustive developer handoff documentation with design tokens.',
  },
  {
    question: 'How do you approach user experience (UX) research?',
    answer:
      'Our UX process includes user persona development, competitive benchmarking, user journey mapping, and usability testing to validate intuitive user flow before code is written.',
  },
  {
    question: 'Do you create responsive design systems that scale?',
    answer:
      'Yes, we create unified design systems with modular typography, harmonious color tokens, grid structures, and reusable component libraries compatible with Tailwind CSS and React.',
  },
];

export default function GraphicsDesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ServiceJsonLd
        name="UI/UX & Graphic Design Services"
        description="Premium UI/UX design, interactive prototyping, atomic design systems, and digital brand identity engineering."
        serviceType="DesignServices"
        url="/services/graphics-design"
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', item: '/' },
          { name: 'Services', item: '/#services' },
          { name: 'Graphics & UI/UX Design', item: '/services/graphics-design' },
        ]}
      />
      <FaqJsonLd faqs={faqs} />
      {children}
    </>
  );
}
