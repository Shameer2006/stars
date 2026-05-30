import type { Metadata } from 'next';
import StarBackground from '@/components/StarBackground';
import StarAppClient from '@/components/StarAppClient';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    absolute: 'Your Name in Stars — Write Your Name in Real Stars',
  },
  description:
    'Find your name written in stars using real stars from the HYG Stellar Database. This free interactive star name generator lets you see your name in the galaxy, traced by actual stars like Sirius, Vega, and Polaris. Explore the night sky star map, discover named stars with our daily Star of the Day, and visualize stellar astronomy online. Perfect for space lovers and astronomy fans.',
  alternates: {
    canonical: 'https://stars-n.vercel.app',
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
              Your Name in Stars
            </span>
          </h1>
          <p className="mt-1.5 sm:mt-3 text-xs sm:text-sm md:text-base text-gray-400 font-cormorant tracking-wide max-w-xl mx-auto px-4 leading-relaxed text-glow-subtle">
            A free star name generator — every letter traced by a real star from the
            <br className="hidden md:block" />
            HYG Stellar Database. See your name written in the night sky.
          </p>
        </header>

        {/* Interactive name mapper and star explorer client app */}
        <StarAppClient />

        {/* SEO Content Section — visible, keyword-rich text for Google */}
        <section className="max-w-2xl mx-auto px-6 pb-8 text-center">
          <h2 className="text-sm sm:text-base font-cinzel tracking-[0.2em] uppercase text-amber-400/70 text-glow-subtle mb-3">
            About Your Name in Stars
          </h2>
          <p className="text-[11px] sm:text-xs text-gray-400/80 font-cormorant leading-relaxed tracking-wide bg-black/40 backdrop-blur-sm rounded-lg px-5 py-4">
            Find your name written in stars using real stars from the HYG Stellar Database.
            Explore the night sky star map with your name, discover named stars like Sirius, Vega, and Polaris,
            and enjoy our daily Star of the Day feature. This free interactive star name generator
            lets you see your name in the galaxy traced by actual stars in space.
            Search your name in constellations, visualize stellar astronomy online,
            and explore NASA-style star maps. Perfect for space lovers, astronomy fans,
            and anyone curious about the universe — type any name and see it shine across the cosmos tonight.
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
