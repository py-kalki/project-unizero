import { MetadataRoute } from 'next';
import { APP_URL } from '@/config/constants';

/**
 * Robots.txt Configuration
 *
 * Generates robots.txt for search engine crawlers.
 * Disallows protected routes while allowing public access.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/settings/'],
    },
    sitemap: `${APP_URL}/sitemap.xml`,
  };
}
