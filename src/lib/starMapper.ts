/**
 * Star Mapper — Maps letters to sky zones and matches real stars to letter shapes.
 * 
 * The sky (RA 0–24h) is divided into 26 zones, one per letter.
 * Within each zone, we match dot-matrix letter points to the nearest real stars.
 */

import { Star, MappedStar, LetterResult } from '@/types/star';
import { LETTER_DOTS, GRID_WIDTH, GRID_HEIGHT } from './letterDots';

// Each letter gets a ~0.923h slice of Right Ascension
const RA_TOTAL = 24;
const RA_SLICE = RA_TOTAL / 26;

// Declination range to use (avoid extreme polar regions)
const DEC_MIN = -45;
const DEC_MAX = 75;
const DEC_RANGE = DEC_MAX - DEC_MIN;

/**
 * Get the RA zone for a given letter.
 */
export function getZoneForLetter(letter: string): [number, number] {
  const index = letter.toUpperCase().charCodeAt(0) - 65; // A=0, B=1, ...
  if (index < 0 || index > 25) return [0, RA_SLICE];
  const raMin = index * RA_SLICE;
  const raMax = (index + 1) * RA_SLICE;
  return [raMin, raMax];
}

/**
 * Filter stars to those within a given RA/Dec zone.
 */
export function getStarsInZone(
  stars: Star[],
  raMin: number,
  raMax: number,
  decMin: number = DEC_MIN,
  decMax: number = DEC_MAX
): Star[] {
  return stars.filter(
    (s) => s.ra >= raMin && s.ra < raMax && s.dec >= decMin && s.dec <= decMax
  );
}

/**
 * Match real stars to dot-matrix letter points using nearest-neighbor.
 * Returns the matched stars with screen positions + background stars.
 */
export function matchStarsToLetter(
  letter: string,
  allStars: Star[],
  tileWidth: number,
  tileHeight: number
): LetterResult {
  const upperLetter = letter.toUpperCase();
  const [raMin, raMax] = getZoneForLetter(upperLetter);
  const zoneStars = getStarsInZone(allStars, raMin, raMax);

  const dots = LETTER_DOTS[upperLetter];
  if (!dots || zoneStars.length === 0) {
    return {
      letter: upperLetter,
      stars: [],
      bgStars: [],
      anchorStar: null,
      raRange: [raMin, raMax],
    };
  }

  // Padding so stars don't sit right at tile edges
  const padX = tileWidth * 0.12;
  const padY = tileHeight * 0.10;
  const innerW = tileWidth - padX * 2;
  const innerH = tileHeight - padY * 2;

  const usedStarIds = new Set<number>();
  const mappedStars: MappedStar[] = [];

  for (const [gx, gy] of dots) {
    // Normalize dot to 0–1 range
    const nx = gx / GRID_WIDTH;
    const ny = gy / GRID_HEIGHT;

    // Map normalized position to RA/Dec in the zone
    const targetRA = raMin + nx * (raMax - raMin);
    const targetDec = DEC_MAX - ny * DEC_RANGE; // flip: top=high dec

    // Find nearest unused star
    let bestStar: Star | null = null;
    let bestDist = Infinity;

    for (const star of zoneStars) {
      if (usedStarIds.has(star.id)) continue;

      // Angular distance approximation (scaled so RA and Dec contribute equally)
      const dRA = (star.ra - targetRA) * 15 * Math.cos((star.dec * Math.PI) / 180);
      const dDec = star.dec - targetDec;
      const d = dRA * dRA + dDec * dDec;

      if (d < bestDist) {
        bestDist = d;
        bestStar = star;
      }
    }

    if (bestStar) {
      usedStarIds.add(bestStar.id);
      // Project to screen position based on grid position (not star position)
      // This ensures the letter is readable regardless of actual star positions
      const screenX = padX + nx * innerW;
      const screenY = padY + ny * innerH;
      mappedStars.push({ ...bestStar, screenX, screenY });
    }
  }

  // Select ~80 background stars (not used in the letter)
  const bgCandidates = zoneStars.filter((s) => !usedStarIds.has(s.id));
  const bgStars: MappedStar[] = [];
  
  if (bgCandidates.length > 0) {
    const bgCount = Math.min(80, bgCandidates.length);
    
    // Use a seeded selection to keep it deterministic per letter
    const seed = upperLetter.charCodeAt(0);
    for (let i = 0; i < bgCount; i++) {
      const idx = (seed * 137 + i * 97) % bgCandidates.length;
      const star = bgCandidates[idx];
      if (bgStars.find((bs) => bs.id === star.id)) continue;
      
      // Project background star to screen using its actual RA/Dec
      const sx = padX + ((star.ra - raMin) / (raMax - raMin)) * innerW;
      const sy = padY + ((DEC_MAX - star.dec) / DEC_RANGE) * innerH;
      bgStars.push({ ...star, screenX: sx, screenY: sy });
    }
  }

  // Find anchor star: brightest named star, or brightest star overall
  const namedStars = mappedStars.filter((s) => s.proper);
  const anchorStar =
    namedStars.length > 0
      ? namedStars.reduce((a, b) => (a.mag < b.mag ? a : b))
      : mappedStars.length > 0
      ? mappedStars.reduce((a, b) => (a.mag < b.mag ? a : b))
      : null;

  return {
    letter: upperLetter,
    stars: mappedStars,
    bgStars,
    anchorStar,
    raRange: [raMin, raMax],
  };
}

/**
 * Process a full name into letter results.
 */
export function processName(
  name: string,
  allStars: Star[],
  tileWidth: number,
  tileHeight: number
): LetterResult[] {
  const letters = name
    .toUpperCase()
    .split('')
    .filter((ch) => /[A-Z]/.test(ch) || ch === ' ');

  return letters.map((ch) => {
    if (ch === ' ') {
      return {
        letter: ' ',
        stars: [],
        bgStars: [],
        anchorStar: null,
        raRange: [0, 0],
      };
    }
    return matchStarsToLetter(ch, allStars, tileWidth, tileHeight);
  });
}
