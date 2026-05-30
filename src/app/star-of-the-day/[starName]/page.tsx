import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import StarBackground from '@/components/StarBackground';
import { fetchStarWikiFullContent } from '@/lib/wikipedia';
import StarDetailClient from '@/components/StarDetailClient';
import JsonLd from '@/components/JsonLd';
import { Star } from '@/types/star';

const BASE_URL = 'https://stars-n.vercel.app';

// Use ISR — revalidate every 24 hours for fresh Wikipedia content while keeping pages cached/crawlable
export const revalidate = 86400; // 24 hours

// Pre-render all named star pages at build time for maximum SEO
export async function generateStaticParams() {
  try {
    const filePath = path.join(process.cwd(), 'public/data/named-stars.json');
    const namedStars: Star[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return namedStars
      .filter((s) => s.proper)
      .map((s) => ({
        starName: s.proper!,
      }));
  } catch {
    return [];
  }
}

// Dynamic per-page metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { starName: string };
}): Promise<Metadata> {
  const decodedName = decodeURIComponent(params.starName);

  // Load star data for richer metadata
  let starData: Star | null = null;
  try {
    const filePath = path.join(process.cwd(), 'public/data/named-stars.json');
    const namedStars: Star[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    starData =
      namedStars.find(
        (s) => s.proper?.toLowerCase() === decodedName.toLowerCase()
      ) || null;
  } catch {}

  const distanceText = starData ? `${starData.dist.toLocaleString()} light-years away` : '';
  const constellationText = starData?.con ? `in the constellation ${starData.con}` : '';
  const magnitudeText = starData ? `with an apparent magnitude of ${starData.mag}` : '';

  const description = `Discover ${decodedName} — a real star ${constellationText} ${distanceText} ${magnitudeText}. Learn about its properties, position in the night sky, and history. Part of the HYG Stellar Database with 8,700+ real stars.`.replace(/\s+/g, ' ').trim();

  const pageUrl = `${BASE_URL}/star-of-the-day/${encodeURIComponent(decodedName)}`;

  return {
    title: `${decodedName} — Star of the Day | Real Star Facts & Position`,
    description,
    keywords: [
      decodedName,
      `${decodedName} star`,
      `star ${decodedName}`,
      `${decodedName} constellation`,
      `${decodedName} distance`,
      `${decodedName} magnitude`,
      'star of the day',
      'real stars',
      'named stars',
      'astronomy',
      'night sky',
      'HYG database',
      'star facts',
      'star information',
      ...(starData?.con ? [`constellation ${starData.con}`, starData.con] : []),
    ],
    openGraph: {
      title: `⭐ ${decodedName} — Star of the Day`,
      description,
      url: pageUrl,
      type: 'article',
      siteName: 'Your Name in Stars',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: `${decodedName} — Star of the Day on Your Name in Stars`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `⭐ ${decodedName} — Star of the Day`,
      description,
      images: ['/og-image.png'],
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default async function StarDetailPage({
  params,
}: {
  params: { starName: string };
}) {
  const decodedName = decodeURIComponent(params.starName);
  const wikiContent = await fetchStarWikiFullContent(decodedName);

  // Load the named-stars.json to find matching star data
  let starData: Star | null = null;
  try {
    const filePath = path.join(process.cwd(), 'public/data/named-stars.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const namedStars: Star[] = JSON.parse(fileContent);
    starData = namedStars.find(
      (s) => s.proper?.toLowerCase() === decodedName.toLowerCase()
    ) || null;
  } catch (error) {
    console.error('Failed to load named-stars.json', error);
  }

  // Build JSON-LD structured data for this specific star
  const starJsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${decodedName} — Star of the Day`,
    description: wikiContent?.summary?.extract || `Learn about the star ${decodedName}`,
    url: `${BASE_URL}/star-of-the-day/${encodeURIComponent(decodedName)}`,
    publisher: {
      '@type': 'Organization',
      name: 'Your Name in Stars',
      url: BASE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/star-of-the-day/${encodeURIComponent(decodedName)}`,
    },
    about: {
      '@type': 'Thing',
      name: decodedName,
      description: `A real star${starData?.con ? ` in the constellation ${starData.con}` : ''}${starData ? `, ${starData.dist.toLocaleString()} light-years from Earth` : ''}`,
      additionalType: 'https://schema.org/Thing',
    },
  };

  // Add image if available from Wikipedia
  if (wikiContent?.summary?.thumbnail) {
    starJsonLd.image = wikiContent.summary.thumbnail.source;
  }

  return (
    <main className="relative min-h-screen flex flex-col bg-[#040412]">
      <StarBackground />

      {/* Structured data for this star */}
      <JsonLd data={starJsonLd} />

      {/* BreadcrumbList structured data for navigation */}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: BASE_URL,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Star of the Day',
              item: `${BASE_URL}/star-of-the-day`,
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: decodedName,
              item: `${BASE_URL}/star-of-the-day/${encodeURIComponent(decodedName)}`,
            },
          ],
        }}
      />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header with semantic nav */}
        <header className="p-6">
          <nav aria-label="Breadcrumb">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-widest font-sans"
            >
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Back to Stars
            </Link>
          </nav>
        </header>

        {/* Content Area */}
        <div className="flex-1 flex flex-col items-center px-4 py-8">
          <StarDetailClient
            wikiContent={wikiContent}
            starData={starData}
            decodedName={decodedName}
          />
        </div>
      </div>
    </main>
  );
}
