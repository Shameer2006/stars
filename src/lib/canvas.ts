/**
 * Canvas drawing utilities for star rendering.
 * Handles all visual effects: glow, diffraction spikes, constellation lines,
 * background stars, twinkle animation.
 */

import { MappedStar } from '@/types/star';

// ── Color from stellar color index ──────────────────────────────────
/**
 * Convert B-V color index to an RGB color string.
 * Hot blue stars have ci ≈ -0.3, cool red stars have ci ≈ 2.0.
 */
export function starColor(ci?: number): string {
  if (ci === undefined || ci === null) return '#f0f0ff';
  const t = Math.max(-0.4, Math.min(2.0, ci));
  
  let r: number, g: number, b: number;
  
  if (t < 0) {
    // Blue-white (hot stars)
    r = 155 + (1 + t) * 100;
    g = 176 + (1 + t) * 80;
    b = 255;
  } else if (t < 0.4) {
    // White
    r = 255;
    g = 255 - t * 20;
    b = 255 - t * 60;
  } else if (t < 0.8) {
    // Yellow-white
    r = 255;
    g = 240 - (t - 0.4) * 80;
    b = 200 - (t - 0.4) * 150;
  } else if (t < 1.4) {
    // Orange
    r = 255;
    g = 200 - (t - 0.8) * 100;
    b = 120 - (t - 0.8) * 100;
  } else {
    // Red (cool stars)
    r = 255;
    g = 140 - (t - 1.4) * 80;
    b = 60 - (t - 1.4) * 40;
  }
  
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}

/**
 * Safely applies an alpha (opacity) value to a color string.
 * Supports hex colors (e.g., #ffffff) and rgb colors (e.g., rgb(255, 255, 255)).
 */
function applyAlpha(color: string, alpha: number): string {
  if (color.startsWith('#')) {
    const a = Math.round(alpha * 255).toString(16).padStart(2, '0');
    return `${color}${a}`;
  }
  if (color.startsWith('rgb(')) {
    return color.replace('rgb(', 'rgba(').replace(')', `, ${alpha})`);
  }
  return color;
}

// ── Map magnitude to radius ─────────────────────────────────────────
function magToRadius(mag: number, isNamed: boolean = false, isLetterStar: boolean = false): number {
  // Brighter stars (lower mag) get larger radius
  let base = Math.max(2, 10 - mag * 1.0);
  if (isLetterStar) base = Math.max(4, base * 1.5);  // Letter stars are prominent
  if (isNamed) base *= 1.3;                           // Named stars get a slight boost
  return Math.min(base, 10);                           // Cap so no star becomes a moon
}

// ── Deep space background ───────────────────────────────────────────
export function drawSpaceBackground(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number
): void {
  // Main gradient
  const grad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.7);
  grad.addColorStop(0, '#0c0c28');
  grad.addColorStop(0.5, '#08081e');
  grad.addColorStop(1, '#040412');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Subtle nebula tint
  ctx.save();
  ctx.globalAlpha = 0.04;
  const nebula = ctx.createRadialGradient(w * 0.3, h * 0.4, 0, w * 0.3, h * 0.4, w * 0.5);
  nebula.addColorStop(0, '#4a1a6b');
  nebula.addColorStop(1, 'transparent');
  ctx.fillStyle = nebula;
  ctx.fillRect(0, 0, w, h);

  const nebula2 = ctx.createRadialGradient(w * 0.7, h * 0.6, 0, w * 0.7, h * 0.6, w * 0.4);
  nebula2.addColorStop(0, '#1a2a5b');
  nebula2.addColorStop(1, 'transparent');
  ctx.fillStyle = nebula2;
  ctx.fillRect(0, 0, w, h);
  ctx.restore();
}

// ── Draw a single star with glow ────────────────────────────────────
export function drawStar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  mag: number,
  twinkle: number = 1.0,
  ci?: number,
  isNamed: boolean = false,
  isLetterStar: boolean = false
): void {
  const radius = magToRadius(mag, isNamed, isLetterStar) * twinkle;
  const color = isNamed ? '#ffd700' : starColor(ci);
  
  ctx.save();
  
  // Outer glow — letter stars get a bigger, more visible glow
  const glowMult = isNamed ? 6 : isLetterStar ? 5 : 3.5;
  const glowRadius = radius * glowMult;
  const glow = ctx.createRadialGradient(x, y, 0, x, y, glowRadius);
  glow.addColorStop(0, color);
  glow.addColorStop(0.1, applyAlpha(color, 0.7));
  glow.addColorStop(0.22, applyAlpha(color, 0.35));
  glow.addColorStop(0.4, applyAlpha(color, 0.15));
  glow.addColorStop(0.65, applyAlpha(color, 0.05));
  glow.addColorStop(1, 'transparent');
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(x, y, glowRadius, 0, Math.PI * 2);
  ctx.fill();

  // Core — letter stars get a bigger, brighter core
  ctx.fillStyle = '#ffffff';
  ctx.globalAlpha = twinkle;
  const coreMult = isLetterStar ? 0.8 : 0.6;
  ctx.beginPath();
  ctx.arc(x, y, radius * coreMult, 0, Math.PI * 2);
  ctx.fill();

  // Diffraction spikes — all letter stars get spikes
  if (isLetterStar || mag < 2.5 || isNamed) {
    drawDiffractionSpikes(ctx, x, y, radius, twinkle, isNamed ? '#ffd700' : '#ffffff');
  }

  ctx.restore();
}

