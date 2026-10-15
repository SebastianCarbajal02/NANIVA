// Contenido de las páginas de producto (/erp, /sistema-para-restaurantes, /catalogo-digital, /tienda-online).
// Solo funciones confirmadas por el equipo. Facturación: NANIVA emite como SEE – Del Contribuyente,
// no usar "autorizado" ni "homologado por SUNAT".
import type { ImageMetadata } from 'astro';
import imgErp from '@assets/image/planes/compartido/cel y laptop-01.webp';
import imgRestaurante from '@assets/image/planes/restaurante/chef2232-03.webp';
import imgCatalogo from '@assets/image/planes/catalogo/catgbb-15.webp';
import imgTienda from '@assets/image/home/servicios-home/ECOMERC-04.webp';

export type IconName =
  | 'receipt' | 'box' | 'cart' | 'users' | 'wallet' | 'chart' | 'cloud' | 'sparkles' | 'whatsapp'
  | 'file' | 'image' | 'upload' | 'tag' | 'truck' | 'card' | 'store' | 'printer' | 'split'
  | 'phone' | 'search' | 'refresh' | 'warehouse' | 'school' | 'link' | 'monitor' | 'settings'
  | 'clock' | 'shield' | 'globe' | 'user' | 'rocket' | 'trend' | 'hammer' | 'utensils' | 'coffee' | 'pizza' | 'fish' | 'shirt' | 'laptop' | 'home' | 'book' | 'watch';

export interface Producto {
  slug: string;
  nombre: string;
  /** Título y descripción para Google */
  title: string;
  description: string;
  accent: string;
  accentSoft: string;
  /** Tono más oscuro del color para fondos con texto blanco (contraste 4.5:1) */
  accentStrong?: string;
  eyebrow: string;
  /** H1 corto (dos líneas): la parte en `highlight` se pinta con el color del producto */
  h1: { before: string; highlight: string };
  intro: string;
  heroImg: ImageMetadata;
  heroAlt: string;
  heroChips: string[];
  /** Banner sin chips: etiqueta en texto plano y botón de WhatsApp en lugar del precio */
  heroSimple?: boolean;
  whatsappText: string;
  features: { title: string; intro: string; items: { icon: IconName; title: string; desc: string }[] };
  /** Pasos: `highlight` es la palabra del título que va en color */
  /** Ventajas de usarlo hoy y oportunidades que abre (opcional, sección "Ventajas y oportunidades") */
  benefits?: {
    eyebrow: string;
    /** `highlight`: palabra del título que va en color */
    title: string;
    highlight: string;
    intro: string;
    items: { icon: IconName; title: string; desc: string }[];
    opportunitiesEyebrow: string;
    opportunitiesTitle: string;
    opportunitiesHighlight: string;
    opportunities: { icon: IconName; title: string; desc: string; href?: string }[];
    tagline?: string;
  };
  steps?: { eyebrow: string; title: string; highlight?: string; intro: string; items: { icon: IconName; title: string; desc: string }[] };
  audience: { title: string; items: { label: string; icon: IconName }[] };
  /** Precio "desde" en soles al mes; null = se cotiza */
  price: { from: number | null; note: string; href: string; cta: string };
  faqs: { q: string; a: string }[];
  /** Muestra la tabla Catálogo Digital vs Tienda Online */
  showEcommerceCompare?: boolean;
}

