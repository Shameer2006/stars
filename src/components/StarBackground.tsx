'use client';

/**
 * Full-viewport space background using the nebula photograph.
 * Replaces the canvas-based starfield with a static image for a richer look.
 */
export default function StarBackground() {
  return (
    <div
      className="fixed inset-0 z-0"
      style={{
        backgroundImage: 'url(/space-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
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
