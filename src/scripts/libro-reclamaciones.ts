// Validación y envío del formulario del Libro de Reclamaciones
import { initFormModal } from '@scripts/form-modal';

const form1 = document.getElementById('reclamacionForm') as HTMLFormElement | null;
const form2 = document.getElementById('reclamacionForm2') as HTMLFormElement | null;
const submitBtn = document.querySelector<HTMLButtonElement>('.submit-btn');
const docNumberInput = document.getElementById('docNumber') as HTMLInputElement | null;
const phoneInput = document.getElementById('phone') as HTMLInputElement | null;

const { show: showModal } = initFormModal();

// Solo permite dígitos en el número de documento y en el teléfono
docNumberInput?.addEventListener('input', () => {
  docNumberInput.value = docNumberInput.value.replace(/\D/g, '');
});
phoneInput?.addEventListener('input', () => {
  phoneInput.value = phoneInput.value.replace(/\D/g, '');
});

// Bloquea patrones típicos de inyección SQL en cualquier campo de texto
const SQL_INJECTION_PATTERN = /('|"|;|--|\/\*|\*\/|\bxp_\w+\b|\bunion\b|\bselect\b|\binsert\b|\bupdate\b|\bdelete\b|\bdrop\b|\balter\b|\bexec\b|\bor\b\s+1\s*=\s*1)/i;

function hasSqlInjection(data: Record<string, string>) {
  return Object.values(data).some((value) => SQL_INJECTION_PATTERN.test(value));
}

// Solo se aceptan correos de proveedores reales y conocidos
const ALLOWED_EMAIL_DOMAINS = [
  'gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 'live.com',
  'icloud.com', 'protonmail.com', 'aol.com', 'msn.com',
  'hotmail.es', 'outlook.es', 'yahoo.es',
];
const EMAIL_FORMAT = /^[^\s@]+@([^\s@]+)$/;

function isValidEmail(email: string) {
  const match = EMAIL_FORMAT.exec(email.trim());
  if (!match) return false;
  const domain = match[1].toLowerCase();
  return ALLOWED_EMAIL_DOMAINS.includes(domain);
}

// Elimina en tiempo real caracteres peligrosos (comillas, < >, ; ) de los
// campos de texto/textarea, sin tocar el input numérico del documento
const DANGEROUS_CHARS = /[<>"';`]/g;
const textFields = [
  ...(form1?.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input[type="text"], input[type="tel"], textarea') ?? []),
  ...(form2?.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input[type="text"], textarea') ?? []),
];

for (const field of textFields) {
  if (field === docNumberInput || field === phoneInput) continue;
  field.addEventListener('input', () => {
    const cleaned = field.value.replace(DANGEROUS_CHARS, '');
    if (cleaned !== field.value) field.value = cleaned;
  });
}

// Marca en verde ("is-valid") cada campo cuando su contenido es correcto,
// y en rojo ("is-invalid") cuando tiene contenido pero es incorrecto
function updateFieldValidity(field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) {
  if (field.id === 'email') {
    field.setCustomValidity(field.value && !isValidEmail(field.value) ? 'Dominio de correo no permitido' : '');
  }

  const filled = field.value.trim() !== '';
  let valid = filled && field.checkValidity();

  if (field.tagName === 'SELECT' && field.value === 'Seleccione') valid = false;

  field.classList.toggle('is-valid', valid);
  field.classList.toggle('is-invalid', filled && !valid);
}

const validatableFields = [
  ...(form1?.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('input:not([type="radio"]), select, textarea') ?? []),
  ...(form2?.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('input:not([type="radio"]), select, textarea') ?? []),
];

for (const field of validatableFields) {
  field.addEventListener('input', () => updateFieldValidity(field));
  field.addEventListener('change', () => updateFieldValidity(field));
}

// Grupos de radio (Producto/Servicio, Reclamo/Queja): marcan el contenedor en verde al elegir una opción
const radioGroups = document.querySelectorAll<HTMLElement>('.radio-group');
for (const group of radioGroups) {
  const radios = group.querySelectorAll<HTMLInputElement>('input[type="radio"]');
  radios.forEach((radio) => {
    radio.addEventListener('change', () => {
      group.classList.toggle('is-valid', Array.from(radios).some((r) => r.checked));
    });
  });
}

function buildMessage(d: Record<string, string>) {
  return `
NUEVO RECLAMO - LIBRO DE RECLAMACIONES NANIVA

--- Datos del Cliente ---
Tipo de documento: ${d.tipoDocumento}
N° de documento: ${d.numeroDocumento}
Nombre completo: ${d.nombreCompleto}
Teléfono: ${d.telefono}
Correo: ${d.correo || 'No proporcionado'}
Domicilio: ${d.domicilio}
Ubicación: ${d.departamento} / ${d.provincia} / ${d.distrito}

--- Detalle de la Reclamación ---
Orden de compra: ${d.ordenCompra || 'No proporcionado'}
Producto / Servicio: ${d.producto}
Tipo de bien: ${d.tipobien}
Tipo: ${d.tipoReclamacion}
Monto reclamado: S/ ${d.monto}
Submotivo: ${d.submotivo || 'No proporcionado'}
Motivo: ${d.motivo}
Detalle: ${d.detalle}
Pedido del cliente: ${d.pedido}
`.trim();
}

form2?.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!form1 || !form2) return;

  if (!form1.reportValidity() || !form2.reportValidity()) return;

  const data = {
    ...Object.fromEntries(new FormData(form1)),
    ...Object.fromEntries(new FormData(form2)),
  } as Record<string, string>;

  if (!/^\d{6,15}$/.test(data.numeroDocumento)) {
    showModal('error', 'Documento inválido', 'El número de documento solo debe contener números (6 a 15 dígitos).');
    return;
  }

  if (!/^\d{6,9}$/.test(data.telefono)) {
    showModal('error', 'Teléfono inválido', 'El teléfono solo debe contener números (6 a 9 dígitos).');
    return;
  }

  const montoNum = Number(data.monto);
  if (!data.monto || Number.isNaN(montoNum) || montoNum <= 0 || !/^\d+(\.\d{1,2})?$/.test(data.monto)) {
    showModal('error', 'Monto inválido', 'El monto reclamado debe ser un número válido mayor a 0.');
    return;
  }

  if (data.correo && !isValidEmail(data.correo)) {
    showModal('error', 'Correo inválido', 'Ingresa un correo de un proveedor válido (Gmail, Hotmail, Outlook, Yahoo, etc.).');
    return;
  }

  if (hasSqlInjection(data)) {
    showModal('error', 'Datos no válidos', 'Se detectaron caracteres o palabras no permitidas en el formulario. Por favor revisa los campos.');
    return;
  }

  const originalText = submitBtn?.innerHTML;
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Enviando...</span>';
  }

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: import.meta.env.PUBLIC_WEB3FORMS_KEY,
        subject: `Nuevo reclamo de ${data.nombreCompleto} - Libro de Reclamaciones NANIVA`,
        from_name: 'Libro de Reclamaciones NANIVA',
        name: data.nombreCompleto,
        email: data.correo || 'no-reply@naniva.com',
        phone: data.telefono,
        message: buildMessage(data),
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Error al enviar el reclamo');
    }

    showModal('success', 'Reclamación enviada', 'Gracias por tu reclamo. Nos pondremos en contacto pronto.');
    form1.reset();
    form2.reset();
  } catch (error) {
    console.error('Error al enviar reclamo:', error);
    showModal('error', 'No se pudo enviar', 'Hubo un error al enviar tu reclamo. Por favor intenta nuevamente.');
  } finally {
    if (submitBtn && originalText) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  }
});
