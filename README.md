# Naniva - Sitio Web

Sitio multi-página construido con [Astro](https://astro.build) para NANIVA (Facturación Electrónica, ERP, Catálogo Digital, Restaurante, IA).

## 🧞 Comandos

Todos los comandos se ejecutan desde la raíz del proyecto, en una terminal:

| Comando | Acción |
| :------ | :----- |
| `npm install` | Instala las dependencias |
| `npm run dev` | Levanta el servidor de desarrollo en `localhost:4321` |
| `npm run build` | Compila el sitio de producción en `./dist/` |
| `npm run preview` | Previsualiza el build de producción localmente |

## ⚙️ Requisitos

- Node.js `>= 22.12.0`

## 🔑 Variables de entorno

El formulario de contacto (`/contacto`) envía los mensajes directamente desde el navegador a [Web3Forms](https://web3forms.com) (el plan gratuito de Web3Forms requiere que la petición se origine en el cliente, no en un servidor). Se necesita una clave de acceso configurada como variable de entorno **pública** (con prefijo `PUBLIC_` para que Astro la exponga al navegador):

```
PUBLIC_WEB3FORMS_KEY=tu_clave_de_web3forms
```

- Crea un archivo `.env` en la raíz del proyecto (no se sube al repositorio) para desarrollo local:

  ```
  PUBLIC_WEB3FORMS_KEY=tu_clave_de_web3forms
  ```

- Obtén tu clave gratuita en [web3forms.com](https://web3forms.com).
- Como esta clave viaja al navegador, no es un secreto: es el modelo esperado por Web3Forms (equivalente a una site-key), que controla el abuso por dominio permitido en vez de ocultar la clave.

## 🚀 Despliegue en Vercel

El proyecto ya incluye el adaptador `@astrojs/vercel` configurado en `astro.config.mjs`, por lo que está listo para desplegarse en [Vercel](https://vercel.com) sin configuración adicional.

### Opción 1: Desde el dashboard de Vercel

1. Sube el repositorio a GitHub/GitLab/Bitbucket.
2. En Vercel, click en **Add New → Project** e importa el repositorio.
3. Vercel detectará Astro automáticamente (Framework Preset: **Astro**).
4. En **Environment Variables**, agrega:
   - `PUBLIC_WEB3FORMS_KEY` = tu clave de Web3Forms
5. Click en **Deploy**.

### Opción 2: Desde la CLI de Vercel

```bash
npm install -g vercel
vercel login
vercel
```

Sigue las instrucciones interactivas. Para configurar la variable de entorno desde la CLI:

```bash
vercel env add PUBLIC_WEB3FORMS_KEY
```

Para desplegar a producción:

```bash
vercel --prod
```

## 📁 Estructura del proyecto

Ver [PROYECTO.md](./PROYECTO.md) para la documentación detallada de componentes, convenciones de código, organización de imágenes y sistema de diseño.

```
src/
├── components/   # Componentes Astro reutilizables (uno por sección de página)
├── assets/       # Imágenes (WebP) y estilos globales
├── layouts/      # Layout base
└── pages/        # Rutas del sitio (index, servicios, planes, ia, contacto)
    └── api/      # Endpoints (contact.js → Web3Forms)
```

## 📄 Licencia

Proyecto privado de NANIVA.
