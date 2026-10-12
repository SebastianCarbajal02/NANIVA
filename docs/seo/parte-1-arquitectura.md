# Estrategia SEO NANIVA — Parte 1: Arquitectura, clusters y keywords

Versión final acordada (octubre 2026). Dominio canónico: https://www.naniva.pe

## Decisiones tomadas

- **El ERP es el producto principal.** La facturación electrónica SUNAT es una funcionalidad incluida en el ERP, no un producto aparte → una sola landing `/sistema-erp`.
- **Tienda Virtual es un desarrollo a medida** (schema `Service`, sin precio publicado, CTA "Cotiza por WhatsApp").
- **`/servicios` → 301 a `/`** el mismo día que se publiquen las landings (Search Console aún no tenía datos al decidirlo).
- Una sola landing por producto; funcionalidades = secciones H2/H3. Los únicos satélites son artículos informativos del blog.
- No se usan volúmenes de búsqueda inventados: la prioridad se valida con Keyword Planner y Search Console.

---

## 1.1 Arquitectura de URLs

| URL | Rol | Acción |
|---|---|---|
| `/` | Hub de marca y plataforma. Dueña de búsquedas de marca y genéricas ("plataforma para negocios"). Deja de competir por keywords de producto. | Rediseñar (Parte 2) |
| `/sistema-erp` | **Pillar principal**: ERP con facturación electrónica SUNAT incluida | **Crear** |
| `/sistema-para-restaurantes` | Pillar Restaurantes | **Crear** |
| `/tienda-virtual` | Pillar Tienda Virtual (desarrollo a medida) | **Crear** |
| `/catalogo-digital-whatsapp` | Pillar Catálogo Digital | **Crear** |
| `/ia` | Diferenciador transversal, dueña de keywords de IA | Mantener + enlazar |
| `/planes` | Dueña de búsquedas de precio. Anclas: `#erp`, `#restaurante`, `#catalogo-digital` | Mantener. **Corregir `#ecommerce` → `#restaurante`** |
| `/servicios` | Duplica la home | **301 → `/`** al lanzar las landings |
| `/blog/[slug]` | Satélites informativos (Astro Content Collections) | Fase 2 del roadmap |
| `/contacto`, `/libro-reclamaciones` | Confianza y conversión | Mantener |

**Reglas de precios:** cada landing muestra un bloque resumido ("Desde S/ X/mes") con enlace a `/planes#producto`. La tabla completa vive solo en `/planes`. Tienda Virtual no enlaza a `/planes`: su CTA es cotizar por WhatsApp.

**Redirecciones:** solo `/servicios → /` en `redirects` de `astro.config.mjs`. Las anclas no se redirigen; se actualizan los enlaces internos.

---

## 1.2 Clusters

### Principal — ERP → `/sistema-erp`

Title orientativo: "Sistema ERP con Facturación Electrónica SUNAT | NANIVA".

Secciones H2:
1. **Facturación electrónica SUNAT — SEE – Del Contribuyente** (H3: boletas y facturas · notas de crédito y débito · guía de remisión electrónica). Es el núcleo del producto y va primero.
2. Ventas
3. Compras y proveedores
4. Inventario y kardex (multialmacén [CONFIRMAR por plan])
5. Punto de venta (POS)
6. Caja, finanzas y reportes
7. Decisiones con Naniva IA → `/ia`
8. ERP vs. Excel vs. facturador gratuito de SUNAT (SEE-SOL)
9. Por rubro: retail, bodegas [+CONFIRMAR]

Satélites (blog): cómo emitir una guía de remisión electrónica · diferencia entre boleta y factura electrónica · SEE-SOL vs. SEE del Contribuyente: qué sistema de emisión te conviene · cómo llevar un kardex · cómo pasar del Excel a un sistema de ventas.

**Riesgo aceptado:** sin página propia, "sistema de facturación electrónica" puede rendir menos. Se compensa con la keyword en title y H1, la sección más completa de la landing y los satélites más fuertes. Revisión a los 90 días en Search Console.

### Restaurantes → `/sistema-para-restaurantes`

Secciones H2 (ajustadas a lo que hoy publica `/planes`):
1. Comandas y pre-cuentas
2. Tomador de pedidos
3. Facturación electrónica (SEE – Del Contribuyente): boletas electrónicas y notas de venta; facturas en el Plan Profesional → enlace a `/sistema-erp`
4. Control de caja y cierres
5. Control de stock e inventario
6. Reportes de ventas y productos
7. Historial de clientes y búsqueda RUC/DNI
8. Mesas, pantalla de cocina y delivery (se mencionan en la home y en /servicios, pero no en /planes) [CONFIRMAR alcance]
9. Decisiones con Naniva IA → `/ia`
10. Planes → `/planes#restaurante`

