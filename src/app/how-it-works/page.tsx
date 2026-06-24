import type { Metadata } from 'next';
import LegalPageLayout from '@/components/LegalPageLayout';

export const metadata: Metadata = {
  title: 'How It Works | Your Name in Stars',
  description: 'Discover the technology and science behind Your Name in the Stars. Learn how we map your name to real celestial coordinates using the HYG Stellar Database.',
  alternates: {
    canonical: 'https://your-name-in-stars.vercel.app/how-it-works',
  },
};

export default function HowItWorksPage() {
  return (
    <LegalPageLayout
      title="How It Works"
      subtitle="The technology and science behind Your Name in the Stars"
    >
      <section className="legal-section">
        <h2>From Text to Stars</h2>
        <p>
          Have you ever wondered how we magically transform your typed name into a stunning celestial map? The process involves a blend of astronomy, mathematics, and creative coding. <em>Your Name in the Stars</em> isn&apos;t just a random scattering of light dots; it is a meticulously calculated projection of real star data.
        </p>
      </section>

      <section className="legal-section">
        <h2>1. The HYG Stellar Database</h2>
        <p>
          The foundation of our tool is the HYG Stellar Database. This database contains detailed records of tens of thousands of stars. For our application, we have filtered this down to approximately 8,700 of the brightest and most prominent stars—the ones you might actually see on a very clear, dark night. 
        </p>
        <p>
          Every star in our system has a specific <strong>Right Ascension (RA)</strong> and <strong>Declination (Dec)</strong>. These are the celestial coordinates that pinpoint exactly where a star is located in the sky relative to Earth.
        </p>
      </section>

      <section className="legal-section">
        <h2>2. Mapping Letters to Coordinates</h2>
        <p>
          When you type a letter, our algorithm doesn&apos;t just draw a shape on the screen. Instead, it uses a predefined vector template for each letter of the alphabet. For instance, the letter &quot;A&quot; consists of a series of points forming a triangle with a crossbar.
        </p>
        <p>
          The magic happens when we overlay this vector template onto a region of the celestial sphere. The algorithm scans the HYG database to find the real stars that are closest to the geometric points of the letter. This means the lines you see tracing your name are physically connecting real stars in our galaxy!
        </p>
      </section>

      <section className="legal-section">
        <h2>3. Visualizing Magnitude</h2>
        <p>
          In astronomy, the brightness of a star is measured by its &quot;Apparent Magnitude.&quot; A lower magnitude number means a brighter star. When our tool renders the stars on your screen, it uses this magnitude data to determine the size and opacity of each star. 
        </p>
        <p>
          A star like Sirius (Magnitude -1.46) will appear much larger and brighter on your screen than a faint background star with a magnitude of 5.5. This creates a realistic, three-dimensional feel to the star map, mimicking how you actually perceive the night sky.
        </p>
      </section>

      <section className="legal-section">
        <h2>4. The Stereographic Projection</h2>
        <p>
          The sky is a 3D sphere, but your screen is a 2D flat surface. To accurately display the stars, we use a mathematical technique called a <strong>Stereographic Projection</strong>. This is the same technique cartographers use to draw maps of the Earth. It smoothly translates the spherical RA and Dec coordinates into X and Y coordinates on your screen while preserving the relative angles between the stars.
        </p>
      </section>

      <section className="legal-section">
        <h2>Why Do We Do This?</h2>
        <p>
          We created <em>Your Name in the Stars</em> to make astronomy engaging and personal. By using real scientific data instead of random generation, we hope to spark curiosity about the universe. Every time you generate a name, you are looking at a unique, mathematically accurate slice of our galaxy. It&apos;s a completely free, educational alternative to commercial star registries.
        </p>
      </section>
    </LegalPageLayout>
  );
}
