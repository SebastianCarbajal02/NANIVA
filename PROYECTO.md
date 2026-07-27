# Proyecto Naniva - Documentación

## 📋 Estructura del Proyecto

```
src/
├── components/
│   ├── Nav.astro              # Navegación principal (fixed, con rutas Inicio/Servicios/IA/Planes/Contáctanos)
│   ├── Hero_original.astro    # Hero de inicio (Hero.astro rediseñado se eliminó; este volvió a ser el activo en index.astro)
│   ├── HeroIA.astro           # Hero de /ia (badge + 4 features + mockup dashboard/persona)
│   ├── BenefitsIA.astro       # Beneficios de la sección IA
│   ├── ComparisonIA.astro     # Comparativa "con IA vs sin IA"
│   ├── FeaturesIA.astro       # Features detallados de IA
│   ├── ResultadosClientes.astro # Resultados/casos de clientes en /ia
│   ├── ImplementacionIA.astro # Pasos de implementación de IA
│   ├── CtaBannerIA.astro      # Banner CTA final de /ia
│   ├── ContactoHero.astro     # Banner superior de /contacto (logo, h1, features, CTAs WhatsApp)
│   ├── ContactoInfo.astro     # Formulario + tarjetas de info de contacto (teléfono, email, horario, dirección)
│   ├── ServiciosBanner.astro  # Banner de /servicios (h1, descripción, stats)
│   ├── PlanesBanner.astro     # Banner de /planes (h1, plan features animadas, persona)
│   ├── PlanesProductSwitcher.astro # Grid selector de productos (ERP, Catálogo, Restaurante, IA)
│   ├── PlanesErpDetail.astro  # Detalles ERP (módulos, integración, extras, CTA)
│   ├── PlanesCatalogoDetail.astro # Catálogo Digital (planes, comparación, audiencia)
│   ├── PlanesRestauranteDetail.astro # Restaurant system (features, planes, comparación)
│   ├── PlanesModulesExtra.astro # Sección IA y módulos adicionales
│   ├── ClientsTrust.astro     # Carousel de empresas clientes
│   ├── Services.astro         # Tarjetas de servicios (8 items)
│   ├── ServicesFull.astro     # Grid completo de servicios (usado en /servicios)
│   ├── DemoVideo.astro        # Sección de video demo
│   ├── WhyNaniva.astro        # Banner "¿Por qué Naniva?" (imagen full-width con glow)
│   ├── Showcase.astro         # Dashboard interactivo
│   ├── Implementation.astro   # Pasos del proceso de implementación (Diagnóstico, Configuración, Capacitación, Operar)
│   ├── CaseStudies.astro      # Casos de éxito de clientes (ELOHIM, ZURIEL, WILSON) con métricas y testimonios
│   ├── TransformBanner.astro  # Banner CTA "transforma tu empresa"
│   ├── Testimonials.astro     # Testimonios de clientes
│   ├── CtaBanner.astro        # Banner CTA final
│   ├── Faq.astro              # Preguntas frecuentes (2 columnas + mini trust badges)
│   ├── Footer.astro           # Pie de página
│   └── Welcome.astro          # Componente de bienvenida
├── assets/
│   ├── image/                 # Imágenes y logos (ver organización abajo)
│   └── styles/                # Estilos globales
├── layouts/
│   └── BaseLayout.astro       # Layout base de la página
└── pages/
    ├── index.astro            # Página principal
    ├── servicios.astro        # Página de servicios con banner de stats
    ├── planes.astro           # Página de planes (features, productos: ERP, Catálogo, Ecommerce, IA)
    ├── ia.astro                # Página de IA (Hero con mockup + persona, fondo del hero de inicio)
    ├── contacto.astro         # Página de contacto (formulario + info de contacto)
    └── api/
        └── contact.js         # Endpoint POST que envía el formulario a Web3Forms

```

El sitio pasó de ser una landing de una sola página a un **sitio multi-página** (Inicio, Servicios, Planes, IA, Contáctanos) navegable desde `Nav.astro`.

### Convención: una página = varios componentes por sección

