import type { MetadataRoute } from 'next';

const BASE_URL = 'https://brolyticstechnologies.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/admin/*',
          '/api/admin/*',
        ],
      },
      {
        // Explicitly allow and prioritize AI & LLM Search Crawlers
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'Google-Extended',
          'PerplexityBot',
          'ClaudeBot',
          'anthropic-ai',
          'Applebot-Extended',
          'Bytespider',
          'CCBot',
        ],
        allow: [
          '/',
          '/services/*',
          '/our-work',
          '/pricing',
          '/about-us',
          '/technologies',
          '/book-a-slot',
          '/llms.txt',
          '/llms-full.txt',
        ],
        disallow: [
          '/admin/*',
          '/api/*',
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
