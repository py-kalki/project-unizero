import { MetadataRoute } from 'next';
import { APP_URL } from '@/config/constants';

/**
 * Sitemap Configuration
 *
 * Generates XML sitemap for search engine indexing.
 * Includes all public pages with appropriate change frequencies.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: APP_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${APP_URL}/sign-in`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${APP_URL}/sign-up`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];
}
