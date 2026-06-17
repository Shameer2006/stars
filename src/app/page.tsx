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
        <section className="max-w-3xl mx-auto px-6 pb-12 text-center sm:text-left">
          <h2 className="text-sm sm:text-base font-cinzel tracking-[0.2em] uppercase text-amber-400/70 text-glow-subtle mb-4 text-center">
            About Your Name in the Stars
          </h2>
          <div className="bg-black/40 backdrop-blur-sm rounded-xl px-6 py-6 border border-white/[0.04] space-y-4">
            <p className="text-[12px] sm:text-[13px] text-gray-300 font-cormorant leading-relaxed tracking-wide">
              <strong>Your Name in the Stars</strong> is an educational and interactive tool that bridges the gap between scientific astronomical data and personal connection. By utilizing the renowned HYG Stellar Database, we allow you to explore the cosmos in a uniquely personal way. When you type a name, our algorithm doesn&apos;t just generate a random pattern; it maps each letter to the exact Right Ascension and Declination coordinates of real, physical stars burning in our galaxy.
            </p>
            <p className="text-[12px] sm:text-[13px] text-gray-300 font-cormorant leading-relaxed tracking-wide">
              Unlike commercial star registries that charge money to &quot;officially&quot; name a star—a practice not recognized by the International Astronomical Union—our tool serves as a 100% free, educational alternative. It is designed to spark curiosity about astronomy, allowing you to visualize celestial mechanics, understand apparent magnitudes, and learn the names of prominent stars like Sirius, Vega, and Betelgeuse.
            </p>
            <p className="text-[12px] sm:text-[13px] text-gray-300 font-cormorant leading-relaxed tracking-wide text-center pt-2">
              Want to dive deeper into the science of the stars? <br />
              <a href="/learn" className="text-amber-400/80 hover:text-amber-300 underline underline-offset-4 decoration-amber-400/30 mr-4">Explore our Astronomy Articles</a>
              <a href="/how-it-works" className="text-amber-400/80 hover:text-amber-300 underline underline-offset-4 decoration-amber-400/30">Learn How the Algorithm Works</a>
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQ />

        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
}
