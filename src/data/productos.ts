// Contenido de las páginas de producto (/erp, /sistema-para-restaurantes, /catalogo-digital, /tienda-online).
// Solo funciones confirmadas por el equipo. Facturación: NANIVA emite como SEE – Del Contribuyente,
// no usar "autorizado" ni "homologado por SUNAT".
import type { ImageMetadata } from 'astro';
import imgErp from '@assets/image/planes/compartido/cel y laptop-01.webp';
import imgRestaurante from '@assets/image/planes/restaurante/chef2232-03.webp';
import imgCatalogo from '@assets/image/tiendas-digitales/catalogo-smart/hero-catalogo-smart.webp';
import iconPasoTelefono from '@assets/image/tiendas-digitales/catalogo-smart/telefono-inteligente.png';
import iconPasoImagen from '@assets/image/tiendas-digitales/catalogo-smart/imagen.png';
import iconPasoWhatsapp from '@assets/image/tiendas-digitales/catalogo-smart/whatsapp.png';
import iconPasoGestion from '@assets/image/tiendas-digitales/catalogo-smart/gestion-de-proyectos.png';
import imgCatalogoChat from '@assets/image/tiendas-digitales/catalogo-smart/telefono-catalogo-smart.webp';
import imgCatalogoPasos from '@assets/image/tiendas-digitales/catalogo-smart/pasos-a-seguir.webp';
import imgTienda from '@assets/image/tiendas-digitales/tienda-online/lap-tienda-online.webp';
import imgTiendaCarrito from '@assets/image/tiendas-digitales/tienda-online/carrito-tienda-online.webp';
import imgTiendaPasos from '@assets/image/tiendas-digitales/tienda-online/pasos-tienda-online.webp';
import imgTiendaBannerLaptop from '@assets/image/tiendas-digitales/tienda-online/banner-laptop.webp';
import imgTiendaBannerCelular from '@assets/image/tiendas-digitales/tienda-online/banner-celular.webp';
import imgTiendasHero from '@assets/image/tiendas-digitales/hero-tiendas.webp';

