// Recibe las solicitudes de /solicitar-demo, las vuelve a validar (el navegador se puede saltar)
// y guarda una fila en Google Sheets a través del Apps Script de docs/google-sheets/solicitudes-demo.gs.
import type { APIRoute } from 'astro';
import { validarSolicitud } from '@data/solicitar-demo';

export const prerender = false;

const MAX_BYTES = 2_000;

const json = (body: object, status: number) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

const env = (nombre: string): string | undefined =>
  (import.meta.env as Record<string, string | undefined>)[nombre] ?? process.env[nombre];

export const POST: APIRoute = async ({ request }) => {
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

  // Trampa para bots: se responde como si todo saliera bien, pero no se guarda nada
  if (raw.botcheck) return json({ success: true }, 200);

  const resultado = validarSolicitud(raw);
  if (!resultado.ok) return json({ error: resultado.error, campo: resultado.campo }, 400);

  const url = env('GOOGLE_SHEETS_WEBHOOK_URL');
  const token = env('GOOGLE_SHEETS_TOKEN');
  if (!url || !token) {
    console.error('Faltan GOOGLE_SHEETS_WEBHOOK_URL o GOOGLE_SHEETS_TOKEN en las variables de entorno.');
    return json({ error: 'Configuración del servidor incompleta' }, 500);
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
    return json({ success: true }, 200);
  } catch (error) {
    console.error('Error al guardar la solicitud de demo en Google Sheets:', error);
    return json({ error: 'No se pudo guardar la solicitud' }, 502);
  }
};
