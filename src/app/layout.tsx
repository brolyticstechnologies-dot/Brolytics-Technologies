import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { LoadingScreen } from "@/components/layout/loading-screen";
import { RootJsonLd } from "@/components/seo/json-ld";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

const BASE_URL = 'https://brolyticstechnologies.com';

export const viewport: Viewport = {
  themeColor: '#8B1E3F',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Brolytics Technologies | IT Services & Custom Software Solutions',
    template: '%s | Brolytics Technologies',
  },
  description:
    'Engineering high-impact digital solutions: Custom Software, High-Performance Websites, Native/Cross-Platform Mobile Apps, AI Agents, and Scalable Cloud Systems.',
  applicationName: 'Brolytics Technologies',
  keywords: [
    'Brolytics Technologies',
    'Custom Software Development Company',
    'Web Development Agency India',
    'Mobile App Development Services',
    'AI Solutions and LLM Agents',
    'Next.js Web Development',
    'React Native App Developers',
    'Enterprise ERP CRM Development',
    'UI UX Design Agency',
    'Cloud Architecture and DevOps',
    'Software Outsourcing Partner India',
  ],
  authors: [{ name: 'Brolytics Technologies', url: BASE_URL }],
  creator: 'Brolytics Technologies',
  publisher: 'Brolytics Technologies',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'Brolytics Technologies',
    title: 'Brolytics Technologies | IT Services & Custom Software Solutions',
    description:
      'Transforming modern enterprises with bespoke custom software, scalable mobile apps, high-performance web platforms, and intelligent AI workflows.',
    images: [
      {
        url: '/newwblt.png',
        width: 1200,
        height: 630,
        alt: 'Brolytics Technologies - Crafting Digital Excellence',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brolytics Technologies | IT Services & Software Solutions',
    description:
      'Transforming modern enterprises with bespoke custom software, scalable mobile apps, high-performance web platforms, and intelligent AI workflows.',
    images: ['/newwblt.png'],
    creator: '@brolyticstech',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon.png' },
    ],
    shortcut: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <RootJsonLd />
      </head>
      <body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <LoadingScreen />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
