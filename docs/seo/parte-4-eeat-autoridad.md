# Estrategia SEO NANIVA — Parte 4: E-E-A-T y autoridad local en Perú

E-E-A-T = experiencia, conocimiento, autoridad y confiabilidad. Para un software que maneja la facturación y el dinero de un negocio, Google y los clientes exigen pruebas de que la empresa es real, está en Perú y sabe de lo que habla. Basado en las Partes 1–3.

---

## 4.1 Hallazgos en el sitio actual

| # | Hallazgo | Dónde | Riesgo |
|---|---|---|---|
| 1 | El footer muestra dos sellos **"Autorizados por SUNAT"** ("Facturación Electrónica" y "Contribuyente Autorizado"), pero NANIVA opera como **SEE – Del Contribuyente**: no es PSE ni OSE | `src/components/layout/Footer.astro:40-41` | "Autorizados por SUNAT" sugiere una autorización que SUNAT no otorga a un software bajo esta modalidad. Puede leerse como publicidad engañosa (Indecopi). Cambiar por el texto de 4.2 |
| 2 | El enlace de **Facebook** apunta a `facebook.com/valeapp.sistemadefacturacion`, otra marca | `Footer.astro:36` | Señal de marca inconsistente. Confirmar si ValeApp es una marca anterior; si lo es, renombrar la página o explicar la relación. No está en el `sameAs` del schema |
| 3 | **"Nosotros" y "Clientes"** del footer llevan a `/contacto` | `Footer.astro:95-96` | No existe página "Nosotros": falta la señal más básica de empresa real |
| 5 | El **RUC y la razón social** no aparecen en ninguna página visible | Todo el sitio | Para un cliente peruano, ver el RUC es una comprobación habitual antes de pagar |
| 6 | No hay **política de privacidad**, aunque el formulario de contacto y el Libro de Reclamaciones recogen datos personales | — | La Ley N.° 29733 (Protección de Datos Personales) exige informar el tratamiento de datos. Validar el texto con un abogado |
| 7 | Los **términos y condiciones** son solo un PDF | `/terminos-y-condiciones.pdf` | Funciona, pero una página HTML es más legible, enlazable e indexable |
| 8 | La home publica casos con métricas ("+35% Más ventas", "Juan Carlos R.") marcados como pendientes de confirmar | `src/components/home/CaseStudies.astro` | Si no son reales o no hay permiso, retirarlos. Si lo son, darles nombre, rubro y fuente |

---

## 4.2 Señales de confianza que hay que mostrar

| Señal | Dónde mostrarla | Estado | Acción |
|---|---|---|---|
| **RUC 20615608221 y razón social** | Footer (línea final), `/contacto`, `/nosotros`, schema `Organization` (`taxID`) | Falta en la web visible | Añadir "NANIVA TECHNOLOGIES [CONFIRMAR razón social] · RUC 20615608221" en el footer |
| **Dirección física** | Footer, `/contacto` con mapa, Google Business Profile | Parcial (sin mapa) | Mapa en `/contacto` como imagen estática enlazada a Google Maps (no iframe, por velocidad) |
| **Horario y canales** | Footer, `/contacto` | Existe | Mantener idéntico en web, Google Business Profile y directorios (NAP consistente) |
| **Libro de Reclamaciones** | Footer en todas las páginas | Existe | Mantener. Es obligatorio y además genera confianza |
| **Modalidad de emisión SUNAT** | Sección de facturación de `/sistema-erp`, footer | Definido: SEE – Del Contribuyente | Sustituir los sellos "Autorizados por SUNAT" por un texto exacto, por ejemplo: "Facturación electrónica bajo el SEE – Del Contribuyente de SUNAT". Si los comprobantes pasan por un OSE, añadir: "validados por [nombre], OSE autorizado por SUNAT". No usar "homologado" ni "autorizado" sin un documento de SUNAT que lo respalde |
| **Página "Nosotros"** | `/nosotros` (nueva) | Falta | Historia, equipo con nombres y fotos, oficina en San Miguel, RUC, valores. No compite por keywords; es una página de confianza |
| **Casos de éxito verificables** | Landings (sección de prueba social), home | Pendiente | Formato: nombre del negocio, rubro, distrito, foto real, cita textual, una métrica con su periodo y **permiso escrito** del cliente. Mejor 3 casos reales que 10 genéricos. Si hay video del cliente, mejor aún (sube también a YouTube) |
| **Autoría de las guías** | Cada artículo del blog | No existe aún | Autor con nombre, cargo, foto y bio breve. Las guías tributarias (comprobantes, guía de remisión, SEE-SOL) deben indicar **"Revisado por [nombre], contador público colegiado"** y la fecha de actualización. Es contenido sensible para el dinero del lector |
| **Fuentes oficiales** | Guías del blog | — | Citar y enlazar las páginas de SUNAT y la normativa correspondiente en cada guía tributaria |
| **Demos reales del producto** | Landings, YouTube | Existe el video de demo | Grabar una demo corta por producto (ERP, Restaurantes, Catálogo) mostrando la pantalla real. Es la mejor prueba de "experiencia" |
| **Correo con dominio propio** | Footer, contacto, schema | Usa Gmail | Crear `ventas@naniva.pe` o similar |
| **Política de privacidad** | Footer, formularios | Falta | Crear `/politica-de-privacidad` (validar con abogado) y enlazarla desde los formularios |
| **Reseñas de clientes** | Google Business Profile, directorios de software | Sin datos | Ver 4.3 y la táctica 1 de link building |

