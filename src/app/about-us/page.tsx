"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import {
  Linkedin, Quote, ArrowRight, ArrowUpRight, Users, Star,
  Globe, Smartphone, Bot, Code, Lightbulb, Handshake, ShieldCheck, Leaf,
  Briefcase, Sparkles, Building2, Rocket, Mail,
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import { OurClients } from "@/components/sections/our-clients";
import { OurWork } from "@/components/sections/our-work";

// ── Data ──────────────────────────────────────────────────────────────────

interface TeamMember {
  name: string;
  role: string;
  image: string;
  tagline?: string;
  social: { linkedin: string; email?: string; };
}

const teamMembers: TeamMember[] = [
  {
    name: "Faiyaz Mujtaba",
    role: "Project Manager",
    image: "/faiyaz.jpeg",
    tagline: "Turning ideas into reality",
    social: { 
      linkedin: "https://linkedin.com/in/faiyaz-mujtaba",
      email: "mailto:brolyticsteechnologies@gmail.com"
    },
  },
];

const testimonials = [
  {
    quote: "Brolytics Technologies transformed our digital presence with a stunning website and a brilliant marketing strategy. Their team is professional, creative, and truly dedicated to client success.",
    name: "Syed Sayam Hussain",
    role: "CEO of Globolosys Fashion",
  },
  {
    quote: "The mobile app developed by Brolytics Technologies has been a game-changer for our business. It's intuitive, fast, and our users love it. The development process was seamless from start to finish.",
    name: "Tp Singh",
    role: "Founder of Gts Car Rental",
  },
  {
    quote: "Working with Brolytics Technologies on our AI integration project was a fantastic experience. They delivered a solution that has significantly improved our operational efficiency.",
    name: "Harsh Singh Rajput",
    role: "CTO of Datawise",
  },
];

const expertise = [
  {
    icon: Globe,
    title: "Web Development",
    description: "From responsive, SEO-optimized websites to scalable e-commerce platforms built on frameworks like React, Node.js, and Laravel, we create digital storefronts that captivate users and convert visitors into loyal customers.",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Whether it's a cross-platform app using Flutter or native iOS/Android solutions with Swift and Kotlin, we deliver intuitive, feature-rich applications that enhance user engagement and streamline operations on the go.",
  },
  {
    icon: Bot,
    title: "AI & Machine Learning Systems",
    description: "Leveraging tools like TensorFlow, PyTorch, and advanced NLP models, we build intelligent systems for predictive analytics, chatbots, recommendation engines, and automation — empowering your business with data-driven insights.",
  },
  {
    icon: Code,
    title: "Custom Software Solutions",
    description: "Our bespoke software development covers everything from enterprise resource planning (ERP) systems to CRM integrations and IoT-enabled applications, ensuring seamless scalability, security, and performance.",
  },
];

const values = [
  {
    icon: Lightbulb,
    title: "Innovation First",
    description: "We push boundaries, experimenting with emerging tech to solve tomorrow's problems today.",
  },
  {
    icon: Handshake,
    title: "Client Partnership",
    description: "You're not just a client — you're a collaborator. We listen, adapt, and co-create to align our work with your vision and goals.",
  },
  {
    icon: ShieldCheck,
    title: "Excellence & Integrity",
    description: "Every line of code, every design decision, is held to the highest standards of quality, security, and transparency.",
  },
  {
    icon: Leaf,
    title: "Sustainability & Impact",
    description: "We prioritize green computing practices and solutions that contribute positively to society, creating lasting value for your business and the world.",
  },
];

const journey = [
  {
    icon: Building2,
    title: "Witech",
    description: "Started as a proprietorship firm with big ambitions and a passion for technology.",
    active: false,
  },
  {
    icon: Rocket,
    title: "Brolytics Technologies Pvt. Ltd.",
    description: "Transformed into a certified private limited company to drive growth and enhance client satisfaction.",
    active: false,
  },
  {
    icon: Sparkles,
    title: "Today",
    description: "50+ professionals delivering impactful digital solutions for 26+ happy clients worldwide.",
    active: true,
  },
];

const upskills = ["Blockchain", "AWS", "Azure", "Google Cloud", "Cybersecurity", "AI & ML"];

