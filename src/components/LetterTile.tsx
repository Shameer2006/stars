'use client';

import { useEffect, useRef, memo } from 'react';
import { MappedStar } from '@/types/star';
import { renderTileFrame } from '@/lib/canvas';

interface LetterTileProps {
  letter: string;
  stars: MappedStar[];
  bgStars: MappedStar[];
  width?: number;
  height?: number;
  onStarHover?: (star: MappedStar | null, x: number, y: number) => void;
}

/**
 * Individual letter canvas tile.
 * Optimized to render statically since twinkling is disabled, eliminating high idle CPU usage.
 */
export default memo(function LetterTile({
  letter,
  stars,
  bgStars,
  width = 220,
  height = 300,
  onStarHover,
}: LetterTileProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // Star positions are in originalWidth×originalHeight space (220×300).
    // Scale the context to map them into the actual display size.
    const scaleX = width / 220;
    const scaleY = height / 300;

    // Draw frame exactly once on component mount or prop change
    ctx.setTransform(dpr * scaleX, 0, 0, dpr * scaleY, 0, 0);
    renderTileFrame(ctx, 220, 300, stars, bgStars, letter, Date.now());
  }, [letter, stars, bgStars, width, height]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!onStarHover) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    const scaleX = width / 220;
    const scaleY = height / 300;

    // Hit-test: find star closest to cursor
    let closest: MappedStar | null = null;
    let closestDist = 20; // max pixel distance to trigger

    for (const star of stars) {
      const sx = star.screenX * scaleX;
      const sy = star.screenY * scaleY;
      const d = Math.hypot(sx - mx, sy - my);
      if (d < closestDist) {
        closestDist = d;
        closest = star;
      }
    }

    onStarHover(closest, e.clientX, e.clientY);
  };

  const handleMouseLeave = () => {
    onStarHover?.(null, 0, 0);
  };

  if (letter === ' ') {
    return <div style={{ width: width * 0.4, height }} className="flex-shrink-0" />;
  }

  return (
    <canvas
      ref={canvasRef}
      className="flex-shrink-0 rounded-lg cursor-crosshair transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(212,168,86,0.3)]"
      style={{ width, height }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    />
  );
});
