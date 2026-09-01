"use client";

import {
  Code, Globe, Monitor, Zap, TestTube2, Search, Palette, GitBranch,
  Rocket, LifeBuoy, Cpu, Shield, TrendingUp, Users, BarChart3, Layers,
  AppWindow,
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
    title: "Tailored Innovation: Custom Software Development Services for Your Unique Needs",
    subtitle: "Engineered for Excellence: Custom Software That Powers Your Business Forward.",
    description: "Transform your operational challenges into scalable, secure software solutions designed exclusively for your business, driving efficiency, innovation, and competitive advantage in a dynamic digital landscape.",
    image: {
        src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGRldmVsb3BtZW50fGVufDB8fHx8MTc0ODQwMzYwMHww&ixlib=rb-4.1.0&q=80&w=1080",
        alt: "Custom software development code on a screen",
        hint: "software development"
    }
};

const introduction = "In an era where off-the-shelf solutions fall short, custom software is the catalyst for differentiation and agility. We translate your vision into robust, maintainable, and scalable code that complies with industry standards and future-proofs your tech stack.";

const customSoftwareServices = [
    {
        title: "Enterprise Software Development",
        description: "Build comprehensive, modular enterprise applications that unify your organization's siloed processes, from CRM to supply chain.",
        icon: <AppWindow className="w-8 h-8" />,
        keyFeatures: [
            "Full-stack development (MERN, .NET).",
            "Advanced workflow automation with BPMN tools.",
            "Role-based access control (RBAC) & multi-tenancy.",
            "Cloud-native deployment (AWS, Azure, GCP)."
        ]
    },
    {
        title: "Web Application Development",
        description: "Craft dynamic, responsive web apps like collaborative tools, e-learning platforms, or SaaS products that perform flawlessly.",
        icon: <Globe className="w-8 h-8" />,
        keyFeatures: [
            "SPA frameworks (Vue.js, Angular).",
            "API-first design (RESTful/GraphQL).",
            "Progressive Web App (PWA) capabilities.",
            "OAuth 2.0, JWT, and CSRF protection."
        ]
    },
    {
        title: "Desktop & Cross-Platform Applications",
        description: "Develop robust desktop apps for specialized workflows (e.g., CAD, inventory) with native performance and cross-platform compatibility.",
        icon: <Monitor className="w-8 h-8" />,
        keyFeatures: [
            "High-performance apps with Electron or Qt/C++.",
            "Offline-first synchronization (IndexedDB/SQLite).",
            "Hardware integrations (USB, GPU).",
            "Auto-update mechanisms for seamless patches."
        ]
    },
    {
        title: "API & Backend Development",
        description: "Engineer scalable backends and APIs to power your applications with enterprise-grade reliability, data orchestration, and business logic.",
        icon: <Code className="w-8 h-8" />,
        keyFeatures: [
            "Serverless backends (AWS Lambda, Google Cloud Functions).",
            "Database optimization (NoSQL, PostgreSQL).",
            "Event-driven architectures (Kafka, RabbitMQ).",
            "OpenAPI/Swagger for API documentation."
        ]
    },
    {
        title: "Legacy System Modernization",
        description: "Revitalize outdated legacy systems by migrating them to modern, cloud-native architectures, preserving data integrity and minimizing downtime.",
        icon: <Zap className="w-8 h-8" />,
        keyFeatures: [
            "Strangler pattern for gradual refactoring.",
            "Zero-loss data migration strategies.",
            "Containerization with Docker & Kubernetes.",
            "Hybrid integration with middleware like MuleSoft."
        ]
    },
    {
        title: "Software Testing & QA Services",
        description: "Ensure your custom software is bulletproof through rigorous, automated testing for functionality, security, and usability.",
        icon: <TestTube2 className="w-8 h-8" />,
        keyFeatures: [
            "Automated testing (Selenium, JUnit, Postman).",
            "CI/CD integration with Jenkins or GitHub Actions.",
            "Security & penetration testing.",
            "Performance benchmarking & load testing."
        ]
    }
];

const developmentProcess = [
    { number: "01", title: "Discovery & Planning", description: "In-depth requirements elicitation, user story mapping, and feasibility studies to deliver a detailed SRS and MVP scope.", icon: <Search /> },
    { number: "02", title: "Design & Prototyping", description: "Collaborative wireframing, architectural blueprints, and interactive prototypes for stakeholder validation and early risk mitigation.", icon: <Palette /> },
    { number: "03", title: "Development Sprints", description: "Bi-weekly cycles of coding, peer reviews, and integration, employing TDD and pair programming to build incrementally.", icon: <GitBranch /> },
    { number: "04", title: "Testing & QA", description: "Parallel automated and manual testing, including security audits, ensuring 95% code coverage and zero critical bugs.", icon: <TestTube2 /> },
    { number: "05", title: "Deployment & Release", description: "Automated deployments via blue-green strategies on CI/CD pipelines, with canary releases for progressive rollouts.", icon: <Rocket /> },
    { number: "06", title: "Maintenance & Iteration", description: "Ongoing support with bug bounties, feature backlogs, and quarterly enhancements, plus training for your team.", icon: <LifeBuoy /> }
];

