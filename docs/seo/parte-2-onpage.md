# Estrategia SEO NANIVA — Parte 2: On-page y copywriting

Basado en la Parte 1 (`parte-1-arquitectura.md`). Todo el copy usa solo datos publicados hoy en el sitio (precios y módulos de `/planes`, FAQs de la home) o datos del brief. Lo pendiente va marcado [CONFIRMAR] y **no debe publicarse hasta confirmarse**.

Convenciones:
- Los párrafos en `>` son **respuestas directas de 40–60 palabras**, pensadas para fragmentos destacados y AI Overviews. Van justo debajo de su H2/H3, antes de cualquier lista o imagen.
- CTA principal en todas las landings: **"Pide tu demo por WhatsApp"** → `https://wa.me/51937292341` con mensaje prellenado por producto.
- Orden de secciones: problema → solución → funcionalidades → prueba social → precios → FAQ → CTA.
- Cada landing lleva una tabla de contenidos con anclas después del hero (pautas técnicas en la Parte 3).

## Datos reales usados

| Producto | Dato publicado en /planes o home |
|---|---|
| ERP | Desde S/ 79/mes · 100% en la nube · plan base: 2 usuarios, 1 punto de venta, 1 almacén, 5,000+ productos · módulos: Ventas y Facturación, Clientes, Inventario, Compras, Finanzas · módulos adicionales: Contabilidad, Gestión Comercial (CRM, cotizaciones), Inteligencia de Negocios, Compras Inteligentes |
| Restaurantes | Plan Básico S/ 79/mes · Plan Profesional S/ 118/mes (facturación electrónica, usuarios ilimitados, modificadores) · 20% de descuento pagando anual · soporte por llamada y WhatsApp · búsqueda RUC/DNI conectada a SUNAT/RENIEC |
| Catálogo | Plan Negocio S/ 79/mes (300 productos) · Plan Empresa S/ 118/mes (600 productos) · 20% anual · catálogos PDF, enlace para WhatsApp, cotizaciones, envíos masivos por WhatsApp |
| General (FAQ home) | Implementación de 3 a 7 días · migración de datos asistida · funciona desde el navegador · app móvil · varias empresas o sucursales en una cuenta |

> ⚠️ Antes de publicar: aclarar la contradicción del ERP en `/planes` ("Usuarios ilimitados" vs. "2 usuarios").

**Eje del mensaje:** NANIVA emite como **SEE – Del Contribuyente** en el ERP y en Restaurantes. La facturación electrónica es el corazón del producto: va primero en el ERP y como línea de confianza en ambas landings. Nunca decir "autorizado" ni "homologado por SUNAT".

---

## 2.0 Home `/` (rediseño)

**Rol:** marca + plataforma. Presenta los 4 productos y deriva a cada landing; no compite por "sistema erp" ni "sistema de facturación electrónica".

- **Title (52):** `NANIVA | Plataforma todo en uno con IA para negocios`
- **Meta description:** `ERP con facturación electrónica SUNAT, sistema para restaurantes, tienda virtual y catálogo por WhatsApp, con IA. Pide tu demo gratis por WhatsApp.`
- **H1:** Una sola plataforma con IA para gestionar y hacer crecer tu negocio

Estructura (reutiliza los componentes actuales de `src/components/home/`):

