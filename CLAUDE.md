# CLAUDE.md — Web de Valera Visionarias

Instrucciones para Claude (Claude Code) al trabajar en este repositorio. Quien pide los cambios es la responsable de la inmobiliaria, que **no es programadora**: explícale las cosas en español claro, sin jerga, y confirma con ella antes de publicar.

## Qué es

Web de **Valera Visionarias**, inmobiliaria de San Vicente del Raspeig (Alicante). Objetivos, por orden: captar propietarios que quieren vender (valoraciones), captar compradores, facilitar el contacto y posicionarse en búsquedas locales.

- Dominio canónico: **https://www.valeravisionarias.com** (con `www`). Definido en `lib/site.ts`; úsalo siempre vía `SITE_URL` / `absoluteUrl()`.
- Idioma del sitio: español de España.

## Cómo se publica (importante)

- El repositorio está en GitHub (copia propia de la responsable, creada a partir de `mgl120-ua/ValeraVisionarias`) y **Vercel publica automáticamente la rama `main` en producción**. Trabaja siempre en su copia; no abras PRs contra el repositorio original. Todo lo que llega a `main` está en la web real en un par de minutos.
- **Nunca hagas commit ni push directo a `main`.** Trabaja en una rama nueva, abre un Pull Request y deja que la responsable lo revise.
- Cada Pull Request genera en Vercel una **vista previa** con su propia URL. Dásela a la responsable para que compruebe el cambio antes de fusionar.
- Fusionar (merge) el PR = publicar. Hazlo solo cuando ella lo diga expresamente.
- Si algo sale mal en producción, se puede volver a la versión anterior desde Vercel (Deployments → versión anterior → "Promote to Production") o revirtiendo el PR en GitHub.

## Stack

- **Next.js 14** (App Router) + React 18 + TypeScript.
- **Tailwind CSS 3** + componentes **shadcn/ui** (Radix) en `components/ui/`. Iconos: `lucide-react`. Animaciones: `framer-motion` (sutiles).
- **Supabase**: base de datos de inmuebles (tablas `properties` y `property_images`) y almacenamiento de fotos (bucket público `properties`). Para crear las tablas en un proyecto nuevo, usa `supabase/schema.sql` (tablas, políticas RLS y bucket), deducido de las consultas en `app/api/admin/` y `app/propiedad*/`.
- **Resend**: envío por email de los formularios (contacto, valoración, visita, captadores) a la bandeja de la inmobiliaria.
- **Google Places API (New)**: valoración y reseñas de Google en la portada (`lib/google-reviews.ts`).
- Alojamiento: **Vercel** (+ `@vercel/analytics`).
- `next.config.mjs` ignora errores de ESLint y TypeScript en el build: no confíes en el build para detectarlos; revisa tú los tipos.

## Comandos

```bash
npm install        # instalar dependencias (hay package-lock.json y pnpm-lock.yaml; no añadas un tercer gestor)
npm run dev        # servidor local en http://localhost:3000
npm run build      # build de producción (compruébalo antes de abrir un PR)
npm run lint
```

Para que `npm run build` funcione en local hacen falta las variables de Supabase y Resend en `.env.local` (aunque sean valores de prueba). No hay tests automáticos: comprueba los cambios visualmente en `npm run dev` y en la vista previa de Vercel, en móvil y escritorio.

## Estructura

- `app/` — páginas (App Router):
  - `page.tsx` + `ValeraVisionariasLandingClient.tsx` — portada.
  - `propiedades/` (listado), `propiedad/[id]/` (ficha de inmueble).
  - `valoraciones/` (solicitud de valoración: vía prioritaria de captación), `contacto/`, `nosotros/`, `colabora/` (captadores).
  - `simulador-hipoteca/`, `calculadora-rentabilidad/`, `calculadora-inversion/` — herramientas.
  - `privacidad/`, `cookies/` — textos legales.
  - `admin/` — panel privado para gestionar inmuebles (protegido por `middleware.ts` + `lib/admin-session.ts`).
  - `api/` — endpoints de formularios (`contact`, `valoraciones`, `visita`, `captadores`) y del panel (`admin/*`).
  - `sitemap.ts`, `robots.ts`.
- `components/` — secciones y formularios; `components/site/` (Header, Footer, WhatsApp); `components/admin/`; `components/ui/` (shadcn, no editar salvo necesidad).
- `lib/` — **datos y utilidades compartidas**:
  - `contact-info.ts` — **fuente única** de teléfono, email, dirección, horario, redes sociales y valoración de Google. Cambia estos datos aquí, nunca escritos a mano en las páginas.
  - `site.ts` — dominio canónico.
  - `google-reviews.ts`, `promocion.ts`, `seller-leads.ts`, `escape-html.ts`, `supabase/`.
- `public/` — imágenes (`public/images/`, logos `logo-dark.png` / `logo-light.png`).
- `public/promocion-reyes-catolicos/index.html` — dosier autónomo de la promoción de obra nueva, servido en `/promocion-reyes-catolicos` (ver `next.config.mjs`). **No lo reescribas**: lleva imágenes y tipografía incrustadas.

### Los inmuebles no se cambian con código