const whyChooseUsData = [
    {
        icon: Cpu,
        title: "Domain Expertise",
        description: "A 30+ team of certified architects and developers with 8-15 years of experience across 20+ industries."
    },
    {
        icon: Zap,
        title: "Agile & Scalable Tech",
        description: "Cutting-edge stacks with modular designs that scale from prototypes to petabyte-handling behemoths."
    },
    {
        icon: Shield,
        title: "Security-First Mindset",
        description: "End-to-end encryption, zero-trust models, and annual pentests to reduce breach risks by 90%."
    },
    {
        icon: TrendingUp,
        title: "Cost-Effective Innovation",
        description: "Transparent pricing with 20-30% savings via offshore-onsite hybrids and open-source leverage."
    },
    {
        icon: Users,
        title: "Client Empowerment",
        description: "Daily stand-ups, shared repositories, and co-ownership via OKRs, empowering you with 100% visibility."
    },
    {
        icon: BarChart3,
        title: "Proven Impact",
        description: "Case studies showcase 50% faster processing or 40% revenue lifts, with NPS scores averaging 4.8/5."
    }
];

const faqs = [
    {
        question: "How long does a typical custom software project take?",
        answer: "Timelines vary greatly based on complexity. A simple MVP might take 2-4 months, while a complex enterprise system could take a year or more. We provide a detailed project plan with milestones after the discovery phase."
    },
    {
        question: "How do you ensure the quality of the software?",
        answer: "We employ a multi-layered QA strategy that includes unit testing, integration testing, end-to-end testing, and manual QA. Our CI/CD pipeline includes automated tests to catch regressions early."
    },
    {
        question: "Do I own the source code?",
        answer: "Yes, upon final payment, you will have full ownership of the source code and intellectual property for the custom software we develop for you."
    },
    {
        question: "What kind of post-launch support do you offer?",
        answer: "We offer a standard 90-day warranty period for bug fixes. Beyond that, we provide flexible monthly or annual support retainers for ongoing maintenance, updates, and feature enhancements."
    }
];

export default function CustomSoftwareDevelopmentPage() {
    return (
        <div className="min-h-screen bg-white text-silver-900">
            <Header variant="light" />

            <main className="flex-grow">
                <ServiceHero
                    badge="Custom Software Development"
                    title={heroContent.subtitle}
                    description={heroContent.description}
                    image={heroContent.image}
                    icon={Code}
                    primaryCta={{ label: "Kickstart Your Custom Project", href: "/#contact" }}
                    secondaryCta={{ label: "Browse Our Portfolio", href: "/#our-work" }}
                    highlights={["Scalable", "Enterprise-grade", "Tailored Fit"]}
                />

                <ServiceIntroSection
                    eyebrow="Why It Matters"
                    title="Software Built for Your Unique Business"
                    content={introduction}
                    highlights={[
                        { icon: Code, label: "Tailored Solutions", description: "Software designed around your workflows, not generic templates." },
                        { icon: Layers, label: "Scalable Architecture", description: "Systems that grow seamlessly as your operations expand." },
                        { icon: Cpu, label: "Future-Proof Tech", description: "Modern stacks and best practices that stand the test of time." },
                    ]}
                />

                <ServiceOfferingsSection
                    eyebrow="What We Offer"
                    title="Our Custom Software Services"
                    description="A complete ecosystem of software solutions to drive innovation and efficiency."
                    items={customSoftwareServices}
                />

                <ServiceProcessSection
                    eyebrow="How We Work"
                    title="Our Development Process"
                    description="We embrace an agile, iterative framework inspired by Scrum and Kanban, tailored to your project's scale, typically spanning 3-9 months."
                    steps={developmentProcess}
                    variant="white"
                />

                <ServiceWhyChooseSection
                    eyebrow="Why Brolytics"
                    title="Why Choose Us for Custom Software"
                    description="With 98% project success rates and a decade of bespoke engineering, we don't just build software—we architect your competitive moat."
                    items={whyChooseUsData}
                />

                <ServiceFaqSection faqs={faqs} />
                
                {/* ── DYNAMIC PRICING ── */}


                <ServiceCtaSection
                    title="Ready to Code Your Custom Advantage?"
                    description="Don't settle for generic—unlock bespoke brilliance with a complimentary 60-minute scoping session, including a high-level architecture diagram and ROI projection."
                    ctaLabel="Request a Free Project Assessment"
                />
            </main>

            <Footer />
        </div>
    );
}
