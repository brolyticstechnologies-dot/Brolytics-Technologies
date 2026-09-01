import { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { getSiteContent } from "@/lib/content";
import { PricingClient } from "./pricing-client";

export const metadata: Metadata = {
  title: "Pricing | Brolytics Technologies",
  description:
    "Complete, transparent pricing for Website Development, Mobile Apps, Custom Software, ERP, CRM, SaaS, AI Services, Backend, Cloud, SEO, and Digital Marketing. No hidden fees.",
};

export default async function PricingPage() {
  const content = await getSiteContent();

  return (
    <div className="flex flex-col min-h-screen bg-white text-silver-900">
      <Header variant="light" />
      <main className="flex-grow">
        <PricingClient pricingCategories={content.pricingCategories} />
      </main>
      <Footer content={content.footer} siteSettings={content.siteSettings} />
    </div>
  );
}