export type IconName =
  | 'receipt' | 'box' | 'cart' | 'users' | 'wallet' | 'chart' | 'cloud' | 'sparkles' | 'whatsapp'
  | 'file' | 'image' | 'upload' | 'tag' | 'truck' | 'card' | 'store' | 'printer' | 'split'
  | 'phone' | 'search' | 'refresh' | 'warehouse' | 'school' | 'link' | 'monitor' | 'settings'
  | 'clock' | 'shield' | 'globe' | 'user' | 'rocket' | 'trend' | 'hammer' | 'utensils' | 'coffee' | 'pizza' | 'fish' | 'shirt' | 'laptop' | 'home' | 'book' | 'watch' | 'headset' | 'bag' | 'circleCheck' | 'seal' | 'pdf' | 'clipboard';

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
  /** H1 corto (dos líneas): la parte en `highlight` se pinta con el color del producto.
      Opcional: `after` + `highlight2` para una segunda palabra en color */
  h1: { before: string; highlight: string; after?: string; highlight2?: string };
  intro: string;
  heroImg: ImageMetadata;
  heroAlt: string;
  heroChips: string[];
  /** Banner sin chips: etiqueta en texto plano y botón de WhatsApp en lugar del precio */
  heroSimple?: boolean;
  /** Fondo del banner: 'mint' = verde claro liso en lugar de la foto de la ciudad */
  heroBg?: 'mint';
  /** Tarjeta flotante sobre la imagen del banner (captura del carrito) y aviso con icono de WhatsApp */
  heroCard?: { img: ImageMetadata; alt: string; title: string; badge: string };
  whatsappText: string;
  features: { title: string; intro: string; items: { icon: IconName; title: string; desc: string }[] };
  /** Motivos para elegirlo (opcional, sección "¿Por qué elegir…?" con Why.astro) */
  why?: { eyebrow: string; title: string; intro: string; items: { icon: IconName; title: string; desc: string }[] };
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
  steps?: {
    eyebrow: string;
    title: string;
    highlight?: string;
    intro: string;
    /** `img`: icono en imagen (PNG de un color) que reemplaza a `icon`; se pinta con el color del producto */
    items: { icon: IconName; img?: ImageMetadata; title: string; desc: string }[];
    /** Imagen a la derecha de las tarjetas de pasos */
    img?: ImageMetadata;
    imgAlt?: string;
    /** 'orbit': 3 pasos alrededor de la imagen sobre un círculo con flechas (Tienda Online) */
    layout?: 'orbit';
    /** Icono dentro de la etiqueta en pastilla (solo en 'orbit') */
    eyebrowIcon?: IconName;
  };
  /** `intro`: texto opcional debajo del título */
  audience: { title: string; intro?: string; items: { label: string; icon: IconName }[] };
  /** Planes con precio (opcional, Plans.astro, mismo diseño que los planes del ERP).
      `features`: texto igual para todos o uno por plan, e `included` por plan (✓ o ✕) */
  plans?: {
    badge: string;
    /** `highlight`: parte del título que va en color */
    title: string;
    highlight: string;
    intro: string;
    note: string;
    items: { name: string; tagline: string; price: number; featured?: boolean }[];
    features: { text: string | string[]; included: boolean[] }[];
  };
  /** Banner con imagen, título (`highlight` subrayado en color) y recuadros con icono (ShareBanner.astro) */
  shareBanner?: {
    title: string;
    highlight: string;
    intro: string;
    img: ImageMetadata;
    imgAlt: string;
    items: { label: string; icon: IconName }[];
  };
  /** Banner con lista de funciones, botón de demo y laptop + celular (Showcase.astro).
      `highlight`: segunda línea del título, en color */
  showcase?: {
    eyebrow: string;
    title: string;
    highlight: string;
    intro: string;
    items: { icon: IconName; title: string; desc: string }[];
    cta: string;
    badge: string;
    laptop: ImageMetadata;
    phone: ImageMetadata;
    imgAlt: string;
  };
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
  eyebrow: 'CATÁLOGO SMART',
  h1: { before: 'Tu catálogo digital, conectado directamente con ', highlight: 'tus clientes' },
  intro:
    'Muestra tus productos en un catálogo online y recibe pedidos por WhatsApp, de forma rápida, fácil y segura. Ideal para negocios que quieren vender sin complicaciones.',
  heroImg: imgCatalogo,
  heroAlt: 'Catálogo Smart NANIVA en laptop y pedido del cliente por WhatsApp en el celular',
  heroChips: [],
  heroSimple: true,
  heroBg: 'mint',
  whatsappText: 'Hola, quiero una demo del Catálogo Digital NANIVA',
  why: {
    eyebrow: '¿POR QUÉ ELEGIR CATÁLOGO SMART?',
    title: 'Una forma simple y efectiva de vender online',
    intro: 'Lleva tus productos a más personas y convierte tus seguidores en clientes.',
    items: [
      { icon: 'bag', title: 'Catálogo digital', desc: 'Muestra tus productos con imágenes, precios y descripciones de forma atractiva.' },
      { icon: 'whatsapp', title: 'Pedidos por WhatsApp', desc: 'Tus clientes realizan sus pedidos directamente desde el catálogo, sin complicaciones.' },
      { icon: 'circleCheck', title: 'Sin costos de pasarela', desc: 'No pagas comisiones por transacciones. Solo vendes.' },
      { icon: 'seal', title: 'Fácil de usar', desc: 'Gestiona tu catálogo y pedidos desde un solo lugar sin conocimientos técnicos.' },
    ],
  },
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
    intro: 'En cuatro pasos tus clientes ven tus productos y te piden por WhatsApp.',
    items: [
      { icon: 'phone', img: iconPasoTelefono, title: 'Solicita el catálogo', desc: 'Tu cliente te escribe por WhatsApp pidiendo el catálogo de tus productos.' },
      { icon: 'image', img: iconPasoImagen, title: 'Comparte tu catálogo', desc: 'Envía el enlace o el PDF por WhatsApp, redes sociales o correo.' },
      { icon: 'whatsapp', img: iconPasoWhatsapp, title: 'Recibe cotizaciones', desc: 'Tu cliente elige sus productos y te escribe por WhatsApp con su pedido.' },
      { icon: 'chart', img: iconPasoGestion, title: 'Gestiona y vende', desc: 'Organiza tus pedidos y haz crecer tu negocio.' },
    ],
    img: imgCatalogoPasos,
    imgAlt: 'Chat de WhatsApp donde NANIVA envía su catálogo de productos a un cliente',
  },
  audience: {
    title: 'Ideal para distintos tipos de negocio',
    intro: 'No importa la categoría de productos que vendas, nuestro sistema te ayudará a vender más.',
    items: [
      { label: 'Ferreterías', icon: 'hammer' },
      { label: 'Distribuidoras', icon: 'box' },
      { label: 'Mayoristas', icon: 'users' },
      { label: 'Importadores', icon: 'truck' },
      { label: 'Minimarkets', icon: 'cart' },
      { label: 'Tiendas', icon: 'store' },
    ],
  },
  shareBanner: {
    title: 'Comparte tu catálogo',
    highlight: 'en segundos',
    intro: 'Envía tus productos por WhatsApp, recibe pedidos y cierra ventas sin complicaciones.',
    img: imgCatalogoChat,
    imgAlt: 'Cliente pidiendo un producto del catálogo NANIVA por WhatsApp',
    items: [
      { label: 'Catálogo digital', icon: 'book' },
      { label: 'PDF', icon: 'pdf' },
      { label: 'WhatsApp', icon: 'whatsapp' },
      { label: 'Plantillas', icon: 'clipboard' },
    ],
  },
  plans: {
    badge: 'PLANES DEL CATÁLOGO SMART',
    title: 'Comparte tus productos y cierra ventas por WhatsApp',
    highlight: 'cierra ventas por WhatsApp',
    intro: 'Todos los planes incluyen creación ilimitada de catálogos PDF, carga masiva de imágenes y cotizaciones por WhatsApp, sin pasarela de pagos ni comisiones por venta.',
    note: 'Precios mensuales en soles.',
    items: [
      { name: 'Básico', tagline: 'Ideal para empezar', price: 39 },
      { name: 'Pro', tagline: 'Potencia tus ventas', price: 69, featured: true },
      { name: 'Premium', tagline: 'Todo en un solo lugar', price: 99 },
    ],
    features: [
      { text: ['100 productos publicados', '300 productos publicados', '500 productos publicados'], included: [true, true, true] },
      { text: ['1 imagen por producto', '3 imágenes por producto', '3 imágenes por producto'], included: [true, true, true] },
      { text: 'Creación de catálogos PDF ilimitada', included: [true, true, true] },
      { text: ['5 catálogos publicados', '15 catálogos publicados', '30 catálogos publicados'], included: [true, true, true] },
      { text: ['1 banner digital', '3 banners digitales', '5 banners digitales'], included: [true, true, true] },
      { text: ['3 vitrinas', '10 vitrinas', '20 vitrinas'], included: [true, true, true] },
      { text: ['1 asesor', '4 asesores', '8 asesores'], included: [true, true, true] },
      { text: 'Carga masiva de imágenes', included: [true, true, true] },
      { text: 'Cotizaciones enviadas a WhatsApp', included: [true, true, true] },
      { text: 'Edición masiva de productos', included: [false, true, true] },
      { text: 'Personalización de tema y colores', included: [false, true, true] },
      { text: 'Soporte personalizado', included: [false, true, true] },
      { text: 'Envío masivo de catálogos PDF', included: [false, false, true] },
    ],
  },
  price: { from: 39, note: 'Planes de 100, 300 y 500 productos publicados.', href: '/catalogo-digital#planes', cta: 'Ver planes del catálogo' },
  showEcommerceCompare: true,
  faqs: [
    { q: '¿Cuánto cuesta el Catálogo Digital?', a: 'Los planes empiezan desde S/ 39 al mes con 100 productos publicados. El Plan Pro (S/ 69) llega a 300 productos y el Plan Premium (S/ 99) a 500 productos, con envío masivo de catálogos PDF.' },
    { q: '¿Cómo me llegan los pedidos?', a: 'El cliente elige sus productos en el catálogo y te envía su pedido por WhatsApp como una cotización, con el detalle de lo que necesita.' },
    { q: '¿Puedo mostrar precios mayoristas o por volumen?', a: 'Sí. Puedes manejar precios por volumen o mayoristas, ideal para distribuidoras e importadores.' },
    { q: '¿Puedo actualizar los precios de muchos productos a la vez?', a: 'Sí. Los planes Pro y Premium incluyen edición masiva de productos, así que puedes actualizar precios y productos sin editarlos uno por uno.' },
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
  accent: '#16a34a',
  accentSoft: '#eafaf0',
  accentStrong: '#15803d',
  eyebrow: 'TIENDA ONLINE',
  h1: { before: 'Tu tienda en línea, con carrito y ', highlight: 'pagos seguros' },
  intro:
    'Vende tus productos 24/7 con una tienda online completa, carrito de compras y múltiples métodos de pago. Llega a más clientes y haz crecer tu negocio.',
  heroImg: imgTienda,
  heroAlt: 'Tienda online NANIVA en una laptop con banner de ofertas y categorías de productos',
  heroChips: [],
  heroSimple: true,
  heroBg: 'mint',
  heroCard: {
    img: imgTiendaCarrito,
    alt: 'Resumen del carrito con el total y los botones Enviar, Delivery y Proceder al pago',
    title: 'Tu carrito',
    badge: 'Carrito de compras y pagos en línea, 100% seguro.',
  },
  whatsappText: 'Hola, quiero cotizar una Tienda Online con NANIVA',
  why: {
    eyebrow: '¿POR QUÉ ELEGIR TIENDA ONLINE?',
    title: 'Más que un catálogo, una tienda completa',
    intro: 'Dale a tus clientes la mejor experiencia de compra y lleva tu negocio al mundo digital.',
    items: [
      { icon: 'cart', title: 'Carrito de compras', desc: 'Tus clientes pueden seleccionar, pagar y recibir sus pedidos.' },
      { icon: 'card', title: 'Pagos en línea', desc: 'Integra las principales pasarelas de pago del país.' },
      { icon: 'monitor', title: 'Diseño adaptable', desc: 'Tu tienda se ve perfecta en celulares, tablets y computadoras.' },
      { icon: 'settings', title: 'Gestión fácil', desc: 'Administra productos, pedidos y ventas desde un solo lugar.' },
    ],
  },
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
    eyebrow: 'Venta en línea',
    eyebrowIcon: 'cart',
    title: 'Tu tienda, en 3 pasos',
    highlight: 'en 3 pasos',
    intro: 'Un proceso simple, rápido y seguro para que tus clientes compren sin complicaciones.',
    items: [
      { icon: 'cart', title: 'Tu cliente compra', desc: 'Navega, elige sus productos y confirma su pedido.' },
      { icon: 'card', title: 'Paga en línea', desc: 'Tu cliente puede pagar con su método de preferencia, de forma segura y rápida.' },
      { icon: 'receipt', title: 'Todo se registra solo', desc: 'El pedido, el pago y el inventario se actualizan automáticamente en tu sistema.' },
    ],
    img: imgTiendaPasos,
    imgAlt: 'Tienda online NANIVA en una laptop con zapatillas, precios y el botón Agregar al carrito',
    layout: 'orbit',
  },
  audience: {
    title: 'Ideal para vender al consumidor final',
    intro: 'Si vendes directo a tus clientes, tu tienda online te ayuda a vender más, todos los días.',
    items: [
      { label: 'Ropa y calzado', icon: 'shirt' },
      { label: 'Tecnología', icon: 'laptop' },
      { label: 'Belleza y cuidado personal', icon: 'sparkles' },
      { label: 'Hogar y decoración', icon: 'home' },
      { label: 'Librerías', icon: 'book' },
      { label: 'Accesorios', icon: 'watch' },
    ],
  },
  showcase: {
    eyebrow: 'TU TIENDA ONLINE SIN LÍMITES',
    title: 'Todo lo que necesitas',
    highlight: 'para vender',
    intro: 'Una solución completa, flexible y segura.',
    items: [
      { icon: 'image', title: 'Catálogo de productos', desc: 'Con imágenes y precios.' },
      { icon: 'box', title: 'Gestión de pedidos', desc: 'Y control de stock.' },
      { icon: 'cart', title: 'Carrito de compras', desc: 'Rápido y sencillo.' },
      { icon: 'truck', title: 'Envíos y métodos', desc: 'De entrega.' },
      { icon: 'card', title: 'Pasarela de pagos', desc: 'Tarjeta, Yape, Plin, etc.' },
    ],
    cta: 'Solicita una demo',
    badge: 'Pagos seguros y confiables',
    laptop: imgTiendaBannerLaptop,
    phone: imgTiendaBannerCelular,
    imgAlt: 'Tienda online NANIVA de productos tecnológicos en laptop y celular',
  },
  price: { from: null, note: 'Te armamos una propuesta según tus productos y tu forma de vender.', href: '', cta: 'Cotizar mi tienda online' },
  showEcommerceCompare: true,
  faqs: [
    { q: '¿Cuánto cuesta una tienda online con NANIVA?', a: 'Depende de la cantidad de productos y de lo que necesites integrar. Escríbenos por WhatsApp y te enviamos una propuesta para tu negocio.' },
    { q: '¿La tienda emite boleta o factura electrónica automáticamente?', a: 'Sí. Cada venta pagada en tu tienda online genera su comprobante electrónico SUNAT de forma automática.' },
    { q: '¿El stock se actualiza con mi inventario?', a: 'Sí. La tienda está sincronizada con el ERP de NANIVA: lo que vendes online se descuenta de tu inventario.' },
    { q: '¿Cómo hago los envíos a provincia?', a: 'La tienda online tiene integración con Shalom para gestionar tus envíos.' },
    { q: '¿Qué diferencia hay entre la Tienda Online y el Catálogo Smart?', a: 'En la Tienda Online el cliente compra y paga en tu web con pasarela de pago. En el Catálogo Smart el cliente te pide por WhatsApp y el pago se coordina fuera de la web.' },
  ],
};

