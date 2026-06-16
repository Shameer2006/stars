import type { Metadata } from 'next';
import StarBackground from '@/components/StarBackground';
import StarAppClient from '@/components/StarAppClient';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    absolute: 'Your Name in the Stars — Name a Star for Free Online & See Your Name in Galaxy',
  },
  description:
    'Find your name in the stars using real stars from the HYG Stellar Database. This free online interactive generator lets you see your name in galaxy, traced by actual stars. Name a star for free online, explore our intergalactic star database, and discover named stars with our daily Star of the Day.',
  alternates: {
    canonical: 'https://your-name-in-stars.vercel.app',
  },
};

export default function HomePage() {
  return (
    <main className="relative min-h-screen flex flex-col">
      {/* Background starfield */}
      <StarBackground />

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="pt-5 pb-2 sm:pt-10 sm:pb-4 text-center">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-cinzel font-semibold tracking-wider px-4 text-glow-gold">
            <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent">
              Your Name in the Stars
            </span>
          </h1>
          <p className="mt-1.5 sm:mt-3 text-xs sm:text-sm md:text-base text-gray-400 font-cormorant tracking-wide max-w-xl mx-auto px-4 leading-relaxed text-glow-subtle">
            Name a star for free online — every letter traced by a real star from our
            <br className="hidden md:block" />
            intergalactic star database. See your name in galaxy.
          </p>
        </header>

        {/* Interactive name mapper and star explorer client app */}
        <StarAppClient />

        {/* SEO Content Section — visible, keyword-rich text for Google */}
        <section className="max-w-2xl mx-auto px-6 pb-8 text-center">
          <h2 className="text-sm sm:text-base font-cinzel tracking-[0.2em] uppercase text-amber-400/70 text-glow-subtle mb-3">
            About Your Name in the Stars
          </h2>
          <p className="text-[11px] sm:text-xs text-gray-400/80 font-cormorant leading-relaxed tracking-wide bg-black/40 backdrop-blur-sm rounded-lg px-5 py-4">
            Find your name in the stars using real stars from the HYG Stellar Database.
            As a 100% free alternative to commercial star registries and paid star naming services,
            this interactive generator lets you see your name in galaxy, traced by actual stars.
            If you want to name a star for free online, explore our intergalactic star database, visualize stellar astronomy online,
            and enjoy our daily Star of the Day feature. Perfect for space lovers, astronomy fans,
            and anyone looking for a unique, free personalized space gift — type any name to see it shine across the cosmos tonight.
          </p>
        </section>

        {/* FAQ Section */}
        <FAQ />

        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
}
