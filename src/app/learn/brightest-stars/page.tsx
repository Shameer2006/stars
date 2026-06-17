import LegalPageLayout from '@/components/LegalPageLayout';

export default function BrightestStarsPage() {
  return (
    <LegalPageLayout
      title="A Guide to the Brightest Stars"
      subtitle="Exploring the luminaries of the night sky"
    >
      <section className="legal-section">
        <h2>Measuring Brightness: The Magnitude Scale</h2>
        <p>
          Before diving into the brightest stars, it is important to understand how astronomers measure stellar brightness. The system used is called <strong>Apparent Magnitude</strong>, originally devised by the ancient Greek astronomer Hipparchus. It is a reverse logarithmic scale: the lower the number, the brighter the star. 
        </p>
        <p>
          A star with a magnitude of 1.0 is about 2.5 times brighter than a star of magnitude 2.0. Stars with negative magnitudes are exceptionally bright. For context, the full Moon has an apparent magnitude of about -12.7, while the Sun is a blinding -26.7. The faintest stars visible to the naked eye under perfect, dark-sky conditions are around magnitude 6.0.
        </p>
      </section>

      <section className="legal-section">
        <h2>1. Sirius (The Dog Star)</h2>
        <p>
          <strong>Apparent Magnitude:</strong> -1.46<br />
          <strong>Constellation:</strong> Canis Major<br />
          <strong>Distance:</strong> 8.6 light-years
        </p>
        <p>
          Sirius is unequivocally the brightest star in the Earth&apos;s night sky. Visible from almost everywhere on the planet, its name is derived from the Greek word &quot;Seirios,&quot; meaning &quot;glowing&quot; or &quot;scorcher.&quot; Sirius is actually a binary star system consisting of a main-sequence star (Sirius A) and a faint white dwarf companion (Sirius B). Its brilliant appearance is largely due to its close proximity to Earth.
        </p>
      </section>

      <section className="legal-section">
        <h2>2. Canopus</h2>
        <p>
          <strong>Apparent Magnitude:</strong> -0.74<br />
          <strong>Constellation:</strong> Carina<br />
          <strong>Distance:</strong> 310 light-years
        </p>
        <p>
          Canopus is the second-brightest star in the sky, though it is mostly visible only to observers in the Southern Hemisphere and lower Northern latitudes. It is a yellow-white supergiant, vastly larger and more luminous than our Sun. Because of its extreme brightness and position far from the ecliptic, Canopus is frequently used by spacecraft for celestial navigation.
        </p>
      </section>

      <section className="legal-section">
        <h2>3. Rigil Kentaurus (Alpha Centauri)</h2>
        <p>
          <strong>Apparent Magnitude:</strong> -0.27 (combined)<br />
          <strong>Constellation:</strong> Centaurus<br />
          <strong>Distance:</strong> 4.37 light-years
        </p>
        <p>
          Alpha Centauri is famous for being the closest star system to our Solar System. To the naked eye, it appears as a single bright point of light, but it is actually a triple star system. Alpha Centauri A and B are sun-like stars orbiting a common center of mass, while the third star, Proxima Centauri, is a faint red dwarf that currently holds the title of the absolute closest individual star to Earth.
        </p>
      </section>

      <section className="legal-section">
        <h2>4. Arcturus</h2>
        <p>
          <strong>Apparent Magnitude:</strong> -0.05<br />
          <strong>Constellation:</strong> Boötes<br />
          <strong>Distance:</strong> 36.7 light-years
        </p>
        <p>
          Arcturus is the brightest star in the northern celestial hemisphere. It is a distinctively orange-hued red giant star, meaning it is in the later stages of its stellar life. Arcturus is relatively close to Earth and is moving through space at an unusually high speed relative to our Solar System, suggesting it may belong to an older population of stars known as the Milky Way&apos;s thick disk.
        </p>
      </section>

      <section className="legal-section">
        <h2>5. Vega</h2>
        <p>
          <strong>Apparent Magnitude:</strong> 0.03<br />
          <strong>Constellation:</strong> Lyra<br />
          <strong>Distance:</strong> 25 light-years
        </p>
        <p>
          Vega is a brilliant blue-white star and forms one corner of the famous &quot;Summer Triangle&quot; asterism. Historically, Vega served as the baseline for the apparent magnitude scale (defined as magnitude 0.0, though modern calibrations place it slightly above zero). Due to the precession of the Earth&apos;s equinoxes, Vega was the North Star around 12,000 BCE and will be so again around the year 13,727.
        </p>
      </section>
    </LegalPageLayout>
  );
}