**Coherencia de marca (NAP):** nombre, dirección y teléfono deben escribirse **exactamente igual** en la web, Google Business Profile, redes y directorios. Un solo formato:
`NANIVA Technologies · Calle Manrique de Luna 168, San Miguel, Lima · +51 908 644 190`

---

## 4.3 Google Business Profile

Es la señal local más importante y es gratuita.

1. Crear o reclamar el perfil en https://business.google.com con la dirección de San Miguel (Google la verifica por video o código).
2. **Categoría principal:** "Empresa de software". Secundarias posibles: "Consultor informático" o "Servicio de diseño de sitios web" (por la tienda virtual). Elegir solo las que describan lo que realmente se hace.
3. Completar horario (lun–vie 9:00–18:00), teléfono, web `https://www.naniva.pe`, descripción con los productos y fotos reales de la oficina y del equipo.
4. Añadir cada producto en la sección **Productos** (ERP, Restaurantes, Catálogo, Tienda Virtual) con enlace a su landing.
5. **Reseñas:** pedirlas a clientes reales tras la implementación, con un enlace directo. Responder todas, también las negativas. Nunca ofrecer descuentos a cambio de reseñas positivas: va contra las políticas de Google.
6. Publicar una novedad cada 2 semanas (nueva función, caso de cliente, guía del blog).
7. Hacer lo mismo en **Bing Places**: se puede importar desde Google en minutos.

---

## 4.4 Link building: 5 tácticas realistas

Esfuerzo estimado para una persona del equipo. "Costo" = pago externo, si lo hay.

| # | Táctica | Qué se consigue | Esfuerzo | Costo |
|---|---|---|---|---|
| 1 | Directorios de software y perfiles de empresa | Enlaces de sitios con autoridad + reseñas | Bajo: 1 semana inicial, luego 1 h/semana | Gratis (planes de pago opcionales) |
| 2 | Partners e integraciones | Enlaces muy relevantes desde páginas de partners | Medio: 2–4 semanas por partner | Gratis |
| 3 | Cámaras de comercio y gremios | Enlace desde directorio de asociados + visibilidad | Medio | Cuota de membresía |
| 4 | Contadores y estudios contables | Enlaces + clientes referidos | Medio, continuo | Comisión por referido (opcional) |
| 5 | Medios de emprendimiento y negocios | Menciones y enlaces de alta autoridad | Alto: 4–8 semanas por nota | Gratis (sin pagar notas) |

### 1. Directorios de software y perfiles de empresa
- **Directorios de software B2B:** Capterra, GetApp y Software Advice (los tres son de Gartner y se gestionan desde una sola cuenta), G2 y Comparasoftware (enfocado en Latinoamérica y en español). Crear un perfil por producto con capturas reales, precios en soles y enlace a su landing.
- **Perfiles de empresa:** Google Business Profile, Bing Places, LinkedIn (página de empresa), YouTube (enlace en "Acerca de").
- **Reseñas:** pedir a cada cliente satisfecho una reseña en uno de estos directorios. Las reseñas allí refuerzan la confianza y algunas plataformas las muestran en Google.
- Evitar directorios genéricos de baja calidad o que cobran por "dar de alta en 500 sitios".

