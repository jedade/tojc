// Extrait le symbole ToJC de l'image source et rend le fond transparent.
import sharp from 'sharp';
const [src, out] = process.argv.slice(2);
const { data, info } = await sharp(src)
  .extract({ left: 285, top: 225, width: 460, height: 390 })
  .ensureAlpha().raw().toBuffer({ resolveWithObject: true });
for (let i = 0; i < data.length; i += 4) {
  const r = data[i], g = data[i + 1], b = data[i + 2];
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const lum = (r + g + b) / 3, sat = max - min;
  // Fond gris-bleu clair : forte luminance, faible saturation
  if (lum > 185 && sat < 45) {
    const a = Math.max(0, Math.min(255, (212 - lum) * 255 / 27));
    data[i + 3] = Math.round(a);
  }
}
await sharp(data, { raw: info }).trim().png({ compressionLevel: 9 }).toFile(out);
console.log('ok', out);
