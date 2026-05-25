/**
 * prepare-stars.mjs
 * 
 * One-time build script that downloads the HYG v3 star catalog CSV
 * and processes it into compact JSON files for the web app.
 * 
 * Usage: node scripts/prepare-stars.mjs
 * 
 * Outputs:
 *   public/data/stars.json       — ~9,000 stars (mag < 6.5)
 *   public/data/named-stars.json — ~400 named stars
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, createWriteStream } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createGunzip } from 'zlib';
import { pipeline } from 'stream/promises';
import https from 'https';
import http from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');
const DATA_DIR = join(ROOT, 'public', 'data');
const CSV_PATH = join(ROOT, 'scripts', 'hygdata_v37.csv');

// Official download URLs from astronexus.com
const CSV_URL_GZ = 'https://www.astronexus.com/downloads/catalogs/hygdata_v37.csv.gz';

async function downloadAndDecompress(url, dest) {
  return new Promise((resolve, reject) => {
    console.log(`Downloading: ${url}`);
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, { headers: { 'User-Agent': 'star-name-app/1.0' } }, (response) => {
      // Handle redirects
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return downloadAndDecompress(response.headers.location, dest).then(resolve).catch(reject);
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode} for ${url}`));
        return;
      }

      const file = createWriteStream(dest);
      const gunzip = createGunzip();

      response.pipe(gunzip).pipe(file);
      file.on('finish', () => { file.close(); console.log('Download + decompress complete'); resolve(); });
      file.on('error', reject);
      gunzip.on('error', reject);
    }).on('error', reject);
  });
}

function parseCSV(csvText) {
  const lines = csvText.split('\n');
  // Strip quotes from headers
  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
  
  console.log(`CSV headers: ${headers.slice(0, 10).join(', ')}...`);
  console.log(`Total rows: ${lines.length - 1}`);

  const stars = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Parse CSV handling quoted values
    const values = [];
    let current = '';
    let inQuotes = false;
    for (let c = 0; c < line.length; c++) {
      const ch = line[c];
      if (ch === '"') {
        inQuotes = !inQuotes;
      } else if (ch === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += ch;
      }
    }
    values.push(current.trim());

    const row = {};
    headers.forEach((h, idx) => {
      row[h] = values[idx] || '';
    });

    const mag = parseFloat(row.mag);
    const ra = parseFloat(row.ra);
    const dec = parseFloat(row.dec);
    const dist = parseFloat(row.dist);
    const ci = parseFloat(row.ci);

    // Filter: visible stars with valid data
    if (isNaN(mag) || isNaN(ra) || isNaN(dec)) continue;
    if (mag > 6.5) continue;
    if (!isNaN(dist) && dist >= 100000) continue; // bad parallax data

    const proper = row.proper?.trim();
    const con = row.con?.trim();

    const star = {
      id: parseInt(row.id) || i,
      ra: Math.round(ra * 10000) / 10000,
      dec: Math.round(dec * 10000) / 10000,
      mag: Math.round(mag * 100) / 100,
      dist: !isNaN(dist) ? Math.round(dist * 3.262 * 10) / 10 : 0, // parsecs → light-years
      con: con || undefined,
      proper: proper || undefined,
      ci: !isNaN(ci) ? Math.round(ci * 100) / 100 : undefined,
    };

    stars.push(star);
  }

  // Sort by Right Ascension
  stars.sort((a, b) => a.ra - b.ra);

  return stars;
}

async function main() {
  // Ensure output directory exists
  mkdirSync(DATA_DIR, { recursive: true });

  // Download CSV if not present
  if (!existsSync(CSV_PATH)) {
    await downloadAndDecompress(CSV_URL_GZ, CSV_PATH);
    console.log(`Downloaded and decompressed to ${CSV_PATH}`);
  } else {
    console.log(`Using cached CSV: ${CSV_PATH}`);
  }

  // Parse
  const csvText = readFileSync(CSV_PATH, 'utf-8');
  const stars = parseCSV(csvText);
  console.log(`Parsed ${stars.length} stars (mag < 6.5)`);

  // Write full star list (compact array format)
  const starsPath = join(DATA_DIR, 'stars.json');
  const compactStars = stars.map(s => [
    s.id,
    Math.round(s.ra * 1000) / 1000, // 3 decimal places for RA
    Math.round(s.dec * 100) / 100,  // 2 decimal places for Dec
    Math.round(s.mag * 10) / 10,    // 1 decimal place for Magnitude
    s.dist, // already rounded to 1 decimal place
    s.ci !== undefined ? s.ci : null,
    s.proper || null,
    s.con || null
  ]);
  writeFileSync(starsPath, JSON.stringify(compactStars));
  const sizeMB = (readFileSync(starsPath).length / 1024 / 1024).toFixed(2);
  console.log(`Written: ${starsPath} (${sizeMB} MB, ${stars.length} stars)`);

  // Write named stars only
  const namedStars = stars.filter(s => s.proper);
  const namedPath = join(DATA_DIR, 'named-stars.json');
  writeFileSync(namedPath, JSON.stringify(namedStars));
  console.log(`Written: ${namedPath} (${namedStars.length} named stars)`);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
