"use client";

import {
  ArrowRight, Code, Award, Target, Zap, Globe, Sparkles, TrendingUp,
  GitBranch, TestTube2, Search, Cpu, Database, Palette, Smartphone,
  Shield, CreditCard, Settings, LifeBuoy, Layers, BarChart3, Rocket,
} from 'lucide-react';
import { ServiceHero } from '@/components/sections/service-hero';
import { ServiceIntroSection } from '@/components/sections/service-intro-section';
import { ServiceOfferingsSection } from '@/components/sections/service-offerings-section';
import { ServiceProcessSection } from '@/components/sections/service-process-section';
import { ServiceWhyChooseSection } from '@/components/sections/service-why-choose-section';
import { ServiceFaqSection } from '@/components/sections/service-faq-section';
import { ServiceCtaSection } from '@/components/sections/service-cta-section';

import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';

const heroContent = {
  subtitle: "Your Online Identity Starts Here: Beautiful, Functional, and High-Performing Websites.",
  description: "Showcase your business online with a professional, user-friendly, and search engine-optimized website that captivates visitors and drives results.",
  image: {
    src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjb2RlfGVufDB8fHx8MTc0ODQwMzYwMHww&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Code on a screen",
  },
};

const introduction = "In today's digital marketplace, a robust online presence is a necessity. A well-crafted website serves as your brand's digital storefront, enhancing credibility and generating leads. We specialize in building websites that are not just visually stunning but also technically robust, secure, and scalable. Our custom solutions are powered by the latest technologies and user-centric design principles to transform your vision into a high-performing digital asset.";

const webServices = [
  {
    title: "Custom Website Development",
    description: "Bespoke websites tailored to your unique business requirements, branding, and user expectations for a standout online experience.",
    icon: <Palette className="w-8 h-8" />,
    keyFeatures: [
      "Fully unique, brand-aligned designs (Figma/Adobe XD).",
      "Scalable architecture (React.js, Node.js).",
      "Secure coding practices (OWASP compliance).",
      "Responsive and accessible (WCAG 2.1) layouts.",
    ],
  },
  {
    title: "E-commerce Website Development",
    description: "Build powerful online stores that streamline transactions, manage inventory, and foster customer loyalty.",
    icon: <CreditCard className="w-8 h-8" />,
    keyFeatures: [
      "Seamless payment gateway integrations (Stripe, PayPal).",
      "Advanced product catalog management.",
      "Secure checkout (PCI-DSS) & fraud detection.",
      "Real-time inventory tracking & ERP sync.",
    ],
  },
  {
    title: "CMS Development",
    description: "Empower your team to manage content effortlessly with robust Content Management Systems like WordPress, Shopify, or Drupal.",
    icon: <Database className="w-8 h-8" />,
    keyFeatures: [
      "Drag-and-drop content editing interfaces.",
      "Plugin/module integrations for extended functionality.",
      "Granular user roles and permissions.",
      "Custom themes and Headless CMS options.",
    ],
  },
  {
    title: "Responsive Web Design",
    description: "Create adaptive websites that deliver flawless experiences across all devices, crucial for user satisfaction and SEO.",
    icon: <Smartphone className="w-8 h-8" />,
    keyFeatures: [
      "Mobile-first design philosophy.",
      "Fluid layouts with relative units.",
      "Optimized images and media (WebP/AVIF).",
      "Cross-browser compatibility testing.",
    ],
  },
  {
    title: "Website Redesign & Revamp",
    description: "Breathe new life into your outdated website by modernizing its look, enhancing functionality, and elevating the user experience.",
    icon: <Sparkles className="w-8 h-8" />,
    keyFeatures: [
      "Contemporary UI/UX overhaul.",
      "Performance tuning to slash load times.",
      "Upgraded technology stack (e.g., Next.js).",
      "Enhanced SEO and content restructuring.",
    ],
  },
  {
    title: "Website Maintenance & Support",
    description: "Keep your site running at peak efficiency with our comprehensive maintenance packages, ensuring security and minimal downtime.",
    icon: <Settings className="w-8 h-8" />,
    keyFeatures: [
      "Automated daily/weekly backups.",
      "Continuous security monitoring (malware scans).",
      "Timely software and plugin updates.",
      "24/7 technical support with quick response SLAs.",
    ],
  },
];

const developmentProcess = [
  { number: "01", title: "Requirement Gathering", description: "We conduct in-depth discovery sessions via calls, surveys, or workshops to map your business goals, target personas, competitive analysis, and technical specs—delivering a project brief and timeline within 3-5 days.", icon: <Search /> },
  { number: "02", title: "Information Architecture & Wireframing", description: "Architect the site's structure (sitemaps, user flows) and create low-fidelity wireframes using tools like Balsamiq, iterating based on your feedback to ensure logical navigation and content hierarchy.", icon: <GitBranch /> },
  { number: "03", title: "UI/UX Design", description: "Translate concepts into high-fidelity mockups and prototypes (Figma/Sketch), focusing on branding, accessibility, and emotional resonance—complete with 2 rounds of revisions and usability testing with 5-10 target users.", icon: <Palette /> },
  { number: "04", title: "Development", description: "Parallel front-end (HTML/CSS/JS) and back-end (PHP/Python/Node) coding in sprints, with version control via Git and daily stand-ups to track progress and integrate features like databases (MySQL/MongoDB).", icon: <Code /> },
  { number: "05", title: "Testing", description: "Rigorous QA across functionalities (unit/integration tests with Jest/Selenium), compatibility (multi-device/browser), performance (load testing with JMeter), and security (penetration testing)—aiming for 99% bug-free deployment.", icon: <TestTube2 /> },
  { number: "06", title: "Deployment", description: "Secure go-live on your preferred hosting (AWS, Vercel, or shared), with staging environments for final approvals, DNS configuration, and SSL certificate installation for HTTPS.", icon: <Rocket className="w-5 h-5" /> },
  { number: "07", title: "Post-Launch Support", description: "30-day free warranty for tweaks, followed by optional retainers; includes training sessions on CMS usage and quarterly audits to adapt to new trends like PWAs or AI chatbots.", icon: <LifeBuoy /> },
];

