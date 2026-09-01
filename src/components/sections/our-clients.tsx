"use client";

import Image from "next/image";
import { Globe } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import type { SiteContent } from "@/lib/content-types";
import { useSiteContent } from "@/hooks/use-site-content";

interface OurClientsProps {
  content?: SiteContent['ourClients'];
}

function LogoCard({ client }: { client: { name: string; logo: string } }) {
  return (
    <div className="group relative mx-3 sm:mx-4 flex-shrink-0 w-44 min-[480px]:w-52 sm:w-64 h-28 min-[480px]:h-32 sm:h-36 rounded-2xl p-[1px] bg-gradient-to-br from-silver-200/70 via-white to-silver-200/50 hover:from-primary/30 hover:via-primary/8 hover:to-silver-200/60 transition-all duration-400 hover:shadow-[0_18px_40px_-16px_rgba(143,38,71,0.2)]">
      <div className="relative flex h-full w-full items-center justify-center rounded-[0.95rem] bg-white px-6 py-5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />
        <Image
          src={client.logo}
          alt={`${client.name} logo`}
          width={200}
          height={80}
          className="relative z-10 object-contain w-full h-full max-h-[64px] sm:max-h-[72px] transition-transform duration-400 group-hover:scale-105"
        />
      </div>
    </div>
  );
}

export function OurClients({ content: contentProp }: OurClientsProps = {}) {
  const siteContent = useSiteContent();
  const content = contentProp ?? siteContent?.ourClients;
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.12 });

  if (!content || !content.clients || content.clients.length === 0) return null;

  const { header } = content;
  const clients = content.clients;
  const row1 = [...clients, ...clients, ...clients];
  const row2 = clients.length > 4 
    ? [...clients.slice(4), ...clients.slice(0, 4), ...clients.slice(4), ...clients.slice(0, 4)]
    : row1;

  return (
    <section
      ref={ref}
      id="our-clients"
      className="relative py-16 sm:py-24 md:py-28 overflow-hidden bg-gradient-to-br from-[hsl(345,68%,22%)] via-primary to-[hsl(345,55%,38%)]"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/15" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[640px] h-[360px] rounded-full bg-white/5 blur-[130px] animate-aurora-drift" />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-white/[0.07] blur-[120px] animate-aurora-drift"
          style={{ animationDelay: "5s" }}
        />
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(hsl(0_0%_100%/.08)_1px,transparent_1px),linear-gradient(90deg,hsl(0_0%_100%/.08)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_75%_55%_at_50%_50%,black,transparent)]" />
        <div className="absolute top-0 inset-x-0 h-px bg-white/10" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-white/10" />
      </div>

      {/* Header */}
      <div
        className={cn(
          "relative container mx-auto px-4 sm:px-6 max-w-3xl text-center mb-10 sm:mb-14 md:mb-16 transition-all duration-1000",
          ""
        )}
      >
        <div className="inline-flex items-center gap-2.5 px-4 py-2 mb-6 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-white/60 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
          </span>
          <Globe className="w-3.5 h-3.5 text-white" aria-hidden="true" />
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/90">
            {header.badge}
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-black tracking-tight leading-[1.08] mb-5">
          <span className="text-white">{header.title}</span>
          <span className="text-white/90"> {header.titleAccent}</span>
        </h2>

        <p className="text-base md:text-lg text-white/75 leading-relaxed">
          {header.subtitle}
        </p>
      </div>

      {/* Auto-sliding marquee rows */}
      <div
        className={cn(
          "space-y-5 transition-all duration-1000 delay-200",
          ""
        )}
      >
        {/* Row 1 — slides left */}
        <div className="relative w-full overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-5 sm:w-8 md:w-10 bg-gradient-to-r from-[hsl(345,68%,22%)] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-5 sm:w-8 md:w-10 bg-gradient-to-l from-[hsl(345,55%,38%)] to-transparent z-10 pointer-events-none" />
          <div
            className="flex w-max animate-marquee-left"
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.animationPlayState = "paused"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.animationPlayState = "running"; }}
          >
            {row1.map((client, i) => (
              <LogoCard key={`r1-${client.name}-${i}`} client={client} />
            ))}
          </div>
        </div>

        {/* Row 2 — slides right */}
        <div className="relative w-full overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-5 sm:w-8 md:w-10 bg-gradient-to-r from-[hsl(345,68%,22%)] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-5 sm:w-8 md:w-10 bg-gradient-to-l from-[hsl(345,55%,38%)] to-transparent z-10 pointer-events-none" />
          <div
            className="flex w-max animate-marquee-right"
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.animationPlayState = "paused"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.animationPlayState = "running"; }}
          >
            {row2.map((client, i) => (
              <LogoCard key={`r2-${client.name}-${i}`} client={client} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