Cada página (`src/pages/*.astro`) debe limitarse a importar `BaseLayout`, `Nav`, `Footer` y un componente por sección, y componerlos — no meter secciones completas (markup + estilos) directamente en el archivo de la página. Ejemplo ya aplicado:

- `ia.astro` → `HeroIA`, `BenefitsIA`, `ComparisonIA`, `FeaturesIA`, `ResultadosClientes`, `ImplementacionIA`, `CtaBannerIA`.
- `contacto.astro` → `ContactoHero`, `ContactoInfo`.
- `servicios.astro` → `ServiciosBanner`, `ServicesFull` ✅

**Por qué:** mantiene cada página corta y fácil de escanear, y aísla los estilos de cada sección en su propio archivo (menos scroll, menos riesgo de romper una sección al tocar otra).

- `planes.astro` → `PlanesBanner`, `PlanesProductSwitcher`, `PlanesErpDetail`, `PlanesCatalogoDetail`, `PlanesRestauranteDetail`, `PlanesModulesExtra` ✅

Refactorización completada: **planes.astro reducido de 3049 a 109 líneas** (pura composición).

---

## 🗂️ Organización de `src/assets/image/`

Las imágenes están agrupadas por página y, dentro de cada página, por modelo/producto cuando aplica. Todos los `import` en el código apuntan a estas rutas — si mueves un archivo, actualiza también su import.

```
assets/image/
├── shared/                 # Usado en más de una página/componente
│   ├── logos/               logo.webp, logo-inicio.webp
│   ├── clientes/             logos de empresas cliente (color + negro), usados en ClientsTrust y CaseStudies
│   ├── metodos-pago/         Visa, Mastercard, Yape, Sunat
│   └── iconos-comunes/       iconos reusados entre Home y Planes (carro, caja-negra, ICOMS1-07)
├── home/                    # Todo lo que solo aparece en index.astro
│   ├── hero/, showcase/, demo-video/, faq/, casos-exito/,
│   ├── implementacion/, why-naniva/, transform-banner/, footer/
│   └── servicios-home/       tarjetas de servicios del home (Services.astro)
├── planes/                  # Todo lo que solo aparece en planes.astro
│   ├── compartido/           banner, features y iconos del hub de planes (no son de un producto en particular)
│   ├── catalogo/             sección "Catálogo Digital"
│   ├── tipo-negocio/         tarjetas "ideal para negocios como el tuyo"
│   └── restaurante/          sección de Restaurantes (ojo: en el código su anchor/id todavía dice "ecommerce",
│                              pendiente de renombrar cuando se construya el producto Ecommerce real)
├── servicios/               # servicios.astro + ServicesFull.astro
│   └── full/
├── contacto/                # contacto.astro
└── _sin-usar/               # Imágenes que no están referenciadas en ningún archivo .astro
                               (no se borraron por si aún las necesitas; revisar y eliminar cuando confirmes)
```

**Convención:** al agregar una imagen nueva, colócala en la carpeta de la página que la usa (y en una subcarpeta de producto si pertenece a un plan/servicio específico). Si la va a usar más de una página, va en `shared/`.

---

## 🎨 Componentes Principales

### 1. **Hero.astro**
- Sección full-viewport con fondo de banner
- Título principal con highlights
- CTA dual: "Solicitar demostración" y "Ver cómo funciona"
- Grid de 6 iconos de features (POS, Ecommerce, Reportes, etc.)
- Logos de partners (SUNAT, Yape, Visa, Mastercard, WhatsApp)

**Estilos:**
- Min-height: 100vh
- Padding: 4rem 1.5rem 2rem 5rem
- Max-width del contenido: 580px
- Background: banner.webp (cover, center, no-repeat)

---

### 2. **ClientsTrust.astro**
- Carousel de 10 logos de empresas clientes
- 2 slides con 5 logos cada uno
- Efecto hover: transición de imagen en escala de grises a color
- Navegación: flechas (← →) + puntos indicadores

**Estilos:**
- Contenedor: border: 1px solid #e2e8f0, border-radius: 20px
- Logos: height: 85px, object-fit: contain
- Hover effect: opacity transition 0.3s ease
- Responsive: 2 columnas (max 900px), 1 columna (max 600px)

