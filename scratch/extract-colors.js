const sharp = require('sharp');

async function main() {
  const image = sharp('d:/vadhuvara-biodata/public/brand-logo.jpeg');
  const { data, info } = await image
    .raw()
    .toBuffer({ resolveWithObject: true });

  const colors = {};
  for (let i = 0; i < data.length; i += info.channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    // Target gold/yellowish pixels (R > 150, G > 100, B < 120, and not background)
    if (r > 150 && g > 110 && b < 100 && r < 240) {
      const hex = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
      colors[hex] = (colors[hex] || 0) + 1;
    }
  }

  // Sort colors by frequency
  const sortedColors = Object.entries(colors)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  console.log('Top Gold colors:');
  sortedColors.forEach(([hex, count]) => {
    console.log(`${hex}: ${count}`);
  });
}

main().catch(console.error);
