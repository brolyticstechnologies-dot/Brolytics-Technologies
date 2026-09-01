"use client";

import {
  Bot, GitBranch, BarChart3, Layers, Settings, Sparkles, Search,
  TestTube2, CheckCheck, Rocket, TrendingUp, Cpu, Zap, Shield, Users,
  Award, Lightbulb,
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
    title: "Pioneering Intelligent Futures: Comprehensive AI Services for Business Transformation",
    subtitle: "Unlock AI's Potential: Innovate, Automate, and Scale with Intelligent Solutions.",
    description: "Empower your organization with cutting-edge AI services that integrate seamlessly with cloud ecosystems, harness data-driven insights, and ensure ethical, scalable deployment to drive unprecedented growth in 2025 and beyond.",
    image: {
        src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlfGVufDB8fHx8MTc0ODQwMzYwMHww&ixlib=rb-4.1.0&q=80&w=1080",
        alt: "Abstract artificial intelligence concept with robotics",
        hint: "artificial intelligence"
    }
};

const introduction = "In 2025, Artificial Intelligence (AI) has solidified its role as the bedrock of modern IT services, catalyzing innovation, operational efficiency, and informed decision-making across every sector imaginable. Our AI services are meticulously designed around pivotal trends: human-AI collaboration, multimodal models, and ROI-centric implementations that deliver measurable outcomes.";

const aiServices = [
    {
        title: "AI Consulting & Strategy",
        description: "Craft bespoke AI roadmaps that align with your strategic imperatives, mitigate risks, and maximize value.",
        icon: <Bot className="w-8 h-8" />,
        keyFeatures: [
            "AI Strategy Advisory & Use Case Prioritization.",
            "Ethical AI Governance Frameworks (GDPR, EU AI Act).",
            "Maturity Assessments & ROI Evaluation.",
            "Change Management for Smooth Adoption."
        ]
    },
    {
        title: "Development & Engineering",
        description: "We engineer bespoke AI and machine learning solutions that power your innovations, from concept to production-ready code.",
        icon: <GitBranch className="w-8 h-8" />,
        keyFeatures: [
            "Custom AI/ML Model Development (TensorFlow, PyTorch).",
            "Generative AI Implementation (GPT-4o Fine-tuning).",
            "Neural Network Design for Complex Tasks.",
            "Edge AI Optimization for On-device Inference."
        ]
    },
    {
        title: "Data & Analytics",
        description: "Unlock the potential of your data by engineering pipelines that fuel AI with clean, real-time intelligence.",
        icon: <BarChart3 className="w-8 h-8" />,
        keyFeatures: [
            "AI-ready Data Engineering (ETL/ELT with Spark).",
            "Predictive Analytics & Time-series Forecasting.",
            "Big Data AI Pipelines with Kafka & Flink.",
            "Advanced Visualization with AI-driven Narratives."
        ]
    },
    {
        title: "Specialized AI Applications",
        description: "Tailor AI to solve domain-specific challenges with applications that interpret language, perceive visuals, and converse naturally.",
        icon: <Layers className="w-8 h-8" />,
        keyFeatures: [
            "Natural Language Processing (NLP) Solutions.",
            "Computer Vision with YOLO or Vision Transformers.",
            "Conversational AI (Chatbots/Virtual Assistants).",
            "CRM/ERP Integration for Hyper-personalization."
        ]
    },
    {
        title: "Integration & Operations",
        description: "Seamlessly weave AI into your operational fabric, from legacy systems to cloud-native environments, ensuring reliability and security.",
        icon: <Settings className="w-8 h-8" />,
        keyFeatures: [
            "AI Integration with MuleSoft or Kong.",
            "MLOps & DevOps for AI (Kubeflow, MLflow).",
            "Hybrid Process Automation (RPA + AI).",
            "AI Monitoring, Security & Scalability."
        ]
    },
    {
        title: "Emerging & Industry-Specific",
        description: "Stay ahead with forward-looking AI that fuses with IoT for intelligent ecosystems or is tailored to your industry's unique demands.",
        icon: <Sparkles className="w-8 h-8" />,
        keyFeatures: [
            "AIoT (AI + IoT) for Smart Factories & Health.",
            "Multimodal AI (Text-to-Visual) Solutions.",
            "Sector-Tailored AI (Healthcare, Finance, etc.).",
            "Proof-of-Concept Accelerators."
        ]
    }
];

const developmentProcess = [
    { number: "01", title: "Discovery & Ideation", description: "Immersive sessions to map pain points, gather requirements, and brainstorm use cases, culminating in a prioritized backlog and ethical impact assessment.", icon: <Search /> },
    { number: "02", title: "Prototyping & Validation", description: "Low-code PoCs with tools like Google Colab, user testing via surveys and A/B pilots, refining based on feedback loops.", icon: <TestTube2 /> },
    { number: "03", title: "Development & Integration", description: "Parallel sprints for model building, data pipelines, and system hooks, with daily integrations and code reviews for quality.", icon: <GitBranch /> },
    { number: "04", title: "Testing & Assurance", description: "Multi-faceted QA—unit tests for models, integration for APIs, ethical audits for bias, and stress testing for scalability—targeting 99.9% reliability.", icon: <CheckCheck /> },
    { number: "05", title: "Deployment & Launch", description: "Phased rollouts with blue-green strategies, training handovers, and live monitoring dashboards for immediate value realization.", icon: <Rocket /> },
    { number: "06", title: "Optimization & Evolution", description: "Continuous MLOps cycles, quarterly reviews with KPI dashboards, and adaptive retraining to evolve with new data and regulations.", icon: <TrendingUp /> }
];

