// Validación y envío del formulario de /solicitar-demo.
// Las reglas viven en @data/solicitar-demo y el servidor las vuelve a aplicar en /api/solicitar-demo.
// Envío: primero se guarda la fila en Google Sheets (vía /api/solicitar-demo) y luego llega el aviso por correo
// (Web3Forms). Si uno de los dos falla, la solicitud no se pierde mientras el otro funcione.
import { initFormModal } from '@scripts/form-modal';
import { errorDeCampo, limpiar, validarSolicitud, type CampoDemo } from '@data/solicitar-demo';

const form = document.getElementById('demoForm') as HTMLFormElement | null;
const telefono = document.getElementById('demoTelefono') as HTMLInputElement | null;
const correo = document.getElementById('demoCorreo') as HTMLInputElement | null;
const ruc = document.getElementById('demoRuc') as HTMLInputElement | null;
const rubro = document.getElementById('demoRubro') as HTMLSelectElement | null;
const otroCampo = document.getElementById('demoOtroCampo');
const otroRubro = document.getElementById('demoOtroRubro') as HTMLInputElement | null;
const errorEl = form?.querySelector<HTMLElement>('.demo-error');
const submitBtn = form?.querySelector<HTMLButtonElement>('.demo-submit');
const submitText = form?.querySelector<HTMLElement>('.demo-submit-text');

const { show: showModal } = initFormModal();

type Campo = HTMLInputElement | HTMLSelectElement;

// Cada campo del formulario y su nombre en las reglas
const CAMPOS: [Campo | null, CampoDemo][] = [
  [telefono, 'telefono'],
  [correo, 'correo'],
  [ruc, 'ruc'],
  [rubro, 'rubro'],
  [otroRubro, 'otroRubro'],
];
const nombreDe = (field: Campo) => CAMPOS.find(([f]) => f === field)?.[1];
const campoDe = (nombre: CampoDemo) => CAMPOS.find(([, n]) => n === nombre)?.[0] ?? null;

// Caracteres que se borran mientras se escribe (todo lo que no está en la lista blanca de cada dato)
const FILTROS: [HTMLInputElement | null, RegExp][] = [
  [telefono, /\D/g],
  [ruc, /\D/g],
  [correo, /[^A-Za-z0-9._%+@-]/g],
  [otroRubro, /[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9 .,&()/-]/g],
];

const otroActivo = () => rubro?.value === 'Otro';

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

function mostrarError(nombre: CampoDemo, mensaje: string) {
  const field = campoDe(nombre);
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

// Al elegir "Otro" aparece la casilla para escribir el rubro y se vuelve obligatoria
rubro?.addEventListener('change', () => {
  marcar(rubro);
  if (!otroCampo || !otroRubro) return;
  const activo = otroActivo();
  otroCampo.hidden = !activo;
  otroRubro.disabled = !activo;
  otroRubro.required = activo;
  if (activo) {
    otroRubro.focus();
  } else {
    otroRubro.value = '';
    otroRubro.classList.remove('is-valid', 'is-invalid');
  }
});

async function guardarEnHoja(cuerpo: Record<string, unknown>) {
  try {
    const response = await fetch('/api/solicitar-demo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(cuerpo),
    });
    const data = await response.json().catch(() => ({}));
    if (response.status === 400) return { rechazado: true as const, campo: data.campo as CampoDemo, error: data.error as string };
    if (!response.ok) console.error('No se guardó la solicitud en la hoja:', data.error);
    return { rechazado: false as const, guardado: response.ok };
  } catch (error) {
    console.error('No se guardó la solicitud en la hoja:', error);
    return { rechazado: false as const, guardado: false };
  }
}

async function avisarPorCorreo(d: { producto: string; telefono: string; correo: string; ruc: string; rubro: string }) {
  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: import.meta.env.PUBLIC_WEB3FORMS_KEY,
        subject: `Nueva solicitud de demo (${d.producto}) - RUC ${d.ruc}`,
        from_name: 'Solicitud de demo NANIVA',
        name: `RUC ${d.ruc}`,
        email: d.correo,
        phone: d.telefono,
        message: [
          'NUEVA SOLICITUD DE DEMOSTRACIÓN - NANIVA',
          '',
          `Producto: ${d.producto}`,
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
  if (!telefono || !correo || !ruc || !rubro) return;

  // Si un bot marcó la trampa, se finge el envío y no se manda nada
  const trampa = form.querySelector<HTMLInputElement>('input[name="botcheck"]');
  if (trampa?.checked) return;

  const crudo = {
    producto: form.dataset.producto,
    telefono: telefono.value,
    correo: correo.value,
    ruc: ruc.value,
    rubro: rubro.value,
    otroRubro: otroActivo() ? otroRubro?.value : '',
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
    const hoja = await guardarEnHoja({ ...crudo, otroRubro: limpiar(crudo.otroRubro) });
    if (hoja.rechazado) {
      mostrarError(hoja.campo, hoja.error);
      return;
    }

    const correoEnviado = await avisarPorCorreo(validacion.datos);

    if (!hoja.guardado && !correoEnviado) {
      showModal('error', 'No se pudo enviar', 'Hubo un error al enviar tu solicitud. Por favor intenta nuevamente o escríbenos por WhatsApp.');
      return;
    }

    showModal('success', 'Solicitud enviada', '¡Gracias! Nuestro equipo se pondrá en contacto contigo para coordinar tu demo.');
    form.reset();
    rubro.dispatchEvent(new Event('change'));
    CAMPOS.forEach(([f]) => f?.classList.remove('is-valid', 'is-invalid'));
  } finally {
    if (submitBtn) submitBtn.disabled = false;
    if (submitText && textoOriginal) submitText.textContent = textoOriginal;
  }
});
