export const PROJECT_CATEGORIES = [
  "Website Development",
  "Mobile App",
  "Custom Software",
  "AI Solutions",
  "Graphic Design",
  "SEO & Marketing",
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

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

export interface Project {
  id: string;
  category: ProjectCategory;
  imageUrl: string;
  year: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  challenge: string;
  solution: string;
  impact: ProjectImpact;
  technologies: string[];
  duration: string;
  testimonial?: ProjectTestimonial;
}

export const projects: Project[] = [
  {
    id: "enterprise-erp",
    category: "Custom Software",
    imageUrl:
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    year: "2024",
    title: "Enterprise Resource Planning System",
    shortDescription:
      "Cloud ERP unifying manufacturing ops — inventory, HR, finance & analytics.",
    detailedDescription:
      "A complete ERP system that integrates every facet of a manufacturing operation — from inventory to HR — into a single cohesive platform with real-time analytics and automated workflows.",
    challenge:
      "Siloed data across departments led to inefficiencies, communication gaps, and costly errors in production and inventory.",
    solution:
      "A custom cloud-based ERP with modular architecture: real-time inventory tracking, CRM, HR portal, finance automation, and a central analytics dashboard with role-based access.",
    impact: {
      metric: "40%",
      label: "Increase in Operational Efficiency",
      subtext: "Measured across all departments within 6 months",
    },
    technologies: ["React", "Node.js", "PostgreSQL", "AWS", "Docker"],
    duration: "6 months",
  },
  {
    id: "test-series-desktop",
    category: "Custom Software",
    imageUrl: "/testseries.jpeg",
    year: "2023",
    title: "Test Series Desktop App",
    shortDescription:
      "Offline-first Windows app for competitive exam preparation with real-time analytics.",
    detailedDescription:
      "A secure, offline-first desktop app that lets students take timed mock tests, review performance with detailed analytics, and access a large question bank without a constant internet connection.",
    challenge:
      "Students in areas with poor connectivity needed a reliable, fast platform to practice — existing web solutions were inaccessible and slow.",
    solution:
      "A native WPF application storing data locally, with a secure test environment, instant scoring, question-wise reports, and an online sync to fetch new tests and upload results.",
    impact: {
      metric: "10,000+",
      label: "Students Using the App",
      subtext: "92% satisfaction rate across all user surveys",
    },
    technologies: [".NET", "WPF", "SQLite", "WinForms"],
    duration: "5 months",
  },
  {
    id: "gts-car-rental",
    category: "Mobile App",
    imageUrl: "/gtslogo.png",
    year: "2023",
    title: "GTS Car Rental App",
    shortDescription:
      "Ola/Uber-style ride-hailing app with real-time GPS, in-app payments & ratings.",
    detailedDescription:
      "A comprehensive ride-hailing app for iOS and Android connecting passengers with drivers — real-time GPS tracking, in-app payments, scheduling, and two-way rating.",
    challenge:
      "The client wanted to enter a competitive ride-sharing market with a reliable platform offering a superior regional experience.",
    solution:
      "Native passenger and driver apps with a powerful booking backend, Google Maps navigation, Stripe payments, and real-time chat between rider and driver.",
    impact: {
      metric: "60,000+",
      label: "Play Store Downloads",
      subtext: "Tripled user base within the first 3 months",
    },
    technologies: ["Flutter", "Firebase", "Google Maps API", "Stripe"],
    duration: "7 months",
    testimonial: {
      quote:
        "Brolytics delivered exactly what we envisioned — our app outperforms competitors on both speed and UX.",
      name: "Rohan Mehta",
      role: "Founder · GTS Car Rentals",
    },
  },
  {
    id: "golobolosys-fashion",
    category: "Website Development",
    imageUrl:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    year: "2024",
    title: "Golobolosys Fashion Website",
    shortDescription:
      "AI-powered luxury fashion e-commerce with smart recommendations and virtual try-on.",
    detailedDescription:
      "A high-end e-commerce platform for a luxury fashion brand with an AI recommendation engine, virtual try-on, and a visually rich, seamless shopping experience.",
    challenge:
      "The brand needed an online presence matching its luxury status and a personalized experience to lift engagement and conversion.",
    solution:
      "A headless store on Next.js + Shopify with a custom AI model for personalized recommendations and an AR.js virtual try-on feature.",
    impact: {
      metric: "65%",
      label: "Increase in Conversion Rate",
      subtext: "Compared to previous website within 2 months",
    },
    technologies: ["Next.js", "TailwindCSS", "Shopify API", "AI/ML", "Stripe"],
    duration: "3 months",
  },
  {
    id: "rainbow-game",
    category: "Mobile App",
    imageUrl:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    year: "2023",
    title: "Rainbow Game App",
    shortDescription:
      "Addictive cross-platform puzzle game with procedural levels and global leaderboards.",
    detailedDescription:
      "An addictive puzzle game for iOS and Android with procedurally generated levels, vibrant graphics, intuitive controls, and global leaderboards.",
    challenge:
      "In a saturated gaming market, the client wanted a simple yet engaging game that stands out visually with high replayability.",
    solution:
      "Built in Unity for cross-platform release, with procedural level generation, Game Center / Play Games leaderboards, and AdMob rewarded-ad monetization.",
    impact: {
      metric: "4.8★",
      label: "Rating on Google Play Store",
      subtext: "25,000+ verified reviews — Featured by Google",
    },
    technologies: ["Unity", "C#", "Firebase", "AdMob"],
    duration: "4 months",
  },
  {
    id: "custom-erp-software",
    category: "AI Solutions",
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    year: "2024",
    title: "AI-Powered ERP Software",
    shortDescription:
      "AI-driven ERP with sales forecasting, automated workflows, and unified dashboards.",
    detailedDescription:
      "A bespoke ERP for a mid-sized enterprise that automates and integrates core business functions with AI-driven forecasting and an automated workflow engine.",
    challenge:
      "Disconnected tools caused data redundancy and no unified view of operations, hampering strategic planning.",
    solution:
      "A web ERP on Laravel + Vue.js with a Python AI module for sales forecasting, role-based dashboards, automated reports, and scalable Docker deployment.",
    impact: {
      metric: "1,200+",
      label: "Man-Hours Saved Per Year",
      subtext: "Through automated workflows and AI-driven decisions",
    },
    technologies: ["Laravel", "Vue.js", "Python (AI)", "Docker", "MySQL"],
    duration: "9 months",
  },
  {
    id: "global-brand-campaign",
    category: "SEO & Marketing",
    imageUrl: "/digi.png",
    year: "2024",
    title: "Global Brand Campaign",
    shortDescription:
      "Multi-channel B2B SaaS launch strategy across SEO, PPC, content and influencer marketing.",
    detailedDescription:
      "A comprehensive campaign for a B2B SaaS launch spanning SEO, content, PPC, and social to establish market presence and a qualified lead pipeline.",
    challenge:
      "Launching in a competitive market, the client needed to quickly build brand awareness and generate high-quality leads from day one.",
    solution:
      "A multi-pronged strategy: technical SEO, content marketing, targeted Google & LinkedIn ads, influencer outreach, and HubSpot lead nurturing flows.",
    impact: {
      metric: "200%",
      label: "Increase in Qualified Leads",
      subtext: "Achieved within the first 3 months of campaign launch",
    },
    technologies: ["SEO", "PPC", "HubSpot", "Content Marketing", "LinkedIn Ads"],
    duration: "Ongoing",
  },
  {
    id: "corporate-rebranding",
    category: "Graphic Design",
    imageUrl: "/graph.png",
    year: "2023",
    title: "Corporate Rebranding",
    shortDescription:
      "Full visual identity overhaul — logo, brand guidelines, website, and all collateral.",
    detailedDescription:
      "A full rebrand to modernize an established financial firm — new logo, brand guidelines, website design, and a complete set of marketing collateral.",
    challenge:
      "An outdated identity failed to resonate with a new generation of investors; they needed a fresh, trustworthy look.",
    solution:
      "Market research and brand workshops defined the strategy; we delivered a new identity, comprehensive brand book, redesigned site, and print/digital collateral.",
    impact: {
      metric: "35%",
      label: "Increase in Brand Recognition",
      subtext: "Based on post-launch market survey across target audience",
    },
    technologies: ["Illustrator", "Photoshop", "InDesign", "Figma"],
    duration: "2 months",
  },
];
