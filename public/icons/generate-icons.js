// Script para gerar ícones SVG do Shape365
// Executar: node generate-icons.js
const fs = require('fs');
const path = require('path');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

function generateSVG(size) {
  const padding = Math.round(size * 0.12);
  const iconSize = size - padding * 2;
  const fontSize = Math.round(size * 0.28);
  const subFontSize = Math.round(size * 0.14);
  const cx = size / 2;
  const cy = size / 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${Math.round(size * 0.18)}" fill="#0a0a0a"/>
  <circle cx="${cx}" cy="${cy - size * 0.05}" r="${iconSize * 0.38}" fill="none" stroke="#FF6B35" stroke-width="${Math.round(size * 0.04)}"/>
  <text x="${cx}" y="${cy + fontSize * 0.35}" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="${fontSize}" fill="#FF6B35" text-anchor="middle">S</text>
  <text x="${cx}" y="${cy + subFontSize * 2.2}" font-family="Arial, sans-serif" font-weight="700" font-size="${subFontSize}" fill="#ffffff" text-anchor="middle">365</text>
</svg>`;
}

sizes.forEach((size) => {
  const svg = generateSVG(size);
  fs.writeFileSync(path.join(__dirname, `icon-${size}x${size}.svg`), svg);
  console.log(`Generated icon-${size}x${size}.svg`);
});
