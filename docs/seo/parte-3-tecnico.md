# Estrategia SEO NANIVA — Parte 3: SEO técnico, JSON-LD y Core Web Vitals

Stack: Astro 7 + `@astrojs/vercel` + `sharp` (ya instalado), sitio estático en Vercel. Basado en las Partes 1 y 2.

---

## 3.1 Cómo se inyecta el JSON-LD en este proyecto

`src/layouts/BaseLayout.astro` ya imprime el schema `Organization` en todas las páginas y acepta una prop `schema` (objeto o array) para añadir más. La home ya la usa con `faqSchema`.

Patrón recomendado para cada landing:

```astro
---
// src/pages/sistema-erp.astro
import BaseLayout from '@layouts/BaseLayout.astro';
import { erpFaqs, erpSchemas } from '@data/landings/erp';
---
<BaseLayout title="…" description="…" schema={erpSchemas}>
  …
</BaseLayout>
```

- Un archivo de datos por landing (`src/data/landings/erp.ts`, `restaurantes.ts`, `tienda-virtual.ts`, `catalogo.ts`) exporta **las FAQs y los schemas**.
- La sección visible de FAQ y el `FAQPage` se generan **del mismo array**, igual que hoy en `src/data/faqs.ts`. Así el schema nunca dice algo distinto a lo que ve el usuario (requisito de Google).
- Ninguna FAQ con [CONFIRMAR] entra al array hasta estar confirmada.

### Ajuste previo al schema `Organization` (BaseLayout)

