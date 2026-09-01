import { Metadata } from "next";
import { getSiteContent } from "@/lib/content";
import { AboutUsClient } from "./about-us-client";

export const metadata: Metadata = {
  title: "About Us | Brolytics Technologies",
  description:
    "Learn more about Brolytics Technologies — our team, mission, values, and journey transforming businesses into digital powerhouses.",
};

export default async function AboutUsPage() {
  const content = await getSiteContent();

  return (
    <AboutUsClient
      content={content.aboutPage}
      footerContent={content.footer}
      siteSettings={content.siteSettings}
      ourWorkContent={content.ourWork}
      ourClientsContent={content.ourClients}
      strategicPillars={content.strategicPillars}
      executionDifferentiators={content.executionDifferentiators}
    />
  );
}