Satélites: cómo calcular el costo de un plato · cómo organizar comandas sin errores · cómo emitir boletas en un restaurante.

### Tienda Virtual (desarrollo a medida) → `/tienda-virtual`

Secciones H2: desarrollo a medida · qué incluye (diseño, catálogo, carrito; dominio y hosting [CONFIRMAR]) · pasarelas de pago [CONFIRMAR] · **integrada con tu ERP: stock y comprobantes** (diferenciador) · proceso y plazos [CONFIRMAR] · proyectos realizados [CONFIRMAR] · soporte y mantenimiento · ¿tienda o catálogo? → Catálogo.

Satélites: qué pasarela de pago elegir en Perú · cómo preparar tus productos para vender online.

### Catálogo Digital por WhatsApp → `/catalogo-digital-whatsapp`

Secciones H2: cómo funciona · pedidos y cotizaciones por WhatsApp · envíos masivos por WhatsApp · gestión de productos, precios y diseño · ¿catálogo o tienda virtual? → Tienda · planes → `/planes#catalogo-digital`.

Satélite: cómo vender por WhatsApp Business con un catálogo.

Posicionamiento: Catálogo = producto listo y con precio para empezar rápido. Tienda = proyecto a medida integrado al ERP.

### Naniva IA (transversal) → `/ia`

Cada landing incluye un H2 "Decisiones con Naniva IA" con 2–3 casos de uso del producto y enlace a `/ia`. `/ia` enlaza de vuelta a ERP, Restaurantes y Tienda.

---

## 1.3 Tabla anti-canibalización

| Keyword | Landing dueña | Sección | NO deben atacarla |
|---|---|---|---|
| sistema erp perú / erp para pymes | /sistema-erp | H1 / hero | /, /ia |
| software de gestión empresarial | /sistema-erp | H1 / hero | / |
| sistema de facturación electrónica | /sistema-erp | Facturación SUNAT (+ title y H1) | /, /sistema-para-restaurantes |
| facturación electrónica sunat | /sistema-erp | Facturación SUNAT | / |
| boleta / factura electrónica (sistema) | /sistema-erp | H3 Boletas y facturas | blog (solo informativo) |
| nota de crédito electrónica | /sistema-erp | H3 Notas | — |
| guía de remisión electrónica (sistema) | /sistema-erp | H3 Guía de remisión | blog (informativo) |
| sistema de ventas / ventas e inventario | /sistema-erp | Ventas / Inventario | /sistema-para-restaurantes |
| sistema de inventario / kardex | /sistema-erp | Inventario y kardex | blog kardex (informativo) |
| sistema pos / punto de venta | /sistema-erp | Punto de venta | /sistema-para-restaurantes |
| alternativa al facturador sunat / SEE-SOL | /sistema-erp | ERP vs. Excel vs. SEE-SOL | blog SEE-SOL (informativo) |
| sistema para bodegas / ferreterías / minimarket | /sistema-erp | Por rubro | / |
| sistema para restaurantes | /sistema-para-restaurantes | H1 / hero | /, /planes |
| sistema de comandas / tomador de pedidos | /sistema-para-restaurantes | Comandas / Tomador de pedidos | — |
| facturación electrónica para restaurantes | /sistema-para-restaurantes | Facturación | /sistema-erp (solo menciona el rubro y enlaza) |
| pos para restaurantes | /sistema-para-restaurantes | Control de caja | /sistema-erp |
| desarrollo / diseño de tienda virtual | /tienda-virtual | H1 / hero | /, /catalogo-digital-whatsapp |
| tienda virtual con pasarela de pago | /tienda-virtual | Pasarelas | — |
| tienda virtual integrada con inventario | /tienda-virtual | Integrada con tu ERP | /sistema-erp (solo menciona y enlaza) |
| cuánto cuesta una tienda virtual | /tienda-virtual | FAQ / Qué incluye | blog (informativo, enlaza a la landing) |
| catálogo digital / catálogo por whatsapp | /catalogo-digital-whatsapp | H1 / hero | /tienda-virtual |
| vender / pedidos por whatsapp | /catalogo-digital-whatsapp | Pedidos por WhatsApp | /tienda-virtual |
| precio sistema erp / restaurante / catálogo | /planes | Ancla del producto | landings (solo bloque resumido) |
| software con inteligencia artificial | /ia | H1 | / |
| naniva / naniva technologies | / | — | — |

