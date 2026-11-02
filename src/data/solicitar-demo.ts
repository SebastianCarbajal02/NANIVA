// Reglas del formulario de /solicitar-demo. Las usan el navegador (@scripts/solicitar-demo)
// y el servidor (/api/solicitar-demo), así ambos validan exactamente lo mismo.

// API de naniva que deja las solicitudes en la bandeja "Solicitudes de Demo" del admin.
// La llama el navegador y no nuestro servidor: su límite (5 envíos cada 10 minutos) es por IP
// y, si pasara por Vercel, todos los visitantes compartirían el mismo límite.
// En local pasa por el proxy de astro.config.mjs, porque la API solo acepta (CORS) los dominios del sitio
export const API_DEMO = import.meta.env?.DEV ? '/naniva-api/demo-leads' : 'https://admin.erp.naniva.cloud/admin-api/demo-leads';

// Rubros de respaldo por si /demo-leads/rubros no responde; los reales llegan de la API al cargar la página
export const RUBROS_RESPALDO = ['ferreteria', 'hogar', 'importadora', 'jugueteria', 'ropa', 'tecnologia'];

// Nombres para mostrar de los rubros y perfiles de la API (llegan en minúsculas y sin tildes)
const ETIQUETAS: Record<string, string> = {
  autopartes: 'Autopartes',
  bazar: 'Bazar',
  belleza: 'Belleza',
  ferreteria: 'Ferretería',
  hogar: 'Hogar',
  importadora: 'Importadora',
  jugueteria: 'Juguetería',
  ropa: 'Ropa',
  tecnologia: 'Tecnología',
  admin: 'Administrador',
  vendedor: 'Vendedor',
  erp: 'ERP',
  'catalogo smart': 'Catálogo Smart',
};

// De los perfiles que devuelve la API solo se ofrecen los productos (ERP y catálogo); admin, vendedor, etc. no
export const esPerfilVisible = (valor: unknown) => /^(erp|cat[aá]logo\b.*)$/i.test(limpiar(valor));

// Producto por el que se pide la demo: cada página del formulario envía el suyo y se guarda en la hoja
export const PRODUCTOS = ['ERP', 'Catálogo digital y tienda online'] as const;
export type Producto = (typeof PRODUCTOS)[number];

// Formatos permitidos para cada dato (listas blancas)
export const NOMBRE = /^(?=(?:.*[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]){2})[A-Za-zÁÉÍÓÚÜÑáéíóúüñ .-]{3,80}$/;
export const TELEFONO = /^9\d{8}$/;
export const RUC = /^(10|15|17|20)\d{9}$/;
export const CORREO = /^[A-Za-z0-9._%+-]{1,64}@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;
// Rubros y perfiles los define la API (pueden cambiar): aquí solo se controla su forma
export const VALOR_API = /^[A-Za-z0-9ÁÉÍÓÚÜÑáéíóúüñ _-]{2,40}$/;

