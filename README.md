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
   *Copia tus archivos `.tsx` y `.ts` dentro de la carpeta `src/`, y los archivos de configuración (`vite.config.ts`, `netlify.toml`) en la raíz.*

3. **Ejecutar servidor de desarrollo**:
   ```bash
   npm run dev
   ```
4. **Abrir en el navegador**: Generalmente en `http://localhost:5173`.

---

## 🌐 2. Despliegue en Internet (Solución Pantalla Blanca)

Para evitar la "Pantalla Blanca", sigue estos pasos en **Netlify**:

### A. Subir a GitHub
1. Sube todo tu código (incluyendo `vite.config.ts` y `netlify.toml`) a un repositorio de GitHub.

### B. Conectar a Netlify
1. Ve a [Netlify](https://www.netlify.com/) y crea una cuenta.
2. "Import from Git" > Elige tu repositorio.
3. Netlify detectará automáticamente la configuración gracias al archivo `netlify.toml`.
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`

### C. Configurar API Key (CRUCIAL)
Si no haces esto, la página se verá en blanco o el chat fallará.

1. En el panel de Netlify de tu sitio, ve a **Site configuration** > **Environment variables**.
2. Haz clic en **Add a variable**.
3. **Key**: `API_KEY`
4. **Value**: (Pega tu clave de Google Gemini aquí).
5. Haz clic en **Create Variable**.
6. Ve a la pestaña **Deploys** y haz clic en **Trigger deploy** > **Deploy site** para reconstruir el sitio con la clave.

---

## 🛠 3. Flujo de Trabajo del Admin

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
   - Haz un `git push` con el cambio en `constants.ts`. Netlify actualizará el sitio automáticamente.

*Este método te permite tener un CMS visual completo sin pagar servidores ni bases de datos.*

---

## 🛡 Credenciales por Defecto

- **Usuario Maestro**: `admin`
- **Contraseña**: `admin`
*(Recuerda cambiar esto en el código `constants.ts` antes de subirlo a producción)*.