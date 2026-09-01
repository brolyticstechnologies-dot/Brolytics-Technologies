"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Mail,
  Phone,
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Sparkles,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { SiteContent } from "@/lib/content-types";
import { getIcon } from "@/lib/icon-map";
import { useSiteContent } from "@/hooks/use-site-content";

interface FooterProps {
  content?: SiteContent['footer'];
  siteSettings?: SiteContent['siteSettings'];
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group/link inline-flex items-center gap-2 text-sm text-silver-500 hover:text-primary transition-colors duration-300"
    >
      <span className="h-1 w-1 rounded-full bg-primary opacity-0 group-hover/link:opacity-100 transition-opacity duration-300" />
      <span>{children}</span>
      <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300" aria-hidden="true" />
    </Link>
  );
}

export function Footer({ content: contentProp, siteSettings: settingsProp }: FooterProps = {}) {
  const siteContent = useSiteContent();
  const content = contentProp ?? siteContent?.footer;
  const siteSettings = settingsProp ?? siteContent?.siteSettings;

  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.05 });

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  if (!content || !siteSettings) return null;

  const socialLinks = (content.socialLinks || []).map(s => ({ ...s, icon: getIcon(s.icon) }));
  const quickLinks = content.quickLinks || [];
  const serviceLinks = content.serviceLinks || [];
  const contactInfo = (content.contactInfo || []).map(c => ({
    icon: getIcon(c.icon),
    label: c.icon === 'mail' ? 'Email Us' : 'Call Us',
    value: c.text,
    href: c.href,
  }));

  return (
    <footer ref={ref} className="relative bg-white text-silver-900 overflow-hidden border-t border-silver-200">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-silver-50 via-white to-white" />
        <div className="absolute top-0 left-1/3 w-[500px] h-[320px] bg-silver-300/25 rounded-full blur-[130px] animate-aurora-drift" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-primary/[0.04] rounded-full blur-[120px] animate-aurora-drift" style={{ animationDelay: "5s" }} />
        <div className="absolute inset-0 opacity-50 bg-[linear-gradient(hsl(214_32%_91%/.35)_1px,transparent_1px),linear-gradient(90deg,hsl(214_32%_91%/.35)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_40%,black,transparent)]" />
        <div className="absolute top-0 inset-x-0 h-px hairline" />
      </div>

      <div className="relative container mx-auto px-6 max-w-7xl">
        {/* CTA strip */}
        <div
          className={cn(
            "pt-14 md:pt-16 pb-12 md:pb-14 transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="relative rounded-2xl p-[1px] bg-gradient-to-r from-silver-200/80 via-primary/25 to-silver-200/80">
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 rounded-[0.95rem] bg-white/90 backdrop-blur-sm px-6 py-6 sm:px-8 sm:py-7 overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/[0.05] rounded-full blur-3xl pointer-events-none" />
              <div className="relative text-center md:text-left">
                <p className="text-xl sm:text-2xl font-black text-silver-900 leading-tight">
                  {content.ctaTitle}
                </p>
                <p className="text-sm text-silver-500 mt-1.5">{content.ctaSubtitle}</p>
              </div>
              <Button
                asChild
                size="lg"
                className="relative shrink-0 bg-primary hover:bg-primary text-white font-bold px-7 py-6 rounded-2xl transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-primary/30 group"
              >
                <Link href="/#contact" className="flex items-center gap-2.5">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  <span>{content.ctaButton}</span>
                  <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Main grid */}
        <div
          className={cn(
            "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 md:pb-14 border-b border-silver-200 transition-all duration-1000 delay-100",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {/* Brand */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-block group">
              <Image
                src={siteSettings.logo}
                alt={siteSettings.logoAlt}
                width={180}
                height={62}
                className="object-contain group-hover:scale-[1.02] transition-transform duration-300"
              />
            </Link>
            <p className="text-sm text-silver-500 leading-relaxed max-w-sm">
              {content.brandDescription}
            </p>
            <div className="flex flex-wrap gap-2">
              {content.brandTags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-lg bg-silver-50 border border-silver-200 text-[11px] font-semibold text-silver-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-silver-500 mb-5">Company</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-silver-500 mb-5">Services</h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-silver-500 mb-5">Get In Touch</h3>
            {contactInfo.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group flex items-center gap-3 p-3.5 rounded-xl bg-white border border-silver-200 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 transition-all duration-300"
                >
                  <div className="p-2 rounded-lg bg-primary/10 border border-primary/15 group-hover:scale-105 transition-transform duration-300">
                    <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-silver-400">{item.label}</p>
                    <p className="text-sm font-semibold text-silver-900 group-hover:text-primary transition-colors duration-300">{item.value}</p>
                  </div>
                </Link>
              );
            })}
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-silver-200">
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/15">
                <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-silver-400">Location</p>
                <p className="text-sm text-silver-600 leading-relaxed">{content.location}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social + newsletter */}
        <div
          className={cn(
            "flex flex-col lg:flex-row items-center justify-between gap-8 py-10 border-b border-silver-200 transition-all duration-1000 delay-200",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          <div className="flex items-center gap-2.5">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="group p-3 rounded-xl bg-white border border-silver-200 hover:border-primary/40 hover:bg-primary/[0.04] transition-all duration-300 hover:-translate-y-0.5 shadow-sm"
                >
                  <Icon className="h-4 w-4 text-silver-500 group-hover:text-primary transition-colors duration-300" aria-hidden="true" />
                </Link>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <p className="text-sm text-silver-500 whitespace-nowrap">Subscribe for updates</p>
            <div className="flex w-full sm:w-auto rounded-xl overflow-hidden border border-silver-200 bg-white focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/10 transition-all duration-300 shadow-sm">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 sm:w-52 px-4 py-3 bg-transparent text-silver-900 text-sm placeholder:text-silver-400 focus:outline-none"
                aria-label="Email for newsletter"
              />
              <button
                type="button"
                className="px-5 py-3 bg-primary hover:bg-primary/90 text-white text-sm font-bold transition-colors duration-300 whitespace-nowrap"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className={cn(
            "flex flex-col sm:flex-row items-center justify-between gap-4 py-6 transition-all duration-1000 delay-300",
            isVisible ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs text-silver-500 text-center sm:text-left">
            <p>
              © {currentYear} <span className="text-silver-900 font-semibold">{content.copyright}</span>. All rights reserved.
            </p>
            <span className="hidden sm:inline text-silver-300">|</span>
            <Link href="/privacy-policy" className="hover:text-primary transition-colors duration-200">
              Privacy Policy
            </Link>
          </div>
          <div className="flex items-center gap-2 text-xs text-silver-500">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary/50 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            <span>{content.craftedText}</span>
            <span className="text-silver-300">·</span>
            <span className="text-primary font-semibold">Innovation Driven</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