Añadir un `@id` estable para que los demás schemas lo referencien, y los datos legales y de contacto:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.naniva.pe/#organization",
  "name": "NANIVA Technologies",
  "legalName": "[CONFIRMAR razón social exacta]",
  "taxID": "20615608221",
  "url": "https://www.naniva.pe/",
  "logo": "https://www.naniva.pe/… (se mantiene el actual)",
  "email": "nanivatechnologies@gmail.com",
  "telephone": "+51908644190",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Calle Manrique de Luna 168",
    "addressLocality": "San Miguel",
    "addressRegion": "Lima",
    "addressCountry": "PE"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "sales",
    "telephone": "+51908644190",
    "areaServed": "PE",
    "availableLanguage": "es",
    "hoursAvailable": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  },
  "sameAs": [
    "https://www.instagram.com/nanivatechnologies/",
    "https://www.tiktok.com/@naniva_tec_sac",
    "https://www.youtube.com/@NanivaTechnologies"
  ]
}
```

> `legalName` no se publica hasta confirmarlo. Cuando exista correo con dominio propio (`@naniva.pe`), reemplazar el de Gmail.

---

## 3.2 JSON-LD por landing (listo para pegar)

**Sobre los rich results:**
- `SoftwareApplication` solo genera fragmento enriquecido en Google si tiene `aggregateRating` o `review` reales. **No se incluyen** porque no hay reseñas publicables. El schema sigue siendo útil: le dice a Google y a los buscadores con IA qué es el producto, cuánto cuesta y dónde se vende.
- `FAQPage`: Google solo muestra rich results de FAQ para sitios de gobierno y salud. Se incluye como **apoyo semántico**, no como garantía de fragmento enriquecido.
- `BreadcrumbList` sí puede mostrarse en los resultados.

### ERP → `/sistema-erp`

```json
[
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": "https://www.naniva.pe/sistema-erp#software",
    "name": "NANIVA ERP",
    "description": "Sistema ERP en la nube con facturación electrónica SUNAT, ventas, compras, inventario (kardex), punto de venta y reportes para pymes en Perú.",
    "url": "https://www.naniva.pe/sistema-erp",
    "applicationCategory": "BusinessApplication",
    "applicationSubCategory": "ERP",
    "operatingSystem": "Web",
    "inLanguage": "es-PE",
    "publisher": { "@id": "https://www.naniva.pe/#organization" },
    "featureList": [
      "Facturación electrónica SUNAT bajo SEE – Del Contribuyente",
      "Boletas y facturas electrónicas",
      "Notas de crédito y débito electrónicas",
      "Guía de remisión electrónica",
      "Punto de venta (POS)",
      "Inventario y kardex en tiempo real",
      "Compras, proveedores y cuentas por pagar",
      "Clientes y cuentas por cobrar",
      "Caja, bancos y gastos",
      "Reportes de ventas",
      "Naniva IA: sugerencias a partir de ventas, compras e inventario"
    ],
    "offers": {
      "@type": "Offer",
      "price": "79",
      "priceCurrency": "PEN",
      "areaServed": { "@type": "Country", "name": "PE" },
      "url": "https://www.naniva.pe/planes#erp",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "79",
        "priceCurrency": "PEN",
        "unitCode": "MON",
        "referenceQuantity": { "@type": "QuantitativeValue", "value": 1, "unitCode": "MON" }
      }
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://www.naniva.pe/" },
      { "@type": "ListItem", "position": 2, "name": "Sistema ERP", "item": "https://www.naniva.pe/sistema-erp" }
    ]
  }
]
```

> Si la app móvil existe en tiendas, cambiar `operatingSystem` a `"Web, Android, iOS"` [CONFIRMAR]. Agregar `"Multialmacén"` a `featureList` solo si se confirma.

### Restaurantes → `/sistema-para-restaurantes`

```json
[
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": "https://www.naniva.pe/sistema-para-restaurantes#software",
    "name": "NANIVA Restaurantes",
    "description": "Sistema para restaurantes con comandas, pre-cuentas, tomador de pedidos, control de caja, stock y facturación electrónica SUNAT.",
    "url": "https://www.naniva.pe/sistema-para-restaurantes",
    "applicationCategory": "BusinessApplication",
    "applicationSubCategory": "Software para restaurantes",
    "operatingSystem": "Web",
    "inLanguage": "es-PE",
    "publisher": { "@id": "https://www.naniva.pe/#organization" },
    "featureList": [
      "Impresión de comandas y pre-cuentas",
      "Tomador de pedidos",
      "Boletas electrónicas y notas de venta (SEE – Del Contribuyente)",
      "Facturación electrónica SUNAT (Plan Profesional)",
      "Control de caja y cierres",
      "Control de stock e inventario",
      "Búsqueda RUC/DNI conectada a SUNAT y RENIEC",
      "Reportes de ventas y productos",
      "Historial de clientes",
      "Modificadores de complementos (Plan Profesional)"
    ],
    "offers": [
      {
        "@type": "Offer",
        "name": "Plan Básico",
        "price": "79",
        "priceCurrency": "PEN",
        "areaServed": { "@type": "Country", "name": "PE" },
        "url": "https://www.naniva.pe/planes#restaurante",
        "priceSpecification": { "@type": "UnitPriceSpecification", "price": "79", "priceCurrency": "PEN", "unitCode": "MON" }
      },
      {
        "@type": "Offer",
        "name": "Plan Profesional",
        "price": "118",
        "priceCurrency": "PEN",
        "areaServed": { "@type": "Country", "name": "PE" },
        "url": "https://www.naniva.pe/planes#restaurante",
        "priceSpecification": { "@type": "UnitPriceSpecification", "price": "118", "priceCurrency": "PEN", "unitCode": "MON" }
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://www.naniva.pe/" },
      { "@type": "ListItem", "position": 2, "name": "Sistema para restaurantes", "item": "https://www.naniva.pe/sistema-para-restaurantes" }
    ]
  }
]
```

> Mesas, pantalla de cocina y delivery no van en `featureList` hasta confirmarse.

### Catálogo Digital → `/catalogo-digital-whatsapp`

```json
[
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": "https://www.naniva.pe/catalogo-digital-whatsapp#software",
    "name": "NANIVA Catálogo Digital",
    "description": "Catálogo digital para compartir por WhatsApp, recibir pedidos y enviar cotizaciones en PDF.",
    "url": "https://www.naniva.pe/catalogo-digital-whatsapp",
    "applicationCategory": "BusinessApplication",
    "applicationSubCategory": "Catálogo digital",
    "operatingSystem": "Web",
    "inLanguage": "es-PE",
    "publisher": { "@id": "https://www.naniva.pe/#organization" },
    "featureList": [
      "Catálogo digital integrado al sistema",
      "Catálogos en PDF",
      "Enlace para compartir por WhatsApp",
      "Cotizaciones en PDF por enlace",
      "Envíos masivos por WhatsApp",
      "Portada, fondo, colores y banners personalizados",
      "Carga masiva de imágenes",
      "Edición masiva de productos, categorías, precios y marcas (Plan Empresa)"
    ],
    "offers": [
      {
        "@type": "Offer",
        "name": "Plan Negocio",
        "price": "79",
        "priceCurrency": "PEN",
        "areaServed": { "@type": "Country", "name": "PE" },
        "url": "https://www.naniva.pe/planes#catalogo-digital",
        "priceSpecification": { "@type": "UnitPriceSpecification", "price": "79", "priceCurrency": "PEN", "unitCode": "MON" }
      },
      {
        "@type": "Offer",
        "name": "Plan Empresa",
        "price": "118",
        "priceCurrency": "PEN",
        "areaServed": { "@type": "Country", "name": "PE" },
        "url": "https://www.naniva.pe/planes#catalogo-digital",
        "priceSpecification": { "@type": "UnitPriceSpecification", "price": "118", "priceCurrency": "PEN", "unitCode": "MON" }
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://www.naniva.pe/" },
      { "@type": "ListItem", "position": 2, "name": "Catálogo digital por WhatsApp", "item": "https://www.naniva.pe/catalogo-digital-whatsapp" }
    ]
  }
]
```

### Tienda Virtual → `/tienda-virtual` (Service, sin precio)

```json
[
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.naniva.pe/tienda-virtual#service",
    "name": "Desarrollo de tienda virtual a medida",
    "serviceType": "Desarrollo de tienda virtual",
    "description": "Diseño y desarrollo de tiendas virtuales a medida con carrito de compras, pasarela de pago e integración con el inventario y la facturación electrónica del ERP NANIVA.",
    "url": "https://www.naniva.pe/tienda-virtual",
    "provider": { "@id": "https://www.naniva.pe/#organization" },
    "areaServed": { "@type": "Country", "name": "PE" },
    "availableChannel": {
      "@type": "ServiceChannel",
      "servicePhone": { "@type": "ContactPoint", "telephone": "+51908644190", "contactType": "sales" },
      "serviceUrl": "https://wa.me/51908644190"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Qué incluye",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Diseño personalizado con tu marca" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Catálogo de productos y carrito de compras" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Integración de pasarela de pago" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Sincronización con inventario y comprobantes del ERP" } }
      ]
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://www.naniva.pe/" },
      { "@type": "ListItem", "position": 2, "name": "Tienda virtual", "item": "https://www.naniva.pe/tienda-virtual" }
    ]
  }
]
```

> `Service` no lleva `featureList` en schema.org; las funcionalidades van en `hasOfferCatalog`. Las ofertas no llevan precio porque es un proyecto cotizado. Si se publica un "desde S/ X", se agrega `"offers": { "@type": "Offer", "priceCurrency": "PEN", "price": "X" }`.

### FAQPage (las 4 landings)

Se genera con la misma función que ya usa la home:

```ts
export const toFaqSchema = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});
```

Conviene moverla a un helper compartido (por ejemplo `src/data/schema.ts`) y que `src/data/faqs.ts` también la use.

### Validación

Probar cada URL publicada en:
- https://search.google.com/test/rich-results (detecta errores de Breadcrumb y FAQ)
- https://validator.schema.org (valida SoftwareApplication y Service)

---

## 3.3 Pautas para landings largas

1. **Tabla de contenidos** después del hero, con enlaces a cada H2 (`<nav aria-label="Contenido">`). En móvil, plegable (`<details>`); en desktop puede ir fija en un lateral. Sin JavaScript.
2. **IDs legibles en los H2** (`id="facturacion-electronica"`, `id="inventario-kardex"`), útiles también para compartir y para enlaces desde el blog. Añadir `scroll-margin-top` igual a la altura del menú fijo para que el título no quede tapado.
3. **Respuesta directa primero**: el párrafo de 40–60 palabras de la Parte 2 va justo debajo del H2, en texto HTML (no dentro de una imagen ni de un carrusel).
4. **Contenido visible en el HTML**: nada de texto SEO dentro de pestañas o carruseles que se cargan con JS. Si se usa un acordeón para las FAQs, usar `<details>`: el texto queda en el HTML.
5. **Imágenes bajo el pliegue con `loading="lazy"`**: es el comportamiento por defecto del componente `<Image>` de Astro.
6. **`content-visibility: auto`** en las secciones largas de la mitad inferior, con `contain-intrinsic-size` para no generar saltos.
7. **CTA de WhatsApp repetido** cada 2–3 secciones y como botón fijo en móvil (enlace `wa.me` simple, sin widget de terceros).

---

## 3.4 Core Web Vitals: diagnóstico del sitio actual y checklist

Objetivos: **LCP < 2.5 s · INP < 200 ms · CLS < 0.1**.

### Problemas encontrados hoy (prioridad alta)

| # | Problema | Dónde | Impacto | Solución |
|---|---|---|---|---|
| 1 | **La imagen principal del hero es un PNG de 3.4 MB** servido sin optimizar (`<img src={heroDashboard.src}>`) | `src/components/home/Hero.astro:3` y `:60` | LCP (es casi seguro el elemento LCP de la home) | Usar `<Picture>` de `astro:assets` con `formats={['avif','webp']}`, `widths` responsivos, `loading="eager"` y `fetchpriority="high"` |
| 2 | **El hero está oculto hasta que corre el JS** (`.reveal` = `opacity: 0`) | `Hero.astro:34` y `:58` | LCP se retrasa; sin JS el H1 no se ve | Quitar `.reveal` de todo lo que está en el primer pantallazo (en todas las páginas) |
| 3 | **Fondo del hero en CSS inline** (`url('/fondo-hero.webp')`) | `Hero.astro:33` | El navegador lo descubre tarde | `<link rel="preload" as="image">` en el `<head>` de la home, o convertirlo en `<Image>` posicionada detrás |
| 4 | **Iframe de YouTube cargado de inmediato** | `src/components/home/DemoVideo.astro:118` | Carga ~1 MB de JS de terceros; afecta LCP e INP | "Facade": miniatura + botón ▶ que inserta el iframe al hacer clic (`youtube-nocookie.com`). Mínimo: `loading="lazy"` |
| 5 | **`<img>` sin `width`/`height`** en casi todo el sitio (solo 3 componentes usan `astro:assets`) | Hero, DemoVideo, Nav, Services, planes… | CLS y peso de imágenes | Migrar a `<Image>` de `astro:assets` (genera dimensiones, WebP/AVIF y lazy-loading) |

### Ya está bien
- **Fuentes del sistema** (`system-ui`): sin fuentes web, sin bloqueos ni saltos de texto.
- **Sin scripts de terceros** (analytics, píxeles, chat): nada bloquea la carga.
- Los scripts de componentes son pequeños y Astro los empaqueta como módulos diferidos.
- El video `public/video/video.mkv` (123 MB) está en `.gitignore` y no se usa, así que no se despliega con Git. **Cuidado:** si alguna vez despliegas con `vercel deploy` desde tu PC, sí se subiría. Conviene borrarlo de `public/` o agregar un `.vercelignore`.

### Checklist para las landings nuevas
**LCP**
- [ ] Imagen del hero con `<Picture>` (AVIF/WebP), `fetchpriority="high"` y sin `.reveal`.
- [ ] Hero sin video. Si se quiere un video, usar un póster y cargarlo al hacer clic.
- [ ] Peso del hero < 150 KB en móvil.

**CLS**
- [ ] Todas las imágenes con dimensiones (`<Image>` las pone solo).
- [ ] Espacio reservado para el iframe de YouTube (`aspect-ratio: 16/9`).
- [ ] Animaciones `.reveal` solo con `transform`/`opacity` (ya es así) y nunca en el primer pantallazo.

**INP**
- [ ] Carruseles y switchers con listeners ligeros; nada de cálculos pesados en `scroll`.
- [ ] El loader de página (`#page-loader`) que aparece al hacer clic en enlaces internos no bloquea la interacción, pero agrega una pantalla en blanco en cada navegación. Evaluar quitarlo: un sitio estático en Vercel carga lo bastante rápido sin él.

