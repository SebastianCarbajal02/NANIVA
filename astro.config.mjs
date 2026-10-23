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
    // El formulario de demo está oculto (src/pages/_solicitar-demo.astro): sus enlaces llevan al WhatsApp de siempre
    '/solicitar-demo': 'https://wa.me/51937292341?text=%F0%9F%91%8B%20%C2%A1Hola!%20Me%20gustar%C3%ADa%20solicitar%20una%20demostraci%C3%B3n%20de%20la%20plataforma%20Naniva.%20%F0%9F%9A%80%20Quisiera%20conocer%20sus%20funcionalidades%20y%20c%C3%B3mo%20puede%20ayudar%20a%20optimizar%20la%20gesti%C3%B3n%20de%20mi%20empresa',
    '/solicitar-demo/catalogo': 'https://wa.me/51937292341?text=%F0%9F%91%8B%20%C2%A1Hola!%20Estoy%20interesado%20en%20el%20Cat%C3%A1logo%20Digital.%20Me%20gustar%C3%ADa%20solicitar%20una%20demostraci%C3%B3n%20para%20conocer%20sus%20funcionalidades%2C%20beneficios%20y%20c%C3%B3mo%20puede%20impulsar%20las%20ventas%20de%20mi%20empresa.%20%F0%9F%93%B1',
  },
});
