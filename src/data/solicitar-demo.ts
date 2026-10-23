// Reglas del formulario de /solicitar-demo. Las usan el navegador (@scripts/solicitar-demo)
// y el servidor (/api/solicitar-demo), así ambos validan exactamente lo mismo.

export const RUBROS = [
  'Comercio / Retail',
  'Distribución y mayoristas',
  'Ferretería',
  'Farmacia / Botica',
  'Restaurante',
  'Manufactura',
  'Servicios',
  'Otro',
] as const;

// Producto por el que se pide la demo: cada página del formulario envía el suyo y se guarda en la hoja
export const PRODUCTOS = ['ERP', 'Catálogo digital y tienda online'] as const;
export type Producto = (typeof PRODUCTOS)[number];

// Formatos permitidos para cada dato (listas blancas)
export const NOMBRE = /^(?=(?:.*[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]){2})[A-Za-zÁÉÍÓÚÜÑáéíóúüñ .-]{3,80}$/;
export const TELEFONO = /^9\d{8}$/;
export const RUC = /^(10|15|17|20)\d{9}$/;
export const CORREO = /^[A-Za-z0-9._%+-]{1,64}@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;
export const OTRO_RUBRO = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9 .,&()/-]{3,60}$/;

// Patrones típicos de inyección SQL (comentarios, separadores y palabras clave)
export const SQL_INJECTION = /('|"|;|--|\/\*|\*\/|\bxp_\w+\b|\bunion\b|\bselect\b|\binsert\b|\bupdate\b|\bdelete\b|\bdrop\b|\balter\b|\bexec\b|\btruncate\b|\bor\b\s+\d+\s*=\s*\d+)/i;

export const MENSAJES = {
  nombre: 'Ingresa tu nombre (3 a 80 caracteres; solo letras, espacios, punto y guion).',
  telefono: 'Ingresa un celular válido de 9 dígitos que empiece con 9.',
  correo: 'Ingresa un correo electrónico válido (ej: contacto@tuempresa.com).',
  ruc: 'Ingresa un RUC válido de 11 dígitos (empieza con 10, 15, 17 o 20).',
  rubro: 'Selecciona el rubro de tu empresa.',
  otroRubro: 'Escribe tu rubro (3 a 60 caracteres; solo letras, números y . , & ( ) / -).',
  sql: 'El campo contiene caracteres o palabras no permitidas.',
} as const;

export type CampoDemo = 'nombre' | 'telefono' | 'correo' | 'ruc' | 'rubro' | 'otroRubro';

export interface SolicitudDemo {
  telefono: string;
  correo: string;
  ruc: string;
  rubro: string;
  otroRubro?: string;
}

export const limpiar = (valor: unknown) => String(valor ?? '').trim().replace(/\s+/g, ' ');

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
      case 'rubro': return (RUBROS as readonly string[]).includes(v);
      case 'otroRubro': return OTRO_RUBRO.test(v);
    }
  })();
  return ok ? null : MENSAJES[campo];
}

/** Producto válido de la lista; cualquier otro valor se toma como la demo general del ERP */
export const productoValido = (valor: unknown): Producto =>
  (PRODUCTOS as readonly string[]).includes(limpiar(valor)) ? (limpiar(valor) as Producto) : 'ERP';

/** Valida la solicitud completa. "otroRubro" solo es obligatorio cuando el rubro es "Otro" */
export function validarSolicitud(datos: Partial<Record<CampoDemo | 'producto', unknown>>):
  | { ok: true; datos: { producto: Producto; nombre: string; telefono: string; correo: string; ruc: string; rubro: string } }
  | { ok: false; campo: CampoDemo; error: string } {
  const campos: CampoDemo[] = ['nombre', 'telefono', 'correo', 'ruc', 'rubro'];
  if (limpiar(datos.rubro) === 'Otro') campos.push('otroRubro');

  for (const campo of campos) {
    const error = errorDeCampo(campo, datos[campo]);
    if (error) return { ok: false, campo, error };
  }

  const rubro = limpiar(datos.rubro);
  return {
    ok: true,
    datos: {
      producto: productoValido(datos.producto),
      nombre: limpiar(datos.nombre),
      telefono: limpiar(datos.telefono),
      correo: limpiar(datos.correo).toLowerCase(),
      ruc: limpiar(datos.ruc),
      rubro: rubro === 'Otro' ? `Otro: ${limpiar(datos.otroRubro)}` : rubro,
    },
  };
}
