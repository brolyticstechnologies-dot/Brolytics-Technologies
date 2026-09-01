"use client";

import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { LoadingScreen } from '@/components/layout/loading-screen';
import { useState, useEffect } from 'react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true);

  // Hard fallback — never stay stuck beyond 2.5s
  useEffect(() => {
    const fallback = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(fallback);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Brolytics Technologies</title>
        <meta name="description" content="Innovative and reliable solutions by Brolytics Technologies" />
      </head>
      <body suppressHydrationWarning={true} className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        {isLoading && (
          <LoadingScreen
            show={true}
            onFinish={() => setIsLoading(false)}
          />
        )}
        <div style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
