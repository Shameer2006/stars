'use client';

import { MappedStar } from '@/types/star';

interface TooltipProps {
  star: MappedStar | null;
  x: number;
  y: number;
}

/**
 * Floating tooltip showing star information on hover.
 */
export default function Tooltip({ star, x, y }: TooltipProps) {
  if (!star) return null;

  const distLy = star.dist > 0 ? `${star.dist.toLocaleString()} ly` : 'Unknown';
  const visibility =
    star.mag <= 1 ? 'Very bright · Naked eye'
    : star.mag <= 3 ? 'Bright · Naked eye'
    : star.mag <= 6 ? 'Faint · Naked eye'
    : 'Needs binoculars';

  return (
    <div
      className="fixed z-50 pointer-events-none px-4 py-3 rounded-xl border backdrop-blur-md max-w-[220px]"
      style={{
        left: x + 16,
        top: y - 10,
        background: 'rgba(10, 10, 40, 0.85)',
        borderColor: 'rgba(212, 168, 86, 0.3)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
      }}
    >
      <div className="text-amber-400 font-cinzel text-sm font-semibold mb-1">
        {star.proper || `HYG ${star.id}`}
      </div>
      <div className="space-y-0.5 text-xs text-gray-300">
        <div className="flex justify-between gap-4">
          <span className="text-gray-500">Magnitude</span>
          <span>{star.mag.toFixed(2)}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-gray-500">Distance</span>
          <span>{distLy}</span>
        </div>
        {star.con && (
          <div className="flex justify-between gap-4">
            <span className="text-gray-500">Constellation</span>
            <span>{star.con}</span>
          </div>
        )}
        <div className="mt-1 pt-1 border-t border-white/10 text-amber-400/60 text-[10px]">
          {visibility}
        </div>
      </div>
    </div>
  );
}
