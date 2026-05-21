'use client';

import { motion } from 'framer-motion';
import { WikiFullContent } from '@/lib/wikipedia';
import { Star } from '@/types/star';

interface StarDetailClientProps {
  wikiContent: WikiFullContent | null;
  starData: Star | null;
  decodedName: string;
}

/**
 * Helper to convert B-V color index to an approximate star color.
 */
function getStarColor(ci: number | undefined): { color: string; label: string } {
  if (ci === undefined || ci === null) return { color: '#ffffff', label: 'Unknown' };
  if (ci < -0.3) return { color: '#9bb0ff', label: 'Deep Blue' };
  if (ci < -0.02) return { color: '#aabfff', label: 'Blue-White' };
  if (ci < 0.15) return { color: '#cad7ff', label: 'White' };
  if (ci < 0.3) return { color: '#f8f7ff', label: 'Yellow-White' };
  if (ci < 0.6) return { color: '#fff4ea', label: 'Pale Yellow' };
  if (ci < 1.0) return { color: '#ffd2a1', label: 'Yellow-Orange' };
  if (ci < 1.4) return { color: '#ffaa72', label: 'Orange' };
  return { color: '#ff8866', label: 'Red-Orange' };
}

/**
 * Helper to get a magnitude description label.
 */
function getMagnitudeLabel(mag: number): string {
  if (mag < 0) return 'Exceptionally Bright';
  if (mag < 1) return 'Very Bright';
  if (mag < 2) return 'Bright';
  if (mag < 3) return 'Visible to Naked Eye';
  if (mag < 4) return 'Faint but Visible';
  if (mag < 5) return 'Dim';
  return 'Very Faint';
}

// Full constellation name map for the abbreviations used in the HYG database
const constellationNames: Record<string, string> = {
  And: 'Andromeda', Ant: 'Antlia', Aps: 'Apus', Aqr: 'Aquarius', Aql: 'Aquila',
  Ara: 'Ara', Ari: 'Aries', Aur: 'Auriga', Boo: 'Boötes', Cae: 'Caelum',
  Cam: 'Camelopardalis', Cnc: 'Cancer', CVn: 'Canes Venatici', CMa: 'Canis Major',
  CMi: 'Canis Minor', Cap: 'Capricornus', Car: 'Carina', Cas: 'Cassiopeia',
  Cen: 'Centaurus', Cep: 'Cepheus', Cet: 'Cetus', Cha: 'Chamaeleon',
  Cir: 'Circinus', Col: 'Columba', Com: 'Coma Berenices', CrA: 'Corona Australis',
  CrB: 'Corona Borealis', Crv: 'Corvus', Crt: 'Crater', Cru: 'Crux',
  Cyg: 'Cygnus', Del: 'Delphinus', Dor: 'Dorado', Dra: 'Draco',
  Equ: 'Equuleus', Eri: 'Eridanus', For: 'Fornax', Gem: 'Gemini',
  Gru: 'Grus', Her: 'Hercules', Hor: 'Horologium', Hya: 'Hydra',
  Hyi: 'Hydrus', Ind: 'Indus', Lac: 'Lacerta', Leo: 'Leo',
  LMi: 'Leo Minor', Lep: 'Lepus', Lib: 'Libra', Lup: 'Lupus',
  Lyn: 'Lynx', Lyr: 'Lyra', Men: 'Mensa', Mic: 'Microscopium',
  Mon: 'Monoceros', Mus: 'Musca', Nor: 'Norma', Oct: 'Octans',
  Oph: 'Ophiuchus', Ori: 'Orion', Pav: 'Pavo', Peg: 'Pegasus',
  Per: 'Perseus', Phe: 'Phoenix', Pic: 'Pictor', Psc: 'Pisces',
  PsA: 'Piscis Austrinus', Pup: 'Puppis', Pyx: 'Pyxis', Ret: 'Reticulum',
  Sge: 'Sagitta', Sgr: 'Sagittarius', Sco: 'Scorpius', Scl: 'Sculptor',
  Sct: 'Scutum', Ser: 'Serpens', Sex: 'Sextans', Tau: 'Taurus',
  Tel: 'Telescopium', Tri: 'Triangulum', TrA: 'Triangulum Australe', Tuc: 'Tucana',
  UMa: 'Ursa Major', UMi: 'Ursa Minor', Vel: 'Vela', Vir: 'Virgo',
  Vol: 'Volans', Vul: 'Vulpecula',
};

