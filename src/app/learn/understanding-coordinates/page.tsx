import LegalPageLayout from '@/components/LegalPageLayout';

export default function CelestialCoordinatesPage() {
  return (
    <LegalPageLayout
      title="Understanding Celestial Coordinates"
      subtitle="How astronomers navigate the night sky"
    >
      <section className="legal-section">
        <h2>The Celestial Sphere</h2>
        <p>
          To understand how we map the positions of stars, it helps to imagine the &quot;Celestial Sphere.&quot; Picture a gigantic, imaginary globe surrounding the Earth. Every star, planet, and galaxy we see from Earth is projected onto the inside of this sphere. Just as we use longitude and latitude to pinpoint locations on Earth&apos;s surface, astronomers use a similar grid system to locate objects on the celestial sphere.
        </p>
        <p>
          This coordinate system is essential not only for pointing telescopes but also for rendering the precise star maps used in our <em>Your Name in the Stars</em> tool.
        </p>
      </section>

      <section className="legal-section">
        <h2>Declination (The Celestial Latitude)</h2>
        <p>
          <strong>Declination (Dec)</strong> is the astronomical equivalent of latitude. It measures an object&apos;s angular distance north or south of the Celestial Equator (which is simply Earth&apos;s equator projected outward into space).
        </p>
        <ul>
          <li>The Celestial Equator is at 0 degrees Declination.</li>
          <li>The North Celestial Pole (near Polaris, the North Star) is at +90 degrees Declination.</li>
          <li>The South Celestial Pole is at -90 degrees Declination.</li>
        </ul>
        <p>
          If a star has a declination of +45°, it lies halfway between the celestial equator and the north celestial pole.
        </p>
      </section>

      <section className="legal-section">
        <h2>Right Ascension (The Celestial Longitude)</h2>
        <p>
          <strong>Right Ascension (RA)</strong> is the astronomical equivalent of longitude. It measures the angular distance eastward along the celestial equator. However, unlike terrestrial longitude which is measured in degrees, Right Ascension is traditionally measured in units of time: Hours, Minutes, and Seconds.
        </p>
        <p>
          The sky is divided into 24 hours of RA. Because the Earth completes one rotation (360 degrees) every 24 hours, 1 hour of RA equals 15 degrees of sky. The starting point for RA (0 hours) is known as the First Point of Aries, which is the position of the Sun at the exact moment of the vernal (spring) equinox.
        </p>
      </section>

      <section className="legal-section">
        <h2>Putting It Together</h2>
        <p>
          By combining Right Ascension and Declination, astronomers can pinpoint the exact location of any star. For example, the bright star Sirius has the coordinates:
        </p>
        <ul>
          <li><strong>RA:</strong> 06h 45m 08.9s</li>
          <li><strong>Dec:</strong> -16° 42&apos; 58&quot;</li>
        </ul>
        <p>
          When you use our tool to write your name in the stars, the algorithm looks up these exact RA and Dec coordinates for thousands of stars in the HYG Stellar Database, projects them onto a 2D canvas, and connects the specific stars that form the letters of your name.
        </p>
      </section>

      <section className="legal-section">
        <h2>Epoch J2000.0</h2>
        <p>
          Because the Earth &quot;wobbles&quot; slightly on its axis over thousands of years (a motion called precession), the celestial coordinates of stars slowly change. Therefore, coordinates must be given for a specific date, known as an &quot;epoch.&quot; The current standard used by astronomers and star catalogs (including the one powering our site) is Epoch J2000.0, which refers to the positions of stars exactly at noon on January 1, 2000.
        </p>
      </section>
    </LegalPageLayout>
  );
}
