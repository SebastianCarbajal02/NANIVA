// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://naniva.pe',
  adapter: vercel(),
  integrations: [sitemap()],
  redirects: {
    // Nombre antiguo del PDF de términos, por si el enlace ya se compartió
    '/terminos y condiciones fffff.pdf': '/terminos-y-condiciones.pdf',
    '/terminos%20y%20condiciones%20fffff.pdf': '/terminos-y-condiciones.pdf',
  },
});
