"use client";

import {
  Smartphone, Zap, Users, Globe, Sparkles, TrendingUp, BarChart3,
  AppWindow, Layers, Settings, Palette, Search, GitBranch, TestTube2,
  Rocket, LifeBuoy, Cpu, CheckCheck,
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
    title: "Transforming Ideas into Intuitive Mobile Experiences",
    subtitle: "Your Vision, Our Code: Crafting Cutting-Edge Mobile Applications.",
    description: "Deliver seamless user experiences and drive business growth with our expert mobile app development services for iOS, Android, and cross-platform solutions that captivate users and scale with your ambitions.",
    image: {
        src: "https://images.unsplash.com/photo-1551739440-5dd934d3a94a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBkZXZlbG9wbWVudHxlbnwwfHx8fDE3NDg0MDM2MDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
        alt: "Mobile application development interface on a screen",
        hint: "mobile development"
    }
};

const introduction = "In the digital age of 2025, a powerful mobile app can propel your business to new heights. We specialize in crafting innovative, performance-optimized mobile applications that deeply engage your target audience while aligning with your business objectives, delivering an average 4.8/5 App Store rating and a 35% faster time-to-market.";

const appServices = [
    {
        title: "iOS App Development",
        description: "Harness Apple's ecosystem to build stunning, high-performance iOS apps that delight users with smooth interactions and enterprise-grade security.",
        icon: <AppWindow className="w-8 h-8" />,
        keyFeatures: [
            "Intuitive UI/UX design following Human Interface Guidelines.",
            "Rigorous performance optimization with Instruments.",
            "Streamlined App Store submission & ASO strategies.",
            "Integration with Apple services like iCloud, Siri & Apple Pay."
        ]
    },
    {
        title: "Android App Development",
        description: "Tap into the world's largest mobile platform with versatile, scalable Android apps designed for diverse devices and user behaviors.",
        icon: <Smartphone className="w-8 h-8" />,
        keyFeatures: [
            "Material Design 3 for modern, adaptive interfaces.",
            "Extensive device compatibility testing (5,000+ configs).",
            "Google Play Store compliance and A/B testing.",
            "Robust backend integration with Firebase & Google Cloud."
        ]
    },
    {
        title: "Cross-Platform Development",
        description: "Accelerate your go-to-market strategy with a single codebase for both iOS and Android, slashing costs by up to 40%.",
        icon: <Layers className="w-8 h-8" />,
        keyFeatures: [
            "Rapid development with React Native or Flutter.",
            "Cost-effective, shared logic for business rules.",
            "Native-like performance (55-60fps animations).",
            "Broader audience reach with simultaneous launches."
        ]
    },
     {
        title: "Progressive Web Apps (PWAs)",
        description: "Bridge the gap between web and native with PWAs that offer app-like functionality without the hassle of app stores.",
        icon: <Globe className="w-8 h-8" />,
        keyFeatures: [
            "Offline capabilities with Service Workers & IndexedDB.",
            "Push notifications for personalized re-engagement.",
            "Direct deployment, no app store needed.",
            "Performance-optimized with Lighthouse scores over 90."
        ]
    },
    {
        title: "App UI/UX Design",
        description: "We architect experiences that are as captivating as they are intuitive, turning one-time users into lifelong advocates.",
        icon: <Palette className="w-8 h-8" />,
        keyFeatures: [
            "In-depth user research, personas, and journey maps.",
            "Interactive wireframing and prototyping (Figma/Adobe XD).",
            "Usability testing with real user feedback.",
            "Accessibility compliance (WCAG 2.2 standards)."
        ]
    },
    {
        title: "App Maintenance & Support",
        description: "Our commitment extends beyond launch. We provide ongoing vigilance to keep your app resilient, relevant, and revenue-generating.",
        icon: <Settings className="w-8 h-8" />,
        keyFeatures: [
            "Swift bug fixing with CI/CD and hotfixes.",
            "Real-time performance monitoring (New Relic/Datadog).",
            "Regular security audits and updates.",
            "Quarterly sprints for feature enhancements."
        ]
    }
];

const developmentProcess = [
    { number: "01", title: "Discovery & Strategy", description: "We immerse ourselves in your world through stakeholder interviews, competitive benchmarking, and SWOT analyses to define MVPs, monetization models, and success metrics—culminating in a detailed project roadmap and Gantt chart.", icon: <Search /> },
    { number: "02", title: "UI/UX Design", description: "Collaborative ideation yields wireframes, high-fidelity mockups, and clickable prototypes, refined through 2-3 feedback loops and usability testing with 20+ participants to ensure intuitive flows.", icon: <Palette /> },
    { number: "03", title: "Development", description: "Sprints focus on front-end (UI components) and back-end (APIs, databases like Firebase/MongoDB) coding, with daily stand-ups, code reviews via GitHub, and integration testing for seamless feature delivery.", icon: <GitBranch /> },
    { number: "04", title: "Testing", description: "Multi-layered QA includes unit tests (Jest), end-to-end automation (Appium), security scans (Burp Suite), and beta releases for real-user validation, targeting zero critical bugs at launch.", icon: <TestTube2 /> },
    { number: "05", title: "Deployment", description: "Orchestrated rollouts to App Store/Google Play, including ASO, crash reporting setup, and phased releases to monitor initial metrics like DAU and retention.", icon: <Rocket /> },
    { number: "06", title: "Post-Launch Support", description: "90-day warranty for refinements, followed by retainer options; includes analytics reviews, OS update adaptations, and growth hacking sessions to iterate based on post-launch data.", icon: <LifeBuoy /> }
];