---

## 1.4 Keywords por cluster

Intención: **T** transaccional · **C** comercial · **I** informativa. Prioridad: **P1** primero → **P3** después. Volúmenes por validar.

**ERP**
- P1 · T: sistema erp perú · sistema de facturación electrónica · sistema de ventas con facturación electrónica · software de gestión para pymes
- P1 · C: alternativa al facturador sunat · mejor sistema erp para pymes perú
- P2 · T: sistema de ventas e inventario · sistema pos perú · sistema de kardex · sistema para bodegas / ferreterías / minimarket [CONFIRMAR rubros]
- P2 · C: sistema de guía de remisión electrónica · software de facturación electrónica precio
- P3 · I: cómo emitir guía de remisión electrónica · boleta vs. factura · qué es el SEE del Contribuyente · qué es SEE-SOL · cómo hacer un kardex

**Restaurantes**
- P1 · T: sistema para restaurantes · software para restaurantes perú · sistema de comandas
- P2 · T: pos para restaurantes · facturación electrónica para restaurantes · sistema para pollerías / cevicherías / cafeterías
- P2 · C: mejor sistema para restaurantes perú · sistema para restaurantes precio
- P3 · I: cómo calcular el costo de un plato · cómo organizar un restaurante

**Tienda Virtual**
- P1 · T: desarrollo de tienda virtual · diseño de tienda virtual perú · empresa de tiendas virtuales lima · tienda virtual a medida
- P2 · T: página web con carrito de compras · tienda virtual con pasarela de pago · desarrollo ecommerce perú
- P2 · C: cuánto cuesta una tienda virtual en perú
- P3 · T: crear tienda virtual perú (intención mixta)
- P3 · I: qué pasarela de pago elegir · cómo vender por internet en perú

**Catálogo WhatsApp**
- P1 · T: catálogo digital por whatsapp · catálogo virtual para negocio
- P2 · T: pedidos por whatsapp · catálogo online para emprendedores · catálogo pdf de productos
- P3 · I: cómo vender por whatsapp business

**IA**
- P2 · C: software con inteligencia artificial para empresas · inteligencia artificial para negocios perú · ia para pymes

---

## 1.5 Enlazado interno

```
              /  (hub de marca)
   ┌──────────┼───────────┬────────────┬──────────┐
  ERP     Restaurantes  Tienda      Catálogo     /ia
   │◄──────────►│  (facturación integrada)       ▲
   │◄──────────────────────►│ (stock y comprobantes)
   │                        │◄──────────►│ (tienda vs catálogo)
   └── todas → /planes#producto (excepto Tienda → WhatsApp)
       todas → /ia ─────────────────────────────────┘
blog/* → solo hacia su pillar + CTA WhatsApp
```

- **Home:** una tarjeta por producto con anchor descriptivo ("sistema ERP con facturación electrónica", no "Ver más").
- **Menú y footer:** enlazan directamente a las 4 landings; `/servicios` sale del menú.
- **/planes:** cada bloque enlaza de vuelta a su landing ("Ver todas las funciones").
- **Blog:** 1–2 enlaces a su pillar con anchor de keyword. Nunca enlaza a otra landing con anchor transaccional.

---

## 1.6 Correcciones al sitio actual

1. `#ecommerce` lleva a Restaurantes: `src/components/planes/ProductSwitcher.astro:10`, `src/components/planes/RestaurantDetail.astro:107`; actualizar enlaces en `src/components/home/Services.astro:119` y `src/components/servicios/ServicesList.astro:44`.
2. `src/components/servicios/ServicesList.astro:30` llama "tienda virtual" al Catálogo → "catálogo digital".
3. El hero de Restaurantes en `/planes` usa el texto del Catálogo ("Comparte tu catálogo, recibe pedidos…") → reescribir.
4. ERP en `/planes` dice "Usuarios ilimitados" y a la vez "2 usuarios" → aclarar qué incluye cada plan.
5. El title de la home empieza por "Facturación Electrónica" → se reescribe en la Parte 2.

## Pendientes [CONFIRMAR]

envío directo a SUNAT o vía OSE (NANIVA opera como SEE – Del Contribuyente) · pasarelas de pago · multialmacén por plan · rubros adicionales · mesas, cocina y delivery en Restaurantes · casos de éxito publicables (la home ya muestra "+35%" y "Juan Carlos R.") · qué incluye la tienda virtual (dominio, hosting) y plazos · razón social exacta · correo corporativo · contrato / permanencia mínima · descuento anual del ERP.
