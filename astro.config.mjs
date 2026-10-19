// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.naniva.pe',
  // Una sola URL por página, sin barra final: /erp/ redirige a /erp (los enlaces internos ya van sin barra)
  trailingSlash: 'never',
  adapter: vercel(),
  integrations: [sitemap()],
  build: {
    // CSS dentro del HTML: evita las solicitudes que bloqueaban el renderizado (~490 ms en PageSpeed)
    inlineStylesheets: 'always',
  },
  vite: {
    server: {
      // Evita que el dev server vigile la salida del build (EBUSY en Windows con archivos grandes)
      watch: { ignored: ['**/.vercel/**', '**/dist/**'] },
    },
  },
  redirects: {
    // Nombre antiguo del PDF de términos, por si el enlace ya se compartió
    '/terminos y condiciones fffff.pdf': '/terminos-y-condiciones.pdf',
    '/terminos%20y%20condiciones%20fffff.pdf': '/terminos-y-condiciones.pdf',
  },
});