| Orden | Componente | H2 propuesto |
|---|---|---|
| 1 | Hero | (H1) + subtítulo: "ERP, facturación electrónica, restaurantes, tienda virtual y catálogo por WhatsApp conectados entre sí." |
| 2 | ClientsTrust | — (logos, solo si son clientes reales [CONFIRMAR]) |
| 3 | Services | **Todo lo que tu negocio necesita en un solo lugar** → 4 tarjetas con H3 y enlace con anchor de keyword |
| 4 | WhyNaniva | **Deja el Excel y los sistemas desconectados** (problema) |
| 5 | Dashboard | **El centro de control de tu empresa** |
| 6 | (nuevo bloque corto) | **Naniva IA: tus datos convertidos en decisiones** → `/ia` |
| 7 | Implementation | **Implementa NANIVA en 3 a 7 días** |
| 8 | CaseStudies | **Negocios que ya trabajan con NANIVA** [CONFIRMAR datos publicables] |
| 9 | DemoVideo | **Mira cómo funciona NANIVA** |
| 10 | Faq | **Preguntas frecuentes** (se mantienen las 8 actuales) |
| 11 | TransformBanner | CTA final: "Pide tu demo por WhatsApp" |

H3 de las tarjetas de servicios (anchor = keyword de cada landing):
- H3 **Sistema ERP con facturación electrónica** → `/sistema-erp`
- H3 **Sistema para restaurantes** → `/sistema-para-restaurantes`
- H3 **Desarrollo de tienda virtual** → `/tienda-virtual`
- H3 **Catálogo digital por WhatsApp** → `/catalogo-digital-whatsapp`

---

## 2.1 ERP → `/sistema-erp`

- **Title (54):** `Sistema ERP con Facturación Electrónica SUNAT | NANIVA`
- **Meta description:** `Ventas, compras, inventario (kardex), POS y facturación electrónica SUNAT en un solo sistema en la nube. Desde S/ 79/mes. Pide tu demo por WhatsApp.`
- **H1:** Sistema ERP con facturación electrónica SUNAT para pymes
- **Subtítulo hero:** Emite boletas, facturas y guías de remisión electrónicas desde tu propio sistema (SEE – Del Contribuyente) y controla ventas, compras, inventario y caja en un solo lugar. Desde S/ 79/mes.
- **CTA hero:** Pide tu demo por WhatsApp · secundario: Ver planes → `/planes#erp`

### Estructura

**H2 · ¿Todavía gestionas tu negocio en Excel o en cuaderno?** (problema)
> Si registras ventas en Excel, emites comprobantes en el facturador de SUNAT y cuentas el stock a mano, trabajas tres veces la misma información. Eso genera errores en el inventario, diferencias en caja y reportes que llegan tarde. Un sistema ERP reúne todo en un solo lugar y actualiza cada dato automáticamente cuando vendes o compras.

**H2 · Qué es un sistema ERP y cómo funciona NANIVA** (solución)
> Un sistema ERP es un software que conecta las áreas de tu empresa: ventas, compras, inventario, caja y facturación. En NANIVA, cuando registras una venta se emite el comprobante electrónico, se descuenta el stock y se actualizan tus reportes al mismo tiempo. Funciona 100% en la nube, desde el navegador, sin instalar nada.

**H2 · Facturación electrónica SUNAT**
> NANIVA emite tus comprobantes electrónicos válidos ante SUNAT directamente desde la venta: boletas, facturas, notas de crédito y débito y guías de remisión electrónicas. No necesitas entrar al portal de SUNAT ni llenar cada comprobante a mano. El sistema completa los datos del cliente y del producto y guarda todo tu historial.

  → Línea de confianza bajo el párrafo: "Emisión bajo el SEE – Del Contribuyente de SUNAT: tus comprobantes se envían a SUNAT desde tu propio sistema." [CONFIRMAR si el envío es directo a SUNAT o a través de un OSE, y ajustar la frase]

- **H3 · Boletas y facturas electrónicas**
> Para emitir una boleta o factura electrónica en NANIVA, eliges al cliente, agregas los productos y confirmas la venta. El sistema genera el comprobante, lo envía a SUNAT y lo deja listo para imprimir o compartir con tu cliente. Con el RUC o DNI se autocompletan los datos, lo que reduce errores de digitación.

