"use client";

import {
  Megaphone, TrendingUp, Target, BarChart3, Search, Users, LineChart,
  PenTool, Mail, Rocket, PieChart, Eye, Layers, Settings, Award,
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
    title: "Maximize Your Online Reach: SEO & Digital Marketing Solutions",
    subtitle: "Get Discovered Online: Drive Traffic, Generate Leads, and Boost Sales.",
    description: "Reach your brand to the right audience with comprehensive digital marketing strategies and accelerate your online growth in today's competitive digital world.",
    image: {
        src: "https://images.unsplash.com/photo-1563986768609-322da13575f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtYXJrZXRpbmclMjBhbmFseXRpY3N8ZW58MHx8fHwxNzQ4NDAzNjAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
        alt: "Digital marketing analytics on a dashboard",
        hint: "marketing analytics"
    }
};

const introduction = "In today's fast-paced digital landscape, simply having a website isn't enough— it needs to be visible, engaging, and optimized to stand out. Our SEO and Digital Marketing services empower your business to climb to the top of search results, generate qualified leads, and maximize ROI through proven, data-driven strategies.";

const marketingServices = [
    {
        title: "Search Engine Optimization (SEO)",
        description: "Elevate your website's search rankings and drive sustainable organic traffic by targeting high-intent keywords and fixing technical hurdles.",
        icon: <Search className="w-8 h-8" />,
        keyFeatures: [
            "In-depth keyword research (Ahrefs, SEMrush).",
            "On-page, off-page, and technical SEO.",
            "Ethical link-building strategies.",
            "Local SEO for brick-and-mortar businesses."
        ]
    },
    {
        title: "Social Media Marketing (SMM)",
        description: "Amplify brand awareness and foster vibrant communities on platforms like Facebook, Instagram, LinkedIn, and TikTok.",
        icon: <Users className="w-8 h-8" />,
        keyFeatures: [
            "Customized social media strategy.",
            "Engaging content creation (posts, stories, reels).",
            "Targeted ad campaigns and retargeting.",
            "Community management and sentiment analysis."
        ]
    },
    {
        title: "Pay-Per-Click (PPC) Advertising",
        description: "Unlock instant visibility and laser-targeted traffic through Google Ads, Microsoft Advertising, and social platforms.",
        icon: <LineChart className="w-8 h-8" />,
        keyFeatures: [
            "Full ad campaign setup and structuring.",
            "Strategic keyword bidding & negative keywords.",
            "Compelling ad copywriting and A/B testing.",
            "Landing page optimization for conversions."
        ]
    },
    {
        title: "Content Marketing",
        description: "Captivate your audience with high-quality content that educates, nurtures leads, and establishes your brand as an industry authority.",
        icon: <PenTool className="w-8 h-8" />,
        keyFeatures: [
            "Comprehensive content strategy & topic clustering.",
            "Expert blog and article writing (E-E-A-T focused).",
            "Multimedia production (videos, infographics).",
            "Content promotion via email and social media."
        ]
    },
    {
        title: "Email Marketing",
        description: "Forge direct, personalized connections with customers through targeted email campaigns that drive repeat business.",
        icon: <Mail className="w-8 h-8" />,
        keyFeatures: [
            "Email list management and segmentation.",
            "Mobile-first campaign design.",
            "A/B testing for subjects, send times, and CTAs.",
            "Automation setup (drip campaigns, behavioral triggers)."
        ]
    },
    {
        title: "Analytics & Reporting",
        description: "Gain crystal-clear insights into your marketing performance to make informed decisions and demonstrate value.",
        icon: <BarChart3 className="w-8 h-8" />,
        keyFeatures: [
            "Google Analytics 4 setup and event tracking.",
            "Custom dashboards (Google Data Studio, Tableau).",
            "Monthly/quarterly performance reports.",
            "Competitor analysis and actionable insights."
        ]
    }
];

const marketingProcess = [
    { number: "01", title: "Strategy Development", description: "We kick off with a deep-dive audit of your current online presence, business objectives, and target audience to craft a personalized roadmap with KPIs, timelines, and budget allocations.", icon: <Target /> },
    { number: "02", title: "Implementation", description: "With strategy in hand, we roll out campaigns, from content production and ad launches to SEO tweaks and email builds, using collaborative tools for seamless execution.", icon: <Rocket /> },
    { number: "03", title: "Optimization", description: "Real-time monitoring via dashboards flags underperformers early. We apply data-backed tweaks weekly, aiming for continuous improvement and quick wins.", icon: <TrendingUp /> },
    { number: "04", title: "Analysis & Reporting", description: "At milestones, we compile in-depth reports with visualizations, key learnings, and recommendations. Quarterly reviews discuss pivots, celebrate successes, and align on future sprints.", icon: <PieChart /> }
];

