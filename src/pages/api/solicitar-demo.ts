// Recibe las solicitudes de /solicitar-demo, las vuelve a validar (el navegador se puede saltar)
// y guarda una fila en Google Sheets a través del Apps Script de docs/google-sheets/solicitudes-demo.gs.
//
// Protección contra bots y scrapers (capas, de la más barata a la más cara):
// 1. Origen: solo se aceptan envíos hechos desde el propio sitio (cabeceras Origin y Sec-Fetch-Site).
// 2. Ficha firmada: el formulario pide una ficha con GET al cargar y la devuelve al enviar. Va firmada con
//    HMAC, así que no se puede inventar; quien hace POST directo sin cargar la página queda fuera.
// 3. Tiempo mínimo: una persona tarda más de unos segundos en llenar el formulario; un bot, no.
// 4. Ficha de un solo uso y límite de envíos por IP (en memoria de cada instancia: frena ráfagas).
// 5. Trampa invisible (campo sitio_web, el mismo honeypot de la API de naniva) que solo llenan los bots.
// A los bots detectados por tiempo o trampa se les responde como si todo saliera bien, sin guardar nada.
import type { APIRoute } from 'astro';
import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import { MENSAJES, validarSolicitud } from '@data/solicitar-demo';
import { dominioRecibeCorreo } from './verificar-correo';

export const prerender = false;

const MAX_BYTES = 2_000;
const TIEMPO_MINIMO_MS = 4_000;
const VIGENCIA_FICHA_MS = 2 * 60 * 60 * 1000;
const VENTANA_IP_MS = 10 * 60 * 1000;
const ENVIOS_POR_IP = 8;
const FICHAS_POR_IP = 30;

const SITIO = 'https://www.naniva.pe';

const json = (body: object, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' },
  });

const env = (nombre: string): string | undefined =>
  (import.meta.env as Record<string, string | undefined>)[nombre] ?? process.env[nombre];

// La ficha se firma con el mismo secreto del Apps Script (solo vive en el servidor);
// el prefijo evita que una firma sirva para otro uso
const firmar = (secreto: string, carga: string) =>
  createHmac('sha256', secreto).update(`solicitar-demo:${carga}`).digest('base64url');

function crearFicha(secreto: string) {
  const carga = `${Date.now()}.${randomBytes(12).toString('base64url')}`;
  return `${carga}.${firmar(secreto, carga)}`;
}

/** Devuelve la edad de la ficha en ms y su identificador, o null si no es una ficha nuestra */
function leerFicha(secreto: string, ficha: unknown) {
  if (typeof ficha !== 'string' || ficha.length > 200) return null;
  const [emitida, nonce, firma, ...resto] = ficha.split('.');
  if (!emitida || !nonce || !firma || resto.length) return null;
  const esperada = Buffer.from(firmar(secreto, `${emitida}.${nonce}`));
  const recibida = Buffer.from(firma);
  if (recibida.length !== esperada.length || !timingSafeEqual(recibida, esperada)) return null;
  const edad = Date.now() - Number(emitida);
  return Number.isFinite(edad) ? { edad, nonce } : null;
}

// Registros en memoria: en serverless cada instancia tiene los suyos y se pierden al apagarse,
// así que frenan ráfagas pero no reemplazan un límite global
const fichasUsadas = new Map<string, number>();
const enviosPorIp = new Map<string, number[]>();
const fichasPorIp = new Map<string, number[]>();

function excedeLimite(registro: Map<string, number[]>, ip: string, maximo: number) {
  const ahora = Date.now();
  const recientes = (registro.get(ip) ?? []).filter((t) => ahora - t < VENTANA_IP_MS);
  recientes.push(ahora);
  registro.set(ip, recientes);
  if (registro.size > 5_000) registro.clear();
  return recientes.length > maximo;
}

// Se marca solo cuando la fila se guardó: si falla la validación o Google Sheets, la persona puede reintentar
function marcarFichaUsada(nonce: string) {
  const ahora = Date.now();
  if (fichasUsadas.size > 5_000) {
    for (const [n, t] of fichasUsadas) if (ahora - t > VIGENCIA_FICHA_MS) fichasUsadas.delete(n);
  }
  fichasUsadas.set(nonce, ahora);
}

