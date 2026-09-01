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

export const pricingTiers: PricingTier[] = [
  {
    id: "growth",
    name: "Growth",
    tagline: "For businesses ready to build & scale",
    isPopular: false,
    cta: "Get Started",
    ctaHref: "/#contact",
    pricing: {
      oneTime: {
        amount: "₹XX,XXX",
        label: "One-time",
        sublabel: "Fixed price, single delivery",
      },
      monthly: {
        amount: "₹X,XXX",
        label: "/ month",
        sublabel: "Ongoing engagement, cancel anytime",
      },
    },
    features: [
      { text: "Up to 15 pages / screens", included: true },
      { text: "Custom UI/UX design", included: true },
      { text: "API & third-party integrations", included: true },
      { text: "4 revision rounds", included: true },
      { text: "90-day post-launch support", included: true },
      { text: "SEO-ready structure", included: true },
      { text: "6–8 week delivery", included: true },
      { text: "Dedicated project manager", included: false },
      { text: "SLA-backed uptime guarantee", included: false },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "For complex, large-scale platforms",
    isPopular: true,
    cta: "Contact Us",
    ctaHref: "/#contact",
    pricing: {
      oneTime: {
        amount: "Custom Quote",
        label: "",
        sublabel: "Scoped to your exact requirements",
      },
      monthly: {
        amount: "Custom Quote",
        label: "",
        sublabel: "Retainer with SLA & priority support",
      },
    },
    features: [
      { text: "Unlimited pages / modules", included: true },
      { text: "Custom UI/UX design system", included: true },
      { text: "Complex API & AI integrations", included: true },
      { text: "Unlimited revision rounds", included: true },
      { text: "1-year support & maintenance", included: true },
      { text: "SEO + performance optimization", included: true },
      { text: "Priority 24h response time", included: true },
      { text: "Dedicated project manager", included: true },
      { text: "SLA-backed uptime guarantee", included: true },
    ],
  },
];

export const servicePricingTiers: Record<string, PricingTier[]> = {
  "website-development": [
    {
      id: "web-starter",
      name: "Starter Business Profile",
      tagline: "Perfect for establishing your online presence",
      isPopular: false,
      cta: "Get Started",
      ctaHref: "/#contact",
      pricing: {
        oneTime: { amount: "₹XX,XXX", label: "One-time", sublabel: "Fixed price delivery" },
        monthly: { amount: "₹X,XXX", label: "/ month", sublabel: "Maintenance & hosting" },
      },
      features: [
        { text: "5-7 Page Custom Website", included: true },
        { text: "Mobile Responsive Design", included: true },
        { text: "Basic On-Page SEO", included: true },
        { text: "Contact Form Integration", included: true },
        { text: "Content Management System (CMS)", included: false },
        { text: "E-commerce Functionality", included: false },
      ],
    },
    {
      id: "web-growth",
      name: "Dynamic E-Commerce/CMS",
      tagline: "Scale your sales and content effortlessly",
      isPopular: true,
      cta: "Start Scaling",
      ctaHref: "/#contact",
      pricing: {
        oneTime: { amount: "₹XX,XXX", label: "One-time", sublabel: "End-to-end development" },
        monthly: { amount: "₹X,XXX", label: "/ month", sublabel: "Priority support & updates" },
      },
      features: [
        { text: "Custom E-commerce or CMS", included: true },
        { text: "Advanced UI/UX Animations", included: true },
        { text: "Payment Gateway Integration", included: true },
        { text: "Advanced Technical SEO", included: true },
        { text: "Admin Dashboard Access", included: true },
        { text: "3 Months Priority Support", included: true },
      ],
    }
  ],
  "mobile-app-development": [
    {
      id: "mobile-mvp",
      name: "Cross-Platform MVP",
      tagline: "Test the market quickly with React Native/Flutter",
      isPopular: false,
      cta: "Launch MVP",
      ctaHref: "/#contact",
      pricing: {
        oneTime: { amount: "₹XX,XXX", label: "One-time", sublabel: "Core feature set" },
        monthly: { amount: "₹X,XXX", label: "/ month", sublabel: "Bug fixes & updates" },
      },
      features: [
        { text: "iOS & Android (Single Codebase)", included: true },
        { text: "UI/UX Prototyping", included: true },
        { text: "User Authentication", included: true },
        { text: "Core Functionality Build", included: true },
        { text: "App Store Submission", included: false },
        { text: "Complex Backend APIs", included: false },
      ],
    },
    {
      id: "mobile-scale",
      name: "Native Enterprise App",
      tagline: "High-performance, complex native applications",
      isPopular: true,
      cta: "Build Enterprise",
      ctaHref: "/#contact",
      pricing: {
        oneTime: { amount: "Custom", label: "Quote", sublabel: "Scoped based on complexity" },
        monthly: { amount: "Custom", label: "Quote", sublabel: "SLA backed support" },
      },
      features: [
        { text: "Native Swift (iOS) & Kotlin (Android)", included: true },
        { text: "Custom Backend & DB Architecture", included: true },
        { text: "Real-time Chat & Notifications", included: true },
        { text: "Advanced Security & Encryption", included: true },
        { text: "App Store & Play Store Publishing", included: true },
        { text: "1 Year Ongoing Maintenance", included: true },
      ],
    }
  ],
  "custom-software-development": [
    {
      id: "software-saas",
      name: "SaaS Platform",
      tagline: "End-to-end custom SaaS application",
      isPopular: true,
      cta: "Build SaaS",
      ctaHref: "/#contact",
      pricing: {
        oneTime: { amount: "Custom", label: "Quote", sublabel: "Based on feature requirements" },
        monthly: { amount: "₹XX,XXX", label: "/ month", sublabel: "Cloud infrastructure management" },
      },
      features: [
        { text: "Scalable Cloud Architecture (AWS/Azure)", included: true },
        { text: "Multi-tenant Database Design", included: true },
        { text: "Subscription & Billing Integration", included: true },
        { text: "Custom Admin & Superadmin Panels", included: true },
        { text: "Advanced Security & Compliance", included: true },
        { text: "Continuous Integration / Deployment", included: true },
      ],
    }
  ],
  "seo-and-digital-marketing": [
    {
      id: "seo-local",
      name: "Local SEO Dominance",
      tagline: "Capture your local market and drive foot traffic",
      isPopular: false,
      cta: "Boost Rankings",
      ctaHref: "/#contact",
      pricing: {
        oneTime: { amount: "₹X,XXX", label: "Setup", sublabel: "Initial audit & optimization" },
        monthly: { amount: "₹X,XXX", label: "/ month", sublabel: "Ongoing local SEO" },
      },
      features: [
        { text: "Google My Business Optimization", included: true },
        { text: "Local Citations & Directory Listings", included: true },
        { text: "On-Page Technical SEO", included: true },
        { text: "Monthly Ranking Reports", included: true },
        { text: "Content Marketing (2 Blogs/mo)", included: false },
        { text: "National Keyword Targeting", included: false },
      ],
    },
    {
      id: "seo-national",
      name: "Comprehensive Digital Marketing",
      tagline: "Full-scale national SEO & Ad campaign management",
      isPopular: true,
      cta: "Dominate Search",
      ctaHref: "/#contact",
      pricing: {
        oneTime: { amount: "₹XX,XXX", label: "Setup", sublabel: "Strategy & technical overhaul" },
        monthly: { amount: "₹XX,XXX", label: "/ month", sublabel: "Aggressive growth strategy" },
      },
      features: [
        { text: "National & Global Keyword Targeting", included: true },
        { text: "High-Quality Backlink Outreach", included: true },
        { text: "Google Ads & Meta Ads Management", included: true },
        { text: "Content Marketing (8 Blogs/mo)", included: true },
        { text: "Advanced Conversion Tracking", included: true },
        { text: "Dedicated Growth Manager", included: true },
      ],
    }
  ],
  "graphics-design": [
    {
      id: "design-brand",
      name: "Brand Identity Kit",
      tagline: "Establish a cohesive and premium brand image",
      isPopular: true,
      cta: "Build Brand",
      ctaHref: "/#contact",
      pricing: {
        oneTime: { amount: "₹XX,XXX", label: "One-time", sublabel: "Complete brand handover" },
        monthly: { amount: "N/A", label: "", sublabel: "" },
      },
      features: [
        { text: "Primary & Secondary Logo Design", included: true },
        { text: "Color Palette & Typography Selection", included: true },
        { text: "Brand Guidelines Document", included: true },
        { text: "Business Cards & Letterheads", included: true },
        { text: "Social Media Templates (5 Posts)", included: true },
        { text: "3 Revision Rounds", included: true },
      ],
    }
  ],
  "ai-services": [
    {
      id: "ai-chatbot",
      name: "Custom AI Agent/Chatbot",
      tagline: "Automate support and sales with an intelligent agent",
      isPopular: true,
      cta: "Automate Support",
      ctaHref: "/#contact",
      pricing: {
        oneTime: { amount: "₹XX,XXX", label: "Integration", sublabel: "Custom training & deployment" },
        monthly: { amount: "₹X,XXX", label: "/ month", sublabel: "LLM API costs & maintenance" },
      },
      features: [
        { text: "Trained on your custom business data", included: true },
        { text: "Website & WhatsApp Integration", included: true },
        { text: "Human Handoff Capabilities", included: true },
        { text: "Lead Generation & Qualification", included: true },
        { text: "Multilingual Support", included: true },
        { text: "Analytics & Conversation Insights", included: true },
      ],
    }
  ]
};