- **H3 · Notas de crédito y débito electrónicas**
> Cuando necesitas anular o corregir una venta, NANIVA genera la nota de crédito o de débito electrónica vinculada al comprobante original. Así corriges devoluciones, descuentos o errores de monto sin rehacer la operación desde cero, y tu inventario y tus reportes se ajustan automáticamente para que las cifras siempre coincidan con lo emitido.

- **H3 · Guía de remisión electrónica**
> La guía de remisión electrónica sustenta el traslado de mercadería entre tu almacén, tus clientes o tus proveedores. En NANIVA la generas a partir de una venta o de un traspaso entre almacenes, con los datos del producto ya cargados. Así evitas digitar dos veces y mantienes el kardex alineado con lo que realmente sale.
  → enlace al satélite "Cómo emitir una guía de remisión electrónica" (cuando exista)

**H2 · Ventas y punto de venta (POS)**
> El módulo de ventas de NANIVA te permite vender desde un punto de venta (POS) rápido, emitir boletas y facturas electrónicas en el momento y consultar el historial de ventas por cliente, producto o fecha. Cada venta descuenta automáticamente el stock del almacén y queda registrada en caja, sin digitar la información dos veces.

**H2 · Compras y proveedores**
> En el módulo de compras registras tus compras y gastos, administras tus proveedores y controlas las cuentas por pagar. Cada compra ingresa automáticamente al inventario y actualiza el costo de tus productos, de modo que sabes cuánto debes, a quién y cuándo, y puedes calcular tu margen real de ganancia por producto.

**H2 · Inventario y kardex en tiempo real**
> NANIVA controla tu inventario en tiempo real: entradas, salidas, traspasos entre almacenes y kardex por producto. Cada venta, compra o ajuste se registra automáticamente, así sabes qué tienes, dónde está y cuánto vale sin hacer conteos a mano. El plan base incluye un almacén y más de 5,000 productos. [CONFIRMAR multialmacén por plan]

**H2 · Clientes y cuentas por cobrar**
> Registra a tus clientes, revisa su historial de compras y controla las cuentas por cobrar con su estado de cuenta actualizado. Sabrás qué cliente te debe, cuánto y desde cuándo, y podrás hacer seguimiento a los pagos pendientes sin revisar cuadernos ni hojas de cálculo separadas.

**H2 · Caja, finanzas y reportes**
> El módulo de finanzas centraliza tu caja, tus cuentas bancarias, los movimientos y los gastos del negocio. Con los reportes de NANIVA ves tus ventas, compras, productos más vendidos y saldo de caja en un solo panel, actualizado al momento, para tomar decisiones con información real y no con estimaciones.

**H2 · Decisiones con Naniva IA** → `/ia`
> Naniva IA analiza los datos de tus ventas, compras e inventario y te sugiere decisiones: qué productos reponer, cuáles se están quedando sin rotación y dónde se concentran tus ventas. Es la diferencia entre revisar reportes y recibir recomendaciones concretas para hacer crecer tu negocio.

**H2 · NANIVA vs. Excel vs. facturador gratuito de SUNAT**
> El facturador gratuito de SUNAT (SEE-SOL) solo emite comprobantes: no controla tu stock, tu caja ni tus compras. Excel organiza datos, pero depende de que alguien los digite. NANIVA hace las dos cosas en un solo paso: al vender emite el comprobante, descuenta el inventario y actualiza tus reportes.

Tabla comparativa (filas): emite comprobantes electrónicos · controla inventario y kardex · registra compras y proveedores · caja y reportes · funciona en la nube · sugerencias con IA. Columnas: SEE-SOL · Excel · NANIVA.

**H2 · Sistema ERP para tu rubro**
> NANIVA se adapta a negocios de retail y bodegas [CONFIRMAR otros rubros: ferreterías, minimarkets, distribuidoras]. Cada negocio configura sus productos, precios, almacenes y usuarios según su operación. Configuras tus listas de precios y unidades de medida según cómo vendes. Si tienes un restaurante, conoce nuestro sistema especializado con comandas, pre-cuentas y control de caja.
  → "sistema especializado para restaurantes" enlaza a `/sistema-para-restaurantes`