// Patrones típicos de inyección SQL (comentarios, separadores y palabras clave)
export const SQL_INJECTION = /('|"|;|--|\/\*|\*\/|\bxp_\w+\b|\bunion\b|\bselect\b|\binsert\b|\bupdate\b|\bdelete\b|\bdrop\b|\balter\b|\bexec\b|\btruncate\b|\bor\b\s+\d+\s*=\s*\d+)/i;

export const MENSAJES = {
  nombre: 'Ingresa tu nombre (3 a 80 caracteres; solo letras, espacios, punto y guion).',
  telefono: 'Ingresa un celular válido de 9 dígitos que empiece con 9.',
  correo: 'Ingresa un correo electrónico válido (ej: contacto@tuempresa.com).',
  ruc: 'Ingresa un RUC válido de 11 dígitos (empieza con 10, 15, 17 o 20).',
  rubro: 'Selecciona el rubro de tu empresa.',
  perfil: 'Selecciona una opción válida.',
  sql: 'El campo contiene caracteres o palabras no permitidas.',
  dominio: 'Ese correo no puede recibir mensajes: revisa lo que va después de la @.',
} as const;

export type CampoDemo = 'nombre' | 'telefono' | 'correo' | 'ruc' | 'rubro' | 'perfil';

export interface SolicitudDemo {
  telefono: string;
  correo: string;
  ruc: string;
  rubro: string;
  perfil?: string;
}

export const limpiar = (valor: unknown) => String(valor ?? '').trim().replace(/\s+/g, ' ');

/** Nombre para mostrar de un rubro o perfil; uno nuevo sin etiqueta se muestra con mayúscula inicial */
export function etiqueta(valor: unknown) {
  const v = limpiar(valor);
  return ETIQUETAS[v.toLowerCase()] ?? v.replace(/[_-]+/g, ' ').replace(/^./, (c) => c.toUpperCase());
}

/** Devuelve el mensaje de error del campo, o null si el valor es válido */
export function errorDeCampo(campo: CampoDemo, valorCrudo: unknown): string | null {
  const v = limpiar(valorCrudo);
  if (v !== '' && SQL_INJECTION.test(v)) return MENSAJES.sql;
  const ok = (() => {
    switch (campo) {
      case 'nombre': return NOMBRE.test(v);
      case 'telefono': return TELEFONO.test(v);
      case 'correo': return v.length <= 100 && CORREO.test(v);
      case 'ruc': return RUC.test(v);
      case 'rubro': return VALOR_API.test(v);
      case 'perfil': return v === '' || (VALOR_API.test(v) && esPerfilVisible(v));
    }
  })();
  return ok ? null : MENSAJES[campo];
}

// Dominios de correo más usados: si el escrito se parece a uno (1 o 2 letras de diferencia) se sugiere la corrección
const DOMINIOS_COMUNES = [
  'gmail.com', 'hotmail.com', 'hotmail.es', 'outlook.com', 'outlook.es', 'live.com', 'yahoo.com', 'yahoo.es',
  'icloud.com', 'msn.com', 'aol.com', 'mail.com', 'ymail.com', 'protonmail.com',
];
// Terminaciones mal escritas de ".com" en cualquier dominio (ej. empresa.con → empresa.com)
const TERMINACION_COM = /\.(con|cmo|ocm|vom|xom|comm|coom|cpm)$/i;

/** Letras de diferencia entre dos textos (distancia de Levenshtein) */
function diferencia(a: string, b: string) {
  let anterior = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const fila = [i];
    for (let j = 1; j <= b.length; j++) {
      fila[j] = Math.min(anterior[j] + 1, fila[j - 1] + 1, anterior[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    anterior = fila;
  }
  return anterior[b.length];
}

/** Correo corregido si el dominio parece mal escrito (gmial.com, hotmail.con…), o null si se ve bien */
export function sugerirCorreo(valor: unknown): string | null {
  const correo = limpiar(valor).toLowerCase();
  const arroba = correo.lastIndexOf('@');
  if (arroba < 1) return null;
  const usuario = correo.slice(0, arroba);
  const dominio = correo.slice(arroba + 1);
  if (!dominio || DOMINIOS_COMUNES.includes(dominio)) return null;

  const parecido = DOMINIOS_COMUNES
    .map((d) => ({ d, n: diferencia(dominio, d) }))
    .filter(({ n }) => n <= 2)
    .sort((x, y) => x.n - y.n)[0];
  if (parecido) return `${usuario}@${parecido.d}`;
  if (TERMINACION_COM.test(dominio)) return `${usuario}@${dominio.replace(TERMINACION_COM, '.com')}`;
  return null;
}

/** Producto válido de la lista; cualquier otro valor se toma como la demo general del ERP */
export const productoValido = (valor: unknown): Producto =>
  (PRODUCTOS as readonly string[]).includes(limpiar(valor)) ? (limpiar(valor) as Producto) : 'ERP';

/** Valida la solicitud completa. El perfil es opcional: solo algunos rubros tienen perfiles */
export function validarSolicitud(datos: Partial<Record<CampoDemo | 'producto', unknown>>):
  | { ok: true; datos: { producto: Producto; nombre: string; telefono: string; correo: string; ruc: string; rubro: string } }
  | { ok: false; campo: CampoDemo; error: string } {
  const campos: CampoDemo[] = ['nombre', 'telefono', 'correo', 'ruc', 'rubro', 'perfil'];

  for (const campo of campos) {
    const error = errorDeCampo(campo, datos[campo]);
    if (error) return { ok: false, campo, error };
  }

  const rubro = etiqueta(datos.rubro);
  const perfil = limpiar(datos.perfil);
  return {
    ok: true,
    datos: {
      producto: productoValido(datos.producto),
      nombre: limpiar(datos.nombre),
      telefono: limpiar(datos.telefono),
      correo: limpiar(datos.correo).toLowerCase(),
      ruc: limpiar(datos.ruc),
      // Para la hoja y el correo va el nombre bonito, con el perfil si lo eligió (ej. "Ferretería · Catálogo Smart")
      rubro: perfil ? `${rubro} · ${etiqueta(perfil)}` : rubro,
    },
  };
}