// ── Diffraction spikes (cross pattern) ──────────────────────────────
function drawDiffractionSpikes(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  twinkle: number,
  color: string
): void {
  // Disabled diffraction spikes (star rays lines) as requested by the user.
  if (!ctx || !x || !y || !radius || !twinkle || !color) return;
  return;
}

// ── Background stars ────────────────────────────────────────────────
export function drawBackgroundStars(
  ctx: CanvasRenderingContext2D,
  bgStars: MappedStar[],
  time: number
): void {
  if (time === undefined) return;
  for (let i = 0; i < bgStars.length; i++) {
    const star = bgStars[i];
    const r = Math.min(1.5, Math.max(0.5, 2.5 - star.mag * 0.3));
    const color = starColor(star.ci);

    ctx.save();
    ctx.globalAlpha = 0.35; // Steady opacity, twinkling disabled
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(star.screenX, star.screenY, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

// ── Constellation lines between letter stars ────────────────────────
export function drawConstellationLines(
  ctx: CanvasRenderingContext2D,
  stars: MappedStar[]
): void {
  if (stars.length < 2) return;

  ctx.save();
  ctx.strokeStyle = 'rgba(212, 168, 86, 0.45)';
  ctx.lineWidth = 1.2;
  ctx.shadowColor = 'rgba(212, 168, 86, 0.3)';
  ctx.shadowBlur = 4;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  ctx.beginPath();
  ctx.moveTo(stars[0].screenX, stars[0].screenY);
  for (let i = 1; i < stars.length; i++) {
    ctx.lineTo(stars[i].screenX, stars[i].screenY);
  }
  ctx.stroke();

  ctx.restore();
}

// ── Letter label at bottom of tile ──────────────────────────────────
export function drawTileLabel(
  ctx: CanvasRenderingContext2D,
  letter: string,
  w: number,
  h: number
): void {
  ctx.save();
  ctx.fillStyle = 'rgba(212, 168, 86, 0.12)';
  ctx.font = `bold ${h * 0.7}px "Cinzel", serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(letter, w / 2, h / 2 + h * 0.05);
  ctx.restore();
}

// ── Full tile render (single frame) ─────────────────────────────────
export function renderTileFrame(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  letterStars: MappedStar[],
  bgStars: MappedStar[],
  letter: string,
  time: number
): void {
  // 1. Clear and draw background
  drawSpaceBackground(ctx, w, h);

  // 2. Background stars with twinkle
  drawBackgroundStars(ctx, bgStars, time);

  // 3. Constellation lines
  drawConstellationLines(ctx, letterStars);

  // 4. Letter stars — steady brightness, twinkling disabled
  for (let i = 0; i < letterStars.length; i++) {
    const star = letterStars[i];
    const twinkle = 1.0; // Constant steady brightness

    drawStar(
      ctx,
      star.screenX,
      star.screenY,
      star.mag,
      twinkle,
      star.ci,
      !!star.proper,
      true  // isLetterStar — render brighter
    );
  }
}

// ── Full-page background starfield ──────────────────────────────────
export interface BgFieldStar {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  phase: number;
  freq: number;
}

export function generateFieldStars(w: number, h: number, count: number = 400): BgFieldStar[] {
  const stars: BgFieldStar[] = [];
  for (let i = 0; i < count; i++) {
    // Use a deterministic pseudo-random for consistent layout
    const seed = i * 2654435761;
    const px = ((seed >>> 0) % 10000) / 10000;
    const py = (((seed * 2246822519) >>> 0) % 10000) / 10000;
    const pr = (((seed * 3266489917) >>> 0) % 10000) / 10000;

    stars.push({
      x: px * w,
      y: py * h,
      radius: 0.4 + pr * 1.8,
      opacity: 0.15 + pr * 0.45,
      phase: i * 2.39,
      freq: 0.3 + (i % 10) * 0.08,
    });
  }
  return stars;
}

export function renderFieldStars(
  ctx: CanvasRenderingContext2D,
  stars: BgFieldStar[],
  time: number,
  mouseX: number = 0,
  mouseY: number = 0,
  w: number,
  h: number
): void {
  // Background
  ctx.fillStyle = '#040412';
  ctx.fillRect(0, 0, w, h);

  // Subtle large nebula effects
  ctx.save();
  ctx.globalAlpha = 0.03;
  const n1 = ctx.createRadialGradient(w * 0.2, h * 0.3, 0, w * 0.2, h * 0.3, w * 0.4);
  n1.addColorStop(0, '#6b2fa0');
  n1.addColorStop(1, 'transparent');
  ctx.fillStyle = n1;
  ctx.fillRect(0, 0, w, h);
  
  const n2 = ctx.createRadialGradient(w * 0.8, h * 0.7, 0, w * 0.8, h * 0.7, w * 0.35);
  n2.addColorStop(0, '#1a3a6b');
  n2.addColorStop(1, 'transparent');
  ctx.fillStyle = n2;
  ctx.fillRect(0, 0, w, h);
  ctx.restore();

  // Parallax offset based on mouse
  const parallaxX = (mouseX - w / 2) * 0.015;
  const parallaxY = (mouseY - h / 2) * 0.015;

  for (const star of stars) {
    const x = star.x + parallaxX * star.radius;
    const y = star.y + parallaxY * star.radius;

    ctx.save();
    ctx.globalAlpha = star.opacity; // Steady opacity, twinkling disabled
    ctx.fillStyle = '#e8e8ff';
    ctx.beginPath();
    ctx.arc(x, y, star.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

export function renderRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
): void {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

// ── Download render (static, high-res, with label) ──────────────────
export function renderDownloadImage(
  letterResults: { letter: string; stars: MappedStar[]; bgStars: MappedStar[] }[],
  name: string,
  tileW: number,
  tileH: number
): HTMLCanvasElement {
  const gap = 12;
  const paddingX = 24;
  const paddingY = 28;
  const labelHeight = 90;

  // Calculate layout coordinates
  let canvasW = paddingX * 2;
  const tilePositions: number[] = [];

  letterResults.forEach((lr, i) => {
    tilePositions.push(canvasW);
    if (lr.letter === ' ') {
      canvasW += tileW * 0.4;
    } else {
      canvasW += tileW;
    }
    if (i < letterResults.length - 1) {
      canvasW += gap;
    }
  });
  canvasW += paddingX;
  const canvasH = tileH + paddingY * 2 + labelHeight;

  const canvas = document.createElement('canvas');
  canvas.width = canvasW * 2; // 2× for high res
  canvas.height = canvasH * 2;
  const ctx = canvas.getContext('2d')!;
  ctx.scale(2, 2);

  // 1. Draw solid dark background for the entire panorama
  ctx.fillStyle = '#060614';
  ctx.fillRect(0, 0, canvasW, canvasH);

  // 2. Render each tile panel
  const time = Date.now();
  letterResults.forEach((lr, i) => {
    if (lr.letter === ' ') return; // Skip space drawing, just leave the gap

    const x = tilePositions[i];
    const y = paddingY;

    ctx.save();
    
    // Create rounded clipping region for the tile card
    renderRoundedRect(ctx, x, y, tileW, tileH, 12);
    ctx.clip();

    // Translate to tile's origin to reuse local drawing functions
    ctx.translate(x, y);

    // Draw card background
    drawSpaceBackground(ctx, tileW, tileH);
    // Draw background stars
    drawBackgroundStars(ctx, lr.bgStars, time);
    // Draw constellation lines
    drawConstellationLines(ctx, lr.stars);

    // Draw letter stars
    for (let j = 0; j < lr.stars.length; j++) {
      const star = lr.stars[j];
      drawStar(ctx, star.screenX, star.screenY, star.mag, 1.0, star.ci, !!star.proper, true);
    }

    ctx.restore();

    // Draw a subtle border outline around the tile card
    ctx.save();
    renderRoundedRect(ctx, x, y, tileW, tileH, 12);
    ctx.strokeStyle = 'rgba(212, 168, 86, 0.22)'; // elegant warm gold border
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();
  });

  // 3. Draw the name at the bottom center
  ctx.fillStyle = '#d4a856';
  ctx.font = 'bold 24px "Cinzel", serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(name.toUpperCase(), canvasW / 2, tileH + paddingY + labelHeight / 2 - 12);
  
  ctx.fillStyle = '#9ca3af';
  ctx.font = '14px "Cormorant Garamond", serif';
  (ctx as unknown as { letterSpacing: string }).letterSpacing = '3px'; // Supported in modern browsers
  ctx.fillText('WRITTEN IN REAL STARS', canvasW / 2, tileH + paddingY + labelHeight / 2 + 12);

  return canvas;
}