**H2 · Módulos adicionales**
> Cuando tu negocio crezca, puedes sumar módulos adicionales: Contabilidad, Gestión Comercial con CRM y cotizaciones, Inteligencia de Negocios con dashboards avanzados y Compras Inteligentes. Todos trabajan sobre la misma información del ERP, sin migrar datos ni contratar otro sistema, y los activas solo cuando los necesitas.

**H2 · Negocios que ya usan NANIVA** — [CONFIRMAR casos publicables; no publicar la sección sin datos reales]

**H2 · Planes del sistema ERP**
> El sistema ERP de NANIVA está disponible desde S/ 79 al mes. El plan base incluye facturación electrónica, 2 usuarios, 1 punto de venta, 1 almacén y más de 5,000 productos, 100% en la nube, con actualizaciones incluidas y soporte personalizado. Revisa todos los planes y elige el que se adapta a tu empresa.
  → CTA: Ver planes → `/planes#erp` · Pide tu demo por WhatsApp

**H2 · Preguntas frecuentes sobre el sistema ERP** (ver FAQ)

**CTA final:** "Agenda tu demo en menos de 30 minutos" → WhatsApp

### FAQ ERP
1. **¿Cuánto cuesta el sistema ERP de NANIVA?** Desde S/ 79 al mes, con facturación electrónica incluida. El precio depende de los usuarios, puntos de venta y almacenes que necesites; revisa los planes o pide una cotización por WhatsApp.
2. **¿Por qué pagar un sistema si SUNAT tiene un facturador gratuito?** El facturador de SUNAT solo emite comprobantes y se llena a mano. NANIVA emite el comprobante al vender y, en el mismo paso, descuenta tu inventario, registra la caja y actualiza tus reportes.
3. **¿Puedo pasar mi información desde Excel?** Sí. Nuestro equipo te ayuda a importar y validar tus productos, clientes e inventario, sin perder información.
4. **¿Cuánto demora la implementación?** Entre 3 y 7 días, según el tamaño de tu empresa y los módulos que necesites.
5. **¿Necesito instalar algo?** No. NANIVA funciona 100% en la nube desde el navegador y también cuenta con app móvil.
6. **¿Tienen soporte en Perú?** Sí. Nuestro equipo atiende por WhatsApp de lunes a viernes de 9:00 a 18:00 y tenemos oficina en San Miguel, Lima.
7. **¿Puedo manejar varias empresas o sucursales?** Sí, puedes administrar varias empresas o sucursales desde una sola cuenta, cada una con su información. [CONFIRMAR plan]
8. **¿Hay contrato de permanencia?** [CONFIRMAR antes de publicar]

---

## 2.2 Restaurantes → `/sistema-para-restaurantes`

- **Title (58):** `Sistema para Restaurantes: Comandas y Facturación | NANIVA`
- **Meta description:** `Comandas, pre-cuentas, caja, stock y facturación electrónica para tu restaurante. Planes desde S/ 79/mes. Pide tu demo gratis por WhatsApp.`
- **H1:** Sistema para restaurantes con comandas y facturación electrónica
- **Subtítulo hero:** Toma pedidos, imprime comandas, cobra y emite tus comprobantes desde un solo sistema. Planes desde S/ 79/mes.

> ⚠️ Corregir en `/planes` el texto del hero de Restaurantes, que hoy repite el del Catálogo.

### Estructura

**H2 · ¿Pedidos que se pierden y caja que no cuadra?** (problema)
> En hora punta, los pedidos anotados a mano se confunden, la cocina recibe comandas incompletas y al cierre la caja no cuadra con lo vendido. Un sistema para restaurantes ordena todo el flujo: el pedido se registra una sola vez y llega a cocina, a caja y a tus reportes sin volver a escribirlo.