const erp: Producto = {
  slug: 'erp',
  nombre: 'ERP',
  title: 'Sistema ERP y de Ventas con Facturación SUNAT | NANIVA',
  description:
    'Controla ventas, inventario y compras, y emite facturas y boletas electrónicas SUNAT desde un solo sistema con inteligencia artificial. Ideal para pymes. Pide tu demo.',
  accent: '#2563eb',
  accentSoft: '#eaf1ff',
  eyebrow: 'ERP NANIVA',
  h1: { before: 'Controla tu negocio desde un ', highlight: 'solo lugar' },
  intro:
    'Integra ventas, inventario, compras, clientes y reportes en un sistema fácil de usar. Toma mejores decisiones, optimiza tus procesos y haz crecer tu negocio.',
  heroImg: imgErp,
  heroAlt: 'Sistema ERP NANIVA en laptop y celular con ventas, inventario y facturación',
  heroChips: [],
  heroSimple: true,
  whatsappText: 'Hola, quiero una demo del ERP NANIVA',
  features: {
    title: 'Toda tu empresa en un sistema',
    intro: 'Módulos conectados entre sí: cada venta actualiza tu stock, tu caja y tus reportes al instante.',
    items: [
      { icon: 'receipt', title: 'Ventas y facturación electrónica', desc: 'Punto de venta (POS), facturas, boletas, notas de crédito y guías de remisión electrónicas SUNAT.' },
      { icon: 'warehouse', title: 'Inventario y varios almacenes', desc: 'Stock en tiempo real, entradas y salidas, traspasos entre almacenes y kardex.' },
      { icon: 'cart', title: 'Compras y proveedores', desc: 'Registra compras, órdenes de compra y cuentas por pagar a tus proveedores.' },
      { icon: 'users', title: 'Clientes y cobranzas', desc: 'Historial de compras, cotizaciones, cuentas por cobrar y estado de cuenta de cada cliente.' },
      { icon: 'wallet', title: 'Caja y finanzas', desc: 'Control de caja, bancos, gastos y movimientos financieros de tu empresa.' },
      { icon: 'chart', title: 'Reportes en tiempo real', desc: 'Ventas, productos más vendidos, inventario valorizado y ventas por vendedor.' },
      { icon: 'sparkles', title: 'Inteligencia artificial', desc: 'Detecta quiebres de stock, recomienda qué comprar y te ayuda a priorizar lo importante.' },
      { icon: 'upload', title: 'Importa tus datos desde Excel', desc: 'Sube tus productos, clientes e inventario desde Excel sin empezar de cero.' },
    ],
  },
  benefits: {
    eyebrow: 'Tu negocio, más simple',
    title: 'Ventajas de usar el ERP',
    highlight: 'ERP',
    intro: 'Lo que cambia en tu negocio desde el primer mes.',
    items: [
      { icon: 'clock', title: 'Ahorras tiempo', desc: 'Vendes y emites la boleta o factura en el mismo paso, sin volver a digitar nada.' },
      { icon: 'refresh', title: 'Todo en un solo lugar', desc: 'Ventas, stock, caja y compras conectados: cada movimiento se refleja al instante.' },
      { icon: 'shield', title: 'Cumples con SUNAT', desc: 'Tus comprobantes electrónicos se envían a SUNAT de forma automática.' },
      { icon: 'box', title: 'Menos errores de inventario', desc: 'Stock en tiempo real, kardex y traspasos entre almacenes.' },
      { icon: 'chart', title: 'Decides con datos', desc: 'Reportes en tiempo real e inteligencia artificial que te dice qué atender primero.' },
      { icon: 'cloud', title: 'Desde cualquier lugar', desc: '100% en la nube: entras desde la PC, la tablet o el celular, sin instalar nada.' },
    ],
    opportunitiesEyebrow: 'Haz crecer tu negocio',
    opportunitiesTitle: 'Oportunidades para tu negocio',
    opportunitiesHighlight: 'tu negocio',
    tagline: 'Más control, más crecimiento',
    opportunities: [
      { icon: 'store', title: 'Abrir más locales o almacenes', desc: 'Controla el stock de cada almacén y crece sin cambiar de sistema.' },
      { icon: 'globe', title: 'Vender por internet', desc: 'Suma el catálogo digital o una tienda online conectados a tu inventario.', href: '/catalogo-digital' },
      { icon: 'users', title: 'Venderle a empresas', desc: 'Emite facturas electrónicas y envía cotizaciones profesionales a clientes con RUC.' },
      { icon: 'search', title: 'Comprar mejor', desc: 'La IA detecta quiebres de stock y recomienda qué reponer.' },
      { icon: 'user', title: 'Cobrar a tiempo', desc: 'Lleva tus cuentas por cobrar y el estado de cuenta de cada cliente.' },
    ],
  },
  steps: {
    eyebrow: 'IMPLEMENTACIÓN SIMPLE',
    title: 'Tu ERP listo en 24 horas',
    highlight: 'ERP',
    intro: 'Te acompañamos desde la primera demostración hasta la puesta en marcha de tu sistema, de forma rápida y segura.',
    items: [
      { icon: 'monitor', title: 'Demo personalizada', desc: 'Te mostramos el sistema con ejemplos de tu propio negocio.' },
      { icon: 'settings', title: 'Configuración y migración', desc: 'Importamos tus productos y clientes desde Excel y configuramos tus comprobantes.' },
      { icon: 'users', title: 'Capacitación', desc: 'Capacitación virtual gratuita para tu equipo. También puede ser presencial, con costo adicional.' },
    ],
  },
  audience: {
    title: 'Ideal para empresas con stock',
    items: [
      { label: 'Ferreterías', icon: 'hammer' },
      { label: 'Distribuidoras', icon: 'box' },
      { label: 'Mayoristas', icon: 'users' },
      { label: 'Importadores', icon: 'truck' },
      { label: 'Tiendas comerciales', icon: 'store' },
      { label: 'Minimarkets', icon: 'cart' },
    ],
  },
  price: { from: 49, note: 'Comprobantes electrónicos ilimitados en todos los planes.', href: '/planes#erp', cta: 'Ver planes del ERP' },
  faqs: [
    { q: '¿El ERP emite facturas y boletas electrónicas SUNAT?', a: 'Sí. Emites facturas, boletas, notas de crédito y guías de remisión electrónicas directamente desde el sistema, y se envían a SUNAT de forma automática.' },
    { q: '¿Necesito instalar algo?', a: 'No. NANIVA funciona 100% desde el navegador, así que no instalas ningún programa. Solo necesitas conexión a internet; a cambio, tus datos tienen respaldo y puedes entrar desde la PC, la tablet o el celular.' },
    { q: '¿Puedo migrar mis datos?', a: 'Sí. Puedes importar tus productos, clientes e inventario desde Excel, y nuestro equipo te ayuda a validar la información para no perder nada.' },
    { q: '¿Puedo manejar varias empresas, locales o almacenes?', a: 'Sí. Puedes administrar varias empresas o sucursales desde una sola cuenta, controlar el stock de cada almacén por separado y hacer traspasos entre ellos. La cantidad de almacenes depende del plan.' },
    { q: '¿La información está segura?', a: 'Sí. Tu información se almacena cifrada en la nube, con respaldos automáticos, permisos por rol y registro de cada movimiento.' },
    { q: '¿Cuánto demora la implementación?', a: 'Aproximadamente 24 horas desde el día y la hora en que contratas. Puede tomar algo más según el tamaño de tu empresa y la información que haya que migrar.' },
    { q: '¿Incluye capacitación?', a: 'Sí. La capacitación virtual es gratuita. Si prefieres una capacitación presencial en tu local, tiene un costo adicional.' },
    { q: '¿Tiene aplicación móvil?', a: 'Sí. NANIVA cuenta con una app móvil para que gestiones tu negocio desde cualquier lugar.' },
    { q: '¿Cómo solicito una demostración?', a: 'Haz clic en "Solicitar demo gratuita" o escríbenos por WhatsApp y coordinamos una sesión personalizada sin compromiso.' },
  ],
};

