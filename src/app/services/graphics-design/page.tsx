"use client";

import {
  Palette, Award, AppWindow, TrendingUp, BarChart3, Sparkles, Layers,
  Clock, Users, Target, Search, Lightbulb, PenTool, CheckCheck, Brush,
  Image as ImageIcon,
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
    title: "Visualizing Your Brand: Creative Graphic Design Services",
    subtitle: "Make a Lasting Impression: Stunning Visuals for Your Brand.",
    description: "Strengthen your brand identity and engage your audience with professional and impactful graphic designs that captivate and convert.",
    image: {
        src: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxncmFwaGljJTIwZGVzaWdufGVufDB8fHx8MTc0ODQwMzYwMHww&ixlib=rb-4.1.0&q=80&w=1080",
        alt: "Abstract graphic design elements",
        hint: "graphic design"
    }
};

const designServices = [
    {
        title: "Logo Design & Brand Identity",
        description: "Create a unique and memorable logo that authentically reflects your brand's core values, mission, and vision.",
        icon: <Award className="w-8 h-8" />,
        tools: ["3-5 Logo Concepts", "Brand Style Guide", "Stationery Suite", "Vector Files (AI, EPS, SVG)"]
    },
    {
        title: "Website & App UI/UX Design",
        description: "Design intuitive, user-friendly, and visually appealing interfaces that enhance user satisfaction and boost conversion rates.",
        icon: <AppWindow className="w-8 h-8" />,
        tools: ["Wireframing", "Prototyping", "High-Fidelity Mockups", "Responsive Design"]
    },
    {
        title: "Marketing Collateral",
        description: "Elevate your marketing with custom brochures, flyers, posters, and presentations that align with your brand messaging.",
        icon: <TrendingUp className="w-8 h-8" />,
        tools: ["Brochures & Flyers", "Business Cards", "Social Media Graphics", "Email Templates"]
    },
     {
        title: "Social Media Graphics",
        description: "Produce engaging, brand-consistent graphics for social platforms to spark conversations and build a loyal community.",
        icon: <ImageIcon className="w-8 h-8" />,
        tools: ["Custom Templates", "Post Designs", "Ad Creatives", "Profile & Cover Images"]
    },
    {
        title: "Infographic Design",
        description: "Transform complex data into easy-to-digest, visually stunning infographics ideal for content marketing.",
        icon: <BarChart3 className="w-8 h-8" />,
        tools: ["Data Visualization", "Custom Illustrations", "Clear Hierarchy", "Interactive Versions"]
    },
    {
        title: "Print Design",
        description: "High-quality, print-optimized designs including magazine ads, product packaging, and large-format prints.",
        icon: <Brush className="w-8 h-8" />,
        tools: ["Magazine Layouts", "Packaging Design", "Outdoor Advertising", "Print-Ready Files"]
    }
];

const designProcess = [
    { number: "01", title: "Brief & Research", description: "We start by diving deep into your requirements, analyzing your target audience, competitors, and brand assets to build a solid foundation.", icon: <Search /> },
    { number: "02", title: "Concept Development", description: "Our team brainstorms and sketches initial design concepts, exploring creative directions to align with your goals while pushing innovative boundaries.", icon: <Lightbulb /> },
    { number: "03", title: "Feedback & Revisions", description: "Transparency is key. We share progress and use your input to refine elements like colors, layouts, or messaging until it's perfect.", icon: <PenTool /> },
    { number: "04", title: "Finalization & Delivery", description: "Once approved, we polish the designs and deliver a complete asset package including source files, usage rights, and implementation guides.", icon: <CheckCheck /> }
];

const whyChooseUsData = [
    {
        icon: Sparkles,
        title: "Creative Excellence",
        description: "Our designs are innovative and trend-forward, blending modern techniques with timeless appeal to resonate emotionally with your audience."
    },
    {
        icon: Award,
        title: "Experienced Designers",
        description: "A diverse team of certified graphic designers with 5-15 years in the field, having delivered 500+ projects with a 98% client satisfaction rate."
    },
    {
        icon: Layers,
        title: "Brand Consistency",
        description: "We obsess over uniformity—every pixel aligns with your guidelines, creating a unified ecosystem that builds trust and recall across channels."
    },
    {
        icon: Clock,
        title: "Timely Delivery",
        description: "We respect deadlines with built-in buffers for revisions, using project management tools to track progress. 95% of our projects are delivered on or ahead of schedule."
    },
    {
        icon: Users,
        title: "Client Collaboration",
        description: "You're not just a client; you're a co-creator. We prioritize open communication, incorporating your ideas at every stage."
    },
    {
        icon: Target,
        title: "Results-Oriented",
        description: "Beyond aesthetics, our designs are backed by metrics—expect 20-50% uplifts in engagement from our social graphics or collateral."
    }
];