**H2 · Qué es un sistema para restaurantes y cómo funciona NANIVA** (solución)
> Un sistema para restaurantes es un software que gestiona pedidos, comandas, cobros y comprobantes en un solo lugar. Con NANIVA, el mozo registra el pedido, se imprime la comanda para cocina, se emite la pre-cuenta y, al cobrar, se genera el comprobante y se descuenta el stock automáticamente.

**H2 · Comandas y pre-cuentas**
> NANIVA imprime las comandas para cocina o barra apenas se registra el pedido, y genera la pre-cuenta cuando el cliente pide la cuenta. Así se evitan los pedidos olvidados o mal anotados, y el cliente revisa su consumo antes de pagar. Con los modificadores de complementos se registran indicaciones como "sin cebolla" o "término medio" (Plan Profesional).

**H2 · Tomador de pedidos**
> Con el tomador de pedidos, tus mozos registran cada orden en el sistema en lugar de anotarla en papel. El pedido llega completo a cocina y queda asociado a la cuenta del cliente, lo que agiliza la atención en hora punta y reduce los errores entre lo que se pidió y lo que se cobra.

**H2 · Facturación electrónica para restaurantes**
> El sistema emite boletas y notas de venta al momento de cobrar y, en el Plan Profesional, también facturas electrónicas válidas ante SUNAT. Con la búsqueda de RUC o DNI conectada a SUNAT y RENIEC, los datos del cliente se completan solos y el comprobante sale en segundos.
  → Línea de confianza: "Emisión bajo el SEE – Del Contribuyente de SUNAT."
  → "facturación electrónica SUNAT" enlaza a `/sistema-erp`

**H2 · Control de caja y cierres**
> NANIVA registra cada cobro y te muestra el movimiento de caja por turno, con su cierre al final del día. Sabes cuánto se vendió, cuánto ingresó y si hay diferencias, sin contar a mano ni cruzar cuadernos. Así el dueño controla la caja aunque no esté en el local.

**H2 · Control de stock e inventario**
> Cada plato o bebida vendida descuenta automáticamente los productos de tu stock, así sabes qué insumos se están acabando antes de que falten en plena atención. El Plan Profesional incluye gestión de inventario completa para controlar entradas, salidas y existencias de tu restaurante.

**H2 · Reportes de ventas y productos**
> Los reportes de NANIVA muestran tus ventas por día, por producto y por medio de pago, y cuáles son tus platos más vendidos. Con esa información decides qué promocionar, qué sacar de la carta y cuánto comprar, en lugar de guiarte solo por intuición.

**H2 · Historial de clientes**
> El sistema guarda el historial de cada cliente y sus preferencias, para que puedas reconocer a tus clientes frecuentes y atenderlos mejor. Con la búsqueda por RUC o DNI registras sus datos una sola vez y los usas en todas sus próximas visitas.

**H2 · Mesas, cocina y delivery** — se mencionan en la home y en /servicios, pero no en /planes. [CONFIRMAR qué incluye cada una y en qué plan antes de redactar]

**H2 · Decisiones con Naniva IA** → `/ia`
> Naniva IA analiza las ventas de tu restaurante y te ayuda a decidir: qué platos rinden más, en qué horarios vendes más y qué insumos conviene reponer. Así ajustas tu carta y tus compras con datos reales de tu negocio.

**H2 · Restaurantes que ya trabajan con NANIVA** — [CONFIRMAR]

**H2 · Planes del sistema para restaurantes**
> El Plan Básico cuesta S/ 79 al mes e incluye comandas, pre-cuentas, tomador de pedidos, boletas, control de stock, 3 usuarios y hasta 500 comprobantes. El Plan Profesional cuesta S/ 118 al mes y suma facturación electrónica, inventario, usuarios ilimitados y modificadores. Pagando anual ahorras 20%.
  → Ver planes → `/planes#restaurante`