---

### 3. **Services.astro**
- 8 tarjetas de servicios (4 originales + 4 duplicadas)
- Cada tarjeta con:
  - Icono/Imagen
  - Badge (eyebrow text)
  - Título y descripción
  - Link CTA

**Servicios:**
1. Punto de Venta (icon-factura)
2. Inventario (icon-plan-catalogo-2)
3. Restaurante (icon-restaurante)
4. Software Empresarial (icon-software)
5. Ecommerce (🚀 PARA CRECER, mockup-ecommerce)
6. ERP (⭐ MÁS ELEGIDO, mockup-erp)
7. Integraciones (link SVG icon)
8. Consultoría (duplicada)

**Estilos:**
- Grid: 1-4 columnas responsive
- Tarjeta: border: 1px solid #e2e8f0, border-radius: 12px
- Padding: 2rem
- Hover: transform scale, shadow increase
- Badge background: #eef4ff, color: #2563eb

---

### 4. **Showcase.astro** ⭐
- Dashboard interactivo con panel único de fondo degradado (morado claro)
- Mockup (imagen dashboard) como caja blanca flotante dentro del panel
- Info (derecha) fluye sin tarjeta propia, sobre el mismo fondo degradado
- 4 features con iconos en lista

**Layout:**
- Panel: background: linear-gradient(135deg, #f2e9ff, #f6f2ff), border-radius: 20px, padding: 1.5rem, gap: 2rem
- Mockup: flex: 3.4, min-width: 760px, aspect-ratio: 2917/1334, bg blanco, shadow, overflow hidden
- Info: flex: 1, min-width: 320px (sin card propia)

**Características:**
- Animación float restaurada (translateY -14px en 50%)
- Hover zoom: click para ampliar detalles
- 3 zoom layers con transiciones staggered (300ms, 3600ms, 6900ms)
- Blur effect en imagen al hacer zoom

---

### 5. **Testimonials.astro**
- Grid de testimonios con avatar, nombre, rol
- Calificación con estrellas
- Texto de testimonio

---

### 6. **CtaBanner.astro**
- Banner promocional con CTA grande
- Background degradado o color sólido

---

### 7. **Footer.astro**
- Links de navegación
- Información de contacto
- Copyright

---

## 🎯 Sistema de Diseño

### Colores
| Color | Hex | Uso |
|-------|-----|-----|
| Primary Blue | #2563eb | Links, badges, accents |
| Light Blue | #eef4ff | Badge backgrounds |
| Dark Slate | #0f172a | Headings, main text |
| Light Gray | #e2e8f0 | Borders |
| Muted Text | var(--color-text-muted) | Descripción, subtítulos |
| White | #ffffff | Backgrounds, cards |

### Tipografía
- **Headings (h1, h2, h3):** font-weight: 700-800
- **Body text:** font-size: 1.15rem, line-height: 1.5
- **Small text (badges):** font-size: 0.7rem, font-weight: 700
- **Responsive:** clamp(min, vw, max) para escalado fluido

### Border & Shadow
- **Border radius:**
  - Cards: 12-20px
  - Buttons/Pills: 999px (circular)
- **Shadow:**
  - Light: 0 14px 40px rgba(15, 23, 42, 0.06)
  - Medium: 0 14px 40px rgba(15, 23, 42, 0.1)
  - Strong: 0 24px 70px rgba(15, 23, 42, 0.28) (hover/zoom)

### Espaciado
- **Gap entre secciones:** 4rem
- **Padding interno:** 2rem (cards), 1.5rem (contenedores)
- **Margin bottom (text blocks):** 1rem - 2.25rem

---

## 🎬 Animaciones & Transiciones

### Float (Dashboard)
```css
@keyframes float {
  0%, 100% { transform: translate(-50%, -50%); }
  50% { transform: translate(-50%, calc(-50% - 14px)); }
}
```

### Reveal (En scroll)
- Clase `reveal` para fade-in
- Intersection Observer para trigger

### Zoom Effect
- Botón mockup con clase `zoomed`
- 3 layers de zoom secuencial
- Timing: 300ms, 3600ms, 6900ms
- Transition: 1.1s cubic-bezier(0.2, 0.7, 0.2, 1)

### Logo Hover
- Transición opacity 0.3s ease
- Grayscale → Color en hover

### Botón Hover
- Clase `hover-pop`: pequeño scale/pop
- Box shadow increase en hover

---

## 📱 Responsive Design

### Breakpoints
- **Desktop:** 1500px max-width (container)
- **Tablet:** max-width 900px (2 columnas servicios)
- **Mobile:** max-width 600px (1 columna)

### Mobile Adjustments
- Padding reducido: 1.5rem → 1rem
- Gap reducido: 4rem → 2rem
- Font sizes: clamp() para escalado fluido
- Flex-wrap: wrap para adaptar a pantalla

---

## 🔧 Estructura CSS Global

### Container
```css
.container {
  max-width: 1500px;
  margin: 0 auto;
  padding: 0 2rem;
}
```

### Text Utilities
- `.reveal` - Fade-in animation
- `.brand` - Color primary blue
- `.hover-pop` - Scale animation on hover

### Layout Patterns
- Flex para layouts principales
- Grid para servicios (auto-fit, minmax)
- Aspect-ratio para mantener proporciones

---

## 📊 Estado Actual

### Sitio multi-página (Última actualización)
- ✅ `Nav.astro` reconstruido con links a Inicio/Servicios/IA/Planes/Contáctanos, iconos SVG y estado activo por ruta
- ✅ Nueva página **/servicios** (`servicios.astro`): refactorizada con componentes (`ServiciosBanner`, `ServicesFull`) siguiendo patrón de ia.astro. Banner con stats (+10,000 comprobantes, +1,500 negocios, 99.9% disponibilidad, soporte 24/7)
- ✅ Nueva página **/planes** (`planes.astro`): refactorizada con 6 componentes siguiendo patrón ia.astro. Reducida de 3049 a 109 líneas. Incluye banner + selector de productos (ERP, Catálogo Digital, Restaurante, IA) + detalles de cada producto
- ✅ Nueva página **/ia** (`ia.astro` + `HeroIA.astro`): solo Hero por ahora (badge, título, 4 iconos de features, 2 CTAs, mockup dashboard+persona a la derecha). Fondo reutiliza `fondo final1-01.webp` (el mismo del Hero de inicio) y el layout está acotado por `.container` igual que `erp-hero` de planes.astro (no full-bleed 100vh), para que la imagen no crezca desproporcionadamente al hacer zoom. Íconos fuente en `assets/image/IA/` (PNG originales); pendiente: sección de beneficios con los íconos restantes (bombilla, diana, personas, gráfico, check, monitor, cerebro) — falta diseño/copy
- ✅ Nueva página **/contacto** (`contacto.astro`): banner con datos de contacto (teléfono, email, horario, dirección) + formulario que postea a `/api/contact`
- ✅ Endpoint **`/api/contact.js`**: valida campos, sanitiza input, reenvía el mensaje a Web3Forms (requiere `WEB3FORMS_KEY` en variables de entorno)

### Banner de /planes (Última actualización)
- ✅ Fondo (`fondfo1-01.webp`) y persona (`persona2f-02.webp`) reemplazados por nuevas imágenes; ambas llegaron a resolución de impresión (25 575×11 983 y 17 979×12 299 px, 3.4 MB y 6.8 MB) y se redimensionaron con `sharp` (2400px / 1600px de ancho) antes de convertir a WebP — quedaron en ~100 KB cada una
- ✅ Los 4 íconos de `plan-features` (Planes flexibles, Impulsa tu crecimiento, Seguridad y confianza, Soporte especializado) pasaron de emoji a imágenes (`iconbnn2-04` a `07.webp`); estas ya traen el fondo navy redondeado renderizado en el propio PNG, por lo que se quitó el `background: white` que tenía el contenedor `.plan-feature-icon`
- ✅ Íconos de la sección de integración ERP (Sin duplicidad de datos, Ahorra tiempo, Toma decisiones) reemplazados por `escudo-planes.webp`, `destello.webp`, `finanzas.webp`, coloreados en azul vía `mask-image` (mismo patrón que los íconos de módulos)
- ✅ El logo (`logo-inicio.webp`) reemplaza el ícono "layers" en el banner "Todos los módulos trabajan juntos en perfecta integración"

### Home (index.astro) — nuevo orden de secciones
Nav → Hero → ClientsTrust → Services → DemoVideo → WhyNaniva → Showcase → Implementation → CaseStudies → TransformBanner → Faq → Footer

### Hero_original.astro
- ✅ Es el Hero activo en `index.astro`. El rediseño (`Hero.astro`) se eliminó en un merge; el nombre "_original" quedó desactualizado

### CaseStudies.astro
- ✅ Casos de éxito completos con métricas (ELOHIM, ZURIEL, WILSON): rubro, nº de productos/usuarios, logros, resultados (%, horas ahorradas) y testimonio
- ✅ Imágenes de avatar y logos a color en header de tarjetas (object-fit: cover)

### Implementation.astro (nuevo)
- ✅ 4 pasos del proceso: Diagnóstico → Configuración → Capacitación → Operar, cada uno con icono e ítems

### WhyNaniva.astro (nuevo)
- ✅ Banner de imagen full-width ("¿Por qué elegir Naniva?") con glow azul en hover

### TransformBanner.astro (nuevo)
- ✅ Banner CTA con imagen + botón "Solicitar demostración gratuita"

### Faq.astro (nuevo)
- ✅ 8 preguntas frecuentes en 2 columnas + mini badges de confianza (respuesta rápida, asesoría personalizada, sin compromiso)

### Footer.astro
- ✅ Rediseñado (356 líneas, antes más simple)

### Showcase.astro
- ✅ Vuelto al panel único con fondo degradado (antes azul, ahora morado claro)
- ✅ Mockup como caja blanca flotante con animación float restaurada
- ✅ Info sin tarjeta propia, integrada al fondo del panel

### ClientsTrust.astro
- ✅ 10 logos con hover color effect
- ✅ Carousel con nav flechas y puntos
- ✅ 2 slides (5 logos c/u)

### Services.astro
- ✅ 8 tarjetas servicios
- ✅ Iconos específicos (factura, plan-catalogo-2, etc.)
- ✅ Mockups ecommerce y ERP
- ✅ Badges y eyebrow text

---

## 🚀 Scripts & Interactividad

### Showcase zoom (JavaScript)
- Click en mockup: toggle class `zoomed`
- IntersectionObserver: auto-trigger zoom secuencial
- Reduce motion: respeta preferencia de usuario

### Carousel (ClientsTrust)
- Click flechas: navega slides
- Click puntos: salta a slide específico
- Transform: translateX(-${active * 100}%)

---

## 📝 Notas Técnicas

- **Astro Static:** Pre-renderizado en build time
- **Image optimization:** 100% WebP (169 archivos, 0 PNG)
- **CSS Specificity:** Selectores compuestos (.mockup img.img-default)
- **Object-fit:** contain/cover + object-position para cropping
- **Aspect-ratio:** Mantiene proporciones sin media queries extras
- **Transition delays:** Stagger para efecto cascada

---

### Iconos de módulos (CSS Mask)
- Los iconos de los 6 módulos en `planes.astro` usan CSS `mask-image` para colorearse dinámicamente
- Cada módulo tiene un `iconImg` (imagen en negro) y un `color` de acento que se aplica vía `background-color` + `mask-image`
- Esto permite cambiar el color de todos los iconos desde el código sin necesidad de editar las imágenes

**Iconos usados:**
| Módulo | Imagen | Color |
|--------|--------|-------|
| Ventas y Facturación | `carro.webp` | `#0ea5a3` (teal) |
| Clientes | `ICOMS1-07.webp` | `#16a34a` (verde) |
| Inventario | `caja-negra.webp` | `#2563eb` (azul) |
| Compras | `bolsa-de-la-compra (1).webp` | `#a855f7` (púrpura) |
| Finanzas | `barras.webp` | `#f97316` (naranja) |
| Reportes Gerenciales | `iconos-inicio-reporte.webp` | `#a855f7` (púrpura) |

---

### Conversión a WebP
- Todas las imágenes del proyecto (169 archivos) están en formato WebP
- **125 archivos PNG/JPEG originales eliminados** del repositorio
- Script de conversión: `scripts/convert-to-webp.mjs` (usa `sharp`, calidad 80%)
- 0 referencias a `.png` en todo el código fuente

---

### Animaciones de iconos (planes.astro)
Se implementaron 6 animaciones CSS reutilizables para los iconos:

| Animación | Efecto |
|-----------|--------|
| `icon-float` | Flotación vertical (sube y baja) |
| `icon-pulse` | Pulso suave (escala + opacidad) |
| `icon-wiggle` | Movimiento lateral (hover) |
| `icon-glow` | Brillo azul alrededor |
| `icon-spin-in` | Entrada giratoria |
| `icon-reveal-up` | Aparición desde abajo |

**Aplicación:**
- **Banner features:** `icon-float` con delays escalonados (0s, 0.3s, 0.6s, 0.9s) + hover con `icon-wiggle`
- **Product cards:** `icon-pulse` con delays (0s, 0.5s, 1s, 1.5s) + hover con `icon-wiggle`
- **Módulos ERP (6):** `icon-pulse` con delays (0s a 1.5s) + hover con `icon-wiggle`
- **Módulos adicionales (4):** `icon-pulse` con delays escalonados

---

### Módulos Adicionales (planes.astro)
Sección "Conoce nuestros módulos adicionales" con 4 tarjetas:

| Módulo | Imagen | Color |
|--------|--------|-------|
| Contabilidad | `iconpmbb21-09.webp` | `#0ea5a3` (teal) |
| Gestión Comercial | `iconpmbb21-10.webp` | `#16a34a` (verde) |
| Inteligencia de Negocios | `iconpmbb21-12.webp` | `#a855f7` (púrpura) |
| Compras Inteligentes | `iconpmbb21-13.webp` | `#f97316` (naranja) |

Layout: `[Icono 75×75px] Título + Descripción (columna)`

---

### Banner CTA en /planes
- Sección `<section id="transformar-plan">` debajo de módulos adicionales
- Imagen full-width con `max-height: 350px`
- Botón blanco flotante a la derecha con icono SVG de calendario
- Texto: "Solicitar demostración gratuita →" + "Sin compromiso. En menos de 30 minutos."
- Oculto en móviles (max-width: 900px)

---

### Catálogo Digital (planes.astro)
Sección completa de productos con:

**Hero:**
- 4 iconos de features animados (`icon-pulse` con delays escalonados)
- Hover: `icon-wiggle` + escala 1.15x + glow verde
- Botones "Comenzar ahora" y "Solicitar demostración" en verde

**Planes de precios:**
- 2 planes: **PLAN NEGOCIO** (S/79/mes, hasta 300 productos) y **PLAN EMPRESA** (S/118/mes, hasta 600 productos)
- Toggle Mensual/Anual con 20% de descuento anual
- Tabla comparativa de características
- Trust badges: "Sin contratos forzosos", "Cambia o cancela", "Pago 100% seguro", "Soporte especializado"

**Audiencia:**
- Carrusel de categorías de negocio: Ferreterías, Distribuidoras, Tiendas, Minimarkets, Importadores, Mayoristas
- Banner CTA final con imagen

---

### Product Switcher (planes.astro)
- Sistema de navegación entre productos (ERP, Catálogo Digital, Ecommerce, IA) mediante JavaScript
- Solo un detalle de producto visible a la vez mediante clase `.is-active`
- Actualización de URL hash para navegación directa
- Inicialización automática en cambio de rutas Astro (`astro:after-swap`)

---

## 🔄 Próximos Pasos (Opcionales)

- [ ] Agregar más testimonios
- [x] Integrar formulario demo → formulario de contacto en `/contacto` + endpoint `/api/contact.js` (Web3Forms)
- [ ] Lazy loading imágenes
- [ ] Animaciones scroll more prominent
- [ ] Dark mode support
- [ ] Más responsive tweaks
- [ ] Revisar/eliminar `Hero_original.astro` si ya no se necesita como respaldo