### 2. Partners e integraciones
- **OSE** (solo si los comprobantes se validan a través de uno) [CONFIRMAR]: muchos tienen una sección de "partners" o "integradores". Pedir aparecer con enlace.
- **Pasarelas de pago** [CONFIRMAR cuáles]: Niubiz, Izipay, Culqi y Mercado Pago tienen programas o directorios para desarrolladores e integradores. Aplica sobre todo a la Tienda Virtual.
- **Proveedores de hardware** (impresoras ticketeras, lectores de código de barras): proponer una página conjunta "equipos compatibles con NANIVA", con enlace mutuo.
- Cada partner es una mención en una página con la temática exacta (facturación, pagos, ventas).

### 3. Cámaras de comercio y gremios
- **Cámara de Comercio de Lima (CCL):** los asociados aparecen en su directorio y pueden participar en eventos y webinars para pymes. Evaluar si la membresía se justifica también por networking comercial.
- **Gremios de la industria de software en Perú** (por ejemplo APESOFT): directorio de asociados y eventos sectoriales. Verificar requisitos y costo.
- **Gremios por rubro** que atiendes: asociaciones gastronómicas para el sistema de restaurantes, o de bodegueros y retail para el ERP. Preguntar si tienen directorio de proveedores o convenios para asociados.
- **Municipalidades y programas de emprendimiento:** proponer talleres gratuitos de "cómo formalizar tu facturación". Si se publica en su web, suele incluir un enlace al organizador.

### 4. Contadores y estudios contables
- El contador es quien muchas veces recomienda el sistema de facturación a la pyme.
- Programa de **partners contables**: capacitación gratuita, acceso a una cuenta de prueba y una página en naniva.pe que liste a los estudios aliados. El estudio enlaza a NANIVA desde su web como "sistema recomendado".
- Bonus E-E-A-T: un contador aliado puede firmar como revisor de las guías tributarias del blog (ver 4.2).

### 5. Medios de emprendimiento y negocios
- Medios objetivo: secciones de economía y emprendimiento de diarios peruanos (Gestión, El Comercio, La República), medios especializados en retail y negocios (por ejemplo Perú Retail) y blogs o podcasts de emprendimiento.
- Lo que publican no son anuncios, sino **historias y datos**:
  - Un caso real de cliente (bodega o restaurante que se formalizó y ordenó su negocio).
  - Datos agregados y anónimos de la plataforma, si los términos del servicio lo permiten [CONFIRMAR con los términos]: por ejemplo, "los días y horas de más venta en restaurantes de Lima".
  - Comentario experto sobre cambios de SUNAT en comprobantes electrónicos, cuando ocurran.
- Preparar una página de prensa simple en `/nosotros` (logo, fotos, datos de contacto, un párrafo sobre la empresa).

### Lo que NO hacer
- Comprar enlaces, paquetes de "backlinks" o notas pagadas sin marcar como publicidad.
- Redes de blogs (PBN), intercambios masivos de enlaces o comentarios con enlaces.
- Copiar la misma descripción en decenas de directorios de baja calidad.

Google penaliza estas prácticas y una sanción tarda meses en revertirse.

---

## 4.5 Prioridad de acciones

**Ya (sin depender de nadie):**
1. RUC y razón social en el footer.
2. Arreglar los enlaces "Nosotros" y "Clientes" del footer.
3. Crear Google Business Profile y Bing Places.
4. Perfiles en Capterra/GetApp, G2 y Comparasoftware.

**Al confirmar datos:**
5. Reemplazar los sellos "Autorizados por SUNAT" por el texto de SEE – Del Contribuyente (ver 4.2).
6. Facebook: corregir o explicar la marca ValeApp.
7. Casos de éxito con permiso escrito.
8. Correo `@naniva.pe`.

**Con el blog (Parte 5):**
9. Página `/nosotros` con equipo y prensa.
10. Autoría y revisión contable en las guías.
11. Programa de partners contables y contacto con medios.

**Legal:**
12. Política de privacidad (validar con abogado).