const restaurante: Producto = {
  slug: 'sistema-para-restaurantes',
  nombre: 'Sistema para Restaurantes',
  title: 'Sistema para Restaurantes con Facturación SUNAT | NANIVA',
  description:
    'Gestiona mesas, comandas y caja, y emite boletas y facturas electrónicas. Sistema para pollerías, chifas y restaurantes en Perú. Solicita tu demo gratis.',
  accent: '#9333ea',
  accentSoft: '#f5eeff',
  eyebrow: 'SISTEMA PARA RESTAURANTES',
  h1: { before: 'Sistema POS para ', highlight: 'restaurantes' },
  intro:
    'Toma pedidos desde el celular del mozo, imprime comandas y pre-cuentas, cobra con varios medios de pago y emite boletas y facturas electrónicas desde una sola plataforma.',
  heroImg: imgRestaurante,
  heroAlt: 'Chef usando el sistema para restaurantes NANIVA',
  heroChips: ['Comandas', 'Pedidos desde el celular', 'Control de caja', 'Boletas y facturas'],
  whatsappText: 'Hola, quiero una demo del sistema para restaurantes NANIVA',
  features: {
    title: 'Atiende más rápido y con control',
    intro: 'Del pedido en la mesa al cierre de caja, todo queda registrado en un solo sistema.',
    items: [
      { icon: 'phone', title: 'Pedidos desde el celular del mozo', desc: 'Tus mozos toman los pedidos desde su celular o tablet, sin papeles ni idas y vueltas.' },
      { icon: 'printer', title: 'Comandas y pre-cuentas', desc: 'Imprime las comandas para cocina y las pre-cuentas para tus clientes.' },
      { icon: 'split', title: 'Divide cuentas y pagos mixtos', desc: 'Separa la cuenta de una mesa y cobra parte en efectivo, tarjeta, Yape o Plin.' },
      { icon: 'receipt', title: 'Boletas y facturas electrónicas', desc: 'Emite notas de venta, boletas y facturas electrónicas SUNAT al cerrar cada mesa.' },
      { icon: 'wallet', title: 'Control de caja y cierres', desc: 'Apertura, movimientos y cierre de caja con el detalle de cada venta.' },
      { icon: 'box', title: 'Control de stock', desc: 'Lleva el control de los productos que vendes y evita quedarte sin stock.' },
      { icon: 'search', title: 'Búsqueda por RUC o DNI', desc: 'Completa los datos del cliente al instante, conectado con SUNAT y RENIEC.' },
      { icon: 'chart', title: 'Reportes de ventas', desc: 'Ventas detalladas, productos más vendidos e historial de tus clientes.' },
    ],
  },
  audience: {
    title: 'Ideal para todo negocio gastronómico',
    items: [
      { label: 'Pollerías', icon: 'utensils' },
      { label: 'Chifas', icon: 'utensils' },
      { label: 'Cevicherías', icon: 'fish' },
      { label: 'Cafeterías', icon: 'coffee' },
      { label: 'Pizzerías', icon: 'pizza' },
      { label: 'Restaurantes de menú', icon: 'receipt' },
    ],
  },
  price: { from: 79, note: 'Facturación electrónica y usuarios ilimitados en el Plan Profesional.', href: '/planes#restaurante', cta: 'Ver planes para restaurantes' },
  faqs: [
    { q: '¿Cuánto cuesta un sistema para restaurantes en NANIVA?', a: 'Los planes empiezan desde S/ 79 al mes. El Plan Profesional suma facturación electrónica, usuarios ilimitados y modificadores de complementos. Puedes compararlos en la página de planes.' },
    { q: '¿Los mozos pueden tomar pedidos desde su celular?', a: 'Sí. Los mozos toman los pedidos desde su propio celular o tablet, y la comanda se imprime para cocina.' },
    { q: '¿Puedo dividir la cuenta de una mesa y cobrar con Yape o Plin?', a: 'Sí. Puedes dividir la cuenta entre varios clientes y registrar pagos mixtos: efectivo, tarjeta, Yape o Plin.' },
    { q: '¿Emite boletas y facturas electrónicas?', a: 'Sí. Todos los planes emiten notas de venta y boletas, y el Plan Profesional incluye también facturación electrónica.' },
    { q: '¿Funciona sin internet?', a: 'No. El sistema funciona en la nube, así que necesitas conexión a internet. A cambio, puedes revisar tus ventas y tu caja desde cualquier lugar.' },
    { q: '¿Necesito comprar equipos especiales?', a: 'No. Los mozos usan los celulares o tablets que ya tienen, y para la caja basta una computadora. Solo necesitas una impresora de tickets para imprimir comandas y pre-cuentas.' },
  ],
};

