
"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from "@/components/ui/sheet";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface NavLink {
  href: string;
  label: string;
  children?: NavLink[];
}

interface MobileNavProps {
  navLinks: NavLink[];
  triggerClassName?: string;
}

export function MobileNav({ navLinks, triggerClassName }: MobileNavProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [expandedItems, setExpandedItems] = React.useState<Record<string, boolean>>({
    "Services": true
  });

  const toggleExpand = (label: string) => {
    setExpandedItems(prev => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn(
            "md:hidden transition-colors",
            triggerClassName || "text-white hover:bg-white/20"
          )}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full max-w-xs bg-white/95 backdrop-blur-xl p-0 text-silver-900 border-l border-silver-200"
      >
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-silver-200">
            <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
              <Image 
                src="/newwblt.png" 
                alt="Brolytics Technologies Logo" 
                width={180} 
                height={60}
                className="w-36 sm:w-40 h-auto object-contain drop-shadow-md transition-transform duration-300 hover:scale-105"
                priority
              />
            </Link>
          </div>
          <nav className="flex-grow p-6 space-y-4 overflow-y-auto">
            {navLinks.map((link) => (
              <div key={link.href + link.label}>
                {link.children ? (
                  <>
                    <button
                      onClick={() => toggleExpand(link.label)}
                      className="flex items-center justify-between w-full text-lg font-medium text-silver-800 hover:text-primary transition-colors text-left"
                    >
                      {link.label}
                      <ChevronDown className={cn("h-4 w-4 transition-transform duration-300", expandedItems[link.label] ? "rotate-180 text-primary" : "text-silver-400")} />
                    </button>
                    {expandedItems[link.label] && (
                      <div className="mt-4 ml-[11px] pl-5 border-l-2 border-silver-200/70 space-y-4 relative">
                        {link.children.map((child) => (
                          <div key={child.href} className="relative group">
                            <span className="absolute -left-[22px] top-1/2 -translate-y-1/2 w-4 h-0.5 bg-silver-200/70 transition-colors duration-300 group-hover:bg-primary/40" />
                            <SheetClose asChild>
                              <Link
                                href={child.href}
                                className="block text-base font-medium text-silver-600 hover:text-primary transition-colors"
                                onClick={() => setIsOpen(false)}
                              >
                                {child.label}
                              </Link>
                            </SheetClose>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <SheetClose asChild>
                    <Link
                      href={link.href}
                      className="block text-lg font-medium text-silver-800 hover:text-primary transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                )}
              </div>
            ))}
          </nav>
          <div className="p-6 border-t border-silver-200">
            <SheetClose asChild>
              <Button
                variant="default"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-transform hover:scale-105"
                asChild
                onClick={() => setIsOpen(false)}
              >
                <Link href="#contact">Book a Meeting</Link>
              </Button>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