function ipDe(request: Request, clientAddress: () => string) {
  try {
    return clientAddress();
  } catch {
    return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'desconocida';
  }
}

// El envío tiene que venir del mismo sitio: el propio dominio (o el de la vista previa / localhost)
function origenPermitido(request: Request) {
  const sitio = request.headers.get('sec-fetch-site');
  if (sitio && sitio !== 'same-origin') return false;
  const origen = request.headers.get('origin');
  if (!origen) return false;
  const propio = new URL(request.url).origin;
  return origen === propio || origen === SITIO || origen === SITIO.replace('www.', '');
}

export const GET: APIRoute = async ({ request, clientAddress }) => {
  const secreto = env('GOOGLE_SHEETS_TOKEN');
  if (!secreto) return json({ error: 'Configuración del servidor incompleta' }, 500);
  if (request.headers.get('sec-fetch-site') && request.headers.get('sec-fetch-site') !== 'same-origin') {
    return json({ error: 'No autorizado' }, 403);
  }
  if (excedeLimite(fichasPorIp, ipDe(request, clientAddress), FICHAS_POR_IP)) {
    return json({ error: 'Demasiadas solicitudes. Intenta en unos minutos.' }, 429);
  }
  return json({ ficha: crearFicha(secreto) }, 200);
};

export const POST: APIRoute = async ({ request, clientAddress }) => {
  if (!origenPermitido(request)) return json({ error: 'No autorizado' }, 403);

  if (!(request.headers.get('content-type') ?? '').includes('application/json')) {
    return json({ error: 'Formato no permitido' }, 415);
  }

  const texto = await request.text();
  if (texto.length > MAX_BYTES) return json({ error: 'Solicitud demasiado grande' }, 413);

  let raw: Record<string, unknown>;
  try {
    raw = JSON.parse(texto);
  } catch {
    return json({ error: 'Datos inválidos' }, 400);
  }
  if (!raw || typeof raw !== 'object') return json({ error: 'Datos inválidos' }, 400);

  const url = env('GOOGLE_SHEETS_WEBHOOK_URL');
  const token = env('GOOGLE_SHEETS_TOKEN');
  if (!url || !token) {
    console.error('Faltan GOOGLE_SHEETS_WEBHOOK_URL o GOOGLE_SHEETS_TOKEN en las variables de entorno.');
    return json({ error: 'Configuración del servidor incompleta' }, 500);
  }

  if (excedeLimite(enviosPorIp, ipDe(request, clientAddress), ENVIOS_POR_IP)) {
    return json({ error: 'Demasiados envíos seguidos. Intenta en unos minutos o escríbenos por WhatsApp.' }, 429);
  }

  const ficha = leerFicha(token, raw.ficha);
  if (!ficha || ficha.edad > VIGENCIA_FICHA_MS) {
    return json({ error: 'La página estuvo abierta mucho tiempo. Vuelve a presionar el botón para enviar.', ficha: 'vencida' }, 403);
  }

  // Trampas para bots: se responde como si todo saliera bien, pero no se guarda nada
  if (raw.sitio_web || ficha.edad < TIEMPO_MINIMO_MS) return json({ success: true }, 200);
  if (fichasUsadas.has(ficha.nonce)) return json({ success: true }, 200);

  const resultado = validarSolicitud(raw);
  if (!resultado.ok) return json({ error: resultado.error, campo: resultado.campo }, 400);
  // Solo se rechaza si el dominio seguro no existe; si el DNS no responde, la solicitud pasa
  if ((await dominioRecibeCorreo(resultado.datos.correo.split('@')[1])) === false) {
    return json({ error: MENSAJES.dominio, campo: 'correo' }, 400);
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, ...resultado.datos }),
      signal: AbortSignal.timeout(10_000),
    });
    const data = await response.json().catch(() => null);
    if (!response.ok || !data?.ok) {
      console.error('Google Sheets no guardó la solicitud:', response.status, data);
      return json({ error: 'No se pudo guardar la solicitud' }, 502);
    }
    marcarFichaUsada(ficha.nonce);
    // "aviso" le indica al navegador que la solicitud es real y puede mandar el correo
    return json({ success: true, aviso: true }, 200);
  } catch (error) {
    console.error('Error al guardar la solicitud de demo en Google Sheets:', error);
    return json({ error: 'No se pudo guardar la solicitud' }, 502);
  }
};
