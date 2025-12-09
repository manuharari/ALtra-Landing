# Altra Pisos - Landing Page Premium & CMS

Este proyecto es una Single Page Application (SPA) desarrollada con **React 18**, **Tailwind CSS** y **TypeScript**. Incluye un Panel de Administración integrado, Chatbot con IA (Gemini) y un diseño de alto impacto visual.

---

## 🚀 1. Instalación Local

Para editar y probar el sitio en tu computadora antes de subirlo.

### Requisitos
- [Node.js](https://nodejs.org/) (Versión 18 o superior).

### Pasos
1. **Descargar archivos**: Asegúrate de tener todos los archivos (`App.tsx`, `index.tsx`, `constants.ts`, etc.) en una estructura de proyecto React (se recomienda usar Vite).
2. **Inicializar proyecto (si aún no lo tienes)**:
   ```bash
   npm create vite@latest altra-pisos -- --template react-ts
   cd altra-pisos
   npm install
   npm install lucide-react @google/genai
   ```
   *Copia tus archivos `.tsx` y `.ts` dentro de la carpeta `src/`.*

3. **Ejecutar servidor de desarrollo**:
   ```bash
   npm run dev
   ```
4. **Abrir en el navegador**: Generalmente en `http://localhost:5173`.

---

## 🌐 2. Despliegue en Internet (Gratis)

La mejor opción para alojar este sitio de forma gratuita, rápida y manteniendo el diseño es **Netlify** o **Vercel**.

### Opción A: Netlify Drop (La más fácil - Arrastrar y Soltar)
Esta opción no requiere usar GitHub ni comandos complejos.

1. En tu terminal local (dentro de la carpeta del proyecto), crea la versión final:
   ```bash
   npm run build
   ```
   *Esto creará una carpeta llamada `dist`.*
2. Ve a [app.netlify.com/drop](https://app.netlify.com/drop).
3. Arrastra la carpeta `dist` completa al recuadro en el navegador.
4. **¡Listo!** Netlify te dará un enlace (ej: `kinky-flooring-123.netlify.app`).

### Opción B: Vercel + GitHub (Recomendada para profesionales)
Ideal si quieres actualizaciones automáticas.

1. Sube tu código a un repositorio de **GitHub**.
2. Ve a [Vercel.com](https://vercel.com) y crea una cuenta.
3. Haz clic en "Add New Project" e importa tu repositorio de GitHub.
4. Vercel detectará que es React/Vite. Dale a "Deploy".

---

## 🛠 3. Flujo de Trabajo del Admin (IMPORTANTE)

Como este sitio **no usa base de datos** (para mantenerlo gratis y seguro), los cambios que hagas en el Panel de Admin se guardan en el navegador (`localStorage`).

**¿Cómo actualizar el sitio real que ven los clientes?**

Sigue este ciclo de trabajo "Static Site":

1. **Edita en Local o en el Sitio**: Entra al Admin (`/admin`), cambia textos, sube imágenes, cambia colores.
2. **Exportar**: En el Admin, haz clic en el botón **"EXPORTAR RESPALDO"**. Se descargará un archivo `altra-pisos-config.json`.
3. **Actualizar Código**:
   - Abre el archivo descargado.
   - Copia todo el contenido del JSON.
   - Ve a tu código fuente, archivo `src/constants.ts`.
   - Reemplaza el objeto `INITIAL_CONTENT` con lo que copiaste.
4. **Re-desplegar**:
   - Si usas **Netlify Drop**: Ejecuta `npm run build` de nuevo y arrastra la carpeta.
   - Si usas **GitHub**: Haz un `git push` con el cambio en `constants.ts`.

*Este método te permite tener un CMS visual completo sin pagar servidores ni bases de datos.*

---

## 🔑 4. Configuración de API Keys (Chatbot)

Para que el Chatbot "Altra AI" funcione en internet:

1. Obtén tu API Key en [Google AI Studio](https://aistudio.google.com/).
2. En tu servicio de hosting (Netlify/Vercel), ve a **Settings > Environment Variables**.
3. Crea una variable llamada `VITE_API_KEY` (o como la tengas configurada en tu código) y pega tu clave.
4. **Seguridad**: En la consola de Google Cloud, restringe tu API Key para que solo acepte peticiones desde tu dominio (ej: `https://www.altrapisos.com`).

---

## 🌍 5. Conectar tu Dominio (.com)

1. Compra tu dominio (ej: `altrapisos.com`) en **Namecheap** o **GoDaddy**.
2. En Netlify/Vercel, ve a "Domain Management".
3. Escribe tu dominio.
4. La plataforma te dará unos "DNS Nameservers" (ej: `dns1.p01.nsone.net`).
5. Ve a donde compraste el dominio y cambia los DNS por los que te dio Netlify/Vercel.

---

## 🛡 Credenciales por Defecto

- **Usuario Maestro**: `admin`
- **Contraseña**: `admin`
*(Recuerda cambiar esto en el código `constants.ts` antes de subirlo a producción)*.
