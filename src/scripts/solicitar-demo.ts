// Validación y envío del formulario de /solicitar-demo.
// Las reglas viven en @data/solicitar-demo y el servidor las vuelve a aplicar en /api/solicitar-demo.
// Rubros y perfiles llegan de la API de demos de naniva (GET /demo-leads/rubros y /demo-leads/perfiles).
// Envío, en orden:
// 1. La solicitud va a la bandeja "Solicitudes de Demo" de naniva (POST /demo-leads, directo desde el navegador).
//    Si la API rechaza un dato o el límite de envíos, se muestra su mensaje y no se sigue.
// 2. Se guarda la fila en Google Sheets (vía /api/solicitar-demo) y llega el aviso por correo (Web3Forms).
//    El correo solo sale si el servidor aceptó la solicitud (pasó la protección contra bots), o de respaldo
//    si el servidor no respondió: así la solicitud no se pierde mientras uno de los tres funcione.
import { initFormModal } from '@scripts/form-modal';
import {
  API_DEMO,
  MENSAJES,
  errorDeCampo,
  esPerfilVisible,
  etiqueta,
  sugerirCorreo,
  validarSolicitud,
  type CampoDemo,
} from '@data/solicitar-demo';

const form = document.getElementById('demoForm') as HTMLFormElement | null;
const nombreInput = document.getElementById('demoNombre') as HTMLInputElement | null;
const telefono = document.getElementById('demoTelefono') as HTMLInputElement | null;
const correo = document.getElementById('demoCorreo') as HTMLInputElement | null;
const ruc = document.getElementById('demoRuc') as HTMLInputElement | null;
const rubro = document.getElementById('demoRubro') as HTMLSelectElement | null;
const perfilCampo = document.getElementById('demoPerfilCampo');
const perfil = document.getElementById('demoPerfil') as HTMLSelectElement | null;
const sugerencia = document.getElementById('demoSugerencia');
const sugerenciaBtn = document.getElementById('demoSugerenciaBtn') as HTMLButtonElement | null;
const trampa = form?.querySelector<HTMLInputElement>('input[name="sitio_web"]');
const errorEl = form?.querySelector<HTMLElement>('.demo-error');
const submitBtn = form?.querySelector<HTMLButtonElement>('.demo-submit');
const submitText = form?.querySelector<HTMLElement>('.demo-submit-text');

const { show: showModal } = initFormModal();

type Campo = HTMLInputElement | HTMLSelectElement;

// Cada campo del formulario y su nombre en las reglas
const CAMPOS: [Campo | null, CampoDemo][] = [
  [nombreInput, 'nombre'],
  [telefono, 'telefono'],
  [correo, 'correo'],
  [ruc, 'ruc'],
  [rubro, 'rubro'],
  [perfil, 'perfil'],
];
const nombreDe = (field: Campo) => CAMPOS.find(([f]) => f === field)?.[1];
const campoDe = (nombre: CampoDemo) => CAMPOS.find(([, n]) => n === nombre)?.[0] ?? null;

// Caracteres que se borran mientras se escribe (todo lo que no está en la lista blanca de cada dato)
const FILTROS: [HTMLInputElement | null, RegExp][] = [
  [nombreInput, /[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ .-]/g],
  [telefono, /\D/g],
  [ruc, /\D/g],
  [correo, /[^A-Za-z0-9._%+@-]/g],
];

// Verde cuando el campo es correcto, rojo cuando tiene contenido pero es incorrecto
function marcar(field: Campo) {
  const nombre = nombreDe(field);
  if (!nombre) return;
  const lleno = field.value.trim() !== '';
  const valido = errorDeCampo(nombre, field.value) === null;
  field.classList.toggle('is-valid', valido);
  field.classList.toggle('is-invalid', lleno && !valido);
  if (errorEl && valido) errorEl.textContent = '';
}

function mostrarError(nombre: CampoDemo | null, mensaje: string) {
  const field = nombre ? campoDe(nombre) : null;
  field?.classList.add('is-invalid');
  field?.focus();
  if (errorEl) errorEl.textContent = mensaje;
}

for (const [input, prohibido] of FILTROS) {
  input?.addEventListener('input', () => {
    const limpio = input.value.replace(prohibido, '');
    if (limpio !== input.value) input.value = limpio;
    marcar(input);
  });
}

// Correo: al salir del campo se sugiere la corrección si el dominio parece mal escrito (gmial.com → gmail.com)
// y se comprueba en el servidor que el dominio pueda recibir correos
function actualizarSugerencia() {
  if (!correo || !sugerencia || !sugerenciaBtn) return;
  const corregido = errorDeCampo('correo', correo.value) === null ? sugerirCorreo(correo.value) : null;
  sugerenciaBtn.textContent = corregido ?? '';
  sugerencia.hidden = !corregido;
}

