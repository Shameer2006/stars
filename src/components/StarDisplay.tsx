'use client';

import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LetterResult } from '@/types/star';
import { MappedStar } from '@/types/star';
import LetterTile from './LetterTile';
import Tooltip from './Tooltip';

interface StarDisplayProps {
  results: LetterResult[];
  tileWidth: number;
  tileHeight: number;
}

/**
 * Row of letter tiles — always in a single line.
 * Tiles shrink dynamically if the name is long so everything fits on screen.
 */
export default function StarDisplay({ results, tileWidth, tileHeight }: StarDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const [hoveredStar, setHoveredStar] = useState<{
    star: MappedStar | null;
    x: number;
    y: number;
  }>({ star: null, x: 0, y: 0 });

  const handleStarHover = useCallback(
    (star: MappedStar | null, x: number, y: number) => {
      setHoveredStar({ star, x, y });
    },
    []
  );

  // Measure available width
  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Calculate tile dimensions to fit all tiles in one row
  const { actualWidth, actualHeight } = useMemo(() => {
    if (results.length === 0) return { actualWidth: tileWidth, actualHeight: tileHeight };

    const gap = 6; // gap between tiles in px
    const padding = 32; // horizontal padding
    const availableWidth = (containerWidth || window.innerWidth) - padding;

    // Count letter tiles (spaces are narrower)
    const letterCount = results.filter(r => r.letter !== ' ').length;
    const spaceCount = results.filter(r => r.letter === ' ').length;

    // Total width needed at full size
    const totalNeeded = letterCount * tileWidth + spaceCount * (tileWidth * 0.4) + (results.length - 1) * gap;

    if (totalNeeded <= availableWidth) {
      // Everything fits at full size
      return { actualWidth: tileWidth, actualHeight: tileHeight };
    }

    // Scale down to fit
    const scale = availableWidth / totalNeeded;
    return {
      actualWidth: Math.max(40, Math.floor(tileWidth * scale)),
      actualHeight: Math.max(60, Math.floor(tileHeight * scale)),
    };
  }, [results, tileWidth, tileHeight, containerWidth]);

  if (results.length === 0) return null;

  const totalStars = results.reduce((sum, r) => sum + r.stars.length, 0);

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Tiles row — single line, no wrapping */}
      <div className="flex items-center justify-center gap-1.5 px-4 flex-nowrap">
        <AnimatePresence mode="wait">
          {results.map((result, i) => (
            <motion.div
              key={`${result.letter}-${i}`}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                delay: i * 0.08,
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="flex-shrink-0"
            >
              <LetterTile
                letter={result.letter}
                stars={result.stars}
                bgStars={result.bgStars}
                width={actualWidth}
                height={actualHeight}
                onStarHover={handleStarHover}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Stats line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: results.length * 0.08 + 0.3 }}
        className="text-center mt-5 text-sm text-gray-500 font-cormorant tracking-wide"
      >
        {results.filter(r => r.letter !== ' ').length} letters ·{' '}
        {totalStars} real stars mapped · HYG Stellar Database
      </motion.div>

      {/* Tooltip */}
      <Tooltip star={hoveredStar.star} x={hoveredStar.x} y={hoveredStar.y} />
    </div>
  );
}