const catalogo: Producto = {
  slug: 'catalogo-digital',
  nombre: 'Catálogo Digital',
  title: 'Catálogo Digital para Vender por WhatsApp | NANIVA',
  description:
    'Crea tu catálogo de productos online y en PDF y recibe cotizaciones de tus clientes por WhatsApp. Ideal para ferreterías, distribuidoras y mayoristas.',
  accent: '#16a34a',
  accentSoft: '#eafaf0',
  accentStrong: '#15803d',
  eyebrow: 'CATÁLOGO DIGITAL PARA WHATSAPP',
  h1: { before: 'Catálogo digital para ', highlight: 'WhatsApp' },
  intro:
    'Muestra todos tus productos en un catálogo online y en PDF. Tu cliente elige lo que necesita y te envía su cotización por WhatsApp, lista para atender.',
  heroImg: imgCatalogo,
  heroAlt: 'Catálogo digital NANIVA en el celular con pedidos por WhatsApp',
  heroChips: ['Catálogo online y PDF', 'Cotizaciones por WhatsApp', 'Precios mayoristas', 'Sin comisiones por venta'],
  whatsappText: 'Hola, quiero una demo del Catálogo Digital NANIVA',
  features: {
    title: 'Tu catálogo, siempre al día',
    intro: 'Olvídate de reenviar fotos y listas de precios una por una.',
    items: [
      { icon: 'link', title: 'Catálogo online y en PDF', desc: 'Comparte un enlace o un PDF con tus productos, fotos y precios.' },
      { icon: 'whatsapp', title: 'Cotizaciones por WhatsApp', desc: 'Tu cliente arma su pedido y te llega por WhatsApp como una cotización.' },
      { icon: 'tag', title: 'Precios por volumen y mayoristas', desc: 'Muestra precios distintos según la cantidad o el tipo de cliente.' },
      { icon: 'upload', title: 'Actualización masiva desde Excel', desc: 'Cambia precios y productos de forma masiva, sin editar uno por uno.' },
      { icon: 'image', title: 'Portadas, fondos y banners', desc: 'Personaliza tu catálogo con tu marca, portadas y banners de promociones.' },
      { icon: 'refresh', title: 'Integrado a tu sistema', desc: 'Conectado a tu inventario: tus productos y precios se mantienen al día.' },
    ],
  },
  steps: {
    eyebrow: 'ASÍ DE SIMPLE',
    title: '¿Cómo funciona el catálogo?',
    highlight: 'catálogo',
    intro: 'En tres pasos tus clientes ven tus productos y te piden por WhatsApp.',
    items: [
      { icon: 'upload', title: 'Sube tus productos', desc: 'Carga tus productos e imágenes de forma masiva.' },
      { icon: 'link', title: 'Comparte tu catálogo', desc: 'Envía el enlace o el PDF por WhatsApp, redes sociales o correo.' },
      { icon: 'whatsapp', title: 'Recibe cotizaciones', desc: 'Tu cliente elige sus productos y te escribe por WhatsApp con su pedido.' },
    ],
  },
  audience: {
    title: 'Ideal si vendes por WhatsApp',
    items: [
      { label: 'Ferreterías', icon: 'hammer' },
      { label: 'Distribuidoras', icon: 'box' },
      { label: 'Mayoristas', icon: 'users' },
      { label: 'Importadores', icon: 'truck' },
      { label: 'Minimarkets', icon: 'cart' },
      { label: 'Tiendas', icon: 'store' },
    ],
  },
  price: { from: 79, note: 'Planes de 300 y 600 productos.', href: '/planes#catalogo-digital', cta: 'Ver planes del catálogo' },
  showEcommerceCompare: true,
  faqs: [
    { q: '¿Cuánto cuesta el Catálogo Digital?', a: 'Los planes empiezan desde S/ 79 al mes, con hasta 300 productos. El Plan Empresa llega hasta 600 productos y suma envíos masivos por WhatsApp.' },
    { q: '¿Cómo me llegan los pedidos?', a: 'El cliente elige sus productos en el catálogo y te envía su pedido por WhatsApp como una cotización, con el detalle de lo que necesita.' },
    { q: '¿Puedo mostrar precios mayoristas o por volumen?', a: 'Sí. Puedes manejar precios por volumen o mayoristas, ideal para distribuidoras e importadores.' },
    { q: '¿Puedo actualizar los precios de muchos productos a la vez?', a: 'Sí. Puedes actualizar precios y productos de forma masiva desde Excel.' },
    { q: '¿Qué diferencia hay entre el Catálogo Digital y la Tienda Online?', a: 'Con el Catálogo Digital el cliente te pide por WhatsApp y el pago se coordina fuera de la web. Con la Tienda Online el cliente compra y paga directamente en tu web con pasarela de pago.' },
    { q: '¿Cobran comisión por cada venta?', a: 'No. El Catálogo Digital no procesa pagos, así que no hay comisiones por venta: pagas solo tu plan.' },
  ],
};

