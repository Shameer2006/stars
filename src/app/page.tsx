'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Star, LetterResult } from '@/types/star';
import { processName } from '@/lib/starMapper';
import StarBackground from '@/components/StarBackground';
import StarDisplay from '@/components/StarDisplay';
import NameInput from '@/components/NameInput';
import StarOfDay from '@/components/StarOfDay';
import FAQ from '@/components/FAQ';

const TILE_WIDTH = 220;
const TILE_HEIGHT = 300;

// Inner component that uses useSearchParams (must be wrapped in Suspense)
function HomeContent() {
  const searchParams = useSearchParams();
  const [allStars, setAllStars] = useState<Star[]>([]);
  const [namedStars, setNamedStars] = useState<Star[]>([]);
  const [results, setResults] = useState<LetterResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Load star data on mount
  useEffect(() => {
    async function loadData() {
      try {
        const [starsRes, namedRes] = await Promise.all([
          fetch('/data/stars.json'),
          fetch('/data/named-stars.json'),
        ]);
        const starsData = await starsRes.json();
        const namedData = await namedRes.json();
        setAllStars(starsData);
        setNamedStars(namedData);
        setDataLoaded(true);
      } catch (err) {
        console.error('Failed to load star data:', err);
      }
    }
    loadData();
  }, []);

  const handleSubmit = useCallback(
    (name: string) => {
      if (!dataLoaded || allStars.length === 0) return;
      setIsLoading(true);
      requestAnimationFrame(() => {
        const letterResults = processName(name, allStars, TILE_WIDTH, TILE_HEIGHT);
        setResults(letterResults);
        setIsLoading(false);
      });
    },
    [dataLoaded, allStars]
  );

  // Auto-render name from ?name= query param or default to Star of the Day name once data is loaded
  useEffect(() => {
    if (!dataLoaded || allStars.length === 0 || namedStars.length === 0) return;
    const sharedName = searchParams.get('name');
    if (sharedName && sharedName.trim().length > 0) {
      handleSubmit(sharedName.trim().slice(0, 16));
    } else {
      // Deterministically select Star of the Day's name
      const now = new Date();
      const startOfYear = new Date(now.getFullYear(), 0, 0);
      const diff = now.getTime() - startOfYear.getTime();
      const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
      const idx = dayOfYear % namedStars.length;
      const selectedStar = namedStars[idx];
      if (selectedStar && selectedStar.proper) {
        handleSubmit(selectedStar.proper.trim().slice(0, 16));
      }
    }
    // Only run once after data loads
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataLoaded]);

  return (
    <main className="relative min-h-screen flex flex-col">
      {/* Background starfield */}
      <StarBackground />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="pt-5 pb-2 sm:pt-10 sm:pb-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-cinzel font-semibold tracking-wider px-4 text-glow-gold">
              <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent">
                Your Name in Stars
              </span>
            </h1>
            <p className="mt-1.5 sm:mt-3 text-xs sm:text-sm md:text-base text-gray-400 font-cormorant tracking-wide max-w-xl mx-auto px-4 leading-relaxed text-glow-subtle">
              A free star name generator — every letter traced by a real star from the
              <br className="hidden md:block" />
              HYG Stellar Database. See your name written in the night sky.
            </p>
          </motion.div>
        </header>

        {/* Star of the Day */}
        {dataLoaded && <StarOfDay namedStars={namedStars} />}

        {/* Main display area */}
        <div className="flex-1 flex flex-col items-center justify-center py-3 sm:py-6 md:py-8">
          {results.length > 0 ? (
            <StarDisplay
              results={results}
              tileWidth={TILE_WIDTH}
              tileHeight={TILE_HEIGHT}
            />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center py-20 px-4"
            >
              <div className="mb-6 animate-float flex justify-center text-gray-500">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <p className="text-gray-500 font-cormorant text-lg tracking-wide">
                {dataLoaded
                  ? 'Type your name below to discover it in the stars'
                  : 'Loading stellar database...'}
              </p>
              {!dataLoaded && (
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-600">
                  <span className="inline-block w-3 h-3 border border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
                  Loading 8,715 real stars from the HYG Database
                </div>
              )}
            </motion.div>
          )}
        </div>

        {/* Input bar */}
        <div className="sticky bottom-0 py-3 sm:py-6 z-20">
          <NameInput
            onSubmit={handleSubmit}
            results={results}
            tileWidth={TILE_WIDTH}
            tileHeight={TILE_HEIGHT}
            isLoading={isLoading}
          />
        </div>
        {/* SEO Content Section — visible, keyword-rich text for Google */}
        <section className="max-w-2xl mx-auto px-6 pb-8 text-center">
          <p className="text-[11px] sm:text-xs text-gray-500/60 font-cormorant leading-relaxed tracking-wide text-glow-subtle">
            Find your name written in stars using real stars from the HYG Stellar Database.
            Explore the night sky star map with your name, discover named stars like Sirius, Vega, and Polaris,
            and enjoy our daily Star of the Day feature. This free interactive star name generator
            lets you see your name in the galaxy traced by actual stars in space.
            Search your name in constellations, visualize stellar astronomy online,
            and explore NASA-style star maps. Perfect for space lovers, astronomy fans,
            and anyone curious about the universe — type any name and see it shine across the cosmos tonight.
          </p>
        </section>

        {/* FAQ Section */}
        <FAQ />

        {/* Footer */}
        <footer className="text-center py-6 text-xs text-gray-400/70 font-cormorant tracking-wide text-glow-subtle">
          <p>
            Star positions from the{' '}
            <a
              href="https://www.astronexus.com/projects/hyg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400/50 hover:text-amber-400 transition-colors underline underline-offset-2"
            >
              HYG Stellar Database
            </a>{' '}
            · CC BY-SA 4.0
          </p>
          <p className="mt-1 text-gray-500/60 text-glow-subtle">
            {allStars.length.toLocaleString()} real stars · {namedStars.length} named stars
          </p>
        </footer>
      </div>
    </main>
  );
}

// Wrap with Suspense because useSearchParams() requires it in Next.js 14
export default function HomePage() {
  return (
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  );
}
