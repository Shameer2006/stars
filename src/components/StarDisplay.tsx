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

  // Measure available width with debouncing to prevent layout thrashing on resize
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (containerRef.current) {
          setContainerWidth(containerRef.current.clientWidth);
        }
      }, 100);
    };

    // Measure initially
    if (containerRef.current) {
      setContainerWidth(containerRef.current.clientWidth);
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  // Calculate tile dimensions to fit all tiles in one row
  const { actualWidth, actualHeight } = useMemo(() => {
    if (results.length === 0) return { actualWidth: tileWidth, actualHeight: tileHeight };

    const gap = 6; // gap between tiles in px
    const padding = 32; // horizontal padding
    const winWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const availableWidth = (containerWidth || winWidth) - padding;

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
      actualWidth: Math.max(60, Math.floor(tileWidth * scale)),
      actualHeight: Math.max(82, Math.floor(tileHeight * scale)),
    };
  }, [results, tileWidth, tileHeight, containerWidth]);

  if (results.length === 0) return null;

  const totalStars = results.reduce((sum, r) => sum + r.stars.length, 0);

  return (
    <div className="relative w-full overflow-hidden" ref={containerRef}>
      {/* Tiles row — single line, scrolls on overflow */}
      <div className="flex items-center justify-start md:justify-center gap-1.5 px-4 flex-nowrap overflow-x-auto scrollbar-none py-4 scroll-smooth w-full">
        <AnimatePresence mode="wait">
          {results.map((result, i) => (
            <motion.div
              key={`${result.letter}-${i}`}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  delay: i * 0.08,
                  duration: 0.45,
                  ease: [0.25, 0.46, 0.45, 0.94],
                },
              }}
              exit={{
                opacity: 0,
                y: -30,
                scale: 0.9,
                transition: {
                  delay: i * 0.05,
                  duration: 0.35,
                  ease: [0.25, 0.46, 0.45, 0.94],
                },
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
