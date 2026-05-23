import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import { Star } from '@/types/star';

const BASE_URL = 'https://stars-n.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
  ];

  // Add all named star detail pages
  try {
    const filePath = path.join(process.cwd(), 'public/data/named-stars.json');
    const namedStars: Star[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    for (const star of namedStars) {
      if (star.proper) {
        routes.push({
          url: `${BASE_URL}/star-of-the-day/${encodeURIComponent(star.proper)}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.7,
        });
      }
    }
  } catch (error) {
    console.error('Sitemap: Failed to load named-stars.json', error);
  }

  return routes;
}
