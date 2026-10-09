export const faqs = [
  { q: "¿Cuánto demora implementar Naniva?", a: "La implementación completa toma entre 3 y 7 días, dependiendo del tamaño de tu empresa y los módulos que necesites." },
  { q: "¿Puedo conectar WhatsApp?", a: "Sí, Naniva se integra directamente con WhatsApp Business para catálogo, pedidos y notificaciones a tus clientes." },
  { q: "¿Puedo migrar mis datos?", a: "Sí, nuestro equipo te ayuda a importar y validar tu información existente (productos, clientes, inventario) sin perder nada." },
  { q: "¿La información está segura?", a: "Toda tu información se almacena cifrada en la nube con respaldos automáticos y los más altos estándares de seguridad." },
  { q: "¿Necesito instalar algo?", a: "No, Naniva funciona 100% desde el navegador. Solo necesitas conexión a internet, sin instalar software adicional." },
  { q: "¿Puedo usar varias empresas?", a: "Sí, puedes administrar múltiples empresas o sucursales desde una sola cuenta, cada una con su propia información." },
  { q: "¿Tiene aplicación móvil?", a: "Sí, Naniva cuenta con una app móvil para que gestiones tu negocio desde cualquier lugar." },
  { q: "¿Cómo solicito una demostración?", a: "Solo haz clic en \"Solicitar demostración\" o escríbenos por WhatsApp y coordinamos una sesión personalizada sin compromiso." },
];

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};