const whyChooseUsData = [
    {
        icon: Cpu,
        title: "Proven Expertise",
        description: "A 50+ strong team of PhD-level AI scientists, certified architects (AWS/GCP), and domain specialists with 10+ years, having powered unicorns in gen AI and edge computing."
    },
    {
        icon: Zap,
        title: "Innovation at Scale",
        description: "Access to proprietary toolkits and partnerships with NVIDIA, OpenAI, and IBM, ensuring bleeding-edge capabilities like quantum-inspired optimization."
    },
    {
        icon: Shield,
        title: "Ethical & Secure by Design",
        description: "Zero-tolerance for bias with automated fairness checks; fortified with ISO 42001 AI management and end-to-end encryption."
    },
    {
        icon: BarChart3,
        title: "ROI-Centric Delivery",
        description: "Transparent pricing from $50K pilots to $1M+ enterprise suites, with guaranteed 3:1 ROI via performance clauses and post-project audits."
    },
    {
        icon: Users,
        title: "Collaborative Partnership",
        description: "Embedded PMs, co-innovation labs, and 24/7 support via Slack/Jira for seamless alignment and knowledge transfer."
    },
    {
        icon: Award,
        title: "Future-Proof Agility",
        description: "Modular designs for easy upgrades, plus foresight reports on trends like agentic AI or neuromorphic computing."
    }
];

const faqs = [
    {
        question: "How long does a typical AI project take?",
        answer: "Project timelines vary based on complexity and scope. Simple projects typically take 4-6 weeks, while complex enterprise solutions may take 3-6 months. We provide detailed timelines during the planning phase."
    },
    {
        question: "Do you provide ongoing support and maintenance?",
        answer: "Yes, we offer comprehensive support packages including bug fixes, security updates, performance monitoring, and feature enhancements. Our support team is available 24/7 for critical issues."
    },
    {
        question: "Can you integrate with existing systems?",
        answer: "Absolutely! We specialize in seamless integrations with existing systems, databases, and third-party services. Our team has experience with various APIs and integration patterns."
    },
    {
        question: "What's included in the project cost?",
        answer: "Our pricing includes project planning, design, development, testing, deployment, documentation, and initial support. Additional features or extended support can be added as needed."
    }
];

export default function AIServicesPage() {
    return (
        <div className="min-h-screen bg-white text-silver-900">
            <Header variant="light" />

            <main className="flex-grow">
                <ServiceHero
                    badge="AI Services"
                    title={heroContent.subtitle}
                    description={heroContent.description}
                    image={heroContent.image}
                    icon={Bot}
                    primaryCta={{ label: "Schedule a Free AI Strategy Session", href: "/#contact" }}
                    secondaryCta={{ label: "Explore Our AI Case Studies", href: "/#our-work" }}
                    highlights={["Automation", "ML Models", "Smart Insights"]}
                />

                <ServiceIntroSection
                    eyebrow="Why It Matters"
                    title="Intelligence That Transforms Your Business"
                    content={introduction}
                    highlights={[
                        { icon: Bot, label: "Smart Automation", description: "Automate repetitive tasks and free your team for high-value work." },
                        { icon: Lightbulb, label: "Innovation at Scale", description: "Leverage AI to unlock new capabilities and competitive advantages." },
                        { icon: BarChart3, label: "Measurable Outcomes", description: "ROI-focused implementations with clear, trackable results." },
                    ]}
                />

                <ServiceOfferingsSection
                    eyebrow="What We Offer"
                    title="Our AI Services"
                    description="A complete ecosystem of AI solutions to drive innovation and efficiency."
                    items={aiServices}
                />

                <ServiceProcessSection
                    eyebrow="How We Work"
                    title="Our AI Process"
                    description="We deploy a structured yet agile methodology, blending design thinking with DevOps principles, to deliver AI solutions in 6-18 weeks."
                    steps={developmentProcess}
                    variant="white"
                />

                <ServiceWhyChooseSection
                    eyebrow="Why Brolytics"
                    title="Why Choose Us for AI Services?"
                    description="In a landscape where 70% of AI projects falter, we excel by prioritizing outcomes over hype, delivering 95% on-time projects with a 4.9/5 satisfaction score."
                    items={whyChooseUsData}
                />

                <ServiceFaqSection faqs={faqs} />
                
                {/* ── DYNAMIC PRICING ── */}


                <ServiceCtaSection
                    title="Ready to Infuse Intelligence into Your Enterprise?"
                    description="Seize the AI advantage—claim your complimentary 45-minute audit and receive a personalized maturity scorecard plus trend forecast. Let's architect your intelligent tomorrow, starting today!"
                    ctaLabel="Request a Custom AI Roadmap"
                />
            </main>

            <Footer />
        </div>
    );
}