// Página que agrupa las dos formas de vender por internet: Catálogo Smart y Tienda Online
const tiendas: Producto = {
  slug: 'tiendas-digitales',
  nombre: 'Tiendas Digitales',
  title: 'Tiendas Digitales: Catálogo Smart y Tienda Online | NANIVA',
  description:
    'Vende por internet a tu manera: con un catálogo smart que recibe pedidos por WhatsApp o con una tienda online que cobra en línea. Todo conectado a tu inventario.',
  accent: '#16a34a',
  accentSoft: '#eafaf0',
  accentStrong: '#15803d',
  eyebrow: 'TIENDAS DIGITALES',
  h1: { before: 'Vende tus productos en línea, de forma ', highlight: 'fácil', after: ' y ', highlight2: 'segura' },
  intro:
    'Crea tu tienda digital y llega a más clientes con un catálogo de productos, carrito de compras y dos formas de recibir tus pedidos.',
  heroImg: imgTiendasHero,
  heroAlt: 'Tienda digital NANIVA en laptop y celular con pago por tarjeta, Yape y Plin',
  heroChips: [],
  heroSimple: true,
  heroBg: 'mint',
  whatsappText: 'Hola, quiero información sobre las Tiendas Digitales NANIVA',
  // En esta página se muestra con el diseño de columnas de Why.astro, no con Features.astro
  features: {
    title: '¿Por qué elegir NANIVA Tiendas Digitales?',
    intro: 'Una solución completa, fácil de usar y pensada para que tu negocio crezca.',
    items: [
      { icon: 'rocket', title: 'Aumenta tus ventas', desc: 'Llega a más clientes y vende sin límites.' },
      { icon: 'phone', title: 'Gestiona desde cualquier lugar', desc: 'Tu tienda siempre contigo, en todos tus dispositivos.' },
      { icon: 'shield', title: 'Seguro y confiable', desc: 'Tus datos y transacciones están protegidos.' },
      { icon: 'settings', title: 'Fácil de usar', desc: 'No necesitas conocimientos técnicos para empezar.' },
      { icon: 'headset', title: 'Soporte y acompañamiento', desc: 'Te ayudamos en cada paso del proceso.' },
    ],
  },
  audience: { title: '', items: [] },
  price: { from: null, note: '', href: '', cta: '' },
  faqs: [
    { q: '¿Qué diferencia hay entre el Catálogo Smart y la Tienda Online?', a: 'Con el Catálogo Smart el cliente te pide por WhatsApp y el pago se coordina fuera de la web. Con la Tienda Online el cliente compra y paga directamente en tu web con pasarela de pago.' },
    { q: '¿Cuál me conviene?', a: 'Si vendes al por mayor, cotizas o atiendes por WhatsApp, el Catálogo Smart. Si vendes al consumidor final y quieres cobrar en línea, la Tienda Online.' },
    { q: '¿Cuánto cuestan?', a: 'El Catálogo Smart tiene planes desde S/ 39 al mes. La Tienda Online se cotiza según tus productos y tu forma de vender.' },
    { q: '¿Se conectan con mi inventario?', a: 'Sí. Las dos opciones se conectan con el ERP de NANIVA, así tus productos, precios y stock se mantienen al día.' },
  ],
};

export const productos = { erp, restaurante, catalogo, tienda, tiendas };


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
