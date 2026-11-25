// Extrait de l'affiche ToJC : photo de l'équipe + illustrations des 4 expertises
import sharp from 'sharp';
const [src] = process.argv.slice(2);
const out = 'src/assets/affiche/';

// Équipe (au-dessus du bandeau « Notre philosophie »), agrandie ×3 avec netteté
await sharp(src).extract({ left: 96, top: 119, width: 380, height: 151 })
  .resize({ width: 1140, kernel: 'lanczos3' }).sharpen({ sigma: 0.8 })
  .jpeg({ quality: 90, mozjpeg: true }).toFile(out + 'equipe.jpg');

// Illustrations : fond clair rendu transparent
const icons = {
  finance:    { left: 37,  top: 597 },
  commerce:   { left: 297, top: 597 },
  logistique: { left: 37,  top: 673 },
  btp:        { left: 297, top: 673 },
};
for (const [k, p] of Object.entries(icons)) {
  const { data, info } = await sharp(src).extract({ ...p, width: 60, height: 64 })
    .resize(180, 192, { kernel: 'lanczos3' }).sharpen({ sigma: 0.6 })
    .ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const lum = (r + g + b) / 3, sat = Math.max(r, g, b) - Math.min(r, g, b);
    if (lum > 190 && sat < 45) data[i + 3] = Math.max(0, Math.min(255, Math.round((215 - lum) * 255 / 25)));
  }
  await sharp(data, { raw: info }).trim().png({ palette: true }).toFile(out + `icone-${k}.png`);
}
console.log('ok');
