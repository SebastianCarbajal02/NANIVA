export const prerender = false;

export async function POST({ request }) {
  try {
    const contentType = request.headers.get('content-type') || '';
    const raw = contentType.includes('application/json')
      ? await request.json()
      : Object.fromEntries((await request.formData()).entries());

    const { name, email, phone, message } = raw;

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Faltan campos requeridos' }), { status: 400 });
    }

    if (name.length > 100 || email.length > 200 || message.length > 5000) {
      return new Response(JSON.stringify({ error: 'Campos exceden longitud máxima' }), { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: 'Email inválido' }), { status: 400 });
    }

    const sanitize = (str) => String(str).replace(/[<>&"']/g, '');
    const cleanName = sanitize(name);
    const cleanEmail = sanitize(email);
    const cleanPhone = phone ? sanitize(phone) : '';
    const cleanMessage = sanitize(message);

    const accessKey = import.meta.env.WEB3FORMS_KEY;
    if (!accessKey) {
      console.error('WEB3FORMS_KEY no está configurada en las variables de entorno.');
      return new Response(JSON.stringify({ error: 'Configuración del servidor incompleta' }), { status: 500 });
    }

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: 'Nuevo mensaje desde NANIVA Web',
        from_name: 'Formulario Web NANIVA',
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        message: cleanMessage,
      }),
    });

    const rawBody = await response.text();
    let data;
    try {
      data = JSON.parse(rawBody);
    } catch {
      console.error('Web3Forms devolvió una respuesta no-JSON:', response.status, rawBody.slice(0, 300));
      return new Response(JSON.stringify({ error: 'Respuesta inválida del servicio de correo' }), { status: 502 });
    }

    if (!response.ok) {
      console.error('Web3Forms error:', data);
      return new Response(JSON.stringify({ error: 'Error al enviar mensaje' }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true, message: 'Mensaje enviado correctamente' }), { status: 200 });
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), { status: 500 });
  }
}