// Resultado por dominio: true = recibe correo, false = no existe, null = no se pudo comprobar
const dominiosVerificados = new Map<string, boolean | null>();

async function dominioValido(valor: string) {
  const dominio = valor.trim().toLowerCase().split('@')[1] ?? '';
  if (!dominio) return null;
  if (dominiosVerificados.has(dominio)) return dominiosVerificados.get(dominio) ?? null;
  try {
    const response = await fetch(`/api/verificar-correo?dominio=${encodeURIComponent(dominio)}`, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(6_000),
    });
    const data = await response.json().catch(() => ({}));
    const existe = typeof data.existe === 'boolean' ? data.existe : null;
    if (existe !== null) dominiosVerificados.set(dominio, existe);
    return existe;
  } catch (error) {
    console.error('No se pudo comprobar el dominio del correo:', error);
    return null; // sin respuesta no se bloquea a la persona
  }
}

correo?.addEventListener('input', () => {
  if (sugerencia) sugerencia.hidden = true;
});

correo?.addEventListener('blur', async () => {
  if (errorDeCampo('correo', correo.value) !== null) return;
  actualizarSugerencia();
  const valor = correo.value;
  if ((await dominioValido(valor)) === false && correo.value === valor) {
    correo.classList.remove('is-valid');
    correo.classList.add('is-invalid');
    if (errorEl) errorEl.textContent = MENSAJES.dominio;
  }
});

sugerenciaBtn?.addEventListener('click', () => {
  if (!correo || !sugerenciaBtn.textContent) return;
  correo.value = sugerenciaBtn.textContent;
  if (sugerencia) sugerencia.hidden = true;
  marcar(correo);
  correo.focus();
});

const opcion = (valor: string, texto = etiqueta(valor)) => new Option(texto, valor);

const pedirApi = async (ruta: string) => {
  const response = await fetch(`${API_DEMO}${ruta}`, {
    headers: { Accept: 'application/json' },
    // La API a veces tarda en responder; mientras tanto quedan a la vista los rubros de respaldo
    signal: AbortSignal.timeout(20_000),
  });
  if (!response.ok) throw new Error(`La API respondió ${response.status}`);
  return response.json();
};

// Rubros reales de la API; si no responde se quedan los de respaldo que trae la página
async function cargarRubros() {
  if (!rubro) return;
  try {
    const data = await pedirApi('/rubros');
    const rubros: string[] = Array.isArray(data?.rubros) ? data.rubros.filter((r: unknown) => typeof r === 'string') : [];
    if (!rubros.length) return;
    const elegido = rubro.value;
    const placeholder = rubro.options[0];
    rubro.replaceChildren(placeholder, ...rubros.map((r) => opcion(r)));
    if (rubros.includes(elegido)) rubro.value = elegido;
    else placeholder.selected = true;
  } catch (error) {
    console.error('No se cargaron los rubros de la API; se usan los de respaldo:', error);
  }
}
if (form) cargarRubros();

// Perfiles del rubro (ej. en ferretería hay más de un producto que mostrar). La mayoría de rubros no tiene:
// en ese caso el campo no aparece. Se guardan por rubro para no repetir la consulta
const perfilesPorRubro = new Map<string, string[]>();

async function perfilesDe(valor: string) {
  const guardados = perfilesPorRubro.get(valor);
  if (guardados) return guardados;
  try {
    const data = await pedirApi(`/perfiles?rubro=${encodeURIComponent(valor)}`);
    const perfiles: string[] = Array.isArray(data?.perfiles)
      ? data.perfiles.filter((p: unknown) => typeof p === 'string' && esPerfilVisible(p))
      : [];
    perfilesPorRubro.set(valor, perfiles);
    return perfiles;
  } catch (error) {
    console.error('No se cargaron los perfiles del rubro:', error);
    return [];
  }
}

async function actualizarPerfiles() {
  if (!rubro || !perfil || !perfilCampo) return;
  const elegido = rubro.value;
  const perfiles = elegido ? await perfilesDe(elegido) : [];
  if (rubro.value !== elegido) return; // cambió de rubro mientras llegaba la respuesta

  perfil.replaceChildren(opcion('', 'Sin preferencia'), ...perfiles.map((p) => opcion(p)));
  perfil.classList.remove('is-valid', 'is-invalid');
  perfilCampo.hidden = !perfiles.length;
  perfil.disabled = !perfiles.length;
  // Cada página deja elegido su producto, si el rubro lo tiene: ERP en /solicitar-demo y catálogo en /solicitar-demo/catalogo
  const propio = form?.dataset.producto?.startsWith('Catálogo') ? /^cat[aá]logo/i : /^erp$/i;
  const elegidoPorPagina = perfiles.find((p) => propio.test(p));
  if (elegidoPorPagina) perfil.value = elegidoPorPagina;
}

