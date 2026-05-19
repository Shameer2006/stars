'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from '@/types/star';
import { drawSpaceBackground, drawStar } from '@/lib/canvas';

interface StarOfDayProps {
  namedStars: Star[];
}

/**
 * Star of the Day — daily rotating featured star card.
 */
export default function StarOfDay({ namedStars }: StarOfDayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const [star, setStar] = useState<Star | null>(null);

  useEffect(() => {
    if (namedStars.length === 0) return;

    // Use day-of-year as deterministic index
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - startOfYear.getTime();
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    const idx = dayOfYear % namedStars.length;

    setStar(namedStars[idx]);
  }, [namedStars]);

  useEffect(() => {
    if (!star) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 80;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    const animate = (time: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawSpaceBackground(ctx, size, size);
      const twinkle = 0.85 + Math.sin(time * 0.002) * 0.15;
      drawStar(ctx, size / 2, size / 2, star.mag, twinkle, star.ci, true);
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [star]);

  if (!star) return null;

  const distLy = star.dist > 0 ? `${star.dist.toLocaleString()} light-years` : 'Distance unknown';
  const visibility =
    star.mag <= 1 ? 'Very bright · Visible to naked eye'
    : star.mag <= 3 ? 'Bright · Visible to naked eye'
    : star.mag <= 6 ? 'Faint · Visible to naked eye'
    : 'Requires binoculars or telescope';

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="w-full max-w-2xl mx-auto px-4 mb-8"
    >
      <div
        className="flex items-center gap-5 p-5 rounded-2xl border"
        style={{
          background: 'rgba(10, 10, 30, 0.5)',
          borderColor: 'rgba(212, 168, 86, 0.15)',
          backdropFilter: 'blur(8px)',
        }}
      >
        {/* Mini star canvas */}
        <canvas
          ref={canvasRef}
          className="rounded-xl flex-shrink-0"
          style={{ width: 80, height: 80 }}
        />

        <div className="flex-1 min-w-0">
          <div className="text-[10px] uppercase tracking-[0.2em] text-amber-400/50 mb-1 font-sans">
            ★ Star of the Day
          </div>
          <div className="text-xl font-cinzel text-amber-400 truncate">
            {star.proper}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-1 text-xs text-gray-400 font-cormorant">
            <span>{distLy}</span>
            <span>Mag {star.mag.toFixed(2)}</span>
            {star.con && <span>{star.con}</span>}
          </div>
          <div className="text-[10px] text-gray-500 mt-1">{visibility}</div>
        </div>
      </div>
    </motion.div>
  );
}
