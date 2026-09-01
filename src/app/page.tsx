
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/sections/hero';
import { AboutUs } from '@/components/sections/about-us';
import { ServicesOverview } from '@/components/sections/services-overview';
import { StatsSection } from '@/components/sections/stats-section';
import { OurWork } from '@/components/sections/our-work';
import { ContactForm } from '@/components/sections/contact-form';
import { OurClients } from '@/components/sections/our-clients';
import { getSiteContent } from '@/lib/content';

export default async function HomePage() {
  const content = await getSiteContent();

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-grow">
        <Hero content={content.hero} services={content.services} siteSettings={content.siteSettings} />
        <ServicesOverview services={content.services} overview={content.servicesOverview} />
        <StatsSection content={content.stats} />
        <AboutUs content={content.aboutUs} coreValues={content.coreValues} />
        <OurWork content={content.ourWork} />
        <OurClients content={content.ourClients} />
        <ContactForm content={content.contact} />
      </main>
      <Footer content={content.footer} siteSettings={content.siteSettings} />
    </div>
  );
}
