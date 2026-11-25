// Génère les favicons à partir du logo ToJC (fond transparent)
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';
const src = 'src/assets/logo-tojc.png';

const square = (size, pad = 0, bg = { r: 0, g: 0, b: 0, alpha: 0 }) =>
  sharp(src)
    .resize(Math.round(size * (1 - pad * 2)), Math.round(size * (1 - pad * 2)), { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({ top: Math.round(size * pad), bottom: Math.round(size * pad), left: Math.round(size * pad), right: Math.round(size * pad), background: bg })
    .resize(size, size)
    .png({ compressionLevel: 9, palette: true, quality: 90 });

await square(32).toFile('public/favicon-32.png');
await square(192, 0.06).toFile('public/icon-192.png');
await square(512, 0.06).toFile('public/icon-512.png');
// Apple : fond blanc obligatoire (pas de transparence)
await square(180, 0.1, { r: 255, g: 255, b: 255, alpha: 1 }).flatten({ background: '#ffffff' }).toFile('public/apple-touch-icon.png');

// favicon.ico (16, 32, 48) — conteneur ICO avec images PNG
const sizes = [16, 32, 48];
const pngs = await Promise.all(sizes.map((s) => square(s).toBuffer()));
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
sizes.forEach((s, i) => {
  const o = 6 + 16 * i;
  header.writeUInt8(s, o); header.writeUInt8(s, o + 1); header.writeUInt8(0, o + 2); header.writeUInt8(0, o + 3);
  header.writeUInt16LE(1, o + 4); header.writeUInt16LE(32, o + 6);
  header.writeUInt32LE(pngs[i].length, o + 8); header.writeUInt32LE(offset, o + 12);
  offset += pngs[i].length;
});
writeFileSync('public/favicon.ico', Buffer.concat([header, ...pngs]));
console.log('favicons ok');