export default function StarDetailClient({ wikiContent, starData, decodedName }: StarDetailClientProps) {
  if (!wikiContent) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <div className="text-6xl mb-6 text-amber-400/30">★</div>
        <h1 className="text-3xl font-cinzel text-white mb-3">Star Not Found</h1>
        <p className="text-gray-400 font-cormorant text-lg max-w-md mx-auto">
          We couldn&apos;t find detailed information for <span className="text-amber-300">{decodedName}</span> on Wikipedia.
        </p>
      </motion.div>
    );
  }

  const { summary, sections } = wikiContent;
  const starColor = starData ? getStarColor(starData.ci) : null;
  const conFullName = starData?.con ? constellationNames[starData.con] || starData.con : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-4xl mx-auto flex flex-col items-center"
    >
      {/* Badge */}
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="text-xs sm:text-sm uppercase tracking-[0.3em] text-amber-400/80 mb-6 font-sans font-medium px-4 py-1.5 rounded-full border border-amber-400/20 bg-amber-400/5"
      >
        ★ Star of the Day
      </motion.span>

      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {summary.originalimage || summary.thumbnail ? (
          <div className="relative w-52 h-52 sm:w-72 sm:h-72 md:w-80 md:h-80 mb-8 rounded-full overflow-hidden shadow-[0_0_80px_rgba(212,168,86,0.2)] border-2 border-white/10">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 z-10" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={summary.originalimage?.source || summary.thumbnail?.source}
              alt={summary.title}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="relative w-52 h-52 sm:w-72 sm:h-72 md:w-80 md:h-80 mb-8 rounded-full border-2 border-white/10 flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-950">
            <div
              className="w-20 h-20 rounded-full blur-xl absolute"
              style={{ backgroundColor: starColor?.color || '#ffd2a1', opacity: 0.3 }}
            />
            <span className="text-7xl text-amber-400/20 relative z-10">★</span>
          </div>
        )}
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-4xl sm:text-5xl md:text-6xl font-cinzel font-semibold mb-3 bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 bg-clip-text text-transparent text-center"
      >
        {summary.title}
      </motion.h1>

      {/* Wikipedia description badge */}
      {summary.description && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-sm text-gray-400 font-cormorant italic tracking-wide mb-6 text-center"
        >
          {summary.description}
        </motion.p>
      )}

      {/* Star Properties Grid */}
      {starData && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-8"
        >
          {/* Magnitude */}
          <div className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-xl p-4 text-center">
            <div className="text-[10px] uppercase tracking-[0.15em] text-gray-500 font-sans mb-1.5">Magnitude</div>
            <div className="text-xl font-cinzel text-white font-semibold">{starData.mag.toFixed(2)}</div>
            <div className="text-[10px] text-amber-400/70 font-sans mt-1">{getMagnitudeLabel(starData.mag)}</div>
          </div>

          {/* Distance */}
          <div className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-xl p-4 text-center">
            <div className="text-[10px] uppercase tracking-[0.15em] text-gray-500 font-sans mb-1.5">Distance</div>
            <div className="text-xl font-cinzel text-white font-semibold">{starData.dist > 0 ? starData.dist.toLocaleString() : '—'}</div>
            <div className="text-[10px] text-amber-400/70 font-sans mt-1">light-years</div>
          </div>

          {/* Constellation */}
          {conFullName && (
            <div className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-xl p-4 text-center">
              <div className="text-[10px] uppercase tracking-[0.15em] text-gray-500 font-sans mb-1.5">Constellation</div>
              <div className="text-lg font-cinzel text-white font-semibold truncate">{conFullName}</div>
              <div className="text-[10px] text-amber-400/70 font-sans mt-1">{starData.con}</div>
            </div>
          )}

          {/* Star Color */}
          {starColor && (
            <div className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-xl p-4 text-center">
              <div className="text-[10px] uppercase tracking-[0.15em] text-gray-500 font-sans mb-1.5">Star Color</div>
              <div className="flex items-center justify-center gap-2">
                <div
                  className="w-4 h-4 rounded-full border border-white/20 shadow-lg"
                  style={{ backgroundColor: starColor.color, boxShadow: `0 0 12px ${starColor.color}40` }}
                />
                <span className="text-sm font-sans text-white">{starColor.label}</span>
              </div>
              <div className="text-[10px] text-amber-400/70 font-sans mt-1">B-V: {starData.ci?.toFixed(2)}</div>
            </div>
          )}

          {/* Right Ascension */}
          <div className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-xl p-4 text-center">
            <div className="text-[10px] uppercase tracking-[0.15em] text-gray-500 font-sans mb-1.5">Right Ascension</div>
            <div className="text-lg font-cinzel text-white font-semibold">{starData.ra.toFixed(4)}h</div>
            <div className="text-[10px] text-amber-400/70 font-sans mt-1">celestial longitude</div>
          </div>

          {/* Declination */}
          <div className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-xl p-4 text-center">
            <div className="text-[10px] uppercase tracking-[0.15em] text-gray-500 font-sans mb-1.5">Declination</div>
            <div className="text-lg font-cinzel text-white font-semibold">{starData.dec > 0 ? '+' : ''}{starData.dec.toFixed(4)}°</div>
            <div className="text-[10px] text-amber-400/70 font-sans mt-1">celestial latitude</div>
          </div>
        </motion.div>
      )}

      {/* Lead Extract */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white/[0.03] backdrop-blur-md border border-white/[0.08] rounded-2xl p-6 sm:p-8 mb-6 w-full shadow-xl"
      >
        <div 
          className="prose prose-invert prose-lg md:prose-xl font-cormorant font-medium tracking-wide text-gray-100 leading-relaxed text-center max-w-none"
          dangerouslySetInnerHTML={{ __html: summary.extract_html }}
        />
      </motion.div>

      {/* Full Wikipedia Content Sections */}
      {sections.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="w-full space-y-4 mb-8"
        >
          {sections.map((section, idx) => (
            <details
              key={idx}
              className="group bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] rounded-xl overflow-hidden"
              open={idx === 0}
            >
              <summary className="flex items-center justify-between px-5 py-4 cursor-pointer select-none hover:bg-white/[0.03] transition-colors">
                <h2 className="text-base sm:text-lg font-cinzel font-semibold text-amber-200/90 tracking-wide">
                  {section.title}
                </h2>
                <svg
                  className="w-4 h-4 text-gray-500 transition-transform group-open:rotate-180 flex-shrink-0 ml-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </summary>
              <div className="px-5 pb-5 border-t border-white/[0.04]">
                <div
                  className="prose prose-invert prose-sm sm:prose-base font-cormorant tracking-wide text-gray-200 leading-relaxed max-w-none pt-4
                    [&_table]:border-collapse [&_table]:w-full [&_table]:text-xs [&_table]:font-sans
                    [&_th]:bg-white/5 [&_th]:border [&_th]:border-white/10 [&_th]:px-2 [&_th]:py-1.5 [&_th]:text-left [&_th]:text-amber-300/80 [&_th]:text-[11px] [&_th]:uppercase [&_th]:tracking-wider
                    [&_td]:border [&_td]:border-white/5 [&_td]:px-2 [&_td]:py-1 [&_td]:text-gray-300
                    [&_a]:text-amber-400/80 [&_a]:no-underline hover:[&_a]:text-amber-300 hover:[&_a]:underline
                    [&_img]:rounded-lg [&_img]:border [&_img]:border-white/10 [&_img]:my-2
                    [&_.mw-ref]:hidden [&_.mw-cite-backlink]:hidden [&_sup]:hidden"
                  dangerouslySetInnerHTML={{ __html: section.html }}
                />
              </div>
            </details>
          ))}
        </motion.div>
      )}

      {/* Wikipedia Link Button */}
      <motion.a
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        href={summary.content_urls.desktop.page}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 mb-8 px-8 py-3 rounded-full border border-white/15 bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 text-sm uppercase tracking-widest font-semibold font-sans inline-flex items-center gap-2.5 hover:scale-105"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
        Read Full Article on Wikipedia
      </motion.a>
    </motion.div>
  );
}
