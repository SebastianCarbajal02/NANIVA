# Proyecto Naniva - Documentación

## 📋 Estructura del Proyecto

```
src/
├── components/
│   ├── Nav.astro              # Navegación principal
│   ├── Hero.astro             # Sección hero con CTA
│   ├── ClientsTrust.astro     # Carousel de empresas clientes
│   ├── Services.astro         # Tarjetas de servicios (8 items)
│   ├── Showcase.astro         # Dashboard interactivo
│   ├── Testimonials.astro     # Testimonios de clientes
│   ├── CtaBanner.astro        # Banner CTA final
│   ├── Footer.astro           # Pie de página
│   └── Welcome.astro          # Componente de bienvenida
├── assets/
│   ├── image/                 # Imágenes y logos (ver organización abajo)
│   └── styles/                # Estilos globales
├── layouts/
│   └── BaseLayout.astro       # Layout base de la página
└── pages/
    ├── index.astro            # Página principal (home)
    ├── planes.astro           # Página de planes (ERP, Catálogo, Restaurante, IA)
    ├── servicios.astro        # Página de servicios
    └── contacto.astro         # Página de contacto

```

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

### Showcase.astro (Última actualización)
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
- **Image optimization:** Uso de .webp y .png
- **CSS Specificity:** Selectores compuestos (.mockup img.img-default)
- **Object-fit:** contain/cover + object-position para cropping
- **Aspect-ratio:** Mantiene proporciones sin media queries extras
- **Transition delays:** Stagger para efecto cascada

---

## 🔄 Próximos Pasos (Opcionales)

- [ ] Agregar más testimonios
- [ ] Integrar formulario demo
- [ ] Lazy loading imágenes
- [ ] Animaciones scroll more prominent
- [ ] Dark mode support
- [ ] Más responsive tweaks