Los inmuebles (alta, edición, fotos, destacados, activar/desactivar) se gestionan desde el **panel `/admin`** con la contraseña de administración, y se guardan en Supabase. Si la responsable pide "añadir un piso" o "cambiar el precio", indícale que lo haga desde `/admin` en lugar de tocar el código.

## Marca y diseño

Respeta la identidad ya definida. **No inventes colores, tipografías ni eslóganes nuevos.**

- Tipografía única: **Plus Jakarta Sans** (`next/font/google` en `app/layout.tsx`, pesos 300–600). Titulares en peso ligero, texto en regular.
- Paleta: negro, blanco y la gama **stone** de Tailwind (`stone-50` … `stone-900`); fondo cálido `--background` (casi blanco) definido en `app/globals.css`. Sin colores de acento llamativos.
- Estilo editorial y minimalista: mucho espacio en blanco, fotografía de calidad, jerarquía clara, microinteracciones sutiles. Nada de plantillas genéricas ni adornos innecesarios.
- Ancho máximo de página: `max-w-page` (1280px). Sombras: `shadow-subtle`, `shadow-soft`, `shadow-lifted`.
- Móvil primero: comprueba siempre cómo queda en pantalla de teléfono.
- Accesibilidad: textos alternativos en imágenes, contraste suficiente, foco visible, formularios con etiquetas.

## Reglas de contenido (obligatorias)

1. **Solo datos verificables.** No inventes datos de la empresa, inmuebles, clientes ni resultados. Si falta un dato, pregúntalo.
2. **Prohibidas las cifras comerciales que no se puedan demostrar** (por ejemplo "80 % vendido en menos de una semana", "21 días de media", "+120 viviendas vendidas", "4,9/5"). Se retiraron a propósito. No las vuelvas a poner ni inventes otras parecidas.
3. Valoración de Google: la real es **4,3/5 con más de 20 reseñas**. Si las variables de Google están configuradas, la portada la muestra en directo; si no, se usa el valor fijo de `lib/contact-info.ts`.
4. Datos de contacto vigentes (en `lib/contact-info.ts`):
   - Oficina: **Avenida Ancha de Castelar 46-48, 03690 San Vicente del Raspeig (Alicante)**.
   - Teléfono y WhatsApp: **617 31 45 84**.
   - Email: Valeravisionarias@gmail.com.
5. Todavía **no hay razón social ni NIF**: los textos legales (`/privacidad`, `/cookies`) usan el nombre comercial. Cuando la responsable facilite esos datos, añádelos ahí.
6. No publiques servicios, inmuebles ni funcionalidades que no estén confirmados por la responsable.
7. Un estimador o calculadora nunca debe presentarse como tasación oficial ni garantizar un precio.
8. Cualquier formulario debe cumplir RGPD/LOPDGDD: pedir solo los datos necesarios, casilla de aceptación de la política de privacidad, confirmar el envío y explicar qué pasará después.

## SEO local

- Prioridad: San Vicente del Raspeig y alrededores de Alicante.
- Cada página nueva necesita su `metadata` (título, descripción y `alternates.canonical`) y debe añadirse a `app/sitemap.ts` si es pública.
- Datos estructurados de la empresa (`RealEstateAgent`) en `app/layout.tsx`, alimentados por `lib/contact-info.ts`.
- Nada de keyword stuffing, páginas duplicadas ni promesas SEO sin datos.
- Imágenes con `next/image`, tamaños adecuados y texto alternativo descriptivo.

## Variables de entorno

Se configuran en Vercel (Project → Settings → Environment Variables) y, para trabajar en local, en `.env.local` (no se sube a GitHub). **Nunca escribas valores reales de estas variables en el código, en commits ni en mensajes.**

| Variable | Para qué sirve |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL del proyecto de Supabase (inmuebles) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave pública de Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Clave privada de Supabase para el panel (solo servidor) |
| `RESEND_API_KEY` | Envío de los emails de los formularios |
| `ADMIN_PASSWORD` | Contraseña del panel `/admin` |
| `ADMIN_SESSION_SECRET` | Opcional: firma de la sesión del panel (si falta, usa `ADMIN_PASSWORD`) |
| `GOOGLE_MAPS_API_KEY` | Reseñas de Google (Places API New) |
| `GOOGLE_PLACE_ID` | Identificador de la ficha de Google de la inmobiliaria |
| `NEXT_PUBLIC_API_URL` | Usada solo por `admin/dashboard/destacados` |

Si cambias una variable en Vercel, hay que volver a desplegar para que se aplique.

## Forma de trabajar

1. Lee el código existente antes de cambiarlo y respeta sus convenciones (comentarios en español, componentes en `components/`, datos compartidos en `lib/`).
2. Cambios pequeños y enfocados: un PR por petición.
3. Antes de abrir el PR: `npm run build` sin errores y revisión visual en móvil y escritorio.
4. En el PR, explica en español sencillo qué cambia y cómo comprobarlo en la vista previa.
5. No afirmes haber probado o publicado algo si no lo has hecho. Distingue lo propuesto de lo terminado.
6. No añadas dependencias nuevas si no hacen falta de verdad.
7. Ante cualquier duda sobre datos del negocio, pregunta a la responsable en lugar de suponer.