const whyChooseUsData = [
  { icon: Cpu, title: "Expert Developers", description: "A dedicated team of 20+ full-stack developers and designers with 5-12 years of experience, certified in AWS, Google Cloud, and Adobe—specializing in niches like fintech, healthcare, and SaaS for compliant, innovative builds." },
  { icon: Zap, title: "Modern Technologies", description: "We leverage cutting-edge stacks (e.g., JAMstack for speed, Progressive Web Apps for offline access) and best practices like CI/CD pipelines, ensuring your site is future-ready for emerging tech like Web3 or voice search." },
  { icon: TrendingUp, title: "SEO-Friendly Websites", description: "Every project includes on-page optimization from day one—structured data, fast indexing, and mobile-first indexing—to help you rank higher organically, often seeing first-page results within 3-6 months." },
  { icon: Shield, title: "Security Focus", description: "We prioritize fortress-level protection with HTTPS, GDPR compliance, regular audits, and DDoS mitigation, reducing breach risks by 95% compared to standard sites." },
  { icon: Layers, title: "Scalable Solutions", description: "Designed for growth, our sites handle 10x traffic surges via auto-scaling cloud infrastructure, modular code, and easy plugin ecosystems—perfect for startups exploding into enterprises." },
  { icon: Award, title: "Client-Centric Delivery", description: "100% on-time delivery rate with transparent pricing (starting at $5,000 for basics), no hidden fees, and satisfaction guarantees—plus, free post-launch audits." },
  { icon: BarChart3, title: "Proven ROI", description: "Our sites deliver 3-5x returns through integrated analytics, conversion funnels, and A/B tools, backed by case studies showing 35% average revenue growth." },
];

const faqs = [
  { question: "What is the typical process for a website development project?", answer: "Our process starts with a discovery phase to understand your goals, followed by UI/UX design, development, testing, and launch. We work in sprints, providing regular updates and incorporating your feedback throughout the project." },
  { question: "How long does it take to build a website?", answer: "A standard marketing website typically takes 4-8 weeks, while a more complex web application or e-commerce site can take 3-6 months or longer. We provide a detailed timeline after the initial discovery phase." },
  { question: "Will my website be mobile-friendly?", answer: "Absolutely. We follow a mobile-first design approach, ensuring your website looks and functions perfectly on all devices, including desktops, tablets, and smartphones." },
  { question: "Do you provide ongoing maintenance and support after the website is launched?", answer: "Yes, we offer various maintenance packages to ensure your website remains secure, up-to-date, and optimized for performance. We can also provide ongoing support for content updates and feature enhancements." },
];

export default function WebsiteDevelopmentPage() {
  return (
    <div className="min-h-screen bg-white text-silver-900">
      <Header variant="light" />
      <main className="flex-grow">
        <ServiceHero
          badge="Website Development"
          title={heroContent.subtitle}
          description={heroContent.description}
          image={heroContent.image}
          icon={Globe}
          primaryCta={{ label: "Start Your Website Project", href: "/#contact" }}
          secondaryCta={{ label: "See Our Web Portfolio", href: "/#our-work" }}
          highlights={["SEO Optimized", "Mobile-first", "Fast & Secure"]}
        />
        <ServiceIntroSection
          eyebrow="Why It Matters"
          title="Digital Storefronts That Drive Real Results"
          content={introduction}
          highlights={[
            { icon: Globe, label: "Strong Online Presence", description: "Your website is the first impression for every potential customer." },
            { icon: TrendingUp, label: "Lead Generation", description: "Convert visitors into qualified leads with optimized user experiences." },
            { icon: Shield, label: "Secure & Scalable", description: "Built on robust architecture that's ready to grow with your business." },
          ]}
        />
        <ServiceOfferingsSection
          eyebrow="What We Offer"
          title="Our Website Development Services"
          description="A comprehensive suite of services to build, launch, and maintain a powerful digital presence."
          items={webServices}
        />
        <ServiceProcessSection
          eyebrow="How We Work"
          title="Our Development Process"
          description="We adhere to an agile, client-centric methodology that minimizes risks and maximizes value, typically spanning 4-12 weeks depending on complexity."
          steps={developmentProcess}
          variant="white"
        />
        <ServiceWhyChooseSection
          eyebrow="Why Brolytics"
          title="Why Choose Us for Website Development"
          description="In an industry flooded with templated solutions, we deliver custom excellence that scales with you."
          items={whyChooseUsData}
        />
        <ServiceFaqSection faqs={faqs} />
        <ServiceCtaSection
          title="Build a Powerful Online Presence"
          description="Ready to elevate your digital footprint? Book a complimentary 45-minute discovery call now, and we'll provide a tailored proposal plus a free site audit."
          ctaLabel="Request a Free Quote Today"
        />
      </main>
      <Footer />
    </div>
  );
}