rubro?.addEventListener('change', () => {
  marcar(rubro);
  actualizarPerfiles();
});

// Campos de la API y su nombre en el formulario, para marcar el que rechazó
const CAMPOS_API: Record<string, CampoDemo> = {
  nombre: 'nombre',
  telefono: 'telefono',
  email: 'correo',
  ruc: 'ruc',
  rubro: 'rubro',
  perfil: 'perfil',
};

type RespuestaNaniva =
  | { tipo: 'ok' } // 201: quedó en la bandeja de naniva
  | { tipo: 'rechazado'; campo: CampoDemo | null; error: string } // 422 o 429: la API explica el motivo
  | { tipo: 'fallo' }; // no respondió (caída, CORS o error del servidor): la hoja y el correo quedan de respaldo

// Sin reintentos automáticos: la API permite 5 envíos cada 10 minutos por IP
async function enviarANaniva(cuerpo: Record<string, string>): Promise<RespuestaNaniva> {
  try {
    const response = await fetch(API_DEMO, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(cuerpo),
      signal: AbortSignal.timeout(15_000),
    });
    if (response.ok) return { tipo: 'ok' };
    const data = await response.json().catch(() => ({}));
    if (response.status === 422 || response.status === 429) {
      // El mensaje de la API ya viene en español, listo para mostrar tal cual
      const [claveApi, mensajes] = Object.entries(data?.errors ?? {})[0] ?? [];
      const detalle = Array.isArray(mensajes) && typeof mensajes[0] === 'string' ? mensajes[0] : '';
      return {
        tipo: 'rechazado',
        campo: (claveApi && CAMPOS_API[claveApi]) || null,
        error: detalle || data?.message || 'No se pudo enviar la solicitud. Revisa los datos e intenta de nuevo.',
      };
    }
    console.error('La API de naniva no recibió la solicitud:', response.status, data);
    return { tipo: 'fallo' };
  } catch (error) {
    console.error('La API de naniva no recibió la solicitud:', error);
    return { tipo: 'fallo' };
  }
}

// Ficha firmada que entrega el servidor al cargar la página; sin ella el envío se rechaza
// (ver la protección contra bots en /api/solicitar-demo)
let ficha = '';
let fichaRecibida = 0;
// El servidor descarta los envíos hechos antes de 4 s de emitida la ficha (así detecta bots);
// si alguien es más rápido (por ejemplo con autocompletar), se espera lo que falta en vez de perder la solicitud
const ESPERA_MINIMA_MS = 4_500;

async function pedirFicha() {
  try {
    const response = await fetch('/api/solicitar-demo', { headers: { Accept: 'application/json' }, cache: 'no-store' });
    const data = await response.json().catch(() => ({}));
    ficha = typeof data.ficha === 'string' ? data.ficha : '';
    fichaRecibida = Date.now();
  } catch (error) {
    console.error('No se obtuvo la ficha del formulario:', error);
  }
}
if (form) pedirFicha();

type RespuestaHoja =
  | { tipo: 'campo'; campo: CampoDemo; error: string } // dato rechazado por las reglas
  | { tipo: 'bloqueado'; error: string } // origen, ficha o límite de envíos
  | { tipo: 'ok'; aviso: boolean } // aviso = guardada de verdad, se puede mandar el correo
  | { tipo: 'fallo' }; // el servidor o Google Sheets no respondió: el correo queda de respaldo

async function guardarEnHoja(cuerpo: Record<string, unknown>): Promise<RespuestaHoja> {
  try {
    if (!ficha) await pedirFicha();
    const falta = ESPERA_MINIMA_MS - (Date.now() - fichaRecibida);
    if (falta > 0) await new Promise((r) => setTimeout(r, falta));

    const response = await fetch('/api/solicitar-demo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ...cuerpo, ficha }),
    });
    const data = await response.json().catch(() => ({}));
    if (response.status === 400 && data.campo) return { tipo: 'campo', campo: data.campo, error: data.error };
    if (response.status === 403 || response.status === 429) {
      // Ficha vencida: se pide otra para que el siguiente intento pase
      if (data.ficha === 'vencida') await pedirFicha();
      return { tipo: 'bloqueado', error: data.error || 'No se pudo enviar la solicitud. Recarga la página e intenta de nuevo.' };
    }
    if (response.ok) return { tipo: 'ok', aviso: data.aviso === true };
    console.error('No se guardó la solicitud en la hoja:', data.error);
    return { tipo: 'fallo' };
  } catch (error) {
    console.error('No se guardó la solicitud en la hoja:', error);
    return { tipo: 'fallo' };
  }
}