**Scripts de terceros (cuando se agreguen)**
- [ ] GA4 / Meta Pixel / Google Ads: cargarlos con `@astrojs/partytown` o después de la primera interacción.
- [ ] WhatsApp: siempre enlace `wa.me`, nunca widgets flotantes con JS externo.

**Vercel**
- [ ] Los archivos de `/_astro/` ya salen con caché larga (nombres con hash). No requiere configuración.
- [ ] Opcional: activar **Vercel Speed Insights** para tener datos reales de usuarios (añade un script pequeño).

### Cómo medir
1. **PageSpeed Insights** (https://pagespeed.web.dev) para cada URL, en móvil, antes y después de los cambios.
2. **Search Console → Core Web Vitals**: necesita tráfico real; aparecerá en unas semanas.
3. Repetir la medición tras cada landing publicada.

---

## Orden de implementación sugerido

1. Arreglar los problemas 1–5 de la home (beneficia a todo el sitio y es la página que hoy recibe a Google).
2. Añadir `@id`, `taxID` y `contactPoint` al schema `Organization`.
3. Crear el helper `toFaqSchema` y el patrón de datos por landing.
4. Construir `/sistema-erp` con el copy de la Parte 2 y su JSON-LD.
5. Validar con Rich Results Test y PageSpeed antes de pasar a la siguiente landing.