**H2 · Preguntas frecuentes** · **CTA final**

### FAQ Restaurantes
1. **¿Cuánto cuesta el sistema para restaurantes?** Plan Básico S/ 79/mes y Plan Profesional S/ 118/mes. Pagando anual ahorras 20%.
2. **¿Puedo emitir facturas electrónicas?** Sí, en el Plan Profesional. El Plan Básico incluye boletas electrónicas y notas de venta. Todos los comprobantes se emiten bajo el SEE – Del Contribuyente de SUNAT.
3. **¿Funciona para pollerías, cevicherías o cafeterías?** Sí, sirve para cualquier negocio de comidas que tome pedidos, imprima comandas y cobre en caja.
4. **¿Necesito comprar equipos especiales?** [CONFIRMAR impresoras compatibles y si funciona en tablet o celular]
5. **¿Cuánto demora la implementación?** Entre 3 y 7 días. Te ayudamos a cargar tu carta y tus productos.
6. **¿Qué soporte tengo?** Soporte premium por llamada y WhatsApp, de lunes a viernes de 9:00 a 18:00.
7. **¿Cuántos usuarios incluye?** 3 usuarios en el Plan Básico y usuarios ilimitados en el Profesional.
8. **¿Hay permanencia mínima?** [CONFIRMAR]

---

## 2.3 Tienda Virtual → `/tienda-virtual`

- **Title (54):** `Desarrollo de Tienda Virtual a Medida en Perú | NANIVA`
- **Meta description:** `Diseñamos tu tienda virtual a medida, con carrito, pasarela de pago y conectada a tu inventario y facturación. Cotiza gratis por WhatsApp.`
- **H1:** Desarrollo de tienda virtual a medida, conectada a tu negocio
- **Subtítulo hero:** Creamos tu tienda online con tu marca y la integramos con tu inventario y tus comprobantes electrónicos. Vende 24/7 sin doble trabajo.
- **CTA hero:** Cotiza tu tienda por WhatsApp (no hay precio publicado)

### Estructura

**H2 · ¿Vendes por internet, pero todo es manual?** (problema)
> Muchos negocios venden por redes sociales y luego anotan cada pedido, confirman pagos uno por uno y actualizan el stock a mano. Eso limita cuánto puedes vender y genera errores: productos vendidos que ya no tienes y pedidos sin comprobante. Una tienda virtual conectada a tu sistema automatiza ese proceso.

**H2 · Desarrollo de tienda virtual a medida**
> En NANIVA desarrollamos tu tienda virtual a medida: diseño con tu marca, catálogo de productos, carrito de compras y pagos en línea. No es una plantilla genérica; la construimos según tus productos y tu forma de vender, y la conectamos con el sistema que usas para gestionar tu negocio.

**H2 · Qué incluye tu tienda virtual**
> Tu tienda virtual incluye diseño personalizado, catálogo con fotos y precios, carrito de compras, pasarela de pago y adaptación a celulares. [CONFIRMAR: dominio, hosting, certificado SSL, capacitación y número de productos incluidos]. Te entregamos la tienda lista para vender, con tus productos cargados, y te enseñamos a administrarla para que puedas actualizar precios, fotos y stock sin depender de nadie.

**H2 · Pasarelas de pago**
> Tu tienda puede recibir pagos en línea con tarjeta y billeteras digitales a través de pasarelas de pago [CONFIRMAR cuáles: Niubiz, Izipay, Culqi, Mercado Pago, Yape/Plin]. El cliente paga sin salir de la tienda y el pedido se registra automáticamente, sin que tengas que confirmar cada transferencia por chat.

**H2 · Integrada con tu ERP: stock y comprobantes** (diferenciador)
> A diferencia de una tienda aislada, la tienda virtual de NANIVA se conecta con el sistema ERP: cada venta online descuenta el stock real y se registra con su comprobante electrónico. Vendes en tienda física y online con un solo inventario, sin vender productos agotados ni registrar pedidos dos veces.
  → "sistema ERP" enlaza a `/sistema-erp`

