import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { LoadingScreen } from "@/components/layout/loading-screen";
import { FloatingBookSlotBtn } from "@/components/booking/floating-book-slot-btn";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Brolytics Technologies | IT Services & Software Solutions',
  description: 'Custom Software, Websites, Mobile Apps, AI, and Scalable Cloud Solutions by Brolytics Technologies.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <LoadingScreen />
        {children}
        <FloatingBookSlotBtn />
        <Toaster />
      </body>
    </html>
  );
}