async function avisarPorCorreo(d: { producto: string; nombre: string; telefono: string; correo: string; ruc: string; rubro: string }) {
  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: import.meta.env.PUBLIC_WEB3FORMS_KEY,
        subject: `Nueva solicitud de demo (${d.producto}) - RUC ${d.ruc}`,
        from_name: 'Solicitud de demo NANIVA',
        name: d.nombre,
        email: d.correo,
        phone: d.telefono,
        message: [
          'NUEVA SOLICITUD DE DEMOSTRACIÓN - NANIVA',
          '',
          `Producto: ${d.producto}`,
          `Nombre: ${d.nombre}`,
          `Teléfono: ${d.telefono}`,
          `Correo: ${d.correo}`,
          `RUC: ${d.ruc}`,
          `Rubro: ${d.rubro}`,
          `Fecha y hora: ${new Date().toLocaleString('es-PE', {
            timeZone: 'America/Lima', day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
          })}`,
        ].join('\n'),
      }),
    });
    const result = await response.json();
    if (!response.ok || !result.success) throw new Error(result.message || 'Error al enviar el correo');
    return true;
  } catch (error) {
    console.error('No se envió el correo de la solicitud:', error);
    return false;
  }
}

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!nombreInput || !telefono || !correo || !ruc || !rubro) return;

  // Si un bot llenó la trampa, se finge el envío y no se manda nada
  if (trampa?.value) return;

  const crudo = {
    producto: form.dataset.producto,
    nombre: nombreInput.value,
    telefono: telefono.value,
    correo: correo.value,
    ruc: ruc.value,
    rubro: rubro.value,
    perfil: perfil && !perfil.disabled ? perfil.value : '',
  };

  const validacion = validarSolicitud(crudo);
  if (!validacion.ok) {
    mostrarError(validacion.campo, validacion.error);
    return;
  }
  if (errorEl) errorEl.textContent = '';

  const textoOriginal = submitText?.textContent;
  if (submitBtn) submitBtn.disabled = true;
  if (submitText) submitText.textContent = 'Enviando...';

  try {
    const { datos } = validacion;
    // Un dominio que no existe se rechaza aquí, antes de enviar a naniva (si no se pudo comprobar, pasa)
    if ((await dominioValido(datos.correo)) === false) {
      mostrarError('correo', MENSAJES.dominio);
      return;
    }

    const naniva = await enviarANaniva({
      nombre: datos.nombre,
      telefono: datos.telefono,
      email: datos.correo,
      ruc: datos.ruc,
      rubro: crudo.rubro,
      ...(crudo.perfil ? { perfil: crudo.perfil } : {}),
      sitio_web: '', // honeypot: en un envío legítimo siempre va vacío
    });
    if (naniva.tipo === 'rechazado') {
      mostrarError(naniva.campo, naniva.error);
      return;
    }

    const hoja = await guardarEnHoja({ ...crudo, sitio_web: trampa?.value ?? '' });
    // Si naniva ya recibió la solicitud, un rechazo de la hoja no se le muestra a la persona
    if (naniva.tipo === 'fallo' && hoja.tipo === 'campo') {
      mostrarError(hoja.campo, hoja.error);
      return;
    }
    if (naniva.tipo === 'fallo' && hoja.tipo === 'bloqueado') {
      if (errorEl) errorEl.textContent = hoja.error;
      return;
    }

    // El correo solo sale si el servidor aceptó la solicitud, o de respaldo si el servidor no respondió
    const correoEnviado = hoja.tipo === 'fallo' || (hoja.tipo === 'ok' && hoja.aviso) ? await avisarPorCorreo(datos) : false;

    if (naniva.tipo === 'fallo' && hoja.tipo === 'fallo' && !correoEnviado) {
      showModal('error', 'No se pudo enviar', 'Hubo un error al enviar tu solicitud. Por favor intenta nuevamente o escríbenos por WhatsApp.');
      return;
    }

    showModal('success', 'Solicitud enviada', '¡Gracias! Nuestro equipo se pondrá en contacto contigo para coordinar tu demo.');
    form.reset();
    pedirFicha(); // cada ficha sirve para un solo envío
    rubro.dispatchEvent(new Event('change'));
    CAMPOS.forEach(([f]) => f?.classList.remove('is-valid', 'is-invalid'));
    if (sugerencia) sugerencia.hidden = true;
  } finally {
    if (submitBtn) submitBtn.disabled = false;
    if (submitText && textoOriginal) submitText.textContent = textoOriginal;
  }
});