**H2 · Cómo desarrollamos tu tienda**
> El proceso tiene cuatro etapas: reunión para entender tu negocio, diseño de la tienda con tu marca, carga de productos y conexión de pagos, y entrega con capacitación. [CONFIRMAR plazos promedio]. Durante todo el proyecto tienes contacto directo con nuestro equipo por WhatsApp.

**H2 · Proyectos realizados** — [CONFIRMAR portafolio publicable]

**H2 · Soporte y mantenimiento**
> Después de la entrega, nuestro equipo en Lima te acompaña por WhatsApp de lunes a viernes de 9:00 a 18:00 para resolver dudas, hacer ajustes de diseño o productos y acompañarte mientras tu tienda empieza a recibir pedidos. No quedas solo después del lanzamiento. [CONFIRMAR si el mantenimiento tiene costo mensual o está incluido].

**H2 · ¿Tienda virtual o catálogo por WhatsApp?**
> Si quieres empezar rápido y vender por WhatsApp, el catálogo digital es la opción más simple: está listo en poco tiempo y tiene un precio mensual fijo. Si necesitas pagos en línea, tu propia marca y una tienda completa integrada a tu inventario, te conviene una tienda virtual a medida.
  → "catálogo digital por WhatsApp" enlaza a `/catalogo-digital-whatsapp`

**H2 · Preguntas frecuentes** · **CTA final:** Cotiza tu tienda por WhatsApp

### FAQ Tienda Virtual
1. **¿Cuánto cuesta una tienda virtual a medida?** Depende del número de productos, el diseño y las integraciones. Escríbenos por WhatsApp y te enviamos una cotización sin compromiso. [CONFIRMAR si se publica un "desde S/ X"]
2. **¿Cuánto demora el desarrollo?** [CONFIRMAR]
3. **¿Puedo administrar la tienda yo mismo?** Sí, te capacitamos para agregar productos, cambiar precios y revisar pedidos. [CONFIRMAR]
4. **¿La tienda emite comprobantes electrónicos?** Sí, si se integra con el ERP de NANIVA: cada venta se registra con su comprobante. [CONFIRMAR]
5. **¿Qué medios de pago puedo aceptar?** [CONFIRMAR pasarelas]
6. **¿El dominio y el hosting están incluidos?** [CONFIRMAR]
7. **¿Qué pasa si ya tengo una página web?** [CONFIRMAR si se migra o se rehace]

---

## 2.4 Catálogo Digital → `/catalogo-digital-whatsapp`

- **Title (54):** `Catálogo Digital por WhatsApp para tu Negocio | NANIVA`
- **Meta description:** `Crea tu catálogo digital, compártelo por WhatsApp y recibe pedidos y cotizaciones. Planes desde S/ 79/mes. Pide tu demo gratis por WhatsApp.`
- **H1:** Catálogo digital por WhatsApp para vender más
- **Subtítulo hero:** Comparte tus productos con un enlace, recibe pedidos por WhatsApp y envía cotizaciones profesionales. Planes desde S/ 79/mes.

### Estructura

**H2 · ¿Envías fotos una por una por WhatsApp?** (problema)
> Mandar fotos y precios uno por uno a cada cliente consume horas, y los precios desactualizados generan confusiones. Además, muchas consultas se pierden en el chat sin convertirse en venta. Un catálogo digital reúne todos tus productos en un enlace que compartes en segundos y que siempre muestra la información vigente.

**H2 · Qué es un catálogo digital y cómo funciona**
> Un catálogo digital es una vitrina online con tus productos, fotos y precios que compartes con un enlace o en PDF. En NANIVA lo creas desde el sistema, lo envías por WhatsApp y tus clientes eligen lo que quieren y te escriben con su pedido listo, sin necesidad de una página web.

