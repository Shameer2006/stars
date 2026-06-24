import type { Metadata } from 'next';
import LegalPageLayout from '@/components/LegalPageLayout';

export const metadata: Metadata = {
  title: 'The History of Star Naming | Your Name in Stars',
  description: 'Discover how stars got their names, from ancient civilizations and mythology to modern astronomical catalogs like the HYG database.',
  alternates: {
    canonical: 'https://your-name-in-stars.vercel.app/learn/history-of-star-naming',
  },
};

export default function HistoryOfStarNamingPage() {
  return (
    <LegalPageLayout
      title="The History of Star Naming"
      subtitle="From ancient civilizations to modern astronomical catalogs"
    >
      <section className="legal-section">
        <h2>Ancient Origins and Mythology</h2>
        <p>
          For thousands of years, humans have looked up at the night sky and sought to bring order to the chaos of the cosmos. Long before telescopes were invented, early civilizations mapped the stars and gave them names rooted in mythology, agriculture, and navigation. The ancient Babylonians, Greeks, and Egyptians were among the first to formally group stars into constellations—imaginative patterns that represented gods, heroes, and mythical beasts.
        </p>
        <p>
          Many of the common star names we use today have Arabic origins. During the Middle Ages, while Europe was in the Dark Ages, Islamic astronomers preserved and expanded upon the astronomical knowledge of the Greeks. Translating works like Ptolemy&apos;s <em>Almagest</em>, they assigned names to individual stars. This is why many bright stars have names starting with &quot;Al-&quot; (the Arabic definite article), such as Aldebaran (&quot;The Follower&quot;) and Altair (&quot;The Flying Eagle&quot;).
        </p>
      </section>

      <section className="legal-section">
        <h2>The Bayer and Flamsteed Designations</h2>
        <p>
          As telescopes improved in the 17th century, the number of visible stars exploded, and naming them individually became impractical. In 1603, German astronomer Johann Bayer introduced a systematic naming convention. The Bayer designation assigns a Greek letter to a star, followed by the genitive form of its parent constellation&apos;s Latin name. Generally, the brightest star in a constellation is Alpha, the second brightest is Beta, and so on. For example, the brightest star in Centaurus is Alpha Centauri.
        </p>
        <p>
          In the early 18th century, the English astronomer John Flamsteed introduced another system. The Flamsteed designation uses numbers instead of Greek letters, numbering stars from west to east across a constellation. Thus, 61 Cygni is the 61st notable star in the constellation Cygnus when moving from right to left across the sky. Both Bayer and Flamsteed systems are still widely used today by amateur and professional astronomers alike.
        </p>
      </section>

      <section className="legal-section">
        <h2>Modern Astronomical Catalogs</h2>
        <p>
          In the modern era, the sheer volume of known stars—numbering in the billions—requires massive, computerized databases. Telescopes like the Gaia space observatory and the Hipparcos satellite have cataloged millions of stars with incredible precision. These catalogs use alphanumeric codes to identify stars based on their precise coordinates.
        </p>
        <p>
          For instance, the HYG Stellar Database (which powers our Your Name in the Stars tool) is a compilation of the Hipparcos catalog, the Yale Bright Star Catalog, and the Gliese catalog of nearby stars. In these databases, a star might simply be known as HIP 67301 or HD 128620. While less poetic than ancient names, these designations provide the precise mathematical data—such as right ascension, declination, and apparent magnitude—necessary for deep space navigation and astrophysical research.
        </p>
      </section>

      <section className="legal-section">
        <h2>Who Officially Names Stars Today?</h2>
        <p>
          Today, the sole recognized authority for naming celestial bodies is the International Astronomical Union (IAU). The IAU assigns official names to planets, moons, asteroids, and occasionally, specific prominent stars. They emphasize that the naming of stars should be a scientific endeavor, not a commercial one.
        </p>
        <p>
          Many commercial star registries offer the ability to &quot;buy&quot; a star name for a fee. However, these names are purely symbolic and are not recognized by the IAU, NASA, or any professional astronomical institution. This is why tools like <em>Your Name in the Stars</em> provide a wonderful alternative—they allow you to interact with the cosmos and create a personalized celestial map using real astronomical data, completely for free, without the pretense of an &quot;official&quot; registry.
        </p>
      </section>
    </LegalPageLayout>
  );
}
