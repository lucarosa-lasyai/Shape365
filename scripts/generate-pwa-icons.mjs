import sharp from 'sharp';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const iconsDir = join(__dirname, '../public/icons');

mkdirSync(iconsDir, { recursive: true });

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

function generateSVG(size) {
  const cx = size / 2;
  const cy = size * 0.44;
  const radius = Math.round(size * 0.18);
  const circleR = Math.round(size * 0.32);
  const sw = Math.round(size * 0.04);
  const barSW = Math.round(size * 0.055);
  const barHalf = Math.round(size * 0.18);
  const weightOuter = Math.round(size * 0.24);
  const weightInner = Math.round(size * 0.14);
  const weightOffset = Math.round(size * 0.08);
  const fontSize = Math.round(size * 0.16);
  const textY = Math.round(size * 0.85);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${radius}" fill="#0a0a0a"/>
  <circle cx="${cx}" cy="${cy}" r="${circleR}" fill="none" stroke="#FF6B35" stroke-width="${sw}"/>
  <line x1="${cx - barHalf}" y1="${cy}" x2="${cx + barHalf}" y2="${cy}" stroke="#FF6B35" stroke-width="${barSW}" stroke-linecap="round"/>
  <line x1="${cx - weightOuter}" y1="${cy - weightOffset}" x2="${cx - weightInner}" y2="${cy - weightOffset}" stroke="#FF6B35" stroke-width="${barSW}" stroke-linecap="round"/>
  <line x1="${cx - weightOuter}" y1="${cy + weightOffset}" x2="${cx - weightInner}" y2="${cy + weightOffset}" stroke="#FF6B35" stroke-width="${barSW}" stroke-linecap="round"/>
  <line x1="${cx + weightInner}" y1="${cy - weightOffset}" x2="${cx + weightOuter}" y2="${cy - weightOffset}" stroke="#FF6B35" stroke-width="${barSW}" stroke-linecap="round"/>
  <line x1="${cx + weightInner}" y1="${cy + weightOffset}" x2="${cx + weightOuter}" y2="${cy + weightOffset}" stroke="#FF6B35" stroke-width="${barSW}" stroke-linecap="round"/>
  <text x="${cx}" y="${textY}" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="${fontSize}" fill="#ffffff" text-anchor="middle" letter-spacing="2">365</text>
</svg>`;
}

async function run() {
  for (const size of sizes) {
    const svg = generateSVG(size);
    const filePath = join(iconsDir, `icon-${size}x${size}.png`);
    await sharp(Buffer.from(svg))
      .resize(size, size)
      .png()
      .toFile(filePath);
    console.log(`✓ icon-${size}x${size}.png`);
  }

  // Apple touch icon
  const svg192 = generateSVG(180);
  await sharp(Buffer.from(svg192))
    .resize(180, 180)
    .png()
    .toFile(join(iconsDir, '../apple-touch-icon.png'));
  console.log('✓ apple-touch-icon.png');

  // Favicon
  await sharp(Buffer.from(generateSVG(32)))
    .resize(32, 32)
    .png()
    .toFile(join(iconsDir, '../favicon.ico'));
  console.log('✓ favicon.ico');

  console.log('\n✅ Ícones PWA gerados!');
}

run().catch(console.error);
