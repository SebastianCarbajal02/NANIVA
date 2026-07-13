export default async function handler(req, res) {
  // Solo aceptar POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, phone, message } = req.body;

    // Validación básica server-side
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    if (name.length > 100 || email.length > 200 || message.length > 5000) {
      return res.status(400).json({ error: "Campos exceden longitud máxima" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Email inválido" });
    }

    // Sanitizar inputs básicos
    const sanitize = (str) => str.replace(/[<>&"']/g, "");
    const cleanName = sanitize(name);
    const cleanEmail = sanitize(email);
    const cleanPhone = phone ? sanitize(phone) : "";
    const cleanMessage = sanitize(message);

    // Enviar a Web3Forms desde el servidor (API key no expuesta)
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_KEY,
        subject: "Nuevo mensaje desde NANIVA Web",
        from_name: "Formulario Web NANIVA",
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        message: cleanMessage,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Web3Forms error:", data);
      return res.status(500).json({ error: "Error al enviar mensaje" });
    }

    return res.status(200).json({ success: true, message: "Mensaje enviado correctamente" });
  } catch (error) {
    console.error("Contact form error:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}