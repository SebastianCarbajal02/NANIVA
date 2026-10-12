# Estrategia SEO NANIVA — Parte 5: Roadmap de 90 días

Periodo: **lunes 12 de octubre de 2026 → viernes 8 de enero de 2027** (13 semanas). Basado en las Partes 1–4.

**Supuesto de capacidad:** una persona técnica para construir el sitio (con apoyo de Claude Code) y una persona de negocio para los datos pendientes, Google Business Profile, directorios y reseñas, unas pocas horas por semana. Si hay menos capacidad, se mantiene el orden y se estiran los plazos.

---

## 5.1 Priorización: impacto vs. esfuerzo

| Tarea | Impacto | Esfuerzo | Depende de | Cuándo |
|---|---|---|---|---|
| Correcciones del sitio (anclas, footer, sellos SUNAT, RUC) | Medio | Muy bajo | — | Semana 1 |
| Velocidad de la home (hero de 3.4 MB, `.reveal`, YouTube, imágenes) | Alto | Bajo | — | Semana 1 |
| Medición (analytics + clics a WhatsApp) | Alto (sin esto no se sabe qué funciona) | Bajo | — | Semana 1 |
| Google Business Profile | Alto (local) | Bajo | Verificación de Google (días) | Semana 1 |
| **Landing `/sistema-erp`** | **Muy alto** (producto principal, keywords P1 más fuertes) | Alto | Copy de la Parte 2 (listo) | Semanas 2–3 |
| **Landing `/sistema-para-restaurantes`** | Alto (nicho con precio propio) | Medio (reutiliza componentes del ERP) | Confirmar mesas/cocina/delivery (opcional) | Semana 4 |
| **Landing `/catalogo-digital-whatsapp`** | Medio | Bajo | — | Semana 5 |
| **Landing `/tienda-virtual`** | Medio | Medio | **Varios datos pendientes** (pasarelas, plazos, qué incluye, portafolio) | Semana 6 (o cuando estén los datos) |
| Rediseño de la home + 301 de `/servicios` | Alto | Medio | Las 4 landings publicadas | Semana 6 |
| Directorios de software | Medio | Bajo | Capturas del producto | Semanas 2–3 |
| Blog + `/nosotros` | Alto a medio plazo | Medio | Landings publicadas (para enlazar) | Desde la semana 7 |
| Partners, gremios, contadores, medios | Medio a largo plazo | Medio–alto | Casos y blog | Desde la semana 8 |

**Por qué este orden:**
1. **Primero lo que ya está roto o lento.** Afecta a la única página que Google ve hoy, la home.
2. **Luego el ERP.** Es el producto principal y la facturación como SEE – Del Contribuyente es el núcleo.
3. **Después, de más listo a menos listo:** Restaurantes y Catálogo ya tienen precios y funciones publicados; la Tienda depende de datos pendientes.
4. **El blog empieza cuando existen las landings.** Un artículo sin un pillar al que enlazar no ayuda a vender.

---

## 5.2 Plan semana a semana

### Fase 1 — Base técnica y confianza (semana 1)

**Semana 1 · 12–16 oct**
- Corregir `#ecommerce` → `#restaurante` y sus enlaces (home, /servicios, footer).
- Cambiar "tienda virtual" por "catálogo digital" en la descripción del Catálogo.
- Reescribir el hero de Restaurantes en `/planes` (hoy repite el texto del Catálogo).
- Footer: RUC y razón social; reemplazar los sellos "Autorizados por SUNAT" por "Facturación electrónica bajo el SEE – Del Contribuyente de SUNAT"; arreglar "Nosotros", "Clientes" y "Casos de éxito".
- Velocidad de la home: los 5 problemas de la Parte 3 (3.4).
- **Medición:** instalar analytics (GA4 con Partytown o Vercel Web Analytics) y registrar cada clic a WhatsApp como evento. Usar un **mensaje prellenado distinto por página** ("Hola, vengo de la página del ERP…") para saber de qué landing viene cada lead.
- Crear **Google Business Profile** y Bing Places (la verificación tarda unos días).
- Negocio: responder los [CONFIRMAR] pendientes (razón social, multialmacén, usuarios del ERP, permanencia, ValeApp, envío directo o vía OSE, certificado digital).
- Medir el punto de partida: PageSpeed de la home (móvil) y captura del estado de Search Console.

### Fase 2 — Landings de producto (semanas 2–6)

**Semana 2 · 19–23 oct**
- Componentes compartidos para todas las landings: tabla de contenidos, bloque FAQ + `FAQPage` desde un mismo array, bloque de precios, CTA de WhatsApp, breadcrumb.
- Schema `Organization` con `@id`, `taxID` y `contactPoint`.
- Empezar `/sistema-erp`: hero, facturación SUNAT y ventas.
- Negocio: perfiles en Capterra/GetApp, G2 y Comparasoftware (con capturas reales).

**Semana 3 · 26–30 oct**
- Terminar `/sistema-erp` (todas las secciones de la Parte 2 sin [CONFIRMAR] visibles).
- Validar: Rich Results Test, validator.schema.org y PageSpeed móvil (LCP < 2.5 s).
- Publicar; añadirla al menú y al footer; en Search Console, **Inspeccionar URL → Solicitar indexación**.
- Enlazar desde la home (tarjeta del ERP) y desde `/planes#erp` ("Ver todas las funciones").