**H2 · Pedidos y cotizaciones por WhatsApp**
> Tus clientes revisan el catálogo y te envían su pedido por WhatsApp. También puedes generar cotizaciones profesionales en PDF y compartirlas con un enlace, lo que da una imagen más formal a tu negocio y acelera el cierre de ventas con clientes mayoristas o empresas.

**H2 · Envíos masivos por WhatsApp**
> Con los envíos masivos compartes tu catálogo o tus novedades con muchos clientes a la vez, en lugar de enviarlos uno por uno. Es ideal para lanzar productos nuevos, promociones o listas de precios actualizadas en minutos, y para reactivar a clientes que hace tiempo no te compran.

**H2 · Diseño y gestión de productos**
> Personaliza tu catálogo con portada, fondo, colores y banners de tu marca. Puedes cargar imágenes de forma masiva y, en el Plan Empresa, editar productos, categorías, precios y marcas en bloque y elegir entre más plantillas de catálogo para que se vea profesional y coherente con tu marca.

**H2 · ¿Catálogo digital o tienda virtual?**
> El catálogo digital es la forma más rápida de vender por WhatsApp con un precio mensual fijo. Si además necesitas pagos en línea, carrito de compras y una tienda propia conectada a tu inventario, te conviene una tienda virtual a medida.
  → "tienda virtual a medida" enlaza a `/tienda-virtual`

**H2 · Negocios que ya venden con su catálogo** — [CONFIRMAR]

**H2 · Planes del catálogo digital**
> El Plan Negocio cuesta S/ 79 al mes e incluye hasta 300 productos, catálogos en PDF, enlace para WhatsApp y envíos masivos. El Plan Empresa cuesta S/ 118 al mes, con hasta 600 productos, edición masiva, más plantillas y soporte premium. Pagando anual ahorras 20%.
  → Ver planes → `/planes#catalogo-digital`

**H2 · Preguntas frecuentes** · **CTA final**

### FAQ Catálogo
1. **¿Cuánto cuesta el catálogo digital?** Plan Negocio S/ 79/mes y Plan Empresa S/ 118/mes; pagando anual ahorras 20%.
2. **¿Necesito una página web?** No. Compartes tu catálogo con un enlace o en PDF directamente por WhatsApp.
3. **¿Cuántos productos puedo subir?** Hasta 300 en el Plan Negocio y hasta 600 en el Plan Empresa.
4. **¿Mis clientes pueden pagar en línea?** El catálogo recibe pedidos por WhatsApp. Si necesitas pagos en línea, te conviene una tienda virtual.
5. **¿Puedo enviar cotizaciones?** Sí, puedes generar cotizaciones en PDF y compartirlas con un enlace.
6. **¿Se conecta con mi inventario?** El catálogo está integrado al sistema NANIVA. [CONFIRMAR si el stock se sincroniza]
7. **¿Hay permanencia mínima?** [CONFIRMAR]

---

## 2.5 `/ia` (ajustes menores)

La página ya existe. Solo se ajusta:
- **Title (56):** `Inteligencia Artificial para tu Negocio en Perú | NANIVA`
- Añadir un bloque **H2 · Naniva IA en cada solución** con enlaces a `/sistema-erp`, `/sistema-para-restaurantes` y `/tienda-virtual`.

## 2.6 Checklist de publicación por landing

- [ ] Title < 60 y meta < 155 (ver los conteos arriba)
- [ ] Un solo H1 con la keyword principal
- [ ] Párrafo de respuesta directa justo debajo de cada H2
- [ ] Tabla de contenidos con anclas
- [ ] Bloque de precios + enlace a `/planes#producto` (excepto Tienda)
- [ ] Enlaces internos según la Parte 1 (1.5)
- [ ] Ningún [CONFIRMAR] visible en producción
- [ ] CTA a WhatsApp con mensaje prellenado por producto
