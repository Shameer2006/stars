'use client';

import Image from 'next/image';

/**
 * Full-viewport space background using the nebula photograph.
 * Optimized with Next.js Image component for instant loading and compressed formats.
 */
export default function StarBackground() {
  return (
    <div className="fixed inset-0 z-0 select-none pointer-events-none">
      <Image
        src="/space-bg.png"
        alt="Starry space background"
        fill
        priority
        quality={75}
        className="object-cover"
      />
      {/* Dark overlay to ensure text/UI readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(4,4,18,0.3) 0%, rgba(4,4,18,0.7) 100%)',
        }}
      />
    </div>
  );
}