const faqs = [
    {
        question: "What is your design process like?",
        answer: "We follow a collaborative, iterative approach. We start with a detailed discovery phase to understand your requirements, analyze your audience and competitors. Then we move to concept development, present mood boards, and refine designs based on your feedback through 1-2 revision rounds before final delivery."
    },
    {
        question: "What files will I receive at the end of the project?",
        answer: "You will receive a complete asset package including source files (e.g., AI, PSD, Figma), high-resolution raster images (JPG, PNG), scalable vector graphics (SVG), and comprehensive brand guidelines for usage."
    },
    {
        question: "How long does a typical graphic design project take?",
        answer: "A typical project takes 2-6 weeks, depending on the scope and complexity. A simple logo might be faster, while a full branding package will take longer. We provide a detailed timeline after the initial brief."
    },
    {
        question: "How do you handle revisions and feedback?",
        answer: "We prioritize transparency. We share progress via shared drives or tools like InVision and typically include 1-2 rounds of revisions in our project scope to ensure you are completely satisfied with the final outcome."
    }
];

export default function GraphicsDesignPage() {
    return (
        <div className="min-h-screen bg-white text-silver-900">
            <Header variant="light" />

            <main className="flex-grow">
                <ServiceHero
                    badge="Graphics Design"
                    title={heroContent.subtitle}
                    description={heroContent.description}
                    image={heroContent.image}
                    icon={Palette}
                    primaryCta={{ label: "Get a Design Quote", href: "/#contact" }}
                    secondaryCta={{ label: "Explore Our Portfolio", href: "/#our-work" }}
                    highlights={["Brand Identity", "Print & Digital", "Creative Concepts"]}
                />

                <ServiceIntroSection
                    eyebrow="Why It Matters"
                    title="Visual Identity That Makes You Unforgettable"
                    content="A strong visual identity sets your business apart from the competition and communicates your message effectively, fostering trust and recognition among your audience. Our creative graphic design services are tailored to reflect your brand's unique personality, values, and vision, leaving an unforgettable impression on your target audience."
                    highlights={[
                        { icon: Palette, label: "Brand Recognition", description: "Consistent visuals that make your business instantly recognizable." },
                        { icon: Sparkles, label: "Creative Excellence", description: "Designs that capture attention and communicate your message clearly." },
                        { icon: Target, label: "Audience Connection", description: "Visuals crafted to resonate with your target customers." },
                    ]}
                />

                <ServiceOfferingsSection
                    eyebrow="What We Offer"
                    title="Our Graphic Designing Services"
                    description="A full spectrum of design services to build a powerful and consistent brand presence."
                    items={designServices.map(({ tools, ...rest }) => ({ ...rest, tags: tools }))}
                />

                <ServiceProcessSection
                    eyebrow="How We Work"
                    title="Our Design Process"
                    description="A collaborative and structured process that ensures creative excellence and alignment with your goals. We follow a collaborative, iterative approach to ensure every project exceeds expectations."
                    steps={designProcess}
                    variant="white"
                />

                <ServiceWhyChooseSection
                    eyebrow="Why Brolytics"
                    title="Why Choose Us?"
                    description="In a crowded market, standing out requires more than just pretty pictures—it demands strategy, skill, and partnership. Here's what sets us apart."
                    items={whyChooseUsData}
                />

                <ServiceFaqSection faqs={faqs} />
                
                {/* ── DYNAMIC PRICING ── */}


                <ServiceCtaSection
                    title="Let's Bring Your Brand to Life Visually!"
                    description="Ready to transform your ideas into visuals that inspire action? Schedule a free 30-minute consultation today, and let's discuss how we can elevate your brand. Your first concept sketch is on us!"
                    ctaLabel="Contact Us for a Creative Solution"
                />
            </main>

            <Footer />
        </div>
    );
}
