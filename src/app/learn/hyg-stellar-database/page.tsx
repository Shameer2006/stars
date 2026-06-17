import LegalPageLayout from '@/components/LegalPageLayout';

export default function HYGDatabasePage() {
  return (
    <LegalPageLayout
      title="Understanding the HYG Stellar Database"
      subtitle="The real science behind our interactive celestial maps"
    >
      <section className="legal-section">
        <h2>What is the HYG Database?</h2>
        <p>
          The HYG Stellar Database is an essential resource in the astronomical community, providing a comprehensive catalog of star data. The acronym &quot;HYG&quot; stands for the three major catalogs it merges: the <strong>H</strong>ipparcos Catalog, the <strong>Y</strong>ale Bright Star Catalog, and the <strong>G</strong>liese Catalog of Nearby Stars. Compiled by astronomer David Nash, the HYG database simplifies massive amounts of complex astrophysical data into a unified, accessible format.
        </p>
        <p>
          At <em>Your Name in the Stars</em>, we utilize a subset of this database containing over 8,700 of the brightest and most prominent stars in the night sky. By tapping into this real scientific data, we ensure that every point of light you see on your generated star map corresponds to a physical sun burning millions of miles away in our galaxy.
        </p>
      </section>

      <section className="legal-section">
        <h2>The Three Pillars of HYG</h2>
        <p>
          To understand the power of the HYG database, it helps to understand its three foundational catalogs:
        </p>
        <ul>
          <li>
            <strong>Hipparcos Catalog:</strong> The result of the European Space Agency&apos;s Hipparcos mission (1989-1993), which was the first space experiment devoted to precision astrometry. It accurately measured the positions, parallaxes, and proper motions of over 118,000 stars.
          </li>
          <li>
            <strong>Yale Bright Star Catalog:</strong> Originally published in 1930, this catalog lists all stars of stellar magnitude 6.5 or brighter—essentially, every star visible to the naked eye from Earth. It provides detailed notes on standard star names, colors, and binary systems.
          </li>
          <li>
            <strong>Gliese Catalog of Nearby Stars:</strong> Compiled by Wilhelm Gliese in 1957, this catalog attempts to list all known stars within 25 parsecs (about 81.5 light-years) of Earth. It is crucial for understanding our immediate interstellar neighborhood.
          </li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>What Data Do We Use?</h2>
        <p>
          When you map a name using our tool, the algorithm pulls specific pieces of data from the HYG database to construct an accurate celestial visualization. The primary data points include:
        </p>
        <p>
          <strong>Right Ascension (RA) and Declination (Dec):</strong> These are the celestial equivalents of longitude and latitude. They provide the exact coordinates of a star on the celestial sphere, allowing us to accurately plot their relative positions on your screen.
        </p>
        <p>
          <strong>Apparent Magnitude:</strong> This value represents how bright a star appears from Earth. In our visualization, a star&apos;s apparent magnitude dictates how large and bright it renders on your screen. Lower magnitude numbers mean brighter stars (Sirius, the brightest star, has a magnitude of -1.46).
        </p>
        <p>
          <strong>Distance and Spectral Type:</strong> The database also provides the distance of the star in parsecs and its spectral classification (which determines its color, ranging from cool red dwarfs to hot blue giants). While these are subtle details, they add to the scientific authenticity of the tool.
        </p>
      </section>

      <section className="legal-section">
        <h2>Bridging Science and Art</h2>
        <p>
          The HYG Stellar Database is released under a Creative Commons license, encouraging developers, educators, and artists to use astronomical data in creative ways. By turning raw, tabular data of RA and Dec coordinates into beautiful, personalized star maps, we hope to inspire curiosity about the cosmos. It transforms abstract numbers into a tangible connection with the universe, proving that science and art are deeply intertwined.
        </p>
      </section>
    </LegalPageLayout>
  );
}
