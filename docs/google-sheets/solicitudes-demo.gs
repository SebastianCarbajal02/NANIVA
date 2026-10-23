/**
 * Apps Script de la hoja "Solicitudes demo" de NANIVA.
 * Recibe las filas que envía el sitio desde /api/solicitar-demo (src/pages/api/solicitar-demo.ts).
 *
 * Cómo instalarlo:
 * 1. En Google Sheets crea la hoja y nombra la pestaña "Solicitudes demo".
 *    Fila 1: Fecha | Hora | Teléfono | Correo | RUC | Rubro | Producto
 * 2. Extensiones → Apps Script → pega este archivo completo.
 * 3. Cambia TOKEN por una clave larga y aleatoria (la misma va en GOOGLE_SHEETS_TOKEN).
 * 4. Implementar → Nueva implementación → Tipo: Aplicación web
 *    Ejecutar como: Yo · Quién tiene acceso: Cualquier usuario
 * 5. Copia la URL (termina en /exec) y ponla en GOOGLE_SHEETS_WEBHOOK_URL
 *    (archivo .env y variables de entorno del proyecto en Vercel).
 *
 * Si cambias este código, publica de nuevo: Implementar → Gestionar implementaciones →
 * editar → Versión: Nueva versión (así la URL no cambia).
 */

const TOKEN = 'CAMBIA-ESTO-POR-UNA-CLAVE-LARGA-Y-SECRETA';
const PESTANA = 'Solicitudes demo';
// Fecha y hora siempre en hora de Perú, sin importar la zona horaria configurada en el script
const ZONA_HORARIA = 'America/Lima';

function doPost(e) {
  try {
    const datos = JSON.parse(e.postData.contents);
    if (datos.token !== TOKEN) return responder({ ok: false, error: 'No autorizado' });

    // El servidor ya validó los datos; aquí solo se evita que Sheets los lea como fórmulas
    // y se guardan teléfono y RUC como texto para que no pierdan dígitos.
    const ahora = new Date();
    const fila = [
      // Con ' delante Sheets no reinterpreta la fecha según el idioma de la hoja (05/10 ≠ 10 de mayo)
      "'" + Utilities.formatDate(ahora, ZONA_HORARIA, 'dd/MM/yyyy'),
      "'" + Utilities.formatDate(ahora, ZONA_HORARIA, 'HH:mm:ss'),
      "'" + texto(datos.telefono),
      seguro(datos.correo),
      "'" + texto(datos.ruc),
      seguro(datos.rubro),
      seguro(datos.producto),
    ];

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName(PESTANA).appendRow(fila);
    } finally {
      lock.releaseLock();
    }
    return responder({ ok: true });
  } catch (error) {
    return responder({ ok: false, error: String(error) });
  }
}

function texto(valor) {
  return String(valor == null ? '' : valor).slice(0, 120);
}

// Un valor que empieza con = + - @ se guardaría como fórmula: se antepone ' para que sea texto
function seguro(valor) {
  const v = texto(valor);
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

function responder(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
