import type { Metadata } from 'next';
import { ServiceJsonLd, BreadcrumbJsonLd, FaqJsonLd } from '@/components/seo/json-ld';

export const metadata: Metadata = {
  title: 'Mobile App Development Services | iOS & Android Apps',
  description:
    'End-to-end mobile application development services by Brolytics Technologies. Scalable cross-platform React Native & Flutter apps, native iOS (Swift) & Android (Kotlin) development.',
  alternates: {
    canonical: '/services/mobile-app-development',
  },
  openGraph: {
    title: 'Mobile App Development Services | Brolytics Technologies',
    description:
      'Engineered for performance, smooth 60fps UI, offline sync, and bank-grade security on App Store and Google Play.',
    url: 'https://brolyticstechnologies.com/services/mobile-app-development',
    type: 'website',
  },
};

const faqs = [
  {
    question: 'Should I build a Native or Cross-Platform mobile app?',
    answer:
      'Cross-platform frameworks like React Native or Flutter save up to 40% in cost and timeline while delivering native 60fps performance across iOS and Android. Native Swift/Kotlin is recommended for deep OS hardware integrations.',
  },
  {
    question: 'Do you manage App Store and Google Play Store submission?',
    answer:
      'Yes, our engineering team handles the complete app store lifecycle, including asset preparation, compliance guidelines, beta testing via TestFlight, and public release management.',
  },
  {
    question: 'How do you ensure mobile app security and offline capability?',
    answer:
      'We incorporate AES-256 local database encryption, biometric authentication, secure token lifecycles, and SQLite/WatermelonDB local caching for uninterrupted offline usage.',
  },
];

export default function MobileAppDevelopmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ServiceJsonLd
        name="Mobile App Development Services"
        description="Native and cross-platform iOS and Android mobile app engineering tailored for enterprise scale."
        serviceType="MobileAppDevelopment"
        url="/services/mobile-app-development"
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', item: '/' },
          { name: 'Services', item: '/#services' },
          { name: 'Mobile App Development', item: '/services/mobile-app-development' },
        ]}
      />
      <FaqJsonLd faqs={faqs} />
      {children}
    </>
  );
}