const whyChooseUsData = [
    {
        icon: Cpu,
        title: "Experienced Team",
        description: "A 25+ member squad of certified developers (Apple/Google certified), designers, and PMs with 7-15 years in mobile, hailing from top firms like Google and Meta, versed in niches from gaming to telemedicine."
    },
    {
        icon: Zap,
        title: "Cutting-Edge Technologies",
        description: "We wield the latest—Swift 6, Kotlin Multiplatform, Flutter 3.0, and emerging tools like Jetpack Compose—for apps that are future-proof against trends like 5G, foldables, and edge AI."
    },
    {
        icon: Users,
        title: "Client-Centric Approach",
        description: "Your goals are our north star; we embed you via shared workspaces (Notion/Slack), flexible scoping, and ROI-focused pivots, ensuring 100% alignment."
    },
    {
        icon: CheckCheck,
        title: "Quality Assurance",
        description: "End-to-end testing suites catch 99.7% of defects, with ISO 27001-certified processes for secure, reliable deliverables that outperform industry benchmarks."
    },
    {
        icon: BarChart3,
        title: "Transparent Communication",
        description: "Weekly progress reports, milestone-based invoicing, and 24/7 access to a client portal—no surprises, just synchronized success."
    },
    {
        icon: TrendingUp,
        title: "Proven Scalability & ROI",
        description: "From bootstrapped MVPs ($10K starters) to enterprise suites ($100K+), our apps drive 2-4x engagement lifts, backed by case studies like a fintech app hitting 500K downloads in year one."
    },
    {
        icon: Sparkles,
        title: "Innovation Guarantee",
        description: "Free tech audits and concept ideation sessions to infuse your project with bleeding-edge features like blockchain wallets or metaverse integrations."
    }
];

const faqs = [
    {
        question: "How long does it take to build a mobile app?",
        answer: "The timeline for mobile app development varies based on complexity. A simple app might take 2-3 months, while a more complex app with a custom backend could take 6 months or more. We provide a detailed timeline after the initial discovery phase."
    },
    {
        question: "How much does it cost to develop a mobile app?",
        answer: "The cost depends on various factors like features, platforms (iOS, Android, or both), and complexity of the design. We provide a detailed quote after understanding your requirements. Contact us for a free consultation and estimate."
    },
    {
        question: "Do you provide support and maintenance after the app is launched?",
        answer: "Yes, we offer flexible support and maintenance packages to ensure your app remains up-to-date with the latest OS versions, bug-free, and secure. We can also work with you to add new features over time."
    },
    {
        question: "Will my app be published on the App Store and Google Play?",
        answer: "Absolutely. We handle the entire submission process for both the Apple App Store and Google Play Store, ensuring your app meets all guidelines and is successfully published."
    }
];

export default function MobileAppDevelopmentPage() {
    return (
        <div className="min-h-screen bg-white text-silver-900">
            <Header variant="light" />

            <main className="flex-grow">
                <ServiceHero
                    badge="Mobile App Development"
                    title={heroContent.subtitle}
                    description={heroContent.description}
                    image={heroContent.image}
                    icon={Smartphone}
                    primaryCta={{ label: "Get a Free Consultation", href: "/#contact" }}
                    secondaryCta={{ label: "View Our Portfolio", href: "/#our-work" }}
                    highlights={["iOS & Android", "Cross-platform", "App Store Ready"]}
                />

                <ServiceIntroSection
                    eyebrow="Why It Matters"
                    title="Mobile Experiences That Users Love"
                    content={introduction}
                    highlights={[
                        { icon: Smartphone, label: "Native & Cross-Platform", description: "Reach users on iOS, Android, and beyond with polished mobile apps." },
                        { icon: Zap, label: "Performance Optimized", description: "Fast, responsive apps engineered for smooth everyday use." },
                        { icon: Users, label: "Deep User Engagement", description: "Intuitive interfaces that keep your audience coming back." },
                    ]}
                />

                <ServiceOfferingsSection
                    eyebrow="What We Offer"
                    title="Our Mobile App Development Services"
                    description="A full spectrum of services to build, launch, and maintain a powerful mobile presence."
                    items={appServices}
                />

                <ServiceProcessSection
                    eyebrow="How We Work"
                    title="Our Development Process"
                    description="Our agile, iterative process is designed for flexibility and excellence, typically spanning 8-16 weeks for full-cycle projects, with bi-weekly demos to foster collaboration and mitigate risks."
                    steps={developmentProcess}
                    variant="white"
                />

                <ServiceWhyChooseSection
                    eyebrow="Why Brolytics"
                    title="Why Choose Us for Mobile App Development"
                    description="In a sea of development firms, we stand out by blending artistry, engineering, and strategy to deliver apps that don't just function—they flourish. Here's what powers our 98% client retention rate."
                    items={whyChooseUsData}
                />

                <ServiceFaqSection faqs={faqs} />
                
                {/* ── DYNAMIC PRICING ── */}


                <ServiceCtaSection
                    title="Ready to Build Your Next Big App?"
                    description="Ignite your mobile revolution—schedule a no-obligation 30-minute ideation session now, complete with a custom feasibility report and prototype sketch. Let's code the future together; your breakthrough app awaits!"
                    ctaLabel="Request a Quote Today"
                />
            </main>

            <Footer />
        </div>
    );
}
