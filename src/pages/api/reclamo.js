export const prerender = false;

export async function POST({ request }) {
  try {
    const contentType = request.headers.get('content-type') || '';
    const raw = contentType.includes('application/json')
      ? await request.json()
      : Object.fromEntries((await request.formData()).entries());

    const {
      tipoDocumento, numeroDocumento, nombreCompleto, telefono, correo,
      domicilio, departamento, provincia, distrito,
      ordenCompra, producto, tipobien, tipoReclamacion,
      monto, submotivo, motivo, detalle, pedido,
    } = raw;

    const required = { numeroDocumento, nombreCompleto, telefono, domicilio, departamento, provincia, distrito, producto, tipobien, tipoReclamacion, monto, motivo, detalle, pedido };
    for (const [key, value] of Object.entries(required)) {
      if (!value) {
        return new Response(JSON.stringify({ error: `Falta el campo requerido: ${key}` }), { status: 400 });
      }
    }

    if (correo) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(correo)) {
        return new Response(JSON.stringify({ error: 'Email inválido' }), { status: 400 });
      }
    }

    const sanitize = (str) => String(str ?? '').replace(/[<>&"']/g, '');
    const s = Object.fromEntries(
      Object.entries({
        tipoDocumento, numeroDocumento, nombreCompleto, telefono, correo,
        domicilio, departamento, provincia, distrito,
        ordenCompra, producto, tipobien, tipoReclamacion,
        monto, submotivo, motivo, detalle, pedido,
      }).map(([k, v]) => [k, sanitize(v)])
    );

    const message = `
NUEVO RECLAMO - LIBRO DE RECLAMACIONES NANIVA

--- Datos del Cliente ---
Tipo de documento: ${s.tipoDocumento}
N° de documento: ${s.numeroDocumento}
Nombre completo: ${s.nombreCompleto}
Teléfono: ${s.telefono}
Correo: ${s.correo || 'No proporcionado'}
Domicilio: ${s.domicilio}
Ubicación: ${s.departamento} / ${s.provincia} / ${s.distrito}

--- Detalle de la Reclamación ---
Orden de compra: ${s.ordenCompra || 'No proporcionado'}
Producto / Servicio: ${s.producto}
Tipo de bien: ${s.tipobien}
Tipo: ${s.tipoReclamacion}
Monto reclamado: S/ ${s.monto}
Submotivo: ${s.submotivo || 'No proporcionado'}
Motivo: ${s.motivo}
Detalle: ${s.detalle}
Pedido del cliente: ${s.pedido}
`.trim();

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: import.meta.env.WEB3FORMS_KEY,
        subject: `Nuevo reclamo de ${s.nombreCompleto} - Libro de Reclamaciones NANIVA`,
        from_name: 'Libro de Reclamaciones NANIVA',
        name: s.nombreCompleto,
        email: s.correo || 'no-reply@naniva.com',
        phone: s.telefono,
        message,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Web3Forms error:', data);
      return new Response(JSON.stringify({ error: 'Error al enviar el reclamo' }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true, message: 'Reclamo enviado correctamente' }), { status: 200 });
  } catch (error) {
    console.error('Reclamo form error:', error);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), { status: 500 });
  }
}
