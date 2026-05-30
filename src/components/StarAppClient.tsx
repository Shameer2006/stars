'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Star, LetterResult } from '@/types/star';
import { processName } from '@/lib/starMapper';
import StarDisplay from '@/components/StarDisplay';
import NameInput from '@/components/NameInput';
import StarOfDay from '@/components/StarOfDay';

const TILE_WIDTH = 220;
const TILE_HEIGHT = 300;

export default function StarAppClient() {
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
        const rawStarsData = await starsRes.json();
        
        type CompactStar = [
          number, // id
          number, // ra
          number, // dec
          number, // mag
          number, // dist
          number | null, // ci
          string | null, // proper
          string | null // con
        ];
        
        const starsData = rawStarsData.map((s: CompactStar) => ({
          id: s[0],
          ra: s[1],
          dec: s[2],
          mag: s[3],
          dist: s[4],
          ci: s[5] ?? undefined,
          proper: s[6] ?? undefined,
          con: s[7] ?? undefined,
        }));
        
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
      if (allStars.length === 0) return;
      setIsLoading(true);
      requestAnimationFrame(() => {
        const letterResults = processName(name, allStars, TILE_WIDTH, TILE_HEIGHT);
        setResults(letterResults);
        setIsLoading(false);
      });
    },
    [allStars]
  );

  // Auto-render name from ?name= query param or default to Star of the Day name once data is loaded
  useEffect(() => {
    if (!dataLoaded || allStars.length === 0 || namedStars.length === 0) return;
    
    // Read the query parameter directly from window.location on the client side
    const params = new URLSearchParams(window.location.search);
    const sharedName = params.get('name');
    
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
    <>
      {/* Star of the Day */}
      {dataLoaded && <StarOfDay namedStars={namedStars} />}

      {/* Main display area */}
      <div className="flex-1 flex flex-col items-center justify-center py-3 sm:py-6 md:py-8 w-full">
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
              Type your name below to discover it in the stars
            </p>
            
            {!dataLoaded && (
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500 font-sans">
                <span className="inline-block w-3 h-3 border border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
                Loading 8,715 real stars from the HYG Database...
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Input bar */}
      <div className="sticky bottom-0 py-3 sm:py-6 z-20 w-full">
        <NameInput
          onSubmit={handleSubmit}
          results={results}
          tileWidth={TILE_WIDTH}
          tileHeight={TILE_HEIGHT}
          isLoading={isLoading}
        />
      </div>
    </>
  );
}
