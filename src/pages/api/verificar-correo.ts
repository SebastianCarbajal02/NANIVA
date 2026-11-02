// Comprueba que el dominio de un correo pueda recibir mensajes (tiene registro MX o, en su defecto, una IP),
// para que el formulario de /solicitar-demo avise de dominios inexistentes como "@empresainventada123.com".
// No confirma que el buzón exista. Si el DNS no responde a tiempo se devuelve "null" (no se sabe) y el
// formulario deja pasar el correo: es preferible a rechazar uno bueno.
import type { APIRoute } from 'astro';
import { Resolver } from 'node:dns/promises';

export const prerender = false;

const DOMINIO = /^(?=.{4,253}$)([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/;
const ESPERA_MS = 4_000;
// Errores del DNS que significan "este dominio no existe o no tiene registros"
const NO_EXISTE = new Set(['ENOTFOUND', 'ENODATA', 'NXDOMAIN']);

// Resultados recientes en memoria (por instancia) para no repetir la consulta
const cache = new Map<string, { existe: boolean; hasta: number }>();

const json = (body: object, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' },
  });

// Primero el DNS del sistema; si no responde (en algunas PCs apunta a 127.0.0.1 y rechaza la consulta),
// los públicos de Cloudflare y Google
const sistema = new Resolver({ timeout: 2_000, tries: 1 });
const publicos = new Resolver({ timeout: 2_000, tries: 1 });
publicos.setServers(['1.1.1.1', '8.8.8.8']);

type Tipo = 'MX' | 'A' | 'AAAA';
const consultar = (r: Resolver, dominio: string, tipo: Tipo): Promise<unknown[]> =>
  tipo === 'MX' ? r.resolveMx(dominio) : tipo === 'A' ? r.resolve4(dominio) : r.resolve6(dominio);

/** true si responde, false si no existe; lanza el error si ningún DNS pudo responder */
async function tieneRegistro(dominio: string, tipo: Tipo) {
  for (const resolver of [sistema, publicos]) {
    try {
      return (await consultar(resolver, dominio, tipo)).length > 0;
    } catch (error) {
      if (NO_EXISTE.has((error as NodeJS.ErrnoException).code ?? '')) return false;
      if (resolver === publicos) throw error;
    }
  }
  return false;
}

/** true si el dominio puede recibir correo, false si no, null si no se pudo comprobar */
export async function dominioRecibeCorreo(dominioCrudo: unknown): Promise<boolean | null> {
  const dominio = String(dominioCrudo ?? '').trim().toLowerCase();
  if (!DOMINIO.test(dominio)) return false;

  const guardado = cache.get(dominio);
  if (guardado && guardado.hasta > Date.now()) return guardado.existe;

  const consulta = (async () => {
    if (await tieneRegistro(dominio, 'MX')) return true;
    // Sin MX, el correo se entrega a la IP del dominio (RFC 5321)
    return (await tieneRegistro(dominio, 'A')) || (await tieneRegistro(dominio, 'AAAA'));
  })();
  const limite = new Promise<null>((r) => setTimeout(() => r(null), ESPERA_MS));

  try {
    const existe = await Promise.race([consulta, limite]);
    if (existe !== null) {
      if (cache.size > 2_000) cache.clear();
      cache.set(dominio, { existe, hasta: Date.now() + 60 * 60 * 1000 });
    }
    return existe;
  } catch (error) {
    console.error('No se pudo comprobar el dominio del correo:', dominio, error);
    return null;
  }
}

export const GET: APIRoute = async ({ url }) => {
  const dominio = url.searchParams.get('dominio') ?? '';
  if (dominio.length > 253) return json({ existe: false }, 200);
  return json({ existe: await dominioRecibeCorreo(dominio) }, 200);
};
