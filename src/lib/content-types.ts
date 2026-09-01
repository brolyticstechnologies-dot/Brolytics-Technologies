export interface SectionHeader {
  badge: string;
  title: string;
  titleAccent?: string;
  subtitle: string;
}

export interface HeroSlide {
  word: string;
  src: string;
  alt: string;
}

export interface ServiceItem {
  slug: string;
  title: string;
  description: string;
  icon: string;
  tags?: string[];
}

export interface StatItem {
  end: number;
  label: string;
  hint: string;
  icon: string;
  plus?: boolean;
}

export interface ProofPoint {
  icon: string;
  value: string;
  label: string;
}

export interface CoreValueItem {
  icon: string;
  title: string;
  description: string;
}

export interface ProjectImpact {
  metric: string;
  label: string;
  subtext?: string;
}

export interface ProjectTestimonial {
  quote: string;
  name: string;
  role: string;
}

export interface ProjectItem {
  id?: string;
  imageUrl: string;
  aiHint?: string;
  category: string;
  year?: string;
  title: string;
  shortDescription?: string;
  detailedDescription?: string;
  description?: string;
  challenge?: string;
  solution?: string;
  impact?: ProjectImpact;
  results?: string;
  technologies: string[];
  duration: string;
  href?: string;
  testimonial?: ProjectTestimonial;
}

export interface PricingFeature {
  text: string;
  included: boolean;
}

export interface PricingBilling {
  amount: string;
  label: string;
  sublabel?: string;
}

export interface PricingTier {
  id: string;
  name: string;
  tagline: string;
  isPopular: boolean;
  cta: string;
  ctaHref: string;
  pricing: {
    oneTime: PricingBilling;
    monthly: PricingBilling;
  };
  features: PricingFeature[];
}

export interface PricingRow {
  item: string;
  price: string;
  note?: string;
}

export interface PricingTable {
  heading?: string;
  rows: PricingRow[];
  note?: string;
}

export interface PricingList {
  heading?: string;
  items: string[];
}

export interface PricingSection {
  id: string;
  title: string;
  subtitle?: string;
  tables: PricingTable[];
  lists?: PricingList[];
}

export interface PricingCategory {
  id: string;
  icon: string;
  label: string;
  sections: PricingSection[];
}

export interface AchievementStat {
  icon: string;
  value: string;
  label: string;
  description: string;
}

export interface ClientItem {
  name: string;
  logo: string;
}

export interface ContactDetail {
  icon: string;
  text: string;
  href: string;
}

export interface SocialLink {
  icon: string;
  href: string;
  label: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  linkedin: string;
  tagline?: string;
  email?: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export interface JourneyStep {
  icon: string;
  title: string;
  description: string;
  active: boolean;
}

export interface ExpertiseItem {
  icon: string;
  title: string;
  description: string;
}

export interface SiteContent {
  hero: {
    badge: string;
    titleLine1: string;
    titleLine3: string;
    description: string;
    slides: HeroSlide[];
    highlights: string[];
    proofPoints: ProofPoint[];
    clientCount: string;
    rating: string;
    satisfaction: string;
    primaryCta: string;
    secondaryCta: string;
    navCta: string;
  };
  services: ServiceItem[];
  servicesOverview: {
    header: SectionHeader;
    bottomCtaTitle: string;
    bottomCtaSubtitle: string;
    bottomCtaButton: string;
  };
  stats: {
    header: SectionHeader;
    items: StatItem[];
    bannerTitle: string;
    bannerSubtitle: string;
    satisfaction: string;
    rating: string;
  };
  aboutUs: {
    header: SectionHeader;
    image: string;
    imageAlt: string;
    badge1: string;
    badge2: string;
    heading: string;
    headingAccent: string;
    paragraphs: string[];
    ctaText: string;
  };
  coreValues: {
    badge: string;
    title: string;
    subtitle: string;
    items: CoreValueItem[];
  };
  ourWork: {
    header: SectionHeader;
    achievementStats: AchievementStat[];
    projects: ProjectItem[];
    homeProjectCount: number;
  };
  ourClients: {
    header: SectionHeader;
    clients: ClientItem[];
  };
  contact: {
    badge: string;
    title: string;
    subtitle: string;
    sideTitle: string;
    sideDescription: string;
    responseTime: string;
    details: ContactDetail[];
  };
  footer: {
    ctaTitle: string;
    ctaSubtitle: string;
    ctaButton: string;
    brandDescription: string;
    brandTags: string[];
    location: string;
    copyright: string;
    craftedText: string;
    quickLinks: FooterLink[];
    serviceLinks: FooterLink[];
    contactInfo: ContactDetail[];
    socialLinks: SocialLink[];
  };
  aboutPage: {
    hero: {
      badge: string;
      title: string;
      titleAccent: string;
      description: string;
      image: string;
      imageAlt: string;
      chipText: string;
      valuePills: string[];
      floatingStat: { value: string; label: string };
      stats: ProofPoint[];
    };
    whoWeAre: {
      header: SectionHeader;
      teamTitle: string;
      teamParagraphs: string[];
      upskills: string[];
      journey: JourneyStep[];
      philosophy: string;
    };
    expertise: {
      header: SectionHeader;
      items: ExpertiseItem[];
      footerNote: string;
    };
    values: {
      header: SectionHeader;
      items: CoreValueItem[];
    };
    team: {
      header: SectionHeader;
      members: TeamMember[];
    };
    testimonials: {
      header: SectionHeader;
      items: Testimonial[];
      ctaText: string;
    };
  };
  siteSettings: {
    logo: string;
    logoAlt: string;
    companyName: string;
    website: string;
    tagline: string;
    contactEmail: string;
    contactPhone: string;
  };
  pricing?: PricingTier[];
  pricingCategories?: PricingCategory[];
}

export type ContentSection = keyof SiteContent;