const heroStats = [
  { icon: Users,     value: "26+",  label: "Happy Clients" },
  { icon: Briefcase, value: "50+",  label: "Projects Delivered" },
  { icon: Handshake, value: "50+",  label: "Professionals" },
  { icon: Star,      value: "4.9/5",label: "Client Rating" },
];

// ── Section heading helper ───────────────────────────────────────────────

function SectionHeading({ badge, title, accent, subtitle, isVisible }: {
  badge: string;
  title: string;
  accent?: string;
  subtitle?: string;
  isVisible: boolean;
}) {
  return (
    <div className={cn(
      "text-center mb-14 md:mb-16 transition-all duration-1000",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    )}>
      <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-silver-200 bg-white shadow-sm">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-primary/60 animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
        </span>
        <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-silver-600">{badge}</span>
      </div>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-silver-900 mb-4">
        {title}{accent && <> <span className="text-gradient-red">{accent}</span></>}
      </h2>
      {subtitle && (
        <p className="text-silver-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}

// ── Cards ────────────────────────────────────────────────────────────────

function FeatureCard({ icon: Icon, title, description, index, isVisible }: {
  icon: React.ElementType;
  title: string;
  description: string;
  index: number;
  isVisible: boolean;
}) {
  return (
    <div
      className={cn(
        "group relative bg-white border border-silver-200 rounded-2xl p-7 transition-all duration-700 hover:border-primary/30 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-20px_rgba(143,38,71,0.25)]",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl" />
      <div className="inline-flex p-3 rounded-xl bg-primary/10 group-hover:bg-primary group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-500 mb-5">
        <Icon className="h-6 w-6 text-primary group-hover:text-white transition-colors duration-500" />
      </div>
      <h3 className="text-lg font-black text-silver-900 mb-2.5 group-hover:text-primary transition-colors duration-300">{title}</h3>
      <p className="text-sm text-silver-500 leading-relaxed">{description}</p>
    </div>
  );
}

function TeamMemberCard({ member, index, isVisible }: {
  member: TeamMember;
  index: number;
  isVisible: boolean;
}) {
  const isEven = index % 2 === 0;
  const accentGradient = isEven ? "via-primary" : "via-silver-700";
  const glowShadow = isEven ? "group-hover:shadow-[0_0_12px_rgba(143,38,71,0.6)]" : "group-hover:shadow-[0_0_12px_rgba(71,85,105,0.6)]";

  return (
    <div
      className={cn(
        "group relative flex flex-col h-full bg-gradient-to-b from-white to-silver-50/50 border border-silver-200 rounded-3xl p-4 sm:p-6 md:p-8 text-center transition-all duration-500 hover:-translate-y-[6px] hover:border-primary/40 hover:shadow-[0_24px_50px_-16px_rgba(143,38,71,0.25)] overflow-hidden",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Subtle Dot Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '16px 16px' }} />

      {/* Top Accent Ribbon */}
      <div className={cn("absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700", accentGradient, glowShadow)} />
      
      {/* Profile Photo */}
      <div className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-40 md:h-40 mx-auto mb-4 md:mb-6 flex-shrink-0 transition-all duration-500 group-hover:drop-shadow-xl z-10">
        {/* Glow Ring with slow pulse on hover */}
        <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-primary/10 via-silver-200 to-primary/5 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500 group-hover:animate-pulse" />
        
        <div className="relative w-full h-full rounded-full p-[2px] bg-silver-200 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:via-primary/70 group-hover:to-primary/30 transition-all duration-500 shadow-sm group-hover:shadow-md">
          <div className="relative w-full h-full rounded-full p-[2px] md:p-[4px] bg-white">
            <div className="relative w-full h-full rounded-full overflow-hidden">
              <Image
                src={member.image}
                alt={`${member.name} - ${member.role}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            {/* Active Status Dot */}
            <div className="absolute bottom-[2px] right-[2px] sm:bottom-[4px] sm:right-[4px] md:bottom-[8px] md:right-[8px] w-[10px] h-[10px] sm:w-[12px] sm:h-[12px] md:w-[14px] md:h-[14px] bg-emerald-500 rounded-full border-[1.5px] md:border-[2.5px] border-white shadow-sm z-20" />
          </div>
        </div>
      </div>
      
      {/* Name and Designation */}
      <div className="relative flex-grow flex flex-col justify-center items-center z-10">
        <h3 className="text-base sm:text-lg md:text-xl font-black text-silver-900 tracking-[0.02em] mb-1.5 md:mb-2 group-hover:text-primary transition-colors duration-300">{member.name}</h3>
        
        <span className="inline-flex items-center justify-center px-2 py-0.5 sm:px-3 sm:py-1 md:px-3.5 md:py-1.5 rounded-full bg-gradient-to-r from-primary/10 to-transparent border border-primary/20 text-primary text-[9px] sm:text-[10px] md:text-[11px] font-bold">
          {member.role}
        </span>

        {member.tagline && (
          <p className="text-[11px] sm:text-xs md:text-sm font-medium text-silver-500 italic mt-2 md:mt-3 mb-1 line-clamp-2 px-1 md:px-2 leading-snug">
            "{member.tagline}"
          </p>
        )}
        
        {(member.social.linkedin || member.social.email) && (
          <>
            <div className="w-8 md:w-10 h-px bg-silver-200 my-3 md:my-4" />
            <div className="flex items-center justify-center gap-2 md:gap-2.5">
              {member.social.linkedin && (
                <Link href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full bg-silver-100 text-silver-500 hover:bg-primary hover:text-white hover:shadow-md transition-all duration-300" aria-label={`Visit ${member.name}'s LinkedIn profile`}>
                  <Linkedin className="h-3 w-3 md:h-3.5 md:w-3.5" />
                </Link>
              )}
              {member.social.email && (
                <Link href={member.social.email} className="flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full bg-silver-100 text-silver-500 hover:bg-primary hover:text-white hover:shadow-md transition-all duration-300" aria-label={`Email ${member.name}`}>
                  <Mail className="h-3 w-3 md:h-3.5 md:w-3.5" />
                </Link>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────

export default function AboutUsPage() {
  const [loaded, setLoaded] = useState(false);
  const storyRef        = useScrollAnimation({ threshold: 0.1 });
  const expertiseRef    = useScrollAnimation({ threshold: 0.1 });
  const valuesRef       = useScrollAnimation({ threshold: 0.1 });
  const teamRef         = useScrollAnimation({ threshold: 0.2 });
  const testimonialsRef = useScrollAnimation({ threshold: 0.1 });

  useEffect(() => { const t = setTimeout(() => setLoaded(true), 150); return () => clearTimeout(t); }, []);

  return (
    <div className="bg-white text-silver-900 overflow-x-hidden">
      <Header variant="light" />
      <main>

        {/* ══════ HERO ══════ */}
        <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-white pt-24 pb-16 md:pt-28 md:pb-20">
          <style jsx>{`
            @keyframes shine {
              from { transform: translateX(-150%) skewX(-20deg); }
              to { transform: translateX(250%) skewX(-20deg); }
            }
            .about-cta-shine::after {
              content: '';
              position: absolute;
              top: 0;
              bottom: 0;
              width: 40%;
              background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.35), transparent);
              transform: translateX(-150%) skewX(-20deg);
            }
            .about-cta-shine:hover::after {
              animation: shine 0.8s ease-out;
            }
            @media (prefers-reduced-motion: reduce) {
              .about-cta-shine:hover::after { animation: none; }
            }
          `}</style>

          {/* Ambient background */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-white via-silver-50 to-white" />
            <div className="absolute -top-40 -right-32 w-[520px] h-[520px] rounded-full bg-silver-300/35 blur-[120px] animate-aurora-drift" />
            <div className="absolute top-1/3 -left-40 w-[480px] h-[480px] rounded-full bg-primary/[0.06] blur-[120px] animate-aurora-drift" style={{ animationDelay: "5s" }} />
            <div
              className="absolute inset-0 opacity-50"
              style={{
                backgroundImage: `linear-gradient(hsl(214 32% 91% / .45) 1px, transparent 1px), linear-gradient(90deg, hsl(214 32% 91% / .45) 1px, transparent 1px)`,
                backgroundSize: "56px 56px",
                maskImage: "radial-gradient(ellipse 75% 55% at 50% 35%, black, transparent)",
                WebkitMaskImage: "radial-gradient(ellipse 75% 55% at 50% 35%, black, transparent)",
              }}
            />
          </div>

          <div className="relative z-10 container mx-auto px-6 max-w-7xl">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-10 items-center">

              {/* Left — copy */}
              <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
                {loaded && (
                  <div
                    className="animate-fade-up inline-flex items-center gap-2.5 px-4 py-2 mb-7 rounded-full border border-silver-200 bg-white/75 backdrop-blur-md shadow-sm"
                    style={{ animationDelay: "0.05s" }}
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-primary/60 animate-ping" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                    </span>
                    <Rocket className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                    <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-silver-600">Innovation Driven</span>
                  </div>
                )}

                {loaded && (
                  <h1
                    className="animate-fade-up text-[2rem] sm:text-4xl md:text-5xl lg:text-[3.4rem] font-black tracking-tight leading-[1.08] mb-6"
                    style={{ animationDelay: "0.12s" }}
                  >
                    <span className="text-silver-900">The Story &amp; People</span>
                    <span className="text-silver"> Behind:</span>
                    <span className="block text-gradient-red">Brolytics Technologies.</span>
                  </h1>
                )}

                {loaded && (
                  <p
                    className="animate-fade-up text-base md:text-lg text-silver-500 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-9"
                    style={{ animationDelay: "0.22s" }}
                  >
                    Building the future with innovation, integrity, and a passion for
                    excellence that transforms businesses and empowers communities.
                  </p>
                )}

                {loaded && (
                  <div
                    className="animate-fade-up flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10"
                    style={{ animationDelay: "0.32s" }}
                  >
                    <Button
                      size="lg"
                      asChild
                      className="about-cta-shine group relative overflow-hidden bg-primary hover:bg-primary text-white font-bold px-7 sm:px-8 py-6 text-base rounded-2xl transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-primary/35"
                    >
                      <Link href="#who-we-are" className="flex items-center gap-2.5">
                        <Sparkles className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                        <span>Discover Our Story</span>
                        <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                      </Link>
                    </Button>

                    <Button
                      size="lg"
                      variant="outline"
                      asChild
                      className="group border border-silver-300 hover:border-primary/40 bg-white/75 hover:bg-white text-silver-800 font-bold px-7 sm:px-8 py-6 text-base rounded-2xl transition-all duration-300 hover:scale-[1.03] backdrop-blur-sm shadow-sm"
                    >
                      <Link href="/#contact" className="flex items-center gap-2">
                        <span>Start Your Project</span>
                        <ArrowUpRight className="h-5 w-5 text-primary transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                      </Link>
                    </Button>
                  </div>
                )}

                {loaded && (
                  <div
                    className="animate-fade-up flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-4"
                    style={{ animationDelay: "0.42s" }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2.5">
                        {["from-silver-300 to-silver-500", "from-primary/70 to-primary", "from-silver-400 to-silver-600"].map((g, i) => (
                          <span key={i} className={cn("h-8 w-8 rounded-full ring-2 ring-white bg-gradient-to-br shadow-sm", g)} />
                        ))}
                        <span className="h-8 w-8 rounded-full ring-2 ring-white bg-silver-900 flex items-center justify-center text-[9px] font-bold text-white shadow-sm">26+</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-0.5">
                          {[0, 1, 2, 3, 4].map((i) => (
                            <Star key={i} className="h-3 w-3 fill-primary text-primary" aria-hidden="true" />
                          ))}
                        </div>
                        <p className="text-[11px] text-silver-500 mt-0.5">
                          <span className="font-bold text-silver-900">4.9/5</span> client rating
                        </p>
                      </div>
                    </div>

                    {heroStats.slice(0, 2).map((s, i) => {
                      const Icon = s.icon;
                      return (
                        <div key={s.label} className={cn("flex items-center gap-2.5", i > 0 && "pl-6 border-l border-silver-200")}>
                          <div className="p-1.5 rounded-lg bg-primary/10">
                            <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                          </div>
                          <div>
                            <p className="text-base font-black text-silver-900 leading-none">{s.value}</p>
                            <p className="text-[10px] text-silver-400 uppercase tracking-wider font-medium mt-0.5">{s.label}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Right — visual */}
              {loaded && (
                <div className="animate-fade-up relative mx-auto w-full max-w-[460px] lg:max-w-none" style={{ animationDelay: "0.25s" }}>
                  <div className="relative mx-auto max-w-[460px]">
                    <div className="absolute -inset-5 rounded-[2.25rem] bg-silver-200/40 blur-2xl pointer-events-none" />
                    <div className="absolute -inset-2 rounded-[1.85rem] bg-gradient-to-br from-silver-200/50 to-transparent rotate-2" />
                    <div className="absolute -inset-1 rounded-[1.65rem] bg-gradient-to-tr from-primary/[0.08] via-transparent to-silver-200/40 -rotate-1" />

                    <div className="relative rounded-[1.5rem] p-[2px] bg-gradient-to-br from-silver-300 via-white to-silver-300 shadow-2xl shadow-silver-900/12">
                      <div className="relative overflow-hidden rounded-[1.45rem] bg-silver-100 aspect-[4/5] sm:aspect-[5/6]">
                        <Image
                          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
                          alt="Brolytics Technologies team working collaboratively"
                          fill
                          priority
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-silver-900/45 via-transparent to-transparent" />

                        {/* Journey chip */}
                        <div className="absolute top-4 left-4 flex items-center gap-2 rounded-xl glass-light px-3 py-2 shadow-md">
                          <div className="p-1.5 rounded-lg bg-primary/10">
                            <Building2 className="h-4 w-4 text-primary" aria-hidden="true" />
                          </div>
                          <span className="text-xs font-semibold text-silver-800">Formerly Witech — Pvt. Ltd.</span>
                        </div>

                        {/* Values pills */}
                        <div className="absolute bottom-4 left-4 right-4 rounded-2xl glass-light px-4 py-3 shadow-lg">
                          <div className="flex flex-wrap gap-2 justify-center">
                            {["Innovation", "Excellence", "Trust"].map((item) => (
                              <span
                                key={item}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/80 border border-silver-200 text-[11px] font-semibold text-silver-700"
                              >
                                <ShieldCheck className="h-3 w-3 text-primary flex-shrink-0" aria-hidden="true" />
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Floating stat card */}
                    <div
                      className="absolute -top-4 -right-4 sm:-right-6 rounded-2xl glass-light px-4 py-3 shadow-xl border border-white/60 animate-float-y"
                      style={{ animationDelay: "0.5s" }}
                    >
                      <p className="text-2xl font-black text-silver-900 leading-none">50+</p>
                      <p className="text-[10px] text-silver-500 uppercase tracking-wider font-semibold mt-1">Professionals</p>
                    </div>

                    {/* Floating accent */}
                    <div className="absolute -bottom-3 -left-3 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/30 rotate-6">
                      <Sparkles className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-silver-300 to-transparent" />
        </section>

        {/* ══════ WHO WE ARE ══════ */}
        <section id="who-we-are" ref={storyRef.ref} className="relative py-24 bg-silver-50 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-silver-300/45 rounded-full blur-[120px] animate-aurora-drift" />
          </div>

          <div className="relative container mx-auto px-6 max-w-7xl">
            <SectionHeading
              badge="Our Story"
              title="Who We"
              accent="Are"
              subtitle="Brolytics Technologies is a certified organization in India. Formerly operating as Witech, a proprietorship firm, we transformed into a private limited company to drive growth and enhance client satisfaction."
              isVisible={storyRef.isVisible}
            />

            {/* Team narrative + journey timeline */}
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6 max-w-6xl mx-auto items-stretch">

              {/* Left — the heart of Brolytics */}
              <div className={cn(
                "transition-all duration-1000 delay-200",
                storyRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}>
                <div className="group relative h-full bg-white border border-silver-200 rounded-3xl p-8 md:p-10 shadow-sm overflow-hidden transition-all duration-500 hover:border-primary/25 hover:shadow-[0_24px_50px_-24px_rgba(143,38,71,0.2)]">
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                  <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-primary/[0.04] blur-2xl pointer-events-none" />

                  <div className="relative">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2.5 rounded-xl bg-primary/10">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-black text-silver-900">Our Team: The Heart of Brolytics</h3>
                    </div>

                    <div className="space-y-4 text-silver-500 leading-relaxed text-sm md:text-base">
                      <p>Our success is fueled by a talented team of <span className="font-semibold text-silver-900">over 50 professionals</span> — seasoned developers, UI/UX designers, data scientists, project managers, and industry experts — who bring a wealth of experience from global tech hubs like <span className="font-semibold text-silver-900">Silicon Valley, Bangalore, and Berlin</span>. What sets us apart is our <span className="font-semibold text-silver-900">culture of collaboration and continuous learning</span>. We thrive on tackling complex challenges with creative, out-of-the-box strategies, drawing from diverse backgrounds to deliver solutions that are as innovative as they are practical.</p>
                      <p>At Brolytics Technologies, professional growth is non-negotiable. Our team members regularly upskill through certifications in emerging technologies. This ensures we're always at the forefront, ready to navigate the latest trends and disruptions in the digital landscape.</p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-silver-100">
                      <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-silver-400 mb-3.5">Always Upskilling In</p>
                      <div className="flex flex-wrap gap-2">
                        {upskills.map(t => (
                          <span key={t} className="px-3.5 py-1.5 rounded-full bg-silver-50 border border-silver-200 text-xs font-semibold text-silver-600 hover:border-primary/40 hover:text-primary hover:bg-primary/[0.04] transition-all duration-300 cursor-default">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right — journey timeline + philosophy */}
              <div
                className={cn(
                  "flex flex-col gap-6 transition-all duration-1000",
                  storyRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: "350ms" }}
              >
                {/* Journey timeline */}
                <div className="relative flex-1 bg-white border border-silver-200 rounded-3xl p-8 shadow-sm overflow-hidden transition-all duration-500 hover:border-primary/25 hover:shadow-[0_24px_50px_-24px_rgba(143,38,71,0.2)]">
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                  <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-silver-400 mb-6">Our Journey</p>

                  <div className="relative">
                    <div className="absolute left-[15px] top-3 bottom-3 w-px bg-gradient-to-b from-silver-200 via-silver-200 to-primary/40" />
                    <div className="space-y-7">
                      {journey.map((step, i) => {
                        const Icon = step.icon;
                        return (
                          <div key={i} className="relative flex gap-4">
                            <span className={cn(
                              "relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300",
                              step.active
                                ? "bg-primary border-primary text-white shadow-lg shadow-primary/30"
                                : "bg-white border-silver-200 text-silver-400"
                            )}>
                              {step.active && <span className="absolute inline-flex h-full w-full rounded-full bg-primary/50 animate-ping" />}
                              <Icon className="relative h-3.5 w-3.5" />
                            </span>
                            <div className="pt-1">
                              <p className={cn("text-sm font-black leading-tight", step.active ? "text-primary" : "text-silver-900")}>{step.title}</p>
                              <p className="text-xs text-silver-500 leading-relaxed mt-1.5">{step.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Philosophy quote — dark accent card */}
                <div className="relative bg-silver-900 rounded-3xl p-8 overflow-hidden">
                  <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
                  <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                  <Quote className="h-7 w-7 text-primary mb-4" />
                  <p className="text-white text-lg md:text-xl font-bold leading-snug mb-4">We don't just build code — we architect ecosystems that foster long-term growth.</p>
                  <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-silver-300">Our Philosophy</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════ CORE EXPERTISE ══════ */}
        <section ref={expertiseRef.ref} className="relative py-24 bg-white overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-white via-silver-50/60 to-white" />
            <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-silver-300/40 rounded-full blur-[120px] animate-aurora-drift" />
          </div>

          <div className="relative container mx-auto px-6 max-w-7xl">
            <SectionHeading
              badge="What We Do"
              title="Our Core"
              accent="Expertise"
              subtitle="As a modern IT services company, we specialize in crafting bespoke digital solutions tailored to your unique needs — designed to propel your business forward."
              isVisible={expertiseRef.isVisible}
            />

            <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {expertise.map((item, i) => (
                <FeatureCard key={item.title} {...item} index={i} isVisible={expertiseRef.isVisible} />
              ))}
            </div>

            <p className={cn(
              "text-center text-silver-500 text-sm md:text-base leading-relaxed max-w-3xl mx-auto mt-12 transition-all duration-1000 delay-500",
              expertiseRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}>
              Every project is approached with a <span className="font-semibold text-silver-900">client-centric methodology</span>, incorporating agile practices to iterate quickly, minimize risks, and maximize ROI for long-term growth and operational efficiency.
            </p>
          </div>
        </section>

        {/* ══════ MISSION & VALUES ══════ */}
        <section ref={valuesRef.ref} className="relative py-24 bg-silver-50 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-silver-300/40 rounded-full blur-[120px] animate-aurora-drift" style={{ animationDelay: '4s' }} />
          </div>

          <div className="relative container mx-auto px-6 max-w-7xl">
            <SectionHeading
              badge="Why We Exist"
              title="Our Mission &"
              accent="Values"
              subtitle="To empower businesses with transformative technology that drives sustainable success — innovative, reliable, ethically sound, scalable, and impactful."
              isVisible={valuesRef.isVisible}
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((item, i) => (
                <FeatureCard key={item.title} {...item} index={i} isVisible={valuesRef.isVisible} />
              ))}
            </div>
          </div>
        </section>

        {/* ══════ MEET OUR TEAM ══════ */}
        <section ref={teamRef.ref} className="relative py-24 bg-white overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-white via-silver-50/60 to-white" />
            <div className="absolute top-1/3 right-1/3 w-[480px] h-[480px] bg-silver-300/40 rounded-full blur-[120px] animate-aurora-drift" />
          </div>

          <div className="relative container mx-auto px-6 max-w-7xl">
            <SectionHeading
              badge="The People"
              title="Meet Our"
              accent="Team"
              subtitle="The passionate professionals driving our success and delivering excellence across every project."
              isVisible={teamRef.isVisible}
            />

            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 items-stretch">
              {teamMembers.map((member, index) => (
                <div key={member.name} className="w-[calc(50%-0.5rem)] sm:w-64 md:w-80 h-auto">
                  <TeamMemberCard member={member} index={index} isVisible={teamRef.isVisible} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <OurWork />
        <OurClients />

        {/* ══════ TESTIMONIALS ══════ */}
        <section ref={testimonialsRef.ref} className="relative py-24 bg-silver-50 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute bottom-1/3 right-1/3 w-[500px] h-[500px] bg-silver-300/40 rounded-full blur-[120px] animate-aurora-drift" />
          </div>

          <div className="relative container mx-auto px-6 max-w-7xl">
            <SectionHeading
              badge="Client Love"
              title="What Our Clients"
              accent="Say"
              subtitle="We are proud to build lasting partnerships based on trust, results, and exceptional service delivery."
              isVisible={testimonialsRef.isVisible}
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <div
                  key={t.name}
                  className={cn(
                    "group relative bg-white border border-silver-200 rounded-2xl p-7 flex flex-col transition-all duration-700 hover:border-primary/30 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-20px_rgba(143,38,71,0.25)]",
                    testimonialsRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  )}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <Quote className="h-7 w-7 text-primary/40 group-hover:text-primary transition-colors duration-500 mb-4" />
                  <p className="text-sm text-silver-600 leading-relaxed flex-grow mb-6">"{t.quote}"</p>
                  <div className="flex items-center gap-3 pt-5 border-t border-silver-100">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary/70 to-primary text-white text-sm font-bold">
                      {t.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-silver-900 group-hover:text-primary transition-colors duration-300">{t.name}</p>
                      <p className="text-xs text-silver-400">{t.role}</p>
                    </div>
                    <div className="ml-auto flex items-center gap-0.5">
                      {[0,1,2,3,4].map(s => <Star key={s} className="h-3 w-3 fill-primary text-primary" />)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Closing CTA */}
            <div className={cn(
              "text-center mt-16 transition-all duration-1000 delay-500",
              testimonialsRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}>
              <Button size="lg" asChild
                className="group relative overflow-hidden bg-primary hover:bg-primary text-white font-bold px-8 py-6 text-base rounded-2xl transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-primary/35">
                <Link href="/#contact" className="flex items-center gap-2.5">
                  <span>Start Your Journey With Us</span>
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
