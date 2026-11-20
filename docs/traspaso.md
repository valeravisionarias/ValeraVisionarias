# Guía de traspaso: cómo gestionar tu web con Claude

Esta guía es para ti, la responsable de Valera Visionarias. No necesitas saber programar: Claude hace los cambios en la web y tú decides qué se publica.

## 1. Cómo funciona tu web, en pocas palabras

- El **código** de la web está guardado en **GitHub** (en el repositorio `ValeraVisionarias`).
- **Vercel** es el servicio que la pone en internet en www.valeravisionarias.com.
- Están conectados: **cuando un cambio se aprueba en GitHub, Vercel lo publica solo en un par de minutos.**
- Los **inmuebles** (pisos, precios, fotos, destacados) **no** se cambian con código: los gestionas tú desde el panel privado **www.valeravisionarias.com/admin**, con la contraseña de administración.

## 2. Montar tu propia copia de la web (una sola vez)

Vas a tener **tu propia copia** de la web, con tus propias cuentas. Así todo queda a tu nombre y no dependes de nadie. Si te atascas en algún paso, pídele ayuda a Claude: puede guiarte pantalla a pantalla (pero **nunca le pegues contraseñas ni claves** en el chat).

### 2.1 GitHub (el código)
1. Crea una cuenta gratuita en https://github.com si no la tienes.
2. Abre https://github.com/mgl120-ua/ValeraVisionarias y pulsa **Fork** para crear tu copia en tu cuenta.
3. A partir de ahora trabajarás siempre sobre **tu copia** (`tu-usuario/ValeraVisionarias`).

> Una copia "fork" de un repositorio público también es pública: cualquiera puede ver el código. No pasa nada, porque las claves nunca están en el código, sino en Vercel.

### 2.2 Supabase (los inmuebles y sus fotos)
1. Crea una cuenta y un proyecto en https://supabase.com.
2. La web necesita dos tablas, `properties` y `property_images`, y un espacio de fotos (bucket) público llamado `properties`. Se crean pegando el archivo `supabase/schema.sql` en Supabase → SQL Editor → Run.
3. Pide a quien gestionaba la web hasta ahora que te **exporte los inmuebles y las fotos actuales** para importarlos en tu proyecto. Si no, tendrás que darlos de alta de nuevo desde el panel `/admin`.
4. Apunta tres datos de Supabase (Project Settings → API): la URL del proyecto, la clave pública (anon) y la clave privada (service_role). Los pondrás en Vercel en el paso 2.5.

### 2.3 Resend (los emails de los formularios)
1. Crea una cuenta en https://resend.com.
2. Añade y **verifica el dominio** `valeravisionarias.com` (Resend te dará unos registros DNS que hay que añadir donde esté contratado el dominio). La web envía los avisos desde `inmobiliaria@valeravisionarias.com` a `valeravisionarias@gmail.com`; sin el dominio verificado, los formularios no llegarán.
3. Crea una clave de API y apúntala.

### 2.4 Google (reseñas en la portada) — opcional
Crea en Google Cloud una clave con **Places API (New)** activada y busca el identificador de tu ficha (Place ID). Sin esto la web funciona igual y muestra la nota fija de 4,3.

### 2.5 Vercel (publicar la web)
1. Crea una cuenta en https://vercel.com entrando con tu GitHub.
2. **Add New → Project** e importa tu copia del repositorio.
3. Antes de publicar, en **Environment Variables** añade:
   - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (de Supabase)
   - `RESEND_API_KEY` (de Resend)
   - `ADMIN_PASSWORD`: inventa una contraseña segura para tu panel `/admin`
   - `GOOGLE_MAPS_API_KEY` y `GOOGLE_PLACE_ID` (si hiciste el paso 2.4)
4. Pulsa **Deploy** y comprueba que la web funciona en la dirección provisional de Vercel (`...vercel.app`): portada, inmuebles, formularios y panel `/admin`.

### 2.6 El dominio www.valeravisionarias.com
1. Pide a quien tenga contratado el dominio que lo quite del proyecto de Vercel anterior.
2. En tu proyecto de Vercel: **Settings → Domains** → añade `www.valeravisionarias.com` y `valeravisionarias.com` (que redirija a la versión con www).
3. Ajusta los registros DNS que te indique Vercel donde esté contratado el dominio. Mientras se cambia, la web puede tardar unas horas en apuntar a tu copia.

> Haz el cambio de dominio **solo cuando tu copia ya funcione bien** en la dirección provisional, para que la web no se quede caída.

## 3. Conectar Claude a tu web

1. Entra en https://claude.ai con tu cuenta (necesitas un plan que incluya **Claude Code**).
2. Ve a **Claude Code** (claude.ai/code) y conecta tu cuenta de GitHub cuando te lo pida.
3. Elige **tu copia** del repositorio **ValeraVisionarias**.
4. Listo: Claude leerá automáticamente el archivo `CLAUDE.md` del repositorio, que le explica cómo es la web, los colores, la tipografía, los datos de contacto correctos y las reglas que debe respetar.

## 4. Cómo pedir cambios de forma segura

1. **Pide el cambio con tus palabras.** Por ejemplo:
   - "Cambia el horario de los sábados a 10:00–14:00."
   - "Añade una pregunta frecuente sobre cuánto cuesta vender un piso."
   - "Pon una foto nueva en la sección Nosotros" (y adjunta la foto).
2. Claude prepara el cambio en una **copia aparte** (un "Pull Request"); **la web real no cambia todavía**.
3. Claude te dará un **enlace de vista previa** de Vercel. Ábrelo en el móvil y en el ordenador y comprueba que todo está bien.
4. Si quieres retoques, díselo y Claude los aplica en la misma copia.
5. Cuando esté perfecto, dile **"publícalo"** (o pulsa "Merge" en GitHub, en tu copia). En un par de minutos estará en la web real.

### Reglas de oro
- **Revisa siempre la vista previa antes de publicar.**
- Pide **un cambio cada vez**; es más fácil revisar y deshacer.
- **Solo información real.** No publiques cifras de ventas, plazos o valoraciones que no puedas demostrar (por ejemplo "vendemos en 21 días"). Claude ya tiene esta regla, pero tú tienes la última palabra.
- Si cambias **teléfono, dirección u horario**, actualízalos también en tu **ficha de Google (Google Business Profile)** para que coincidan con la web.

## 5. Si algo sale mal

- **No te preocupes: todo se puede deshacer.** Dile a Claude: "El último cambio ha roto X, vuelve a la versión anterior".
- También puedes hacerlo tú en Vercel: *Deployments* → elige la versión anterior que funcionaba → *Promote to Production*.

## 6. Tareas pendientes para tener la web al 100 %

- [ ] Configurar en Vercel `GOOGLE_MAPS_API_KEY` y `GOOGLE_PLACE_ID` para que las reseñas de Google se muestren en directo.
- [ ] Dar de alta la web en **Google Search Console**.
- [ ] Actualizar la **ficha de Google** con la dirección (Avenida Ancha de Castelar 46-48) y el teléfono (617 31 45 84) de la web.
- [ ] Facilitar la **razón social y el NIF** de la empresa para completar la política de privacidad y la de cookies.
