import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import StarBackground from '@/components/StarBackground';
import { fetchStarWikiFullContent } from '@/lib/wikipedia';
import StarDetailClient from '@/components/StarDetailClient';
import { Star } from '@/types/star';

// Force dynamic server-side rendering for this page to prevent build-time PageNotFoundError
export const dynamic = 'force-dynamic';

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

  return (
    <main className="relative min-h-screen flex flex-col bg-[#040412]">
      <StarBackground />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="p-6">
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
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Stars
          </Link>
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
