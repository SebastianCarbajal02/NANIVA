// Clientes que muestran sus resultados con NANIVA: los usan el inicio y /casos-de-exito
import elohimColor from '@assets/image/shared/clientes/elohim-color.webp';
import zurielColor from '@assets/image/shared/clientes/zuriel-color.webp';
import wilsonColor from '@assets/image/shared/clientes/wilson-color.webp';
import jfColor from '@assets/image/shared/clientes/jf-color.webp';
import taburColor from '@assets/image/shared/clientes/tabur-color.webp';
import alaluColor from '@assets/image/shared/clientes/alalu-color.webp';
import eltreeColor from '@assets/image/shared/clientes/eltree-color.webp';
import geeokpointColor from '@assets/image/shared/clientes/geeokpoint-color.webp';
import petstoreColor from '@assets/image/shared/clientes/petstore-color.webp';
import toyColor from '@assets/image/shared/clientes/toy-color.webp';

export const casos = [
  {
    logo: "ELOHIM",
    nombre: "Elohim",
    logoIcon: elohimColor,
    avatar: elohimColor,
    meta: [
      { icon: "tag", text: "Tecnología" },
      { icon: "box", text: "1,200 productos" },
      { icon: "users", text: "5 usuarios" },
      { icon: "calendar", text: "Desde 2023" },
    ],
    achievements: [
      "Controlaron ventas e inventario desde un solo lugar",
      "Redujeron errores en el stock",
      "Tomaron decisiones con información en tiempo real",
    ],
    results: [
      { icon: "trend", value: "+35%", label: "Más ventas" },
      { icon: "clock", value: "20 h", label: "Menos trabajo semanal" },
    ],
    quote: "Naniva nos dio el control total del negocio. Hoy tomamos decisiones más rápidas y acertadas.",
    name: "Juan Carlos R.",
    role: "Gerente General",
  },
  {
    logo: "ZURIEL",
    nombre: "Zuriel",
    logoIcon: zurielColor,
    accent: "#2563eb",
    avatar: zurielColor,
    meta: [
      { icon: "tag", text: "Retail" },
      { icon: "box", text: "850 productos" },
      { icon: "users", text: "8 usuarios" },
      { icon: "calendar", text: "Desde 2022" },
    ],
    achievements: [
      "IA recomendaron compras antes del quiebre",
      "Menos desperdicio de inventario",
      "Reposición automática de productos",
    ],
    results: [
      { icon: "trend", value: "+80%", label: "Menos quiebres de stock" },
      { icon: "clock", value: "+28%", label: "Más rentabilidad" },
    ],
    quote: "Reducimos quiebres y ahora nuestros clientes siempre encuentran lo que buscan.",
    name: "Mariela S.",
    role: "Gerente Comercial",
  },
  {
    logo: "WILSON",
    nombre: "Wilson",
    logoIcon: wilsonColor,
    accent: "#2563eb",
    avatar: wilsonColor,
    meta: [
      { icon: "tag", text: "Servicios" },
      { icon: "box", text: "320 productos" },
      { icon: "users", text: "12 usuarios" },
      { icon: "calendar", text: "Desde 2023" },
    ],
    achievements: [
      "Implementación completa en solo 7 días",
      "Capacitación para todo el equipo",
      "Soporte permanente desde el primer día",
    ],
    results: [
      { icon: "bolt", value: "7 días", label: "Implementación completa" },
      { icon: "headset", value: "100%", label: "Satisfacción con el soporte" },
    ],
    quote: "La implementación fue rapidísima y el equipo de soporte nos acompañó en cada paso.",
    name: "Luis M.",
    role: "Gerente de Operaciones",
  },
  // TODO: datos de relleno — reemplazar rubro, métricas, cita y autor por los reales de cada cliente.
  {
    logo: "JF FARMA",
    nombre: "JF Farma",
    avatar: jfColor,
    meta: [
      { icon: "tag", text: "Farmacia" },
      { icon: "box", text: "2,500 productos" },
      { icon: "users", text: "6 usuarios" },
      { icon: "calendar", text: "Desde 2023" },
    ],
    achievements: [
      "Control de lotes y fechas de vencimiento",
      "Facturación electrónica sin errores",
      "Alertas de stock mínimo por producto",
    ],
    results: [
      { icon: "trend", value: "+25%", label: "Más ventas" },
      { icon: "clock", value: "-40%", label: "Productos vencidos" },
    ],
    quote: "Ahora sabemos qué productos vencen y cuándo reponer, sin revisar todo a mano.",
    name: "Cliente JF Farma",
    role: "Administración",
  },
  {
    logo: "GRUPO TAUVIR",
    nombre: "Grupo Tauvir",
    avatar: taburColor,
    meta: [
      { icon: "tag", text: "Distribución" },
      { icon: "box", text: "1,500 productos" },
      { icon: "users", text: "10 usuarios" },
      { icon: "calendar", text: "Desde 2022" },
    ],
    achievements: [
      "Inventario sincronizado entre almacenes",
      "Pedidos y despachos en un solo sistema",
      "Reportes de ventas por vendedor",
    ],
    results: [
      { icon: "trend", value: "+30%", label: "Más pedidos atendidos" },
      { icon: "clock", value: "15 h", label: "Menos trabajo semanal" },
    ],
    quote: "Tenemos todos los almacenes en una sola pantalla y los despachos salen más rápido.",
    name: "Cliente Grupo Tauvir",
    role: "Gerencia",
  },
  {
    logo: "ALALU",
    nombre: "Alalu",
    avatar: alaluColor,
    meta: [
      { icon: "tag", text: "Retail" },
      { icon: "box", text: "600 productos" },
      { icon: "users", text: "4 usuarios" },
      { icon: "calendar", text: "Desde 2024" },
    ],
    achievements: [
      "Punto de venta rápido y sencillo",
      "Cierre de caja diario sin descuadres",
      "Seguimiento de productos más vendidos",
    ],
    results: [
      { icon: "trend", value: "+20%", label: "Más ventas" },
      { icon: "clock", value: "10 h", label: "Menos trabajo semanal" },
    ],
    quote: "El cierre de caja pasó de ser un dolor de cabeza a algo de cinco minutos.",
    name: "Cliente Alalu",
    role: "Administración",
  },
  {
    logo: "EL TREE",
    nombre: "El Tree",
    avatar: eltreeColor,
    meta: [
      { icon: "tag", text: "Comercio" },
      { icon: "box", text: "900 productos" },
      { icon: "users", text: "5 usuarios" },
      { icon: "calendar", text: "Desde 2023" },
    ],
    achievements: [
      "Compras planificadas con datos reales",
      "Menos stock inmovilizado",
      "Indicadores del negocio en tiempo real",
    ],
    results: [
      { icon: "trend", value: "+18%", label: "Más rentabilidad" },
      { icon: "clock", value: "-30%", label: "Stock inmovilizado" },
    ],
    quote: "Compramos lo que realmente se vende y ya no tenemos dinero parado en el almacén.",
    name: "Cliente El Tree",
    role: "Gerencia",
  },
  {
    logo: "GEEOKPOINT",
    nombre: "Geeokpoint",
    avatar: geeokpointColor,
    meta: [
      { icon: "tag", text: "Tecnología" },
      { icon: "box", text: "1,100 productos" },
      { icon: "users", text: "7 usuarios" },
      { icon: "calendar", text: "Desde 2023" },
    ],
    achievements: [
      "Control de series y garantías",
      "Ventas en tienda y online integradas",
      "Inventario actualizado al instante",
    ],
    results: [
      { icon: "trend", value: "+32%", label: "Más ventas" },
      { icon: "clock", value: "12 h", label: "Menos trabajo semanal" },
    ],
    quote: "Integramos la tienda física y la online, y el stock siempre está al día.",
    name: "Cliente Geeokpoint",
    role: "Gerencia",
  },
  {
    logo: "PETSTORE",
    nombre: "Petstore",
    avatar: petstoreColor,
    meta: [
      { icon: "tag", text: "Mascotas" },
      { icon: "box", text: "700 productos" },
      { icon: "users", text: "4 usuarios" },
      { icon: "calendar", text: "Desde 2024" },
    ],
    achievements: [
      "Reposición automática de alimentos",
      "Historial de compras por cliente",
      "Facturación electrónica integrada",
    ],
    results: [
      { icon: "trend", value: "+22%", label: "Más ventas" },
      { icon: "clock", value: "-50%", label: "Quiebres de stock" },
    ],
    quote: "Nuestros clientes ya no se van sin su alimento: siempre hay stock.",
    name: "Cliente Petstore",
    role: "Administración",
  },
  {
    logo: "TOY",
    nombre: "Toy",
    avatar: toyColor,
    meta: [
      { icon: "tag", text: "Juguetería" },
      { icon: "box", text: "1,300 productos" },
      { icon: "users", text: "6 usuarios" },
      { icon: "calendar", text: "Desde 2023" },
    ],
    achievements: [
      "Preparación de campañas de temporada",
      "Control de inventario por categorías",
      "Reportes de ventas diarios",
    ],
    results: [
      { icon: "trend", value: "+40%", label: "Ventas en temporada" },
      { icon: "clock", value: "8 h", label: "Menos trabajo semanal" },
    ],
    quote: "En campaña navideña sabemos exactamente qué pedir y cuánto.",
    name: "Cliente Toy",
    role: "Gerencia",
  },
];
