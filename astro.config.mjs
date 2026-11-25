// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Renseignés automatiquement par le workflow GitHub Pages (SITE_URL / BASE_PATH).
  // Pour un domaine propre : SITE_URL=https://www.mon-domaine.com et BASE_PATH=/
  site: process.env.SITE_URL || 'http://localhost:4321',
  base: process.env.BASE_PATH || '/',
  output: 'static',
  trailingSlash: 'ignore',
  build: { inlineStylesheets: 'never' },
  security: {
    // Astro génère une CSP stricte avec hachage SHA-256 des scripts/styles
    csp: {
      algorithm: 'SHA-384',
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self'",
        "base-uri 'self'",
        "form-action 'self'",
        "object-src 'none'",
        "manifest-src 'self'",
        'upgrade-insecure-requests',
      ],
    },
  },
});