const tienda: Producto = {
  slug: 'tienda-online',
  nombre: 'Tienda Online',
  title: 'Tienda Online con Pasarela de Pago en Perú | NANIVA',
  description:
    'Crea tu tienda online, cobra en línea con pasarela de pago y emite comprobantes SUNAT automáticamente. Stock conectado a tu ERP y envíos con Shalom.',
  accent: '#0d9488',
  accentSoft: '#e6fbf9',
  accentStrong: '#0f766e',
  eyebrow: 'TIENDA ONLINE / TIENDA VIRTUAL',
  h1: { before: 'Tienda online con ', highlight: 'pasarela de pago' },
  intro:
    'Vende las 24 horas en tu propia tienda virtual: tus clientes compran y pagan en línea, el comprobante SUNAT se emite solo y tu stock se actualiza en tu ERP.',
  heroImg: imgTienda,
  heroAlt: 'Tienda online creada con NANIVA en tablet y celular',
  heroChips: ['Carrito de compras', 'Pago en línea', 'Comprobante SUNAT automático', 'Envíos con Shalom'],
  whatsappText: 'Hola, quiero cotizar una Tienda Online con NANIVA',
  features: {
    title: 'Vende y cobra sin trabajo manual',
    intro: 'Tu tienda online conectada a todo tu negocio: pagos, comprobantes, inventario y envíos.',
    items: [
      { icon: 'store', title: 'Tu propia tienda online', desc: 'Una tienda virtual con tu marca, tus productos y carrito de compras.' },
      { icon: 'card', title: 'Pasarela de pago', desc: 'Tus clientes pagan en línea al momento de comprar.' },
      { icon: 'receipt', title: 'Comprobante SUNAT automático', desc: 'Cada venta genera su boleta o factura electrónica sin que tengas que emitirla a mano.' },
      { icon: 'refresh', title: 'Stock sincronizado con tu ERP', desc: 'Lo que vendes online se descuenta de tu inventario y evitas vender productos agotados.' },
      { icon: 'truck', title: 'Envíos con Shalom', desc: 'Integración con Shalom para tus envíos a provincia.' },
      { icon: 'phone', title: 'Lista para celular', desc: 'Tus clientes compran cómodamente desde el celular o la computadora.' },
    ],
  },
  steps: {
    eyebrow: 'ASÍ DE SIMPLE',
    title: '¿Cómo funciona tu tienda?',
    highlight: 'tienda',
    intro: 'Desde que tu cliente compra hasta que preparas el envío, todo se registra solo.',
    items: [
      { icon: 'cart', title: 'Tu cliente compra', desc: 'Elige sus productos y los añade al carrito.' },
      { icon: 'card', title: 'Paga en línea', desc: 'Completa el pago en tu tienda con la pasarela de pago.' },
      { icon: 'receipt', title: 'Todo se registra solo', desc: 'Se emite el comprobante, se descuenta el stock y preparas el envío.' },
    ],
  },
  audience: {
    title: 'Ideal para vender al consumidor final',
    items: [
      { label: 'Ropa y calzado', icon: 'shirt' },
      { label: 'Tecnología', icon: 'laptop' },
      { label: 'Belleza y cuidado personal', icon: 'sparkles' },
      { label: 'Hogar y decoración', icon: 'home' },
      { label: 'Librerías', icon: 'book' },
      { label: 'Accesorios', icon: 'watch' },
    ],
  },
  price: { from: null, note: 'Te armamos una propuesta según tus productos y tu forma de vender.', href: '', cta: 'Cotizar mi tienda online' },
  showEcommerceCompare: true,
  faqs: [
    { q: '¿Cuánto cuesta una tienda online con NANIVA?', a: 'Depende de la cantidad de productos y de lo que necesites integrar. Escríbenos por WhatsApp y te enviamos una propuesta para tu negocio.' },
    { q: '¿La tienda emite boleta o factura electrónica automáticamente?', a: 'Sí. Cada venta pagada en tu tienda online genera su comprobante electrónico SUNAT de forma automática.' },
    { q: '¿El stock se actualiza con mi inventario?', a: 'Sí. La tienda está sincronizada con el ERP de NANIVA: lo que vendes online se descuenta de tu inventario.' },
    { q: '¿Cómo hago los envíos a provincia?', a: 'La tienda online tiene integración con Shalom para gestionar tus envíos.' },
    { q: '¿Qué diferencia hay entre la Tienda Online y el Catálogo Digital?', a: 'En la Tienda Online el cliente compra y paga en tu web con pasarela de pago. En el Catálogo Digital el cliente te pide por WhatsApp y el pago se coordina fuera de la web.' },
  ],
};

export const productos = { erp, restaurante, catalogo, tienda };


/** Enlace de WhatsApp con el mensaje del producto */
export const whatsappHref = (p: Producto) => `https://wa.me/51908644190?text=${encodeURIComponent(p.whatsappText)}`;

/** Colores del producto como variables CSS (se aplican en cada sección) */
export const themeStyle = (p: Producto) =>
  `--accent:${p.accent};--accent-soft:${p.accentSoft};--accent-strong:${p.accentStrong ?? p.accent};`;

/** Datos estructurados para Google: preguntas frecuentes y producto */
export const productoSchema = (p: Producto, site: URL | undefined) => [
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: p.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `NANIVA ${p.nombre}`,
    description: p.description,
    url: new URL(`/${p.slug}/`, site).href,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    provider: { '@id': new URL('/#organization', site).href },
    ...(p.price.from !== null && {
      offers: { '@type': 'Offer', price: p.price.from, priceCurrency: 'PEN', url: new URL(p.price.href, site).href },
    }),
  },
];