**Semana 4 · 2–6 nov**
- Construir y publicar `/sistema-para-restaurantes` reutilizando los componentes.
- Enlaces cruzados ERP ↔ Restaurantes (facturación).
- Solicitar indexación.

**Semana 5 · 9–13 nov**
- Construir y publicar `/catalogo-digital-whatsapp`.
- Primera revisión de Search Console: ¿el ERP y Restaurantes están indexados? ¿Aparecen las primeras impresiones?

**Semana 6 · 16–20 nov**
- Construir y publicar `/tienda-virtual` **si los datos están confirmados**. Si no, se publica sin las secciones pendientes o se pasa a la semana 8.
- **Rediseño de la home** (title, H1, tarjetas con anchors de keyword, bloque de IA).
- **301 `/servicios` → `/`** y menú final con las 4 landings.
- `/ia`: nuevo title y bloque "Naniva IA en cada solución".

### Fase 3 — Contenido y autoridad (semanas 7–13)

Ritmo: **1 artículo por semana**. Cada uno enlaza 1–2 veces a su pillar, está firmado por un autor y, si es tributario, revisado por un contador colegiado.

**Semana 7 · 23–27 nov**
- Infraestructura del blog: Content Collections de Astro, `/blog`, ficha de autor, schema `Article` + `BreadcrumbList`.
- Página `/nosotros` (equipo, oficina, RUC, sección de prensa).
- Política de privacidad (texto validado por abogado).
- **Artículo 1:** "SEE-SOL vs. SEE del Contribuyente: qué sistema de emisión te conviene" → `/sistema-erp`.

**Semana 8 · 30 nov–4 dic**
- **Artículo 2:** "Cómo emitir una guía de remisión electrónica" → `/sistema-erp#guia-de-remision`.
- Contactar partners: pasarelas de pago, proveedores de impresoras ticketeras.
- Revisión de Search Console: consultas por landing. Si una keyword P1 aparece con impresiones pero un CTR bajo, ajustar title y meta.

**Semana 9 · 7–11 dic** (feriados 8 y 9 de diciembre: semana corta)
- **Artículo 3:** "Diferencia entre boleta y factura electrónica" → `/sistema-erp`.
- Pedir reseñas en Google a clientes actuales.

**Semana 10 · 14–18 dic**
- **Artículo 4:** "Cómo llevar un kardex de inventario" → `/sistema-erp#inventario-kardex`.
- Evaluar membresía en la Cámara de Comercio de Lima y gremios del sector.
- Borrador del programa de contadores aliados.

**Semana 11 · 21–25 dic** (Navidad: semana corta)
- **Artículo 5:** "Cómo calcular el costo de un plato" → `/sistema-para-restaurantes`.
- Solo mantenimiento y publicaciones en Google Business Profile.

**Semana 12 · 28 dic–1 ene** (Año Nuevo: semana corta)
- **Artículo 6:** "Cómo pasar del Excel a un sistema de ventas" → `/sistema-erp`.
- Segunda revisión de Search Console.

**Semana 13 · 4–8 ene 2027 — revisión de los 90 días**
- Informe por landing: páginas indexadas, impresiones, clics, posición media de las keywords P1, leads de WhatsApp por landing.
- **Decisión pendiente de la Parte 1:** ¿cómo rinde "sistema de facturación electrónica" dentro de `/sistema-erp`? Si tiene impresiones pero se estanca en la página 2, se evalúa reforzar la sección o crear una landing propia (decisión de negocio).
- Ajustar titles y metas con datos reales de CTR.
- Planificar el siguiente trimestre: más artículos (los de prioridad P3), nota de prensa con un caso real y programa de contadores.

### Tareas continuas (todas las semanas)
- Publicación en Google Business Profile cada 2 semanas.
- Pedir una reseña a cada cliente nuevo tras la implementación (Google o directorios de software).
- Responder todas las reseñas.
- Revisar en Search Console → Páginas que no aparezcan errores de indexación nuevos.

---

## 5.3 Qué medir (sin metas inventadas)

No se fijan cifras de tráfico porque no hay datos históricos: Search Console se verificó en octubre de 2026. Las metas numéricas se fijan en la revisión de la semana 13, con datos reales.

| Indicador | Herramienta | Frecuencia |
|---|---|---|
| Páginas indexadas (las 4 landings + blog) | Search Console → Páginas | Semanal hasta que estén todas |
| Impresiones y clics por landing | Search Console → Rendimiento → Páginas | Quincenal |
| Posición media de las keywords P1 | Search Console → Rendimiento → Consultas | Quincenal |
| CTR por landing (para ajustar titles) | Search Console | Mensual |
| Clics a WhatsApp por landing | Analytics (evento) + mensaje prellenado | Semanal |
| Leads calificados por producto | Registro del equipo comercial | Semanal |
| Core Web Vitals (LCP, INP, CLS) | PageSpeed Insights; Search Console cuando haya tráfico | Tras cada publicación |
| Reseñas en Google Business Profile | GBP | Mensual |

**Expectativa realista:** en 90 días lo normal es ver las landings indexadas, las primeras impresiones en keywords de producto y algunas posiciones en long-tail y por rubro. Las keywords principales más competidas ("sistema de facturación electrónica", "sistema para restaurantes") suelen tardar varios meses más y dependen de la autoridad que se gane con enlaces y reseñas.
