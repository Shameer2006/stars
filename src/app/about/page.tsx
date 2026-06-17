'use client';

import LegalPageLayout from '@/components/LegalPageLayout';

export default function AboutPage() {
  return (
    <LegalPageLayout
      title="About"
      subtitle="The story behind Your Name in Stars"
    >
      <section className="legal-section">
        <h2>What is Your Name in Stars?</h2>
        <p>
          <strong>Your Name in Stars</strong> is a free, interactive web experience that lets you see
          your name written across the night sky — traced by real stars from our galaxy. Every
          star you see is a real sun cataloged in the HYG Stellar Database.
        </p>
        <p>
          Type any name, and watch as each letter is formed by actual star positions — from the
          brilliant blaze of Sirius to the distant glow of stars thousands of light-years away.
        </p>
      </section>

      <section className="legal-section">
        <h2>How It Works</h2>
        <p>
          When you type a name, our algorithm maps each letter to a unique set of real stars from the
          HYG Stellar Database. Each star&apos;s position is based on its actual celestial coordinates —
          right ascension and declination — creating an authentic representation of your name
          drawn by the cosmos.
        </p>
        <p>
          We use a stereographic projection to accurately map these 3D celestial coordinates onto your 2D screen, ensuring that the relative angles and distances between the stars are preserved. Want to know the technical details? <a href="/how-it-works">Read our full guide on how the algorithm works.</a>
        </p>
        <ul>
          <li>
            <strong>8,700+ real stars</strong> from the HYG Stellar Database
          </li>
          <li>
            <strong>339 named stars</strong> including Sirius, Vega, Polaris, Betelgeuse, and more
          </li>
          <li>
            <strong>Real astronomical data</strong> — magnitude, distance, spectral type, and
            constellation
          </li>
          <li>
            <strong>Star of the Day</strong> — discover a new named star every day
          </li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>The Data & Education</h2>
        <p>
          All star positions are sourced from the{' '}
          <a
            href="/learn/hyg-stellar-database"
          >
            HYG Stellar Database
          </a>
          , a compilation of star data from the Hipparcos, Yale Bright Star, and Gliese catalogs.
          The database is freely available under the Creative Commons Attribution-ShareAlike 4.0 license.
        </p>
        <p>
          Each star carries real astronomical properties including its proper name (if one exists),
          apparent magnitude (brightness), distance in parsecs, right ascension, declination,
          spectral classification, and constellation membership. We believe this tool can be a great entry point into astronomy. Be sure to check out our <a href="/learn">Astronomy Articles</a> to learn more about the history of star naming, the brightest stars, and how to navigate the night sky.
        </p>
      </section>

      <section className="legal-section">
        <h2>Features</h2>
        <ul>
          <li>
            <strong>Name Visualization</strong> — see your name traced by real stars with
            beautiful cosmic animations
          </li>
          <li>
            <strong>Share &amp; Download</strong> — share your star name via a unique link,
            download as a high-resolution PNG, or generate a QR code
          </li>
          <li>
            <strong>Star of the Day</strong> — learn about a different named star every day,
            with links to detailed astronomical information
          </li>
          <li>
            <strong>Star Explorer</strong> — tap any star to see its real name, constellation,
            distance, brightness, and more
          </li>
          <li>
            <strong>Mobile Friendly</strong> — fully responsive design that works beautifully
            on any device
          </li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>Our Mission</h2>
        <p>
          We believe that astronomy should be accessible, beautiful, and personal. Your Name in Stars
          bridges the gap between scientific star data and human connection — making the vast
          cosmos feel just a little closer to home.
        </p>
        <p>
          Whether you&apos;re a lifelong stargazer, a curious kid, or someone looking for a unique way to
          celebrate a special name, we hope this tool brings a moment of wonder to your day.
        </p>
      </section>

      <section className="legal-section">
        <h2>Get in Touch</h2>
        <p>
          Have questions, ideas, or just want to say hello? Visit our{' '}
          <a href="/contact">Contact page</a> — we&apos;d love to hear from you.
        </p>
      </section>
    </LegalPageLayout>
  );
}
