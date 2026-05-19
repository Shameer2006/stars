'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Star } from '@/types/star';
import { fetchStarWikiSummary, WikiSummary } from '@/lib/wikipedia';

interface StarOfDayProps {
  namedStars: Star[];
}

/**
 * Star of the Day — daily rotating featured star card.
 * Fetches data from Wikipedia and links to a detailed view.
 */
export default function StarOfDay({ namedStars }: StarOfDayProps) {
  const [star, setStar] = useState<Star | null>(null);
  const [wikiData, setWikiData] = useState<WikiSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (namedStars.length === 0) return;

    // Use day-of-year as deterministic index
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - startOfYear.getTime();
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    const idx = dayOfYear % namedStars.length;

    const selectedStar = namedStars[idx];
    setStar(selectedStar);

    if (selectedStar.proper) {
      fetchStarWikiSummary(selectedStar.proper).then((data) => {
        setWikiData(data);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [namedStars]);

  // Only render if we have a valid star, and Wikipedia returned an image and extract
  if (isLoading) return null; // Silently loading
  if (!star || !wikiData || !wikiData.thumbnail) return null;

  const distLy = star.dist > 0 ? `${star.dist.toLocaleString()} light-years` : 'Distance unknown';
  
  // Provide the full extract and let CSS line-clamp handle the truncation
  const fullDescription = wikiData.extract;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="w-full max-w-lg mx-auto px-4 mb-4 z-20 relative"
    >
      <Link href={`/star-of-the-day/${encodeURIComponent(star.proper || '')}`}>
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-2xl border transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer"
          style={{
            background: 'rgba(15, 15, 40, 0.65)',
            borderColor: 'rgba(212, 168, 86, 0.35)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {/* Wikipedia Thumbnail */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-900 border border-white/20 shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={wikiData.thumbnail.source} 
              alt={star.proper}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] uppercase tracking-[0.2em] text-amber-300 font-sans font-semibold">
                ★ Star of the Day
              </span>
              <span className="text-[9px] text-gray-300 uppercase tracking-widest bg-white/10 px-1.5 py-0.5 rounded-full">
                Learn More ↗
              </span>
            </div>
            
            <div className="text-lg sm:text-xl font-cinzel text-amber-400 truncate tracking-wide mt-0.5">
              {star.proper}
            </div>
            
            <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1 text-xs text-gray-300 font-cormorant tracking-wide">
              <span>{distLy}</span>
              <span className="text-gray-400">•</span>
              <span>Mag {star.mag.toFixed(2)}</span>
              {star.con && (
                <>
                  <span className="text-gray-400">•</span>
                  <span>{star.con}</span>
                </>
              )}
            </div>
            
            <p className="text-xs text-gray-300 mt-1.5 line-clamp-2 leading-relaxed font-sans">
              {fullDescription}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
