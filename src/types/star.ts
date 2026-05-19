export interface Star {
  id: number;
  ra: number;       // Right Ascension (0–24h)
  dec: number;      // Declination (-90° to +90°)
  mag: number;      // Apparent magnitude (lower = brighter)
  proper?: string;  // Common name: "Sirius", "Vega"
  dist: number;     // Distance in light-years
  con?: string;     // Constellation: "CMa", "Lyr"
  ci?: number;      // Color index (B-V)
}

export interface MappedStar extends Star {
  screenX: number;  // Projected canvas X position
  screenY: number;  // Projected canvas Y position
}

export interface LetterResult {
  letter: string;
  stars: MappedStar[];
  bgStars: MappedStar[];
  anchorStar: Star | null;
  raRange: [number, number];
}

export interface StarOfDayData {
  star: Star;
  dayIndex: number;
  visibilityLabel: string;
}