const whyChooseUsData = [
    {
        icon: BarChart3,
        title: "Data-Driven Approach",
        description: "Every decision stems from robust analytics and A/B testing, not guesswork. We leverage AI for predictive insights to keep your strategies ahead of algorithm updates."
    },
    {
        icon: Award,
        title: "Experienced Marketers",
        description: "Our team of 15+ certified experts brings 10+ years of hands-on experience across niches, from SaaS to retail, with a track record of 4.9/5 client ratings."
    },
    {
        icon: Eye,
        title: "Transparent Reporting",
        description: "No black boxes. Enjoy weekly snapshots, monthly deep-dives, and access to live dashboards so you're always informed and empowered."
    },
    {
        icon: Rocket,
        title: "Measurable Results",
        description: "We prioritize tangible outcomes: 150% average traffic growth, 30%+ lead gen uplift, and ROI multiples of 4:1 or better, backed by case studies."
    },
    {
        icon: Layers,
        title: "Holistic Strategy",
        description: "We don't silo services. Our integrated ecosystem syncs SEO with PPC, content with social, and email with analytics for amplified synergy and cost efficiency."
    },
    {
        icon: Settings,
        title: "Scalable & Flexible",
        description: "From one-off audits to full-funnel retainers, we adapt to your budget and goals without lock-in contracts. Get started with a free strategy session."
    }
];

const faqs = [
    {
        question: "How long does it take to see results from SEO?",
        answer: "SEO is a long-term strategy. While some improvements can be seen in the first few weeks, it typically takes 4-6 months to see significant, lasting results in organic traffic and rankings. The exact timeline depends on your industry, competition, and the current state of your website."
    },
    {
        question: "What is the difference between SEO and SEM?",
        answer: "SEO (Search Engine Optimization) focuses on improving your website's organic (unpaid) rankings in search results. SEM (Search Engine Marketing) is a broader term that includes SEO as well as paid advertising methods like PPC (Pay-Per-Click) to increase search engine visibility."
    },
    {
        question: "How do you measure the success of a digital marketing campaign?",
        answer: "We measure success based on the Key Performance Indicators (KPIs) we establish during the strategy phase. These can include metrics like website traffic, conversion rates, cost per acquisition (CPA), return on ad spend (ROAS), and keyword rankings."
    },
    {
        question: "What is your pricing model for digital marketing services?",
        answer: "Our pricing is flexible and tailored to your specific needs. We offer monthly retainers for ongoing services like SEO and SMM, as well as project-based pricing for specific campaigns. Contact us for a custom quote."
    }
];

export default function SeoAndDigitalMarketingPage() {
    return (
        <div className="min-h-screen bg-white text-silver-900">
            <Header variant="light" />

            <main className="flex-grow">
                <ServiceHero
                    badge="SEO & Digital Marketing"
                    title={heroContent.subtitle}
                    description={heroContent.description}
                    image={heroContent.image}
                    icon={Megaphone}
                    primaryCta={{ label: "Get a Free Digital Marketing Audit", href: "/#contact" }}
                    secondaryCta={{ label: "Grow Your Business Online", href: "/#our-work" }}
                    highlights={["Higher Rankings", "Lead Generation", "Data-driven"]}
                />

                <ServiceIntroSection
                    eyebrow="Why It Matters"
                    title="Grow Your Reach and Maximize ROI"
                    content={introduction}
                    highlights={[
                        { icon: TrendingUp, label: "Higher Visibility", description: "Climb search rankings and get discovered by the right audience." },
                        { icon: Target, label: "Qualified Leads", description: "Attract prospects who are ready to engage with your business." },
                        { icon: BarChart3, label: "Data-Driven Results", description: "Strategies backed by analytics and measurable performance." },
                    ]}
                />

                <ServiceOfferingsSection
                    eyebrow="What We Offer"
                    title="Our SEO & Digital Marketing Services"
                    description="A suite of services designed to deliver measurable results and maximize your return on investment."
                    items={marketingServices}
                />

                <ServiceProcessSection
                    eyebrow="How We Work"
                    title="Our Marketing Process"
                    description="A results-focused, agile methodology to adapt to market shifts and your evolving needs. Our process ensures transparency and collaboration every step of the way."
                    steps={marketingProcess}
                    variant="white"
                />

                <ServiceWhyChooseSection
                    eyebrow="Why Brolytics"
                    title="Why Choose Us?"
                    description="Partnering with us means gaining a strategic ally dedicated to your success in the ever-evolving digital arena. Here's what differentiates our approach."
                    items={whyChooseUsData}
                />

                <ServiceFaqSection faqs={faqs} />
                
                {/* ── DYNAMIC PRICING ── */}
                

                <ServiceCtaSection
                    title="Ready to Dominate Your Niche?"
                    description="Don't let competitors steal your spotlight—claim your free 30-minute strategy session today and receive a personalized growth blueprint. Let's turn clicks into customers and data into dollars!"
                    ctaLabel="Request a Custom Proposal"
                />
            </main>

            <Footer />
        </div>
    );
}
